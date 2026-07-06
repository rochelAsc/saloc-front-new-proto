"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  Send,
} from "lucide-react";

// Mock data
const MOCK_COURSES = [
  { id: 1, name: "Ciência da Computação" },
  { id: 2, name: "Engenharia de Computação" },
  { id: 3, name: "Sistemas de Informação" },
];

const MOCK_PERIODS = [
  { id: 1, label: "2024.1" },
  { id: 2, label: "2024.2" },
  { id: 3, label: "2025.1" },
];

// Departamentos/Coordenações
const MOCK_DEPARTMENTS = [
  { id: 1, name: "DCOMP - Departamento de Computação" },
  { id: 2, name: "DMAT - Departamento de Matemática" },
  { id: 3, name: "DFIS - Departamento de Física" },
  { id: 4, name: "DEEL - Departamento de Engenharia Elétrica" },
];

// Professores com departamento associado
const MOCK_TEACHERS = [
  { id: 1, name: "Prof. João Silva", departmentId: 1, department: "DCOMP - Departamento de Computação" },
  { id: 2, name: "Prof.ª Maria Souza", departmentId: 2, department: "DMAT - Departamento de Matemática" },
  { id: 3, name: "Prof. Carlos Lima", departmentId: 1, department: "DCOMP - Departamento de Computação" },
  { id: 4, name: "Prof. Ana Costa", departmentId: 3, department: "DFIS - Departamento de Física" },
  { id: 5, name: "Prof. Roberto Santos", departmentId: 4, department: "DEEL - Departamento de Engenharia Elétrica" },
  { id: 6, name: "Prof. Patricia Oliveira", departmentId: 1, department: "DCOMP - Departamento de Computação" },
  { id: 7, name: "Prof. Ricardo Alves", departmentId: 2, department: "DMAT - Departamento de Matemática" },
];

const MOCK_DISCIPLINES = [
  { id: 1, name: "Algoritmos", code: "CC0001", period: "3°", department: "DCOMP" },
  { id: 2, name: "Cálculo I", code: "CC0024", period: "2°", department: "DMAT" },
  { id: 3, name: "Programação Orientada a Objetos", code: "CC0050", period: "4°", department: "DCOMP" },
  { id: 4, name: "Banco de Dados", code: "CC0033", period: "5°", department: "DCOMP" },
  { id: 5, name: "Engenharia de Software", code: "CC0080", period: "6°", department: "DCOMP" },
];

type Turma = {
  id: string;
  periodo: string;
  codigo: string;
  disciplina: string;
  departamento: string;
  numero: number;
  horario: string;
  alunos: number;
  docente: string;
  local: string | null;
  subturmas?: string[];
};

// Lista completa de turmas
const ALL_TURMAS: Turma[] = [
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

export default function RegistrarSubturma() {
  const searchParams = useSearchParams();
  const turmaId = searchParams.get("id");

  const turmaPai = ALL_TURMAS.find((t) => String(t.id) === turmaId);

  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([]);
  const [vacancies, setVacancies] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [schedule, setSchedule] = useState("");

  useEffect(() => {
    if (!turmaPai) return;

    setSelectedPeriod(turmaPai.periodo);
    setSelectedCourse(MOCK_COURSES[0].name); // Valor inicial seguro baseado no mock
    setSelectedDepartment(turmaPai.departamento);
    setSelectedDiscipline(turmaPai.disciplina);
  }, [turmaPai]);

  const handleTeacherToggle = (teacherId: number) => {
    setSelectedTeachers((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  const handleSubmit = () => {
    console.log({
      parentId: turmaPai?.id,
      periodo: selectedPeriod,
      curso: selectedCourse,
      departamento: selectedDepartment,
      disciplina: selectedDiscipline,
      turma: classNumber,
      horario: schedule,
      vagas: vacancies,
      docentes: selectedTeachers,
    });

    alert("Subturma cadastrada com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-[#E30613]"
            >
              <ArrowLeft size={20} />
              Voltar
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Registrar Subturma
              </h1>
              <p className="text-sm text-gray-500">
                Cadastro de subturma vinculada a uma turma existente
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {turmaPai && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-blue-900 mb-4">
              Turma Pai
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500">Disciplina</p>
                <p className="font-semibold">{turmaPai.disciplina}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Código</p>
                <p className="font-semibold">{turmaPai.codigo}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Docente</p>
                <p className="font-semibold">{turmaPai.docente}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Sala</p>
                <p className="font-semibold">{turmaPai.local || "Não alocada"}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Dados da Subturma</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Curso */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Curso
              </label>
              <select
                disabled
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
              >
                {MOCK_COURSES.map((course) => (
                  <option key={course.id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Período */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Período
              </label>
              <select
                disabled
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
              >
                {MOCK_PERIODS.map((period) => (
                  <option key={period.id} value={period.label}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Departamento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departamento
              </label>
              <select
                disabled
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
              >
                {MOCK_DEPARTMENTS.map((department) => (
                  <option key={department.id} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Disciplina */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disciplina
              </label>
              <select
                disabled
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
              >
                {MOCK_DISCIPLINES.map((discipline) => (
                  <option key={discipline.id} value={discipline.name}>
                    {discipline.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Número da subturma */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número da Subturma
                </label>
                <input
                  type="text"
                  value={classNumber}
                  onChange={(e) => setClassNumber(e.target.value)}
                  placeholder="Ex.: 02"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 outline-none"
                />
              </div>

              {/* Horário */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horário
                </label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="35M34"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 outline-none"
                />
              </div>

              {/* Vagas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade de Alunos
                </label>
                <input
                  type="number"
                  value={vacancies}
                  onChange={(e) => setVacancies(e.target.value)}
                  placeholder="30"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 outline-none"
                />
              </div>
            </div>

            {/* Docentes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Docentes Responsáveis
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_TEACHERS.map((teacher) => {
                  const selected = selectedTeachers.includes(teacher.id);
                  return (
                    <button
                      key={teacher.id}
                      type="button"
                      onClick={() => handleTeacherToggle(teacher.id)}
                      className={`border rounded-xl p-4 text-left transition-all ${
                        selected
                          ? "border-[#E30613] bg-red-50"
                          : "border-gray-200 hover:border-[#E30613]/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {teacher.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {teacher.department}
                          </p>
                        </div>
                        {selected && (
                          <CheckCircle size={20} className="text-[#E30613]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <Link
                href="/"
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancelar
              </Link>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 rounded-lg bg-[#E30613] hover:bg-[#C40010] text-white font-semibold transition flex items-center gap-2"
              >
                <Send size={18} />
                Registrar Subturma
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}