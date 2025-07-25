import Project from "../models/Project.js";
import User from "../models/user.js";

const createProject = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user || user.role !== "manager") {
      return res
        .status(404)
        .json({ success: false, message: "Only manager can create project" });
    }

    const {
      name,
      description,
      startDate,
      endDate,
      requiredSkills,
      teamSize,
      status,
    } = req.body;

    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      requiredSkills,
      teamSize,
      status,
      managerId: userId,
    });

    await newProject.save();

    return res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});

    if (!projects) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProjectById = async (req, res) => {
  try {
    const userId = req.params.id;
    const project = await Project.findById(userId);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMachingEngineers = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const engineers = await User.find({ role: "engineer" });

    const matchingEngineers = engineers.filter((engineer) =>
      project.requiredSkills.some((skill) => engineer.skills.includes(skill))
    );

    return res.status(200).json({ success: true, data: matchingEngineers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createProject, getAllProjects, getProjectById, getMachingEngineers };
