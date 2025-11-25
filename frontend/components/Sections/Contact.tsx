// components/Sections/Contact.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Users } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email us',
      content: 'hello@sparktech.com',
      link: 'mailto:hello@sparktech.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call us',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      description: 'Mon to Fri, 9am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Office',
      content: '123 Tech Street, Innovation City',
      link: '#',
      description: 'Visit our headquarters'
    }
  ];

  const domains = [
    'Web Development',
    'Data Science', 
    'UI/UX Design',
    'Digital Marketing',
    'Mobile Development',
    'Cloud Computing'
  ];

  return (
    <section id="contact" ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to start your tech journey? We're here to help you choose the right path.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Start Your Journey</h3>
              <p className="text-gray-600 text-sm mb-6">
                Whether you're exploring domains or ready to enroll, we'll help you find the perfect internship program.
              </p>
            </div>
            
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.title}
                href={item.link}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <item.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-gray-900 text-sm font-medium">{item.content}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.description}</p>
                </div>
              </motion.a>
            ))}

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-blue-50 rounded-xl p-6 border border-blue-100"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900 text-sm">Fast Response</h4>
              </div>
              <p className="text-gray-600 text-sm">
                We typically respond within 2 hours during business days to help you get started quickly.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-colors text-sm"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-colors text-sm"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                  Interested Domain
                </label>
                <select
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-colors text-sm"
                  required
                >
                  <option value="">Select a domain</option>
                  {domains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-colors text-sm resize-none"
                  placeholder="Tell us about your goals or questions..."
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, backgroundColor: "#1e40af" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 text-sm shadow-sm hover:shadow-md"
              >
                Send Message
                <Send size={16} />
              </motion.button>

              <p className="text-xs text-gray-500 text-center mt-4">
                We'll get back to you within 2 hours during business days.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 max-w-2xl mx-auto">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Immediate Help?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Check our FAQ section or browse available domains to get quick answers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm border border-blue-200 hover:border-blue-300 transition-colors"
              >
                Browse Domains
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                View FAQ
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}