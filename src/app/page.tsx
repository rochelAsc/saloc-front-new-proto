"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  Send,
  CheckCircle,
  Clock,
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
  { id: "4", label: "Prof. Ana Costa" },
];

// Disciplinas por curso
const MOCK_DISCIPLINES: Record<string, { id: string; label: string }[]> = {
  "1": [ // Ciência da Computação
    { id: "101", label: "Algoritmos" },
    { id: "102", label: "Estrutura de Dados" },
    { id: "103", label: "Programação Orientada a Objetos" },
    { id: "104", label: "Banco de Dados" },
  ],
  "2": [ // Engenharia de Computação
    { id: "201", label: "Circuitos Digitais" },
    { id: "202", label: "Arquitetura de Computadores" },
    { id: "203", label: "Sistemas Embarcados" },
  ],
  "3": [ // Sistemas de Informação
    { id: "301", label: "Gestão de Projetos" },
    { id: "302", label: "Análise de Sistemas" },
    { id: "303", label: "Engenharia de Requisitos" },
  ],
};

// Turmas com status para a visão de setor (Diretoria/Administrativo)
const MOCK_TURMAS_SETOR = {
  notSent: [
    {
      id: "ns1",
      periodo: "2025.1",
      codigo: "CC0024",
      disciplina: "Cálculo I",
      departamento: "DMAT",
      numero: 2,
      horario: "3T12",
      alunos: 50,
      docente: "Prof.ª Maria Souza",
      status: "nao-enviada",
    },
    {
      id: "ns2",
      periodo: "2025.1",
      codigo: "CC9999",
      disciplina: "Inteligência Artificial",
      departamento: "DCOMP",
      numero: 1,
      horario: "6N4",
      alunos: 30,
      docente: "Prof. Ana Costa",
      status: "nao-enviada",
    },
  ],
  inProgress: [
    {
      id: "ip1",
      periodo: "2025.1",
      codigo: "CC0050",
      disciplina: "Programação Orientada a Objetos",
      departamento: "DCOMP",
      numero: 1,
      horario: "4M12",
      alunos: 35,
      docente: "Prof. Carlos Lima",
      status: "analise",
      solicitacaoId: "req1",
      solicitacaoDestino: "Coordenação de Engenharia",
    },
    {
      id: "ip2",
      periodo: "2025.1",
      codigo: "CC0100",
      disciplina: "Circuitos Digitais",
      departamento: "DENG",
      numero: 1,
      horario: "2T34",
      alunos: 45,
      docente: "Prof. Ana Costa",
      status: "aceita",
      solicitacaoId: "req2",
      solicitacaoOrigem: "Coordenação de Elétrica",
    },
  ],
  completed: [
    {
      id: "comp1",
      periodo: "2025.1",
      codigo: "CC0001",
      disciplina: "Algoritmos",
      departamento: "DCOMP",
      numero: 1,
      horario: "2M34",
      alunos: 40,
      docente: "Prof. João Silva",
      local: "Sala 101",
      status: "alocada",
    },
    {
      id: "comp2",
      periodo: "2024.2",
      codigo: "CC0033",
      disciplina: "Banco de Dados",
      departamento: "DCOMP",
      numero: 2,
      horario: "5M12",
      alunos: 38,
      docente: "Prof. João Silva",
      local: "Sala 102",
      status: "alocada",
    },
  ],
};

