import Editor from './components/Editor/Editor';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold text-gray-800">Custom HTML Editor</h1>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Editor />
      </main>
    </div>
  );
}

export default App;
