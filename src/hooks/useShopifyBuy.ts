import { useEffect, useState } from 'react';
import Client from 'shopify-buy';

let client: Client | null = null;

export const useShopifyBuy = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    if (!client) {
      // Hardcoded to ensure consistency across all environments
      const domain = 'aestheticprotools.store';
      const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
      
      if (storefrontAccessToken) {
        client = Client.buildClient({
          domain,
          storefrontAccessToken,
        });
        setIsInitialized(true);
      }
    } else {
      setIsInitialized(true);
    }
  }, []);
  
  const addToCart = async (variantId: string, quantity: number = 1) => {
    if (!client) throw new Error('Shopify Buy not initialized');
    
    // Get or create checkout
    let checkoutId = localStorage.getItem('shopify_checkout_id');
    let checkout;
    
    if (checkoutId) {
      try {
        checkout = await client.checkout.fetch(checkoutId);
      } catch (error) {
        console.error('Failed to fetch checkout:', error);
        checkoutId = null;
      }
    }
    
    if (!checkout || !checkoutId) {
      checkout = await client.checkout.create();
      localStorage.setItem('shopify_checkout_id', checkout.id as string);
    }
    
    // Add item to checkout
    const lineItemsToAdd = [{ variantId, quantity }];
    checkout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
    
    return checkout;
  };
  
  const getCheckout = async () => {
    if (!client) return null;
    
    const checkoutId = localStorage.getItem('shopify_checkout_id');
    if (!checkoutId) return null;
    
    try {
      return await client.checkout.fetch(checkoutId);
    } catch (error) {
      console.error('Failed to fetch checkout:', error);
      localStorage.removeItem('shopify_checkout_id');
      return null;
    }
  };
  
  const removeLineItem = async (lineItemId: string) => {
    if (!client) throw new Error('Shopify Buy not initialized');
    
    const checkoutId = localStorage.getItem('shopify_checkout_id');
    if (!checkoutId) throw new Error('No checkout found');
    
    const checkout = await client.checkout.removeLineItems(checkoutId, [lineItemId]);
    return checkout;
  };
  
  const updateLineItem = async (lineItemId: string, quantity: number) => {
    if (!client) throw new Error('Shopify Buy not initialized');
    
    const checkoutId = localStorage.getItem('shopify_checkout_id');
    if (!checkoutId) throw new Error('No checkout found');
    
    const lineItemsToUpdate = [{ id: lineItemId, quantity }];
    const checkout = await client.checkout.updateLineItems(checkoutId, lineItemsToUpdate);
    return checkout;
  };
  
  const buyNow = async (variantId: string, quantity: number = 1) => {
    if (!client) throw new Error('Shopify Buy not initialized');
    
    // Create a new checkout with the product
    const checkout = await client.checkout.create();
    const lineItemsToAdd = [{ variantId, quantity }];
    const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
    
    // Redirect to checkout URL
    if (updatedCheckout.webUrl) {
      window.location.href = updatedCheckout.webUrl;
    }
    
    return updatedCheckout;
  };
  
  return {
    client,
    isInitialized,
    addToCart,
    buyNow,
    getCheckout,
    removeLineItem,
    updateLineItem,
  };
};
