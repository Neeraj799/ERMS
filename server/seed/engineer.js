// seed/engineer.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import envConfig from "../config/envConfig.js";
import User from "../models/user.js";
import Project from "../models/Project.js";
import Assignment from "../models/Assignment.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(envConfig.db.URL);
    console.log("✅ MongoDB connected");

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Assignment.deleteMany({});
    console.log("🧹 Existing data cleared");

    const hashedPassword = await bcrypt.hash("password", 10);

    // Seed users
    const rohith = await new User({
      name: "Rohith",
      email: "rohith@gmail.com",
      password: hashedPassword,
      role: "engineer",
      skills: ["React", "Node.js"],
      seniority: "mid",
      maxCapacity: 100,
      department: "Frontend",
    }).save();

    const sachin = await new User({
      name: "Sachin",
      email: "sachin@gmail.com",
      password: hashedPassword,
      role: "manager",
      seniority: "senior",
    }).save();

    const alice = await new User({
      name: "Alice Johnson",
      email: "alice@example.com",
      password: hashedPassword,
      role: "engineer",
      skills: ["React", "Node.js"],
      seniority: "mid",
      maxCapacity: 100,
      department: "Frontend",
    }).save();

    const bob = await new User({
      name: "Bob Smith",
      email: "bob@example.com",
      password: hashedPassword,
      role: "engineer",
      skills: ["Python", "Django"],
      seniority: "senior",
      maxCapacity: 50,
      department: "Backend",
    }).save();

    const charlie = await new User({
      name: "Charlie Doe",
      email: "charlie@example.com",
      password: hashedPassword,
      role: "engineer",
      skills: ["Java", "Spring Boot"],
      seniority: "junior",
      maxCapacity: 100,
      department: "Backend",
    }).save();

    console.log("✅ Users seeded");

    // Seed projects (fixed: added description, startDate, endDate, valid status)
    const project1 = await new Project({
      name: "Frontend Dashboard",
      description: "Build a dashboard UI for internal admin",
      managerId: sachin._id,
      requiredSkills: ["React"],
      teamSize: 2,
      startDate: new Date("2024-07-01"),
      endDate: new Date("2024-09-01"),
      status: "active", // ✅ must match enum
    }).save();

    const project2 = await new Project({
      name: "Backend API",
      description: "Develop scalable APIs for mobile and web",
      managerId: sachin._id,
      requiredSkills: ["Node.js", "MongoDB"],
      teamSize: 3,
      startDate: new Date("2024-07-10"),
      endDate: new Date("2024-10-01"),
      status: "active", // ✅ must match enum
    }).save();

    console.log("✅ Projects seeded");

    // Seed assignments
    await new Assignment({
      engineerId: rohith._id,
      projectId: project1._id,
      allocationPercentage: 50,
      startDate: new Date("2024-07-01"),
      endDate: new Date("2024-08-01"),
      role: "frontend developer",
    }).save();

    await new Assignment({
      engineerId: bob._id,
      projectId: project2._id,
      allocationPercentage: 100,
      startDate: new Date("2024-07-15"),
      endDate: new Date("2024-09-15"),
      role: "backend developer",
    }).save();

    console.log("✅ Assignments seeded");
    console.log("🎉 Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();
