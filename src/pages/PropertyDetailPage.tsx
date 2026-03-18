import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Star, BedDouble, Bath, Car, Building2, Ruler, Layers, Phone, Mail, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/data/properties";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", status: "" });

  if (!property) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Property not found</h1>
        </div>
      </Layout>
    );
  }

  const similar = properties.filter((p) => p.id !== property.id).slice(0, 4);

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <p className="mb-2 text-xs text-muted-foreground">
          <Link to="/search" className="hover:text-primary">All Properties</Link> &gt; {property.type} &gt; {property.location}
        </p>

        <h1 className="mb-1 text-2xl font-bold text-primary">{property.title} – {property.location}</h1>
        <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" />{property.rating}</span>
          <span>|</span>
          <span>82 Reviews</span>
          <span>|</span>
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{property.location}</span>
        </div>

        {/* Image Gallery */}
        <div className="mb-6 grid gap-2 md:grid-cols-[2fr_1fr]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
            <img
              src={property.images[selectedImage]}
              alt={property.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10" />
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {property.images.slice(1, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i + 1)}
                className="relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10" />
                {i === 2 && property.images.length > 4 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 text-sm font-medium text-foreground">
                    See all photos
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold text-primary">{property.price}<span className="text-base font-normal text-muted-foreground"> (per month)</span></p>
            <p className="text-sm text-muted-foreground">
              <BedDouble className="mr-1 inline h-4 w-4" />Rooms: {property.rooms} | <Bath className="mr-1 inline h-4 w-4" />Baths: {property.baths} | Rented by <button onClick={() => setShowContactModal(true)} className="text-foreground underline">{property.owner}</button>
            </p>
          </div>
          <Button variant="hero" onClick={() => setShowRequestModal(true)} className="gap-2">
            Request
          </Button>
        </div>

        {/* About */}
        <div className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-foreground">About this property</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">{property.description}</p>
        </div>

        {/* Details Grid */}
        <div className="mb-8 rounded-xl border border-border bg-primary/10 p-6">
          <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Property Type</p>
              <p className="font-semibold text-primary">{property.propertyType}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Payment Duration</p>
              <p className="font-semibold text-primary">Monthly</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Furnishing Status</p>
              <p className="font-semibold text-primary">{property.furnishing}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Availability</p>
              <p className="font-semibold text-primary">{property.availability}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: BedDouble, label: "Bedroom", value: `0${property.rooms}` },
              { icon: Bath, label: "Bathroom", value: `0${property.baths}` },
              { icon: Car, label: "Vehicle Parking", value: "Available" },
              { icon: Building2, label: "No. of Floors", value: `0${property.floors}` },
              { icon: Layers, label: "Beds", value: `0${property.beds}` },
              { icon: Ruler, label: "Floor area", value: property.floorArea },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-semibold text-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar */}
        <section className="mb-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-primary">Similar properties on location</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((p) => (
              <PropertyCard key={p.id} {...p} />
            ))}
          </div>
        </section>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => { setShowRequestModal(false); setRequestSent(false); }}>
          <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { setShowRequestModal(false); setRequestSent(false); }} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <X className="h-4 w-4" />
            </button>

            {!requestSent ? (
              <>
                <div className="mb-1 flex items-center gap-2 text-sm font-bold text-primary">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-xs text-primary-foreground">B</div>
                  Bodima.lk
                </div>
                <h2 className="mb-1 text-2xl font-bold text-foreground">Request Property</h2>
                <p className="mb-6 text-sm text-muted-foreground">Please enter your name and mobile number to proceed.</p>

                <form onSubmit={handleRequest} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-foreground">Name</label>
                      <input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Name"
                        className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-foreground">Mobile Number</label>
                      <input
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(071 2 891 275)"
                        className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-foreground">Email (Optional)</label>
                      <input
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email@email.com"
                        className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-foreground">Employment Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select Status</option>
                        <option value="student">Student</option>
                        <option value="employed">Employed</option>
                        <option value="self-employed">Self-employed</option>
                      </select>
                    </div>
                  </div>
                  <Button variant="hero" type="submit" className="w-full">Request</Button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-1 flex items-center gap-2 text-sm font-bold text-primary">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-xs text-primary-foreground">B</div>
                  Bodima.lk
                </div>
                <h2 className="mb-2 text-2xl font-bold text-foreground">Contact Information</h2>
                <p className="mb-1 text-lg font-bold text-primary">{property.owner}</p>
                <p className="mb-4 text-sm text-muted-foreground">owns 14 properties</p>
                <div className="flex items-center justify-center gap-3">
                  <a
                    href={`tel:${property.ownerPhone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
                  >
                    <Phone className="h-4 w-4" />
                    {property.ownerPhone}
                  </a>
                  <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contact Info Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setShowContactModal(false)}>
          <div className="relative w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowContactModal(false)} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <X className="h-4 w-4" />
            </button>
            <p className="mb-1 text-lg font-bold text-primary">{property.owner}</p>
            <p className="mb-3 text-sm text-muted-foreground">owns 14 properties</p>
            <a
              href={`tel:${property.ownerPhone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
            >
              <Phone className="h-4 w-4" />
              {property.ownerPhone}
            </a>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PropertyDetailPage;