// Lista completa de turmas (para usuários com curso vinculado)
const ALL_TURMAS = [
  {
    id: "1",
    periodo: "2025.1",
    codigo: "CC0001",
    disciplina: "Algoritmos",
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
    id: "4",
    periodo: "2025.1",
    codigo: "CC0100",
    disciplina: "Circuitos Digitais",
    departamento: "DENG",
    numero: 1,
    horario: "2T34",
    alunos: 45,
    docente: "Prof. Ana Costa",
    local: null,
  },
  {
    id: "5",
    periodo: "2024.2",
    codigo: "CC0033",
    disciplina: "Banco de Dados",
    departamento: "DCOMP",
    numero: 2,
    horario: "5M12",
    alunos: 38,
    docente: "Prof. João Silva",
    local: "Sala 102",
  },
  {
    id: "6",
    periodo: "2024.1",
    codigo: "CC9999",
    disciplina: "Inteligência Artificial",
    departamento: "DCOMP",
    numero: 1,
    horario: "6N4",
    alunos: 30,
    docente: "Prof. Ana Costa",
    local: null,
  },
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

// Componente de tabela para as seções do setor
function SetorTableSection({ title, turmas, variant, onSend, onAccept }: { 
  title: string; 
  turmas: any[]; 
  variant: "notSent" | "inProgress" | "completed";
  onSend?: (ids: string[]) => void;
  onAccept?: (ids: string[]) => void;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(turmas.map(t => t.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  useEffect(() => {
    setSelectAll(selectedIds.length === turmas.length && turmas.length > 0);
  }, [selectedIds, turmas.length]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "analise": return <Badge variant="warning">Em análise</Badge>;
      case "aceita": return <Badge variant="info">Aceita</Badge>;
      case "alocada": return <Badge variant="success">Alocada</Badge>;
      default: return <Badge variant="warning">Pendente</Badge>;
    }
  };

  if (turmas.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-4 py-3 border-b bg-gray-50">
          <h3 className="text-sm font-semibold text-saloc uppercase tracking-wide">{title}</h3>
        </div>
        <div className="p-8 text-center">
          <p className="text-text-secondary">Nenhuma turma nesta categoria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
      <div className="px-4 py-3 border-b bg-gray-50 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-saloc uppercase tracking-wide">{title}</h3>
        {(variant === "notSent" || variant === "inProgress") && selectedIds.length > 0 && (
          <div className="flex gap-2">
            {variant === "notSent" && onSend && (
              <button
                onClick={() => onSend(selectedIds)}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-saloc text-white rounded-md hover:bg-saloc-light transition-colors"
              >
                <Send className="h-3 w-3" />
                Enviar ({selectedIds.length})
              </button>
            )}
            {variant === "inProgress" && onAccept && (
              <button
                onClick={() => onAccept(selectedIds)}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-success text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="h-3 w-3" />
                Aceitar ({selectedIds.length})
              </button>
            )}
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-saloc text-white">
            <tr>
              <th className="p-3 text-center w-10">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-saloc focus:ring-focus"
                />
              </th>
              <th className="p-3 text-left text-xs font-semibold uppercase">Período</th>
              <th className="p-3 text-left text-xs font-semibold uppercase">Código</th>
              <th className="p-3 text-left text-xs font-semibold uppercase">Disciplina</th>
              <th className="hidden md:table-cell p-3 text-left text-xs font-semibold uppercase">Departamento</th>
              <th className="p-3 text-center text-xs font-semibold uppercase">Nº</th>
              <th className="p-3 text-left text-xs font-semibold uppercase">Horário</th>
              <th className="hidden sm:table-cell p-3 text-center text-xs font-semibold uppercase">Alunos</th>
              <th className="hidden lg:table-cell p-3 text-left text-xs font-semibold uppercase">Docente</th>
              <th className="p-3 text-left text-xs font-semibold uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {turmas.map((turma) => (
              <tr key={turma.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(turma.id)}
                    onChange={() => handleSelectOne(turma.id)}
                    className="w-4 h-4 rounded border-gray-300 text-saloc focus:ring-focus"
                  />
                </td>
                <td className="p-3">{turma.periodo}</td>
                <td className="p-3 font-mono text-xs">{turma.codigo}</td>
                <td className="p-3">{turma.disciplina}</td>
                <td className="hidden md:table-cell p-3 text-text-secondary">{turma.departamento}</td>
                <td className="p-3 text-center">{turma.numero}</td>
                <td className="p-3 font-mono text-xs">{turma.horario}</td>
                <td className="hidden sm:table-cell p-3 text-center">{turma.alunos}</td>
                <td className="hidden lg:table-cell p-3 text-text-secondary">{turma.docente}</td>
                <td className="p-3">{getStatusBadge(turma.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function HomePage() {
  // Estado dos filtros
  const [periodo, setPeriodo] = useState("");
  const [curso, setCurso] = useState("");
  const [docente, setDocente] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [disciplinasDisponiveis, setDisciplinasDisponiveis] = useState<{ id: string; label: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado das turmas filtradas (para usuários com curso vinculado)
  const [turmasFiltradas, setTurmasFiltradas] = useState(ALL_TURMAS);

  // Modo 1: Usuário com curso vinculado (ex: Técnico de Coordenação)
  // Modo 2: Usuário sem curso vinculado (ex: Diretoria/Setor Administrativo)
  const [hasCourseLinked, setHasCourseLinked] = useState(true); 
  
  const isAuthenticated = true;
  const isAdmin = true;

  // Dados para visão de setor (quando NÃO tem curso vinculado)
  const [turmasNotSent, setTurmasNotSent] = useState(MOCK_TURMAS_SETOR.notSent);
  const [turmasInProgress, setTurmasInProgress] = useState(MOCK_TURMAS_SETOR.inProgress);
  const [turmasCompleted, setTurmasCompleted] = useState(MOCK_TURMAS_SETOR.completed);

  // Atualizar disciplinas quando o curso mudar
  useEffect(() => {
    if (curso && MOCK_DISCIPLINES[curso]) {
      setDisciplinasDisponiveis(MOCK_DISCIPLINES[curso]);
      setDisciplina("");
    } else {
      setDisciplinasDisponiveis([]);
    }
  }, [curso]);

  // Função para filtrar turmas (modo com curso vinculado)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = [...ALL_TURMAS];
      
      if (periodo) {
        const periodoLabel = MOCK_PERIODS.find(p => p.id === periodo)?.label;
        if (periodoLabel) {
          filtered = filtered.filter(t => t.periodo === periodoLabel);
        }
      }
      
      if (curso) {
        const cursoLabel = MOCK_COURSES.find(c => c.id === curso)?.label;
        if (cursoLabel === "Ciência da Computação") {
          filtered = filtered.filter(t => t.disciplina === "Algoritmos" || t.disciplina === "Estrutura de Dados" || t.disciplina === "Programação Orientada a Objetos" || t.disciplina === "Banco de Dados" || t.disciplina === "Inteligência Artificial");
        } else if (cursoLabel === "Engenharia de Computação") {
          filtered = filtered.filter(t => t.disciplina === "Circuitos Digitais");
        } else if (cursoLabel === "Sistemas de Informação") {
          filtered = filtered.filter(t => t.disciplina === "Gestão de Projetos" || t.disciplina === "Análise de Sistemas");
        }
      }
      
      if (docente) {
        const docenteLabel = MOCK_TEACHERS.find(d => d.id === docente)?.label;
        if (docenteLabel) {
          filtered = filtered.filter(t => t.docente === docenteLabel);
        }
      }
      
      if (disciplina) {
        const disciplinaLabel = disciplinasDisponiveis.find(d => d.id === disciplina)?.label;
        if (disciplinaLabel) {
          filtered = filtered.filter(t => t.disciplina === disciplinaLabel);
        }
      }
      
      setTurmasFiltradas(filtered);
      setIsLoading(false);
    }, 500);
  };

  // Funções para ações do setor (mock)
  const handleSendSelected = (ids: string[]) => {
    alert(`Enviar solicitações para turmas: ${ids.join(", ")}`);
  };

  const handleAcceptSelected = (ids: string[]) => {
    alert(`Aceitar solicitações para turmas: ${ids.join(", ")}`);
  };

  // Separar turmas com e sem sala (para modo com curso vinculado)
  const turmasComSala = turmasFiltradas.filter(t => t.local);
  const turmasSemSala = turmasFiltradas.filter(t => !t.local);

  return (
    <main className="min-h-screen bg-white font-sans text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        
        {/* Barra de ações (menu) */}
        <nav className="mb-6 md:mb-8">
          <div className="flex flex-wrap gap-1.5 items-center">
            {isAuthenticated && (
              <Link
                href="/home"
                className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Relatório</span>
              </Link>
            )}
            {isAuthenticated && (
              <Link
                href="/alocar-turma"
                className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Alocar turmas</span>
              </Link>
            )}
            <Link
              href="/mapa-de-salas"
              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Mapa de salas</span>
            </Link>
            <Link
              href="/verificar-salas"
              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Verificar salas</span>
            </Link>
            {isAuthenticated && (
              <Link
                href="/registrar-turma"
                className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Adicionar turma</span>
              </Link>
            )}
            {isAdmin && (
              <div className="border-l border-gray-300 pl-2 ml-1 flex gap-1.5">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Usuário</span>
                </Link>
                <Link
                  href="/registrar-curso"
                  className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Curso</span>
                </Link>
                <Link
                  href="/registrar-setor"
                  className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md text-saloc hover:bg-saloc/10 focus:outline-none focus:ring-2 focus:ring-focus"
                >
                  <Building2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Setor</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Card de filtros - só aparece se tiver curso vinculado */}
        {hasCourseLinked && (
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus disabled:bg-gray-100"
                    value={disciplina}
                    onChange={(e) => setDisciplina(e.target.value)}
                    disabled={!curso}
                  >
                    <option value="">
                      {!curso ? "Selecione um curso primeiro" : "Todas as disciplinas"}
                    </option>
                    {disciplinasDisponiveis.map((d) => (
                      <option key={d.id} value={d.id}>{d.label}</option>
                    ))}
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

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus"
                >
                  <Zap className="h-4 w-4" />
                  Alocar automático
                </button>

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
        )}

        {/* Resultados - MODO SETOR (sem curso vinculado) */}
        {!hasCourseLinked && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-warning" />
              <h2 className="text-xl font-bold font-heading text-text-primary">Gerenciamento de Turmas</h2>
              <Badge variant="info">Visão de Setor</Badge>
            </div>
            
            <SetorTableSection
              title="Turmas que ainda não foram enviadas"
              turmas={turmasNotSent}
              variant="notSent"
              onSend={handleSendSelected}
            />

            <SetorTableSection
              title="Turmas que estão em progresso"
              turmas={turmasInProgress}
              variant="inProgress"
              onAccept={handleAcceptSelected}
            />

            <SetorTableSection
              title="Turmas finalizadas"
              turmas={turmasCompleted}
              variant="completed"
            />
          </div>
        )}

        {/* Resultados - MODO NORMAL (com curso vinculado) */}
        {hasCourseLinked && (
          <div className="mt-6">
            {/* Turmas sem sala */}
            <div className="mb-8">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-warning rounded"></div>
                  <h2 className="text-xl font-bold font-heading text-text-primary">Turmas sem sala</h2>
                </div>
                <Badge variant="warning">{turmasSemSala.length} resultados</Badge>
              </div>

              {turmasSemSala.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <p className="text-text-secondary">Nenhuma turma sem sala encontrada.</p>
                </div>
              ) : (
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
                          <th className="p-3 text-left text-xs font-semibold uppercase">Status</th>
                          <th className="p-3 text-center text-xs font-semibold uppercase">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {turmasSemSala.map((turma) => (
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
                              <Badge variant="warning">Não alocada</Badge>
                            </td>
                            <td className="p-3 text-center">
                              <button className="px-3 py-1.5 text-xs font-medium border border-saloc text-saloc rounded-md hover:bg-saloc hover:text-white transition-colors">
                                Alocar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Turmas com sala */}
            <div>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-success rounded"></div>
                  <h2 className="text-xl font-bold font-heading text-text-primary">Turmas com sala</h2>
                </div>
                <Badge variant="success">{turmasComSala.length} resultados</Badge>
              </div>

              {turmasComSala.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <p className="text-text-secondary">Nenhuma turma alocada encontrada.</p>
                </div>
              ) : (
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
                        </tr>
                      </thead>
                      <tbody>
                        {turmasComSala.map((turma) => (
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
                              <Badge variant="success">{turma.local}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
