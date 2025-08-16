import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, useActiveCode } from '@codesandbox/sandpack-react';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Upload, Code, Edit, Save } from 'lucide-react';
import * as lucide from 'lucide-react';
import './index.css';
import { useTranslation, Trans } from 'react-i18next';
import i18n from './i18n'; // Import i18n instance
import { ThemeToggle } from './components/theme-toggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTheme } from './hooks/use-theme';
interface FileOpenedPayload {
  path: string;
  name: string;
  content: string;
}

const Editor: React.FC<{ onCodeChange: (newCode: string) => void, theme: 'light' | 'dark' }> = ({ onCodeChange, theme }) => {
  const { code, updateCode } = useActiveCode();

  useEffect(() => {
    onCodeChange(code);
  }, [code, onCodeChange]);

  return (
    <SandpackCodeEditor
      key={theme}
      showLineNumbers
      showInlineErrors
      style={{
        backgroundColor: theme === 'dark' ? '#18181b' : '#ffffff',
        color: theme === 'dark' ? '#f4f4f5' : '#18181b',
      }}
    />
  );
};

const App: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
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

  const [fileHandle, setFileHandle] = useState<any>(null);

  

  useEffect(() => {
    const handleLocaleUpdate = (event: any, locale: string) => {
      console.log('Received locale:', locale);
      i18n.changeLanguage(locale);
    };

    const handleFileOpened = (event: any, { path, name, content }: { path: string, name: string, content: string }) => {
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
      setOriginalCode(editedCode);
      setIsDirty(false);
    };

    const handleFileOpenedFromCli = (event: any, filePath: string) => {
      // Since we get a raw file path, we need to ask the main process to read it for us.
      // This is a good practice for security and to handle potential errors.
      if (window.Electron?.ipcRenderer) {
        window.Electron.ipcRenderer.send('read-file-from-cli', filePath);
      }
    };

    const handleFileContentFromCli = (event: any, { path, name, content }: FileOpenedPayload) => {
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

    if (window.Electron?.ipcRenderer) {
      window.Electron.ipcRenderer.on('locale-update', handleLocaleUpdate);
      window.Electron.ipcRenderer.on('file-opened', handleFileOpened);
      window.Electron.ipcRenderer.on('file-open-error', handleFileOpenError);
      window.Electron.ipcRenderer.on('file-saved-successfully', handleFileSaved);
      window.Electron.ipcRenderer.on('file-opened-from-cli', handleFileOpenedFromCli);
      window.Electron.ipcRenderer.on('file-content-from-cli', handleFileContentFromCli);
    }

    return () => {
      if (window.Electron?.ipcRenderer) {
        window.Electron.ipcRenderer.removeListener('locale-update', handleLocaleUpdate);
        window.Electron.ipcRenderer.removeListener('file-opened', handleFileOpened);
        window.Electron.ipcRenderer.removeListener('file-open-error', handleFileOpenError);
        window.Electron.ipcRenderer.removeListener('file-saved-successfully', handleFileSaved);
        window.Electron.ipcRenderer.removeListener('file-opened-from-cli', handleFileOpenedFromCli);
        window.Electron.ipcRenderer.removeListener('file-content-from-cli', handleFileContentFromCli);
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

  const triggerFileDialog = async () => {
    if (window.Electron?.ipcRenderer) {
      window.Electron.ipcRenderer.send('open-file-dialog');
    } else if (window.showOpenFilePicker) {
      try {
        const [handle] = await window.showOpenFilePicker({
          types: [
            {
              description: 'TSX Files',
              accept: {
                'text/tsx': ['.tsx'],
              },
            },
          ],
        });
        setFileHandle(handle);
        const file = await handle.getFile();
        handleFile(file);
      } catch (err) {
        console.error('Error picking file:', err);
      }
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
    console.log('editedCode updated:', newCode.substring(0, 50) + '...'); // Log first 50 chars
    // Only set isDirty to true if the new code is different from the original code
    // This is the correct way to handle isDirty for SandpackProvider
    if (newCode !== originalCode) {
      setIsDirty(true);
    }
  };

  const handleSave = async () => {
    if (window.Electron?.ipcRenderer && filePath) {
      window.Electron.ipcRenderer.send('save-file', { filePath, code: editedCode });
    } else if (fileHandle) {
      try {
        const writable = await fileHandle.createWritable();
        await writable.write(editedCode);
        await writable.close();
        setOriginalCode(editedCode); // Update originalCode after successful save
        setIsDirty(false);
      } catch (err) {
        console.error('Error saving file:', err);
        setError('Ошибка сохранения файла');
      }
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
      // Do NOT set isDirty to false here, as we cannot confirm if the user actually saved the file.
      // The isDirty state will be managed by handleCodeChange based on originalCode vs editedCode.
    }
  };

  const sandpackFiles = useMemo(() => {
    const isDark = theme === 'dark';
    const styles = `
body {
  background-color: ${isDark ? '#18181b' : '#ffffff'};
  color: ${isDark ? '#f4f4f5' : '#18181b'};
}
`;
    return {
      '/App.tsx': originalCode,
      '/styles.css': {
        code: styles,
        hidden: true,
      },
      '/index.tsx': {
        code: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        hidden: true,
      },
      "/package.json": JSON.stringify({
        main: "/index.tsx",
        dependencies: {
          "react": "latest",
          "react-dom": "latest",
          "lucide-react": "latest",
        },
      }),
    };
  }, [originalCode, theme]);

  if (!filePath) {
    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <div
          id="dropzone-container"
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          className="flex flex-col justify-center items-center min-h-screen h-screen w-screen fixed inset-0 border-4 border-dashed rounded-lg bg-gray-100 text-gray-700 dark:bg-zinc-900 dark:text-gray-100 text-center transition-colors z-10"
          style={{ borderColor: '#333' }}
        >
          <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)' }}>
            <LanguageSwitcher />
          </div>
          <Upload size={64} className="mb-4" />
          <h1 className="text-2xl font-bold"><Trans i18nKey="drag_tsx_file">Перетащите TSX-файл сюда</Trans></h1>
          <p style={{ fontSize: '3rem', margin: '0.5rem 0' }}>{t('or')}</p>
          <button
            id="choose-file-button"
            className="py-4 px-8 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            style={{ fontSize: '1.5rem', width: '300px', height: '100px', cursor: 'pointer', transition: 'transform 0.2s ease-in-out' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            onClick={triggerFileDialog}
          >
            {t('choose_file')}
          </button>
        </div>
        <div className="absolute z-20 flex flex-row items-center gap-4" style={{ top: '5px', right: '10px' }}>
          <a href="https://github.com/01esyaLebedeva/tsx_viewer" target="_blank" rel="noopener noreferrer" className="app-link flex flex-row items-baseline no-underline" style={{ color: 'inherit', marginRight: '5px' }}>
            <span className="text-base font-bold">TSX Viewer</span>
            <span className="text-xs">&nbsp;v{__APP_VERSION__}</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div id="main-app-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <header id="app-header" className="relative flex flex-row items-center justify-between w-full px-4 py-6 min-h-[80px]">
          <div className="flex-1 flex items-center gap-4">
            <div className="flex items-center">
              <button id="upload-new-file-button" onClick={triggerFileDialog} title={t('upload_new_file')} className="hover:text-blue-400 transition header-icon-button">
                <Upload />
              </button>
              <button id="save-file-button" onClick={handleSave} title={t('save_file')} className={`hover:text-blue-400 transition header-icon-button ${!isDirty ? 'opacity-50 cursor-not-allowed' : ''} mr-6`} disabled={!isDirty}>
                <Save />
              </button>
              <button
                id="toggle-source-code-button"
                style={{ marginLeft: '10px' }}
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
                  setIsDirty(true);
                }}
                title={t('show_hide_editor')}
                className={`p-1 rounded transition header-icon-button ${isEditorActive ? 'active' : ''}`}
              >
                <Edit />
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-base font-bold" style={{ color: '#f4f4f5' }}>{fileName}</span>
          </div>
          <div className="flex-1 flex justify-end items-center gap-4">
            <a href="https://github.com/01esyaLebedeva/tsx_viewer" target="_blank" rel="noopener noreferrer" className="app-link flex flex-row items-baseline no-underline" style={{ color: '#f4f4f5', marginRight: '5px' }}>
              <span className="text-base font-bold">TSX Viewer</span>
              <span className="text-xs">&nbsp;v{__APP_VERSION__}</span>
            </a>
            <ThemeToggle />
          </div>
        </header>

        <SandpackProvider
          key={`${filePath}-${theme}`}
          template="react-ts"
          files={sandpackFiles}
          theme={theme}
        >
          <PanelGroup direction="horizontal" style={{ flexGrow: 1, minHeight: 0 }}>
            {showSource && (
              <>
                <Panel id="source-panel-container" key={`source-${theme}`} order={1} defaultSize={showEditor ? 33 : 50}>
                  <div
                    id="source-code-panel"
                    className={`source-code-panel ${theme === 'dark' ? 'dark' : ''}`}
                    style={{
                      height: '100%',
                      overflow: 'auto',
                      borderRight: '1px solid #ccc'
                    }}
                  >
                    <pre><code>{originalCode}</code></pre>
                  </div>
                </Panel>
                <PanelResizeHandle className="resize-handle" />
              </>
            )}
            {showEditor && (
              <>
                <Panel id="editor-panel-container" key={`editor-${theme}`} order={2} defaultSize={showSource ? 33 : 50}>
                  <SandpackLayout id="editor-panel">
                    <Editor onCodeChange={handleCodeChange} theme={theme} />
                  </SandpackLayout>
                </Panel>
                <PanelResizeHandle className="resize-handle" />
              </>
            )}
            {showPreview && (
              <Panel id="preview-panel-container" key={`preview-${theme}`} order={3} defaultSize={showSource && showEditor ? 34 : (showSource || showEditor ? 50 : 100)}>
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