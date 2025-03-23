import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    streetAddress: "",
    secondAddress: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    phoneNumber: "",
    email: "",
    username: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const API_URL = process.env.REACT_APP_API_URL;
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(`${API_URL}/api/user/admin-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const profileData = response.data.data;

          
          setFormData({
            firstName: profileData.firstName || "",
            middleName: profileData.middleName || "",
            lastName: profileData.lastName || "",
            streetAddress: profileData.streetAddress || "",
            secondAddress: profileData.secondAddress || "",
            country: profileData.country || "",
            state: profileData.state || "",
            city: profileData.city || "",
            pincode: profileData.pincode || "",
            phoneNumber: profileData.phoneNumber || "",
            email: profileData.email || "",
            username: profileData.username || "",
            role: profileData.role || "",
            // password:profileData.password,
          });
        } else {
          alert("Failed to load profile data");
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
        alert("An error occurred while fetching profile data.");
      }
    };
    fetchProfile();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    const API_URL = process.env.REACT_APP_API_URL;
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_URL}/api/user/update-profile`,
        { ...formData, username: formData.username, role: formData.role},
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        alert("Profile updated successfully!");
      } else {
        alert(response.data.message || "Update failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-md mx-auto mt-3 p-6 bg-white shadow-md rounded-lg min-h-[55rem]">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <input
          type="text"
          name="secondAddress"
          placeholder="Second Address (Optional)"
          value={formData.secondAddress}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          className="w-full p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
          disabled
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          className="w-full p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
          disabled
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
