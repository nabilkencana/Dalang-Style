import { NextRequest, NextResponse } from 'next/server';
import { interpretUserPrompt, resolveWayangImage } from '@/lib/wayang-ai';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
    const userApiKey = typeof body?.apiKey === 'string' ? body.apiKey.trim() : '';

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt tidak boleh kosong' }, { status: 400 });
    }

    const apiKey = userApiKey || process.env.GEMINI_API_KEY || '';

    // ── 1. If Gemini API Key is available: Call Google Gemini ──
    if (apiKey) {
      try {
        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const systemInstruction = `Kamu adalah Sang Empu AI, seorang maestro dalang, sastrawan pewayangan Jawa, dan filsuf budaya Nusantara.
Tugasmu: Menafsirkan konsep bebas dari pengguna menjadi karakter tokoh wayang kulit yang adiluhung, kaya filosofi, dan orisinal.

Berikan respons HANYA berupa objek JSON murni (tanpa markdown backtick, tanpa teks lain) dengan format persis seperti ini:
{
  "characterName": "Nama tokoh dalam gaya Jawa pewayangan (misal: Raden ..., Dewi ..., Arya ..., Prabu ..., Kyai ...)",
  "roleTitle": "Peran dan kasta tokoh dalam bahasa Indonesia (misal: Satria Pemanah Pinilih, Putri Pengayom Damai)",
  "weaponName": "Nama pusaka atau ajian sakti (misal: Keris ..., Panah ..., Gada ..., Aji ...)",
  "philosophy": "Nasihat hidup dan falsafah batin tokoh dalam 1-2 kalimat bahasa Indonesia yang mendalam dan bermakna",
  "traits": ["Sifat 1", "Sifat 2", "Sifat 3"],
  "greeting": "Kalimat bertutur puitis dari Sang Empu dalam bahasa Indonesia memperkenalkan wujud dan filosofi tokoh ini (2-3 kalimat)",
  "compiledPrompt": "Detailed English prompt for generating authentic traditional Indonesian Javanese Wayang Kulit flat leather shadow puppet with intricate tatah sungging perforated leather craftsmanship, gold leaf prada accents, centered composition on warm golden parchment kelir backdrop with soft blencong lamp lighting, museum conservation quality, 8k resolution, no 3D anime, no human face"
}`;

        const geminiPayload = {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${systemInstruction}\n\nKonsep dari pengguna: "${prompt}"`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        };

        const res = await fetch(geminiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(geminiPayload),
        });

        if (res.ok) {
          const data: GeminiResponse = await res.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

          // Extract json block cleanly
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          const cleanJson = jsonMatch ? jsonMatch[0] : rawText;

          try {
            const parsed = JSON.parse(cleanJson);
            const characterName = parsed.characterName || 'Raden Cipta Mandiri';
            const imageUrl = resolveWayangImage(parsed.compiledPrompt || prompt, characterName);

            return NextResponse.json({
              characterName,
              roleTitle: parsed.roleTitle || 'Ksatria Cipta Pewayangan',
              weaponName: parsed.weaponName || 'Pusaka Kyai Cundamanik',
              philosophy: parsed.philosophy || 'Urip iku urup — hidup yang menyala memberi terang bagi sesama.',
              traits: Array.isArray(parsed.traits) ? parsed.traits : ['Luhur Budi', 'Waspada', 'Teguh'],
              greeting: parsed.greeting || `Karakter **${characterName}** berhasil ditatah oleh Sang Empu AI.`,
              compiledPrompt: parsed.compiledPrompt,
              imageUrl,
              source: 'gemini-ai',
            });
          } catch {
            // JSON parse failed, fall through to local interpreter
          }
        }
      } catch {
        // Fetch failed, fall through to local interpreter
      }
    }

    // ── 2. Local Fallback Interpreter (Runs without API key) ──
    const local = interpretUserPrompt(prompt);
    const imageUrl = resolveWayangImage(local.compiledPrompt || prompt, local.characterName);

    return NextResponse.json({
      characterName: local.characterName,
      roleTitle: local.roleTitle,
      weaponName: local.weaponName,
      philosophy: local.philosophy,
      traits: local.traits,
      greeting: local.greeting,
      compiledPrompt: local.compiledPrompt,
      imageUrl,
      source: 'local-engine',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem internal', details: String(error) },
      { status: 500 }
    );
  }
}
