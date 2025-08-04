"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loading: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 2;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
    >
      <div className="text-center text-white">
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-8"
        >
          Sawant Kumar
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg md:text-xl mb-8"
        >
          Full Stack Developer
        </motion.p>
        <div className="w-64 mx-auto bg-gray-800/20 rounded-full h-2 mb-4">
          <motion.div
            className="bg-gray-800 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="text-sm opacity-75">{progress}%</p>
      </div>
    </motion.div>
  );
};

export default Loading;
