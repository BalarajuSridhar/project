// components/Sections/HowItWorks.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Calendar, FolderOpen, Award } from 'lucide-react';

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      icon: Search,
      title: 'Choose Domain & Duration',
      description: 'Browse our domains and select the duration that fits your schedule (4, 6, 8, or 12 weeks).',
      step: '01'
    },
    {
      icon: Calendar,
      title: 'Get Learning Plan',
      description: 'Receive structured curriculum, project guidelines, and weekly milestones.',
      step: '02'
    },
    {
      icon: FolderOpen,
      title: 'Build Real Projects',
      description: 'Work on industry-relevant projects with mentor guidance and peer collaboration.',
      step: '03'
    },
    {
      icon: Award,
      title: 'Get Certified',
      description: 'Receive completion certificate and project portfolio for your career.',
      step: '04'
    },
  ];

  return (
    <section id="how-it-works" ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple 4-step process to kickstart your tech career through hands-on internship experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{step.step}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students who transformed their careers with our internship programs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Browse All Domains
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}