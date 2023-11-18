import { useEffect, useState } from 'react';

import Themes from '@/lib/themes';

interface UseThemeData {
  isDark: boolean;
  onToggle: () => void;
}

const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';

/**
 * Hook to manage the theme of the application.
 *
 * @returns {UseThemeData} The theme data.
 */
function useTheme(): UseThemeData {
  const [theme, setTheme] = useState<Themes>(Themes.Light);

  useEffect(() => {
    const defaultTheme = getStoredTheme() ?? getSystemPreferenceTheme();
    setTheme(defaultTheme);
  }, []);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY);
    darkModeMediaQuery.addEventListener('change', () => {
      const theme = darkModeMediaQuery.matches ? Themes.Dark : Themes.Light;
      setTheme(theme);
      storeTheme(theme);
    });

    return () => darkModeMediaQuery.removeEventListener('change', () => {});
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(Themes.Light, Themes.Dark);
    root.classList.add(theme);
  }, [theme]);

  function onToggle() {
    const newTheme = theme === Themes.Light ? Themes.Dark : Themes.Light;
    setTheme(newTheme);
    storeTheme(newTheme);
  }

  function storeTheme(theme: Themes) {
    if (theme === getSystemPreferenceTheme()) {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
  }

  return { onToggle, isDark: theme === Themes.Dark };
}

/**
 * Get the stored theme from the local storage.
 *
 * @returns {Themes | null} The stored theme or null if there is no stored theme.
 */
function getStoredTheme(): Themes | null {
  return localStorage.getItem('theme') as Themes | null;
}

/**
 * Get the theme based on the user's system preferences. (prefers-color-scheme)
 *
 * @returns {Themes} The theme based on the user's system preferences.
 */
function getSystemPreferenceTheme(): Themes {
  const prefersDarkMode = window.matchMedia(DARK_MODE_MEDIA_QUERY).matches;
  return prefersDarkMode ? Themes.Dark : Themes.Light;
}

export default useTheme;
