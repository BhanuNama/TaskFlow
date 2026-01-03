import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TaskModal from '../components/TaskModal';
import TaskList from '../components/TaskList';
import AuthContext from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import { filterTasks, sortTasks, getTaskCounts } from '../utils/taskFilters';

const HomePage = () => {
  const [filter, setFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dueDateNearToFar');

  const { user } = useContext(AuthContext);
  const { tasks, loading, saveTask, deleteTask } = useTasks();

  useEffect(() => {
    if (['high', 'medium', 'low'].includes(filter) && 
        (sortBy === 'priorityHighToLow' || sortBy === 'priorityLowToHigh')) {
      setSortBy('dueDateNearToFar');
    }
  }, [filter, sortBy]);

  const getDisplayTasks = () => {
    const filtered = filterTasks(tasks, filter, searchQuery);
    return sortTasks(filtered, sortBy);
  };

  const titles = {
    all: 'All Tasks',
    completed: 'Missions Passed • Respect + 😎',
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority',
    overdue: 'You are Cooked Bro!'
  };

  return (
    <>
      <TaskModal 
        isOpen={showCreate} 
        onClose={() => setShowCreate(false)} 
        onSave={saveTask} 
      />
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 mt-16">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Hello, <span className="text-indigo-600">{user?.username || 'User'}</span> 👋
            </h1>
          </div>
          <div className="flex gap-6">
            <Sidebar 
              activeFilter={filter} 
              onFilterChange={setFilter} 
              taskCounts={getTaskCounts(tasks)} 
            />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{titles[filter]}</h1>
                  {filter === 'all' && (
                    <p className="text-indigo-600 font-medium text-lg mt-1">
                      what TO-DO what not TO-DO !
                    </p>
                  )}
                  {filter === 'overdue' && (
                    <p className="text-red-600 font-medium text-lg mt-1">
                      These are the overdues
                    </p>
                  )}
                </div>
                <button 
                  onClick={() => setShowCreate(true)} 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                >
                  <span className="text-2xl">+</span> Create Task
                </button>
              </div>
              <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search tasks by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  className="w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white"
                  >
                    <option value="dueDateNearToFar">By Due Date (Near to Far)</option>
                    <option value="dueDateFarToNear">By Due Date (Far to Near)</option>
                    {!['high', 'medium', 'low'].includes(filter) && (
                      <>
                        <option value="priorityHighToLow">By Priority (High to Low)</option>
                        <option value="priorityLowToHigh">By Priority (Low to High)</option>
                      </>
                    )}
                  </select>
              </div>
              {loading ? (
                <p className="text-center py-12 text-gray-600">Loading...</p>
              ) : (
                <TaskList 
                  tasks={getDisplayTasks()} 
                  onUpdate={saveTask} 
                  onDelete={deleteTask} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

