'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, User, Settings, LogOut, Home, BookOpen, BarChart3, Sparkles } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Internships', href: '/dashboard/internships', icon: BookOpen },
    { name: 'Progress', href: '/dashboard/progress', icon: BarChart3 },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    // You can add smooth scrolling logic here if needed
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Matching Main Website */}
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
            {/* Logo - Same as Main Header */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => handleNavClick('/dashboard')}
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
                  DASHBOARD
                </motion.span>
              </div>
            </motion.div>

            {/* Desktop Navigation - Compact */}
            <div className="hidden md:flex items-center space-x-0">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const isActive = false; // You can add active state logic here
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`relative flex items-center space-x-2 px-3 py-2 mx-1 rounded-md font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? 'text-orange-500'
                          : 'text-blue-800 hover:text-orange-500'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-1/2 w-4 h-0.5 bg-orange-500 rounded-full -translate-x-1/2"
                          layoutId="activeUnderline"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </a>
                  </motion.div>
                );
              })}
            </div>

            {/* User Section - Compact */}
            <div className="hidden md:flex items-center space-x-3">
              {/* User Info */}
              <div className="text-right">
                <p className="text-sm font-medium text-blue-800">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-blue-600">{user?.email}</p>
              </div>
              
              {/* User Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200 cursor-pointer"
              >
                <span className="text-sm font-medium text-blue-600">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </span>
              </motion.div>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#ea580c" }}
                whileTap={{ scale: 0.98 }}
                onClick={logout}
                className="bg-orange-500 text-white px-3 py-1.5 rounded-md font-semibold text-sm hover:shadow-md transition-all duration-200"
              >
                Logout
              </motion.button>
            </div>

            {/* Mobile Menu Button - Compact */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-md text-blue-800 hover:bg-blue-50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>

          {/* Mobile Menu - Compact */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-3 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="py-2">
                  {navigation.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleNavClick(item.href)}
                        className="flex items-center space-x-3 px-4 py-2.5 font-medium text-sm text-blue-800 hover:text-orange-500 hover:bg-gray-50 transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </motion.a>
                    );
                  })}
                  
                  {/* User Info in Mobile Menu */}
                  <div className="border-t border-gray-200 mt-2 pt-2 px-4 py-3">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                        <span className="text-sm font-medium text-blue-600">
                          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navigation.length * 0.1 }}
                      onClick={logout}
                      className="w-full bg-orange-500 text-white px-4 py-2.5 rounded-md font-semibold text-sm hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Main Content with padding for fixed header */}
      <main className="pt-16 min-h-screen">
        <div className="container mx-auto px-6 py-6">
          {children}
        </div>
      </main>

      {/* Simple Footer matching main site */}
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo/spark.jpg"
                  alt="Spark Tech Logo"
                  width={24}
                  height={24}
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <div className="text-sm font-black bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  SPARK TECH
                </div>
                <div className="text-xs font-semibold text-orange-400 -mt-1">INTERNS</div>
              </div>
            </div>
            <div className="text-sm text-gray-400 text-center md:text-right">
              © 2024 Spark Tech Interns. Empowering future developers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}