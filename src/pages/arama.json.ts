import type { APIRoute } from 'astro';
import { aramaKayitlari } from '../lib/aramaKayitlari';

export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await aramaKayitlari()), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
