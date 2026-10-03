"use client";

import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { IconChevronRight } from "@tabler/icons-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SHIMMER_STYLE_ID = "an-thinking-tool-shimmer-styles";
const SHIMMER_STYLES = `
@keyframes an-thinking-shimmer {
  0% { background-position: 100% center; }
  100% { background-position: 0% center; }
}
.an-thinking-shimmer {
  display: inline-flex;
  align-items: center;
  height: 1.35rem;
  background-size: 250% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(90deg, #d9a441 0%, #dedf42 30%, #ffffff 50%, #dedf42 70%, #d9a441 100%);
  background-repeat: no-repeat;
  animation: an-thinking-shimmer 1.8s linear infinite;
  font-weight: 700;
  letter-spacing: 0.02em;
}
`;

let shimmerStylesInjected = false;
function ensureShimmerStyles() {
  if (typeof document === "undefined") return;
  if (shimmerStylesInjected) return;
  if (document.getElementById(SHIMMER_STYLE_ID)) {
    shimmerStylesInjected = true;
    return;
  }
  const el = document.createElement("style");
  el.id = SHIMMER_STYLE_ID;
  el.textContent = SHIMMER_STYLES;
  document.head.appendChild(el);
  shimmerStylesInjected = true;
}

export type ThinkingToolProps = {
  /** "thinking" shows shimmer header; "thought" shows static header. */
  state?: "thinking" | "thought";
  /** Optional reasoning content. When provided, the row is expandable. */
  content?: string;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Controlled open state (pair with `onToggleExpand`). */
  expanded?: boolean;
  /** Called when the user toggles the chevron in controlled mode. */
  onToggleExpand?: () => void;
  className?: string;
  thinkingLabel?: string;
  thoughtLabel?: string;
};

export const ThinkingTool = React.memo(function ThinkingTool({
  state = "thinking",
  content,
  defaultOpen = false,
  expanded,
  onToggleExpand,
  className,
  thinkingLabel = "Sang Empu Sedang Menalar & Menatah...",
  thoughtLabel = "Proses Nalar Sang Empu",
}: ThinkingToolProps) {
  React.useEffect(() => {
    ensureShimmerStyles();
  }, []);

  const isControlled = expanded !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? !!expanded : internalOpen;

  const expandable = !!content;
  const isAnimating = state === "thinking";
  const canToggle = expandable;

  const handleToggle = () => {
    if (!canToggle) return;
    if (isControlled) {
      onToggleExpand?.();
    } else {
      setInternalOpen((v) => !v);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={!canToggle}
        aria-expanded={canToggle ? isOpen : undefined}
        className={cn(
          "group flex items-center max-w-full select-none gap-1.5 rounded-lg bg-transparent border-0 p-0 m-0 text-left transition-all",
          canToggle ? "cursor-pointer hover:opacity-90" : "cursor-default",
        )}
      >
        <div className="flex items-center gap-2 min-w-0 text-sm">
          {isAnimating ? (
            <span className="an-thinking-shimmer">{thinkingLabel}</span>
          ) : (
            <span className="text-[#dedf42] font-serif font-bold text-xs tracking-wide flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#dedf42] shadow-[0_0_8px_rgba(222,223,66,0.6)]" />
              {thoughtLabel}
            </span>
          )}
        </div>
        {expandable && (
          <IconChevronRight
            className={cn(
              "shrink-0 text-[#dedf42]/70 transition-transform duration-200 ease-out size-3.5",
              isOpen ? "rotate-90" : "rotate-0",
            )}
          />
        )}
      </button>
      {expandable && isOpen && (
        <div className="overflow-hidden animate-fadeIn">
          <div className="max-h-[180px] overflow-y-auto bg-black/50 border border-[#dedf42]/20 rounded-xl p-3 mt-1 shadow-inner">
            <p className="text-xs text-[#f5ecd9]/90 leading-relaxed whitespace-pre-wrap font-sans">
              {content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
