'use client';

import React from 'react';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { cn } from '@/lib/utils';

export type Logo = {
  src?: string;
  alt: string;
  name?: string;
  category?: string;
  width?: number;
  height?: number;
  icon?: React.ReactNode;
  href?: string;
};

export type LogoCloudProps = React.ComponentProps<'div'> & {
  logos: Logo[];
  speed?: number;
  speedOnHover?: number;
  gap?: number;
  reverse?: boolean;
};

export function LogoCloud({
  className,
  logos,
  speed = 45,
  speedOnHover = 20,
  gap = 56,
  reverse = false,
  ...props
}: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        'w-full overflow-hidden py-3 select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className
      )}
    >
      <InfiniteSlider
        gap={gap}
        reverse={reverse}
        duration={speed}
        durationOnHover={speedOnHover}
        direction="horizontal"
      >
        {logos.map((logo, index) => {
          const content = (
            <div className="group/logo inline-flex items-center gap-3 sm:gap-4 opacity-80 hover:opacity-100 transition-all duration-200 cursor-pointer">
              {/* Official Vector / Image Logo (Enlarged) */}
              {logo.icon ? (
                <div className="size-8 sm:size-9 md:size-10 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/logo:scale-110">
                  {logo.icon}
                </div>
              ) : logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width || 'auto'}
                  height={logo.height || 'auto'}
                  loading="lazy"
                  className="pointer-events-none h-8 sm:h-9 md:h-10 w-auto object-contain select-none transition-transform duration-200 group-hover/logo:scale-110 shrink-0"
                />
              ) : null}

              {/* Official Brand / Institution Text */}
              <span className="font-sans font-bold text-sm sm:text-base md:text-lg text-black tracking-tight whitespace-nowrap">
                {logo.name || logo.alt}
              </span>
            </div>
          );

          if (logo.href) {
            return (
              <a
                key={`logo-${logo.alt}-${index}`}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="outline-none"
              >
                {content}
              </a>
            );
          }

          return (
            <div key={`logo-${logo.alt}-${index}`} className="outline-none">
              {content}
            </div>
          );
        })}
      </InfiniteSlider>
    </div>
  );
}

export default LogoCloud;
