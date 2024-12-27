import express from "express";
import {
  toggleWishList,
  removeFromWishList,
  getWishListItems,
} from "../../controllers/shop/wishlist.controller.js";
import { checkAuth } from "../../middlewares/chekAuth.js";

const router = express.Router();

router.post("/", checkAuth, toggleWishList);
router.get("/", checkAuth, removeFromWishList);
router.delete("/:id", checkAuth, getWishListItems);

export default router;
