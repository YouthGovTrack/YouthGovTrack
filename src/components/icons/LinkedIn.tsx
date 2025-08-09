import React from 'react';

interface LinkedInProps {
  className?: string;
  size?: number;
}

const LinkedIn: React.FC<LinkedInProps> = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="currentColor"
      />
      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
    </svg>
  );
};

export default LinkedIn;
