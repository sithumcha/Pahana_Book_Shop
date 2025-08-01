import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');

      if (!token || !username) {
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/auth/users/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data) {
          setUser(response.data);
          if (response.data.profileImagePath) {
            setImagePreview(`http://localhost:8080/${response.data.profileImagePath}`);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      navigate(`/shop?search=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput('');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white flex items-center">
          <span className="font-extrabold">Pahana</span>
          <span className="font-light ml-1">Bookshop</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/home" className="text-white hover:text-purple-200">Home</Link>
          <Link to="/shop" className="text-white hover:text-purple-200">Shop</Link>
          <Link to="/service" className="text-white hover:text-purple-200">Service</Link>
          <Link to="/about" className="text-white hover:text-purple-200">About</Link>
          <Link to="/contactus" className="text-white hover:text-purple-200">Contact Us</Link>
          

          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search books..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-white text-sm text-gray-800 border border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </form>

          {/* Cart */}
          <Link to="/cart" className="text-white relative">
            <FiShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-white text-purple-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Link>

          {/* User dropdown */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white text-purple-600 flex items-center justify-center">
                      <FiUser className="text-xl" />
                    </div>
                  )}
                </div>
                <span className="font-medium text-white">{user.username}</span>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FiUser className="inline mr-2" /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
                    >
                      <FiLogOut className="inline mr-2" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-purple-700">
          <div className="flex flex-col space-y-3 px-4 py-4 text-white">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md bg-white text-sm text-gray-800 border border-gray-300 focus:ring-2 focus:ring-purple-500"
              />
              <FaSearch className="absolute left-4 top-3 text-gray-400" />
            </form>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <Link to="/service" onClick={() => setMobileMenuOpen(false)}>Service</Link>


            <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
            <button onClick={handleLogout} className="text-left text-red-300">Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
