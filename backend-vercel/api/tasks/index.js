const cors = require('cors');
const Database = require('better-sqlite3');

// Initialize database
const db = new Database('./data/tasks.db');

// Configure CORS
const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
});

// Helper to handle CORS
const handleCors = (req, res) => new Promise((resolve, reject) => {
  corsMiddleware(req, res, (result) => {
    if (result instanceof Error) {
      return reject(result);
    }
    return resolve(result);
  });
});

// Initialize database table
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = async (req, res) => {
  try {
    // Handle CORS
    await handleCors(req, res);

    // GET /api/tasks
    if (req.method === 'GET') {
      const tasks = db.prepare('SELECT *, completed as "completed" FROM tasks ORDER BY created_at DESC').all()
        .map(task => ({
          ...task,
          completed: Boolean(task.completed)
        }));
      return res.json(tasks);
    }

    // POST /api/tasks
    if (req.method === 'POST') {
      const { title } = req.body;
      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Task title is required' });
      }
      
      const result = db.prepare('INSERT INTO tasks (title) VALUES (?)').run(title.trim());
      const newTask = db.prepare('SELECT *, completed as "completed" FROM tasks WHERE id = ?').get(result.lastInsertRowid);
      return res.status(201).json({
        ...newTask,
        completed: Boolean(newTask.completed)
      });
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message || 'Something went wrong!' });
  }
};