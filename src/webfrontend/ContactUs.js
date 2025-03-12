import React, { useState } from "react";
import emailjs from "emailjs-com";

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_rtq35wk",
      "template_0trjcqt",
      formData,
      "9sy_rMmMFo0xGWDsb"
    )
    .then((response) => {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    })
    .catch((error) => {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    });
  };

  return (
    <div className="text-black min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h2>
      <p className="text-lg md:text-xl max-w-2xl mb-6">
        Got questions or need support? Reach out to us anytime.
      </p>
      <form onSubmit={handleSubmit} className="bg-gray-200 text-black p-6 rounded-xl shadow-lg w-full max-w-lg">
        <div className="mb-4 text-left">
          <label className="block text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4 text-left">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4 text-left">
          <label className="block text-sm font-bold mb-2">Message</label>
          <textarea
            rows="4"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
      <div className="mt-6">
        <p className="text-lg">📧 Email: manishchauha8401@gmail.com</p>
        <p className="text-lg">📞 Phone: +123 456 7890</p>
        <p className="text-lg">📍 Address: 123 ABC Street, Vapi</p>
      </div>
    </div>
  );
}
