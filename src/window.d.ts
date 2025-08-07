export {};

declare global {
  interface Window {
    Electron?: {
      ipcRenderer: {
        send: (channel: string, data?: any) => void;
        on: (channel: string, listener: (event: any, ...args: any[]) => void) => void;
        removeListener: (channel: string, listener: (...args: any[]) => void) => void;
      };
    };
    showOpenFilePicker?(options?: OpenFilePickerOptions): Promise<FileSystemFileHandle[]>;
  }
}

interface OpenFilePickerOptions {
  types?: {
    description: string;
    accept: {
      [mimeType: string]: string[];
    };
  }[];
  multiple?: boolean;
}

interface FileSystemFileHandle {
  getFile: () => Promise<File>;
  createWritable: () => Promise<FileSystemWritableFileStream>;
}

interface FileSystemWritableFileStream {
  write: (data: any) => Promise<void>;
  close: () => Promise<void>;
}
