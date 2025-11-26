// frontend/components/Dashboard/DashboardHome.tsx
'use client';

import { useAuth } from '../../contexts/AuthContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, Clock, Award, BookOpen, ChevronRight } from 'lucide-react';

interface UserDomain {
  id: string;
  domain_id: string;
  domain_title: string;
  duration_weeks: number;
  selected_at: string;
  progress: number;
  hours_completed: number;
  projects_completed: number;
  next_topic: string;
  due_date: string;
  color: string;
}

interface DashboardStats {
  activeInternships: number;
  overallProgress: number;
  hoursCompleted: number;
  projectsDone: number;
}

export default function DashboardHome() {
  const { user } = useAuth();
  const [userDomains, setUserDomains] = useState<UserDomain[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    activeInternships: 0,
    overallProgress: 0,
    hoursCompleted: 0,
    projectsDone: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserDomains();
  }, []);

  const fetchUserDomains = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user/domains', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserDomains(data.data || []);
        calculateStats(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch user domains:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (domains: UserDomain[]) => {
    const activeInternships = domains.length;
    const overallProgress = domains.length > 0 
      ? Math.round(domains.reduce((sum, domain) => sum + domain.progress, 0) / domains.length)
      : 0;
    const hoursCompleted = domains.reduce((sum, domain) => sum + domain.hours_completed, 0);
    const projectsDone = domains.reduce((sum, domain) => sum + domain.projects_completed, 0);

    setStats({
      activeInternships,
      overallProgress,
      hoursCompleted,
      projectsDone
    });
  };

  const getColorClasses = (color: string) => {
    const colorMap: any = {
      blue: { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200' },
      green: { bg: 'bg-green-600', text: 'text-green-600', light: 'bg-green-50', border: 'border-green-200' },
      purple: { bg: 'bg-purple-600', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-500', light: 'bg-orange-50', border: 'border-orange-200' },
      indigo: { bg: 'bg-indigo-600', text: 'text-indigo-600', light: 'bg-indigo-50', border: 'border-indigo-200' },
      cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600', light: 'bg-cyan-50', border: 'border-cyan-200' },
    };
    return colorMap[color] || colorMap.blue;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Card with Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200"
      >
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden border border-blue-500">
              <Image
                src="/images/logo/spark.jpg"
                alt="Spark Tech Logo"
                width={48}
                height={48}
                className="object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-gray-600 text-sm">
                {userDomains.length > 0 
                  ? `You're enrolled in ${userDomains.length} internship program${userDomains.length > 1 ? 's' : ''}`
                  : 'Ready to start your learning journey at Spark Tech?'
                }
              </p>
            </div>
          </div>

          {userDomains.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900">Get Started</h3>
                  <p className="text-blue-700 text-sm">Enroll in your first internship program to begin learning</p>
                </div>
                <a
                  href="/#domains"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Browse Domains
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* Active Internships */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Internships</dt>
                  <dd className="text-lg font-semibold text-gray-900">{stats.activeInternships}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-orange-100 rounded-lg p-3">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Overall Progress</dt>
                  <dd className="text-lg font-semibold text-gray-900">{stats.overallProgress}%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Hours Learned */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Hours Completed</dt>
                  <dd className="text-lg font-semibold text-gray-900">{stats.hoursCompleted}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Completed */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Projects Done</dt>
                  <dd className="text-lg font-semibold text-gray-900">{stats.projectsDone}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Current Internships */}
      {userDomains.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-sm rounded-lg border border-gray-200"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">My Internships</h2>
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {userDomains.length} Active
              </span>
            </div>
            <div className="space-y-4">
              {userDomains.map((domain, index) => {
                const colors = getColorClasses(domain.color);
                const daysRemaining = getDaysRemaining(domain.due_date);
                
                return (
                  <motion.div
                    key={domain.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${colors.light} rounded-lg flex items-center justify-center`}>
                          <span className={`text-sm font-semibold ${colors.text}`}>
                            {domain.domain_title.split(' ').map(word => word[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {domain.domain_title}
                          </h3>
                          <p className="text-gray-500 text-xs">
                            {domain.duration_weeks} weeks • Started {formatDate(domain.selected_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`${colors.light} ${colors.text} text-xs font-medium px-2.5 py-1 rounded-full`}>
                          {domain.progress}% Complete
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {domain.domain_title === 'Web Development' && 'Build real-world web applications with modern frameworks'}
                      {domain.domain_title === 'Data Science' && 'Master data analysis and machine learning with Python'}
                      {domain.domain_title === 'UI/UX Design' && 'Create beautiful and user-friendly interfaces'}
                      {domain.domain_title === 'Digital Marketing' && 'Master SEO, social media, and analytics'}
                      {domain.domain_title === 'Mobile Development' && 'Build cross-platform mobile applications'}
                      {domain.domain_title === 'Cloud Computing' && 'Learn AWS, Azure, and cloud deployment'}
                    </p>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${colors.bg}`}
                        style={{ width: `${domain.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {domain.hours_completed}h completed
                        </span>
                        <span className="flex items-center">
                          <Award className="h-3 w-3 mr-1" />
                          {domain.projects_completed} projects
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>Next: {domain.next_topic}</span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Due: {formatDate(domain.due_date)}
                          {daysRemaining > 0 && (
                            <span className="ml-1 text-orange-600">({daysRemaining}d left)</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-sm rounded-lg border border-gray-200"
        >
          <div className="px-4 py-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Internships Yet</h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">
              You haven't enrolled in any internship programs yet. Browse our domains and start your learning journey today!
            </p>
            <a
              href="/#domains"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Explore Domains
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white shadow-sm rounded-lg border border-gray-200"
      >
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => window.location.href = '/learning'}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-blue-200 transition-colors">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Continue Learning</span>
            </button>

            <button 
              onClick={() => window.location.href = '/projects'}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-orange-200 transition-colors">
                <Award className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">View Projects</span>
            </button>

            <button 
              onClick={() => window.location.href = '/certificates'}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-green-200 transition-colors">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Certificates</span>
            </button>

            <button 
              onClick={() => window.location.href = '/mentor'}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-purple-200 transition-colors">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Mentor Help</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}