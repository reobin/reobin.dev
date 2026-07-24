import { initScrollbars } from './scrollbar';
import { applyStoredPreferences, initPreferences } from './preferences';
import { initSplash } from './splash';

export const preparePageAfterSwap = () => {
  const root = document.documentElement;

  root.classList.remove('no-js', 'splash-active');
  root.classList.add('js', 'splash-seen');
  applyStoredPreferences();
  document.querySelector<HTMLElement>('[data-splash]')?.remove();
};

export const initInteractions = () => {
  const controller = new AbortController();
  const { signal } = controller;
  const scrollbars = initScrollbars();
  let scrollbarUpdateFrame: number | undefined;
  const scheduleScrollbarUpdate = () => {
    if (scrollbarUpdateFrame !== undefined) {
      cancelAnimationFrame(scrollbarUpdateFrame);
    }
    scrollbarUpdateFrame = requestAnimationFrame(() => {
      scrollbarUpdateFrame = undefined;
      scrollbars.update();
    });
  };

  initPreferences({ onLocaleRendered: scheduleScrollbarUpdate, signal });
  const cleanupSplash = initSplash({ onRemoved: scrollbars.update });

  document
    .querySelector<HTMLAnchorElement>('.tab[aria-current="page"]')
    ?.addEventListener(
      'click',
      event => {
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }

        event.preventDefault();
      },
      { signal },
    );

  scrollbars.update();
  document.documentElement.classList.add('shell-ready');

  return () => {
    if (scrollbarUpdateFrame !== undefined) {
      cancelAnimationFrame(scrollbarUpdateFrame);
    }
    cleanupSplash();
    controller.abort();
    scrollbars.destroy();
  };
};
