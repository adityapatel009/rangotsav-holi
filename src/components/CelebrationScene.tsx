"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import CustomCursor from "@/components/CustomCursor";
import { playHoli, stopHoli } from "@/lib/AudioManager";

interface Props {
  onContinue: () => void;
}

export default function CelebrationScene({ onContinue }: Props) {
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [openLetter, setOpenLetter] = useState(false);
  const [showFinalVideo, setShowFinalVideo] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    playHoli();
    return () => stopHoli();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen overflow-hidden px-4 md:px-8 py-12 bg-gradient-to-br from-[#1a1f3c] via-[#2a1458] to-[#1b0f36] text-white"
    >
      <CustomCursor />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center space-y-14">

        {/* 🎇 Premium Holi Title */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,200,0,0.8)]"
        >
          ✨ Happy Holi ✨
        </motion.h1>

        {/* 🎥 Medium Professional Video Card */}
        <div className="relative w-full md:w-[65%] rounded-3xl p-[2px]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 blur opacity-40"></div>

          <div className="relative backdrop-blur-2xl bg-white/10 rounded-3xl border border-white/20 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
            <video
              src="/videos/celebration.mp4"
              className="w-full h-[320px] md:h-[380px] rounded-2xl object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>

        <p className="text-gray-300 text-sm md:text-lg max-w-2xl">
          May the colors of joy, success and love paint your life beautifully.
        </p>

        {/* 🖼 Medium Glass Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            { src: "/images/holi1.png", text: "Rang Barse Dil Se 💛" },
            { src: "/images/holi2.png", text: "Khushiyon Ka Explosion 🎉" },
            { src: "/images/holi3.png", text: "Life Ho Full Colorful 🌈" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative h-[250px] md:h-[280px] overflow-hidden rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl"
            >
              <img
                src={item.src}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-pink-300 via-yellow-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] text-center px-4">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🎁 CTA */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowEnvelope(true)}
          className="px-12 py-4 rounded-full font-semibold text-black shadow-[0_20px_60px_rgba(255,200,0,0.5)]"
          style={{
            background: "linear-gradient(90deg, #FFD54F, #FFB300, #FFD54F)",
          }}
        >
          A Special Holi Surprise For You
        </motion.button>
      </div>

      {/* 💌 ENVELOPE FLOW */}
      <AnimatePresence>
        {showEnvelope && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50"
            onClick={() => setShowEnvelope(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90%] max-w-md text-center"
            >
              {!openLetter && (
                <>
                  <img
                    src="/images/teddy-envelope.png"
                    className="w-64 mx-auto drop-shadow-2xl"
                  />

                  <button
                    onClick={() => {
                      confetti({ particleCount: 200, spread: 120 });
                      setOpenLetter(true);
                    }}
                    className="mt-6 bg-yellow-400 px-8 py-3 rounded-full font-semibold"
                  >
                    Open My Wish
                  </button>
                </>
              )}

              {openLetter && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative p-8 rounded-2xl"
                  style={{
                    backgroundImage: "url('/images/holi-paper.jpg')",
                    backgroundSize: "cover",
                  }}
                >
                  <h2 className="text-2xl font-bold mb-4 text-[#b45309]">
                    🌈 A Message From Heart
                  </h2>

                  <p className="text-gray-800 leading-relaxed">
                    May every shade of Holi bring happiness,
                    every splash of color bring success,
                    and every smile bring warmth into your life.
                    Let this festival brighten your journey
                    with love, laughter and unforgettable memories.
                  </p>

                  <button
                    onClick={() => {
                      stopHoli();
                      setShowFinalVideo(true);
                    }}
                    className="mt-6 px-8 py-3 bg-black text-white rounded-full"
                  >
                    Continue
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎬 FINAL VIDEO */}
      <AnimatePresence>
        {showFinalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex items-center justify-center z-[80]"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative h-[80vh] w-[380px] md:w-[420px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <video
                src="/videos/final-holi.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                playsInline
                controls
              />
            </motion.div>

            <button
              onClick={() => {
                setShowFinalVideo(false);
                setShowFinalMessage(true);
              }}
              className="absolute top-6 right-6 bg-white/20 text-white px-6 py-2 rounded-full backdrop-blur-md"
            >
              Exit ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎉 FINAL MESSAGE */}
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-black z-[100]"
          >
            <motion.h1
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent"
            >
              Wish You A Very Happy Holi ✨
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}