import { Link, useLocation } from "react-router-dom";
import { Home, Search, MapPin, Phone, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", to: "/", icon: Home },
  { label: "All Ads", to: "/search", icon: Search },
  { label: "Find Here", to: "/search", icon: MapPin },
  { label: "Contact Us", to: "/contact", icon: Phone },
  { label: "Account", to: "/profile", icon: User },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Home className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Bodima.lk</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>

        <Link to="/post-ad">
          <Button variant="cta" size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Post a Free Ad
          </Button>
        </Link>
      </div>
    </nav>
  );
}
