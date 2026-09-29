'use client';

import dynamic from 'next/dynamic';

const WayangStage = dynamic(() => import('@/components/WayangStage'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 grid place-items-center bg-[#0b0604] text-[#f4e7cd]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d9a441] border-t-transparent" />
        <p className="font-serif text-lg tracking-wide text-[#d9a441]">Menyiapkan Panggung Wayang…</p>
      </div>
    </div>
  ),
});

export default function StagePage() {
  return (
    <main className="w-full h-full min-h-screen bg-[#0b0604] overflow-hidden">
      <WayangStage />
    </main>
  );
}
