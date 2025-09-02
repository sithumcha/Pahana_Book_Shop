import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaStar, FaRegStar, FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AllBooksSlider = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [whitelist, setWhitelist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/books");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
        setError("");
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to fetch books. Please try again later.");
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Load whitelist from localStorage
    const storedWhitelist = JSON.parse(localStorage.getItem('whitelist')) || [];
    setWhitelist(storedWhitelist);

    fetchBooks();
  }, []);

  const toggleWhitelist = (book) => {
    const isInWhitelist = whitelist.some(item => item.bookId === book.id);
    let updatedWhitelist;
    
    if (isInWhitelist) {
      updatedWhitelist = whitelist.filter(item => item.bookId !== book.id);
    } else {
      updatedWhitelist = [...whitelist, {
        bookId: book.id,
        bookTitle: book.title,
        bookAuthor: book.author,
        bookImage: book.imageUrl,
        bookPrice: book.price,
        bookDescription: book.description
      }];
    }
    
    setWhitelist(updatedWhitelist);
    localStorage.setItem('whitelist', JSON.stringify(updatedWhitelist));
  };

  const handleBookNow = (book) => {
    navigate(`/bookdetails/${book.id}`, {
      state: {
        bookTitle: book.title,
        bookAuthor: book.author,
        bookImage: book.imageUrl,
        bookPrice: book.price,
        bookDescription: book.description,
        bookLanguage: book.language,
        bookPages: book.pages,
        bookCategory: book.category
      }
    });
  };

  const handleAddToCart = (book, e) => {
    e.stopPropagation();
    const newItem = {
      bookId: book.id,
      bookTitle: book.title,
      bookAuthor: book.author,
      bookImage: book.imageUrl,
      bookPrice: book.price,
      quantity: 1,
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = existingCart.findIndex(item => item.bookId === book.id);

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push(newItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show a small notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeInOut';
    notification.textContent = 'Added to cart!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('animate-fadeOut');
      setTimeout(() => notification.remove(), 500);
    }, 2000);
  };

  const renderRating = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      i < Math.floor(rating || 4) ? 
        <FaStar key={i} className="text-yellow-400 inline" /> : 
        <FaRegStar key={i} className="text-yellow-400 inline" />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fadeInOut {
          animation: fadeInOut 2.5s ease-in-out forwards;
        }
        .book-card {
          background: linear-gradient(145deg, #ffffff, #f8f9fa);
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }
        .book-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(67, 56, 202, 0.15);
        }
        .book-image-container {
          position: relative;
          overflow: hidden;
          border-radius: 12px 12px 0 0;
        }
        .book-image-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30%;
          background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .book-card:hover .book-image-container::after {
          opacity: 1;
        }
        .action-buttons {
          position: absolute;
          bottom: -50px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 10px;
          padding: 10px;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 2;
        }
        .book-card:hover .action-buttons {
          bottom: 10px;
          opacity: 1;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Discover Your Next Read
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our curated collection of books across all genres. Find your perfect match today!
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
            <p className="text-gray-600">Loading our collection...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-8 max-w-2xl mx-auto"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Swiper Slider */}
        {!isLoading && books.length > 0 && (
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
              }}
              className="pb-16"
            >
              {books.map((book) => {
                const isWhitelisted = whitelist.some(item => item.bookId === book.id);
                
                return (
                  <SwiperSlide key={book.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="book-card h-full flex flex-col overflow-hidden group relative"
                    >
                      {/* Favorite Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWhitelist(book);
                        }}
                        className="absolute top-3 left-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300 hover:scale-110"
                        aria-label={isWhitelisted ? "Remove from favorites" : "Add to favorites"}
                      >
                        {isWhitelisted ? (
                          <FaHeart className="text-red-500 text-lg" />
                        ) : (
                          <FaRegHeart className="text-gray-600 hover:text-red-500 text-lg" />
                        )}
                      </button>

                      {/* Book Cover */}
                      <div className="book-image-container h-64 bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
                        <img
                          src={book.imageUrl.startsWith("http")
                            ? book.imageUrl
                            : `http://localhost:8080/${book.imageUrl}`}
                          alt={book.title}
                          className="h-52 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/200x300?text=Book+Cover";
                          }}
                        />
                        
                        {/* Action Buttons */}
                        <div className="action-buttons">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleAddToCart(book, e)}
                            className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-colors"
                            aria-label="Add to cart"
                          >
                            <FaShoppingCart className="text-lg" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleBookNow(book)}
                            className="p-3 bg-white hover:bg-gray-100 text-indigo-600 rounded-full shadow-lg transition-colors flex items-center justify-center"
                            aria-label="View details"
                          >
                            <FaEye className="text-lg" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Book Info */}
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">{book.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-1">by {book.author}</p>
                        <div className="flex items-center mb-3">
                          {renderRating(book.rating || 4)}
                          <span className="text-gray-500 text-xs ml-2">({book.ratingCount || 24})</span>
                        </div>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-xl font-bold text-indigo-700">RS.{book.price}.00</span>
                          
                          {/* View Details Button */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleBookNow(book)}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg flex items-center"
                          >
                            <FaEye className="mr-2" />
                            View Details
                          </motion.button>
                        </div>
                      </div>

                      {/* Category Badge */}
                      {book.category && (
                        
                        <div className="absolute top-3 right-3 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {book.category}
                        </div>
                      )}
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}

        {/* No Books Found */}
        {!isLoading && books.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-full mb-6">
              <span className="text-6xl">📚</span>
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No books available</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">We're currently updating our collection. Check back soon for new arrivals!</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              Refresh Page
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AllBooksSlider;