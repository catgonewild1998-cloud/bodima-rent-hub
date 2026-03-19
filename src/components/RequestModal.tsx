import { useState } from "react";
import { Phone, Mail, X, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { insertTenantRequest, type Property } from "@/data/properties";

type ModalStep = "form" | "verifying" | "verified" | "submitting" | "success";

interface RequestModalProps {
  property: Property;
  open: boolean;
  onClose: () => void;
}

export function RequestModal({ property, open, onClose }: RequestModalProps) {
  const [step, setStep] = useState<ModalStep>("form");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", status: "" });
  const [error, setError] = useState("");

  if (!open) return null;

  const handleClose = () => {
    setStep("form");
    setFormData({ name: "", phone: "", email: "", status: "" });
    setError("");
    onClose();
  };

  const handleVerify = () => {
    if (!formData.phone) return;
    setStep("verifying");
    setTimeout(() => setStep("verified"), 1500);
  };

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("submitting");
    setError("");
    try {
      await insertTenantRequest({
        property_id: property.id,
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        employment_status: formData.status || undefined,
        phone_verified: true,
      });
      setStep("success");
    } catch (err: any) {
      console.error("Failed to submit request:", err);
      setError(err.message || "Failed to submit request");
      setStep("verified");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={handleClose}>
      <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <X className="h-4 w-4" />
        </button>

        <div className="mb-1 flex items-center gap-2 text-sm font-bold text-primary">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-primary text-xs text-primary-foreground">B</div>
          Bodima.lk
        </div>

        {step !== "success" ? (
          <>
            <h2 className="mb-1 text-2xl font-bold text-foreground">Request Property</h2>
            <p className="mb-6 text-sm text-muted-foreground">Please enter your name and mobile number to proceed.</p>

            {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

            <form onSubmit={handleRequest} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">Name</label>
                  <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">Mobile Number</label>
                  <div className="flex gap-2">
                    <input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(071 2 891 275)" className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    {step === "form" && (
                      <Button type="button" variant="outline" size="sm" className="h-9 shrink-0 text-xs" onClick={handleVerify} disabled={!formData.phone}>Verify</Button>
                    )}
                    {step === "verifying" && <div className="flex h-9 items-center"><Loader2 className="h-3.5 w-3.5 animate-spin text-primary" /></div>}
                    {(step === "verified" || step === "submitting") && <div className="flex h-9 items-center text-green-600"><CheckCircle className="h-3.5 w-3.5" /></div>}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">Email (Optional)</label>
                  <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email@email.com" className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">Employment Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="">Select Status</option>
                    <option value="student">Student</option>
                    <option value="employed">Employed</option>
                    <option value="self-employed">Self-employed</option>
                  </select>
                </div>
              </div>
              <Button variant="cta" type="submit" className="w-full" disabled={step !== "verified"}>
                {step === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Request"}
              </Button>
              {step === "form" && <p className="text-center text-xs text-muted-foreground">Verify your phone number to enable the request button.</p>}
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-7 w-7 text-green-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">Contact Information</h2>
            <p className="mb-1 text-lg font-bold text-primary">{property.owner_name}</p>
            <p className="mb-4 text-sm text-muted-foreground">Property Owner</p>
            <div className="flex items-center justify-center gap-3">
              <a href={`tel:${property.owner_phone.replace(/\s/g, "")}`} className="flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5">
                <Phone className="h-4 w-4" /> {property.owner_phone}
              </a>
              {property.owner_email && (
                <a href={`mailto:${property.owner_email}`} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
