import React, { useState, useRef, useEffect } from 'react';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, useActiveCode } from '@codesandbox/sandpack-react';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Upload, Code, Edit, Save } from 'lucide-react';
import * as lucide from 'lucide-react';
import './index.css';
import { useTranslation, Trans } from 'react-i18next';
import i18n from './i18n'; // Import i18n instance

const CustomEditor = ({ onCodeChange }) => {
  const { code } = useActiveCode();
  useEffect(() => {
    onCodeChange(code);
  }, [code, onCodeChange]);

  return <SandpackCodeEditor />;
};

const App: React.FC = () => {
  const { t } = useTranslation();
  const [originalCode, setOriginalCode] = useState<string>('');
  const [editedCode, setEditedCode] = useState<string>('');
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [filePath, setFilePath] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showSource, setShowSource] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [isSourceActive, setIsSourceActive] = useState(false);
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLocaleUpdate = (event: any, locale: string) => {
      console.log('Received locale:', locale);
      i18n.changeLanguage(locale);
    };

    const handleFileOpened = (event: any, { path, name, content }) => {
      setOriginalCode(content);
      setEditedCode(content);
      setIsDirty(false);
      setFilePath(path);
      setFileName(name);
      setError(null);
      setShowSource(false);
      setShowEditor(false);
      setShowPreview(true);
    };

    const handleFileOpenError = (event: any, errorMessage: string) => {
      setError(errorMessage);
    };

    const handleFileSaved = () => {
      setIsDirty(false);
    };

    if (window.Electron?.ipcRenderer) {
      window.Electron.ipcRenderer.on('locale-update', handleLocaleUpdate);
      window.Electron.ipcRenderer.on('file-opened', handleFileOpened);
      window.Electron.ipcRenderer.on('file-open-error', handleFileOpenError);
      window.Electron.ipcRenderer.on('file-saved-successfully', handleFileSaved);
    }

    return () => {
      if (window.Electron?.ipcRenderer) {
        window.Electron.ipcRenderer.removeListener('locale-update', handleLocaleUpdate);
        window.Electron.ipcRenderer.removeListener('file-opened', handleFileOpened);
        window.Electron.ipcRenderer.removeListener('file-open-error', handleFileOpenError);
        window.Electron.ipcRenderer.removeListener('file-saved-successfully', handleFileSaved);
      }
    };
  }, []);

  const handleFile = (file: any) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      let code = e.target?.result as string;
      setOriginalCode(code);
      setEditedCode(code);
      setIsDirty(false);
      setFilePath(file.path || file.name);
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

  const triggerFileDialog = () => {
    if (window.Electron?.ipcRenderer) {
      window.Electron.ipcRenderer.send('open-file-dialog');
    } else {
      // Fallback for web version
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.tsx';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          handleFile(file);
        }
      };
      input.click();
    }
  };

  const handleCodeChange = (newCode: string) => {
    setEditedCode(newCode);
    if (newCode !== originalCode) {
      setIsDirty(true);
    }
  };

  const handleSave = () => {
    if (window.Electron?.ipcRenderer && filePath) {
      window.Electron.ipcRenderer.send('save-file', { filePath, code: editedCode });
    } else {
      // Fallback for web version
      const blob = new Blob([editedCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'edited-file.tsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsDirty(false);
    }
  };

  if (!filePath) {
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
          onClick={triggerFileDialog}
        >
          {t('choose_file')}
        </button>
      </div>
    );
  }

  return (
    <React.Fragment>
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
          <div className="flex items-center gap-4">
            <button id="upload-new-file-button" onClick={triggerFileDialog} title={t('upload_new_file')} className="hover:text-blue-400 transition header-icon-button">
              <Upload />
            </button>
            <button id="save-file-button" onClick={handleSave} title={t('save_file')} className={`hover:text-blue-400 transition header-icon-button ${!isDirty ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!isDirty}>
              <Save />
            </button>
          </div>
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
        </header>

        <SandpackProvider
          template="react-ts"
          files={{
            '/App.tsx': editedCode,
          }}
          options={{
            showLineNumbers: true,
            showInlineErrors: true,
            showTabs: !showSource && !showEditor,
            editorHeight: '100vh',
          }}
          customSetup={{
            dependencies: {
              "lucide-react": "^0.536.0",
              "react-resizable-panels": "^3.0.3",
            }
          }}
        >
          <PanelGroup direction="horizontal" style={{ flexGrow: 1, minHeight: 0 }}>
            {showSource && (
              <>
                <Panel id="source-panel-container" order={1} defaultSize={showEditor ? 33 : 50}>
                  <div id="source-code-panel" style={{ height: '100%', overflow: 'auto', borderRight: '1px solid #ccc' }}>
                    <pre><code>{originalCode}</code></pre>
                  </div>
                </Panel>
                <PanelResizeHandle className="resize-handle" />
              </>
            )}
            {showEditor && (
              <>
                <Panel id="editor-panel-container" order={2} defaultSize={showSource ? 33 : 50}>
                  <SandpackLayout id="editor-panel">
                    <CustomEditor onCodeChange={handleCodeChange} />
                  </SandpackLayout>
                </Panel>
                <PanelResizeHandle className="resize-handle" />
              </>
            )}
            {showPreview && (
              <Panel id="preview-panel-container" order={3} defaultSize={showSource && showEditor ? 34 : (showSource || showEditor ? 50 : 100)}>
                <SandpackLayout id="preview-panel">
                  <SandpackPreview />
                </SandpackLayout>
              </Panel>
            )}
          </PanelGroup>
        </SandpackProvider>
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