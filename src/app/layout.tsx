import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AudioProvider from "@/components/AudioProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://rangotsav-holi.vercel.app"),

  title: "A Special Holi Surprise For You 🌈",
  description:
    "Step into a cinematic Holi celebration filled with colors, music and magic.",

  openGraph: {
    title: "A Special Holi Surprise For You 🌈",
    description:
      "Tap to experience this interactive Holi celebration.",
    url: "https://rangotsav-holi.vercel.app",
    siteName: "Rangotsav",
    images: [
      {
        url: "/holi-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Holi Celebration Banner",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "A Special Holi Surprise For You 🌈",
    description:
      "Experience the colors of celebration in this interactive Holi surprise.",
    images: ["/holi-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}