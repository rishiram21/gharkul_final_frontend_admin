import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ChevronsLeft,
  ChevronsRight,
  Package,
  X,
} from 'lucide-react';

const Sidebar = ({ onClose, isMobile }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-close on route change (for mobile)
  useEffect(() => {
    if (isMobile && onClose) {
      onClose();
    }
  }, [location.pathname]);

  const navItemClass = (path) =>
    `flex items-center px-4 py-2 rounded-md transition ${
      location.pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-blue-300 hover:bg-gray-800 hover:text-white'
    }`;

  // Decide width class
  const sidebarWidth = isMobile ? 'w-64' : isCollapsed ? 'w-20' : 'w-64';

  return (
    <div
      className={`h-full bg-gray-900 text-white shadow-md transition-all duration-300
        ${sidebarWidth}
        ${isMobile ? 'fixed top-0 left-0 z-40' : 'relative hidden md:block'}
      `}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!isCollapsed || isMobile ? (
          <span className="text-xl font-bold">Admin</span>
        ) : null}

        {/* Collapse for desktop */}
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white transition"
          >
            {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          </button>
        )}

        {/* Close for mobile */}
        {isMobile && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="mt-4 space-y-2">
        <Link to="/" className={navItemClass('/')}>
          <LayoutDashboard className="w-5 h-5 mr-3" />
          {(!isCollapsed || isMobile) && <span>Dashboard</span>}
        </Link>
        <Link to="/allproperty" className={navItemClass('/allproperty')}>
          <Package className="w-5 h-5 mr-3" />
          {(!isCollapsed || isMobile) && <span>All Property List</span>}
        </Link>
        <Link to="/amenities" className={navItemClass('/amenities')}>
          <Users className="w-5 h-5 mr-3" />
          {(!isCollapsed || isMobile) && <span>Amenities</span>}
        </Link>
        <Link to="/package" className={navItemClass('/package')}>
          <Package className="w-5 h-5 mr-3" />
          {(!isCollapsed || isMobile) && <span>Packages</span>}
        </Link>
        <Link to="/subscriber" className={navItemClass('/subscriber')}>
          <Package className="w-5 h-5 mr-3" />
          {(!isCollapsed || isMobile) && <span>Subscriber List</span>}
        </Link>
        <Link to="/customer" className={navItemClass('/customer')}>
          <Package className="w-5 h-5 mr-3" />
          {(!isCollapsed || isMobile) && <span>Customer</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
