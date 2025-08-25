// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css'; // Correct import for Swiper styles

// const AllBooksSlider = () => {
//   const [books, setBooks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBooks = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch("http://localhost:8080/api/books");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setBooks(data);
//         setError("");
//       } catch (error) {
//         console.error("Error fetching books:", error);
//         setError("Failed to fetch books. Please try again later.");
//         setBooks([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const handleBookNow = (book) => {
//     navigate(`/bookdetails/${book.id}`, {
//       state: {
//         bookTitle: book.title,
//         bookAuthor: book.author,
//         bookImage: book.imageUrl,
//         bookPrice: book.price,
//         bookDescription: book.description,
//         bookLanguage: book.language,
//         bookPages: book.pages,
//         bookCategory: book.category
//       }
//     });
//   };

//   const renderRating = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         i <= rating ? (
//           <FaStar key={i} className="text-yellow-400 inline" />
//         ) : (
//           <FaRegStar key={i} className="text-yellow-400 inline" />
//         )
//       );
//     }
//     return stars;
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
//             All Books Collection
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Browse through our vast collection of books. Explore your next favorite read!
//           </p>
//         </motion.div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//           </div>
//         )}

//         {/* Error Message */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
//           >
//             {error}
//           </motion.div>
//         )}

//         {/* Swiper Slider */}
//         {!isLoading && books.length > 0 && (
//           <Swiper
//             spaceBetween={30}
//             slidesPerView={3}
//             loop={true}
//             autoplay={{ delay: 2500, disableOnInteraction: false }}
//             className="mySwiper"
//           >
//             {books.map((book) => (
//               <SwiperSlide key={book.id}>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   whileHover={{ y: -5 }}
//                   className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
//                 >
//                   {/* Book Cover */}
//                   <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//                     <img
//                       src={book.imageUrl.startsWith("http")
//                         ? book.imageUrl
//                         : `http://localhost:8080/${book.imageUrl}`}
//                       alt={book.title}
//                       className="h-48 w-auto object-contain transition-transform duration-300 hover:scale-105"
//                       onError={(e) => {
//                         e.target.src =
//                           "https://via.placeholder.com/200x300?text=Book+Cover";
//                       }}
//                     />
//                     <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
//                       <FaShoppingCart className="text-indigo-600" />
//                     </div>
//                   </div>

//                   {/* Book Info */}
//                   <div className="p-5">
//                     <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{book.title}</h3>
//                     <p className="text-gray-600 text-sm mb-3">by {book.author}</p>
//                     <div className="flex items-center mb-3">
//                       {renderRating(book.rating || 4)}
//                     </div>
//                     <span className="text-xl font-bold text-gray-900">RS {book.price}     <div></div>    </span>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => handleBookNow(book)}
//                       className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//                     >
//                       View Details
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}

//         {/* No Books Found */}
//         {!isLoading && books.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-16"
//           >
//             <div className="text-6xl mb-4">📚</div>
//             <h3 className="text-2xl font-medium text-gray-700 mb-2">No books available</h3>
//             <p className="text-gray-500">We're adding more books soon!</p>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default AllBooksSlider;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
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
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
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
              className="pb-12"
            >
              {books.map((book) => {
                const isWhitelisted = whitelist.some(item => item.bookId === book.id);
                
                return (
                  <SwiperSlide key={book.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -10 }}
                      onClick={() => handleBookNow(book)}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
                    >
                      {/* Favorite Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWhitelist(book);
                        }}
                        className="absolute top-3 left-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                        aria-label={isWhitelisted ? "Remove from favorites" : "Add to favorites"}
                      >
                        {isWhitelisted ? (
                          <FaHeart className="text-red-500 text-lg" />
                        ) : (
                          <FaRegHeart className="text-gray-600 hover:text-red-500 text-lg" />
                        )}
                      </button>

                      {/* Book Cover */}
                      <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={book.imageUrl.startsWith("http")
                            ? book.imageUrl
                            : `http://localhost:8080/${book.imageUrl}`}
                          alt={book.title}
                          className="h-56 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/200x300?text=Book+Cover";
                          }}
                        />
                      </div>

                      {/* Book Info */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">{book.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-1">by {book.author}</p>
                        <div className="flex items-center mb-3">
                          {renderRating(book.rating || 4)}
                          <span className="text-gray-500 text-xs ml-2">({book.ratingCount || 24})</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xl font-bold text-gray-900">RS {book.price}</span>
                          <button 
                            onClick={(e) => handleAddToCart(book, e)}
                            className="flex items-center justify-center p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors"
                            aria-label="Add to cart"
                          >
                            <FaShoppingCart className="text-lg" />
                          </button>
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
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Refresh Page
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AllBooksSlider;