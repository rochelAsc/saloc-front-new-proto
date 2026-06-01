import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SALOC - Sistema de Alocação de Salas",
  description: "Alocação de salas para o CCET/UFMA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
