import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import { useNavigate } from "react-router-dom"; // Import useNavigate for back navigation
import "react-toastify/dist/ReactToastify.css";

const apiUrl = "http://localhost:8080/api/auth"; // Update with your API URL

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [updateData, setUpdateData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [deleteUsername, setDeleteUsername] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch users from the API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    }
  };

  // Handle user update
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
        fetchUsers(); // Refresh the user list
      } else {
        toast.error("Error updating user");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error updating user");
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (username) => {
    try {
      const response = await fetch(`${apiUrl}/users/${username}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("User deleted successfully!");
        fetchUsers(); // Refresh the user list
      } else {
        toast.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error deleting user");
    }
  };

  // Set user data to update
  const handleEditUser = (user) => {
    setUpdateData({
      username: user.username,
      password: "", // You may want to handle password field carefully
      email: user.email,
    });
  };

  // Back Button to navigate to Admin Dashboard
  const goBackToAdminDashboard = () => {
    navigate("/admin"); // Navigate to the Admin Dashboard
  };

  return (
    <div className="p-8 font-sans">
      {/* Back Button */}
      <button
        onClick={goBackToAdminDashboard}
        className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-500 mb-6"
      >
        Back to Admin Dashboard
      </button>

      <h1 className="text-3xl font-semibold text-center mb-6">User Management</h1>

      {/* Display Users */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <ul className="list-none p-0">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-4 mb-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <span className="font-medium">Username:</span> {user.username},{" "}
                <span className="font-medium">Email:</span> {user.email}
              </div>
              <div className="space-x-3">
                <button
                  className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-500"
                  onClick={() => handleEditUser(user)}
                >
                  Update
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-500"
                  onClick={() => handleDeleteUser(user.username)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Update User Form */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Update User</h2>
        <form onSubmit={handleUpdateUser}>
          <input
            type="text"
            placeholder="Username"
            value={updateData.username}
            onChange={(e) =>
              setUpdateData({ ...updateData, username: e.target.value })
            }
            required
            className="w-full p-3 mb-4 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={updateData.password}
            onChange={(e) =>
              setUpdateData({ ...updateData, password: e.target.value })
            }
            className="w-full p-3 mb-4 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={updateData.email}
            onChange={(e) =>
              setUpdateData({ ...updateData, email: e.target.value })
            }
            required
            className="w-full p-3 mb-4 border rounded-md"
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500"
          >
            Update
          </button>
        </form>
      </div>

      {/* Toastify */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default UserDetails;
