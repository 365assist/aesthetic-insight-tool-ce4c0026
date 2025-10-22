-- Add variant_id column to products table to store Shopify variant IDs
ALTER TABLE products ADD COLUMN IF NOT EXISTS variant_id TEXT;