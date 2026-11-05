import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Reliably scroll window to top, coordinating with Lenis smooth-scroll if active.
 */
export function scrollToPageTop(immediate = true) {
  if (typeof window === 'undefined') return;

  const performScroll = () => {
    const win = window as unknown as {
      lenisInstance?: {
        scrollTo: (target: number | HTMLElement, opt?: { immediate?: boolean; duration?: number }) => void;
      } | null;
    };

    if (win.lenisInstance) {
      win.lenisInstance.scrollTo(0, { immediate });
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: immediate ? 'instant' : 'smooth',
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  performScroll();
  // Double-shot with requestAnimationFrame so that any post-render layout shifts stay at top
  requestAnimationFrame(performScroll);
}
