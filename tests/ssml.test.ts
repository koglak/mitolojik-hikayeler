import { describe, expect, it } from 'vitest';
import { ssmlOlustur, xmlKacir } from '../scripts/ssml.mjs';

describe('xmlKacir', () => {
  it('XML özel karakterlerini kaçırır', () => {
    const sonuc = xmlKacir(`Zeus & Hera <3 "aşk" 'mı' > son`);
    expect(sonuc).toContain('&amp;');
    expect(sonuc).toContain('&lt;');
    expect(sonuc).toContain('&gt;');
    expect(sonuc).toContain('&quot;');
    expect(sonuc).toContain('&apos;');
    expect(sonuc.replace(/&(amp|lt|gt|quot|apos);/g, '')).not.toMatch(/[&<>"']/);
  });

  it('Türkçe karakterleri korur', () => {
    expect(xmlKacir('Işık, çığ, öğüt, şövalye')).toBe('Işık, çığ, öğüt, şövalye');
  });
});

describe('ssmlOlustur', () => {
  it('Türkçe dil ve varsayılan sesi içerir', () => {
    const ssml = ssmlOlustur('Merhaba');
    expect(ssml).toContain('xml:lang="tr-TR"');
    expect(ssml).toContain('name="tr-TR-AhmetNeural"');
    expect(ssml).toContain('Merhaba');
  });

  it('metni kaçırarak gömer', () => {
    expect(ssmlOlustur('A & B')).toContain('A &amp; B');
  });

  it('farklı ses verilebilir', () => {
    expect(ssmlOlustur('Selam', 'tr-TR-EmelNeural')).toContain('name="tr-TR-EmelNeural"');
  });
});
