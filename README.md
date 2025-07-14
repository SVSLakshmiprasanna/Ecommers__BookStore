# 📚 BookShelf – Full Stack MERN Book Store App



---

## 🚀 Getting Started

Follow the steps below to run both the **frontend** and **backend** of the project locally.

---

## 💾 Frontend Setup

### Steps:

1. **Clone** or **unzip** this repository to your local machine.

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Create a `.env.local` file at the root of the frontend (same level as `package.json`) and add the following Firebase environment variables:

   ```
   VITE_API_KEY="your-api-key"
   VITE_AUTH_DOMAIN="your-auth-domain"
   VITE_PROJECT_ID="your-project-id"
   VITE_STORAGE_BUCKET="your-storage-bucket"
   VITE_MESSAGING_SENDERID="your-messaging-sender-id"
   VITE_APPID="your-app-id"

   ```

   ⚠️ **Note:** Make sure to [set up a Firebase project](https://console.firebase.google.com/) with these credentials if you’re customizing the app.

4. Install frontend dependencies:
   ```bash
   npm install
   ```

5. Run the frontend development server:
   ```bash
   npm run dev
   ```

---

## 🧠 Backend Setup

### Steps:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file in the root directory (same level as `package.json`) and add the following environment variables:

   ```
   DB_URL="your-mongodb-connection-url"
   JWT_SECRET_KEY="your-secure-jwt-secret"
   ```

   ⚠️ **Important:**  
   - Set up a MongoDB cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and replace the `DB_URL` with your own credentials.
   - Use a secure and private JWT secret key in production.

3. Install backend dependencies:
   ```bash
   npm install
   ```

4. Run the backend development server:
   ```bash
   npm run start:dev
   ```

---

## 📝 Notes

- Ensure **Node.js** and **npm** are installed globally on your system.
- The frontend uses **Vite** for blazing-fast dev experience.
- The backend uses **Express.js** and is powered by **MongoDB** and **JWT authentication**.
- Firebase is used for **authentication** (feel free to extend or replace).

---

## 📬 Contact & Feedback

Have suggestions or issues? Feel free to open an issue or reach out!  
If this project helped you, consider ⭐ starring the repo — it keeps us going! 🌟

---
