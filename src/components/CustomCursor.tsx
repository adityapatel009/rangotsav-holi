"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const click = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
    };
  }, []);

  return (
    <>
      <motion.div
        animate={{
          x: pos.x - 25,
          y: pos.y - 25,
          scale: clicked ? 0.7 : 1,
        }}
        transition={{ type: "spring", stiffness: 200 }}
        className="fixed w-12 h-12 rounded-full pointer-events-none z-[9999]
        bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500
        blur-md opacity-40"
      />

      <motion.div
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: clicked ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500 }}
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
      />
    </>
  );
}