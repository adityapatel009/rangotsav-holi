"use client";

import { useEffect, useRef } from "react";
import { stopIntro, initAudio, playHoli } from "../lib/AudioManager";
import { motion } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export default function VideoScene({ onComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 🔊 Audio Flow
    initAudio();
    stopIntro();
    playHoli();

    const video = videoRef.current;
    if (!video) return;

    // ⏱ AUTO CUT AFTER 7 SECONDS
    const timer = setTimeout(() => {
      video.pause();
      onComplete();
    }, 7000); // 7 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 bg-black overflow-hidden">

      {/* 🎥 Background Video */}
      <video
        ref={videoRef}
        src="/videos/holi-explosion.mp4"
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
      />

      {/* 🌈 Cinematic Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/70" />

      {/* ✨ Animated Light Glow */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-yellow-400/20 to-purple-500/20 blur-3xl"
      />

      {/* 🎬 Center Cinematic Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="text-4xl md:text-7xl font-extrabold tracking-wide bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,200,0,0.6)]"
        >
          Rangon Ka Toofan
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-6 text-gray-200 text-sm md:text-xl max-w-2xl tracking-wide"
        >
          Jab rang milte hain jazbaaton se,
          tab Holi sirf tyohar nahi — ek ehsaas ban jaati hai.
        </motion.p>

      </div>

      {/* 🎥 Cinematic Zoom Effect */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}