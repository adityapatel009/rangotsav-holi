"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

interface Props {
  name: string;
}

export default function MessageScene({ name }: Props) {

  useEffect(() => {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
     confetti({
  particleCount: 6,
  spread: 90,
  startVelocity: 40,
  gravity: 0.8,
  ticks: 200,
  origin: { y: 0 },
});

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-white animated-bg text-center px-6">
      <h1 className="text-5xl font-bold mb-6">
        Bura Na Mano…
        <br />
        HOLI Hai 💥
      </h1>

      <p className="text-xl mt-6 max-w-xl">
        {name}, is Holi bas itni si dua hai ✨  
        Life me har din rang ho,  
        har moment mast ho,  
        aur har smile permanent ho 😄
      </p>

      <div className="mt-10 text-sm opacity-70">
        RangRitual 3D  
        <br />
        Crafted with ❤️ by Aditya
      </div>
    </div>
  );
}