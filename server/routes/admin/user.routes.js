import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../controllers/admin/user.controller.js";
import { checkAdmin } from "../../middlewares/chekAdmin.js";
import { checkAuth } from "../../middlewares/chekAuth.js";

const router = express.Router();

router.post("/", createUser); // Создание пользователя
router.get("/", getAllUsers); // Получение всех пользователей
router.get("/:id", getUserById); // Получение пользователя по ID
router.patch("/:id", updateUser); // Обновление пользователя
router.delete("/:id", deleteUser); // Удаление пользователя

export default router;
