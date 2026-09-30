import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonWithIconProps {
  children?: React.ReactNode;
  href?: string;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
}

const ButtonWithIcon = React.forwardRef<HTMLAnchorElement, ButtonWithIconProps>(
  (
    {
      children = "Panduan Mendalang",
      href = "/panduan",
      className = "",
      iconClassName = "",
      onClick,
    },
    ref,
  ) => {
    return (
      <Link
        ref={ref}
        href={href}
        onClick={onClick}
        className={cn(
          "relative inline-flex items-center text-xs sm:text-sm font-sans font-bold uppercase tracking-wider rounded-full h-11 sm:h-12 p-1 ps-5 sm:ps-6 pe-13 sm:pe-14 group transition-all duration-500 hover:ps-13 sm:hover:ps-14 hover:pe-5 sm:hover:pe-6 w-fit overflow-hidden cursor-pointer select-none bg-[#dedf42] text-black shadow-2xl hover:shadow-[0_10px_35px_rgba(222,223,66,0.4)] active:scale-95 shrink-0",
          className,
        )}
      >
        <span className="relative z-10 transition-all duration-500 whitespace-nowrap">
          {children}
        </span>
        <div
          className={cn(
            "absolute right-1 w-9 h-9 sm:w-10 sm:h-10 bg-black text-[#dedf42] rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-40px)] sm:group-hover:right-[calc(100%-44px)] group-hover:rotate-45 group-hover:bg-white group-hover:text-black shadow-md",
            iconClassName,
          )}
        >
          <ArrowUpRight className="size-4 sm:size-4.5" />
        </div>
      </Link>
    );
  },
);

ButtonWithIcon.displayName = "ButtonWithIcon";

export default ButtonWithIcon;
