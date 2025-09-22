import React from 'react';
import { Navigate } from 'react-router-dom';

const Champions: React.FC = () => {
  console.log('[Champions] Rendered');
  return <Navigate to="/" replace />;
};

export default Champions;