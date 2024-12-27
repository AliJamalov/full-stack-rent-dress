import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

// Routes
import authRouter from "./routes/auth/auth.routes.js";
import storeRouter from "./routes/shop/store.routes.js";
import userRouter from "./routes/admin/user.routes.js";
import announcementRouter from "./routes/shop/announcement.routes.js";
import categoryRouter from "./routes/admin/category.routes.js";
import clothingCollectionRouter from "./routes/admin/clothingCollection.routes.js";
import heroSectionRouter from "./routes/admin/heroSection.routes.js";
import statsRouter from "./routes/admin/stats.routes.js";
import wishlistRouter from "./routes/shop/wishlist.routes.js";

const app = express();
app.use(express.json());

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://rent-dress.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Admin routes
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/clothingCollections", clothingCollectionRouter);
app.use("/api/heroSections", heroSectionRouter);
app.use("/api/stats", statsRouter);

// Client routes
app.use("/api/auth", authRouter);
app.use("/api/store", storeRouter);
app.use("/api/announcements", announcementRouter);
app.use("/api/wishlist", wishlistRouter);

// Function to prevent server from going to sleep
const preventSleep = (url, interval = 25 * 60 * 1000) => {
  setInterval(async () => {
    try {
      const response = await axios.get(url);
      console.log(`Ping successful: ${response.status}`);
    } catch (error) {
      console.error(`Ping failed: ${error.message}`);
    }
  }, interval);
};

// Database connection
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Database connection established");

    // Call the preventSleep function after DB connection
    preventSleep(`https://rent-dress-server.onrender.com`); // Замените на ваш URL
  })
  .catch((err) => {
    console.log(err);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
