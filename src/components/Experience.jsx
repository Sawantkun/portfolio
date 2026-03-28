import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import './Experience.css';

const EXPERIENCES = [
  {
    "year": "Oct 2024 – Present",
    "role": "Associate Consultant",
    "company": "NusterAi · Remote",
    "description": "Creating innovative mobile and web applications using React.js, focusing on responsive design and optimal user experience. Collaborating with cross-functional teams to develop AI-powered solutions and consulting with clients to translate business requirements into scalable technical solutions.",
    "internship": false
  },
  {
    "year": "Dec 2024 – Present",
    "role": "Software Developer Intern (Part-time)",
    "company": "Blackbytt Software Solutions · Remote",
    "description": "Contributing to web development projects in a hybrid environment. Building and maintaining software solutions aligned with business requirements, with exposure to real-world client projects.",
    "internship": false
  },
  {
    "year": "Mar 2024 – Sep 2024",
    "role": "Project Engineer",
    "company": "Futuristic Bots · Haridwar",
    "description": "Developed automation solutions for forklifts, integrating autonomous capabilities for improved efficiency. Conducted performance tests and collaborated with the team to optimize forklift navigation and task execution.",
    "internship": false
  },
  {
    "year": "Sep 2023 – Feb 2024",
    "role": "Web Development Experience",
    "company": "Invofy · Remote",
    "description": "Implemented dynamic web applications using Next.js with React components. Designed responsive UIs using Bootstrap, ensuring cross-device compatibility. Collaborated with a multidisciplinary team on code reviews and performance optimization.",
    "internship": true
  },
  {
    "year": "Nov 2022 – Mar 2023",
    "role": "Web Development Experience",
    "company": "Frienducation · Remote",
    "description": "Developed responsive user interfaces and interactive components using ReactJS for educational platforms. Collaborated with team members to implement new features and optimize codebase performance.",
    "internship": true
  },
  {
    "year": "Jul 2022 – Aug 2022",
    "role": "Web Development & Python Experience",
    "company": "Omnipresent RobotTech · Greater Noida",
    "description": "Developed responsive UIs for drone consoles and built a real-time web console for drone tracking with live location streaming and telemetry storage. Used Python with Flask and WebSockets for backend development.",
    "internship": true
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  const [showInternships, setShowInternships] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const visible = EXPERIENCES.filter(e => !e.internship || showInternships);

  return (
    <section className="experience-section" id="experience" ref={containerRef}>
      <motion.div
        className="experience-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Experience</h2>
        <button
          className={`internship-toggle ${showInternships ? 'active' : ''}`}
          onClick={() => setShowInternships(v => !v)}
        >
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>
          Show internships
        </button>
      </motion.div>

      <div className="timeline-container">
        <div className="timeline-track">
          <motion.div
            className="timeline-progress"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="timeline-list">
          <AnimatePresence initial={false}>
            {visible.map((exp) => (
              <TimelineItem key={exp.company} experience={exp} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ experience }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      className="timeline-item"
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      layout
    >
      <motion.div
        className="timeline-node"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
      />

      <div className="timeline-content-wrapper">
        <motion.div
          className="timeline-year-wrapper"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="timeline-year">{experience.year}</span>
          {experience.internship && (
            <span className="internship-badge">Internship</span>
          )}
        </motion.div>

        <motion.div
          className="timeline-content glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="timeline-role">{experience.role}</h3>
          <h4 className="timeline-company">{experience.company}</h4>
          <p className="timeline-description">{experience.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
