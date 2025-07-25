import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import envConfig from "../config/envConfig.js";
import User from "../models/user.js";

dotenv.config();

const seedEngineers = async () => {
  try {
    await mongoose.connect(envConfig.db.URL);
    console.log("Mongodb connected");

    await User.deleteMany({ role: "engineer" });

    const hashedPassword = await bcrypt.hash("password", 10);

    const engineers = [
      {
        name: "Rohith",
        email: "rohith@gmail.com",
        password: hashedPassword,
        role: "engineer",
        skills: ["React", "Node.js"],
        seniority: "mid",
        maxCapacity: 100,
        department: "Frontend",
      },
      {
        name: "Sachin",
        email: "sachin@gmail.com",
        password: hashedPassword,
        role: "manager",
        seniority: "senior",
      },
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: hashedPassword,
        role: "engineer",
        skills: ["React", "Node.js"],
        seniority: "mid",
        maxCapacity: 100,
        department: "Frontend",
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        password: hashedPassword,
        role: "engineer",
        skills: ["Python", "Django"],
        seniority: "senior",
        maxCapacity: 50,
        department: "Backend",
      },
      {
        name: "Charlie Doe",
        email: "charlie@example.com",
        password: hashedPassword,
        role: "engineer",
        skills: ["Java", "Spring Boot"],
        seniority: "junior",
        maxCapacity: 100,
        department: "Backend",
      },
    ];

    await User.insertMany(engineers);
    console.log("Engineers seeded successfully");

    process.exit();
  } catch (error) {
    console.log("Error seeding engineer:", error);
    process.exit(1);
  }
};

seedEngineers();
