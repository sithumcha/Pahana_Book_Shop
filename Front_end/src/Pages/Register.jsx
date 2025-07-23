// // RegisterPage.jsx
// import React, { useState } from 'react';
// import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
// import { Link } from 'react-router-dom';

// export default function RegisterPage() {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
//       <div className="w-full max-w-md backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl overflow-hidden p-8 text-white">
//         <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>

//         <form className="space-y-5">
//           <div className="relative">
//             <label className="block text-xs text-gray-400 mb-1">Full Name</label>
//             <div className="relative">
//               <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
//               />
//             </div>
//           </div>

//           <div className="relative">
//             <label className="block text-xs text-gray-400 mb-1">Email Address</label>
//             <div className="relative">
//               <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
//               />
//             </div>
//           </div>

//           <div className="relative">
//             <label className="block text-xs text-gray-400 mb-1">Password</label>
//             <div className="relative">
//               <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Create a password"
//                 className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
//               </button>
//             </div>
//             <p className="mt-1 text-xs text-gray-500">Minimum 8 characters with at least one number</p>
//           </div>

//           <button
//             type="submit"
//             className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all"
//           >
//             Create Account
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-400">
//           Already have an account?{' '}
//           <Link to="/login" className="text-purple-400 hover:underline font-medium">
//             Sign in
//           </Link>
//         </div>

//         <p className="mt-4 text-center text-xs text-gray-500">
//           By signing up, you agree to our{' '}
//           <a href="#" className="text-purple-400 hover:underline">Terms</a> and{' '}
//           <a href="#" className="text-purple-400 hover:underline">Privacy Policy</a>.
//         </p>
//       </div>
//     </div>
//   );
// }













//   check back end


// import React, { useState } from "react";
// import axios from "axios";

// // Importing a default profile icon
// import { FaUserAlt } from "react-icons/fa"; // You can change this to any icon you prefer

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     email: "",
//     contactNumber: "",
//     address: "",
//     gender: "Male",
//     birthdate: "",
//     profileImage: null,
//   });

//   const [imagePreview, setImagePreview] = useState(null); // State to hold image preview

//   const handleChange = (e) => {
//     if (e.target.name === "profileImage") {
//       const file = e.target.files[0];
//       setFormData({
//         ...formData,
//         [e.target.name]: file,
//       });

//       // Create an image preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       if (file) {
//         reader.readAsDataURL(file);
//       }
//     } else {
//       setFormData({
//         ...formData,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     for (let key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/auth/register",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       alert("User Registered Successfully!");
//     } catch (error) {
//       console.error("There was an error registering the user!", error);
//       alert("Registration failed!");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           className="w-full p-2 mb-4 border rounded"
//           value={formData.username}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full p-2 mb-4 border rounded"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full p-2 mb-4 border rounded"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="contactNumber"
//           placeholder="Contact Number"
//           className="w-full p-2 mb-4 border rounded"
//           value={formData.contactNumber}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           className="w-full p-2 mb-4 border rounded"
//           value={formData.address}
//           onChange={handleChange}
//         />
//         <select
//           name="gender"
//           className="w-full p-2 mb-4 border rounded"
//           value={formData.gender}
//           onChange={handleChange}
//         >
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//         <input
//           type="date"
//           name="birthdate"
//           className="w-full p-2 mb-4 border rounded"
//           value={formData.birthdate}
//           onChange={handleChange}
//         />
//         <input
//           type="file"
//           name="profileImage"
//           className="w-full p-2 mb-4 border rounded"
//           onChange={handleChange}
//         />
//         {/* Display default profile icon or image preview */}
//         <div className="mb-4 flex justify-center">
//           {imagePreview ? (
//             <img
//               src={imagePreview}
//               alt="Profile Preview"
//               className="w-24 h-24 object-cover rounded-full"
//             />
//           ) : (
//             <FaUserAlt className="w-24 h-24 text-gray-400" />
//           )}
//         </div>
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;













// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ProfileEditPage = ({ username }) => {
//   // Initialize form data state
//   const [formData, setFormData] = useState({
//     email: "",
//     contactNumber: "",
//     address: "",
//     gender: "Male",
//     birthdate: "",
//     profileImage: null,
//   });

//   const [imagePreview, setImagePreview] = useState(null); // To hold profile image preview

//   // Fetch current user data when component mounts
//   useEffect(() => {
//     axios.get(`http://localhost:8080/api/users/${username}`)
//       .then((response) => {
//         setFormData(response.data); // Pre-fill form with current user data
//         setImagePreview(response.data.profileImage || null); // Set profile image preview
//       })
//       .catch((error) => {
//         console.error("Error fetching user details:", error);
//       });
//   }, [username]);

//   // Handle form input changes
//   const handleChange = (e) => {
//     if (e.target.name === "profileImage") {
//       const file = e.target.files[0];
//       setFormData({
//         ...formData,
//         [e.target.name]: file,
//       });

//       // Create image preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       if (file) {
//         reader.readAsDataURL(file);
//       }
//     } else {
//       setFormData({
//         ...formData,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };

