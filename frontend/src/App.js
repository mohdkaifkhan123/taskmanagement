import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/tasks', newTask)
      .then(response => {
        alert(response.data.message);
        setNewTask({ title: '', description: '' });
        setTasks([...tasks, newTask]);
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
  };

  const handleUpdateStatus = (id, completed) => {
    axios.put(`/api/tasks/${id}`, { completed: !completed })
      .then(response => {
        alert(response.data.message);
        const updatedTasks = tasks.map(task => task.id === id ? { ...task, completed: !completed } : task);
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error('Error updating task status:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/tasks/${id}`)
      .then(response => {
        alert(response.data.message);
        const filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div>
      <h1>Task Management Application</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={newTask.title} placeholder="Title" onChange={handleChange} required />
        <input type="text" name="description" value={newTask.description} placeholder="Description" onChange={handleChange} required />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={() => handleUpdateStatus(task.id, task.completed)} />
            <span>{task.title}</span>
            <p>{task.description}</p>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
