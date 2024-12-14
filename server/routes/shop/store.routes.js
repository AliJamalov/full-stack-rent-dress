import express from "express";
import {
  createStore,
  getStoreById,
  getStoresByOwner,
  updateStore,
  deleteStore,
} from "../../controllers/shop/store.controller.js";
import { checkAuth } from "../../middlewares/chekAuth.js";

const router = express.Router();

router.post("/add", checkAuth, createStore); // Создать магазин
router.get("/get", checkAuth, getStoresByOwner); // Получить все магазины владельца
router.get("/getById/:id", checkAuth, getStoreById); // Получить магазин по ID
router.patch("/update/:id", checkAuth, updateStore); // Обновить магазин
router.delete("/delete/:id", checkAuth, deleteStore); // Удалить магазин

export default router;