//   // Handle form submission to update user data
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     for (let key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     try {
//       // Send PUT request to update user data
//       await axios.put(`http://localhost:8080/api/users/${username}`, formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("There was an error updating your profile.");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Email Input */}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full p-2 mb-4 border rounded"
//           value={formData.email}
//           onChange={handleChange}
//         />
        
//         {/* Contact Number Input */}
//         <input
//           type="text"
//           name="contactNumber"
//           placeholder="Contact Number"
//           className="w-full p-2 mb-4 border rounded"
//           value={formData.contactNumber}
//           onChange={handleChange}
//         />
        
//         {/* Address Input */}
//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           className="w-full p-2 mb-4 border rounded"
//           value={formData.address}
//           onChange={handleChange}
//         />
        
//         {/* Gender Selection */}
//         <select
//           name="gender"
//           className="w-full p-2 mb-4 border rounded"
//           value={formData.gender}
//           onChange={handleChange}
//         >
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
        
//         {/* Birthdate Input */}
//         <input
//           type="date"
//           name="birthdate"
//           className="w-full p-2 mb-4 border rounded"
//           value={formData.birthdate}
//           onChange={handleChange}
//         />
        
//         {/* Profile Image Input */}
//         <input
//           type="file"
//           name="profileImage"
//           className="w-full p-2 mb-4 border rounded"
//           onChange={handleChange}
//         />

//         {/* Display Profile Image Preview */}
//         <div className="mb-4 flex justify-center">
//           {imagePreview ? (
//             <img
//               src={imagePreview}
//               alt="Profile Preview"
//               className="w-24 h-24 object-cover rounded-full"
//             />
//           ) : (
//             <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center">
//               <span className="text-white">No Image</span>
//             </div>
//           )}
//         </div>
        
//         {/* Submit Button */}
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfileEditPage;















// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UserListView = () => {
//   const [users, setUsers] = useState([]); // Stores users data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Fetch users from backend when component mounts
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/auth/users");
//         setUsers(response.data); // Store fetched users in state
//         setLoading(false); // Set loading to false once data is fetched
//       } catch (error) {
//         setError("Failed to fetch users");
//         setLoading(false); // Set loading to false when error occurs
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">User List</h2>

//       {/* Loading Spinner */}
//       {loading && <p>Loading...</p>}

//       {/* Error Message */}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* If No Users Found */}
//       {!loading && !error && users.length === 0 && <p>No users found.</p>}

//       {/* Display Users in List */}
//       {!loading && !error && users.length > 0 && (
//         <div className="space-y-4">
//           {users.map((user) => (
//             <div
//               key={user.id}
//               className="flex items-center justify-between p-4 border-b"
//             >
//               <div className="flex flex-col">
//                 <span className="font-bold text-xl">{user.username}</span>
//                 <span className="text-sm text-gray-500">{user.email}</span>
//               </div>
//               <div className="text-right">
//                 <button
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
//                   onClick={() => alert(`Editing user: ${user.username}`)}
//                 >
//                   Edit
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserListView;










// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     email: '',
//     contactNumber: '',
//     address: '',
//     gender: '',
//     birthdate: '',
//     profileImage: null,
//   });
  
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData(prev => ({ ...prev, profileImage: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }
    
//     try {
//       const res = await axios.post('http://localhost:8080/api/auth/register', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage('Registration successful');
//       navigate('/login');  // Redirect to login page after successful registration
//     } catch (err) {
//       setMessage('Registration failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
//       <div className="w-full max-w-md backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl p-8 text-white">
//         <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
//         {message && <div className="text-center mb-4">{message}</div>}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-xs text-gray-400 mb-1">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full p-2 bg-transparent border border-gray-300 rounded-md text-white"
//             />
//           </div>
//           <div>
//             <label className="block text-xs text-gray-400 mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full p-2 bg-transparent border border-gray-300 rounded-md text-white"
//             />
//           </div>
//           <div>
//             <label className="block text-xs text-gray-400 mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full p-2 bg-transparent border border-gray-300 rounded-md text-white"
//             />
//           </div>
//           <div>
//             <label className="block text-xs text-gray-400 mb-1">Contact Number</label>
//             <input
//               type="text"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               required
//               className="w-full p-2 bg-transparent border border-gray-300 rounded-md text-white"
//             />
//           </div>
//           <div>
//             <label className="block text-xs text-gray-400 mb-1">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//               className="w-full p-2 bg-transparent border border-gray-300 rounded-md text-white"
//             />
//           </div>
//           <div>
//             <label className="block text-xs text-gray-400 mb-1">Gender</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               required
//               className="w-full p-2 bg-transparent border border-gray-300 rounded-md text-white"
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-xs text-gray-400 mb-1">Birthdate</label>
//             <input
//               type="date"
//               name="birthdate"
//               value={formData.birthdate}
//               onChange={handleChange}
//               required
//               className="w-full p-2 bg-transparent border border-gray-300 rounded-md text-white"
//             />
//           </div>
//           <div>
//             <label className="block text-xs text-gray-400 mb-1">Profile Image</label>
//             <input
//               type="file"
//               name="profileImage"
//               onChange={handleFileChange}
//               className="w-full p-2 bg-transparent border border-gray-300 rounded-md text-white"
//             />
//           </div>
//           <div className="flex justify-center mt-4">
//             <button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
//             >
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';

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

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      navigate('/login');  // Redirect to login page after successful registration
    } catch (err) {
      setMessage('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl overflow-hidden p-8 text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
        
        {message && <div className="text-center mb-4 text-red-500">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Username</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter your username"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Contact Number */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Contact Number</label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                placeholder="Enter your contact number"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Address */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Address</label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter your address"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full pl-4 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Birthdate */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Birthdate</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Profile Image</label>
            <input
              type="file"
              name="profileImage"
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
              Register
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-purple-400 hover:underline font-medium">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
