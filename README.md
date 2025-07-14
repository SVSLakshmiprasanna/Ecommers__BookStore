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
   VITE_API_KEY="AIzaSyCXvDIC4MPrkaMdeg_O2iij88wLpfj3qBA"
   VITE_Auth_Domain="book-store-mern-app.firebaseapp.com"
   VITE_PROJECT_ID="book-store-mern-app"
   VITE_STORAGE_BUCKET="book-store-mern-app.appspot.com"
   VITE_MESSAGING_SENDERID="205632822247"
   VITE_APPID="1:205632822247:web:b0db0ec66bf6de0bbb3b42"
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
   DB_URL="mongodb+srv://helpyourassistant:pqam0Mwv3Vwv8Off@cluster0.qc3bq.mongodb.net/book-store?retryWrites=true&w=majority&appName=Cluster0"

   JWT_SECRET_KEY="bc992a20cb6706f741433686be814e3df45e57ea1c2fc85f9dbb0ef7df12308a669bfa7c976368ff32e32f6541480ce9ec1b122242f9b1257ab669026aeaf16"
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
