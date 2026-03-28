import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import './Terminal.css';

// ── Portfolio data ────────────────────────────────────────────────────────────
const DATA = {
  owner: 'Sawant Kumar',
  role: 'Full Stack & Mobile Developer',
  email: 'sawantkumar199@gmail.com',
  github: 'github.com/Sawantkun',
  portfolio: 'sawant-portfolio.vercel.app',
  skills: {
    Mobile:   ['Flutter', 'Dart', 'Firebase', 'Provider', 'GoRouter'],
    Frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'MUI'],
    Backend:  ['Node.js', 'Python', 'Flask', 'MongoDB', 'MySQL', 'WebSockets'],
    DevOps:   ['GitHub', 'Vercel', 'Bitbucket', 'Google Gemini AI', 'REST APIs'],
  },
  experience: [
    {
      period: 'Oct 2024 – Present',
      role: 'Associate Consultant',
      company: 'NusterAi (Remote)',
      bullets: [
        'Building mobile & web apps with Flutter and React.js',
        'Developing AI-powered solutions for cross-functional client projects',
      ],
    },
    {
      period: 'Dec 2024 – Present',
      role: 'Software Developer Intern (Part-time)',
      company: 'Blackbytt Software Solutions (Remote)',
      bullets: [
        'Building and maintaining software solutions for real-world client projects',
      ],
    },
    {
      period: 'Mar 2024 – Sep 2024',
      role: 'Project Engineer',
      company: 'Futuristic Bots, Haridwar',
      bullets: [
        'Developed autonomous forklift automation solutions',
        'Conducted performance tests ensuring safe cross-environment operations',
      ],
    },
    {
      period: 'Sep 2023 – Feb 2024',
      role: 'Web Development Intern',
      company: 'Invofy (Remote)',
      bullets: [
        'Built dynamic web apps with Next.js and responsive UIs with Bootstrap',
      ],
    },
    {
      period: 'Nov 2022 – Mar 2023',
      role: 'Web Development Intern',
      company: 'Frienducation (Remote)',
      bullets: [
        'Built responsive UI components using ReactJS for educational platforms',
      ],
    },
    {
      period: 'Jul 2022 – Aug 2022',
      role: 'Web Dev & Python Intern',
      company: 'Omnipresent RobotTech, Greater Noida',
      bullets: [
        'Built drone console UI with live telemetry using Python, Flask & WebSockets',
      ],
    },
  ],
  projects: [
    { num: '01', title: 'PawMatch',          category: 'Next.js · Firebase · Gemini AI', year: '2025' },
    { num: '02', title: 'Milestone Moments', category: 'Flutter · Firebase · fl_chart',  year: '2025' },
    { num: '03', title: 'TimeLoop',          category: 'Flutter · Firebase · GoRouter',  year: '2025' },
    { num: '04', title: 'ShareSquare',       category: 'Flutter · Firebase · Provider',  year: '2024' },
  ],
};

// ── Output helpers ────────────────────────────────────────────────────────────
// type: heading | body | accent | muted | dim | success | error
const L = (text, type = 'body') => ({ text, type });
const BL = () => L('', 'body');
const HR = () => L('─'.repeat(48), 'dim');

// ── Commands ──────────────────────────────────────────────────────────────────
const COMMANDS = {
  help: () => [
    L('AVAILABLE COMMANDS', 'heading'),
    HR(),
    L('  whoami         About Sawant Kumar',        'body'),
    L('  skills         Tech stack & expertise',    'body'),
    L('  experience     Work history',              'body'),
    L('  projects       Notable projects',          'body'),
    L('  contact        Get in touch',              'body'),
    L('  clear          Clear terminal',            'muted'),
    L('  sudo hire-me   😉',                        'accent'),
    BL(),
    L('Tip: ↑ / ↓  navigate history  ·  Tab  autocomplete', 'muted'),
  ],

  whoami: () => [
    L(`${DATA.owner}`, 'heading'),
    L(`${DATA.role}`, 'accent'),
    HR(),
    BL(),
    L('  Full Stack & Mobile Developer building production-grade', 'body'),
    L('  web and Flutter apps. Proficient in React, Next.js, and', 'body'),
    L('  Flutter with a focus on Firebase, AI-powered features,', 'body'),
    L('  and polished, user-centric products.', 'body'),
    BL(),
    L('  Status    ● Open to new opportunities', 'success'),
    L('  Education  B.Tech CSE · Gautam Buddha University · 8.5 GPA', 'muted'),
  ],

  skills: () => {
    const lines = [L('TECH STACK', 'heading'), HR()];
    Object.entries(DATA.skills).forEach(([cat, items]) => {
      lines.push(BL());
      lines.push(L(`  ${cat.padEnd(12)}${items.join('  ·  ')}`, 'body'));
    });
    return lines;
  },

  experience: () => {
    const lines = [L('WORK HISTORY', 'heading'), HR()];
    DATA.experience.forEach(({ period, role, company, bullets }) => {
      lines.push(BL());
      lines.push(L(`  ${period}`, 'accent'));
      lines.push(L(`  ${role}`, 'body'));
      lines.push(L(`  ${company}`, 'muted'));
      bullets.forEach(b => lines.push(L(`    └─ ${b}`, 'dim')));
    });
    return lines;
  },

  projects: () => {
    const lines = [L('PROJECTS', 'heading'), HR()];
    DATA.projects.forEach(({ num, title, category, year }) => {
      lines.push(BL());
      lines.push(L(`  ${num}  ${title}`, 'accent'));
      lines.push(L(`      ${category} — ${year}`, 'muted'));
    });
    return lines;
  },

  contact: () => [
    L('GET IN TOUCH', 'heading'),
    HR(),
    BL(),
    L(`  Email      ${DATA.email}`,     'body'),
    L(`  GitHub     ${DATA.github}`,    'body'),
    L(`  Portfolio  ${DATA.portfolio}`, 'body'),
    BL(),
    L('  Always happy to chat about great ideas.', 'muted'),
  ],
};

