import React from 'react';
import './Input.css';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<CustomInputProps> = ({ label, ...props }) => {
  return (
    <div className="custom-input-container col-md-4">
      <div>{label && <label className="custom-input-label">{label}</label>}</div>
      <input className="custom-input" {...props} />
    </div>
  );
};

export default Input;
