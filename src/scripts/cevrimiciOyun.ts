import Peer, { type DataConnection } from 'peerjs';

type Question = {
  id: string;
  ad: string;
  gorsel: string;
  adres: string;
  alt?: string;
  ozet?: string;
  hedef: string;
};

type GameState = {
  type: 'question';
  round: number;
  question: Question;
  options: string[];
  hostName: string;
  guestName: string;
  hostScore: number;
  guestScore: number;
};

const panel = document.querySelector<HTMLElement>('[data-online]');
const lobby = document.querySelector<HTMLElement>('[data-lobby]');
const game = document.querySelector<HTMLElement>('[data-online-game]');
const status = document.querySelector<HTMLElement>('[data-online-status]');
const onlineData = document.querySelector<HTMLScriptElement>('#online-quiz-data');
if (!panel || !lobby || !game || !status || !onlineData) throw new Error('Çevrimiçi oyun alanı bulunamadı.');

const questions = JSON.parse(onlineData.textContent ?? '[]') as Question[];
const params = new URLSearchParams(location.search);
const roomId = params.get('oda');
const playerInput = panel.querySelector<HTMLInputElement>('[data-player-name]')!;
const createButton = panel.querySelector<HTMLButtonElement>('[data-room-create]')!;
const joinButton = panel.querySelector<HTMLButtonElement>('[data-room-join]')!;
const invite = panel.querySelector<HTMLElement>('[data-invite]')!;
const inviteUrl = panel.querySelector<HTMLElement>('[data-invite-url]')!;
const copyButton = panel.querySelector<HTMLButtonElement>('[data-copy-invite]')!;
const nextButton = panel.querySelector<HTMLButtonElement>('[data-online-next]')!;
const feedback = panel.querySelector<HTMLElement>('[data-online-feedback]')!;
const optionsArea = panel.querySelector<HTMLElement>('[data-online-options]')!;
const artwork = panel.querySelector<HTMLElement>('[data-online-artwork]')!;

let peer: Peer | undefined;
let connection: DataConnection | undefined;
let isHost = false;
let hostName = '';
let guestName = '';
let guestScore = 0;
let hostScore = 0;
let rounds: Question[] = [];
let round = 0;
let hostAnswer: string | undefined;
let guestAnswer: string | undefined;
let currentState: GameState | undefined;

const shuffled = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);
const name = () => playerInput.value.trim().slice(0, 24) || 'Oyuncu';
const setStatus = (message: string) => { status.textContent = message; };

function showGame() {
  lobby!.hidden = true;
  game!.hidden = false;
}

function updateScores() {
  panel!.querySelector('[data-host-score]')!.textContent = `${hostName || 'Oyuncu 1'}: ${hostScore}`;
  panel!.querySelector('[data-guest-score]')!.textContent = `${guestName || 'Oyuncu 2'}: ${guestScore}`;
}

function renderQuestion(state: GameState) {
  currentState = state;
  hostName = state.hostName;
  guestName = state.guestName;
  hostScore = state.hostScore;
  guestScore = state.guestScore;
  hostAnswer = undefined;
  guestAnswer = undefined;
  updateScores();
  panel!.querySelector('[data-online-round]')!.textContent = `SORU ${String(state.round + 1).padStart(2, '0')} / 05`;
  panel!.querySelector('[data-online-question]')!.textContent = 'Bu eserde hangi mitolojik kişi ya da sahne anlatılıyor?';
  panel!.querySelector('[data-online-caption]')!.textContent = 'Eserdeki figürlere ve ayrıntılara dikkatle bak.';
  artwork!.replaceChildren();
  const link = document.createElement('a');
  link.href = state.question.adres;
  link.setAttribute('aria-label', `${state.question.ad} eser sayfasını aç`);
  const image = document.createElement('img');
  image.src = state.question.gorsel;
  image.alt = state.question.alt || 'Mitolojik bir sanat eseri';
  image.onerror = () => { image.remove(); link.textContent = 'Eser görseli yüklenemedi'; };
  link.append(image);
  artwork!.append(link);
  optionsArea.replaceChildren();
  shuffled(state.options).forEach((value, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'secenek';
    button.innerHTML = `<span>${String.fromCharCode(65 + index)}.&nbsp;</span><b></b>`;
    button.querySelector('b')!.textContent = value;
    button.addEventListener('click', () => submitAnswer(value, button));
    optionsArea.append(button);
  });
  feedback.textContent = 'Cevabını seç.';
  nextButton.hidden = true;
  nextButton.textContent = state.round === 4 ? 'Sonucu gör' : 'Sonraki eser →';
  showGame();
}

function nextState(): GameState {
  const question = rounds[round];
  const wrong = shuffled(questions.filter((item) => item.hedef !== question.hedef).map((item) => item.hedef))
    .filter((item, index, all) => all.indexOf(item) === index)
    .slice(0, 3);
  return {
    type: 'question', round, question,
    options: shuffled([question.hedef, ...wrong]),
    hostName, guestName, hostScore, guestScore,
  };
}

function submitAnswer(answer: string, button: HTMLButtonElement) {
  if (!currentState || button.disabled) return;
  optionsArea.querySelectorAll('button').forEach((item) => { (item as HTMLButtonElement).disabled = true; });
  feedback.textContent = 'Cevabın alındı, diğer oyuncu bekleniyor…';
  if (isHost) {
    hostAnswer = answer;
    resolveRound();
  } else {
    connection?.send({ type: 'answer', answer });
  }
}

function resolveRound() {
  if (!isHost || !currentState || !hostAnswer || !guestAnswer) return;
  if (hostAnswer === currentState.question.hedef) hostScore++;
  if (guestAnswer === currentState.question.hedef) guestScore++;
  const result = {
    type: 'result', answer: currentState.question.hedef, hostAnswer, guestAnswer,
    hostScore, guestScore, hostName, guestName,
  };
  connection?.send(result);
  showResult(result);
}

