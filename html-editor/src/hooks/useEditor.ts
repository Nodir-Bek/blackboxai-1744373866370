import { useState, useCallback, useRef } from 'react';

interface EditorState {
  content: string;
  isSourceView: boolean;
  history: string[];
  currentIndex: number;
}

interface EditorCommand {
  name: string;
  value?: string;
}

export const useEditor = (initialContent: string = '') => {
  const [state, setState] = useState<EditorState>({
    content: initialContent,
    isSourceView: false,
    history: [initialContent],
    currentIndex: 0,
  });

  const editorRef = useRef<HTMLDivElement>(null);

  const updateContent = useCallback((newContent: string) => {
    setState(prev => {
      const newHistory = prev.history.slice(0, prev.currentIndex + 1);
      return {
        ...prev,
        content: newContent,
        history: [...newHistory, newContent],
        currentIndex: newHistory.length,
      };
    });
    localStorage.setItem('editor-content', newContent);
  }, []);

  const toggleSourceView = useCallback(() => {
    setState(prev => ({ ...prev, isSourceView: !prev.isSourceView }));
  }, []);

  const undo = useCallback(() => {
    setState(prev => {
      if (prev.currentIndex > 0) {
        const newIndex = prev.currentIndex - 1;
        return {
          ...prev,
          content: prev.history[newIndex],
          currentIndex: newIndex,
        };
      }
      return prev;
    });
  }, []);

  const redo = useCallback(() => {
    setState(prev => {
      if (prev.currentIndex < prev.history.length - 1) {
        const newIndex = prev.currentIndex + 1;
        return {
          ...prev,
          content: prev.history[newIndex],
          currentIndex: newIndex,
        };
      }
      return prev;
    });
  }, []);

  const execCommand = useCallback((command: EditorCommand) => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    
    switch (command.name) {
      case 'formatBlock':
        if (command.value) {
          const block = document.createElement(command.value);
          range?.surroundContents(block);
        }
        break;
      
      case 'createLink':
        if (command.value && range?.toString()) {
          const link = document.createElement('a');
          link.href = command.value;
          link.target = '_blank';
          range.surroundContents(link);
        }
        break;

      case 'insertImage':
        if (command.value) {
          const img = document.createElement('img');
          img.src = command.value;
          img.alt = 'Inserted image';
          range?.insertNode(img);
        }
        break;

      case 'insertTable':
        const rows = parseInt(command.value?.split('x')[0] || '2');
        const cols = parseInt(command.value?.split('x')[1] || '2');
        const table = document.createElement('table');
        table.className = 'editor-table';
        
        for (let i = 0; i < rows; i++) {
          const row = table.insertRow();
          for (let j = 0; j < cols; j++) {
            const cell = row.insertCell();
            cell.textContent = `Cell ${i+1}-${j+1}`;
          }
        }
        
        range?.insertNode(table);
        break;

      case 'foreColor':
      case 'backColor':
        if (command.value) {
          const span = document.createElement('span');
          span.style[command.name === 'foreColor' ? 'color' : 'backgroundColor'] = command.value;
          range?.surroundContents(span);
        }
        break;

      default:
        // For basic formatting (bold, italic, etc.)
        document.execCommand(command.name, false, command.value);
    }

    // Update content after command execution
    if (editorRef.current) {
      updateContent(editorRef.current.innerHTML);
    }
  }, [updateContent]);

  return {
    content: state.content,
    isSourceView: state.isSourceView,
    canUndo: state.currentIndex > 0,
    canRedo: state.currentIndex < state.history.length - 1,
    editorRef,
    updateContent,
    toggleSourceView,
    execCommand,
    undo,
    redo,
  };
};

export type { EditorCommand };
