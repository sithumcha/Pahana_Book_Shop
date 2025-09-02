import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShoppingCart, FaPlus, FaMinus, FaTag, FaCheckCircle, FaGift, FaTruck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);

  const validCoupons = ['BOOKLOVER10', 'READMORE10', 'SAVE10'];

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    if (location.state) {
      addToCart(location.state);
    }
  }, [location.state]);

  const addToCart = (book) => {
    setCartItems((prevCart) => {
      const existingIndex = prevCart.findIndex(item => item.id === book.id);
      let updatedCart;
      if (existingIndex !== -1) {
        updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
      } else {
        updatedCart = [...prevCart, { ...book, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const handleQuantityChange = (index, delta) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = Math.max(1, updatedItems[index].quantity + delta);
    updateCart(updatedItems);
  };

  const removeItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    updateCart(updatedItems);
  };

  const getImageUrl = (bookImage) => {
    if (bookImage?.startsWith('http')) return bookImage;
    if (bookImage) return `http://localhost:8080/${bookImage.replace(/^\//, '')}`;
    return 'https://via.placeholder.com/150x225?text=No+Cover';
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.bookPrice * item.quantity), 0);
  };

  const getDiscountAmount = () => {
    return discountApplied ? getSubtotal() * 0.1 : 0;
  };

  const getTotal = () => {
    return getSubtotal() - getDiscountAmount();
  };

  const applyCoupon = () => {
    if (validCoupons.includes(couponCode.toUpperCase())) {
      setDiscountApplied(true);
      setIsCouponValid(true);
      setCouponMessage('Coupon applied successfully! 10% discount added.');
      setShowCouponInput(false);
    } else {
      setDiscountApplied(false);
      setIsCouponValid(false);
      setCouponMessage('Invalid coupon code. Try BOOKLOVER10, READMORE10, or SAVE10');
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountApplied(false);
    setIsCouponValid(false);
    setCouponMessage('');
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout', {
      state: {
        cartItems,
        discountApplied,
        discountAmount: getDiscountAmount(),
        total: getTotal()
      }
    });
  };

  const continueShopping = () => {
    navigate('/shop');
  };

  const formatCurrency = (amount) => {
    return amount.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-lg"
        >
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={continueShopping}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-4 md:mb-0"
          >
            <FaArrowLeft className="mr-2" />
            Continue Shopping
          </motion.button>

          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
             Your Shopping Cart
            <div className="relative">
             
              <FaShoppingCart className="mr-3 text-indigo-600 text-4xl" />
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>  </h1>
            
           
         
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-12 text-center"
          >
            <div className="text-8xl mb-6">📚</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any books to your cart yet. Start exploring our collection!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={continueShopping}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all font-semibold"
            >
              Browse Books
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cartItems.map((item, index) => {
                  const imageSrc = getImageUrl(item.bookImage);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="p-6 flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 mb-4 sm:mb-0 flex items-center justify-center">
                          <img
                            src={imageSrc}
                            alt={item.bookTitle}
                            className="w-full h-48 object-contain rounded-lg shadow-md"
                          />
                        </div>
                        <div className="sm:ml-6 flex-grow">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{item.bookTitle}</h3>
                              <p className="text-gray-600 mt-1">by {item.bookAuthor}</p>
                              <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mt-2">
                                {item.bookCategory || 'General'}
                              </span>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(index)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2"
                            >
                              <FaTrash />
                            </motion.button>
                          </div>

                          <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleQuantityChange(index, -1)}
                                disabled={item.quantity <= 1}
                                className={`px-4 py-2 ${item.quantity <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
                              >
                                <FaMinus />
                              </motion.button>
                              <span className="px-4 py-2 border-l border-r border-gray-200 font-medium min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleQuantityChange(index, 1)}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-50"
                              >
                                <FaPlus />
                              </motion.button>
                            </div>

                            <div className="text-right">
                              <span className="text-xl font-bold text-indigo-600">
                                RS {formatCurrency(item.bookPrice * item.quantity)}
                              </span>
                              {item.quantity > 1 && (
                                <p className="text-sm text-gray-500 mt-1">
                                  RS {formatCurrency(item.bookPrice)} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Coupon Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-indigo-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center text-indigo-800">
                    <FaGift className="text-indigo-600 mr-3 text-xl" />
                    Apply Coupon Code
                  </h3>
                  {!showCouponInput && !discountApplied && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowCouponInput(true)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-sm bg-indigo-100 px-3 py-1 rounded-full"
                    >
                      Have a coupon?
                    </motion.button>
                  )}
                </div>

                {couponMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-3 p-3 rounded-lg text-sm ${isCouponValid ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}
                  >
                    {couponMessage}
                  </motion.div>
                )}

                {discountApplied ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 flex items-center justify-between bg-green-50 p-4 rounded-xl border border-green-200"
                  >
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-3 text-xl" />
                      <span className="font-medium text-green-700">
                        {couponCode} applied (10% off)
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-green-700 hover:text-green-900 text-sm font-medium bg-green-100 px-3 py-1 rounded-full"
                    >
                      Remove
                    </button>
                  </motion.div>
                ) : showCouponInput ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4"
                  >
                    <div className="flex">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-grow px-4 py-3 border border-indigo-300 rounded-l-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={applyCoupon}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-r-xl hover:from-indigo-700 hover:to-purple-700 font-medium"
                      >
                        Apply
                      </motion.button>
                    </div>
                    <p className="mt-3 text-sm text-indigo-600">
                      Try these codes: <span className="font-mono">BOOKLOVER10</span>, <span className="font-mono">READMORE10</span>, <span className="font-mono">SAVE10</span>
                    </p>
                  </motion.div>
                ) : null}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-6 sticky top-6 border border-gray-100"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span className="font-medium">RS {formatCurrency(getSubtotal())}</span>
                  </div>

                  {discountApplied && (
                    <div className="flex justify-between text-green-600 bg-green-50 p-3 rounded-lg">
                      <span className="flex items-center">
                        <FaTag className="mr-2" />
                        Discount (10%)
                      </span>
                      <span className="font-medium">- RS {formatCurrency(getDiscountAmount())}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                    <span className="text-gray-600 flex items-center">
                      <FaTruck className="mr-2 text-blue-500" />
                      Shipping
                    </span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-indigo-600">RS {formatCurrency(getTotal())}</span>
                    </div>
                    {discountApplied && (
                      <p className="text-sm text-green-600 mt-2">
                        You saved RS {formatCurrency(getDiscountAmount())}!
                      </p>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToCheckout}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all font-semibold text-lg"
                >
                  Proceed to Checkout
                </motion.button>

                <div className="mt-4 text-center">
                  <button
                    onClick={continueShopping}
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                  >
                    ← Continue Shopping
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;