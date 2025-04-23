# Project Content Overview

This document provides a detailed explanation of each component in the Todo List application, helping you understand the role and purpose of each file and directory.

## Project Root

- `docker-compose.yml`: Orchestrates the frontend and backend containers, defining how they should be built and run together.
- `BEGINNERS_GUIDE.md`: A step-by-step guide for developers new to web development, explaining project concepts and setup.
- `DEPLOYMENT.md` & `DEPLOYMENT_GUIDE.md`: Instructions and detailed guides for deploying the application to production environments.
- `README.md`: The main project documentation with setup instructions, features, and technical details.
- `LICENSE`: Contains the project's MIT license terms.

## Frontend (`/frontend`)

The client-side React application that users interact with.

### Source Code (`/frontend/src`)

#### Components (`/frontend/src/components`)
- `Task.js`: Individual task component that displays a single todo item with its title, completion status, and action buttons.
- `TaskForm.js`: Form component for creating new tasks, handling user input validation.
- `TaskList.js`: Container component that manages and displays the list of all tasks.

#### Other Source Files
- `App.js`: The root component that sets up routing and main application structure.
- `App.css`: Main application styles for consistent UI appearance.
- `index.js`: Application entry point that renders the React app.
- `index.css`: Global styles affecting the entire application.

#### Context (`/frontend/src/context`)
Contains React context providers for state management across components.

### Configuration Files
- `.env.development`: Environment variables for development mode.
- `.env.production`: Environment variables for production deployment.
- `Dockerfile`: Instructions for building the frontend container.
- `netlify.toml`: Configuration for Netlify deployment.
- `package.json`: Frontend dependencies and npm scripts.

### Public Assets (`/frontend/public`)
- Static files like favicon, index.html, and manifest.json.

## Backend (`/backend`)

The server-side Express.js application handling data and business logic.

### Core Files
- `index.js`: Main server file that sets up Express.js, routes, and middleware.
- `Dockerfile`: Instructions for building the backend container.
- `Procfile`: Configuration for Heroku deployment.
- `package.json`: Backend dependencies and npm scripts.

### Configuration (`/backend/config`)
- `db.js`: Database configuration and connection setup using SQLite.

### Data Storage (`/backend/data`)
- Contains the SQLite database file storing task information.

### Environment
- `.env.example`: Template for required environment variables.

## API Testing (`/bruno`)

Bruno API collection for testing backend endpoints.

### Test Files (`/bruno/bruno test`)
- `Create Task.bru`: Tests for task creation endpoint.
- `Delete Task.bru`: Tests for task deletion endpoint.
- `Get All Tasks.bru`: Tests for retrieving all tasks.
- `Update Task.bru`: Tests for task update endpoint.
- `bruno.json`: Bruno configuration settings.

## Key Features by Component

### Frontend Features
- Modern React components with hooks
- Responsive design with CSS
- Real-time task updates
- Error handling and loading states
- Environment-based configuration

### Backend Features
- RESTful API endpoints
- SQLite database integration
- CORS configuration
- Error handling middleware
- Environment variable support

### Development Tools
- Docker containerization
- Hot-reloading for development
- API testing suite
- Deployment configurations

## Component Relationships

1. Frontend components communicate with backend through API calls
2. Backend processes requests and interacts with SQLite database
3. Bruno tests verify API endpoint functionality
4. Docker manages development and production environments
5. Environment files configure different deployment scenarios

This structure enables a maintainable, scalable, and well-organized application that separates concerns while maintaining clear relationships between components.