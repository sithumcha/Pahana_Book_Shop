
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register'; 
import Home from './Pages/Home'; 
import AboutUs from './Components/About';
import ContactUs from './Components/Contactus';
import S from './Pages/S';
import AdminRegister from './Admin/AdminRegister';
import AdminLogin from './Admin/AdminLogin'; // Assuming you have an AdminLogin component


 function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/s" element={<S />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} /> {/* Admin Login Route */}

        
      </Routes>
    </Router>
  );
}

export default App;



