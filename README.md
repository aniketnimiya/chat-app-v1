# 💬 Chat App v1

A full-stack real-time chat application with user authentication, profile management, and instant messaging features.  
Built using **React.js** on the frontend and **Node.js + Express + MongoDB** on the backend, with **Socket.IO** for real-time communication.

---

## 🚀 Features

- 🔐 User authentication (JWT)  
- 💬 Real-time chat using Socket.IO  
- 📤 Image upload with Cloudinary  
- 👥 User profiles  
- 🌓 Dark & Light mode  
- 📱 Responsive design with Tailwind CSS  

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js (Vite)  
- Zustand (State Management)  
- Axios  
- Tailwind CSS  

**Backend:**  
- Node.js + Express.js  
- MongoDB with Mongoose  
- Socket.IO  
- Cloudinary  
- JWT Authentication  
- dotenv  

---

## 📁 Folder Structure

chat-app-v1/
├── backend/ # Express.js API
│ ├── src/
│ ├── package.json
│ └── .env (not included in Git)
├── frontend/ # React frontend
│ ├── src/
│ ├── public/
│ ├── vite.config.js
│ └── .env (optional)
└── .gitignore



---

## ⚙️ Setup Instructions

### 1. Clone the Repository

git clone https://github.com/aniketnimiya/chat-app-v1.git
cd chat-app-v1
2. Backend Setup

cd backend
npm install
Create a .env file in the backend/ directory with the following variables:


PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Run the backend server:


npm start
3. Frontend Setup

cd ../frontend
npm install
npm run dev
The frontend will be available on http://localhost:5173 (default Vite port).

🔐 .env Example
Here’s a sample .env.example for the backend:

env

PORT=
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
Note: Do not push .env files to GitHub. They are listed in .gitignore.

