import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../controllers/admin/category.controller.js";
import { checkAdmin } from "../../middlewares/chekAdmin.js";

const router = express.Router();

router.post("/", createCategory); // Создать категорию
router.get("/", getAllCategories); // Получить все категории
router.get("/:id", getCategoryById); // Получить категорию по ID
router.patch("/:id", updateCategory); // Обновить категорию
router.delete("/:id", deleteCategory); // Удалить категорию

export default router;
