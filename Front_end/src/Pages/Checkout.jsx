import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaPaypal, FaMoneyBillWave, FaArrowLeft, FaCheckCircle, FaLock, FaShieldAlt, FaTruck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const [cartItems, setCartItems] = useState([]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const state = location.state;
    if (state?.cartItems) {
      setCartItems(state.cartItems);
      setDiscountApplied(state.discountApplied || false);
      setDiscountAmount(state.discountAmount || 0);
      setCartTotal(state.total || 0);
    } else {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(savedCart);
    }
  }, [location.state]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    paymentMethod: 'creditCard',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.bookPrice * item.quantity), 0);
  const shippingCost = subtotal > 50 ? 0 : 0.00;
  const total = (cartTotal || subtotal) + shippingCost;
  const formatCurrency = (amount) => amount.toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderData = {
      ...formData,
      discountAmount: discountApplied ? discountAmount : 0,
      items: cartItems.map(item => ({
        bookId: item.bookId || item.id,
        bookTitle: item.bookTitle,
        bookImage: item.bookImage,
        bookPrice: item.bookPrice,
        quantity: item.quantity,
        lineTotal: item.bookPrice * item.quantity
      }))
    };

    try {
      const response = await fetch("http://localhost:8080/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Order placed:", result);
        localStorage.removeItem('cart');
        setOrderPlaced(true);

        // Send confirmation email
        const emailResponse = await fetch("http://localhost:8080/api/v1/sendemail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: formData.email,
            subject: '📚 Your Order Confirmation',
            body: `
╔══════════════════════════════════════╗
║          ORDER CONFIRMATION          ║
╚══════════════════════════════════════╝

Thank you for your order! We're preparing your books for shipment.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 ORDER SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${cartItems.map(item => `
📖 ${item.bookTitle}
   Quantity: ${item.quantity}
   Price:    RS ${(item.bookPrice * item.quantity).toFixed(2)}
${item !== cartItems[cartItems.length-1] ? '├───────────────────────────────────' : '└───────────────────────────────────'}
`).join('')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💳 TOTAL: RS ${total.toFixed(2)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We'll notify you when your order ships. 
Expect delivery in 3-5 business days.

For any questions, contact us at:
📧 support@bookstore.com
☎️ +91 1234567890

Thank you for shopping with us!
`
          })
        });

        if (!emailResponse.ok) {
          console.log('Error sending confirmation email.');
        }
      } else {
        alert("Something went wrong while placing the order.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const primaryColor = '#4F46E5';
    const secondaryColor = '#6B7280';
    const accentColor = '#10B981';

    doc.setFillColor(primaryColor);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text('BookStore Invoice', 105, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(secondaryColor);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 40);
    doc.text(`Invoice #: ${Math.floor(100000 + Math.random() * 900000)}`, 15, 45);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text('BILL TO:', 15, 60);
    doc.setFont(undefined, 'normal');
    doc.text(`${formData.firstName} ${formData.lastName}`, 15, 67);
    doc.text(formData.email, 15, 72);
    doc.text(`Contact: ${formData.contactNumber}`, 15, 87);
    doc.text(formData.address, 15, 77);
    doc.text(`${formData.city}, ${formData.zipCode}, ${formData.country}`, 15, 82);

    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.5);
    doc.line(15, 90, 195, 90);

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(primaryColor);
    doc.rect(15, 95, 180, 10, 'F');
    doc.text('Item', 20, 101);
    doc.text('Price', 120, 101);
    doc.text('Qty', 150, 101);
    doc.text('Total', 170, 101);

    let y = 110;
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);

    cartItems.forEach((item, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(15, y - 5, 180, 10, 'F');
      }
      doc.text(item.bookTitle, 20, y);
      doc.text(`RS ${item.bookPrice.toFixed(2)}`, 120, y);
      doc.text(item.quantity.toString(), 150, y);
      doc.text(`RS ${(item.bookPrice * item.quantity).toFixed(2)}`, 170, y);
      y += 10;
    });

    y += 10;
    doc.setDrawColor(secondaryColor);
    doc.setLineWidth(0.2);
    doc.line(120, y, 195, y);
    y += 5;

    doc.setFontSize(12);
    doc.text('Subtotal:', 120, y);
    doc.text(`RS ${formatCurrency(subtotal)}`, 170, y);
    y += 10;

    if (discountApplied) {
      doc.setTextColor(accentColor);
      doc.text('Discount:', 120, y);
      doc.text(`- RS ${formatCurrency(discountAmount)}`, 170, y);
      y += 10;
      doc.setTextColor(0, 0, 0);
    }

    doc.text('Shipping:', 120, y);
    doc.text(shippingCost === 0 ? 'FREE' : `RS ${formatCurrency(shippingCost)}`, 170, y);
    y += 10;

    doc.setFont(undefined, 'bold');
    doc.setFontSize(14);
    doc.text('Total:', 120, y);
    doc.text(`RS ${formatCurrency(total)}`, 170, y);

    y += 15;
    doc.setFontSize(10);
    doc.setTextColor(secondaryColor);
    doc.text(`Payment Method: ${formData.paymentMethod === 'creditCard' ? 'Credit Card' :
      formData.paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'}`, 15, y);

    y += 20;
    doc.setFontSize(8);
    doc.setTextColor(secondaryColor);
    doc.text('Thank you for your purchase!', 105, y, { align: 'center' });
    y += 5;
    doc.text('BookStore Inc. • 123 Book Street • Reading, RD 12345', 105, y, { align: 'center' });
    y += 5;
    doc.text('support@bookstore.com • (123) 456-7890', 105, y, { align: 'center' });

    doc.save(`invoice_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-lg w-full mx-4 border border-indigo-100"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <FaCheckCircle className="text-green-500 text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase. A confirmation email has been sent to your inbox.</p>

          <div className="text-left border border-gray-200 rounded-xl p-6 mb-6 bg-gray-50">
            <h2 className="text-lg font-semibold mb-4 text-indigo-800">Order Summary</h2>
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between mb-3">
                <span className="text-gray-700">{item.bookTitle} (x{item.quantity})</span>
                <span className="font-medium">RS {formatCurrency(item.bookPrice * item.quantity)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t pt-3 mt-3">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">RS {formatCurrency(subtotal)}</span>
            </div>
            {discountApplied && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- RS {formatCurrency(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">{shippingCost === 0 ? 'Free' : `RS ${formatCurrency(shippingCost)}`}</span>
            </div>
            <div className="flex justify-between font-bold text-indigo-600 pt-3 border-t mt-3">
              <span>Total</span>
              <span>RS {formatCurrency(total)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generatePDF}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-md font-medium"
            >
              Download Invoice (PDF)
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md font-medium"
            >
              Continue Shopping
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-lg"
        >
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Cart
          </motion.button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
            <p className="text-gray-600 mt-1 flex items-center justify-center">
              <FaLock className="text-green-500 mr-2" />
              Your payment information is encrypted
            </p>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-2">
              1
            </div>
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-2">
              2
            </div>
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">
              3
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Customer Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-semibold">1</span>
                </div>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-semibold">2</span>
                </div>
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="UK">Sri Lanka</option>
                      <option value="CA">Canada</option>
                      <option value="IN">India</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-semibold">3</span>
                </div>
                Payment Method
              </h2>
              <div className="space-y-4">
                {/* Credit Card */}
                <div className={`border-2 ${formData.paymentMethod === 'creditCard' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'} rounded-xl p-4 transition-all`}>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      checked={formData.paymentMethod === 'creditCard'}
                      onChange={handleInputChange}
                      className="mr-4 h-5 w-5 text-indigo-600"
                    />
                    <div className="flex items-center">
                      <FaCreditCard className="text-indigo-600 text-xl mr-3" />
                      <span className="font-medium">Credit Card</span>
                    </div>
                  </label>

                  {formData.paymentMethod === 'creditCard' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 space-y-4 pl-9"
                    >
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">CVC</label>
                          <input
                            type="text"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* PayPal */}
                <div className={`border-2 ${formData.paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} rounded-xl p-4 transition-all`}>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                      className="mr-4 h-5 w-5 text-blue-600"
                    />
                    <div className="flex items-center">
                      <FaPaypal className="text-blue-500 text-xl mr-3" />
                      <span className="font-medium">PayPal</span>
                    </div>
                  </label>
                </div>

                {/* Cash on Delivery */}
                <div className={`border-2 ${formData.paymentMethod === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200'} rounded-xl p-4 transition-all`}>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mr-4 h-5 w-5 text-green-600"
                    />
                    <div className="flex items-center">
                      <FaMoneyBillWave className="text-green-600 text-xl mr-3" />
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-xl sticky top-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg mr-4 flex-shrink-0 overflow-hidden border">
                        <img
                          src={`http://localhost:8080/${item.bookImage}`}
                          alt={item.bookTitle}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">{item.bookTitle}</h3>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium text-sm">RS {formatCurrency(item.bookPrice * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">RS {formatCurrency(subtotal)}</span>
                </div>

                {discountApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>- RS {formatCurrency(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center">
                    <FaTruck className="mr-2 text-blue-500" />
                    Shipping
                  </span>
                  <span className="font-medium text-green-600">
                    {shippingCost === 0 ? 'Free' : `RS ${formatCurrency(shippingCost)}`}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-indigo-600">RS {formatCurrency(total)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center mt-6 p-3 bg-gray-50 rounded-lg border">
                <FaShieldAlt className="text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Secure SSL Encryption</span>
              </div>

              {/* Place Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </motion.button>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;