import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QrCode, HardHat, Package, CheckCircle, RefreshCw } from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useShopifySync } from "@/hooks/useShopifySync";
import { useQueryClient } from "@tanstack/react-query";

const UDIProgram = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [udiCode, setUdiCode] = useState("UDI-DI-123456-PI-A1B2C3");
  const [regulatoryStatus, setRegulatoryStatus] = useState("Pending Submission");
  const { mutate: syncShopify, isPending } = useShopifySync();
  const queryClient = useQueryClient();

  const handleSync = () => {
    syncShopify(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
      }
    });
  };

  // Fetch products from database for inventory
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('title');
      
      if (error) throw error;
      return data;
    },
  });

  const handleGenerateUDI = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for UDI generation logic (actual USFDA formula)
    const mockUdi = `UDI-DI-${Math.floor(100000 + Math.random() * 900000)}-PI-X1Y2Z3`;
    setUdiCode(mockUdi);
    setRegulatoryStatus("Ready to Submit to USFDA");
  };

  // Generate inventory data from products
  const inventoryData = products?.map((product, index) => ({
    id: product.id.slice(0, 8),
    product: product.title,
    count: product.inventory_quantity || 0,
    pending: Math.floor(Math.random() * 3), // Mock pending UDI count
    udi: `UDI-DI-${100001 + index}`
  })) || [];

  return (
    <div className="min-h-screen bg-muted/40">
      <Navigation />
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-4xl font-bold">UDI Program & Inventory</h1>
          <Button 
            onClick={handleSync}
            disabled={isPending}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
            {isPending ? 'Syncing...' : 'Sync Shopify'}
          </Button>
        </div>
        <p className="text-muted-foreground mb-8">Manage inventory, generate Unique Device Identifiers (UDI), and monitor regulatory compliance for all equipment.</p>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* UDI Generator Co-pilot Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><QrCode className="h-5 w-5 text-primary" /> UDI Generator Co-pilot</CardTitle>
              <CardDescription>Input device details to generate a compliant Unique Device Identifier.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerateUDI} className="space-y-4">
                <Input 
                  placeholder="Enter Machine Serial/Lot Number" 
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full" disabled={!serialNumber}>
                  Generate UDI
                </Button>
              </form>
              <div className="mt-6 p-4 border rounded-md bg-secondary/30">
                <p className="text-sm font-medium mb-2">Generated UDI:</p>
                <code className="block break-all bg-secondary p-2 rounded text-sm">{udiCode}</code>
                <p className="mt-3 flex items-center gap-2 text-sm">
                  <CheckCircle className={`h-4 w-4 ${regulatoryStatus.includes('Ready') ? 'text-green-500' : 'text-orange-500'}`} />
                  Regulatory Status: <span className="font-semibold">{regulatoryStatus}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Inventory/Shopify Data Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5 text-primary" /> Current Inventory Overview</CardTitle>
              <CardDescription>Real-time inventory pull from Shopify, linked to required UDI status.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Stock (Shopify)</TableHead>
                    <TableHead>Pending UDI</TableHead>
                    <TableHead>Regulatory Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">Loading inventory...</TableCell>
                    </TableRow>
                  ) : inventoryData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">No products found. Sync Shopify to load inventory.</TableCell>
                    </TableRow>
                  ) : (
                    inventoryData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.pending}</TableCell>
                      <TableCell className={item.pending > 0 ? "text-orange-500" : "text-green-500"}>
                        {item.pending > 0 ? 'Action Required' : 'Compliant'}
                      </TableCell>
                    </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
                <HardHat className="h-3 w-3" />
                Data is synced from Shopify. Click "Sync Shopify" to refresh inventory.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default UDIProgram;
