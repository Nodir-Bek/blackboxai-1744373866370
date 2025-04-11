import Editor from './components/Editor/Editor';
import './styles/editor.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold text-gray-800">Custom HTML Editor</h1>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Editor initialContent="<h1>Welcome to the HTML Editor!</h1><p>Start editing your content here...</p>" />
      </main>
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-3 text-center text-gray-600">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}

export default App
