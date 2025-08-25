import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookOpen, FaUserTie, FaHeart, FaQuoteLeft, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const AboutUs = () => {
  const navigate = useNavigate();

  // Team members data
  const team = [
    { 
      name: "Alex Morgan", 
      role: "Founder & CEO", 
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Book enthusiast with 20+ years in the publishing industry."
    },
    { 
      name: "Jordan Lee", 
      role: "Head Curator", 
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Specializes in rare and collectible editions."
    },
    { 
      name: "Taylor Smith", 
      role: "Customer Experience", 
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Ensures every visitor finds their perfect read."
    },
  ];

  // Testimonials
  const testimonials = [
    { 
      quote: "Pahana has the best collection of rare books in the city! Their staff helped me find a first edition I'd been searching for years.", 
      author: "Sarah K.",
      role: "Loyal Customer"
    },
    { 
      quote: "The staff made me feel like family. Found my new favorite spot! The book clubs are amazing.", 
      author: "David L.",
      role: "Book Club Member"
    },
  ];

  const handleShopNowClick = () => {
    navigate('/shop');
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      
      {/* Hero Section */}
      <div className="relative bg-indigo-900 text-white py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90">
          <img 
            src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80" 
            alt="Bookshop interior" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            A cozy corner for book lovers since 2010
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShopNowClick}
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            Explore Our Collection
          </motion.button>
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 variants={fadeIn} className="text-3xl font-extrabold text-gray-900 mb-4">
            Why Choose Pahana?
          </motion.h2>
          <motion.p variants={fadeIn} className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            We're more than just a bookstore - we're a community of passionate readers
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBookOpen className="text-indigo-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">50,000+ Titles</h3>
              <p className="text-gray-600">From timeless classics to contemporary hidden gems</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUserTie className="text-indigo-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Staff</h3>
              <p className="text-gray-600">Personalized recommendations from our book-loving team</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-indigo-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Hub</h3>
              <p className="text-gray-600">Book clubs, author events, and literary gatherings</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
        >
          <motion.div variants={fadeIn} className="order-2 lg:order-1">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">From a Dream to a Legacy</h2>
            <p className="text-lg text-gray-600 mb-4">
              What began as a humble book cart in 2010 has blossomed into Pahana Bookshop, a cherished literary haven with three locations across the city. 
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our founder, Alex Morgan, started with just 200 carefully selected titles and a vision to create a space where book lovers could gather, discover, and share their passion.
            </p>
            <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-600">
              <p className="text-indigo-800 italic">
                "We believe books have the power to change lives, and we're committed to keeping the magic of physical books alive in our digital age."
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
              alt="Vintage books" 
              className="rounded-xl shadow-xl w-full h-auto object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.h2 variants={fadeIn} className="text-3xl font-extrabold text-gray-900 mb-4">
            Meet Our Team
          </motion.h2>
          <motion.p variants={fadeIn} className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            The passionate book lovers behind Pahana
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-40 h-40 mx-auto rounded-full mb-6 object-cover border-4 border-indigo-100"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="bg-indigo-50 rounded-2xl p-12 mb-24"
        >
          <motion.h2 variants={fadeIn} className="text-3xl font-extrabold text-gray-900 mb-12 text-center">
            What Our Readers Say
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <FaQuoteLeft className="text-indigo-300 text-3xl mb-6" />
                <p className="text-gray-700 text-lg italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-indigo-600">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <FaMapMarkerAlt className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold">Our Locations</h3>
            </div>
            <p className="text-gray-600 pl-16">123 Book Lane, Downtown</p>
            <p className="text-gray-600 pl-16">456 Novel Ave, Uptown</p>
            <p className="text-gray-600 pl-16">789 Story St, Midtown</p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <FaPhone className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold">Contact Us</h3>
            </div>
            <p className="text-gray-600 pl-16">(123) 456-7890</p>
            <p className="text-gray-600 pl-16">Mon-Sat: 9am-8pm</p>
            <p className="text-gray-600 pl-16">Sun: 10am-6pm</p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <FaEnvelope className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold">Stay Connected</h3>
            </div>
            <p className="text-gray-600 pl-16">hello@pahanabooks.com</p>
            <p className="text-gray-600 pl-16">Subscribe to our newsletter</p>
            <p className="text-gray-600 pl-16">Follow us on social media</p>
          </motion.div>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-8 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Literary Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Visit us today or explore our carefully curated collection online.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShopNowClick}
            className="bg-white text-indigo-600 px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg text-lg"
          >
            Browse Our Books
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;