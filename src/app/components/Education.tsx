"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaStar, FaTrophy } from "react-icons/fa";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const education = {
    university: "Gautam Buddha University",
    college: "School of Information and Technology",
    location: "Greater Noida",
    program: "Bachelor of Technology",
    specialization: "Computer Science Engineering",
    graduation: "May 2025",
    gpa: "8.5",
    coursework: "Software Languages and Programmable Logic"
  };

  const activities = [
    {
      title: "iNeuron Hackathon",
      role: "Team Lead & Developer",
      achievement: "2nd Place Winner",
      duration: "Aug 2022",
      description: "Led a team of four to build Meeting Scheduling Web App (Planit.io) and secured 2nd place in the iNeuron Hackathon",
      technologies: ["React.js", "Node.js", "MongoDB", "Team Leadership"]
    },
    {
      title: "Google Development Students Club, GBU",
      role: "Web Development Lead",
      achievement: "Leadership Role",
      duration: "Mar 2023",
      description: "Spearheaded initiatives, mentored developers, and organized events to foster technical proficiency and innovation",
      technologies: ["React.js", "Redux", "Node.js", "Mentorship", "Event Management"]
    }
  ];

  const achievements = [
    "8.5 GPA in Computer Science Engineering",
    "2nd Place in iNeuron Hackathon",
    "Web Development Lead at GDSC GBU",
    "FreeCodeCamp Frontend Development Certification",
    "15+ Projects Completed",
    "5+ Companies Experience"
  ];

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

  return (
    <section id="education" className="section-padding bg-gray-800">
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
              Education & Activities
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-gray-300 text-lg mt-6 max-w-3xl mx-auto">
              My academic journey and extracurricular activities that shaped my technical expertise and leadership skills
            </p>
          </motion.div>

          {/* Education Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full text-white text-2xl mr-6">
                  <FaGraduationCap />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-100">
                    {education.program}
                  </h3>
                  <p className="text-lg text-blue-600 font-semibold">
                    {education.specialization}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaUniversity className="text-blue-500 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-100">{education.university}</p>
                      <p className="text-gray-300">{education.college}</p>
                      <p className="text-gray-500">{education.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaCalendarAlt className="text-purple-500 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-100">Graduation</p>
                      <p className="text-gray-300">{education.graduation}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-100">GPA</p>
                      <p className="text-gray-300">{education.gpa}/10.0</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-100 mb-2">Relevant Coursework</p>
                    <p className="text-gray-300">{education.coursework}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activities Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-3xl font-bold text-gray-100 mb-8 text-center">
              Leadership & Activities
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-full text-white text-xl mr-4">
                      <FaTrophy />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-100">
                        {activity.title}
                      </h4>
                      <p className="text-green-600 font-semibold">
                        {activity.achievement}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold text-gray-200">{activity.role}</p>
                    <p className="text-gray-500 text-sm">{activity.duration}</p>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {activity.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {activity.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-gray-100 mb-8 text-center">
              Key Achievements
            </h3>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center bg-gray-800/20 rounded-lg p-4"
                  >
                    <FaStar className="text-yellow-300 mr-3 text-lg flex-shrink-0" />
                    <span className="font-medium">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
