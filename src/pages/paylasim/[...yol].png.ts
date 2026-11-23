import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';
import { bolumAnahtarlari } from '../../lib/bolumler';
import { kayitSimgesi } from '../../lib/kayitSimgeleri';
import { mitPaylasimSvg, simgePaylasimSvg, sitePaylasimSvg } from '../../lib/paylasimGorseli';

export const getStaticPaths: GetStaticPaths = async () => {
  const mitler = await getCollection('mitler');
  const yollar = [
    { params: { yol: 'site' }, props: { svg: sitePaylasimSvg() } },
    ...mitler.map((mit) => ({ params: { yol: `mitler/${mit.id}` }, props: { svg: mitPaylasimSvg(mit.id) } })),
  ];
  for (const bolum of bolumAnahtarlari) {
    for (const kayit of await getCollection(bolum)) {
      const cizim = kayitSimgesi(bolum, kayit.id);
      if (cizim) yollar.push({ params: { yol: `${bolum}/${kayit.id}` }, props: { svg: simgePaylasimSvg(cizim) } });
    }
  }
  return yollar;
};

export const GET: APIRoute = async ({ props }) => {
  const png = await sharp(Buffer.from(props.svg as string)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
