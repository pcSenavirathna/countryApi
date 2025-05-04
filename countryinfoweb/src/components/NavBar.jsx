import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';

export default function Navbar({ isAuthenticated, username, onLogout }) {
  const [darkMode, setDarkMode] = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    onLogout();
    window.location.reload();
  };

  const handlefavcountry = () => {
    navigate('/favcountry');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-400 dark:from-gray-800 dark:to-gray-900 text-white p-4 shadow-md flex justify-between items-center relative">
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:scale-105 transition-transform"
      >
        🌍 Rest Countries
      </Link>

      <div className="flex items-center space-x-6">
        {/* Dark Mode Toggle */}
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="w-20 h-10 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full px-1 cursor-pointer transition-all duration-300"
        >
          <div
            className={`w-8 h-8 bg-white dark:bg-gray-100 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-lg ${
              darkMode ? 'translate-x-10' : 'translate-x-0'
            }`}
          >
            {darkMode ? '🌞' : '🌙'}
          </div>
        </div>

        {/* Favorites Button */}
        {isAuthenticated && (
          <button
            className={`text-2xl text-red-500 transition-colors`}
            onClick={handlefavcountry}
          >
            {'❤️'}
          </button>
        )}

        {/* Hamburger Menu for Mobile */}
        <div className="relative lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            ☰
          </button>

          {/* Overlay and Menu */}
          {menuOpen && (
            <>
              {/* Background Overlay */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-10"
                onClick={() => setMenuOpen(false)} // Close menu when clicking outside
              ></div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg z-20">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      Signup
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="bg-white font-bold text-black px-4 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white font-bold text-black px-4 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="relative group flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="text-white font-medium">{username}</span>
              <svg
                className="w-4 h-4 text-white group-hover:rotate-180 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <div className="absolute rounded-lg right-0 mt-20 w-30 bg-red-600 dark:bg-red-500 text-white font-bold dark:text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-lg text-left px-4 py-2 hover:bg-red-500 dark:hover:bg-red-400"
                >
                  Logout
                </button>
              </div>
              </div>
          )}
        </div>
      </div>
    </nav>
  );
}
