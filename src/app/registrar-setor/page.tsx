'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Building2, CheckCircle, AlertCircle, ArrowLeft, Shield, 
  Save, Trash2, Link2
} from 'lucide-react'

// Tipagem
interface Sector {
  id: number
  name: string
  courseId: number | null
  courseName: string | null
}

interface Course {
  id: number
  name: string
}

// Mock data
const MOCK_SECTORS: Sector[] = [
  { id: 1, name: "COORDENAÇÃO DE CIÊNCIA DA COMPUTAÇÃO", courseId: 1, courseName: "CIÊNCIA DA COMPUTAÇÃO" },
  { id: 2, name: "COORDENAÇÃO DE ENGENHARIA DE COMPUTAÇÃO", courseId: 2, courseName: "ENGENHARIA DE COMPUTAÇÃO" },
  { id: 3, name: "COORDENAÇÃO DE SISTEMAS DE INFORMAÇÃO", courseId: 3, courseName: "SISTEMAS DE INFORMAÇÃO" },
  { id: 4, name: "DIRETORIA DO CCET", courseId: null, courseName: null },
  { id: 5, name: "SECRETARIA ACADÊMICA", courseId: null, courseName: null },
]

const MOCK_COURSES: Course[] = [
  { id: 1, name: "CIÊNCIA DA COMPUTAÇÃO" },
  { id: 2, name: "ENGENHARIA DE COMPUTAÇÃO" },
  { id: 3, name: "SISTEMAS DE INFORMAÇÃO" },
  { id: 4, name: "ENGENHARIA ELÉTRICA" },
  { id: 5, name: "ENGENHARIA QUÍMICA" },
  { id: 6, name: "MATEMÁTICA" },
  { id: 7, name: "FÍSICA" },
  { id: 8, name: "QUÍMICA" },
  { id: 9, name: "QUÍMICA INDUSTRIAL" },
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

export default function RegistrarSetor() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [sectors, setSectors] = useState<Sector[]>(MOCK_SECTORS)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [sectorToDelete, setSectorToDelete] = useState<Sector | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    courseId: ''
  })

  // Auto-clear message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const handleOpenForm = () => {
    setIsEditing(false)
    setEditingId(null)
    setFormData({ name: '', courseId: '' })
    setShowForm(true)
  }

  const handleEdit = (sector: Sector) => {
    setIsEditing(true)
    setEditingId(sector.id)
    setFormData({
      name: sector.name,
      courseId: sector.courseId?.toString() || ''
    })
    setShowForm(true)
  }

  const handleDeleteClick = (sector: Sector) => {
    setSectorToDelete(sector)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    if (sectorToDelete) {
      setSectors(sectors.filter(s => s.id !== sectorToDelete.id))
      setMessage({ text: `Setor "${sectorToDelete.name}" excluído com sucesso!`, type: 'success' })
      setShowDeleteModal(false)
      setSectorToDelete(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      setMessage({ text: 'Nome do setor é obrigatório.', type: 'error' })
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const upperCaseName = formData.name.toUpperCase().trim()
      const courseId = formData.courseId ? parseInt(formData.courseId) : null
      const courseName = courseId ? MOCK_COURSES.find(c => c.id === courseId)?.name || null : null
      
      if (isEditing && editingId) {
        setSectors(sectors.map(s => s.id === editingId ? { 
          ...s, 
          name: upperCaseName, 
          courseId: courseId,
          courseName: courseName
        } : s))
        setMessage({ text: `Setor "${upperCaseName}" atualizado com sucesso!`, type: 'success' })
      } else {
        const newId = Math.max(...sectors.map(s => s.id), 0) + 1
        const newSector: Sector = { 
          id: newId, 
          name: upperCaseName, 
          courseId: courseId,
          courseName: courseName
        }
        setSectors([...sectors, newSector])
        setMessage({ text: `Setor "${upperCaseName}" cadastrado com sucesso!`, type: 'success' })
      }
      
      setShowForm(false)
      setFormData({ name: '', courseId: '' })
      setIsLoading(false)
    }, 500)
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        
        {/* Botão voltar */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-saloc hover:text-saloc-light mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-focus rounded-md px-2 py-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        {/* Título e botão novo setor */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-saloc">Gerenciar Setores</h1>
            <p className="text-text-secondary mt-1">Cadastre, edite e gerencie os setores/coordenações da instituição</p>
          </div>
          {!showForm && (
            <button
              onClick={handleOpenForm}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <Building2 className="h-4 w-4" />
              Novo Setor
            </button>
          )}
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

        {/* Formulário de cadastro/edição */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-saloc">
                {isEditing ? 'Editar Setor' : 'Novo Setor'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="sectorName" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  Nome do Setor <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                  <input
                    id="sectorName"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: COORDENAÇÃO DE CIÊNCIA DA COMPUTAÇÃO"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus uppercase"
                    required
                  />
                </div>
                <p className="text-xs text-text-secondary mt-1">O nome será salvo em letras maiúsculas automaticamente.</p>
              </div>

              <div className="mb-5">
                <label htmlFor="courseId" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  Vincular Curso (opcional)
                </label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                  <select
                    id="courseId"
                    value={formData.courseId}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                  >
                    <option value="">Nenhum (setor administrativo)</option>
                    {MOCK_COURSES.map((course) => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-text-secondary mt-1">Setores vinculados a um curso podem visualizar apenas as turmas desse curso.</p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 text-text-secondary rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {isEditing ? 'Salvar Alterações' : 'Cadastrar Setor'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Setores */}
        {!showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-saloc text-white">
                  <tr>
                    <th className="p-3 text-left text-xs font-semibold uppercase">ID</th>
                    <th className="p-3 text-left text-xs font-semibold uppercase">Setor</th>
                    <th className="p-3 text-left text-xs font-semibold uppercase">Curso Vinculado</th>
                    <th className="p-3 text-center text-xs font-semibold uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sectors.map((sector) => (
                    <tr key={sector.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-mono text-xs">{sector.id}</td>
                      <td className="p-3 font-medium">{sector.name}</td>
                      <td className="p-3">
                        {sector.courseName ? (
                          <Badge variant="success">{sector.courseName}</Badge>
                        ) : (
                          <Badge variant="warning">Sem vínculo</Badge>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(sector)}
                            className="p-1.5 text-saloc hover:bg-saloc/10 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-focus"
                            title="Editar"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(sector)}
                            className="p-1.5 text-danger hover:bg-red-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-focus"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contador de setores */}
        {!showForm && (
          <div className="mt-4 text-right">
            <p className="text-xs text-text-secondary">
              Total de setores: <span className="font-semibold text-saloc">{sectors.length}</span>
            </p>
          </div>
        )}

        {/* Informações adicionais */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-saloc mb-2"> Sobre os setores</h3>
          <div className="text-xs text-text-secondary space-y-1">
            <p>Setores representam coordenações, diretorias ou unidades administrativas.</p>
            <p>Setores vinculados a um curso têm acesso restrito às turmas daquele curso específico.</p>
            <p>Setores sem vínculo (administrativos) têm acesso ampliado a todos os cursos.</p>
            <p>Ao excluir um setor, certifique-se de que não há usuários vinculados a ele.</p>
          </div>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && sectorToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Confirmar exclusão</h3>
            <p className="text-text-secondary mb-6">
              Tem certeza que deseja excluir o setor <span className="font-semibold text-saloc">"{sectorToDelete.name}"</span>?
              <br />
              <span className="text-xs text-warning">Esta ação não pode ser desfeita.</span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 text-text-secondary rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-danger text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-focus"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}