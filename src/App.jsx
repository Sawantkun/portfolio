import { useState, useRef } from 'react';
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
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleLoaderComplete = () => {
    setLoading(false);
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = 0.35;
    audio.loop = true;
    
    // Play with sound directly since this is triggered by a click
    audio.play()
      .then(() => setMusicPlaying(true))
      .catch((err) => console.error("Audio playback blocked:", err));
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio.play();
      setMusicPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/lofi.mp3" preload="auto" />

      <AnimatePresence>
        {loading && <Loader key="loader" onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {!loading && (
        <div className="app-container">
          <section className="hero-section">
            <Hero musicPlaying={musicPlaying} toggleMusic={toggleMusic} />
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
