'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  UserPlus, Mail, Lock, Building2, CheckCircle, AlertCircle, 
  ArrowLeft, Eye, EyeOff, Shield
} from 'lucide-react'

// Mock data
const MOCK_SECTORS = [
  { id: 1, name: "Coordenação de Ciência da Computação" },
  { id: 2, name: "Coordenação de Engenharia de Computação" },
  { id: 3, name: "Coordenação de Sistemas de Informação" },
  { id: 4, name: "Diretoria do CCET" },
  { id: 5, name: "Secretaria Acadêmica" },
]

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

export default function RegistrarUsuario() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    sector: '',
    isAdmin: false
  })

  // Auto-clear message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      isAdmin: e.target.checked
    })
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ text: 'Nome é obrigatório.', type: 'error' })
      return false
    }
    if (!formData.email.trim()) {
      setMessage({ text: 'E-mail é obrigatório.', type: 'error' })
      return false
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setMessage({ text: 'E-mail inválido.', type: 'error' })
      return false
    }
    if (!formData.password) {
      setMessage({ text: 'Senha é obrigatória.', type: 'error' })
      return false
    }
    if (formData.password.length < 8) {
      setMessage({ text: 'A senha deve ter no mínimo 8 caracteres.', type: 'error' })
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: 'As senhas não conferem.', type: 'error' })
      return false
    }
    if (!formData.sector) {
      setMessage({ text: 'Setor é obrigatório.', type: 'error' })
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    // Simular envio
    setTimeout(() => {
      setMessage({ text: 'Usuário registrado com sucesso!', type: 'success' })
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        sector: '',
        isAdmin: false
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      sector: '',
      isAdmin: false
    })
    setMessage(null)
  }

  // Mock de autenticação (admin apenas)
  const isAdmin = true

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-gray-50 font-sans flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <Shield className="h-12 w-12 text-danger mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-text-primary mb-2">Acesso Negado</h2>
          <p className="text-text-secondary mb-6">Você não tem permissão para acessar esta página.</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-text-primary">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        
        {/* Botão voltar */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-saloc hover:text-saloc-light mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-focus rounded-md px-2 py-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        {/* Título */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-saloc">Registrar Usuário</h1>
          <p className="text-text-secondary mt-1">Cadastre um novo usuário no sistema</p>
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

        {/* Formulário */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
          <form onSubmit={handleSubmit}>
            {/* Nome */}
            <div className="mb-5">
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                Nome Completo <span className="text-danger">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Digite o nome completo"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                required
              />
            </div>

            {/* E-mail */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                E-mail <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="usuario@ufma.br"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div className="mb-5">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                Senha <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
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

            {/* Confirmar Senha */}
            <div className="mb-5">
              <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                Confirmar Senha <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirme a senha"
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
              <p className="text-xs text-text-secondary mt-1">A senha deve ter no mínimo 8 caracteres</p>
            </div>

            {/* Setor */}
            <div className="mb-5">
              <label htmlFor="sector" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                Setor <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                <select
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                  required
                >
                  <option value="">Selecione o setor</option>
                  {MOCK_SECTORS.map((sector) => (
                    <option key={sector.id} value={sector.id}>{sector.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Administrador */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAdmin}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-saloc focus:ring-focus rounded border-gray-300"
                />
                <span className="text-sm text-text-secondary">
                  <span className="font-semibold">Administrador</span>
                  <span className="text-xs ml-1">- Este usuário terá acesso a todas as funcionalidades do sistema</span>
                </span>
              </label>
            </div>

            {/* Botões */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                Registrar Usuário
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-2.5 border border-gray-300 text-text-secondary rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Limpar
              </button>
            </div>
          </form>
        </div>

        {/* Informações adicionais */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-saloc mb-2">Sobre os perfis</h3>
          <div className="text-xs text-text-secondary space-y-1">
            <p><span className="font-semibold">Usuário Comum:</span> Acesso a funcionalidades básicas como alocar turmas, verificar salas, etc.</p>
            <p><span className="font-semibold">Administrador:</span> Acesso total, incluindo cadastro de usuários, cursos e setores.</p>
          </div>
        </div>
      </div>
    </main>
  )
}