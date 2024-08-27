import React, { useState, useEffect } from "react";
import AuthModal from "../Auth/AuthModal";
import { logout, isLoggedIn } from "../../services/authService";
import { Link } from "react-router-dom";
import { FaComments } from "react-icons/fa"; // Import the chat icon

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full p-4 flex justify-between items-center bg-opacity-70 bg-black z-20">
      <div className="flex items-center">
        <Link to="/" className="text-xl flex items-center font-bold text-white">
          <FaComments className="text-white h-10 w-10 mr-2" />
          {/* Add the icon here */}
          Chat App
        </Link>
      </div>
      <div className="space-x-4 flex items-center">
        <Link
          to="/"
          className="text-white hover:text-gray-300 transition duration-300"
        >
          Home
        </Link>
        {!loggedIn && (
          <button
            onClick={() => setIsAuthOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        )}
        {loggedIn && (
          <button onClick={logout} className="hover:underline text-white">
            Logout
          </button>
        )}
      </div>
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
    </header>
  );
};

export default Navbar;