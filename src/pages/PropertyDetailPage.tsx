import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Star, BedDouble, Bath, Car, Building2, Ruler, Layers, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { RequestModal } from "@/components/RequestModal";
import { ContactModal } from "@/components/ContactModal";
import { fetchPropertyById, fetchProperties, type Property } from "@/data/properties";
import placeholderImg from "/placeholder.svg";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [similar, setSimilar] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchPropertyById(id).then((p) => {
      setProperty(p);
      if (p) {
        fetchProperties({ location: p.location }).then((all) => {
          setSimilar(all.filter((x) => x.id !== p.id).slice(0, 4));
        });
      }
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Property not found</h1>
        </div>
      </Layout>
    );
  }

  const propertyImages = property.images && property.images.length > 0 ? property.images : [placeholderImg];

  return (
    <Layout>
      <div className="container py-8">
        <p className="mb-2 text-xs text-muted-foreground">
          <Link to="/search" className="hover:text-primary">All Properties</Link> &gt; {property.type} &gt; {property.location}
        </p>

        <h1 className="mb-1 text-2xl font-bold text-foreground">{property.title} – {property.location}</h1>
        <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" />{property.rating ?? 0}</span>
          <span>|</span>
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-primary" />{property.location}</span>
        </div>

        {/* Image Gallery */}
        <div className="mb-6 grid gap-2 md:grid-cols-[2fr_1fr]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
            <img src={propertyImages[selectedImage] || placeholderImg} alt={property.title} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {propertyImages.slice(1, 4).map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i + 1)} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold text-primary">Rs. {property.price?.toLocaleString()}<span className="text-base font-normal text-muted-foreground"> (per month)</span></p>
            <p className="text-sm text-muted-foreground">
              <BedDouble className="mr-1 inline h-4 w-4" />Rooms: {property.rooms ?? 0} | <Bath className="mr-1 inline h-4 w-4" />Baths: {property.baths ?? 0} | Rented by <button onClick={() => setShowContactModal(true)} className="text-foreground underline">{property.owner_name}</button>
            </p>
          </div>
          <Button variant="cta" onClick={() => setShowRequestModal(true)} className="gap-2">
            Request to Rent
          </Button>
        </div>

        {/* About */}
        <div className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-foreground">About this property</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">{property.description}</p>
        </div>

        {/* Details Grid */}
        <div className="mb-8 rounded-xl border border-border bg-primary/5 p-6">
          <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Property Type", value: property.type },
              { label: "Payment Duration", value: property.payment_duration ?? "Monthly" },
              { label: "Furnishing Status", value: property.furnishing ?? "N/A" },
              { label: "Availability", value: property.availability ?? "N/A" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-semibold text-primary">{value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: BedDouble, label: "Bedroom", value: `0${property.rooms ?? 0}` },
              { icon: Bath, label: "Bathroom", value: `0${property.baths ?? 0}` },
              { icon: Car, label: "Vehicle Parking", value: "Available" },
              { icon: Building2, label: "No. of Floors", value: `0${property.floors ?? 1}` },
              { icon: Layers, label: "Beds", value: `0${property.beds ?? 0}` },
              { icon: Ruler, label: "Floor area", value: property.floor_area ?? "N/A" },
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
        {similar.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-foreground">Similar properties on location</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          </section>
        )}
      </div>

      <RequestModal property={property} open={showRequestModal} onClose={() => setShowRequestModal(false)} />
      <ContactModal property={property} open={showContactModal} onClose={() => setShowContactModal(false)} />
    </Layout>
  );
};

export default PropertyDetailPage;
