import express from "express";
import Project from "../models/projectModel.js";

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Create new project
router.post("/", async (req, res) => {
  const { name, status } = req.body;
  const project = new Project({ name, status });
  await project.save();
  res.status(201).json(project);
});

export default router;
