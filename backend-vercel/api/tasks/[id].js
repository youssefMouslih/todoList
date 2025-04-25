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

module.exports = async (req, res) => {
  try {
    // Handle CORS
    await handleCors(req, res);

    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Task ID is required' });
    }

    // PUT /api/tasks/[id]
    if (req.method === 'PUT') {
      const { completed } = req.body;
      if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed status must be a boolean' });
      }

      const result = db.prepare('UPDATE tasks SET completed = ? WHERE id = ?').run(completed ? 1 : 0, id);
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }

      const updatedTask = db.prepare('SELECT *, completed as "completed" FROM tasks WHERE id = ?').get(id);
      return res.json({
        ...updatedTask,
        completed: Boolean(updatedTask.completed)
      });
    }

    // DELETE /api/tasks/[id]
    if (req.method === 'DELETE') {
      const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
      return res.status(204).end();
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message || 'Something went wrong!' });
  }
};