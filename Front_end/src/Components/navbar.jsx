import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);  // Toggle the state when the hamburger is clicked
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Pahana Book Shop</span>
        </a>

        {/* Search Bar */}
        <div className="relative md:w-64">
          <input
            type="text"
            className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
          />
          <button className="absolute top-2 right-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm0 0l3.5 3.5" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:order-2 space-x-6 md:space-x-4 rtl:space-x-reverse">
          {/* Profile Icon */}
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded="false"
          >
            <span className="sr-only">Profile</span>
            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
          </button>
          <div></div>

          {/* Cart Icon */}
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Cart</span>
            <svg className="w-8 h-8 text-gray-700 dark:text-white" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-1 14H4L3 3z" />
            </svg>
          </button>
          <div></div>

          {/* Login Button */}
          <button
            type="button"
            className="text-sm text-white bg-blue-700 hover:bg-blue-800 rounded-full px-4 py-2"
          >
            Login
          </button>
          <div></div>

          {/* Mobile Hamburger Menu Icon */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            onClick={toggleMenu}  // Toggle the menu on click
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <ul className="flex space-x-8">
            <li>
              <a
                href="#"
                className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden ${isMenuOpen ? 'flex' : 'hidden'} absolute inset-0 bg-gray-800 bg-opacity-50 z-10`}
          id="navbar-user"
        >
          <div className="flex flex-col items-center justify-center bg-white p-4 space-y-4 w-full">
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                >
                  Contact
                </a>
              </li>
            </ul>
            {/* Cut Button to Close Menu */}
            <button
              className="text-white bg-red-500 rounded-full px-4 py-2 flex items-center justify-center"
              onClick={toggleMenu}  // Toggle the menu off
            >
              <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
