import React from 'react';

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  helpText?: string;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  rows = 4,
  helpText = '',
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-apple-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-4 py-2.5 border border-apple-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all duration-200 resize-none"
      />
      {helpText && (
        <p className="mt-1 text-xs text-apple-gray-500">{helpText}</p>
      )}
    </div>
  );
};
