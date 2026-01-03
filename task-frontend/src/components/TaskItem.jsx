import { useState } from 'react';
import Modal from './Modal';
import TaskModal from './TaskModal';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const colors = { High: 'bg-red-500', Medium: 'bg-yellow-500', Low: 'bg-green-500' };
  const borders = { High: 'border-red-500', Medium: 'border-yellow-500', Low: 'border-green-500' };
  const isOverdue = task.dueDate && !task.isCompleted && new Date(task.dueDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);

  return (
    <>
      <TaskModal isOpen={showEdit} onClose={() => setShowEdit(false)} task={task} onSave={onUpdate} />
      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)} title="Delete Task" 
        onConfirm={() => { onDelete(task._id); setShowDelete(false); }} confirmText="Delete">
        <p className="text-gray-600">Are you sure you want to delete this task? This action cannot be undone.</p>
      </Modal>

      <div className={`bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 ${task.isCompleted ? 'bg-green-50' : ''} ${task.isCompleted ? 'border-green-500' : borders[task.priority] || 'border-indigo-500'}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start flex-1">
            <input type="checkbox" checked={task.isCompleted} onChange={() => onUpdate(task._id, {...task, isCompleted: !task.isCompleted})} className="mt-1 mr-4 h-5 w-5 rounded cursor-pointer" />
            <div className="flex-1">
              <h3 className={`text-lg font-semibold mb-2 ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold">Priority:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold text-white uppercase ${colors[task.priority] || 'bg-gray-500'}`}>{task.priority}</span>
              </div>
              {task.description && <p className={`text-gray-600 mb-3 ${task.isCompleted ? 'line-through' : ''}`}>{task.description}</p>}
              {task.dueDate && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold">Due:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${isOverdue ? 'bg-red-500 text-white' : 'bg-blue-100 text-blue-800'}`}>
                    {new Date(task.dueDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                    {isOverdue && ' - OVERDUE!'}
                  </span>
                </div>
              )}
              <p className="text-xs text-gray-400">Created: {new Date(task.createdAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</p>
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <button onClick={() => setShowEdit(true)} className="text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
            <button onClick={() => setShowDelete(true)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
