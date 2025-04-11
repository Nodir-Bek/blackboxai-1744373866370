import React from 'react';

interface ToolbarProps {
  onCommand: (command: string, value?: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onCommand }) => {
  const formatBlock = (tag: string) => {
    onCommand('formatBlock', tag);
  };

  return (
    <div className="border-b border-gray-200 p-4 bg-gray-50 space-x-1 flex flex-wrap gap-2">
      {/* Text Formatting */}
      <div className="flex space-x-1">
        <button
          onClick={() => onCommand('bold')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bold"
        >
          <i className="fas fa-bold"></i>
        </button>
        <button
          onClick={() => onCommand('italic')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Italic"
        >
          <i className="fas fa-italic"></i>
        </button>
        <button
          onClick={() => onCommand('underline')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Underline"
        >
          <i className="fas fa-underline"></i>
        </button>
        <button
          onClick={() => onCommand('strikeThrough')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Strike Through"
        >
          <i className="fas fa-strikethrough"></i>
        </button>
      </div>

      {/* Text Alignment */}
      <div className="flex space-x-1">
        <button
          onClick={() => onCommand('justifyLeft')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Align Left"
        >
          <i className="fas fa-align-left"></i>
        </button>
        <button
          onClick={() => onCommand('justifyCenter')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Align Center"
        >
          <i className="fas fa-align-center"></i>
        </button>
        <button
          onClick={() => onCommand('justifyRight')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Align Right"
        >
          <i className="fas fa-align-right"></i>
        </button>
      </div>

      {/* Lists */}
      <div className="flex space-x-1">
        <button
          onClick={() => onCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bullet List"
        >
          <i className="fas fa-list-ul"></i>
        </button>
        <button
          onClick={() => onCommand('insertOrderedList')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Numbered List"
        >
          <i className="fas fa-list-ol"></i>
        </button>
      </div>

      {/* Headers */}
      <div className="flex space-x-1">
        <select
          onChange={(e) => formatBlock(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded bg-white"
        >
          <option value="">Format</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="p">Paragraph</option>
        </select>
      </div>

      {/* Links and Images */}
      <div className="flex space-x-1">
        <button
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) onCommand('createLink', url);
          }}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Insert Link"
        >
          <i className="fas fa-link"></i>
        </button>
        <button
          onClick={() => {
            const url = prompt('Enter image URL:');
            if (url) onCommand('insertImage', url);
          }}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Insert Image"
        >
          <i className="fas fa-image"></i>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
