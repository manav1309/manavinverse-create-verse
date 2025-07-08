
import { motion } from 'framer-motion';
import { Settings, FileText, Users, BarChart3, Upload, Calendar } from 'lucide-react';

const Admin = () => {
  const adminSections = [
    {
      title: 'Content Management',
      description: 'Create, edit, and manage all your content',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Media Library',
      description: 'Upload and organize your images and files',
      icon: Upload,
      color: 'bg-green-500'
    },
    {
      title: 'Analytics',
      description: 'Track your audience and engagement',
      icon: BarChart3,
      color: 'bg-purple-500'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: Users,
      color: 'bg-orange-500'
    },
    {
      title: 'Scheduling',
      description: 'Schedule posts and manage publication dates',
      icon: Calendar,
      color: 'bg-pink-500'
    },
    {
      title: 'Settings',
      description: 'Configure your site settings and preferences',
      icon: Settings,
      color: 'bg-gray-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-chocolate text-cream shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
              <p className="text-cream/80 mt-1">ManavInVerse Content Management System</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-cream/80">Welcome back,</p>
              <p className="font-semibold">Manav</p>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-chocolate">24</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Readers</p>
                <p className="text-2xl font-bold text-chocolate">12.5K</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="text-purple-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-chocolate">2.1K</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="text-orange-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-chocolate">3</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Admin Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className={`${section.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                  <section.icon className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-chocolate mb-2 group-hover:text-chocolate/80 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {section.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-xl font-semibold text-chocolate mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Published new blog post', title: 'The Art of Storytelling in Digital Age', time: '2 hours ago' },
              { action: 'Updated article', title: 'Mindfulness in Modern Life', time: '1 day ago' },
              { action: 'Added new poem', title: 'Whispers of Dawn', time: '3 days ago' },
              { action: 'Edited about page', title: 'Author biography updated', time: '1 week ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-chocolate">{activity.action}</p>
                  <p className="text-gray-600 text-sm">{activity.title}</p>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Admin;
