import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

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

// Validation schema for shipment creation
const createShipmentSchema = z.object({
  tracking_number: z.string().min(1, "Tracking number is required").max(100),
  part_name: z.string().min(1, "Part name is required").max(255),
  part_description: z.string().max(1000).nullable().optional(),
  customer_name: z.string().max(255).nullable().optional(),
  customer_email: z.string().email("Invalid email format").nullable().optional(),
  carrier: z.string().max(100).nullable().optional(),
  status: z.enum(['pending', 'in_transit', 'delivered', 'delayed', 'cancelled']),
  order_date: z.string().optional(),
  estimated_delivery_date: z.string().nullable().optional(),
  current_location: z.string().max(255).nullable().optional(),
  notes: z.string().max(2000).nullable().optional(),
});

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
      // Validate input before sending to database
      const validated = createShipmentSchema.parse(shipment);
      
      const { error } = await supabase.from("shipments").insert([validated as any]);
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
