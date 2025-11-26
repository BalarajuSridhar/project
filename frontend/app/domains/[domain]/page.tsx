// app/domains/[domain]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Palette, ChartBar, Smartphone, Cloud, ArrowLeft, Clock, Star, ExternalLink, CheckCircle, Zap, Users, Target, Award } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Domain data
const domainData = {
  'web-development': {
    icon: Code,
    title: 'Web Development',
    description: 'Master frontend and backend technologies. Build responsive websites.',
    fullDescription: 'Become a full-stack web developer by learning modern technologies like React, Node.js, and MongoDB. Build real-world projects and master both client-side and server-side development with hands-on experience.',
    skills: ['React', 'Node.js', 'MongoDB', 'Next.js', 'TypeScript', 'Express'],
    durations: [
      { weeks: 4, title: 'Frontend Fundamentals', price: 'Free', popular: false },
      { weeks: 8, title: 'Full Stack Pro', price: '$99', popular: true },
      { weeks: 12, title: 'Advanced + Projects', price: '$199', popular: false }
    ],
    color: 'blue',
    features: [
      'Real-world projects portfolio',
      '1:1 Mentor support sessions',
      'Industry-recognized certificate',
      'GitHub portfolio building',
      'Career guidance sessions'
    ],
    requirements: ['Basic programming knowledge', 'Laptop with internet', 'Willingness to learn'],
    stats: [
      { value: '94%', label: 'Completion Rate' },
      { value: '2.1M', label: 'Average Salary' },
      { value: '6 weeks', label: 'To First Project' }
    ]
  },
  'data-science': {
    icon: Database,
    title: 'Data Science',
    description: 'Learn data analysis, machine learning, and visualization.',
    fullDescription: 'Dive into the world of data science with Python. Learn statistical analysis, machine learning algorithms, and data visualization techniques. Work with real datasets and build predictive models.',
    skills: ['Python', 'Machine Learning', 'SQL', 'Pandas', 'TensorFlow', 'Scikit-learn'],
    durations: [
      { weeks: 6, title: 'Data Analysis Pro', price: '$79', popular: false },
      { weeks: 12, title: 'ML Specialist', price: '$179', popular: true }
    ],
    color: 'green',
    features: [
      'Real industry datasets',
      'ML project portfolio',
      'Industry tools training',
      'Kaggle competition prep',
      'Data visualization mastery'
    ],
    requirements: ['Python basics', 'Math fundamentals', 'Analytical thinking'],
    stats: [
      { value: '89%', label: 'Job Placement' },
      { value: '2.4M', label: 'Average Salary' },
      { value: '8 weeks', label: 'To First Model' }
    ]
  },
  'ui-ux': {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Create beautiful and user-friendly interfaces.',
    fullDescription: 'Learn user-centered design principles and create stunning interfaces that provide exceptional user experiences. Master design tools and user research methodologies.',
    skills: ['Figma', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems'],
    durations: [
      { weeks: 4, title: 'UI Fundamentals', price: 'Free', popular: false },
      { weeks: 8, title: 'UX Specialist', price: '$149', popular: true }
    ],
    color: 'purple',
    features: [
      'Professional design tools',
      'Portfolio projects',
      'Industry mentorship',
      'User testing sessions',
      'Design system creation'
    ],
    requirements: ['Creative mindset', 'Basic design sense', 'Attention to detail'],
    stats: [
      { value: '92%', label: 'Project Success' },
      { value: '1.8M', label: 'Average Salary' },
      { value: '4 weeks', label: 'To First Design' }
    ]
  },
  'digital-marketing': {
    icon: ChartBar,
    title: 'Digital Marketing',
    description: 'Master SEO, social media, and analytics.',
    fullDescription: 'Learn digital marketing strategies including SEO, social media marketing, content creation, and analytics to drive business growth and brand awareness.',
    skills: ['SEO', 'Analytics', 'Content Marketing', 'Social Media', 'Google Ads'],
    durations: [
      { weeks: 4, title: 'Content Marketing', price: '$49', popular: false },
      { weeks: 8, title: 'Full Digital Strategy', price: '$129', popular: true }
    ],
    color: 'orange',
    features: [
      'Real campaign management',
      'Professional certification',
      'Tools training suite',
      'Portfolio of campaigns',
      'Analytics mastery'
    ],
    requirements: ['Basic marketing knowledge', 'Creative writing skills', 'Analytical mind'],
    stats: [
      { value: '87%', label: 'Career Growth' },
      { value: '1.5M', label: 'Average Salary' },
      { value: '3 weeks', label: 'To First Campaign' }
    ]
  },
  'mobile-development': {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Build cross-platform mobile applications.',
    fullDescription: 'Create mobile apps for iOS and Android using React Native. Learn mobile UI/UX, APIs, and app store deployment with real-world project experience.',
    skills: ['React Native', 'APIs', 'Mobile UI', 'App Deployment', 'Firebase'],
    durations: [
      { weeks: 6, title: 'Mobile Fundamentals', price: '$89', popular: false },
      { weeks: 12, title: 'Advanced Mobile', price: '$189', popular: true }
    ],
    color: 'indigo',
    features: [
      'Real app development',
      'App store deployment',
      'Cross-platform skills',
      'Backend integration',
      'Performance optimization'
    ],
    requirements: ['JavaScript basics', 'React knowledge', 'Mobile-first mindset'],
    stats: [
      { value: '91%', label: 'App Success' },
      { value: '2.2M', label: 'Average Salary' },
      { value: '7 weeks', label: 'To First App' }
    ]
  },
  'cloud-computing': {
    icon: Cloud,
    title: 'Cloud Computing',
    description: 'Learn AWS, Azure, and cloud deployment.',
    fullDescription: 'Master cloud computing with AWS and Azure. Learn infrastructure as code, containerization, and cloud security with hands-on labs and real projects.',
    skills: ['AWS', 'Docker', 'CI/CD', 'Cloud Security', 'Kubernetes'],
    durations: [
      { weeks: 8, title: 'Cloud Fundamentals', price: '$119', popular: false },
      { weeks: 12, title: 'Cloud Architect', price: '$229', popular: true }
    ],
    color: 'cyan',
    features: [
      'Hands-on cloud labs',
      'Certification preparation',
      'Real infrastructure projects',
      'Security best practices',
      'Cost optimization'
    ],
    requirements: ['Basic networking', 'Linux basics', 'Problem-solving skills'],
    stats: [
      { value: '96%', label: 'Certification Rate' },
      { value: '2.8M', label: 'Average Salary' },
      { value: '9 weeks', label: 'To First Deployment' }
    ]
  },
};

const getColorClasses = (color: string) => {
  const colorMap: any = {
    blue: { 
      bg: 'bg-gradient-to-r from-blue-600 to-blue-700',
      text: 'text-blue-600',
      light: 'bg-blue-50',
      border: 'border-blue-200',
      hover: 'hover:from-blue-700 hover:to-blue-800',
      gradient: 'from-blue-50 to-blue-100',
      accent: 'bg-blue-500'
    },
    green: { 
      bg: 'bg-gradient-to-r from-green-600 to-green-700',
      text: 'text-green-600',
      light: 'bg-green-50',
      border: 'border-green-200',
      hover: 'hover:from-green-700 hover:to-green-800',
      gradient: 'from-green-50 to-green-100',
      accent: 'bg-green-500'
    },
    purple: { 
      bg: 'bg-gradient-to-r from-purple-600 to-purple-700',
      text: 'text-purple-600',
      light: 'bg-purple-50',
      border: 'border-purple-200',
      hover: 'hover:from-purple-700 hover:to-purple-800',
      gradient: 'from-purple-50 to-purple-100',
      accent: 'bg-purple-500'
    },
    orange: { 
      bg: 'bg-gradient-to-r from-orange-500 to-orange-600',
      text: 'text-orange-500',
      light: 'bg-orange-50',
      border: 'border-orange-200',
      hover: 'hover:from-orange-600 hover:to-orange-700',
      gradient: 'from-orange-50 to-orange-100',
      accent: 'bg-orange-500'
    },
    indigo: { 
      bg: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
      text: 'text-indigo-600',
      light: 'bg-indigo-50',
      border: 'border-indigo-200',
      hover: 'hover:from-indigo-700 hover:to-indigo-800',
      gradient: 'from-indigo-50 to-indigo-100',
      accent: 'bg-indigo-500'
    },
    cyan: { 
      bg: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
      text: 'text-cyan-600',
      light: 'bg-cyan-50',
      border: 'border-cyan-200',
      hover: 'hover:from-cyan-600 hover:to-cyan-700',
      gradient: 'from-cyan-50 to-cyan-100',
      accent: 'bg-cyan-500'
    },
  };
  return colorMap[color] || colorMap.blue;
};

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdalwHw0tOSKM4MWN6sXUwXmJN148RvV0vvwK7b3FbTys1NEg/viewform";

// Fixed TypeScript-compatible variants
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
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const cardHoverVariants = {
  rest: { 
    scale: 1,
    y: 0
  },
  hover: { 
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const
    }
  }
};

