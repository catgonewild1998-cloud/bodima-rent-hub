import { useState } from "react";
import { Phone, Mail, X, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Property } from "@/data/properties";

interface TenantRequestPayload {
  propertyId: string;
  name: string;
  phone: string;
  email: string;
  employmentStatus: string;
  phoneVerified: boolean;
  createdAt: string;
}

type ModalStep = "form" | "verifying" | "verified" | "success";

interface RequestModalProps {
  property: Property;
  open: boolean;
  onClose: () => void;
}

export function RequestModal({ property, open, onClose }: RequestModalProps) {
  const [step, setStep] = useState<ModalStep>("form");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", status: "" });
  const [pendingRequest, setPendingRequest] = useState<TenantRequestPayload | null>(null);

  if (!open) return null;

  const handleClose = () => {
    setStep("form");
    setFormData({ name: "", phone: "", email: "", status: "" });
    setPendingRequest(null);
    onClose();
  };

  const handleVerify = () => {
    if (!formData.phone) return;
    setStep("verifying");
    // Simulate phone verification
    setTimeout(() => setStep("verified"), 1500);
  };

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Prepare payload for future tenant_requests table
    const payload: TenantRequestPayload = {
      propertyId: property.id,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      employmentStatus: formData.status,
      phoneVerified: true,
      createdAt: new Date().toISOString(),
    };
    setPendingRequest(payload);
    console.log("[Backend Prep] tenant_requests payload:", payload);
    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={handleClose}>
      <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <X className="h-4 w-4" />
        </button>

        {/* Branding */}
        <div className="mb-1 flex items-center gap-2 text-sm font-bold text-primary">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-xs text-primary-foreground">B</div>
          Bodima.lk
        </div>

        {step !== "success" ? (
          <>
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
                  <div className="flex gap-2">
                    <input
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(071 2 891 275)"
                      className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {step === "form" && (
                      <Button type="button" variant="outline" size="sm" className="h-9 shrink-0 text-xs" onClick={handleVerify} disabled={!formData.phone}>
                        Verify
                      </Button>
                    )}
                    {step === "verifying" && (
                      <div className="flex h-9 items-center gap-1 text-xs text-muted-foreground">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                      </div>
                    )}
                    {step === "verified" && (
                      <div className="flex h-9 items-center gap-1 text-xs text-green-600">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
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
              <Button variant="cta" type="submit" className="w-full" disabled={step !== "verified"}>
                Request
              </Button>
              {step === "form" && (
                <p className="text-center text-xs text-muted-foreground">Verify your phone number to enable the request button.</p>
              )}
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-7 w-7 text-green-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">Contact Information</h2>
            <p className="mb-1 text-lg font-bold text-primary">{property.owner}</p>
            <p className="mb-4 text-sm text-muted-foreground">owns 14 properties</p>
            <div className="flex items-center justify-center gap-3">
              <a
                href={`tel:${property.ownerPhone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5"
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
  );
}
