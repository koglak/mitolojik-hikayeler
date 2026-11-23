import ELK, { type ElkExtendedEdge, type ElkNode } from 'elkjs/lib/elk.bundled.js';
import type { Kisi, Soyagaci } from './soyagaciSemasi';

export interface YerlesikKisi {
  kimlik: string;
  x: number;
  y: number;
  genislik: number;
  yukseklik: number;
}

export interface Birlik {
  kimlik: string;
  ebeveynler: string[];
  x: number;
  y: number;
}

export interface Cizgi {
  kimden: string;
  kime: string;
  kisiler: string[];
  noktalar: { x: number; y: number }[];
}

export interface Yerlesim {
  genislik: number;
  yukseklik: number;
  kisiler: YerlesikKisi[];
  birlikler: Birlik[];
  cizgiler: Cizgi[];
}

const kisiYuksekligi = 36;
const birlikBoyutu = 4;

export const kisiGenisligi = (kisi: Kisi) => Math.round(kisi.ad.length * 14 * 0.55 + 24);

const birlikKimligi = (ebeveynler: string[]) => `birlik:${ebeveynler.join('+')}`;

function birlikleriKur(veri: Soyagaci) {
  const birlikler = new Map<string, string[]>();
  const cocukEbeveynleri = new Map<string, string[]>();
  for (const iliski of veri.iliskiler) {
    if (iliski.tur === 'es') {
      const ebeveynler = [...iliski.kisiler].sort();
      birlikler.set(birlikKimligi(ebeveynler), ebeveynler);
    } else if (iliski.anlati === 'ana') {
      cocukEbeveynleri.set(iliski.cocuk, [...(cocukEbeveynleri.get(iliski.cocuk) ?? []), iliski.ebeveyn]);
    }
  }
  const inisler: { birlik: string; cocuk: string }[] = [];
  for (const [cocuk, ebeveynListesi] of cocukEbeveynleri) {
    const ebeveynler = [...new Set(ebeveynListesi)].sort();
    const kimlik = birlikKimligi(ebeveynler);
    birlikler.set(kimlik, ebeveynler);
    inisler.push({ birlik: kimlik, cocuk });
  }
  return { birlikler, inisler };
}

export async function soyagaciYerlesimi(veri: Soyagaci): Promise<Yerlesim> {
  const { birlikler, inisler } = birlikleriKur(veri);
  const kenarlar: (ElkExtendedEdge & { kisiler: string[] })[] = [];
  for (const [birlik, ebeveynler] of birlikler) {
    for (const ebeveyn of ebeveynler) {
      kenarlar.push({ id: `${ebeveyn}>${birlik}`, sources: [ebeveyn], targets: [birlik], kisiler: ebeveynler });
    }
  }
  for (const { birlik, cocuk } of inisler) {
    kenarlar.push({ id: `${birlik}>${cocuk}`, sources: [birlik], targets: [cocuk], kisiler: [...birlikler.get(birlik)!, cocuk] });
  }

  const grafik: ElkNode = {
    id: 'kok',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': 'DOWN',
      'elk.edgeRouting': 'ORTHOGONAL',
      'elk.spacing.nodeNode': '18',
      'elk.layered.spacing.nodeNodeBetweenLayers': '28',
      'elk.layered.spacing.edgeNodeBetweenLayers': '12',
      'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
      'elk.padding': '[top=24,left=24,bottom=24,right=24]',
    },
    children: [
      ...veri.kisiler.map((kisi) => ({ id: kisi.kimlik, width: kisiGenisligi(kisi), height: kisiYuksekligi })),
      ...[...birlikler.keys()].map((id) => ({ id, width: birlikBoyutu, height: birlikBoyutu })),
    ],
    edges: kenarlar.map(({ id, sources, targets }) => ({ id, sources, targets })),
  };

  const sonuc = await new ELK().layout(grafik);
  const dugumler = new Map((sonuc.children ?? []).map((d) => [d.id, d]));
  const kenarHaritasi = new Map((sonuc.edges ?? []).map((k) => [k.id, k]));

  return {
    genislik: Math.ceil(sonuc.width ?? 0),
    yukseklik: Math.ceil(sonuc.height ?? 0),
    kisiler: veri.kisiler.map((kisi) => {
      const d = dugumler.get(kisi.kimlik)!;
      return { kimlik: kisi.kimlik, x: d.x ?? 0, y: d.y ?? 0, genislik: d.width ?? 0, yukseklik: d.height ?? 0 };
    }),
    birlikler: [...birlikler].map(([kimlik, ebeveynler]) => {
      const d = dugumler.get(kimlik)!;
      return { kimlik, ebeveynler, x: (d.x ?? 0) + birlikBoyutu / 2, y: (d.y ?? 0) + birlikBoyutu / 2 };
    }),
    cizgiler: kenarlar.map((kenar) => {
      const bolum = kenarHaritasi.get(kenar.id)?.sections?.[0];
      const noktalar = bolum ? [bolum.startPoint, ...(bolum.bendPoints ?? []), bolum.endPoint] : [];
      return { kimden: kenar.sources[0], kime: kenar.targets[0], kisiler: kenar.kisiler, noktalar };
    }),
  };
}
