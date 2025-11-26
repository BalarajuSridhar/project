'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('menu-open');
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.classList.remove('menu-open');
      document.documentElement.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Domains', href: '#domains' },
    { name: 'Process', href: '#how-it-works' },
    { name: 'Success', href: '#success' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Calculate position with header offset
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Use smooth scroll behavior
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleGetStarted = () => {
    setIsMobileMenuOpen(false);
    // Scroll to domains section instead of redirecting to login
    handleNavClick('#domains');
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100' 
          : 'bg-white'
      }`}
    >
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Compact & Unique */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavClick('#home')}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-white rounded-full border border-blue-500 overflow-hidden shadow-sm">
                <Image
                  src="/images/logo/spark.jpg"
                  alt="Spark Tech Logo"
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                  priority
                />
              </div>
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3 text-orange-500 fill-current" />
              </motion.div>
            </div>
            
            <div className="flex flex-col leading-tight">
              <motion.span 
                className="text-lg font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                SPARK
              </motion.span>
              <motion.span 
                className="text-[10px] font-semibold text-orange-500 tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                TECH INTERNS
              </motion.span>
            </div>
          </motion.div>

          {/* Desktop Menu - Compact */}
          <div className="hidden md:flex items-center space-x-0">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-3 py-2 mx-1 rounded-md font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'text-orange-500'
                        : 'text-blue-800 hover:text-orange-500'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-4 h-0.5 bg-orange-500 rounded-full -translate-x-1/2"
                        layoutId="activeUnderline"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                </motion.div>
              );
            })}
            
            {/* Compact CTA Button - Now scrolls to domains */}
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#ea580c" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGetStarted}
              className="ml-3 bg-orange-500 text-white px-4 py-2 rounded-md font-semibold text-sm hover:shadow-md transition-all duration-200"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button - Compact */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-md text-blue-800 hover:bg-blue-50 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu - Compact */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-3 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="py-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`block w-full text-left px-4 py-2.5 font-medium text-sm transition-colors ${
                        isActive
                          ? 'text-orange-500 bg-orange-50 border-l-2 border-orange-500'
                          : 'text-blue-800 hover:text-orange-500 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </motion.button>
                  );
                })}
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  onClick={handleGetStarted}
                  className="w-full mx-3 my-2 bg-orange-500 text-white px-4 py-2.5 rounded-md font-semibold text-sm hover:bg-orange-600 transition-colors"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}