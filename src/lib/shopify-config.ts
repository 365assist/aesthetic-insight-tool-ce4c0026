// Shopify store configuration
// Note: Update this with your actual Shopify store domain
// Format should be: yourstore.myshopify.com
export const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'aestheticprofessionalstouch.myshopify.com';

export const getProductUrl = (handle: string) => {
  return `https://${SHOPIFY_STORE_DOMAIN}/products/${handle}`;
};

export const getCartUrl = () => {
  return `https://${SHOPIFY_STORE_DOMAIN}/cart`;
};

export const addToCartUrl = (variantId: string, quantity: number = 1) => {
  return `https://${SHOPIFY_STORE_DOMAIN}/cart/add?id=${variantId}&quantity=${quantity}`;
};
