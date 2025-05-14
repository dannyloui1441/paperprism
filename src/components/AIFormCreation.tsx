import React, { useState } from 'react';
import { ArrowLeft, Wand2 } from 'lucide-react';

interface AIFormCreationProps {
  onBack: () => void;
}

const AIFormCreation: React.FC<AIFormCreationProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-[#137DFF] my-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Wand2 className="h-8 w-8 text-[#137DFF]" />
            <h1 className="text-3xl font-bold text-gray-900">Generate with AI</h1>
          </div>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                Describe your form
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#137DFF] focus:border-[#137DFF] transition-colors duration-200"
                placeholder="Example: Create a contact form with fields for name, email, phone number, and a message box..."
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Try these examples:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Create a job application form with personal details, experience, and education sections',
                  'Make a customer feedback form with rating scales and comment boxes',
                  'Design an event registration form with ticket options and dietary preferences',
                  'Build a survey about user experience with multiple choice questions'
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="w-full text-left p-3 rounded-md border border-gray-200 hover:border-[#137DFF] hover:bg-[#137DFF]/5 transition-all duration-200 text-sm text-gray-600 hover:text-[#137DFF]"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="w-full bg-[#137DFF] text-white py-3 px-4 rounded-md hover:bg-[#137DFF]/90 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!prompt.trim()}
            >
              <Wand2 className="h-5 w-5" />
              Generate Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIFormCreation;