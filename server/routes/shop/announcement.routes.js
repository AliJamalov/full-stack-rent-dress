import express from "express";
import {
  createAnnouncement,
  getFilteredAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
  getUserAnnouncements,
  getStoreAnnouncements,
} from "../../controllers/shop/announcement.controller.js";
import { checkAuth } from "../../middlewares/chekAuth.js";

const router = express.Router();

router.post("/", checkAuth, createAnnouncement);
router.get("/", getFilteredAnnouncements);
router.get("/byUser", checkAuth, getUserAnnouncements);
router.get("/annId/:id", getAnnouncementById);
router.patch("/:id", checkAuth, updateAnnouncement);
router.delete("/:id", checkAuth, deleteAnnouncement);
router.get("/:userId", getStoreAnnouncements);

export default router;
