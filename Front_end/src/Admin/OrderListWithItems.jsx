import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiShoppingBag, FiUser, FiPhone, FiMail, FiMapPin, FiDollarSign, FiClock, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminOrderView = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/checkout");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/checkout/${id}`, { status: "CONFIRMED" });
      fetchOrders();
      toast.success("Order confirmed successfully!");
    } catch (error) {
      console.error("Error confirming order:", error);
      toast.error("Failed to confirm order");
    }
  };

  const handleShip = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/checkout/${id}`, { status: "SHIPPED" });
      fetchOrders();
      toast.success("Order marked as shipped!");
    } catch (error) {
      console.error("Error shipping order:", error);
      toast.error("Failed to update order status");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/checkout/${id}`);
      fetchOrders();
      toast.success("Order deleted successfully!", {
        icon: "🗑️"
      });
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    }
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PLACED":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter(order => 
    order.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.contactNumber?.includes(searchTerm) ||
    order.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-3xl font-bold text-white text-center">Order Management Dashboard</h2>
        <p className="text-indigo-100 text-center mt-2">Manage all customer orders in one place</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search orders by name, email, phone or order ID..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Total Orders:</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
              {orders.length}
            </span>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="flex flex-col items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search query</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr 
                        className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        onClick={() => toggleOrderExpand(order.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">Order #{order.id}</div>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <FiClock className="mr-1" />
                                {formatDate(order.createdAt)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <FiUser className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{order.firstName} {order.lastName}</div>
                              <div className="text-sm text-gray-500">{order.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiPhone className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm font-medium text-gray-900">
                              {order.contactNumber || 'Not provided'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiDollarSign className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm font-semibold text-gray-900">
                              {order.total?.toFixed(2)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <div className="flex justify-end items-center">
                            {order.status === "PLACED" && (
                              <button
                                onClick={(e) => { e.stopPropagation(); handleConfirm(order.id); }}
                                className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-200 text-sm mr-2"
                              >
                                Confirm
                              </button>
                            )}
                            {order.status === "CONFIRMED" && (
                              <button
                                onClick={(e) => { e.stopPropagation(); handleShip(order.id); }}
                                className="px-3 py-1 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-all duration-200 text-sm mr-2"
                              >
                                Ship
                              </button>
                            )}
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDelete(order.id); }}
                              className="px-3 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-all duration-200 text-sm"
                            >
                              Delete
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleOrderExpand(order.id); }}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                              {expandedOrder === order.id ? <FiChevronUp /> : <FiChevronDown />}
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedOrder === order.id && (
                        <tr className="bg-gray-50">
                          <td colSpan="6" className="px-6 py-4">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              {/* Customer Information */}
                              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                  <FiUser className="mr-2 text-blue-500" />
                                  Customer Information
                                </h3>
                                <div className="space-y-2">
                                  <p className="text-sm">
                                    <span className="font-medium text-gray-700">Name:</span> {order.firstName} {order.lastName}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium text-gray-700">Email:</span> {order.email}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium text-gray-700">Phone:</span> {order.contactNumber || 'Not provided'}
                                  </p>
                                </div>
                              </div>

                              {/* Shipping Information */}
                              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                  <FiMapPin className="mr-2 text-green-500" />
                                  Shipping Details
                                </h3>
                                <div className="space-y-2">
                                  <p className="text-sm">
                                    <span className="font-medium text-gray-700">Address:</span> {order.address}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium text-gray-700">City:</span> {order.city}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium text-gray-700">ZIP Code:</span> {order.zipCode}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium text-gray-700">Country:</span> {order.country}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium text-gray-700">Payment:</span> {order.paymentMethod}
                                  </p>
                                </div>
                              </div>

                              {/* Order Items */}
                              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                  <FiShoppingBag className="mr-2 text-purple-500" />
                                  Order Items ({order.items?.length})
                                </h3>
                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                  {order.items?.map((item, index) => (
                                    <div key={index} className="flex items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                      <div className="flex-shrink-0 mr-3">
                                        <img
                                          src={item.bookImage?.startsWith("http") ? item.bookImage : `http://localhost:8080/${item.bookImage}`}
                                          alt={item.bookTitle}
                                          className="w-12 h-16 object-cover rounded-md shadow-sm border border-gray-200"
                                          onError={(e) => e.target.src = "https://via.placeholder.com/100x150?text=No+Image"}
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{item.bookTitle}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                      </div>
                                      <div className="ml-2 text-right">
                                        <p className="text-sm font-medium text-gray-900">${item.bookPrice?.toFixed(2)}</p>
                                        <p className="text-xs text-gray-500">Total: ${(item.bookPrice * item.quantity).toFixed(2)}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Order Summary */}
                            <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                              <h3 className="text-lg font-medium text-gray-900 mb-3">Order Summary</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-600">Subtotal</p>
                                  <p className="text-sm font-medium">${order.subtotal?.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Discount</p>
                                  <p className="text-sm font-medium">-${order.discountAmount?.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Shipping</p>
                                  <p className="text-sm font-medium">${order.shippingCost?.toFixed(2)}</p>
                                </div>
                                <div className="border-t border-gray-200 pt-2 col-span-2">
                                  <p className="text-sm font-medium text-gray-600">Total</p>
                                  <p className="text-lg font-bold text-indigo-600">${order.total?.toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default AdminOrderView;