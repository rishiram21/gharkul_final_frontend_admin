import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItemClass = (path) =>
    `flex items-center px-4 py-2 rounded-md transition ${
      location.pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-blue-300 hover:bg-gray-800 hover:text-white'
    }`;

  return (
    <aside
      className={`h-screen bg-gray-900 text-white fixed top-0 left-0 shadow-md transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed && (
          <span className="text-xl font-bold tracking-wide">Admin</span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white transition"
        >
          {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
        </button>
      </div>

      <nav className="mt-4 space-y-2">
        <Link to="/" className={navItemClass('/')}>
          <LayoutDashboard className="w-5 h-5 mr-3" />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>
        <Link to="/users" className={navItemClass('/users')}>
          <Users className="w-5 h-5 mr-3" />
          {!isCollapsed && <span>Users</span>}
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
