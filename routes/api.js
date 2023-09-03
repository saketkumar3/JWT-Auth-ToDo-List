const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const isAuth = require('../middleware/isAuth');

router.post("/task",isAuth , async (req, res) => {
  try {

    const userId =req.user.id; // Retrieve userId from decoded JWT token attached by isAuth middleware
    const newTaskReq = {
      taskName: req.body.taskName,
      createdBy: userId
    }

    const newTask = new Task(newTaskReq);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Could not create the task" });
  }
});

router.get("/task",isAuth, async (req, res) => {
  try {
    const userId =req.user.id;
    const tasks = await Task.find({createdBy: userId});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Could not retireve tasks" });
  }
});

router.put("/task/:taskId",isAuth, async (req, res) => {
  try {
    const { taskId } = req.params;
    const updateTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    res.json(updateTask);
  } catch (error) {
    res.status(500).json({ error: "Could not update task" });
  }
});

router.delete("/task/:taskId",isAuth, async (req, res) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndDelete(taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete task" });
  }
});

module.exports = router;
