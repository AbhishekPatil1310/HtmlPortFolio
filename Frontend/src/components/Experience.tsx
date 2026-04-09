import { motion } from "framer-motion";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";

// Define the interface for TypeScript safety
interface ExperienceItem {
  title: string;
  role: string;
  location: string;
  period: string;
  points: string[];
  tech: string[];
  link?: string; // Added optional link property
}

const experiences: ExperienceItem[] = [
  {
    title: "Institute Management System",
    role: "Full-Stack Developer (Freelance)",
    location: "Pune, India",
    period: "Dec 2025 – Jan 2026",
    link: "https://www.shardaacademy.co.in/", // ADD YOUR LINK HERE
    points: [
      "Developed a full-stack Admission Management System for educational institutions using React (frontend) and Node.js/Express (backend) with PostgreSQL database.",
      "Implemented multi-role user management (Admin, Receptionist, Student, Director, DTP Operator) with secure JWT-based authentication and robust role-based access control (RBAC).",
      "Built modules for student self-registration, batch assignment, and unique student ID generation.",
      "Designed and managed flexible fee structures, including installment plans, surcharges, concessions, and real-time payment tracking with receipt generation.",
      "Integrated QR code-based attendance marking and analytics, enabling real-time attendance status and comprehensive reporting for admins and students.",
      "Developed academic management features: batch creation, subject assignment, exam scheduling, mark entry, and student result viewing.",
      "Created dashboards and reporting tools for financial summaries, outstanding fees, attendance analytics, and batch-wise student performance, with Excel export support.",
      "Enforced security best practices: httpOnly JWT cookies, password change on first login, account activation/deactivation, and session management.",
      "Utilized modern frontend stack: React 19, Vite, React Router, Axios, Tailwind CSS, and Lucide React for UI/UX.",
      "Automated CI/CD pipelines with GitHub integration; deployed frontend on Vercel and backend on Azure.",
      "Followed best practices in backend validation (Zod), file export (ExcelJS), and code quality (ESLint).",
      "Designed normalized (3NF) database schema for users, students, admissions, payments, attendance, and exams."
    ],
    tech: ["Node.js", "Express", "PostgreSQL", "React", "JWT", "Tailwind CSS"],
  },
  {
    title: "Advestore – Real-Time Ad Feedback System",
    role: "Full-Stack Developer(Freelance)",
    location: "Remote",
    period: "Sep 2025 – Nov 2025",
    link: "https://www.advestors.org/", // ADD YOUR LINK HERE
    points: [
      "Built ad management platform with React + Redux for real-time user feedback collection",
      "Engineered backend using Node.js, Fastify, and MongoDB for user profiles and ad data",
      "Integrated Sightengine API for automated image moderation with 99% content compliance",
    ],
    tech: ["React", "Redux", "Fastify", "MongoDB", "Sightengine API"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Professional Journey
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative md:pl-14"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 top-7 w-3 h-3 rounded-full bg-primary hidden md:block" />

                <div className="glass-card group transition-all duration-300 hover:border-primary/30">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {exp.title}
                        </h3>
                        {/* Link Icon Rendering */}
                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label={`Visit ${exp.title}`}
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                        <Briefcase size={14} />
                        {exp.role}
                        {exp.location && ` · ${exp.location}`}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit h-fit">
                      <Calendar size={12} />
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                      >
                        <span className="text-primary mt-1.5 shrink-0">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;