import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, ShoppingCart, RefreshCw, ChevronDown } from "lucide-react";
import { useShopifySync } from "@/hooks/useShopifySync";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import { getProductUrl, getCartUrl } from "@/lib/shopify-config";

const Shop = () => {
  const MAX_SEARCH_LENGTH = 100;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const { mutate: syncProducts, isPending: isSyncing } = useShopifySync();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('title');
      
      if (error) throw error;
      return data || [];
    }
  });

  const handleSync = () => {
    syncProducts();
  };

  const filteredProducts = products?.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // Helper to identify product types
    const isGelProduct = (title: string) => 
      title.toLowerCase().includes('gel') || 
      title.toLowerCase().includes('cleanser') || 
      title.toLowerCase().includes('compound');
    
    const isDepositProduct = (title: string) =>
      title.toLowerCase().includes('deposit');
    
    const aIsGel = isGelProduct(a.title);
    const bIsGel = isGelProduct(b.title);
    const aIsDeposit = isDepositProduct(a.title);
    const bIsDeposit = isDepositProduct(b.title);
    
    // VADER always goes first
    if (a.title === 'VADER') return -1;
    if (b.title === 'VADER') return 1;
    
    // Deposit products always go last
    if (!aIsDeposit && bIsDeposit) return -1;
    if (aIsDeposit && !bIsDeposit) return 1;
    
    // Gel/compound products go before deposits but after regular products
    if (!aIsGel && bIsGel && !aIsDeposit && !bIsDeposit) return -1;
    if (aIsGel && !bIsGel && !aIsDeposit && !bIsDeposit) return 1;
    
    // For products in the same category, apply selected sort
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price || '0') - parseFloat(b.price || '0');
      case 'price-high':
        return parseFloat(b.price || '0') - parseFloat(a.price || '0');
      case 'title':
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-primary via-accent to-primary/80">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-heading">
            Professional Equipment
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Explore our complete catalog of premium aesthetic and medical equipment
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-6 border-b border-border bg-card/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.slice(0, MAX_SEARCH_LENGTH).trim())}
                className="pl-10"
                maxLength={MAX_SEARCH_LENGTH}
              />
            </div>
            
            <div className="flex gap-3 items-center w-full md:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSync}
                disabled={isSyncing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                Sync
              </Button>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-48 w-full rounded-lg mb-4" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try adjusting your search" : "No products available at this time"}
              </p>
              {!searchQuery && (
                <Button onClick={handleSync} disabled={isSyncing}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                  Sync Products
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-elegant transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg bg-muted h-64">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                          <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                      {product.inventory_quantity !== null && product.inventory_quantity < 10 && (
                        <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                          Low Stock
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <CardTitle className="text-xl mb-2 line-clamp-2 min-h-[3.5rem]">
                      {product.title}
                    </CardTitle>
                    
                    {product.vendor && (
                      <Badge variant="secondary" className="mb-3">
                        {product.vendor}
                      </Badge>
                    )}

                    {product.description && (
                      <>
                        {product.description.length > 200 ? (
                          <Collapsible>
                            <div className="mb-4">
                              <div className="text-sm text-muted-foreground line-clamp-3">
                                {product.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                                  <div key={idx} className="flex items-start gap-2 mb-1">
                                    {line.trim().startsWith('•') ? (
                                      <>
                                        <span className="text-primary mt-0.5">•</span>
                                        <span className="flex-1">{line.replace('•', '').trim()}</span>
                                      </>
                                    ) : (
                                      <span>{line}</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="mt-2 h-auto p-0 text-primary hover:text-primary/80">
                                  More info <ChevronDown className="ml-1 h-3 w-3" />
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent>
                              <div className="text-sm text-muted-foreground mb-4 space-y-1">
                                {product.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    {line.trim().startsWith('•') ? (
                                      <>
                                        <span className="text-primary mt-0.5">•</span>
                                        <span className="flex-1">{line.replace('•', '').trim()}</span>
                                      </>
                                    ) : (
                                      <span>{line}</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <div className="text-sm text-muted-foreground mb-4 min-h-[4.5rem] space-y-1">
                            {product.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                {line.trim().startsWith('•') ? (
                                  <>
                                    <span className="text-primary mt-0.5">•</span>
                                    <span className="flex-1">{line.replace('•', '').trim()}</span>
                                  </>
                                ) : (
                                  <span>{line}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    {product.price && (
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-primary">
                          ${formatPrice(product.price)}
                        </span>
                        {product.compare_at_price && parseFloat(product.compare_at_price) > parseFloat(product.price) && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${formatPrice(product.compare_at_price)}
                          </span>
                        )}
                      </div>
                    )}

                    {product.product_type && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Category: {product.product_type}
                      </p>
                    )}
                  </CardContent>

                  <CardFooter className="p-6 pt-0 flex gap-2">
                    <Button 
                      className="flex-1" 
                      variant="default"
                      onClick={() => window.open(getProductUrl(product.handle), '_blank')}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => window.open(getProductUrl(product.handle), '_blank')}
                      title="Add to cart"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-primary via-accent to-primary/80">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4 font-heading">
            Need Help Choosing Equipment?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our team of experts is here to help you find the perfect solution for your practice
          </p>
          <Button variant="secondary" size="lg" onClick={() => window.location.href = '/#contact'}>
            Contact Our Team
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Shop;
