// components/Sections/Domains.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Database, Palette, ChartBar, Smartphone, Cloud, ArrowRight } from 'lucide-react';

export default function Domains() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const domains = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Master frontend and backend technologies. Build responsive websites.',
      skills: ['React', 'Node.js', 'MongoDB'],
      duration: '4-12 weeks',
      color: 'blue'
    },
    {
      icon: Database,
      title: 'Data Science',
      description: 'Learn data analysis, machine learning, and visualization.',
      skills: ['Python', 'ML', 'SQL'],
      duration: '6-12 weeks',
      color: 'green'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Create beautiful and user-friendly interfaces.',
      skills: ['Figma', 'Prototyping', 'Research'],
      duration: '4-8 weeks',
      color: 'purple'
    },
    {
      icon: ChartBar,
      title: 'Digital Marketing',
      description: 'Master SEO, social media, and analytics.',
      skills: ['SEO', 'Analytics', 'Content'],
      duration: '4-8 weeks',
      color: 'orange'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Build cross-platform mobile applications.',
      skills: ['React Native', 'APIs', 'UI'],
      duration: '6-12 weeks',
      color: 'indigo'
    },
    {
      icon: Cloud,
      title: 'Cloud Computing',
      description: 'Learn AWS, Azure, and cloud deployment.',
      skills: ['AWS', 'Docker', 'CI/CD'],
      duration: '8-12 weeks',
      color: 'cyan'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; hover: string; light: string } } = {
      blue: { 
        bg: 'bg-blue-600', 
        text: 'text-blue-600', 
        hover: 'hover:bg-blue-700',
        light: 'bg-blue-50'
      },
      orange: { 
        bg: 'bg-orange-500', 
        text: 'text-orange-500', 
        hover: 'hover:bg-orange-600',
        light: 'bg-orange-50'
      },
      green: { 
        bg: 'bg-green-600', 
        text: 'text-green-600', 
        hover: 'hover:bg-green-700',
        light: 'bg-green-50'
      },
      purple: { 
        bg: 'bg-purple-600', 
        text: 'text-purple-600', 
        hover: 'hover:bg-purple-700',
        light: 'bg-purple-50'
      },
      indigo: { 
        bg: 'bg-indigo-600', 
        text: 'text-indigo-600', 
        hover: 'hover:bg-indigo-700',
        light: 'bg-indigo-50'
      },
      cyan: { 
        bg: 'bg-cyan-600', 
        text: 'text-cyan-600', 
        hover: 'hover:bg-cyan-700',
        light: 'bg-cyan-50'
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id="domains" ref={ref} className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Domain</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select from our specialized internship programs. Each domain offers practical skills and real projects.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {domains.map((domain, index) => {
            const colors = getColorClasses(domain.color);
            return (
              <motion.div
                key={domain.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-6">
                  {/* Header with Icon and Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${colors.light} rounded-lg flex items-center justify-center group-hover:${colors.bg} group-hover:text-white transition-all duration-300`}>
                      <domain.icon size={24} />
                    </div>
                    <motion.div
                      whileHover={{ x: 3 }}
                      className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${colors.text}`}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">
                    {domain.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {domain.description}
                  </p>
                  
                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {domain.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className={`${colors.light} ${colors.text} px-2.5 py-1 rounded-md text-xs font-medium`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className={`text-sm font-semibold ${colors.text}`}>
                      {domain.duration}
                    </span>
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className={`${colors.bg} text-white px-3 py-1.5 rounded-lg text-xs font-medium ${colors.hover} transition-colors`}
                    >
                      Explore
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#ea580c" }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all duration-200"
          >
            View All Programs
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}