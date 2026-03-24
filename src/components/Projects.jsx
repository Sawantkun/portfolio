import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Projects.css';

const TABS = [
  { id: 'products', label: 'Built Products' },
  { id: 'shopify', label: 'Shopify Projects' },
];

const PROJECTS = {
  shopify: [
    // Add your Shopify projects here
  ],
  products: [
    {
      title: "E-Commerce Experience",
      category: "Web App / Design",
      year: "2023",
      image: "/ecommerce_preview_1774378704863.png"
    },
    {
      title: "Fintech Dashboard",
      category: "Product Design",
      year: "2023",
      image: "/fintech_preview_1774378726570.png"
    },
    {
      title: "Interactive AI Agent",
      category: "Development",
      year: "2024",
      image: "/ai_preview_1774378845765.png"
    }
  ],
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const [activeTab,    setActiveTab]    = useState('products');
  const [activeProject, setActiveProject] = useState(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handlePointerMove = (e) => {
    x.set(e.clientX - 150);
    y.set(e.clientY - 100);
  };

  const list = PROJECTS[activeTab];

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Selected Works</h2>

        <div className="projects-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`projects-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(tab.id); setActiveProject(null); }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.span className="tab-underline" layoutId="tab-underline" />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="projects-list-wrapper" onPointerMove={handlePointerMove}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="projects-list"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {list.length === 0 ? (
              <div className="projects-empty">
                Coming soon — projects being added.
              </div>
            ) : (
              list.map((project, idx) => (
                <ProjectItem
                  key={project.title}
                  project={project}
                  index={idx}
                  isInView={isInView}
                  setActiveProject={setActiveProject}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Floating preview image that follows cursor */}
        <motion.div
          className="project-preview-wrapper"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: activeProject !== null ? 1 : 0,
            scale:   activeProject !== null ? 1 : 0.8,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {activeProject !== null && (
            <img
              src={activeProject.image}
              alt={activeProject.title}
              className="project-preview-img"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectItem({ project, index, isInView, setActiveProject }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="project-item"
      onMouseEnter={() => { setIsHovered(true);  setActiveProject(project); }}
      onMouseLeave={() => { setIsHovered(false); setActiveProject(null); }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      <div className="project-info">
        <h3 className={`project-title ${isHovered ? 'hovered' : ''}`}>{project.title}</h3>
        <p className="project-category">{project.category}</p>
      </div>

      <div className="project-meta">
        <span className="project-year">{project.year}</span>
        <motion.div
          className="project-icon"
          animate={{ rotate: isHovered ? 45 : 0, scale: isHovered ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ArrowUpRight size={24} color={isHovered ? "var(--text-primary)" : "var(--text-secondary)"} />
        </motion.div>
      </div>

      <motion.div
        className="project-hover-fx"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