function showResult(result: { answer: string; hostAnswer: string; guestAnswer: string; hostScore: number; guestScore: number; hostName: string; guestName: string }) {
  hostScore = result.hostScore;
  guestScore = result.guestScore;
  updateScores();
  optionsArea.querySelectorAll('button').forEach((item) => {
    const button = item as HTMLButtonElement;
    const value = button.querySelector('b')?.textContent;
    if (value === result.answer) button.classList.add('dogru');
    else if (value === (isHost ? result.hostAnswer : result.guestAnswer)) button.classList.add('yanlis');
  });
  const own = isHost ? result.hostAnswer : result.guestAnswer;
  const other = isHost ? result.guestAnswer : result.hostAnswer;
  const otherName = isHost ? result.guestName : result.hostName;
  feedback.textContent = `${own === result.answer ? 'Doğru!' : `Doğru cevap: ${result.answer}.`} ${otherName}: ${other === result.answer ? 'doğru' : 'yanlış'}.`;
  nextButton.hidden = !isHost;
  nextButton.disabled = false;
}

function beginGame() {
  rounds = shuffled(questions).slice(0, 5);
  round = 0;
  hostScore = 0;
  guestScore = 0;
  const state = nextState();
  renderQuestion(state);
  connection?.send(state);
}

function connectToRoom(id: string) {
  if (!id) return;
  peer = new Peer();
  peer.on('open', () => {
    setStatus('Odaya bağlanılıyor…');
    connection = peer!.connect(id, { reliable: true });
    connection.on('open', () => connection?.send({ type: 'join', name: name() }));
    connection.on('data', (raw) => {
      const message = raw as Record<string, any>;
      if (message.type === 'question') renderQuestion(message as GameState);
      if (message.type === 'result') showResult(message as Parameters<typeof showResult>[0]);
      if (message.type === 'finish') {
        feedback.textContent = String(message.result || 'Tur tamamlandı.');
        nextButton.hidden = true;
      }
    });
    connection.on('close', () => setStatus('Oda sahibi bağlantıyı kapattı.'));
    connection.on('error', () => setStatus('Bağlantı kurulamadı. Oda linkinin güncel olduğundan emin olun.'));
  });
  peer.on('error', () => setStatus('Odaya ulaşılamadı. Oda sahibi çevrimiçi mi?'));
}

document.querySelector<HTMLButtonElement>('[data-online-open]')?.addEventListener('click', () => {
  panel.hidden = false;
  document.querySelector<HTMLElement>('.oyun-kart')!.hidden = true;
  document.querySelector<HTMLElement>('.oyun-notu')!.hidden = true;
});
panel.querySelector('[data-online-close]')?.addEventListener('click', () => {
  panel.hidden = true;
  document.querySelector<HTMLElement>('.oyun-kart')!.hidden = false;
  document.querySelector<HTMLElement>('.oyun-notu')!.hidden = false;
});

createButton.addEventListener('click', () => {
  if (questions.length < 4) { setStatus('Oyun için yeterli eser bulunamadı.'); return; }
  isHost = true;
  hostName = name();
  createButton.disabled = true;
  peer = new Peer();
  setStatus('Oda hazırlanıyor…');
  peer.on('open', (id) => {
    const url = new URL(location.href);
    url.searchParams.set('oda', id);
    inviteUrl.textContent = url.toString();
    invite.hidden = false;
    history.replaceState(null, '', url);
    setStatus('Linki arkadaşına gönder. Katılınca oyun başlayacak. Bu sekmeyi açık tut.');
  });
  peer.on('connection', (incoming) => {
    if (connection) { incoming.close(); return; }
    connection = incoming;
    connection.on('data', (raw) => {
      const message = raw as Record<string, any>;
      if (message.type === 'join') {
        guestName = String(message.name || 'Oyuncu 2').slice(0, 24);
        setStatus(`${guestName} katıldı. Oyun başladı.`);
        beginGame();
      }
      if (message.type === 'answer') {
        guestAnswer = String(message.answer);
        resolveRound();
      }
    });
    connection.on('close', () => setStatus('Arkadaşının bağlantısı koptu. Linki yeniden gönderebilirsin.'));
  });
  peer.on('error', () => { setStatus('Oda açılamadı. Biraz sonra yeniden dene.'); createButton.disabled = false; });
});

joinButton.addEventListener('click', () => {
  const id = params.get('oda');
  if (!id) { setStatus('Önce arkadaşının davet linkini aç.'); return; }
  isHost = false;
  joinButton.disabled = true;
  connectToRoom(id);
});

copyButton.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(inviteUrl.textContent || ''); setStatus('Davet linki kopyalandı.'); }
  catch { setStatus('Linki seçip kopyalayabilirsin.'); }
});

nextButton.addEventListener('click', () => {
  if (!isHost || !currentState) return;
  if (round === 4) {
    const winner = hostScore === guestScore ? '' : hostScore > guestScore ? hostName : guestName;
    const message = winner ? `${winner} kazandı!` : 'Berabere!';
    feedback.textContent = message;
    connection?.send({ type: 'finish', result: message });
    nextButton.hidden = true;
    return;
  }
  round++;
  const state = nextState();
  renderQuestion(state);
  connection?.send(state);
});

if (roomId) {
  panel.hidden = false;
  document.querySelector<HTMLElement>('.oyun-kart')!.hidden = true;
  document.querySelector<HTMLElement>('.oyun-notu')!.hidden = true;
  setStatus('Davet odası hazır. Adını yazıp katıl.');
}
