// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express(); 
const PORT = 8080;

// Middlewares
app.use(cors()); 
app.use(bodyParser.json());

// Create a new user
app.post('/users', (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    res.status(201).json({ id: result.lastInsertRowid, username, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new todo list
app.post('/lists', (req, res) => {
  try {
    const { userId, title } = req.body;
    const result = db.query(
      'INSERT INTO todo_lists (user_id, title) VALUES (?, ?)',
      [userId, title]
    );
    res.status(201).json({ id: result.lastInsertRowid, userId, title });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all todo lists for a user
app.get('/lists/:userId', (req, res) => {
  try {
    const lists = db.get(
      'SELECT * FROM todo_lists WHERE user_id = ?',
      [req.params.userId]
    );
    res.json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new todo to a list
app.post('/todos', (req, res) => {
  try {
    const { listId, title, description, priority, dueDate } = req.body;
    const result = db.query(
      'INSERT INTO todos (list_id, title, description, priority, due_date) VALUES (?, ?, ?, ?, ?)',
      [listId, title, description, priority || 'medium', dueDate]
    );
    res.status(201).json({ 
      id: result.lastInsertRowid, 
      listId, 
      title, 
      description, 
      priority, 
      dueDate 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all todos in a list
app.get('/todos/:listId', (req, res) => {
  try {
    const todos = db.get(
      'SELECT * FROM todos WHERE list_id = ?',
      [req.params.listId]
    );
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update todo status
app.put('/todos/:id', (req, res) => {
  try {
    const { status } = req.body;
    db.query(
      'UPDATE todos SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, req.params.id]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete todo
app.delete('/todos/:id', (req, res) => {
  try {
    db.query('DELETE FROM todos WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
