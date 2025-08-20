import React from 'react';

/**
 * Loading spinner component that displays a centered spinning animation
 * Used to indicate loading states throughout the application
 */
const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );
};

export default Loader;
