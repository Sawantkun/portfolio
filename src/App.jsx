import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Dock from './components/Dock';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <div className="app-container">
          <section className="hero-section">
            <Hero />
          </section>
          
          <main>
            <About />
            <Experience />
            <Projects />
          </main>

          
          <Contact />
        </div>
      )}

      <Dock />
    </>
  );
}

export default App;
