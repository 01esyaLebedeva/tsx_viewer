import React, { useState, useRef } from 'react';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview } from "@codesandbox/sandpack-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Upload, Code, Edit } from 'lucide-react';

const PRELOAD_DEPENDENCIES = {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.309.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0"
};

const App: React.FC = () => {
  console.log('App component render START');
  const [originalCode, setOriginalCode] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const [showSource, setShowSource] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    console.log('handleFile called');
    const reader = new FileReader();
    reader.onload = (e) => {
      const code = e.target?.result as string;
      setOriginalCode(code);
      setFileName(file.name);
      setError(null);
      setShowSource(false);
      setShowEditor(false);
      setShowPreview(true);
      console.log('File loaded, setShowPreview(true)');
    };
    reader.onerror = () => setError('Ошибка чтения файла');
    reader.readAsText(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!fileName) {
    return (
      <div
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          height: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: '4px dashed #333',
          borderRadius: 8,
          backgroundColor: '#f0f0f0',
          color: '#555',
          textAlign: 'center',
          transition: 'background-color 0.3s',
          zIndex: 10
        }}
      >
        <Upload size={64} className="mb-4" />
        <h1 className="text-2xl font-bold">Перетащите TSX-файл сюда</h1>
        <p className="text-lg">или</p>
        <button
          onClick={triggerFileInput}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Выберите файл
        </button>
        <input type="file" ref={fileInputRef} onChange={onInput} accept=".tsx" style={{ display: 'none' }} />
      </div>
    );
  }

  const visiblePanels = [showSource, showEditor, showPreview].filter(Boolean).length;
  console.log('showSource', showSource, 'showEditor', showEditor, 'showPreview', showPreview, 'visiblePanels', visiblePanels);

  let singlePanel = null;
  if (visiblePanels === 1) {
    if (showSource) {
      singlePanel = (
        <div style={{ flexGrow: 1, height: '100%', overflow: 'auto', backgroundColor: '#1e1e1e' }}>
          <pre style={{ color: '#d4d4d4', padding: 16, margin: 0 }}>{originalCode}</pre>
        </div>
      );
    } else if (showEditor) {
      singlePanel = (
        <SandpackLayout style={{ flexGrow: 1, height: '100%' }}>
          <SandpackCodeEditor showLineNumbers={true} />
        </SandpackLayout>
      );
    } else if (showPreview) {
      singlePanel = (
        <div style={{ flexGrow: 1, minHeight: 0, minWidth: 0, width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <SandpackLayout style={{ flexGrow: 1, minHeight: 0, minWidth: 0, width: '100%', height: '100%' }}>
            <SandpackPreview style={{ flexGrow: 1, minHeight: 0, minWidth: 0, width: '100%', height: '100%' }} />
          </SandpackLayout>
        </div>
      );
    }
  }

  return (
    <>
      {/* Универсальный Sandpack-прогрев для ускорения первой загрузки */}
      <SandpackProvider
        template="react-ts"
        customSetup={{ dependencies: PRELOAD_DEPENDENCIES }}
        files={{ "/App.tsx": "export default () => null;" }}
        style={{ display: "none" }}
      >
        <SandpackPreview style={{ display: "none" }} />
      </SandpackProvider>
      {/* Основной интерфейс */}
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          backgroundColor: '#222',
          color: 'white',
          flexShrink: 0
        }}>
          <h1 className="text-lg font-bold mr-auto">TSX Viewer: {fileName}</h1>
          <div className="flex items-center gap-4">
            <button onClick={triggerFileInput} title="Загрузить новый файл" className="hover:text-blue-400 transition">
              <Upload size={20} />
            </button>
            <button onClick={() => setShowSource(!showSource)} title="Показать/скрыть исходный код" className={`hover:text-blue-400 transition ${showSource ? 'text-blue-400' : ''}`}>
              <Code size={20} />
            </button>
            <button onClick={() => setShowEditor(!showEditor)} title="Показать/скрыть редактор" className={`hover:text-blue-400 transition ${showEditor ? 'text-blue-400' : ''}`}>
              <Edit size={20} />
            </button>
          </div>
          <input type="file" ref={fileInputRef} onChange={onInput} accept=".tsx" style={{ display: 'none' }} />
        </header>

        <SandpackProvider
          template="react-ts"
          files={{ "/App.tsx": originalCode }}
          customSetup={{ dependencies: { "lucide-react": "^0.309.0" } }}
        >
          <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            {visiblePanels === 1
              ? singlePanel
              : (
                <PanelGroup
                  direction="horizontal"
                  style={{ flexGrow: 1, minHeight: 0 }}
                >
                  {showSource && (
                    <>
                      <Panel defaultSize={25} minSize={10}>
                        <div style={{ height: '100%', overflow: 'auto', backgroundColor: '#1e1e1e' }}>
                          <pre style={{ color: '#d4d4d4', padding: 16, margin: 0 }}>{originalCode}</pre>
                        </div>
                      </Panel>
                      <PanelResizeHandle style={{ width: '4px', background: '#444' }} />
                    </>
                  )}
                  {showEditor && (
                    <>
                      <Panel defaultSize={35} minSize={10}>
                        <SandpackLayout>
                          <SandpackCodeEditor showLineNumbers={true} />
                        </SandpackLayout>
                      </Panel>
                      <PanelResizeHandle style={{ width: '4px', background: '#444' }} />
                    </>
                  )}
                  {showPreview && (
                    <Panel defaultSize={100} minSize={10}>
                      <SandpackLayout>
                        <SandpackPreview style={{ height: '100%' }} />
                      </SandpackLayout>
                    </Panel>
                  )}
                </PanelGroup>
              )}
          </div>
        </SandpackProvider>
        {error && <div style={{ color: 'red', position: 'fixed', bottom: 0, left: 0, right: 0, background: 'black', padding: '8px' }}>Ошибка: {error}</div>}
      </div>
    </>
  );
};

export default App;