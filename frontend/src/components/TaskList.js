import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import TaskForm from './TaskForm';

const API_URL = process.env.REACT_APP_API_URL;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/tasks`);
      console.log('Fetched tasks:', response.data);
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.response?.data?.error || err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title) => {
    try {
      console.log('Adding task:', title);
      setError(null);
      const response = await axios.post(`${API_URL}/tasks`, { title });
      console.log('Task added:', response.data);
      setTasks([response.data, ...tasks]);
    } catch (err) {
      console.error('Error adding task:', err);
      setError(err.response?.data?.error || err.message || 'Failed to add task');
      throw err; // Re-throw to handle in the form component
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) throw new Error('Task not found');
      
      console.log('Toggling task:', id, 'to', !completed);
      const response = await axios.put(`${API_URL}/tasks/${id}`, {
        title: task.title,
        completed: !completed
      });
      console.log('Task updated:', response.data);
      setTasks(tasks.map(task =>
        task.id === id ? response.data : task
      ));
    } catch (err) {
      console.error('Error toggling task:', err);
      setError(err.response?.data?.error || err.message || 'Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log('Deleting task:', id);
      await axios.delete(`${API_URL}/tasks/${id}`);
      console.log('Task deleted:', id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err.response?.data?.error || err.message || 'Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (loading) return <div className="loading">Loading tasks...</div>;

  return (
    <div className="task-list">
      <TaskForm onAdd={addTask} />
      
      {error && <div className="error">{error}</div>}
      
      <div className="filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''} 
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <div className="tasks">
        {filteredTasks.length === 0 ? (
          <div className="no-tasks">No tasks found</div>
        ) : (
          filteredTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
