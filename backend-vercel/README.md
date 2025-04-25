# Todo List Backend (Vercel)

This is the Vercel-compatible backend for the Todo List application, implemented using serverless functions.

## Features

- Serverless API endpoints for task management
- SQLite database for data persistence
- CORS support for frontend integration
- Environment variables configuration

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/[id]` - Update a task's completion status
- `DELETE /api/tasks/[id]` - Delete a task

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   CORS_ORIGIN=http://localhost:3000
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Configure environment variables in Vercel:
   ```bash
   vercel env add CORS_ORIGIN
   ```

3. Deploy to Vercel:
   ```bash
   npm run deploy
   ```

## Database

The application uses SQLite with `better-sqlite3`. The database file will be created automatically in the `data` directory.

## Notes

- Make sure to update the `CORS_ORIGIN` environment variable to match your frontend URL in production
- The SQLite database is stored in the `data` directory, which needs to be created before running the application