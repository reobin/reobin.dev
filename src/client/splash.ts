interface InitSplashOptions {
  onRemoved: () => void;
}

export const initSplash = ({ onRemoved }: InitSplashOptions) => {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const detailPane = document.querySelector<HTMLElement>('[data-detail]');
  const splashOverlay = document.querySelector<HTMLElement>('[data-splash]');
  let resetFrame: number | undefined;
  let splashTimeout: number | undefined;

  if (splashOverlay) {
    const removeSplash = () => {
      const shouldResetScroll = !detailPane || detailPane.scrollTop <= 0;
      if (shouldResetScroll && detailPane) detailPane.scrollTop = 0;

      window.scrollTo(0, 0);
      document.documentElement.classList.remove('splash-active');
      document.documentElement.classList.add('splash-seen');
      splashOverlay.remove();
      onRemoved();

      resetFrame = requestAnimationFrame(() => {
        if (shouldResetScroll) window.scrollTo(0, 0);
      });
    };

    if (reduceMotion?.matches) {
      removeSplash();
    } else {
      splashTimeout = window.setTimeout(removeSplash, 1700);
    }
  }

  return () => {
    if (resetFrame !== undefined) cancelAnimationFrame(resetFrame);
    if (splashTimeout !== undefined) window.clearTimeout(splashTimeout);
  };
};
