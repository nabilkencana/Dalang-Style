# Storyboard "Komik Hidup" — Lakon Dewa Ruci

Format hybrid: komik scroll vertikal ala *The Boat* (SBS), dengan 3 adegan klimaks yang "membuka" jadi panggung interaktif (Gua, Naga, Dewa Ruci).
Benang merah seluruh lakon: **"Di mana sebenarnya air suci yang dicari Bima?"**

## Cara membaca tabel

- **Layout**
  - `full`: satu layar penuh, untuk momen besar.
  - `wide`: lebar penuh kolom, rasio 16:9, untuk tempat atau suasana.
  - `tall`: tinggi 3:4, untuk tokoh kecil di ruang besar.
  - `inset`: panel kecil di samping, untuk close-up dan reaksi.
  - `split`: dua panel kecil berdampingan, untuk aksi cepat atau pilihan.
  - `gutter`: ruang hitam kosong sebagai jeda; tingginya ditulis dalam vh.
  - `stage`: panggung WebGL interaktif yang sudah ada.
- **Teks**: maksimal ±15 kata per caption atau bubble. *Miring* = caption narator. "Kutip" = bubble tokoh.
- **Gerak**: parallax yang mengikuti scroll (`bg` lambat, `char` sedang, `fg` cepat), zoom pelan, atau getar.
- **Suara**: mood `StormSceneAudio` atau efek satu kali.
- **Aset**: `ADA` = file yang sudah ada (crop/zoom); `BARU-nn` = lihat daftar prompt AI di bawah.
- Durasi scroll kira-kira; total target 8–12 menit.

---

## 0 · Cold Open — "Bagaimana ia sampai di sini?"
| # | Layout | Visual | Teks | Gerak | Suara | Aset |
|---|---|---|---|---|---|---|
| 0.1 | full | Laut gelap, gelembung udara naik | *Dasar Laut Kidul.* | gelembung naik pelan | sunyi + dengung air | BARU-01 |
| 0.2 | inset | Close-up mata Bima terbelalak, sisik naga melilit leher | "…napasku…" | getar kecil | detak jantung | BARU-02 |
| 0.3 | wide | Siluet naga raksasa melingkari tubuh kecil Bima | — | naga merapat (char) | geraman rendah | ADA: `char-naga.png` + `bg-dasar-samudra.webp` |
| 0.4 | gutter 60vh | Hitam pekat | *Tiga hari sebelumnya…* (muncul di tengah) | fade | sunyi | — |

## 1 · Mimpi Buruk Astina (`nightmare`)
| # | Layout | Visual | Teks | Gerak | Suara | Aset |
|---|---|---|---|---|---|---|
| 1.1 | wide | Medan perang terbakar dalam mimpi | *Tiga malam, mimpi yang sama.* | api ber-parallax | gamelan suram | ADA: `bg-mimpi-duryudana.webp` |
| 1.2 | inset | Close-up Duryudana terbangun berkeringat | "Werkudara akan membunuh adik-adikku…" | zoom in | kenong | BARU-03 |
| 1.3 | inset (kanan) | Sangkuni berbisik di balik tirai, senyum licik | "Biar Drona yang menyingkirkannya." | geser dari kanan | bisikan | BARU-04 |
| 1.4 | gutter 30vh | — | — | — | — | — |

## 2 · Langkah Senja (`path`)
| # | Layout | Visual | Teks | Gerak | Suara | Aset |
|---|---|---|---|---|---|---|
| 2.1 | tall | Bima kecil di jalan bukit senja, padepokan jauh | *Bima tak mencari kesaktian.* | Bima melangkah naik (char) | angin | ADA: `bg-padepokan-jalan.webp` + `char-bima-jalan.png` |
| 2.2 | inset | Close-up wajah Bima menatap langit | "Untuk apa sebenarnya aku hidup?" | — | — | BARU-05 |

