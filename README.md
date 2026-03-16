# 3D Object Visualization System (MERN + AWS)

A high-performance full-stack web application designed for visualizing and manipulating 3D objects (.glb files) in real-time. Built with a focus on seamless user experience, data persistence, and cloud scalability.

## 🚀 Key Features
- **3D Interactive Viewer**: Rotate, zoom, and pan 3D models using `React-Three-Fiber`.
- **Cloud Storage**: Integrated with **Amazon S3** for secure and scalable 3D file hosting.
- **State Persistence**: Saves user-specific scene configurations (camera angles, rotation) to MongoDB.
- **Secure Authentication**: Robust JWT-based authentication system with protected routes.
- **Premium UI**: Modern dark-themed dashboard built with Framer Motion and Glassmorphism design principles.

## 🛠️ Technology Stack
- **Frontend**: React.js, Three.js, React-Three-Fiber, Drei, Framer Motion, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Cloud**: AWS S3 (for file storage), AWS EC2 (deployment ready).
- **Authentication**: JSON Web Tokens (JWT).

## 📋 Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- AWS Account (S3 Bucket & IAM Credentials)

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Akash323yadav/-3DVisualization.git
cd -3DVisualization
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your_bucket_name
```
Start the server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

## 📐 Architecture Overview
The system uses a decoupled architecture where the React frontend communicates with the Express API via RESTful endpoints. 3D models are streamed directly from Amazon S3, ensuring fast load times and minimal server overhead. Interaction states are synced to MongoDB, allowing sessions to persist across different devices.

## 📄 License
Distributed under the MIT License.
