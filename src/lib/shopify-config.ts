// Shopify store configuration - hardcoded to ensure consistency
export const SHOPIFY_STORE_DOMAIN = 'aesthetic-pro-tools.myshopify.com';

export const getProductUrl = (handle: string) => {
  return `https://${SHOPIFY_STORE_DOMAIN}/products/${handle}`;
};

export const getCartUrl = () => {
  return `https://${SHOPIFY_STORE_DOMAIN}/cart`;
};

export const addToCartUrl = (variantId: string, quantity: number = 1) => {
  return `https://${SHOPIFY_STORE_DOMAIN}/cart/add?id=${variantId}&quantity=${quantity}`;
};
