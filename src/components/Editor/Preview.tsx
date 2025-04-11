import React from 'react';

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  return (
    <div 
      className="prose max-w-none p-4 border border-gray-200 rounded-lg min-h-[300px]"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Preview;
