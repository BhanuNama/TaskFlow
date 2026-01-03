export const filterTasks = (tasks, filter, searchQuery) => {
  const now = new Date().setHours(0, 0, 0, 0);
  let filtered = [...tasks];

  if (searchQuery.trim()) {
    filtered = filtered.filter(t => 
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  switch(filter) {
    case 'completed':
      return filtered.filter(t => t.isCompleted);
    case 'high':
      return filtered.filter(t => (t.priority || 'Medium') === 'High');
    case 'medium':
      return filtered.filter(t => (t.priority || 'Medium') === 'Medium');
    case 'low':
      return filtered.filter(t => (t.priority || 'Medium') === 'Low');
    case 'overdue':
      return filtered.filter(t => 
        t.dueDate && !t.isCompleted && new Date(t.dueDate).setHours(0,0,0,0) < now
      );
    default:
      return filtered;
  }
};

export const sortTasks = (tasks, sortBy) => {
  const sorted = [...tasks];

  switch(sortBy) {
    case 'dueDateNearToFar':
      return sorted.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

    case 'dueDateFarToNear':
      return sorted.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(b.dueDate) - new Date(a.dueDate);
      });

    case 'priorityHighToLow':
      const highToLow = { 'High': 1, 'Medium': 2, 'Low': 3 };
      return sorted.sort((a, b) => 
        highToLow[a.priority || 'Medium'] - highToLow[b.priority || 'Medium']
      );

    case 'priorityLowToHigh':
      const lowToHigh = { 'Low': 1, 'Medium': 2, 'High': 3 };
      return sorted.sort((a, b) => 
        lowToHigh[a.priority || 'Medium'] - lowToHigh[b.priority || 'Medium']
      );

    default:
      return sorted;
  }
};

export const getTaskCounts = (tasks) => {
  const now = new Date().setHours(0, 0, 0, 0);
  
  return {
    all: tasks.length,
    completed: tasks.filter(t => t.isCompleted).length,
    high: tasks.filter(t => (t.priority || 'Medium') === 'High').length,
    medium: tasks.filter(t => (t.priority || 'Medium') === 'Medium').length,
    low: tasks.filter(t => (t.priority || 'Medium') === 'Low').length,
    overdue: tasks.filter(t => 
      t.dueDate && !t.isCompleted && new Date(t.dueDate).setHours(0,0,0,0) < now
    ).length,
  };
};

