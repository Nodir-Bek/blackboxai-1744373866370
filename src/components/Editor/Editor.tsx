import React, { useState, useRef } from 'react';
import Toolbar from './Toolbar';
import ContentArea from './ContentArea';
import Preview from './Preview';

interface EditorProps {
  initialContent?: string;
}

const Editor: React.FC<EditorProps> = ({ initialContent = '' }) => {
  const [content, setContent] = useState(initialContent);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    // Save to localStorage for persistence
    localStorage.setItem('editor-content', newContent);
  };

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (contentRef.current) {
      handleContentChange(contentRef.current.innerHTML);
    }
  };

  const clearContent = () => {
    setContent('');
    localStorage.removeItem('editor-content');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
            <h1 className="text-xl font-semibold">HTML Editor</h1>
            <div className="space-x-2">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
              >
                {isPreviewMode ? 'Edit' : 'Preview'}
              </button>
              <button
                onClick={clearContent}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Toolbar */}
          {!isPreviewMode && (
            <Toolbar onCommand={handleCommand} />
          )}

          {/* Content Area / Preview */}
          <div className="p-4">
            {isPreviewMode ? (
              <Preview content={content} />
            ) : (
              <ContentArea
                ref={contentRef}
                content={content}
                onChange={handleContentChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
