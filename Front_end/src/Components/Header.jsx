import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

const Header = () => {
  const ref = useRef(null);
  const [hasViewed, setHasViewed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView && !hasViewed) {
      setHasViewed(true);
    }
  }, [isInView, hasViewed]);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80";
    img.onload = () => setImageLoaded(true);
  }, []);

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityBg = useTransform(scrollY, [0, 300], [1, 0]);

  // Floating elements data
  const floatingElements = [
    { top: '15%', left: '5%', size: 'w-4 h-4', color: 'bg-blue-400', opacity: 'opacity-70', duration: 15, delay: 0 },
    { top: '25%', right: '10%', size: 'w-6 h-6', color: 'bg-white', opacity: 'opacity-30', duration: 12, delay: 0.5 },
    { top: '65%', left: '8%', size: 'w-8 h-8', color: 'bg-purple-400', opacity: 'opacity-50', duration: 18, delay: 1 },
    { top: '40%', right: '7%', size: 'w-3 h-3', color: 'bg-yellow-300', opacity: 'opacity-60', duration: 10, delay: 0.8 },
    { top: '75%', right: '20%', size: 'w-5 h-5', color: 'bg-green-300', opacity: 'opacity-40', duration: 20, delay: 1.2 },
    { top: '20%', left: '20%', size: 'w-7 h-7', color: 'bg-pink-400', opacity: 'opacity-40', duration: 14, delay: 1.5 },
    { top: '55%', right: '30%', size: 'w-4 h-4', color: 'bg-teal-300', opacity: 'opacity-60', duration: 16, delay: 2 },
  ];

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.03
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const title = "Explore Your Favorite Books, Anytime, Anywhere";
  const subtitle = "Discover a world of literature at your fingertips. Fast, reliable, and seamless.";

  return (
    <div 
      ref={ref}
      className='relative min-h-screen mb-4 flex items-center justify-center w-full overflow-hidden'
      id='Header'
    >
      {/* Background with gradient overlay */}
      <AnimatePresence>
        {imageLoaded && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0 bg-cover bg-center "
            style={{ 
              backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('Home1.jpg')",
            }} 
          />
        )}
      </AnimatePresence>
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 z-1"
        animate={{
          background: [
            "radial-gradient(ellipse at 30% 40%, rgba(59, 130, 246, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
            "radial-gradient(ellipse at 70% 40%, rgba(139, 92, 246, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
            "radial-gradient(ellipse at 50% 60%, rgba(14, 165, 233, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
            "radial-gradient(ellipse at 30% 40%, rgba(59, 130, 246, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Particle background */}
      <div className="absolute inset-0 z-2 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
            }}
            animate={{
              opacity: [0, 0.7, 0],
              y: [0, -100],
              x: [0, Math.random() * 50 - 25],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Animated floating elements */}
      {floatingElements.map((element, index) => (
        <motion.div 
          key={index}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay
          }}
          className={`absolute ${element.top} ${element.left || ''} ${element.right || ''} ${element.size} rounded-full ${element.color} ${element.opacity} filter blur-[2px] z-3`}
        />
      ))}
      
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={hasViewed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className='container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 relative z-10'
      >
        {/* Decorative top elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={hasViewed ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"></div>
        </motion.div>

        {/* Main title with character animation */}
        <motion.h2
          variants={containerVariants}
          initial="hidden"
          animate={hasViewed ? "visible" : "hidden"}
          className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl inline-block max-w-4xl font-bold pt-10 mb-6 leading-tight'
        >
          {title.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-3 mb-2">
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  variants={childVariants}
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 font-bold drop-shadow-md"
                  whileHover={{ 
                    scale: 1.2, 
                    color: "#93c5fd",
                    transition: { duration: 0.2 } 
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h2>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={hasViewed ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className='text-xl md:text-2xl mt-8 text-blue-100 max-w-2xl mx-auto leading-relaxed font-light'
        >
          {subtitle}
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={hasViewed ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.7 }}
          className='flex flex-col sm:flex-row justify-center gap-6 mt-16'
        >
          <motion.a 
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(255,255,255,0.15)",
              boxShadow: "0 10px 30px -5px rgba(255, 255, 255, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            href="./downloadpdf" 
            className='bg-gradient-to-r from-blue-300 to-indigo-600 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 relative overflow-hidden group'
            // className='border-2 border-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 relative overflow-hidden group'
          >
            <span className="relative z-10 flex items-center justify-center">
              Our Guide Line
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                &rarr;
              </motion.span>
            </span>
            <motion.div 
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.7 }}
            />
          </motion.a>
          
          <motion.a 
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.7)"
            }}
            whileTap={{ scale: 0.95 }}
            href="./contactus" 
            className='bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 relative overflow-hidden group'
          >
            <span className="relative z-10">Contact Us</span>
            <motion.div 
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 rounded-full"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.7 }}
            />
          </motion.a>
        </motion.div>
        
        {/* Stats section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={hasViewed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.7 }}
          className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-16 pt-8 border-t border-white/20"
        >
          {[
            { value: "10K+", label: "Books Available" },
            { value: "24/7", label: "Access" },
            { value: "99%", label: "Satisfaction" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <motion.p 
                className="text-3xl font-bold text-white mb-1"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-blue-200 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={hasViewed ? { opacity: 1 } : {}}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-20 flex flex-col items-center"
        >
          <p className="text-blue-100 mb-3 text-sm tracking-wider font-light">SCROLL TO DISCOVER</p>
          <motion.div 
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-8 h-14 border-2 border-blue-300/70 rounded-full flex justify-center"
          >
            <motion.div 
              animate={{
                y: [0, 15, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-4 bg-blue-300 rounded-full mt-3"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Header;