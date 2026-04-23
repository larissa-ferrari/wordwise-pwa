import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function BrandGuide() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0a0807] text-white">
      {/* Header */}
      <header className="sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-6 py-4 z-40">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#1a1210] flex items-center justify-center">
            <ArrowLeft size={20} className="text-[#c8a96e]" />
          </button>
          <h1 className="text-lg">Identidade Visual</h1>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a0807] via-[#1a1210] to-[#2a1f1a] px-6 py-16">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#c8a96e]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#e8635a]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto">
          {/* Logo & Wordmark */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative mb-6">
              {/* Logo Icon */}
              <div className="w-24 h-24 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Book Pages */}
                  <path
                    d="M30 20 L30 80 L50 75 L50 15 Z"
                    fill="#c8a96e"
                    opacity="0.9"
                  />
                  <path
                    d="M50 15 L50 75 L70 80 L70 20 Z"
                    fill="#e8d4a8"
                    opacity="0.8"
                  />
                  {/* W Letter Integration */}
                  <path
                    d="M35 35 L40 55 L45 40 L50 55 L55 35"
                    stroke="#1a1210"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Accent Line */}
                  <line
                    x1="30"
                    y1="50"
                    x2="70"
                    y2="50"
                    stroke="#e8635a"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                </svg>
              </div>
            </div>

            {/* Wordmark */}
            <div className="text-center">
              <h1 className="font-serif text-5xl tracking-wider mb-2" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.1em' }}>
                <span className="text-[#c8a96e]">Word</span>
                <span className="text-[#e8d4a8]">Wise</span>
              </h1>
              <p className="text-sm tracking-[0.3em] text-[#8a7e6e] uppercase">Your Literary Identity</p>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center mb-16">
            <p className="text-xl text-[#c8a96e]/80 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
              "Where every page you turn becomes part of your story"
            </p>
          </div>
        </div>
      </div>

      {/* Visual Identity Guide */}
      <div className="max-w-6xl mx-auto px-6 py-16 pb-24">
        <h2 className="text-3xl mb-8 text-[#c8a96e]" style={{ fontFamily: 'Playfair Display, serif' }}>Identidade Visual</h2>

        {/* Color Palette */}
        <section className="mb-16">
          <h3 className="text-xl mb-6 text-[#e8d4a8]">Paleta de Cores</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <ColorSwatch
              name="Ink Black"
              hex="#0a0807"
              usage="Background principal"
              color="#0a0807"
            />
            <ColorSwatch
              name="Deep Espresso"
              hex="#1a1210"
              usage="Superfícies elevadas"
              color="#1a1210"
            />
            <ColorSwatch
              name="Antique Gold"
              hex="#c8a96e"
              usage="Acentos primários"
              color="#c8a96e"
            />
            <ColorSwatch
              name="Parchment"
              hex="#e8d4a8"
              usage="Destaques suaves"
              color="#e8d4a8"
            />
            <ColorSwatch
              name="Literary Coral"
              hex="#e8635a"
              usage="Call-to-actions"
              color="#e8635a"
            />
            <ColorSwatch
              name="Sage Wisdom"
              hex="#7c9e7a"
              usage="Status positivo"
              color="#7c9e7a"
            />
            <ColorSwatch
              name="Midnight Blue"
              hex="#6a9fcf"
              usage="Links e info"
              color="#6a9fcf"
            />
            <ColorSwatch
              name="Violet Prose"
              hex="#b87cde"
              usage="Premium features"
              color="#b87cde"
            />
            <ColorSwatch
              name="Ash Gray"
              hex="#8a7e6e"
              usage="Texto secundário"
              color="#8a7e6e"
            />
            <ColorSwatch
              name="Cream"
              hex="#f5f0e8"
              usage="Modo claro"
              color="#f5f0e8"
            />
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h3 className="text-xl mb-6 text-[#e8d4a8]">Tipografia</h3>
          <div className="space-y-6">
            <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl p-8">
              <p className="text-xs text-[#8a7e6e] uppercase tracking-wider mb-3">Display / Títulos</p>
              <p className="text-5xl mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Playfair Display</p>
              <p className="text-sm text-[#8a7e6e]">Títulos de livros, headers de seções, citações literárias</p>
              <div className="mt-4 flex gap-4 text-xs text-[#c8a96e]">
                <span>Regular 400</span>
                <span>Semibold 600</span>
                <span>Bold 700</span>
              </div>
            </div>

            <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl p-8">
              <p className="text-xs text-[#8a7e6e] uppercase tracking-wider mb-3">Corpo / Interface</p>
              <p className="text-3xl mb-3">DM Sans — Clean & Modern</p>
              <p className="text-sm text-[#8a7e6e]">Reviews, descrições, navegação, UI elements</p>
              <div className="mt-4 flex gap-4 text-xs text-[#c8a96e]">
                <span>Light 300</span>
                <span>Regular 400</span>
                <span>Medium 500</span>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Variations */}
        <section className="mb-16">
          <h3 className="text-xl mb-6 text-[#e8d4a8]">Variações do Logo</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Full Logo */}
            <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl p-8 flex flex-col items-center">
              <div className="w-16 h-16 mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M30 20 L30 80 L50 75 L50 15 Z" fill="#c8a96e" opacity="0.9" />
                  <path d="M50 15 L50 75 L70 80 L70 20 Z" fill="#e8d4a8" opacity="0.8" />
                  <path d="M35 35 L40 55 L45 40 L50 55 L55 35" stroke="#1a1210" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="30" y1="50" x2="70" y2="50" stroke="#e8635a" strokeWidth="1" opacity="0.6" />
                </svg>
              </div>
              <p className="text-sm text-[#8a7e6e]">Logo Principal</p>
              <p className="text-xs text-[#8a7e6e]/60 mt-1">Com wordmark</p>
            </div>

            {/* Icon Only */}
            <div className="bg-[#0a0807] border border-[#c8a96e]/20 rounded-2xl p-8 flex flex-col items-center">
              <div className="w-16 h-16 mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M30 20 L30 80 L50 75 L50 15 Z" fill="#c8a96e" opacity="0.9" />
                  <path d="M50 15 L50 75 L70 80 L70 20 Z" fill="#e8d4a8" opacity="0.8" />
                  <path d="M35 35 L40 55 L45 40 L50 55 L55 35" stroke="#1a1210" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="30" y1="50" x2="70" y2="50" stroke="#e8635a" strokeWidth="1" opacity="0.6" />
                </svg>
              </div>
              <p className="text-sm text-[#8a7e6e]">Ícone App</p>
              <p className="text-xs text-[#8a7e6e]/60 mt-1">Fundo escuro</p>
            </div>

            {/* Light Mode */}
            <div className="bg-[#f5f0e8] border border-[#c8a96e]/40 rounded-2xl p-8 flex flex-col items-center">
              <div className="w-16 h-16 mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M30 20 L30 80 L50 75 L50 15 Z" fill="#c8a96e" opacity="0.9" />
                  <path d="M50 15 L50 75 L70 80 L70 20 Z" fill="#b89960" opacity="0.8" />
                  <path d="M35 35 L40 55 L45 40 L50 55 L55 35" stroke="#1a1210" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="30" y1="50" x2="70" y2="50" stroke="#e8635a" strokeWidth="1" opacity="0.6" />
                </svg>
              </div>
              <p className="text-sm text-[#1a1210]">Modo Claro</p>
              <p className="text-xs text-[#1a1210]/60 mt-1">Fundo parchment</p>
            </div>
          </div>
        </section>

        {/* Visual Elements */}
        <section className="mb-16">
          <h3 className="text-xl mb-6 text-[#e8d4a8]">Elementos Visuais</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card Example */}
            <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-16 bg-gradient-to-br from-[#c8a96e] to-[#e8635a] rounded"></div>
                <div className="flex-1">
                  <h4 className="text-sm mb-1">Card de Livro</h4>
                  <p className="text-xs text-[#8a7e6e]">Bordas arredondadas suaves (12-16px)</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-[#c8a96e]/20 rounded-full w-3/4"></div>
                <div className="h-2 bg-[#c8a96e]/10 rounded-full w-1/2"></div>
              </div>
            </div>

            {/* Button Styles */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] py-3 px-6 rounded-full font-medium transition-transform hover:scale-105">
                Primary Button
              </button>
              <button className="w-full border-2 border-[#c8a96e] text-[#c8a96e] py-3 px-6 rounded-full font-medium transition-colors hover:bg-[#c8a96e]/10">
                Secondary Button
              </button>
              <button className="w-full bg-[#e8635a] text-white py-3 px-6 rounded-full font-medium transition-opacity hover:opacity-90">
                Accent Button
              </button>
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section>
          <h3 className="text-xl mb-6 text-[#e8d4a8]">Princípios de Design</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PrincipleCard
              icon="📖"
              title="Literary First"
              description="As capas dos livros são protagonistas. O design serve ao conteúdo."
            />
            <PrincipleCard
              icon="✨"
              title="Elegância Moderna"
              description="Dark Academia atualizado com gradientes suaves e animações refinadas."
            />
            <PrincipleCard
              icon="🎨"
              title="Personalização"
              description="Cada usuário pode escolher sua estética: Dark, Light, Sepia, Contrast."
            />
            <PrincipleCard
              icon="🌙"
              title="Dark-First Design"
              description="Otimizado para leitura noturna com contraste confortável."
            />
            <PrincipleCard
              icon="⚡"
              title="Micro-interactions"
              description="Feedbacks sutis: page-turn animations, bookmark saves, like pulses."
            />
            <PrincipleCard
              icon="🔍"
              title="Hierarquia Clara"
              description="Tipografia expressiva com níveis de informação bem definidos."
            />
          </div>
        </section>

        {/* Brand Voice */}
        <section className="mt-16">
          <h3 className="text-xl mb-6 text-[#e8d4a8]">Tom de Voz</h3>
          <div className="bg-gradient-to-br from-[#1a1210] to-[#2a1f1a] border border-[#c8a96e]/20 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-[#c8a96e] mb-3 flex items-center gap-2">
                  <span className="text-xl">✓</span> Somos
                </h4>
                <ul className="space-y-2 text-sm text-[#8a7e6e]">
                  <li>• Apaixonados por literatura</li>
                  <li>• Acolhedores e inclusivos</li>
                  <li>• Curiosos e inspiradores</li>
                  <li>• Autênticos e pessoais</li>
                  <li>• Sofisticados sem ser pretenciosos</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#e8635a] mb-3 flex items-center gap-2">
                  <span className="text-xl">✗</span> Não somos
                </h4>
                <ul className="space-y-2 text-sm text-[#8a7e6e]">
                  <li>• Corporativos ou formais demais</li>
                  <li>• Infantis ou caricatos</li>
                  <li>• Elitistas ou excludentes</li>
                  <li>• Genéricos como outros apps</li>
                  <li>• Frios ou impessoais</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ColorSwatch({ name, hex, usage, color }: { name: string; hex: string; usage: string; color: string }) {
  const isLight = ['#f5f0e8', '#e8d4a8'].includes(color);

  return (
    <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-4">
      <div
        className="w-full h-20 rounded-lg mb-3 flex items-center justify-center text-xs font-medium"
        style={{
          backgroundColor: color,
          color: isLight ? '#1a1210' : '#f5f0e8'
        }}
      >
        {hex}
      </div>
      <p className="text-sm mb-1">{name}</p>
      <p className="text-xs text-[#8a7e6e]">{usage}</p>
    </div>
  );
}

function PrincipleCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl p-6 hover:border-[#c8a96e]/40 transition-colors">
      <div className="text-2xl mb-3">{icon}</div>
      <h4 className="text-sm mb-2 text-[#c8a96e]">{title}</h4>
      <p className="text-xs text-[#8a7e6e] leading-relaxed">{description}</p>
    </div>
  );
}
