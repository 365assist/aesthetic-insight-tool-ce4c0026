import { useEffect, useState } from 'react';
import { useShopifyBuy } from '@/hooks/useShopifyBuy';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface CartLineItem {
  id: string;
  title: string;
  quantity: number;
  variant: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    image?: {
      src: string;
    };
  };
}

interface Checkout {
  id: string;
  webUrl: string;
  lineItems: CartLineItem[];
  subtotalPrice: {
    amount: string;
    currencyCode: string;
  };
}

export const ShopifyCart = () => {
  const { getCheckout, removeLineItem, updateLineItem, isInitialized } = useShopifyBuy();
  const [checkout, setCheckout] = useState<Checkout | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const loadCheckout = async () => {
    try {
      const cart = await getCheckout();
      setCheckout(cart as Checkout | null);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };
  
  useEffect(() => {
    if (isInitialized && isOpen) {
      loadCheckout();
    }
  }, [isInitialized, isOpen]);
  
  const handleRemoveItem = async (lineItemId: string) => {
    setIsLoading(true);
    try {
      const updatedCheckout = await removeLineItem(lineItemId);
      setCheckout(updatedCheckout as Checkout);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpdateQuantity = async (lineItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsLoading(true);
    try {
      const updatedCheckout = await updateLineItem(lineItemId, newQuantity);
      setCheckout(updatedCheckout as Checkout);
    } catch (error) {
      toast.error('Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };
  
  const cartItemCount = checkout?.lineItems?.length || 0;
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 flex flex-col h-full">
          {!checkout || cartItemCount === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add some products to get started</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {checkout.lineItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    {item.variant.image && (
                      <img 
                        src={item.variant.image.src} 
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.title}</h4>
                      {item.variant.title !== 'Default Title' && (
                        <p className="text-sm text-muted-foreground">{item.variant.title}</p>
                      )}
                      <p className="text-sm font-medium mt-1">
                        ${item.variant.price.amount}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={isLoading || item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center">{item.quantity}</span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={isLoading}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-4 space-y-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Subtotal:</span>
                  <span>${checkout.subtotalPrice.amount}</span>
                </div>
                
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={() => window.open(checkout.webUrl, '_blank')}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
