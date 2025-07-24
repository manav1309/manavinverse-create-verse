
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  isScrolled: boolean;
}

const Header = ({ isScrolled }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/articles', label: 'Articles' },
    { href: '/poems', label: 'Poems' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-chocolate shadow-lg' 
          : 'bg-chocolate/80 backdrop-blur-sm'
      }`}
    >
      {/* Logo Section */}
      <div className="text-center py-3 border-b border-cream/20">
        <Link to="/" className="inline-block">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-cream hover:text-off-white transition-colors">
            ManavInVerse
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-cream hover:text-charcoal rounded-md ${
                  isActiveLink(link.href)
                    ? 'text-cream bg-cream/10'
                    : 'text-off-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Auth Actions */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-off-white hover:text-cream transition-colors"
                >
                  <Shield size={16} />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-off-white hover:text-cream transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 text-sm font-medium text-off-white hover:text-cream transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cream hover:text-off-white transition-colors ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 top-24 bg-chocolate z-40 md:hidden"
          >
            <nav className="flex flex-col space-y-6 p-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${
                    isActiveLink(link.href)
                      ? 'text-cream'
                      : 'text-off-white hover:text-cream'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Auth Actions */}
              {user ? (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-lg font-medium text-off-white hover:text-cream transition-colors"
                  >
                    <Shield size={20} />
                    <span>Admin</span>
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-lg font-medium text-off-white hover:text-cream transition-colors text-left"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-off-white hover:text-cream transition-colors"
                >
                  Login
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
