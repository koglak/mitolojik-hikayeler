import { soyagaciAdresi } from './soyagaci';

export interface BaslangicSoyu {
  kimlik: string;
  ad: string;
  aciklama: string;
  kisiler: string[];
  kokler: string[];
  uyeler: string[];
}

export const baslangicSoylari: BaslangicSoyu[] = [
  {
    kimlik: 'baslangic',
    ad: 'Dünyanın başlangıcı',
    aciklama: 'Her şeyden önce var olanlar.',
    kisiler: ['khaos', 'gaia', 'tartaros', 'nyks', 'uranos'],
    kokler: ['khaos', 'gaia'],
    uyeler: [
      'khaos', 'nyks', 'erebos', 'aither', 'hemera', 'hypnos', 'thanatos', 'oneiroi',
      'moiralar', 'nemesis', 'eris', 'gaia', 'uranos', 'pontos', 'tartaros', 'typhon',
      'kykloplar', 'hekatonkheirler', 'erinyesler', 'gigantlar', 'hesperidler', 'nereus', 'thaumas', 'phorkys',
    ],
  },
  {
    kimlik: 'titanlar',
    ad: 'Titanlar',
    aciklama: "Zeus'tan önceki kuşak ve çocukları.",
    kisiler: ['kronos', 'rhea', 'okeanos', 'hyperion', 'atlas', 'prometheus'],
    kokler: ['uranos'],
    uyeler: [
      'uranos', 'okeanos', 'tethys', 'hyperion', 'theia', 'koios', 'phoibe', 'iapetos',
      'kronos', 'rhea', 'krios', 'themis', 'mnemosyne', 'metis', 'helios', 'selene',
      'eos', 'leto', 'asteria', 'atlas', 'menoitios', 'prometheus', 'epimetheus', 'zeus',
      'hera', 'poseidon', 'demeter', 'hades', 'hestia', 'eurybia', 'astraios', 'perses',
      'pallas', 'styks', 'hekate', 'nike',
    ],
  },
  {
    kimlik: 'olimposlular',
    ad: 'Olimposlular',
    aciklama: 'Zeus, kardeşleri ve çocukları.',
    kisiler: ['zeus', 'hera', 'poseidon', 'demeter', 'athena', 'apollon', 'artemis', 'hermes'],
    kokler: ['uranos'],
    uyeler: [
      'uranos', 'kronos', 'zeus', 'hera', 'poseidon', 'demeter', 'hades', 'hestia',
      'afrodit', 'athena', 'apollon', 'artemis', 'hermes', 'dionysos', 'persephone', 'ares',
      'hebe', 'hephaistos', 'eros', 'harmonia', 'eileithyia', 'amphitrite', 'triton', 'phobos',
      'deimos',
    ],
  },
  {
    kimlik: 'canavarlar',
    ad: 'Canavarlar',
    aciklama: 'Ekhidna, Typhon ve korkulan çocukları.',
    kisiler: ['typhon', 'ekhidna', 'medusa', 'kerberos', 'khimaira', 'sfenks'],
    kokler: ['phorkys', 'typhon'],
    uyeler: [
      'phorkys', 'keto', 'medusa', 'ekhidna', 'thoosa', 'typhon', 'pegasos', 'kerberos',
      'hydra', 'khimaira', 'sfenks', 'polyphemos', 'stheno', 'euryale', 'graialar', 'khrysaor',
      'geryon', 'orthos', 'nemea-aslani',
    ],
  },
  {
    kimlik: 'herakles',
    ad: 'Perseus ve Herakles',
    aciklama: "Argos'tan çıkan iki büyük kahramanın soyu.",
    kisiler: ['danae', 'perseus', 'andromeda', 'alkmene', 'herakles'],
    kokler: ['danae'],
    uyeler: [
      'danae', 'perseus', 'andromeda', 'elektryon', 'alkaios', 'gorgophone', 'amphitryon', 'anakso',
      'alkmene', 'herakles', 'iphikles', 'iolaos', 'megara', 'deianeira', 'hebe', 'omphale',
      'agelaos', 'telephos', 'eurypylos', 'sthenelos', 'nikippe', 'eurystheus', 'perses-perseus', 'hyllos',
      'therimakhos',
    ],
  },
  {
    kimlik: 'thebai',
    ad: 'Thebai',
    aciklama: "Kadmos'tan Oidipus'a bir lanetin tarihi.",
    kisiler: ['kadmos', 'semele', 'laios', 'oidipus', 'antigone'],
    kokler: ['kadmos', 'menoikeus'],
    uyeler: [
      'kadmos', 'harmonia', 'semele', 'polydoros', 'dionysos', 'labdakos', 'laios', 'oidipus',
      'iokaste', 'eteokles', 'polyneikes', 'antigone', 'ismene', 'ino', 'learkhos', 'melikertes',
      'agaue', 'pentheus', 'autonoe', 'aktaion', 'argeia', 'thersandros', 'menoikeus', 'kreon',
      'haimon', 'megara',
    ],
  },
  {
    kimlik: 'girit',
    ad: 'Girit',
    aciklama: "Europa'nın oğlu Minos ve labirentin ailesi.",
    kisiler: ['europa', 'minos', 'pasiphae', 'ariadne', 'minotauros'],
    kokler: ['europa', 'pasiphae'],
    uyeler: [
      'europa', 'minos', 'katreus', 'ariadne', 'phaidra', 'aerope', 'pasiphae', 'minotauros',
      'dionysos', 'theseus', 'rhadamanthys', 'androgeos', 'deukalion-girit', 'idomeneus', 'glaukos-girit', 'klymene-katreus',
      'palamedes', 'thoas', 'oinopion', 'staphylos', 'hypsipyle',
    ],
  },
  {
    kimlik: 'atina',
    ad: 'Atina',
    aciklama: "Topraktan doğan krallardan Theseus'a.",
    kisiler: ['erikhthonios-atina', 'erekhtheus', 'aigeus', 'theseus', 'daidalos', 'ikaros'],
    kokler: ['erikhthonios-atina'],
    uyeler: [
      'erikhthonios-atina', 'praksithea', 'pandion', 'zeuksippe', 'erekhtheus', 'prokne', 'philomela', 'tereus',
      'itys', 'praksithea-erekhtheus', 'kekrops', 'metion', 'eupalamos', 'daidalos', 'ikaros', 'prokris',
      'kephalos', 'kreousa-atina', 'ksuthos', 'ion', 'akhaios', 'oreithyia', 'boreas', 'boreadlar',
      'pandion-ii', 'pylia', 'aigeus', 'aithra', 'theseus', 'medeia', 'medos', 'antiope',
      'hippolytos', 'phaidra', 'akamas', 'demophon',
    ],
  },
  {
    kimlik: 'mykenai',
    ad: 'Mykenai',
    aciklama: "Tantalos'tan Orestes'e uzanan soy.",
    kisiler: ['tantalos', 'pelops', 'atreus', 'agamemnon', 'menelaos', 'orestes'],
    kokler: ['tantalos'],
    uyeler: [
      'tantalos', 'pelops', 'niobe', 'amphion', 'broteas', 'hippodameia', 'atreus', 'thyestes',
      'pittheus', 'aerope', 'agamemnon', 'menelaos', 'klytaimnestra', 'iphigeneia', 'elektra', 'khrysothemis',
      'orestes', 'helene', 'hermione', 'pelopia', 'aigisthos', 'tisamenos', 'pylades',
    ],
  },
  {
    kimlik: 'sparta',
    ad: 'Sparta',
    aciklama: "Tyndareos, kardeşleri ve Leda'nın çocukları.",
    kisiler: ['leda', 'tyndareos', 'helene', 'klytaimnestra', 'kastor', 'polydeukes'],
    kokler: ['perieres', 'leda'],
    uyeler: [
      'perieres', 'gorgophone', 'tyndareos', 'aphareus', 'leukippos', 'ikarios', 'leda', 'helene',
      'polydeukes', 'klytaimnestra', 'kastor', 'idas', 'lynkeus-aphareus', 'hilaeira', 'phoibe-leukippos', 'menelaos',
      'agamemnon', 'hermione', 'iphigeneia', 'elektra', 'khrysothemis', 'orestes', 'penelope', 'odysseus',
      'telemakhos',
    ],
  },
  {
    kimlik: 'truva',
    ad: 'Truva',
    aciklama: "Dardanos'tan şehrin son kuşağına.",
    kisiler: ['dardanos', 'priamos', 'hekabe', 'hektor', 'paris', 'kassandra', 'aineias'],
    kokler: ['dardanos'],
    uyeler: [
      'dardanos', 'bateia', 'erikhthonios-truva', 'tros', 'ilos', 'assarakos', 'ganymedes', 'laomedon',
      'kapys', 'themiste', 'ankhises', 'priamos', 'tithonos', 'memnon', 'hekabe', 'hektor',
      'paris', 'kassandra', 'polyksene', 'polydoros-truva', 'helenos', 'andromakhe', 'astyanaks', 'helene',
      'afrodit', 'aineias', 'askanios', 'arisbe', 'aisakos', 'deiphobos', 'troilos', 'hesione',
      'teukros',
    ],
  },
  {
    kimlik: 'akhilleus',
    ad: "Akhilleus'un soyu",
    aciklama: "Aiakos'un oğulları ve torunları.",
    kisiler: ['aiakos', 'peleus', 'telamon', 'akhilleus', 'aias', 'neoptolemos'],
    kokler: ['aiakos'],
    uyeler: [
      'aiakos', 'endeis', 'peleus', 'telamon', 'thetis', 'periboia-salamis', 'akhilleus', 'aias',
      'deidameia', 'neoptolemos', 'andromakhe', 'molossos', 'psamathe', 'phokos', 'krisos', 'strophios',
      'pylades', 'hesione', 'teukros',
    ],
  },
  {
    kimlik: 'aiolos',
    ad: "Aiolos'un soyu",
    aciklama: "İason'dan Bellerophon'a kahramanlar.",
    kisiler: ['aiolos', 'sisifos', 'bellerophon', 'iason', 'nestor'],
    kokler: ['aiolos'],
    uyeler: [
      'aiolos', 'sisifos', 'kretheus', 'salmoneus', 'glaukos-korinthos', 'bellerophon', 'hippolokhos', 'laodameia',
      'glaukos', 'sarpedon', 'tyro', 'aison', 'amythaon', 'iason', 'medeia', 'pelias',
      'neleus', 'alkestis', 'admetos', 'nestor', 'antilokhos', 'peisistratos', 'athamas', 'nephele',
      'phriksos', 'helle', 'deion', 'kephalos', 'prokris', 'pheres', 'akastos',
    ],
  },
];

export const soyAdresi = (kimlik: string) => `${soyagaciAdresi}?soy=${kimlik}`;

export function adrestenSoy(adres: string): BaslangicSoyu | undefined {
  const kimlik = new URL(adres, 'https://soyagaci.invalid').searchParams.get('soy');
  return baslangicSoylari.find((soy) => soy.kimlik === kimlik);
}

export const kisininSoylari = (kimlik: string) => baslangicSoylari.filter((soy) => soy.uyeler.includes(kimlik));
