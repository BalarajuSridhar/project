// frontend/components/Sections/Internships.tsx
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MapPin, Calendar, DollarSign, Building2, ArrowRight, Loader } from 'lucide-react';
import { apiService, Internship, InternshipFilters } from '../../lib/api';

export default function Internships() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'tech', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'research', label: 'Research' }
  ];

  useEffect(() => {
    loadInternships();
  }, [selectedCategory]);

  const loadInternships = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters: InternshipFilters = {};
      if (selectedCategory !== 'all') {
        filters.type = selectedCategory;
      }

      const response = await apiService.getInternships(filters);
      
      if (response.success) {
        setInternships(response.data.internships);
      } else {
        setError('Failed to load internships');
      }
    } catch (err) {
      setError('Error fetching internships');
      console.error('Error loading internships:', err);
      
      // Fallback to mock data if API is not available
      setInternships(getMockInternships());
    } finally {
      setLoading(false);
    }
  };

  const getMockInternships = (): Internship[] => {
    // Return mock data similar to your backend structure
    return [
      {
        id: 1,
        title: 'Frontend Developer Intern',
        companyName: 'TechCorp',
        location: 'San Francisco, CA',
        type: 'tech',
        description: 'Join our frontend team to build amazing user experiences using modern technologies.',
        requirements: ['React', 'JavaScript', 'CSS', 'HTML5'],
        responsibilities: ['Develop responsive web applications', 'Collaborate with design team', 'Write clean code'],
        stipend: 3000,
        duration: '3 months',
        applicationDeadline: '2024-12-31',
        isRemote: false,
        isFeatured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      // Add more mock internships as needed
    ];
  };

  const getTypeLogo = (type: string) => {
    const logos = {
      tech: '💻',
      design: '🎨',
      business: '📊',
      marketing: '📈',
      research: '🔬'
    };
    return logos[type as keyof typeof logos] || '💼';
  };

  const formatStipend = (stipend: number) => {
    return `$${stipend.toLocaleString()} / month`;
  };

  return (
    <section id="internships" ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Featured Internships</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exciting internship opportunities from leading companies across various industries.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-12"
          >
            <Loader className="h-8 w-8 text-blue-600 animate-spin" />
          </motion.div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-red-600"
          >
            {error}
          </motion.div>
        )}

        {/* Internships Grid */}
        {!loading && !error && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {internships.map((internship, index) => (
              <motion.div
                key={internship.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover-lift group ${
                  internship.isFeatured ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {internship.isFeatured && (
                  <div className="bg-blue-600 text-white text-sm font-medium px-4 py-1 text-center">
                    Featured
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">
                      {getTypeLogo(internship.type)}
                    </div>
                    <Building2 className="h-6 w-6 text-gray-400" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {internship.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{internship.companyName}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-500">
                      <MapPin size={16} className="mr-2" />
                      {internship.isRemote ? 'Remote' : internship.location}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Calendar size={16} className="mr-2" />
                      {internship.duration}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <DollarSign size={16} className="mr-2" />
                      {formatStipend(internship.stipend)}
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    Apply Now <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && internships.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500"
          >
            No internships found in this category.
          </motion.div>
        )}

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors"
          >
            View All Internships
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}