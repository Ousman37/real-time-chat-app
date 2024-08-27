import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../services/authService";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
      // Redirect to chat page on successful login/registration
      navigate("/chat");
      onClose();
    } catch (err: any) {
      if (err.message) {
        setError(err.message); // Use the error message returned from the service
      } else {
        setError(isLogin ? "Invalid credentials" : "Registration failed");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-80 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4">{isLogin ? "Login" : "Register"}</h2>
        {error && <p className="text-red-500">{error}</p>}
        {!isLogin && (
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {isLogin ? "Login" : "Register"}
        </button>
        <div className="mt-4 text-center">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;