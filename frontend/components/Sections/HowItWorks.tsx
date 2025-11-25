// components/Sections/HowItWorks.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Calendar, FolderOpen, Award, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      icon: Search,
      title: 'Choose Domain & Duration',
      description: 'Browse our domains and select the duration that fits your schedule.',
      step: '1'
    },
    {
      icon: Calendar,
      title: 'Get Learning Plan',
      description: 'Receive structured curriculum and weekly milestones.',
      step: '2'
    },
    {
      icon: FolderOpen,
      title: 'Build Real Projects',
      description: 'Work on industry projects with mentor guidance.',
      step: '3'
    },
    {
      icon: Award,
      title: 'Get Certified',
      description: 'Receive certificate and portfolio for your career.',
      step: '4'
    },
  ];

  return (
    <section id="how-it-works" ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple 4-step process to kickstart your tech career through hands-on internship experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <step.icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-gray-300 group-hover:text-blue-200 transition-colors">
                  {step.step}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Simple CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to Start Your Journey?</h3>
            <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
              Join thousands of students who transformed their careers with our internship programs.
            </p>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#1e40af" }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto shadow-sm hover:shadow-md transition-all duration-200"
            >
              Browse All Domains
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}