const ALL_CMDS = [...Object.keys(COMMANDS), 'clear', 'sudo hire-me'];

const HIRE_ME = [
  L('[sudo] password for world: ●●●●●●●●●●●●', 'muted'),
  L('Verifying credentials  ██████████████████████  100%', 'dim'),
  BL(),
  L('✓  Access granted. You have excellent taste.', 'success'),
  BL(),
  L(`  Let's build something great together.`, 'accent'),
  L(`  → ${DATA.email}`, 'body'),
];

// ── Banner (neofetch-style) ───────────────────────────────────────────────────
const BANNER = [
  L('  ┌─────────────────────────────────────────┐', 'dim'),
  L('  │                                         │', 'dim'),
  L('  │   SAWANT KUMAR · Full Stack Developer    │', 'accent'),
  L('  │   portfolio.sh v1.0                     │', 'muted'),
  L('  │                                         │', 'dim'),
  L('  └─────────────────────────────────────────┘', 'dim'),
  BL(),
  L('  Type  help  to see available commands.', 'muted'),
  BL(),
];

// ── Terminal component ────────────────────────────────────────────────────────
export default function Terminal() {
  const [isOpen, setIsOpen]         = useState(false);
  const [history, setHistory]       = useState([]);   // [{ cmd, output[] }]
  const [input, setInput]           = useState('');
  const [cmdLog, setCmdLog]         = useState([]);   // previous commands
  const [logIdx, setLogIdx]         = useState(-1);
  const inputRef  = useRef(null);
  const bodyRef   = useRef(null);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [history]);

  const execute = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCmdLog(prev => [raw, ...prev]);
    setLogIdx(-1);

    if (cmd === 'clear') { setHistory([]); return; }

    let output;
    if (COMMANDS[cmd]) {
      output = COMMANDS[cmd]();
    } else if (cmd === 'sudo hire-me' || cmd === 'hire-me') {
      output = HIRE_ME;
    } else {
      output = [
        L(`command not found: ${raw}`, 'error'),
        L("Run 'help' to see what's available.", 'muted'),
      ];
    }

    setHistory(prev => [...prev, { cmd: raw, output }]);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      execute(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
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
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* ── Floating button ─────────────────────────────────────────────── */}
      <motion.button
        className={`t-fab ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle terminal"
      >
        <TerminalIcon size={18} strokeWidth={1.8} />
        <span className="t-fab-label">terminal</span>
      </motion.button>

      {/* ── Terminal window ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="t-window"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            drag
            dragMomentum={false}
            dragElastic={0}
          >
            {/* Title bar – drag handle */}
            <div className="t-titlebar">
              <div className="t-dots">
                <button className="t-dot red"    onClick={() => setIsOpen(false)} aria-label="Close" />
                <span   className="t-dot yellow" />
                <span   className="t-dot green"  />
              </div>
              <span className="t-title">portfolio.sh — bash</span>
              <button className="t-close-btn" onClick={() => setIsOpen(false)} aria-label="Close terminal">
                <X size={13} strokeWidth={2} />
              </button>
            </div>

            {/* Body – stop pointer events from initiating drag */}
            <div
              className="t-body"
              ref={bodyRef}
              onPointerDown={e => e.stopPropagation()}
              onClick={() => inputRef.current?.focus()}
            >
              {/* Banner */}
              {BANNER.map((l, i) => (
                <div key={`b${i}`} className={`t-line t-${l.type}`}>
                  {l.text || '\u00A0'}
                </div>
              ))}

              {/* Command history */}
              {history.map((entry, ei) => (
                <div key={ei} className="t-entry">
                  <div className="t-prompt-row">
                    <span className="t-ps1">guest@portfolio:~$</span>
                    <span className="t-cmd-echo">{entry.cmd}</span>
                  </div>
                  {entry.output.map((l, li) => (
                    <div key={li} className={`t-line t-${l.type}`}>
                      {l.text || '\u00A0'}
                    </div>
                  ))}
                </div>
              ))}

              {/* Active input row */}
              <div className="t-prompt-row">
                <span className="t-ps1">guest@portfolio:~$</span>
                <input
                  ref={inputRef}
                  className="t-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
