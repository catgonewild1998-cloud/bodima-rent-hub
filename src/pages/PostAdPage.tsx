import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { propertyTypes } from "@/data/properties";

const amenityCategories = {
  "Bills Including": ["Water", "Electricity"],
  "Property Details": ["Stand by generator", "Parapet wall", "Roller Gate", "Roof top", "Tiled Floor", "Balcony"],
  "General amenities": ["WIFI", "Internet", "TV", "Air conditioning", "Fan", "Private entrance"],
  "Other amenities": ["Wardrobe", "Cloth hook", "Extra cushion", "Gas stove", "Toilet paper"],
  "Security & Safety": ["Security system", "Home security system", "24 hour security"],
  "Room Features": ["Rack", "Fridge", "Cooker", "Hot water", "WIFI", "Ceilings"],
};

const PostAdPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    listedFor: "",
    price: "",
    paymentDuration: "Monthly",
    rentedBy: "",
    contactNumber: "",
    email: "",
    propertyStatus: "",
    furnishingStatus: "",
    address: "",
    city: "",
    bedrooms: 0,
    beds: 0,
    kitchen: 0,
    bathrooms: 0,
    selectedAmenities: [] as string[],
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter((a) => a !== amenity)
        : [...prev.selectedAmenities, amenity],
    }));
  };

  const CounterInput = ({ label, value, field }: { label: string; value: number; field: string }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <button onClick={() => updateField(field, Math.max(0, value - 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">-</button>
        <span className="w-6 text-center text-sm text-foreground">{value}</span>
        <button onClick={() => updateField(field, value + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">+</button>
      </div>
    </div>
  );

  const progressWidth = step === 1 ? "50%" : "100%";

  return (
    <Layout>
      <div className="container max-w-3xl py-8">
        <h1 className="mb-6 text-2xl font-bold text-primary">Post Your Ad</h1>

        {/* Progress */}
        <div className="mb-8 h-1 w-full rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: progressWidth }} />
        </div>

        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            {/* Property Description */}
            <section>
              <div className="mb-4 rounded-lg bg-primary px-4 py-2">
                <h2 className="font-bold text-primary-foreground">Property Description</h2>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">This description will appear first in page. Keeping it nice & brief overview makes it easier to read.</p>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Title</label>
                  <input value={formData.title} onChange={(e) => updateField("title", e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Description</label>
                  <textarea value={formData.description} onChange={(e) => updateField("description", e.target.value)} rows={4} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Property Type</label>
                    <select value={formData.propertyType} onChange={(e) => updateField("propertyType", e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="">Select type</option>
                      {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Listed For</label>
                    <select value={formData.listedFor} onChange={(e) => updateField("listedFor", e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Couple">Couple</option>
                      <option value="Family">Family</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Price */}
            <section>
              <div className="mb-4 rounded-lg bg-primary px-4 py-2">
                <h2 className="font-bold text-primary-foreground">Property Price</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Price in Rs</label>
                  <input value={formData.price} onChange={(e) => updateField("price", e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Payment Duration</label>
                  <div className="flex gap-4">
                    {["Monthly", "Quarterly", "Yearly"].map((d) => (
                      <label key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="radio" name="duration" checked={formData.paymentDuration === d} onChange={() => updateField("paymentDuration", d)} className="accent-primary" /> {d}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Owner */}
            <section>
              <div className="mb-4 rounded-lg bg-primary px-4 py-2">
                <h2 className="font-bold text-primary-foreground">Property Owner Details</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Rented by</label>
                  <input value={formData.rentedBy} onChange={(e) => updateField("rentedBy", e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Contact Number</label>
                  <input value={formData.contactNumber} onChange={(e) => updateField("contactNumber", e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
                  <input value={formData.email} onChange={(e) => updateField("email", e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
            </section>

            {/* Location */}
            <section>
              <div className="mb-4 rounded-lg bg-primary px-4 py-2">
                <h2 className="font-bold text-primary-foreground">Location</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Address</label>
                  <textarea value={formData.address} onChange={(e) => updateField("address", e.target.value)} rows={2} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">City</label>
                  <input value={formData.city} onChange={(e) => updateField("city", e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
            </section>

            {/* Facilities */}
            <section>
              <div className="mb-4 rounded-lg bg-primary px-4 py-2">
                <h2 className="font-bold text-primary-foreground">Facilities</h2>
              </div>
              <div className="space-y-4">
                <CounterInput label="Bedroom" value={formData.bedrooms} field="bedrooms" />
                <CounterInput label="Beds" value={formData.beds} field="beds" />
                <CounterInput label="Kitchen" value={formData.kitchen} field="kitchen" />
                <CounterInput label="Bathroom" value={formData.bathrooms} field="bathrooms" />
              </div>
            </section>

            <Button variant="hero" onClick={() => setStep(2)} className="w-full">
              Save and Proceed
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-fade-in">
            {/* Images */}
            <section>
              <div className="mb-4 rounded-lg bg-primary px-4 py-2">
                <h2 className="font-bold text-primary-foreground">Add Images</h2>
              </div>
              <p className="mb-3 text-xs text-muted-foreground">You can select multiple images to upload at one time (Image size should be lower than 5mb, Can Upload up to 10 images)</p>
              <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/30">
                <p className="text-sm text-muted-foreground">Click or drag to upload images</p>
              </div>
            </section>

            {/* Amenities */}
            <section>
              <div className="mb-4 rounded-lg bg-primary px-4 py-2">
                <h2 className="font-bold text-primary-foreground">Features / Amenities</h2>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">Select what features apply for your property.</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(amenityCategories).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="mb-2 text-sm font-bold text-foreground">{category}</h3>
                    <div className="space-y-1.5">
                      {items.map((item) => (
                        <label key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input
                            type="checkbox"
                            checked={formData.selectedAmenities.includes(item)}
                            onChange={() => toggleAmenity(item)}
                            className="h-4 w-4 rounded border-border accent-primary"
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button variant="hero" className="flex-1">Save and Proceed</Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PostAdPage;
