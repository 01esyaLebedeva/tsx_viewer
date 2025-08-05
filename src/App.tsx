import React, { useState, useRef, useEffect } from 'react';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview } from "@codesandbox/sandpack-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Upload, Code, Edit } from 'lucide-react';
import './index.css';
import { useTranslation, Trans } from 'react-i18next';
import { ipcRenderer } from 'electron'; // Import ipcRenderer
import i18n from './i18n'; // Import i18n instance

const PRELOAD_DEPENDENCIES = {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.309.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0"
};


const App: React.FC = () => {
  const { t } = useTranslation();
  const [originalCode, setOriginalCode] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showSource, setShowSource] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [isSourceActive, setIsSourceActive] = useState(false);
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // IPC Listener for locale updates
  useEffect(() => {
    const handleLocaleUpdate = (event: any, locale: string) => {
      console.log('Received locale:', locale); // For debugging
      i18n.changeLanguage(locale);
    };

    // Check if ipcRenderer is available (it might not be in a non-Electron environment)
    // Assuming preload script exposes ipcRenderer as window.electron.ipcRenderer
    if (window.Electron?.ipcRenderer) {
      window.Electron.ipcRenderer.on('locale-update', handleLocaleUpdate);
    }

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      if (window.Electron?.ipcRenderer) {
        window.Electron.ipcRenderer.removeListener('locale-update', handleLocaleUpdate);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const code = e.target?.result as string;
      setOriginalCode(code);
      setFileName(file.name);
      setError(null);
      setShowSource(false);
      setShowEditor(false);
      setShowPreview(true);
      setIsLoading(false);
    };
    reader.onerror = () => {
      setError('Ошибка чтения файла');
      setIsLoading(false);
    };
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
        id="dropzone-container"
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
        <h1 className="text-2xl font-bold"><Trans i18nKey="drag_tsx_file">Перетащите TSX-файл сюда</Trans></h1>
        <p style={{ fontSize: '3rem', margin: '0.5rem 0' }}>{t('or')}</p>
        <button
          id="choose-file-button"
          className="py-4 px-8 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          style={{ fontSize: '1.5rem', width: '300px', height: '100px' }}
          onClick={triggerFileInput}
        >
          {t('choose_file')}
        </button>
        <input id="file-input" type="file" ref={fileInputRef} onChange={onInput} accept=".tsx" style={{ display: 'none' }} />
      </div>
    );
  }


  return (
    <React.Fragment>
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
      <div id="main-app-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header id="app-header" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 8px',
          backgroundColor: '#222',
          color: 'white',
          flexShrink: 0
        }}>
          <button id="upload-new-file-button" onClick={triggerFileInput} title={t('upload_new_file')} className="hover:text-blue-400 transition header-icon-button">
                    <Upload />
                    </button>
          <h1 id="file-name-header" className="text-base font-bold">{t('tsx_viewer')}: {fileName}</h1>
          <div className="flex items-center gap-4">
            <button
                          id="toggle-source-code-button"
                          onClick={() => {
                            setShowSource(!showSource);
                            setIsSourceActive(!isSourceActive);
                          }}
                          title={t('show_hide_source_code')}
                          className={`p-1 rounded transition header-icon-button ${isSourceActive ? 'active' : ''}`}
                        >
                          <Code />
                        </button>
                        <button
                          id="toggle-editor-button"
                          onClick={() => {
                            setShowEditor(!showEditor);
                            setIsEditorActive(!isEditorActive);
                          }}
                          title={t('show_hide_editor')}
                          className={`p-1 rounded transition header-icon-button ${isEditorActive ? 'active' : ''}`}
                        >
                          <Edit />
                        </button>
          </div>
          <input id="file-input-header" type="file" ref={fileInputRef} onChange={onInput} accept=".tsx" style={{ display: 'none' }} />
        </header>

        <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <SandpackProvider
            template="react-ts"
            files={{ "/App.tsx": originalCode }}
            customSetup={{ dependencies: { "lucide-react": "^0.309.0" } }}
            style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
          >
            <PanelGroup
              direction="horizontal"
              style={{ height: '100%' }}
            >
              {showSource && (
                <>
                  <Panel id="source-code-panel" defaultSize={25} minSize={10}>
                    <div style={{ height: '100%', overflow: 'auto', backgroundColor: '#1e1e1e' }}>
                      <pre style={{ color: '#d4d4d4', padding: 16, margin: 0 }}>{originalCode}</pre>
                    </div>
                  </Panel>
                  <PanelResizeHandle style={{ width: '4px', background: '#444' }} />
                </>
              )}
              {showEditor && (
                <>
                  <Panel id="code-editor-panel" defaultSize={35} minSize={10}>
                    <SandpackLayout>
                      <SandpackCodeEditor showLineNumbers={true} />
                    </SandpackLayout>
                  </Panel>
                  <PanelResizeHandle style={{ width: '4px', background: '#444' }} />
                </>
              )}
              {showPreview && (
                <Panel id="preview-panel" defaultSize={100} minSize={10}>
                  <SandpackLayout>
                    <SandpackPreview style={{ height: '100%' }} />
                  </SandpackLayout>
                </Panel>
              )}
            </PanelGroup>
          </SandpackProvider>
        </div>
        {error && <div id="error-message-container" style={{ color: 'red', position: 'fixed', bottom: 0, left: 0, right: 0, background: 'black', padding: '8px' }}>{t('error')}: {error}</div>}
      </div>
      {isLoading && (
        <div id="loading-spinner" style={{
          position: 'absolute',
          top: '8px',
          right: 'calc(60px + 16px)',
          width: 'auto',
          height: 'auto',
          background: 'transparent',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div className="spinner" />
        </div>
      )}
    </React.Fragment>
  );
};

export default App;