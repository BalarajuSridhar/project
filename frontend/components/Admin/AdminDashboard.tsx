// components/Admin/AdminDashboard.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  UserCheck, 
  TrendingUp, 
  Clock, 
  Award 
} from 'lucide-react';
import AdminStats from './AdminStats';
import UsersManagement from './UsersManagement';
import InternshipsManagement from './InternshipsManagement';
import EnrollmentsManagement from './EnrollmentsManagement';

interface AdminStatsData {
  total_users: number;
  total_students: number;
  total_admins: number;
  total_internships: number;
  total_enrollments: number;
  active_enrollments: number;
  completed_enrollments: number;
}

// Mock data as fallback
const mockStats: AdminStatsData = {
  total_users: 156,
  total_students: 150,
  total_admins: 6,
  total_internships: 8,
  total_enrollments: 245,
  active_enrollments: 189,
  completed_enrollments: 56
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState<AdminStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log('🔄 Fetching admin stats from API...');
      
      // Simple fetch without any headers that might cause CORS issues
      const response = await fetch('http://localhost:5000/api/admin/stats');
      
      console.log('📡 Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Stats loaded successfully:', data.data);
        setStats(data.data);
      } else {
        console.warn('⚠️ API returned error, using mock data. Status:', response.status);
        setStats(mockStats);
      }
    } catch (error) {
      console.error('❌ Network error, using mock data:', error);
      setStats(mockStats);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'stats', name: 'Dashboard', icon: BarChart3 },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'internships', name: 'Internships', icon: BookOpen },
    { id: 'enrollments', name: 'Enrollments', icon: UserCheck },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'stats':
        return <AdminStats stats={stats} loading={loading} />;
      case 'users':
        return <UsersManagement />;
      case 'internships':
        return <InternshipsManagement />;
      case 'enrollments':
        return <EnrollmentsManagement />;
      default:
        return <AdminStats stats={stats} loading={loading} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your Spark Tech platform</p>
            </div>
            <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
              Development Mode
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}