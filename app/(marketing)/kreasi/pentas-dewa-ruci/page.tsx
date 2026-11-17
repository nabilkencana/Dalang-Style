import type { Metadata } from 'next';
import DewaRuciLivingStage from '@/components/story/DewaRuciLivingStage';

export const metadata: Metadata = {
  title: 'Pentas Hidup: Lakon Dewa Ruci | Wayang Jawi',
  description:
    'Prototipe pentas interaktif Lakon Dewa Ruci di Laut Kidul dengan animasi kanvas hidup, efek suara ombak dan gamelan, serta aksi Kuku Pancanaka.',
};

export default function PentasDewaRuciPage() {
  return <DewaRuciLivingStage />;
}
