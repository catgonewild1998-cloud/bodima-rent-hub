import { Phone, Mail, X } from "lucide-react";
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
        <h2 className="mb-4 text-xl font-bold text-foreground">Owner Contact</h2>
        <p className="mb-1 text-lg font-bold text-primary">{property.owner_name}</p>
        <div className="mt-4 flex flex-col gap-3">
          <a href={`tel:${property.owner_phone.replace(/\s/g, "")}`} className="flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5">
            <Phone className="h-4 w-4" /> {property.owner_phone}
          </a>
          {property.owner_email && (
            <a href={`mailto:${property.owner_email}`} className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <Mail className="h-4 w-4" /> {property.owner_email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
