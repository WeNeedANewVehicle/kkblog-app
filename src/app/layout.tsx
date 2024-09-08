import type { Metadata } from "next";
import { kia } from "@/theme/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "KKBlog - 크크블로그",
  description: "안녕하세요. 크크블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={kia.className}>{children}</body>
    </html>
  );
}
