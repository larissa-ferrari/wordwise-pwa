export interface Comment {
  id: string
  authorName: string
  authorUsername: string
  content: string
  createdAt: string
  level: 'story' | 'chapter' | 'line'
  storyId: string
  chapterNumber?: number
  lineIndex?: number
  likes: number
  isLiked: boolean
}

type NewComment = Pick<Comment, 'content' | 'level' | 'storyId' | 'chapterNumber' | 'lineIndex'>

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function delay<T>(v: T, ms = 300): Promise<T> {
  return new Promise(r => setTimeout(() => r(v), ms))
}

const MOCK_COMMENTS: Comment[] = [
  // ── Story-level comments ─────────────────────────────────────
  {
    id: 'cm1',
    authorName: 'Beatriz Santos',
    authorUsername: 'bea_leitora',
    content: 'Uma história incrível! A magia de Lisboa nunca me pareceu tão real. Mal posso esperar pelos próximos capítulos!',
    createdAt: '2024-11-10T14:22:00Z',
    level: 'story',
    storyId: 's1',
    likes: 12,
    isLiked: false,
  },
  {
    id: 'cm2',
    authorName: 'Rodrigo Melo',
    authorUsername: 'rodrigo_fanfic',
    content: 'O desenvolvimento da tensão entre os protagonistas está perfeito. A autora tem um talento enorme para criar personagens complexos.',
    createdAt: '2024-11-15T09:10:00Z',
    level: 'story',
    storyId: 's1',
    likes: 7,
    isLiked: false,
  },
  {
    id: 'cm3',
    authorName: 'Camila Torres',
    authorUsername: 'cam_reads',
    content: 'Esse é o tipo de história que me faz ficar acordada até as 3 da manhã lendo. Simplesmente viciante! 💛',
    createdAt: '2024-12-01T21:45:00Z',
    level: 'story',
    storyId: 's3',
    likes: 19,
    isLiked: false,
  },
  {
    id: 'cm4',
    authorName: 'Lucas Pinheiro',
    authorUsername: 'lucas_livros',
    content: 'O formato epistolar está sendo usado de maneira tão criativa. Cada carta revela uma camada nova da história.',
    createdAt: '2024-12-05T16:30:00Z',
    level: 'story',
    storyId: 's3',
    likes: 5,
    isLiked: false,
  },
  {
    id: 'cm5',
    authorName: 'Fernanda Oliveira',
    authorUsername: 'fer_escritora',
    content: 'A biblioteca como personagem em si mesma é uma ideia genial. Fiquei completamente imersa nesse universo.',
    createdAt: '2024-10-20T11:00:00Z',
    level: 'story',
    storyId: 's4',
    likes: 9,
    isLiked: false,
  },

  // ── Chapter-level comments ────────────────────────────────────
  {
    id: 'cm6',
    authorName: 'Marina Costa',
    authorUsername: 'marina_c',
    content: 'Esse primeiro capítulo me prendeu completamente! A descrição de Lisboa ao amanhecer é simplesmente linda. 🌅',
    createdAt: '2024-10-02T08:40:00Z',
    level: 'chapter',
    storyId: 's1',
    chapterNumber: 1,
    likes: 14,
    isLiked: false,
  },
  {
    id: 'cm7',
    authorName: 'Pedro Alves',
    authorUsername: 'palves_leitor',
    content: 'A cena do início me lembrou muito os becos de Alfama. A autora claramente conhece bem a cidade. Que imersão!',
    createdAt: '2024-10-03T19:15:00Z',
    level: 'chapter',
    storyId: 's1',
    chapterNumber: 1,
    likes: 6,
    isLiked: false,
  },
  {
    id: 'cm8',
    authorName: 'Ana Lima',
    authorUsername: 'ana_leitora',
    content: 'O segundo capítulo elevou TUDO. Aquela virada no final deixou meu coração acelerado. 😭',
    createdAt: '2024-10-08T22:00:00Z',
    level: 'chapter',
    storyId: 's1',
    chapterNumber: 2,
    likes: 11,
    isLiked: false,
  },
  {
    id: 'cm9',
    authorName: 'Sofia Barros',
    authorUsername: 'sof_fanfic',
    content: 'Esse capítulo me fez chorar de verdade. A cena da carta é de longe a mais bonita que já li em fanfic.',
    createdAt: '2024-11-25T14:00:00Z',
    level: 'chapter',
    storyId: 's3',
    chapterNumber: 1,
    likes: 23,
    isLiked: false,
  },

  // ── Line-level comments ───────────────────────────────────────
  {
    id: 'cm10',
    authorName: 'Julia Moura',
    authorUsername: 'juju_books',
    content: 'Essa imagem me deu arrepios literalmente! Que escrita poderosa. 🥹',
    createdAt: '2024-10-04T10:30:00Z',
    level: 'line',
    storyId: 's1',
    chapterNumber: 1,
    lineIndex: 2,
    likes: 4,
    isLiked: false,
  },
  {
    id: 'cm11',
    authorName: 'Thiago Nunes',
    authorUsername: 'thiago_n',
    content: 'Concordo! Esse trecho específico salvou meu dia. Reli umas 5 vezes.',
    createdAt: '2024-10-05T17:45:00Z',
    level: 'line',
    storyId: 's1',
    chapterNumber: 1,
    lineIndex: 2,
    likes: 2,
    isLiked: false,
  },
  {
    id: 'cm12',
    authorName: 'Isabela Ramos',
    authorUsername: 'isa_reads',
    content: 'Essa metáfora aqui é PERFEITA. A autora é incrível!',
    createdAt: '2024-10-10T20:00:00Z',
    level: 'line',
    storyId: 's1',
    chapterNumber: 1,
    lineIndex: 5,
    likes: 8,
    isLiked: false,
  },
]

