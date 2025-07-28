import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaBook, 
  FaUserShield, 
  FaShoppingCart, 
  FaSignOutAlt,
  FaChartLine,
  FaCog,
  FaHome
} from "react-icons/fa";
import { FiUsers, FiBook, FiShoppingBag, FiShield } from "react-icons/fi";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    books: 0,
    orders: 0,
    admins: 0,
    loading: true
  });
  const [activeView, setActiveView] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, booksRes, ordersRes, adminsRes] = await Promise.all([
          fetch("http://localhost:8080/api/auth/users"),
          fetch("http://localhost:8080/api/books"),
          fetch("http://localhost:8080/api/checkout"),
          fetch("http://localhost:8080/api/admins")
        ]);
        
        const users = await usersRes.json();
        const books = await booksRes.json();
        const orders = await ordersRes.json();
        const admins = await adminsRes.json();

        setStats({
          users: users.length,
          books: books.length,
          orders: orders.length,
          admins: admins.length,
          loading: false
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  const Card = ({ icon: Icon, title, count, color }) => (
    <div 
      className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-${color}-500`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
          <Icon className="text-xl" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">
            {stats.loading ? (
              <span className="inline-block h-6 w-10 bg-gray-200 rounded animate-pulse"></span>
            ) : (
              count
            )}
          </p>
        </div>
      </div>
    </div>
  );

  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
            <FaUserShield /> Admin Panel
          </h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveView("dashboard")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg ${activeView === "dashboard" ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FaChartLine /> Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate("/admin/usermanagement")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg ${activeView === "users" ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiUsers /> User Management
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate("/admin/managebook")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg ${activeView === "books" ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiBook /> Book Management
              </button>
            </li>

            
            <li>
              <button 
                onClick={() => navigate("/admin/orders")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg ${activeView === "orders" ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiShoppingBag /> Order Management
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate("/admin/admins")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg ${activeView === "admins" ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiShield /> Admin Management
              </button>
            </li>

             <li>
              <button 
                onClick={() => navigate("/admin/addbook")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg ${activeView === "book" ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiUsers /> Add Books
              </button>
            </li>

             <li>
              <button 
                onClick={() => navigate("/register")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg ${activeView === "admins" ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiUsers /> Add Users
              </button>
            </li>

            


          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {activeView === "dashboard" && <FaHome />}
            {activeView === "users" && <FiUsers />}
            {activeView === "books" && <FiBook />}
            {activeView === "orders" && <FiShoppingBag />}
            {activeView === "admins" && <FiShield />}
            {activeView === "dashboard" ? "Dashboard Overview" : 
             activeView.charAt(0).toUpperCase() + activeView.slice(1) + " Management"}
          </h1>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <FaUser />
            </div>
            <span className="text-sm font-medium">Admin</span>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeView === "dashboard" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card icon={FaUser} title="Total Users" count={stats.users} color="indigo" />
              <Card icon={FaBook} title="Total Books" count={stats.books} color="green" />
              <Card icon={FaShoppingCart} title="Total Orders" count={stats.orders} color="blue" />
              <Card icon={FaUserShield} title="Admins" count={stats.admins} color="purple" />
              
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button 
                  onClick={() => navigate("/admin/usermanagement")}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors flex items-center gap-3"
                >
                  <FiUsers className="text-indigo-600" />
                  <span>Manage Users</span>
                </button>
                <button 
                  onClick={() => navigate("/admin/managebook")}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors flex items-center gap-3"
                >
                  <FiBook className="text-green-600" />
                  <span>Manage Books</span>
                </button>

                
                <button 
                  onClick={() => navigate("/admin/orders")}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors flex items-center gap-3"
                >
                  <FiShoppingBag className="text-blue-600" />
                  <span>View Orders</span>
                </button>
                <button 
                  onClick={() => navigate("/admin/admins")}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors flex items-center gap-3"
                >
                  <FiShield className="text-purple-600" />
                  <span>Admin Settings</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {stats.loading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="animate-pulse flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No recent activity</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;