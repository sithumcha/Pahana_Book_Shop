


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaPaypal, FaMoneyBillWave, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract cart data with discount information
  const { 
    cartItems = [], 
    discountApplied = false, 
    discountAmount = 0,
    total: cartTotal = 0 
  } = location.state || {};

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.bookPrice * item.quantity), 0);

  // Calculate shipping (free for orders over $50)
  const shippingCost = subtotal > 50 ? 0 : 5.99;

  // Calculate total
  const total = (cartTotal || subtotal) + shippingCost;

  // Format as currency
  const formatCurrency = (amount) => amount.toFixed(2);

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare order data to match backend
    const orderData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      country: formData.country,
      paymentMethod: formData.paymentMethod,
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


      } else {
        console.error("Failed to place order");
        alert("Something went wrong while placing the order.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Network error. Please try again.");
    }
  };

  // Generate PDF Invoice with enhanced design
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Colors
    const primaryColor = '#4F46E5'; // Indigo-600
    const secondaryColor = '#6B7280'; // Gray-500
    const accentColor = '#10B981'; // Emerald-500
    
    // Add header with logo and title
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text('BookStore Invoice', 105, 20, { align: 'center' });
    
    // Add date and invoice number
    doc.setFontSize(10);
    doc.setTextColor(secondaryColor);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 40);
    doc.text(`Invoice #: ${Math.floor(100000 + Math.random() * 900000)}`, 15, 45);
    
    // Customer information
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text('BILL TO:', 15, 60);
    doc.setFont(undefined, 'normal');
    doc.text(`${formData.firstName} ${formData.lastName}`, 15, 67);
    doc.text(formData.email, 15, 72);
    doc.text(formData.address, 15, 77);
    doc.text(`${formData.city}, ${formData.zipCode}, ${formData.country}`, 15, 82);
    
    // Add decorative line
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.5);
    doc.line(15, 90, 195, 90);
    
    // Items table header
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(primaryColor);
    doc.rect(15, 95, 180, 10, 'F');
    doc.text('Item', 20, 101);
    doc.text('Price', 120, 101);
    doc.text('Qty', 150, 101);
    doc.text('Total', 170, 101);
    
    // Items list
    let y = 110;
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    
    cartItems.forEach((item, index) => {
      // Alternate row colors
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
    
    // Summary section
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
    
    // Payment method
    y += 15;
    doc.setFontSize(10);
    doc.setTextColor(secondaryColor);
    doc.text(`Payment Method: ${formData.paymentMethod === 'creditCard' ? 'Credit Card' : 
             formData.paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'}`, 15, y);
    
    // Footer
    y += 20;
    doc.setFontSize(8);
    doc.setTextColor(secondaryColor);
    doc.text('Thank you for your purchase!', 105, y, { align: 'center' });
    y += 5;
    doc.text('BookStore Inc. • 123 Book Street • Reading, RD 12345', 105, y, { align: 'center' });
    y += 5;
    doc.text('support@bookstore.com • (123) 456-7890', 105, y, { align: 'center' });
    
    // Save the PDF
    doc.save(`invoice_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-lg w-full"
        >
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Here is your bill:
          </p>

          {/* Bill Section */}
          <div className="text-left border border-gray-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between mb-1">
                <span>{item.bookTitle} (x{item.quantity})</span>
                <span>RS {formatCurrency(item.bookPrice * item.quantity)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t pt-2 mt-2">
              <span>Subtotal</span>
              <span>RS {formatCurrency(subtotal)}</span>
            </div>
            {discountApplied && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- RS {formatCurrency(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : `RS ${formatCurrency(shippingCost)}`}</span>
            </div>
            <div className="flex justify-between font-bold text-indigo-600 pt-2">
              <span>Total</span>
              <span>RS {formatCurrency(total)}</span>
            </div>
          </div>

          {/* PDF Download Button */}
          <button
            onClick={generatePDF}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Download Invoice (PDF)
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <motion.button
            whileHover={{ x: -5 }}
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 mr-6"
          >
            <FaArrowLeft className="mr-2" />
            Back to Cart
          </motion.button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Customer Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
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
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
              <div className="space-y-4">
                {/* Credit Card */}
                <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      checked={formData.paymentMethod === 'creditCard'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <FaCreditCard className="text-indigo-600 mr-2" />
                      <span className="font-medium">Credit Card</span>
                    </div>
                  </label>

                  {formData.paymentMethod === 'creditCard' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 space-y-4 pl-8"
                    >
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">CVC</label>
                          <input
                            type="text"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* PayPal */}
                <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <FaPaypal className="text-blue-500 mr-2" />
                      <span className="font-medium">PayPal</span>
                    </div>
                  </label>
                </div>

                {/* Cash on Delivery */}
                <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <FaMoneyBillWave className="text-green-600 mr-2" />
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
              className="bg-white p-6 rounded-xl shadow-sm sticky top-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg mr-4 flex-shrink-0 overflow-hidden">
                        <img
                          src={`http://localhost:8080/${item.bookImage}`}
                          alt={item.bookTitle}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.bookTitle}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">RS {formatCurrency(item.bookPrice * item.quantity)}</span>
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

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Free' : `RS ${formatCurrency(shippingCost)}`}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-bold pt-4">
                  <span>Total</span>
                  <span className="text-indigo-600">RS {formatCurrency(total)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Place Order
              </motion.button>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;