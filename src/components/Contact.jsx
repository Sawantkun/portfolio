import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Mail, Send, ArrowUpRight } from 'lucide-react';
import './Contact.css';

// ── Bot logic ─────────────────────────────────────────────────────────────────
const GREETING_RE = /^(hi|hello|hey|sup|yo|howdy|hiya|greetings|what'?s\s*up|wassup)/i;

const PRESET_QA = [
  {
    q: "What's your current experience?",
    a: "Currently working as Associate Consultant at NusterAi (Oct 2024–Present) building AI-powered web apps with React.js, and as a Software Developer Intern at Blackbytt Software Solutions (Dec 2024–Present). 3+ years of professional experience overall.",
  },
  {
    q: "How many projects have you worked on?",
    a: "10+ projects so far! Including Haigge (AI virtual try-on e-commerce), Digital DAO (SaaS business website), Alumni Portal, NusterAi website, Drone Console, real-time chat app, and more.",
  },
  {
    q: "What's your tech stack?",
    a: "Web: React, Next.js, Tailwind CSS, MUI, ChakraUI. Mobile: Flutter, Dart, Firebase. Shopify: Liquid, custom theme dev. Backend: Node.js, Python, Rust, Go. Databases: MySQL, MongoDB, Firebase.",
  },
  {
    q: "Are you available for hire?",
    a: "Yes! Open to new opportunities. Drop a mail at sawantkumar199@gmail.com — let's talk about what you're building.",
    connect: true,
  },
  {
    q: "What's your education?",
    a: "B.Tech in Computer Science Engineering from Gautam Buddha University, Greater Noida — graduating May 2025 with an 8.5 GPA.",
  },
  {
    q: "How can I contact you?",
    a: "Best way is email — sawantkumar199@gmail.com. Sawant typically replies within 24 hours. GitHub and LinkedIn work too!",
    connect: true,
  },
];

const GREETING_REPLY =
  "Hey! 👋 Great to meet you. Use the questions below to explore Sawant's portfolio, or ask me anything!";

const CONNECT_REPLY = { text: "Let's connect! Reach out at", email: 'sawantkumar199@gmail.com' };

let _id = 0;
const mkBot     = (text, extra = {}) => ({ id: ++_id, sender: 'bot',  text, ts: new Date(), ...extra });
const mkUser    = text               => ({ id: ++_id, sender: 'user', text, ts: new Date() });
const mkConnect = ()                 => ({ id: ++_id, sender: 'bot',  text: CONNECT_REPLY.text, email: CONNECT_REPLY.email, ts: new Date() });

const GREETING_MSG =
  "Hey there 👋 I'm Sawant's portfolio assistant. He builds web apps, Flutter mobile apps, and Shopify storefronts. Say hi or pick a question below!";

const fmtTime = d => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// ── Component ─────────────────────────────────────────────────────────────────
export default function Contact() {
  const [messages, setMessages] = useState([]);
  const [input,    setInput]    = useState('');
  const [typing,   setTyping]   = useState(false);
  const [greeted,  setGreeted]  = useState(false);

  const sectionRef = useRef(null);
  const endRef     = useRef(null);
  const inputRef   = useRef(null);
  const timerRef   = useRef(null);

  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  useEffect(() => {
    if (messages.length === 0 && !typing) return;
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Greeting on first view
  useEffect(() => {
    if (inView && !greeted) {
      setGreeted(true);
      setTyping(true);
      timerRef.current = setTimeout(() => {
        setTyping(false);
        setMessages([mkBot(GREETING_MSG)]);
      }, 1400);
    }
    return () => clearTimeout(timerRef.current);
  }, [inView, greeted]);

  const botReply = useCallback((msgFn) => {
    setTyping(true);
    timerRef.current = setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, msgFn()]);
    }, 700 + Math.random() * 500);
  }, []);

  // Called when user sends free-form text
  const send = useCallback((text) => {
    const t = text.trim();
    if (!t) return;
    setMessages(prev => [...prev, mkUser(t)]);
    setInput('');
    inputRef.current?.focus();

    if (GREETING_RE.test(t)) {
      botReply(() => mkBot(GREETING_REPLY));
    } else {
      botReply(() => mkConnect());
    }
  }, [botReply]);

  // Called when user clicks a preset question chip
  const sendPreset = useCallback((qa) => {
    setMessages(prev => [...prev, mkUser(qa.q)]);
    botReply(() => mkBot(qa.a, qa.connect ? { email: 'sawantkumar199@gmail.com' } : {}));
  }, [botReply]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  return (
    <footer className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-container">

        {/* ── Left ─────────────────────────────────────────────────────────── */}
        <motion.div
          className="contact-left"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="contact-badge">
            <span className="contact-badge-dot" />
            Available for new opportunities
          </div>

          <h2 className="contact-title">
            Let's build<br />together.
          </h2>

          <a href="mailto:sawantkumar199@gmail.com" className="contact-email">
            sawantkumar199@gmail.com
            <ArrowUpRight size={15} className="email-arrow" />
          </a>

          <div className="social-links">
            <a href="https://github.com/Sawantkun" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.18-.35 6.5-1.59 6.5-7.14a5.4 5.4 0 0 0-1.5-3.8 5.1 5.1 0 0 0-.1-3.8s-1.2-.38-3.9 1.4a13.38 13.38 0 0 0-7 0C6.3 2.62 5.1 3 5.1 3a5.1 5.1 0 0 0-.1 3.8 5.4 5.4 0 0 0-1.5 3.8c0 5.54 3.31 6.78 6.4 7.14a4.8 4.8 0 0 0-1.1 2.9v4"/>
                <path d="M9 21c-3 1-5-1-6-3"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/sawant-kumar-367638235/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="mailto:sawantkumar199@gmail.com" aria-label="Email" className="social-link">
              <Mail size={18} />
            </a>
          </div>
        </motion.div>

        {/* ── Chat window ───────────────────────────────────────────────────── */}
        <motion.div
          className="chat-window"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="chat-header">
            <div className="chat-avatar">SK</div>
            <div className="chat-header-info">
              <span className="chat-name">Sawant Kumar</span>
              <span className="chat-status">
                <span className="chat-online-dot" />
                online
              </span>
            </div>
            <div className="chat-header-tag">portfolio assistant</div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.length === 0 && !typing && (
              <div className="chat-empty">
                <span>Scroll down to start the conversation</span>
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  className={`chat-msg ${msg.sender}`}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0,  scale: 1    }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="chat-bubble">
                    {msg.text}
                    {msg.email && (
                      <a
                        href={`mailto:${msg.email}`}
                        className="chat-connect-link"
                      >
                        {msg.email}
                      </a>
                    )}
                  </div>
                  <span className="chat-time">{fmtTime(msg.ts)}</span>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  key="typing"
                  className="chat-msg bot"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="chat-bubble typing-bubble">
                    <span /><span /><span />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={endRef} />
          </div>

          {/* Preset questions — always visible once greeting appears */}
          {messages.length > 0 && (
            <div className="quick-replies preset-questions">
              {PRESET_QA.map(qa => (
                <button key={qa.q} className="quick-chip" onClick={() => sendPreset(qa)}>
                  {qa.q}
                </button>
              ))}
            </div>
          )}

          {/* Input — greetings only hint */}
          <div className="chat-input-row">
            <input
              ref={inputRef}
              className="chat-input"
              placeholder="Say hi, or pick a question above…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
            />
            <motion.button
              className="chat-send"
              onClick={() => send(input)}
              disabled={!input.trim()}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
            >
              <Send size={14} strokeWidth={2.2} />
            </motion.button>
          </div>
        </motion.div>

      </div>

      {/* Footer */}
      <div className="contact-footer">
        <p>&copy; {new Date().getFullYear()} — Designed &amp; Developed by Sawant Kumar</p>
      </div>
    </footer>
  );
}
