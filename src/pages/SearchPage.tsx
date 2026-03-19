import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { fetchProperties, cities, categories, propertyTypes, type Property } from "@/data/properties";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [results, setResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const doSearch = () => {
    setLoading(true);
    fetchProperties({ location, category, type, bedrooms, bathrooms })
      .then(setResults)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    doSearch();
  }, []); // initial load with URL params

  return (
    <Layout>
      <div className="container py-8">
        <p className="mb-4 text-xs text-muted-foreground">
          All Properties {location && `> ${location}`} {type && `> ${type}`}
        </p>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="hidden w-64 shrink-0 space-y-6 lg:block">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">City or Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Area you need to search"
                className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(category === c ? "" : c)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      category === c
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Property Type</label>
              <div className="space-y-2">
                {propertyTypes.map((t) => (
                  <label key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" checked={type === t} onChange={() => setType(type === t ? "" : t)} className="h-4 w-4 rounded border-border accent-primary" />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Bedrooms</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setBedrooms(Math.max(0, bedrooms - 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">-</button>
                <span className="w-8 text-center text-sm text-foreground">{bedrooms}</span>
                <button onClick={() => setBedrooms(bedrooms + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">+</button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Bathrooms</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setBathrooms(Math.max(0, bathrooms - 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">-</button>
                <span className="w-8 text-center text-sm text-foreground">{bathrooms}</span>
                <button onClick={() => setBathrooms(bathrooms + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">+</button>
              </div>
            </div>

            <Button variant="cta" className="w-full gap-2" onClick={doSearch}>
              <Search className="h-4 w-4" /> Search
            </Button>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-xl font-bold text-foreground">
                Search result: <span className="text-primary">{loading ? "..." : `${results.length} properties found`}</span>
              </h1>
              <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>

            {!loading && results.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">No properties found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
