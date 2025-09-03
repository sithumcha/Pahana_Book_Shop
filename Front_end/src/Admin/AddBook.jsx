import React, { useState } from 'react';
import axios from 'axios';
import { FiBook, FiUser, FiDollarSign, FiFileText, FiImage, FiPlus, FiX } from 'react-icons/fi';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    language: '',
    price: '',
    pages: '',
    category: '',
    description: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 2) {
      newErrors.title = 'Title must be at least 2 characters long';
    }
    
    // Author validation
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    } else if (formData.author.length < 2) {
      newErrors.author = 'Author name must be at least 2 characters long';
    }
    
    // Language validation
    if (!formData.language.trim()) {
      newErrors.language = 'Language is required';
    }
    
    // Price validation
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid number greater than 0';
    }
    
    // Pages validation
    if (!formData.pages) {
      newErrors.pages = 'Number of pages is required';
    } else if (isNaN(formData.pages) || parseInt(formData.pages) <= 0) {
      newErrors.pages = 'Pages must be a valid number greater than 0';
    } else if (parseInt(formData.pages) > 2000) {
      newErrors.pages = 'Pages cannot exceed 2,000';
    }
    
    // Category validation
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }
    
    // Image validation
    if (!formData.image) {
      newErrors.image = 'Book cover image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Validate file type and size
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        setErrors(prev => ({ 
          ...prev, 
          image: 'Please select a valid image file (JPEG, JPG, PNG)' 
        }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ 
          ...prev, 
          image: 'Image size must be less than 5MB' 
        }));
        return;
      }
      
      setFormData(prev => ({ ...prev, image: file }));
      setErrors(prev => ({ ...prev, image: '' }));
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const clearImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    setErrors(prev => ({ ...prev, image: 'Book cover image is required' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');

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
      // Reset form after successful submission
      setFormData({
        title: '',
        author: '',
        language: '',
        price: '',
        pages: '',
        category: '',
        description: '',
        image: null,
      });
      setImagePreview(null);
      setErrors({});
    } catch (error) {
      setMessage('Error adding book. Please try again.');
      console.error('Error adding book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-gray-800 border border-indigo-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-700">
            Add New Book
          </h2>
          <p className="text-gray-600 mt-2">Fill in the details to add a new book to your collection</p>
        </div>
        
        {message && (
          <div className={`text-center mb-6 p-3 rounded-lg ${message.includes('successfully') ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Book Title */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Book Title</label>
              <div className="relative">
                <FiBook className="absolute left-3 top-3.5 text-indigo-500" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter book title"
                  className={`w-full pl-10 pr-4 py-3 bg-blue-50 border ${errors.title ? 'border-red-300' : 'border-indigo-100'} rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-gray-800 transition-colors`}
                />
              </div>
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Author */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-indigo-500" />
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  placeholder="Enter book author"
                  className={`w-full pl-10 pr-4 py-3 bg-blue-50 border ${errors.author ? 'border-red-300' : 'border-indigo-100'} rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-gray-800 transition-colors`}
                />
              </div>
              {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
            </div>

            {/* Language */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-3.5 text-indigo-500" />
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                  placeholder="Enter book language"
                  className={`w-full pl-10 pr-4 py-3 bg-blue-50 border ${errors.language ? 'border-red-300' : 'border-indigo-100'} rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-gray-800 transition-colors`}
                />
              </div>
              {errors.language && <p className="mt-1 text-sm text-red-600">{errors.language}</p>}
            </div>

            {/* Price */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-3.5 text-indigo-500" />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0.01"
                  step="0.01"
                  placeholder="Enter book price"
                  className={`w-full pl-10 pr-4 py-3 bg-blue-50 border ${errors.price ? 'border-red-300' : 'border-indigo-100'} rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-gray-800 transition-colors`}
                />
              </div>
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            {/* Pages */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Pages</label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-3.5 text-indigo-500" />
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  required
                  min="1"
                  max="10000"
                  placeholder="Enter number of pages"
                  className={`w-full pl-10 pr-4 py-3 bg-blue-50 border ${errors.pages ? 'border-red-300' : 'border-indigo-100'} rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-gray-800 transition-colors`}
                />
              </div>
              {errors.pages && <p className="mt-1 text-sm text-red-600">{errors.pages}</p>}
            </div>

            {/* Category */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-3.5 text-indigo-500 z-10" />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 bg-blue-50 border ${errors.category ? 'border-red-300' : 'border-indigo-100'} rounded-lg appearance-none placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-gray-800 transition-colors`}
                >
                  <option value="">Select Category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Children's Books">Children's Books</option>
                  <option value="Educational Books">Educational Books</option>
                  <option value="Technology & Programming">Technology & Programming</option>
                  <option value="Health & Fitness">Health & Fitness</option>
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter book description"
              className={`w-full px-4 py-3 bg-blue-50 border ${errors.description ? 'border-red-300' : 'border-indigo-100'} rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-gray-800 transition-colors`}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Image Upload */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Book Cover Image</label>
            
            {imagePreview ? (
              <div className="relative mt-2">
                <div className="w-40 h-56 rounded-lg overflow-hidden border-2 border-indigo-200 shadow-sm">
                  <img 
                    src={imagePreview} 
                    alt="Book cover preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                >
                  <FiX className="text-white text-sm" />
                </button>
              </div>
            ) : (
              <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed ${errors.image ? 'border-red-300' : 'border-indigo-200'} rounded-xl bg-blue-50 hover:bg-indigo-50 transition-colors cursor-pointer`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiImage className="w-10 h-10 mb-3 text-indigo-400" />
                  <p className="mb-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                </div>
                <input 
                  type="file" 
                  name="image" 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*"
                />
              </label>
            )}
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-1/2 bg-gradient-to-r from-indigo-500 to-blue-500 py-4 rounded-lg font-semibold text-white hover:from-indigo-600 hover:to-blue-600 transition-all flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Book...
                </>
              ) : (
                <>
                  <FiPlus className="mr-2" />
                  Add Book
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          <a href="/admin/managebook" className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-colors">
            ← Back to All Books
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddBook;