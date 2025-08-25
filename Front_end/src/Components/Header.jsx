import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const Header = () => {
  const ref = useRef(null);
  const [hasViewed, setHasViewed] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView && !hasViewed) {
      setHasViewed(true);
    }
  }, [isInView, hasViewed]);

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityBg = useTransform(scrollY, [0, 300], [1, 0]);

  // Floating elements data
  const floatingElements = [
    { top: '15%', left: '10%', size: 'w-4 h-4', color: 'bg-blue-400', opacity: 'opacity-70', duration: 8, delay: 0 },
    { top: '25%', right: '15%', size: 'w-6 h-6', color: 'bg-white', opacity: 'opacity-30', duration: 7, delay: 0.5 },
    { top: '65%', left: '5%', size: 'w-8 h-8', color: 'bg-purple-400', opacity: 'opacity-50', duration: 9, delay: 1 },
    { top: '40%', right: '5%', size: 'w-3 h-3', color: 'bg-yellow-300', opacity: 'opacity-60', duration: 6, delay: 0.8 },
    { top: '75%', right: '25%', size: 'w-5 h-5', color: 'bg-green-300', opacity: 'opacity-40', duration: 10, delay: 1.2 },
  ];

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.05
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
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
      className='relative min-h-screen mb-4 bg-cover  bg-center flex items-center  justify-center  w-full overflow-hidden'
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/Home1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 65%',
        backgroundAttachment: 'fixed'


      }} 
      id='Header'
    >
      {/* Parallax background layer */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          y: yBg,
          opacity: opacityBg,
          background: "radial-gradient(ellipse at center, rgba(25, 75, 150, 0.3) 0%, rgba(0, 0, 0, 0) 70%)"
        }}
      />
      
      {/* Animated floating elements */}
      {floatingElements.map((element, index) => (
        <motion.div 
          key={index}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay
          }}
          className={`absolute ${element.top} ${element.left || ''} ${element.right || ''} ${element.size} rounded-full ${element.color} ${element.opacity} filter blur-[1px]`}
        />
      ))}
      
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={hasViewed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className='container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 relative z-10'
      >
        {/* Main title with character animation */}
        <motion.h2
          variants={containerVariants}
          initial="hidden"
          animate={hasViewed ? "visible" : "hidden"}
          className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl inline-block max-w-4xl font-bold pt-20 mb-6'
        >
          {title.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-2">
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  variants={childVariants}
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
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
          transition={{ delay: 1.2, duration: 1 }}
          className='text-xl md:text-2xl mt-6 text-blue-100 max-w-2xl mx-auto leading-relaxed'
        >
          {subtitle}
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={hasViewed ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.7 }}
          className='flex flex-col sm:flex-row justify-center gap-6 mt-16'
        >
          <motion.a 
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(255,255,255,0.15)",
              boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            href="./downloadpdf" 
            className='border-2 border-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 relative overflow-hidden group'
          >
            <span className="relative z-10">Our Guide Line</span>
            <motion.div 
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.7 }}
            />
          </motion.a>
          
          <motion.a 
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            href="./contactus" 
            className='bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 relative overflow-hidden group'
          >
            <span className="relative z-10">Contact Us</span>
            <motion.div 
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.7 }}
            />
          </motion.a>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={hasViewed ? { opacity: 1 } : {}}
          transition={{ delay: 2, duration: 1 }}
          className="mt-24 flex flex-col items-center"
        >
          <p className="text-blue-100 mb-2 text-sm tracking-wider">SCROLL TO DISCOVER</p>
          <motion.div 
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center"
          >
            <motion.div 
              animate={{
                y: [0, 12, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-3 bg-blue-300 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Header;