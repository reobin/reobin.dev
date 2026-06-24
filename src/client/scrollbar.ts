const SCROLL_STEP = 90;
const MIN_THUMB_HEIGHT = 32;

interface ScrollMetrics {
  canScroll: boolean;
  detailPane: HTMLElement;
  maxScroll: number;
  maxThumbTop: number;
  thumb: HTMLElement;
  thumbHeight: number;
}

const getScrollMetrics = (frame: HTMLElement): ScrollMetrics | null => {
  const detailPane = frame.querySelector<HTMLElement>('[data-detail]');
  const thumb = frame.querySelector<HTMLElement>('[data-scroll-thumb]');
  if (!detailPane || !thumb) return null;

  const track = thumb.parentElement;
  if (!track) return null;

  const trackHeight = track.clientHeight;
  const scrollHeight = detailPane.scrollHeight;
  const visibleHeight = detailPane.clientHeight;
  const maxScroll = scrollHeight - visibleHeight;
  const canScroll = maxScroll > 0;
  const thumbHeight = canScroll
    ? Math.max(
        MIN_THUMB_HEIGHT,
        Math.round((visibleHeight / scrollHeight) * trackHeight),
      )
    : 0;

  return {
    canScroll,
    detailPane,
    maxScroll,
    maxThumbTop: Math.max(0, trackHeight - thumbHeight),
    thumb,
    thumbHeight,
  };
};

const updateScrollFrame = (frame: HTMLElement) => {
  const metrics = getScrollMetrics(frame);
  if (!metrics) return;

  const { canScroll, detailPane, maxScroll, maxThumbTop, thumb, thumbHeight } =
    metrics;
  const scrollUpButton =
    frame.querySelector<HTMLButtonElement>('[data-scroll-up]');
  const scrollDownButton =
    frame.querySelector<HTMLButtonElement>('[data-scroll-down]');

  if (scrollUpButton) {
    scrollUpButton.disabled = !canScroll || detailPane.scrollTop <= 0;
  }

  if (scrollDownButton) {
    scrollDownButton.disabled =
      !canScroll || detailPane.scrollTop >= maxScroll - 1;
  }

  if (!canScroll) {
    thumb.style.display = 'none';
    return;
  }

  const thumbTop = (detailPane.scrollTop / maxScroll) * maxThumbTop;

  thumb.style.display = 'block';
  thumb.style.height = `${thumbHeight}px`;
  thumb.style.top = `${thumbTop}px`;
};

export const initScrollbars = () => {
  const frames = Array.from(
    document.querySelectorAll<HTMLElement>('[data-scroll-frame]'),
  );
  const update = () => {
    for (const frame of frames) {
      updateScrollFrame(frame);
    }
  };

  for (const frame of frames) {
    const detailPane = frame.querySelector<HTMLElement>('[data-detail]');
    const scrollUpButton =
      frame.querySelector<HTMLButtonElement>('[data-scroll-up]');
    const scrollDownButton =
      frame.querySelector<HTMLButtonElement>('[data-scroll-down]');
    const thumb = frame.querySelector<HTMLElement>('[data-scroll-thumb]');

    scrollUpButton?.addEventListener('click', () => {
      detailPane?.scrollBy({ top: -SCROLL_STEP });
    });

    scrollDownButton?.addEventListener('click', () => {
      detailPane?.scrollBy({ top: SCROLL_STEP });
    });

    detailPane?.addEventListener('scroll', () => {
      updateScrollFrame(frame);
    });

    thumb?.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;

      const metrics = getScrollMetrics(frame);
      if (!metrics?.canScroll || metrics.maxThumbTop <= 0) return;

      event.preventDefault();
      thumb.classList.add('is-dragging');
      thumb.setPointerCapture?.(event.pointerId);

      const startClientY = event.clientY;
      const startScrollTop = metrics.detailPane.scrollTop;
      const scrollPerPixel = metrics.maxScroll / metrics.maxThumbTop;

      const drag = (event: PointerEvent) => {
        metrics.detailPane.scrollTop =
          startScrollTop + (event.clientY - startClientY) * scrollPerPixel;
      };
      const stopDrag = (event: PointerEvent) => {
        thumb.classList.remove('is-dragging');
        try {
          thumb.releasePointerCapture?.(event.pointerId);
        } catch {}
        window.removeEventListener('pointermove', drag);
        window.removeEventListener('pointerup', stopDrag);
        window.removeEventListener('pointercancel', stopDrag);
      };

      window.addEventListener('pointermove', drag);
      window.addEventListener('pointerup', stopDrag);
      window.addEventListener('pointercancel', stopDrag);
    });
  }

  window.addEventListener('resize', update);
  update();

  return { update };
};
