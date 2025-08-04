"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      },
    },
  };

  const stats = [
    { number: "2+", label: "Years Experience" },
    { number: "15+", label: "Projects Completed" },
    { number: "5+", label: "Companies Worked" },
    { number: "1", label: "Hackathon Win" },
  ];

  return (
    <section id="about" className="section-padding bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-100 mb-6">
                Passionate Full Stack Developer
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed">
                Results-driven Full Stack Web developer with over 2 years of experience in crafting
                immersive and user-centric web experiences. I specialize in modern web technologies
                and frameworks like React.js, Next.js, and Tailwind CSS.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                My passion lies in translating design concepts into responsive, high-performance
                websites that not only look great but also drive business results. I&apos;ve had the
                privilege of working with diverse teams and clients, from startups to established
                companies, delivering solutions that make a real impact.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Currently working as an Associate Consultant at NusterAi, I focus on creating
                innovative AI-powered solutions while leading web development initiatives.
                I&apos;m always eager to take on new challenges and collaborate with teams that
                share my vision for excellence.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <span className="bg-blue-900/50 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-800">
                  Problem Solver
                </span>
                <span className="bg-green-900/50 text-green-300 px-4 py-2 rounded-full text-sm font-medium border border-green-800">
                  Team Player
                </span>
                <span className="bg-purple-900/50 text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-800">
                  Innovation Focused
                </span>
                <span className="bg-orange-900/50 text-orange-300 px-4 py-2 rounded-full text-sm font-medium border border-orange-800">
                  Quick Learner
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700">
                <h4 className="text-xl font-semibold text-gray-100 mb-6">
                  Quick Facts
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location</span>
                    <span className="font-medium text-gray-200">India</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Experience</span>
                    <span className="font-medium text-gray-200">2+ Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email</span>
                    <span className="font-medium text-gray-200">sawantkumar199@gmail.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone</span>
                    <span className="font-medium text-gray-200">9643461952</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-gray-900 p-6 rounded-xl shadow-lg text-center border border-gray-700"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="text-3xl font-bold gradient-text mb-2"
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
