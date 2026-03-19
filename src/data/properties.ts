import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

// Re-export the DB row type as Property for the app
export type Property = Tables<"properties">;

// Static filter options
export const cities = ["Colombo", "Galle", "Kandy", "Trincomalee", "Negombo", "Anuradhapura", "Kotte"];
export const categories = ["Male", "Female", "Couple", "Family"];
export const propertyTypes = ["Annex", "Apartment", "Full House", "Hostel", "Shared Room"];

// Fetch all approved properties
export async function fetchProperties(filters?: {
  location?: string;
  category?: string;
  type?: string;
  bedrooms?: number;
  bathrooms?: number;
}) {
  let query = supabase.from("properties").select("*");

  if (filters?.location) {
    query = query.ilike("location", `%${filters.location}%`);
  }
  if (filters?.category) {
    query = query.eq("category", filters.category);
  }
  if (filters?.type) {
    query = query.eq("type", filters.type);
  }
  if (filters?.bedrooms && filters.bedrooms > 0) {
    query = query.gte("rooms", filters.bedrooms);
  }
  if (filters?.bathrooms && filters.bathrooms > 0) {
    query = query.gte("baths", filters.bathrooms);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// Fetch single property by ID
export async function fetchPropertyById(id: string) {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// Insert a new property
export async function insertProperty(property: {
  title: string;
  description?: string;
  location: string;
  address?: string;
  city?: string;
  price: number;
  payment_duration?: string;
  category: string;
  type: string;
  rooms?: number;
  baths?: number;
  beds?: number;
  floors?: number;
  floor_area?: string;
  furnishing?: string;
  amenities?: string[];
  images?: string[];
  owner_name: string;
  owner_phone: string;
  owner_email?: string;
}) {
  const { data, error } = await supabase
    .from("properties")
    .insert({ ...property, is_approved: false })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Insert a tenant request
export async function insertTenantRequest(request: {
  property_id: string;
  name: string;
  phone: string;
  email?: string;
  employment_status?: string;
  phone_verified?: boolean;
}) {
  const { data, error } = await supabase
    .from("tenant_requests")
    .insert(request)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Upload property image to storage
export async function uploadPropertyImage(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("property-images")
    .upload(fileName, file);
  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("property-images")
    .getPublicUrl(fileName);
  return urlData.publicUrl;
}
