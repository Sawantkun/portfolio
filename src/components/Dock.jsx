import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Bird, Skull, X, FileText, Download } from 'lucide-react';
import { PROJECTS } from './Projects';
import './Dock.css';

// ─────────────────────────────────────────────────────────────────────────────
// TERMINAL DATA
// ─────────────────────────────────────────────────────────────────────────────
const T_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const L  = (text, type = 'body') => ({ text, type });
const BL = () => L('', 'body');
const HR = () => L('─'.repeat(48), 'dim');

const T_DATA = {
  email: 'sawantkumar199@gmail.com',
  github: 'github.com/Sawantkun',
  linkedin: 'linkedin.com/in/sawant-kumar-367638235',
  skills: {
    Mobile:   ['Flutter', 'Dart', 'Firebase', 'Provider', 'GoRouter'],
    Web:      ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'MUI', 'ChakraUI'],
    Shopify:  ['Liquid', 'Shopify CLI', 'Theme Dev', 'Custom Sections'],
    Backend:  ['Node.js', 'Python', 'Flask', 'MongoDB', 'MySQL', 'WebSockets'],
    DevOps:   ['GitHub', 'Vercel', 'Bitbucket', 'Google Gemini AI', 'REST APIs'],
  },
};

const T_COMMANDS = {
  help: () => [
    L('AVAILABLE COMMANDS', 'heading'), HR(),
    L('  whoami         About Sawant Kumar',     'body'),
    L('  skills         Tech stack & expertise', 'body'),
    L('  experience     Work history',           'body'),
    L('  projects       Notable projects',       'body'),
    L('  contact        Get in touch',           'body'),
    L('  clear          Clear terminal',         'muted'),
    L('  sudo hire-me   😉',                     'accent'),
    BL(),
    L('Tip: ↑↓ history  ·  Tab autocomplete',   'muted'),
  ],
  whoami: () => [
    L('Sawant Kumar', 'heading'), L('Product Developer', 'accent'), HR(), BL(),
    L('  Building web apps, Flutter mobile apps, and', 'body'),
    L('  Shopify storefronts. I care about shipping', 'body'),
    L('  things that are fast, beautiful, and built to last.', 'body'), BL(),
    L('  Status    ● Available for new opportunities', 'success'),
    L('  Location  Greater Noida, India', 'muted'),
    L('  Edu       B.Tech CSE · Gautam Buddha University · 8.5 GPA', 'muted'),
  ],
  skills: () => {
    const lines = [L('TECH STACK', 'heading'), HR()];
    Object.entries(T_DATA.skills).forEach(([cat, items]) => {
      lines.push(BL());
      lines.push(L(`  ${cat.padEnd(12)}${items.join('  ·  ')}`, 'body'));
    });
    return lines;
  },
  experience: () => [
    L('WORK HISTORY', 'heading'), HR(), BL(),
    L('  Oct 2024 – Present', 'accent'), L('  Associate Consultant', 'body'), L('  NusterAi  ·  Remote', 'muted'),
    L('    └─ React.js apps, AI-powered solutions, client consulting', 'dim'), BL(),
    L('  Dec 2024 – Present', 'accent'), L('  Software Developer Intern (Part-time)', 'body'), L('  Blackbytt Software Solutions  ·  Remote', 'muted'),
    L('    └─ Web development, real-world client projects', 'dim'), BL(),
    L('  Mar 2024 – Sep 2024', 'accent'), L('  Project Engineer', 'body'), L('  Futuristic Bots  ·  Haridwar', 'muted'),
    L('    └─ Autonomous forklift automation & performance testing', 'dim'), BL(),
    L('  Sep 2023 – Feb 2024', 'accent'), L('  Web Development Experience', 'body'), L('  Invofy  ·  Remote', 'muted'),
    L('    └─ Next.js apps, Bootstrap UIs, cross-device optimization', 'dim'), BL(),
    L('  Nov 2022 – Mar 2023', 'accent'), L('  Web Development Experience', 'body'), L('  Frienducation  ·  Remote', 'muted'),
    L('    └─ ReactJS UIs for educational platforms', 'dim'), BL(),
    L('  Jul 2022 – Aug 2022', 'accent'), L('  Web Dev & Python Experience', 'body'), L('  Omnipresent RobotTech  ·  Greater Noida', 'muted'),
    L('    └─ Drone console UI, Flask + WebSockets telemetry', 'dim'),
  ],
  projects: () => {
    const lines = [L('PROJECTS', 'heading'), HR()];
    let num = 1;
    Object.entries(PROJECTS).forEach(([tab, items]) => {
      if (!items.length) return;
      lines.push(BL());
      lines.push(L(`  ${tab.toUpperCase()}`, 'dim'));
      items.forEach(({ title, category, year }) => {
        lines.push(BL());
        lines.push(L(`  ${String(num++).padStart(2, '0')}  ${title}`, 'accent'));
        lines.push(L(`      ${category} — ${year}`, 'muted'));
      });
    });
    return lines;
  },
  contact: () => [
    L('GET IN TOUCH', 'heading'), HR(), BL(),
    L(`  Email     ${T_DATA.email}`, 'body'),
    L(`  GitHub    ${T_DATA.github}`, 'body'),
    L(`  LinkedIn  ${T_DATA.linkedin}`, 'body'), BL(),
    L('  Always happy to chat about great ideas.', 'muted'),
  ],
};

