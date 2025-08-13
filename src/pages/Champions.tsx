import React, { useEffect } from 'react';

interface ChampionsProps {
  onNavigate: (page: string, projectId?: number) => void;
}

const Champions: React.FC<ChampionsProps> = ({ onNavigate }) => {
  // Redirect to community page with champions tab active
  useEffect(() => {
    onNavigate('community');
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Redirecting to Community...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
};

export default Champions;
