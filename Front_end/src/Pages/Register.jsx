



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';

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
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // No validation logic, just submit the form data as is
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
//       navigate('/login'); // Redirect to login page after successful registration
//     } catch (err) {
//       setMessage('Registration failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
//       <div className="w-full max-w-md backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl overflow-hidden p-8 text-white">
//         <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>

//         {message && <div className="text-center mb-4 text-red-500">{message}</div>}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Username */}
//           <div className="relative">
//             <label className="block text-xs text-gray-400 mb-1">Username</label>
//             <div className="relative">
//               <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your username"
//                 className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div className="relative">
//             <label className="block text-xs text-gray-400 mb-1">Email Address</label>
//             <div className="relative">
//               <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="you@example.com"
//                 className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label className="block text-xs text-gray-400 mb-1">Password</label>
//             <div className="relative">
//               <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your password"
//                 className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
//               />
//             </div>
//           </div>

//           {/* Contact Number */}
//           <div className="relative">
//             <label className="block text-xs text-gray-400 mb-1">Contact Number</label>
//             <div className="relative">
//               <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//               <input
//                 type="text"
//                 name="contactNumber"
//                 value={formData.contactNumber}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your contact number"
//                 className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
//               />
//             </div>
//           </div>

//           {/* Address */}
//           <div className="relative">
//             <label className="block text-xs text-gray-400 mb-1">Address</label>
//             <div className="relative">
//               <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your address"
//                 className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
//               />
//             </div>
//           </div>

//           {/* Gender */}
//           <div className="relative">
//             <label className="block text-xs text-gray-400 mb-1">Gender</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               required
//               className="w-full pl-4 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           {/* Birthdate */}
//           <div className="relative">
//             <label className="block text-xs text-gray-400 mb-1">Birthdate</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//               <input
//                 type="date"
//                 name="birthdate"
//                 value={formData.birthdate}
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
//               />
//             </div>
//           </div>

//           {/* Profile Image */}
//           <div className="relative">
//             <label className="block text-xs text-gray-400 mb-1">Profile Image</label>
//             <input
//               type="file"
//               name="profileImage"
//               onChange={handleFileChange}
//               className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-sm"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center mt-4">
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all"
//             >
//               Register
//             </button>
//           </div>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-400">
//           Already have an account?{' '}
//           <a href="/login" className="text-purple-400 hover:underline font-medium">
//             Log in
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiCalendar, FiCheck, FiX } from 'react-icons/fi';

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
    setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
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
      navigate('/login');
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
        <FiX className="text-red-500 mr-1" />
      )}
      <span className={valid ? 'text-green-500' : 'text-gray-400'}>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl overflow-hidden p-8 text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>

        {message && (
          <div className={`text-center mb-4 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}
        {passwordError && <div className="text-center mb-4 text-red-500">{passwordError}</div>}
        
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
                onChange={handlePasswordChange}
                required
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              />
            </div>
            <div className="mt-2">
              <ValidationRequirement
                valid={passwordValidation.length}
                text="At least 8 characters"
              />
              <ValidationRequirement
                valid={passwordValidation.uppercase}
                text="At least one uppercase letter"
              />
              <ValidationRequirement
                valid={passwordValidation.lowercase}
                text="At least one lowercase letter"
              />
              <ValidationRequirement
                valid={passwordValidation.number}
                text="At least one number"
              />
              <ValidationRequirement
                valid={passwordValidation.specialChar}
                text="At least one special character"
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