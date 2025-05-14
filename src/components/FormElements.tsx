import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface FormElementProps {
  type: string;
  label: string;
  value: any;
  onChange: (value: any) => void;
  required?: boolean;
  options?: string[];
}

export const FormElement: React.FC<FormElementProps> = ({
  type,
  label,
  value,
  onChange,
  required = false,
  options = []
}) => {
  const [error, setError] = useState<string>('');

  const validateEmail = (email: string) => {
    if (!email.endsWith('.com')) {
      setError('Email must end with .com');
      return false;
    }
    setError('');
    return true;
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      setError('');
      return true;
    } catch {
      setError('Please enter a valid URL');
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    
    if (type === 'email') {
      validateEmail(newValue);
    } else if (type === 'website') {
      validateUrl(newValue);
    }
    
    onChange(newValue);
  };

  const renderInput = () => {
    switch (type) {
      case 'first_name':
      case 'second_name':
        return (
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-[#137DFF] focus:border-[#137DFF]"
            required={required}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            value={value}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-[#137DFF] focus:border-[#137DFF]"
            required={required}
          />
        );

      case 'phone':
        return (
          <PhoneInput
            country={'us'}
            value={value}
            onChange={(phone) => onChange(phone)}
            containerClass="w-full"
            inputClass="w-full px-3 py-2 border rounded-md focus:ring-[#137DFF] focus:border-[#137DFF]"
          />
        );

      case 'website':
        return (
          <input
            type="url"
            value={value}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-[#137DFF] focus:border-[#137DFF]"
            required={required}
          />
        );

      case 'multiple_choice':
        return (
          <div className="space-y-2">
            {options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(option)}
                  onChange={(e) => {
                    const newValue = Array.isArray(value) ? [...value] : [];
                    if (e.target.checked) {
                      newValue.push(option);
                    } else {
                      const index = newValue.indexOf(option);
                      if (index > -1) newValue.splice(index, 1);
                    }
                    onChange(newValue);
                  }}
                  className="rounded text-[#137DFF] focus:ring-[#137DFF]"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'dropdown':
        return (
          <select
            value={value}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-[#137DFF] focus:border-[#137DFF]"
            required={required}
          >
            <option value="">Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'yes_no':
        return (
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="yes"
                checked={value === 'yes'}
                onChange={() => onChange('yes')}
                className="text-[#137DFF] focus:ring-[#137DFF]"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="no"
                checked={value === 'no'}
                onChange={() => onChange('no')}
                className="text-[#137DFF] focus:ring-[#137DFF]"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        );

      case 'long_answer':
        return (
          <textarea
            value={value}
            onChange={handleChange}
            maxLength={200}
            rows={4}
            className="w-full px-3 py-2 border rounded-md focus:ring-[#137DFF] focus:border-[#137DFF]"
            required={required}
          />
        );

      case 'short_answer':
        return (
          <input
            type="text"
            value={value}
            onChange={handleChange}
            maxLength={20}
            className="w-full px-3 py-2 border rounded-md focus:ring-[#137DFF] focus:border-[#137DFF]"
            required={required}
          />
        );

      case 'numerical':
        return (
          <input
            type="number"
            value={value}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-[#137DFF] focus:border-[#137DFF]"
            required={required}
          />
        );

      case 'file_upload':
        return (
          <input
            type="file"
            onChange={(e) => onChange(e.target.files?.[0])}
            className="w-full px-3 py-2 border rounded-md focus:ring-[#137DFF] focus:border-[#137DFF]"
            required={required}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};