export default function DomainDetailPage() {
  const params = useParams();
  const domainId = params.domain as string;
  const domain = domainData[domainId as keyof typeof domainData];
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!domain) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Domain Not Found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const colors = getColorClasses(domain.color);

  const handleEnroll = () => {
    if (!selectedDuration) {
      alert('Please select a program duration first');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      window.open(GOOGLE_FORM_URL, '_blank');
      setIsLoading(false);
    }, 800);
  };

  const handleDurationSelect = (weeks: number) => {
    setSelectedDuration(weeks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-40"
      >
        <div className="container mx-auto px-6 py-4">
          <motion.div
            whileHover={{ x: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/#domains" className="inline-flex items-center text-gray-600 hover:text-gray-900 group font-medium">
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Domains
            </Link>
          </motion.div>
          
          <div className="flex items-center space-x-6 mt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`w-20 h-20 ${colors.light} rounded-3xl flex items-center justify-center shadow-lg`}
            >
              <domain.icon size={36} className={colors.text} />
            </motion.div>
            <div>
              <motion.h1 
                className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {domain.title}
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600 mt-2 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {domain.description}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {domain.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-200/50 shadow-sm"
                  >
                    <div className={`text-2xl font-black ${colors.text}`}>{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Overview Card */}
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="bg-white rounded-3xl shadow-sm border border-gray-200/60 p-8 backdrop-blur-sm"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 ${colors.light} rounded-2xl flex items-center justify-center mr-4`}>
                  <Target className={colors.text} size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900">Program Overview</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">{domain.fullDescription}</p>
            </motion.div>

            {/* Skills Card */}
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="bg-white rounded-3xl shadow-sm border border-gray-200/60 p-8 backdrop-blur-sm"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 ${colors.light} rounded-2xl flex items-center justify-center mr-4`}>
                  <Zap className={colors.text} size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900">Skills You'll Master</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {domain.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className={`${colors.light} ${colors.text} px-5 py-3 rounded-2xl font-semibold text-sm border ${colors.border} shadow-sm`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Features Card */}
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="bg-white rounded-3xl shadow-sm border border-gray-200/60 p-8 backdrop-blur-sm"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 ${colors.light} rounded-2xl flex items-center justify-center mr-4`}>
                  <Award className={colors.text} size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900">Program Features</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {domain.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    whileHover={{ x: 4 }}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50/50 transition-colors"
                  >
                    <div className={`w-8 h-8 ${colors.light} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <CheckCircle size={18} className={colors.text} />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Welcome Card */}
            <motion.div
              variants={itemVariants}
              className={`${colors.bg} rounded-3xl p-6 text-white shadow-lg`}
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center mr-3">
                  <Users size={20} />
                </div>
                <h3 className="text-xl font-black">Start Your Journey!</h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                Join thousands of learners who transformed their careers with our structured programs.
              </p>
            </motion.div>

            {/* Program Options Card */}
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="bg-white rounded-3xl shadow-lg border border-gray-200/60 p-6 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-6">Choose Your Path</h2>
              
              <AnimatePresence>
                <div className="space-y-4">
                  {domain.durations.map((duration, index) => (
                    <motion.div
                      key={duration.weeks}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleDurationSelect(duration.weeks)}
                      className={`relative border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                        selectedDuration === duration.weeks 
                          ? `${colors.border} ${colors.light} border-2 shadow-md` 
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      {duration.popular && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`absolute -top-2 -right-2 ${colors.accent} text-white px-3 py-1 rounded-full text-xs font-bold`}
                        >
                          POPULAR
                        </motion.div>
                      )}
                      
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-gray-900 text-lg">{duration.title}</h3>
                        <span className="text-xl font-black text-gray-900">{duration.price}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Clock size={16} className="mr-2" />
                        {duration.weeks} weeks program
                      </div>
                      
                      {selectedDuration === duration.weeks && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center text-green-600 font-medium text-sm"
                        >
                          <CheckCircle size={16} className="mr-1" />
                          Selected
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>

              {/* Enroll Button */}
              <motion.button
                whileHover={{ 
                  scale: selectedDuration && !isLoading ? 1.02 : 1
                }}
                whileTap={{ scale: selectedDuration && !isLoading ? 0.98 : 1 }}
                onClick={handleEnroll}
                disabled={!selectedDuration || isLoading}
                className={`w-full py-4 rounded-2xl font-black text-lg mt-6 transition-all duration-300 flex items-center justify-center space-x-3 ${
                  selectedDuration && !isLoading
                    ? `${colors.bg} text-white hover:${colors.hover} shadow-lg cursor-pointer`
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Opening Form...</span>
                  </>
                ) : (
                  <>
                    <span>Enroll Now</span>
                    <ExternalLink size={20} />
                  </>
                )}
              </motion.button>

              {!selectedDuration && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-500 text-sm mt-4"
                >
                  Select a program duration to continue
                </motion.p>
              )}
            </motion.div>

            {/* Requirements Card */}
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="bg-white rounded-3xl shadow-sm border border-gray-200/60 p-6 backdrop-blur-sm"
            >
              <h2 className="text-xl font-black text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {domain.requirements.map((req, index) => (
                  <motion.li
                    key={req}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <div className={`w-2 h-2 ${colors.accent} rounded-full mr-4`}></div>
                    <span className="font-medium">{req}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}