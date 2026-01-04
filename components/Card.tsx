
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200/80 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
