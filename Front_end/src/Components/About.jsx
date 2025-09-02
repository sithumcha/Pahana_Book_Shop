import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookOpen, FaUserTie, FaHeart, FaQuoteLeft, FaMapMarkerAlt, FaPhone, FaEnvelope, FaStar, FaUsers, FaAward, FaSmile } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const AboutUs = () => {
  const navigate = useNavigate();

  // Team members data
  const team = [
    { 
      name: "Sithum Chanuka", 
      role: "Founder & CEO", 
      img: "https://scontent.fcmb11-1.fna.fbcdn.net/v/t39.30808-6/491737566_122131581272611004_753316474921600254_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=94e2a3&_nc_eui2=AeFrwJdeU-6BAUUsWmJl_97JVCXgS1R6zNhUJeBLVHrM2LyVdzmKxByQiuaPMvEIYPs0mA_uYDXv9ssdA4Wtm415&_nc_ohc=rr6SlEl04ngQ7kNvwHlcd-2&_nc_oc=Adm4tIsjouf4eG6U9ne4u6Fny-q93o7xGn9LXV1e6t3VomD2_4gMAngOW-Qu9b9EmaVquLhoxspN66g1BYKlHRnS&_nc_zt=23&_nc_ht=scontent.fcmb11-1.fna&_nc_gid=IqW8Qd-vvlR8ZUafRegyWQ&oh=00_AfXntRK93CwvnjMsJep98845zyy2B1F5mj58o_eaz0CM_g&oe=68B39A93",
      bio: "Book enthusiast with 20+ years in the publishing industry.",
      social: { twitter: "#", linkedin: "#", instagram: "#" }
    },
    { 
      name: "Jordan Lee", 
      role: "Head Curator", 
      img: "https://scontent.fcmb3-2.fna.fbcdn.net/v/t39.30808-6/481178332_647413747940804_5744248207818615351_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF57sLtyXqDxsqr2B4CUqttsNVNFeHWMTqw1U0V4dYxOjJaQHc2BUN3q7lwIdugQNeJ9Ws-yhph1kzqk3P8KDcj&_nc_ohc=a88FSnMzEdAQ7kNvwH5ftVd&_nc_oc=AdmCx8WgDnGuq9REBQA08VXgaWhBPqJTDuMGb9P1BB54sEvo1IIeHMI1fv_acJ3sHxy_9-rFH3XVh_ftlXuypoK3&_nc_zt=23&_nc_ht=scontent.fcmb3-2.fna&_nc_gid=6UJC-TtV8PzP_RLK8f2h5A&oh=00_AfVbiM5cSRk8PD1cxXyQQYY03HZKZUMoA9T0MayrhxbGag&oe=68B3B781",
      bio: "Specializes in rare and collectible editions.",
      social: { twitter: "#", linkedin: "#", instagram: "#" }
    },
    { 
      name: "Taylor Smith", 
      role: "Customer Experience", 
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Ensures every visitor finds their perfect read.",
      social: { twitter: "#", linkedin: "#", instagram: "#" }
    },
  ];

  // Testimonials
  const testimonials = [
    { 
      quote: "Pahana has the best collection of rare books in the city! Their staff helped me find a first edition I'd been searching for years.", 
      author: "Sarah K.",
      role: "Loyal Customer",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    { 
      quote: "The staff made me feel like family. Found my new favorite spot! The book clubs are amazing.", 
      author: "David L.",
      role: "Book Club Member",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    { 
      quote: "Exceptional service and an incredible selection. I always find something special here.", 
      author: "Maria G.",
      role: "Regular Visitor",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
  ];

  // Stats
  const stats = [
    { number: "50,000+", label: "Books in Collection", icon: <FaBookOpen /> },
    { number: "15,000+", label: "Happy Customers", icon: <FaUsers /> },
    { number: "12", label: "Years of Excellence", icon: <FaAward /> },
    { number: "98%", label: "Customer Satisfaction", icon: <FaSmile /> }
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

  const renderStars = (count) => {
    return Array(count).fill(0).map((_, i) => (
      <FaStar key={i} className="text-yellow-400 inline text-sm" />
    ));
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-indigo-50 min-h-screen">
    
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/40">
          <img 
            src="ss.jpg" 
            alt="Bookshop interior" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-blue-100">
            A cozy corner for book lovers since 2010
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShopNowClick}
            className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
          >
            Explore Our Collection
          </motion.button>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={fadeIn}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
            >
              <div className="text-3xl text-indigo-600 mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
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
          <motion.h2 variants={fadeIn} className="text-4xl font-extrabold text-gray-900 mb-4">
            Why Choose Pahana?
          </motion.h2>
          <motion.p variants={fadeIn} className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            We're more than just a bookstore - we're a community of passionate readers
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaBookOpen className="text-indigo-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">50,000+ Titles</h3>
              <p className="text-gray-600">From timeless classics to contemporary hidden gems</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUserTie className="text-indigo-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Expert Staff</h3>
              <p className="text-gray-600">Personalized recommendations from our book-loving team</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaHeart className="text-indigo-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community Hub</h3>
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
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">From a Dream to a Legacy</h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              What began as a humble book cart in 2010 has blossomed into Pahana Bookshop, a cherished literary haven with three locations across the city. 
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our founder, Alex Morgan, started with just 200 carefully selected titles and a vision to create a space where book lovers could gather, discover, and share their passion.
            </p>
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border-l-4 border-indigo-600">
              <p className="text-indigo-800 italic text-lg">
                "We believe books have the power to change lives, and we're committed to keeping the magic of physical books alive in our digital age."
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
              alt="Vintage books" 
              className="rounded-2xl shadow-xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
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
          <motion.h2 variants={fadeIn} className="text-4xl font-extrabold text-gray-900 mb-4">
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
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
              >
                <div className="relative">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-40 h-40 mx-auto rounded-2xl mb-6 object-cover border-4 border-white shadow-lg group-hover:border-indigo-100 transition-colors duration-300"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {member.role}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{member.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <span className="sr-only">Twitter</span>
                    🐦
                  </button>
                  <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    💼
                  </button>
                  <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <span className="sr-only">Instagram</span>
                    📸
                  </button>
                </div>
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
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-12 mb-24 border border-indigo-100"
        >
          <motion.h2 variants={fadeIn} className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
            What Our Readers Say
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <FaQuoteLeft className="text-indigo-300 text-2xl mb-4" />
                <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4 border-2 border-indigo-100"
                  />
                  <div>
                    <p className="font-semibold text-indigo-600">{testimonial.author}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        {/* <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-4 rounded-xl mr-4">
                <FaMapMarkerAlt className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Our Locations</h3>
            </div>
            <p className="text-gray-600 mb-2">📚 123 Book Lane, Downtown</p>
            <p className="text-gray-600 mb-2">📖 456 Novel Ave, Uptown</p>
            <p className="text-gray-600">📗 789 Story St, Midtown</p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-4 rounded-xl mr-4">
                <FaPhone className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
            </div>
            <p className="text-gray-600 mb-2">📞 (123) 456-7890</p>
            <p className="text-gray-600 mb-2">🕘 Mon-Sat: 9am-8pm</p>
            <p className="text-gray-600">🕙 Sun: 10am-6pm</p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-4 rounded-xl mr-4">
                <FaEnvelope className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Stay Connected</h3>
            </div>
            <p className="text-gray-600 mb-2">✉️ hello@pahanabooks.com</p>
            <p className="text-gray-600 mb-2">📰 Subscribe to newsletter</p>
            <p className="text-gray-600">📱 Follow on social media</p>
          </motion.div>
        </motion.div> */}

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 px-8 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Literary Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">Visit us today or explore our carefully curated collection online.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShopNowClick}
              className="bg-white text-indigo-600 px-12 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg text-lg relative z-20"
            >
              Browse Our Books
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;