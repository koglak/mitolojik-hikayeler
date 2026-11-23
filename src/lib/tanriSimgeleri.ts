const yuvarla = (sayi: number) => Math.round(sayi * 10) / 10;

const dolu = (d: string) => `<path d="${d}" fill="currentColor" stroke="none"/>`;

const yaprak = (x: number, y: number, aci: number, en = 2.6, boy = 5.5, dolgulu = true) =>
  `<ellipse cx="${yuvarla(x)}" cy="${yuvarla(y)}" rx="${en}" ry="${boy}" transform="rotate(${yuvarla(aci)} ${yuvarla(x)} ${yuvarla(y)})"${
    dolgulu ? ' fill="currentColor" stroke="none"' : ''
  }/>`;

const isinlar = (cx: number, cy: number, ic: number, dis: number, adet: number, baslangic = 0, bitis = 360) => {
  const adim = (bitis - baslangic) / (bitis - baslangic === 360 ? adet : adet - 1);
  return Array.from({ length: adet }, (_, i) => {
    const radyan = ((baslangic + i * adim) * Math.PI) / 180;
    const cos = Math.cos(radyan);
    const sin = Math.sin(radyan);
    return `M${yuvarla(cx + ic * cos)} ${yuvarla(cy + ic * sin)}L${yuvarla(cx + dis * cos)} ${yuvarla(cy + dis * sin)}`;
  }).join('');
};

const yildiz = (cx: number, cy: number, r: number) => {
  const noktalar = Array.from({ length: 8 }, (_, i) => {
    const uzaklik = i % 2 === 0 ? r : r * 0.32;
    const radyan = (i * 45 * Math.PI) / 180 - Math.PI / 2;
    return `${yuvarla(cx + uzaklik * Math.cos(radyan))} ${yuvarla(cy + uzaklik * Math.sin(radyan))}`;
  });
  return dolu(`M${noktalar.join('L')}Z`);
};

const alev = (x: number, y: number, olcek = 1) => {
  const o = (sayi: number) => yuvarla(sayi * olcek);
  return (
    `<path d="M${x} ${y - o(12)}c${-o(6)} ${o(7)} ${-o(8)} ${o(11)} ${-o(8)} ${o(15)}a${o(8)} ${o(8)} 0 0 0 ${o(16)} 0c0 ${-o(4)} ${-o(2)} ${-o(8)} ${-o(8)} ${-o(15)}Z"/>` +
    dolu(`M${x} ${y - o(2)}c${-o(2)} ${o(3)} ${-o(3)} ${o(4)} ${-o(3)} ${o(6)}a${o(3)} ${o(3)} 0 0 0 ${o(6)} 0c0 ${-o(2)} ${-o(1)} ${-o(3)} ${-o(3)} ${-o(6)}Z`)
  );
};

const basak = () => {
  const taneler = [14, 21, 28, 35, 42]
    .flatMap((y) => [yaprak(28, y + 2, -32, 2.6, 5), yaprak(36, y + 2, 32, 2.6, 5)])
    .join('');
  return `<path d="M32 60V14"/>${yaprak(32, 10, 0, 2.4, 5)}${taneler}<path d="M32 50c-6-2-10-6-12-12M32 54c6-2 10-6 12-12"/>`;
};

const uzum = () => {
  const satirlar: Array<[number, number[]]> = [
    [26, [18.5, 27.5, 36.5, 45.5]],
    [34, [23, 32, 41]],
    [42, [27.5, 36.5]],
    [50, [32]],
  ];
  const taneler = satirlar
    .flatMap(([y, xler]) => xler.map((x) => `<circle cx="${x}" cy="${y}" r="4.4"/>`))
    .join('');
  return `<path d="M32 21V9c4-3 9-3 13 0"/><path d="M32 13c-5-6-13-5-17 1 6 3 12 3 17-1Z"/>${taneler}`;
};