export const commentsService = {
  getStoryComments(storyId: string): Promise<Comment[]> {
    const result = MOCK_COMMENTS.filter(c => c.level === 'story' && c.storyId === storyId)
    return delay([...result])
  },

  getChapterComments(storyId: string, chapterNumber: number): Promise<Comment[]> {
    const result = MOCK_COMMENTS.filter(
      c => c.level === 'chapter' && c.storyId === storyId && c.chapterNumber === chapterNumber
    )
    return delay([...result])
  },

  getLineComments(storyId: string, chapterNumber: number, lineIndex: number): Promise<Comment[]> {
    const result = MOCK_COMMENTS.filter(
      c => c.level === 'line' && c.storyId === storyId && c.chapterNumber === chapterNumber && c.lineIndex === lineIndex
    )
    return delay([...result])
  },

  getLineCommentCounts(storyId: string, chapterNumber: number): Promise<Record<number, number>> {
    const lines = MOCK_COMMENTS.filter(
      c => c.level === 'line' && c.storyId === storyId && c.chapterNumber === chapterNumber
    )
    const counts: Record<number, number> = {}
    for (const c of lines) {
      if (c.lineIndex !== undefined) counts[c.lineIndex] = (counts[c.lineIndex] ?? 0) + 1
    }
    return delay(counts)
  },

  addComment(data: NewComment & { authorName: string; authorUsername: string }): Promise<Comment> {
    const comment: Comment = {
      id: uid(),
      authorName: data.authorName,
      authorUsername: data.authorUsername,
      content: data.content,
      createdAt: new Date().toISOString(),
      level: data.level,
      storyId: data.storyId,
      chapterNumber: data.chapterNumber,
      lineIndex: data.lineIndex,
      likes: 0,
      isLiked: false,
    }
    MOCK_COMMENTS.push(comment)
    return delay(comment, 400)
  },

  toggleLike(commentId: string): Promise<{ likes: number; isLiked: boolean }> {
    const c = MOCK_COMMENTS.find(x => x.id === commentId)
    if (!c) return Promise.reject(new Error('Comment not found'))
    c.isLiked = !c.isLiked
    c.likes += c.isLiked ? 1 : -1
    return delay({ likes: c.likes, isLiked: c.isLiked })
  },
}
