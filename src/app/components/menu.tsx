"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Menu({ isOpen, onClose }) {
  const menuVariants = {
    hidden: { x: "100%" }, // Start off-screen
    visible: {
      x: 0, // Slide into view
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      x: "100%", // Slide back out
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[300] flex flex-col items-center justify-center space-y-6"
      style={{
        background: "#2c3e50", // Subtle blue-black gradient
        minHeight: "100vh",
      }}
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <a href="#link1" className="text-white text-3xl">
        Link 1
      </a>
      <a href="#link2" className="text-white text-3xl">
        Link 2
      </a>
      <a href="#link3" className="text-white text-3xl">
        Link 3
      </a>
      <a href="#link4" className="text-white text-3xl">
        Link 4
      </a>
    </motion.div>
  );
}
