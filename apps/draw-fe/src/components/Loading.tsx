import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p className="text-lg font-semibold text-gray-700">Loading...</p>
    </div>
  );
};

export default Loading;