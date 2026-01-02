-- Fix function search path for generate_registration_number
CREATE OR REPLACE FUNCTION public.generate_registration_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.registration_number := 'REG-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$;

-- Fix function search path for update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create storage bucket for registration documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('registration-documents', 'registration-documents', false);

-- Create storage bucket for gallery
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true);

-- RLS policies for registration-documents bucket
CREATE POLICY "Anyone can upload registration documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'registration-documents');

CREATE POLICY "Admins can view all registration documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'registration-documents' AND public.has_role(auth.uid(), 'admin'));

-- RLS policies for gallery bucket  
CREATE POLICY "Anyone can view gallery images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Admins can manage gallery" ON storage.objects
  FOR ALL USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));