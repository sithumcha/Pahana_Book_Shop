import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { 
  FiUser, FiKey, FiTrash2, FiEdit2, FiArrowLeft, 
  FiPlus, FiSearch, FiRefreshCw, FiX, FiSave,
  FiShield, FiLock, FiEye, FiEyeOff
} from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = "http://localhost:8080/admin";

function AdminManage() {
  const [admins, setAdmins] = useState([]);
  const [updateData, setUpdateData] = useState({
    username: "",
    password: "",
  });
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/all`);
      if (!response.ok) throw new Error("Failed to fetch admins");
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error("Failed to fetch admins.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdmin),
      });
      
      if (response.ok) {
        toast.success("Admin created successfully!");
        setNewAdmin({ username: "", password: "" });
        setShowAddForm(false);
        fetchAdmins();
      } else {
        throw new Error("Error creating admin");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/update/${updateData.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      if (response.ok) {
        toast.success("Admin updated successfully!");
        fetchAdmins();
        setIsEditing(false);
        setUpdateData({ username: "", password: "" });
      } else {
        throw new Error("Error updating admin");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  const handleDeleteAdmin = async (username) => {
    if (window.confirm(`Are you sure you want to delete admin ${username}?`)) {
      try {
        const response = await fetch(`${apiUrl}/delete/${username}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success("Admin deleted successfully!");
          fetchAdmins();
        } else {
          throw new Error("Error deleting admin");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.message);
      }
    }
  };

  const handleEditAdmin = (admin) => {
    setUpdateData({
      username: admin.username,
      password: "",
    });
    setIsEditing(true);
  };

  const goBackToDashboard = () => {
    navigate("/admin/dashboard");
  };

  const filteredAdmins = admins.filter(admin =>
    admin.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={goBackToDashboard}
            className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors shadow-md"
          >
            <FiArrowLeft /> Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FiShield className="text-indigo-600" />
            Admin Management
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors shadow-md"
          >
            <FiPlus /> {showAddForm ? 'Cancel' : 'Add New Admin'}
          </button>
          <button
            onClick={fetchAdmins}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* Add Admin Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-indigo-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiUser className="text-indigo-600" />
              Create New Admin
            </h2>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={newAdmin.username}
                  onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                  placeholder="Enter username"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                    placeholder="Enter password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-500 transition-colors flex items-center gap-2"
              >
                <FiSave /> Create Admin
              </button>
            </form>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-md">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {/* Admins List */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <FiUser className="text-indigo-600" />
                    Admin Accounts ({filteredAdmins.length})
                  </h2>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
                    >
                      <FiX /> Clear search
                    </button>
                  )}
                </div>

                {filteredAdmins.length === 0 ? (
                  <div className="text-center py-8">
                    <FiUser className="text-4xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchTerm ? "No admins found matching your search" : "No admins found"}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Username
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAdmins.map((admin) => (
                          <tr key={admin.username} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                  <FiUser className="text-indigo-600" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{admin.username}</div>
                                  <div className="text-xs text-gray-500">Administrator</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex gap-3">
                                <button
                                  onClick={() => handleEditAdmin(admin)}
                                  className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 transition-colors"
                                >
                                  <FiEdit2 /> Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteAdmin(admin.username)}
                                  className="text-red-600 hover:text-red-900 flex items-center gap-1 transition-colors"
                                >
                                  <FiTrash2 /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Update Admin Form */}
            {isEditing && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 p-6 border border-indigo-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <FiEdit2 className="text-indigo-600" />
                    Edit Admin
                  </h2>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                <form onSubmit={handleUpdateAdmin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                      type="text"
                      value={updateData.username}
                      onChange={(e) => setUpdateData({ ...updateData, username: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={updateData.password}
                        onChange={(e) => setUpdateData({ ...updateData, password: e.target.value })}
                        placeholder="Enter new password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-500 transition-colors flex items-center gap-2"
                    >
                      <FiSave /> Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>

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
}

export default AdminManage;