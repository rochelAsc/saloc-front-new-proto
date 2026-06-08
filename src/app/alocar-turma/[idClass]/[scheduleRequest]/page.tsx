'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  Calendar, Clock, DoorOpen, CheckCircle, AlertCircle, 
  ArrowLeft, Trash2, X, Users, User
} from 'lucide-react'

// Mock data
const MOCK_CLASS_INFO = {
  id: "1",
  period: { year: 2025, semester: 1 },
  discipline: { 
    name: "Algoritmos e Estruturas de Dados", 
    code: "CC0001", 
    period: "3°", 
    departament: "DCOMP" 
  },
  course: { name: "Ciência da Computação" },
  numberOfStudents: 40,
  classSchedule: "24M12",
  teachers: [
    { id: 1, name: "Prof. João Silva" }
  ]
}

const MOCK_SCHEDULES = [
  { id: 1, schedule: "24M12", schedule_complet: true, type: "schedule" },
  { id: 2, schedule: "2M1", schedule_complet: false, type: "schedule" },
  { id: 3, schedule: "4M2", schedule_complet: false, type: "schedule" },
]

const MOCK_ROOMS = [
  { id: 1, number: "101", building: "CCET", block: "A", capacity: 50, floor: "Térreo", sector: "Coordenação CC" },
  { id: 2, number: "102", building: "CCET", block: "A", capacity: 40, floor: "Térreo", sector: "Coordenação CC" },
  { id: 3, number: "Lab 01", building: "CCET", block: "B", capacity: 30, floor: "1º Andar", sector: "Coordenação CC" },
]

