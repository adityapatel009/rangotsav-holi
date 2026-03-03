import { Howl, Howler } from "howler";

let introSound: Howl | null = null;
let holiSound: Howl | null = null;
let dramaticSound: Howl | null = null;

// 🔐 Prevent duplicate playback
let isIntroPlaying = false;
let isHoliPlaying = false;

export const initAudio = () => {
  if (!introSound) {
    introSound = new Howl({
      src: ["/sounds/intro.mp3"],
      loop: true,
      volume: 0.6,
      html5: true,
    });
  }

  if (!holiSound) {
    holiSound = new Howl({
      src: ["/sounds/holi-main.mp3"],
      loop: true,
      volume: 0.7,
      html5: true,
    });
  }

  if (!dramaticSound) {
    dramaticSound = new Howl({
      src: ["/sounds/dramatic-hit.mp3"],
      volume: 1,
      html5: true,
    });
  }
};

// 🔓 Resume audio context (mobile fix)
export const unlockAudioContext = async () => {
  try {
    if (Howler.ctx && Howler.ctx.state === "suspended") {
      await Howler.ctx.resume();
    }
  } catch (err) {
    console.log("Audio context resume failed", err);
  }
};

// 🎬 INTRO SOUND
export const playIntro = () => {
  if (!introSound) return;

  if (introSound.playing()) return; // 🚫 prevent double

  introSound.play();
  isIntroPlaying = true;
};

export const stopIntro = () => {
  if (!introSound) return;

  introSound.stop();
  isIntroPlaying = false;
};

// 🌈 HOLI SOUND
export const playHoli = () => {
  if (!holiSound) return;

  if (holiSound.playing()) return; // 🚫 prevent duplicate

  holiSound.play();
  isHoliPlaying = true;
};

export const stopHoli = () => {
  if (!holiSound) return;

  holiSound.stop();
  isHoliPlaying = false;
};

// 🥁 DRAMATIC HIT
export const dramaticHit = () => {
  if (!dramaticSound) return;

  dramaticSound.play();
};