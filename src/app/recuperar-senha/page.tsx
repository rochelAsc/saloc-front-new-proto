'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Mail, Lock, CheckCircle, AlertCircle, ArrowLeft, 
  Eye, EyeOff, KeyRound, Send
} from 'lucide-react'

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" | "danger" | "info" }) {
  const variants = {
    default: "bg-saloc text-white",
    success: "bg-success text-white",
    warning: "bg-warning text-white",
    danger: "bg-danger text-white",
    info: "bg-info text-white",
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}

export default function RecuperarSenha() {
  const router = useRouter()
  const [step, setStep] = useState<'request' | 'reset'>('request')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Step 1: Solicitar recuperação
  const [email, setEmail] = useState('')
  
  // Step 2: Resetar senha
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [token, setToken] = useState('')

  // Verificar token na URL ao carregar
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tokenParam = urlParams.get('token')
    if (tokenParam && tokenParam.length > 20) {
      setToken(tokenParam)
      setStep('reset')
    }
  }, [])

  // Auto-clear message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setMessage({ text: 'E-mail é obrigatório.', type: 'error' })
      return
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      setMessage({ text: 'E-mail inválido.', type: 'error' })
      return
    }

    setIsLoading(true)

    // Simular envio
    setTimeout(() => {
      setMessage({ 
        text: 'Um link de recuperação foi enviado para o seu e-mail. Verifique sua caixa de entrada.', 
        type: 'success' 
      })
      setEmail('')
      setIsLoading(false)
    }, 1000)
  }

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!password) {
      setMessage({ text: 'Nova senha é obrigatória.', type: 'error' })
      return
    }
    
    if (password.length < 8) {
      setMessage({ text: 'A senha deve ter no mínimo 8 caracteres.', type: 'error' })
      return
    }
    
    if (password !== confirmPassword) {
      setMessage({ text: 'As senhas não conferem.', type: 'error' })
      return
    }

    setIsLoading(true)

    // Simular reset
    setTimeout(() => {
      setMessage({ text: 'Senha redefinida com sucesso! Redirecionando para o login...', type: 'success' })
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-text-primary">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Botão voltar */}
        <button
          onClick={() => step === 'request' ? router.back() : setStep('request')}
          className="inline-flex items-center gap-2 text-saloc hover:text-saloc-light mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-focus rounded-md px-2 py-1"
        >
          <ArrowLeft className="h-4 w-4" />
          {step === 'request' ? 'Voltar' : 'Voltar para solicitar link'}
        </button>

        {/* Logo e título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-saloc rounded-2xl mb-4 shadow-lg">
            <KeyRound className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-saloc">
            {step === 'request' ? 'Recuperar Senha' : 'Redefinir Senha'}
          </h1>
          <p className="text-text-secondary text-sm mt-2">
            {step === 'request' 
              ? 'Informe seu e-mail para receber o link de recuperação'
              : 'Digite sua nova senha abaixo'
            }
          </p>
        </div>

        {/* Mensagem de feedback */}
        {message && (
          <div className={`mb-4 p-3 rounded-md flex items-center gap-2 text-sm ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            {message.text}
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          
          {/* Step 1: Solicitar recuperação */}
          {step === 'request' && (
            <form onSubmit={handleRequestSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  E-mail <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                    required
                  />
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  Enviaremos um link de recuperação para este e-mail.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Enviar Link de Recuperação
              </button>
            </form>
          )}

          {/* Step 2: Redefinir senha */}
          {step === 'reset' && (
            <form onSubmit={handleResetSubmit}>
              <div className="mb-5">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  Nova Senha <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/50 hover:text-text-secondary"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  Confirmar Nova Senha <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme a nova senha"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/50 hover:text-text-secondary"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  A senha deve ter no mínimo 8 caracteres.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                Redefinir Senha
              </button>
            </form>
          )}
        </div>

        {/* Informações adicionais */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-saloc mb-2">Dicas de segurança</h3>
          <div className="text-xs text-text-secondary space-y-1">
            <p>• Use uma senha forte com letras, números e caracteres especiais.</p>
            <p>• Não compartilhe sua senha com ninguém.</p>
            <p>• O link de recuperação expira em 10 minutos.</p>
            <p>• Se não receber o e-mail, verifique sua caixa de spam.</p>
          </div>
        </div>

        {/* Link para voltar ao login */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/login')}
            className="text-sm text-saloc hover:text-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus rounded-md px-2 py-1"
          >
            ← Voltar para o login
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
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