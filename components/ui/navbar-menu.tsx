"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  title,
  children,
  className,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.div
        transition={{ duration: 0.2 }}
        className={cn(
          "cursor-pointer text-[#f4e7cd]/85 hover:text-[#dedf42] text-sm font-medium transition-colors select-none px-3.5 py-2 rounded-full hover:bg-white/[0.05] flex items-center gap-1.5",
          className
        )}
      >
        {title || item}
      </motion.div>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && children && (
            <div className="absolute top-[calc(100%_+_0.8rem)] left-1/2 transform -translate-x-1/2 pt-2 z-50">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-[#16100b]/98 backdrop-blur-2xl rounded-2xl overflow-hidden border border-[#dedf42]/35 shadow-[0_25px_70px_rgba(0,0,0,0.95)]"
              >
                <motion.div layout className="w-max h-full p-4 sm:p-5">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={cn(
        "relative rounded-b-[2.5rem] bg-[#130d08] text-[#f4e7cd] border-none shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] flex items-center justify-between px-5 sm:px-7 h-20 max-[850px]:h-[72px] gap-4 sm:gap-6",
        className
      )}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  onClick,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex space-x-3.5 group p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors"
    >
      <div className="relative w-24 h-16 sm:w-28 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden border border-[#dedf42]/20 group-hover:border-[#dedf42] transition-colors bg-black/60 shadow-md">
        <Image
          src={src}
          fill
          alt={title}
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="112px"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="text-sm sm:text-base font-serif italic font-bold text-[#dedf42] group-hover:text-white transition-colors mb-0.5">
          {title}
        </h4>
        <p className="text-[#cdb894] text-xs max-w-[12rem] leading-relaxed font-sans font-light">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  className,
  onClick,
  ...rest
}: React.ComponentProps<typeof Link>) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    const hrefStr = typeof rest.href === 'string' ? rest.href : '';
    if (hrefStr.includes('#')) {
      const hashPart = hrefStr.slice(hrefStr.indexOf('#')).split('?')[0];
      if (
        typeof window !== 'undefined' &&
        (window.location.pathname === '/' || !hrefStr.startsWith('/'))
      ) {
        e.preventDefault();
        try {
          const target = document.querySelector(hashPart);
          if (target) {
            if (window.lenisInstance) {
              window.lenisInstance.scrollTo(target as HTMLElement, {
                offset: -80,
                duration: 1.25,
                easing: (t: number) =>
                  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
              });
            } else {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        } catch {
          // ignore selector errors if any
        }
      }
    }
  };

  return (
    <Link
      {...rest}
      onClick={handleClick}
      className={cn(
        "text-[#cdb894] hover:text-[#dedf42] text-xs sm:text-sm font-sans transition-colors block py-0.5",
        className
      )}
    >
      {children}
    </Link>
  );
};
