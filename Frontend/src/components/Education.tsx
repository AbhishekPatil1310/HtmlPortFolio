import { motion } from "framer-motion";
import { GraduationCap, MapPin, Heart } from "lucide-react";

const Education = () => {
  return (
    <section id="education" className="section-padding bg-secondary/30 relative overflow-hidden">
      <div className="section-container">
        {/* Education Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
            Education
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Academic Background
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card max-w-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 shrink-0">
              <GraduationCap size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Bachelor of Technology in Computer Science Engineering
              </h3>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                <MapPin size={14} />
                M S Ramaiah University of Applied Sciences, Bengaluru
              </p>
              <p className="text-xs text-primary font-medium mt-2">
                August 2021 – June 2025
              </p>
            </div>
          </div>
        </motion.div>

        {/* --- Professional Closing Section --- */}
        <div className="mt-32 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Let's build the future together.
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto italic">
              "Technology is best when it brings people together."
            </p>
            <div className="mt-8 flex justify-center">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © 2026 Abhishek Patil. Crafted with <Heart size={14} className="text-primary fill-primary" /> using React
            </p>
            <div className="text-xs text-muted-foreground/60 uppercase tracking-widest">
              Available for new opportunities
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Education;