import React from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  onClick?: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 bg-[#137DFF] text-white rounded-md hover:bg-[#137DFF]/90 focus:outline-none focus:ring-2 focus:ring-[#137DFF] focus:ring-offset-2 transition-colors duration-200"
      aria-label="Share form"
    >
      <Share2 className="h-5 w-5" />
      <span>Share</span>
    </button>
  );
};

export default ShareButton;