"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface ImageGenerationProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  startingText?: string;
  generatingText?: string;
  completedText?: string;
  onCompleted?: () => void;
}

export const ImageGeneration = ({
  children,
  duration = 3200,
  className,
  startingText = "Menyiapkan kanvas tatahan...",
  generatingText = "Menatah wujud wayang kulit beraksen emas prada...",
  completedText = "Wayang kulit berhasil tercipta.",
  onCompleted,
}: ImageGenerationProps) => {
  const [progress, setProgress] = React.useState(0);
  const [loadingState, setLoadingState] = React.useState<
    "starting" | "generating" | "completed"
  >("starting");

  React.useEffect(() => {
    const startingTimeout = setTimeout(() => {
      setLoadingState("generating");

      const startTime = Date.now();

      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const progressPercentage = Math.min(
          100,
          (elapsedTime / duration) * 100,
        );

        setProgress(progressPercentage);

        if (progressPercentage >= 100) {
          clearInterval(interval);
          setLoadingState("completed");
          onCompleted?.();
        }
      }, 16);

      return () => clearInterval(interval);
    }, 600);

    return () => clearTimeout(startingTimeout);
  }, [duration, onCompleted]);

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <motion.span
        className="bg-[linear-gradient(110deg,#a8a29e,30%,#dedf42,50%,#d9a441,70%,#a8a29e)] dark:bg-[linear-gradient(110deg,var(--color-muted-foreground),35%,var(--color-foreground),50%,var(--color-muted-foreground),75%,var(--color-muted-foreground))] bg-[length:200%_100%] bg-clip-text text-transparent text-xs sm:text-sm font-medium"
        initial={{ backgroundPosition: "200% 0" }}
        animate={{
          backgroundPosition: loadingState === "completed" ? "0% 0" : "-200% 0",
        }}
        transition={{
          repeat: loadingState === "completed" ? 0 : Infinity,
          duration: 3,
          ease: "linear",
        }}
      >
        {loadingState === "starting" && startingText}
        {loadingState === "generating" && generatingText}
        {loadingState === "completed" && completedText}
      </motion.span>
      <div className="relative rounded-xl border border-[#d9a441]/30 bg-black/80 max-w-md overflow-hidden shadow-xl">
        {children}
        <motion.div
          className="absolute w-full h-[125%] -top-[25%] pointer-events-none backdrop-blur-3xl bg-black/60"
          initial={false}
          animate={{
            clipPath: `polygon(0 ${progress}%, 100% ${progress}%, 100% 100%, 0 100%)`,
            opacity: loadingState === "completed" ? 0 : 1,
          }}
          style={{
            clipPath: `polygon(0 ${progress}%, 100% ${progress}%, 100% 100%, 0 100%)`,
            maskImage:
              progress === 0
                ? "linear-gradient(to bottom, black -5%, black 100%)"
                : `linear-gradient(to bottom, transparent ${progress - 5}%, transparent ${progress}%, black ${progress + 5}%)`,
            WebkitMaskImage:
              progress === 0
                ? "linear-gradient(to bottom, black -5%, black 100%)"
                : `linear-gradient(to bottom, transparent ${progress - 5}%, transparent ${progress}%, black ${progress + 5}%)`,
          }}
        />
      </div>
    </div>
  );
};

ImageGeneration.displayName = "ImageGeneration";

export default ImageGeneration;
