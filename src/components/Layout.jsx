import React, { useState } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      <hr></hr>
      
      {/* Navbar with mobile menu toggle */}
      {/* <Navbar onToggleSidebar={toggleSidebar} /> */}
      
      {/* Main content area */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside className={`
          fixed md:relative md:translate-x-0 z-30 h-full md:h-auto
          w-64 bg-white shadow-lg md:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:w-64 lg:w-72 xl:w-80
        `}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </aside>
        
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main content */}
        <main className="flex-1 min-w-0 bg-gray-50">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;