import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/style/globals.css";

import { Toaster } from "@/components/ui/sonner";
import AppProvider from "@/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coremart Admin",
  description: "Admin dashboard for Coremart.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full`)}>
        <main className="w-full h-full">
          <AppProvider>
            {children}
          </AppProvider>
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
