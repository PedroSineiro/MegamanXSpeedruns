import React from 'react';
import './Body.css';

interface BodyContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Body: React.FC<BodyContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`row top-spaced${className}`}>
      {children}
    </div>
  );
};

export default Body;
