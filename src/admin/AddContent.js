import React, { useState } from "react";
import axios from "axios";
import API_URL from "../Url";

const AddContent = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newContent = {
      title,
      body,
      tags: tags.split(",").map(tag => tag.trim()),
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/content/add-content`,
        newContent,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Content Submitted Successfully:", response.data);
      setTitle("");
      setBody("");
      setTags("");
      setPreview(null);
      setImage(null);

      alert("Content successfully added!");
    } catch (error) {
      console.error("Error submitting content:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-w-md mx-auto p-6 bg-white rounded-lg shadow-lg min-h-[55rem] mt-3">
      <h1 className="text-2xl font-bold mb-4">Add New Content</h1>
      <form onSubmit={handleSubmit}>
        
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter title"
            required
          />
        </div>

        {/* Body */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter content body"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="e.g., technology, education"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddContent;
