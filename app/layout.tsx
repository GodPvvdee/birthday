import type { Metadata, Viewport } from "next";
import { Quicksand, Dancing_Script, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingHearts from "@/components/FloatingHearts";
import CursorHearts from "@/components/CursorHearts";
import MusicToggle from "@/components/MusicToggle";
import ThemeToggle from "@/components/ThemeToggle";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Happy Birthday My Bubi ❤️",
  description:
    "A little something I built just for you — a romantic journey through our memories with a quiz, surprises, and a love letter. Happy Birthday, my bubi.",
  keywords: ["birthday", "love", "romantic", "surprise", "quiz"],
  openGraph: {
    title: "Happy Birthday My Bubi ❤️",
    description: "A romantic interactive birthday surprise.",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#ff75a8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${dancing.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative">
        <ThemeProvider>
          <FloatingHearts />
          <CursorHearts />
          <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
            <ThemeToggle />
            <MusicToggle />
          </div>
          <main className="relative z-10 flex flex-1 flex-col">{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
