import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API_URL from "../Url";
import { jwtDecode } from "jwt-decode";

const PasswordChange = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [username, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserName(decodedToken.username);
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("All fields are required!");
            return;
        }

        // if (newPassword.length < 8) {
        //     toast.error("Password must be at least 8 characters long.");
        //     return;
        // }

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${API_URL}/api/user/change-password`,
                { oldPassword, newPassword,username },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            toast.success(response.data.message);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to change password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-2 min-h-[55rem]">
            <h2 className="text-2xl font-bold text-center text-blue-600">Change Password</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Old Password</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter old password"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter new password"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm new password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? "Changing..." : "Change Password"}
                </button>
            </form>
        </div>
    );
};

export default PasswordChange;
