import React, { useState } from 'react';
import type { EditorCommand } from '../../hooks/useEditor';

interface ToolbarProps {
  onCommand: (command: EditorCommand) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isSourceView: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onCommand,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  isSourceView
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorType, setColorType] = useState<'foreColor' | 'backColor'>('foreColor');

  const formatBlock = (tag: string) => {
    onCommand({ name: 'formatBlock', value: tag });
  };

  const insertTable = () => {
    const size = prompt('Enter table size (rows x columns)', '3x3');
    if (size && /^\d+x\d+$/.test(size)) {
      onCommand({ name: 'insertTable', value: size });
    }
  };

  if (isSourceView) return null;

  return (
    <div className="editor-toolbar">
      {/* History Controls */}
      <div className="flex space-x-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="history-button"
          title="Undo"
        >
          <i className="fas fa-undo"></i>
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="history-button"
          title="Redo"
        >
          <i className="fas fa-redo"></i>
        </button>
      </div>

      {/* Text Formatting */}
      <div className="flex space-x-1">
        <button
          onClick={() => onCommand({ name: 'bold' })}
          className="toolbar-button"
          title="Bold"
        >
          <i className="fas fa-bold"></i>
        </button>
        <button
          onClick={() => onCommand({ name: 'italic' })}
          className="toolbar-button"
          title="Italic"
        >
          <i className="fas fa-italic"></i>
        </button>
        <button
          onClick={() => onCommand({ name: 'underline' })}
          className="toolbar-button"
          title="Underline"
        >
          <i className="fas fa-underline"></i>
        </button>
        <button
          onClick={() => onCommand({ name: 'strikeThrough' })}
          className="toolbar-button"
          title="Strike Through"
        >
          <i className="fas fa-strikethrough"></i>
        </button>
      </div>

      {/* Text Alignment */}
      <div className="flex space-x-1">
        <button
          onClick={() => onCommand({ name: 'justifyLeft' })}
          className="toolbar-button"
          title="Align Left"
        >
          <i className="fas fa-align-left"></i>
        </button>
        <button
          onClick={() => onCommand({ name: 'justifyCenter' })}
          className="toolbar-button"
          title="Align Center"
        >
          <i className="fas fa-align-center"></i>
        </button>
        <button
          onClick={() => onCommand({ name: 'justifyRight' })}
          className="toolbar-button"
          title="Align Right"
        >
          <i className="fas fa-align-right"></i>
        </button>
      </div>

      {/* Lists */}
      <div className="flex space-x-1">
        <button
          onClick={() => onCommand({ name: 'insertUnorderedList' })}
          className="toolbar-button"
          title="Bullet List"
        >
          <i className="fas fa-list-ul"></i>
        </button>
        <button
          onClick={() => onCommand({ name: 'insertOrderedList' })}
          className="toolbar-button"
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

      {/* Colors */}
      <div className="flex space-x-1">
        <div className="color-picker-wrapper">
          <button
            onClick={() => {
              setColorType('foreColor');
              setShowColorPicker(!showColorPicker);
            }}
            className="toolbar-button"
            title="Text Color"
          >
            <i className="fas fa-font"></i>
          </button>
          <button
            onClick={() => {
              setColorType('backColor');
              setShowColorPicker(!showColorPicker);
            }}
            className="toolbar-button"
            title="Background Color"
          >
            <i className="fas fa-fill-drip"></i>
          </button>
          {showColorPicker && (
            <div className="color-picker-popup">
              {['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'].map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    onCommand({ name: colorType, value: color });
                    setShowColorPicker(false);
                  }}
                  className="w-6 h-6 m-1 rounded"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Links and Images */}
      <div className="flex space-x-1">
        <button
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) onCommand({ name: 'createLink', value: url });
          }}
          className="toolbar-button"
          title="Insert Link"
        >
          <i className="fas fa-link"></i>
        </button>
        <button
          onClick={() => {
            const url = prompt('Enter image URL:');
            if (url) onCommand({ name: 'insertImage', value: url });
          }}
          className="toolbar-button"
          title="Insert Image"
        >
          <i className="fas fa-image"></i>
        </button>
        <button
          onClick={insertTable}
          className="toolbar-button"
          title="Insert Table"
        >
          <i className="fas fa-table"></i>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
