import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import envConfig from "../server/config/envConfig.js";
import authRoutes from "../server/routes/auth.routes.js";
import engineerRoutes from "../server/routes/engineer.routes.js";
import projectRoutes from "../server/routes/project.routes.js";
import assignmentRoutes from "../server/routes/assignment.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(envConfig.db.URL)
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

const PORT = envConfig.general.PORT || 4800;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/user", authRoutes);
app.use("/api/engineer", engineerRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/assignment", assignmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
