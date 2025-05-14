import React, { useEffect, useRef } from 'react';
import { Type, AlignLeft, ListOrdered, Mail, Phone, MapPin, Link2, Upload, Camera, CheckSquare, List, Hash } from 'lucide-react';

interface FormElementsMenuProps {
  onClose: () => void;
  onSelect: (type: string) => void;
}

const FormElementsMenu: React.FC<FormElementsMenuProps> = ({ onClose, onSelect }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const elements = [
    {
      title: 'Contact Info',
      items: [
        { icon: <Type className="h-5 w-5" />, label: 'First Name', type: 'first_name' },
        { icon: <Type className="h-5 w-5" />, label: 'Second Name', type: 'second_name' },
        { icon: <Mail className="h-5 w-5" />, label: 'Email ID', type: 'email' },
        { icon: <Phone className="h-5 w-5" />, label: 'Phone Number', type: 'phone' },
        { icon: <MapPin className="h-5 w-5" />, label: 'Address', type: 'address' },
        { icon: <Link2 className="h-5 w-5" />, label: 'Website Link', type: 'website' },
      ]
    },
    {
      title: 'Choice Fields',
      items: [
        { icon: <ListOrdered className="h-5 w-5" />, label: 'Multiple Choice', type: 'multiple_choice' },
        { icon: <List className="h-5 w-5" />, label: 'Dropdown', type: 'dropdown' },
        { icon: <CheckSquare className="h-5 w-5" />, label: 'Yes/No', type: 'yes_no' },
        { icon: <CheckSquare className="h-5 w-5" />, label: 'Checkbox', type: 'checkbox' },
      ]
    },
    {
      title: 'Text Fields',
      items: [
        { icon: <AlignLeft className="h-5 w-5" />, label: 'Long Answer', type: 'long_text' },
        { icon: <Type className="h-5 w-5" />, label: 'Short Answer', type: 'short_text' },
        { icon: <Hash className="h-5 w-5" />, label: 'Numerical', type: 'numerical' },
      ]
    },
    {
      title: 'Uploads',
      items: [
        { icon: <Upload className="h-5 w-5" />, label: 'Upload File', type: 'file_upload' },
        { icon: <Camera className="h-5 w-5" />, label: 'Take a photo', type: 'photo' },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={menuRef}
        className="bg-white rounded-lg shadow-xl border border-gray-200 w-[500px] p-6 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-6">Form Elements</h2>
        <div className="space-y-6">
          {elements.map((section, index) => (
            <div key={index}>
              <h3 className="text-[#137DFF] font-semibold mb-3">{section.title}</h3>
              <div className="grid grid-cols-2 gap-2">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={() => onSelect(item.type)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-left"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FormElementsMenu;