## 3 · Perintah Drona + **Pilihan 1** (`astina`)
| # | Layout | Visual | Teks | Gerak | Suara | Aset |
|---|---|---|---|---|---|---|
| 3.1 | wide | Balairung Astina, Bima berlutut di depan Drona | "Guru, ajari aku asal dan tujuan hidup." | parallax | gamelan istana | ADA: `bg-astina.webp` + `char-durna.png` + `char-bima.png` |
| 3.2 | inset | Close-up mata Drona melirik ke Sangkuni | — | — | nada ganjil | BARU-06 |
| 3.3 | wide | Drona menunjuk gunung jauh | "Cari Kayu Gung Susuhing Angin di Gunung Candramuka." | zoom ke gunung | kenong | ADA (crop) |
| 3.4 | full | **Judul pertanyaan inti** di layar hitam | *Di mana sebenarnya "air suci" itu?* + "Kumpulkan petunjuknya." | fade, huruf emas | gong | — |
| 3.5 | split | **Pilihan:** kiri "Patuh", kanan "Waspada" (dua panel Bima berbeda ekspresi) | kutipan pilihan yang sudah ada | panel terpilih membesar | kenong | BARU-07a/b |

## 4 · Gunung Candramuka (`forest`)
| # | Layout | Visual | Teks | Gerak | Suara | Aset |
|---|---|---|---|---|---|---|
| 4.1 | tall | Puncak tandus berkabut, Bima kecil mendaki | *Tak ada kayu. Hanya gua gelap.* | kabut lewat (fg) | angin gunung | ADA: `bg-candramuka.webp` |
| 4.2 | full → **stage** | Mulut gua makin besar memenuhi layar, lalu masuk panggung | — | zoom ke gua (transisi buka panggung) | geraman | ADA |

## 5 · **STAGE: Gua (sudah dibangun)**
Panggung bersendi dan timeline otomatis yang sudah ada, tanpa perubahan. Pilihan Amarah/Hening menghasilkan **Petunjuk 1**.

## 6 · Drona Kaget (`astina`)
| # | Layout | Visual | Teks | Gerak | Suara | Aset |
|---|---|---|---|---|---|---|
| 6.1 | inset | Close-up Drona terkejut, mata melotot | *(Gila, ia selamat!)* | getar kecil | — | BARU-08 |
| 6.2 | wide | Drona menunjuk ke selatan | "Cari Tirta Perwitasari di dasar samudra!" | parallax | gong rendah | ADA (crop `bg-astina`) |

## 7 · Pamitan Amarta (sunyi)
| # | Layout | Visual | Teks | Gerak | Suara | Aset |
|---|---|---|---|---|---|---|
| 7.1 | wide | Kunti menangis, adik-adik memeluk kaki Bima | "Jangan pergi, Kakang!" | — | gamelan lirih | ADA: `scene-pamitan-amarta.webp` |
| 7.2 | inset | Close-up tangan Kunti melepas tangan Bima | — | lambat | sunyi | BARU-09 |
| 7.3 | gutter 40vh | Hitam | *Ia tetap pergi.* | — | — | — |

## 8 · Anoman + **Pilihan 2** (`path`)
| # | Layout | Visual | Teks | Gerak | Suara | Aset |
|---|---|---|---|---|---|---|
| 8.1 | wide | Anoman menghadang di jalan | "Drona itu guru perang, bukan guru batin!" | Anoman masuk dari kanan | angin | ADA: `char-anoman.png` + `bg-padepokan-jalan.webp` |
| 8.2 | split | **Pilihan:** Hormat / Teguh | kutipan yang sudah ada | panel terpilih membesar | kenong | BARU-10a/b |
| 8.3 | inset | Anoman tersenyum haru | *Petunjuk 2 ditemukan* | — | tick | BARU-11 |

## 9 · Tebing → Terjun (komik "jatuh", `storm`)
| # | Layout | Visual | Teks | Gerak | Suara | Aset |
|---|---|---|---|---|---|---|
| 9.1 | wide | Bima di ujung tebing, ombak menggunung | *Ia tak bisa berenang.* | ombak naik-turun | ombak (volume di-scrub naik) | ADA: `bg-tebing-laut-burung.webp` |
| 9.2 | inset | Dua burung terbang tenang di tengah badai | "Mereka tak takut…" | burung melintas | — | ADA (crop) |
| 9.3 | full (tombol) | Tombol **"Bulatkan Tekad & Terjun"** | — | — | — | — |
| 9.4 | tall 300vh | **Jatuh panjang:** Bima menukik, langit → buih → bawah air; warna berubah dari emas ke biru gelap | *…* | Bima tetap di tengah layar, latar bergulir ke atas | ombak memuncak lalu splash, lalu sunyi | ADA: `char-bima-terjun.png` + `bg-laut-kidul.webp` + `bg-dasar-samudra.webp` |
| 9.5 | gutter 40vh | Gelap, satu gelembung | *Dan gelap kembali seperti di awal.* (menyambung ke cold open) | — | dengung air | — |

