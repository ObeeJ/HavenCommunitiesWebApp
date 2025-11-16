import React from 'react';
import { Download } from 'lucide-react';

interface BrochureDownloadProps {
  className?: string;
  variant?: 'button' | 'link';
}

export const BrochureDownload: React.FC<BrochureDownloadProps> = ({ 
  className = '',
  variant = 'button'
}) => {
  const brochureUrl = 'https://liwyceceoqtivgujyjkz.supabase.co/storage/v1/object/public/HC%20storage/brochures/EDEN%20BROCHURE_251116_083227-compressed.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = brochureUrl;
    link.download = 'EDEN-Brochure.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (variant === 'link') {
    return (
      <button
        onClick={handleDownload}
        className={`text-blue-500 hover:text-blue-700 underline flex items-center gap-2 ${className}`}
      >
        <Download size={16} />
        Download Brochure
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      className={`flex items-center gap-2 px-6 py-3 bg-[#155eef] text-white rounded-lg hover:bg-[#1247c2] transition-colors font-medium ${className}`}
    >
      <Download size={18} />
      Download Brochure
    </button>
  );
};
