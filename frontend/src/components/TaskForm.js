import React, { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setIsSubmitting(true);
      setError(null);
      await onAdd(title);
      setTitle('');
    } catch (err) {
      console.error('Error in TaskForm:', err);
      setError(err.response?.data?.error || err.message || 'Failed to add task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(null);
          }}
          placeholder="Add a new task..."
          disabled={isSubmitting}
          required
        />
        <button type="submit" disabled={isSubmitting || !title.trim()}>
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </div>
      {error && (
        <div className="error">
          Error: {error}
          {error.includes('Failed to add task') && (
            <div className="error-details">
              Please check if the server is running on port 5000
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default TaskForm;
