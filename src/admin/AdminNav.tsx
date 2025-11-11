import { Home, Building2, FileText, Mail, MessageSquare, LogOut } from 'lucide-react';
import svgPaths from "../imports/svg-rruih2q2rx";
import Logo from '../components/Logo';

// Remove old Logo components - we'll use the global Logo component instead

type AdminView = 'dashboard' | 'properties' | 'blogs' | 'newsletter' | 'contact';

interface AdminNavProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
  onLogout: () => void;
}

export default function AdminNav({ currentView, onViewChange, onLogout }: AdminNavProps) {
  // Filter to only show Dashboard, Properties, and Blogs (exclude Newsletter and Contact)
  const navItems = [
    { id: 'dashboard' as AdminView, label: 'Dashboard', icon: Home },
    { id: 'properties' as AdminView, label: 'Properties', icon: Building2 },
    { id: 'blogs' as AdminView, label: 'Blogs', icon: FileText },
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Logo variant="blue" useBlueLogo={true} size="medium" />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                      isActive
                        ? 'bg-blue-50 text-[#155eef] font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right side - User & Logout */}
          <div className="flex items-center gap-4">
            {/* User Avatar */}
            <div className="hidden md:flex items-center gap-3">
              <div className="bg-[#f2f4f7] relative rounded-full shrink-0 size-[40px]">
                <div className="absolute inset-0 opacity-[0.08] rounded-full">
                  <div aria-hidden="true" className="absolute border-[0.75px] border-black border-solid inset-0 pointer-events-none rounded-full" />
                </div>
                <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-1/2 not-italic text-[#475467] text-[16px] text-center top-[calc(50%-12px)] translate-x-[-50%] w-[40px]">
                  A
                </p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Admin</p>
                <p className="text-gray-500 text-xs">Administrator</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Logout"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Dropdown */}
        <div className="md:hidden pb-3 pt-2">
          <div className="flex gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                    isActive
                      ? 'bg-blue-50 text-[#155eef] font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}