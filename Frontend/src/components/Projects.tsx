import { motion } from "framer-motion";
import { ExternalLink, LucideIcon, LayoutDashboard } from "lucide-react";
import sql_visualizer from '../../assets/SQL_schema_visulizer.gif';
import herbal_Garden from '../../assets/Herbal_garden.gif';
import A4fitness from '../../assets/A4fitness.gif';
import eventTicketBookig from '../../assets/eventTicketBooking.gif'
import Document_managment from '../../assets/Document_managment.gif'

interface Project {
  title: string;
  description: string;
  image?: string;
  icon?: LucideIcon;
  highlights: string[];
  tech: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: "SQL Schema Visualizer",
    description: "Transforms raw SQL/DDL scripts into interactive Entity-Relationship Diagrams, streamlining database design reviews.",
    image: sql_visualizer,
    highlights: [
      "DDL to ERD transformation with auto-parsed metadata",
      "React Flow for dynamic drag-and-drop table visualizations",
      "Node.js + TypeScript backend for SQL parsing",
    ],
    tech: ["React", "React Flow", "Node.js", "TypeScript"],
    link: "https://sql-schema-visualizer-frontend-28ta.vercel.app/",
  },
  {
    title: "Herbarium – 3D Digital Garden",
    description: "Immersive 3D virtual garden for exploring medicinal plants with AI chatbot and gamification.",
    image: herbal_Garden,
    highlights: [
      "Three.js + GLTFLoader for 3D plant models",
      "GPT-based AI chatbot for plant info",
      "Quiz gamification with JWT auth",
      "AWS S3 for 3D assets – 40% load time reduction",
    ],
    tech: ["React", "Three.js", "MongoDB", "AWS S3", "OpenAI API"],
    link: "https://herbal-garden-git-main-abhishek-kumars-projects-7905b109.vercel.app/home",
  },
  {
    title: "Pose Detector & Fitness Tracker",
    description: "AI-based digital trainer using computer vision to analyze real-time video feeds and detect body posture.",
    image: A4fitness,
    highlights: [
      "Real-time tracking using Python and OpenCV.",
      "Custom pose estimation for joint angle analysis.",
      "Heuristic-based repetition counting algorithms.",
    ],
    tech: ["HTML", "js", "MongoDB", "OpenCV", "MediaPipe", "Flask"],
    link: "https://github.com/itstheabhiiigmailcom/Pose-detector-A4.git",
  },
  {
    title: "Event Ticket Booking System",
    description: "A full-stack event ticketing platform with real-time inventory management and secure transactions.",
    image: eventTicketBookig,
    highlights: [
      "Vite + Flask REST API architecture.",
      "MySQL relational data management.",
      "Real-time validation to prevent overbooking.",
    ],
    tech: ["React", "Vite", "Python", "Flask", "MySQL"],
    link: "https://github.com/AbhishekPatil1310/EventTicketBooking.git",
  },
  {
    title: "Real-Time Task Management System",
    description: "Production-ready task platform featuring real-time collaboration and scalable service architecture.",
    icon: LayoutDashboard,
    highlights: [
      "Socket.io for instant task updates.",
      "React Query for server-state caching.",
      "Prisma ORM with PostgreSQL (Supabase).",
    ],
    tech: ["TypeScript", "React", "Node.js", "Express", "PostgreSQL", "Socket.io"],
    link: "https://eclectic-brioche-a66956.netlify.app/",
  },
  {
    title: "Secure Document Management",
    description: "Full-stack solution featuring Supabase S3 storage and enterprise-grade security protocols.",
    image: Document_managment,
    highlights: [
      "Supabase S3 integration for scalable storage.",
      "Helmet and Rate Limiting for API security.",
      "Redux Toolkit for global state management.",
    ],
    tech: ["TypeScript", "React", "Redux", "Node.js", "Express", "Prisma"],
    link: "https://document-management-frontend-henna.vercel.app/login",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section-padding py-12">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-primary font-medium text-xs tracking-widest uppercase mb-2">
            Projects
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Featured Work
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card group cursor-pointer p-4 rounded-2xl border border-white/10"
              onClick={() => window.open(project.link, "_blank")}
            >
              {/* Image Container: Height reduced to h-36 from h-48 */}
              <div className="w-full h-36 rounded-xl bg-secondary/60 mb-3 flex items-center justify-center overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  project.icon && <project.icon size={40} className="text-primary/30" />
                )}
              </div>

              <div className="flex items-start justify-between mb-1.5">
                <h3 className="text-base font-semibold text-foreground line-clamp-1">
                  {project.title}
                </h3>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary shrink-0" />
                </a>
              </div>

              {/* Description: Clamped to 2 lines to save space */}
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">
                {project.description}
              </p>

              {/* Highlights: Reduced spacing and font size */}
              <ul className="space-y-1 mb-4">
                {project.highlights.slice(0, 3).map((h, idx) => (
                  <li key={idx} className="text-[11px] text-muted-foreground flex gap-2 line-clamp-1">
                    <span className="text-primary font-bold">›</span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tech Tags: Smaller padding and text */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] rounded-md bg-primary/10 text-primary border border-primary/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;