
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Settings, 
  FileText, 
  Users, 
  BarChart3, 
  Upload, 
  Calendar,
  Menu,
  X,
  BookOpen,
  Newspaper,
  Heart,
  Tag,
  MessageCircle,
  LogOut
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAdminAuth();

  const handleLogout = async () => {
    signOut();
    navigate('/admin-auth');
  };

  const navigationItems = [
    { title: 'Dashboard', path: '/admin', icon: BarChart3 },
    { title: 'Blogs', path: '/admin/blogs', icon: BookOpen },
    { title: 'Articles', path: '/admin/articles', icon: Newspaper },
    { title: 'Poems', path: '/admin/poems', icon: Heart },
    { title: 'Genres', path: '/admin/genres', icon: Tag },
    { title: 'Contact Submissions', path: '/admin/contacts', icon: MessageCircle },
    { title: 'Media Library', path: '/admin/media', icon: Upload },
    { title: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { title: 'Users', path: '/admin/users', icon: Users },
    { title: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <motion.div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-chocolate text-cream transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        initial={false}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-cream/20">
          <h1 className="text-xl font-serif font-bold">ManavInVerse</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-cream/10"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-8">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? 'bg-cream/20 text-cream border-r-4 border-cream'
                  : 'text-cream/80 hover:bg-cream/10 hover:text-cream'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome back,</span>
              <span className="font-semibold text-chocolate">Admin</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="ml-4"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
