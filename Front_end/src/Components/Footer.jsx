import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBookOpen } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaBookOpen className="text-amber-500 text-3xl" />
              <span className="text-2xl font-bold">Pahana Books</span>
            </div>
            <p className="text-gray-400">
              Curating stories that inspire since 2010. Your literary sanctuary for rare finds and bestsellers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-amber-500 pb-2 inline-block">Explore</h3>
            <ul className="space-y-2">
              {['New Arrivals', 'Bestsellers', 'Staff Picks', 'Signed Editions', 'Gift Cards'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-amber-500 pb-2 inline-block">Support</h3>
            <ul className="space-y-2">
              {['Contact Us', 'Shipping Policy', 'Returns', 'FAQ', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-amber-500 pb-2 inline-block">Visit Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-amber-500 mt-1" />
                <p className="text-gray-400">123 Book Lane, Literary District, CA 90210</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-amber-500" />
                <p className="text-gray-400">(555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-amber-500" />
                <p className="text-gray-400">hello@pahanabooks.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-2">Join Our Literary Circle</h3>
            <p className="text-gray-400 mb-4">Get 15% off your first order and weekly book recommendations.</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded font-medium transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Pahana Books. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-amber-500 text-sm transition">Terms</a>
            <a href="#" className="text-gray-500 hover:text-amber-500 text-sm transition">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-amber-500 text-sm transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;