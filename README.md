# Todo List Application

A full-stack task management application built with React (frontend) and Express.js (backend).

## Project Structure

```
todoList/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Task.js
│   │   │   ├── TaskForm.js
│   │   │   └── TaskList.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── backend/          # Express.js backend
│   ├── config/
│   │   └── db.js    # Database configuration
│   ├── data/
│   │   └── tasks.db # SQLite database
│   └── index.js     # Main server file
└── bruno/           # API testing collection
    └── tasks/       # Task-related API tests

```

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed/incomplete
- Filter tasks by status (All/Active/Completed)
- Modern UI with loading states and error handling
- SQLite database for data persistence

## Tech Stack

- **Frontend:**
  - React
  - Axios for API calls
  - CSS for styling

- **Backend:**
  - Express.js
  - SQLite (better-sqlite3)
  - CORS for cross-origin requests

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Start the backend server:
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:3001
   ```

4. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   # Frontend runs on http://localhost:3000
   ```

## API Endpoints

All API endpoints are prefixed with `/api`

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Testing with Bruno

The project includes a Bruno API collection for testing the backend endpoints.

1. Open Bruno app
2. Open the collection from `/Users/useraccount/Desktop/todoList/bruno`
3. Available test endpoints:
   - Get All Tasks (GET)
   - Create Task (POST)
   - Update Task (PUT)
   - Delete Task (DELETE)

## Error Handling

- Frontend displays user-friendly error messages
- Backend includes comprehensive error logging
- Database operations are wrapped in try-catch blocks
- Input validation for task creation/updates

## Database Schema

```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Future Enhancements

- User authentication
- Task categories/tags
- Due dates for tasks
- Task priority levels
- Search functionality
- Dark mode theme

## Contributing

Feel free to fork this repository and submit pull requests. If you have any suggestions or improvements, please create an issue or reach out!

## License

This project is licensed under the MIT License.
