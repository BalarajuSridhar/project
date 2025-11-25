// components/Sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code, Database, Palette, ChartBar, Users, Clock, Target } from 'lucide-react';

export default function Hero() {
  const domains = [
    { icon: Code, name: 'Web Dev', color: 'blue', projects: 12 },
    { icon: Database, name: 'Data Science', color: 'green', projects: 8 },
    { icon: Palette, name: 'UI/UX Design', color: 'purple', projects: 10 },
    { icon: ChartBar, name: 'Digital Marketing', color: 'orange', projects: 6 },
  ];

  const stats = [
    { icon: Users, value: '500+', label: 'Aspiring Developers' },
    { icon: Clock, value: '4-12', label: 'Weeks Duration' },
    { icon: Target, value: '30+', label: 'Real Projects' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white pt-16">
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main Heading */}
          <motion.h1 
            className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Launch your
            <motion.span 
              className="block text-blue-600 mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              tech career
            </motion.span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-serif leading-relaxed"
          >
            Master in-demand skills through structured internship programs. 
            Build real-world projects with expert guidance.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#1e40af" }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Start Learning <ArrowRight size={18} />
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Domain Quick Links - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Popular Domains
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {domains.map((domain, index) => (
                <motion.div
                  key={domain.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 group cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <domain.icon 
                    className={`h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform
                      ${domain.color === 'blue' ? 'text-blue-600' : ''}
                      ${domain.color === 'green' ? 'text-green-600' : ''}
                      ${domain.color === 'purple' ? 'text-purple-600' : ''}
                      ${domain.color === 'orange' ? 'text-orange-600' : ''}
                    `} 
                  />
                  <div className="text-sm font-medium text-gray-900 text-center mb-1">
                    {domain.name}
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    {domain.projects} projects
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Trust Indicator - Minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.5 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 font-medium">
              Join 500+ developers who launched their careers with us
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}