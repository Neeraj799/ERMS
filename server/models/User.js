import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["engineer", "manager"],
      required: true,
    },

    //Engineer specific fields
    skills: [String],
    seniority: {
      type: String,
      enum: ["junior", "mid", "senior"],
      required: true,
    },
    maxCapacity: {
      type: Number,
      enum: [100, 50],
    },
    department: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
