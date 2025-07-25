import express from "express";
import {
  createProject,
  getAllProjects,
  getMachingEngineers,
  getProjectById,
} from "../controllers/project.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createProject);
router.get("/", authMiddleware, getAllProjects);
router.get("/:id", authMiddleware, getProjectById);
router.get("/matching-engineers/:id", authMiddleware, getMachingEngineers);

export default router;
