import { createContext, useContext, useEffect, useState } from 'react';

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  signOut: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
      setIsAdminAuthenticated(isAuthenticated);
    };

    checkAuth();
    
    // Listen for storage changes
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const signOut = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAdminAuthenticated(false);
  };

  const value = {
    isAdminAuthenticated,
    signOut,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};