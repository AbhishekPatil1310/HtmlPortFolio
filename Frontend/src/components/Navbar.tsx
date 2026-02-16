import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "#hero", type: "section" as const },
  { label: "Skills", href: "#skills", type: "section" as const },
  { label: "Experience", href: "#experience", type: "section" as const },
  { label: "Projects", href: "#projects", type: "section" as const },
  { label: "Services", href: "/services", type: "route" as const },
  { label: "Contact", href: "#contact", type: "section" as const },
  { label: "Education", href: "#education", type: "section" as const },
];

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHomePage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems
      .filter((item) => item.type === "section")
      .forEach(({ href }) => {
        const el = document.querySelector(href);
        if (el) observer.observe(el);
      });

    return () => observer.disconnect();
  }, [isHomePage]);

  const resolveHref = (item: (typeof navItems)[number]) => {
    if (item.type === "route") return item.href;
    return isHomePage ? item.href : `/${item.href}`;
  };

  const isItemActive = (item: (typeof navItems)[number]) => {
    if (item.type === "route") return location.pathname === item.href;
    return isHomePage && active === item.href;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between">
        <a href={isHomePage ? "#hero" : "/"} className="text-lg font-semibold text-foreground tracking-tight">
          AP<span className="text-primary">.</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={resolveHref(item)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isItemActive(item) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass mt-2 mx-4 rounded-2xl p-4"
        >
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={resolveHref(item)}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium ${
                    isItemActive(item) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
