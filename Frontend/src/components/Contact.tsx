import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, MessageCircle, Send } from "lucide-react";

const WHATSAPP_NUMBER = "919108497044";
const BREVO_ENDPOINT = (import.meta.env.VITE_BREVO_FORM_ENDPOINT as string | undefined) ?? "/api/contact";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    setIsSubmitting(true);
    try {
      const response = await fetch(BREVO_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });

      if (!response.ok) {
        throw new Error("Unable to send message");
      }

      setStatus({ type: "success", text: "Message sent successfully. I will get back to you soon." });
      setName("");
      setEmail("");
      setMessage("");
      setCompany("");
    } catch {
      setStatus({
        type: "error",
        text: "Message could not be sent right now. Please try WhatsApp or email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Let&apos;s Build Something Great
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="glass-card flex flex-col justify-between"
          >
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Prefer a quick conversation? Reach out directly on WhatsApp for faster coordination.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium transition-shadow hover:shadow-lg"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-8 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail size={14} />
                ap7497493@gmail.com
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            onSubmit={handleSubmit}
            className="glass-card space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-border bg-white/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-border bg-white/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={5}
                className="w-full rounded-xl border border-border bg-white/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none focus:ring-2 focus:ring-primary/40"
                placeholder="Tell me about your project..."
              />
            </div>
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              className="hidden"
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <p
                className={`text-sm ${
                  status.type === "success" ? "text-primary" : "text-destructive"
                }`}
              >
                {status.text}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
