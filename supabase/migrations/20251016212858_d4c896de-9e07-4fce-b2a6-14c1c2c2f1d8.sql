-- Add DELETE policy for products table
CREATE POLICY "Admins can delete products"
ON public.products
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add INSERT policy for profiles table (defense in depth)
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add validation constraints to shipments table
ALTER TABLE public.shipments
ADD CONSTRAINT valid_customer_email 
CHECK (customer_email IS NULL OR customer_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.shipments
ADD CONSTRAINT valid_status
CHECK (status IN ('pending', 'in_transit', 'delivered', 'delayed', 'cancelled'));

ALTER TABLE public.shipments
ADD CONSTRAINT valid_tracking_number
CHECK (length(tracking_number) >= 1 AND length(tracking_number) <= 100);