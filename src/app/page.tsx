"use client";

import { useState } from "react";
import {
  Search,
  Zap,
  RefreshCw,
  FileText,
  Calendar,
  MapPin,
  Eye,
  Plus,
  UserPlus,
  BookOpen,
  Building2,
} from "lucide-react";

// Mock data
const MOCK_PERIODS = [
  { id: "1", label: "2024.1" },
  { id: "2", label: "2024.2" },
  { id: "3", label: "2025.1" },
];

const MOCK_COURSES = [
  { id: "1", label: "Ciência da Computação" },
  { id: "2", label: "Engenharia de Computação" },
  { id: "3", label: "Sistemas de Informação" },
];

const MOCK_TEACHERS = [
  { id: "1", label: "Prof. João Silva" },
  { id: "2", label: "Prof.ª Maria Souza" },
  { id: "3", label: "Prof. Carlos Lima" },
];

const MOCK_TURMAS = [
  {
    id: "1",
    periodo: "2025.1",
    codigo: "CC0001",
    disciplina: "Algoritmos e Estruturas de Dados",
    departamento: "DCOMP",
    numero: 1,
    horario: "2M34",
    alunos: 40,
    docente: "Prof. João Silva",
    local: "Sala 101",
  },
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
    id: "3",
    periodo: "2025.1",
    codigo: "CC0050",
    disciplina: "Programação Orientada a Objetos",
    departamento: "DCOMP",
    numero: 1,
    horario: "4M12",
    alunos: 35,
    docente: "Prof. Carlos Lima",
    local: "Lab 02",
  },
    {
    id: "6",
    periodo: "2025.1",
    codigo: "CC9999",
    disciplina: "Inteligência Artificial",
    departamento: "DCOMP",
    numero: 1,
    horario: "6N4",
    alunos: 30,
    docente: "Prof. Ana Costa",
    local: null,  
    }
];

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" | "danger" | "info" }) {
  const variants = {
    default: "bg-saloc text-white",
    success: "bg-success text-white",
    warning: "bg-warning text-white",
    danger: "bg-danger text-white",
    info: "bg-info text-white",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}

export default function HomePage() {
  const [periodo, setPeriodo] = useState("");
  const [curso, setCurso] = useState("");
  const [docente, setDocente] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock de autenticação
  const isAuthenticated = true;
  const isAdmin = true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <main className="min-h-screen bg-white font-sans text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        
        {/* Barra de ações (menu) */}
        <nav className="mb-6 md:mb-8">
          <div className="flex flex-wrap gap-1.5 items-center">
            {isAuthenticated && (
              <a href="#" className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Relatório</span>
              </a>
            )}
            {isAuthenticated && (
              <a href="#" className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Alocar turmas</span>
              </a>
            )}
            <a href="#" className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Mapa de salas</span>
            </a>
            <a href="#" className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Verificar salas</span>
            </a>
            {isAuthenticated && (
              <a href="#" className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Adicionar turma</span>
              </a>
            )}
            {isAdmin && (
              <div className="border-l border-gray-300 pl-2 ml-1 flex gap-1.5">
                <a href="#" className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus">
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Usuário</span>
                </a>
                <a href="#" className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Curso</span>
                </a>
                <a href="#" className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus">
                  <Building2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Setor</span>
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Card de filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <h1 className="text-xl md:text-2xl font-bold font-heading text-text-primary mb-4">
            Consulta de Turmas
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label htmlFor="periodo" className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  Período <span className="text-danger">*</span>
                </label>
                <select
                  id="periodo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  required
                >
                  <option value="" disabled>Selecione o período</option>
                  {MOCK_PERIODS.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="curso" className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  Curso
                </label>
                <select
                  id="curso"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                >
                  <option value="">Todos os cursos</option>
                  {MOCK_COURSES.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="docente" className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  Docente
                </label>
                <select
                  id="docente"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                  value={docente}
                  onChange={(e) => setDocente(e.target.value)}
                >
                  <option value="">Todos os docentes</option>
                  {MOCK_TEACHERS.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="disciplina" className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  Disciplina
                </label>
                <select
                  id="disciplina"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                  value={disciplina}
                  onChange={(e) => setDisciplina(e.target.value)}
                >
                  <option value="">Todas as disciplinas</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                Consultar
              </button>

              {isAuthenticated && (
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus"
                >
                  <Zap className="h-4 w-4" />
                  Alocar automático
                </button>
              )}

              {isAdmin && (
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-saloc text-saloc bg-white rounded-md text-sm font-medium hover:bg-saloc hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-focus"
                >
                  <RefreshCw className="h-4 w-4" />
                  Importar do SIGAA
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Resultados */}
        <div className="mt-6">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <h2 className="text-xl font-bold font-heading text-text-primary">Turmas</h2>
            <Badge variant="info">{MOCK_TURMAS.length} resultados</Badge>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-saloc text-white">
                  <tr>
                    <th className="p-3 text-left text-xs font-semibold uppercase">Período</th>
                    <th className="p-3 text-left text-xs font-semibold uppercase">Código</th>
                    <th className="p-3 text-left text-xs font-semibold uppercase">Disciplina</th>
                    <th className="hidden md:table-cell p-3 text-left text-xs font-semibold uppercase">Departamento</th>
                    <th className="p-3 text-center text-xs font-semibold uppercase">Nº</th>
                    <th className="p-3 text-left text-xs font-semibold uppercase">Horário</th>
                    <th className="hidden md:table-cell p-3 text-center text-xs font-semibold uppercase">Alunos</th>
                    <th className="hidden lg:table-cell p-3 text-left text-xs font-semibold uppercase">Docente</th>
                    <th className="p-3 text-left text-xs font-semibold uppercase">Local</th>
                    {isAuthenticated && <th className="p-3 text-left text-xs font-semibold uppercase">Ações</th>}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TURMAS.map((turma) => (
                    <tr key={turma.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-3">{turma.periodo}</td>
                      <td className="p-3 font-mono text-xs">{turma.codigo}</td>
                      <td className="p-3">{turma.disciplina}</td>
                      <td className="hidden md:table-cell p-3 text-text-secondary">{turma.departamento}</td>
                      <td className="p-3 text-center">{turma.numero}</td>
                      <td className="p-3 font-mono text-xs">{turma.horario}</td>
                      <td className="hidden md:table-cell p-3 text-center">{turma.alunos}</td>
                      <td className="hidden lg:table-cell p-3 text-text-secondary">{turma.docente}</td>
                      <td className="p-3">
                        {turma.local ? (
                          <Badge variant="success">{turma.local}</Badge>
                        ) : (
                          <Badge variant="warning">Não alocada</Badge>
                        )}
                      </td>
                      {isAuthenticated && (
                        <td className="p-3">
                          {!turma.local && (
                            <button className="px-3 py-1.5 text-xs font-medium border border-saloc text-saloc rounded-md hover:bg-saloc hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-focus">
                              Alocar
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}