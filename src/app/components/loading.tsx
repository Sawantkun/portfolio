"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoadingProps {
  onFinish: () => void;
}

const Loading: React.FC<LoadingProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const text = "Designing the Future, One Pixel and Line of Code at a Time—Get Ready to Explore!";

  useEffect(() => {
    // Timer animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 20); // Adjust speed as needed

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setAnimationComplete(true); // Trigger the animation
        setTimeout(() => {
          onFinish(); // Notify parent after animation completes
        }, 800); // Match this duration with the sliding animation duration
      }, 500); // Small delay after hitting 100
    }
  }, [progress, onFinish]);

  const letterAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: (index * 20) / 1000, // Delay each letter based on its position
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center  text-white z-[1000] "
      style={{
        background: "linear-gradient(135deg, #0c0b0e, #2c3e50)", // Subtle blue-black gradient
        minHeight: "100vh",
      }}
      initial={{ y: 0 }}
      animate={animationComplete ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Progress Timer */}
      <motion.div
        className="text-[8rem] absolute bottom-0 right-10 font-bold text-[#BFBFC6]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {progress}%
      </motion.div>

      {/* Highlight Text Animation */}
      <div className="text-4xl font-semibold absolute bottom-[100px] left-10 max-w-[515px] leading-[50px] text-[#BFBFC6]">
        {Array.from(text).map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            initial="initial"
            animate="animate"
            custom={index}
            className="inline-block"
            style={{
              opacity:
                index <= Math.floor((progress / 100) * text.length)
                  ? 1
                  : 0.2, // Opacity changes from 0.2 to 1
              transition: "opacity 0.3s ease", // Smooth transition for opacity change
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>

      {/* Loading Dots Animation */}
      <motion.div
        className="absolute bottom-10 left-10 flex items-center text-2xl font-medium text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Loading
        <div className="flex ml-2 space-x-1 ">
          {[...Array(3)].map((_, index) => (
            <motion.span
              key={index}
              className="inline-block w-2 h-2 bg-gray-500 rounded-full "
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loading;
