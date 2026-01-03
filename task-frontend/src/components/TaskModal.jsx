import { useState, useEffect } from 'react';
import Modal from './Modal';

const TaskModal = ({ isOpen, onClose, onSave, task = null }) => {
  const [form, setForm] = useState({ title: '', description: '', priority: 'Medium', dueDate: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Medium',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
      });
    } else {
      setForm({ title: '', description: '', priority: 'Medium', dueDate: '' });
    }
  }, [task, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert('Please enter a task title');
    
    setLoading(true);
    const data = { ...form, title: form.title.trim() };
    if (!data.dueDate) delete data.dueDate;
    if (task) data.isCompleted = task.isCompleted;
    
    await onSave(task?._id, data);
    setLoading(false);
    onClose();
  };

  const input = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? 'Edit Task' : 'Create New Task'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Task title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className={input} required />
        <textarea placeholder="Description (optional)" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className={`${input} resize-none`} rows="4" />
        <div className="grid grid-cols-2 gap-4">
          <select value={form.priority} onChange={(e) => setForm({...form, priority: e.target.value})} className={input}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input type="date" value={form.dueDate} onChange={(e) => setForm({...form, dueDate: e.target.value})} className={input} />
        </div>
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg disabled:bg-indigo-400">
            {loading ? 'Saving...' : task ? 'Save Changes' : 'Create Task'}
          </button>
          <button type="button" onClick={onClose} className="px-6 bg-gray-200 hover:bg-gray-300 font-medium py-3 rounded-lg">Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;

