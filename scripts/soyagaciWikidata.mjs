const qKimligi = /^Q\d+$/;

export function soyagaciSorgusu(tohumlar) {
  for (const tohum of tohumlar) {
    if (!qKimligi.test(tohum)) throw new Error(`Geçersiz Wikidata kimliği: ${tohum}`);
  }
  return `SELECT DISTINCT ?kisi ?adEn ?adTr ?ozellik ?hedef WHERE {
  VALUES ?tohum { ${tohumlar.map((q) => `wd:${q}`).join(' ')} }
  ?tohum (wdt:P22|wdt:P25)* ?kisi .
  VALUES (?ozellik ?p) { ("P22" wdt:P22) ("P25" wdt:P25) ("P26" wdt:P26) ("P40" wdt:P40) }
  ?kisi ?p ?hedef .
  OPTIONAL { ?kisi rdfs:label ?adEn . FILTER(LANG(?adEn) = "en") }
  OPTIONAL { ?kisi rdfs:label ?adTr . FILTER(LANG(?adTr) = "tr") }
}`;
}

const uridenQ = (deger) => deger.split('/').pop();

export function sonuclariCozumle(sparqlJson) {
  const kisiler = new Map();
  const iliskiler = new Map();
  for (const satir of sparqlJson.results.bindings) {
    const kisi = uridenQ(satir.kisi.value);
    const hedef = uridenQ(satir.hedef.value);
    if (!qKimligi.test(kisi) || !qKimligi.test(hedef)) continue;
    const mevcut = kisiler.get(kisi) ?? { wikidata: kisi };
    if (satir.adEn) mevcut.adEn = satir.adEn.value;
    if (satir.adTr) mevcut.adTr = satir.adTr.value;
    kisiler.set(kisi, mevcut);
    const ozellik = satir.ozellik.value;
    if (ozellik === 'P26') {
      const cift = [kisi, hedef].sort();
      iliskiler.set(`es:${cift.join('+')}`, { tur: 'es', kisiler: cift });
    } else {
      const [ebeveyn, cocuk] = ozellik === 'P40' ? [kisi, hedef] : [hedef, kisi];
      iliskiler.set(`ebeveyn:${ebeveyn}>${cocuk}`, { tur: 'ebeveyn', ebeveyn, cocuk });
    }
  }
  return { kisiler: [...kisiler.values()], iliskiler: [...iliskiler.values()] };
}
