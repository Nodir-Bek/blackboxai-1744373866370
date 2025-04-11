import React, { forwardRef, useEffect, useCallback } from 'react';

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

    const handleInput = useCallback((event: React.FormEvent<HTMLDivElement>) => {
      const newContent = event.currentTarget.innerHTML;
      onChange(newContent);
    }, [onChange]);

    const handlePaste = useCallback((event: React.ClipboardEvent) => {
      event.preventDefault();
      const text = event.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    }, []);

    const handleDrop = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      
      if (files.length > 0 && files[0].type.startsWith('image/')) {
        const file = files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const img = document.createElement('img');
          img.src = e.target?.result as string;
          img.alt = file.name;
          img.className = 'max-w-full h-auto';
          
          const selection = window.getSelection();
          const range = selection?.getRangeAt(0);
          range?.insertNode(img);
          range?.collapse(false);
        };
        
        reader.readAsDataURL(file);
      }
    }, []);

    const handleDragOver = useCallback((event: React.DragEvent) => {
      event.preventDefault();
    }, []);

    return (
      <div
        ref={ref}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        dangerouslySetInnerHTML={{ __html: content }}
        className="editor-content prose max-w-none"
        style={{ minHeight: '300px' }}
        spellCheck
      />
    );
  }
);

ContentArea.displayName = 'ContentArea';

export default ContentArea;
