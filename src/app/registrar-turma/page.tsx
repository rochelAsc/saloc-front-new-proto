'use client'

import { useState, useEffect } from 'react'
import { 
  BookOpen, Calendar, Users, Hash, User, 
  Building2, CheckCircle, AlertCircle, X,
  Plus, Trash2, Search, Filter
} from 'lucide-react'

// Mock data
const MOCK_COURSES = [
  { id: 1, name: "Ciência da Computação" },
  { id: 2, name: "Engenharia de Computação" },
  { id: 3, name: "Sistemas de Informação" },
]

const MOCK_PERIODS = [
  { id: 1, label: "2024.1" },
  { id: 2, label: "2024.2" },
  { id: 3, label: "2025.1" },
]

// Departamentos/Coordenações
const MOCK_DEPARTMENTS = [
  { id: 1, name: "DCOMP - Departamento de Computação" },
  { id: 2, name: "DMAT - Departamento de Matemática" },
  { id: 3, name: "DFIS - Departamento de Física" },
  { id: 4, name: "DEEL - Departamento de Engenharia Elétrica" },
]

// Professores com departamento associado
const MOCK_TEACHERS = [
  { id: 1, name: "Prof. João Silva", departmentId: 1, department: "DCOMP - Departamento de Computação" },
  { id: 2, name: "Prof.ª Maria Souza", departmentId: 2, department: "DMAT - Departamento de Matemática" },
  { id: 3, name: "Prof. Carlos Lima", departmentId: 1, department: "DCOMP - Departamento de Computação" },
  { id: 4, name: "Prof. Ana Costa", departmentId: 3, department: "DFIS - Departamento de Física" },
  { id: 5, name: "Prof. Roberto Santos", departmentId: 4, department: "DEEL - Departamento de Engenharia Elétrica" },
  { id: 6, name: "Prof. Patricia Oliveira", departmentId: 1, department: "DCOMP - Departamento de Computação" },
  { id: 7, name: "Prof. Ricardo Alves", departmentId: 2, department: "DMAT - Departamento de Matemática" },
]

