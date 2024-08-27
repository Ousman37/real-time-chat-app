import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../components/Auth/AuthModal";

const LearnMore = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
     
      {/* Main Content */}
      <main className="flex-grow text-center p-6 max-w-4xl mx-auto mt-24">
        <h2 className="text-5xl font-bold mb-8 text-black">
          Learn More About Our Chat App
        </h2>
        <p className="text-xl mb-12 text-gray-700">
          Our Real-Time Chat App is designed to keep you connected with your
          friends, family, and colleagues at all times. With features like
          real-time messaging, group chats, and secure communication, we ensure
          that you have the best chatting experience.
        </p>
        <div className="space-y-8 text-left">
          <div>
            <h3 className="text-3xl font-semibold text-black">
              Real-Time Messaging
            </h3>
            <p className="text-lg text-gray-600">
              Experience instant communication with our real-time messaging
              feature. Messages are delivered in a flash, so you’re always in
              the loop.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-black">Group Chats</h3>
            <p className="text-lg text-gray-600">
              Stay connected with groups. Our group chat feature allows you to
              create and manage groups, making it easy to stay in touch with
              multiple people at once.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-black">
              Secure Communication
            </h3>
            <p className="text-lg text-gray-600">
              Your privacy is our priority. All communications are encrypted to
              ensure that your messages remain private and secure.
            </p>
          </div>
        </div>
        <button
          onClick={openModal}
          className="mt-12 bg-blue-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 text-lg"
        >
          Get Started
        </button>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 bg-blue-600 text-white text-center mt-12">
        <p>
          © 2024 Chat App. All rights reserved. |{" "}
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>{" "}
          |{" "}
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </p>
      </footer>

      {/* Auth Modal */}
      {isModalOpen && <AuthModal onClose={closeModal} />}
    </div>
  );
};

export default LearnMore;