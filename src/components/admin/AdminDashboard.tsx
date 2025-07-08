
import { motion } from 'framer-motion';
import { FileText, Users, BarChart3, Calendar, TrendingUp, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Posts', count: '24', icon: FileText, color: 'bg-blue-500', change: '+12%' },
    { title: 'Total Readers', count: '12.5K', icon: Users, color: 'bg-green-500', change: '+25%' },
    { title: 'This Month', count: '2.1K', icon: BarChart3, color: 'bg-purple-500', change: '+8%' },
    { title: 'Scheduled', count: '3', icon: Calendar, color: 'bg-orange-500', change: '+1' },
  ];

  const recentActivity = [
    { action: 'Published new blog post', title: 'The Art of Storytelling in Digital Age', time: '2 hours ago' },
    { action: 'Updated article', title: 'Mindfulness in Modern Life', time: '1 day ago' },
    { action: 'Added new poem', title: 'Whispers of Dawn', time: '3 days ago' },
    { action: 'Edited about page', title: 'Author biography updated', time: '1 week ago' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-chocolate">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back to your content management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-chocolate">{stat.count}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">{stat.change}</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h3 className="text-xl font-semibold text-chocolate mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-chocolate/10 p-2 rounded-full mr-4">
                  <Eye className="h-4 w-4 text-chocolate" />
                </div>
                <div>
                  <p className="font-medium text-chocolate">{activity.action}</p>
                  <p className="text-gray-600 text-sm">{activity.title}</p>
                </div>
              </div>
              <span className="text-gray-500 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