const T_BANNER = [
  L('  ┌─────────────────────────────────────────┐', 'dim'),
  L('  │   SAWANT KUMAR · Creative Developer     │', 'accent'),
  L('  │   portfolio.sh v1.0                     │', 'muted'),
  L('  └─────────────────────────────────────────┘', 'dim'),
  BL(),
  L("  Type  help  to get started.", 'muted'),
  BL(),
];

const T_HIRE = [
  L('[sudo] password for world: ●●●●●●●●●●●●', 'muted'),
  L('Verifying  ██████████████████████  100%', 'dim'), BL(),
  L('✓  Access granted. You have excellent taste.', 'success'), BL(),
  L("  Let's build something great together.", 'accent'),
  L(`  → ${T_DATA.email}`, 'body'),
];

const ALL_CMDS = [...Object.keys(T_COMMANDS), 'clear', 'sudo hire-me'];

// ─────────────────────────────────────────────────────────────────────────────
// HACK SIM DATA
// ─────────────────────────────────────────────────────────────────────────────
const HACK_LINES = [
  { t: '> Initializing breach protocol...',                              ms: 0    },
  { t: '> Target acquired: portfolio.sawantkumar.dev',                   ms: 700  },
  { t: '> Scanning vulnerabilities... found: 0  (respect)',              ms: 1400, dim: true },
  { t: '> Switching to social engineering approach',                     ms: 2000 },
  { t: '> Accessing: /api/hr/offers  [200 OK]',                         ms: 2700 },
  { t: '> $ sudo rm -rf /reasons-not-to-hire-sawant',                   ms: 3400 },
  { t: "  removed. (directory was empty anyway)",                        ms: 4000, dim: true },
  { t: '> Drafting offer_letter.pdf...',                                 ms: 4600 },
  { t: '> Role: Senior Dev  →  Lead Dev  →  CTO  (self-promoted)',      ms: 5300 },
  { t: '> Salary: $market_rate × 10  ✓',                                ms: 6000 },
  { t: '> Perks: remote, unlimited PTO, no meetings before 11am',       ms: 6700 },
  { t: '> Signing as: "The CEO"  (DocuSign bypassed, obviously)',        ms: 7400 },
  { t: `> Dispatching to: sawant@portfolio.dev  [sent ✓]`,              ms: 8100 },
  { t: '',                                                               ms: 8600 },
  { t: '╔══════════════════════════════════════════╗',                   ms: 8700, accent: true },
  { t: '║   SAWANT IS HIRED  —  FROM YOUR DEVICE  ║',                   ms: 8800, accent: true },
  { t: '╚══════════════════════════════════════════╝',                   ms: 8900, accent: true },
  { t: '',                                                               ms: 9100 },
  { t: "  Offer sent from your IP. You're welcome, Sawant.",            ms: 9200, dim: true },
];

