import { useState } from "react";
import { User, FileText, Heart, Settings, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";

const tabs = [
  { id: "profile", label: "Edit Profile", icon: User },
  { id: "ads", label: "My Ads", icon: FileText },
  { id: "requests", label: "My Requests", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Layout>
      <div className="container max-w-4xl py-8">
        {/* Avatar */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-3">
            <div className="h-24 w-24 rounded-full bg-secondary" />
            <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
          <h1 className="text-xl text-muted-foreground">Hello! <span className="font-bold text-foreground">Abishek</span></h1>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex justify-center gap-2">
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
            {/* Contact Information */}
            <section className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between rounded-t-xl bg-primary px-4 py-3">
                <div>
                  <h2 className="font-bold text-primary-foreground">Contact Information</h2>
                  <p className="text-xs text-primary-foreground/70">Add your contact information.</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  <Pencil className="h-3 w-3" /> Edit
                </Button>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                {[
                  ["First Name", ""], ["Last Name", ""],
                  ["Gender", ""], ["Email", ""],
                  ["Phone", ""], ["Mobile", ""],
                  ["Title/Position", ""],
                ].map(([label]) => (
                  <div key={label}>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
                    <input className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                ))}
              </div>
            </section>

            {/* Social Media */}
            <section className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between rounded-t-xl bg-primary px-4 py-3">
                <div>
                  <h2 className="font-bold text-primary-foreground">Social Media</h2>
                  <p className="text-xs text-primary-foreground/70">Add your social media information.</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  <Pencil className="h-3 w-3" /> Edit
                </Button>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                {["Facebook", "Instagram", "Twitter", "Pinterest", "Linkedin"].map((label) => (
                  <div key={label}>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
                    <input className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                ))}
              </div>
            </section>

            {/* Password */}
            <section className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between rounded-t-xl bg-primary px-4 py-3">
                <div>
                  <h2 className="font-bold text-primary-foreground">Password</h2>
                  <p className="text-xs text-primary-foreground/70">Update your password.</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  <Pencil className="h-3 w-3" /> Edit
                </Button>
              </div>
              <div className="max-w-sm space-y-4 p-6">
                {["Current Password", "New Password", "Confirm Password"].map((label) => (
                  <div key={label}>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
                    <input type="password" className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "ads" && (
          <div className="animate-fade-in rounded-xl border border-border bg-card p-8 text-center">
            <FileText className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">No Ads Yet</h3>
            <p className="text-sm text-muted-foreground">Start by posting your first property ad</p>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="animate-fade-in rounded-xl border border-border bg-card p-8 text-center">
            <Heart className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">No Requests Yet</h3>
            <p className="text-sm text-muted-foreground">Your property requests will appear here</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="animate-fade-in rounded-xl border border-border bg-card p-8 text-center">
            <Settings className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Settings</h3>
            <p className="text-sm text-muted-foreground">Account settings coming soon</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
