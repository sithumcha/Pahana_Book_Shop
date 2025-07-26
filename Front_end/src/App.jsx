
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
import AddBook from './Admin/AddBook'; 
import ManageBook from './Admin/ManageBook'; // Assuming you have an AddBook component
import UserManagement from './Admin/UserManagement'; // Assuming you have an EditBook component
import Shop from './Pages/Shop'; // Assuming you have a Books component
import BookDetails from './Pages/BookDetails'; // Assuming you have a BookDetails component
import Cart from './Pages/Cart'; // Assuming you have a Cart component
import Checkout from './Pages/Checkout';
import Addcard from './Pages/Addcard'; // Assuming you have an Addcard component
import  Profile from './Pages/Profile'; // Assuming you have a Profile component



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
        <Route path="/admin/addbook" element={<AddBook />} /> {/* Admin Add Book Route */}
        <Route path="/admin/managebook" element={<ManageBook />} /> {/* Admin Manage Book Route */}
        <Route path="/admin/usermanagement" element={<UserManagement />} /> {/* Admin User Management Route */}
        <Route path="/shop" element={<Shop />} /> {/* Shop Route */}
        <Route path="/bookdetails/:id" element={<BookDetails />} /> {/* Book Details Route */}
        <Route path="/cart" element={<Cart />} /> {/* Cart Route */}
        <Route path="/checkout" element={<Checkout />} /> {/* Checkout Route */}
        <Route path="/addcard" element={<Addcard />} /> {/* Add Card Route */}
        <Route path="/profile" element={<Profile />} /> {/* Profile Route */}
        
        
      </Routes>
    </Router>
  );
}

export default App;



