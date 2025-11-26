// components/DomainSelection/DomainSelection.tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code, Database, Palette, ChartBar, Smartphone, Cloud, ArrowRight, Check } from 'lucide-react';

interface Domain {
  id: string;
  icon: any;
  title: string;
  description: string;
  skills: string[];
  durations: number[];
  color: string;
}

export default function DomainSelection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const domains: Domain[] = [
    {
      id: 'web-dev',
      icon: Code,
      title: 'Web Development',
      description: 'Master frontend and backend technologies. Build responsive websites.',
      skills: ['React', 'Node.js', 'MongoDB'],
      durations: [4, 6, 8, 12],
      color: 'blue'
    },
    {
      id: 'data-science',
      icon: Database,
      title: 'Data Science',
      description: 'Learn data analysis, machine learning, and visualization.',
      skills: ['Python', 'ML', 'SQL'],
      durations: [6, 8, 12],
      color: 'green'
    },
    {
      id: 'ui-ux',
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Create beautiful and user-friendly interfaces.',
      skills: ['Figma', 'Prototyping', 'Research'],
      durations: [4, 6, 8],
      color: 'purple'
    },
    {
      id: 'digital-marketing',
      icon: ChartBar,
      title: 'Digital Marketing',
      description: 'Master SEO, social media, and analytics.',
      skills: ['SEO', 'Analytics', 'Content'],
      durations: [4, 6, 8],
      color: 'orange'
    },
    {
      id: 'mobile-dev',
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Build cross-platform mobile applications.',
      skills: ['React Native', 'APIs', 'UI'],
      durations: [6, 8, 12],
      color: 'indigo'
    },
    {
      id: 'cloud-computing',
      icon: Cloud,
      title: 'Cloud Computing',
      description: 'Learn AWS, Azure, and cloud deployment.',
      skills: ['AWS', 'Docker', 'CI/CD'],
      durations: [8, 12],
      color: 'cyan'
    },
  ];

  const durationOptions = [4, 6, 8, 12];

  const toggleDomainSelection = (domainId: string) => {
    setSelectedDomains(prev => 
      prev.includes(domainId) 
        ? prev.filter(id => id !== domainId)
        : [...prev, domainId]
    );
  };

  const handleDurationSelect = (duration: number) => {
    setSelectedDuration(duration);
  };

  const handleSubmit = async () => {
    if (selectedDomains.length === 0 || !selectedDuration) {
      alert('Please select at least one domain and a duration');
      return;
    }

    try {
      // This will be integrated with your backend
      const response = await fetch('/api/user/domains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domains: selectedDomains,
          duration: selectedDuration,
        }),
      });

      if (response.ok) {
        // Redirect to dashboard or show success message
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Error saving domain selection:', error);
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; hover: string; light: string; border: string } } = {
      blue: { 
        bg: 'bg-blue-600', 
        text: 'text-blue-600', 
        hover: 'hover:bg-blue-700',
        light: 'bg-blue-50',
        border: 'border-blue-200'
      },
      orange: { 
        bg: 'bg-orange-500', 
        text: 'text-orange-500', 
        hover: 'hover:bg-orange-600',
        light: 'bg-orange-50',
        border: 'border-orange-200'
      },
      green: { 
        bg: 'bg-green-600', 
        text: 'text-green-600', 
        hover: 'hover:bg-green-700',
        light: 'bg-green-50',
        border: 'border-green-200'
      },
      purple: { 
        bg: 'bg-purple-600', 
        text: 'text-purple-600', 
        hover: 'hover:bg-purple-700',
        light: 'bg-purple-50',
        border: 'border-purple-200'
      },
      indigo: { 
        bg: 'bg-indigo-600', 
        text: 'text-indigo-600', 
        hover: 'hover:bg-indigo-700',
        light: 'bg-indigo-50',
        border: 'border-indigo-200'
      },
      cyan: { 
        bg: 'bg-cyan-600', 
        text: 'text-cyan-600', 
        hover: 'hover:bg-cyan-700',
        light: 'bg-cyan-50',
        border: 'border-cyan-200'
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section ref={ref} className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Learning Path
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your preferred domains and internship duration. Build skills that match your career goals.
          </p>
        </motion.div>

        {/* Duration Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Select Internship Duration
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {durationOptions.map((duration) => (
                <motion.button
                  key={duration}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDurationSelect(duration)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    selectedDuration === duration
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-2 ${
                      selectedDuration === duration ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      {duration}
                    </div>
                    <div className={`text-sm ${
                      selectedDuration === duration ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      Weeks
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Domains Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {domains.map((domain) => {
            const colors = getColorClasses(domain.color);
            const isSelected = selectedDomains.includes(domain.id);
            const isAvailable = selectedDuration ? domain.durations.includes(selectedDuration) : true;

            return (
              <motion.div
                key={domain.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                onClick={() => isAvailable && toggleDomainSelection(domain.id)}
                className={`relative rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                  isSelected
                    ? `${colors.border} ${colors.light} shadow-lg`
                    : 'border-gray-200 bg-white hover:border-gray-300'
                } ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className={`absolute -top-2 -right-2 w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center shadow-lg`}>
                    <Check size={16} className="text-white" />
                  </div>
                )}

                {/* Availability Badge */}
                {!isAvailable && selectedDuration && (
                  <div className="absolute -top-2 -right-2 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Not Available
                  </div>
                )}

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${
                      isSelected ? colors.bg : colors.light
                    } rounded-xl flex items-center justify-center transition-all duration-300 group-hover:${colors.bg} group-hover:text-white ${
                      isSelected ? 'text-white' : colors.text
                    }`}>
                      <domain.icon size={28} />
                    </div>
                    {isAvailable && (
                      <motion.div
                        whileHover={{ x: 3 }}
                        className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${colors.text}`}
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold mb-3 transition-colors ${
                    isSelected ? colors.text : 'text-gray-900'
                  }`}>
                    {domain.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {domain.description}
                  </p>
                  
                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {domain.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className={`${colors.light} ${colors.text} px-2.5 py-1 rounded-md text-xs font-medium`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Duration Info */}
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Available for:
                      </span>
                      <div className="flex gap-1">
                        {domain.durations.map((dur) => (
                          <span
                            key={dur}
                            className={`text-xs px-2 py-1 rounded ${
                              selectedDuration === dur
                                ? `${colors.bg} text-white`
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {dur}w
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Selection Summary & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          {/* Selection Summary */}
          {(selectedDomains.length > 0 || selectedDuration) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 max-w-2xl mx-auto"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Your Selection Summary
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
                {selectedDuration && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {selectedDuration} weeks
                  </span>
                )}
                {selectedDomains.map(domainId => {
                  const domain = domains.find(d => d.id === domainId);
                  const colors = getColorClasses(domain?.color || 'blue');
                  return (
                    <span 
                      key={domainId}
                      className={`${colors.light} ${colors.text} px-3 py-1 rounded-full`}
                    >
                      {domain?.title}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={selectedDomains.length === 0 || !selectedDuration}
            className={`px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 mx-auto shadow-lg transition-all duration-200 ${
              selectedDomains.length > 0 && selectedDuration
                ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Start Your Internship Journey
            <ArrowRight size={20} />
          </motion.button>

          <p className="text-gray-500 text-sm mt-4">
            {selectedDomains.length === 0 || !selectedDuration
              ? 'Please select at least one domain and duration to continue'
              : `You've selected ${selectedDomains.length} domain(s) for ${selectedDuration} weeks`}
          </p>
        </motion.div>
      </div>
    </section>
  );
}