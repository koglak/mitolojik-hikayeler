import type { SanatTuru } from './sanat';

export const sanatSimgeleri: Record<SanatTuru, string> = {
  heykel:
    '<circle cx="32" cy="14" r="7"/><path d="M27 21c-9 2-13 8-13 17h36c0-9-4-15-13-17"/><path d="M27 20v4c0 3 10 3 10 0v-4"/><path d="M20 38v6h24v-6M16 44h32v14H16ZM12 58h40"/>',
  resim:
    '<path d="M6 12h52v40H6ZM12 18h40v28H12Z"/><path d="m12 40 11-11 9 9 7-6 13 11"/><circle cx="41" cy="25" r="3.5"/><path d="m24 12 8-8 8 8"/>',
  kabartma:
    '<path d="M6 10h52v44H6Z"/><path d="M6 18h52M6 46h52"/><path d="M14 46l4-11h6l4 11M20 35l2-8 5 4M20 24a3 3 0 1 0 4 0"/><path d="M36 46l3-11h7l4 11M41 35l3-8 5 4M42 24a3 3 0 1 0 4 0"/>',
  mimari: '<path d="M6 22 32 6l26 16ZM10 28h44M14 28v24M26 28v24M38 28v24M50 28v24M8 52h48M4 58h56"/>',
  mozaik:
    '<path d="M8 8h48v48H8Z"/><path d="M20 8v48M32 8v48M44 8v48M8 20h48M8 32h48M8 44h48"/><path d="M20 20h12v12H20ZM32 32h12v12H32Z" fill="currentColor" fill-opacity=".35"/>',
  fresk:
    '<path d="M8 8h48v36c-6 4-8-2-13 2s-6 8-12 5-7-7-12-4-7 5-11 1Z"/><path d="M16 34c6-12 14-16 20-12s10 2 14-6"/><circle cx="22" cy="20" r="4"/>',
  vazo:
    '<path d="M24 6h16M26 6v6c-9 3-14 11-14 21 0 13 8 23 20 23s20-10 20-23c0-10-5-18-14-21V6"/><path d="M26 14c-9 0-12 10-6 14M38 14c9 0 12 10 6 14M14 34h36M24 56l-2 4h20l-2-4"/>',
  maden:
    '<path d="M14 12c10-6 26-6 36 0 3 20-2 36-18 46C16 48 11 32 14 12Z"/><path d="M20 27c4-3 7-3 10 0M34 27c3-3 6-3 10 0M32 29v9M26 45c4 3 8 3 12 0M24 41c5-3 11-3 16 0"/>',
  mekanizma:
    '<circle cx="32" cy="32" r="18"/><circle cx="32" cy="32" r="11"/><circle cx="32" cy="32" r="3"/><path d="M32 14V7M32 57v-7M14 32H7M57 32h-7M19.3 19.3l-5-5M49.7 49.7l-5-5M44.7 19.3l5-5M14.3 49.7l5-5"/><path d="M32 29v-8M29 32h-8M35 32h8M32 35v8"/>',
};
