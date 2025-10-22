import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useShopifySync = () => {
  return useMutation({
    mutationFn: async () => {
      // Get the current session to ensure we have a valid token
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        throw new Error('No active session. Please log in.');
      }

      // Invoke the edge function with explicit auth context
      const { data, error } = await supabase.functions.invoke('sync-shopify-products', {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });
      
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
