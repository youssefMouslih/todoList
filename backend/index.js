// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express(); 
const PORT = 3001;

// Middlewares
app.use(cors()); 
app.use(bodyParser.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
};

// Task validation middleware
const validateTask = (req, res, next) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Task title is required' });
  }
  next();
};

// Get all tasks
app.get('/api/tasks', (req, res) => {
  console.log('GET /api/tasks - Fetching all tasks');
  try {
    const tasks = db.prepare('SELECT *, completed as "completed" FROM tasks ORDER BY created_at DESC').all()
      .map(task => ({
        ...task,
        completed: Boolean(task.completed)
      }));
    console.log('Tasks fetched:', tasks);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get task by ID
app.get('/api/tasks/:id', (req, res) => {
  console.log(`GET /api/tasks/${req.params.id} - Fetching task`);
  try {
    const task = db.prepare('SELECT *, completed as "completed" FROM tasks WHERE id = ?').get(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.completed = Boolean(task.completed);
    console.log('Task fetched:', task);
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new task
app.post('/api/tasks', validateTask, (req, res) => {
  console.log('POST /api/tasks - Creating new task:', req.body);
  try {
    const { title } = req.body;
    const stmt = db.prepare('INSERT INTO tasks (title, completed) VALUES (?, ?)');
    const result = stmt.run(title, 0);
    
    const newTask = {
      id: result.lastInsertRowid,
      title,
      completed: false
    };
    console.log('Task created:', newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update task by ID
app.put('/api/tasks/:id', validateTask, (req, res) => {
  console.log(`PUT /api/tasks/${req.params.id} - Updating task:`, req.body);
  try {
    const { title, completed } = req.body;
    const stmt = db.prepare('UPDATE tasks SET title = ?, completed = ? WHERE id = ?');
    const result = stmt.run(title, completed ? 1 : 0, req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const updatedTask = {
      id: parseInt(req.params.id),
      title,
      completed
    };
    console.log('Task updated:', updatedTask);
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete task by ID
app.delete('/api/tasks/:id', (req, res) => {
  console.log(`DELETE /api/tasks/${req.params.id} - Deleting task`);
  try {
    const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    console.log('Task deleted successfully');
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: error.message });
  }
});

// Apply error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Test database connection
  try {
    const testQuery = db.prepare('SELECT 1').get();
    console.log('Database connection successful:', testQuery);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
});
