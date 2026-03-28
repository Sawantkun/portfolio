import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Narrative text reveal effect where opacity goes from 0.2 to 1 based on scroll
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0.2, 1]);
  const yOffset = useTransform(scrollYProgress, [0.2, 0.6], [50, 0]);

  // Strips scroll-driven translation (as % of strip width)
  const rawX1 = useTransform(scrollYProgress, [0, 1], ['-10%', '-23.33%']);
  const rawX2 = useTransform(scrollYProgress, [0, 1], ['-23.33%', '-10%']);
  const x1 = useSpring(rawX1, { stiffness: 60, damping: 20, mass: 0.5 });
  const x2 = useSpring(rawX2, { stiffness: 60, damping: 20, mass: 0.5 });

  const SKILLS = [
    "Flutter", "TypeScript", "React", "Next.js", "Tailwind CSS", "MUI", "ChakraUI", "Node.js", "Python", "Rust", "Go", "MySQL", "MongoDB", "Firebase", "Shopify", "Liquid", "Git"
  ];

  return (
    <section className="about-vibe-section" id="about" ref={containerRef}>
      <div className="about-vibe-container">
        <motion.div
          className="about-narrative"
          style={{ opacity, y: yOffset }}
        >
          I am a Full Stack developer who believes great software is both
          functionally robust and <span className="highlight-text">visually compelling</span>.
          I build responsive, user-centric web experiences — from AI-powered
          platforms to enterprise solutions — that drive real business results.
        </motion.div>
      </div>

      <div className="marquee-strips">
        <div className="marquee-container">
          <motion.div className="marquee-content" style={{ x: x1 }}>
            {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, index) => (
              <span key={index} className="marquee-item">{skill}</span>
            ))}
          </motion.div>
        </div>
        <div className="marquee-container marquee-container--reverse">
          <motion.div className="marquee-content" style={{ x: x2 }}>
            {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, index) => (
              <span key={index} className="marquee-item">{skill}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
