import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API_URL from "../Url";

const AddGallery = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const MAX_FILE_SIZE_MB = 2 * 1024 * 1024;

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            toast.error("Please select a file.");
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("Only image files are allowed.");
            return;
        }

        if (file.size > MAX_FILE_SIZE_MB) {
            toast.error("File size exceeds the 2MB limit.");
            return;
        }

        setLoading(true);

        try {
            const uploadFormData = new FormData();
            uploadFormData.append("file", file);
            uploadFormData.append("upload_preset", "wkrs4eur");
            uploadFormData.append("cloud_name", "denuugve5");

            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/denuugve5/image/upload",
                uploadFormData
            );

            if (response.data.secure_url) {
                setImage(response.data.secure_url);
                toast.success("Image uploaded successfully!");
            } else {
                toast.error("Failed to upload image.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during image upload. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error("Please upload an image first.");
            return;
        }

        const newImage = {
            title,
            body,
            imageUrl: image,
        };

        try {
            const response = await axios.post(
                `${API_URL}/api/image/add-gallery`,
                newImage,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log("Image added to Gallery Successfully:", response.data);
            toast.success("Image successfully added to the gallery!");

            setTitle("");
            setBody("");
            setImage(null);
        } catch (error) {
            console.error("Error submitting content:", error.response?.data || error.message);
            toast.error("Failed to submit content.");
        }
    };

    return (
        <div className="min-w-md mx-auto p-6 bg-white rounded-lg shadow-lg min-h-[55rem] mt-2">
            <h1 className="text-2xl font-bold mb-4">Add Image to Your Gallery</h1>
            <form onSubmit={handleSubmit}>
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
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    {loading && <p className="text-blue-500">Uploading...</p>}
                    {image && <img src={image} alt="Uploaded" className="mt-2 w-40 h-40 object-cover" />}
                </div>
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

export default AddGallery;