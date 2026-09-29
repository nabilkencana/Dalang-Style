import React from 'react';
import type { Metadata } from 'next';
import KatalogTokohView from '@/components/KatalogTokohView';

export const metadata: Metadata = {
  title: 'Katalog Tokoh Pewayangan | Wayang Jawi',
  description:
    'Jelajahi koleksi lengkap tokoh wayang kulit Nusantara — Semar, Petruk, Bagong, Gareng, Arjuna, Bima, Gatotkaca, Rahwana, dan Drona beserta watak filosofis dan pusaka saktinya.',
};

export default function KatalogPage() {
  return <KatalogTokohView />;
}
