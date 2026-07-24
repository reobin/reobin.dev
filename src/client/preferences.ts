export const LOCALE_STORAGE_KEY = 'reobin-locale';
export const THEME_STORAGE_KEY = 'reobin-theme';
export const SUPPORTED_LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const THEME_COLORS = {
  light: '#f6f6f0',
  dark: '#000000',
} as const;
export type Theme = keyof typeof THEME_COLORS;

interface PreferenceState {
  hasThemeOverride: boolean;
  locale: Locale;
  theme: Theme;
}

interface InitPreferencesOptions {
  onLocaleRendered?: () => void;
  signal: AbortSignal;
}

const isTheme = (value: string | null): value is Theme =>
  value === 'light' || value === 'dark';

const isLocale = (value: string | null | undefined): value is Locale =>
  typeof value === 'string' && SUPPORTED_LOCALES.includes(value as Locale);

const getStoredValue = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const setStoredValue = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {}
};

const removeStoredValue = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch {}
};

const getSystemLocale = (): Locale => {
  const languagePreferences = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  const matchingLocale = languagePreferences
    .map(language => language?.split('-')[0])
    .find(isLocale);

  return matchingLocale || DEFAULT_LOCALE;
};

const getSystemTheme = (mediaQuery?: MediaQueryList): Theme =>
  (mediaQuery ?? window.matchMedia?.('(prefers-color-scheme: dark)'))?.matches
    ? 'dark'
    : 'light';

const getPreferenceState = (systemTheme?: MediaQueryList): PreferenceState => {
  const storedLocale = getStoredValue(LOCALE_STORAGE_KEY);
  const storedTheme = getStoredValue(THEME_STORAGE_KEY);

  return {
    hasThemeOverride: isTheme(storedTheme),
    locale: isLocale(storedLocale) ? storedLocale : getSystemLocale(),
    theme: isTheme(storedTheme) ? storedTheme : getSystemTheme(systemTheme),
  };
};

const updateLocalizedAria = (locale: Locale) => {
  for (const node of document.querySelectorAll<HTMLElement>('[data-aria-en]')) {
    const label = locale === 'fr' ? node.dataset.ariaFr : node.dataset.ariaEn;
    if (label) node.setAttribute('aria-label', label);
  }
};

const renderDocumentLocale = (locale: Locale) => {
  document.documentElement.lang = locale;
  updateLocalizedAria(locale);
};

const renderDocumentTheme = (theme: Theme, hasThemeOverride: boolean) => {
  if (hasThemeOverride) {
    document.documentElement.dataset.theme = theme;
  } else {
    delete document.documentElement.dataset.theme;
  }

  document
    .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[theme]);
};

export const applyStoredPreferences = () => {
  const state = getPreferenceState();
  renderDocumentLocale(state.locale);
  renderDocumentTheme(state.theme, state.hasThemeOverride);
};

export const initPreferences = ({
  onLocaleRendered,
  signal,
}: InitPreferencesOptions) => {
  const systemTheme = window.matchMedia?.('(prefers-color-scheme: dark)');
  const state = getPreferenceState(systemTheme);
  const localeButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-locale-button]'),
  );
  const themeButton = document.querySelector<HTMLButtonElement>(
    '[data-theme-toggle]',
  );

  const renderLocale = () => {
    renderDocumentLocale(state.locale);

    for (const button of localeButtons) {
      const active = button.dataset.localeButton === state.locale;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    }

    onLocaleRendered?.();
  };

  const renderTheme = () => {
    renderDocumentTheme(state.theme, state.hasThemeOverride);
    themeButton?.setAttribute('aria-pressed', String(state.theme === 'dark'));
  };

  for (const button of localeButtons) {
    button.addEventListener(
      'click',
      () => {
        const nextLocale = button.dataset.localeButton;
        if (!isLocale(nextLocale)) return;

        state.locale = nextLocale;
        setStoredValue(LOCALE_STORAGE_KEY, state.locale);
        renderLocale();
      },
      { signal },
    );
  }

  themeButton?.addEventListener(
    'click',
    () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      state.hasThemeOverride = state.theme !== getSystemTheme(systemTheme);

      if (state.hasThemeOverride) {
        setStoredValue(THEME_STORAGE_KEY, state.theme);
      } else {
        removeStoredValue(THEME_STORAGE_KEY);
      }

      renderTheme();
    },
    { signal },
  );

  systemTheme?.addEventListener?.(
    'change',
    () => {
      if (state.hasThemeOverride) return;
      state.theme = getSystemTheme(systemTheme);
      renderTheme();
    },
    { signal },
  );

  renderLocale();
  renderTheme();
};
