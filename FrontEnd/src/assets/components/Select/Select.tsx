import React from 'react';
import './Select.css';

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

const Select: React.FC<CustomSelectProps> = ({ label, options, ...props }) => {
  return (
    <div className="custom-select-container col-md-4">
    <div>{label && <label className="custom-select-label">{label}</label>}</div>
      <select className="custom-select" {...props}>
        <option value="">Selecione uma opção</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
