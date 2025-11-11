import { useState } from 'react';
import AdminNav from './AdminNav';
import AdminDashboard from './AdminDashboard';
import AdminPropertyApp from './AdminPropertyApp';
import AdminBlogApp from './AdminBlogApp';

type AdminView = 'dashboard' | 'properties' | 'blogs' | 'newsletter' | 'contact';

interface AdminDashboardRouterProps {
  onLogout: () => void;
}

export default function AdminDashboardRouter({ onLogout }: AdminDashboardRouterProps) {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <AdminNav 
        currentView={currentView} 
        onViewChange={setCurrentView}
        onLogout={onLogout}
      />

      {/* Content */}
      <div className="flex-1">
        {currentView === 'dashboard' && <AdminDashboard onLogout={onLogout} />}
        {currentView === 'properties' && <AdminPropertyApp />}
        {currentView === 'blogs' && <AdminBlogApp />}
        {currentView === 'newsletter' && <AdminDashboard onLogout={onLogout} />}
        {currentView === 'contact' && <AdminDashboard onLogout={onLogout} />}
      </div>
    </div>
  );
}