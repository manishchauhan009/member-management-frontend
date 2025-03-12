import React from "react";

// About Us Component
export function About() {
  return (
    // <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white min-h-screen flex flex-col items-center justify-center px-6 text-center border">
    <div className="e min-h-[25rem] flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">About Us</h2>
      <p className="text-lg md:text-xl max-w-2xl">
        We are a passionate team dedicated to delivering high-quality services and solutions. Our mission is to empower businesses through innovative technology and exceptional service.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white text-black p-5 rounded-xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-3">Our Vision</h3>
          <p className="text-gray-700">To become a global leader in digital solutions, driving transformation and growth.</p>
        </div>
        <div className="bg-white text-black p-5 rounded-xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-3">Our Mission</h3>
          <p className="text-gray-700">To provide innovative, scalable, and customer-centric technology solutions.</p>
        </div>
        <div className="bg-white text-black p-5 rounded-xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-3">Our Values</h3>
          <p className="text-gray-700">Innovation, Integrity, Collaboration, and Excellence.</p>
        </div>
      </div>
    </div>
  );
}