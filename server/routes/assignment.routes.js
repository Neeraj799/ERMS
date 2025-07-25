import express from "express";
import {
  createAssignment,
  deleteAssignment,
  getAllAssignments,
  updateAssignment,
} from "../controllers/assignment.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createAssignment);
router.get("/", authMiddleware, getAllAssignments);
router.patch("/update/:id", authMiddleware, updateAssignment);
router.delete("/delete/:id", authMiddleware, deleteAssignment);

export default router;
