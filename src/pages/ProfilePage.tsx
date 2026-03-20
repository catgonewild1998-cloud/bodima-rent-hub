import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, FileText, Heart, Settings, Pencil, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const tabs = [
  { id: "profile", label: "Edit Profile", icon: User },
  { id: "ads", label: "My Ads", icon: FileText },
  { id: "requests", label: "My Requests", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

const ProfilePage = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState<{ full_name: string; email: string; phone: string } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) setProfile({ full_name: data.full_name || "", email: data.email || "", phone: data.phone || "" });
        });
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || !user) return null;

  const inputClass = "h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <Layout>
      <div className="container max-w-4xl py-8">
        {/* Avatar */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-3">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted text-2xl font-bold text-muted-foreground">
              {(profile?.full_name || user.email || "U").charAt(0).toUpperCase()}
            </div>
          </div>
          <h1 className="text-xl text-muted-foreground">
            Hello! <span className="font-bold text-foreground">{profile?.full_name || user.email}</span>
          </h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div className="space-y-8 animate-fade-in">
            <section className="rounded-xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between rounded-t-xl bg-primary px-4 py-3">
                <div>
                  <h2 className="font-bold text-primary-foreground">Contact Information</h2>
                  <p className="text-xs text-primary-foreground/70">Your account details.</p>
                </div>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Full Name</label>
                  <input className={inputClass} defaultValue={profile?.full_name || ""} readOnly />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Email</label>
                  <input className={inputClass} defaultValue={profile?.email || user.email || ""} readOnly />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Phone</label>
                  <input className={inputClass} defaultValue={profile?.phone || ""} readOnly />
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "ads" && (
          <div className="animate-fade-in rounded-xl border border-border bg-card p-8 text-center shadow-sm">
            <FileText className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">No Ads Yet</h3>
            <p className="text-sm text-muted-foreground">Start by posting your first property ad</p>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="animate-fade-in rounded-xl border border-border bg-card p-8 text-center shadow-sm">
            <Heart className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">No Requests Yet</h3>
            <p className="text-sm text-muted-foreground">Your property requests will appear here</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="animate-fade-in space-y-4">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-foreground">Account</h3>
              <p className="mb-4 text-sm text-muted-foreground">Manage your account settings</p>
              <Button variant="destructive" onClick={handleSignOut} className="gap-2">
                <LogOut className="h-4 w-4" /> Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
