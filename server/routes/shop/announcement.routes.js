import express from "express";
import {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
  getUserAnnouncements,
} from "../../controllers/shop/announcement.controller.js";
import { checkAuth } from "../../middlewares/chekAuth.js";

const router = express.Router();

router.post("/", checkAuth, createAnnouncement); // Создание объявления
router.get("/", getAllAnnouncements); // Получение всех объявлений (можно добавить фильтры)
router.get("/byUser", checkAuth, getUserAnnouncements);
router.get("/:id", getAnnouncementById); // Получение объявления по ID
router.patch("/:id", checkAuth, updateAnnouncement); // Обновление объявления
router.delete("/:id", checkAuth, deleteAnnouncement); // Удаление объявления

export default router;
