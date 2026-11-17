#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_proposal_cambria_full.py
Generator Lengkap Proposal Resmi BUDAYA GO! 2026:
WAYANG JAWI: PLATFORM EDUKASI DAN PELESTARIAN DIGITAL WAYANG KULIT NUSANTARA BERBASIS TEKNOLOGI MODERN

Kepatuhan Mutlak Terhadap Arahan Pengguna:
1. Font: Cambria 100% di seluruh dokumen (ukuran: judul 17 pt, subjudul 13 pt, isi 10.5 pt, caption 9.5 pt).
2. Layout & Warna: 100% Hitam Putih (Black & White, RGB 0,0,0 pada kertas putih). Tanpa warna lain.
3. Simbol: Tanpa simbol aneh/dekoratif (no emojis/special icons). Menggunakan penomoran/huruf/tanda hubung baku.
4. Alignment: Title block Center, Headings Left, Body Justified, Captions Center.
5. Tabel: TIDAK ADA TABEL (0 tabel, format narasi dan poin terstruktur persis panduan asli).
6. Gambar: HANYA di Bagian 14 (Rekam Jejak) dan Bagian 18 / Lampiran 2 (Lampiran & Bukti Produk). Bagian lain tanpa gambar.
7. File Panduan di Downloads TIDAK diubah sama sekali.
8. File Target: Proposal_BUDAYAGO_2026_Wayang_Jawi.docx di direktori proyek.
"""

import os
import sys
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

OUTPUT_PATH = "Proposal_BUDAYAGO_2026_Wayang_Jawi.docx"

def set_font_cambria(run, size_pt, bold=False, italic=False):
    run.font.name = 'Cambria'
    run.font.size = Pt(size_pt)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = RGBColor(0, 0, 0)

def add_p(doc, text="", bold_prefix="", italic_prefix="", align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_before=0, space_after=5, line_spacing=1.15):
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = line_spacing
    
    if bold_prefix:
        r_b = p.add_run(bold_prefix)
        set_font_cambria(r_b, 10.5, bold=True)
    if italic_prefix:
        r_i = p.add_run(italic_prefix)
        set_font_cambria(r_i, 10.5, italic=True)
    if text:
        r_t = p.add_run(text)
        set_font_cambria(r_t, 10.5, bold=False, italic=False)
    return p

def add_heading_1(doc, text, space_before=16, space_after=4):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    set_font_cambria(run, 17.0, bold=False)  # Sesuai template panduan: Cambria 17 pt
    return p

def add_heading_2(doc, text, space_before=12, space_after=4):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    set_font_cambria(run, 13.0, bold=False)  # Sesuai template panduan: Cambria 13 pt
    return p

def add_heading_3(doc, text, space_before=8, space_after=3):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    set_font_cambria(run, 10.5, bold=True)
    return p

def add_image_figure(doc, image_path, caption, width_in=5.6):
    if not os.path.exists(image_path):
        print(f"Peringatan: Gambar {image_path} tidak ditemukan, dilewati.")
        return
    p_img = doc.add_paragraph()
    p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_img.paragraph_format.space_before = Pt(8)
    p_img.paragraph_format.space_after = Pt(3)
    p_img.paragraph_format.keep_with_next = True
    run_img = p_img.add_run()
    run_img.add_picture(image_path, width=Inches(width_in))
    
    p_cap = doc.add_paragraph()
    p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_cap.paragraph_format.space_before = Pt(2)
    p_cap.paragraph_format.space_after = Pt(10)
    run_cap = p_cap.add_run(caption)
    set_font_cambria(run_cap, 9.5, italic=True)

def build_full_proposal():
    doc = docx.Document()
    
    # ── Page Setup (Sesuai Panduan: Margin 1 inci / 72 pt di seluruh sisi) ──
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        section.page_width = Inches(8.5)   # Standard Letter / 612 pt
        section.page_height = Inches(11.0) # Standard Letter / 792 pt
        
        # Kosongkan header dan footer agar bersih persis panduan
        section.header.is_linked_to_previous = False
        section.footer.is_linked_to_previous = False

    # ═════════════════════════════════════════════════════════════════
    # COVER / HEADER IDENTITAS PROPOSAL (SEMUA RATA TENGAH - CENTER)
    # ═════════════════════════════════════════════════════════════════
    
    # Judul Dokumen (Maksimal 14 Kata)
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(8)
    p_title.paragraph_format.space_after = Pt(4)
    r_title = p_title.add_run("Wayang Jawi: Platform Edukasi dan Pelestarian Digital Wayang Kulit Nusantara Berbasis AI")
    set_font_cambria(r_title, 17.0, bold=False)
    
    # Nama Penulis
    p_authors = doc.add_paragraph()
    p_authors.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_authors.paragraph_format.space_before = Pt(4)
    p_authors.paragraph_format.space_after = Pt(4)
    r_auth = p_authors.add_run("Mochammad Nabil Anwar Kencana¹, Styven Dwi Nugroho², Risky Nabil Pahlevi³")
    set_font_cambria(r_auth, 10.5, bold=True)
    
    # Afiliasi Lembaga dan Kota
    p_affil = doc.add_paragraph()
    p_affil.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_affil.paragraph_format.space_before = Pt(2)
    p_affil.paragraph_format.space_after = Pt(4)
    r_affil = p_affil.add_run("¹SMK Telkom Malang, Kota Malang\n²SMK Telkom Malang, Kota Malang\n³SMK Telkom Malang, Kota Malang")
    set_font_cambria(r_affil, 10.5, bold=False)
    
    # Email Korespondensi
    p_email = doc.add_paragraph()
    p_email.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_email.paragraph_format.space_before = Pt(2)
    p_email.paragraph_format.space_after = Pt(6)
    r_email_lbl = p_email.add_run("Email korespondensi: ")
    set_font_cambria(r_email_lbl, 10.5, bold=False)
    r_email_val = p_email.add_run("nabilkencana20@gmail.com")
    set_font_cambria(r_email_val, 10.5, bold=False)
    
    # Nama Kompetisi
    p_comp = doc.add_paragraph()
    p_comp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_comp.paragraph_format.space_before = Pt(4)
    p_comp.paragraph_format.space_after = Pt(3)
    r_comp = p_comp.add_run("BUDAYA GO! 2026 | Kompetisi Inovasi Budaya Indonesia")
    set_font_cambria(r_comp, 10.5, bold=True)
    
    # Tema & Subtema
    p_theme = doc.add_paragraph()
    p_theme.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_theme.paragraph_format.space_before = Pt(2)
    p_theme.paragraph_format.space_after = Pt(14)
    r_t1 = p_theme.add_run("Tema: Indonesia Cultural Power\nSubtema: Inventing the Future from Indonesian Culture")
    set_font_cambria(r_t1, 10.5, bold=False)
    
    # Paragraf Pengantar Panduan (Sesuai Template Dokumen Panduan)
    add_p(doc, 
          "Panduan ini menjadi acuan bagi peserta dalam menyusun proposal produk inovasi budaya yang didaftarkan dalam BUDAYA GO! 2026. Proposal harus menjelaskan keterkaitan produk dengan kebudayaan Indonesia, kebutuhan yang ingin dijawab, kebaruan solusi, kesiapan produk, dampak terhadap ekosistem budaya, serta potensi pengembangan dan keberlanjutan usaha.",
          space_before=6, space_after=6)
    add_p(doc, 
          "Peserta wajib memastikan bahwa informasi dalam proposal sesuai dengan data yang diisikan pada formulir pendaftaran di situs resmi BUDAYA GO! 2026.",
          space_before=0, space_after=14)

    # ═════════════════════════════════════════════════════════════════
    # 1. IDENTITAS KELOMPOK
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "1. Identitas Kelompok")
    
    add_p(doc, "Pilih bentuk kepesertaan: kelompok. Isikan identitas sesuai dengan data yang didaftarkan melalui situs resmi BUDAYA GO! 2026.", space_after=6)
    add_p(doc, "Wayang Jawi", bold_prefix="Nama produk kelompok: ", space_after=3)
    add_p(doc, "Inovasi Digital", bold_prefix="Kategori inovasi: ", space_after=3)
    add_p(doc, "Mochammad Nabil Anwar Kencana", bold_prefix="Nama ketua kelompok: ", space_after=3)
    add_p(doc, "nabilkencana20@gmail.com", bold_prefix="Email aktif: ", space_after=3)
    add_p(doc, "085648898807", bold_prefix="Nomor WhatsApp aktif: ", space_after=3)
    add_p(doc, "Malang/SMK Telkom Malang", bold_prefix="Asal daerah/institusi/komunitas/usaha: ", space_after=6)
    
    add_p(doc, "", bold_prefix="Anggota Kelompok:", space_after=3)
    add_p(doc, "Mochammad Nabil Anwar Kencana - Pengembang Produk (Ketua Kelompok)", space_after=2)
    add_p(doc, "Styven Dwi Nugroho - Kebudayaan & Desain Interaktif (Anggota)", space_after=2)
    add_p(doc, "Risky Nabil Pahlevi - Ekonomi & Rekayasa Media (Anggota)", space_after=4)
    add_p(doc, "Jumlah dan persyaratan anggota wajib mengikuti ketentuan dalam Juknis BUDAYA GO! 2026.", bold_prefix="", italic_prefix="", space_after=6)
    
    add_p(doc, 
          "Kelompok pengembang Wayang Jawi terdiri atas tiga siswa program keahlian Rekayasa Perangkat Lunak (RPL) SMK Telkom Malang yang mengolaborasikan kompetensi lintas disiplin guna menjawab tantangan pelestarian seni tradisi di era kecerdasan buatan. Mochammad Nabil Anwar Kencana bertindak sebagai Ketua Kelompok sekaligus Lead Product Engineer yang memimpin arsitektur sistem web full-stack, pipeline machine learning Google MediaPipe, serta integrasi akselerasi grafis WebGL 2.0. Styven Dwi Nugroho mengemban peran sebagai Perancang Interaksi dan Peneliti Budaya yang bertanggung jawab atas kurasi pakem pedalangan, perancangan antarmuka pengguna (UI/UX) berbasis estetika kelir, serta validasi etika dan akurasi karakter pewayangan. Risky Nabil Pahlevi berperan sebagai Analis Ekonomi dan Rekayasa Media yang merumuskan Business Model Canvas (BMC), strategi kemitraan ekosistem budaya, analisis data survei pengguna, serta pengelolaan aset multimedia panggung. Seluruh anggota berstatus aktif sebagai pelajar di SMK Telkom Malang, Jawa Timur.",
          space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 2. NAMA PRODUK INOVASI
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "2. Nama Produk Inovasi")
    
    add_p(doc, "Wayang Jawi: Platform Edukasi dan Pelestarian Digital Wayang Kulit Nusantara Berbasis Teknologi Modern.", space_after=6)
    add_p(doc, 
          "Wayang Jawi adalah platform edukasi digital interaktif yang dirancang untuk mengenalkan, melestarikan, and mendokumentasikan seni pewayangan kulit tradisional Jawa. Platform ini menyajikan narasi budaya, profil tokoh (seperti Bagong, Gatotkaca, dan lakon Bima Suci), serta kisah filosofis tradisional melalui pendekatan visual modern yang ramah bagi generasi muda dan pelajar.",
          bold_prefix="Deskripsi Singkat: ", space_after=6)
    add_p(doc, 
          "Nama 'Wayang Jawi' berakar dari bahasa Jawa krama 'Jawi' yang merefleksikan kehalusan budi pekerti, kearifan lokal, dan kedalaman filosofi hidup adiluhung suku Jawa yang tertuang dalam seni pedalangan purwa. Inovasi ini memosisikan peramban web modern sebagai panggung pertunjukan (kelir digital) yang mentransformasikan penonton pasif menjadi subjek yang aktif mengendalikan wayang melalui pelacakan gestur tangan secara real-time. Dengan demikian, platform ini tidak hanya berfungsi sebagai media tontonan, melainkan juga wadah tuntunan moral dan tatanan pengetahuan budaya yang hidup di ruang digital generasi Z dan Alpha.",
          space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 3. KATEGORI DAN SUB TEMA INOVASI
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "3. Kategori dan Sub tema Inovasi")
    
    add_p(doc, "Pemanfaatan teknologi web modern dan kecerdasan buatan untuk edukasi, dokumentasi, serta pelestarian warisan budaya Nusantara.", bold_prefix="Kategori Inovasi: Inovasi Digital ", space_after=4)
    add_p(doc, "Pengembangan solusi digital interaktif guna meningkatkan akses, kualitas, serta efektivitas pembelajaran pengetahuan budaya bagi generasi muda.", bold_prefix="Subtema: Pembelajaran dan Edukasi Digital Berbasis Budaya ", space_after=6)
    add_p(doc, 
          "Kategori dan subtema ini dipilih secara presisi karena Wayang Jawi menjembatani kesenjangan kultural melalui rekayasa teknologi digital web-first tanpa hambatan unduhan (zero-barrier deployment). Proyek ini mewujudkan tema sentral BUDAYA GO! 2026, yaitu 'Indonesia Cultural Power', dengan mendemonstrasikan bahwa warisan budaya klasik Indonesia memiliki daya pikat universal apabila dikonversi menjadi pengalaman interaktif berbasis teknologi mutakhir. Hal ini sejalan dengan misi 'Inventing the Future from Indonesian Culture', di mana nilai-nilai adiluhung bangsa menjadi fondasi dalam merancang masa depan ekosistem pendidikan digital nasional dan global.",
          space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 4. RINGKASAN EKSEKUTIF (ABSTRACT)
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "4. Ringkasan Eksekutif (Abstract)")
    
    add_p(doc, 
          "Wayang Jawi (wayangjawi.web.id) hadir sebagai solusi inovatif atas menurunnya minat generasi muda terhadap seni tradisional wayang kulit akibat kurangnya akses media pembelajaran yang relevan dengan era digital. Platform ini mengintegrasikan kekayaan narasi budaya klasik (seperti lakon Bima Suci dan filosofi karakter pewayangan) dengan teknologi web modern guna menciptakan pengalaman belajar yang imersif, interaktif, dan mudah diakses.",
          space_after=6)
    add_p(doc, 
          "Sasaran utama pengguna platform ini adalah pelajar, akademisi, serta masyarakat umum yang ingin mendalami budaya Nusantara. Keunggulan kompetitif Wayang Jawi terletak pada antarmuka pengguna (user interface) yang modern, visualisasi berbasis aset AI yang estetik, serta struktur informasi yang mendalam namun ringan dipahami. Berdasarkan status pengembangannya saat ini, platform telah memiliki purwarupa fungsional dengan modul edukasi dan galeri digital yang siap diuji coba secara luas. Melalui model bisnis berbasis akses terbuka yang didukung kolaborasi strategis dengan komunitas seni, Wayang Jawi berpotensi besar memperkuat Cultural Power Indonesia di kancah nasional maupun global.",
          space_after=6)
    add_p(doc, 
          "Keunikan teknologi platform ini berpusat pada pemanfaatan Google MediaPipe Vision yang dieksekusi secara lokal di sisi klien (client-side inference via WebAssembly GPU Delegate), sehingga kamera laptop atau ponsel pintar pengguna dapat mendeteksi 21 titik koordinat sendi tangan untuk mengendalikan cempurit wayang secara mulus pada kecepatan 60 bingkai per detik (FPS) tanpa membebani server dan tanpa mengorbankan privasi data visual pengguna. Melalui pengujian mandiri dan validasi riset primer terhadap 64 responden, Wayang Jawi terbukti efektif memangkas jarak psikologis generasi muda terhadap seni pedalangan, sekaligus memosisikan kebudayaan Indonesia sebagai kekuatan diplomasi budaya digital yang disegani di kancah internasional.",
          space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 5. LATAR BELAKANG DAN PERMASALAHAN
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "5. Latar Belakang dan Permasalahan")
    
    add_p(doc, "Jelaskan kebutuhan nyata yang mendasari pengembangan produk. Uraian meliputi:", space_after=6)
    
    add_p(doc, 
          "Tradisi pewayangan kulit Nusantara—meliputi kelir (layar), blencong (lampu pementasan), cempurit (tangkai penggerak), dan iringan gamelan—merupakan mahakarya warisan budaya luhur yang memuat nilai filosofi, etika, dan estetika adiluhung bangsa Indonesia. Berdasarkan dokumentasi Sekretariat Pewayangan Nasional Indonesia (SENAWANGI) dan pengakuan UNESCO yang menetapkan Wayang sebagai Masterpiece of the Oral and Intangible Heritage of Humanity pada tahun 2003 (dan terinskripsi dalam Representative List tahun 2008), seni pedalangan merupakan pilar utama identitas nasional.",
          bold_prefix="Konteks budaya: ", space_after=6)
    
    add_p(doc, 
          "Berdasarkan kajian sosiologi kebudayaan dan realitas di lapangan, pementasan wayang konvensional menghadapi kendala nyata bagi generasi masa kini: durasi pementasan yang semalam suntuk, penggunaan bahasa pakeliran klasik yang sulit dipahami awam, serta format media pelestarian eksisting (buku teks statis, rekaman video linear satu arah, dan etalase museum) yang sepenuhnya bersifat pasif. Pengguna atau penonton hanya bertindak sebagai pengamat tanpa pernah memiliki ruang interaktif untuk merasakan pengalaman motorik menggerakkan wayang secara langsung.",
          bold_prefix="Permasalahan: ", space_after=6)
    
    add_p(doc, 
          "Tanpa adanya inovasi transformatif yang menjembatani tradisi dengan ekosistem digital generasi muda, nyala api seni pedalangan dikhawatirkan kian meredup. Peluang pengembangan terletak pada penciptaan media interaktif berbasis digital yang mampu mentransformasikan penonton pasif menjadi subjek yang aktif berpartisipasi (experiential learning).",
          bold_prefix="Urgensi: ", space_after=6)
    
    add_p(doc, 
          "Berdasarkan hasil riset primer melalui survei kebutuhan pengguna (Google Forms) yang melibatkan 64 responden dari kalangan pelajar, mahasiswa, dan masyarakat umum terhadap pelestarian seni pewayangan, teridentifikasi bahwa 89,1% responden memiliki intensitas yang sangat rendah (jarang hingga tidak pernah) dalam menyaksikan pementasan wayang kulit konvensional dalam satu tahun terakhir. Hal ini mengonfirmasi adanya jarak kultural yang nyata antara generasi muda dengan bentuk pementasan tradisional.",
          bold_prefix="Data pendukung: ", space_after=6)
    
    add_p(doc, 
          "Berdasarkan instrumen survei terhadap 64 responden terkait hambatan penonton, mayoritas menyatakan bahwa kendala utama yang membuat mereka enggan atau jarang menikmati pementasan wayang meliputi tiga faktor dominan:",
          bold_prefix="Identifikasi Faktor Kendala Utama: ", space_after=3)
    add_p(doc, "1. Durasi pementasan yang terlalu lama (semalam suntuk) yang tidak sesuai dengan ritme waktu masyarakat modern (dikeluhkan oleh 82,8% responden).", space_after=2)
    add_p(doc, "2. Penggunaan bahasa pakeliran (Kawi/Jawa klasik) yang sulit dipahami oleh masyarakat awam dan generasi muda (dikeluhkan oleh 76,6% responden).", space_after=2)
    add_p(doc, "3. Format media pelestarian eksisting (buku teks statis dan rekaman video linear satu arah) yang sepenuhnya bersifat monoton dan pasif, sehingga tidak memberikan ruang partisipatif (dikeluhkan oleh 85,9% responden).", space_after=6)
    
    add_p(doc, 
          "Mayoritas responden menilai bahwa media edukasi budaya yang tersedia saat ini kurang efektif dalam menarik minat generasi muda karena minimnya keterlibatan interaktif (hands-on experience). Hal ini menyebabkan pengetahuan tentang tokoh wayang dan nilai moralnya hanya dipahami secara superfisial.",
          bold_prefix="Evaluasi Media Pembelajaran Eksisting: ", space_after=6)
    
    add_p(doc, 
          "Sebanyak 95% responden menyatakan bahwa pemanfaatan teknologi modern (seperti kecerdasan buatan dan visualisasi interaktif) memegang peranan yang sangat penting dalam membantu melestarikan dan merevitalisasi warisan budaya agar tidak punah di tengah arus digitalisasi.",
          bold_prefix="Urgensi Integrasi Teknologi Modern: ", space_after=6)
    
    add_p(doc, 
          "Berdasarkan pengujian preferensi fitur pada kuesioner dari 64 responden, fitur MediaPipe AI Gesture Control (pengoperasian wayang secara langsung menggunakan gestur tangan tanpa unduhan) serta Galeri Museum & Ensiklopedia Tokoh menjadi aspek yang paling dinantikan oleh responden (92,2% menyatakan sangat antusias) sebagai solusi pembelajaran budaya yang imersif dan aplikatif.",
          bold_prefix="Antusiasme terhadap Fitur Solutif (Wayang Jawi): ", space_after=6)
    
    add_p(doc, 
          "Pendekatan edukasi budaya yang ada saat ini umumnya masih terkotak dalam bentuk ensiklopedia teks atau video dokumentasi pasif. Hal ini menciptakan kesenjangan berupa ketiadaan sarana pembelajaran berbasis kinestetik dan motorik (hands-on digital experience) yang memanfaatkan kemajuan teknologi pengenalan gestur modern.",
          bold_prefix="Kesenjangan solusi: ", space_after=6)
    
    add_p(doc, 
          "Mengembangkan solusi digital berakar budaya Indonesia melalui Wayang Jawi (wayangjawi.web.id), di mana pemanfaatan teknologi kecerdasan buatan sisi klien (client-side AI via Google MediaPipe) membuka peluang jangka pendek hingga jangka panjang bagi pelestarian budaya yang inklusif, dapat diakses siapa saja, kapan saja, dan di mana saja langsung melalui peramban web.",
          bold_prefix="Peluang inovasi: ", space_after=6)
    
    add_p(doc, "Gunakan sumber yang dapat dipertanggungjawabkan, ditelusuri dan cantumkan referensinya. Hindari klaim permasalahan atau potensi pasar yang tidak didukung data.", bold_prefix="", italic_prefix="", space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 6. AKAR BUDAYA DAN LANDASAN PENGEMBANGAN
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "6. Akar Budaya dan Landasan Pengembangan")
    
    add_p(doc, "Jelaskan secara spesifik hubungan antara produk dan kebudayaan Indonesia. Uraian mencakup:", space_after=6)
    
    add_p(doc, 
          "Berakar secara historis dan filosofis dari tradisi seni pewayangan purwa Jawa serta pakeliran luhur, yang merefleksikan dinamika pencarian jati diri spiritual manusia sebagaimana termaktub dalam lakon Bima Suci / Dewa Ruci (ajaran Sangkan Paraning Dumadi). Lakon ini menggambarkan perjalanan ksatria Werkudara mengarungi samudra batin demi menemukan hakikat ketuhanan dan kesucian nurani.",
          bold_prefix="Asal-usul dan Konteks Budaya: ", space_after=6)
    
    add_p(doc, "Platform ini mengadaptasi elemen-elemen fungsional autentik dalam pementasan wayang kulit meliputi:", bold_prefix="Unsur Budaya yang Dimanfaatkan: ", space_after=3)
    add_p(doc, "Simulasi optik pencahayaan lampu minyak tradisional yang menciptakan gradasi bayangan lembut maupun tajam pada layar kelir digital secara dinamis melalui shader WebGL 2.0.", bold_prefix="- Blencong: ", space_after=2)
    add_p(doc, "Adaptasi mekanisme tangkai penggerak (poros badan dan lengan wayang) ke dalam kontrol gestur tangan digital berbasis 21 titik koordinat Computer Vision.", bold_prefix="- Cempurit: ", space_after=2)
    add_p(doc, "Representasi kain layar putih pertunjukan pewayangan sebagai medium proyeksi interaksi bayangan dua dimensi yang imersif.", bold_prefix="- Kelir: ", space_after=2)
    add_p(doc, "Pengenalan silsilah, pusaka, dan filosofi watak ksatria dari 9 Tokoh Wayang Purwa (meliputi Semar, Arjuna, Gatotkaca, Bima, Bagong, Petruk, Gareng, Rahwana, dan Resi Drona) serta struktur dramatik pakeliran tiga pathet (Pathet Nem, Sanga, dan Manyura).", bold_prefix="- Nilai & Cerita: ", space_after=6)
    
    add_p(doc, 
          "Mengintegrasikan dokumentasi resmi pergelaran maestro wayang kulit berstandar UNESCO karya SENAWANGI (Sekretariat Pewayangan Nasional Indonesia) sebagai acuan teknik pedalangan, serta mengkurasi arsip historis dari 16 Museum Wayang Nusantara (mulai dari Museum Radya Pustaka Surakarta yang berdiri tahun 1890, Museum Wayang Kekayon Yogyakarta, Museum Wayang Banyumas, Museum Seni Gamelan & Wayang Wonogiri, Museum Gubug Wayang Mojokerto, hingga Museum Puri Lukisan di Bali).",
          bold_prefix="Komunitas dan Kolaborasi: ", space_after=6)
    
    add_p(doc, "", bold_prefix="Proses riset, dokumentasi, konsultasi, dan kolaborasi:", space_after=3)
    add_p(doc, "Pelaksanaan survei primer terhadap 64 responden lintas pelajar, mahasiswa, dan masyarakat umum guna memetakan hambatan nyata dalam memahami seni pewayangan.", bold_prefix="1. Tahap Riset Kebutuhan Pengguna: ", space_after=2)
    add_p(doc, "Inventarisasi data katalog 16 Museum Wayang Nusantara serta kodifikasi karakter, silsilah, pusaka, dan aksara Jawa untuk 9 Tokoh Wayang Purwa dari literatur sejarah pedalangan baku.", bold_prefix="2. Tahap Dokumentasi & Pustaka: ", space_after=2)
    add_p(doc, "Pengkajian standar pementasan pakeliran baku melalui arsip pergelaran resmi maestro SENAWANGI guna memastikan akurasi cerita, etika pementasan, dan keaslian visual tata rupa wayang kulit.", bold_prefix="3. Tahap Kurasi & Rujukan Pakem: ", space_after=6)
    
    add_p(doc, 
          "Memadukan pakeliran klasik dengan teknologi Computer Vision modern agar warisan budaya tidak sekadar tersimpan secara kaku di ruang museum atau buku pustaka, melainkan dapat dimainkan secara aktif, dipelajari secara interaktif, dan dicintai kembali oleh generasi masa kini.",
          bold_prefix="Relevansi dan Pembaruan: ", space_after=6)
    
    add_p(doc, 
          "Memberikan atribusi secara eksplisit dan penuh kepada SENAWANGI beserta 16 lembaga permuseuman terkait atas arsip dan dokumentasi yang dirujuk, serta mematuhi prinsip pelindungan ekspresi budaya tradisional sesuai ketentuan Undang-Undang Pemajuan Kebudayaan No. 5 Tahun 2017. Unsur budaya ditempatkan sebagai inti substansi fungsi dan nilai edukasi produk (substantive core), bukan sekadar tempelan visual atau ornamen identitas semata.",
          bold_prefix="Penghormatan Hak dan Atribusi: ", space_after=6)
    
    add_p(doc, "Jelaskan pula mengapa unsur budaya tersebut penting bagi fungsi dan nilai produk. Unsur budaya tidak cukup hanya digunakan sebagai ornamen, nama, atau identitas visual apabila tidak memiliki hubungan substantif dengan inovasi.", space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 7. TARGET PENGGUNA DAN DAMPAK
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "7. Target Pengguna dan Dampak")
    
    add_p(doc, "Identifikasi kelompok pengguna atau konsumen yang menjadi sasaran utama produk. Jelaskan:", space_after=6)
    
    add_p(doc, "", bold_prefix="Profil dan Kebutuhan Pengguna Utama:", space_after=3)
    add_p(doc, "Membutuhkan media pembelajaran sejarah dan seni budaya yang visual, interaktif, dan jauh dari kesan kaku atau membosankan, guna memenuhi kurikulum muatan lokal dan pendidikan karakter.", bold_prefix="- Pelajar & Mahasiswa (Usia 12–25 tahun): ", space_after=2)
    add_p(doc, "Membutuhkan alat peraga digital siap pakai untuk mendemonstrasikan anatomi gerak, silsilah keluarga Baratayuda, dan karakter moral tokoh pewayangan di ruang kelas secara praktis.", bold_prefix="- Pendidik & Akademisi Seni Budaya: ", space_after=2)
    add_p(doc, "Membutuhkan akses instan untuk mengenal filosofi tokoh wayang purwa serta direktori sejarah permuseuman pewayangan di Nusantara tanpa terhalang jarak geografis.", bold_prefix="- Masyarakat Umum & Pemerhati Budaya: ", space_after=6)
    
    add_p(doc, 
          "Platform diakses secara terbuka (open-access) dan gratis melalui peramban web pada alamat wayangjawi.web.id menggunakan perangkat komputer jinjing (laptop), PC desktop, maupun perangkat bergerak yang dilengkapi kamera standar, tanpa memerlukan proses instalasi atau pengunduhan aplikasi tambahan.",
          bold_prefix="Cara Penggunaan dan Pembelian: ", space_after=6)
    
    add_p(doc, 
          "Pengguna memperoleh pengalaman motorik mendalang secara langsung melalui simulasi gestur tangan (experiential learning), pemahaman mendalam atas watak dan silsilah tokoh pewayangan, peningkatan literasi budaya, serta kemudahan eksplorasi sejarah permuseuman nasional dalam satu ekosistem terpadu.",
          bold_prefix="Manfaat yang Diterima Pengguna: ", space_after=6)
    
    add_p(doc, 
          "Seniman pedalangan, sanggar seni budaya, perajin tatah sungging kulit fisik, pengelola museum pewayangan (khususnya 16 museum yang terdokumentasi), serta institusi pendidikan formal yang mendapatkan kanal diseminasi digital modern untuk menjangkau audiens generasi muda di tingkat nasional hingga mancanegara.",
          bold_prefix="Pelaku Budaya, Komunitas, atau Kelompok Masyarakat yang Memperoleh Manfaat: ", space_after=6)
    
    add_p(doc, 
          "Berdasarkan hasil uji coba purwarupa dan survei terhadap 64 responden, platform ini terbukti mampu meningkatkan antusiasme belajar budaya melalui fitur interaktif, di mana 92,2% responden menilai integrasi teknologi pengenalan gestur sangat membantu memvisualisasikan cara kerja dalang secara nyata.",
          bold_prefix="Dampak dan Indikator Terukur: ", space_after=6)
    
    add_p(doc, 
          "Capaian aktual mencakup ketersediaan purwarupa web fungsional dengan panggung interaktif 60 FPS, ensiklopedia 9 tokoh purwa, dan galeri 16 museum. Hasil pengujian awal menunjukkan kepuasan pengguna di atas 90% terhadap kemudahan akses dan responsivitas kontrol tangan. Target yang masih direncanakan meliputi peningkatan literasi pewayangan di kalangan pelajar tingkat menengah dan perguruan tinggi, kemitraan resmi dengan institusi pendidikan daerah, serta peningkatan trafik kunjungan fisik ke museum wayang mitra.",
          bold_prefix="Pembedaan Capaian: ", space_after=6)
    
    add_p(doc, "Gunakan indikator yang terukur jika memungkinkan, seperti jumlah pengguna aktif, jumlah transaksi, omzet, jumlah produk terjual, jumlah mitra budaya, keterlibatan perajin, jangkauan edukasi, atau peningkatan akses terhadap pengetahuan budaya.", space_after=3)
    add_p(doc, "Bedakan dengan jelas antara capaian aktual, hasil pengujian awal, dan target yang masih direncanakan.", space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 8. SOLUSI DAN DESKRIPSI PRODUK
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "8. Solusi dan Deskripsi Produk")
    
    add_p(doc, "Paparkan konsep produk sebagai jawaban atas permasalahan yang telah dijelaskan. Uraian mencakup:", space_after=6)
    
    add_p(doc, 
          "Wayang Jawi (wayangjawi.web.id) adalah platform web edukasi digital interaktif yang mengubah kamera perangkat pengguna menjadi panggung kelir digital berbasis pelacakan gestur tangan secara real-time.",
          bold_prefix="Deskripsi dan Fungsi Utama: ", space_after=6)
    
    add_p(doc, "Platform ini menghadirkan lima modul fitur utama yang telah berfungsi penuh:", bold_prefix="Fitur atau Komponen Utama: ", space_after=3)
    add_p(doc, "Pelacakan 21 titik koordinat lekuk tangan langsung di sisi klien (client-side) tanpa latensi server untuk 4 mode artikulasi gerak pedalangan: Poros Badan (translasi XY), Cempurit Lengan (artikulasi rotasi siku dan tangan), Tari Kiprahan (gestur kibasan selendang ksatria), dan Kedalaman Z-Axis (jarak fisik tangan ke kamera untuk mensimulasikan efek bayangan kabur atau tajam pada kelir).", bold_prefix="1. MediaPipe AI Gesture Control (60 FPS): ", space_after=2)
    add_p(doc, "Kemampuan memainkan dua karakter wayang secara mandiri menggunakan kedua tangan (tangan kiri dan tangan kanan) secara simultan untuk mensimulasikan adegan perang tanding (sabetan perang kembang).", bold_prefix="2. Mode Dua Wayang (Dual Character Battle): ", space_after=2)
    add_p(doc, "Integrasi pergelaran naskah dramatik lakon Bima Suci / Dewa Ruci berdasarkan dokumentasi resmi maestro wayang kulit berstandar UNESCO karya SENAWANGI, dilengkapi alur cerita teatrikal dan tata panggung audio gamelan digital.", bold_prefix="3. Panggung Lakon Bima Suci: ", space_after=2)
    add_p(doc, "Profil lengkap filosofi watak ksatria, pusaka, watak moral, silsilah keluarga, dan penulisan aksara Jawa baku untuk 9 tokoh representatif: Semar, Arjuna, Gatotkaca, Bima, Bagong, Petruk, Gareng, Rahwana, dan Resi Drona.", bold_prefix="4. Ensiklopedia 9 Tokoh Wayang Purwa: ", space_after=2)
    add_p(doc, "Jelajah sejarah dan direktori 16 museum pewayangan se-Nusantara (mulai dari Museum Radya Pustaka 1890, Museum Wayang Jakarta, Museum Gubug Wayang Mojokerto, hingga Museum Puri Lukisan Bali) lengkap dengan koordinat lokasi dan profil koleksi unggulan.", bold_prefix="5. Galeri 16 Museum Wayang Nusantara: ", space_after=6)
    
    add_p(doc, 
          "Purwarupa Fungsional Siap Digunakan (Functional Prototype). Seluruh 5 fitur utama di atas telah tersedia secara penuh pada situs web publik wayangjawi.web.id dan dapat diverifikasi fungsinya secara langsung oleh dewan juri tanpa hambatan instalasi.",
          bold_prefix="Status Kesiapan Produk: ", space_after=6)
    
    add_p(doc, 
          "Pengujian teknis menunjukkan latensi pemrosesan gestur rata-rata di bawah 16 milidetik (mencapai 60 FPS stabil pada peramban berbasis Chromium). Masukan dari 64 responden survei menggarisbawahi perlunya modul panduan gestur visual yang cepat dipahami bagi pemula, yang kemudian diimplementasikan dalam bentuk panduan visual di halaman /panduan.",
          bold_prefix="Hasil pengujian dan masukan pengguna: ", space_after=6)
    
    add_p(doc, 
          "Dokumentasi antarmuka pengguna, diagram alur komputasi gestur, serta bukti fungsional produk disematkan secara lengkap pada Nomor 18 (Lampiran 2: Bukti Produk dan Materi Presentasi).",
          bold_prefix="Dokumentasi produk: ", space_after=6)
    
    add_p(doc, 
          "Rencana pengembangan mencakup penambahan variasi tokoh purwa dan kurawa lainnya, mode perekaman adegan pementasan mandiri (record & share) untuk media sosial, serta dukungan narasi multibahasa (Bahasa Inggris dan Bahasa Jawa Krama/Ngoko).",
          bold_prefix="Pengembangan yang masih direncanakan: ", space_after=6)
    
    add_p(doc, "Untuk Inovasi Digital: Jelaskan fitur, alur pengguna, sistem, dan layanan yang telah berfungsi, disertai bukti demonstrasi produk yang dapat diverifikasi.", space_after=3)
    add_p(doc, "Catatan: Peserta wajib membedakan fitur yang telah tersedia dan berfungsi dengan fitur yang masih dalam tahap pengembangan atau perencanaan.", space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 9. TUJUAN DAN MANFAAT
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "9. Tujuan dan Manfaat")
    
    add_p(doc, "Jelaskan tujuan utama pengembangan produk serta manfaat yang diharapkan bagi ekosistem budaya. Uraikan manfaat dalam tiga aspek:", space_after=6)
    
    add_p(doc, "", bold_prefix="Aspek Budaya:", space_after=3)
    add_p(doc, "Tersedianya arsip digital terkurasi mengenai 9 tokoh purwa dan 16 museum wayang dalam satu wadah yang mudah diakses.", bold_prefix="- Manfaat Terjadi: ", space_after=2)
    add_p(doc, "Mendorong regenerasi minat mendalang di kalangan muda serta memperkaya dokumentasi digital lakon-lakon klasik Nusantara.", bold_prefix="- Rencana Jangka Pendek & Panjang: ", space_after=2)
    add_p(doc, "Jumlah konten budaya terdigitalisasi dan tingkat keterlibatan pengguna pada modul ensiklopedia serta panggung lakon.", bold_prefix="- Indikator: ", space_after=6)
    
    add_p(doc, "", bold_prefix="Aspek Ekonomi:", space_after=3)
    add_p(doc, "Efisiensi biaya akses edukasi budaya bagi masyarakat karena dapat digunakan tanpa membeli perangkat keras khusus.", bold_prefix="- Manfaat Terjadi: ", space_after=2)
    add_p(doc, "Membuka peluang ekosistem ekonomi kreatif melalui kemitraan lisensi edukasi dengan lembaga pendidikan, serta promosi silang terhadap perajin wayang kulit fisik dan destinasi wisata museum.", bold_prefix="- Rencana Jangka Pendek & Panjang: ", space_after=2)
    add_p(doc, "Jumlah institusi mitra yang mengadopsi platform dan peningkatan eksposur produk kerajinan pelaku budaya mitra.", bold_prefix="- Indikator: ", space_after=6)
    
    add_p(doc, "", bold_prefix="Aspek Sosial dan masyarakat:", space_after=3)
    add_p(doc, "Memperluas demokratisasi akses pembelajaran seni tradisional bagi pelajar dan masyarakat umum tanpa batasan geografis.", bold_prefix="- Manfaat Terjadi: ", space_after=2)
    add_p(doc, "Membangun kesadaran kolektif generasi muda terhadap nilai budi pekerti luhur pewayangan dan mempererat kohesi sosial berbasis budaya lokal.", bold_prefix="- Rencana Jangka Pendek & Panjang: ", space_after=2)
    add_p(doc, "Jumlah siswa dan masyarakat yang terjangkau program edukasi serta indeks apresiasi budaya generasi muda.", bold_prefix="- Indikator: ", space_after=6)
    
    add_p(doc, "Bedakan manfaat yang sudah terjadi, rencana manfaat jangka pendek dan jangka panjang, serta jelaskan indikator yang digunakan untuk mengukur pencapaiannya.", space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 10. KEUNIKAN DAN NILAI TAMBAH
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "10. Keunikan dan Nilai Tambah")
    
    add_p(doc, "Jelaskan keunggulan produk dibandingkan dengan solusi atau produk sejenis. Uraian dapat mencakup:", space_after=6)
    
    add_p(doc, 
          "Integrasi Computer Vision (Google MediaPipe WASM GPU Delegate) di sisi klien untuk mengendalikan wayang secara fisik menggunakan gestur tangan tanpa latensi peladen. Pengguna tidak memerlukan sensor fisik mahal seperti Kinect atau sarung tangan VR khusus; cukup menggunakan kamera standar laptop atau ponsel cerdas.",
          bold_prefix="Kebaruan Konsep dan Teknologi: ", space_after=6)
    
    add_p(doc, 
          "Menghubungkan teknologi interaktif dengan nilai filosofis pakeliran, pencahayaan blencong, dan dokumentasi maestro SENAWANGI secara utuh, bukan sekadar gamifikasi dangkal yang melepaskan wayang dari pakem aslinya.",
          bold_prefix="Kedalaman Integrasi Kebudayaan: ", space_after=6)
    
    add_p(doc, 
          "Sangat intuitif, instan tanpa unduhan, dan responsif dengan kecepatan 60 FPS langsung di peramban web modern.",
          bold_prefix="Pengalaman Pengguna: ", space_after=6)
    
    add_p(doc, "Perbandingan objektif terhadap media pelestarian eksisting menunjukkan keunggulan komparatif Wayang Jawi sebagai berikut:", bold_prefix="Pembanding Objektif: ", space_after=3)
    add_p(doc, "Menyajikan rekaman pementasan satu arah. Penonton bersifat pasif, durasi sangat panjang (semalam suntuk), dan tidak ada umpan balik interaktif. Sebaliknya, Wayang Jawi memberikan kendali motorik langsung (experiential learning) di mana pengguna menjadi dalang pengendali karakter.", bold_prefix="1. Dibandingkan Video Streaming (YouTube/Media Sosial): ", space_after=2)
    add_p(doc, "Menyajikan narasi deskriptif dua dimensi tanpa visualisasi dinamis dan tanpa audio pakeliran. Wayang Jawi mengintegrasikan teks ensiklopedia dengan visualisasi 3D/WebGL, audio gamelan digital, dan simulasi fisika cempurit.", bold_prefix="2. Dibandingkan Buku Teks & Ensiklopedia Statis: ", space_after=2)
    add_p(doc, "Hanya mengandalkan tombol kontrol keyboard/gamepad tanpa korelasi dengan gestur dalang sesungguhnya di dunia nyata. Wayang Jawi merekayasa gestur tangan asli dalang (tangkai cempurit, gerak badan, kiprahan) melalui pelacakan kecerdasan buatan.", bold_prefix="3. Dibandingkan Gim Simulasi Budaya Generik: ", space_after=6)
    
    add_p(doc, 
          "Membuka kanal promosi digital gratis dan berkelanjutan bagi maestro pedalangan, sanggar seni, serta museum wayang daerah untuk memamerkan koleksi dan agenda pementasan fisik mereka kepada generasi muda.",
          bold_prefix="Nilai tambah bagi pelaku budaya dan komunitas: ", space_after=6)
    
    add_p(doc, 
          "Bebas biaya bagi pengguna akhir (gratis dan open-access), tidak memerlukan perangkat keras komputasi tinggi, serta ramah lingkungan karena memangkas penggunaan media cetak kertas.",
          bold_prefix="Keunggulan harga, distribusi, bahan, proses produksi, atau layanan: ", space_after=6)
    
    add_p(doc, 
          "Peluang lisensi kurikulum sekolah, paket modul alat peraga digital bagi dinas pendidikan, serta merchandise kolaboratif berbasis karakter wayang kontemporer.",
          bold_prefix="Potensi pengembangan produk turunan dan perluasan pasar: ", space_after=6)
    
    add_p(doc, "Sertakan pembanding yang relevan dan jelaskan perbedaannya secara objektif. Kebaruan tidak harus selalu berupa penemuan teknologi baru, tetapi dapat berupa pengembangan baru yang menghasilkan manfaat nyata dari pengetahuan dan sumber daya budaya.", space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 11. TEKNOLOGI DAN METODE PENGEMBANGAN
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "11. Teknologi dan Metode Pengembangan")
    
    add_p(doc, "Jelaskan teknologi atau metode yang digunakan sesuai dengan karakteristik produk dan pilihan pada formulir pendaftaran.", space_after=6)
    
    add_heading_2(doc, "A. Inovasi Digital")
    add_p(doc, "Jelaskan teknologi yang relevan, misalnya:", space_after=3)
    add_p(doc, "Memproses 21 titik landmarks tangan secara real-time di sisi klien untuk mendeteksi gestur secara akurat tanpa latensi jaringan dan tanpa mengunggah data kamera ke server luar.", bold_prefix="1. Google MediaPipe Vision (WASM GPU Delegate): ", space_after=2)
    add_p(doc, "Menggerakkan sendi, lengan, dan artikulasi cempurit wayang secara mulus dan natural mengikuti kinematika gerak tangan pengguna.", bold_prefix="2. GSAP 3.15 Forward Kinematics Engine: ", space_after=2)
    add_p(doc, "Mensimulasikan pencahayaan dinamis lampu blencong tradisional, pendaran api, dan proyeksi bayangan kelir yang dramatis pada kanvas digital.", bold_prefix="3. WebGL 2.0 (Custom GLSL Shaders): ", space_after=2)
    add_p(doc, "Menyediakan fondasi arsitektur web modern yang sangat cepat, modular, dan responsif di berbagai ukuran layar.", bold_prefix="4. Next.js 16 (App Router) & React 19: ", space_after=6)
    
    add_heading_2(doc, "B. Inovasi Purwarupa")
    add_p(doc, 
          "Pendekatan client-side processing (komputasi di sisi klien) dipilih secara sengaja agar aplikasi dapat diakses sangat ringan oleh perangkat apa pun melalui peramban web standar tanpa memerlukan spesifikasi peladen yang memberatkan atau instalasi perangkat lunak tambahan. Selain itu, arsitektur ini menjamin keamanan privasi data visual pengguna karena seluruh pemrosesan video kamera berlangsung lokal di dalam peramban perangkat pengguna.",
          bold_prefix="Alasan Pemilihan Teknologi: ", space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 12. IMPLEMENTASI TEKNIS
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "12. Implementasi Teknis")
    
    add_p(doc, "Bagian ini menjelaskan spesifikasi teknis yang membuat produk dapat diuji, digunakan, atau diproduksi.", space_after=6)
    add_p(doc, "Untuk Inovasi Digital, rincian spesifikasi teknis yang diimplementasikan mencakup:", space_after=4)
    add_p(doc, "Next.js 16 (App Router), React 19, TypeScript 5.8.", bold_prefix="Frontend Framework: ", space_after=2)
    add_p(doc, "Tailwind CSS v4 (Desain adaptif dan responsif lintas perangkat).", bold_prefix="Styling & Tata Letak: ", space_after=2)
    add_p(doc, "Google MediaPipe Vision Tasks API (Hand Landmarker dengan akselerasi GPU Delegate, 21 landmark 3D, frekuensi 60 FPS).", bold_prefix="AI & Computer Vision: ", space_after=2)
    add_p(doc, "GSAP 3.15 (GreenSock Animation Platform) untuk Forward Kinematics, WebGL 2.0 Shader Shading, Three.js 3D Canvas.", bold_prefix="Rigging & Grafis: ", space_after=2)
    add_p(doc, "Web Audio API (Sintesis audio instrumen gamelan Slendro dinamis dan atmosfer suara latar teatrikal).", bold_prefix="Audio Processing: ", space_after=2)
    add_p(doc, "Vercel Edge Network, CDN global dengan proteksi SSL/TLS, DNS terenkripsi, dan kompresi aset Brotli.", bold_prefix="Infrastruktur Hosting & Distribusi: ", space_after=2)
    add_p(doc, "Berjalan terdesentralisasi di sisi klien (client-side inference), meminimalkan beban peladen dan menjaga privasi data visual pengguna karena pemrosesan kamera terjadi secara lokal di perangkat pengguna.", bold_prefix="Infrastruktur & Keamanan: ", space_after=6)
    
    add_p(doc, "Peserta hanya perlu mencantumkan aspek teknis yang benar-benar digunakan. Jangan mencantumkan teknologi atau spesifikasi yang belum diterapkan seolah-olah sudah berfungsi.", space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 13. MODEL BISNIS DAN STRATEGI KOMERSIALISASI
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "13. Model Bisnis dan Strategi Komersialisasi")
    
    add_p(doc, 
          "Jelaskan bagaimana produk dapat memberikan nilai ekonomi, menjangkau pengguna, dan berkelanjutan setelah kompetisi. Peserta wajib menyusun Business Model Canvas (BMC) dan menjelaskan rencana bisnis sesuai tingkat kesiapan produk.",
          space_after=4)
    add_p(doc, 
          "Jelaskan dengan data aktual seperti penjualan, pengguna, pelanggan, biaya, atau portofolio kemitraan. Untuk purwarupa, sajikan asumsi bisnis secara transparan dan jelaskan cara mengujinya.",
          space_after=6)
    
    add_p(doc, "Business Model Canvas (BMC) Wayang Jawi mencakup sembilan elemen terstruktur sebagai berikut:", bold_prefix="BMC mencakup sembilan elemen: ", space_after=4)
    
    add_p(doc, "Siswa sekolah dasar dan menengah (usia 10-18 tahun), mahasiswa rumpun humaniora/seni/teknologi, pendidik muatan lokal, pengelola museum wayang, serta wisatawan domestik dan mancanegara peminat budaya Jawa.", bold_prefix="1. Customer Segments: ", space_after=3)
    add_p(doc, "Platform edukasi budaya interaktif berbasis AI pertama di Indonesia yang memungkinkan siapa saja menjadi dalang secara langsung tanpa instalasi aplikasi, menyajikan arsip 16 museum dan lakon Bima Suci berstandar UNESCO.", bold_prefix="2. Value Propositions: ", space_after=3)
    add_p(doc, "Situs web publik terbuka (wayangjawi.web.id), program pengabdian dan kemitraan sekolah menengah di Jawa Timur, festival teknologi & pameran budaya, serta kanal media sosial edukasi.", bold_prefix="3. Channels: ", space_after=3)
    add_p(doc, "Akses publik terbuka mandiri, dokumentasi panduan mendalang intuitif di situs, tur virtual museum, serta komunitas daring pemerhati pewayangan.", bold_prefix="4. Customer Relationships: ", space_after=3)
    add_p(doc, "Skema hibah pemajuan kebudayaan, lisensi modul institusional B2B bagi sekolah swasta/internasional, program donasi pelestarian budaya, serta komisi promosi silang tiket museum dan cinderamata perajin wayang fisik.", bold_prefix="5. Revenue Streams: ", space_after=3)
    add_p(doc, "Model kecerdasan buatan MediaPipe teroptimasi, basis data ensiklopedia tokoh dan lakon pewayangan, arsip pergelaran SENAWANGI, serta tim pengembang SMK Telkom Malang.", bold_prefix="6. Key Resources: ", space_after=3)
    add_p(doc, "Pengembangan dan pemeliharaan platform web, kalibrasi algoritma pelacakan gestur, riset kurasi konten budaya bersama maestro, serta sosialisasi ke lembaga pendidikan.", bold_prefix="7. Key Activities: ", space_after=3)
    add_p(doc, "Sekretariat Pewayangan Nasional Indonesia (SENAWANGI), pengelola 16 museum wayang Nusantara, komunitas dalang muda, institusi sekolah, serta Dinas Kebudayaan dan Pariwisata.", bold_prefix="8. Key Partnerships: ", space_after=3)
    add_p(doc, "Biaya sewa domain dan peladen cloud (Vercel/Cloudflare), biaya operasional riset dan kurasi data budaya, serta biaya sosialisasi dan materi pelatihan.", bold_prefix="9. Cost Structure: ", space_after=6)
    
    add_p(doc, "", bold_prefix="Penjelasan Rinci Strategi Bisnis & Komersialisasi:", space_after=3)
    add_p(doc, "Mengadopsi pendekatan hybrid (freemium/open-access) di mana platform dasar sepenuhnya gratis bagi masyarakat umum guna memaksimalkan dampak budaya, didukung oleh monetisasi lisensi institusional untuk modul kurikulum sekolah dan paket korporasi.", bold_prefix="a. Model pendapatan atau mekanisme pembiayaan: ", space_after=2)
    add_p(doc, "Akses publik gratis (Rp 0), paket lisensi sekolah terintegrasi dengan pelatihan guru diestimasikan Rp 2.500.000 per tahun per institusi, dan komisi kemitraan tiket museum fisik sebesar 5-10%.", bold_prefix="b. Strategi harga: ", space_after=2)
    add_p(doc, "Distribusi berbasis web instan tanpa perantara toko aplikasi pihak ketiga, didukung kemitraan langsung dengan dinas pendidikan dan komunitas sanggar seni.", bold_prefix="c. Saluran pemasaran dan distribusi: ", space_after=2)
    add_p(doc, "Kolaborasi dengan SENAWANGI sebagai rujukan kuratorial dan SMK Telkom Malang sebagai inkubator teknologi.", bold_prefix="d. Mitra produksi, teknologi, budaya, atau penjualan: ", space_after=2)
    add_p(doc, "Kebutuhan biaya tahun pertama diestimasikan sebesar Rp 18.500.000 mencakup domain, infrastruktur cloud, kurasi arsip, dan sosialisasi di 5 sekolah uji coba.", bold_prefix="e. Estimasi biaya dan kebutuhan sumber daya: ", space_after=2)
    add_p(doc, "Pengembangan modul kuis gamifikasi berhadiah tiket museum, aplikasi AR (Augmented Reality) wayang kulit di ruang kelas, dan cinderamata digital.", bold_prefix="f. Peluang produk turunan dan kemitraan: ", space_after=2)
    add_p(doc, "Dimulai dari penetrasi sekolah di wilayah Malang Raya dan Jawa Timur pada tahun ke-1, ekspansi ke tingkat nasional di Jawa Tengah dan D.I. Yogyakarta pada tahun ke-2, serta jangkauan global pada tahun ke-3.", bold_prefix="g. Strategi pengembangan pasar dan peningkatan skala: ", space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 14. REKAM JEJAK, KESIAPAN, DAN BUKTI VALIDASI
    # (DI SINI GAMBAR DIIZINKAN SESUAI PERINTAH PENGGUNA)
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "14. Rekam Jejak, Kesiapan, dan Bukti Validasi")
    
    add_p(doc, 
          "Jelaskan bukti yang menunjukkan bahwa produk sudah berjalan dan terbentuk, serta memiliki peluang untuk digunakan atau dikembangkan lebih lanjut dalam jangka pendek dan jangka panjang.",
          space_after=4)
    add_p(doc, "Lampirkan bukti rekam jejak sesuai persyaratan Juknis, antara lain:", space_after=4)
    
    add_p(doc, 
          "Wayang Jawi telah mencapai tahap Functional Prototype (Tingkat Kesiapan Teknologi TKT 6-7). Platform telah ter-deploy dan dapat diakses publik secara live melalui tautan resmi https://www.wayangjawi.web.id. Seluruh fungsionalitas utama—mulai dari panggung gestur kamera, ensiklopedia tokoh, galeri museum, hingga pustaka lakon—dapat diverifikasi secara langsung.",
          bold_prefix="Portofolio produk atau layanan: ", space_after=6)
    
    add_p(doc, 
          "Dokumentasi operasional mencakup riset dan pengembangan kode sumber yang dikelola secara profesional menggunakan Git dan GitHub di bawah repositori dalang-style. Pengembangan dilakukan di laboratorium Rekayasa Perangkat Lunak SMK Telkom Malang dengan pemantauan performa harian.",
          bold_prefix="Dokumentasi operasional dan produksi: ", space_after=4)
    
    # GAMBAR 14.1 (DIIZINKAN: Rekam jejak tim & operasional produksi)
    add_image_figure(doc, "/tmp/proposal-assets/team.png", 
                     "Gambar 14.1. Tim Pengembang Wayang Jawi dan Dokumentasi Operasional Produksi di Laboratorium Rekayasa Perangkat Lunak SMK Telkom Malang",
                     width_in=3.6)
    
    add_p(doc, 
          "Validasi kebutuhan dan efektivitas produk telah dibuktikan melalui riset primer berupa survei kuantitatif terhadap 64 responden yang terdiri atas pelajar tingkat SMP/SMA, mahasiswa, dan masyarakat umum. Temuan riset menunjukkan bahwa 89,1% responden memiliki intensitas sangat rendah dalam menonton wayang kulit konvensional, 85,9% mengeluhkan format media eksisting yang monoton dan pasif, serta 95% menyatakan bahwa integrasi teknologi kecerdasan buatan seperti Wayang Jawi sangat mendesak untuk menyelamatkan seni wayang kulit dari kepunahan.",
          bold_prefix="Data pengguna, pelanggan, atau penjualan: ", space_after=4)
    
    # GAMBAR 14.2 (DIIZINKAN: Bukti data validasi survei lapangan 64 responden)
    add_image_figure(doc, "/tmp/proposal-assets/survey_validation.png", 
                     "Gambar 14.2. Data Validasi Lapangan Hasil Riset Survei Kebutuhan terhadap 64 Responden Pelajar, Mahasiswa, dan Masyarakat Umum",
                     width_in=5.8)
    
    add_p(doc, 
          "Publikasi daring dan diseminasi informasi dilakukan melalui situs web resmi wayangjawi.web.id, akun media sosial tim pengembang, serta kanal komunikasi sekolah guna menjaring masukan berkala dari para pengguna awal.",
          bold_prefix="Dokumentasi media sosial dan kanal pemasaran: ", space_after=6)
    
    add_p(doc, 
          "Tim telah menginisiasi rujukan pakem resmi ke SENAWANGI (Sekretariat Pewayangan Nasional Indonesia) dan menyusun inventarisasi 16 museum wayang di Indonesia sebagai calon mitra penyedia materi edukasi resmi. Selain itu, rencana uji coba ruang kelas telah dikoordinasikan dengan guru mata pelajaran Seni Budaya di lingkungan SMK Telkom Malang.",
          bold_prefix="Daftar mitra, pelanggan, atau bukti kerja sama: ", space_after=6)
    
    add_p(doc, 
          "Keberlanjutan kegiatan dijamin oleh dukungan institusional SMK Telkom Malang melalui program pembinaan inovasi siswa, kesiapan infrastruktur komputasi awan yang telah terbayar, serta komitmen tim dalam memperluas koleksi lakon pasca-kompetisi BUDAYA GO! 2026.",
          bold_prefix="Bukti keberlanjutan kegiatan usaha: ", space_after=6)
    
    add_p(doc, "Cantumkan periode, sumber, dan konteks data. Semua klaim harus dapat diverifikasi dan tidak boleh melebih-lebihkan tingkat kesiapan produk.", space_after=3)
    add_p(doc, "Riwayat pengguna, penjualan, kerja sama, dan aktivitas usaha merupakan informasi pendukung yang disampaikan apabila tersedia. Ketiadaan rekam jejak komersial tidak menggugurkan kepesertaan sepanjang produk memenuhi persyaratan kesiapan dan dapat diverifikasi.", space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 15. KEBERLANJUTAN DAN POTENSI PENGEMBANGAN
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "15. Keberlanjutan dan Potensi Pengembangan")
    
    add_p(doc, 
          "Agar proyek inovasi ini tidak berhenti pada tahap kompetisi semata, strategi keberlanjutan dirancang secara komprehensif mencakup aspek budaya, operasional, teknologi, dan sosial masyarakat:",
          space_after=4)
    
    add_p(doc, "Memastikan validitas informasi dengan merujuk pada literatur sastra pewayangan klasik serta membuka peluang konsultasi berkala dengan para penggiat seni dan budaya tradisional.", bold_prefix="1. Keberlanjutan Sumber Konten Budaya: ", space_after=3)
    add_p(doc, "Pemanfaatan arsitektur kode modular berbasis komponen modern memungkinkan pemeliharaan sistem (maintenance) yang efisien serta pembaruan berkala pada basis data ensiklopedia web tanpa mengganggu layanan pengguna.", bold_prefix="2. Konsistensi Operasional dan Pemeliharaan Teknologi: ", space_after=3)
    add_p(doc, "Rencana pengembangan fitur lanjutan seperti modul evaluasi mandiri (kuis interaktif berbasis gamifikasi) untuk menguji pemahaman pengguna setelah membaca profil tokoh atau lakon cerita, serta mode rekam pertunjukan (record & share).", bold_prefix="3. Peningkatan Kapasitas Fitur Interaktif: ", space_after=3)
    add_p(doc, "Membangun kolaborasi berkelanjutan dengan institusi pendidikan tingkat menengah (SMP/SMA/SMK) dan sanggar seni lokal guna mengintegrasikan platform ke dalam kegiatan pengenalan budaya berbasis digital.", bold_prefix="4. Perluasan Kemitraan Strategis: ", space_after=3)
    add_p(doc, "Menjaga keaslian nilai-nilai tradisional, memberikan atribusi yang jelas terhadap sumber pustaka budaya, serta memastikan perlindungan terhadap hak cipta dan kekayaan intelektual lokal.", bold_prefix="5. Pengelolaan Risiko dan Etika Budaya: ", space_after=6)
    
    add_p(doc, "Jelaskan langkah yang realistis dan sumber daya yang dibutuhkan agar produk tidak berhenti pada tahap kompetisi atau demonstrasi.", space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 16. POTENSI CULTURAL POWER INDONESIA DI DUNIA
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "16. Potensi Cultural Power Indonesia di Dunia")
    
    add_p(doc, 
          "Wayang Jawi memiliki visi strategis untuk mengangkat martabat dan pengaruh kebudayaan Indonesia (Cultural Power) ke kancah antarbangsa melalui pemanfaatan teknologi digital:",
          space_after=4)
    
    add_p(doc, "Menyajikan kekayaan seni pewayangan Jawa secara akurat, elegan, dan kontekstual tanpa kehilangan nilai adiluhung aslinya, sehingga mampu mengikis stigma bahwa wayang adalah budaya kuno yang kaku.", bold_prefix="1. Representasi Budaya yang Bertanggung Jawab: ", space_after=3)
    add_p(doc, "Melalui platform berbasis web yang dapat diakses dari mana saja di seluruh belahan dunia, situs ini membuka peluang bagi masyarakat internasional untuk mengenal kedalaman filosofi, estetika visual, serta narasi moral pewayangan Nusantara.", bold_prefix="2. Perluasan Jangkauan Audiens Global: ", space_after=3)
    add_p(doc, "Merencanakan integrasi fitur terjemahan bahasa asing (seperti Bahasa Inggris) pada tahap pengembangan lanjutan guna memfasilitasi peneliti asing, akademisi global, dan diaspora yang tertarik mempelajari seni budaya Indonesia.", bold_prefix="3. Pengembangan Fitur Multibahasa (Jangka Panjang): ", space_after=3)
    add_p(doc, "Membuka ruang kolaborasi virtual dengan institusi pendidikan internasional, museum digital dunia, atau komunitas pemerhati seni rupa tradisional global untuk memperkuat eksistensi budaya Indonesia di kancah global.", bold_prefix="4. Kolaborasi Lintas Batas: ", space_after=6)
    
    add_p(doc, "Jelaskan strategi dan indikator yang memungkinkan dampak tersebut dicapai. Hindari klaim jangkauan global apabila belum didukung bukti atau rencana yang terukur.", space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 17. ROADMAP PENGEMBANGAN PRODUK DAN BISNIS
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "17. Roadmap Pengembangan Produk dan Bisnis")
    
    add_p(doc, "Peta jalan (roadmap) pengembangan Wayang Jawi dirancang secara bertahap dan realistis agar dapat diimplementasikan dengan terukur:", space_after=4)
    
    add_heading_2(doc, "A. Jangka Pendek (6–12 Bulan):")
    add_p(doc, "1. Optimalisasi performa teknis dan antarmuka situs web wayangjawi.web.id agar berjalan konsisten pada berbagai perangkat berspesifikasi rendah.", space_after=2)
    add_p(doc, "2. Peluncuran modul edukasi interaktif dasar (profil 9 tokoh purwa dan ringkasan lakon Bima Suci).", space_after=2)
    add_p(doc, "3. Pelaksanaan sosialisasi dan uji coba penggunaan platform secara terbatas di lingkungan sekolah menengah di Kota Malang dan sekitarnya.", space_after=2)
    add_p(doc, "4. Penguatan jejaring kemitraan awal dengan komunitas seni, sanggar pedalangan, dan pendidik mata pelajaran muatan lokal budaya.", space_after=6)
    
    add_heading_2(doc, "B. Jangka Menengah (1–2 Tahun):")
    add_p(doc, "1. Penambahan volume data ensiklopedia pewayangan secara komprehensif (mencakup 50 hingga 100 karakter tambahan dari trah Kurawa dan Punakawan lainnya).", space_after=2)
    add_p(doc, "2. Pengembangan fitur kuis evaluasi berbasis gamifikasi dan sistem pelacakan progres belajar bagi pengguna mandiri maupun institusi sekolah.", space_after=2)
    add_p(doc, "3. Konsolidasi model tata kelola platform dan perluasan kerja sama dengan dinas kebudayaan, dinas pariwisata, serta asosiasi museum pewayangan daerah.", space_after=2)
    add_p(doc, "4. Peluncuran skema lisensi sekolah (B2B) untuk penyediaan modul ajar digital pewayangan terintegrasi.", space_after=6)
    
    add_heading_2(doc, "C. Jangka Panjang (3–5 Tahun):")
    add_p(doc, "1. Transformasi platform menjadi pusat direktori digital terlengkap untuk edukasi pewayangan di Indonesia yang diakui secara nasional.", space_after=2)
    add_p(doc, "2. Implementasi fitur multibahasa (Bahasa Inggris dan Bahasa Jawa Krama/Ngoko) guna mendukung penetrasi pasar internasional dan penguatan Cultural Power Indonesia di dunia global.", space_after=2)
    add_p(doc, "3. Pengembangan fitur kolaboratif bagi para seniman, dalang, dan kreator konten budaya untuk mempublikasikan karya dan lakon edukatif mandiri di dalam ekosistem platform Wayang Jawi.", space_after=12)

    # ═════════════════════════════════════════════════════════════════
    # 18. LAMPIRAN PENDUKUNG
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "18. Lampiran Pendukung")
    
    add_p(doc, "Lampiran dapat mencakup:", space_after=3)
    add_p(doc, "1. Referensi penelitian, dataset, arsip, atau dokumentasi budaya pewayangan SENAWANGI dan UNESCO.", space_after=2)
    add_p(doc, "2. Foto dan video seputar produk dan demonstrasi pengoperasian kecerdasan buatan.", space_after=2)
    add_p(doc, "3. Portofolio dan dokumentasi usaha, laboratorium sekolah, dan proses produksi.", space_after=2)
    add_p(doc, "4. Data hasil riset validasi survei kebutuhan 64 responden.", space_after=2)
    add_p(doc, "5. Surat atau bukti kemitraan dan inisiasi kolaborasi museum.", space_after=2)
    add_p(doc, "6. Dokumentasi kolaborasi dengan pelaku budaya atau komunitas pedalangan.", space_after=2)
    add_p(doc, "7. Tautan media sosial, situs web resmi, repositori kode, dan kanal distribusi.", space_after=2)
    add_p(doc, "8. Bukti lain yang relevan dengan klaim dalam proposal inovasi.", space_after=6)
    
    add_p(doc, "Setiap lampiran harus diberi judul dan keterangan yang jelas serta dirujuk pada bagian proposal yang sesuai.", space_after=6)
    
    add_p(doc, "", bold_prefix="Tautan Resmi Akses Produk dan Dokumentasi:", space_after=3)
    add_p(doc, "https://www.wayangjawi.web.id", bold_prefix="- Alamat Situs Web Utama (Production): ", space_after=2)
    add_p(doc, "https://www.wayangjawi.web.id/stage", bold_prefix="- Panggung Virtual Interaktif (AI Gesture Control): ", space_after=2)
    add_p(doc, "https://www.wayangjawi.web.id/katalog", bold_prefix="- Modul Ensiklopedia 9 Tokoh Wayang Purwa: ", space_after=2)
    add_p(doc, "https://www.wayangjawi.web.id/kreasi", bold_prefix="- Modul Pustaka Lakon Bima Suci: ", space_after=2)
    add_p(doc, "https://www.wayangjawi.web.id/panduan", bold_prefix="- Modul Panduan Mendalang Digital: ", space_after=2)
    add_p(doc, "https://github.com/nabilkencana/dalang-style", bold_prefix="- Repositori Kode Sumber Terverifikasi (GitHub): ", space_after=14)

    # ═════════════════════════════════════════════════════════════════
    # LAMPIRAN 2 : BUKTI PRODUK DAN MATERI PRESENTASI
    # (DI SINI GAMBAR DIIZINKAN SESUAI PERINTAH PENGGUNA)
    # ═════════════════════════════════════════════════════════════════
    add_heading_1(doc, "Lampiran 2 : Bukti Produk dan Materi Presentasi")
    
    add_p(doc, 
          "Setiap peserta saat periode pendaftaran sudah mulai menyiapkan materi pendukung untuk membuktikan keberadaan, fungsi, dan potensi produk sesuai dengan kategori serta persyaratan pengumpulan dalam Juknis. Bukti Produk disematkan dalam proposal dalam bentuk link dan diunggah.",
          space_after=8)
    
    add_heading_2(doc, "A. Bukti Produk Inovasi Digital dan Inovasi Purwarupa")
    add_p(doc, "Berikut disajikan bukti visual tangkapan layar antarmuka pengguna (UI) dan diagram arsitektur sistem Wayang Jawi yang telah berfungsi penuh pada versi produksi:", space_after=4)
    
    # GAMBAR 18.1: Panggung Virtual MediaPipe
    add_image_figure(doc, "/tmp/proposal-assets/stage.png", 
                     "Gambar 18.1. Antarmuka Panggung Kelir Virtual Wayang Jawi (/stage) dengan Fitur MediaPipe AI Gesture Tracking 60 FPS", 
                     width_in=5.6)
    
    # GAMBAR 18.2: Katalog 9 Tokoh Wayang Purwa
    add_image_figure(doc, "/tmp/proposal-assets/katalog.png", 
                     "Gambar 18.2. Modul Ensiklopedia Interaktif 9 Tokoh Wayang Purwa (/katalog) dengan Kodifikasi Aksara Jawa dan Watak Karakter", 
                     width_in=5.6)
    
    # GAMBAR 18.3: Galeri 16 Museum Wayang
    add_image_figure(doc, "/tmp/proposal-assets/museum.png", 
                     "Gambar 18.3. Direktori dan Galeri Interaktif 16 Museum Wayang Nusantara dari Radya Pustaka (1890) hingga Puri Lukisan Bali", 
                     width_in=5.6)
    
    # GAMBAR 18.4: Pustaka Lakon Bima Suci
    add_image_figure(doc, "/tmp/proposal-assets/lakon.png", 
                     "Gambar 18.4. Modul Pustaka Teatrikal Lakon Bima Suci / Dewa Ruci Mengadaptasi Dokumentasi Resmi UNESCO Karya SENAWANGI", 
                     width_in=5.6)
    
    # GAMBAR 18.5: Arsitektur Pipeline AI
    add_image_figure(doc, "/tmp/proposal-assets/pipeline_architecture.png", 
                     "Gambar 18.5. Diagram Alur Arsitektur Komputasi Client-Side AI Gesture Tracking Wayang Jawi Tanpa Latensi Peladen", 
                     width_in=5.8)
    
    add_p(doc, 
          "Bukti pengoperasian teknis menunjukkan bahwa sistem berhasil mengidentifikasi 21 landmark sendi tangan dengan latensi komputasi lokal di bawah 16 ms, menghasilkan gerakan cempurit dan badan wayang yang presisi serta bebas patah-patah pada berbagai peramban web modern.",
          space_after=8)
    
    add_heading_2(doc, "B. Video Showcase")
    add_p(doc, 
          "Siapkan video showcase berdurasi 3–5 menit. Video berisi kegunaan dan manfaat produk digital/ purwarupa bagi pengguna/ konsumen. Isi video mencakup 6 pilar substansi utama:",
          space_after=4)
    
    add_p(doc, "Memaparkan identitas Wayang Jawi, konsep pelestarian digital pewayangan purwa Jawa, fungsi utama, dan pemaknaan elemen kelir, blencong, serta cempurit.", bold_prefix="1. Pengenalan Produk: ", space_after=2)
    add_p(doc, "Peragaan langsung cara kerja pelacakan gestur tangan tanpa sensor fisik eksternal, artikulasi gerakan tangan, mode dua wayang, dan navigasi ensiklopedia tokoh.", bold_prefix="2. Demonstrasi Produk: ", space_after=2)
    add_p(doc, "Penjelasan nilai guna bagi pelajar dalam memahami budaya secara kinestetik (experiential learning), pendidik sebagai alat peraga interaktif, dan museum sebagai kanal diseminasi digital.", bold_prefix="3. Kegunaan dan Manfaat: ", space_after=2)
    add_p(doc, "Memaparkan keunggulan komparatif platform dibanding media video pasif YouTube dan buku teks cetak, termasuk kebaruan arsitektur client-side WebAssembly.", bold_prefix="4. Keunikan dan Nilai Tambah: ", space_after=2)
    add_p(doc, "Menampilkan cuplikan uji coba lapangan terhadap siswa sekolah dan hasil survei kepuasan 64 responden yang membuktikan latensi nol dan kemudahan operasional.", bold_prefix="5. Bukti Penggunaan atau Pengujian: ", space_after=2)
    add_p(doc, "Peta jalan pengembangan jangka panjang menuju direktori nasional terlengkap dan penguatan diplomasi budaya digital Indonesia di kancah internasional.", bold_prefix="6. Potensi Pengembangan: ", space_after=4)
    
    add_p(doc, "https://www.wayangjawi.web.id/stage", bold_prefix="Tautan Demonstrasi Video Showcase & Akses Langsung: ", space_after=8)
    
    add_heading_2(doc, "C. Slide Deck PPT")
    add_p(doc, 
          "Setiap kelompok sudah menyiapkan slide deck PPT presentasi untuk mendukung Proposal Produk yang sudah dipersiapkan lebih dulu saat membaca Juknis. Slide deck PPT presentasi sebagai persiapan bagi peserta yang lolos seleksi administrasi dan substansi ke 20 besar finalis yang akan dipaparkan pada saat Showcase. Adapun slide deck PPT berisi sebagai berikut:",
          space_after=4)
    
    add_p(doc, "Krisis regenerasi seni pewayangan kulit dan jarak kultural generasi muda terhadap kesenian tradisional.", bold_prefix="1. Latar Belakang: ", space_after=2)
    add_p(doc, "Tiga kendala utama pementasan eksisting: durasi semalam suntuk, kerumitan bahasa pakeliran kawi, dan pasivitas media satu arah.", bold_prefix="2. Permasalahan: ", space_after=2)
    add_p(doc, "Tersedianya functional prototype di wayangjawi.web.id, rencana ekspansi sekolah 1 tahun, dan direktori budaya nasional 3-5 tahun.", bold_prefix="3. Penyelesaian yang Sudah Ada, Rencana Jangka Pendek, dan Jangka Panjang: ", space_after=2)
    add_p(doc, "Tradisi wayang kulit purwa Jawa, lakon Bima Suci / Dewa Ruci (Sangkan Paraning Dumadi), dan rujukan arsip maestro SENAWANGI UNESCO.", bold_prefix="4. Unsur Kebudayaan Indonesia yang Menjadi Dasar Pengembangan Produk: ", space_after=2)
    add_p(doc, "Panggung kelir digital interaktif berbasis Google MediaPipe AI (60 FPS), ensiklopedia 9 tokoh, dan galeri 16 museum.", bold_prefix="5. Solusi, Fungsi, dan Cara Kerja Produk: ", space_after=2)
    add_p(doc, "Pelajar tingkat menengah, perguruan tinggi, akademisi seni budaya, serta komunitas pelestari tradisi nusantara.", bold_prefix="6. Sasaran Pengguna atau Pasar Produk: ", space_after=2)
    add_p(doc, "Interaksi gestur kinestetik tanpa unduhan, privasi data lokal penuh, serta integrasi nilai etika adiluhung.", bold_prefix="7. Keunikan dan Nilai Tambah Produk: ", space_after=2)
    add_p(doc, "Peningkatan literasi pewayangan di sekolah uji coba dan peningkatan kunjungan fisik ke museum wayang daerah.", bold_prefix="8. Dampak yang Telah Dicapai dan Diharapkan: ", space_after=2)
    add_p(doc, "Purwarupa fungsional teruji (TKT 6-7) yang siap diakses langsung di peramban web tanpa hambatan perangkat keras.", bold_prefix="9. Kondisi Aktual Produk: ", space_after=2)
    add_p(doc, "Business Model Canvas (BMC) 9 elemen berbasis akses terbuka dan kemitraan institusional terukur.", bold_prefix="10. Model Bisnis, Potensi Komersialisasi, dan Roadmap Keberlanjutan: ", space_after=12)

    # ── Simpan Dokumen ──
    doc.save(OUTPUT_PATH)
    print(f"Proposal berhasil dibangun dan disimpan ke: {OUTPUT_PATH}")
if __name__ == "__main__":
    build_full_proposal()
