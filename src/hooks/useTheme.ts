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
  const defaultTheme = getDefaultThemeData();
  const [theme, setTheme] = useState<Themes>(defaultTheme);

  const darkModeMediaQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY);
  darkModeMediaQuery.addEventListener('change', () => {
    const newTheme = darkModeMediaQuery.matches ? Themes.Dark : Themes.Light;
    if (theme === newTheme) return;
    assignTheme(newTheme);
  });

  function onToggle() {
    assignTheme(theme === Themes.Light ? Themes.Dark : Themes.Light);
  }

  function assignTheme(theme: Themes) {
    setTheme(theme);

    if (theme === getSystemPreferenceTheme()) {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
  }

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(Themes.Light, Themes.Dark);
    root.classList.add(theme);
  }, [theme]);

  return { onToggle, isDark: theme === Themes.Dark };
}

/**
 * Get the default theme based on the user's preferences or the stored theme.
 *
 * @returns {Themes} The default theme.
 */
function getDefaultThemeData(): Themes {
  return getStoredTheme() ?? getSystemPreferenceTheme();
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
