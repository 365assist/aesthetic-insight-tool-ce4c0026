-- Fix products table RLS policies to restrict modifications to admin only

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;

-- Create admin-only policies for product modifications
CREATE POLICY "Admins can insert products" ON products
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update products" ON products
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Keep the public read policy as-is (anyone can view products)
-- "Anyone can view products" policy remains unchanged