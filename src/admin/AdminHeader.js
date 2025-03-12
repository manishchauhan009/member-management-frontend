import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import API_URL from "../Url";

const AdminHeader = ({ setIsLogin }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const placeholderImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.clear();
  };

  const removeHighlights = () => {
    document.querySelectorAll(".highlight").forEach((el) => {
      el.replaceWith(...el.childNodes); // Removes highlight without affecting structure
    });
  };

  const highlightText = (node, search) => {
    const regex = new RegExp(`(${search})`, "gi");
    if (node.nodeType === 3) { // Only modify text nodes
      const match = node.nodeValue.match(regex);
      if (match) {
        const span = document.createElement("span");
        span.className = "highlight bg-yellow-300";
        span.textContent = match[0];
        const newNode = node.splitText(node.nodeValue.indexOf(match[0]));
        newNode.nodeValue = newNode.nodeValue.substring(match[0].length);
        node.parentNode.insertBefore(span, newNode);
      }
    } else {
      node.childNodes.forEach(child => highlightText(child, search));
    }
  };

  const handleSearch = () => {
    removeHighlights();
    if (!searchTerm.trim()) return;

    if (!window.find(searchTerm)) { // Use browser search if available
      document.querySelectorAll("p, span, div, td, h1, h2, h3, h4, h5, h6, a").forEach(element => {
        highlightText(element, searchTerm);
      });
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/user/admin-details`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setProfileUrl(response.data.data.profileURL || "");
        } else {
          alert("Failed to load profile photo data");
        }
      } catch (error) {
        console.error("Error fetching admin profile photo:", error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    return () => removeHighlights();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-10 bg-[#F0F3F4] flex justify-between items-center p-4 shadow-md">
      {/* Left: Search Bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded px-3 py-2 text-black outline-none w-36 sm:w-auto ml-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>

      {/* Right: Profile & Logout */}
      <div className="flex items-center gap-4">
        <img
          src={profileUrl || placeholderImage}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover shadow-md ml-4"
        />
        <button
          className="text-black font-semibold hover:text-white hover:bg-black px-3 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