const MOCK_DISCIPLINES = [
  { id: 1, name: "Algoritmos", code: "CC0001", period: "3°", departament: "DCOMP" },
  { id: 2, name: "Cálculo I", code: "CC0024", period: "2°", departament: "DMAT" },
  { id: 3, name: "Programação Orientada a Objetos", code: "CC0050", period: "4°", departament: "DCOMP" },
  { id: 4, name: "Banco de Dados", code: "CC0033", period: "5°", departament: "DCOMP" },
  { id: 5, name: "Engenharia de Software", code: "CC0080", period: "6°", departament: "DCOMP" },
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

export default function RegistrarTurma() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [showNewDiscipline, setShowNewDiscipline] = useState(false)
  
  // Filtro de professores
  const [departmentFilter, setDepartmentFilter] = useState<string>("todos")
  const [teacherSearch, setTeacherSearch] = useState("")
  
  // Form state
  const [formData, setFormData] = useState({
    course: '',
    period: '',
    discipline: '',
    classNumber: '',
    schedule: '',
    quantityStudents: '',
    teachers: [] as string[]
  })

  // New discipline state
  const [newDiscipline, setNewDiscipline] = useState({
    name: '',
    code: '',
    period: '',
    departament: ''
  })

  // Auto-clear message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  // Filtrar professores por departamento e busca
  const filteredTeachers = MOCK_TEACHERS.filter(teacher => {
    const matchesDepartment = departmentFilter === "todos" || teacher.departmentId.toString() === departmentFilter
    const matchesSearch = teacher.name.toLowerCase().includes(teacherSearch.toLowerCase())
    return matchesDepartment && matchesSearch
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleTeacherToggle = (teacherId: string) => {
    setFormData(prev => ({
      ...prev,
      teachers: prev.teachers.includes(teacherId)
        ? prev.teachers.filter(id => id !== teacherId)
        : [...prev.teachers, teacherId]
    }))
  }

  const handleSelectAllTeachers = () => {
    if (formData.teachers.length === filteredTeachers.length) {
      setFormData(prev => ({ ...prev, teachers: [] }))
    } else {
      setFormData(prev => ({ 
        ...prev, 
        teachers: filteredTeachers.map(t => t.id.toString())
      }))
    }
  }

  const handleNewDisciplineChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewDiscipline({
      ...newDiscipline,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validação básica
    if (!formData.course || !formData.period || !formData.classNumber || !formData.schedule || !formData.quantityStudents) {
      setMessage({ text: 'Por favor, preencha todos os campos obrigatórios.', type: 'error' })
      setIsLoading(false)
      return
    }

    if (formData.teachers.length === 0) {
      setMessage({ text: 'Selecione pelo menos um docente para a turma.', type: 'error' })
      setIsLoading(false)
      return
    }

    // Simular envio
    setTimeout(() => {
      setMessage({ text: 'Turma registrada com sucesso!', type: 'success' })
      // Reset form
      setFormData({
        course: '',
        period: '',
        discipline: '',
        classNumber: '',
        schedule: '',
        quantityStudents: '',
        teachers: []
      })
      setShowNewDiscipline(false)
      setDepartmentFilter("todos")
      setTeacherSearch("")
      setIsLoading(false)
    }, 1000)
  }

  // Mock de autenticação
  const isAuthenticated = true
  const hasCourseLinked = false

  // Contagem de professores selecionados
  const selectedCount = formData.teachers.length
  const allSelected = selectedCount === filteredTeachers.length && filteredTeachers.length > 0

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-text-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        
        {/* Título */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-saloc">Registrar Turma</h1>
          <p className="text-text-secondary mt-1">Cadastre uma nova turma no sistema</p>
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
            {/* Curso */}
            <div className="mb-5">
              <label htmlFor="course" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                Curso <span className="text-danger">*</span>
              </label>
              {!hasCourseLinked ? (
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                  required
                >
                  <option value="">Selecione o curso</option>
                  {MOCK_COURSES.map((course) => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value="Ciência da Computação"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100 text-text-secondary"
                />
              )}
            </div>

            {/* Período */}
            <div className="mb-5">
              <label htmlFor="period" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                Período <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                <select
                  id="period"
                  name="period"
                  value={formData.period}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                  required
                >
                  <option value="">Selecione o período</option>
                  {MOCK_PERIODS.map((period) => (
                    <option key={period.id} value={period.id}>{period.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Disciplina */}
            <div className="mb-5">
              <label htmlFor="discipline" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                Disciplina
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                <select
                  id="discipline"
                  name="discipline"
                  value={formData.discipline}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                >
                  <option value="">Selecione uma disciplina existente</option>
                  {MOCK_DISCIPLINES.map((disc) => (
                    <option key={disc.id} value={disc.id}>{disc.name} ({disc.code})</option>
                  ))}
                </select>
              </div>
              
              <button
                type="button"
                onClick={() => setShowNewDiscipline(!showNewDiscipline)}
                className="mt-2 text-xs text-saloc hover:text-saloc-light transition-colors inline-flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                {showNewDiscipline ? 'Cancelar nova disciplina' : 'Cadastrar nova disciplina'}
              </button>
            </div>

            {/* Nova Disciplina (condicional) */}
            {showNewDiscipline && (
              <div className="mb-5 p-4 bg-gray-50 rounded-md border border-gray-200">
                <h3 className="text-sm font-semibold text-saloc mb-3">Nova Disciplina</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="disc-name" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                      Nome da Disciplina *
                    </label>
                    <input
                      id="disc-name"
                      name="name"
                      type="text"
                      value={newDiscipline.name}
                      onChange={handleNewDisciplineChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                      required={showNewDiscipline}
                    />
                  </div>
                  <div>
                    <label htmlFor="disc-code" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                      Código *
                    </label>
                    <input
                      id="disc-code"
                      name="code"
                      type="text"
                      value={newDiscipline.code}
                      onChange={handleNewDisciplineChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                      required={showNewDiscipline}
                    />
                  </div>
                  <div>
                    <label htmlFor="disc-period" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                      Período da Disciplina *
                    </label>
                    <input
                      id="disc-period"
                      name="period"
                      type="text"
                      value={newDiscipline.period}
                      onChange={handleNewDisciplineChange}
                      placeholder="Ex: 3°"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                      required={showNewDiscipline}
                    />
                  </div>
                  <div>
                    <label htmlFor="disc-departament" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                      Departamento *
                    </label>
                    <input
                      id="disc-departament"
                      name="departament"
                      type="text"
                      value={newDiscipline.departament}
                      onChange={handleNewDisciplineChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                      required={showNewDiscipline}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Número da Turma */}
            <div className="mb-5">
              <label htmlFor="classNumber" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                Número da Turma <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                <input
                  id="classNumber"
                  name="classNumber"
                  type="text"
                  value={formData.classNumber}
                  onChange={handleInputChange}
                  placeholder="Ex: 01, T02"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                  required
                />
              </div>
            </div>

            {/* Horário */}
            <div className="mb-5">
              <label htmlFor="schedule" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                Horário <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                <input
                  id="schedule"
                  name="schedule"
                  type="text"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  placeholder="Ex: 24M12, 35T34"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                  required
                />
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Formato: [Dias][Turno][Slots] - Ex: 24M12 (Segunda e Quarta, Manhã, slots 1 e 2)
              </p>
            </div>

            {/* Quantidade de Alunos */}
            <div className="mb-5">
              <label htmlFor="quantityStudents" className="block text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                Quantidade de Alunos <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                <input
                  id="quantityStudents"
                  name="quantityStudents"
                  type="number"
                  value={formData.quantityStudents}
                  onChange={handleInputChange}
                  min="1"
                  max="200"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                  required
                />
              </div>
            </div>

            {/* Docentes - Seção com filtros */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Docentes <span className="text-danger">*</span>
                </label>
                {filteredTeachers.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSelectAllTeachers}
                    className="text-xs text-saloc hover:text-saloc-light transition-colors"
                  >
                    {allSelected ? 'Desmarcar todos' : 'Selecionar todos'}
                  </button>
                )}
              </div>

              {/* Filtros de professores */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                    <input
                      type="text"
                      placeholder="Buscar professor..."
                      value={teacherSearch}
                      onChange={(e) => setTeacherSearch(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                    />
                  </div>
                </div>
                <div className="sm:w-64">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                    >
                      <option value="todos">Todos os departamentos</option>
                      {MOCK_DEPARTMENTS.map((dept) => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Lista de professores */}
              {filteredTeachers.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                  <User className="h-8 w-8 text-text-secondary/30 mx-auto mb-2" />
                  <p className="text-sm text-text-secondary">Nenhum professor encontrado</p>
                  <p className="text-xs text-text-secondary">Tente ajustar os filtros</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto p-1">
                  {filteredTeachers.map((teacher) => (
                    <label
                      key={teacher.id}
                      className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer transition-colors ${
                        formData.teachers.includes(teacher.id.toString())
                          ? 'border-saloc bg-saloc/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={teacher.id}
                        checked={formData.teachers.includes(teacher.id.toString())}
                        onChange={() => handleTeacherToggle(teacher.id.toString())}
                        className="w-4 h-4 text-saloc focus:ring-focus rounded border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-text-secondary" />
                          <span className="text-sm">{teacher.name}</span>
                        </div>
                        <div className="text-xs text-text-secondary/70 mt-0.5">
                          {teacher.department}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Indicador de seleção */}
              {selectedCount > 0 && (
                <div className="mt-3 text-right">
                  <Badge variant="info">
                    {selectedCount} professor(es) selecionado(s)
                  </Badge>
                </div>
              )}
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
                  <CheckCircle className="h-4 w-4" />
                )}
                Registrar Turma
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    course: '',
                    period: '',
                    discipline: '',
                    classNumber: '',
                    schedule: '',
                    quantityStudents: '',
                    teachers: []
                  })
                  setShowNewDiscipline(false)
                  setDepartmentFilter("todos")
                  setTeacherSearch("")
                }}
                className="px-6 py-2.5 border border-gray-300 text-text-secondary rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Limpar
              </button>
            </div>
          </form>
        </div>

        {/* Dicas */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-saloc mb-2">📌 Informações importantes</h3>
          <div className="text-xs text-text-secondary space-y-1">
            <p><span className="font-semibold">Formato do Horário:</span> Dias (2-7) + Turno (M/T/N) + Slots (1-6)</p>
            <p><span className="font-semibold">Exemplo:</span> 24M12 = Segunda e Quarta, Manhã, 1º e 2º horários</p>
            <p><span className="font-semibold">Professores:</span> Você pode filtrar por departamento para encontrar mais rápido</p>
          </div>
        </div>
      </div>
    </main>
  )
}