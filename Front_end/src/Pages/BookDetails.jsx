import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // To access URL parameters
import { motion } from "framer-motion"; // For smooth animations

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access the query parameters from the URL
  const queryParams = new URLSearchParams(location.search);

  // Log the full query string to check the parameters
  console.log("Location Search: ", location.search); // Logs the full query string

  // Extract the book data from the URL query parameters
  const book = {
    title: queryParams.get("bookTitle"),
    author: queryParams.get("bookAuthor"),
    imageUrl: queryParams.get("bookImage"),
    price: queryParams.get("bookPrice"),
    description: queryParams.get("bookDescription"),
  };

  // Log the individual values to verify they are being correctly retrieved
  console.log("Book Details: ", book);

  // If the book data is missing, return an error message
  if (!book.title || !book.author || !book.imageUrl || !book.price || !book.description) {
    return <p>Error: Missing book details in URL parameters</p>;
  }

  // Handle "Book Now" button click
  const handleBookNow = () => {
    // Navigate to a booking page or cart page
    navigate(`/reservation?bookTitle=${book.title}&bookPrice=${book.price}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="container mx-auto py-16 px-6 md:px-20 lg:px-32"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-16 space-y-10 lg:space-y-0">
        {/* Book Image */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <img
            src={`http://localhost:8080/${book.imageUrl}`}
            alt={book.title}
            className="w-64 h-96 object-contain rounded-xl shadow-xl"
          />
        </motion.div>

        {/* Book Info */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">{book.title}</h2>
          <p className="text-xl text-center text-gray-500 mb-4">by {book.author}</p>
          <p className="text-lg text-center text-gray-600 mb-6">{book.description}</p>

          <div className="text-center mb-6">
            <p className="text-2xl font-bold text-gray-900">RS: {book.price}</p>
          </div>

          {/* Book Now Button */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
              onClick={handleBookNow}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
          onClick={() => window.history.back()}
        >
          Back to Books
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BookDetails;
