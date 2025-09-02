import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { FiDownload, FiBookOpen, FiCheck, FiArrowRight, FiStar, FiAward, FiUsers, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

const DownloadPDF = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample content for the guide
  const guideDetails = {
    overview: {
      title: "Complete Bookshop Guide",
      description: "Our comprehensive 48-page guide is your ultimate resource for navigating the literary world. Whether you're a casual reader or a book enthusiast, this guide will enhance your reading experience.",
      features: [
        "Curated book recommendations across all genres",
        "Exclusive author interviews and insights",
        "Reading challenges and tracking system",
        "Book club discussion guides",
        "Seasonal reading lists"
      ],
      stats: [
        { icon: <FiBookOpen />, value: "48", label: "Pages" },
        { icon: <FiStar />, value: "150+", label: "Book Recommendations" },
        { icon: <FiUsers />, value: "12", label: "Author Interviews" },
        { icon: <FiAward />, value: "2024", label: "Updated Edition" }
      ]
    },
    contents: {
      title: "What's Inside",
      sections: [
        {
          title: "Getting Started",
          items: ["How to use this guide", "Setting reading goals", "Creating your reading space"]
        },
        {
          title: "Genre Exploration",
          items: ["Fiction deep dive", "Non-fiction treasures", "Genre-blending recommendations"]
        },
        {
          title: "Author Spotlights",
          items: ["Exclusive interviews", "Author reading lists", "Behind the scenes"]
        },
        {
          title: "Reading Community",
          items: ["Starting a book club", "Discussion guides", "Reading challenges"]
        },
        {
          title: "Seasonal Reading",
          items: ["Spring refresh list", "Summer beach reads", "Fall cozy selections", "Winter classics"]
        }
      ]
    },
    benefits: {
      title: "Why You'll Love It",
      points: [
        {
          title: "Discover New Favorites",
          description: "Find books you'll love with our carefully curated recommendations across all genres."
        },
        {
          title: "Enhance Your Reading Experience",
          description: "Learn techniques to get more from every book you read with our reading tips and guides."
        },
        {
          title: "Join a Community",
          description: "Connect with other readers through our book club guides and discussion prompts."
        },
        {
          title: "Stay Current",
          description: "Get the latest on new releases, award winners, and emerging authors in the literary world."
        }
      ]
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-purple-50">
      <Navbar />
      
      <main className="flex-grow px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 mb-12"
          >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full -m-16 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500 rounded-full -m-12 opacity-20"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <div className="flex items-center mb-4">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FiBookOpen className="text-2xl text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold">Bookshop Guide 2024</h1>
                  </div>
                  <p className="text-blue-100 text-lg max-w-2xl">Your comprehensive literary companion for discovering, enjoying, and discussing books</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-white/30 text-sm px-3 py-1 rounded-full mb-2">NEW EDITION</span>
                  <p className="text-sm text-blue-200">Updated June 2024</p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - Download Section */}
                <div className="lg:w-2/5">
                  <div className="sticky top-8">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 mb-6">
                      <div className="flex items-start mb-6">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                          <FiDownload className="text-blue-600 text-xl" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">Download Complete Guide</h2>
                          <p className="text-gray-600 mt-1">
                            Get instant access to our beautifully designed 48-page guide in PDF format.
                          </p>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 mb-6 border border-blue-200">
                        <div className="flex flex-col">
                          <div className="mb-4">
                            <p className="font-medium text-gray-700">Bookshop_Guide_2024.pdf</p>
                            <p className="text-sm text-gray-500">2.4 MB • PDF Document</p>
                          </div>
                          <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            href="/user-guide.pdf"
                            download="Bookshop_Guide_2024.pdf"
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center text-center"
                          >
                            <FiDownload className="mr-2" />
                            Download Now
                          </motion.a>
                        </div>
                      </div>

                      <div className="text-center text-sm text-gray-500">
                        <p>By downloading, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a></p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {guideDetails.overview.stats.map((stat, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-blue-600 text-xl mb-2 flex justify-center">{stat.icon}</div>
                          <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Guide Details */}
                <div className="lg:w-3/5">
                  {/* Tabs */}
                  <div className="flex border-b border-gray-200 mb-6">
                    {['overview', 'contents', 'benefits'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 font-medium text-sm capitalize ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'overview' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">{guideDetails.overview.title}</h2>
                      <p className="text-gray-600 mb-6">{guideDetails.overview.description}</p>
                      
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
                      <ul className="space-y-2 mb-8">
                        {guideDetails.overview.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {activeTab === 'contents' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">{guideDetails.contents.title}</h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {guideDetails.contents.sections.map((section, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">
                                {index + 1}
                              </span>
                              {section.title}
                            </h3>
                            <ul className="space-y-2">
                              {section.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="text-sm text-gray-600 flex items-start">
                                  <FiArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" size={14} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'benefits' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">{guideDetails.benefits.title}</h2>
                      
                      <div className="space-y-6">
                        {guideDetails.benefits.points.map((point, index) => (
                          <div key={index} className="flex items-start">
                            <div className="bg-blue-100 p-2 rounded-lg mr-4 flex-shrink-0">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                {index + 1}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-1">{point.title}</h3>
                              <p className="text-gray-600">{point.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Testimonials */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">What Readers Say</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-purple-50 p-5 rounded-xl">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-purple-600 font-bold mr-3">
                            S
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Sarah J.</p>
                            <p className="text-sm text-gray-500">Book Club Leader</p>
                          </div>
                        </div>
                        <p className="text-gray-700">"This guide transformed our book club meetings. The discussion questions are thoughtful and the recommendations are always spot on!"</p>
                      </div>
                      
                      <div className="bg-blue-50 p-5 rounded-xl">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
                            M
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Michael T.</p>
                            <p className="text-sm text-gray-500">Avid Reader</p>
                          </div>
                        </div>
                        <p className="text-gray-700">"I've discovered so many amazing books through this guide. It's like having a personal librarian who knows exactly what I'll enjoy."</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DownloadPDF;