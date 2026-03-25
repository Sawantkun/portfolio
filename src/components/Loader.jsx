import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowButton(true);
          return 100;
        }
        // Random increment between 5-15
        return prev + Math.floor(Math.random() * 10) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []); // Removed onComplete from here, it will be triggered by button

  return (
    <motion.div 
      className="loader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="loader-content">
        {!showButton ? (
          <>
            <motion.h1 
              className="loader-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {progress}%
            </motion.h1>
            <div className="progress-bar-container">
              <motion.div 
                className="progress-bar"
                style={{ width: `${progress}%` }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
          </>
        ) : (
          <motion.button
            className="hack-button"
            onClick={onComplete}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Hack into the portfolio
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
