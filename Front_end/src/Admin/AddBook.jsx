import React, { useState } from 'react';
import axios from 'axios';
import { FiBook, FiUser, FiDollarSign, FiFileText, FiImage } from 'react-icons/fi';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    language: '',
    price: '',
    pages: '',
    category: '', // Added category field
    description: '', // Added description field
    image: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/books/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Book added successfully!');
    } catch (error) {
      setMessage('Error adding book. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl overflow-hidden p-8 text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Book</h2>
        
        {message && <div className="text-center mb-4 text-red-500">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Book Title */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Book Title</label>
            <div className="relative">
              <FiBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter book title"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Author */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Author</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                placeholder="Enter book author"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Language */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Language</label>
            <div className="relative">
              <FiFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                placeholder="Enter book language"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Price */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Price</label>
            <div className="relative">
              <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="Enter book price"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Pages */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Number of Pages</label>
            <div className="relative">
              <FiFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="number"
                name="pages"
                value={formData.pages}
                onChange={handleChange}
                required
                placeholder="Enter number of pages"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Category */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Category</label>
            <div className="relative">
              <FiFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3   bg-black/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              >
                <option value="">Select Category</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Biography">Biography</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter book description"
              className="w-full pl-3 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
            />
          </div>

          {/* Image Upload */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Book Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              Add Book
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <a href="/books" className="text-purple-400 hover:underline font-medium">
            View All Books
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
