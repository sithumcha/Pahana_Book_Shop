// // DownloadPDF.jsx
// import React from 'react';
// import Navbar from './Navbar';
// import Footer from './Footer';

// const DownloadPDF = () => {
//   return (

//     <div className="flex justify-center items-center my-8">

// <Navbar/>

//       <a
//         href="/user-guide.pdf" // Make sure your PDF file is placed in the public folder
//         download
//         className="bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 transition duration-300"
//       >
//         Download User Guide
//       </a>

//       <Footer/>
//     </div>
//   );
// };

// export default DownloadPDF;



// DownloadPDF.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { FiDownload, FiBookOpen } from 'react-icons/fi';
import { motion } from 'framer-motion';

const DownloadPDF = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-purple-50">
      <Navbar />
      
      <main className="flex-grow flex flex-col justify-center items-center px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100"
        >
          {/* Gradient header blending blue to purple */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <FiBookOpen className="text-3xl mb-2 text-purple-200" />
                <h1 className="text-3xl font-bold">Bookshop Guide</h1>
                <p className="opacity-90 mt-1 text-blue-100">Your literary companion</p>
              </div>
              <div className="text-right">
                <span className="inline-block bg-purple-500 text-xs px-2 py-1 rounded-full">NEW</span>
                <p className="text-sm mt-2 text-blue-200">Version 2.3</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start mb-8">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FiDownload className="text-blue-600 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Download Complete Guide</h2>
                <p className="text-gray-600 mt-1">
                  Get our 48-page illustrated guide featuring book recommendations, 
                  reading tips, and exclusive author interviews.
                </p>
              </div>
            </div>

            {/* Gradient file info box */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6 border border-blue-200">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="font-medium text-gray-700">Bookshop_Guide_2024.pdf</p>
                  <p className="text-sm text-gray-500">2.4 MB • PDF Document</p>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/user-guide.pdf"
                  download="Bookshop_Guide_2024.pdf"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
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
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default DownloadPDF;