"use client"

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Loading from "./components/loading";
import { MdArrowOutward } from "react-icons/md";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import Menu from "./components/menu";
import { AnimatePresence } from "framer-motion";



export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen((prev) => !prev);
    };
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const requestRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Adds delay between children animations
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const initialsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 1, // Delay for initials
      },
    },
  };

  const menuVariants = {
    closed: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
    },
    open: {
      scale: 50,
      opacity: 1,
      x: "-50vw",
      y: "-50vh",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  };


  // Mouse move event to track cursor position smoothly
  useEffect(() => {
    let x = 0;
    let y = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const updateCursor = () => {
      const cursor = cursorRef.current;

      if (cursor) {
        const distX = x - lastX;
        const distY = y - lastY;

        lastX += distX / 6; // Control smoothing factor
        lastY += distY / 6; // Control smoothing factor

        cursor.style.transform = `translate3d(${lastX - 15}px, ${lastY - 15}px, 0)`; // Center the cursor
      }

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Start the animation loop
    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.mixBlendMode = "difference"; // Use 'difference' blend mode to make it contrast with text
    }
  };

  const handleMouseLeave = () => {
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.mixBlendMode = "normal"; // Reset mix-blend mode
    }
  };

  return (
    <div
      className={`relative font-poppins text-[#BFBFC6]`}
      style={{
        background: "linear-gradient(135deg, #0c0b0e, #2c3e50)", // Subtle blue-black gradient
        minHeight: "100vh",
      }}
    >
      {!isLoaded && <Loading onFinish={() => setIsLoaded(true)} />}
      <motion.div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center h-screen z-40"
        initial={{ opacity: 0, y: 50 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.main
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <motion.h1
            className="text-[5rem] font-bold leading-[70px] z-[200]"
            variants={textVariants}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Hello! I'm Sawant
          </motion.h1>
          <motion.p className="mt-4 text-7xl" variants={textVariants} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            Software Developer
          </motion.p>
          <motion.p className="mt-6 pt-8 px-8 text-xl text-gray-500" variants={textVariants} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            I build components that surfs around the web
          </motion.p>

          {/* Button */}
          <motion.button
            className="mt-8 mx-auto px-5 py-3 border-[1px] border-[#BFBFC6] text-[#BFBFC6] text-md rounded-full shadow-md bg-transparent flex items-center justify-center space-x-2 font-light "
            variants={textVariants}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span>My Work!</span>
            <MdArrowOutward className="text-3xl" />
          </motion.button>
        </motion.main>
      </motion.div>

      {/* Social Media Icons */}
      <motion.div
        className="absolute inset-0"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* GitHub */}
        <motion.div
          className="flex items-center justify-center w-16 h-16 bg-black text-white rounded-full cursor-pointer  hover:bg-gray-800 z-[100]"
          variants={iconVariants}
          style={{
            position: "absolute",
            bottom: "300px",
            right: "200px",
            backgroundColor: "#333", // GitHub color
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-full"
          >
            <FaGithub className="text-3xl" />
          </a>
        </motion.div>

        {/* LinkedIn */}
        <motion.div
          className="flex items-center justify-center w-16 h-16 bg-blue-700 text-white rounded-full cursor-pointer  hover:bg-blue-600 z-[200]"
          variants={iconVariants}
          style={{
            position: "absolute",
            top: "100px",
            left: "300px",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-full"
          >
            <FaLinkedin className="text-3xl" />
          </a>
        </motion.div>

        {/* Mail */}
        <motion.div
          className="flex items-center justify-center w-16 h-16 bg-rose-700 text-white rounded-full cursor-pointer  hover:bg-rose-600 z-[200]"
          variants={iconVariants}
          style={{
            position: "absolute",
            bottom: "100px",
            right: "500px",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href="mailto:your.email@example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full h-full"
          >
            <FaEnvelope className="text-3xl" />
          </a>
        </motion.div>
      </motion.div>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="absolute w-20 h-20 bg-[#BFBFC6] rounded-full pointer-events-none z-[400] "
        style={{
          transition: "none", // Disable transition to improve smoothness
        }}
      ></div>

{/* Initials (SK) */}
<motion.div
  className="absolute bottom-10 left-10 text-3xl font-bold  z-50 text-[#BFBFC6]"
  variants={initialsVariants}
  initial="hidden"
  animate={isLoaded ? "visible" : "hidden"}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  SK
</motion.div>

{/* Menu icon at the bottom right */}
<motion.div
        className="fixed bottom-10 right-10 w-14 h-14 bg-gray-800 text-white rounded-full flex items-center justify-center cursor-pointer z-[500]"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        >
      </motion.div>
       <FaBars onClick={toggleMenu}  className="text-3xl fixed bottom-[46px] right-[46px] z-[900] transition-all cursor-pointer" />
      {/* Expanded Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-800 text-white flex flex-col items-center justify-center z-[4000]"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
          >
            <ul className="text-4xl space-y-6 text-center">
              <li className="hover:text-gray-400 cursor-pointer">Home</li>
              <li className="hover:text-gray-400 cursor-pointer">Project</li>
              <li className="hover:text-gray-400 cursor-pointer">Experience</li>
              <li className="hover:text-gray-400 cursor-pointer">Contact</li>
            </ul>
            <button
              className="mt-10 px-6 py-3 text-lg bg-gray-700 rounded-md hover:bg-gray-600"
              onClick={toggleMenu}
            >
              Close Menu
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
