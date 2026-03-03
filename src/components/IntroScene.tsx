"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  initAudio,
  playIntro,
  stopIntro,
  dramaticHit,
  unlockAudioContext,
} from "../lib/AudioManager";

interface Props {
  onEnter: () => void;
}

export default function IntroScene({ onEnter }: Props) {
  const [loading, setLoading] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // 🎧 Initialize Audio Once
  useEffect(() => {
    initAudio();
  }, []);

  // 🔊 Unlock Audio (Desktop + Mobile Proper Fix)
  useEffect(() => {
  const unlock = async () => {
    if (!audioUnlocked) {
      await unlockAudioContext(); // 🔥 THIS WAS MISSING
      playIntro();
      setAudioUnlocked(true);
    }
  };

  window.addEventListener("click", unlock);
  window.addEventListener("touchstart", unlock);

  return () => {
    window.removeEventListener("click", unlock);
    window.removeEventListener("touchstart", unlock);
  };
}, [audioUnlocked]);

  // ⏳ Loader Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      dramaticHit();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🌈 HOLI SPECIAL BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-yellow-400 to-purple-600" />

      {/* 🌫 Soft Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* 🌈 Floating Color Glow */}
      <motion.div
        animate={{ y: [0, -60, 0], x: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-pink-400/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 80, 0], x: [0, -60, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute w-[600px] h-[600px] bg-yellow-300/30 rounded-full blur-3xl"
      />

      {/* 🔊 TAP INSTRUCTION (TOP CENTER) */}
      {!audioUnlocked && (
        <div className="absolute top-6 text-white text-sm md:text-base tracking-wide animate-pulse z-20">
          Tap anywhere to enable sound 🎵
        </div>
      )}

      {loading ? (
        <div className="relative z-10 flex flex-col items-center gap-6 text-white">

          {/* Loader */}
          <div className="w-20 h-20 border-4 border-white/30 border-t-purple-600 rounded-full animate-spin" />

          <p className="text-lg md:text-xl tracking-widest font-semibold">
            LOADING EXPERIENCE...
          </p>

        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          {/* 🎬 Premium Gradient Logo */}
          <motion.h1
            initial={{ letterSpacing: "0.4em", opacity: 0 }}
            animate={{ letterSpacing: "0.1em", opacity: 1 }}
            transition={{ duration: 1.8 }}
            className="text-5xl md:text-8xl font-extrabold bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,255,255,0.7)]"
          >
            RANGOTSAV
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-white/90 text-sm md:text-lg max-w-xl"
          >
            Where colors dance, hearts connect & memories bloom.
          </motion.p>

          {/* 🎬 Enter Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              stopIntro();
              onEnter();
            }}
            className="mt-14 px-12 py-4 rounded-full text-black font-semibold shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500"
            style={{
              background:
                "linear-gradient(90deg, #FFD54F, #FFB300, #FFD54F)",
            }}
          >
            Enter The Celebration →
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}