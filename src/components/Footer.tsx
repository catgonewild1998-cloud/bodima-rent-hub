import { Link } from "react-router-dom";
import { Phone, Mail, Home } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Contact Details</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> 074 0 065 085</div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> 0705 065 085</div>
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> contact@bodima.lk</div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Quick Actions</h3>
            <div className="space-y-2 text-sm">
              <Link to="/profile" className="block text-muted-foreground hover:text-primary">Create a Account</Link>
              <Link to="/post-ad" className="block text-muted-foreground hover:text-primary">Post a Free Ad</Link>
              <Link to="/search" className="block text-muted-foreground hover:text-primary">View all Ads</Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Connect Social Media</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="#" className="block hover:text-primary">Facebook</a>
              <a href="#" className="block hover:text-primary">Instagram</a>
              <a href="#" className="block hover:text-primary">Telegram</a>
              <a href="#" className="block hover:text-primary">Whatsapp</a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Subscribe Newsletters</h3>
            <p className="mb-3 text-sm text-muted-foreground">Subscribe now for hand-picked properties straight to your inbox</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="h-9 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="h-9 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © 2026 Bodima.lk. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
