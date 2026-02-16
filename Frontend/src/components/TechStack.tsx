import { motion } from "framer-motion";
import {
  Code2,
  Layout,
  Server,
  Database,
  Shield,
  Wrench,
} from "lucide-react";

const categories = [
  {
    title: "Languages",
    icon: Code2,
    items: ["JavaScript (ES6+)", "Python", "HTML5", "CSS3", "SQL"],
    span: "md:col-span-2",
  },
  {
    title: "Frontend",
    icon: Layout,
    items: ["React.js", "Redux Toolkit", "React Router", "Tailwind CSS", "Axios"],
    span: "md:col-span-2",
  },
  {
    title: "Backend",
    icon: Server,
    items: ["Node.js", "Express.js", "Fastify", "FastAPI"],
    span: "md:col-span-2",
  },
  {
    title: "Databases",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "MySQL"],
    span: "md:col-span-1",
  },
  {
    title: "Auth & Security",
    icon: Shield,
    items: ["JWT", "Cookie Auth", "RBAC", "Bcrypt"],
    span: "md:col-span-1",
  },
  {
    title: "Tools & Cloud",
    icon: Wrench,
    items: ["Git", "GitHub", "Postman", "Supabase", "AWS S3"],
    span: "md:col-span-2",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TechStack = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
            Tech Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Skills & Technologies
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={item}
              className={`bento-item ${cat.span}`}
            >
              <div className="flex items-center gap-3 w-full mb-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <cat.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 w-full">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
