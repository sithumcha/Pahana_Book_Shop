import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaStar, FaRegStar, FaShoppingCart, FaFilter, FaHeart, FaRegHeart } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const categories = [
  { name: "All", icon: "📚", color: "from-indigo-500 to-purple-500" },
  { name: "Fiction", icon: "📖", color: "from-blue-500 to-cyan-500" },
  { name: "Children's Books", icon: "📕", color: "from-pink-500 to-rose-500" },
  { name: "Educational Books", icon: "🔬", color: "from-green-500 to-emerald-500" },
  { name: "Technology & Programming", icon: "💻", color: "from-purple-500 to-indigo-500" },
  { name: "Health & Fitness", icon: "💪", color: "from-orange-500 to-red-500" },
];

const BookShop = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [whitelist, setWhitelist] = useState([]);
  const [sortBy, setSortBy] = useState("default");
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
        setFilteredBooks(data);
        setError("");
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to fetch books. Please try again later.");
        setBooks([]);
        setFilteredBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Load whitelist from localStorage
    const storedWhitelist = JSON.parse(localStorage.getItem('whitelist')) || [];
    setWhitelist(storedWhitelist);

    fetchBooks();
  }, []);

  useEffect(() => {
    // Filter books whenever search, category, or price changes
    let filtered = books.filter((book) => {
      const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    });

    // Sort books
    if (sortBy === "price-low") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "title") {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredBooks(filtered);
  }, [books, selectedCategory, searchQuery, priceRange, sortBy]);

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
        bookCategory: book.category,
      },
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
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeInOut';
    notification.textContent = 'Added to cart!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('animate-fadeOut');
      setTimeout(() => notification.remove(), 500);
    }, 2000);
  };

  const toggleWhitelist = (book, e) => {
    e.stopPropagation();
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
      }];
    }
    
    setWhitelist(updatedWhitelist);
    localStorage.setItem('whitelist', JSON.stringify(updatedWhitelist));
  };

  const renderRating = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      i < Math.floor(rating || 4) ? 
        <FaStar key={i} className="text-yellow-400 inline text-sm" /> : 
        <FaRegStar key={i} className="text-yellow-400 inline text-sm" />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
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
      `}</style>

      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-12 px-4 sm:px-6 lg:px-8"
      >
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

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-12 bg-white rounded-2xl shadow-xl p-6"
          >
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by title or author..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="default">Sort by</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="title">Title</option>
                </select>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  <FaFilter className="mr-2" />
                  Filters
                  <FiChevronDown className={`ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                    <div>
                     
                      
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range: RS {priceRange[0]} - RS {priceRange[1]}</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="0"
                          max="10000"
                          step="100"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <input
                          type="range"
                          min="0"
                          max="10000"
                          step="100"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div> 
                      <div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>RS 0</span>
                          <span>RS 10,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8 overflow-x-auto"
          >
            <div className="flex space-x-3 pb-4">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.name;
                return (
                  <motion.button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-md ${
                      isSelected
                        ? `bg-gradient-to-r ${category.color} text-white`
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6"
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

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
              <p className="text-gray-600">Loading our collection...</p>
            </div>
          )}

          {/* Book Listings */}
          {!isLoading && filteredBooks.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredBooks.map((book) => {
                  const isWhitelisted = whitelist.some(item => item.bookId === book.id);
                  
                  return (
                    <motion.div
                      key={book.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="book-card overflow-hidden cursor-pointer"
                      onClick={() => handleBookNow(book)}
                    >
                      {/* Book Cover */}
                      <div className="relative h-64 bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
                        <img
                          src={book.imageUrl.startsWith("http") ? book.imageUrl : `http://localhost:8080/${book.imageUrl}`}
                          alt={book.title}
                          className="h-56 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/200x300?text=Book+Cover";
                          }}
                        />
                        
                        {/* Favorite Button */}
                        <button 
                          onClick={(e) => toggleWhitelist(book, e)}
                          className={`absolute top-3 left-3 p-2 rounded-full shadow-md ${isWhitelisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600'}`}
                          aria-label={isWhitelisted ? "Remove from favorites" : "Add to favorites"}
                        >
                          {isWhitelisted ? (
                            <FaHeart className="text-sm" />
                          ) : (
                            <FaRegHeart className="text-sm" />
                          )}
                        </button>
                        
                        {/* Add to Cart Button */}
                        <button 
                          onClick={(e) => handleAddToCart(book, e)}
                          className="absolute top-3 right-3 p-2 bg-white text-indigo-600 rounded-full shadow-md hover:bg-indigo-50 transition-colors"
                          aria-label="Add to cart"
                        >
                          <FaShoppingCart className="text-sm" />
                        </button>
                        
                        {/* Category Badge */}
                        {book.category && (
                          <div className="absolute bottom-3 left-3 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {book.category}
                          </div>
                        )}
                      </div>

                      {/* Book Info */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-2">{book.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-1">by {book.author}</p>
                        
                        <div className="flex items-center mb-3">
                          {renderRating(book.rating || 4)}
                          <span className="text-gray-500 text-xs ml-2">({book.ratingCount || 24})</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xl font-bold text-indigo-700">RS.{book.price}.00</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookNow(book);
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all text-sm"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-full mb-6">
                  <span className="text-6xl">📚</span>
                </div>
                <h3 className="text-2xl font-medium text-gray-700 mb-2">No books found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  {searchQuery ? "Try adjusting your search or filters" : "We're adding more books soon!"}
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setPriceRange([0, 10000]);
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default BookShop;