import React, { ReactNode } from 'react';

type FilterBarProps = {
  children?: ReactNode;
};

const FilterBar: React.FC<FilterBarProps> = ({ children }) => (
  <div className="bg-gray-50 p-4 rounded shadow-sm flex flex-wrap gap-4 items-center">
    {/* TODO: Add filter controls here */}
    {children || <span className="text-gray-400">Filter controls go here</span>}
  </div>
);

export default FilterBar; 