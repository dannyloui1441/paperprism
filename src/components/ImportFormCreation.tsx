import React from 'react';
import { ArrowLeft, Upload } from 'lucide-react';

interface ImportFormCreationProps {
  onBack: () => void;
}

const ImportFormCreation: React.FC<ImportFormCreationProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-[#137DFF] mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Import from Google Forms</h1>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="formUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Google Form URL
              </label>
              <input
                type="text"
                id="formUrl"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#137DFF] focus:border-[#137DFF] transition-colors duration-200"
                placeholder="https://docs.google.com/forms/..."
              />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-[#137DFF] transition-colors duration-200">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-[#137DFF] transition-colors duration-200" />
                <p className="mt-2 text-sm text-gray-600">
                  Or drag and drop a Google Form export file
                </p>
                <p className="text-xs text-gray-500">JSON format only</p>
              </div>
            </div>

            <button className="w-full bg-[#137DFF] text-white py-2 px-4 rounded-md hover:bg-[#137DFF]/90 transition-colors duration-200">
              Import Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportFormCreation;