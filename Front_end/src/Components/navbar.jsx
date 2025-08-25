// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiUser, FiLogOut, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
// import { FaSearch } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [searchInput, setSearchInput] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('token');
//       const username = localStorage.getItem('username');

//       if (!token || !username) {
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/auth/users/${username}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (response.data) {
//           setUser(response.data);
//           if (response.data.profileImagePath) {
//             setImagePreview(`http://localhost:8080/${response.data.profileImagePath}`);
//           }
//         }
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//     navigate('/login');
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchInput.trim() !== '') {
//       navigate(`/shop?search=${encodeURIComponent(searchInput.trim())}`);
//       setSearchInput('');
//     }
//   };

//   return (
//     <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
//       <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-white flex items-center">
//           <span className="font-extrabold">Pahana</span>
//           <span className="font-light ml-1">Bookshop</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-6 items-center">
//           <Link to="/home" className="text-white hover:text-purple-200">Home</Link>
//           <Link to="/shop" className="text-white hover:text-purple-200">Shop</Link>
          
//           <Link to="/about" className="text-white hover:text-purple-200">About</Link>
//           <Link to="/contactus" className="text-white hover:text-purple-200">Contact Us</Link>
//           <Link to="/downloadpdf" className="text-white hover:text-purple-200">User Guide</Link>

//           {/* Search */}
//           <form onSubmit={handleSearchSubmit} className="relative">
//             <input
//               type="text"
//               placeholder="Search books..."
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               className="pl-10 pr-4 py-2 rounded-lg bg-white text-sm text-gray-800 border border-gray-300 focus:ring-2 focus:ring-purple-500"
//             />
//             <FaSearch className="absolute left-3 top-3 text-gray-400" />
//           </form>

//           {/* Cart */}
//           <Link to="/cart" className="text-white relative">
//             <FiShoppingCart className="text-xl" />
//             {/* <span className="absolute -top-2 -right-2 bg-white text-purple-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              
//             </span> */}
//           </Link>

//           {/* User dropdown */}
//           {user && (
//             <div className="relative">
//               <button
//                 onClick={() => setDropdownOpen(!isDropdownOpen)}
//                 className="flex items-center space-x-2 focus:outline-none"
//               >
//                 <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md">
//                   {imagePreview ? (
//                     <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="w-full h-full bg-white text-purple-600 flex items-center justify-center">
//                       <FiUser className="text-xl" />
//                     </div>
//                   )}
//                 </div>
//                 <span className="font-medium text-white">{user.username}</span>
//               </button>

//               <AnimatePresence>
//                 {isDropdownOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10"
//                   >
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       <FiUser className="inline mr-2" /> Profile
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
//                     >
//                       <FiLogOut className="inline mr-2" /> Logout
//                     </button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-white text-2xl"
//           onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? <FiX /> : <FiMenu />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-purple-700">
//           <div className="flex flex-col space-y-3 px-4 py-4 text-white">
//             <form onSubmit={handleSearchSubmit} className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 rounded-md bg-white text-sm text-gray-800 border border-gray-300 focus:ring-2 focus:ring-purple-500"
//               />
//               <FaSearch className="absolute left-4 top-3 text-gray-400" />
//             </form>
//             <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
//             <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
//             <Link to="/downloadpdf" onClick={() => setMobileMenuOpen(false)}>User Guide</Link>


//             <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
//             <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
//             <button onClick={handleLogout} className="text-left text-red-300">Logout</button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiShoppingCart, FiMenu, FiX, FiLogIn, FiHeart } from "react-icons/fi";
import { FaBookOpen } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");

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
        console.error("Failed to fetch user data:", error);
      }
    };

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItemsCount(cart.reduce((total, item) => total + item.quantity, 0));
    };

    fetchUserData();
    updateCartCount();
    
    // Listen for cart updates
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    setImagePreview(null);
    navigate("/login");
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-purple-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Desktop Menu */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <FaBookOpen className="h-8 w-8 text-white mr-2" />
              <span className="text-xl font-bold text-white">
                <span className="font-extrabold">Pahana</span>
                <span className="font-light ml-1">Bookshop</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex space-x-8">
                <Link 
                  to="/" 
                  className="text-white hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  activeclassname="bg-purple-800"
                >
                  Home
                </Link>
                <Link 
                  to="/shop" 
                  className="text-white hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  activeclassname="bg-purple-800"
                >
                  Shop
                </Link>
                <Link 
                  to="/about" 
                  className="text-white hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  activeclassname="bg-purple-800"
                >
                  About
                </Link>
                <Link 
                  to="/contactus" 
                  className="text-white hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  activeclassname="bg-purple-800"
                >
                  Contact
                </Link>
                <Link 
                  to="/downloadpdf" 
                  className="text-white hover:text-purple-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  activeclassname="bg-purple-800"
                >
                  Guide
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop Cart, Favorites and User */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Favorites */}
            <Link 
              to="/whitelist" 
              className="p-2 text-white hover:text-purple-200 relative transition-colors"
              title="Favorites"
            >
              <FiHeart className="text-xl" />
            </Link>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="p-2 text-white hover:text-purple-200 relative transition-colors"
              title="Cart"
            >
              <FiShoppingCart className="text-xl" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User dropdown or Login button */}
            {user ? (
              <div className="relative ml-2">
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                  aria-label="User menu"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/30 shadow-md hover:border-white transition-colors">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-white/10 text-white flex items-center justify-center">
                        <FiUser className="text-lg" />
                      </div>
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="py-1">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.username}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FiUser className="inline mr-2" /> Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <FiLogOut className="inline mr-2" /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <FiLogIn className="text-lg" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link 
              to="/cart" 
              className="p-2 text-white relative mr-2"
            >
              <FiShoppingCart className="text-xl" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white/20 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-purple-800 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition-colors"
              >
                Shop
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contactus"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/downloadpdf"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition-colors"
              >
                User Guide
              </Link>
              <Link
                to="/whitelist"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition-colors"
              >
                Favorites
              </Link>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-purple-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700 transition-colors"
                >
                  <FiLogIn className="mr-2" />
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;