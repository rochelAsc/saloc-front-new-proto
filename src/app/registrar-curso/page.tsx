'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BookOpen, CheckCircle, AlertCircle, ArrowLeft, Shield, Save, Trash2
} from 'lucide-react'

// Mock data
const MOCK_COURSES = [
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

export default function RegistrarCurso() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [courses, setCourses] = useState(MOCK_COURSES)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState<{ id: number; name: string } | null>(null)
  
  // Form state
  const [courseName, setCourseName] = useState('')

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
    setCourseName('')
    setShowForm(true)
  }

  const handleEdit = (course: { id: number; name: string }) => {
    setIsEditing(true)
    setEditingId(course.id)
    setCourseName(course.name)
    setShowForm(true)
  }

  const handleDeleteClick = (course: { id: number; name: string }) => {
    setCourseToDelete(course)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    if (courseToDelete) {
      setCourses(courses.filter(c => c.id !== courseToDelete.id))
      setMessage({ text: `Curso "${courseToDelete.name}" excluído com sucesso!`, type: 'success' })
      setShowDeleteModal(false)
      setCourseToDelete(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!courseName.trim()) {
      setMessage({ text: 'Nome do curso é obrigatório.', type: 'error' })
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const upperCaseName = courseName.toUpperCase().trim()
      
      if (isEditing && editingId) {
        setCourses(courses.map(c => c.id === editingId ? { ...c, name: upperCaseName } : c))
        setMessage({ text: `Curso "${upperCaseName}" atualizado com sucesso!`, type: 'success' })
      } else {
        const newCourse = { id: Math.max(...courses.map(c => c.id), 0) + 1, name: upperCaseName }
        setCourses([...courses, newCourse])
        setMessage({ text: `Curso "${upperCaseName}" cadastrado com sucesso!`, type: 'success' })
      }
      
      setShowForm(false)
      setCourseName('')
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        
        {/* Botão voltar */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-saloc hover:text-saloc-light mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-focus rounded-md px-2 py-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        {/* Título e botão novo curso */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-saloc">Gerenciar Cursos</h1>
            <p className="text-text-secondary mt-1">Cadastre, edite e gerencie os cursos da instituição</p>
          </div>
          {!showForm && (
            <button
              onClick={handleOpenForm}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <BookOpen className="h-4 w-4" />
              Novo Curso
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
                {isEditing ? 'Editar Curso' : 'Novo Curso'}
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
                <label htmlFor="courseName" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  Nome do Curso <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                  <input
                    id="courseName"
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="Ex: CIÊNCIA DA COMPUTAÇÃO"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus uppercase"
                    required
                  />
                </div>
                <p className="text-xs text-text-secondary mt-1">O nome será salvo em letras maiúsculas automaticamente.</p>
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
                  {isEditing ? 'Salvar Alterações' : 'Cadastrar Curso'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Cursos */}
        {!showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-saloc text-white">
                  <tr>
                    <th className="p-3 text-left text-xs font-semibold uppercase">ID</th>
                    <th className="p-3 text-left text-xs font-semibold uppercase">Nome do Curso</th>
                    <th className="p-3 text-center text-xs font-semibold uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-mono text-xs">{course.id}</td>
                      <td className="p-3 font-medium">{course.name}</td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(course)}
                            className="p-1.5 text-saloc hover:bg-saloc/10 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-focus"
                            title="Editar"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(course)}
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

        {/* Contador de cursos */}
        {!showForm && (
          <div className="mt-4 text-right">
            <p className="text-xs text-text-secondary">
              Total de cursos: <span className="font-semibold text-saloc">{courses.length}</span>
            </p>
          </div>
        )}

        {/* Informações adicionais */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-saloc mb-2">📌 Sobre os cursos</h3>
          <div className="text-xs text-text-secondary space-y-1">
            <p>Os cursos cadastrados aqui serão vinculados aos setores e disciplinas do sistema.</p>
            <p>Cada curso pode ter múltiplos setores vinculados (coordenações).</p>
            <p>Ao excluir um curso, verifique se não há disciplinas ou setores vinculados.</p>
          </div>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Confirmar exclusão</h3>
            <p className="text-text-secondary mb-6">
              Tem certeza que deseja excluir o curso <span className="font-semibold text-saloc">"{courseToDelete?.name}"</span>?
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