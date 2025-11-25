// components/Sections/Domains.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Database, Palette, ChartBar, Smartphone, Cloud, Cpu, Globe } from 'lucide-react';

export default function Domains() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const domains = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Master frontend and backend technologies. Build responsive websites and web applications.',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
      durations: ['4 weeks', '6 weeks', '8 weeks', '12 weeks'],
      projects: 4
    },
    {
      icon: Database,
      title: 'Data Science',
      description: 'Learn data analysis, machine learning, and visualization. Work with real datasets.',
      skills: ['Python', 'Pandas', 'ML Algorithms', 'Data Visualization', 'SQL'],
      durations: ['6 weeks', '8 weeks', '12 weeks'],
      projects: 3
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Create beautiful and user-friendly interfaces. Learn design principles and prototyping.',
      skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      durations: ['4 weeks', '6 weeks', '8 weeks'],
      projects: 5
    },
    {
      icon: ChartBar,
      title: 'Digital Marketing',
      description: 'Master SEO, social media marketing, and analytics. Run real campaigns.',
      skills: ['SEO', 'Social Media', 'Google Analytics', 'Content Strategy', 'PPC'],
      durations: ['4 weeks', '6 weeks', '8 weeks'],
      projects: 3
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Build cross-platform mobile applications. Learn React Native or Flutter.',
      skills: ['React Native', 'Flutter', 'Mobile UI', 'APIs', 'App Store Deployment'],
      durations: ['6 weeks', '8 weeks', '12 weeks'],
      projects: 3
    },
    {
      icon: Cloud,
      title: 'Cloud Computing',
      description: 'Learn AWS, Azure, or Google Cloud. Deploy and manage cloud infrastructure.',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Serverless'],
      durations: ['8 weeks', '12 weeks'],
      projects: 4
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="domains" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Choose Your Domain</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select from our carefully designed internship programs. Each domain offers multiple duration options 
            and real-world projects to build your portfolio.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {domains.map((domain, index) => (
            <motion.div
              key={domain.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover-lift group"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <domain.icon size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{domain.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{domain.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Skills You'll Learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {domain.skills.map((skill) => (
                        <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Duration Options:</h4>
                    <div className="flex flex-wrap gap-2">
                      {domain.durations.map((duration) => (
                        <span key={duration} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {duration}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-600">
                      {domain.projects} real projects
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}