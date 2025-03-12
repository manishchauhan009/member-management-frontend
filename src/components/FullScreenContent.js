import React, { useContext, useState } from "react";
import { ModalContext } from "../webcomponents/ModalContex";
import { About } from "../webfrontend/About";
import { ContactUs } from "../webfrontend/ContactUs";
import Content from "../webfrontend/Content";
import Gallery from "../webfrontend/Gallery";
import Event from "../webfrontend/Event";
import { Menu, X } from "lucide-react";

function FullScreenContent() {
  const { showModal } = useContext(ModalContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 text-white flex flex-col min-h-screen scroll-smooth font-sans">
      {/* Navbar */}
      <nav className="h-16 bg-indigo-800 bg-opacity-90 backdrop-blur-lg shadow-lg flex items-center justify-between px-6 md:px-10 relative z-50">
        <div className="flex items-center space-x-4">
          <img src="logo.png" alt="Logo" className="w-36 drop-shadow-lg" />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-lg font-semibold">
          {["Home", "About Us", "Contact Us", "Content", "Gallery", "Event"].map((item, index) => (
            <li key={index}>
              <a
                className="no-underline text-white hover:text-pink-400 transition duration-300 ease-in-out"
                href={`#${item.toLowerCase().replace(" ", "")}`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <button
          className="hidden md:block bg-pink-500 px-5 py-2 rounded-lg hover:bg-pink-700 transition duration-300 shadow-lg"
          onClick={showModal}
        >
          Login
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-900 bg-opacity-95 absolute top-16 left-0 w-full flex flex-col items-center py-4 space-y-4 z-40 shadow-lg">
          {["Home", "About Us", "Contact Us", "Content", "Gallery", "Event"].map((item, index) => (
            <a
              key={index}
              className="text-white text-lg hover:text-pink-300 transition duration-300 ease-in-out"
              href={`#${item.toLowerCase().replace(" ", "")}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
  
          {/* Add Login Button for Mobile */}
          <button
            className="bg-pink-500 px-5 py-2 rounded-lg hover:bg-pink-700 transition duration-300 shadow-lg"
            onClick={() => {
              showModal();
              setMenuOpen(false); // Close menu after clicking login
            }}
          >
            Login
          </button>
        </div>
      )}

      {/* Hero Section */}
      <div className="flex-grow flex flex-col justify-center items-center text-center px-4 min-h-96 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-2xl">
          Welcome to <span className="text-pink-300">Script India</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-4 leading-relaxed">
          Discover our innovative solutions designed to simplify your life.
        </p>
        {/* <button className="mt-4 bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out">
          Get Started
        </button> */}
      </div>

      {/* Main Content Sections */}
      <section className="bg-white text-gray-800 py-16 px-6 md:px-12 shadow-lg rounded-lg" id="content">
        <Content />
      </section>

      <section className="bg-gradient-to-r from-purple-700 to-pink-500  text-white py-16 px-6 md:px-12 min-h-64 shadow-lg rounded-lg" id="gallery">
        <Gallery />
      </section>

      <section className="bg-white text-gray-800 py-16 px-6 md:px-12 shadow-lg rounded-lg" id="event">
        <Event />
      </section>

      <section className="bg-gradient-to-r from-purple-700 to-pink-500 text-white py-16 px-6 md:px-12 shadow-lg rounded-lg" id="aboutus">
        <About />
      </section>

      <section className="py-16 px-6 md:px-12 text-white" id="contactus">
        <ContactUs />
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-gray-300 py-6 text-center text-lg font-semibold shadow-inner">
        &copy; {new Date().getFullYear()} <span className="text-pink-300">ScriptIndia.in</span>. All rights reserved.
      </footer>
    </div>
  );
}

export default FullScreenContent;