import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
      </header>
      <main>
        <TaskList />
      </main>
      <footer className="App-footer">
        <p>Developed by Youssef Mouslih</p>
      </footer>
    </div>
  );
}

export default App;
