import express from "express";
import { fetchStats } from "../../controllers/admin/stats.controller.js";
import { checkAdmin } from "../../middlewares/chekAdmin.js";

const router = express.Router();

router.get("/", fetchStats);

export default router;
