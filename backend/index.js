// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); 
const PORT = 8080;

// Middlewares
app.use(cors()); 
app.use(bodyParser.json());

let todos = [];

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add new todo
app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = { id: Date.now(), task, done: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Toggle done
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  res.json({ success: true });
});

// Delete todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
