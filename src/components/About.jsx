import { motion, useScroll, useTransform } from 'framer-motion';
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

  const SKILLS = [
    "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "MUI", "ChakraUI", "Node.js", "Python", "Rust", "Go", "MySQL", "MongoDB", "Firebase", "Git"
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

      <div className="marquee-container">
        <div className="marquee-content">
          {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, index) => (
            <span key={index} className="marquee-item">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
