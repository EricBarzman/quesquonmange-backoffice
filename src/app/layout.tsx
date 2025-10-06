import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./reset.css";
import "./globals.css";

import { Toaster } from 'react-hot-toast';
import Header from "@/components/header/header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Backoffice Quesqu'onmange",
  description: "Le Backoffice de l'application culinaire Quesquon'mange",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Header />
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
