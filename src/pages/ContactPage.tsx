import { Phone, Mail } from "lucide-react";
import { Layout } from "@/components/Layout";

const ContactPage = () => {
  return (
    <Layout>
      <div className="container max-w-2xl py-16 text-center">
        <h1 className="mb-8 text-3xl font-bold">
          <span className="text-primary">Contact</span>{" "}
          <span className="text-foreground">Us.</span>
        </h1>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="tel:0740065085"
            className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            <Phone className="h-4 w-4" />
            074 0 065 085
          </a>
          <a
            href="tel:0705065085"
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Phone className="h-4 w-4" />
            0705 065 085
          </a>
        </div>

        <a
          href="mailto:contact@bodima.lk"
          className="mx-auto mb-10 flex w-fit items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
        >
          <Mail className="h-4 w-4" />
          contact@bodima.lk
        </a>

        <div className="border-t border-border pt-6">
          <p className="mb-4 text-sm font-medium text-muted-foreground">Or Reach Us On</p>
          <div className="flex items-center justify-center gap-4">
            {["Facebook", "Instagram", "Telegram", "Whatsapp"].map((social) => (
              <a
                key={social}
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-sm font-bold text-primary transition-colors hover:bg-primary/10"
              >
                {social[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
