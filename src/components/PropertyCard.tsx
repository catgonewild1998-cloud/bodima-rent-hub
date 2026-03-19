import { MapPin, BedDouble, Bath, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Property } from "@/data/properties";
import placeholderImg from "/placeholder.svg";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const {
    id, title, location, price, images, rooms, baths, rating, featured,
  } = property;

  const image = images && images.length > 0 ? images[0] : placeholderImg;

  return (
    <Link
      to={`/property/${id}`}
      className="group relative rounded-xl border border-border bg-card p-2 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {featured && (
          <span className="absolute right-2 top-2 rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
            Featured
          </span>
        )}
        {rating !== null && rating !== undefined && (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-background/90 px-1.5 py-0.5 text-xs font-semibold text-foreground shadow-sm">
            <Star className="h-3 w-3 fill-primary text-primary" />
            {rating}
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          Rs. {price?.toLocaleString()} <span className="text-muted-foreground font-normal normal-case">/mo</span>
        </p>
        <h3 className="mt-1 text-sm font-semibold text-foreground line-clamp-1">{title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 text-primary" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><BedDouble className="h-3 w-3" />{rooms ?? 0}</span>
            <span className="flex items-center gap-1"><Bath className="h-3 w-3" />{baths ?? 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