## 10 · **STAGE: Naga** (sudah ada)
Pilihan Hening/Terjang, lalu tebas 3 kali. Hasilnya **Petunjuk 3**, dan *"Sekarang kamu tahu bagaimana ia sampai di sini."*

## 11 · **STAGE: Dewa Ruci** (sudah ada)
User menebak lokasi air suci, lalu mendengar wejangan, masuk Guwa Garba, dan melihat rekap 4 nafsu dari perjalanannya sendiri.

## 12 · Pulang (`path` → `dawn`)
| # | Layout | Visual | Teks | Gerak | Suara | Aset |
|---|---|---|---|---|---|---|
| 12.1 | wide | Fajar di pantai, Bima keluar dari laut | *Ia kembali dengan rambut tergelung—tanda rendah hati.* | matahari naik | ombak tenang | BARU-12 |
| 12.2 | wide | Bima mengangkat Drona yang hampir tenggelam | "Jangan mencebur, Guru!" | — | gamelan lembut | ADA: `scene-drona-ditolong.webp` |
| 12.3 | inset | Close-up Drona menangis malu | — | — | — | BARU-13 |
| 12.4 | full | Amarta pagi → kartu akhir (sudah ada) | jawaban pertanyaan inti | — | blessing | ADA: `bg-amarta-pagi.webp` |

---

## Daftar Prompt AI (BARU-nn)

**Template gaya** (tempel di awal setiap prompt agar konsisten dengan aset sekarang):
> Dark ink comic illustration, heavy black linework, cel shading, palette of antique gold, burnt umber, sepia and deep black, Javanese wayang ornamentation (batik and keris motifs) on clothing and borders, dramatic rim light, cinematic composition, no text, no watermark.

**Referensi karakter** (lampirkan ke generator sebagai image reference):
- Bima → `char-bima.png`
- Drona → `char-durna.png`
- Duryudana → `char-duryudana.png`
- Sangkuni → `char-sangkuni.png`
- Anoman → `char-anoman.png`

| Kode | Rasio | Isi prompt (setelah template) |
|---|---|---|
| BARU-01 | 9:16 | Underwater abyss of the southern sea, faint light shafts from above, rising air bubbles, empty and ominous |
| BARU-02 | 1:1 | Extreme close-up of Bima's wide terrified eye, dark scaled serpent coil pressing his neck, bubbles escaping |
| BARU-03 | 1:1 | Close-up King Duryudana waking from a nightmare, sweat, wide eyes, lamp light from below |
| BARU-04 | 3:4 | Patih Sangkuni whispering behind a palace curtain, sly half smile, one eye in shadow |
| BARU-05 | 1:1 | Close-up Bima looking up at a dusk sky, contemplative, lonely, warm sunset glow |
| BARU-06 | 16:9 | Extreme close-up of sage Drona's eyes glancing sideways, guilty, shadowed palace interior |
| BARU-07a | 3:4 | Bima bowing his head obediently, hands pressed together, calm devotion |
| BARU-07b | 3:4 | Bima turning his head with suspicious narrowed eyes, alert, hand near his golden claw |
| BARU-08 | 1:1 | Close-up Drona shocked, eyes bulging, beard trembling, palace lamplight |
| BARU-09 | 16:9 | Close-up of an elderly mother's hands slowly letting go of a large warrior's hand, tears falling |
| BARU-10a | 3:4 | Bima speaking respectfully with palms open, gentle determination |
| BARU-10b | 3:4 | Bima standing firm with fists clenched, steady resolute gaze |
| BARU-11 | 1:1 | White monkey sage Anoman smiling with moved, teary eyes |
| BARU-12 | 16:9 | Dawn on a calm southern beach, Bima wading out of the sea, hair tied in a humble bun, golden sunrise |
| BARU-13 | 1:1 | Close-up old sage Drona weeping in shame, wet beard, soft morning light |

**Ukuran ekspor:** `.webp`, lebar 1440 px (`full`/`wide`) atau 720 px (`inset`/`split`), kualitas 80.
**Simpan sebagai:** `public/images/stories/dewa-ruci/panels/baru-01.webp` dan seterusnya.

---

## Cek pemahaman (untuk uji ke penonton awam)
1. Kenapa Bima pergi ke gunung dan laut?
2. Di mana sebenarnya air suci itu?
3. Sebutkan satu dari 4 warna nafsu dan contohnya dari ceritanya.
