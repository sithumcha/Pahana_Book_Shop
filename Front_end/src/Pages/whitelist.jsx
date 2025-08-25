import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiTrash2, FiShoppingCart } from 'react-icons/fi';

const Whitelist = () => {
  const [whitelist, setWhitelist] = useState([]);

  useEffect(() => {
    const storedWhitelist = JSON.parse(localStorage.getItem('whitelist')) || [];
    setWhitelist(storedWhitelist);
  }, []);

  const removeFromWhitelist = (bookId) => {
    const updatedWhitelist = whitelist.filter(book => book.bookId !== bookId);
    setWhitelist(updatedWhitelist);
    localStorage.setItem('whitelist', JSON.stringify(updatedWhitelist));
  };

  const getImageUrl = (imageUrl) => {
    if (imageUrl?.startsWith('http')) return imageUrl;
    if (imageUrl) return `http://localhost:8080/${imageUrl.replace(/^\//, '')}`;
    return 'https://via.placeholder.com/500x750?text=No+Cover';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Your Favorites</h1>
            <p className="text-gray-600 mt-2">Books you've saved for later</p>
          </div>
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
            <FiHeart className="text-pink-500 mr-2" />
            <span className="font-medium">{whitelist.length} {whitelist.length === 1 ? 'item' : 'items'}</span>
          </div>
        </div>
        
        {whitelist.length === 0 ? (
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-8 text-center shadow-sm max-w-md mx-auto"
          >
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiHeart className="text-pink-500 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your favorites list is empty</h3>
            <p className="text-gray-600 mb-4">Start adding books you love to see them here</p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition duration-300">
              Browse Books
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whitelist.map((book, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative">
                  <img 
                    src={getImageUrl(book.bookImage)} 
                    alt={book.bookTitle} 
                    className="w-full h-64 object-cover"
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
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{book.bookTitle}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-1">by {book.bookAuthor}</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-indigo-600 font-bold">RS {book.bookPrice}</span>
                    <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm transition duration-300">
                      <FiShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Whitelist;