import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';
import { showSuccess, showError } from '../utils/toast';
import AuthContext from '../context/AuthContext';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${user?.token}` }
  });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (error) {
      showError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const saveTask = async (id, taskData) => {
    try {
      if (id) {
        const { data } = await api.put(`/tasks/${id}`, taskData);
        setTasks(tasks.map(t => t._id === id ? data : t));
        showSuccess('Task updated!');
      } else {
        const { data } = await api.post('/tasks', taskData);
        setTasks([data, ...tasks]);
        showSuccess('Task created!');
      }
    } catch (error) {
      showError('Failed to save task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      showSuccess('Task deleted!');
    } catch (error) {
      showError('Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, saveTask, deleteTask, fetchTasks };
};

