
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0 h-16 flex items-center px-6 justify-between">
    <div className="flex items-center space-x-3">
      <div className="bg-blue-600 text-white p-2 rounded-lg font-bold">SS</div>
      <h1 className="text-xl font-bold text-gray-800">SevaSetu <span className="text-blue-600">AI</span></h1>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-500 font-medium">Digital Governance Portal</span>
      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border border-orange-200">
        JS
      </div>
    </div>
  </nav>
);

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/file-grievance', label: 'File Grievance', icon: '✍️' },
    { path: '/services', label: 'Public Services', icon: '🏛️' },
    { path: '/admin', label: 'Admin Panel', icon: '🛡️' },
  ];

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200 p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-8 left-4 right-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <p className="text-xs text-gray-400 mb-2">Need Help?</p>
        <button className="w-full bg-white border border-gray-200 text-xs font-semibold py-2 rounded-lg hover:shadow-sm">
          Contact Support
        </button>
      </div>
    </aside>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-slate-50">
    <Navbar />
    <Sidebar />
    <main className="pl-64 pt-16 h-screen overflow-auto">
      <div className="p-8 max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  </div>
);
