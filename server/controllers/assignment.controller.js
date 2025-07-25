import Assignment from "../models/Assignment.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

const createAssignment = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      engineerId,
      projectId,
      allocationPercentage,
      startDate,
      endDate,
      role,
    } = req.body;

    const user = await User.findById(userId);

    if (!user || user.role !== "manager") {
      return res.status(404).json({
        success: false,
        message: "Only manager can create assignment",
      });
    }

    const engineer = await User.findById(engineerId);

    if (!engineer || engineer.role !== "engineer") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid engineer" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid project" });
    }

    const existingAssignments = await Assignment.find({ engineerId });
    const totalAllocated = existingAssignments.reduce(
      (sum, a) => sum + a.allocationPercentage,
      0
    );

    const available = engineer.maxCapacity - totalAllocated;
    if (allocationPercentage > available) {
      return res.status(400).json({
        success: false,
        message: `Only ${available}% capacity is available`,
      });
    }

    const newAssignment = new Assignment({
      engineerId,
      projectId,
      allocationPercentage,
      startDate,
      endDate,
      role,
    });

    await newAssignment.save();

    return res.status(201).json({ success: true, data: newAssignment });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({})
      .populate("engineerId", "name email")
      .populate("projectId", "name status");

    return res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;

    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user || user.role !== "manager") {
      return res.status(404).json({
        success: false,
        message: "Only manager can update assignment",
      });
    }
    const {
      engineerId,
      projectId,
      allocationPercentage,
      startDate,
      endDate,
      role,
    } = req.body;

    const updatedData = await Assignment.findByIdAndUpdate(
      assignmentId,
      {
        engineerId,
        projectId,
        allocationPercentage,
        startDate,
        endDate,
        role,
      },
      {
        new: true,
      }
    );

    if (!updatedData) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    }

    return res.status(200).json({
      success: true,
      data: updatedData,
      message: "Assignment updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;

    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user || user.role !== "manager") {
      return res.status(404).json({
        success: false,
        message: "Only manager can delete assignment",
      });
    }

    const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);

    if (!deletedAssignment) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Assignment deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export {
  createAssignment,
  getAllAssignments,
  updateAssignment,
  deleteAssignment,
};
