import { useTheme } from '../hooks/use-theme';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
      className="p-0 bg-transparent border-none outline-none flex items-center justify-center self-center ml-2 transition hover:scale-110"
      style={{ width: 52, height: 52, cursor: 'pointer', marginRight: '5px' }}
    >
      {isDark ? (
        <Moon size={40} stroke="white" />
      ) : (
        <Sun size={40} stroke="black" />
      )}
    </button>
  );
}
