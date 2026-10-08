import React from 'react';
import type { Metadata } from 'next';
import NewsEditorialView from '@/components/views/NewsEditorialView';

export const metadata: Metadata = {
  title: 'Warta & Berita Pewayangan | Wayang Jawi',
  description:
    'Portal warta dan kabar terkini seputar seni pewayangan Nusantara — UNESCO, maestro dalang, lakon pementasan, filosofi gunungan, dan festival seni budaya.',
};

export default function BeritaPage() {
  return <NewsEditorialView />;
}
