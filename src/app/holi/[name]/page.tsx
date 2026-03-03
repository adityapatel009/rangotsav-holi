"use client";

import { useState, use, useEffect } from "react";
import IntroScene from "@/components/IntroScene";
import VideoScene from "@/components/VideoScene";
import MessageScene from "@/components/MessageScene";
import CelebrationScene from "@/components/CelebrationScene";



export default function HoliPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);

  const [scene, setScene] = useState<
    "intro" | "video" | "celebration" | "message"
  >("intro");

useEffect(() => {
  console.log("SCENE:", scene);
}, [scene]);
  const formattedName =
    name?.charAt(0).toUpperCase() + name?.slice(1) || "Friend";

  return (
    <div className="relative w-screen h-screen overflow-hidden">

      {/* INTRO */}
      {scene === "intro" && (
        <IntroScene
          onEnter={() => {
            setScene("video");
          }}
        />
      )}

      {/* VIDEO */}
      {scene === "video" && (
  <VideoScene
    onComplete={() => setScene("celebration")}
  />
)}


      {/* CELEBRATION */}
      {scene === "celebration" && (
        <CelebrationScene
          onContinue={() => setScene("message")}
        />
      )}

      {/* MESSAGE */}
      {scene === "message" && (
        <MessageScene name={formattedName} />
      )}

    </div>
  );
}