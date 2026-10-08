// Inspired by Super Hover by Daniel Petho (https://super-hover.danielpetho.com) — MIT licensed.

export interface SuperHoverOptions {
  /** The scrollable or bounding container element */
  root: HTMLElement;
}

export interface SuperHoverController {
  destroy: () => void;
}

/**
 * Creates a Super Hover controller that maintains active hover state
 * even when the container scrolls beneath a stationary cursor.
 */
export function createSuperHover({ root }: SuperHoverOptions): SuperHoverController {
  let activeEl: HTMLElement | null = null;
  let lastClientX = -1;
  let lastClientY = -1;

  const setActive = (el: HTMLElement | null, eventType: 'superhoverenter' | 'superhovermove') => {
    if (activeEl === el) {
      if (el) {
        el.dispatchEvent(new CustomEvent('superhovermove', { bubbles: true }));
      }
      return;
    }

    if (activeEl) {
      activeEl.removeAttribute('data-super-hover-active');
    }

    activeEl = el;

    if (activeEl) {
      activeEl.setAttribute('data-super-hover-active', '');
      activeEl.dispatchEvent(new CustomEvent(eventType, { bubbles: true }));
    }
  };

  const updateFromCoordinates = (x: number, y: number, eventType: 'superhoverenter' | 'superhovermove') => {
    lastClientX = x;
    lastClientY = y;
    const hit = document.elementFromPoint(x, y);
    const row = hit ? hit.closest<HTMLElement>('[data-super-hover]') : null;

    if (row && root.contains(row)) {
      setActive(row, eventType);
    } else {
      setActive(null, eventType);
    }
  };

  const handlePointerMove = (e: PointerEvent) => {
    updateFromCoordinates(e.clientX, e.clientY, 'superhovermove');
  };

  const handlePointerEnter = (e: PointerEvent) => {
    updateFromCoordinates(e.clientX, e.clientY, 'superhoverenter');
  };

  const handlePointerLeave = () => {
    setActive(null, 'superhoverenter');
    lastClientX = -1;
    lastClientY = -1;
  };

  const handleScroll = () => {
    if (lastClientX >= 0 && lastClientY >= 0) {
      updateFromCoordinates(lastClientX, lastClientY, 'superhovermove');
    }
  };

  root.addEventListener('pointermove', handlePointerMove, { passive: true });
  root.addEventListener('pointerenter', handlePointerEnter, { passive: true });
  root.addEventListener('pointerleave', handlePointerLeave, { passive: true });
  root.addEventListener('scroll', handleScroll, { passive: true });

  return {
    destroy: () => {
      root.removeEventListener('pointermove', handlePointerMove);
      root.removeEventListener('pointerenter', handlePointerEnter);
      root.removeEventListener('pointerleave', handlePointerLeave);
      root.removeEventListener('scroll', handleScroll);
      if (activeEl) {
        activeEl.removeAttribute('data-super-hover-active');
        activeEl = null;
      }
    },
  };
}
