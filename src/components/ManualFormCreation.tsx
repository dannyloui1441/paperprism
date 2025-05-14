import React, { useState, useRef } from 'react';
import { ArrowLeft, Plus, GripVertical, X, Upload, Bold, Italic, Underline, Eye, Share2, Settings, Trash2, Lock, Type, ChevronLeft, ChevronRight } from 'lucide-react';
import FormElementsMenu from './FormElementsMenu';
import ShareButton from './ShareButton';

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  description?: string;
  question: string;
}

interface Section {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

interface ManualFormCreationProps {
  onBack: () => void;
}

const ManualFormCreation: React.FC<ManualFormCreationProps> = ({ onBack }) => {
  const [title, setTitle] = useState('New Form');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState<Section[]>([
    {
      id: crypto.randomUUID(),
      title: 'Section 1',
      description: '',
      fields: []
    }
  ]);
  const [showElementsMenu, setShowElementsMenu] = useState(false);
  const [opacity, setOpacity] = useState(100);
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [selectedField, setSelectedField] = useState<{sectionId: string; fieldId: string} | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const colors = [
    '#137DFF', '#000000', '#00BCD4', '#4CAF50', '#FF9800',
    '#E91E63', '#9C27B0', '#2196F3', '#FF4081', '#795548'
  ];

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const scrollAmount = 200;
      tabsContainerRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  const addSection = () => {
    const newSection: Section = {
      id: crypto.randomUUID(),
      title: `Section ${sections.length + 1}`,
      description: '',
      fields: []
    };
    setSections([...sections, newSection]);
    setActiveSection(newSection.id);
  };

  const updateSection = (id: string, updates: Partial<Section>) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, ...updates } : section
    ));
  };

  const removeSection = (id: string) => {
    if (sections.length > 1) {
      setSections(sections.filter(section => section.id !== id));
      if (activeSection === id) {
        setActiveSection(sections[0].id);
      }
      if (selectedField?.sectionId === id) {
        setSelectedField(null);
      }
    }
  };

  const addField = (type: string) => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      type,
      label: '',
      required: false,
      placeholder: '',
      description: '',
      question: '',
      ...(type === 'multiple_choice' ? { options: ['Option 1'] } : {})
    };
    
    setSections(sections.map(section =>
      section.id === activeSection
        ? { ...section, fields: [...section.fields, newField] }
        : section
    ));
    setShowElementsMenu(false);
    setSelectedField({ sectionId: activeSection, fieldId: newField.id });
  };

  const updateField = (sectionId: string, fieldId: string, updates: Partial<FormField>) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            fields: section.fields.map(field =>
              field.id === fieldId
                ? {
                    ...field,
                    ...updates,
                    label: updates.question
                      ? generateLabelFromQuestion(updates.question)
                      : field.label
                  }
                : field
            )
          }
        : section
    ));
  };

  const generateLabelFromQuestion = (question: string): string => {
    let label = question.replace(/[?!.,]/g, '');
    
    label = label
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim();
    
    return label.length > 50 ? `${label.slice(0, 47)}...` : label;
  };

  const removeField = (sectionId: string, fieldId: string) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? { ...section, fields: section.fields.filter(field => field.id !== fieldId) }
        : section
    ));
    if (selectedField?.fieldId === fieldId) {
      setSelectedField(null);
    }
  };

  const handleShare = () => {
    console.log('Share clicked');
  };

  const getSelectedField = () => {
    if (!selectedField) return null;
    const section = sections.find(s => s.id === selectedField.sectionId);
    if (!section) return null;
    return section.fields.find(f => f.id === selectedField.fieldId);
  };

  const renderFieldEditor = () => {
    const field = getSelectedField();
    if (!field) return null;

    return (
      <div className="space-y-6 animate-fade-in p-4">
        <h2 className="text-lg font-semibold">Edit Field</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Fonts</label>
            <div className="flex gap-2">
              <select className="flex-1 bg-gray-100 rounded px-2 py-1 text-sm">
                <option>Inter</option>
              </select>
              <select className="w-16 bg-gray-100 rounded px-2 py-1 text-sm">
                <option>18</option>
              </select>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Bold className="h-4 w-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Italic className="h-4 w-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Underline className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Opacity</label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm w-16 text-right">{opacity}%</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Colors</label>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className="w-8 h-8 rounded-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Element Type</label>
            <select className="w-full bg-gray-100 rounded px-3 py-2 text-sm">
              <option>First Name</option>
              <option>Second Name</option>
              <option>Email</option>
              <option>Phone</option>
              <option>Website</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Required</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateField(selectedField!.sectionId, field.id, { required: !field.required })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  field.required ? 'bg-[#137DFF]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    field.required ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <button
                onClick={() => removeField(selectedField!.sectionId, field.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-[#137DFF] transition-colors duration-200"
              title="Go Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-semibold border-0 focus:ring-0 bg-transparent"
            />
          </div>
          <div className="flex items-center gap-4">
            <button 
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
              title="Preview Form"
            >
              <Eye className="h-5 w-5" />
            </button>
            <ShareButton onClick={handleShare} />
            <button 
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
              title="Form Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto px-6 relative">
          <div className="flex items-center">
            <button
              onClick={() => scrollTabs('left')}
              className="p-1 text-gray-600 hover:text-[#137DFF] focus:outline-none"
              aria-label="Scroll tabs left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div 
              ref={tabsContainerRef}
              className="flex-1 overflow-x-auto scrollbar-hide flex items-center space-x-1 py-2"
              style={{ scrollBehavior: 'smooth' }}
            >
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    px-4 py-2 rounded-md whitespace-nowrap transition-all duration-200
                    ${activeSection === section.id
                      ? 'bg-[#137DFF] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                  aria-selected={activeSection === section.id}
                  role="tab"
                >
                  {section.title}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollTabs('right')}
              className="p-1 text-gray-600 hover:text-[#137DFF] focus:outline-none"
              aria-label="Scroll tabs right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <button
              onClick={addSection}
              className="ml-4 px-4 py-2 text-[#137DFF] hover:bg-[#137DFF]/5 rounded-md transition-colors duration-200 flex items-center gap-2"
              aria-label="Add new section"
            >
              <Plus className="h-5 w-5" />
              <span>Add Section</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          <div className="w-64 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Questions List</h2>
            </div>
            <div className="p-4">
              {sections.map((section) => (
                section.fields.length > 0 && (
                  <div key={section.id} className="mb-4">
                    {section.fields.map((field) => (
                      <div
                        key={field.id}
                        onClick={() => setSelectedField({ sectionId: section.id, fieldId: field.id })}
                        className={`py-2 px-3 rounded mb-2 cursor-pointer transition-all duration-300 ${
                          selectedField?.fieldId === field.id
                            ? 'bg-[#137DFF]/10 border-[#137DFF] shadow-sm'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Type className="h-4 w-4 text-gray-400" />
                          <span>{field.label || 'Untitled Question'}</span>
                        </div>
                        {field.required && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                            <Lock className="h-3 w-3" />
                            Required
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-8">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`bg-white rounded-lg shadow-sm p-8 border-2 ${
                    activeSection === section.id ? 'border-[#137DFF]' : 'border-transparent'
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <div className="flex justify-between items-center mb-4">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(section.id, { title: e.target.value })}
                      className="text-xl font-semibold border-0 focus:ring-0"
                      placeholder="Section Title"
                    />
                    {sections.length > 1 && (
                      <button
                        onClick={() => removeSection(section.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  <textarea
                    value={section.description}
                    onChange={(e) => updateSection(section.id, { description: e.target.value })}
                    placeholder="Section description"
                    className="w-full border-0 focus:ring-0 resize-none mb-6"
                    rows={2}
                  />

                  {section.fields.map((field) => (
                    <div
                      key={field.id}
                      onClick={() => setSelectedField({ sectionId: section.id, fieldId: field.id })}
                      className={`mb-6 p-4 border rounded-lg transition-all duration-300 ${
                        selectedField?.fieldId === field.id
                          ? 'border-[#007bff] shadow-[0_0_8px_rgba(0,0,0,0.1)]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <textarea
                        value={field.question}
                        onChange={(e) => updateField(section.id, field.id, { question: e.target.value })}
                        className="w-full border rounded-md p-3 focus:ring-1 focus:ring-[#137DFF] focus:border-[#137DFF] min-h-[72px] text-gray-700 resize-y mb-2"
                        placeholder="Enter your question here..."
                        rows={3}
                      />
                      
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(section.id, field.id, { label: e.target.value })}
                        className="w-full border-0 focus:ring-0 text-sm text-gray-500"
                        placeholder="Field Label (auto-generated from question)"
                      />
                      
                      {field.description && (
                        <p className="text-sm text-gray-500 mt-2">{field.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="w-64 bg-white rounded-lg shadow-sm">
            <div className="p-4">
              {selectedField ? renderFieldEditor() : (
                <div className="space-y-6">
                  <h2 className="font-semibold text-gray-900">Theme</h2>
                  <div>
                    <h3 className="text-sm font-medium mb-2">General Theme</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600">Fonts</label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                          <option>Inter</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded" title="Bold">
                          <Bold className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded" title="Italic">
                          <Italic className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded" title="Underline">
                          <Underline className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Company Logo</h3>
                    <button 
                      className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-[#137DFF] transition-colors"
                      title="Upload Company Logo"
                    >
                      <div className="text-center">
                        <Upload className="h-6 w-6 mx-auto text-gray-400" />
                        <span className="text-sm text-gray-500 mt-2">Import your Company Logo</span>
                      </div>
                    </button>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Opacity</h3>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={opacity}
                      onChange={(e) => setOpacity(parseInt(e.target.value))}
                      className="w-full"
                      title={`Opacity: ${opacity}%`}
                    />
                    <div className="text-right text-sm text-gray-600">{opacity}%</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showElementsMenu && (
        <FormElementsMenu
          onClose={() => setShowElementsMenu(false)}
          onSelect={addField}
        />
      )}

      <button
        onClick={() => setShowElementsMenu(true)}
        className="fixed bottom-8 right-8 bg-[#137DFF] text-white w-14 h-14 rounded-lg shadow-lg flex items-center justify-center hover:bg-[#137DFF]/90 transition-colors duration-200"
        title="Add Form Element"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}

export default ManualFormCreation;