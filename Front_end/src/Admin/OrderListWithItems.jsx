import React, { useEffect, useState } from "react";
import { FiPackage, FiDollarSign, FiCreditCard, FiCalendar, FiUser, FiTruck } from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaMoneyBillWave } from "react-icons/fa";

const OrderListWithItems = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/api/checkout")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const getPaymentIcon = (method) => {
    switch (method.toLowerCase()) {
      case 'creditcard':
        return <FaCcVisa className="inline mr-1" />;
      case 'mastercard':
        return <FaCcMastercard className="inline mr-1" />;
      case 'paypal':
        return <FaCcPaypal className="inline mr-1" />;
      case 'cod':
        return <FaMoneyBillWave className="inline mr-1" />;
      default:
        return <FiCreditCard className="inline mr-1" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    const defaultClass = 'bg-gray-100 text-gray-800';
    return (
      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusMap[status.toLowerCase()] || defaultClass}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <FiPackage className="mr-3 text-indigo-600" />
            Order History
          </h2>
          <div className="text-sm text-gray-500">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <div className="flex items-center mb-3 md:mb-0">
                      <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                        <FiPackage className="text-indigo-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Order {order._id?.slice(-6).toUpperCase() || `ORD-${index + 1000}`}</h3>
                        <p className="text-sm text-gray-500 flex items-center">
                          <FiCalendar className="mr-1" />
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center text-sm bg-gray-50 px-3 py-1 rounded-lg">
                        <FiDollarSign className="mr-1 text-green-600" />
                        <span className="font-medium">Rs{order.total?.toFixed(2) || '0.00'}</span>
                      </div>
                      <div className="flex items-center text-sm bg-gray-50 px-3 py-1 rounded-lg">
                        {getPaymentIcon(order.paymentMethod)}
                        <span className="capitalize">{order.paymentMethod}</span>
                      </div>
                      <div className="flex items-center text-sm bg-gray-50 px-3 py-1 rounded-lg">
                        <FiTruck className="mr-1 text-blue-600" />
                        {getStatusBadge(order.status || 'pending')}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                          <FiUser className="mr-2" />
                          Customer
                        </h4>
                        <div className="space-y-1">
                          <p className="text-gray-800">{order.firstName} {order.lastName}</p>
                          <p className="text-gray-600">{order.email}</p>
                          <p className="text-gray-600">{order.address}</p>
                          <p className="text-gray-600">{order.city}, {order.zipCode}</p>
                          <p className="text-gray-600">{order.country}</p>
                        </div>
                      </div>

                      <div className="md:w-2/3">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                          <FiPackage className="mr-2" />
                          Order Items ({order.items?.length || 0})
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="flex gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex-shrink-0">
                                <img
                                  src={item.bookImage?.startsWith("http") ? item.bookImage : `http://localhost:8080/${item.bookImage}`}
                                  alt={item.bookTitle}
                                  className="w-16 h-24 object-cover rounded-lg shadow-sm"
                                  onError={(e) => e.target.src = "https://via.placeholder.com/100x150?text=No+Image"}
                                />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 line-clamp-2">{item.bookTitle}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                <p className="text-sm text-gray-500">Price: Rs{item.bookPrice?.toFixed(2) || '0.00'}</p>
                                <p className="text-sm font-medium text-gray-700 mt-1">
                                  Total: Rs{(item.bookPrice * item.quantity)?.toFixed(2) || '0.00'}
                                </p>
                              </div>
                            </div>
                          ))}
                          {(!order.items || order.items.length === 0) && (
                            <p className="text-gray-500 col-span-full">No items in this order.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <FiPackage className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderListWithItems;