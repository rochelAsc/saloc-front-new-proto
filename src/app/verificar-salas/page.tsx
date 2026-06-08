'use client'

import { useState, useEffect } from 'react'
import { 
  DoorOpen, Building2, Users, Layers, MapPin, 
  Trash2, Plus, Search, X, AlertCircle 
} from 'lucide-react'

// Mock data
const MOCK_ROOMS = [
  { id: 1, number: "101", building: "CCET", block: "A", capacity: 50, floor: "Térreo", sector: "Coordenação CC" },
  { id: 2, number: "102", building: "CCET", block: "A", capacity: 40, floor: "Térreo", sector: "Coordenação CC" },
  { id: 3, number: "103", building: "CCET", block: "A", capacity: 35, floor: "Térreo", sector: "Coordenação CC" },
  { id: 4, number: "201", building: "CCET", block: "B", capacity: 60, floor: "2º Andar", sector: "Coordenação CC" },
  { id: 5, number: "Lab 01", building: "CCET", block: "B", capacity: 30, floor: "1º Andar", sector: "Coordenação CC" },
  { id: 6, number: "Lab 02", building: "CCET", block: "B", capacity: 30, floor: "1º Andar", sector: "Coordenação CC" },
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

export default function VerificarSalas() {
  const [rooms, setRooms] = useState(MOCK_ROOMS)
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [roomToDelete, setRoomToDelete] = useState<any>(null)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    number: '',
    building: '',
    block: '',
    capacity: '',
    floor: '',
    sector: ''
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
    setFormData({
      number: '',
      building: 'CCET',
      block: '',
      capacity: '',
      floor: '',
      sector: 'Coordenação CC'
    })
    setShowForm(true)
  }

  const handleEdit = (room: any) => {
    setIsEditing(true)
    setEditingId(room.id)
    setFormData({
      number: room.number,
      building: room.building,
      block: room.block,
      capacity: room.capacity.toString(),
      floor: room.floor,
      sector: room.sector
    })
    setShowForm(true)
  }

  const handleDeleteClick = (room: any) => {
    setRoomToDelete(room)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    if (roomToDelete) {
      setRooms(rooms.filter(r => r.id !== roomToDelete.id))
      setMessage({ text: `Sala "${roomToDelete.number}" excluída com sucesso!`, type: 'success' })
      setShowDeleteModal(false)
      setRoomToDelete(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      const newRoom = {
        id: isEditing ? editingId! : Math.max(...rooms.map(r => r.id), 0) + 1,
        number: formData.number,
        building: formData.building,
        block: formData.block,
        capacity: Number(formData.capacity),
        floor: formData.floor,
        sector: formData.sector
      }

      if (isEditing) {
        setRooms(rooms.map(r => r.id === editingId ? newRoom : r))
        setMessage({ text: `Sala "${formData.number}" atualizada com sucesso!`, type: 'success' })
      } else {
        setRooms([...rooms, newRoom])
        setMessage({ text: `Sala "${formData.number}" cadastrada com sucesso!`, type: 'success' })
      }

      setShowForm(false)
      setIsLoading(false)
      setFormData({
        number: '',
        building: 'CCET',
        block: '',
        capacity: '',
        floor: '',
        sector: 'Coordenação CC'
      })
    }, 500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Mock de autenticação
  const isAuthenticated = true
  const isAdmin = true

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        
        {/* Título */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-saloc">Gerenciar Salas</h1>
            <p className="text-text-secondary mt-1">Cadastre, edite e gerencie as salas do seu setor</p>
          </div>
          <button
            onClick={handleOpenForm}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-saloc text-white rounded-md text-sm font-medium hover:bg-saloc-light transition-colors focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            Nova Sala
          </button>
        </div>

        {/* Mensagem de feedback */}
        {message && (
          <div className={`mb-4 p-3 rounded-md flex items-center gap-2 text-sm ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message.type === 'success' ? '✓' : <AlertCircle className="h-4 w-4" />}
            {message.text}
          </div>
        )}

        {/* Formulário de cadastro/edição */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-saloc">
                {isEditing ? 'Editar Sala' : 'Nova Sala'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="number" className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                    Número da Sala *
                  </label>
                  <div className="relative">
                    <DoorOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                    <input
                      id="number"
                      name="number"
                      type="text"
                      value={formData.number}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent"
                      placeholder="Ex: 101, Lab 01"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="building" className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                    Prédio *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                    <select
                      id="building"
                      name="building"
                      value={formData.building}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent"
                      required
                    >
                      <option value="CCET">CCET</option>
                      <option value="Paulo Freire">Paulo Freire</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="block" className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                    Bloco *
                  </label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                    <input
                      id="block"
                      name="block"
                      type="text"
                      value={formData.block}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent"
                      placeholder="Ex: A, B, C"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="capacity" className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                    Capacidade *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                    <input
                      id="capacity"
                      name="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent"
                      placeholder="Número de alunos"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="floor" className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                    Piso / Andar *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                    <input
                      id="floor"
                      name="floor"
                      type="text"
                      value={formData.floor}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent"
                      placeholder="Ex: Térreo, 1º Andar"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="sector" className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-1">
                    Setor
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/50" />
                    <input
                      id="sector"
                      name="sector"
                      type="text"
                      value={formData.sector}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent"
                      placeholder="Setor responsável"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
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
                    isEditing ? 'Salvar Alterações' : 'Cadastrar Sala'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Salas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-saloc text-white">
                <tr>
                  <th className="p-3 text-left text-xs font-semibold uppercase">Sala</th>
                  <th className="p-3 text-left text-xs font-semibold uppercase">Prédio</th>
                  <th className="p-3 text-left text-xs font-semibold uppercase hidden sm:table-cell">Bloco</th>
                  <th className="p-3 text-center text-xs font-semibold uppercase">Capacidade</th>
                  <th className="p-3 text-left text-xs font-semibold uppercase hidden md:table-cell">Piso</th>
                  <th className="p-3 text-left text-xs font-semibold uppercase hidden lg:table-cell">Setor</th>
                  <th className="p-3 text-center text-xs font-semibold uppercase">Ações</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-medium">{room.number}</td>
                    <td className="p-3">
                      <Badge variant="info">{room.building}</Badge>
                    </td>
                    <td className="p-3 hidden sm:table-cell">Bloco {room.block}</td>
                    <td className="p-3 text-center">
                      <Badge variant="default">{room.capacity} alunos</Badge>
                    </td>
                    <td className="p-3 hidden md:table-cell text-text-secondary">{room.floor}</td>
                    <td className="p-3 hidden lg:table-cell text-text-secondary text-xs">{room.sector}</td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(room)}
                          className="p-1.5 text-saloc hover:bg-saloc/10 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-focus"
                          title="Editar"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(room)}
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

        {/* Contador de salas */}
        <div className="mt-4 text-right">
          <p className="text-xs text-text-secondary">
            Total de salas: <span className="font-semibold text-saloc">{rooms.length}</span>
          </p>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Confirmar exclusão</h3>
            <p className="text-text-secondary mb-6">
              Tem certeza que deseja excluir a sala <span className="font-semibold text-saloc">"{roomToDelete?.number}"</span>?
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