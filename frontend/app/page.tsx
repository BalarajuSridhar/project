// frontend/app/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import Hero from '../components/Sections/Hero';
import About from '../components/Sections/About';
import Internships from '../components/Sections/Internships';
import Contact from '../components/Sections/Contact';
import Footer from '../components/Layout/Footer';
import LoadingSpinner from '../components/UI/LoadingSpinner';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-white"
    >
      <Header />
      <Hero />
      <About />
      <Internships />
      <Contact />
      <Footer />
    </motion.div>
  );
}