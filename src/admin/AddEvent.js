import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddEvent = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    const MAX_FILE_SIZE_MB = 2 * 1024 * 1024;

    const handleFileChange = async (event) => {
        const files = event.target.files;

        if (!files.length) {
            toast.error("Please select at least one file.");
            return;
        }

        setLoading(true);
        const uploadedImages = [];

        for (const file of files) {
            if (!file.type.startsWith("image/")) {
                toast.error("Only image files are allowed.");
                continue;
            }

            if (file.size > MAX_FILE_SIZE_MB) {
                toast.error(`File ${file.name} exceeds the 2MB limit.`);
                continue;
            }

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
                    uploadedImages.push(response.data.secure_url);
                } else {
                    toast.error(`Failed to upload ${file.name}.`);
                }
            } catch (error) {
                console.error(error);
                toast.error(`Error uploading ${file.name}. Try again.`);
            }
        }

        setImageUrls([...imageUrls, ...uploadedImages]);
        toast.success("Images uploaded successfully!");
        setLoading(false);
    };

    const handleSubmit = async (event) => {
        const API_URL = process.env.REACT_APP_API_URL;
        event.preventDefault();
        if (!imageUrls.length) {
            toast.error("Please upload at least one image.");
            return;
        }

        const eventData = {
            title,
            body,
            imageUrls,
        };

        try {
            const response = await axios.post(
                `${API_URL}/api/event/add-event`,
                eventData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log("Event added successfully:", response.data);
            toast.success("Event successfully added!");

            setTitle("");
            setBody("");
            setImageUrls([]);
        } catch (error) {
            console.error("Error submitting event:", error.response?.data || error.message);
            toast.error("Failed to submit event.");
        }
    };

    return (
        <div className="min-w-md mx-auto p-6 bg-white rounded-lg shadow-lg min-h-[55rem] mt-2">
            <h1 className="text-2xl font-bold mb-4 text-blue-600">Add New Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter event title"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter event description"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Upload Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    {loading && <p className="text-blue-500">Uploading...</p>}
                </div>

                {imageUrls.length > 0 && (
                    <div className="mb-4">
                        <p className="text-gray-700 font-semibold mb-2">Preview:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {imageUrls.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Uploaded ${index}`}
                                    className="w-32 h-32 object-cover rounded-md shadow-md"
                                />
                            ))}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddEvent;