// ─────────────────────────────────────────────────────────────────────────────
// SHARED WINDOW SHELL
// ─────────────────────────────────────────────────────────────────────────────
function getInitialPos(id, w, h) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const cx = (W - w) / 2;
  const cy = (H - h) / 2;
  if (id === 'terminal') return { left: Math.max(80, W - w - 40), top: Math.max(40, H - h - 60) };
  if (id === 'flappy')   return { left: Math.max(80, cx - 80),    top: Math.max(40, cy - 20) };
  return                        { left: Math.max(80, cx + 60),    top: Math.max(40, cy) };
}

function AppWindow({ id, title, subtitle, width, height, onClose, children }) {
  const [pos] = useState(() => getInitialPos(id, width, height));

  return (
    <motion.div
      className="aw"
      style={{ width, height, left: pos.left, top: pos.top }}
      initial={{ opacity: 0, scale: 0.93, y: 16 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      exit={{    opacity: 0, scale: 0.93, y: 16 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      drag
      dragMomentum={false}
      dragElastic={0}
    >
      {/* Chrome — drag handle */}
      <div className="aw-chrome">
        <div className="aw-dots">
          <button className="awd r" onClick={onClose} aria-label="Close" />
          <span   className="awd y" />
          <span   className="awd g" />
        </div>
        <span className="aw-title">{title}</span>
        {subtitle && <span className="aw-subtitle">{subtitle}</span>}
        <button className="aw-x" onClick={onClose}><X size={12} strokeWidth={2.5} /></button>
      </div>

      {/* Body — blocks drag propagation */}
      <div className="aw-body" onPointerDown={e => e.stopPropagation()}>
        {children}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TERMINAL APP
// ─────────────────────────────────────────────────────────────────────────────
function TerminalApp() {
  const [history, setHistory] = useState([]);
  const [input,   setInput]   = useState('');
  const [cmdLog,  setCmdLog]  = useState([]);
  const [logIdx,  setLogIdx]  = useState(-1);
  const inputRef = useRef(null);
  const bodyRef  = useRef(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 80); }, []);

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  const execute = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setCmdLog(p => [raw, ...p]);
    setLogIdx(-1);
    if (cmd === 'clear') { setHistory([]); return; }
    let output;
    if (T_COMMANDS[cmd]) output = T_COMMANDS[cmd]();
    else if (cmd === 'sudo hire-me' || cmd === 'hire-me') output = T_HIRE;
    else output = [L(`command not found: ${raw}. Try 'help'`, 'error')];
    setHistory(p => [...p, { cmd: raw, output }]);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') { execute(input); setInput(''); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(logIdx + 1, cmdLog.length - 1);
      setLogIdx(next);
      if (cmdLog[next] !== undefined) setInput(cmdLog[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = logIdx - 1;
      if (next < 0) { setLogIdx(-1); setInput(''); }
      else { setLogIdx(next); setInput(cmdLog[next] ?? ''); }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = ALL_CMDS.find(c => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase());
      if (match) setInput(match);
    }
  };

  return (
    <div className="term-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
      {T_BANNER.map((l, i) => <div key={`b${i}`} className={`tl tl-${l.type}`}>{l.text || '\u00A0'}</div>)}
      {history.map((entry, ei) => (
        <div key={ei}>
          <div className="term-prompt-row">
            <span className="term-ps1">guest@portfolio:~$</span>
            <span className="term-cmd-echo">{entry.cmd}</span>
          </div>
          {entry.output.map((l, li) => (
            <div key={li} className={`tl tl-${l.type}`}>{l.text || '\u00A0'}</div>
          ))}
        </div>
      ))}
      <div className="term-prompt-row">
        <span className="term-ps1">guest@portfolio:~$</span>
        <input
          ref={inputRef}
          className="term-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLAPPY BIRD
// ─────────────────────────────────────────────────────────────────────────────
function FlappyBirdApp() {
  const canvasRef = useRef(null);
  const gameRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    const BIRD_X = 72, BIRD_R = 11;
    const PIPE_W = 46, PIPE_GAP = 140;
    const GRAVITY = 0.38, FLAP_V = -7.5, PIPE_SPEED = 2.3;

    const s = {
      bird: { y: H / 2, vy: 0 },
      pipes: [], score: 0, phase: 'idle', frame: 0,
    };

    const flap = () => {
      if (s.phase === 'idle') {
        s.phase = 'playing';
        s.bird.vy = FLAP_V;
      } else if (s.phase === 'playing') {
        s.bird.vy = FLAP_V;
      } else if (s.phase === 'dead') {
        s.bird.y = H / 2; s.bird.vy = 0;
        s.pipes = []; s.score = 0; s.frame = 0;
        s.phase = 'playing'; s.bird.vy = FLAP_V;
      }
    };

    gameRef.current = { flap };

    let animId;
    const loop = () => {
      // ── physics ──────────────────────────────────────────────────────
      if (s.phase === 'playing') {
        s.bird.vy += GRAVITY;
        s.bird.y  += s.bird.vy;
        s.frame++;

        if (s.frame % 90 === 0) {
          const gapY = 60 + Math.random() * (H - PIPE_GAP - 100);
          s.pipes.push({ x: W + 10, gapY, scored: false });
        }
        s.pipes.forEach(p => {
          p.x -= PIPE_SPEED;
          if (!p.scored && p.x + PIPE_W < BIRD_X) { p.scored = true; s.score++; }
        });
        s.pipes = s.pipes.filter(p => p.x > -PIPE_W);

        if (s.bird.y + BIRD_R > H || s.bird.y - BIRD_R < 0) s.phase = 'dead';
        for (const p of s.pipes) {
          if (BIRD_X + BIRD_R > p.x && BIRD_X - BIRD_R < p.x + PIPE_W &&
              (s.bird.y - BIRD_R < p.gapY || s.bird.y + BIRD_R > p.gapY + PIPE_GAP)) {
            s.phase = 'dead'; break;
          }
        }
      }

      // ── draw ─────────────────────────────────────────────────────────
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.022)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < W; gx += 38) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 38) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      // Pipes
      s.pipes.forEach(p => {
        ctx.fillStyle   = 'rgba(255,255,255,0.07)';
        ctx.strokeStyle = 'rgba(255,255,255,0.14)';
        ctx.lineWidth   = 1;
        // Shafts
        ctx.fillRect(p.x, 0, PIPE_W, p.gapY);
        ctx.strokeRect(p.x, 0, PIPE_W, p.gapY);
        ctx.fillRect(p.x, p.gapY + PIPE_GAP, PIPE_W, H);
        ctx.strokeRect(p.x, p.gapY + PIPE_GAP, PIPE_W, H);
        // Lips
        ctx.fillStyle   = 'rgba(255,255,255,0.11)';
        ctx.fillRect(p.x - 4, p.gapY - 12, PIPE_W + 8, 12);
        ctx.fillRect(p.x - 4, p.gapY + PIPE_GAP, PIPE_W + 8, 12);
        ctx.strokeRect(p.x - 4, p.gapY - 12, PIPE_W + 8, 12);
        ctx.strokeRect(p.x - 4, p.gapY + PIPE_GAP, PIPE_W + 8, 12);
      });

      // Bird
      if (s.phase !== 'idle') {
        const rot = Math.max(-0.5, Math.min(0.6, s.bird.vy * 0.07));
        ctx.save();
        ctx.translate(BIRD_X, s.bird.y);
        ctx.rotate(rot);
        // Body
        ctx.beginPath(); ctx.arc(0, 0, BIRD_R, 0, Math.PI * 2);
        ctx.fillStyle = '#f0f0f0'; ctx.fill();
        // Wing
        ctx.beginPath(); ctx.arc(-1, 4, 6, 0.4, Math.PI - 0.4);
        ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fill();
        // Eye
        ctx.beginPath(); ctx.arc(4, -3, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
        ctx.beginPath(); ctx.arc(5, -3.5, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        // Beak
        ctx.beginPath();
        ctx.moveTo(BIRD_R - 1, 0); ctx.lineTo(BIRD_R + 6, -2); ctx.lineTo(BIRD_R + 6, 2);
        ctx.closePath(); ctx.fillStyle = '#f59e0b'; ctx.fill();
        ctx.restore();
      }

      // Score
      if (s.phase === 'playing' || s.phase === 'dead') {
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(s.score, W / 2, 34);
      }

      // Overlays
      if (s.phase === 'idle') {
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = 'bold 15px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('FLAPPY.EXE', W / 2, H / 2 - 22);
        ctx.fillStyle = 'rgba(255,255,255,0.28)';
        ctx.font = '11.5px monospace';
        ctx.fillText('click  or  space  to  start', W / 2, H / 2 + 6);
      }
      if (s.phase === 'dead') {
        ctx.fillStyle = 'rgba(0,0,0,0.62)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('oops.', W / 2, H / 2 - 44);
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('looks like sawant is hired now.', W / 2, H / 2 - 18);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '11.5px monospace';
        ctx.fillText(`you scored ${s.score}  —  not enough to stop him`, W / 2, H / 2 + 10);
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.fillText('click to try (and fail) again', W / 2, H / 2 + 34);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space') { e.preventDefault(); gameRef.current?.flap(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={340}
      height={420}
      onClick={() => gameRef.current?.flap()}
      className="flappy-canvas"
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HACK SIM
// ─────────────────────────────────────────────────────────────────────────────
function HackSimApp() {
  const [lines,   setLines]   = useState([]);
  const [running, setRunning] = useState(false);
  const [done,    setDone]    = useState(false);
  const endRef   = useRef(null);
  const timers   = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (lines.length) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const run = () => {
    if (running) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLines([]); setDone(false); setRunning(true);

    HACK_LINES.forEach(({ t, ms, dim, accent }) => {
      const id = setTimeout(() => {
        setLines(p => [...p, { t, dim, accent }]);
      }, ms);
      timers.current.push(id);
    });

    const totalMs = HACK_LINES[HACK_LINES.length - 1].ms + 600;
    const doneId = setTimeout(() => { setRunning(false); setDone(true); }, totalMs);
    timers.current.push(doneId);
  };

  const reset = () => { setLines([]); setRunning(false); setDone(false); };

  return (
    <div className="hack-body">
      <AnimatePresence initial={false}>
        {lines.map((l, i) => (
          <motion.div
            key={i}
            className={`hack-line${l.accent ? ' h-accent' : ''}${l.dim ? ' h-dim' : ''}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
          >
            {l.t || '\u00A0'}
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={endRef} />

      {!running && !done && (
        <motion.div
          className="hack-start-wrap"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        >
          <p className="hack-tagline">
            Why wait for an offer letter<br />when you can just send one yourself?
          </p>
          <button className="hack-run-btn" onClick={run}>
            <span>./hack.sh</span>
          </button>
        </motion.div>
      )}

      {done && (
        <motion.button
          className="hack-reset-btn"
          onClick={reset}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          run again
        </motion.button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RESUME APP
// ─────────────────────────────────────────────────────────────────────────────
function ResumeApp() {
  return (
    <div className="resume-body">
      {/* Download button */}
      <a href="/resume.pdf" download="Sawant_Kumar_Resume.pdf" className="resume-download-btn">
        <Download size={13} strokeWidth={2} />
        Download PDF
      </a>

      {/* Header */}
      <div className="resume-header">
        <h1 className="resume-name">Sawant Kumar</h1>
        <div className="resume-contact">
          <span>sawantkumar199@gmail.com</span>
          <span className="resume-sep">·</span>
          <span>+91 9643461952</span>
          <span className="resume-sep">·</span>
          <span>github.com/Sawantkun</span>
          <span className="resume-sep">·</span>
          <span>linkedin.com/in/sawant-kumar-367638235</span>
        </div>
      </div>

      {/* Summary */}
      <div className="resume-section">
        <h2 className="resume-section-title">Summary</h2>
        <p className="resume-text">
          Full Stack and Mobile Developer with experience building production-grade web and Flutter applications.
          Proficient in React, Next.js, and Flutter with a strong focus on Firebase integration, responsive UI design,
          and AI-powered features. Passionate about shipping polished, user-centric products across web and mobile platforms.
        </p>
      </div>

      {/* Skills */}
      <div className="resume-section">
        <h2 className="resume-section-title">Skills</h2>
        <div className="resume-skills">
          <div className="resume-skill-row"><span className="resume-skill-cat">Mobile</span><span className="resume-text">Flutter, Dart, Firebase (Auth, Firestore, Storage), Provider, GoRouter</span></div>
          <div className="resume-skill-row"><span className="resume-skill-cat">Frontend</span><span className="resume-text">ReactJs, NextJs, Tailwind CSS, Framer Motion, MUI, ChakraUI</span></div>
          <div className="resume-skill-row"><span className="resume-skill-cat">Backend</span><span className="resume-text">NodeJs, Python, Flask, Firebase, MongoDB, MySQL, WebSockets</span></div>
          <div className="resume-skill-row"><span className="resume-skill-cat">DevOps</span><span className="resume-text">GitHub, Vercel, Bitbucket, Google Gemini AI, REST APIs</span></div>
          <div className="resume-skill-row"><span className="resume-skill-cat">Certifications</span><span className="resume-text">FreeCodeCamp Frontend Development</span></div>
        </div>
      </div>

      {/* Experience */}
      <div className="resume-section">
        <h2 className="resume-section-title">Experience</h2>

        {[
          { role: 'Associate Consultant', company: 'NusterAi', location: 'Remote', duration: 'Oct 2024 – Present',
            points: ['Building AI-powered web apps using React.js with responsive design', 'Collaborating with cross-functional teams on client projects', 'Translating business requirements into scalable technical solutions'] },
          { role: 'Software Developer Intern', company: 'Blackbytt Software Solutions', location: 'Remote', duration: 'Dec 2024 – Present',
            points: ['Contributing to web development projects in a hybrid environment', 'Building and maintaining software solutions aligned with business requirements'] },
          { role: 'Project Engineer', company: 'Futuristic Bots', location: 'Haridwar', duration: 'Mar 2024 – Sep 2024',
            points: ['Developed automation solutions for forklifts with autonomous capabilities', 'Conducted performance tests and optimised navigation and task execution'] },
          { role: 'Web Development Experience', company: 'Invofy', location: 'Remote', duration: 'Sep 2023 – Feb 2024',
            points: ['Built dynamic Next.js apps with Bootstrap responsive UIs', 'Collaborated on code reviews and performance optimisation'] },
          { role: 'Web Development Experience', company: 'Frienducation', location: 'Remote', duration: 'Nov 2022 – Mar 2023',
            points: ['Developed ReactJS UIs for educational platforms', 'Implemented new features and optimised codebase performance'] },
          { role: 'Web Dev & Python Experience', company: 'Omnipresent RobotTech', location: 'Greater Noida', duration: 'Jul 2022 – Aug 2022',
            points: ['Built drone console UI with real-time location streaming', 'Used Python, Flask and WebSockets for backend telemetry'] },
        ].map(exp => (
          <div key={exp.company} className="resume-exp-item">
            <div className="resume-exp-header">
              <span className="resume-exp-role">{exp.role}</span>
              <span className="resume-exp-duration">{exp.duration}</span>
            </div>
            <span className="resume-exp-company">{exp.company} · {exp.location}</span>
            <ul className="resume-exp-points">
              {exp.points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="resume-section">
        <h2 className="resume-section-title">Projects</h2>

        {[
          { title: 'PawMatch – AI-Powered Pet Adoption Platform', year: '2025',
            desc: 'Full-stack web app connecting adopters with shelter animals using AI-driven matching and real-time chat.',
            stack: 'Next.js, TypeScript, Tailwind CSS, Firebase, Google Gemini AI, Framer Motion' },
          { title: 'Milestone Moments – Child Development Tracker', year: '2025',
            desc: 'Cross-platform Flutter app for tracking child milestones, growth charts, mood logs, and vaccination reminders.',
            stack: 'Flutter, Firebase, Provider, fl_chart' },
          { title: 'TimeLoop – SkillSwap Hub', year: '2025',
            desc: 'Flutter mobile app for peer-to-peer skill exchange using a time-based credit economy.',
            stack: 'Flutter, Firebase, Provider, GoRouter' },
          { title: 'ShareSquare – Roommate Management App', year: '2024',
            desc: 'Flutter app for coordinating shared living — chores, bills, and household communication.',
            stack: 'Flutter, Firebase, Provider, GoRouter, fl_chart' },
        ].map(proj => (
          <div key={proj.title} className="resume-exp-item">
            <div className="resume-exp-header">
              <span className="resume-exp-role">{proj.title}</span>
              <span className="resume-exp-duration">{proj.year}</span>
            </div>
            <span className="resume-exp-company">{proj.stack}</span>
            <p className="resume-text" style={{ marginTop: '4px' }}>{proj.desc}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="resume-section">
        <h2 className="resume-section-title">Education</h2>
        <div className="resume-exp-item">
          <div className="resume-exp-header">
            <span className="resume-exp-role">B.Tech, Computer Science Engineering</span>
            <span className="resume-exp-duration">May 2025</span>
          </div>
          <span className="resume-exp-company">Gautam Buddha University, Greater Noida · 8.5 GPA</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCK
// ─────────────────────────────────────────────────────────────────────────────
const APPS = [
  { id: 'terminal', Icon: TerminalIcon, label: 'Terminal',    title: 'portfolio.sh', subtitle: '— bash',             w: 640, h: 430 },
  { id: 'flappy',   Icon: Bird,         label: 'Flappy Bird', title: 'flappy.exe',   subtitle: '— use space/click',  w: 340, h: 460 },
  { id: 'hack',     Icon: Skull,        label: 'Hack.exe',    title: 'hack.sh',      subtitle: '— definitely legal', w: 560, h: 400 },
  { id: 'resume',   Icon: FileText,     label: 'Resume',      title: 'resume.pdf',   subtitle: '— Sawant Kumar',     w: 660, h: 520 },
];

export default function Dock() {
  const [openApp, setOpenApp] = useState(null);
  const toggle = (id) => setOpenApp(prev => prev === id ? null : id);

  return (
    <>
      {/* ── Dock ───────────────────────────────────────────────────────── */}
      <div className="dock">
        {APPS.map(({ id, Icon, label }) => (
          <div key={id} className="dock-item">
            <motion.button
              className={`dock-icon ${openApp === id ? 'active' : ''}`}
              onClick={() => toggle(id)}
              whileHover={{ scale: 1.28, y: -6 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 340, damping: 22 }}
              aria-label={label}
            >
              <Icon size={18} strokeWidth={1.5} />
              {openApp === id && <span className="dock-dot" />}
            </motion.button>
            <span className="dock-label">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Windows ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {APPS.map(({ id, title, subtitle, w, h }) =>
          openApp === id ? (
            <AppWindow
              key={id}
              id={id}
              title={title}
              subtitle={subtitle}
              width={w}
              height={h}
              onClose={() => setOpenApp(null)}
            >
              {id === 'terminal' && <TerminalApp />}
              {id === 'flappy'   && <FlappyBirdApp />}
              {id === 'hack'     && <HackSimApp />}
              {id === 'resume'   && <ResumeApp />}
            </AppWindow>
          ) : null
        )}
      </AnimatePresence>
    </>
  );
}
