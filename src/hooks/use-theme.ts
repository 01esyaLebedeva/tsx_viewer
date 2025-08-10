import { useEffect, useState } from 'react'

const THEME_KEY = 'theme'

export function useTheme() {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') || 'light'
  })

  // Слушаем событие set-theme от Electron
  useEffect(() => {
    if (window.Electron?.ipcRenderer) {
      const handler = (_event: any, newTheme: 'light' | 'dark') => {
        setThemeState(newTheme)
      }
      window.Electron.ipcRenderer.on('set-theme', handler)
      return () => {
        window.Electron.ipcRenderer.removeListener('set-theme', handler)
      }
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem(THEME_KEY, theme)
    if (window.Electron?.ipcRenderer) {
      window.Electron.ipcRenderer.send('set-theme', theme)
    }
  }, [theme])

  function setTheme(newTheme: 'light' | 'dark') {
    setThemeState(newTheme)
  }

  return { theme, setTheme }
}
