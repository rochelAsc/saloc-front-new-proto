// src/mock/data.ts

export const MOCK_PERIODS = [
  { id: 1, label: "2024.1" },
  { id: 2, label: "2024.2" },
  { id: 3, label: "2025.1" },
]

export const MOCK_COURSES = [
  { id: 1, name: "Ciência da Computação" },
  { id: 2, name: "Engenharia de Computação" },
  { id: 3, name: "Sistemas de Informação" },
]

export const MOCK_TEACHERS = [
  { id: 1, name: "Prof. João Silva" },
  { id: 2, name: "Prof.ª Maria Souza" },
  { id: 3, name: "Prof. Carlos Lima" },
  { id: 4, name: "Prof. Ana Costa" },
  { id: 5, name: "Prof. Roberto Santos" },
]

export const MOCK_DISCIPLINES_BY_COURSE: Record<number, { id: number; name: string }[]> = {
  1: [ // Ciência da Computação
    { id: 1, name: "Algoritmos" },
    { id: 2, name: "Estrutura de Dados" },
    { id: 3, name: "Programação Orientada a Objetos" },
    { id: 4, name: "Banco de Dados" },
    { id: 5, name: "Engenharia de Software" },
  ],
  2: [ // Engenharia de Computação
    { id: 6, name: "Circuitos Digitais" },
    { id: 7, name: "Arquitetura de Computadores" },
    { id: 8, name: "Sistemas Embarcados" },
  ],
  3: [ // Sistemas de Informação
    { id: 9, name: "Gestão de Projetos" },
    { id: 10, name: "Análise de Sistemas" },
    { id: 11, name: "Marketing Digital" },
  ],
}

export const MOCK_TURMAS = [
  // Turmas sem sala (para lista de "não alocadas")
  {
    id: "1",
    periodo: "2025.1",
    codigo: "CC0024",
    disciplina: "Cálculo I",
    departamento: "DMAT",
    numero: 2,
    horario: "3T12",
    alunos: 50,
    docente: "Prof.ª Maria Souza",
    local: null,
    status: "sem-sala",
  },
  {
    id: "2",
    periodo: "2025.1",
    codigo: "CC9999",
    disciplina: "Inteligência Artificial",
    departamento: "DCOMP",
    numero: 1,
    horario: "6N4",
    alunos: 30,
    docente: "Prof. Ana Costa",
    local: null,
    status: "sem-sala",
  },
  {
    id: "3",
    periodo: "2025.1",
    codigo: "CC0080",
    disciplina: "Engenharia de Software",
    departamento: "DCOMP",
    numero: 2,
    horario: "5M12",
    alunos: 38,
    docente: "Prof. Roberto Santos",
    local: null,
    status: "sem-sala",
  },
  // Turmas com sala (alocadas)
  {
    id: "4",
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
    id: "5",
    periodo: "2025.1",
    codigo: "CC0050",
    disciplina: "Programação Orientada a Objetos",
    departamento: "DCOMP",
    numero: 1,
    horario: "4M12",
    alunos: 35,
    docente: "Prof. Carlos Lima",
    local: "Lab 02",
    status: "alocada",
  },
]