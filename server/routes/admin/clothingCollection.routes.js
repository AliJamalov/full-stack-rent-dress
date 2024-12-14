import express from "express";
import {
  getAllClothingCollections,
  getClothingCollectionById,
  updateClothingCollection,
  deleteClothingCollection,
  createClothingCollection,
} from "../../controllers/admin/clothingCollection.controller.js";
import { checkAdmin } from "../../middlewares/chekAdmin.js";

const router = express.Router();

router.post("/", createClothingCollection); // Создание коллекции
router.get("/", getAllClothingCollections); // Получение всех коллекций
router.get("/:id", getClothingCollectionById); // Получение коллекции по ID
router.patch("/:id", updateClothingCollection); // Обновление коллекции
router.delete("/:id", deleteClothingCollection); // Удаление коллекции

export default router;
