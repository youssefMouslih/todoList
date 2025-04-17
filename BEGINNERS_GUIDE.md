# Todo List Application - Beginner's Guide 🚀

Welcome to your first full-stack project! This guide will help you get started, even if you're completely new to web development.

## 📚 Table of Contents
1. [What You'll Need](#what-youll-need)
2. [Getting Started](#getting-started)
3. [Running the Application](#running-the-application)
4. [Using the Application](#using-the-application)
5. [Testing the API](#testing-the-api)
6. [Common Issues & Solutions](#common-issues--solutions)
7. [Project Structure Explained](#project-structure-explained)

## 🛠 What You'll Need

Before starting, let's install some tools on your computer:

1. **Node.js and npm** (Node Package Manager)
   - Go to https://nodejs.org/
   - Click the big green button that says "LTS" (Long Term Support)
   - After installing, check if it worked:
     - Windows: Open Command Prompt
     - Mac/Linux: Open Terminal
     - Type these commands:
     ```bash
     node --version
     npm --version
     ```
     - If you see numbers like `v16.14.0`, it worked! 🎉

2. **Git** (Version Control)
   - Go to https://git-scm.com/
   - Download for your system (Windows/Mac/Linux)
   - After installing, check if it worked:
     ```bash
     git --version
     ```
     - If you see a number like `2.35.1`, you're good! 👍

3. **Visual Studio Code** (Code Editor)
   - Go to https://code.visualstudio.com/
   - Click Download
   - It makes coding much easier with colors and helpful features!

## 🚀 Getting Started

### Step 1: Get the Code

1. **Create a Folder for Your Projects**
   - Windows:
     - Open File Explorer
     - Go to Documents
     - Create a new folder called "Projects"
   
   - Mac:
     - Open Finder
     - Go to Documents
     - Create a new folder called "Projects"

2. **Get the Code from GitHub**
   - Open Terminal (Mac/Linux) or Command Prompt (Windows)
   - Type these commands:
     ```bash
     # Go to your Projects folder
     cd Documents/Projects

     # Get the code
     git clone https://github.com/youssefMouslih/todoList.git

     # Go into the project folder
     cd todoList
     ```

### Step 2: Install Dependencies (The Building Blocks)

1. **Set Up the Backend**
   ```bash
   # Go to backend folder
   cd backend

   # Install what we need
   npm install
   ```
   - Wait until you see a success message
   - If you see warnings (yellow text), that's okay!

2. **Set Up the Frontend**
   ```bash
   # Go back to main folder
   cd ..

   # Go to frontend folder
   cd frontend

   # Install what we need
   npm install
   ```
   - This might take a few minutes
   - Warnings are okay here too!

## 🎯 Running the Application

### Step 1: Start the Backend (Server)

1. Open a new terminal/command prompt
2. Type these commands:
   ```bash
   # Go to the backend folder
   cd Documents/Projects/todoList/backend

   # Start the server
   npm start
   ```
3. You should see a message saying the server is running
4. ⚠️ Keep this window open!

### Step 2: Start the Frontend (Website)

1. Open another terminal/command prompt (keep the first one running!)
2. Type these commands:
   ```bash
   # Go to the frontend folder
   cd Documents/Projects/todoList/frontend

   # Start the website
   npm start
   ```
3. Your web browser should open automatically
4. You should see the Todo List application! 🎉

## 💻 Using the Application

### Adding a Task
1. Click the text box where it says "Enter a task..."
2. Type something like "Buy groceries"
3. Click "Add Task" or press Enter
4. Your task appears in the list! ✨

### Marking a Task as Done
1. Find your task in the list
2. Click the checkbox ☐ next to it
3. The task gets crossed out ✅

### Removing a Task
1. Find the task you want to remove
2. Click the "Delete" button next to it
3. The task disappears 🗑️

## 🧪 Testing the API with Bruno

Bruno helps us test if our server (backend) is working correctly:

1. **Get Bruno**
   - Go to https://www.usebruno.com/downloads
   - Download and install it

2. **Open Our Tests**
   - Open Bruno
   - Click "Open Collection"
   - Find your Projects folder
   - Go to todoList → bruno
   - Click Open

3. **Try the Tests**
   - You'll see different tests like:
     - Get All Tasks
     - Create Task
     - Update Task
     - Delete Task
   - Click "Send" on each one to see what happens!

## ❗ Common Problems & Solutions

### "npm not found"
- Did you install Node.js?
- Try closing and reopening your terminal
- Try typing `node --version` to see if Node.js is installed

### "Port 3000 is already in use"
- Click 'Y' when it asks to use a different port
- Or close other applications that might be running

### "Cannot connect to database"
- Don't worry! The database creates itself
- Make sure the backend is running
- Check if the backend/data folder exists

### "Module not found"
- Go to the right folder (frontend or backend)
- Type `npm install` again
- If that doesn't work, delete the node_modules folder and try `npm install` again

## 📁 What's Where in Our Project

```
todoList/
├── frontend/          # The website part
│   ├── src/          # Where the code lives
│   │   ├── components/   # Different parts of the website
│   │   │   ├── Task.js      # How each task looks
│   │   │   ├── TaskForm.js  # The form to add tasks
│   │   │   └── TaskList.js  # The list of all tasks
│   │   ├── App.js      # The main website
│   │   └── App.css     # Makes it look pretty
│   └── package.json    # List of what we need
├── backend/           # The server part
│   ├── config/       # Settings
│   │   └── db.js    # Database setup
│   ├── data/        # Where tasks are stored
│   └── index.js     # The main server
└── bruno/            # Our tests
    └── tasks/       # Different test files
```

## 🤝 Need Help?

If something's not working:
1. Check the Common Problems section above
2. Look for error messages (the red text)
3. Make sure both the backend and frontend are running
4. Try closing everything and starting again

## 🌟 What's Next?

Once you're comfortable, try adding these features:
1. Add due dates to tasks
2. Create different lists for different types of tasks
3. Add a search box to find tasks
4. Add a dark mode
5. Add user accounts

Remember:
- Take your time
- It's okay to make mistakes
- Google is your friend
- Have fun! 🎉

Happy coding! 🚀
