import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Re-run Prism highlighting when content changes
    if (previewRef.current) {
      const codeElements = previewRef.current.getElementsByTagName('code');
      Array.from(codeElements).forEach(element => {
        Prism.highlightElement(element);
      });
    }
  }, [content]);

  // Function to sanitize HTML content
  const sanitizeContent = (html: string): string => {
    const div = document.createElement('div');
    div.innerHTML = html;

    // Remove potentially dangerous elements and attributes
    const scripts = div.getElementsByTagName('script');
    const iframes = div.getElementsByTagName('iframe');
    const objects = div.getElementsByTagName('object');
    const embeds = div.getElementsByTagName('embed');

    Array.from([...scripts, ...iframes, ...objects, ...embeds]).forEach(el => {
      el.remove();
    });

    // Remove dangerous attributes
    const allElements = div.getElementsByTagName('*');
    Array.from(allElements).forEach(el => {
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('on') || // Remove event handlers
            attr.name === 'href' && attr.value.startsWith('javascript:') || // Remove javascript: URLs
            attr.name === 'src' && attr.value.startsWith('javascript:')) {
          el.removeAttribute(attr.name);
        }
      });
    });

    return div.innerHTML;
  };

  return (
    <div 
      ref={previewRef}
      className="prose max-w-none p-4 border border-gray-200 rounded-lg min-h-[300px]"
      dangerouslySetInnerHTML={{ __html: sanitizeContent(content) }}
    />
  );
};

export default Preview;
