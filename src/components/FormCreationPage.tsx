import React, { useState } from 'react';
import { MousePointer, Sparkles, Download } from 'lucide-react';
import CreationOption from './CreationOption';
import ManualFormCreation from './ManualFormCreation';
import AIFormCreation from './AIFormCreation';
import ImportFormCreation from './ImportFormCreation';

type CreationMethod = 'selection' | 'manual' | 'ai' | 'import';

const FormCreationPage: React.FC = () => {
  const [creationMethod, setCreationMethod] = useState<CreationMethod>('selection');

  const handleBack = () => setCreationMethod('selection');

  if (creationMethod === 'manual') {
    return <ManualFormCreation onBack={handleBack} />;
  }

  if (creationMethod === 'ai') {
    return <AIFormCreation onBack={handleBack} />;
  }

  if (creationMethod === 'import') {
    return <ImportFormCreation onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-[1200px] w-full mx-auto">
        <h1 className="text-4xl font-bold text-center mb-20">
          How do you want to create your form?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CreationOption 
            icon={<MousePointer className="h-8 w-8" />}
            title="Build your own form"
            description="Create a new form from scratch"
            onClick={() => setCreationMethod('manual')}
          />
          
          <CreationOption 
            icon={<Sparkles className="h-8 w-8" />}
            title="Generate it with AI"
            description="Describe the form you need, and our AI will create the fields for you."
            onClick={() => setCreationMethod('ai')}
          />
          
          <CreationOption 
            icon={<Download className="h-8 w-8" />}
            title="Import your questions"
            description="Copy questions from your Google Forms"
            onClick={() => setCreationMethod('import')}
          />
        </div>
      </div>
    </div>
  );
};

export default FormCreationPage;