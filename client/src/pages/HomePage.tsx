import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { FaComments } from "react-icons/fa"; // Import the chat icon from react-icons
import AuthModal from "../components/Auth/AuthModal";

const HomePage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center text-white relative"
      style={{
        backgroundImage: "url('/gradient_background.jpg')", // Replace with the path to your background image
      }}
    >
      

      {/* Main Content */}
      <main className="text-center mt-16">
        {" "}
        {/* Added margin-top to avoid content being hidden behind the fixed header */}
        <h1 className="text-6xl font-bold mb-4 animate-pulse">
          Welcome to the Real-Time Chat App
        </h1>
        <p className="text-xl mb-8 max-w-md mx-auto">
          Connect with your friends and family instantly. Enjoy real-time
          messaging with high-end security and a beautiful interface.
        </p>
        {/* Call to Action Buttons */}
        <div className="space-x-4">
          <button
            onClick={openModal} // Open modal instead of navigation
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Get Started
          </button>
          <Link
            to="/learn-more"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-400">
        <p>
          © 2024 Chat App. All rights reserved. |
          <Link to="/contact" className="hover:underline ml-2">
            Contact Us
          </Link>{" "}
          |{" "}
          <Link to="/privacy" className="hover:underline ml-2">
            Privacy Policy
          </Link>
        </p>
      </footer>

      {/* Auth Modal */}
      {isModalOpen && <AuthModal onClose={closeModal} />}
    </div>
  );
};

export default HomePage;