import React from 'react';

interface CreationOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const CreationOption: React.FC<CreationOptionProps> = ({ 
  icon, 
  title, 
  description, 
  onClick 
}) => {
  return (
    <button 
      className="bg-gray-100 rounded-lg p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#137DFF]/5 group"
      onClick={onClick}
    >
      <div className="flex justify-center mb-6">
        <div className="text-[#137DFF] transition-transform duration-300 group-hover:scale-125">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#137DFF] transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-600 text-sm group-hover:text-[#137DFF]/80 transition-colors duration-300">
        {description}
      </p>
    </button>
  );
};

export default CreationOption;