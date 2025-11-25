// components/Sections/SuccessStories.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote, Star, Briefcase, ArrowRight, Users, Target, Award, Clock } from 'lucide-react';

export default function SuccessStories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stories = [
    {
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      company: 'TechCorp',
      image: '👩‍💻',
      story: 'The 8-week Web Development internship gave me the practical skills I needed. I built 4 real projects and landed my first job within 2 weeks of completion!',
      rating: 5,
      domain: 'Web Development',
      duration: '8 weeks',
      projects: 4
    },
    {
      name: 'Alex Chen',
      role: 'Data Analyst',
      company: 'DataInsights',
      image: '👨‍💻',
      story: 'As a complete beginner, the Data Science program transformed my career. The hands-on projects and mentor guidance were incredible.',
      rating: 5,
      domain: 'Data Science',
      duration: '12 weeks',
      projects: 3
    },
    {
      name: 'Maya Patel',
      role: 'UI/UX Designer',
      company: 'DesignStudio',
      image: '👩‍🎨',
      story: 'The design internship helped me build a strong portfolio. I learned industry-standard tools and processes that directly helped me get hired.',
      rating: 5,
      domain: 'UI/UX Design',
      duration: '6 weeks',
      projects: 5
    },
    {
      name: 'David Kim',
      role: 'Digital Marketing Specialist',
      company: 'GrowthCo',
      image: '👨‍💼',
      story: 'Practical campaigns, real analytics, and expert feedback made all the difference. I went from zero knowledge to running successful campaigns.',
      rating: 5,
      domain: 'Digital Marketing',
      duration: '8 weeks',
      projects: 3
    }
  ];

  const stats = [
    { icon: Users, number: '2,500+', label: 'Students Trained' },
    { icon: Target, number: '94%', label: 'Completion Rate' },
    { icon: Award, number: '85%', label: 'Job Placement' },
    { icon: Clock, number: '4.9/5', label: 'Average Rating' }
  ];

  return (
    <section id="success" ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our students who transformed their careers through our structured internship programs.
          </p>
        </motion.div>

        {/* Stats - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100"
            >
              <stat.icon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -3 }}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 group"
            >
              {/* Header with Rating */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-5 w-5 text-blue-600 opacity-60" />
              </div>

              {/* Story Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                "{story.story}"
              </p>

              {/* Student Info */}
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{story.image}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{story.name}</h4>
                    <Briefcase className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600 text-sm">{story.role}</span>
                  </div>
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                      {story.domain}
                    </span>
                    <span className="text-gray-500 text-xs">• {story.duration}</span>
                    <span className="text-gray-500 text-xs">• {story.projects} projects</span>
                    <span className="text-gray-700 text-xs font-medium">{story.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simple CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Your Success Story</h3>
            <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
              Join thousands of students who transformed their careers with our project-based internship programs.
            </p>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#1e40af" }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto shadow-sm hover:shadow-md transition-all duration-200"
            >
              Begin Your Journey
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}