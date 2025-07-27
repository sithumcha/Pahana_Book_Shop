import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit, FiLogOut, FiSave } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contactNumber: '',
    address: '',
    gender: 'Male',
    birthdate: '',
    profileImage: null,
    password: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

//   // Fetch user data on component mount
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const username = localStorage.getItem('username');

//         if (!token || !username) {
//           navigate('/profile'); // Redirect if no token or username
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:8080/api/auth/users/${username}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         console.log('Fetched User Data:', response.data);

//         if (response.data) {
//           setUser(response.data);
//           setFormData({
//             username: response.data.username,
//             email: response.data.email,
//             contactNumber: response.data.contactNumber || '',
//             address: response.data.address || '',
//             gender: response.data.gender || 'Male',
//             birthdate: response.data.birthdate || '',
//             profileImage: null,
//             password: '',
//           });
//           if (response.data.profileImagePath) {
//             setImagePreview(`http://localhost:8080/${response.data.profileImagePath}`);
//           }
//         } else {
//           setError('No user data found');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setError('Failed to load profile data');
//       }
//     };

//     fetchUserData();
//   }, [navigate]);


useEffect(() => {
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username'); // Save username during login

      if (!token || !username) {
        navigate('/profile ');
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/api/auth/users/${username}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          contactNumber: response.data.contactNumber || '',
          address: response.data.address || '',
          gender: response.data.gender || 'Male',
          birthdate: response.data.birthdate || '',
          profileImage: null,
          password: '',
        });
        if (response.data.profileImagePath) {
          setImagePreview(`http://localhost:8080/${response.data.profileImagePath}`);
        }
      } else {
        setError('No user data found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load profile data');
    }
  };

  fetchUserData();
}, [navigate]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profileImage: file,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('contactNumber', formData.contactNumber);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('birthdate', formData.birthdate);
      if (formData.password) {
        formDataToSend.append('password', formData.password);
      }
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }

      const response = await axios.put(
        `http://localhost:8080/api/auth/users/${user.username}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setError('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
      setMessage('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">{error ? error : 'Loading profile...'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{isEditing ? 'Edit Profile' : 'My Profile'}</h1>
              <div className="flex space-x-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <FiEdit className="mr-2" />
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Profile Preview"
                            className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-md"
                          />
                        ) : (
                          <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
                            <FiUser className="text-gray-400 text-4xl" />
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        name="profileImage"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                      />
                    </div>
                  </div>

                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                        <input
                          type="text"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Birthdate</label>
                        <input
                          type="date"
                          name="birthdate"
                          value={formData.birthdate}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                      >
                        <FiSave className="mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="relative mb-4">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
                        <FiUser className="text-gray-400 text-4xl" />
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-center">{user.username}</h2>
                </div>

                <div className="md:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Email</h3>
                      <p className="text-gray-900 flex items-center">
                        <FiMail className="mr-2 text-purple-500" />
                        {user.email}
                      </p>
                    </div>

                    {user.contactNumber && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Number</h3>
                        <p className="text-gray-900 flex items-center">
                          <FiPhone className="mr-2 text-purple-500" />
                          {user.contactNumber}
                        </p>
                      </div>
                    )}

                    {user.address && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Address</h3>
                        <p className="text-gray-900 flex items-center">
                          <FiMapPin className="mr-2 text-purple-500" />
                          {user.address}
                        </p>
                      </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Gender</h3>
                      <p className="text-gray-900">{user.gender || 'Not specified'}</p>
                    </div>

                    {user.birthdate && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Birthdate</h3>
                        <p className="text-gray-900 flex items-center">
                          <FiCalendar className="mr-2 text-purple-500" />
                          {new Date(user.birthdate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
