import Assignment from "../models/Assignment.js";
import User from "../models/User.js";

const getAllEngineers = async (req, res) => {
  try {
    const engineers = await User.find({ role: "engineer" }).select("-password");

    return res.status(200).json({ success: true, data: engineers });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEngineerCapacity = async (req, res) => {
  try {
    const userId = req.params.id;
    const engineer = await User.findById(userId).select("-password");

    if (!engineer || engineer.role !== "engineer") {
      return res
        .status(404)
        .json({ success: false, message: "Engineer not found" });
    }

    const assignments = await Assignment.find({ engineerId: engineer._id });

    const totalAllocated = assignments.reduce(
      (sum, assignment) => sum + Number(assignment.allocationPercentage || 0),
      0
    );

    const maxCapacity = Number(engineer.maxCapacity) || 100;
    const available = Math.max(0, maxCapacity - totalAllocated);

    return res.status(200).json({
      success: true,
      data: engineer,
      totalAllocated,
      availableCapacity: available,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateEngineerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, skills, seniority, department, maxCapacity } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, skills, seniority, department, maxCapacity },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Engineer not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export { getAllEngineers, getEngineerCapacity, updateEngineerProfile };
