// components/Admin/AdminStats.tsx
'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, UserCheck, TrendingUp, Award, Clock } from 'lucide-react';

interface AdminStatsProps {
  stats: {
    total_users: number;
    total_students: number;
    total_admins: number;
    total_internships: number;
    total_enrollments: number;
    active_enrollments: number;
    completed_enrollments: number;
  } | null;
  loading: boolean;
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue' 
}: { 
  title: string; 
  value: number; 
  icon: any; 
  color?: string; 
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${colorClasses[color as keyof typeof colorClasses]} rounded-lg p-3`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function AdminStats({ stats, loading }: AdminStatsProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load statistics</p>
      </div>
    );
  }

  const statItems = [
    {
      title: 'Total Users',
      value: stats.total_users,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Students',
      value: stats.total_students,
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'Total Internships',
      value: stats.total_internships,
      icon: BookOpen,
      color: 'purple'
    },
    {
      title: 'Total Enrollments',
      value: stats.total_enrollments,
      icon: TrendingUp,
      color: 'orange'
    },
    {
      title: 'Active Enrollments',
      value: stats.active_enrollments,
      icon: Clock,
      color: 'indigo'
    },
    {
      title: 'Completed',
      value: stats.completed_enrollments,
      icon: Award,
      color: 'pink'
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Platform Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}