import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaArrowLeft, FaShare, FaBook, FaLanguage, FaHashtag } from 'react-icons/fa';
import { motion } from 'framer-motion';
import NewArrivals from './NewArrivals';

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    bookTitle, 
    bookAuthor, 
    bookImage, 
    bookPrice, 
    bookDescription,
    bookPages,
    bookPublisher,
    bookLanguage,
    bookCategory
  } = location.state || {};

  const [relatedBooks, setRelatedBooks] = useState([]);
  const [error, setError] = useState("");
  const [isInWhitelist, setIsInWhitelist] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });

  // Check if book is in whitelist
  useEffect(() => {
    const existingWhitelist = JSON.parse(localStorage.getItem('whitelist')) || [];
    const isWhitelisted = existingWhitelist.some(item => item.bookTitle === bookTitle);
    setIsInWhitelist(isWhitelisted);
  }, [bookTitle]);

  // Fetch related books
  useEffect(() => {
    const fetchRelatedBooks = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/books?category=${bookCategory}`);
        if (response.ok) {
          const data = await response.json();
          setRelatedBooks(data);
        } else {
          setError("Failed to fetch related books.");
        }
      } catch (error) {
        setError("An error occurred while fetching related books.");
      }
    };
    if (bookCategory) {
      fetchRelatedBooks();
    }
  }, [bookCategory]);

  // Show notification
  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  // Get proper image URL
  const getImageUrl = () => {
    if (bookImage?.startsWith('http')) return bookImage;
    if (bookImage) return `http://localhost:8080/${bookImage.replace(/^\//, '')}`;
    return 'https://via.placeholder.com/500x750?text=No+Cover';
  };

  const imageSrc = getImageUrl();

  // Add to Cart (persist in localStorage)
  const handleAddToCart = () => {
    const newItem = {
      bookTitle,
      bookAuthor,
      bookImage,
      bookPrice,
      bookDescription,
      bookPages,
      bookPublisher,
      bookLanguage,
      bookCategory,
      quantity: 1
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = existingCart.findIndex(item => item.bookTitle === bookTitle);

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push(newItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    showNotification('Book added to cart!');
  };

  // Add to Whitelist (persist in localStorage)
  const handleAddToWhitelist = () => {
    const newItem = {
      bookTitle,
      bookAuthor,
      bookImage,
      bookPrice,
      bookDescription,
      bookPages,
      bookPublisher,
      bookLanguage,
      bookCategory
    };

    const existingWhitelist = JSON.parse(localStorage.getItem('whitelist')) || [];
    const existingIndex = existingWhitelist.findIndex(item => item.bookTitle === bookTitle);

    if (existingIndex === -1) {
      existingWhitelist.push(newItem);
      localStorage.setItem('whitelist', JSON.stringify(existingWhitelist));
      setIsInWhitelist(true);
      showNotification('Added to favorites!');
    } else {
      existingWhitelist.splice(existingIndex, 1);
      localStorage.setItem('whitelist', JSON.stringify(existingWhitelist));
      setIsInWhitelist(false);
      showNotification('Removed from favorites!');
    }
  };

  // Share book
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: bookTitle,
          text: `Check out "${bookTitle}" by ${bookAuthor}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showNotification('Link copied to clipboard!');
    }
  };

  const renderRating = (rating = 4) => {
    return Array(5).fill(0).map((_, i) => (
      i < Math.floor(rating) ? 
        <FaStar key={i} className="text-yellow-400 text-lg" /> : 
        <FaRegStar key={i} className="text-yellow-400 text-lg" />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Notification */}
      {notification.show && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          {notification.message}
        </motion.div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 mb-8 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
        >
          <FaArrowLeft className="mr-2" />
          Back to Books
        </motion.button>

        {/* Book Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Book Cover */}
            <div className="lg:w-2/5 p-8 bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.03 }} 
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <img
                  src={imageSrc}
                  alt={`Cover of ${bookTitle || 'the book'}`}
                  className="w-full h-auto max-h-[500px] object-contain rounded-xl shadow-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/500x750?text=Image+Not+Found';
                  }}
                />
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAddToWhitelist}
                    className={`p-3 rounded-full shadow-md ${isInWhitelist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'}`}
                    aria-label={isInWhitelist ? "Remove from favorites" : "Add to favorites"}
                  >
                    <FaHeart className="text-lg" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-3 bg-white text-gray-600 rounded-full shadow-md"
                    aria-label="Share book"
                  >
                    <FaShare className="text-lg" />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Book Info */}
            <div className="lg:w-3/5 p-8 lg:p-10">
              <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {bookCategory || 'General'}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                  {bookTitle || 'Untitled Book'}
                </h1>
                <h2 className="text-xl text-indigo-600 mb-4 font-medium">
                  by {bookAuthor || 'Unknown Author'}
                </h2>

                <div className="flex items-center mb-6">
                  <div className="flex mr-4">{renderRating(4.5)}</div>
                  <span className="text-gray-500">(24 reviews)</span>
                </div>
              </div>

              {/* Book Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <FaBook className="text-indigo-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Pages</p>
                    <p className="font-medium">{bookPages || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <FaLanguage className="text-indigo-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Language</p>
                    <p className="font-medium">{bookLanguage || 'English'}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <FaHashtag className="text-indigo-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Publisher</p>
                    <p className="font-medium">{bookPublisher || 'Unknown'}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-green-500 mr-3 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Availability</p>
                    <p className="font-medium text-green-600">In Stock</p>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="mb-4 sm:mb-0">
                    <span className="block text-sm text-gray-500 mb-1">Price</span>
                    <span className="text-3xl font-bold text-indigo-700">
                      RS {bookPrice ? bookPrice.toFixed(2) : '0.00'}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddToCart}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/cart')}
                      className="px-6 py-3 bg-white border border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
                    >
                      Buy Now
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* About Book */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-5 bg-indigo-500 mr-2 rounded-full"></span>
                  About This Book
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6 bg-blue-50 p-4 rounded-lg border-l-4 border-indigo-400">
                  {bookDescription || 'No description available for this book.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Books Section */}
      <section className="mt-16">
        <NewArrivals />
      </section>
    </div>
  );
};

export default BookDetails;