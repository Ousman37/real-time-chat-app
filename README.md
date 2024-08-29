# Real-Time Chat App

![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![GitHub Repo Stars](https://img.shields.io/github/stars/Ousman37/real-time-chat-app?style=social)
![React](https://img.shields.io/badge/react-18.3.1-61DAFB.svg)
![Node.js](https://img.shields.io/badge/node.js-22.5.0-43853D.svg)

Welcome to the **Real-Time Chat App**, a modern and dynamic platform built to demonstrate real-time communication skills using cutting-edge technologies. This project leverages **React**, **Node.js**, **WebSockets**, and **MongoDB** to deliver a seamless, real-time messaging experience.

## 🚀 Features

- **Real-Time Messaging:** Communicate instantly with users through WebSockets.
- **User Authentication:** Secure your conversations with JWT-based authentication.
- **User Profile Management:** Update your username and profile picture.
- **Responsive UI:** A clean and intuitive interface built with React and Tailwind CSS.
- **Scalable Backend:** Powered by Node.js and MongoDB for handling real-time data.

## 🛠️ Tech Stack

### Frontend

- **React:** v18.3.1
- **TypeScript:** v4.9.5
- **Socket.IO Client:** v4.7.5
- **React Router DOM:** v6.26.1
- **Tailwind CSS:** v3.4.10

### Backend

- **Node.js:** v22.5.0
- **Express:** v4.19.2
- **MongoDB:** v6.8.0 (via Mongoose)
- **Socket.IO:** v4.7.5
- **JWT Authentication:** via jsonwebtoken v9.0.2
- **Multer:** for handling profile picture uploads

## 📦 Installation

### Prerequisites

- Node.js v18.16.0 or later
- MongoDB installed and running

### Clone the Repository

```bash
git clone https://github.com/Ousman37/real-time-chat-app.git
cd real-time-chat-app
```

## Install Dependencies

### For the Backend

```bash
cd server
npm install
```

### For the Frontend

```bash
cd client
npm install
```

## 🏃‍♂️ Running the Application

## Start the Backend Server

```bash
cd server
npm run dev
```

This will start the server on `http://localhost:5001`.

## Start the Frontend Application

```bash
cd client
npm start
```

This will start the React application on [http://localhost:3000](http://localhost:3000).

## 🚀 Usage

- **Register**: Create a new user account by registering with a username, email, and password.
- **Login**: Authenticate with your email and password to access the chat room.
- **Chat**: Start sending messages to other users in real time!
- **Profile Management**: Update your username and profile picture via the profile page.

## 📋 API Endpoints

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Authenticate and receive a JWT token
- **GET /api/auth/user**: Fetch authenticated user details
- **PUT /api/auth/user**: Update user profile (username and profile picture)
- **DELETE /api/auth/user**: Delete user profile

## 🧪 Running Tests

To run the tests, use:

```bash
npm test
```

## 👥 Contributing

Contributions are welcome! Feel free to fork this repository, create a new branch, and submit a pull request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ✨ Acknowledgments

Your feedback and suggestions are invaluable.
