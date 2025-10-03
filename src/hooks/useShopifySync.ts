import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useShopifySync = () => {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('sync-shopify-products');
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Successfully synced ${data.productsCount} products from Shopify`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to sync products: ${error.message}`);
    }
  });
};
