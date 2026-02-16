import { motion } from "framer-motion";
import { ArrowRight, Check, Database, Layers, LockKeyhole, ServerCog } from "lucide-react";
import Navbar from "@/components/Navbar";

interface ServiceItem {
  title: string;
  icon: typeof ServerCog;
  deliverables: string[];
  pricing: string[];
}

const services: ServiceItem[] = [
  {
    title: "Backend Development",
    icon: ServerCog,
    deliverables: [
      "Node.js + Express API development",
      "RESTful architecture design",
      "Prisma ORM with PostgreSQL",
      "JWT authentication systems",
      "Role-based access control",
      "Secure API integrations",
    ],
    pricing: ["Starting from: INR 8,000 - INR 25,000 per project", "INR 700 - INR 1,200 per hour"],
  },
  {
    title: "Database Design and Optimization",
    icon: Database,
    deliverables: [
      "Clean relational schema design",
      "Performance-focused query optimization",
      "Indexing strategy",
      "Data modeling for scalable systems",
    ],
    pricing: ["Starting from: INR 5,000 - INR 15,000 per project"],
  },
  {
    title: "Authentication and Secure Systems",
    icon: LockKeyhole,
    deliverables: [
      "JWT-based authentication",
      "Secure login and register flows",
      "Access control layers",
      "Token validation and middleware",
    ],
    pricing: ["Starting from: INR 4,000 - INR 12,000 per project"],
  },
  {
    title: "Full Stack MVP Development",
    icon: Layers,
    deliverables: [
      "Complete web application (frontend + backend)",
      "API integration",
      "Database setup",
      "Deployment (Render / Supabase / VPS)",
      "Basic scalability setup",
    ],
    pricing: ["Starting from: INR 20,000 - INR 60,000 per project"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute top-24 right-12 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-12 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />

        <section className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mb-10"
          >
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
              Services and Pricing
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Flexible Engagements for Product Teams and Startups
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Structured backend and full-stack services designed for reliability, performance, and
              production-ready delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="glass-card rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <service.icon size={18} className="text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{service.title}</h2>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3">What I Deliver</h3>
                  <ul className="space-y-2">
                    {service.deliverables.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                        <Check size={15} className="text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-secondary/70 border border-border px-4 py-3">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Pricing</h3>
                  <ul className="space-y-1">
                    {service.pricing.map((line) => (
                      <li key={line} className="text-sm text-muted-foreground">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 glass-card rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
          >
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Need a custom quote for your project?
              </h2>
              <p className="text-sm text-muted-foreground">
                Share your scope and timeline, and I will propose the most efficient delivery plan.
              </p>
            </div>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium transition-shadow hover:shadow-lg whitespace-nowrap"
            >
              Discuss Your Project
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Services;
