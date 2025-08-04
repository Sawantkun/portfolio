"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      company: "NusterAi",
      position: "Associate Consultant",
      location: "Remote",
      duration: "Oct 2024 – Present",
      current: true,
      responsibilities: [
        "Creating innovative mobile and web applications using React.js, focusing on responsive design and optimal user experience",
        "Collaborating with cross-functional teams to develop AI-powered solutions and integrate cutting-edge technologies into client projects",
        "Consulting with clients to understand their business requirements and translating them into scalable technical solutions"
      ],
      technologies: ["React.js", "AI Integration", "Consulting", "Mobile Development"]
    },
    {
      company: "Futuristic Bots",
      position: "Project Engineer",
      location: "Haridwar",
      duration: "Mar 2024 – Sep 2024",
      current: false,
      responsibilities: [
        "Worked on developing automation solutions for forklifts, focusing on integrating autonomous capabilities for improved efficiency",
        "Conducted tests and assessments on automated forklift performance to ensure safe and efficient operations in diverse environments",
        "Collaborated with a team to design and implement solutions that optimize forklift navigation and task execution"
      ],
      technologies: ["Automation", "Testing", "Team Collaboration", "Solution Design"]
    },
    {
      company: "Invofy",
      position: "Web Development Experience",
      location: "Remote",
      duration: "Sep 2023 – Feb 2024",
      current: false,
      responsibilities: [
        "Implemented dynamic web applications using Next.js, leveraging React components for frontend development",
        "Designed and developed responsive user interfaces using Bootstrap framework, ensuring cross-device compatibility and optimal user experience",
        "Collaborated with a multidisciplinary team to deliver features, conduct code reviews, and optimize performance for Invofy's web-based solutions"
      ],
      technologies: ["Next.js", "React", "Bootstrap", "Code Reviews"]
    },
    {
      company: "Frienducation",
      position: "Web Development Experience",
      location: "Remote",
      duration: "Nov 2022 – Mar 2023",
      current: false,
      responsibilities: [
        "Developed responsive user interfaces and interactive components using ReactJS for educational platforms",
        "Collaborated closely with team members to implement new features and optimize existing codebase for improved performance",
        "Documented technical specifications and project progress to facilitate seamless knowledge sharing among team members"
      ],
      technologies: ["ReactJS", "Educational Platforms", "Documentation", "Performance Optimization"]
    },
    {
      company: "Omnipresent RobotTech",
      position: "Web Development and Python Experience",
      location: "Greater Noida",
      duration: "Jul 2022 – Aug 2022",
      current: false,
      responsibilities: [
        "Developed responsive user interfaces for enhancing the UI of Drone Consoles and improving the overall user experience",
        "Collaborated with a team to design and develop a web console for drone tracking, which included live streaming of locations and storing telemetry data",
        "Utilized Python with Flask and WebSockets for backend development to handle data processing and communication between the drone console and server",
        "Gained hands-on experience with APIs and integrated Python-based functionalities to enhance the drone console's capabilities"
      ],
      technologies: ["Python", "Flask", "WebSockets", "API Integration", "Drone Technology"]
    }
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="experience" className="section-padding bg-gray-800">
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
              Professional Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-gray-300 text-lg mt-6 max-w-3xl mx-auto">
              My professional journey through various roles and companies, building expertise in web development and innovative technologies
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 hidden md:block"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg hidden md:block"></div>

                  <div className="md:ml-20 bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-100 mb-2">
                          {exp.position}
                        </h3>
                        <h4 className="text-xl font-semibold text-blue-600 mb-2">
                          {exp.company}
                        </h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-300">
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="mr-2 text-sm" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-sm" />
                            <span>{exp.duration}</span>
                          </div>
                        </div>
                      </div>
                      {exp.current && (
                        <div className="mt-4 md:mt-0">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            Current
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-100 mb-3 flex items-center">
                        <FaBriefcase className="mr-2" />
                        Key Responsibilities
                      </h5>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((responsibility, respIndex) => (
                          <li key={respIndex} className="text-gray-300 flex">
                            <span className="text-blue-500 mr-3 mt-2">•</span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-100 mb-3">
                        Technologies & Skills
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
