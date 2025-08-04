"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket } from "react-icons/fa";
import { BiTime } from "react-icons/bi";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Haigge",
      duration: "Summer 2025",
      status: "In Development",
      description: "AI-based virtual try-on ecommerce platform that revolutionizes online shopping by allowing customers to virtually try on products before purchasing.",
      technologies: ["Next.js", "React", "AI/ML", "Computer Vision", "Tailwind CSS"],
      github: "https://github.com/Sawantkun/haigge.git",
      live: "https://haigge.vercel.app/",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      featured: true
    },
    {
      title: "Alumni Portal",
      duration: "Fall 2023",
      status: "Completed",
      description: "Connecting Generation Building Futures - A comprehensive alumni portal for universities to maintain connections between alumni and current students.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Bootstrap"],
      github: "https://github.com/Sawantkun/minor",
      live: "https://alumni-portal-sable.vercel.app/",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
      featured: true
    },
    {
      title: "NusterAi Website",
      duration: "Spring 2024",
      status: "Completed",
      description: "Transform Your Business with AI Agents - A modern website showcasing AI solutions and services for businesses looking to integrate artificial intelligence.",
      technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/Sawantkun/nusteraiwebsite",
      live: "https://nusteraiwebsite.vercel.app/",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      featured: true
    },
    {
      title: "Planit.io - Meeting Scheduler",
      duration: "Aug 2022",
      status: "Completed",
      description: "A Meeting Scheduling Web App built during iNeuron Hackathon. Secured 2nd place with innovative scheduling features and user-friendly interface.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      github: "#",
      live: "https://planitio.vercel.app",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      featured: false,
      award: "2nd Place - iNeuron Hackathon"
    },
    {
      title: "Drone Console",
      duration: "Jul 2022",
      status: "Completed",
      description: "Developed a UI for a drone console/controller during an experience at Omnipresent RobotTech, incorporating Flask and WebSockets for real-time data handling.",
      technologies: ["Python", "Flask", "WebSockets", "JavaScript", "HTML/CSS"],
      github: "#",
      live: "#",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop",
      featured: false
    },
    {
      title: "Real-time Chat Application",
      duration: "Spring 2023",
      status: "Completed",
      description: "A real-time chat application using Python's Flask and Socket.IO for seamless communication between clients and servers.",
      technologies: ["Python", "Flask", "Socket.IO", "JavaScript", "WebSockets"],
      github: "#",
      live: "#",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop",
      featured: false
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="section-padding bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-gray-300 text-lg mt-6 max-w-3xl mx-auto">
              A showcase of my recent work and projects that demonstrate my skills in modern web development and innovative solutions
            </p>
          </motion.div>

          {/* Featured Projects */}
          <div className="space-y-16 mb-20">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center`}
              >
                <div className="lg:w-1/2">
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-3">
                        {project.github !== "#" && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-800/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-gray-800/30 transition-colors duration-200"
                          >
                            <FaGithub />
                          </a>
                        )}
                        {project.live !== "#" && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-800/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-gray-800/30 transition-colors duration-200"
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-3xl font-bold text-gray-100">
                      {project.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'In Development'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-300 gap-4">
                    <div className="flex items-center">
                      <BiTime className="mr-2" />
                      <span>{project.duration}</span>
                    </div>
                  </div>

                  {project.award && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg inline-block">
                      🏆 {project.award}
                    </div>
                  )}

                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    {project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                      >
                        <FaGithub className="mr-2" />
                        View Code
                      </a>
                    )}
                    {project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <FaRocket className="mr-2" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other Projects */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-100 mb-4">
              Other Projects
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-700"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'In Development'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-100 mb-2">
                    {project.title}
                  </h4>

                  <div className="flex items-center text-gray-300 text-sm mb-3">
                    <BiTime className="mr-1" />
                    <span>{project.duration}</span>
                  </div>

                  {project.award && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-lg text-xs font-medium mb-3 inline-block">
                      🏆 {project.award}
                    </div>
                  )}

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-gray-500 text-xs px-2 py-1">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    {project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-gray-100 transition-colors duration-200"
                      >
                        <FaGithub className="text-lg" />
                      </a>
                    )}
                    {project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        <FaExternalLinkAlt className="text-lg" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
