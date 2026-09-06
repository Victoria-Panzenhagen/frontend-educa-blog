import type { Metadata } from "next";

import Header from "@/components/layout/Header";
  
import "./globals.css";

export const metadata: Metadata = {
  title: "Educa Blog",
  description: "Compartilhe conhecimento, experiências e ideias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900">
        <Header />

        {children}
      </body>
    </html>
  );
}