const defneCelengi = () => {
  const merkezX = 32;
  const merkezY = 30;
  const yaricap = 21;
  const yapraklar = [100, 122, 144, 166, 188, 210, 232]
    .flatMap((aci) => {
      const sag = (aci * Math.PI) / 180;
      const sol = ((180 - aci) * Math.PI) / 180;
      return [
        yaprak(merkezX + yaricap * Math.cos(sag), merkezY + yaricap * Math.sin(sag), aci + 30),
        yaprak(merkezX + yaricap * Math.cos(sol), merkezY + yaricap * Math.sin(sol), 150 - aci),
      ];
    })
    .join('');
  return `<path d="M28 51C10 46 6 26 15 12M36 51c18-5 22-25 13-39"/>${yapraklar}<path d="M28 51l4 6 4-6"/>`;
};

const tekerlek = () =>
  `<circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="17"/><circle cx="32" cy="32" r="4" fill="currentColor"/>` +
  `<path d="${isinlar(32, 32, 4, 17, 8)}"/>`;

const panFlutu = () => {
  const borular = [0, 1, 2, 3, 4, 5]
    .map((i) => `<path d="M${13 + i * 7} 12h5v${42 - i * 5}h-5Z"/>`)
    .join('');
  return `${borular}<path d="M10 22h44M10 28h44"/>`;
};

