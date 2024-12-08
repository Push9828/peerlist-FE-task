import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Form Builder",
  description:
    "This is form builder peerlist Peerlist Frontend Developer Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased`}>{children}</body>
    </html>
  );
}
