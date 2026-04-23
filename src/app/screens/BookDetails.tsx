import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Bookmark, Share2, Plus } from 'lucide-react';

export function BookDetails() {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const book = {
    title: 'O Nome do Vento',
    author: 'Patrick Rothfuss',
    series: 'A Crônica do Matador do Rei #1',
    cover: 'from-[#c8a96e] to-[#e8635a]',
    rating: 4.7,
    totalRatings: 2847,
    genres: ['Fantasy', 'Aventura', 'Magia'],
    pages: 672,
    published: '2007',
    description: 'Meu nome é Kvothe. Nomes são importantes, pois dizem muito sobre uma pessoa. Já fui chamado de Kvothe, o Sem-Sangue; Kvothe, o Arcano; e Kvothe, o Matador de Reis. Histórias sobre mim são contadas desde Ademre até Caeldim, e a maioria delas é verdade... a maioria.',
    tropes: ['Chosen One', 'Magic School', 'Frame Story', 'Unreliable Narrator'],
  };

  const emotionBreakdown = [
    { emotion: '❤️ Me apaixonei', percentage: 42, count: 1195 },
    { emotion: '😮 Fui surpreendido', percentage: 28, count: 797 },
    { emotion: '📖 Absorvido', percentage: 20, count: 569 },
    { emotion: '😢 Chorei', percentage: 10, count: 285 },
  ];

  const topReviews = [
    {
      user: { name: 'Ana Silva', avatar: '👩🏻', verified: true },
      rating: 5,
      text: 'Simplesmente perfeito. A prosa de Rothfuss é poesia pura. Kvothe é um dos protagonistas mais complexos que já encontrei na fantasia moderna. A forma como a história é contada, com camadas de narrativa, é magistral.',
      likes: 127,
      comments: 23,
      helpful: 98,
      emotions: ['❤️', '😮', '📖'],
      timeAgo: '2 semanas atrás'
    },
    {
      user: { name: 'Pedro Costa', avatar: '👨🏽', verified: false },
      rating: 4,
      text: 'Um dos melhores livros de fantasia que já li. A construção de mundo é incrível e Kvothe é um personagem fascinante. Minha única crítica é que algumas partes do meio ficam um pouco lentas.',
      likes: 89,
      comments: 15,
      helpful: 76,
      emotions: ['❤️', '😮'],
      timeAgo: '1 mês atrás'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0807] text-white">
      {/* Header */}
      <header className="sticky top-0 bg-[#0a0807]/95 backdrop-blur-sm border-b border-[#c8a96e]/20 px-6 py-4 z-40">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-[#1a1210] flex items-center justify-center">
            <ArrowLeft size={20} className="text-[#c8a96e]" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg line-clamp-1">{book.title}</h1>
            <p className="text-xs text-[#8a7e6e] line-clamp-1">{book.author}</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#1a1210] flex items-center justify-center">
            <Share2 size={20} className="text-[#c8a96e]" />
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-6 pb-24">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex gap-6 mb-6">
            {/* Book Cover */}
            <div className={`w-32 h-48 rounded-xl bg-gradient-to-br ${book.cover} flex-shrink-0 shadow-2xl shadow-[#c8a96e]/20`}></div>

            {/* Quick Info */}
            <div className="flex-1">
              <div className="mb-3">
                <h2 className="text-2xl mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {book.title}
                </h2>
                <p className="text-sm text-[#c8a96e] mb-1">{book.author}</p>
                <p className="text-xs text-[#8a7e6e]">{book.series}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={18} className="fill-[#c8a96e] text-[#c8a96e]" />
                  <span className="text-xl font-bold text-[#c8a96e]">{book.rating}</span>
                </div>
                <span className="text-sm text-[#8a7e6e]">({book.totalRatings.toLocaleString()} avaliações)</span>
              </div>

              {/* Meta Info */}
              <div className="text-xs text-[#8a7e6e] space-y-1">
                <p>{book.pages} páginas · {book.published}</p>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-6">
            {book.genres.map((genre, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#c8a96e]/10 border border-[#c8a96e]/30 rounded-full text-xs text-[#c8a96e]"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-full font-medium flex items-center justify-center gap-2">
              <Plus size={20} />
              Adicionar à estante
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all ${
                isWishlisted
                  ? 'bg-[#e8635a] text-white'
                  : 'border-2 border-[#c8a96e] text-[#c8a96e]'
              }`}
            >
              <Heart size={20} className={isWishlisted ? 'fill-white' : ''} />
              {isWishlisted ? 'Na lista' : 'Salvar'}
            </button>
          </div>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h3 className="text-lg mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Sinopse
          </h3>
          <p className="text-sm text-[#e8d4a8]/90 leading-relaxed">
            {book.description}
          </p>
        </section>

        {/* Tropes */}
        <section className="mb-8">
          <h3 className="text-lg mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Tropes
          </h3>
          <div className="flex flex-wrap gap-2">
            {book.tropes.map((trope, i) => (
              <button
                key={i}
                className="px-4 py-2 bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-full text-xs hover:border-[#c8a96e] hover:bg-[#c8a96e]/10 transition-all"
              >
                {trope}
              </button>
            ))}
          </div>
        </section>

        {/* Emotion Breakdown */}
        <section className="mb-8">
          <h3 className="text-lg mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Como os leitores se sentiram
          </h3>
          <div className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl p-6 space-y-3">
            {emotionBreakdown.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-[#e8d4a8]">{item.emotion}</span>
                  <span className="text-[#8a7e6e]">{item.count} pessoas</span>
                </div>
                <div className="h-2 bg-[#8a7e6e]/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
              Reviews em destaque
            </h3>
            <button className="text-sm text-[#c8a96e]">Ver todas</button>
          </div>

          <div className="space-y-4">
            {topReviews.map((review, i) => (
              <div
                key={i}
                className="bg-[#1a1210]/50 border border-[#c8a96e]/20 rounded-2xl p-4"
              >
                {/* User Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c8a96e] to-[#e8d4a8] flex items-center justify-center text-xl">
                    {review.user.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">{review.user.name}</h4>
                      {review.user.verified && (
                        <span className="text-xs">✓</span>
                      )}
                    </div>
                    <p className="text-xs text-[#8a7e6e]">{review.timeAgo}</p>
                  </div>
                </div>

                {/* Rating & Emotions */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className={j < review.rating ? 'fill-[#c8a96e] text-[#c8a96e]' : 'text-[#8a7e6e]/30'}
                      />
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {review.emotions.map((emoji, j) => (
                      <span key={j} className="text-sm">{emoji}</span>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#e8d4a8]/90 leading-relaxed mb-3">
                  {review.text}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-4 text-xs text-[#8a7e6e]">
                  <button className="flex items-center gap-1 hover:text-[#e8635a] transition-colors">
                    <Heart size={14} />
                    {review.likes}
                  </button>
                  <span>{review.helpful}% acharam útil</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA to Review */}
        <div className="mt-8 bg-gradient-to-br from-[#1a1210] to-[#2a1f1a] border border-[#c8a96e]/20 rounded-2xl p-6 text-center">
          <p className="text-sm text-[#8a7e6e] mb-4">Já leu este livro?</p>
          <button className="px-8 py-3 bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8] text-[#1a1210] rounded-full font-medium">
            Escrever uma review
          </button>
        </div>
      </div>
    </div>
  );
}
