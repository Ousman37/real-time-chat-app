import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import LearnMore from "./pages/LearnMore";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/learn-more" element={<LearnMore />} />
        {/* This should be correctly configured */}
      </Routes>
    </Router>
  );
}

export default App;
