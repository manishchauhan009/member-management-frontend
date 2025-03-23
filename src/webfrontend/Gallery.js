import React, { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [adminGallery, setAdminGallery] = useState([]);

  useEffect(() => {
    const fetchAdminGallery = async () => {
      const API_URL = process.env.REACT_APP_API_URL;
      try {
        const response = await axios.get(`${API_URL}/api/image/get-image`);
        setAdminGallery(response.data.images);
      } catch (error) {
        console.error(
          "Error fetching admin Gallery:",
          error.response?.data || error.message
        );
      }
    };

    fetchAdminGallery();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 overflow-hidden relative">
      <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
        Our Gallery 📸
      </h2>
      {adminGallery.length > 0 ? (
        <div className="relative w-full overflow-hidden">
          <div className="flex space-x-4 animate-scroll">
            {[...adminGallery, ...adminGallery].map((image, index) => (
              <img
                key={index}
                src={image.imageUrl}
                alt={image.title}
                className="w-52 h-48 object-cover border-4 border-white shadow-lg rounded-lg"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-lg text-gray-500">
            🚀 No images available yet. Start adding some!
          </p>
        </div>
      )}
      <style>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Gallery;
