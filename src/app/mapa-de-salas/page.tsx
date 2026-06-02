'use client'

import { useState, useEffect } from 'react'
import { Search, Download, Building2, Users, Calendar } from 'lucide-react'

// Mock data para teste
const MOCK_ROOMS = [
  { id: 1, name: "Sala 101 - CCET" },
  { id: 2, name: "Sala 102 - CCET" },
  { id: 3, name: "Lab 01 - CCET" },
  { id: 4, name: "Lab 02 - CCET" },
]

const MOCK_PERIODS = [
  { id: 1, period: "2024.1" },
  { id: 2, period: "2024.2" },
  { id: 3, period: "2025.1" },
]

// Mock de alocações para o mapa
const MOCK_ALLOCATIONS = [
  { room: { id: 1, number: "101", building: "CCET", block: "A", capacity: 50, floor: "Térreo" }, name: "Algoritmos", schedule: "24M12" },
  { room: { id: 1, number: "101", building: "CCET", block: "A", capacity: 50, floor: "Térreo" }, name: "Estrutura de Dados", schedule: "35T34" },
  { room: { id: 2, number: "102", building: "CCET", block: "A", capacity: 40, floor: "Térreo" }, name: "Cálculo I", schedule: "24M12" },
  { room: { id: 3, number: "Lab 01", building: "CCET", block: "B", capacity: 30, floor: "1º" }, name: "Programação", schedule: "4M12" },
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

function parseSchedule(schedule: string) {
  const regex = /(\d+)([MTN])(\d+)/g
  const results: Array<{ days: string[]; timeSlots: number[]; shift: string }> = []
  let match
  while ((match = regex.exec(schedule)) !== null) {
    const days = match[1].split('')
    const timeSlots = match[3].split('').map(Number)
    const shift = match[2]
    results.push({ days, timeSlots, shift })
  }
  return results
}

function findDiscipline(allocation: any[], day: string, timeSlot: string, shift: string) {
  for (const item of allocation) {
    const schedule = item.schedule
    const results = parseSchedule(schedule)
    for (const result of results) {
      if (
        result.days.includes(day) &&
        result.shift === shift &&
        result.timeSlots.includes(Number(timeSlot))
      ) {
        return item.name
      }
    }
  }
  return ''
}

export default function MapaSalas() {
  const [roomId, setRoomId] = useState<number | null>(null)
  const [periodId, setPeriodId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [tableData, setTableData] = useState<any[]>([])
  const [selectedRoom, setSelectedRoom] = useState<any>(null)

  const dias = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']
  const dayNumbers = ['2', '3', '4', '5', '6', '7']

  const horarios = [
    { start: "07:30", end: "08:20", turno: "M", slot: "1" },
    { start: "08:20", end: "09:10", turno: "M", slot: "2" },
    { start: "09:20", end: "10:10", turno: "M", slot: "3" },
    { start: "10:10", end: "11:00", turno: "M", slot: "4" },
    { start: "11:10", end: "12:00", turno: "M", slot: "5" },
    { start: "12:00", end: "12:50", turno: "M", slot: "6" },
    { start: "13:10", end: "14:00", turno: "T", slot: "1" },
    { start: "14:00", end: "14:50", turno: "T", slot: "2" },
    { start: "14:50", end: "15:40", turno: "T", slot: "3" },
    { start: "15:50", end: "16:40", turno: "T", slot: "4" },
    { start: "16:40", end: "17:30", turno: "T", slot: "5" },
    { start: "17:40", end: "18:30", turno: "T", slot: "6" },
    { start: "18:30", end: "19:20", turno: "N", slot: "1" },
    { start: "19:20", end: "20:10", turno: "N", slot: "2" },
    { start: "20:20", end: "21:10", turno: "N", slot: "3" },
    { start: "21:10", end: "22:00", turno: "N", slot: "4" },
  ]

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!roomId || !periodId) return

    setIsLoading(true)
    setTimeout(() => {
      const room = MOCK_ROOMS.find(r => r.id === roomId)
      setSelectedRoom(room)
      setTableData(MOCK_ALLOCATIONS)
      setIsLoading(false)
    }, 500)
  }

  const handleGenerateReport = () => {
    if (tableData.length === 0) return
    alert('Funcionalidade de relatório será implementada em breve')
  }

  // Mock de autenticação
  const isAuthenticated = true

  return (
    <main className="min-h-screen bg-white font-sans text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        
        {/* Título */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-saloc">Mapa de Sala</h1>
          <p className="text-text-secondary mt-1">Visualize a ocupação das salas por horário e dia da semana</p>
        </div>

        {/* Card de filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label htmlFor="sala" className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  Sala <span className="text-danger">*</span>
                </label>
                <select
                  id="sala"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                  value={roomId || ''}
                  onChange={(e) => setRoomId(Number(e.target.value))}
                  required
                >
                  <option value="" disabled>Selecione a sala</option>
                  {MOCK_ROOMS.map((room) => (
                    <option key={room.id} value={room.id}>{room.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="periodo" className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  Período <span className="text-danger">*</span>
                </label>
                <select
                  id="periodo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                  value={periodId || ''}
                  onChange={(e) => setPeriodId(Number(e.target.value))}
                  required
                >
                  <option value="" disabled>Selecione o período</option>
                  {MOCK_PERIODS.map((period) => (
                    <option key={period.id} value={period.id}>{period.period}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 disabled:opacity-50 w-full sm:w-auto"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  Pesquisar
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Informações da Sala */}
        {selectedRoom && tableData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-text-secondary text-xs uppercase font-semibold mb-2">
                <Building2 className="h-4 w-4" />
                Bloco
              </div>
              <div className="text-xl font-bold text-saloc">{selectedRoom.name.split(' - ')[0]}</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-text-secondary text-xs uppercase font-semibold mb-2">
                <Building2 className="h-4 w-4" />
                Andar / Piso
              </div>
              <div className="text-xl font-bold text-saloc">Térreo</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-text-secondary text-xs uppercase font-semibold mb-2">
                <Users className="h-4 w-4" />
                Capacidade
              </div>
              <div className="text-xl font-bold text-saloc">50 discentes</div>
            </div>
          </div>
        )}

        {/* Tabela de Horários */}
        {tableData.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Calendar className="h-12 w-12 text-text-secondary/30 mx-auto mb-4" />
            <p className="text-text-secondary">Selecione uma sala e um período para visualizar o mapa de ocupação.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-saloc text-white">
                  <tr>
                    <th className="p-3 text-left text-xs font-semibold uppercase whitespace-nowrap">Horário</th>
                    {dias.map((dia, idx) => (
                      <th key={idx} className="p-3 text-left text-xs font-semibold uppercase whitespace-nowrap">
                        {dia}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {horarios.map((horario, idx) => {
                    const timeRange = `${horario.start} - ${horario.end}`
                    return (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3 font-mono text-xs whitespace-nowrap">{timeRange}</td>
                        {dias.map((_, diaIdx) => {
                          const disciplina = findDiscipline(
                            tableData,
                            dayNumbers[diaIdx],
                            horario.slot,
                            horario.turno
                          )
                          return (
                            <td key={diaIdx} className="p-3">
                              {disciplina ? (
                                <Badge variant="info">{disciplina}</Badge>
                              ) : (
                                <span className="text-text-secondary/40 text-xs">—</span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Botão de relatório (apenas quando há dados) */}
        {tableData.length > 0 && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleGenerateReport}
              className="inline-flex items-center gap-2 px-4 py-2 border border-saloc text-saloc bg-white rounded-md text-sm font-medium hover:bg-saloc hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <Download className="h-4 w-4" />
              Baixar Relatório
            </button>
          </div>
        )}
      </div>
    </main>
  )
}