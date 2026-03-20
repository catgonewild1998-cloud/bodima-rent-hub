import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, MapPin, Phone, User, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", to: "/", icon: Home },
  { label: "All Ads", to: "/search", icon: Search },
  { label: "Find Here", to: "/search", icon: MapPin },
  { label: "Contact Us", to: "/contact", icon: Phone },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handlePostAd = () => {
    if (!user) {
      navigate("/auth");
    } else {
      navigate("/post-ad");
    }
  };

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
          <Link
            to={user ? "/profile" : "/auth"}
            className={`flex flex-col items-center gap-0.5 rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
              location.pathname === "/profile" || location.pathname === "/auth"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="h-4 w-4" />
            {user ? "Account" : "Login"}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <Button variant="ghost" size="sm" onClick={() => signOut()} className="gap-1 text-muted-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          )}
          <Button variant="cta" size="sm" className="gap-1.5" onClick={handlePostAd}>
            <Plus className="h-4 w-4" />
            Post a Free Ad
          </Button>
        </div>
      </div>
    </nav>
  );
}
