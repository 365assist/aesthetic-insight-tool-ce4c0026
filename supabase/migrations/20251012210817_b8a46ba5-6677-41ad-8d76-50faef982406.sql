-- Create shipments table for tracking replacement parts
CREATE TABLE public.shipments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_number text NOT NULL UNIQUE,
  part_name text NOT NULL,
  part_description text,
  status text NOT NULL DEFAULT 'pending',
  current_location text,
  carrier text,
  estimated_delivery_date timestamp with time zone,
  actual_delivery_date timestamp with time zone,
  order_date timestamp with time zone NOT NULL DEFAULT now(),
  customer_name text,
  customer_email text,
  notes text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;

-- Employees and admins can view all shipments
CREATE POLICY "Employees can view all shipments"
ON public.shipments
FOR SELECT
USING (
  has_role(auth.uid(), 'employee'::app_role) OR 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Admins can insert shipments
CREATE POLICY "Admins can create shipments"
ON public.shipments
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update shipments
CREATE POLICY "Admins can update shipments"
ON public.shipments
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete shipments
CREATE POLICY "Admins can delete shipments"
ON public.shipments
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_shipments_updated_at
BEFORE UPDATE ON public.shipments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_shipments_status ON public.shipments(status);
CREATE INDEX idx_shipments_tracking_number ON public.shipments(tracking_number);