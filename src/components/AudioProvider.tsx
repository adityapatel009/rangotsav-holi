"use client";

import { useEffect } from "react";
import { initAudio } from "@/lib/AudioManager";

export default function AudioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initAudio();
  }, []);

  return <>{children}</>;
}