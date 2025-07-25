import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getAllEngineers,
  getEngineerCapacity,
  updateEngineerProfile,
} from "../controllers/engineer.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getAllEngineers);
router.get("/capacity/:id", authMiddleware, getEngineerCapacity);
router.patch("/update/:id", authMiddleware, updateEngineerProfile);
export default router;
