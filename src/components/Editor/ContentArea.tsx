import React, { forwardRef, useEffect } from 'react';

interface ContentAreaProps {
  content: string;
  onChange: (content: string) => void;
}

const ContentArea = forwardRef<HTMLDivElement, ContentAreaProps>(
  ({ content, onChange }, ref) => {
    useEffect(() => {
      // Load saved content from localStorage on mount
      const savedContent = localStorage.getItem('editor-content');
      if (savedContent) {
        onChange(savedContent);
      }
    }, []);

    const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
      const newContent = event.currentTarget.innerHTML;
      onChange(newContent);
    };

    return (
      <div
        ref={ref}
        contentEditable
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: content }}
        className="min-h-[300px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 prose max-w-none"
        style={{ minHeight: '300px' }}
      />
    );
  }
);

ContentArea.displayName = 'ContentArea';

export default ContentArea;
