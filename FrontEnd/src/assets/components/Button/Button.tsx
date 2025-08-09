import React from 'react';
import './Button.css';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.FC<CustomButtonProps> = ({ label, ...props }) => {
  return (
    <button className="custom-button col-md-12" {...props}>
      {label}
    </button>
  );
};

export default Button;
