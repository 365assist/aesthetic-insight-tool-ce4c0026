-- Add variant_id column to products table to store Shopify variant IDs
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS variant_id text;