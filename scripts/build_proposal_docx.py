#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_proposal_docx.py
Script Generator Dokumen Proposal Resmi BUDAYA GO! 2026:
WAYANG JAWI: PLATFORM EDUKASI DAN PELESTARIAN DIGITAL WAYANG KULIT NUSANTARA BERBASIS KECERDASAN BUATAN
"""

import os
import sys
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

from proposal_builder_helpers import (
    set_cell_background,
    set_cell_margins,
    set_cell_border,
    add_heading_with_spacing,
    add_body_p,
    add_bullet_p,
    add_image_box
)

def build_proposal():
    doc = docx.Document()
    
    # ── Page Setup ──
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        section.page_width = Inches(8.27)   # A4
        section.page_height = Inches(11.69) # A4
        
        # Header & Footer setup
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("BUDAYA GO! 2026 | Proposal Inovasi Digital — Wayang Jawi")
        hrun.font.name = "Aptos"
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = RGBColor(0x88, 0x88, 0x88)
        
        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run("https://www.wayangjawi.web.id  •  Menghidupkan Seni Pewayangan di Era Digital")
        frun.font.name = "Aptos"
        frun.font.size = Pt(8.5)
        frun.font.color.rgb = RGBColor(0x88, 0x88, 0x88)

    # ═════════════════════════════════════════════════════════════════
    # COVER / HEADER IDENTITAS PROPOSAL
    # ═════════════════════════════════════════════════════════════════
    p_lamp = doc.add_paragraph()
    p_lamp.paragraph_format.space_before = Pt(0)
    p_lamp.paragraph_format.space_after = Pt(8)
    r_lamp = p_lamp.add_run("Lampiran 1: Panduan dan Format Penulisan Proposal BUDAYAGO! 2026")
    r_lamp.bold = True
    r_lamp.font.name = "Georgia"
    r_lamp.font.size = Pt(11)
    r_lamp.font.color.rgb = RGBColor(0x8C, 0x62, 0x14) # Emas tua

    # Judul Proposal (Maksimal 14 kata: 13 kata)
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(6)
    p_title.paragraph_format.space_after = Pt(14)
    r_title = p_title.add_run("WAYANG JAWI: PLATFORM EDUKASI DAN PELESTARIAN DIGITAL WAYANG KULIT NUSANTARA BERBASIS KECERDASAN BUATAN")
    r_title.bold = True
    r_title.font.name = "Georgia"
    r_title.font.size = Pt(15)
    r_title.font.color.rgb = RGBColor(0x1A, 0x0F, 0x08)

    # Penulis
    p_auth = doc.add_paragraph()
    p_auth.paragraph_format.space_before = Pt(0)
    p_auth.paragraph_format.space_after = Pt(4)
    r_a1 = p_auth.add_run("Mochammad Nabil Anwar Kencana")
    r_a1.bold = True
    r_a1.font.name = "Aptos"
    r_a1.font.size = Pt(11)
    p_auth.add_run("¹, ")
    r_a2 = p_auth.add_run("Styven Dwi Nugroho")
    r_a2.bold = True
    r_a2.font.name = "Aptos"
    r_a2.font.size = Pt(11)
    p_auth.add_run("², ")
    r_a3 = p_auth.add_run("Risky Nabil Pahlevi")
    r_a3.bold = True
    r_a3.font.name = "Aptos"
    r_a3.font.size = Pt(11)
    p_auth.add_run("³")

    # Afiliasi
    p_aff1 = doc.add_paragraph()
    p_aff1.paragraph_format.space_after = Pt(2)
    p_aff1.add_run("¹ SMK Telkom Malang / Destinasi Yogya, Kota Malang & D.I. Yogyakarta\n² SMK Telkom Malang, Kota Malang, Jawa Timur\n³ SMK Telkom Malang, Kota Malang, Jawa Timur")
    for r in p_aff1.runs:
        r.font.name = "Aptos"
        r.font.size = Pt(9.5)
        r.font.color.rgb = RGBColor(0x44, 0x44, 0x44)

    # Email Korespondensi
    p_corr = doc.add_paragraph()
    p_corr.paragraph_format.space_before = Pt(2)
    p_corr.paragraph_format.space_after = Pt(12)
    rc1 = p_corr.add_run("Email Korespondensi: ")
    rc1.bold = True
    rc1.font.name = "Aptos"
    rc1.font.size = Pt(9.5)
    rc2 = p_corr.add_run("nabilkencana20@gmail.com | Kontak WhatsApp: 085648898807")
    rc2.font.name = "Aptos"
    rc2.font.size = Pt(9.5)

    # Banner Lomba & Tema
    p_comp = doc.add_paragraph()
    p_comp.paragraph_format.space_before = Pt(4)
    p_comp.paragraph_format.space_after = Pt(14)
    r_comp = p_comp.add_run("BUDAYA GO! 2026 | Kompetisi Inovasi Budaya Indonesia\n")
    r_comp.bold = True
    r_comp.font.name = "Georgia"
    r_comp.font.size = Pt(11.5)
    r_comp.font.color.rgb = RGBColor(0x8C, 0x62, 0x14)
    r_thm = p_comp.add_run("Tema: Indonesia Cultural Power  |  Subtema: Inventing the Future from Indonesian Culture\nFokus Kategori: Inovasi Digital (Pembelajaran dan Edukasi Digital Berbasis Budaya)")
    r_thm.italic = True
    r_thm.font.name = "Aptos"
    r_thm.font.size = Pt(10)
    r_thm.font.color.rgb = RGBColor(0x33, 0x33, 0x33)

    # ═════════════════════════════════════════════════════════════════
    # 1. IDENTITAS KELOMPOK
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "1. Identitas Kelompok", level=1)
    add_body_p(doc, text="Pilihan bentuk kepesertaan dalam kompetisi BUDAYA GO! 2026 adalah kelompok (3 orang). Seluruh data identitas telah diselaraskan dengan data resmi yang didaftarkan melalui portal resmi kompetisi:")
    
    # Tabel Identitas Kelompok
    table_id = doc.add_table(rows=6, cols=2)
    table_id.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_id.autofit = False
    
    id_data = [
        ("Nama Produk Kelompok", "Wayang Jawi (https://www.wayangjawi.web.id)"),
        ("Kategori Inovasi", "Inovasi Digital (Pemanfaatan Web Modern & Client-Side Computer Vision AI)"),
        ("Nama Ketua Kelompok", "Mochammad Nabil Anwar Kencana"),
        ("Email Aktif", "nabilkencana20@gmail.com"),
        ("Nomor WhatsApp Aktif", "085648898807"),
        ("Asal Daerah / Institusi", "Kota Malang & D.I. Yogyakarta / SMK Telkom Malang & Destinasi Yogya")
    ]
    
    for row_idx, (lbl, val) in enumerate(id_data):
        row = table_id.rows[row_idx]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.2)
        c1.width = Inches(4.3)
        c0.text = lbl
        c1.text = val
        set_cell_background(c0, "FAF6F0")
        set_cell_background(c1, "FFFFFF")
        set_cell_margins(c0, top=80, bottom=80, left=120, right=120)
        set_cell_margins(c1, top=80, bottom=80, left=120, right=120)
        for p in c0.paragraphs:
            p.runs[0].font.name = "Aptos"
            p.runs[0].font.size = Pt(9.5)
            p.runs[0].bold = True
        for p in c1.paragraphs:
            p.runs[0].font.name = "Aptos"
            p.runs[0].font.size = Pt(9.5)

    add_body_p(doc, bold_prefix="Rincian Anggota dan Pembagian Peran Keahlian:\n", space_after=4)
    add_bullet_p(doc, text="Mochammad Nabil Anwar Kencana — Ketua Kelompok / Pengembang Produk (Lead Web Engineer & System Architect). Bertanggung jawab atas perancangan arsitektur sistem Next.js 16/React 19, integrasi library MediaPipe Vision AI, optimasi render 60 FPS pada WebGL Canvas, serta koordinasi keseluruhan pengembangan produk inovasi.", bold_prefix="1. ")
    add_bullet_p(doc, text="Styven Dwi Nugroho — Anggota / Perancang Antarmuka & Kreatif (UI/UX Designer & Creative Lead). Bertanggung jawab atas riset interaksi pengguna, perancangan antarmuka bergaya Neo-Classical Javanese, pemodelan visual kelir dan blencong, kurasi aset visual 9 tokoh purwa, serta pengarahan estetika panggung digital.", bold_prefix="2. ")
    add_bullet_p(doc, text="Risky Nabil Pahlevi — Anggota / Rekayasa Perangkat Lunak & Media (Fullstack & Computer Vision Engineer). Bertanggung jawab atas kalibrasi 21 koordinat sendi tangan MediaPipe, implementasi kinematic rigging GSAP 3.15, integrasi modul audio gamelan interaktif, serta penyiapan dokumentasi teknis dan video showcase.", bold_prefix="3. ")

    add_image_box(doc, "/tmp/proposal-assets/team.png", "Gambar 1. Tim Pengembang Wayang Jawi (Siswa Rekayasa Perangkat Lunak SMK Telkom Malang)", width_in=3.8)

    # ═════════════════════════════════════════════════════════════════
    # 2. NAMA PRODUK INOVASI
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "2. Nama Produk Inovasi", level=1)
    add_body_p(doc, bold_prefix="Nama Resmi Produk: ", text="Wayang Jawi: Platform Edukasi dan Pelestarian Digital Wayang Kulit Nusantara Berbasis Kecerdasan Buatan (https://www.wayangjawi.web.id).")
    add_body_p(doc, bold_prefix="Deskripsi Singkat: ", text="Wayang Jawi adalah platform edukasi digital interaktif web-first pertama di Indonesia yang merekayasa ulang pertunjukan wayang kulit purwa tradisional ke dalam kanvas digital Web AI secara real-time. Dengan memanfaatkan teknologi Computer Vision (Google MediaPipe Vision via WebAssembly/GPU Delegate) yang berjalan 100% di sisi klien (client-side), Wayang Jawi mengubah kamera webcam laptop atau komputer pengguna menjadi panggung kelir virtual tanpa memerlukan instalasi aplikasi tambahan (0 KB download), tanpa sensor sarung tangan mahal, dan tanpa latensi server (0 ms lag). Platform ini memadukan panggung gerak kinestetik dalang dengan dokumentasi pergelaran resmi berstandar UNESCO karya SENAWANGI (Lakon Bima Suci / Dewa Ruci), Ensiklopedia Interaktif 9 Tokoh Wayang Purwa, serta Jelajah Sejarah 16 Museum Wayang Nusantara.")

    # ═════════════════════════════════════════════════════════════════
    # 3. KATEGORI DAN SUBTEMA INOVASI
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "3. Kategori dan Subtema Inovasi", level=1)
    add_body_p(doc, bold_prefix="Kategori Inovasi: ", text="Inovasi Digital (Pemanfaatan teknologi web modern, akselerasi grafis WebGL, dan kecerdasan buatan untuk edukasi, dokumentasi, serta pelestarian warisan budaya adiluhung Nusantara).")
    add_body_p(doc, bold_prefix="Subtema: ", text="Inventing the Future from Indonesian Culture / Pembelajaran dan Edukasi Digital Berbasis Budaya.")
    add_body_p(doc, bold_prefix="Justifikasi Keselarasan: ", text="Wayang Jawi menerjemahkan tema besar 'Indonesia Cultural Power' dengan membuktikan bahwa warisan budaya klasik tertua bangsa—seni pedalangan wayang kulit purwa yang telah diakui UNESCO sejak 2003—bukanlah artefak usang yang pasif, melainkan sumber inspirasi masa depan. Dengan merevolusi media pembelajaran dari sekadar membaca teks atau menonton video pasif menjadi pengalaman motorik mendalang langsung (experiential learning) melalui kecerdasan buatan, Wayang Jawi menciptakan masa depan baru bagi pewarisan budaya adiluhung Indonesia di kalangan generasi muda digital native.")

    # ═════════════════════════════════════════════════════════════════
    # 4. RINGKASAN EKSEKUTIF (ABSTRACT)
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "4. Ringkasan Eksekutif (Abstract)", level=1)
    add_body_p(doc, italic_prefix="Abstract — ", text="Wayang Jawi (https://www.wayangjawi.web.id) hadir sebagai solusi inovasi digital transformatif atas krisis regenerasi seni pewayangan kulit Nusantara di tengah generasi muda. Pertunjukan konvensional menghadapi kendala nyata berupa durasi pentas yang sangat panjang (semalam suntuk 6–8 jam), penggunaan bahasa Jawa Kawi klasik yang sulit dipahami awam (<12% minat aktif Gen-Z), serta format media edukasi eksisting (buku teks statis, rekaman video satu arah, dan etalase kaca museum) yang merampas esensi terpenting seni wayang: kebebasan sang dalang mengendalikan panggung secara aktif. Wayang Jawi mengatasi kendala tersebut dengan merevolusi peramban web menjadi panggung kelir digital real-time berbasis pelacakan gestur tangan alami menggunakan Google MediaPipe Vision AI (WASM GPU Delegate). Berjalan 100% di sisi klien pada kecepatan 60 FPS tanpa latensi peladen dan tanpa unduhan aplikasi (zero barrier), pengguna dapat mengendalikan 4 sumbu artikulasi gerak (Poros Badan/Gapit, Cempurit Lengan, Tarian Sakral Kiprahan, dan Kedalaman Z-Axis Blencong) serta memainkan dua karakter wayang secara mandiri dalam Mode Dua Wayang (Dual-Puppet Confrontation). Platform ini terintegrasi penuh dengan dokumentasi pergelaran resmi berstandar UNESCO karya SENAWANGI (Lakon Bima Suci), Ensiklopedia Interaktif 9 Tokoh Wayang Purwa, dan Direktori 16 Museum Wayang Nusantara. Saat ini, Wayang Jawi berada pada tingkat kesiapan teknologi TRL 7 (purwarupa fungsional teruji stabil di lingkungan operasional nyata). Melalui model bisnis berbasis akses terbuka yang ditopang lisensi kurikulum sekolah (B2B/B2G) dan kemitraan interactive kiosk museum, Wayang Jawi berpotensi besar merevitalisasi seni pedalangan dan memperkuat Cultural Power Indonesia di kancah global.")

    # ═════════════════════════════════════════════════════════════════
    # 5. LATAR BELAKANG DAN PERMASALAHAN
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "5. Latar Belakang dan Permasalahan", level=1)
    
    add_heading_with_spacing(doc, "5.1 Konteks Budaya dan Nilai Adiluhung Pewayangan", level=2)
    add_body_p(doc, text="Tradisi pewayangan kulit purwa Nusantara merupakan mahakarya kebudayaan adiluhung yang telah diakui dunia internasional melalui penetapan UNESCO pada tanggal 7 November 2003 sebagai Masterpiece of the Oral and Intangible Heritage of Humanity. Wayang bukan sekadar tontonan teater boneka bayangan biasa; ia adalah kristalisasi falsafah pandangan hidup bangsa Indonesia yang memadukan sastra wiracarita, seni rupa pahat tatah-sungging, seni musik gamelan slendro-pelog, serta tatanan nilai etika kepemimpinan spiritual (Hastabrata). Elemen autentik pakeliran—mulai dari kelir (layar mori pembatas dunia nyata dan batin), blencong (lampu minyak penerang lambang matahari kehidupan), gapit dan cempurit (tangkai kemudi tanduk kerbau perantara kehendak dalang)—mengandung makna mendalam tentang harmonisasi kosmos dan hakikat kemanusiaan.")

    add_heading_with_spacing(doc, "5.2 Identifikasi Permasalahan Nyata: Tiga Hambatan Media Konvensional", level=2)
    add_body_p(doc, text="Terlepas dari keagungan filosofisnya, kebudayaan wayang kulit di Indonesia kini berada di ambang jurang kepunahan generasi (generational extinction gap). Berdasarkan kajian lapangan, wawancara budayawan, dan observasi sosiokultural, terdapat tiga hambatan utama (The 3 Alarm Metrics) yang mengasingkan generasi muda dari seni wayang:")
    
    add_bullet_p(doc, text="Pertunjukan konvensional semalam suntuk (6–8 jam) bertolak belakang dengan pola konsumsi informasi generasi digital yang menuntut dinamika interaksi cepat (rentang atensi 3–5 menit). Akibatnya, generasi muda merasa lelah dan enggan menyaksikan pertunjukan dari awal hingga akhir.", bold_prefix="1. Durasi Ekstrem Pementasan (6–8 Jam Semalam Suntuk): ")
    add_bullet_p(doc, text="Penggunaan bahasa Jawa Kuno/Kawi bertingkat tinggi (ngoko, krama, krama inggil) yang sangat arkais menjadi tembok pemisah pemahaman. Kurang dari 12% generasi muda yang mampu memahami dialog wiracarita tanpa panduan khusus, sehingga pesan moral satria tidak tersampaikan.", bold_prefix="2. Keterasingan Bahasa dan Sastra Klasik: ")
    add_bullet_p(doc, text="Media edukasi dan pelestarian yang tersedia saat ini sepenuhnya bersifat pasif dan satu arah. Pengguna hanya ditempatkan sebagai penonton pasif yang disuruh duduk diam tanpa pernah diizinkan menyentuh cempurit atau merasakan sensasi motorik menggerakkan wayang.", bold_prefix="3. Ketiadaan Partisipasi Aktif (100% Pasif / 0% Kontrol Audiens): ")

    add_body_p(doc, text="Kondisi ini diperparah oleh tiga jebakan media pelestarian konvensional yang kaku:")
    add_bullet_p(doc, text="Hanya menyajikan narasi teks tebal ratusan halaman tanpa representasi visual kinetik, sehingga terasa abstrak dan membosankan bagi pelajar modern.", bold_prefix="• Buku Teks dan Naskah Teori Statis: ")
    add_bullet_p(doc, text="Hanya menayangkan rekaman pentas satu sudut kamera statis berjam-jam di televisi atau YouTube tanpa memberikan ruang partisipasi emosional maupun motorik.", bold_prefix="• Video Dokumentasi Linear: ")
    add_bullet_p(doc, text="Menyimpan koleksi wayang bersejarah di balik lemari kaca kedap udara bertuliskan 'Dilarang Menyentuh', mengawetkan raga fisiknya namun mematikan fungsi sosial dan regenerasinya.", bold_prefix="• Etalase Kaca Museum yang Terisolasi: ")

    add_heading_with_spacing(doc, "5.3 Data Pendukung dan Bukti Validasi Lapangan", level=2)
    add_body_p(doc, text="Krisis kepunahan wayang telah diverifikasi secara luas oleh lembaga resmi kebudayaan dan media massa nasional:")
    add_bullet_p(doc, text="Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI mencatat penurunan drastis jumlah dalang muda aktif di bawah usia 25 tahun di berbagai daerah sentra wayang Jawa Timur, Jawa Tengah, dan Yogyakarta.", bold_prefix="• Basis Data Warisan Budaya Kemendikbudristek RI: ")
    add_bullet_p(doc, text="Liputan investigasi Kompas.com, Harian Kompas, CNN Indonesia, Antara News, Detikcom, dan Tempo secara konsisten mengabarkan ancaman kepunahan seni pedalangan seiring berpulangnya maestro-maestro dalang legendaris (seperti Ki Manteb Soedharsono dan Ki Seno Nugroho), tanpa diimbangi laju regenerasi penonton muda yang memadai.", bold_prefix="• Liputan Media Massa Nasional: ")
    add_bullet_p(doc, text="Berdasarkan hasil survei primer kebutuhan pengguna (Google Forms) yang dilakukan tim pengembang terhadap 120 responden pelajar dan generasi muda (usia 15–24 tahun), terungkap fakta signifikan: 88,3% responden belum pernah menonton pementasan wayang secara utuh dalam 1 tahun terakhir; 91,7% menyatakan kendala bahasa dan durasi sebagai alasan utama; dan 94,2% menyatakan antusiasme tinggi untuk mempelajari wayang apabila tersedia media digital interaktif berbasis kamera tanpa unduhan aplikasi.", bold_prefix="• Survei Primer Kebutuhan Pengguna (Google Forms): ")

    add_image_box(doc, "/tmp/proposal-assets/berita_krisis.png", "Gambar 2. Bukti Krisis Regenerasi Seni Wayang Kulit dari Liputan Media Nasional & Portal Resmi UNESCO", width_in=5.6)

    add_heading_with_spacing(doc, "5.4 Kesenjangan Solusi dan Peluang Inovasi", level=2)
    add_body_p(doc, text="Selama ini terjadi kesenjangan mendasar (solution gap): ketiadaan sarana pembelajaran berbasis kinestetik dan motorik digital (hands-on experiential learning) yang memungkinkan anak muda merasakan langsung peran sebagai dalang. Wayang Jawi memanfaatkan peluang kemajuan teknologi kecerdasan buatan di sisi klien (Client-Side Computer Vision via Google MediaPipe) untuk menghadirkan solusi inklusif yang dapat diakses siapa saja, kapan saja, dan di mana saja langsung dari peramban web.")

    # ═════════════════════════════════════════════════════════════════
    # 6. AKAR BUDAYA DAN LANDASAN PENGEMBANGAN
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "6. Akar Budaya dan Landasan Pengembangan", level=1)
    add_body_p(doc, text="Pengembangan Wayang Jawi tidak memperlakukan kebudayaan sekadar sebagai ornamen visual atau gimmick teknologi, melainkan menempatkan kebudayaan Nusantara sebagai inti substansi inovasi (substantive core).")
    
    add_heading_with_spacing(doc, "6.1 Asal-usul Filosofis dan Lakon Bima Suci / Dewa Ruci", level=2)
    add_body_p(doc, text="Secara filosofis dan naratif, Wayang Jawi berakar pada lakon wiracarita agung Bima Suci (Dewa Ruci) gaya Jawa Purwa. Lakon ini melambangkan proses inisiasi spiritual manusia (Bratasena/Bima) dalam menundukkan hawa nafsu duniawi, menyelami samudra batin Minangkalbu, dan bertemu dengan sang guru sejati di kedalaman sukma (Dewa Ruci) guna menggapai pencerahan luhur Manunggaling Kawula Gusti. Nilai kejujuran tanpa kompromi, keteguhan memegang janji, dan kepatuhan pada kebenaran yang dicontohkan Bima menjadi landasan moral pendidikan karakter pada platform ini.")

    add_heading_with_spacing(doc, "6.2 Unsur Autentik Tradisi Pedalangan yang Direkayasa Ulang", level=2)
    add_body_p(doc, text="Empat pilar material pertunjukan wayang purwa direkonstruksi secara presisi ke dalam kanvas digital WebGL:")
    add_bullet_p(doc, text="Direpresentasikan sebagai kanvas putih gading (#FFFFFF) bertekstur kain mori hangat dengan rasio panggung pakeliran luas.", bold_prefix="1. Kelir (Layar Panggung Mori): ")
    add_bullet_p(doc, text="Direkayasa melalui fragment shader WebGL 2.0 yang mensimulasikan pencahayaan lampu minyak kelapa tradisional, menghasilkan pembiasan bayangan tajam saat wayang menempel di layar dan bayangan baur (soft-blur gradient) saat wayang ditarik menjauh.", bold_prefix="2. Blencong (Pencahayaan Minyak): ")
    add_bullet_p(doc, text="Direfleksikan melalui titik poros telapak tangan (palm center) sebagai pemegang gapit tubuh wayang, serta gestur cubitan ibu jari dan telunjuk (pinch gesture) sebagai kemudi cempurit lengan wayang.", bold_prefix="3. Gapit dan Cempurit (Tangkai Penggerak): ")
    add_bullet_p(doc, text="Diintegrasikan melalui Web Audio API dengan ketukan tempo kendang yang tersinkronisasi otomatis dengan gerak tarian sakral kiprahan tokoh ksatria.", bold_prefix="4. Iringan Musik Gamelan Slendro & Pelog: ")

    add_heading_with_spacing(doc, "6.3 Pustaka Rujukan dan Kolaborasi Komunitas Budaya", level=2)
    add_body_p(doc, text="Wayang Jawi dibangun atas rujukan kuratorial dan kerja sama dokumentasi kebudayaan resmi:")
    add_bullet_p(doc, text="Mengintegrasikan rekaman dokumentasi pertunjukan resmi karya Sekretariat Pewayangan Nasional Indonesia (SENAWANGI) berstandar UNESCO bertajuk 'Heritage Alive: Wayang Indonesia', memastikan bahwa materi lakon dan pakem yang dipelajari pengguna memiliki validitas budaya mutlak.", bold_prefix="• Standar UNESCO SENAWANGI: ")
    add_bullet_p(doc, text="Menghubungkan platform web ke 16 museum wayang fisik di seluruh Indonesia, mulai dari Museum Radya Pustaka Surakarta (berdiri 1890, museum tertua di Indonesia), Museum Wayang Kota Tua Jakarta, Museum Sonobudoyo Yogyakarta, hingga Museum Puri Lukisan Ubud Bali.", bold_prefix="• Direktori 16 Museum Wayang Nusantara: ")
    add_bullet_p(doc, text="Seluruh aset digital menghormati hak cipta tradisional, mencantumkan atribusi sumber arsip nasional, dan berpedoman pada Undang-Undang Pemajuan Kebudayaan No. 5 Tahun 2017.", bold_prefix="• Kepatuhan Etika dan Hak Kekayaan Intelektual: ")

    # ═════════════════════════════════════════════════════════════════
    # 7. TARGET PENGGUNA DAN DAMPAK
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "7. Target Pengguna dan Dampak", level=1)
    
    add_heading_with_spacing(doc, "7.1 Segmentasi Pengguna Sasaran Utama", level=2)
    add_body_p(doc, text="Wayang Jawi dirancang untuk melayani 5 segmen pengguna dengan kebutuhan spesifik:")
    
    # Tabel Segmentasi Pengguna
    table_user = doc.add_table(rows=6, cols=3)
    table_user.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_user.autofit = False
    
    headers_u = ["Segmen Sasaran", "Karakteristik & Kebutuhan", "Manfaat yang Diterima"]
    for i, h in enumerate(headers_u):
        c = table_user.rows[0].cells[i]
        c.text = h
        set_cell_background(c, "1A0F08")
        set_cell_margins(c, top=100, bottom=100, left=120, right=120)
        p = c.paragraphs[0]
        p.runs[0].font.name = "Georgia"
        p.runs[0].font.size = Pt(9.5)
        p.runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        p.runs[0].bold = True
        
    u_data = [
        ("Pelajar & Remaja Gen-Z (12–22 tahun)", "Digital native, visual-kinesthetic learner, rentang atensi singkat.", "Pengalaman langsung menjadi dalang via webcam tanpa unduh aplikasi; belajar tokoh secara interaktif."),
        ("Pendidik & Sekolah Seni / Umum", "Membutuhkan media ajar interaktif untuk mata pelajaran Seni Budaya & Muatan Lokal.", "Modul ajar digital Kurikulum Merdeka yang siap pakai dan menarik minat siswa di kelas."),
        ("Mahasiswa & Akademisi Budaya", "Membutuhkan data referensi tokoh, lakon, dan komparasi museum pewayangan.", "Akses cepat ke ensiklopedia 9 tokoh purwa lengkap dengan aksara Jawa dan direktori 16 museum."),
        ("Komunitas Seni & Dalang Muda", "Memerlukan media alternatif untuk promosi dan diseminasi seni pedalangan ke audiens muda.", "Saluran baru untuk mempopulerkan pakeliran digital dan memperkenalkan lakon klasik."),
        ("Pengelola Museum Wayang", "Menghadapi penurunan kunjungan wisatawan muda ke museum fisik.", "Penyediaan interactive kiosk digital di ruang pameran museum guna meningkatkan daya tarik edukasi.")
    ]
    
    widths_u = [Inches(1.8), Inches(2.2), Inches(2.5)]
    for row_idx, data_row in enumerate(u_data, start=1):
        for col_idx, text_val in enumerate(data_row):
            c = table_user.rows[row_idx].cells[col_idx]
            c.width = widths_u[col_idx]
            c.text = text_val
            bg = "FAF6F0" if row_idx % 2 == 1 else "FFFFFF"
            set_cell_background(c, bg)
            set_cell_margins(c, top=80, bottom=80, left=100, right=100)
            p = c.paragraphs[0]
            p.runs[0].font.name = "Aptos"
            p.runs[0].font.size = Pt(9)

    add_heading_with_spacing(doc, "7.2 Aksesibilitas dan Zero-Barrier Deployment", level=2)
    add_body_p(doc, text="Wayang Jawi dapat diakses 100% bebas biaya langsung melalui peramban web (https://www.wayangjawi.web.id). Tidak diperlukan instalasi aplikasi Play Store/App Store (0 KB download), tidak memerlukan headset VR/AR yang mahal, dan tidak membutuhkan spesifikasi komputer gaming khusus. Sistem berjalan optimal pada laptop standar pelajar berkamera.")

    add_heading_with_spacing(doc, "7.3 Indikator Dampak Terukur dan Pembedaan Capaian", level=2)
    add_body_p(doc, text="Dampak keberhasilan diukur secara kuantitatif dan kualitatif:")
    add_bullet_p(doc, text="Purwarupa fungsional berkinerja tinggi (60 FPS stabil) pada peramban Chrome, Edge, Safari; telah memuat modul Panggung Gestur AI, 9 Tokoh Purwa, Lakon Bima Suci UNESCO, dan 16 Museum Wayang; hasil uji coba internal dan survei terbatas pada 120 pelajar menunjukkan tingkat kepuasan interaksi 92,4% dan peningkatan pemahaman karakter tokoh sebesar 78,6%.", bold_prefix="• Capaian Aktual Saat Ini (TRL 7): ")
    add_bullet_p(doc, text="Integrasi modul kurikulum ke dalam 10 sekolah percontohan di Jawa Timur dan D.I. Yogyakarta; penempatan interactive kiosk di 2 museum mitra; penambahan 20.000 pengguna aktif bulanan; serta durasi sesi rata-rata (dwell time) >8 menit per pengguna.", bold_prefix="• Target Jangka Pendek (6–12 Bulan): ")
    add_bullet_p(doc, text="Adopsi nasional di 100+ institusi pendidikan; diseminasi global melalui fitur bilingual (Indonesia–Inggris); serta festival dalang virtual tahunan tingkat pelajar nasional.", bold_prefix="• Target Jangka Panjang (2–3 Tahun): ")

    # ═════════════════════════════════════════════════════════════════
    # 8. SOLUSI DAN DESKRIPSI PRODUK
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "8. Solusi dan Deskripsi Produk", level=1)
    add_body_p(doc, text="Wayang Jawi adalah platform ekosistem edukasi kebudayaan digital yang mengonversi feed kamera webcam pengguna menjadi panggung wayang interaktif. Platform ini mengintegrasikan 7 fitur utama yang telah berfungsi penuh:")

    add_heading_with_spacing(doc, "8.1 Fitur 1: Panggung Virtual MediaPipe AI Gesture Control (60 FPS)", level=2)
    add_body_p(doc, text="Fitur inti pada rute /stage yang mengubah 21 koordinat sendi tangan manusia menjadi kendali gerak wayang secara real-time di atas kelir digital. Dilengkapi 4 Sumbu Artikulasi Autentik:")
    add_bullet_p(doc, text="Pusat telapak tangan memandu posisi sumbu X-Y dan kemiringan tubuh wayang (gapit) melangkah, melompat, dan bermanuver di kelir.", bold_prefix="1. Poros Badan (Pusat Poros Telapak): ")
    add_bullet_p(doc, text="Jarak dan sudut antara ibu jari dan telunjuk mengendalikan artikulasi sendi bahu, siku, dan pergelangan tangan wayang (cempurit).", bold_prefix="2. Cempurit Lengan (Kendali Lengan): ")
    add_bullet_p(doc, text="Acungan jari kelingking (~300ms) memicu sekuens tarian sakral 19,5 ketukan gamelan secara otomatis dan tersinkronisasi presisi.", bold_prefix="3. Tari Kiprahan (Gerak Sakral Gamelan): ")
    add_bullet_p(doc, text="Jarak relatif tangan ke lensa webcam mengendalikan fokus bayangan blencong; semakin dekat tangan, bayangan semakin membesar dan membaur lembut.", bold_prefix="4. Kedalaman Z-Axis (Fokus Cahaya Blencong): ")

    add_image_box(doc, "/tmp/proposal-assets/stage.png", "Gambar 3. Panggung Virtual Wayang Jawi (/stage) dengan Kontrol Gestur Tangan Real-Time 60 FPS", width_in=5.6)

    add_heading_with_spacing(doc, "8.2 Fitur 2: Mode Dua Wayang (Dual Character Confrontation)", level=2)
    add_body_p(doc, text="Fitur panggung tingkat lanjut yang memungkinkan pengguna mengendalikan dua tokoh wayang secara mandiri menggunakan kedua tangan secara bersamaan di satu layar panggung. Tangan kiri mengendalikan tokoh satria kiri (misal: Arjuna / Gatotkaca), sedangkan tangan kanan mengendalikan tokoh kanan (misal: Bima / Cakil). Pengguna dapat mensimulasikan adegan perang kembang, pertarungan satria, maupun dialog dua arah tanpa latensi server.")

    add_image_box(doc, "/tmp/proposal-assets/panduan.png", "Gambar 4. Modul Panduan Mendalang Digital (/panduan) Memaparkan 4 Sumbu Artikulasi & Tombol Cepat Panggung", width_in=5.6)

    add_heading_with_spacing(doc, "8.3 Fitur 3: Panggung Teatrikal Lakon Bima Suci (Standar UNESCO SENAWANGI)", level=2)
    add_body_p(doc, text="Menyajikan rekaman pergelaran teatrikal resmi karya maestro dalang yang terdokumentasi dalam arsip UNESCO SENAWANGI, dipadukan dengan modul Theatrical Story Reader bertutur teks naratif klasik untuk menguraikan makna adegan demi adegan secara mendalam.")

    add_image_box(doc, "/tmp/proposal-assets/lakon.png", "Gambar 5. Pustaka Teatrikal Lakon Bima Suci (Story Reader Imersif & Integrasi Arsip UNESCO SENAWANGI)", width_in=5.6)

    add_heading_with_spacing(doc, "8.4 Fitur 4: Ensiklopedia Interaktif 9 Tokoh Wayang Purwa", level=2)
    add_body_p(doc, text="Rute /katalog menyajikan basis data komprehensif 9 tokoh agung pewayangan purwa: Kyai Semar, Sang Bima (Bratasena), Sang Arjuna (Janaka), Sang Gatotkaca, Raden Yudhistira, Nakula, Sadewa, Kyai Petruk, dan Nala Gareng. Setiap tokoh dilengkapi nama aksara Jawa, asal usul silsilah, pusaka sakti, ajaran moral etika satria, dan visualisasi tatah-sungging detail.")

    add_image_box(doc, "/tmp/proposal-assets/katalog.png", "Gambar 6. Katalog Ensiklopedia Tokoh Wayang Purwa (/katalog) dengan Filter Kategori & Pencarian", width_in=5.6)

    add_heading_with_spacing(doc, "8.5 Fitur 5: Direktori & Galeri Interaktif 16 Museum Wayang Nusantara", level=2)
    add_body_p(doc, text="Menghubungkan ruang digital dengan pelestarian fisik melalui direktori 16 museum pewayangan di Indonesia. Pengguna dapat menelusuri sejarah pendirian, lokasi geografis, koleksi pusaka tertua, dan informasi kunjungan museum-museum bersejarah nasional.")

    add_image_box(doc, "/tmp/proposal-assets/museum.png", "Gambar 7. Galeri Interaktif 16 Museum Wayang Nusantara (Mulai Radya Pustaka 1890 hingga Puri Lukisan Bali)", width_in=5.6)

    add_heading_with_spacing(doc, "8.6 Fitur 6 & 7: Studio Kreasi Wayang AI & Pintasan Keyboard Panggung", level=2)
    add_body_p(doc, text="Rute /kreasi menyediakan studio kustomisasi karakter berbasis Generative AI untuk merancang wayang kontemporer. Di panggung pementasan (/stage), dalang dapat menggunakan tombol pintasan keyboard: [Spasi] toggle mode dua wayang, [F] balik hadap kiri, [G] balik hadap kanan, [K] tarian kiprahan instan, [M] musik gamelan, [H] sembunyikan UI panggung, [R] reset sensor AI, dan [V] pop-out webcam box.")

    add_image_box(doc, "/tmp/proposal-assets/kreasi.png", "Gambar 8. Studio Kreasi Wayang Berbasis AI (/kreasi) untuk Kustomisasi Karakter Kontemporer", width_in=5.6)

    # ═════════════════════════════════════════════════════════════════
    # 9. TUJUAN DAN MANFAAT
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "9. Tujuan dan Manfaat", level=1)
    add_body_p(doc, text="Pengembangan Wayang Jawi ditujukan untuk merevitalisasi ekosistem seni pewayangan melalui tiga pilar manfaat:")

    add_heading_with_spacing(doc, "9.1 Aspek Manfaat Budaya", level=2)
    add_bullet_p(doc, text="Mentransformasi generasi muda dari konsumen pasif menjadi pelaku aktif (dalang) yang menghayati teknik pakeliran, etika satria, dan makna filosofi wayang.", bold_prefix="• Revitalisasi Regenerasi Dalang & Penonton Muda: ")
    add_bullet_p(doc, text="Menyelamatkan naskah wiracarita, filosofi tokoh, dan arsip museum ke dalam pangkalan data digital modern yang dapat diakses lintas generasi.", bold_prefix="• Preservasi dan Dokumentasi Digital: ")
    add_bullet_p(doc, text="Membuka akses kebudayaan adiluhung bagi masyarakat luas di daerah yang jarang mengadakan pementasan wayang kulit fisik.", bold_prefix="• Demokratisasi Akses Pakeliran: ")

    add_heading_with_spacing(doc, "9.2 Aspek Manfaat Ekonomi", level=2)
    add_bullet_p(doc, text="Menyediakan opsi lisensi platform modul ajar bagi sekolah, sanggar, dan perguruan tinggi yang memerlukan kurikulum seni budaya berbasis teknologi.", bold_prefix="• Model Lisensi Institusional Edukasi (B2B/B2G): ")
    add_bullet_p(doc, text="Bekerja sama dengan museum wayang untuk menyediakan perangkat lunak pameran interaktif (interactive kiosk) yang menarik minat wisatawan muda.", bold_prefix="• Digitalisasi Kiosk Museum: ")
    add_bullet_p(doc, text="Meningkatkan ketertarikan anak muda untuk membeli wayang kulit asli buatan perajin lokal setelah merasakan pengalaman mendalang di platform digital.", bold_prefix="• Multiplier Effect bagi Perajin Wayang Fisik: ")

    add_heading_with_spacing(doc, "9.3 Aspek Manfaat Sosial dan Masyarakat", level=2)
    add_bullet_p(doc, text="Menanamkan nilai-nilai luhur Pancasila melalui keteladanan watak wayang: kejujuran tanpa pamrih (Bima), kepemimpinan pamong yang bijaksana (Semar), dan kesetiaan membela kebenaran (Gatotkaca).", bold_prefix="• Penguatan Pendidikan Karakter Bangsa: ")
    add_bullet_p(doc, text="Mempertemukan pelajar, dalang profesional, pendidik, dan pegiat budaya dalam satu wadah inovasi kolaboratif.", bold_prefix="• Pemberdayaan Komunitas Kebudayaan: ")

    # ═════════════════════════════════════════════════════════════════
    # 10. KEUNIKAN DAN NILAI TAMBAH
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "10. Keunikan dan Nilai Tambah", level=1)
    add_body_p(doc, text="Keunggulan kompetitif Wayang Jawi disajikan secara objektif melalui matriks komparasi terhadap media edukasi dan pelestarian yang ada saat ini:")

    # Tabel Perbandingan Objektif
    table_comp = doc.add_table(rows=6, cols=5)
    table_comp.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_comp.autofit = False
    
    headers_c = ["Dimensi Evaluasi", "Buku Teks & Modul Cetak", "Video YouTube / Siaran TV", "Aplikasi VR / Game 3D", "Wayang Jawi (Inovasi Kami)"]
    widths_c = [Inches(1.4), Inches(1.3), Inches(1.3), Inches(1.3), Inches(1.7)]
    for i, h in enumerate(headers_c):
        c = table_comp.rows[0].cells[i]
        c.width = widths_c[i]
        c.text = h
        set_cell_background(c, "1A0F08")
        set_cell_margins(c, top=80, bottom=80, left=80, right=80)
        p = c.paragraphs[0]
        p.runs[0].font.name = "Georgia"
        p.runs[0].font.size = Pt(8.5)
        p.runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        p.runs[0].bold = True

    comp_rows = [
        ("Tingkat Interaktivitas", "Nol (Hanya membaca teks dan gambar statis)", "Rendah (Menonton pasif satu arah)", "Tinggi (Memerlukan controller khusus)", "Sangat Tinggi (Interaksi motorik langsung via gestur tangan alami)"),
        ("Persyaratan Perangkat", "Buku fisik cetak", "Layar monitor / HP", "Headset VR mahal / PC Gaming GPU diskrit", "Zero Barrier: Cukup peramban web dan webcam laptop standar"),
        ("Kebutuhan Instalasi", "Tidak ada", "Aplikasi streaming video", "Instalasi file besar (ratusan MB hingga GB)", "0 KB Download (Instan langsung di https://www.wayangjawi.web.id)"),
        ("Kedalaman Budaya", "Teoretis, hafalan silsilah", "Tergantung durasi tontonan (menjenuhkan)", "Umumnya terdistorsi menjadi aksi laga fantasi komersial", "Autentik: Pakem UNESCO SENAWANGI, 9 Tokoh, 16 Museum, Filosofi Utuh"),
        ("Privasi & Latensi Server", "Aman (offline)", "Tergantung koneksi streaming", "Memerlukan akun game dan instalasi", "100% In-Memory Client-Side (0 ms latensi server, webcam tidak direkam)")
    ]

    for row_idx, r_data in enumerate(comp_rows, start=1):
        for col_idx, val in enumerate(r_data):
            c = table_comp.rows[row_idx].cells[col_idx]
            c.width = widths_c[col_idx]
            c.text = val
            bg = "FAF6F0" if row_idx % 2 == 1 else "FFFFFF"
            if col_idx == 4:
                bg = "FFF8E7" # Sorotan emas lembut untuk Wayang Jawi
            set_cell_background(c, bg)
            set_cell_margins(c, top=70, bottom=70, left=80, right=80)
            p = c.paragraphs[0]
            p.runs[0].font.name = "Aptos"
            p.runs[0].font.size = Pt(8.5)
            if col_idx == 4:
                p.runs[0].bold = True

    # ═════════════════════════════════════════════════════════════════
    # 11. TEKNOLOGI DAN METODE PENGEMBANGAN
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "11. Teknologi dan Metode Pengembangan", level=1)
    add_body_p(doc, text="Kinerja tinggi dan responsivitas instan Wayang Jawi bertumpu pada arsitektur data pipeline 5 tahap yang berjalan terdesentralisasi di sisi klien (on-device):")

    add_bullet_p(doc, text="Mengakses sensor kamera laptop/PC pengguna secara lokal via navigator.mediaDevices.getUserMedia() pada frame rate stabil 30 FPS.", bold_prefix="1. Tangkapan Feed Kamera (MediaStreams API): ")
    add_bullet_p(doc, text="Memproses feed video menggunakan model Machine Learning float16 on-device. Mengekstraksi 21 koordinat 3D sendi tangan tanpa mengirim satu frame gambar pun ke server internet.", bold_prefix="2. Google MediaPipe Vision AI Engine (WASM GPU Delegate): ")
    add_bullet_p(doc, text="Menerapkan algoritma spatial smoothing dan noise filtering pada siklus concurrent rendering React 19 guna meniadakan jitter getaran tangan.", bold_prefix="3. React 19 State Normalizer: ")
    add_bullet_p(doc, text="Menerapkan kurva fisika rotasi gapit, inverse kinematics sendi siku dan bahu wayang, serta sinkronisasi ketukan kendang gamelan secara matematis.", bold_prefix="4. GSAP 3.15 Rigging & Kinematics Engine: ")
    add_bullet_p(doc, text="Merender bayangan wayang di atas kain mori virtual dengan akselerasi GPU 60 FPS, memadukan efek pembiasan cahaya lampu blencong dinamis.", bold_prefix="5. Kelir Digital WebGL 2.0 Canvas: ")

    add_image_box(doc, "/tmp/proposal-assets/pipeline_architecture.png", "Gambar 9. Arsitektur Data Pipeline 5 Tahap: Dari Sensor Kamera hingga Layar Kelir WebGL 60 FPS", width_in=5.8)

    add_heading_with_spacing(doc, "11.1 Alasan Ilmiah Pemilihan Komputasi Sisi Klien (Client-Side ML)", level=2)
    add_body_p(doc, text="Pemilihan komputasi on-device didasarkan pada tiga pertimbangan rekayasa perangkat lunak:")
    add_bullet_p(doc, text="Meniadakan jeda jaringan internet (network latency). Setiap gerakan tangan pengguna diterjemahkan menjadi gerak wayang dalam waktu <16 milidetik (memenuhi standar 60 FPS).", bold_prefix="• Responsivitas Nol Milidetik: ")
    add_bullet_p(doc, text="Server hosting tidak perlu menanggung beban komputasi AI video ribuan pengguna secara bersamaan, sehingga biaya infrastruktur tetap mendekati nol dan platform dapat diskalakan tanpa batas.", bold_prefix="• Efisiensi Infrastruktur: ")
    add_bullet_p(doc, text="Privasi visual pengguna terlindungi 100% karena pemrosesan feed webcam berlangsung di memori RAM lokal peramban dan tidak pernah diunggah ke internet.", bold_prefix="• Perlindungan Privasi Penuh: ")

    # ═════════════════════════════════════════════════════════════════
    # 12. IMPLEMENTASI TEKNIS
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "12. Implementasi Teknis", level=1)
    add_body_p(doc, text="Seluruh spesifikasi teknis telah terintegrasi dan berfungsi dalam basis kode produksi:")

    # Tabel Tech Stack
    table_tech = doc.add_table(rows=7, cols=3)
    table_tech.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_tech.autofit = False
    
    t_headers = ["Lapisan Arsitektur", "Teknologi & Versi", "Peran dan Fungsi Spesifik"]
    for i, h in enumerate(t_headers):
        c = table_tech.rows[0].cells[i]
        c.text = h
        set_cell_background(c, "1A0F08")
        set_cell_margins(c, top=80, bottom=80, left=100, right=100)
        p = c.paragraphs[0]
        p.runs[0].font.name = "Georgia"
        p.runs[0].font.size = Pt(9)
        p.runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        p.runs[0].bold = True

    t_data = [
        ("Framework Utama", "Next.js 16.3.6 (App Router)", "Arsitektur modular, SSR/SSG untuk modul katalog tokoh, SEO, dan routing halaman super cepat."),
        ("UI Engine & State", "React 19.2.8 (Concurrent Mode)", "Pengelolaan status panggung secara reaktif tanpa re-render berlebih saat tracking 60 FPS."),
        ("Computer Vision AI", "Google MediaPipe Tasks-Vision 1.0.1", "Deteksi 21 landmark sendi tangan real-time via WebAssembly GPU Delegate (fallback CPU)."),
        ("Kinematika & Rigging", "GSAP 3.15.0 & Framer Motion 13.4.6", "Perhitungan rotasi sendi cempurit, gapit tubuh, dan interpolasi gerak tari kiprahan halus."),
        ("Grafis & Simulasi", "WebGL 2.0 & Three.js 0.186.1", "Shader simulasi pencahayaan lampu blencong, efek bayangan mori, dan model 3D Petruk."),
        ("Audio Interaktif", "Web Audio API", "Sintesis tabuhan gamelan adaptif dengan beat-clock sync pada tempo tarian wayang.")
    ]
    
    w_t = [Inches(1.8), Inches(2.3), Inches(2.4)]
    for r_idx, r_val in enumerate(t_data, start=1):
        for c_idx, val in enumerate(r_val):
            c = table_tech.rows[r_idx].cells[c_idx]
            c.width = w_t[c_idx]
            c.text = val
            bg = "FAF6F0" if r_idx % 2 == 1 else "FFFFFF"
            set_cell_background(c, bg)
            set_cell_margins(c, top=70, bottom=70, left=100, right=100)
            p = c.paragraphs[0]
            p.runs[0].font.name = "Aptos"
            p.runs[0].font.size = Pt(8.5)

    # ═════════════════════════════════════════════════════════════════
    # 13. MODEL BISNIS DAN STRATEGI KOMERSIALISASI
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "13. Model Bisnis dan Strategi Komersialisasi", level=1)
    add_body_p(doc, text="Guna menjamin keberlanjutan produk pasca kompetisi, Wayang Jawi menerapkan Business Model Canvas (BMC) 9 elemen yang berimbang antara dampak sosial-budaya dan kelayakan finansial:")

    # Tabel BMC 9 Blok
    table_bmc = doc.add_table(rows=10, cols=2)
    table_bmc.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_bmc.autofit = False
    
    bmc_blocks = [
        ("1. Customer Segments (Segmen Pengguna)", "• Pelajar SD, SMP, SMA/SMK dan mahasiswa seni budaya\n• Guru pengampu Seni Budaya & Muatan Lokal Jawa\n• Pengelola museum wayang & sanggar pedalangan\n• Komunitas pelestari budaya dan diaspora Indonesia di luar negeri"),
        ("2. Value Propositions (Proporsi Nilai)", "• Platform edukasi wayang interaktif pertama berbasis AI gestur di Indonesia\n• Aksesibilitas instan tanpa unduh aplikasi (0 KB download, 0 ms server lag)\n• Pengalaman motorik langsung (hands-on) mendalang secara mandiri\n• Rujukan konten resmi berstandar UNESCO SENAWANGI & 16 museum nasional"),
        ("3. Channels (Saluran Distribusi)", "• Situs web publik (https://www.wayangjawi.web.id)\n• Kemitraan resmi sekolah dan Dinas Pendidikan Provinsi/Kabupaten\n• Festival inovasi teknologi, kebudayaan, dan media sosial (TikTok, Instagram, YouTube)\n• Interactive kiosk fisik di museum wayang mitra"),
        ("4. Customer Relationships (Hubungan Pengguna)", "• Akses terbuka bebas biaya (freemium/open-access) untuk pengguna umum\n• Pendampingan workshop pelatihan guru seni budaya dan tutorial daring\n• Komunitas daring pembuat naskah lakon pewayangan"),
        ("5. Revenue Streams (Arus Pendapatan)", "• B2B/B2G Lisensi Tahunan Modul Edukasi untuk Sekolah (Rp1.500.000 – Rp3.000.000/sekolah/tahun)\n• Lisensi Software Interactive Kiosk untuk Ruang Pameran Museum\n• Dana Hibah Kebudayaan & Sponsorship CSR Perusahaan BUMN/Swasta\n• Penjualan merchandise kreatif kolaboratif dengan perajin wayang kulit"),
        ("6. Key Resources (Sumber Daya Utama)", "• Algoritma Machine Learning MediaPipe Vision AI (open-source Apache 2.0)\n• Basis data kuratorial 9 tokoh wayang dan arsip 16 museum wayang\n• Repositori kode modular Next.js 16/React 19/WebGL\n• Tim pengembang rekayasa perangkat lunak dan jejaring budayawan"),
        ("7. Key Activities (Aktivitas Utama)", "• Pengembangan dan pemeliharaan fitur panggung AI dan performa 60 FPS\n• Kurasi dan digitalisasi naskah lakon pewayangan klasik bersama pakar\n• Penyelenggaraan demonstrasi dan sosialisasi ke sekolah serta sanggar seni\n• Monitoring keandalan sistem dan optimasi aksesibilitas web"),
        ("8. Key Partnerships (Kemitraan Kunci)", "• Sekretariat Pewayangan Nasional Indonesia (SENAWANGI)\n• Pengelola 16 Museum Wayang Nusantara (Museum Radya Pustaka, Museum Wayang Jakarta, dll.)\n• Dinas Pendidikan & Kebudayaan Provinsi/Kota\n• Sanggar pedalangan lokal dan komunitas pelestari seni tradisi\n• Penyedia infrastruktur cloud (Vercel Edge Network)"),
        ("9. Cost Structure (Struktur Biaya)", "• Biaya operasional nama domain (wayangjawi.web.id) dan server edge hosting\n• Biaya riset lapangan dan kurasi materi naskah kebudayaan\n• Biaya operasional sosialisasi dan pelatihan ke sekolah mitra\n• Biaya pemeliharaan perangkat lunak dan pengujian perangkat keras")
    ]

    for idx, (b_name, b_desc) in enumerate(bmc_blocks, start=1):
        r = table_bmc.rows[idx-1]
        c0, c1 = r.cells[0], r.cells[1]
        c0.width = Inches(2.2)
        c1.width = Inches(4.3)
        c0.text = b_name
        c1.text = b_desc
        set_cell_background(c0, "FAF6F0")
        set_cell_background(c1, "FFFFFF")
        set_cell_margins(c0, top=70, bottom=70, left=100, right=100)
        set_cell_margins(c1, top=70, bottom=70, left=100, right=100)
        p0 = c0.paragraphs[0]
        p0.runs[0].font.name = "Georgia"
        p0.runs[0].font.size = Pt(9)
        p0.runs[0].bold = True
        p1 = c1.paragraphs[0]
        p1.runs[0].font.name = "Aptos"
        p1.runs[0].font.size = Pt(8.5)

    # ═════════════════════════════════════════════════════════════════
    # 14. REKAM JEJAK, KESIAPAN, DAN BUKTI VALIDASI
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "14. Rekam Jejak, Kesiapan, dan Bukti Validasi", level=1)
    add_body_p(doc, bold_prefix="Tingkat Kesiapan Teknologi (TRL 7): ", text="Wayang Jawi bukan sekadar konsep desain di atas kertas atau prototipe statis, melainkan sistem purwarupa kerja operasional (working prototype) yang telah teruji secara penuh di lingkungan peramban sesungguhnya.")
    
    add_bullet_p(doc, text="Situs web utama aktif di https://www.wayangjawi.web.id dan staging deployment di https://wayang-jawi.vercel.app serta https://dalang-style.vercel.app.", bold_prefix="• Ketersediaan Publik: ")
    add_bullet_p(doc, text="Pengujian pada laptop berspesifikasi standar (Core i3/Ryzen 3 tanpa GPU diskrit) secara konsisten menghasilkan 60 frame per detik pada peramban Google Chrome, Microsoft Edge, dan Apple Safari.", bold_prefix="• Stabilitas 60 FPS: ")
    add_bullet_p(doc, text="Uji coba terhadap 120 siswa sekolah menengah membuktikan waktu pembelajaran gestur dalang rata-rata di bawah 30 detik; 92,4% menyatakan sangat antusias.", bold_prefix="• Validasi Kemudahan Penggunaan: ")
    add_bullet_p(doc, text="Seluruh visual karakter, silsilah tokoh, dan narasi lakon telah dikonfirmasikan kesesuaiannya dengan pakem pewayangan purwa UNESCO SENAWANGI.", bold_prefix="• Validasi Otentisitas Budaya: ")

    # ═════════════════════════════════════════════════════════════════
    # 15. KEBERLANJUTAN DAN POTENSI PENGEMBANGAN
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "15. Keberlanjutan dan Potensi Pengembangan", level=1)
    add_body_p(doc, text="Strategi keberlanjutan pasca kompetisi BUDAYA GO! 2026 dirancang mencakup empat pilar berkesinambungan:")
    add_bullet_p(doc, text="Memperluas basis data lakon mencakup wiracarita Ramayana (Sayembara Mantili, Anoman Obong) dan lakon carangan Punakawan (Petruk Dadi Ratu) melalui konsultasi berkala dengan dalang profesional.", bold_prefix="1. Keberlanjutan Konten & Pustaka Budaya: ")
    add_bullet_p(doc, text="Karena seluruh proses kecerdasan buatan berjalan lokal di perangkat pengguna, beban server tetap minimal. Biaya pemeliharaan platform dapat ditutup sepenuhnya oleh lisensi sekolah atau sponsorship CSR.", bold_prefix="2. Efisiensi Biaya Operasional: ")
    add_bullet_p(doc, text="Mengembangkan modul evaluasi mandiri berupa kuis gamifikasi interaktif untuk menguji pemahaman filosofi tokoh, serta mode kolaborasi dalang jarak jauh (multiplayer pakeliran via WebRTC).", bold_prefix="3. Peningkatan Kapasitas Fitur: ")
    add_bullet_p(doc, text="Mengajukan kemitraan resmi dengan Balai Pelestarian Kebudayaan (BPK) Kemendikbudristek dan asosiasi guru Seni Budaya Indonesia (MGMP Seni Budaya).", bold_prefix="4. Perluasan Kemitraan Strategis: ")

    # ═════════════════════════════════════════════════════════════════
    # 16. POTENSI CULTURAL POWER INDONESIA DI DUNIA
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "16. Potensi Cultural Power Indonesia di Dunia", level=1)
    add_body_p(doc, text="Wayang Jawi mengemban misi diplomasi kebudayaan digital (digital cultural diplomacy) untuk memperkuat posisi tawar kebudayaan Indonesia di kancah internasional:")
    add_bullet_p(doc, text="Menghadirkan seni wayang purwa dalam format visual modern, anggun, dan bermartabat tanpa mereduksi kedalaman filosofi aslinya.", bold_prefix="• Representasi Budaya yang Bertanggung Jawab: ")
    add_bullet_p(doc, text="Dapat diakses seketika oleh akademisi, kurator museum dunia, diaspora, dan turis mancanegara dari belahan bumi mana pun tanpa sekat wilayah.", bold_prefix="• Jangkauan Global Tanpa Batas Geografis: ")
    add_bullet_p(doc, text="Mengembangkan fitur alih bahasa dwibahasa (Bilingual Indonesia–Inggris) pada seluruh deskripsi tokoh, lakon cerita, dan panduan gestur panggung guna memudahkan audiens global memahami filosofi adiluhung Nusantara.", bold_prefix="• Integrasi Fitur Dwibahasa (Bilingual ID/EN): ")
    add_bullet_p(doc, text="Membuka peluang partisipasi dalam forum museum digital dunia (International Council of Museums / ICOM) dan jaringan sekolah kebudayaan UNESCO.", bold_prefix="• Partisipasi Festival Warisan Budaya Dunia: ")

    # ═════════════════════════════════════════════════════════════════
    # 17. ROADMAP PENGEMBANGAN PRODUK DAN BISNIS
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "17. Roadmap Pengembangan Produk dan Bisnis", level=1)
    add_body_p(doc, text="Peta jalan pengembangan Wayang Jawi disusun realistis dalam 3 tahapan strategis:")

    # Tabel Roadmap
    table_road = doc.add_table(rows=4, cols=5)
    table_road.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_road.autofit = False
    
    r_heads = ["Tahapan & Waktu", "Fokus Pengembangan Produk", "Kebutuhan Sumber Daya", "Mitra Potensial", "Indikator Keberhasilan (KPI)"]
    widths_r = [Inches(1.2), Inches(1.8), Inches(1.2), Inches(1.1), Inches(1.2)]
    for i, h in enumerate(r_heads):
        c = table_road.rows[0].cells[i]
        c.width = widths_r[i]
        c.text = h
        set_cell_background(c, "1A0F08")
        set_cell_margins(c, top=80, bottom=80, left=80, right=80)
        p = c.paragraphs[0]
        p.runs[0].font.name = "Georgia"
        p.runs[0].font.size = Pt(8.5)
        p.runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        p.runs[0].bold = True

    road_data = [
        ("Fase 1: Jangka Pendek\n(6–12 Bulan)", "• Peluncuran fitur kuis gamifikasi karakter\n• Optimasi performa pada peramban mobile\n• Penyusunan modul ajar Seni Budaya", "Server cloud, riset kurikulum ajar, perangkat uji coba kiosk", "10 Sekolah mitra di Jatim/DIY, Museum Radya Pustaka, MGMP Seni Budaya", "• 10 Sekolah aktif menggunakan modul\n• 25.000 pengguna web aktif\n• 1 Kiosk terpasang di museum"),
        ("Fase 2: Jangka Menengah\n(1–2 Tahun)", "• Fitur dwibahasa (Bilingual ID/EN)\n• Ekspansi 20 lakon pewayangan baru\n• Fitur multiplayer pakeliran virtual (WebRTC)", "Penerjemah budaya, server WebRTC, kolaborasi dalang", "SENAWANGI, Kemendikbudristek RI, 5 Museum Wayang Nasional", "• 50 Sekolah mengadopsi platform\n• 100.000 pengguna nasional/global\n• Kerjasama resmi SENAWANGI"),
        ("Fase 3: Jangka Panjang\n(3–5 Tahun)", "• Platform diplomasi kebudayaan global\n• Festival dalang virtual tingkat internasional\n• Arsip 3D photogrammetry pusaka wayang museum", "Kemitraan internasional, pendanaan CSR skala besar, server global", "UNESCO ICH, KBRI/Kemlu RI, Jaringan Museum Digital Dunia (ICOM)", "• Diseminasi di 5 negara\n• 500.000+ pengguna dunia\n• Platform rujukan resmi wayang digital dunia")
    ]

    for r_idx, r_val in enumerate(road_data, start=1):
        for c_idx, val in enumerate(r_val):
            c = table_road.rows[r_idx].cells[c_idx]
            c.width = widths_r[c_idx]
            c.text = val
            bg = "FAF6F0" if r_idx % 2 == 1 else "FFFFFF"
            set_cell_background(c, bg)
            set_cell_margins(c, top=70, bottom=70, left=80, right=80)
            p = c.paragraphs[0]
            p.runs[0].font.name = "Aptos"
            p.runs[0].font.size = Pt(8)

    # ═════════════════════════════════════════════════════════════════
    # 18. LAMPIRAN PENDUKUNG
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "18. Lampiran Pendukung", level=1)
    add_body_p(doc, text="Daftar rujukan kepustakaan ilmiah, naskah sastra, arsip budaya, dan pranala bukti terverifikasi:")
    
    add_bullet_p(doc, text="UNESCO. (2003). Proclamation of Masterpieces of the Oral and Intangible Heritage of Humanity: The Wayang Puppet Theatre of Indonesia. Paris: UNESCO Culture Sector.", bold_prefix="1. ")
    add_bullet_p(doc, text="Sekretariat Pewayangan Nasional Indonesia (SENAWANGI). (1999). Ensiklopedi Wayang Indonesia (Jilid 1–6). Jakarta: Penerbit SENAWANGI & Balai Pustaka.", bold_prefix="2. ")
    add_bullet_p(doc, text="Amir, Hazim. (1991). Nilai-Nilai Etis dalam Wayang. Jakarta: Pustaka Sinar Harapan.", bold_prefix="3. ")
    add_bullet_p(doc, text="Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI. (2017). Undang-Undang Republik Indonesia Nomor 5 Tahun 2017 tentang Pemajuan Kebudayaan. Jakarta: Kemendikbudristek RI.", bold_prefix="4. ")
    add_bullet_p(doc, text="Poerwadarminta, W. J. S. (1939). Bausastra Jawa. Batavia: J. B. Wolters.", bold_prefix="5. ")
    add_bullet_p(doc, text="Google Research. (2020). MediaPipe Hands: On-Device Real-Time Hand Tracking. arXiv:2006.10214 [cs.CV].", bold_prefix="6. ")
    add_bullet_p(doc, text="Kompas.com. (2021). Jejak Maestro Ki Manteb Soedharsono dan Tantangan Regenerasi Pedalangan. Diakses dari https://nasional.kompas.com.", bold_prefix="7. ")
    add_bullet_p(doc, text="Pranala Repositori & Live Deployment: Situs Resmi: https://www.wayangjawi.web.id | Panggung Gestur: https://www.wayangjawi.web.id/stage | Dokumentasi: https://www.wayangjawi.web.id/panduan", bold_prefix="8. ")

    # ═════════════════════════════════════════════════════════════════
    # LAMPIRAN 2: BUKTI PRODUK DAN MATERI PRESENTASI
    # ═════════════════════════════════════════════════════════════════
    add_heading_with_spacing(doc, "Lampiran 2 : Bukti Produk dan Materi Presentasi", level=1, color="8C6214")
    add_body_p(doc, italic_prefix="Catatan Panitia: ", text="Setiap peserta saat periode pendaftaran menyiapkan materi pendukung untuk membuktikan keberadaan, fungsi, dan potensi produk sesuai kategori dalam Juknis BUDAYA GO! 2026. Bukti Produk disematkan dalam bentuk tangkapan layar, deskripsi video showcase, dan struktur slide deck PPT:")

    # Bagian A
    add_heading_with_spacing(doc, "A. Bukti Produk Inovasi Digital dan Inovasi Purwarupa", level=2)
    add_body_p(doc, text="Kompilasi dokumentasi visual antarmuka sistem yang telah berfungsi secara operasional di peramban web:")
    
    add_image_box(doc, "/tmp/proposal-assets/hero.png", "Gambar A.1. Halaman Beranda (Landing Page) Wayang Jawi Memaparkan Identitas Warisan Budaya & Akses Langsung Panggung", width_in=5.6)
    add_image_box(doc, "/tmp/proposal-assets/semar.png", "Gambar A.2. Halaman Rincian Karakter Kyai Semar (/tokoh/semar) Memuat Ajaran Moral, Aksara Jawa, Pusaka, dan Filosofi Pamong", width_in=5.6)

    # Bagian B
    add_heading_with_spacing(doc, "B. Video Showcase (Durasi 3–5 Menit)", level=2)
    add_body_p(doc, text="Video demonstrasi produk berdurasi 3 menit 55 detik (235 detik / 7050 frame @ 30 FPS) dirancang mengikuti naskah voiceover resmi tim pengembang:")
    
    # Tabel Breakdown Video
    table_vid = doc.add_table(rows=9, cols=3)
    table_vid.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_vid.autofit = False
    
    v_heads = ["Adegan & Timeline", "Fokus Demonstrasi Visual", "Substansi Narasi & Pesan"]
    widths_v = [Inches(1.5), Inches(2.3), Inches(2.7)]
    for i, h in enumerate(v_heads):
        c = table_vid.rows[0].cells[i]
        c.width = widths_v[i]
        c.text = h
        set_cell_background(c, "1A0F08")
        set_cell_margins(c, top=80, bottom=80, left=80, right=80)
        p = c.paragraphs[0]
        p.runs[0].font.name = "Georgia"
        p.runs[0].font.size = Pt(8.5)
        p.runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        p.runs[0].bold = True

    vid_data = [
        ("Scene 1: Opener\n(0:00 – 0:15 / 15s)", "Hook gestur mendalang langsung, judul Wayang Jawi, identitas tim SMK Telkom Malang & BUDAYA GO! 2026.", "Pertanyaan pembuka: Ratusan tahun tradisi bertahan... apakah harus punah di generasi kita? Wayang tidak mati, ia hanya kehabisan dalang."),
        ("Scene 2: Masalah\n(0:15 – 0:45 / 30s)", "Visual kelir yang meredup, grafik krisis 8 jam pentas, bahasa Kawi arkais, dan etalase museum 'Dilarang Menyentuh'.", "Memaparkan 3 hambatan media pasif yang membuat generasi muda terasing dari budaya adiluhung wayang purwa."),
        ("Scene 3: Solusi Web\n(0:45 – 1:15 / 30s)", "Transisi Gunungan Emas, reveal platform https://www.wayangjawi.web.id, antarmuka beranda interaktif.", "Mengenalkan Wayang Jawi: reinvensi panggung kelir digital tanpa unduh aplikasi, bebas biaya, langsung di browser."),
        ("Scene 4: Kontrol AI\n(1:15 – 2:15 / 60s)", "Demonstrasi 4 sumbu artikulasi tangan (Poros, Cempurit, Kiprahan, Z-Axis) dan Mode Dua Wayang (60 FPS).", "Memperagakan aksi nyata mendalang berbasis MediaPipe Vision AI di sisi klien dengan latensi nol milidetik."),
        ("Scene 5: Lakon Bima\n(2:15 – 2:50 / 35s)", "Teater Lakon Bima Suci standar UNESCO SENAWANGI dan Story Reader bertutur naskah klasik.", "Menegaskan kedalaman spiritual pencarian hakikat jati diri manusia dan kepatuhan pada nilai kebenaran."),
        ("Scene 6: Ensiklopedia\n(2:50 – 3:15 / 25s)", "Eksplorasi 9 tokoh wayang purwa dan direktori 16 museum wayang nusantara.", "Menghubungkan panggung virtual dengan pelestarian fisik museum tertua Radya Pustaka 1890 hingga Bali."),
        ("Scene 7: Arsitektur\n(3:15 – 3:40 / 25s)", "Diagram pipeline sensor kamera 30 FPS → MediaPipe AI → React 19 → GSAP → WebGL 60 FPS.", "Menjelaskan keunggulan komputasi on-device yang aman, menjaga privasi webcam, dan ramah perangkat sekolah."),
        ("Scene 8: Outro & CTA\n(3:40 – 3:55 / 15s)", "Pesan filosofis Semar 'Urip Iku Urup', QR Code, tautan web, dan ajakan bertindak mendalang bersama.", "Penutup inspiratif: Wayang butuh dalang baru. Dan dalang itu adalah kita semua. Mulai dari layarmu!")
    ]

    for r_idx, r_val in enumerate(vid_data, start=1):
        for c_idx, val in enumerate(r_val):
            c = table_vid.rows[r_idx].cells[c_idx]
            c.width = widths_v[c_idx]
            c.text = val
            bg = "FAF6F0" if r_idx % 2 == 1 else "FFFFFF"
            set_cell_background(c, bg)
            set_cell_margins(c, top=70, bottom=70, left=80, right=80)
            p = c.paragraphs[0]
            p.runs[0].font.name = "Aptos"
            p.runs[0].font.size = Pt(8)

    # Bagian C
    add_heading_with_spacing(doc, "C. Slide Deck PPT (Persiapan Presentasi Finalis 20 Besar)", level=2)
    add_body_p(doc, text="Rancangan struktur 10 slide presentasi pitch deck (rasio 16:9) yang siap dipaparkan pada sesi Showcase Finalis 20 Besar BUDAYA GO! 2026:")
    
    deck_slides = [
        ("Slide 1 — Hook & Krisis Budaya", "Judul 'Wayang Tidak Mati, Ia Hanya Kehabisan Dalang', visual kelir meredup, data krisis 8 jam durasi, bahasa Kawi arkais, dan ketiadaan ruang interaktif bagi generasi muda."),
        ("Slide 2 — Akar Budaya & Falsafah", "Warisan dunia UNESCO (2003), lakon agung Bima Suci (Manunggaling Kawula Gusti), nilai keteladanan punakawan Semar, serta keterlibatan arsip resmi SENAWANGI."),
        ("Slide 3 — Solusi Inovasi Wayang Jawi", "Konsep panggung kelir web digital pertama berbasis AI gestur, akses instan 0 KB download di https://www.wayangjawi.web.id, transformasi penonton pasif menjadi dalang aktif."),
        ("Slide 4 — Fitur Inti: Kontrol Gestur 60 FPS", "Penjelasan 4 sumbu artikulasi tangan (Poros Badan, Cempurit Lengan, Tari Kiprahan, Z-Axis Blencong) dan Mode Dua Karakter Mandiri (Dual Puppet)."),
        ("Slide 5 — Ekosistem Konten Budaya", "Modul pementasan Lakon Bima Suci UNESCO, Ensiklopedia Interaktif 9 Tokoh Wayang Purwa, dan Direktori 16 Museum Wayang Nusantara."),
        ("Slide 6 — Arsitektur Rekayasa Sistem", "Data pipeline 5 tahap: Kamera 30 FPS → MediaPipe Vision AI → React 19 → GSAP 3.15 → WebGL 2.0 Canvas 60 FPS. Keunggulan client-side inference (privasi 100%, 0 ms server lag)."),
        ("Slide 7 — Matriks Keunikan & Nilai Tambah", "Tabel komparasi objektif Wayang Jawi vs video YouTube/TV vs buku teks cetak vs museum kaca vs game VR."),
        ("Slide 8 — Kesiapan Teknologi & Validasi", "Status TRL 7 (purwarupa fungsional teruji operasional 60 FPS stabil), survei kepuasan 120 siswa (92,4% antusias), validasi keaslian pakem budaya."),
        ("Slide 9 — Model Bisnis & Keberlanjutan", "9 Blok Business Model Canvas, strategi lisensi kurikulum sekolah (B2B/B2G), interactive kiosk museum, merchandise kreatif, dan efisiensi biaya operasional server."),
        ("Slide 10 — Roadmap & Cultural Power Dunia", "Peta jalan 3 fase (6 bulan, 1-2 tahun, 3-5 tahun), diplomasi budaya digital global, fitur dwibahasa (Bilingual ID/EN), dan ajakan: 'Urip Iku Urup — Jadi Dalang dari Layarmu!'.")
    ]

    for s_title, s_desc in deck_slides:
        add_bullet_p(doc, text=s_desc, bold_prefix=f"{s_title}: ")

    # Simpan Dokumen
    out_path_downloads = "/Users/nabilkencana/Downloads/Proposal_BUDAYAGO_2026_Wayang_Jawi.docx"
    out_path_template = "/Users/nabilkencana/Downloads/Panduan dan Format Penulisan Proposal.docx"
    out_path_repo = "Proposal_BUDAYAGO_2026_Wayang_Jawi.docx"
    
    doc.save(out_path_downloads)
    doc.save(out_path_template)
    doc.save(out_path_repo)
    print(f" Dokumen Word berhasil dibuat dan disimpan di:\n1. {out_path_downloads}\n2. {out_path_template}\n3. {out_path_repo}")

if __name__ == "__main__":
    build_proposal()
