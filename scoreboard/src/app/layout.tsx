import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TaskQueueProvider } from "@/contexts/TaskQueueContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scoreboard",
  description: "HZU18 Final Scoreboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TaskQueueProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main className="w-screen h-screen bg-mirage-background-image bg-no-repeat bg-center bg-cover overflow-hidden">
            <div className="relative w-full h-full bg-[#10101080] backdrop-blur-xs flex flex-col items-center justify-center">
              {children}
            </div>
          </main>
        </body>
      </html>
    </TaskQueueProvider>
  );
}
