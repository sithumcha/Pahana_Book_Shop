import React from 'react';
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className='relative min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden'
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/1img.jpg')",
        backgroundPosition: 'center 30%'
      }} 
      id='Header'>
      
      {/* Animated floating elements */}
      <motion.div 
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-blue-400 opacity-70"
      />
      <motion.div 
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-white opacity-30"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 1.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 relative z-10'>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block max-w-3xl font-bold pt-20 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200'
        >
          Book Your Ride,<br />Anytime, Anywhere
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className='text-xl md:text-2xl mt-6 text-blue-100 max-w-2xl mx-auto'
        >
          Premium transportation services at your fingertips. Fast, reliable, and luxurious.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className='flex flex-col sm:flex-row justify-center gap-6 mt-16'
        >
          <motion.a 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            href="#Services" 
            className='border-2 border-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all duration-300'
          >
            Our Services
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            href="#Contact" 
            className='bg-blue-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-all duration-300 relative overflow-hidden'
          >
            <span className="relative z-10">Contact Us</span>
            <motion.span 
              className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{ borderRadius: '9999px' }}
            />
          </motion.a>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-24 flex flex-col items-center"
        >
          <p className="text-blue-100 mb-2">Scroll Down</p>
          <div className="w-6 h-10 border-2 border-blue-300 rounded-full relative">
            <motion.div 
              animate={{
                y: [0, 6, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-2 bg-blue-300 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Header;