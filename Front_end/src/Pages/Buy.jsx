import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShoppingCart, FaPlus, FaMinus, FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';

constBuy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(location.state ? [{ ...location.state, quantity: 1 }] : []);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [isCouponValid, setIsCouponValid] = useState(false);

  // Valid coupon codes (in a real app, these would come from your backend)
  const validCoupons = ['BOOKLOVER10', 'READMORE10', 'SAVE10'];

  const getImageUrl = (bookImage) => {
    if (bookImage?.startsWith('http')) return bookImage;
    if (bookImage) return `http://localhost:8080/${bookImage.replace(/^\//, '')}`;
    return 'https://via.placeholder.com/150x225?text=No+Cover';
  };

  const handleQuantityChange = (index, delta) => {
    const updatedItems = [...cartItems];
    const newQuantity = Math.max(updatedItems[index].quantity + delta, 1);
    
    if (newQuantity <= 10) {
      updatedItems[index].quantity = newQuantity;
      setCartItems(updatedItems);
    }
  };

  const removeItem = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
  };

  // Calculate subtotal (before discount)
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.bookPrice * item.quantity), 0);
  };

  // Calculate discount amount (10% of subtotal)
  const getDiscountAmount = () => {
    return discountApplied ? getSubtotal() * 0.1 : 0;
  };

  // Calculate total (after discount)
  const getTotal = () => {
    return getSubtotal() - getDiscountAmount();
  };

  // Apply coupon code
  const applyCoupon = () => {
    if (validCoupons.includes(couponCode.toUpperCase())) {
      setDiscountApplied(true);
      setIsCouponValid(true);
      setCouponMessage('Coupon applied successfully! 10% discount added.');
    } else {
      setDiscountApplied(false);
      setIsCouponValid(false);
      setCouponMessage('Invalid coupon code. Try BOOKLOVER10, READMORE10, or SAVE10');
    }
  };

  // Remove coupon
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
    navigate('/books');
  };

  // Format currency
  const formatCurrency = (amount) => {
    return amount.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            whileHover={{ x: -5 }}
            onClick={continueShopping}
            className="flex items-center text-indigo-600"
          >
            <FaArrowLeft className="mr-2" />
            Continue Shopping
          </motion.button>
          
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FaShoppingCart className="mr-3 text-indigo-600" />
            Your Shopping Cart
          </h1>
          
          <div className="w-24"></div>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any books to your cart yet.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={continueShopping}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Browse Books
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => {
                    const imageSrc = getImageUrl(item.bookImage);
                    const itemTotal = item.bookPrice * item.quantity;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6"
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-1/4 flex-shrink-0">
                            <img
                              src={imageSrc}
                              alt={item.bookTitle}
                              className="w-full h-48 object-contain rounded-lg"
                            />
                          </div>

                          <div className="sm:ml-6 mt-4 sm:mt-0 flex-grow">
                            <div className="flex justify-between">
                              <h3 className="text-xl font-semibold text-gray-900">{item.bookTitle}</h3>
                              <button
                                onClick={() => removeItem(index)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <FaTrash />
                              </button>
                            </div>
                            <p className="text-gray-600 mt-1">by {item.bookAuthor}</p>
                            
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                  onClick={() => handleQuantityChange(index, -1)}
                                  disabled={item.quantity <= 1}
                                  className={`px-3 py-1 ${item.quantity <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                  <FaMinus />
                                </button>
                                <span className="px-4 py-1 border-l border-r border-gray-300 font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(index, 1)}
                                  disabled={item.quantity >= 10}
                                  className={`px-3 py-1 ${item.quantity >= 10 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                  <FaPlus />
                                </button>
                              </div>

                              <div className="text-right">
                                <span className="text-lg font-bold text-indigo-600">
                                  RS {formatCurrency(itemTotal)}
                                </span>
                                {item.quantity > 1 && (
                                  <div className="text-sm text-gray-500">
                                    RS {formatCurrency(item.bookPrice)} each
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span className="font-medium">RS {formatCurrency(getSubtotal())}</span>
                  </div>

                  {/* Discount Applied */}
                  {discountApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>- RS {formatCurrency(getDiscountAmount())}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">RS 0.00</span>
                  </div>

                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-indigo-600">
                      RS {formatCurrency(getTotal())}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mb-4"
                >
                  Proceed to Checkout
                </motion.button>

                <div className="text-center text-sm text-gray-500">
                  <p>or</p>
                  <button 
                    onClick={continueShopping}
                    className="text-indigo-600 hover:text-indigo-800 mt-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <FaTag className="mr-2 text-indigo-600" />
                  Apply Coupon Code
                </h3>
                
                {couponMessage && (
                  <div className={`mb-3 p-2 text-sm rounded ${isCouponValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {couponMessage}
                  </div>
                )}

                {discountApplied ? (
                  <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
                    <span className="text-green-700 font-medium">
                      {couponCode} applied (10% off)
                    </span>
                    <button 
                      onClick={removeCoupon}
                      className="text-green-700 hover:text-green-900 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button 
                      onClick={applyCoupon}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
                    >
                      Apply
                    </button>
                  </div>
                )}

                <div className="mt-3 text-xs text-gray-500">
                  <p>Try these codes: BOOKLOVER10, READMORE10, SAVE10</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buy;