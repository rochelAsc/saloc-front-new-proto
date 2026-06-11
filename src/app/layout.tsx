import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import NextAuthSessionProvider from '@/providers/session-provider'

export const metadata: Metadata = {
  title: 'SALOC - Sistema de Alocação de Salas',
  description: 'Sistema para gerenciamento e alocação de salas do CCET/UFMA',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icon-saloc.ico" />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50 font-sans">
        <NextAuthSessionProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}