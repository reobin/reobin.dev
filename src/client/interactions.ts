import { initScrollbars } from './scrollbar';

type Theme = 'light' | 'dark';
type Locale = 'en' | 'fr';

const LOCALE_STORAGE_KEY = 'reobin-locale';
const THEME_STORAGE_KEY = 'reobin-theme';
const SKIP_SPLASH_STORAGE_KEY = 'reobin_skip_next_splash';
const SUPPORTED_LOCALES = ['en', 'fr'] as const satisfies readonly Locale[];
const DEFAULT_LOCALE: Locale = 'en';
const THEME_COLORS = {
  light: '#f6f6f0',
  dark: '#000000',
} as const satisfies Record<Theme, string>;

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

const getSessionValue = (key: string) => {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

const setSessionValue = (key: string, value: string) => {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {}
};

const removeSessionValue = (key: string) => {
  try {
    window.sessionStorage.removeItem(key);
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

const updateLocalizedAria = (locale: Locale) => {
  for (const node of document.querySelectorAll<HTMLElement>('[data-aria-en]')) {
    const label = locale === 'fr' ? node.dataset.ariaFr : node.dataset.ariaEn;
    if (label) node.setAttribute('aria-label', label);
  }
};

export const initInteractions = () => {
  const systemTheme = window.matchMedia?.('(prefers-color-scheme: dark)');
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const getSystemTheme = (): Theme => (systemTheme?.matches ? 'dark' : 'light');
  const storedLocale = getStoredValue(LOCALE_STORAGE_KEY);
  const storedTheme = getStoredValue(THEME_STORAGE_KEY);

  const state = {
    locale: isLocale(storedLocale) ? storedLocale : getSystemLocale(),
    theme: isTheme(storedTheme) ? storedTheme : getSystemTheme(),
    hasThemeOverride: isTheme(storedTheme),
  };

  const tabs = Array.from(document.querySelectorAll<HTMLElement>('[data-tab]'));
  const localeButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-locale-button]'),
  );
  const themeButton = document.querySelector<HTMLButtonElement>(
    '[data-theme-toggle]',
  );
  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  const detailPane = document.querySelector<HTMLElement>('[data-detail]');
  const splashOverlay = document.querySelector<HTMLElement>('[data-splash]');
  const scrollbars = initScrollbars();

  const renderLocale = () => {
    document.documentElement.lang = state.locale;
    updateLocalizedAria(state.locale);
    requestAnimationFrame(scrollbars.update);

    for (const button of localeButtons) {
      const active = button.dataset.localeButton === state.locale;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    }
  };

  const renderTheme = () => {
    const dark = state.theme === 'dark';
    if (state.hasThemeOverride) {
      document.documentElement.dataset.theme = state.theme;
    } else {
      delete document.documentElement.dataset.theme;
    }
    themeColor?.setAttribute('content', THEME_COLORS[state.theme]);
    themeButton?.setAttribute('aria-pressed', String(dark));
  };

  const initSplash = () => {
    if (!splashOverlay) return;

    const removeSplash = () => {
      const shouldResetScroll = !detailPane || detailPane.scrollTop <= 0;
      if (shouldResetScroll && detailPane) detailPane.scrollTop = 0;
      window.scrollTo(0, 0);
      document.documentElement.classList.remove('splash-active');
      document.documentElement.classList.add('splash-seen');
      splashOverlay.remove();
      scrollbars.update();
      requestAnimationFrame(() => {
        if (shouldResetScroll) window.scrollTo(0, 0);
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'auto';
        }
      });
    };

    if (getSessionValue(SKIP_SPLASH_STORAGE_KEY) === '1') {
      removeSessionValue(SKIP_SPLASH_STORAGE_KEY);
      removeSplash();
      return;
    }

    if (reduceMotion?.matches) {
      removeSplash();
      return;
    }

    window.setTimeout(() => {
      removeSplash();
    }, 1700);
  };

  for (const tab of tabs) {
    tab.addEventListener('click', event => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0 ||
        tab.getAttribute('aria-current') === 'page'
      ) {
        return;
      }

      setSessionValue(SKIP_SPLASH_STORAGE_KEY, '1');
    });
  }

  for (const button of localeButtons) {
    button.addEventListener('click', () => {
      const nextLocale = button.dataset.localeButton;
      if (!isLocale(nextLocale)) return;

      state.locale = nextLocale;
      setStoredValue(LOCALE_STORAGE_KEY, state.locale);
      renderLocale();
    });
  }

  themeButton?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    state.hasThemeOverride = state.theme !== getSystemTheme();

    if (state.hasThemeOverride) {
      setStoredValue(THEME_STORAGE_KEY, state.theme);
    } else {
      removeStoredValue(THEME_STORAGE_KEY);
    }

    renderTheme();
  });

  systemTheme?.addEventListener?.('change', () => {
    if (state.hasThemeOverride) return;
    state.theme = getSystemTheme();
    renderTheme();
  });

  renderLocale();
  renderTheme();
  initSplash();
  scrollbars.update();
  document.documentElement.classList.add('shell-ready');
};
