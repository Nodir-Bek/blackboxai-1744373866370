import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import { useEditor } from '../../hooks/useEditor';
import Toolbar from './Toolbar';
import ContentArea from './ContentArea';
import Preview from './Preview';
import '../../styles/editor.css';

interface EditorProps {
  initialContent?: string;
}

const Editor: React.FC<EditorProps> = ({ initialContent = '' }) => {
  const {
    content,
    isSourceView,
    canUndo,
    canRedo,
    editorRef,
    updateContent,
    toggleSourceView,
    execCommand,
    undo,
    redo,
  } = useEditor(initialContent);

  useEffect(() => {
    // Load saved content from localStorage on mount
    const savedContent = localStorage.getItem('editor-content');
    if (savedContent) {
      updateContent(savedContent);
    }
  }, []);

  useEffect(() => {
    // Highlight source code when in source view
    if (isSourceView) {
      Prism.highlightAll();
    }
  }, [isSourceView, content]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
            <h1 className="text-xl font-semibold">HTML Editor</h1>
            <div className="space-x-2">
              <button
                onClick={toggleSourceView}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
              >
                {isSourceView ? 'Visual Editor' : 'Source Code'}
              </button>
              <button
                onClick={() => updateContent('')}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <Toolbar 
            onCommand={execCommand}
            onUndo={undo}
            onRedo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
            isSourceView={isSourceView}
          />

          {/* Content Area */}
          <div className="p-4">
            {isSourceView ? (
              <pre className="prism-editor">
                <code className="language-markup">{content}</code>
              </pre>
            ) : (
              <ContentArea
                ref={editorRef}
                content={content}
                onChange={updateContent}
              />
            )}
          </div>

          {/* Preview (shown in source view) */}
          {isSourceView && (
            <div className="border-t border-gray-200 p-4">
              <h2 className="text-lg font-semibold mb-2">Preview</h2>
              <Preview content={content} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
