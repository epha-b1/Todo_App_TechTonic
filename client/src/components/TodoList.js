import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TodoList.css"

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleEditTodo = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/todos/${id}`,
        updatedData
      );
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, ...updatedData } : todo
        )
      );
      setEditingTodo(null);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await axios.post("http://localhost:8000/todos", {
        title: newTitle,
        description: newDescription,
      });
      setTodos([...todos, response.data]);
      setNewTitle("");
      setNewDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleEditButtonClick = (todo) => {
    setEditingTodo(todo);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setEditedTitle("");
    setEditedDescription("");
  };

  const handleSaveEdit = () => {
    handleEditTodo(editingTodo._id, {
      title: editedTitle,
      description: editedDescription,
    });
  };

  return (
    <div className="todo-container">
      <div className="add-todo">
        <h2>Add Todo</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <h2>Todo List</h2>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id}>
            {editingTodo === todo ? (
              // Editing mode
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              // Viewing mode
              <>
                <strong>{todo.title}</strong>: {todo.description}
                <button onClick={() => handleEditButtonClick(todo)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteTodo(todo._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
