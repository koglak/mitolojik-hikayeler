const XML_KARSILIKLARI = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

export function xmlKacir(metin) {
  return metin.replace(/[&<>"']/g, (karakter) => XML_KARSILIKLARI[karakter]);
}

export function ssmlOlustur(metin, ses = 'tr-TR-AhmetNeural') {
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="tr-TR"><voice name="${ses}">${xmlKacir(metin)}</voice></speak>`;
}
