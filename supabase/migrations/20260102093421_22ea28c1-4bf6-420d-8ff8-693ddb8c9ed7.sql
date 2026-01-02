-- Add payment_proof_url column to registrations table
ALTER TABLE public.registrations 
ADD COLUMN payment_proof_url text;

-- Add comment explaining the field
COMMENT ON COLUMN public.registrations.payment_proof_url IS 'URL to payment proof document uploaded by parent';