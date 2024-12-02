import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

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
      <body className="h-full">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
