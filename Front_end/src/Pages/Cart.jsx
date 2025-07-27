import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShoppingCart, FaPlus, FaMinus, FaTag, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  // Add new book to cart (from BookDetails page)
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
    navigate('/books');
  };

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
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Continue Shopping
          </motion.button>

          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FaShoppingCart className="mr-3 text-indigo-600" />
            Your Shopping Cart
            <span className="ml-2 bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded-full">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center"
          >
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any books to your cart yet.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={continueShopping}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md"
            >
              Browse Books
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => {
                const imageSrc = getImageUrl(item.bookImage);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <div className="p-6 flex flex-col sm:flex-row">
                      <div className="sm:w-1/4 mb-4 sm:mb-0">
                        <img 
                          src={imageSrc} 
                          alt={item.bookTitle} 
                          className="w-full h-48 object-contain rounded-lg shadow-sm"
                        />
                      </div>
                      <div className="sm:ml-6 flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{item.bookTitle}</h3>
                            <p className="text-gray-600">by {item.bookAuthor}</p>
                          </div>
                          <button 
                            onClick={() => removeItem(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        
                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button 
                              onClick={() => handleQuantityChange(index, -1)}
                              disabled={item.quantity <= 1}
                              className={`px-3 py-2 ${item.quantity <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                              <FaMinus />
                            </button>
                            <span className="px-4 py-2 border-l border-r border-gray-300 font-medium">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleQuantityChange(index, 1)}
                              className="px-3 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              <FaPlus />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-lg font-bold text-indigo-600">
                              RS {formatCurrency(item.bookPrice * item.quantity)}
                            </span>
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-500">
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

              {/* Coupon Section */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center">
                    <FaTag className="text-indigo-600 mr-2" />
                    Apply Coupon Code
                  </h3>
                  {!showCouponInput && !discountApplied && (
                    <button 
                      onClick={() => setShowCouponInput(true)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Have a coupon?
                    </button>
                  )}
                </div>

                {couponMessage && (
                  <div className={`mt-3 p-3 rounded-lg text-sm ${isCouponValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {couponMessage}
                  </div>
                )}

                {discountApplied ? (
                  <div className="mt-4 flex items-center justify-between bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span className="font-medium text-green-700">
                        {couponCode} applied (10% off)
                      </span>
                    </div>
                    <button 
                      onClick={removeCoupon}
                      className="text-green-700 hover:text-green-900 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : showCouponInput ? (
                  <div className="mt-4">
                    <div className="flex">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Try these codes: BOOKLOVER10, READMORE10, SAVE10
                    </p>
                  </div>
                ) : null}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span className="font-medium">RS {formatCurrency(getSubtotal())}</span>
                  </div>

                  {discountApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>- RS {formatCurrency(getDiscountAmount())}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-indigo-600">RS {formatCurrency(getTotal())}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToCheckout}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md transition-all"
                >
                  Proceed to Checkout
                </motion.button>

                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>or</p>
                  <button 
                    onClick={continueShopping}
                    className="text-indigo-600 hover:text-indigo-800 font-medium mt-1"
                  >
                    Continue Shopping
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