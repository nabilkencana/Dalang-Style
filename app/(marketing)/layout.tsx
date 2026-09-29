import React from 'react';
import Link from 'next/link';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0604] text-[#f4e7cd] overflow-y-auto selection:bg-[#dedf42] selection:text-[#0b0604]">
      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
