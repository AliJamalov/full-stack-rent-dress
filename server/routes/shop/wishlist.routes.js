import express from "express";
import {
  getWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../controllers/shop/wishlist.controller.js";
import { checkAuth } from "../../middlewares/chekAuth.js";

const router = express.Router();

router.get("/", checkAuth, getWishlist);
router.post("/add-item", checkAuth, addItemToWishlist);
router.post("/remove-item", checkAuth, removeItemFromWishlist);

export default router;
