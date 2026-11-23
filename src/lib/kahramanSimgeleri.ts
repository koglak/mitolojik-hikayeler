import { alev, dolu, isinlar, yaprak, yildiz, yuvarla } from './simgeParcalari';

const damla = (x: number, y: number, olcek = 1) => {
  const o = (sayi: number) => yuvarla(sayi * olcek);
  return dolu(`M${x} ${y - o(6)}c${-o(3)} ${o(4)} ${-o(4)} ${o(6)} ${-o(4)} ${o(8)}a${o(4)} ${o(4)} 0 0 0 ${o(8)} 0c0 ${-o(2)} ${-o(1)} ${-o(4)} ${-o(4)} ${-o(8)}Z`);
};

const elma = (x: number, y: number, olcek = 1) => {
  const o = (sayi: number) => yuvarla(sayi * olcek);
  return (
    `<path d="M${x} ${y - o(12)}c${-o(3)} ${-o(3)} ${-o(13)} ${-o(3)} ${-o(15)} ${o(6)}c${-o(2)} ${o(10)} ${o(5)} ${o(24)} ${o(15)} ${o(24)}s${o(17)} ${-o(14)} ${o(15)} ${-o(24)}c${-o(2)} ${-o(9)} ${-o(12)} ${-o(9)} ${-o(15)} ${-o(6)}Z"/>` +
    `<path d="M${x} ${y - o(12)}c0 ${-o(4)} ${o(1)} ${-o(7)} ${o(4)} ${-o(9)}"/>` +
    yaprak(x + o(7), y - o(17), 60, o(2), o(4.5))
  );
};

const cokgen = (cx: number, cy: number, r: number, adet: number) => {
  const noktalar = Array.from({ length: adet }, (_, i) => {
    const radyan = (i * 2 * Math.PI) / adet;
    return `${yuvarla(cx + r * Math.cos(radyan))} ${yuvarla(cy + r * Math.sin(radyan))}`;
  });
  return `<path d="M${noktalar.join('L')}Z"/>`;
};

const halka = (x: number, y: number, aci: number) =>
  `<ellipse cx="${x}" cy="${y}" rx="2.6" ry="4.6" transform="rotate(${aci} ${x} ${y})"/>`;

const dalgalar = (y: number) => `<path d="M4 ${y}c4-3 8-3 12 0s8 3 12 0 8-3 12 0 8 3 12 0 8-3 10-1"/>`;

