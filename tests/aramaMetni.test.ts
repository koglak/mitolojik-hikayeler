import { describe, expect, it } from 'vitest';
import { aramaIcinSadelestir } from '../src/lib/aramaMetni';

describe('aramaIcinSadelestir', () => {
  it('Türkçe büyük harfleri doğru küçültür', () => {
    expect(aramaIcinSadelestir('İASON')).toBe('iason');
  });

  it('noktalı ve noktasız i farkını yok sayar', () => {
    expect(aramaIcinSadelestir('Iason')).toBe(aramaIcinSadelestir('İason'));
  });

  it('şapkayı ve Türkçe harfleri sadeleştirir', () => {
    expect(aramaIcinSadelestir('Hikâye Çağı Şölen Göğü Üç')).toBe('hikaye cagi solen gogu uc');
  });
});
