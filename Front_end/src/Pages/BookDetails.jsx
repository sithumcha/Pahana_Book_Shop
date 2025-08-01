import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaArrowLeft } from 'react-icons/fa';
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
    navigate('/cart');
  };


  

  const renderRating = (rating = 4) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400 text-xl" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400 text-xl" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Books
        </motion.button>

        {/* Book Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Book Cover */}
            <div className="lg:w-2/5 p-8 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <motion.div whileHover={{ scale: 1.02 }} className="relative">
                <img
                  src={imageSrc}
                  alt={`Cover of ${bookTitle || 'the book'}`}
                  className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/500x750?text=Image+Not+Found';
                  }}
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-md">
                  <FaHeart className="text-red-500 text-2xl" />
                </div>
              </motion.div>
            </div>

            {/* Book Info */}
            <div className="lg:w-3/5 p-8 lg:p-12">
              <div className="mb-6">
                <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {bookCategory || 'General'}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {bookTitle || 'Untitled Book'}
                </h1>
                <h2 className="text-xl text-indigo-600 mb-4">
                  by {bookAuthor || 'Unknown Author'}
                </h2>
                <h2 className="text-xl text-indigo-600 mb-4">
                  Language: {bookLanguage || 'Unknown Language'}
                </h2>

                <div className="flex items-center mb-6">
                  <div className="flex mr-4">{renderRating()}</div>
                  <span className="text-gray-500">(24 reviews)</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-8 p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-sm text-gray-500">Price</span>
                    <span className="text-3xl font-bold text-indigo-700">
                      RS {bookPrice ? bookPrice.toFixed(2) : '0.00'}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </motion.button>
                  
                </div>
              </div>

              {/* About Book */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Book</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {bookDescription || 'No description available for this book.'}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="block text-sm text-gray-500">Pages</span>
                    <span className="font-medium">{bookPages || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">Publisher</span>
                    <span className="font-medium">{bookPublisher || 'Unknown'}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">Language</span>
                    <span className="font-medium">{bookLanguage || 'English'}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">Availability</span>
                    <span className="font-medium text-green-600">In Stock</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

        <section className="bg-gray-100 py-10">
          <NewArrivals />
        </section>
       


    </div>
  );
};

export default BookDetails;
