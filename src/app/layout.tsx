import type { Metadata } from "next";

import "./globals.css";

import { TheHeader } from "@/components/TheHeader";
import { TheFooter } from "@/components/TheFooter";

export const metadata: Metadata = {
  title: "SDA Vintage Store",
  description: "SDA Vintage Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TheHeader />
        <main>{children}</main>
        <TheFooter />
      </body>
    </html>
  );
}
