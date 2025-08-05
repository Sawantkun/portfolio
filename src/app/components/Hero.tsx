"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const socialLinks = [
    {
      icon: <FaGithub />,
      href: "https://github.com/Sawantkun",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin />,
      href: "https://linkedin.com/in/sawant-kumar",
      label: "LinkedIn",
    },
    {
      icon: <FaEnvelope />,
      href: "mailto:sawantkumar199@gmail.com",
      label: "Email",
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center hero-bg pt-20">
      <div className="container mx-auto px-6 text-center text-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
              Sawant Kumar
            </span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-4xl font-semibold mb-6 text-gray-200"
          >
            Full Stack Web Developer
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Results-driven Full Stack Web developer adept at crafting immersive and user-centric web experiences.
            Proficient in React.js, Next.js, and Tailwind, with a passion for translating design concepts into
            responsive websites that drive business results.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gray-800 text-purple-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300 flex items-center gap-2"
            >
              Get In Touch <MdArrowOutward />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 hover:text-purple-700 transition-all duration-300 flex items-center gap-2"
            >
              Download CV <FaDownload />
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-6"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="text-2xl text-white/80 hover:text-white transition-colors duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:block hidden"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gray-800/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
