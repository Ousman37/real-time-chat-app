import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await login(email, password);
      navigate("/chat"); // Redirect to the chat page on successful login
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid credentials");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-md w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl mb-4 text-black text-center">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded text-black placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: "black" }} // Ensuring text color is set to black
            />
          </div>

          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded text-black placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ color: "black" }} // Ensuring text color is set to black
            />
          </div>

          <button className="w-full bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;