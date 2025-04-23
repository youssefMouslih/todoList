# Todo List Application

> **New to web development?** Check out our [Beginner's Guide](BEGINNERS_GUIDE.md) for step-by-step instructions!

A full-stack task management application built with React (frontend) and Express.js (backend). This application provides a robust task management system with support for local development, Docker deployment, and cloud hosting on Heroku (backend) and Netlify (frontend).

## Project Structure

```
todoList/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Task.js
│   │   │   ├── TaskForm.js
│   │   │   └── TaskList.js
│   │   ├── context/        # React context providers
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── public/             # Static assets
│   ├── .env.development    # Development environment variables
│   ├── .env.production     # Production environment variables
│   ├── Dockerfile          # Frontend Docker configuration
│   ├── netlify.toml        # Netlify deployment configuration
│   └── package.json
├── backend/                # Express.js backend
│   ├── config/
│   │   └── db.js          # Database configuration
│   ├── data/
│   │   └── tasks.db       # SQLite database
│   ├── .env.example        # Environment variables template
│   ├── Dockerfile          # Backend Docker configuration
│   ├── Procfile           # Heroku deployment configuration
│   ├── index.js           # Main server file
│   └── package.json
├── bruno/                  # API testing collection
│   └── bruno test/         # Task-related API tests
│       ├── Create Task.bru
│       ├── Delete Task.bru
│       ├── Get All Tasks.bru
│       ├── Update Task.bru
│       └── bruno.json
├── docker-compose.yml      # Docker compose configuration
├── BEGINNERS_GUIDE.md     # Guide for new developers
├── DEPLOYMENT.md          # Deployment instructions
└── README.md              # Project documentation
```

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed/incomplete
- Filter tasks by status (All/Active/Completed)
- Modern UI with loading states and error handling
- SQLite database for data persistence

## Tech Stack

- **Frontend:**
  - React for UI components
  - Axios for API calls
  - CSS for styling
  - Environment variables for configuration
  - Netlify for deployment

- **Backend:**
  - Express.js server
  - SQLite (better-sqlite3) for data persistence
  - CORS for cross-origin requests
  - Environment variables for configuration
  - Heroku for deployment

## Getting Started

You can run this application either locally or using Docker.

### Local Development

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

### Docker Deployment

1. Make sure Docker Desktop is running
2. Build and start the containers:
   ```bash
   docker compose up --build
   ```
   This will:
   - Start the backend on http://localhost:3001
   - Start the frontend on http://localhost:3000
   - Enable hot-reloading for development
   - Automatically restart containers if they crash

3. To stop the application:
   ```bash
   docker compose down
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

## Production Deployment

This application is deployed using a monorepo strategy with the backend on Heroku and frontend on Netlify. For detailed deployment instructions and troubleshooting, check out our [Deployment Guide](DEPLOYMENT_GUIDE.md).

### Deployment URLs

- **Backend (Heroku)**: https://shielded-caverns-84788-7f4ec210a2ee.herokuapp.com/
- **Frontend (Netlify)**: https://glowing-cendol-2ed464.netlify.app

### Quick Deployment Steps

1. **Backend (Heroku)**
   - Create a Heroku account and install Heroku CLI
   - Create a new Heroku app
   - Set environment variables (PORT, CORS_ORIGIN)
   - Deploy using Git subtree: `git subtree push --prefix backend heroku main`

2. **Frontend (Netlify)**
   - Create a Netlify account
   - Build the frontend
   - Deploy using Netlify CLI
   - Configure environment variables (REACT_APP_API_URL)

## Troubleshooting

### Common Issues

1. **Frontend can't connect to backend**
   - Verify CORS_ORIGIN in backend matches Netlify URL
   - Check REACT_APP_API_URL in frontend environment
   - Ensure backend API is running

2. **Docker issues**
   - Ensure Docker Desktop is running
   - Check if ports 3000/3001 are available
   - Verify docker-compose.yml configuration

3. **Database errors**
   - Check file permissions for SQLite database
   - Verify database schema migrations
   - Ensure proper error handling

## Contributing

Feel free to fork this repository and submit pull requests. If you have any suggestions or improvements, please create an issue or reach out!

## License

This project is licensed under the MIT License.
