import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
  localStorage.removeItem('isAuthenticated');
  navigate('/signin');
};


  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="bg-gray-900 text-white py-4 shadow-md z-50 w-full">
  <div className="flex items-center justify-between px-6">
    {/* Logo + Title on the Left */}
    <div className="flex items-center space-x-3">
      <img
        src="/Logo.png" // Update path if needed
        alt="Gharkul Logo"
        className="h-10 w-10 object-cover rounded-md shadow-sm"
      />
      <h1 className="text-xl font-extrabold tracking-wide font-sans">
        Gharkul
      </h1>
    </div>

    {/* Admin Dropdown on the Right */}
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 hover:bg-gray-800 px-4 py-2 rounded-full transition"
      >
        <img
          src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
          alt="Admin"
          className="h-8 w-8 rounded-full"
        />
        <span className="font-medium hidden sm:inline">Admin</span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg ring-1 ring-black/5 animate-fade-in z-50">
          {/* <button
            onClick={() => navigate('/profile')}
            className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
          >
            <User className="w-4 h-4 mr-2" /> Profile
          </button> */}
          {/* <button
            onClick={() => navigate('/settings')}
            className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
          >
            <Settings className="w-4 h-4 mr-2" /> Settings
          </button> */}
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-100 w-full"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  </div>
</header>

  );
};

export default Header;
