// ============ ambient floating hearts ============
(function ambientHearts(){
  const host = document.getElementById('ambient');
  const symbols = ['💗','💕','♥'];
  const COUNT = 14;
  for (let i = 0; i < COUNT; i++){
    const el = document.createElement('span');
    el.textContent = symbols[i % symbols.length];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (0.9 + Math.random() * 1.3) + 'rem';
    el.style.animationDuration = (10 + Math.random() * 14) + 's';
    el.style.animationDelay = (Math.random() * -20) + 's';
    host.appendChild(el);
  }
})();

// ============ elements ============
const envelope = document.getElementById('envelope');
const stage = document.getElementById('stage');
const letterScene = document.getElementById('letterScene');
const closeBtn = document.getElementById('closeBtn');
const musicToggle = document.getElementById('musicToggle');
const bgAudio = document.getElementById('bgAudio');

let opened = false;

// ============ open envelope -> show letter ============
function openEnvelope(){
  if (opened) return;
  opened = true;

  envelope.classList.add('open');
  envelope.setAttribute('aria-label', 'Letter opened');

  // try to start music right away (this click is a user gesture, so autoplay is allowed)
  playMusic();

  setTimeout(() => {
    stage.classList.add('hide');
    letterScene.classList.add('show');
    letterScene.setAttribute('aria-hidden', 'false');
    logOpen();
  }, 750);
}

envelope.addEventListener('click', openEnvelope);
envelope.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    openEnvelope();
  }
});

// ============ close letter -> back to envelope ============
closeBtn.addEventListener('click', () => {
  letterScene.classList.remove('show');
  letterScene.setAttribute('aria-hidden', 'true');
  stage.classList.remove('hide');
});

// ============ music ============
function playMusic(){
  bgAudio.volume = 0.6;
  const p = bgAudio.play();
  if (p && p.catch){
    p.then(() => {
      musicToggle.classList.add('playing');
      musicToggle.setAttribute('aria-pressed', 'true');
    }).catch(() => {
      // autoplay was blocked (e.g. no audio file yet, or browser policy) — leave button in "paused" state
      musicToggle.classList.remove('playing');
      musicToggle.setAttribute('aria-pressed', 'false');
    });
  }
}

musicToggle.addEventListener('click', () => {
  if (bgAudio.paused){
    playMusic();
  } else {
    bgAudio.pause();
    musicToggle.classList.remove('playing');
    musicToggle.setAttribute('aria-pressed', 'false');
  }
});

// ============ optional: log each time the letter is opened, via Supabase ============
async function logOpen(){
  try {
    if (typeof window.supabase === 'undefined') return;         // supabase-js script not loaded
    if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined') return;
    if (!SUPABASE_URL || SUPABASE_URL.includes('YOUR-PROJECT')) return; // not configured yet

    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    await client.from('letter_opens').insert({ opened_at: new Date().toISOString() });
  } catch (err) {
    // fail silently — this is a nice-to-have, never block the letter from showing
    console.warn('Supabase log skipped:', err.message);
  }
}
