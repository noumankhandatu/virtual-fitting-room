import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Virtual Vogue",
  description: "Virtual Vogue is wear ai tool for fashion designer and website",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} $`}>{children}</body>
    </html>
  );
}
