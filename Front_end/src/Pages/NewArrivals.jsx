import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Correct import for Swiper styles

const AllBooksSlider = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
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

    fetchBooks();
  }, []);

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

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400 inline" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400 inline" />
        )
      );
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            All Books Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through our vast collection of books. Explore your next favorite read!
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Swiper Slider */}
        {!isLoading && books.length > 0 && (
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="mySwiper"
          >
            {books.map((book) => (
              <SwiperSlide key={book.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Book Cover */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <img
                      src={book.imageUrl.startsWith("http")
                        ? book.imageUrl
                        : `http://localhost:8080/${book.imageUrl}`}
                      alt={book.title}
                      className="h-48 w-auto object-contain transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/200x300?text=Book+Cover";
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                      <FaShoppingCart className="text-indigo-600" />
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{book.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">by {book.author}</p>
                    <div className="flex items-center mb-3">
                      {renderRating(book.rating || 4)}
                    </div>
                    <span className="text-xl font-bold text-gray-900">RS {book.price}     <div></div>    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBookNow(book)}
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* No Books Found */}
        {!isLoading && books.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No books available</h3>
            <p className="text-gray-500">We're adding more books soon!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AllBooksSlider;
