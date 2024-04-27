const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// Create a new todo
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update todo details
router.put("/:id", async (req, res) => {
  try {
    // Update todo details in the database
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete todo
router.delete("/:id", async (req, res) => {
  try {
    // Delete todo from the database
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json("Todo deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


// import packages
// Prepare routing  CRUD
// export