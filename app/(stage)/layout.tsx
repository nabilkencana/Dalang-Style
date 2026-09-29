import React from 'react';

export default function StageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#0b0604] m-0 p-0">
      {children}
    </div>
  );
}
