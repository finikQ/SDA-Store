import type { Metadata } from "next";

import "./globals.css";
import styles from "./main.module.css";

import { TheHeader } from "@/components/TheHeader";
import { TheFooter } from "@/components/TheFooter";
import { ReduxProvider } from "@/redux/provider";

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
        <ReduxProvider>
          <div className={styles.layout__container}>
            <div className={styles.layout__header}>
              <TheHeader />
            </div>
            <main className={styles.layout__main}>{children}</main>
            <div>
              <TheFooter />
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
