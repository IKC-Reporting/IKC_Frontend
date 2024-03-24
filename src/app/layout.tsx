import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IKC - In-Kind Contribution Reporting",
  description:
    "Webapp for submission of Inkind contributions for research projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en_CA">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
