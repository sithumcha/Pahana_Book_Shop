import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiTrash2, FiShoppingCart, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Whitelist = () => {
  const [whitelist, setWhitelist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load whitelist from localStorage
    const storedWhitelist = JSON.parse(localStorage.getItem('whitelist')) || [];
    setWhitelist(storedWhitelist);
    
    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromWhitelist = (bookId) => {
    const updatedWhitelist = whitelist.filter(book => book.bookId !== bookId);
    setWhitelist(updatedWhitelist);
    localStorage.setItem('whitelist', JSON.stringify(updatedWhitelist));
    toast.success('Removed from favorites!', {
      icon: '❤️'
    });
  };

  const addToCart = (book) => {
    // Check if the book is already in the cart
    const existingItem = cart.find(item => item.bookId === book.bookId);
    
    if (existingItem) {
      // If already in cart, increase quantity
      const updatedCart = cart.map(item =>
        item.bookId === book.bookId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.info('Increased quantity in cart!', {
        icon: '🛒'
      });
    } else {
      // If not in cart, add with quantity 1
      const updatedCart = [...cart, { ...book, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success('Added to cart!', {
        icon: '🛒'
      });
    }
  };

  const isInCart = (bookId) => {
    return cart.some(item => item.bookId === bookId);
  };

  const getImageUrl = (imageUrl) => {
    if (imageUrl?.startsWith('http')) return imageUrl;
    if (imageUrl) return `http://localhost:8080/${imageUrl.replace(/^\//, '')}`;
    return 'https://via.placeholder.com/500x750?text=No+Cover';
  };

  const goBack = () => {
    window.history.back();
  };

  const clearAll = () => {
    if (whitelist.length === 0) return;
    
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      setWhitelist([]);
      localStorage.setItem('whitelist', JSON.stringify([]));
      toast.info('All favorites cleared!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center">
            <button
              onClick={goBack}
              className="mr-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
            >
              <FiArrowLeft className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Your Favorites</h1>
              <p className="text-gray-600 mt-1">Books you've saved for later</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {whitelist.length > 0 && (
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-white text-red-500 border border-red-200 rounded-lg shadow-sm hover:bg-red-50 transition-colors"
              >
                Clear All
              </button>
            )}
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <FiHeart className="text-pink-500 mr-2" />
              <span className="font-medium">{whitelist.length} {whitelist.length === 1 ? 'item' : 'items'}</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        {whitelist.length === 0 ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-8 text-center shadow-sm max-w-md mx-auto"
          >
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiHeart className="text-pink-500 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your favorites list is empty</h3>
            <p className="text-gray-600 mb-6">Start adding books you love to see them here</p>
            <button 
              onClick={() => window.location.href = '/books'}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full transition duration-300 shadow-md hover:shadow-lg"
            >
              Browse Books
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {whitelist.map((book, index) => (
                <motion.div 
                  key={book.bookId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  <div className="relative">
                    <img 
                      src={getImageUrl(book.bookImage)} 
                      alt={book.bookTitle} 
                      className="w-full h-60 object-cover"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/500x750?text=Image+Not+Found'}
                    />
                    <button 
                      onClick={() => removeFromWhitelist(book.bookId)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                      aria-label="Remove from favorites"
                    >
                      <FiTrash2 className="text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                  
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{book.bookTitle}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-1">by {book.bookAuthor}</p>
                    
                    <div className="mt-auto pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-indigo-600 font-bold text-lg">RS {book.bookPrice}</span>
                        <button 
                          onClick={() => addToCart(book)}
                          disabled={isInCart(book.bookId)}
                          className={`flex items-center px-4 py-2 rounded-full text-sm transition duration-300 ${
                            isInCart(book.bookId)
                              ? 'bg-green-100 text-green-700 cursor-default'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
                          }`}
                        >
                          {isInCart(book.bookId) ? (
                            <>
                              <FiCheck className="mr-1" />
                              In Cart
                            </>
                          ) : (
                            <>
                              <FiShoppingCart className="mr-2" />
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </motion.div>
  );
};

export default Whitelist;