import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useState, useCallback, useRef, useEffect } from 'react';
import './Hero.css';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function ScrambleText({ text }) {
  const [display, setDisplay] = useState(text);
  const timerRef = useRef(null);

  const scramble = useCallback(() => {
    let i = 0;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDisplay(
        text.split('').map((_, idx) =>
          idx < i ? text[idx] : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('')
      );
      i += 0.5;
      if (i > text.length) {
        clearInterval(timerRef.current);
        setDisplay(text);
      }
    }, 30);
  }, [text]);

  useEffect(() => () => clearInterval(timerRef.current), []);

  return <span onMouseEnter={scramble}>{display}</span>;
}

function MusicPlayer({ playing, onToggle }) {
  return (
    <motion.button
      className="music-player-btn"
      onClick={onToggle}
      whileTap={{ scale: 0.9 }}
      aria-label={playing ? 'Pause music' : 'Play music'}
      title={playing ? 'Pause lofi music' : 'Play lofi music'}
    >
      <div className={`sound-bars ${playing ? 'playing' : ''}`}>
        <span className="sound-bar" />
        <span className="sound-bar" />
        <span className="sound-bar" />
        <span className="sound-bar" />
      </div>
    </motion.button>
  );
}

export default function Hero({ musicPlaying, toggleMusic }) {
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: -999, y: -999 });

  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseLeave = useCallback(() => setMouse({ x: -999, y: -999 }), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: '0%', opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  const stats = [
    { value: '3+', label: 'Years' },
    { value: '10+', label: 'Projects' },
    { value: '∞', label: 'Curiosity' },
  ];

  return (
    <motion.div
      ref={heroRef}
      className="hero-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--mx': `${mouse.x}px`, '--my': `${mouse.y}px` }}
    >
      <div className="hero-top-bar">
        <motion.span variants={itemVariants} className="hero-availability">
          <span className="status-dot" /> Available for new opportunities
        </motion.span>
        <div className="hero-top-right">
          <motion.span variants={itemVariants} className="hero-location">
            Based in Greater Noida, India
          </motion.span>
          <motion.div variants={itemVariants}>
            <MusicPlayer playing={musicPlaying} onToggle={toggleMusic} />
          </motion.div>
        </div>
      </div>

      <div className="hero-center">
        <div className="title-overflow">
          <motion.h1 variants={itemVariants} className="hero-main-title">
            <ScrambleText text="Product" />
          </motion.h1>
        </div>
        <div className="title-overflow align-right">
          <motion.h1 variants={itemVariants} className="hero-main-title text-outline">
            <ScrambleText text="Developer" />
          </motion.h1>
        </div>
      </div>

      <div className="hero-bottom-bar">
        <motion.p variants={itemVariants} className="hero-description">
          Product developer building web, mobile, and Shopify experiences —
          from AI-powered platforms to Flutter apps and e-commerce storefronts
          that ship, scale, and drive real results.
        </motion.p>

        <motion.div variants={itemVariants} className="hero-stats">
          {stats.map(({ value, label }) => (
            <div key={label} className="hero-stat">
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="hero-scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
        >
          <ArrowDown size={24} color="var(--text-secondary)" />
        </motion.div>
      </div>
    </motion.div>
  );
}
