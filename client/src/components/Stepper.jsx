import React from 'react';

function Stepper() {
  const stage = 3
  const getStepColor = (step) => {
    if (step > stage) return;

    switch (step) {
      case 1:
        return 'text-blue-600 dark:text-blue-500';
      case 2:
        return 'text-blue-600 dark:text-blue-500';
      case 3:
        return 'text-blue-600 dark:text-blue-500';
      case 4:
        return 'text-blue-600 dark:text-blue-500';
    }
  };

  return (
    <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      <li className={`flex items-center ${getStepColor(1)}`}>
        <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
          1
        </span>
        Project Started
        <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
        </svg>
      </li>
      <li className={`flex items-center ${getStepColor(2)}`}>
        <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
          2
        </span>
        Project Completed
        <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
        </svg>
      </li>
      <li className={`flex items-center ${getStepColor(3)}`}>
        <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
          3
        </span>
        Review
        <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
        </svg>
      </li>
      <li className={`flex items-center ${getStepColor(4)}`}>
        <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
          4
        </span>
        Changes
      </li>
      <li className={`flex items-center ${getStepColor(5)}`}>
        <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
          5
        </span>
        Completed
      </li>
    </ol>
  );
}

export default Stepper;
