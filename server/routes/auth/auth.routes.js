import { Router } from "express";
import {
  register,
  login,
  getMe,
} from "../../controllers/auth/auth.controller.js";
import { checkAuth } from "../../middlewares/chekAuth.js";

const router = new Router();

router.post("/register", register);

router.post("/login", login);

router.get("/getMe", checkAuth, getMe);

export default router;
