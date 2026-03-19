
-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  address TEXT,
  city TEXT,
  price NUMERIC NOT NULL,
  payment_duration TEXT DEFAULT 'Monthly',
  category TEXT NOT NULL, -- Male, Female, Couple, Family
  type TEXT NOT NULL, -- Annex, Apartment, Full House, Hostel, Shared Room
  rooms INTEGER DEFAULT 0,
  baths INTEGER DEFAULT 0,
  beds INTEGER DEFAULT 0,
  floors INTEGER DEFAULT 1,
  floor_area TEXT,
  furnishing TEXT DEFAULT 'Unfurnished',
  availability TEXT DEFAULT 'Available Now',
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  owner_name TEXT NOT NULL,
  owner_phone TEXT NOT NULL,
  owner_email TEXT,
  featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  rating NUMERIC DEFAULT 0,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Everyone can read approved properties
CREATE POLICY "Approved properties are viewable by everyone"
  ON public.properties FOR SELECT
  USING (is_approved = true);

-- Users can view their own unapproved properties
CREATE POLICY "Users can view own properties"
  ON public.properties FOR SELECT
  USING (auth.uid() = user_id);

-- Anyone can insert (user_id is optional for anonymous posts)
CREATE POLICY "Anyone can create properties"
  ON public.properties FOR INSERT
  WITH CHECK (true);

-- Users can update their own properties
CREATE POLICY "Users can update own properties"
  ON public.properties FOR UPDATE
  USING (auth.uid() = user_id);

-- Create tenant_requests table
CREATE TABLE public.tenant_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  employment_status TEXT,
  phone_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on tenant_requests
ALTER TABLE public.tenant_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can create a request
CREATE POLICY "Anyone can create tenant requests"
  ON public.tenant_requests FOR INSERT
  WITH CHECK (true);

-- Property owners can view requests for their properties
CREATE POLICY "Property owners can view requests"
  ON public.tenant_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.properties
      WHERE properties.id = tenant_requests.property_id
      AND properties.user_id = auth.uid()
    )
  );

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true);

-- Storage policies
CREATE POLICY "Property images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

CREATE POLICY "Anyone can upload property images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'property-images');

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
