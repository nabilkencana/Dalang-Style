'use client';

import React from 'react';
import FAQ, { type FAQItemData } from '@/components/ui/faq-tabs';

export interface SectionFAQProps {
  id?: string;
}

const FAQ_CATEGORIES: Record<string, string> = {
  panggung: "Panggung Virtual",
  kreasi: "Kisah Wayang",
  museum: "Galeri Museum",
  tokoh: "Tokoh & Filosofi",
};

const FAQ_DATA: Record<string, FAQItemData[]> = {
  panggung: [
    {
      question: "Bagaimana cara memainkan wayang di panggung virtual?",
      answer:
        "Buka menu Panggung di navigasi atas. Panggung menggunakan kamera atau webcam Anda untuk mendeteksi gestur tangan dan jari secara langsung melalui kecerdasan buatan (MediaPipe), memungkinkan Anda menggerakkan wayang kulit di atas kelir digital tanpa alat fisik tambahan.",
    },
    {
      question: "Apakah saya membutuhkan alat khusus atau aplikasi tambahan?",
      answer:
        "Tidak. Cukup gunakan peramban (browser) modern di laptop atau ponsel dengan kamera aktif. Seluruh sistem pelacakan gestur berjalan langsung di peramban tanpa perlu mengunduh aplikasi tambahan.",
    },
    {
      question: "Apakah rekaman video atau data kamera saya disimpan di server?",
      answer:
        "Tidak sama sekali. Seluruh proses pengenalan gestur tangan diproses secara lokal di perangkat Anda (client-side). Kami tidak pernah merekam, mengunggah, atau menyimpan data visual kamera Anda ke server.",
    },
    {
      question: "Tokoh wayang apa saja yang bisa digerakkan di panggung?",
      answer:
        "Saat ini Anda dapat memainkan tokoh-tokoh utama seperti Sang Bima, Sang Arjuna, Sang Gatotkaca, dan tokoh lainnya lengkap dengan pilihan iringan audio gamelan tradisional.",
    },
  ],
  kreasi: [
    {
      question: "Apa itu fitur Kisah Wayang?",
      answer:
        "Kisah Wayang adalah pustaka lakon digital berisi 9 lakon pilihan, seperti Dewa Ruci, Semar Mbangun Kayangan, dan Gatotkaca Gugur. Setiap lakon disajikan per babak lengkap dengan ilustrasi, profil tokoh, petuah luhur, dan penjelasan istilah Jawa agar mudah dipahami.",
    },
    {
      question: "Apa itu Pentas Hidup Lakon Dewa Ruci?",
      answer:
        "Pentas Hidup adalah versi interaktif Lakon Dewa Ruci. Anda mengikuti perjalanan Bima adegan demi adegan dengan menggulir layar, menentukan sikapnya di titik-titik penting, menghadapi raksasa dan Naga Nemburnawa, lalu menemukan sendiri makna \"air suci\" yang dicari Bima.",
    },
    {
      question: "Bagaimana cara menguji pemahaman setelah membaca lakon?",
      answer:
        "Di akhir setiap lakon tersedia Kuis Kilat & Refleksi Pemahaman. Jawab pertanyaan singkat seputar alur dan nilai luhur lakon tersebut untuk memastikan pesan ceritanya tersampaikan.",
    },
  ],
  museum: [
    {
      question: "Apa saja museum yang ditampilkan di galeri 3D?",
      answer:
        "Galeri menampilkan 16 museum pewayangan dan cagar budaya di Indonesia, seperti Museum Wayang Jakarta di Kota Tua, Museum Sonobudoyo Yogyakarta, Museum Radya Pustaka Surakarta, hingga Museum Bali di Denpasar.",
    },
    {
      question: "Bagaimana cara melihat informasi detail setiap museum?",
      answer:
        "Cukup klik salah satu kartu museum pada galeri 3D di atas. Jendela modal akan terbuka menampilkan sejarah bangunan, koleksi wayang bersejarah yang tersimpan, alamat, serta tautan penunjuk arah langsung ke Google Maps.",
    },
    {
      question: "Apakah foto dan informasi museum yang disajikan adalah tempat nyata?",
      answer:
        "Benar. Seluruh foto dan data yang ditampilkan bersumber dari museum fisik resmi yang dapat Anda kunjungi secara nyata di berbagai kota di Indonesia.",
    },
  ],
  tokoh: [
    {
      question: "Bagaimana cara mempelajari watak dan falsafah setiap tokoh wayang?",
      answer:
        "Anda dapat menjelajahi bagian Tokoh Wayang di halaman ini atau membuka Katalog Tokoh untuk membaca silsilah, watak luhur, senjata pusaka, serta falsafah hidup dari para ksatria dan punakawan.",
    },
    {
      question: "Apa makna simbolis kelir dan lampu blencong dalam tradisi wayang?",
      answer:
        "Kelir (layar putih) melambangkan bentangan alam jagad raya panggung kehidupan manusia, sedangkan lampu blencong melambangkan cahaya ilahi yang menghidupkan bayang-bayang di muka bumi.",
    },
    {
      question: "Mengapa tokoh Punakawan seperti Semar sangat dihormati?",
      answer:
        "Punakawan melambangkan kebijaksanaan rakyat jelata yang tulus. Tokoh Semar, meski jenaka dan bersahaja, dipandang sebagai pamong agung yang menuntun para ksatria agar senantiasa berpijak pada kebenaran dan kerendahan hati.",
    },
  ],
};

export default function SectionFAQ({ id = "faq" }: SectionFAQProps) {
  return (
    <FAQ
      id={id}
      title="Pustaka Tanya Jawab"
      subtitle="ꦥꦶꦠꦏꦺꦴꦤ꧀"
      categories={FAQ_CATEGORIES}
      faqData={FAQ_DATA}
    />
  );
}
