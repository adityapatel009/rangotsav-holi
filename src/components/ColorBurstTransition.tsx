"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  onComplete: () => void;
}

export default function ColorBurstTransition({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wipe = wipeRef.current;
    if (!container || !wipe) return;

    // Start invisible
    gsap.set(container, { opacity: 0 });
    gsap.set(wipe, { y: "-100%" });

    // Fade in burst
    gsap.to(container, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    // Hold 2 seconds
    setTimeout(() => {
      // Wipe from top
      gsap.to(wipe, {
        y: "0%",
        duration: 1.2,
        ease: "power4.inOut",
        onComplete: () => {
          onComplete();
        },
      });
    }, 2000);
  }, [onComplete]);

  return (
  <div
    ref={containerRef}
    className="absolute inset-0 z-30 overflow-hidden"
  >
      {/* Holi Colors Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/holi-burst.jpg')",
        }}
      />

      {/* Wipe Cleaner */}
      <div
        ref={wipeRef}
        className="absolute inset-0 bg-black"
      />
    </div>
  );
}