import express from "express";
import {
  createStore,
  getStoreById,
  getStoresByOwner,
  updateStore,
  deleteStore,
  getAllStores,
  getStoresByOwnerId,
} from "../../controllers/shop/store.controller.js";
import { checkAuth } from "../../middlewares/chekAuth.js";

const router = express.Router();

router.post("/add", checkAuth, createStore);
router.get("/get", checkAuth, getStoresByOwner);
router.get("/", getAllStores);
router.get("/getById/:id", getStoreById);
router.get("/:ownerId", getStoresByOwnerId);
router.patch("/update/:id", checkAuth, updateStore);
router.delete("/delete/:id", checkAuth, deleteStore);

export default router;
