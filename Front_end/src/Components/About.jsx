import React from 'react';
import { FaBookOpen, FaUserTie, FaAward, FaHeart, FaQuoteLeft } from 'react-icons/fa';

const AboutUs = () => {
  // Team members data
  const team = [
    { name: "Alex Morgan", role: "Founder & CEO", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Jordan Lee", role: "Head Curator", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Taylor Smith", role: "Customer Experience", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  ];

  // Testimonials
  const testimonials = [
    { quote: "Pahana has the best collection of rare books in the city!", author: "Sarah K." },
    { quote: "The staff made me feel like family. Found my new favorite spot!", author: "David L." },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-black/50">
          <img 
            src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80" 
            alt="Bookshop interior" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            A cozy corner for book lovers since 2010.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900">Why Pahana?</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaBookOpen className="mx-auto text-indigo-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">50,000+ Titles</h3>
              <p>From classics to hidden gems.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaUserTie className="mx-auto text-indigo-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Staff</h3>
              <p>Book recommendations tailored for you.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaHeart className="mx-auto text-indigo-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Hub</h3>
              <p>Book clubs, author events, and more.</p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
              alt="Vintage books" 
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">From a Dream to a Legacy</h2>
            <p className="text-lg text-gray-600 mb-4">
              Pahana started as a small cart in 2010, fueled by a passion for stories. Today, we’re a beloved local institution with three locations across the city.
            </p>
            <p className="text-lg text-gray-600">
              We believe books have the power to change lives, and we’re committed to keeping the magic of physical books alive.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-indigo-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-indigo-100 rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">What Readers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <FaQuoteLeft className="text-indigo-300 text-2xl mb-4" />
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-indigo-600">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-xl mb-6">Visit us today or browse our online collection.</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;