const simgeler: Record<string, string> = {
  agamemnon:
    '<path d="M18 10h28c2 14 2 30-4 40-3 5-7 8-10 8s-7-3-10-8C16 40 16 24 18 10Z"/>' +
    '<path d="M21 21c3-2 7-2 10 0M33 21c3-2 7-2 10 0M22 27c3-2 6-2 8 0M34 27c2-2 5-2 8 0"/>' +
    '<path d="M32 26v12l-3 2M26 46c4 1 8 1 12 0M25 51l2 3M32 53v3M39 51l-2 3"/>' +
    '<path d="M18 22c-4 0-4 10 0 10M46 22c4 0 4 10 0 10"/>',

  aias:
    '<path d="M16 6h32v40c0 8-7 14-16 14S16 54 16 46Z"/>' +
    '<path d="M22 12h20v33c0 5-4 9-10 9s-10-4-10-9Z"/>' +
    '<path d="M22 24h20M22 34h20M22 44h20"/>',

  aineias:
    '<path d="M6 42h50l-6 9H14Z"/>' +
    '<path d="M56 42c3-4 3-9-1-11M6 42c-1-3 0-6 2-7"/>' +
    '<path d="M30 42V6M16 10h28c2 8 2 16 0 24H16c-2-8-2-16 0-24Z"/>' +
    '<path d="M16 18h28M16 26h28"/>' +
    dalgalar(58),

  akhilleus:
    '<path d="M24 4v32c0 4-2 8-2 12 0 4 3 6 8 6h24c4 0 6-2 6-5s-3-5-8-6l-12-4c-3-1-4-3-4-6V4"/>' +
    '<path d="M3 38 17 47"/>' +
    dolu('M21 50l-8-1 3-6Z') +
    '<path d="M3 38l1-5M3 38l-1 4M7 41l1-5M7 41l-2 4"/>',

  alkestis:
    '<path d="M18 60V20h28v40M12 60h40"/>' +
    '<path d="M18 20c0-8 6-12 14-12s14 4 14 12"/>' +
    `<path d="${isinlar(32, 20, 3, 9, 5, 200, 340)}"/>` +
    '<path d="M24 28h16v24H24Z"/>',

  amphiaraos:
    '<path d="M4 40h56"/>' +
    '<path d="M16 40a16 16 0 0 1 32 0M21 40a11 11 0 0 1 22 0M28 40a4 4 0 0 1 8 0"/>' +
    `<path d="${isinlar(32, 40, 4, 11, 5, 180, 360)}"/>` +
    '<path d="M20 40l4 6-3 5 5 7M44 40l-3 5 4 6-2 6M32 40v6l-2 4"/>',

  andromakhe:
    '<path d="M6 58V32h8v-6h8v6h8v-6h8v6h8v-6h8v6h4v26Z"/>' +
    '<path d="M6 44h52M20 44v14M38 44v14M28 32v12M48 32v12"/>' +
    damla(32, 12, 1.1),

  andromeda:
    '<path d="M10 60c2-12 6-22 14-28 6-4 12-4 18 0 8 6 12 16 14 28Z"/>' +
    '<path d="M24 46l6-4 4 6M40 40l6 6"/>' +
    halka(10, 9, -34) +
    halka(14, 15, -34) +
    halka(18, 21, -34) +
    halka(22, 27, -34) +
    halka(54, 9, 34) +
    halka(50, 15, 34) +
    halka(46, 21, 34) +
    halka(42, 27, 34),

  antigone:
    '<path d="M6 56c6-14 16-20 26-20s20 6 26 20ZM2 56h60"/>' +
    '<path d="M18 10c6 4 16 4 24-2"/>' +
    '<circle cx="24" cy="16" r="1.4" fill="currentColor"/><circle cx="30" cy="22" r="1.4" fill="currentColor"/>' +
    '<circle cx="36" cy="16" r="1.4" fill="currentColor"/><circle cx="28" cy="29" r="1.4" fill="currentColor"/>' +
    '<circle cx="38" cy="25" r="1.4" fill="currentColor"/><circle cx="33" cy="32" r="1.4" fill="currentColor"/>',

  antiope:
    '<path d="M6 16c6 7 15 10 26 10s20-3 26-10c2 22-8 40-26 40S4 38 6 16Z"/>' +
    '<path d="M14 26c4 2 10 4 18 4s14-2 18-4"/>' +
    '<circle cx="32" cy="40" r="4" fill="currentColor"/>',

  arakhne:
    `<path d="${isinlar(28, 36, 0, 26, 8)}"/>` +
    cokgen(28, 36, 8, 8) +
    cokgen(28, 36, 15, 8) +
    cokgen(28, 36, 22, 8) +
    '<path d="M50 2v16"/>' +
    '<circle cx="50" cy="21" r="3.2" fill="currentColor"/>' +
    '<path d="M47 19l-4-3M47 23l-4 3M53 19l4-3M53 23l4 3"/>',

  ariadne:
    '<circle cx="24" cy="40" r="15"/>' +
    '<path d="M12 32c8 3 14 11 16 21M10 42c9-2 18 2 25 9M17 28c6 6 13 9 21 9M22 26c2 8 2 18-4 27"/>' +
    '<path d="M39 40c8 0 11-8 14-14s5-14 1-20"/>',

  atalanta: elma(32, 26, 0.65) + elma(20, 46, 0.65) + elma(44, 46, 0.65),

  bellerophon:
    '<path d="M8 54C12 32 28 14 56 6c-4 6-6 10-8 14h6c-4 6-8 10-12 14h6c-6 6-12 10-18 12h4c-8 5-16 7-24 8Z"/>' +
    '<path d="M16 46c8-10 20-20 32-24M22 50c8-6 16-11 22-13"/>',

  danae:
    '<path d="M14 30h36v18H14Z"/>' +
    '<path d="M14 30c0-6 8-10 18-10s18 4 18 10M24 30v18M40 30v18"/>' +
    '<path d="M20 4v4M32 2v5M44 4v4M26 11v3M38 11v3"/>' +
    dalgalar(54) +
    dalgalar(60),

  diomedes:
    '<path d="M14 54V34c0-12 8-20 18-20 10 0 18 7 18 16v4H38c-2 0-4 2-4 4v16Z"/>' +
    '<path d="M38 26h12M14 42h10"/>' +
    alev(32, 6, 0.6),

  elektra:
    '<path d="M26 8h12M28 8v6c-8 2-14 10-14 20 0 12 8 20 18 20s18-8 18-20c0-10-6-18-14-20V8"/>' +
    '<path d="M24 54l-2 6h20l-2-6M17 30h30M16 40h32"/>' +
    '<path d="M18 20c-6-2-8 6-2 10M46 20c6-2 8 6 2 10"/>',

  ganymedes:
    '<circle cx="32" cy="12" r="4"/>' +
    dolu('M35 11l5 2-5 2Z') +
    '<path d="M32 17c-4 0-6 3-6 7v16l6 10 6-10V24c0-4-2-7-6-7Z"/>' +
    '<path d="M26 26C18 20 10 20 4 24c4 2 6 4 8 8-2 0-4 1-5 3 6 0 12 0 19-3M38 26c8-6 16-6 22-2-4 2-6 4-8 8 2 0 4 1 5 3-6 0-12 0-19-3"/>' +
    '<path d="M28 50l4 10 4-10"/>',

  glaukos:
    '<path d="M16 10c6 2 10 4 16 4s10-2 16-4l4 10-4 6v22c-4 6-10 8-16 8s-12-2-16-8V26l-4-6Z"/>' +
    '<path d="M32 18v36M22 28c4 2 8 2 10 0M32 28c2 2 6 2 10 0M24 40c3 2 6 2 8 0M32 40c2 2 5 2 8 0"/>',

  hekabe:
    '<path d="M16 58V32c0-10 6-18 14-20l3-8 4 9c6 2 9 6 11 11l10 4c2 3 1 7-3 8l-12 2c-3 5-6 8-10 10v10"/>' +
    '<path d="M30 12c-3 6-1 12 4 14M16 48h18"/>' +
    '<circle cx="40" cy="22" r="1.8" fill="currentColor"/><circle cx="57" cy="28" r="2" fill="currentColor"/>',

  hektor:
    '<path d="M44 60V40c-6 2-14 2-20-2l-10 4c-4 0-6-4-4-8l14-18c2-6 8-10 14-10l2-4 4 6c6 4 8 12 8 20v32"/>' +
    '<path d="M46 12c4 4 6 10 6 16M50 20l6 1M52 30l6 0M52 40l6-1"/>' +
    '<circle cx="34" cy="20" r="1.8" fill="currentColor"/><circle cx="13" cy="36" r="1.4" fill="currentColor"/>',

  helene:
    '<circle cx="32" cy="22" r="16"/><circle cx="32" cy="22" r="12"/>' +
    '<path d="M25 15c2-3 5-4 8-4M32 38v18M27 44h10M26 58h12"/>',

  herakles:
    '<path d="M40 4c7 0 11 7 9 14l-4 5 1 6-6 4L26 58c-2 3-7 2-7-2l10-34-1-6 4-4c0-6 3-8 8-8Z"/>' +
    '<circle cx="42" cy="12" r="1.6" fill="currentColor"/><circle cx="37" cy="22" r="1.6" fill="currentColor"/><circle cx="44" cy="26" r="1.6" fill="currentColor"/>',

  'hero-ve-leandros':
    '<path d="M18 58V20h16v38M16 20h20v-6h-4v3h-4v-3h-4v3h-4v-3h-4Z"/>' +
    '<path d="M23 30h6v8h-6Z"/>' +
    alev(26, 6, 0.5) +
    '<circle cx="48" cy="40" r="2.2" fill="currentColor"/>' +
    '<path d="M38 46c4-3 8-3 12 0s8 3 12 0M36 52c4-3 8-3 12 0s8 3 12 0M4 58h56"/>',

  hippolyte:
    '<path d="M6 24c8 4 16 6 26 6s18-2 26-6v12c-8 4-16 6-26 6S14 40 6 36Z"/>' +
    '<path d="M25 26h14v18H25Z"/><circle cx="32" cy="35" r="3"/>' +
    '<path d="M28 44l-3 14M36 44l3 14"/>',

  iason:
    '<path d="M4 12h56M50 12l6-6M14 12l-4-6"/>' +
    '<path d="M20 12c-3 8-1 14 3 18-2 6 0 12 4 16l5 10 5-10c4-4 6-10 4-16 4-4 6-10 3-18"/>' +
    '<path d="M25 20c2 2 4 2 6 0M33 20c2 2 4 2 6 0M27 30c2 2 4 2 6 0M35 30c-1 1-1 1 0 0M29 40c2 2 4 2 6 0"/>' +
    yildiz(52, 30, 4) +
    yildiz(12, 40, 3),

  iksion:
    '<circle cx="32" cy="36" r="17"/><circle cx="32" cy="36" r="13"/><circle cx="32" cy="36" r="3" fill="currentColor"/>' +
    `<path d="${isinlar(32, 36, 3, 13, 6, 30)}"/>` +
    alev(18, 16, 0.45) +
    alev(32, 10, 0.55) +
    alev(46, 16, 0.45),

  iphikles:
    '<path d="M20 58c-10-8 4-14 0-22s-6-16 4-22M44 58c10-8-4-14 0-22s6-16-4-22"/>' +
    '<circle cx="24" cy="12" r="3" fill="currentColor"/><circle cx="40" cy="12" r="3" fill="currentColor"/>' +
    '<path d="M24 9l-1-5M40 9l1-5"/>',

  kadmos:
    '<path d="M8 12h48v40H8Z"/>' +
    '<path d="M14 42l6-20 6 20M16 35h8"/>' +
    '<path d="M30 22v20h5a5 5 0 0 0 0-10h-5 4a5 5 0 0 0 0-10Z"/>' +
    '<path d="M44 42V22h8"/>' +
    '<path d="M4 58h56"/>',

  kalkhas:
    '<path d="M6 30q5-6 10 0q5-6 10 0M30 16q5-6 10 0q5-6 10 0M36 40q4-5 8 0q4-5 8 0M14 50q3-4 6 0q3-4 6 0"/>' +
    '<path d="M4 60h56"/>',

  kassandra:
    '<path d="M6 28c9-10 17-14 26-14s17 4 26 14c-9 10-17 14-26 14S15 38 6 28Z"/>' +
    '<circle cx="32" cy="28" r="7"/><circle cx="32" cy="28" r="3" fill="currentColor"/>' +
    '<path d="M14 18l-4-4M50 18l4-4M32 14V8"/>' +
    damla(32, 52, 0.9),

  'kastor-ve-polydeukes':
    '<path d="M8 52c0-14 4-24 10-28 6 4 10 14 10 28ZM36 52c0-14 4-24 10-28 6 4 10 14 10 28Z"/>' +
    '<path d="M4 52h28M32 52h28"/>' +
    yildiz(18, 12, 6) +
    yildiz(46, 12, 6),

  marsyas:
    '<path d="M29 6l-15 50 4 1 13-51ZM35 6l15 50-4 1-13-51Z"/>' +
    '<path d="M27 3h10M12 58h8M44 58h8"/>' +
    '<circle cx="26.6" cy="18" r="1.2" fill="currentColor"/><circle cx="23.9" cy="28" r="1.2" fill="currentColor"/><circle cx="21.1" cy="38" r="1.2" fill="currentColor"/>' +
    '<circle cx="37.4" cy="18" r="1.2" fill="currentColor"/><circle cx="40.1" cy="28" r="1.2" fill="currentColor"/><circle cx="42.9" cy="38" r="1.2" fill="currentColor"/>',

  medeia:
    '<path d="M12 30h40c0 14-8 22-20 22s-20-8-20-22ZM8 30h48"/>' +
    '<path d="M20 50l-4 8M44 50l4 8M32 52v6"/>' +
    '<path d="M24 24c-4-6 4-8 0-14M32 24c-4-6 4-8 0-14M40 24c-4-6 4-8 0-14"/>',

  meleagros:
    '<path d="M8 48 48 36l4 9-40 12Z"/>' +
    '<ellipse cx="50" cy="40.5" rx="3" ry="5" transform="rotate(-17 50 40.5)"/>' +
    '<path d="M18 52l10-3M34 46l8-2"/>' +
    alev(26, 30, 0.9),

  memnon:
    '<path d="M8 26h48M20 26a12 12 0 0 1 24 0"/>' +
    `<path d="${isinlar(32, 26, 15, 21, 5, 210, 330)}"/>` +
    damla(20, 40, 0.8) +
    damla(32, 50, 0.8) +
    damla(44, 40, 0.8),

  menelaos:
    '<circle cx="32" cy="32" r="26"/><circle cx="32" cy="32" r="21"/>' +
    '<path d="M21 46l11-28 11 28" stroke-width="4.5"/>',

  midas:
    '<path d="M18 30C12 20 10 10 14 4c6 6 8 16 7 24M46 30c6-10 8-20 4-26-6 6-8 16-7 24"/>' +
    '<path d="M14 48V30l9 8 9-12 9 12 9-8v18Z"/>' +
    '<path d="M14 48h36v6H14Z"/>' +
    '<circle cx="23" cy="44" r="1.6" fill="currentColor"/><circle cx="32" cy="42" r="2" fill="currentColor"/><circle cx="41" cy="44" r="1.6" fill="currentColor"/>',

  mopsos:
    '<path d="M14 22h36c0 8-8 12-18 12S14 30 14 22Z"/>' +
    '<circle cx="20" cy="16" r="4"/><circle cx="44" cy="16" r="4"/>' +
    '<path d="M20 32 12 58M44 32l8 26M32 34v24M16 48h32"/>',

  neoptolemos:
    '<path d="M32 4c4 8 5 20 3 32h-6c-2-12-1-24 3-32Z"/>' +
    '<path d="M32 10v24M20 38h24M30 38v14h4V38"/>' +
    '<circle cx="32" cy="56" r="3"/>',

  nestor:
    '<path d="M18 14h28l-3 26c-1 6-5 8-11 8s-10-2-11-8Z"/>' +
    '<path d="M18 18c-8 0-8 14 2 14M46 18c8 0 8 14-2 14"/>' +
    '<path d="M32 48v6M24 58h16l-3-4H27Z"/>' +
    '<path d="M10 10q3-4 6 0M48 10q3-4 6 0"/>' +
    '<path d="M20 22h24"/>',

  niobe:
    '<path d="M8 60C6 40 14 18 30 6c14 4 24 20 26 54Z"/>' +
    '<path d="M25 26c2-1 4-1 6 0M36 26c2-1 4-1 6 0"/>' +
    '<path d="M28 28c0 8-2 14 0 24M39 28c2 8 0 16 2 24M33 36v18"/>' +
    '<path d="M2 60h60"/>',

  odysseus:
    '<path d="M12 30v26M26 30v26M40 30v26M54 30v26M6 56h54"/>' +
    ['12', '26', '40', '54'].map((x) => `<path d="M${x} 14c-4 3-6 6-6 9s2 6 6 9c4-3 6-6 6-9s-2-6-6-9Z"/>`).join('') +
    '<circle cx="12" cy="23" r="2.6"/><circle cx="26" cy="23" r="2.6"/><circle cx="40" cy="23" r="2.6"/><circle cx="54" cy="23" r="2.6"/>' +
    '<path d="M2 23h56"/>' +
    dolu('M63 23l-7-4v8Z') +
    '<path d="M3 23l-2-3M3 23l-2 3M6 23l-2-3M6 23l-2 3"/>',

  oidipus:
    '<path d="M26 60V38L8 10M38 60V38l18-28M18 8l14 22 14-22"/>' +
    '<path d="M32 56v-4M32 46v-4"/>',

  omphale:
    '<path d="M32 4v56"/>' +
    '<path d="M32 8c8 0 10 8 6 12 4 4 2 12-6 12s-10-8-6-12c-4-4-2-12 6-12Z"/>' +
    '<path d="M38 26c8 6 6 14 0 18"/>' +
    '<ellipse cx="32" cy="48" rx="9" ry="3"/>',

  orestes:
    '<path d="M14 52c0-24 8-40 18-40s18 16 18 40Z"/>' +
    '<path d="M17 42l15-15 15 15M15 51l17-17 17 17M23 24l9 9 9-9"/>' +
    '<path d="M8 52h48v6H8Z"/>',

  orpheus:
    '<path d="M18 46c0-8 6-12 14-12s14 4 14 12-6 12-14 12-14-4-14-12Z"/>' +
    '<path d="M22 42h20M23 50h18"/>' +
    '<path d="M22 37C14 27 16 14 22 8M42 37c8-10 6-23 0-29M17 12h30"/>' +
    '<path d="M28 12v26M32 12v26M36 12v26"/>',

  paris: elma(30, 34, 1.05) + yildiz(52, 46, 4) + yildiz(10, 20, 3),

  patroklos:
    '<path d="M10 46h44M14 52h36M8 58h48"/>' +
    '<circle cx="10" cy="46" r="2"/><circle cx="54" cy="46" r="2"/><circle cx="14" cy="52" r="2"/><circle cx="50" cy="52" r="2"/>' +
    alev(32, 28, 1.2) +
    alev(18, 34, 0.65) +
    alev(46, 34, 0.65),

  peleus:
    '<circle cx="32" cy="20" r="9"/>' +
    dolu('M32 6l4 4-4 4-4-4Z') +
    '<path d="M6 42c6-6 12-6 18 0s12 6 18 0 12-6 18 0M6 52c6-6 12-6 18 0s12 6 18 0 12-6 18 0"/>',

  pelops:
    '<circle cx="24" cy="46" r="12"/><circle cx="24" cy="46" r="2.5" fill="currentColor"/>' +
    `<path d="${isinlar(24, 46, 2.5, 12, 6)}"/>` +
    '<path d="M12 34h26l4 12M12 34c0-6 4-10 10-10M42 46h18l2-4"/>',

  penelope:
    '<path d="M14 6v52M50 6v52M10 10h44M10 56h44"/>' +
    '<path d="M20 10v36M26 10v36M32 10v36M38 10v36M44 10v36"/>' +
    '<path d="M14 26h36M14 30h36M14 34h36"/>' +
    '<circle cx="20" cy="48" r="2"/><circle cx="26" cy="48" r="2"/><circle cx="32" cy="48" r="2"/><circle cx="38" cy="48" r="2"/><circle cx="44" cy="48" r="2"/>',

  penthesileia:
    '<path d="M32 4v56"/>' +
    '<path d="M30 20 10 10c-5 9-5 21 0 30l20-10ZM34 20l20-10c5 9 5 21 0 30L34 30Z"/>',

  perseus:
    '<circle cx="32" cy="34" r="14"/>' +
    '<circle cx="27" cy="31" r="2.4" fill="currentColor"/><circle cx="37" cy="31" r="2.4" fill="currentColor"/>' +
    '<path d="M23 26l6 2M41 26l-6 2M24 41h16M27 41l1 3 1-3M35 41l1 3 1-3"/>' +
    dolu('M30 41h4l-2 7Z') +
    '<path d="M20 26c-6-2-10-8-8-14M24 21c-2-6 0-12 4-14M36 20c1-6 4-10 8-12M42 24c4-4 8-6 12-4M46 32c6-2 10 0 12 4M18 40c-6 0-10 4-10 8M46 40c6 0 10 4 10 8"/>' +
    '<circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="28" cy="7" r="1.8" fill="currentColor"/><circle cx="44" cy="8" r="1.8" fill="currentColor"/>' +
    '<circle cx="54" cy="20" r="1.8" fill="currentColor"/><circle cx="58" cy="36" r="1.8" fill="currentColor"/><circle cx="8" cy="48" r="1.8" fill="currentColor"/><circle cx="56" cy="48" r="1.8" fill="currentColor"/>',

  'philemon-ve-baukis':
    '<path d="M26 58c0-10 6-16 6-24s-6-14-6-20M38 58c0-10-6-16-6-24s6-14 6-20M18 58h28"/>' +
    '<circle cx="20" cy="16" r="11"/><circle cx="44" cy="16" r="11"/>' +
    '<path d="M16 14l4 4M22 10l2 4M42 12l-2 4M48 14l-4 4"/>',

  philoktetes:
    '<path d="M18 6c16 12 16 40 0 52M18 6v52"/>' +
    '<path d="M38 20l10-4 6 34-10 4Z"/>' +
    '<path d="M42 18 38 4M46 16l-1-13M50 16l4-12"/>' +
    '<path d="M36 6l2-2 2 2M43 5l2-2 2 2M52 6l2-2 2 3"/>',

  priamos:
    '<path d="M22 16l2-10 5 5 3-7 3 7 5-5 2 10Z"/>' +
    '<path d="M22 16h20M32 16v44M27 26h10M27 50h10"/>' +
    '<circle cx="32" cy="10" r="1.4" fill="currentColor"/>',

  psykhe:
    '<path d="M32 18v30"/><circle cx="32" cy="15" r="2.6"/>' +
    '<path d="M31 13c-2-4-5-6-8-6M33 13c2-4 5-6 8-6"/>' +
    '<path d="M32 26C26 14 10 10 8 18s8 16 24 12ZM32 26c6-12 22-16 24-8s-8 16-24 12Z"/>' +
    '<path d="M32 33c-8 0-18 4-16 12s12 4 16-6ZM32 33c8 0 18 4 16 12s-12 4-16-6Z"/>',

  sarpedon:
    '<path d="M16 32a8 8 0 0 1 2-14 11 11 0 0 1 20-4 9 9 0 0 1 12 8 6 6 0 0 1-2 10Z"/>' +
    damla(20, 44, 0.8) +
    damla(32, 52, 0.8) +
    damla(44, 44, 0.8) +
    damla(26, 60, 0.5) +
    damla(40, 60, 0.5),

  tantalos:
    '<path d="M60 6C46 8 36 12 28 20"/>' +
    '<circle cx="30" cy="25" r="4.5"/><circle cx="41" cy="16" r="4.5"/>' +
    yaprak(50, 12, 60, 2.4, 5) +
    yaprak(36, 10, -40, 2.4, 5) +
    dalgalar(46) +
    dalgalar(54),

  telephos:
    '<path d="M26 28c0-4 3-6 6-6s6 2 6 6l-2 18c-1 3-2 4-4 4s-3-1-4-4Z"/>' +
    '<path d="M26 28l-9-3 6 7M38 28l9-3-6 7"/>' +
    '<path d="M28 22C24 16 20 12 22 4M24 13l-6-2M22 7l-4-3M36 22c4-6 8-10 6-18M40 13l6-2M42 7l4-3"/>' +
    '<circle cx="29" cy="32" r="1.4" fill="currentColor"/><circle cx="35" cy="32" r="1.4" fill="currentColor"/>' +
    '<circle cx="32" cy="46" r="1.6" fill="currentColor"/>',

  theseus:
    '<path d="M28 8H8v48h48V8H36M14 14v36h36V14H22M20 44V20h24v24H28M26 26v12h12V26"/>' +
    '<circle cx="32" cy="32" r="2" fill="currentColor"/>',

  tydeus:
    '<circle cx="32" cy="32" r="26"/><circle cx="32" cy="32" r="22"/>' +
    dolu('M28 18a12 12 0 1 0 8 22 10 10 0 1 1-8-22Z') +
    yildiz(44, 22, 4) +
    yildiz(46, 40, 3) +
    yildiz(38, 30, 2),
};

export const kahramanSimgesi = (slug: string): string | undefined => simgeler[slug];
