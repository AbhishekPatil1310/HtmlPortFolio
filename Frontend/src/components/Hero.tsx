import { motion } from "framer-motion";
import { Download, Github, Globe, Code2, Database, Cpu, Layers, Terminal, Box } from "lucide-react";

const Hero = () => {
  // Define icons for the floating background
  const floatingIcons = [
    { Icon: Code2, top: "15%", left: "10%", delay: 0, size: 40 },
    { Icon: Database, top: "65%", left: "15%", delay: 2, size: 55 },
    { Icon: Cpu, top: "25%", left: "80%", delay: 4, size: 50 },
    { Icon: Layers, top: "75%", left: "75%", delay: 1, size: 45 },
    { Icon: Terminal, top: "45%", left: "85%", delay: 3, size: 60 },
    { Icon: Box, top: "10%", left: "60%", delay: 5, size: 35 },
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center section-container relative overflow-hidden">
      
      {/* --- Brighter Floating Icons Background Layer --- */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2], // Brighter visibility
              y: [0, -30, 0], 
              x: [0, 15, 0] 
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: item.top,
              left: item.left,
              // Adding a subtle glow effect to make them "brighter"
              filter: "drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.4))",
            }}
            className="text-primary hidden sm:block"
          >
            <item.Icon size={item.size} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      {/* Background Gradient Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-medium mb-4 text-sm tracking-widest uppercase"
          >
            Full-Stack Developer
          </motion.p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            Abhishek Patil
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
            Specializing in <span className="text-foreground font-medium">MERN</span>,{" "}
            <span className="text-foreground font-medium">Python (FastAPI)</span>, and{" "}
            <span className="text-foreground font-medium">PostgreSQL</span>. Building scalable
            web applications with clean architecture.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              href="/Abhishek_Patil_Resume.pdf"
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium transition-shadow hover:shadow-lg"
            >
              <Download size={16} />
              Download CV
            </motion.a>

            <motion.a
              href="https://github.com/AbhishekPatil1310"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 glass-card px-5 py-3 rounded-full text-sm font-medium text-foreground"
            >
              <Github size={16} />
              GitHub
            </motion.a>

            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 glass-card px-5 py-3 rounded-full text-sm font-medium text-foreground"
            >
              <Globe size={16} />
              Portfolio
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;