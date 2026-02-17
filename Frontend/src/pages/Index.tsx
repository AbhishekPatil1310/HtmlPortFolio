import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

const VISIT_ENDPOINT =
  (import.meta.env.VITE_VISIT_TRACK_ENDPOINT as string | undefined) ?? "/api/visits";
const VISITOR_ID_KEY = "portfolio_visitor_id_v1";
const VISITOR_TRACKED_KEY = "portfolio_visitor_tracked_v1";

function getOrCreateVisitorId() {
  try {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;

    const generated =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;

    localStorage.setItem(VISITOR_ID_KEY, generated);
    return generated;
  } catch {
    return "";
  }
}

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    try {
      if (localStorage.getItem(VISITOR_TRACKED_KEY) === "1") return;
    } catch {
      // Best effort only; continue without persistent dedupe.
    }

    const payload = {
      path: window.location.pathname,
      referrer: document.referrer || "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      locale: navigator.language || "",
      screen: `${window.screen.width}x${window.screen.height}`,
      visitorId: getOrCreateVisitorId(),
    };

    void fetch(VISIT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
      .then((response) => {
        if (response.ok) {
          try {
            localStorage.setItem(VISITOR_TRACKED_KEY, "1");
          } catch {
            // Ignore storage write failures.
          }
        }
      })
      .catch(() => {
        // Tracking should never block page rendering.
      });
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const element = document.getElementById(id);
    if (!element) return;

    requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TechStack />
      <Experience />
      <Projects />
      <Contact />
      <Education />
    </div>
  );
};

export default Index;
