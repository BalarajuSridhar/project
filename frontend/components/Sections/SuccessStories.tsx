// components/Sections/SuccessStories.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote, Star, MapPin, Briefcase } from 'lucide-react';

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
      duration: '8 weeks'
    },
    {
      name: 'Alex Chen',
      role: 'Data Analyst',
      company: 'DataInsights',
      image: '👨‍💻',
      story: 'As a complete beginner, the Data Science program transformed my career. The hands-on projects and mentor guidance were incredible. Highly recommended!',
      rating: 5,
      domain: 'Data Science',
      duration: '12 weeks'
    },
    {
      name: 'Maya Patel',
      role: 'UI/UX Designer',
      company: 'DesignStudio',
      image: '👩‍🎨',
      story: 'The design internship helped me build a strong portfolio. I learned industry-standard tools and processes that directly helped me get hired.',
      rating: 5,
      domain: 'UI/UX Design',
      duration: '6 weeks'
    },
    {
      name: 'David Kim',
      role: 'Digital Marketing Specialist',
      company: 'GrowthCo',
      image: '👨‍💼',
      story: 'Practical campaigns, real analytics, and expert feedback made all the difference. I went from zero knowledge to running successful campaigns.',
      rating: 5,
      domain: 'Digital Marketing',
      duration: '8 weeks'
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Students Trained' },
    { number: '94%', label: 'Completion Rate' },
    { number: '85%', label: 'Job Placement' },
    { number: '4.9/5', label: 'Average Rating' }
  ];

  return (
    <section id="success" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our students who transformed their careers through our structured internship programs.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-2xl p-8 hover-lift group"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-blue-600 mb-4 opacity-50" />
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Story Text */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                "{story.story}"
              </p>

              {/* Student Info */}
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{story.image}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{story.name}</h4>
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{story.role}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {story.domain}
                    </span>
                    <span>•</span>
                    <span>{story.duration}</span>
                    <span>•</span>
                    <span className="font-medium text-gray-700">{story.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who transformed their careers with our project-based internship programs.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Your Journey Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}