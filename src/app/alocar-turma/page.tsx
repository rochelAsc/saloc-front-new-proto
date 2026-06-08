'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Calendar, Hash, BookOpen, Building2, Users, 
  User, MapPin, AlertCircle, ArrowRight, Search, Filter
} from 'lucide-react'

// Mock data - Turmas não alocadas (para escolher qual alocar)
const MOCK_TURMAS_NAO_ALOCADAS = [
  {
    id: "2",
    periodo: "2025.1",
    codigo: "CC0024",
    disciplina: "Cálculo I",
    departamento: "DMAT",
    numero: 2,
    horario: "3T12",
    alunos: 50,
    docente: "Prof.ª Maria Souza",
    local: null,
  },
  {
    id: "4",
    periodo: "2025.1",
    codigo: "CC9999",
    disciplina: "Inteligência Artificial",
    departamento: "DCOMP",
    numero: 1,
    horario: "6N4",
    alunos: 30,
    docente: "Prof. Ana Costa",
    local: null,
  },
  {
    id: "5",
    periodo: "2025.1",
    codigo: "CC0080",
    disciplina: "Engenharia de Software",
    departamento: "DCOMP",
    numero: 2,
    horario: "5M12",
    alunos: 38,
    docente: "Prof. Roberto Santos",
    local: null,
  },
  {
    id: "6",
    periodo: "2025.1",
    codigo: "CC0012",
    disciplina: "Matemática Discreta",
    departamento: "DMAT",
    numero: 1,
    horario: "2T34",
    alunos: 45,
    docente: "Prof. João Silva",
    local: null,
  },
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

export default function SelecionarTurmaAlocar() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDisciplina, setFilterDisciplina] = useState("")

  const turmasFiltradas = MOCK_TURMAS_NAO_ALOCADAS.filter(turma => {
    const matchesSearch = turma.disciplina.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          turma.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          turma.docente.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterDisciplina === "" || turma.disciplina === filterDisciplina
    return matchesSearch && matchesFilter
  })

  const disciplinasUnicas = [...new Set(MOCK_TURMAS_NAO_ALOCADAS.map(t => t.disciplina))]

  const handleAlocar = (turmaId: string, horario: string) => {
    router.push(`/alocar-turma/${turmaId}/${horario}`)
  }

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-text-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        
        {/* Título */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-saloc">Alocar Turma</h1>
          <p className="text-text-secondary mt-1">Selecione uma turma não alocada para iniciar o processo de alocação</p>
        </div>

        {/* Barra de busca e filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                <input
                  type="text"
                  placeholder="Buscar por disciplina, código ou docente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                />
              </div>
            </div>
            <div className="sm:w-64">
              <select
                value={filterDisciplina}
                onChange={(e) => setFilterDisciplina(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
              >
                <option value="">Todas as disciplinas</option>
                {disciplinasUnicas.map(disc => (
                  <option key={disc} value={disc}>{disc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Turmas */}
        {turmasFiltradas.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <AlertCircle className="h-12 w-12 text-text-secondary/30 mx-auto mb-3" />
            <p className="text-text-secondary">Nenhuma turma não alocada encontrada.</p>
            <p className="text-text-secondary text-sm mt-1">Todas as turmas já estão alocadas ou não há turmas cadastradas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {turmasFiltradas.map((turma) => (
              <div
                key={turma.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleAlocar(turma.id, turma.horario)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Informações da Turma */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="warning">Não alocada</Badge>
                      <Badge variant="info">{turma.periodo}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">{turma.disciplina}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 mt-2 text-sm text-text-secondary">
                      <div className="flex items-center gap-1">
                        <Hash className="h-3 w-3" />
                        <span className="font-mono text-xs">{turma.codigo}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{turma.horario}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{turma.alunos} alunos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span className="truncate">{turma.docente}</span>
                      </div>
                    </div>
                  </div>

                  {/* Botão Alocar */}
                  <div className="flex items-center justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAlocar(turma.id, turma.horario)
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus whitespace-nowrap"
                    >
                      Alocar Turma
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resumo */}
        <div className="mt-6 text-center text-xs text-text-secondary">
          <p>{turmasFiltradas.length} turma(s) aguardando alocação</p>
        </div>
      </div>
    </main>
  )
}