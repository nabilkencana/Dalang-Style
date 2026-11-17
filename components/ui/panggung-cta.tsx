import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface PanggungCTAProps {
  href?: string;
  label?: string;
  kicker?: string;
  className?: string;
}

/**
 * Tombol khusus menuju Panggung Wayang (fitur utama Wayang Jawi).
 * Dibuat seperti kelir kecil: layar gelap, nyala blencong yang berkedip,
 * dan gunungan yang "ditancapkan" miring saat disorot.
 */
export function PanggungCTA({
  href = '/stage',
  label = 'Mainkan Wayang Sekarang',
  kicker = 'Panggung Wayang · Kamera AI',
  className = '',
}: PanggungCTAProps) {
  return (
    <Link
      href={href}
      className={`group panggung-cta relative isolate inline-flex items-center gap-3 sm:gap-4 rounded-2xl border border-[#d9a441]/70 bg-[#140e0a] py-2.5 pl-2.5 pr-3 sm:pr-4 text-left shadow-[0_18px_40px_-12px_rgba(20,14,10,0.75)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#dedf42] hover:shadow-[0_24px_50px_-12px_rgba(20,14,10,0.85),0_0_32px_rgba(222,223,66,0.35)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#140e0a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#dedf42] ${className}`}
    >
      {/* Nyala blencong dari atas kelir */}
      <span
        aria-hidden="true"
        className="panggung-cta-glow pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(120%_90%_at_18%_0%,rgba(255,196,92,0.38),transparent_60%)]"
      />

      <span className="relative flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-xl bg-[radial-gradient(circle_at_50%_30%,#3a2410,#140e0a_70%)] ring-1 ring-[#d9a441]/40">
        <Image
          src="/images/gunungan-emas-bersih.webp"
          alt=""
          width={353}
          height={503}
          className="h-9 sm:h-11 w-auto origin-bottom drop-shadow-[0_0_8px_rgba(222,223,66,0.5)] transition-transform duration-500 ease-out group-hover:-rotate-[10deg] group-hover:scale-110 motion-reduce:transition-none"
        />
      </span>

      <span className="flex flex-col">
        <span className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#d9a441]">
          <span className="relative flex size-1.5" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ff6b4a] opacity-70 motion-reduce:hidden" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#ff6b4a]" />
          </span>
          {kicker}
        </span>
        <span className="font-serif italic font-bold text-lg sm:text-xl leading-tight text-[#f4e7cd] transition-colors group-hover:text-[#dedf42]">
          {label}
        </span>
      </span>

      <span className="ml-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#dedf42] text-[#140e0a] transition-transform duration-300 group-hover:translate-x-1">
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}
