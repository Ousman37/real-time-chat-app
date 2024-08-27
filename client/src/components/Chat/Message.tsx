//Chat/Message.tsx
import React from "react";

interface MessageProps {
  text: string;
  username: string;
  profilePicture?: string;
  isCurrentUser: boolean;
}

const Message: React.FC<MessageProps> = ({
  text,
  username,
  profilePicture,
  isCurrentUser,
}) => {
  return (
    <div
      className={`flex items-start mb-4 ${isCurrentUser ? "justify-end" : ""}`}
    >
      {!isCurrentUser && (
        <img
          src={profilePicture || "/default-avatar.png"}
          alt="avatar"
          className="w-8 h-8 rounded-full mr-4"
        />
      )}
      <div className={`${isCurrentUser ? "text-right" : "text-left"}`}>
        <div className="text-gray-900 font-semibold">{username}</div>
        <div
          className={`p-3 rounded-lg shadow-md ${
            isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default Message;
