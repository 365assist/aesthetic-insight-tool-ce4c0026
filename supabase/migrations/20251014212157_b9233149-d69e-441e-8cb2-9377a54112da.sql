-- Fix function search path security issue
CREATE OR REPLACE FUNCTION public.update_conversation_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.conversations
  SET updated_at = now()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;

-- Fix customer data exposure in shipments table
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Employees can view all shipments" ON public.shipments;

-- Create more restrictive policies
CREATE POLICY "Admins can view all shipments"
ON public.shipments
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Employees can view their own shipments"
ON public.shipments
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'employee') 
  AND created_by = auth.uid()
);