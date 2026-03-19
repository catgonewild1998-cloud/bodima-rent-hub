import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { fetchProperties, cities, categories, propertyTypes, type Property } from "@/data/properties";
import heroBg from "@/assets/hero-bg.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetchProperties().then(setProperties).catch(console.error);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (category) params.set("category", category);
    if (type) params.set("type", type);
    navigate(`/search?${params.toString()}`);
  };

  const featuredProperties = properties.filter((p) => p.featured);
  const latestProperties = properties.slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative flex min-h-[520px] items-end justify-center overflow-hidden pb-20">
        <img src={heroBg} alt="Luxury apartment" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="relative z-10 w-full max-w-3xl px-4 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Find your next home in Sri Lanka.
          </h1>
          <p className="mb-8 text-muted-foreground">Premium rentals, verified landlords, zero hassle.</p>
          <div className="flex flex-col gap-0 rounded-xl border border-border bg-background p-1.5 shadow-lg md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-2 px-3 py-2">
              <MapPin className="h-4 w-4 text-primary" />
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-transparent text-sm text-foreground outline-none">
                <option value="">Location</option>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="hidden h-8 w-px bg-border md:block" />
            <div className="flex flex-1 items-center gap-2 px-3 py-2">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-transparent text-sm text-foreground outline-none">
                <option value="">Category</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="hidden h-8 w-px bg-border md:block" />
            <div className="flex flex-1 items-center gap-2 px-3 py-2">
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-transparent text-sm text-foreground outline-none">
                <option value="">Property Type</option>
                {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <Button variant="cta" onClick={handleSearch} className="m-1 gap-2">
              <Search className="h-4 w-4" /> Search
            </Button>
          </div>
        </div>
      </section>

      {/* Discover Cities */}
      <section className="container py-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Let's Discover</h2>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {cities.map((city) => (
            <button key={city} onClick={() => navigate(`/search?location=${city}`)} className="group flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-muted transition-all group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{city}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Featured Properties</h2>
          <button onClick={() => navigate("/search")} className="flex items-center gap-1 text-sm text-primary hover:underline">View all <ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProperties.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      </section>

      {/* Latest */}
      <section className="container pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Latest Discovers</h2>
          <button onClick={() => navigate("/search")} className="flex items-center gap-1 text-sm text-primary hover:underline">View all <ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {latestProperties.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
