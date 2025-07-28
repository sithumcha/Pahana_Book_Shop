import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiKey, FiTrash2, FiEdit2, FiArrowLeft } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = "http://localhost:8080/api/auth";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [updateData, setUpdateData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/users`);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/users/${updateData.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      if (response.ok) {
        toast.success("User updated successfully!");
        fetchUsers();
        setIsEditing(false);
        setUpdateData({ username: "", password: "", email: "" });
      } else {
        throw new Error("Error updating user");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  const handleDeleteUser = async (username) => {
    if (window.confirm(`Are you sure you want to delete user ${username}?`)) {
      try {
        const response = await fetch(`${apiUrl}/users/${username}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success("User deleted successfully!");
          fetchUsers();
        } else {
          throw new Error("Error deleting user");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.message);
      }
    }
  };

  const handleEditUser = (user) => {
    setUpdateData({
      username: user.username,
      password: "",
      email: user.email,
    });
    setIsEditing(true);
  };

  const goBackToAdminDashboard = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={goBackToAdminDashboard}
            className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition-colors"
          >
            <FiArrowLeft /> Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {/* Users List */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <FiUser className="text-indigo-600" />
                  User Accounts ({users.length})
                </h2>
                
                {users.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No users found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                  <FiUser className="text-indigo-600" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <FiMail className="text-gray-400 mr-2" />
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex gap-2">
                               
                                <button
                                  onClick={() => handleDeleteUser(user.username)}
                                  className="text-red-600 hover:text-red-900 flex items-center gap-1"
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

export default UserDetails;