'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InteractiveTiltCardProps {
  /** Text shown on the card and used as the image alt / link label. */
  title: string;
  /** Background artwork, rendered with object-cover. */
  imageUrl: string;
  /** Internal route opened when the card is activated. */
  href: string;
  /** `sizes` hint forwarded to next/image. */
  sizes?: string;
  className?: string;
}

const SPRING = { damping: 15, stiffness: 150 };

/**
 * Portrait card with a pointer-driven 3D tilt. The whole card is one link;
 * the image, title and arrow sit on raised Z layers for depth.
 */
export function InteractiveTiltCard({
  title,
  imageUrl,
  href,
  sizes,
  className,
}: InteractiveTiltCardProps) {
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, SPRING);
  const springY = useSpring(mouseY, SPRING);
  const rotateX = useTransform(springY, [-0.5, 0.5], ['10.5deg', '-10.5deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-10.5deg', '10.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Link
      href={href}
      aria-label={title}
      className="group block rounded-2xl [perspective:1000px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dedf42] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050303]"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={cn(
          'relative aspect-[4/5] w-full rounded-2xl border border-[#dedf42]/25 bg-[#120d08] shadow-2xl transition-[border-color,box-shadow] duration-300 group-hover:border-[#dedf42] group-hover:shadow-[0_20px_45px_-10px_rgba(222,223,66,0.25)]',
          className
        )}
      >
        <div
          style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
          className="absolute inset-3 rounded-xl shadow-lg"
        >
          {/* Clipping layer: kept separate so overflow-hidden does not flatten the 3D text layer */}
          <div className="absolute inset-0 overflow-hidden rounded-xl bg-black">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes={sizes}
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85" />
          </div>

          <div
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4"
          >
            <span
              aria-hidden="true"
              style={{ transform: 'translateZ(30px)' }}
              className="flex size-9 sm:size-10 items-center justify-center self-end rounded-full bg-black/35 ring-1 ring-inset ring-[#dedf42]/40 backdrop-blur-sm transition-colors group-hover:bg-[#dedf42]"
            >
              <ArrowUpRight className="size-4 sm:size-5 text-[#dedf42] transition-colors group-hover:text-black" />
            </span>

            <h2
              style={{ transform: 'translateZ(30px)' }}
              className="font-playfair text-xl sm:text-2xl lg:text-3xl font-normal leading-tight text-[#f4e7cd] transition-colors group-hover:text-[#dedf42]"
            >
              {title}
            </h2>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
