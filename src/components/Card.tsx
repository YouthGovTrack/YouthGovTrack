import React, { ReactNode } from 'react';

type CardProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

const Card: React.FC<CardProps> = ({ title, description, children }) => (
  <div className="bg-white border rounded-lg shadow p-6">
    <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
    {description && <p className="text-gray-600 mb-2">{description}</p>}
    {children}
  </div>
);

export default Card; 