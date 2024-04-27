const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.put("/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });
  res.status(200).json(updatedTodo);
});

router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json("Todo Deleted");
});
module.exports = router;
