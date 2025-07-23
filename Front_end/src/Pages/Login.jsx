// // LoginPage.jsx
// import React, { useState } from 'react';
// import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
// import { Link } from 'react-router-dom';

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
//       <div className="w-full max-w-md backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl overflow-hidden p-8 text-white">
//         <h2 className="text-2xl font-bold text-center mb-6">Sign In to AIWrite</h2>

//         <form className="space-y-5">
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
//                 placeholder="Enter your password"
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
//           </div>

//           <button
//             type="submit"
//             className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all"
//           >
//             Sign In
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-400">
//           Don't have an account?{' '}
//           <Link to="/register" className="text-purple-400 hover:underline font-medium">
//             Sign up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });

//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8080/api/auth/login', formData);
//       setMessage('Login successful');
//       navigate('/dashboard');  // Redirect to dashboard or another page after successful login
//     } catch (err) {
//       setMessage('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
//       <div className="w-full max-w-md backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl p-8 text-white">
//         <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
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
//           <div className="flex justify-center mt-4">
//             <button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the POST request to your backend API
      const res = await axios.post('http://localhost:8080/api/auth/login', formData);

      // If login is successful, redirect to dashboard or other page
      setMessage('Login successful');
      localStorage.setItem('token', res.data.token); // Store token if needed
      navigate('/dashboard');  // Redirect to the dashboard or another page
    } catch (err) {
      // Handle login failure (invalid credentials)
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl overflow-hidden p-8 text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In to AIWrite</h2>

        {/* Show message if login failed */}
        {message && <div className="text-center mb-4 text-red-500">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">User Name</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="name"
                name="username"
                placeholder='Enter your username'
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-xs text-gray-400 mb-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/10 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-sm"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-400 hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

