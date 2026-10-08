import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SiteFrame from '@/components/layout/SiteFrame';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0604] text-[#f4e7cd] selection:bg-[#dedf42] selection:text-[#0b0604]">
      {/* Continuous Viewport Border Frame */}
      <SiteFrame />

      {/* Floating Animated Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
