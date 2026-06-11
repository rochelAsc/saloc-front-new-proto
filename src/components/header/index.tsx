'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, LogIn, LogOut, ArrowLeft, Menu, X, User } from 'lucide-react'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isInternalNavigation, setIsInternalNavigation] = useState(true)
  const [imgError, setImgError] = useState(false)

  // Mock de autenticação (sempre logado para o protótipo)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [userName] = useState("Usuário Teste")
  const [isAdmin] = useState(true)

  const isLoginPage = pathname !== '/login' && pathname !== '/'

  useEffect(() => {
    const referrer = document.referrer
    if (referrer && !referrer.includes(window.location.origin)) {
      setIsInternalNavigation(false)
    }
  }, [])

  const handleBack = () => {
    if (isInternalNavigation) {
      router.back()
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    router.push('/login-page')
  }

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className="bg-saloc text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          
          {/* Logo e Nome da Instituição */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo UFMA */}
            <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
              {!imgError ? (
                <img
                  src="/images/ufma-logo.svg"
                  alt="UFMA Logo"
                  className="w-full h-full object-contain"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="text-white font-bold text-xs md:text-sm text-center leading-tight">
                  UFMA
                </span>
              )}
            </div>
            
            {/* Texto institucional - Desktop */}
            <div className="hidden md:block">
              <p className="text-sm font-bold uppercase tracking-wide">UNIVERSIDADE FEDERAL DO MARANHÃO</p>
              <p className="text-xs text-saloc-pastel">Sistema de Alocação de Salas - CCET</p>
            </div>
            
            {/* Versão mobile - texto menor */}
            <div className="md:hidden">
              <p className="text-xs font-bold uppercase tracking-wide leading-tight">UFMA</p>
              <p className="text-[10px] text-saloc-pastel leading-tight">SALOC</p>
            </div>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handleBack}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Voltar"
              title="Voltar"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Link
              href="/home"
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Página inicial"
              title="Página inicial"
            >
              <Home className="h-5 w-5" />
            </Link>
            
            <div className="w-px h-6 bg-white/20 mx-1" />
            
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{userName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-1.5 text-red-300 hover:text-red-200 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Sair"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Sair</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-1.5 bg-white text-saloc rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-2">
              {/* Navegação */}
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <button
                  onClick={() => { handleBack(); setIsMobileMenuOpen(false) }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Voltar
                </button>
                <Link
                  href="/home"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Home className="h-4 w-4" /> Início
                </Link>
              </div>

              {/* Informações do usuário (se logado) */}
              {isLoggedIn && (
                <div className="py-3 px-2 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-white/60" />
                    <span className="text-sm font-medium">{userName}</span>
                  </div>
                  <button
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false) }}
                    className="w-full flex items-center justify-center gap-2 py-2 text-red-300 hover:text-red-200 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" /> Sair
                  </button>
                </div>
              )}

              {/* Login (se não logado) */}
              {!isLoggedIn && (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 bg-white text-saloc rounded-lg font-medium"
                >
                  <LogIn className="h-4 w-4" /> Entrar
                </Link>
              )}

              {/* Informação da instituição */}
              <div className="mt-3 pt-3 text-center text-xs text-white/50 border-t border-white/10">
                <p>CCET - Centro de Ciências Exatas e Tecnologias</p>
                <p className="mt-1">UFMA - Universidade Federal do Maranhão</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}