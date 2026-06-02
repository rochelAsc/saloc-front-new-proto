'use client'

import { useState } from 'react'
import { Mail, Lock, LogIn, ArrowRight, AlertCircle } from 'lucide-react'

// Mock de autenticação (substituir pelo real depois)
const MOCK_USERS = [
  { email: "admin@saloc.com", password: "admin123", isAdmin: true },
  { email: "coord@saloc.com", password: "coord123", isAdmin: false },
]

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isRecoverMode, setIsRecoverMode] = useState(false)
  const [recoverEmail, setRecoverEmail] = useState('')
  const [recoverMessage, setRecoverMessage] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Simular requisição
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === email && u.password === password)
      if (user) {
        // Sucesso - redirecionar para home
        window.location.href = '/home'
      } else {
        setError('E-mail ou senha inválidos. Tente novamente.')
      }
      setIsLoading(false)
    }, 800)
  }

  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setRecoverMessage(null)

    setTimeout(() => {
      setRecoverMessage('Um link de recuperação foi enviado para o e-mail informado.')
      setRecoverEmail('')
      setIsRecoverMode(false)
      setIsLoading(false)
    }, 800)
  }

  return (
    <main className="min-h-screen bg-gray-50 font-sans flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        
        {/* Logo e título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-saloc rounded-2xl mb-4 shadow-lg">
            <span className="text-white text-3xl font-bold">S</span>
          </div>
          <h1 className="text-2xl font-bold text-saloc">SALOC</h1>
          <p className="text-text-secondary text-sm mt-1">Sistema de Alocação de Salas</p>
          <p className="text-text-secondary text-xs mt-4">CCET - Centro de Ciências Exatas e Tecnologias</p>
        </div>

        {/* Card de login */}
        {!isRecoverMode ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Acessar o sistema</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end mb-6">
                <button
                  type="button"
                  onClick={() => setIsRecoverMode(true)}
                  className="text-xs text-saloc hover:text-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus rounded px-2 py-1"
                >
                  Esqueceu sua senha?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
                Entrar
              </button>
            </form>

            {/* Dicas de teste (mock) */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-text-secondary text-center">
                Credenciais para teste:
              </p>
              <div className="mt-2 text-xs text-text-secondary text-center space-y-1">
                <p>Admin: admin@saloc.com / admin123</p>
                <p>Coord: coord@saloc.com / coord123</p>
              </div>
            </div>
          </div>
        ) : (
          /* Card de recuperação de senha */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <button
              onClick={() => setIsRecoverMode(false)}
              className="flex items-center gap-1 text-sm text-saloc hover:text-saloc-light mb-6 transition-colors"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Voltar para o login
            </button>

            <h2 className="text-xl font-semibold text-text-primary mb-2">Recuperar senha</h2>
            <p className="text-sm text-text-secondary mb-6">
              Informe seu e-mail cadastrado e enviaremos um link para redefinir sua senha.
            </p>

            {recoverMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                {recoverMessage}
              </div>
            )}

            <form onSubmit={handleRecoverPassword}>
              <div className="mb-6">
                <label htmlFor="recover-email" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                  <input
                    id="recover-email"
                    type="email"
                    value={recoverEmail}
                    onChange={(e) => setRecoverEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Enviar link de recuperação"
                )}
              </button>
            </form>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} SALOC - Sistema de Alocação de Salas
          </p>
          <p className="text-xs text-text-secondary mt-1">
            UFMA - Universidade Federal do Maranhão
          </p>
        </div>
      </div>
    </main>
  )
}