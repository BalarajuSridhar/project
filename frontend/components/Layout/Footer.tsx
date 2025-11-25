// frontend/components/Layout/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp, Mail, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Programs',
      links: ['Web Development', 'Data Science', 'UI/UX Design', 'Digital Marketing', 'Mobile Development', 'Cloud Computing']
    },
    {
      title: 'Company',
      links: ['About Us', 'Success Stories', 'Blog', 'Contact']
    },
    {
      title: 'Support',
      links: ['FAQ', 'Help Center', 'Internship Guide', 'Career Tips']
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, #3b82f6 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  SPARK TECH
                </h3>
                <p className="text-xs font-medium text-blue-400 -mt-1">INTERNS</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-6 max-w-md leading-relaxed">
              Launch your tech career with structured internship programs. 
              Master in-demand skills through real-world projects and expert mentorship.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>hello@sparktech.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={14} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="font-semibold text-gray-100 text-sm mb-4 uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3, color: "#60a5fa" }}
                      className="text-gray-400 text-sm hover:text-blue-400 transition-colors block py-1"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © 2024 Spark Tech Interns. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start space-x-4 mt-2">
              <a href="#" className="text-gray-500 hover:text-blue-400 text-xs transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 text-xs transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 text-xs transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors shadow-sm hover:shadow-md"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} className="text-white" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gray-800 border-t border-gray-700"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h4 className="font-semibold text-gray-100 text-sm mb-1">Ready to start your journey?</h4>
              <p className="text-gray-400 text-xs">Join 500+ developers building their careers</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#ea580c" }}
              whileTap={{ scale: 0.98 }}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium text-sm hover:shadow-md transition-all duration-200"
            >
              Browse Domains
            </motion.button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}