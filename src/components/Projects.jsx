import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

function GithubIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  );
}
import './Projects.css';

const TABS = [
  { id: 'products', label: 'Built Products' },
  { id: 'shopify', label: 'Shopify Projects' },
];

// Simple Icons CDN: https://cdn.simpleicons.org/{slug}
const TECH_ICONS = {
  react:       { label: 'React',       slug: 'react',       color: '#61DAFB' },
  nextjs:      { label: 'Next.js',     slug: 'nextdotjs',   color: '#FFFFFF' },
  typescript:  { label: 'TypeScript',  slug: 'typescript',  color: '#3178C6' },
  tailwind:    { label: 'Tailwind',    slug: 'tailwindcss', color: '#06B6D4' },
  openai:      { label: 'OpenAI',      slug: 'openai',      color: '#FFFFFF' },
  vercel:      { label: 'Vercel',      slug: 'vercel',      color: '#FFFFFF' },
  nodejs:      { label: 'Node.js',     slug: 'nodedotjs',   color: '#5FA04E' },
  postgresql:  { label: 'PostgreSQL',  slug: 'postgresql',  color: '#4169E1' },
  python:      { label: 'Python',      slug: 'python',      color: '#3776AB' },
  shopify:     { label: 'Shopify',     slug: 'shopify',     color: '#96BF48' },
  liquid:      { label: 'Liquid',      slug: 'shopify',     color: '#96BF48' },
};

const PROJECTS = {
  shopify: [
    {
      title: "Moko's Cosmajix",
      category: "Beauty & Skincare",
      year: "2024",
      image: "/moko.jpeg",
      link: "https://mokoscosmajix.com/",
    },
    {
      title: "Dileti",
      category: "Fine Jewellery & Lab-Grown Diamonds",
      year: "2024",
      image: "/dileti.jpeg",
      link: "https://dileti.com/",
    },
    {
      title: "LabGems",
      category: "Lab-Grown Diamonds & Gemstones",
      year: "2024",
      image: "/labgems.jpeg",
      link: "https://labgems.com/",
    },
  ],
  products: [
    {
      title: "PawMatch",
      category: "AI-Powered Pet Matching",
      year: "2024",
      image: "/pawmatch.jpeg",
      link: "https://pawmatch-one.vercel.app/",
      github: "https://github.com/Sawantkun/pawmatch",
      techStack: ['react', 'nextjs', 'typescript', 'tailwind', 'openai', 'vercel'],
    },
  ],
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const [activeTab, setActiveTab] = useState('products');
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
              <>
                {list.map((project, idx) => (
                  <ProjectItem
                    key={project.title}
                    project={project}
                    index={idx}
                    isInView={isInView}
                    setActiveProject={setActiveProject}
                  />
                ))}
                {activeTab === 'products' && (
                  <motion.div
                    className="projects-coming-soon"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * list.length }}
                  >
                    <span className="coming-soon-dot" />
                    More projects in development — coming soon
                  </motion.div>
                )}
              </>
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

function TechStackIcons({ techStack }) {
  if (!techStack || techStack.length === 0) return null;
  return (
    <div className="project-tech-stack">
      {techStack.map((key) => {
        const tech = TECH_ICONS[key];
        if (!tech) return null;
        return (
          <div key={key} className="tech-icon-wrapper" title={tech.label}>
            <img
              src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace('#', '')}`}
              alt={tech.label}
              className="tech-icon"
              loading="lazy"
            />
          </div>
        );
      })}
    </div>
  );
}

function ProjectItem({ project, index, isInView, setActiveProject }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMainClick = () => {
    if (project.link) window.open(project.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="project-item"
      onMouseEnter={() => { setIsHovered(true);  setActiveProject(project); }}
      onMouseLeave={() => { setIsHovered(false); setActiveProject(null); }}
      onClick={handleMainClick}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      style={{ cursor: project.link ? 'pointer' : 'default' }}
    >
      <div className="project-info">
        <h3 className={`project-title ${isHovered ? 'hovered' : ''}`}>{project.title}</h3>
        <p className="project-category">{project.category}</p>
        <TechStackIcons techStack={project.techStack} />
      </div>

      <div className="project-meta">
        <span className="project-year">{project.year}</span>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-github-link"
            onClick={(e) => e.stopPropagation()}
            title="View source on GitHub"
          >
            <GithubIcon size={20} color="var(--text-secondary)" />
          </a>
        )}
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

