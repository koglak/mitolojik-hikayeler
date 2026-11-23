import type { BolumAnahtari } from './bolumler';
import { kayitSimgesi } from './kayitSimgeleri';
import { mitGorseli } from './mitGorselleri';
import { varsayilanPaylasimGorseli } from './site';

export const paylasimGenisligi = 1200;
export const paylasimYuksekligi = 630;

const zemin = '#10151c';
const altin = '#d9ae75';

const cerceve = (icerik: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${paylasimGenisligi}" height="${paylasimYuksekligi}" viewBox="0 0 ${paylasimGenisligi} ${paylasimYuksekligi}">${icerik}</svg>`;

const meanderSeridi = (y: number, renk: string) =>
  `<g opacity=".35" stroke="${renk}" stroke-width="3" fill="none"><path d="M0 ${y}h1200"/><path d="M0 ${y + 18}h1200"/></g>`;

const halkalar = (renk: string) =>
  `<circle cx="600" cy="315" r="250" stroke="${renk}" stroke-width="2" opacity=".35" fill="none"/>` +
  `<circle cx="600" cy="315" r="218" stroke="${renk}" stroke-width="1.2" opacity=".25" fill="none"/>`;

export function mitPaylasimSvg(slug: string): string {
  const { palet, figur } = mitGorseli(slug);
  const [acik, koyu, cizgi] = palet;
  const kimlik = `${slug}-paylasim`;
  const renkliFigur = figur.replaceAll('{b}', koyu).replaceAll('{c}', cizgi).replaceAll('{id}', kimlik);
  const olcek = 1.6;
  const x = (paylasimGenisligi - 440 * olcek) / 2;
  const y = (paylasimYuksekligi - 360 * olcek) / 2;
  return cerceve(
    `<defs><linearGradient id="${kimlik}-degrade" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${acik}"/><stop offset="1" stop-color="${koyu}"/></linearGradient></defs>` +
      `<rect width="1200" height="630" fill="url(#${kimlik}-degrade)"/>` +
      meanderSeridi(36, cizgi) +
      meanderSeridi(576, cizgi) +
      halkalar(cizgi) +
      `<g transform="translate(${x} ${y}) scale(${olcek})">${renkliFigur}</g>`,
  );
}

export function simgePaylasimSvg(cizim: string): string {
  const olcek = 5.2;
  const kenar = 64 * olcek;
  return cerceve(
    `<defs><radialGradient id="parilti" cx=".5" cy=".5" r=".6"><stop stop-color="#2a2a2c"/><stop offset="1" stop-color="${zemin}"/></radialGradient></defs>` +
      `<rect width="1200" height="630" fill="url(#parilti)"/>` +
      meanderSeridi(36, altin) +
      meanderSeridi(576, altin) +
      halkalar(altin) +
      `<g transform="translate(${(paylasimGenisligi - kenar) / 2} ${(paylasimYuksekligi - kenar) / 2}) scale(${olcek})" color="${altin}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${cizim}</g>`,
  );
}

export function sitePaylasimSvg(): string {
  const olcek = 6;
  const kenar = 64 * olcek;
  return cerceve(
    `<defs><radialGradient id="parilti" cx=".5" cy=".5" r=".6"><stop stop-color="#2a2a2c"/><stop offset="1" stop-color="${zemin}"/></radialGradient></defs>` +
      `<rect width="1200" height="630" fill="url(#parilti)"/>` +
      meanderSeridi(36, altin) +
      meanderSeridi(576, altin) +
      `<g transform="translate(${(paylasimGenisligi - kenar) / 2} ${(paylasimYuksekligi - kenar) / 2}) scale(${olcek})">` +
      `<circle cx="32" cy="32" r="30" fill="none" stroke="${altin}" stroke-width=".6"/>` +
      `<circle cx="32" cy="32" r="26" fill="none" stroke="${altin}" stroke-width=".3" opacity=".5"/>` +
      `<polygon points="32.0,10.0 35.1,24.6 47.6,16.4 39.4,28.9 54.0,32.0 39.4,35.1 47.6,47.6 35.1,39.4 32.0,54.0 28.9,39.4 16.4,47.6 24.6,35.1 10.0,32.0 24.6,28.9 16.4,16.4 28.9,24.6" fill="${altin}"/>` +
      `</g>`,
  );
}

export const mitPaylasimGorseli = (slug: string) => `/paylasim/mitler/${slug}.png`;

export const kayitPaylasimGorseli = (bolum: BolumAnahtari, slug: string) =>
  kayitSimgesi(bolum, slug) ? `/paylasim/${bolum}/${slug}.png` : varsayilanPaylasimGorseli;
