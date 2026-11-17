#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generate_proposal_cambria.py
Generator Proposal Resmi BUDAYA GO! 2026:
Wayang Jawi: Platform Edukasi dan Pelestarian Digital Wayang Kulit Nusantara Berbasis Teknologi Modern

Standar Format:
1. Font: Cambria di seluruh dokumen.
2. Warna/Layout: 100% Hitam Putih (Black & White).
3. Tanpa simbol-simbol aneh (no weird symbols/emojis).
4. Alignment: Title block Center, Headings Left, Body Justified.
5. Tanpa tabel (No tables, sesuai panduan).
6. Gambar HANYA di Bagian 14 (Rekam Jejak) dan Bagian 18 (Lampiran & Bukti Produk).
7. Format & Struktur 100% persis Panduan dan Format Penulisan Proposal BUDAYA GO! 2026.
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
    set_font_cambria(run, 13.0, bold=False) # Sesuai template panduan: Cambria 13 pt
    return p

def add_heading_3(doc, text, space_before=8, space_after=3):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    set_font_cambria(run, 11.0, bold=True)
    return p

def add_image_figure(doc, image_path, caption, width_in=5.6):
    if not os.path.exists(image_path):
        print(f"Warning: Gambar {image_path} tidak ditemukan, dilewati.")
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

print("Setup helper script ready.")
