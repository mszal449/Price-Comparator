import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";

const monsterrat = Montserrat({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "InkCheck",
  description: "Szybko porównaj ceny produktów w InkCheck!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monsterrat.className} h-full`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
