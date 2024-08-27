import { io } from "socket.io-client";

export const initializeSocket = () => {
  const token = localStorage.getItem("token");
  return io("http://localhost:5001", {
    auth: {
      token: token,
    },
  });
};
