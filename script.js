// MUSIC SETTINGS: add your MP3 to assets, then edit these values.
const MUSIC_FILE = "lmzika.mp3"; // Example: assets/my-song.mp3
const MUSIC_TITLE = "Youss45 - Replay";
const START_VOLUME = 0.4; // 0.0 to 1.0
const MUSIC_START_SECONDS = 20; // Start at 00:20
const MUSIC_END_SECONDS = 64;   // Stop at 01:35, then jump back to the start
// Set MUSIC_END_SECONDS = 0 to play until the end of the audio file.

const audio = document.getElementById('music');
audio.src = MUSIC_FILE;
audio.volume = START_VOLUME;
document.getElementById('song-title').textContent = MUSIC_TITLE;
const panel = document.getElementById('music-panel');
document.getElementById('music-toggle').addEventListener('click', () => panel.classList.toggle('open'));
const play = document.getElementById('play');
let loopReady = false;

function refreshPlay(){ play.textContent = audio.paused ? '▶' : 'Ⅱ'; }

function applyMusicRange() {
  if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
  const start = Math.max(0, Math.min(MUSIC_START_SECONDS, audio.duration));
  const end = MUSIC_END_SECONDS > 0
    ? Math.max(start, Math.min(MUSIC_END_SECONDS, audio.duration))
    : audio.duration;
  if (!loopReady) {
    audio.currentTime = start;
    loopReady = true;
  }
  return { start, end };
}

audio.addEventListener('loadedmetadata', applyMusicRange);
audio.addEventListener('timeupdate', () => {
  const range = applyMusicRange();
  if (!range) return;
  if (range.end > range.start && audio.currentTime >= range.end - 0.08) {
    audio.currentTime = range.start;
    if (!audio.paused) audio.play().catch(() => {});
  }
});
audio.addEventListener('ended', () => {
  const range = applyMusicRange();
  if (range && range.end > range.start) {
    audio.currentTime = range.start;
    audio.play().catch(() => {});
  }
});

async function startMusic() {
  try {
    if (!loopReady && audio.readyState >= 1) applyMusicRange();
    await audio.play();
  } catch (e) {
    // Most browsers block sound autoplay until the visitor interacts with the page.
    // The music button remains available for the first manual play.
  }
}
play.addEventListener('click', async () => {
  if (audio.paused) await startMusic();
  else audio.pause();
  refreshPlay();
});
audio.addEventListener('play', refreshPlay);
audio.addEventListener('pause', refreshPlay);
document.getElementById('volume').addEventListener('input', e => {
  audio.volume = Number(e.target.value);
  if (audio.volume > 0) audio.muted = false;
});
const mute = document.getElementById('mute');
mute.addEventListener('click', () => {
  audio.muted = !audio.muted;
  mute.textContent = audio.muted ? '×' : '◖))';
});

// Music now starts from the welcome-screen click (browsers block sound autoplay without interaction).
window.addEventListener('load', () => {
  if (audio.readyState >= 1) applyMusicRange();
});

// ===== WELCOME SCREEN (added) =====
(function () {
  const screen = document.getElementById('welcome-screen');
  if (!screen) return;
  const root = document.documentElement;
  let entered = false;
  root.classList.add('ws-lock'); // no page scroll while the screen is visible
  function enter() {
    if (entered) return;
    entered = true;
    startMusic();                       // music starts on the very first click...
    screen.classList.add('is-hidden');  // ...in the same moment the fade-out begins
    root.classList.remove('ws-lock');
    setTimeout(() => screen.remove(), 900);
  }
  screen.addEventListener('click', enter);
  screen.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enter(); }
  });
  // Mobile browsers pause audio in the background: resume when the visitor comes back.
  document.addEventListener('visibilitychange', () => {
    if (entered && !document.hidden && audio.paused && audio.dataset.userPaused !== '1') startMusic();
  });
  // Respect a manual pause from the player button.
  play.addEventListener('click', () => { audio.dataset.userPaused = audio.paused ? '1' : '0'; });
})();
// Local visitor counter: counts this browser only. A real shared total needs a hosted counter/database service.
const countKey='profile_site_visit_count_v1';const seenKey='profile_site_seen_v1';let count=Number(localStorage.getItem(countKey)||0);if(!sessionStorage.getItem(seenKey)){count++;localStorage.setItem(countKey,count);sessionStorage.setItem(seenKey,'1');}document.getElementById('visit-count').textContent=String(count).padStart(3,'0');