const simgeler: Record<string, string> = {
  zeus: dolu('M39 4 19 34h12l-7 26 22-33H33l9-23Z') + '<path d="M10 20l5 2M54 38l-5-2M12 44l5-3M52 14l-5 3"/>',

  poseidon:
    '<path d="M32 22v38M18 8v10a14 14 0 0 0 28 0V8M32 5v17"/>' +
    dolu('M18 3l-4 7h8ZM32 1l-4 7h8ZM46 3l-4 7h8Z') +
    '<path d="M26 48h12"/>',

  hades:
    '<path d="M32 26v34M22 8v8a10 10 0 0 0 20 0V8"/>' +
    dolu('M22 2l-4 7h8ZM42 2l-4 7h8Z') +
    '<path d="M26 34h12"/>',

  athena:
    '<path d="M18 24c0-8 6-13 14-13s14 5 14 13v13c0 12-6 19-14 19s-14-7-14-19Z"/>' +
    '<path d="M20 15l-4-9 9 5M44 15l4-9-9 5"/>' +
    '<circle cx="26" cy="26" r="5.5"/><circle cx="38" cy="26" r="5.5"/>' +
    '<circle cx="26" cy="26" r="2" fill="currentColor"/><circle cx="38" cy="26" r="2" fill="currentColor"/>' +
    dolu('M30 32h4l-2 5Z') +
    '<path d="M25 41l3 3 4-3 4 3 3-3M27 48l2 2 3-2 3 2 2-2"/>' +
    '<path d="M8 58h48M26 56v3M38 56v3"/>',

  ares:
    '<path d="M16 54V36a16 16 0 0 1 32 0v18l-10-5V38h-4v14h-4V38h-4v11Z"/>' +
    '<path d="M21 34c3-3 7-3 9 0M34 34c3-3 7-3 9 0"/>' +
    '<path d="M14 20C18 4 46 4 50 20"/>' +
    '<path d="M18 13l-3-4M23 9l-2-5M29 7l-1-5M35 7l1-5M41 9l2-5M46 13l3-4"/>',

  apollon:
    '<path d="M21 54C12 42 13 22 20 11M43 54c9-12 8-32 1-43"/>' +
    '<path d="M20 11c-3-3-7-2-7 2M44 11c3-3 7-2 7 2"/>' +
    '<path d="M17 19h30M19 54h26M27 19v35M32 19v35M37 19v35"/>' +
    '<path d="M24 54c0 4 4 6 8 6s8-2 8-6"/>',

  artemis:
    dolu('M50 4a12 12 0 1 0 7 19 10 10 0 1 1-7-19Z') +
    '<path d="M14 20c18 8 18 32 0 40M14 20v40"/>' +
    '<path d="M8 40h40"/>' +
    dolu('M50 40l-7-4v8Z') +
    '<path d="M8 40l-3-3M8 40l-3 3M12 40l-3-3M12 40l-3 3"/>',

  afrodit:
    '<path d="M32 52C20 49 8 40 8 28a24 20 0 0 1 48 0c0 12-12 21-24 24Z"/>' +
    '<path d="M32 52L13 16M32 52L22 10M32 52V8M32 52L42 10M32 52L51 16"/>' +
    '<path d="M25 52h14l-3 6h-8Z"/>',

  hermes:
    '<path d="M32 12v48"/><circle cx="32" cy="8" r="3.5"/>' +
    '<path d="M29 14c-6-6-14-7-21-3 6 1 10 3 14 7M35 14c6-6 14-7 21-3-6 1-10 3-14 7"/>' +
    '<path d="M27 22c11 4 11 10 0 14s-11 10 0 14M37 22c-11 4-11 10 0 14s11 10 0 14"/>' +
    '<circle cx="25" cy="21" r="2" fill="currentColor"/><circle cx="39" cy="21" r="2" fill="currentColor"/>',

  hera:
    '<path d="M32 60V36"/>' +
    '<ellipse cx="32" cy="22" rx="11" ry="15"/><ellipse cx="32" cy="24" rx="6" ry="8"/>' +
    '<ellipse cx="32" cy="25" rx="2.6" ry="3.6" fill="currentColor"/>' +
    '<path d="M32 42l-11-5M32 48l-11-5M32 54l-9-4M32 42l11-5M32 48l11-5M32 54l9-4"/>',

  demeter: basak(),

  dionysos: uzum(),

  hephaistos:
    '<path d="M10 40h36c0 5-5 7-11 7v6h7v5H22v-5h6v-6c-9 0-18-2-18-7Z"/>' +
    '<path d="M22 34 42 12"/>' +
    dolu('M36 7l11 11-5 5-11-11Z'),

  hestia:
    '<path d="M12 40h40c0 8-9 14-20 14s-20-6-20-14Z"/>' +
    '<path d="M24 54l-4 6h24l-4-6"/>' +
    '<path d="M32 6c-9 10-13 17-13 23a13 13 0 0 0 26 0c0-6-4-13-13-23Z"/>' +
    dolu('M32 22c-3 4-5 7-5 10a5 5 0 0 0 10 0c0-3-2-6-5-10Z'),

  helios:
    '<circle cx="32" cy="32" r="11"/><circle cx="32" cy="32" r="5" fill="currentColor"/>' +
    `<path d="${isinlar(32, 32, 15, 27, 12)}"/>` +
    `<path d="${isinlar(32, 32, 15, 21, 12, 15)}"/>`,

  selene:
    dolu('M38 6a26 26 0 1 0 0 52 34 34 0 0 1 0-52Z') + yildiz(48, 18, 5) + yildiz(52, 40, 3) + yildiz(42, 30, 2),

  persephone:
    '<path d="M32 18c-13 0-21 9-21 20s9 20 21 20 21-9 21-20-8-20-21-20Z"/>' +
    '<path d="M25 19l1-9 6 5 6-5 1 9"/>' +
    '<circle cx="26" cy="36" r="2" fill="currentColor"/><circle cx="33" cy="32" r="2" fill="currentColor"/>' +
    '<circle cx="38" cy="40" r="2" fill="currentColor"/><circle cx="30" cy="44" r="2" fill="currentColor"/>' +
    '<circle cx="40" cy="48" r="2" fill="currentColor"/><circle cx="23" cy="45" r="2" fill="currentColor"/>',

  asklepios:
    '<path d="M32 4v56"/>' +
    '<path d="M34 13c9 1 10 7 1 11s-12 8-2 12 10 8 1 12-6 6-3 9"/>' +
    '<circle cx="35" cy="12" r="2.6" fill="currentColor"/>',

  hebe:
    '<path d="M14 16h36c0 13-8 22-18 22S14 29 14 16Z"/>' +
    '<path d="M17 22h30M32 38v12M22 57c0-4 4-7 10-7s10 3 10 7Z"/>' +
    '<path d="M14 20c-7 0-7 9 0 9M50 20c7 0 7 9 0 9"/>',

  hekate:
    '<path d="M24 60 14 26M40 60 50 26M10 27h8M46 27h8"/>' +
    alev(14, 22, 0.7) +
    alev(50, 22, 0.7) +
    '<circle cx="32" cy="20" r="5"/><path d="M32 25v26M32 42h5M32 48h5"/>',

  eos:
    '<path d="M4 46h56"/>' +
    '<path d="M18 46a14 14 0 0 1 28 0"/>' +
    `<path d="${isinlar(32, 46, 18, 26, 7, 195, 345)}"/>` +
    '<path d="M10 53c4-3 8-3 12 0s8 3 12 0 8-3 12 0 8 3 10 1M16 59c4-2 8-2 12 0s8 2 12 0 8-2 10 0"/>',

  eros:
    '<path d="M32 54C14 42 8 32 8 24a12 12 0 0 1 24-3 12 12 0 0 1 24 3c0 8-6 18-24 30Z"/>' +
    '<path d="M6 52 56 12"/>' +
    dolu('M58 10l-10 2 6 6Z') +
    '<path d="M6 52l1-6M6 52l6-1M10 49l1-6M10 49l6-1"/>',

  gaia:
    '<path d="M4 56c10-14 19-20 28-20s18 6 28 20Z"/>' +
    '<path d="M32 36V16"/>' +
    '<path d="M32 28c-7 0-11-4-11-11 7 0 11 4 11 11ZM32 22c7 0 11-4 11-11-7 0-11 4-11 11Z"/>' +
    '<path d="M14 50h4M44 48h5M26 46h3"/>',

  atlas:
    '<circle cx="32" cy="25" r="19"/><ellipse cx="32" cy="25" rx="8" ry="19"/>' +
    '<path d="M13 25h38M15 34 49 16"/>' +
    '<path d="M12 60c2-10 9-15 20-15s18 5 20 15"/>',

  hyperion:
    '<path d="M6 36c9-10 17-14 26-14s17 4 26 14c-9 10-17 14-26 14S15 46 6 36Z"/>' +
    '<circle cx="32" cy="36" r="8"/><circle cx="32" cy="36" r="3.5" fill="currentColor"/>' +
    '<path d="M32 4v10M18 8l4 8M46 8l-4 8M7 16l7 6M57 16l-7 6"/>',

  iapetos:
    '<circle cx="26" cy="38" r="16"/><circle cx="26" cy="38" r="4" fill="currentColor"/>' +
    '<path d="M8 58 48 16"/>' +
    dolu('M58 6 45 12l-3 7 4 4 7-3Z'),

  iris:
    '<path d="M6 48a26 26 0 0 1 52 0M13 48a19 19 0 0 1 38 0M20 48a12 12 0 0 1 24 0"/>' +
    '<path d="M2 52c2-5 10-5 12 0M50 52c2-5 10-5 12 0"/>' +
    '<path d="M2 52h12M50 52h12"/>',

  khaos:
    '<path d="M32 32a2 2 0 0 1 4 0a6 6 0 0 1-12 0a10 10 0 0 1 20 0a14 14 0 0 1-28 0a18 18 0 0 1 36 0a22 22 0 0 1-44 0"/>' +
    '<circle cx="54" cy="10" r="1.5" fill="currentColor"/><circle cx="10" cy="54" r="1.5" fill="currentColor"/>' +
    '<circle cx="56" cy="52" r="1" fill="currentColor"/><circle cx="8" cy="12" r="1" fill="currentColor"/>',

  kronos:
    dolu('M47 12C30 3 10 14 10 36c7-14 21-20 35-16Z') +
    '<path d="M45 16 29 58"/>' +
    '<path d="M40 30l6 2M36 41l6 2"/>',

  kybele:
    '<path d="M12 52V24h7v-7h6v7h4v-7h6v7h4v-7h6v7h7v28Z"/>' +
    '<path d="M12 34h40M26 52V44a6 6 0 0 1 12 0v8"/>' +
    '<path d="M6 52h52"/>',

  leto:
    '<path d="M31 60c-3-12-3-24 1-36"/>' +
    '<path d="M27 54h6M27 46h6M28 38h5M29 30h5"/>' +
    '<path d="M32 24c-6-8-16-9-23-3M32 24c6-8 16-9 23-3M32 24c-9-2-15 5-17 13M32 24c9-2 15 5 17 13M32 24c0-8-4-14-11-17M32 24c2-8 6-14 13-17"/>',

  metis:
    '<path d="M8 40c0-7 10-11 22-11h14l12-7-3 11c-2 7-11 11-21 11H16c-5 0-8-2-8-4Z"/>' +
    '<path d="M24 29c0-4 3-6 7-6s7 2 7 6M16 44l-2 8h24l-2-8"/>' +
    alev(54, 18, 0.7),

  mnemosyne:
    '<path d="M14 10h36M14 54h36M18 10v44M46 10v44"/>' +
    '<path d="M12 6v8M52 6v8M12 50v8M52 50v8"/>' +
    '<path d="M24 20h16M24 27h16M24 34h11M24 41h16"/>',

  nemesis: tekerlek(),

  nike: defneCelengi(),

  nyks:
    '<path d="M4 58C10 28 54 28 60 58M12 58c6-18 34-18 40 0"/>' +
    yildiz(32, 12, 7) +
    yildiz(14, 22, 3.5) +
    yildiz(50, 20, 3.5) +
    '<circle cx="22" cy="8" r="1.2" fill="currentColor"/><circle cx="44" cy="6" r="1.2" fill="currentColor"/>' +
    '<circle cx="6" cy="34" r="1.2" fill="currentColor"/><circle cx="58" cy="32" r="1.2" fill="currentColor"/>',

  okeanos:
    '<circle cx="32" cy="32" r="26"/><circle cx="32" cy="32" r="22"/>' +
    '<path d="M14 24c4-4 8-4 12 0s8 4 12 0 8-4 12 0M12 32c4-4 9-4 13 0s9 4 13 0 9-4 13 0M14 40c4-4 8-4 12 0s8 4 12 0 8-4 12 0"/>',

  pan: panFlutu(),

  prometheus:
    '<path d="M20 60 38 24"/>' +
    '<path d="M24 52l5 3M28 44l5 3M32 36l5 3"/>' +
    alev(40, 18, 1),

  rhea:
    '<ellipse cx="32" cy="34" rx="15" ry="22"/>' +
    '<path d="M18 26c10 2 20 6 28 12M17 38c10 2 20 6 27 12M22 51c6 1 12 3 16 5M20 16c8 0 18 2 24 6"/>',

  tartaros:
    '<path d="M12 58V24a20 20 0 0 1 40 0v34"/>' +
    '<path d="M22 58V8M32 58V4M42 58V8M12 30h40M12 46h40"/>' +
    '<path d="M4 58h56"/>',

  tethys:
    '<path d="M32 6c-9 13-13 19-13 25a13 13 0 0 0 26 0c0-6-4-12-13-25Z"/>' +
    '<path d="M27 32a5 5 0 0 0 5 5"/>' +
    '<path d="M8 52c6-4 12-4 18 0s12 4 18 0 12-4 14-2M14 59c5-3 10-3 15 0s10 3 15 0 8-2 10-1"/>',

  themis:
    '<circle cx="32" cy="8" r="3"/>' +
    '<path d="M32 11v45M10 18h44M22 58h20"/>' +
    '<path d="M12 18 6 36M12 18l6 18M52 18l-6 18M52 18l6 18"/>' +
    '<path d="M4 36a8 5 0 0 0 16 0ZM44 36a8 5 0 0 0 16 0Z"/>',

  tyche:
    '<path d="M8 58C30 58 46 46 52 26M34 16C34 36 24 50 8 58"/>' +
    '<ellipse cx="43" cy="21" rx="10" ry="5" transform="rotate(30 43 21)"/>' +
    '<circle cx="38" cy="12" r="4"/><circle cx="47" cy="11" r="4"/><circle cx="43" cy="5" r="3.5"/>' +
    yaprak(53, 6, 40, 2.2, 5),

  uranos:
    '<path d="M4 54a28 28 0 0 1 56 0Z"/>' +
    '<path d="M2 54h60"/>' +
    yildiz(32, 36, 6) +
    yildiz(18, 42, 3.5) +
    yildiz(46, 42, 3.5) +
    yildiz(24, 30, 2.5) +
    yildiz(40, 30, 2.5) +
    '<circle cx="12" cy="49" r="1.2" fill="currentColor"/><circle cx="52" cy="49" r="1.2" fill="currentColor"/>',
};

export const tanriSimgesi = (slug: string): string | undefined => simgeler[slug];
