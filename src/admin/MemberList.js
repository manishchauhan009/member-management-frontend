import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { motion } from "framer-motion"; // For smooth animations
import API_URL from "../Url";

Modal.setAppElement("#root");

export const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    expiryDate: "",
    paymentMode: "Cash",
  });

  useEffect(() => {
    
    const fetchMembers = async () => {
      const API_URL = process.env.REACT_APP_API_URL;
      try {
        const response = await axios.get(`${API_URL}/api/member/get-member`);
        setMembers(response.data.data);
      } catch (err) {
        setError("Failed to fetch members. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleEditClick = (member) => {
    const parsedDate = member.expiryDate ? new Date(member.expiryDate) : new Date();
    setEditingMember(member._id);
    setFormData({ ...member, expiryDate: parsedDate });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    const API_URL = process.env.REACT_APP_API_URL;
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        expiryDate: new Date(formData.expiryDate).toISOString(),
      };
      await axios.post(`${API_URL}/api/member/update-member/${editingMember}`, payload);
      setMembers((prev) =>
        prev.map((m) => (m._id === editingMember ? { ...m, ...formData } : m))
      );
      setModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update member.");
    }
  };

  const handleCancel = () => setModalOpen(false);

  return (
    <div className="p-6 bg-gray-100 min-h-[55rem] mt-2 px-8 rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Member List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Expiry Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{member.firstName}</td>
                <td className="p-3">{member.email}</td>
                <td className="p-3">{member.phoneNumber}</td>
                <td className="p-3">{new Date(member.expiryDate).toLocaleDateString()}</td>
                <td className="p-3">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleEditClick(member)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto min-h-screen p-10"
          style={{ top: "5rem" }}
          onClick={(e) => e.target === e.currentTarget && handleCancel()} // Click outside to close
          onKeyDown={(e) => e.key === "Escape" && handleCancel()} // Press "Esc" to close
          tabIndex={-1}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-lg sm:max-w-2xl"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Edit Member</h2>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 text-sm font-medium">First Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium">Middle Name</label>
                <input
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium">Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium">Phone Number</label>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium">Street Address</label>
                <input
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium">City</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium">State</label>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium">Pincode</label>
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium">Payment Mode</label>
                <select
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  className="border p-3 rounded-md w-full focus:ring focus:ring-blue-300"
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )
      }
    </div >

  );
};
