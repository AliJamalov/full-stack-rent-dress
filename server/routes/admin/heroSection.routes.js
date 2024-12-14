import express from "express";
import {
  createHeroSection,
  getAllHeroSections,
  getHeroSectionById,
  updateHeroSection,
  deleteHeroSection,
} from "../../controllers/admin/heroSection.controller.js";
import { checkAdmin } from "../../middlewares/chekAdmin.js";

const router = express.Router();

router.post("/", createHeroSection); // Создание записи
router.get("/", getAllHeroSections); // Получение всех записей
router.get("/:id", getHeroSectionById); // Получение записи по ID
router.patch("/:id", updateHeroSection); // Обновление записи
router.delete("/:id", deleteHeroSection); // Удаление записи

export default router;
