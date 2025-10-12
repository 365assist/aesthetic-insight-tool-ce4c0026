import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Shipment {
  id: string;
  tracking_number: string;
  part_name: string;
  part_description: string | null;
  status: string;
  current_location: string | null;
  carrier: string | null;
  estimated_delivery_date: string | null;
  actual_delivery_date: string | null;
  order_date: string;
  customer_name: string | null;
  customer_email: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateShipmentInput = {
  tracking_number: string;
  part_name: string;
  part_description?: string | null;
  status: string;
  current_location?: string | null;
  carrier?: string | null;
  estimated_delivery_date?: string | null;
  order_date?: string;
  customer_name?: string | null;
  customer_email?: string | null;
  notes?: string | null;
};

export const useShipments = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: shipments = [], isLoading } = useQuery({
    queryKey: ["shipments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .order("order_date", { ascending: false });

      if (error) throw error;
      return data as Shipment[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
      current_location,
    }: {
      id: string;
      status: string;
      current_location?: string;
    }) => {
      const updateData: any = { status };
      if (current_location) updateData.current_location = current_location;
      if (status === "delivered") updateData.actual_delivery_date = new Date().toISOString();

      const { error } = await supabase
        .from("shipments")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
      toast({
        title: "Status updated",
        description: "Shipment status has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createShipmentMutation = useMutation({
    mutationFn: async (shipment: CreateShipmentInput) => {
      const { error } = await supabase.from("shipments").insert([shipment as any]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
      toast({
        title: "Shipment created",
        description: "New shipment has been added successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    shipments,
    isLoading,
    updateStatus: updateStatusMutation.mutate,
    createShipment: createShipmentMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
    isCreating: createShipmentMutation.isPending,
  };
};
