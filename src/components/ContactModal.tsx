import { Phone, X } from "lucide-react";
import type { Property } from "@/data/properties";

interface ContactModalProps {
  property: Property;
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ property, open, onClose }: ContactModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <X className="h-4 w-4" />
        </button>
        <p className="mb-1 text-lg font-bold text-primary">{property.owner}</p>
        <p className="mb-3 text-sm text-muted-foreground">owns 14 properties</p>
        <a href={`tel:${property.ownerPhone.replace(/\s/g, "")}`} className="flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5">
          <Phone className="h-4 w-4" />
          {property.ownerPhone}
        </a>
      </div>
    </div>
  );
}
