export function tekrarDenenmeli(durumKodu) {
  return durumKodu === 429 || durumKodu >= 500;
}

export function beklemeSuresi(denemeNo, retryAfter) {
  const saniye = Number(retryAfter);
  if (retryAfter !== null && retryAfter !== '' && Number.isFinite(saniye) && saniye >= 0) {
    return saniye * 1000;
  }
  return 2000 * 2 ** denemeNo;
}
