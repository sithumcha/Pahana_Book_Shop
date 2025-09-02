import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiCalendar, FiCheck, FiX, FiCamera } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    contactNumber: '',
    address: '',
    gender: '',
    birthdate: '',
    profileImage: null,
  });

  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    handleChange(e); // Update the form data
    
    // Password validation checks
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profileImage: file }));
    
    // Create image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const validatePassword = () => {
    const { length, uppercase, lowercase, number, specialChar } = passwordValidation;
    return length && uppercase && lowercase && number && specialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password before submission
    if (!validatePassword()) {
      setPasswordError('Password does not meet all requirements');
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Registration successful');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  // Helper component for validation requirements
  const ValidationRequirement = ({ valid, text }) => (
    <div className="flex items-center text-xs mt-1">
      {valid ? (
        <FiCheck className="text-green-500 mr-1" />
      ) : (
        <FiX className="text-red-400 mr-1" />
      )}
      <span className={valid ? 'text-green-600' : 'text-gray-500'}>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side - Decorative */}
        <div className="hidden md:flex flex-col justify-center items-center p-8 bg-gradient-to-br from-blue-400 to-indigo-600 text-white">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome to Pahana Book Shop</h1>
            <p className="text-blue-100">Join our community of book lovers</p>
          </div>
          
          <div className="w-64 h-64 bg-blue-300/20 rounded-full flex items-center justify-center mb-8">
            <div className="w-48 h-48 bg-blue-200/30 rounded-full flex items-center justify-center">
              <div className="w-32 h-32 bg-blue-100/40 rounded-full flex items-center justify-center">
                <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-white">Why Join Us?</h3>
            <ul className="space-y-2 text-blue-100">
              <li className="flex items-center justify-center">
                <FiCheck className="mr-2 text-green-300" /> Access to thousands of books
              </li>
              <li className="flex items-center justify-center">
                <FiCheck className="mr-2 text-green-300" /> Exclusive member discounts
              </li>
              <li className="flex items-center justify-center">
                <FiCheck className="mr-2 text-green-300" /> Personalized recommendations
              </li>
            </ul>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <div className="p-8 text-gray-700">
          <h2 className="text-3xl font-bold text-center mb-2 text-indigo-700">
            Create Your Account
          </h2>
          <p className="text-center text-gray-600 mb-6">Join our community today</p>

          {message && (
            <div className={`text-center mb-4 p-3 rounded-lg ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}
          {passwordError && <div className="text-center mb-4 p-3 rounded-lg bg-red-100 text-red-700">{passwordError}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Username */}
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1">Username</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <ValidationRequirement
                  valid={passwordValidation.length}
                  text="8+ characters"
                />
                <ValidationRequirement
                  valid={passwordValidation.uppercase}
                  text="Uppercase letter"
                />
                <ValidationRequirement
                  valid={passwordValidation.lowercase}
                  text="Lowercase letter"
                />
                <ValidationRequirement
                  valid={passwordValidation.number}
                  text="Contains number"
                />
                <ValidationRequirement
                  valid={passwordValidation.specialChar}
                  text="Special character"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact Number */}
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1">Contact Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter your contact number"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm"
                >
                  <option value="" className="bg-white">Select Gender</option>
                  <option value="Male" className="bg-white">Male</option>
                  <option value="Female" className="bg-white">Female</option>
                  <option value="Other" className="bg-white">Other</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">Address</label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter your address"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Birthdate */}
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1">Birthdate</label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Profile Image */}
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1">Profile Image</label>
                <div className="flex items-center">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-28 w-28 object-cover rounded-md" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiCamera className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="text-xs text-gray-500">Upload photo</p>
                      </div>
                    )}
                    <input
                      type="file"
                      name="profileImage"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                Register Now
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:underline font-medium">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;