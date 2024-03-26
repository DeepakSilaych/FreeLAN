import React from 'react';

function ProgressBar({ startDate, endDate }) {
  const calculateProgress = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    const totalDuration = end - start;
    const elapsedDuration = today - start;
    const progress = (elapsedDuration / totalDuration) * 100;
    return Math.min(progress, 100); 
  };

  return (
    <>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-blue-700 dark:text-white">Tentative Deadline: {endDate}
        </span>
        <span className="text-sm font-medium text-blue-700 dark:text-white">{`${calculateProgress().toFixed(0)}%`}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
      </div>
    </>
  );
}

export default ProgressBar;