const MOCK_ALLOCATIONS = [
  { 
    id: 1, 
    schedule: "24M12", 
    room: { id: 1, number: "101", building: "CCET", block: "A", capacity: 50, sector: "Coordenação CC" },
    name: "Algoritmos"
  }
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

function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  title: string; 
  message: string;
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-text-secondary mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-text-secondary rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-danger text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AlocarTurma() {
  const router = useRouter()
  const params = useParams()
  const classId = params?.idClass as string || "1"
  const scheduleRequest = params?.scheduleRequest as string || "24M12"

  const [classInfo, setClassInfo] = useState(MOCK_CLASS_INFO)
  const [schedules, setSchedules] = useState(MOCK_SCHEDULES)
  const [selectedSchedule, setSelectedSchedule] = useState("")
  const [rooms, setRooms] = useState<typeof MOCK_ROOMS>([])
  const [selectedRoom, setSelectedRoom] = useState("")
  const [allocations, setAllocations] = useState(MOCK_ALLOCATIONS)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingRooms, setIsLoadingRooms] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [allocationToDelete, setAllocationToDelete] = useState<typeof MOCK_ALLOCATIONS[0] | null>(null)

  // Auto-clear message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  // Carregar salas quando selecionar um horário
  useEffect(() => {
    if (selectedSchedule) {
      setIsLoadingRooms(true)
      setTimeout(() => {
        setRooms(MOCK_ROOMS)
        setIsLoadingRooms(false)
      }, 500)
    } else {
      setRooms([])
    }
  }, [selectedSchedule])

  const handleScheduleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchedule(e.target.value)
    setSelectedRoom("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedSchedule || !selectedRoom) {
      setMessage({ text: 'Selecione um horário e uma sala para alocar.', type: 'error' })
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const room = MOCK_ROOMS.find(r => r.id === Number(selectedRoom))
      const newAllocation = {
        id: allocations.length + 1,
        schedule: selectedSchedule,
        room: room!,
        name: classInfo.discipline.name
      }
      
      setAllocations([...allocations, newAllocation])
      setMessage({ text: 'Turma alocada com sucesso!', type: 'success' })
      setSelectedSchedule("")
      setSelectedRoom("")
      setRooms([])
      setIsLoading(false)
    }, 800)
  }

  const handleDeleteClick = (allocation: typeof MOCK_ALLOCATIONS[0]) => {
    setAllocationToDelete(allocation)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    if (allocationToDelete) {
      setAllocations(allocations.filter(a => a.id !== allocationToDelete.id))
      setMessage({ text: 'Alocação removida com sucesso!', type: 'success' })
      setShowDeleteModal(false)
      setAllocationToDelete(null)
    }
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

        {/* Título */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-saloc">Alocar Turma</h1>
          <p className="text-text-secondary mt-1">Selecione um horário e uma sala disponível para alocar esta turma</p>
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

        {/* Informações da Turma */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <h2 className="text-sm font-semibold text-saloc uppercase tracking-wide mb-4">Informações da Turma</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-text-secondary w-24">Código:</span>
                <span className="font-mono text-xs">{classInfo.discipline.code}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-text-secondary w-24">Curso:</span>
                <span>{classInfo.course.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-text-secondary w-24">Departamento:</span>
                <span>{classInfo.discipline.departament}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-text-secondary w-24">Disciplina:</span>
                <span>{classInfo.discipline.name}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-text-secondary" />
                <span className="font-semibold text-text-secondary">Período:</span>
                <span>{classInfo.period.year}.{classInfo.period.semester}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-text-secondary" />
                <span className="font-semibold text-text-secondary">Docente(s):</span>
                <span>{classInfo.teachers.map(t => t.name).join(' / ')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-text-secondary" />
                <span className="font-semibold text-text-secondary">Horário:</span>
                <span className="font-mono text-xs">{classInfo.classSchedule}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-text-secondary" />
                <span className="font-semibold text-text-secondary">Alunos:</span>
                <span>{classInfo.numberOfStudents}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário de Alocação */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <h2 className="text-sm font-semibold text-saloc uppercase tracking-wide mb-4">Nova Alocação</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label htmlFor="schedule" className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  Horário <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                  <select
                    id="schedule"
                    value={selectedSchedule}
                    onChange={handleScheduleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus"
                    required
                  >
                    <option value="">Selecione um horário</option>
                    {schedules.map((s) => (
                      <option key={s.id} value={s.schedule}>
                        {s.schedule} {s.schedule_complet && '(Horário completo)'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="room" className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                  Sala <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <DoorOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                  <select
                    id="room"
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus disabled:bg-gray-100"
                    disabled={isLoadingRooms || rooms.length === 0}
                    required
                  >
                    <option value="">{isLoadingRooms ? 'Carregando...' : 'Selecione uma sala'}</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.number} - {room.building} - {room.building === 'CCET' ? `B${room.block}` : room.block} - {room.capacity} lugares
                      </option>
                    ))}
                  </select>
                </div>
                {!isLoadingRooms && selectedSchedule && rooms.length === 0 && (
                  <p className="text-xs text-warning mt-1">Nenhuma sala disponível para este horário.</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !selectedSchedule || !selectedRoom}
                className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                Alocar Turma
              </button>
            </div>
          </form>
        </div>

        {/* Alocações Existentes */}
        {allocations.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b bg-gray-50">
              <h2 className="text-sm font-semibold text-saloc uppercase tracking-wide">Alocações Existentes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-saloc text-white">
                  <tr>
                    <th className="p-3 text-left text-xs font-semibold uppercase">Horário</th>
                    <th className="p-3 text-left text-xs font-semibold uppercase">Sala</th>
                    <th className="p-3 text-center text-xs font-semibold uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((allocation) => (
                    <tr key={allocation.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-mono text-xs">{allocation.schedule}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <DoorOpen className="h-4 w-4 text-saloc" />
                          <span>
                            {allocation.room.number} - {allocation.room.building}
                            {allocation.room.building === 'CCET' && allocation.room.block && ` - B${allocation.room.block}`}
                          </span>
                          <Badge variant="info">{allocation.room.capacity} lugares</Badge>
                        </div>
                       </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleDeleteClick(allocation)}
                          className="p-1.5 text-danger hover:bg-red-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-focus"
                          title="Remover alocação"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal de confirmação de exclusão */}
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          title="Remover Alocação"
          message="Tem certeza que deseja remover esta alocação de sala?"
        />
      </div>
    </main>
  )
}