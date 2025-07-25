import express from "express";
import { getProfile, login, signup } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getProfile", authMiddleware, getProfile);

export default router;
