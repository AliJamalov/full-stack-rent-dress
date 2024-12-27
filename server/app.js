import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

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
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// admin routes
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/clothingCollections", clothingCollectionRouter);
app.use("/api/heroSections", heroSectionRouter);
app.use("/api/stats", statsRouter);

// client routes
app.use("/api/auth", authRouter);
app.use("/api/store", storeRouter);
app.use("/api/announcements", announcementRouter);
app.use("/api/wishlist", wishlistRouter);

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.listen(PORT, () => {
  console.log(`Server listeinig on ${PORT}`);
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log(err);
  });
