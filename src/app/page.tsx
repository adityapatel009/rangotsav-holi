"use client";

import { useState } from "react";
import IntroScene from "@/components/IntroScene";
import VideoScene from "@/components/VideoScene";
import ColorBurstTransition from "@/components/ColorBurstTransition";
import CelebrationScene from "@/components/CelebrationScene";

export default function Home() {
  const [scene, setScene] = useState<
    "intro" | "video" | "burst" | "celebration"
  >("intro");

  return (
    <>
      {scene === "intro" && (
        <IntroScene onEnter={() => setScene("video")} />
      )}

      {scene === "video" && (
        <VideoScene onComplete={() => setScene("burst")} />
      )}

      {scene === "burst" && (
        <ColorBurstTransition
          onComplete={() => setScene("celebration")}
        />
      )}

      {scene === "celebration" && (
        <CelebrationScene onContinue={() => {}} />
      )}
    </>
  );
}