const Sidebar = ({ activeFilter, onFilterChange, taskCounts }) => {
  const Icon = ({ d }) => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    </svg>
  );

  const filters = [
    { id: 'all', label: 'All Tasks ', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', count: taskCounts.all, color: 'indigo' },
    { id: 'completed', label: 'Completed', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', count: taskCounts.completed, color: 'green' },
    { id: 'high', label: 'High Priority', icon: 'M5 10l7-7m0 0l7 7m-7-7v18', count: taskCounts.high, color: 'red' },
    { id: 'medium', label: 'Medium Priority', icon: 'M5 12h14', count: taskCounts.medium, color: 'yellow' },
    { id: 'low', label: 'Low Priority', icon: 'M19 14l-7 7m0 0l-7-7m7 7V3', count: taskCounts.low, color: 'green' },
    { id: 'overdue', label: 'Overdue', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', count: taskCounts.overdue, color: 'red' },
  ];

  const getColorClass = (color, type) => {
    const colors = {
      indigo: { text: 'text-indigo-600', bg: 'bg-indigo-50', active: 'bg-indigo-100 border-indigo-500' },
      green: { text: 'text-green-600', bg: 'bg-green-50', active: 'bg-green-100 border-green-500' },
      red: { text: 'text-red-600', bg: 'bg-red-50', active: 'bg-red-100 border-red-500' },
      yellow: { text: 'text-yellow-600', bg: 'bg-yellow-50', active: 'bg-yellow-100 border-yellow-500' },
    };
    return colors[color][type];
  };

  return (
    <div className="w-64 bg-white shadow-lg rounded-lg p-4 h-fit sticky top-4">
      <h2 className="text-lg font-bold text-gray-800 mb-4 px-2">Filters</h2>
      <div className="space-y-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button key={filter.id} onClick={() => onFilterChange(filter.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 border-transparent ${
                isActive ? getColorClass(filter.color, 'active') : 'hover:bg-gray-50'
              }`}>
              <div className="flex items-center gap-3">
                <span className={isActive ? getColorClass(filter.color, 'text') : 'text-gray-500'}>
                  <Icon d={filter.icon} />
                </span>
                <span className={`font-medium ${isActive ? getColorClass(filter.color, 'text') : 'text-gray-700'}`}>
                  {filter.label}
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                isActive ? `${getColorClass(filter.color, 'bg')} ${getColorClass(filter.color, 'text')}` : 'bg-gray-100 text-gray-600'
              }`}>
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
