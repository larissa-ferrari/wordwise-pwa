import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Sparkles, Heart, Zap } from 'lucide-react';

export function Discover() {
  const [activeFilter, setActiveFilter] = useState<string>('trending');

  const moods = [
    { id: 'escape', label: 'Escapismo', icon: '🌙', color: '#b87cde' },
    { id: 'learn', label: 'Aprender', icon: '🧠', color: '#6a9fcf' },
    { id: 'cry', label: 'Chorar', icon: '💔', color: '#e8635a' },
    { id: 'laugh', label: 'Rir', icon: '😄', color: '#c8a96e' },
    { id: 'thrill', label: 'Adrenalina', icon: '⚡', color: '#7c9e7a' },
  ];

  const tropes = [
    'Enemies to Lovers',
    'Chosen One',
    'Slow Burn',
    'Found Family',
    'Redemption Arc',
    'Unreliable Narrator',
    'Time Travel',
    'Second Chance',
  ];

  const trendingBooks = [
    { title: 'Fourth Wing', author: 'Rebecca Yarros', genre: 'Fantasy Romance', cover: 'from-[#e8635a] to-[#b87cde]' },
    { title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', genre: 'Ficção Literária', cover: 'from-[#6a9fcf] to-[#c8a96e]' },
    { title: 'The Housemaid', author: 'Freida McFadden', genre: 'Thriller', cover: 'from-[#1a1210] to-[#e8635a]' },
    { title: 'A Hundred Years of Solitude', author: 'Gabriel García Márquez', genre: 'Realismo Mágico', cover: 'from-[#7c9e7a] to-[#c8a96e]' },
    { title: 'Project Hail Mary', author: 'Andy Weir', genre: 'Sci-Fi', cover: 'from-[#6a9fcf] to-[#b87cde]' },
    { title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', genre: 'Drama', cover: 'from-[#c8a96e] to-[#e8635a]' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0807] text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-6 py-4 z-40">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Descobrir
          </h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7e6e]" size={20} />
            <input
              type="text"
              placeholder="Buscar por título, autor, mood, trope..."
              className="w-full bg-[#1a1210] border border-[#c8a96e]/20 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#c8a96e] transition-colors"
            />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          <button
            onClick={() => setActiveFilter('trending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'trending'
                ? 'bg-[#c8a96e] text-[#1a1210]'
                : 'bg-[#1a1210]/50 border border-[#c8a96e]/20 text-[#8a7e6e]'
            }`}
          >
            <TrendingUp size={16} />
            <span className="text-sm font-medium">Em alta</span>
          </button>
          <button
            onClick={() => setActiveFilter('mood')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'mood'
                ? 'bg-[#c8a96e] text-[#1a1210]'
                : 'bg-[#1a1210]/50 border border-[#c8a96e]/20 text-[#8a7e6e]'
            }`}
          >
            <Sparkles size={16} />
            <span className="text-sm font-medium">Por Mood</span>
          </button>
          <button
            onClick={() => setActiveFilter('tropes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'tropes'
                ? 'bg-[#c8a96e] text-[#1a1210]'
                : 'bg-[#1a1210]/50 border border-[#c8a96e]/20 text-[#8a7e6e]'
            }`}
          >
            <Heart size={16} />
            <span className="text-sm font-medium">Por Trope</span>
          </button>
          <button
            onClick={() => setActiveFilter('curated')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'curated'
                ? 'bg-[#c8a96e] text-[#1a1210]'
                : 'bg-[#1a1210]/50 border border-[#c8a96e]/20 text-[#8a7e6e]'
            }`}
          >
            <Zap size={16} />
            <span className="text-sm font-medium">Listas Curadas</span>
          </button>
        </div>

        {/* Mood Filter */}
        {activeFilter === 'mood' && (
          <div className="mb-6">
            <h2 className="text-sm text-[#8a7e6e] uppercase tracking-wider mb-3">Como você quer se sentir?</h2>
            <div className="grid grid-cols-2 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  className="p-4 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl hover:border-[#c8a96e]/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${mood.color}20` }}
                    >
                      {mood.icon}
                    </div>
                    <span className="text-sm font-medium">{mood.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tropes Filter */}
        {activeFilter === 'tropes' && (
          <div className="mb-6">
            <h2 className="text-sm text-[#8a7e6e] uppercase tracking-wider mb-3">Escolha seu trope favorito</h2>
            <div className="flex flex-wrap gap-2">
              {tropes.map((trope) => (
                <button
                  key={trope}
                  className="px-4 py-2 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-full text-sm hover:border-[#c8a96e] hover:bg-[#c8a96e]/10 transition-all"
                >
                  {trope}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending Books Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
              {activeFilter === 'trending' ? 'Livros em alta' :
               activeFilter === 'mood' ? 'Baseado no seu mood' :
               activeFilter === 'tropes' ? 'Para você' : 'Listas populares'}
            </h2>
            <button className="text-sm text-[#c8a96e]">Ver todos</button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {trendingBooks.map((book, index) => (
              <button key={index} className="text-left">
                <div className={`w-full aspect-[2/3] rounded-lg bg-gradient-to-br ${book.cover} mb-2 hover:scale-105 transition-transform`}></div>
                <h3 className="text-xs line-clamp-2 mb-1">{book.title}</h3>
                <p className="text-[10px] text-[#8a7e6e] line-clamp-1">{book.author}</p>
              </button>
            ))}
          </div>

          {/* Curated Lists */}
          <div>
            <h2 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Listas Curadas
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Dark Academia Essentials', count: 24, curator: 'WordWise' },
                { name: 'Thrillers Psicológicos', count: 18, curator: '@ana_reads' },
                { name: 'Fantasia com Romances Lentos', count: 31, curator: '@pedro_lit' },
              ].map((list, i) => (
                <button
                  key={i}
                  className="w-full p-4 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-xl hover:border-[#c8a96e]/40 transition-all text-left"
                >
                  <h3 className="text-sm font-medium mb-1">{list.name}</h3>
                  <p className="text-xs text-[#8a7e6e]">
                    {list.count} livros · por {list.curator}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
