// src/components/Chat/ChatRoom.ts
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import Message from "./Message";
import { getAuthToken } from "../../services/authService";

const ChatRoom = () => {
  const [messages, setMessages] = useState<
    { text: string; username: string; profilePicture?: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const [userDetails, setUserDetails] = useState<{
    username: string;
    profilePicture?: string;
  }>({ username: "", profilePicture: "" });
  const navigate = useNavigate();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch the user details when the component mounts
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUserDetails({
          username: data.username,
          profilePicture: data.profilePicture,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();

    socketRef.current = io("http://localhost:5001", {
      auth: {
        token,
      },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 5000,
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to server with ID:", socketRef.current!.id);
    });

    socketRef.current.on("chatHistory", (history) => {
      console.log("Received chat history:", history);
      setMessages(history);
    });

    socketRef.current.on(
      "message",
      (message: {
        text: string;
        username: string;
        profilePicture?: string;
      }) => {
        console.log("Message received from server:", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    );

    socketRef.current.on("disconnect", (reason) => {
      console.error("Disconnected from server. Reason:", reason);
      if (reason === "io server disconnect") {
        socketRef.current!.connect();
      }
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socketRef.current.on("error", (err) => {
      console.error("Socket error:", err);
    });

    return () => {
      console.log("Disconnecting socket...");
      socketRef.current?.disconnect();
    };
  }, [navigate]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      socketRef.current?.emit("message", {
        text: newMessage,
        username: userDetails.username,
        profilePicture: userDetails.profilePicture,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow p-6 overflow-y-auto bg-white shadow-md rounded-md mx-4 my-6">
        <h2 className="text-xl font-semibold mb-4">Chat Room</h2>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              username={message.username}
              profilePicture={message.profilePicture}
              isCurrentUser={message.username === userDetails.username}
            />
          ))}
        </div>
      </div>
      <div className="p-4 bg-white flex items-center shadow-md">
        <input
          type="text"
          className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-4 bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;