import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Content() {
  const [adminContent, setAdminContent] = useState([]);

  useEffect(() => {
    const fetchAdminContent = async () => {
      const API_URL = process.env.REACT_APP_API_URL;
      try {
        const response = await axios.get(`${API_URL}/api/content/get-content`);
        setAdminContent(response.data.content);
      } catch (error) {
        console.error("Error fetching admin content:", error.response?.data || error.message);
      }
    };

    fetchAdminContent();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">Our Content</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {adminContent.length > 0 ? (
          adminContent.map((content) => (
            <div
              key={content._id}
              className="bg-white text-gray-800 p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-2xl font-semibold border-b pb-3 mb-4 text-indigo-700">
                {content.title}
              </h3>
              <p className="text-gray-700 mb-4">{content.body}</p>
              <p className="mt-3 text-sm font-medium text-gray-600">
                <span className="text-indigo-500 font-bold">Tags:</span> {content.tags.join(", ")}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center w-full col-span-full">
            <p className="text-lg text-gray-500">🚀 No content available yet. Start adding some!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;
