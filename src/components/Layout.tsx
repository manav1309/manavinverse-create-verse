
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from './ui/toaster';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminPage) {
    return (
      <div className="min-h-screen bg-background">
        {children}
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header isScrolled={isScrolled} />
      <main className="pt-24">
        {children}
      </main>
      <Footer showAnimation={!isContactPage} />
      <Toaster />
    </div>
  );
};

export default Layout;
