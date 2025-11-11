import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboardRouter from './AdminDashboardRouter';
import { checkSession, signOut } from './supabaseApi';

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already authenticated on mount using Supabase
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await checkSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#155eef] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <AdminDashboardRouter onLogout={handleLogout} />
      ) : (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}
