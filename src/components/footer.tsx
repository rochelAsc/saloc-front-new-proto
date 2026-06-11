'use client'

import { Building2, GraduationCap, Heart, Github, Mail, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-saloc text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo e descrição */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-6 w-6 text-saloc-pastel" />
              <h3 className="text-lg font-bold uppercase tracking-wide">SALOC</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Sistema de Alocação de Salas desenvolvido para otimizar e automatizar a distribuição de turmas na UFMA.
            </p>
          </div>

          {/* Links úteis */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Links Úteis
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="https://www.ufma.br" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  UFMA
                </a>
              </li>
              <li>
                <a href="https://sigaa.ufma.br" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  SIGAA
                </a>
              </li>
              <li>
                <a href="/home" className="hover:text-white transition-colors">
                  Página Inicial
                </a>
              </li>
              <li>
                <a href="/mapa-salas" className="hover:text-white transition-colors">
                  Mapa de Salas
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contato
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <a href="mailto:saloc@ufma.br" className="hover:text-white transition-colors">
                  saloc@ufma.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span>São Luís - MA, Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-white/20 my-6"></div>

        {/* Copyright e créditos */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>
            © {currentYear} Agência de Tecnologia da Informação. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1">
            Desenvolvido por NCA/UFMA
          </p>
        </div>
      </div>
    </footer>
  )
}