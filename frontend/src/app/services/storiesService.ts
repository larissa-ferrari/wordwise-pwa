import type { Story, StoryChapter } from '../types'

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_STORIES: Story[] = [
  {
    id: 's1',
    author: { id: 'u1', name: 'Marina Escreve', username: 'marina_escreve', avatar: '' },
    title: 'O Último Feiticeiro de Lisboa',
    summary:
      'Em Lisboa de 1893, onde feiticeiros se escondem entre mortais, Elias Carvalho precisa proteger o maior segredo do país — ainda que isso signifique se aliar à única pessoa que ele genuinamente não suporta. Sofia Andrade tem razão demais para o seu próprio bem, e Elias está cansado de admitir isso.',
    coverGradient: 'from-[#2d1040] to-[#6a9fcf]',
    rating: 'teen',
    status: 'complete',
    category: 'f/m',
    warnings: ['no_warnings'],
    tags: [
      { id: 't1', name: 'Ficção Original', slug: 'ficcao-original', type: 'fandom' },
      { id: 't2', name: 'Elias Carvalho', slug: 'elias-carvalho', type: 'character' },
      { id: 't3', name: 'Sofia Andrade', slug: 'sofia-andrade', type: 'character' },
      { id: 't4', name: 'Elias/Sofia', slug: 'elias-sofia', type: 'relationship' },
      { id: 't5', name: 'Enemies to Lovers', slug: 'enemies-to-lovers', type: 'freeform' },
      { id: 't6', name: 'Lisboa Século XIX', slug: 'lisboa-seculo-xix', type: 'freeform' },
      { id: 't7', name: 'Magia', slug: 'magia', type: 'freeform' },
      { id: 't8', name: 'Slow Burn', slug: 'slow-burn', type: 'freeform' },
    ],
    wordCount: 28400,
    chaptersCount: 5,
    kudosCount: 1243,
    bookmarksCount: 387,
    hitsCount: 18920,
    publishedAt: '2025-08-12T10:00:00Z',
    updatedAt: '2025-09-01T14:00:00Z',
    chapters: [
      { id: 'c1-1', chapterNumber: 1, title: 'A Última Noite de Elias', wordCount: 5200, publishedAt: '2025-08-12T10:00:00Z' },
      { id: 'c1-2', chapterNumber: 2, title: 'O Convento das Almas', wordCount: 5800, publishedAt: '2025-08-19T10:00:00Z' },
      { id: 'c1-3', chapterNumber: 3, title: 'Fios e Segredos', wordCount: 5900, publishedAt: '2025-08-26T10:00:00Z' },
      { id: 'c1-4', chapterNumber: 4, title: 'O Preço do Silêncio', wordCount: 5700, publishedAt: '2025-09-02T10:00:00Z' },
      { id: 'c1-5', chapterNumber: 5, title: 'Depois do Fogo', wordCount: 5800, publishedAt: '2025-09-09T10:00:00Z' },
    ],
  },
  {
    id: 's2',
    author: { id: 'u2', name: 'Lobo de Papel', username: 'lobo_de_papel', avatar: '' },
    title: 'Quando os Deuses Dormem',
    summary:
      'Caelum foi criado para matar um deus. O problema é que o deus que ele encontrou não parece querer morrer — e parece se importar imensamente com a continuidade de Caelum, o que complica as coisas de maneiras que nenhum dos dois estava preparado para lidar.',
    coverGradient: 'from-[#1a0a20] to-[#e8635a]',
    rating: 'mature',
    status: 'ongoing',
    category: 'gen',
    warnings: ['violence', 'character_death'],
    tags: [
      { id: 't9', name: 'Ficção Original', slug: 'ficcao-original', type: 'fandom' },
      { id: 't10', name: 'Caelum', slug: 'caelum', type: 'character' },
      { id: 't11', name: 'Vera', slug: 'vera', type: 'character' },
      { id: 't12', name: 'Dark Fantasy', slug: 'dark-fantasy', type: 'freeform' },
      { id: 't13', name: 'Mitologia', slug: 'mitologia', type: 'freeform' },
      { id: 't14', name: 'Chosen One Subvertido', slug: 'chosen-one-subvertido', type: 'freeform' },
      { id: 't15', name: 'Guerra', slug: 'guerra', type: 'freeform' },
    ],
    wordCount: 67200,
    chaptersCount: 12,
    kudosCount: 2891,
    bookmarksCount: 1024,
    hitsCount: 54300,
    publishedAt: '2025-05-03T10:00:00Z',
    updatedAt: '2026-04-20T10:00:00Z',
    chapters: [
      { id: 'c2-1', chapterNumber: 1,  title: 'O Escolhido',             wordCount: 5100, publishedAt: '2025-05-03T10:00:00Z' },
      { id: 'c2-2', chapterNumber: 2,  title: 'O Templo Partido',        wordCount: 5400, publishedAt: '2025-05-10T10:00:00Z' },
      { id: 'c2-3', chapterNumber: 3,  title: 'Sangue e Promessas',      wordCount: 5800, publishedAt: '2025-05-17T10:00:00Z' },
      { id: 'c2-4', chapterNumber: 4,  title: 'A Cidade que Esqueceu',   wordCount: 5600, publishedAt: '2025-05-24T10:00:00Z' },
      { id: 'c2-5', chapterNumber: 5,  title: 'Vera',                    wordCount: 6100, publishedAt: '2025-06-07T10:00:00Z' },
      { id: 'c2-6', chapterNumber: 6,  title: 'O Preço de um Nome',      wordCount: 5700, publishedAt: '2025-06-21T10:00:00Z' },
      { id: 'c2-7', chapterNumber: 7,  title: 'Antes do Amanhecer',      wordCount: 5300, publishedAt: '2025-07-05T10:00:00Z' },
      { id: 'c2-8', chapterNumber: 8,  title: 'Deuses Não Mentem',       wordCount: 5900, publishedAt: '2025-07-19T10:00:00Z' },
      { id: 'c2-9', chapterNumber: 9,  title: 'Ruínas',                  wordCount: 5500, publishedAt: '2025-08-02T10:00:00Z' },
      { id: 'c2-10', chapterNumber: 10, title: 'O Ritual',               wordCount: 6200, publishedAt: '2025-09-06T10:00:00Z' },
      { id: 'c2-11', chapterNumber: 11, title: 'Depois da Queda',        wordCount: 5800, publishedAt: '2025-10-11T10:00:00Z' },
      { id: 'c2-12', chapterNumber: 12, title: 'O Que Resta dos Deuses', wordCount: 5800, publishedAt: '2026-04-20T10:00:00Z' },
    ],
  },
  {
    id: 's3',
    author: { id: 'u3', name: 'Rosa Cardeal', username: 'rosacardeal', avatar: '' },
    title: 'Cartas para Nenhum Lugar',
    summary:
      'Mariana e Lena trocaram cartas por sete anos sem nunca se encontrar. Quando finalmente se encontram, as palavras que sempre foram fáceis no papel desaparecem completamente. Uma história sobre saudade, distância e o que fazemos com o amor que não cabe nas páginas.',
    coverGradient: 'from-[#2d3d1f] to-[#b87cde]',
    rating: 'general',
    status: 'complete',
    category: 'f/f',
    warnings: ['no_warnings'],
    tags: [
      { id: 't16', name: 'Ficção Original', slug: 'ficcao-original', type: 'fandom' },
      { id: 't17', name: 'Mariana', slug: 'mariana', type: 'character' },
      { id: 't18', name: 'Lena', slug: 'lena', type: 'character' },
      { id: 't19', name: 'Mariana/Lena', slug: 'mariana-lena', type: 'relationship' },
      { id: 't20', name: 'Correspondência', slug: 'correspondencia', type: 'freeform' },
      { id: 't21', name: 'Romance Contemporâneo', slug: 'romance-contemporaneo', type: 'freeform' },
      { id: 't22', name: 'Saudade', slug: 'saudade', type: 'freeform' },
    ],
    wordCount: 12800,
    chaptersCount: 3,
    kudosCount: 876,
    bookmarksCount: 312,
    hitsCount: 11400,
    publishedAt: '2025-11-20T10:00:00Z',
    updatedAt: '2025-12-05T10:00:00Z',
    chapters: [
      { id: 'c3-1', chapterNumber: 1, title: 'A Primeira Carta',    wordCount: 4100, publishedAt: '2025-11-20T10:00:00Z' },
      { id: 'c3-2', chapterNumber: 2, title: 'O Trem das 17h43',    wordCount: 4300, publishedAt: '2025-11-27T10:00:00Z' },
      { id: 'c3-3', chapterNumber: 3, title: 'A Última Folha',      wordCount: 4400, publishedAt: '2025-12-05T10:00:00Z' },
    ],
  },
  {
    id: 's4',
    author: { id: 'u4', name: 'Fantasia Ardente', username: 'fantasia_ardente', avatar: '' },
    title: 'A Biblioteca Infinita',
    summary:
      'Beatriz descobriu que a biblioteca municipal de sua cidade guarda uma ala proibida que não aparece em nenhuma planta — e dentro dela, todos os livros que deveriam ter sido escritos mas nunca foram. Cada livro abre uma porta para um mundo que quase existiu.',
    coverGradient: 'from-[#1f1f2e] to-[#c8a96e]',
    rating: 'general',
    status: 'complete',
    category: 'gen',
    warnings: ['no_warnings'],
    tags: [
      { id: 't23', name: 'Ficção Original', slug: 'ficcao-original', type: 'fandom' },
      { id: 't24', name: 'Beatriz', slug: 'beatriz', type: 'character' },
      { id: 't25', name: 'Biblioteca Mágica', slug: 'biblioteca-magica', type: 'freeform' },
      { id: 't26', name: 'Portal Fantasy', slug: 'portal-fantasy', type: 'freeform' },
      { id: 't27', name: 'Meta-ficção', slug: 'meta-ficcao', type: 'freeform' },
      { id: 't28', name: 'Maravilhoso', slug: 'maravilhoso', type: 'freeform' },
    ],
    wordCount: 19600,
    chaptersCount: 6,
    kudosCount: 654,
    bookmarksCount: 198,
    hitsCount: 8700,
    publishedAt: '2025-10-01T10:00:00Z',
    updatedAt: '2025-11-10T10:00:00Z',
    chapters: [
      { id: 'c4-1', chapterNumber: 1, title: 'A Ala Proibida',            wordCount: 3100, publishedAt: '2025-10-01T10:00:00Z' },
      { id: 'c4-2', chapterNumber: 2, title: 'O Livro Azul',              wordCount: 3200, publishedAt: '2025-10-08T10:00:00Z' },
      { id: 'c4-3', chapterNumber: 3, title: 'Mundos Não Escritos',       wordCount: 3400, publishedAt: '2025-10-15T10:00:00Z' },
      { id: 'c4-4', chapterNumber: 4, title: 'A Bibliotecária',           wordCount: 3300, publishedAt: '2025-10-22T10:00:00Z' },
      { id: 'c4-5', chapterNumber: 5, title: 'O Preço de Uma História',   wordCount: 3200, publishedAt: '2025-10-29T10:00:00Z' },
      { id: 'c4-6', chapterNumber: 6, title: 'O Que Vale Ser Contado',    wordCount: 3400, publishedAt: '2025-11-10T10:00:00Z' },
    ],
  },
  {
    id: 's5',
    author: { id: 'u2', name: 'Lobo de Papel', username: 'lobo_de_papel', avatar: '' },
    title: 'Sangue de Inverno',
    summary:
      'Vira sobreviveu ao massacre da sua aldeia graças a um vampiro que não queria mais sangue. Agora ela deve ao homem que odeia — e Drakon deve a ela a única coisa que ele nunca esperava ter de volta: um motivo para continuar existindo.',
    coverGradient: 'from-[#0a0807] to-[#e8635a]',
    rating: 'mature',
    status: 'ongoing',
    category: 'f/m',
    warnings: ['violence'],
    tags: [
      { id: 't29', name: 'Ficção Original', slug: 'ficcao-original', type: 'fandom' },
      { id: 't30', name: 'Vira', slug: 'vira', type: 'character' },
      { id: 't31', name: 'Drakon', slug: 'drakon', type: 'character' },
      { id: 't32', name: 'Vira/Drakon', slug: 'vira-drakon', type: 'relationship' },
      { id: 't33', name: 'Dark Romance', slug: 'dark-romance', type: 'freeform' },
      { id: 't34', name: 'Vampiros', slug: 'vampiros', type: 'freeform' },
      { id: 't35', name: 'Enemies to Lovers', slug: 'enemies-to-lovers-2', type: 'freeform' },
      { id: 't36', name: 'Gothic', slug: 'gothic', type: 'freeform' },
    ],
    wordCount: 89100,
    chaptersCount: 15,
    kudosCount: 4230,
    bookmarksCount: 1876,
    hitsCount: 102000,
    publishedAt: '2025-01-15T10:00:00Z',
    updatedAt: '2026-04-28T10:00:00Z',
    chapters: [
      { id: 'c5-1',  chapterNumber: 1,  title: 'Cinzas',              wordCount: 5800, publishedAt: '2025-01-15T10:00:00Z' },
      { id: 'c5-2',  chapterNumber: 2,  title: 'O Preço da Vida',     wordCount: 6100, publishedAt: '2025-01-29T10:00:00Z' },
      { id: 'c5-3',  chapterNumber: 3,  title: 'Dívida',              wordCount: 5900, publishedAt: '2025-02-12T10:00:00Z' },
      { id: 'c5-4',  chapterNumber: 4,  title: 'O Castelo',           wordCount: 6200, publishedAt: '2025-02-26T10:00:00Z' },
      { id: 'c5-5',  chapterNumber: 5,  title: 'Regras',              wordCount: 5700, publishedAt: '2025-03-12T10:00:00Z' },
      { id: 'c5-6',  chapterNumber: 6,  title: 'Falhas na Armadura',  wordCount: 6000, publishedAt: '2025-03-26T10:00:00Z' },
      { id: 'c5-7',  chapterNumber: 7,  title: 'A Caçada',            wordCount: 6300, publishedAt: '2025-04-09T10:00:00Z' },
      { id: 'c5-8',  chapterNumber: 8,  title: 'Feridas',             wordCount: 5800, publishedAt: '2025-04-23T10:00:00Z' },
      { id: 'c5-9',  chapterNumber: 9,  title: 'Veneno e Mel',        wordCount: 6100, publishedAt: '2025-05-07T10:00:00Z' },
      { id: 'c5-10', chapterNumber: 10, title: 'O Banquete',          wordCount: 6400, publishedAt: '2025-06-04T10:00:00Z' },
      { id: 'c5-11', chapterNumber: 11, title: 'Escolhas',            wordCount: 5900, publishedAt: '2025-07-02T10:00:00Z' },
      { id: 'c5-12', chapterNumber: 12, title: 'O Que Foi Prometido', wordCount: 6200, publishedAt: '2025-08-06T10:00:00Z' },
      { id: 'c5-13', chapterNumber: 13, title: 'Traição',             wordCount: 6000, publishedAt: '2025-10-01T10:00:00Z' },
      { id: 'c5-14', chapterNumber: 14, title: 'Ruínas do Pacto',     wordCount: 5700, publishedAt: '2026-02-18T10:00:00Z' },
      { id: 'c5-15', chapterNumber: 15, title: 'Sangue de Inverno',   wordCount: 6000, publishedAt: '2026-04-28T10:00:00Z' },
    ],
  },
  {
    id: 's6',
    author: { id: 'u3', name: 'Rosa Cardeal', username: 'rosacardeal', avatar: '' },
    title: 'Irmãos de Papel',
    summary:
      'Dois irmãos cresceram numa livraria que estava sempre morrendo. Um queria vender. O outro queria salvar. E entre eles havia uma dívida antiga que nenhum dos dois conseguia nomear — mas que aparecia toda vez que um tentava ir embora e o outro não deixava.',
    coverGradient: 'from-[#2d1f0e] to-[#7c9e7a]',
    rating: 'general',
    status: 'complete',
    category: 'gen',
    warnings: ['no_warnings'],
    tags: [
      { id: 't37', name: 'Ficção Original', slug: 'ficcao-original', type: 'fandom' },
      { id: 't38', name: 'Relações Familiares', slug: 'relacoes-familiares', type: 'freeform' },
      { id: 't39', name: 'Livraria', slug: 'livraria', type: 'freeform' },
      { id: 't40', name: 'Literário', slug: 'literario', type: 'freeform' },
      { id: 't41', name: 'Sem Romance', slug: 'sem-romance', type: 'freeform' },
    ],
    wordCount: 21300,
    chaptersCount: 4,
    kudosCount: 543,
    bookmarksCount: 178,
    hitsCount: 6800,
    publishedAt: '2025-07-08T10:00:00Z',
    updatedAt: '2025-07-30T10:00:00Z',
    chapters: [
      { id: 'c6-1', chapterNumber: 1, title: 'O Inventário',        wordCount: 5200, publishedAt: '2025-07-08T10:00:00Z' },
      { id: 'c6-2', chapterNumber: 2, title: 'Caixas',              wordCount: 5300, publishedAt: '2025-07-15T10:00:00Z' },
      { id: 'c6-3', chapterNumber: 3, title: 'O Comprador',         wordCount: 5400, publishedAt: '2025-07-22T10:00:00Z' },
      { id: 'c6-4', chapterNumber: 4, title: 'O Que Ficou',         wordCount: 5400, publishedAt: '2025-07-30T10:00:00Z' },
    ],
  },
]

// ─── Chapter content ──────────────────────────────────────────────────────────

const CHAPTER_CONTENT: Record<string, string> = {
  'c1-1': `Lisboa, 1893.

A cidade cheirava a peixe e a segredos.

Elias Carvalho desceu os degraus de pedra do Largo do Carmo com a capa dobrada sob o braço e uma maldição na ponta da língua. Não era incomum. Lisboa estava cheia de maldições naquela noite — ele as sentia roçando contra a sua pele como dedos de névoa, resíduos de trabalhos que outros feiticeiros tinham deixado à deriva nas ruelas estreitas.

Ele não era um desses feiticeiros descuidados.

— Carvalho.

A voz o parou no meio do passo. Ele não virou. Não precisava — reconhecia aquele timbre como reconhecia a dor atrás dos olhos que vinha sempre antes de uma tempestade.

— Andrade.

Sofia Andrade deu a volta pela sua frente como se os degraus de pedra fossem palco e ela, atriz de um melodrama que só ela achava necessário. Vestia azul-marinho, sempre azul-marinho, como se o mar lhe devesse alguma coisa. Carregava um maço de documentos contra o peito com a mesma tensão que outra pessoa carregaria uma arma.

— A Academia quer você — disse ela, sem preâmbulo. — Esta noite.

— A Academia pode querer muita coisa. — Ele retomou o passo. — Não é o mesmo que conseguir.

— O Conselho votou. — Ela o acompanhou sem que ninguém a tivesse convidado, o que era muito Sofia Andrade. — Uma criança desapareceu. Filha de um conselheiro, portanto o assunto virou prioridade de ontem.

— Eu não trabalho para o Conselho.

— Você não trabalha para ninguém, Elias. Este é precisamente o seu problema. — Ela parou, e algo no tom o fez parar também. Não porque ela tivesse mandado — ele nunca obedecia a ordens dela — mas porque havia algo diferente na dureza da voz. Algo que soava menos a arrogância e mais a medo genuíno. — A criança tem seis anos. E os rastros apontam para o Convento das Almas.

O estômago de Elias afundou.

O Convento das Almas não era um lugar onde feiticeiros iam voluntariamente. Era onde o fio entre os vivos e os mortos estava mais gasto, mais translúcido, mais perigoso. Era onde coisas que não tinham nome bebiam do excesso de magia que vazava pela cidade velha há quatrocentos anos.

Ele olhou para ela pela primeira vez naquela noite.

Sofia Andrade tinha olhos cor de âmbar que nunca tremiam, mesmo quando ela estava com medo. Ele aprendera isso havia muito tempo, quando eram estudantes e ela o superava em todo exame com a mesma expressão de tédio cuidadosamente montada. Ela estava com medo agora. Ele sabia disso pela maneira como a curva do ombro ficava ligeiramente mais rígida.

— Você já foi lá dentro? — perguntou ele.

— Tentei. Há um feitiço de bloqueio. Antigo. Não é trabalho de novato.

— Então precisam de alguém que conheça feitiços antigos.

— Precisam de você — disse ela, e ele não soube dizer se ela achava isso uma bênção ou uma maldição. — Infelizmente.

Elias olhou para o céu de Lisboa, onde as estrelas competiam com a luz dos lampiões e sempre perdiam. Em algum lugar naquela cidade, uma criança estava presa num lugar que não devia existir. E a única pessoa com quem ele conseguia trabalhar era a única pessoa no mundo que ele genuinamente não suportava.

— Quanto me pagam? — perguntou ele.

— Ingrato — resmungou ela.

— Esse não é um número.

Sofia abriu o maço de documentos com um gesto brusco e arrancou uma folha. Ela a pressionou contra o peito de Elias com mais força do que era estritamente necessário.

— Isso basta?

Ele leu o número. Dobrou o papel com cuidado. Enfiou no bolso do colete.

— Você tem gato? — perguntou ele.

— O quê?

— Para entrar no Convento, preciso de um fio de gato preto que nunca tenha visto espelho. É raro. A maioria dos feiticeiros de Lisboa tem um em estoque, mas não vi a sua lista de materiais nos arquivos da Academia este mês, então —

— Eu tenho — disse ela, com a expressão de alguém que está simultaneamente irritada e aliviada. — Naturalmente.

— Naturalmente. — Ele fez um gesto vago na direção da cidade. — Então vamos.

Sofia o alcançou em dois passos, e Elias notou que ela não perguntou para onde estavam indo, não protestou a velocidade do passo, não tentou renegociar os termos. Ela simplesmente foi. Como se sempre soubesse que ele diria sim.

O que o irritava imensamente, porque ela estava certa.

A névoa de Lisboa fechou-se ao redor dos dois enquanto desciam em direção ao rio, e Elias permitiu-se, por um único momento, pensar que talvez a noite não fosse terminar em desastre.

Era, naturalmente, demasiado otimista da sua parte.`,

  'c1-2': `O Convento das Almas ficava numa ruela que não aparecia em nenhum mapa de Lisboa impresso depois de 1801. Elias sabia exatamente o porquê: o cartógrafo que tentara incluí-lo na planta de 1802 acordara na manhã seguinte sem memória de qualquer convento, de qualquer ruela, ou do próprio nome.

Sofia sabia disso também. Era uma das primeiras histórias que se contavam na Academia, junto com o aviso de que certas coisas existiam exatamente porque eram esquecidas.

— O bloqueio está aqui — ela disse, parando a dois metros da porta de ferro enferrujada. — Você consegue sentir?

Elias já sentia. Era uma pressão estranha atrás das costelas, como se o ar estivesse mais denso naquele ponto específico do espaço. Não era magia comum. Era algo mais antigo, mais sedimentado — o tipo de proteção que se acumulava em camadas ao longo de décadas, cada feiticeiro que passava deixando uma impressão que se fundía com as anteriores até virar algo quase geológico.

— Consigo — disse ele. — Recue.

— Eu não sou sua assistente, Carvalho.

— Não, você é a pessoa que vai levar os fragmentos se eu errar o ângulo de entrada. Recue.

Ela recuou. Dois passos, não três, porque era Sofia e conceder demais não estava no seu vocabulário.

Elias fechou os olhos.

O trabalho de desfazer um bloqueio antigo era menos parecido com quebrar e mais parecido com convencer. Você não destruía a magia — você a persuadia de que já havia cumprido sua função, de que a ameaça que a havia invocado já não existia, de que podia descansar agora. Era um trabalho de paciência e de vocabulário preciso, e Elias levou dezoito minutos para completá-lo enquanto Sofia ficava parada atrás dele no silêncio mais impressionante que ele já havia testemunhado nela.

Quando a pressão atrás das costelas desapareceu, ele abriu os olhos.

A porta de ferro estava aberta.

— Impressionante — disse Sofia, com a voz ligeiramente diferente. Não era elogio exatamente, mas era o mais próximo que ela chegava.

— Não entre na minha frente — disse ele. — E não toque em nada que brilhe.

— Eu me formei com distinção na Academia, Elias.

— Eu sei. Você foi minha colega por seis anos. — Ele entrou no convento. — E ainda assim te digo: não toque em nada que brilhe.

O interior do convento cheirava a velas e a algo mais antigo que velas — incenso de uma denominação que havia deixado de existir, talvez, ou simplesmente o odor que o tempo adquiria quando ficava parado num espaço fechado por décadas demais. Havia luz suficiente vinda de fontes que Elias preferia não investigar de perto.

— Lá — disse Sofia, baixinho.

No centro do que havia sido a nave principal, sentada no chão de pedra com as joelhas dobradas contra o peito e os olhos muito abertos, estava uma criança de cabelo vermelho que olhava para eles com a expressão de quem havia decidido muito tempo atrás que chorar não ia adiantar nada.

Elias reconheceu essa expressão. Ele próprio a usara, com seis anos, numa noite muito diferente mas essencialmente similar.

— Olá — disse ele, agachando-se para ficar na altura da criança. — Você é Inês?

A menina examinou-o com olhos sérios demais para a idade.

— Quem é você? — perguntou ela.

— Meu nome é Elias. Vim te tirar daqui.

— A senhora também? — Inês olhou para Sofia.

— Sim — disse Sofia, com uma suavidade que Elias nunca havia ouvido antes na voz dela e que, por razões que ele não quis examinar, o deixou completamente desarmado. — Também.

Inês considerou isso por um momento.

— Tem um bicho aqui — disse ela, como se isso fosse informação relevante para a decisão. — No canto. Não me machucou mas ficou olhando.

Elias e Sofia trocaram um olhar.

— Que tipo de bicho? — perguntou ele.

— Grande — disse Inês. — Com muitos olhos.`,

  'c2-1': `Caelum tinha dezoito anos quando os sacerdotes disseram que ele era o Escolhido.

Tinha vinte e três quando percebeu o que isso realmente significava.

A diferença entre as duas coisas era a seguinte: aos dezoito anos, "Escolhido" soava como honra, destino, propósito. Era a palavra que explicava por que ele havia sobrevivido ao inverno em que toda a sua família morreu. Era a palavra que dava sentido ao fato de que ele conseguia ver as marcas que os deuses deixavam no mundo quando passavam — um brilho dourado nos lugares sagrados, uma sombra mais densa onde algo antigo havia sangrado.

Aos vinte e três anos, "Escolhido" significava: você foi criado especificamente para matar um deus, e agora é hora de fazer isso, e não, não importa que você nunca tenha concordado com os termos do contrato.

— O deus está no norte — disse o Grande Sacerdote Amaryn, apontando para um mapa tão velho que as bordas desintegravam enquanto Caelum o observava. — Na Floresta Cinza. Ele dorme há trezentos anos, mas os sonhos dele estão começando a vazar para o mundo real. Por isso os pesadelos. Por isso as colheitas fracas. Por isso —

— Por isso as crianças que não acordam — disse Caelum.

Amaryn fez uma pausa.

— Sim — concordou ele, com a delicadeza de quem confirma algo que já foi dito por outros. — Por isso também.

Caelum olhou para o mapa. A Floresta Cinza ficava a três semanas de viagem. Ele nunca havia saído do vale onde nascera.

— Vocês têm certeza de que sou eu? — perguntou ele.

— As marcas são inequívocas.

— As marcas que vocês interpretaram.

— As marcas que os próprios deuses nos ensinaram a interpretar.

Caelum fechou os olhos. Tinha dezoito anos quando havia acreditado nisso sem questionar. Cinco anos de treinamento, de acordar antes do sol, de aprender a manejar uma faca de ritual e a pronunciar palavras em línguas que ninguém mais falava, haviam erodido algo na sua capacidade de aceitar certezas alheias.

— E se o deus não quiser morrer? — perguntou ele.

O Grande Sacerdote olhou para ele com a expressão de alguém que acabou de ouvir uma pergunta que nunca havia sido feita antes.

— Eles nunca querem — disse Amaryn, eventualmente. — É por isso que precisamos de você.

Caelum pegou o mapa. Dobrou-o com cuidado, ignorando as bordas que desintegravam nos seus dedos.

— Quando parto? — perguntou.

— Amanhã ao amanhecer.

Ele assentiu. Saiu da sala dos sacerdotes. Atravessou o corredor de pedra fria, desceu os degraus que levavam ao jardim onde havia passado cinco anos aprendendo a matar coisas que não devia, e sentou-se na beira da fonte com a pergunta ainda girando na cabeça.

E se o deus não quiser morrer?

Era uma pergunta idiota. Claro que o deus não ia querer morrer.

O problema era que Caelum também não tinha tanta certeza de que queria matá-lo.`,

  'c3-1': `Setembro de 2017.

Mariana,

Você não me conhece. Meu nome é Lena e eu encontrei sua carta numa caixa de livros usados que comprei na feira do sábado. A carta estava dentro de uma edição de 1987 de "Cem Anos de Solidão" — o tipo de coisa que se imagina que alguém vai perceber que esqueceu, mas aparentemente não percebeu, porque a caixa inteira foi parar na feira.

Eu li a carta. Desculpe. Não foi de propósito — comecei a ler achando que era uma nota de preço dobrada e quando percebi o que era já estava na terceira linha e me senti culpada de parar no meio.

Você escreveu para uma amiga chamada Clara dizendo que estava com medo de voltar para o Rio depois de três anos em Lisboa e que não sabia mais para quem era a pessoa em que havia se tornado. Você escreveu isso com uma letra muito bonita, num papel levemente amarelado, e você não assinou com sobrenome.

Não sei se Clara recebeu uma cópia desta carta. Não sei se vocês ainda falam. Não sei se você voltou para o Rio ou ficou em Lisboa ou foi para um terceiro lugar completamente diferente.

Mas a sua carta me fez pensar muito, e eu não tenho com quem falar sobre isso, então estou escrevendo para você sem ter nenhum endereço de entrega e com a esperança levemente irracional de que talvez este livro encontre o caminho de volta para você da mesma forma que encontrou o caminho até mim.

Se você receber isso: oi. Espero que você tenha descoberto para quem é a pessoa em que se tornou.

Lena

P.S.: Eu também não sei para quem sou, se ajudar.`,

  'c4-1': `A ala proibida não estava no mapa.

Beatriz sabia disso porque havia passado as últimas três semanas estudando todos os mapas disponíveis da Biblioteca Municipal de Araguaína — as plantas de 1954, quando o prédio foi construído; as de 1978, quando a ala de periódicos foi adicionada; as de 2003, quando instalaram o elevador. Nenhum deles mostrava o corredor que ela havia encontrado na semana anterior quando perseguiu um gato laranja para atrás das estantes de referência.

O gato havia desaparecido.

O corredor havia ficado.

Era estreito, mal iluminado por uma única lâmpada que piscava com a regularidade ligeiramente irregular de algo que estava prestes a queimar, e cheirava a papel antigo de uma forma diferente do papel antigo normal — mais intenso, mais denso, como se os livros ali dentro contivessem mais palavras por página do que era fisicamente possível.

Beatriz tinha vinte e dois anos, um mestrado em Biblioteconomia pela UFPA, e uma capacidade de ignorar o bom senso que sua mãe atribuía ao excesso de literatura fantástica na infância.

Ela entrou no corredor.

As prateleiras chegavam até o teto, que era mais alto do que devia ser levando em conta a arquitetura do prédio acima. Os livros não tinham etiquetas de catalogação. Tinham, em vez disso, títulos escritos diretamente na lombada com o que parecia ser tinta dourada, em letras que mudavam levemente de ângulo dependendo de onde Beatriz estava olhando.

Ela parou diante de um volume azul escuro que parecia irradiar uma qualidade de atenção — como se o livro estivesse esperando por ela especificamente.

O título dizia: *As Coisas Que Aconteceriam Se*.

Beatriz olhou para o livro por um longo momento.

— Tudo bem — disse ela, em voz alta, para ninguém em particular. — Mas eu só vou dar uma olhada.

Ela pegou o livro.

A biblioteca inteira ficou em silêncio de uma maneira diferente do silêncio normal de biblioteca — como se algo muito grande tivesse prendido a respiração.`,

  'c5-1': `O fogo começou antes do amanhecer.

Vira acordou com o cheiro de fumaça e o som do telhado cedendo na casa dos Morev, que ficava do outro lado da rua. Ela teve tempo de pegar o casaco e as botas antes de a porta da sua própria casa começar a queimar.

Não havia fugitivos. Os homens que cercavam a aldeia não tinham rostos — tinham capuzes, tinham tochas, tinham a eficiência de quem havia feito aquilo antes e pretendia continuar fazendo.

Vira correu para o rio porque era a única direção sem fogo.

Ela não pensou em quem estava deixando para trás. Pensar nisso significava parar, e parar significava morrer, e morrer era o único destino que ela recusava com toda a convicção que ainda lhe restava naquele momento.

O rio estava gelado. Era novembro, e as montanhas tinham começado a mandar o degelo para baixo há três semanas, e a água estava no nível mais alto do ano. Ela entrou nela de qualquer jeito e deixou a correnteza a levar para longe do brilho laranja que havia sido a sua vida inteira.

Acordou numa margem que não reconhecia.

Havia alguém sentado na pedra mais próxima.

Ele parecia ter por volta de trinta anos, com cabelo escuro que chegava aos ombros e uma qualidade de quietude que Vira, em condições normais, teria reconhecido imediatamente como perigosa. Não estava dormindo. Estava olhando para ela com a expressão neutra de alguém que não havia decidido ainda o que fazer.

— Você quase morreu — disse ele.

— Quase — concordou Vira, sem força para mais do que isso.

— Há marcas de fogo na sua nuca. E hipotermia.

— Eu sei o que tenho.

Ele continuou olhando para ela.

— Posso tratar as marcas — disse ele, eventualmente. — E a hipotermia. Se quiser.

Vira olhou para o brilho laranja que ainda era visível no horizonte, onde havia sido a sua aldeia. Depois olhou para o homem na pedra, que tinha olhos de uma cor que ela não conseguia determinar com precisão na luz fraca do amanhecer — escuros demais para serem comuns, claros demais para serem completamente negros.

— Por que faria isso? — perguntou ela.

Ele considerou a pergunta com uma seriedade que ela não esperava.

— Porque posso — disse ele. — E porque você sobreviveu ao rio, o que é mais difícil do que parece.

Era uma resposta estranha. Vira, que havia perdido tudo na última hora e não tinha nada a perder aceitando ajuda de um estranho numa margem de rio às cinco da manhã, decidiu que era suficiente.

— Tudo bem — disse ela. — Mas eu não devo nada a você depois.

O homem fez algo que poderia ter sido o começo de um sorriso se ele soubesse como terminar.

— Não — disse ele. — Não deve.

Era mentira. Ela só descobriria isso mais tarde.`,
}

// ─── Service types ────────────────────────────────────────────────────────────

import type { StoryRating, StoryStatus, StoryCategory, StoryWarning, TagType } from '../types'

export type StoriesFilter = {
  q?: string
  rating?: string[]
  status?: string
  category?: string
  sort?: 'kudos' | 'hits' | 'updated' | 'published'
}

export type StoryFormData = {
  title: string
  summary: string
  coverGradient: string
  rating: StoryRating
  status: StoryStatus
  category: StoryCategory
  warnings: StoryWarning[]
  tags: Array<{ name: string; type: TagType }>
}

export type ChapterFormData = {
  title: string
  content: string
}

// ─── Service ──────────────────────────────────────────────────────────────────

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), ms))
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export const storiesService = {
  // ── Read ──────────────────────────────────────────────────────────────────

  getAll(filter?: StoriesFilter): Promise<Story[]> {
    let result = [...MOCK_STORIES]

    if (filter?.q) {
      const q = filter.q.toLowerCase()
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.tags.some(t => t.name.toLowerCase().includes(q))
      )
    }
    if (filter?.rating?.length) {
      result = result.filter(s => filter.rating!.includes(s.rating))
    }
    if (filter?.status) {
      result = result.filter(s => s.status === filter.status)
    }
    if (filter?.category) {
      result = result.filter(s => s.category === filter.category)
    }
    const sort = filter?.sort ?? 'hits'
    result.sort((a, b) => {
      if (sort === 'kudos')     return b.kudosCount - a.kudosCount
      if (sort === 'hits')      return b.hitsCount - a.hitsCount
      if (sort === 'updated')   return b.updatedAt.localeCompare(a.updatedAt)
      if (sort === 'published') return b.publishedAt.localeCompare(a.publishedAt)
      return 0
    })
    return delay(result)
  },

  getById(id: string): Promise<Story | null> {
    return delay(MOCK_STORIES.find(s => s.id === id) ?? null)
  },

  getMyStories(authorId: string): Promise<Story[]> {
    return delay(MOCK_STORIES.filter(s => s.author.id === authorId))
  },

  getChapter(storyId: string, chapterNumber: number): Promise<StoryChapter | null> {
    const story = MOCK_STORIES.find(s => s.id === storyId)
    if (!story) return delay(null)
    const summary = story.chapters.find(c => c.chapterNumber === chapterNumber)
    if (!summary) return delay(null)
    const idx     = story.chapters.indexOf(summary)
    const content = CHAPTER_CONTENT[summary.id] ?? generatePlaceholderContent(summary.title, chapterNumber)
    return delay({
      id: summary.id,
      storyId: story.id,
      story: { id: story.id, title: story.title, author: story.author, chaptersCount: story.chaptersCount, coverGradient: story.coverGradient },
      chapterNumber: summary.chapterNumber,
      title: summary.title,
      content,
      wordCount: summary.wordCount,
      publishedAt: summary.publishedAt,
      prevChapter: idx > 0 ? story.chapters[idx - 1] : null,
      nextChapter: idx < story.chapters.length - 1 ? story.chapters[idx + 1] : null,
    })
  },

  getChapterForEditing(storyId: string, chapterNumber: number): Promise<{ title: string; content: string } | null> {
    const story = MOCK_STORIES.find(s => s.id === storyId)
    if (!story) return delay(null)
    const summary = story.chapters.find(c => c.chapterNumber === chapterNumber)
    if (!summary) return delay(null)
    const content = CHAPTER_CONTENT[summary.id] ?? ''
    return delay({ title: summary.title, content })
  },

  // ── Story CRUD ────────────────────────────────────────────────────────────

  createStory(author: Story['author'], data: StoryFormData): Promise<Story> {
    const now  = new Date().toISOString()
    const id   = `s${uid()}`
    const tags = data.tags.map((t, i) => ({ id: `${id}-t${i}`, name: t.name, slug: slugify(t.name), type: t.type }))
    const story: Story = {
      id,
      author,
      title: data.title,
      summary: data.summary,
      coverGradient: data.coverGradient,
      rating: data.rating,
      status: data.status,
      category: data.category,
      warnings: data.warnings,
      tags,
      wordCount: 0,
      chaptersCount: 0,
      kudosCount: 0,
      bookmarksCount: 0,
      hitsCount: 0,
      chapters: [],
      publishedAt: now,
      updatedAt: now,
    }
    MOCK_STORIES.push(story)
    return delay(story)
  },

  updateStory(id: string, data: Partial<StoryFormData>): Promise<Story> {
    const story = MOCK_STORIES.find(s => s.id === id)
    if (!story) return Promise.reject(new Error('Story not found'))
    if (data.title)         story.title         = data.title
    if (data.summary)       story.summary       = data.summary
    if (data.coverGradient) story.coverGradient = data.coverGradient
    if (data.rating)        story.rating        = data.rating
    if (data.status)        story.status        = data.status
    if (data.category)      story.category      = data.category
    if (data.warnings)      story.warnings      = data.warnings
    if (data.tags) {
      story.tags = data.tags.map((t, i) => ({ id: `${id}-t${i}`, name: t.name, slug: slugify(t.name), type: t.type }))
    }
    story.updatedAt = new Date().toISOString()
    return delay({ ...story })
  },

  deleteStory(id: string): Promise<void> {
    const idx = MOCK_STORIES.findIndex(s => s.id === id)
    if (idx !== -1) MOCK_STORIES.splice(idx, 1)
    return delay(undefined)
  },

  // ── Chapter CRUD ──────────────────────────────────────────────────────────

  createChapter(storyId: string, data: ChapterFormData): Promise<import('../types').StoryChapterSummary> {
    const story = MOCK_STORIES.find(s => s.id === storyId)
    if (!story) return Promise.reject(new Error('Story not found'))
    const chapterNumber = story.chapters.length + 1
    const chapterId     = `${storyId}-c${uid()}`
    const now           = new Date().toISOString()
    const words         = countWords(data.content)
    const summary: import('../types').StoryChapterSummary = {
      id: chapterId,
      chapterNumber,
      title: data.title,
      wordCount: words,
      publishedAt: now,
    }
    story.chapters.push(summary)
    story.chaptersCount = story.chapters.length
    story.wordCount    += words
    story.updatedAt     = now
    CHAPTER_CONTENT[chapterId] = data.content
    return delay(summary)
  },

  updateChapter(storyId: string, chapterNumber: number, data: ChapterFormData): Promise<import('../types').StoryChapterSummary> {
    const story = MOCK_STORIES.find(s => s.id === storyId)
    if (!story) return Promise.reject(new Error('Story not found'))
    const summary = story.chapters.find(c => c.chapterNumber === chapterNumber)
    if (!summary) return Promise.reject(new Error('Chapter not found'))
    const oldWords = summary.wordCount
    const newWords = countWords(data.content)
    summary.title     = data.title
    summary.wordCount = newWords
    story.wordCount   = story.wordCount - oldWords + newWords
    story.updatedAt   = new Date().toISOString()
    CHAPTER_CONTENT[summary.id] = data.content
    return delay({ ...summary })
  },

  deleteChapter(storyId: string, chapterNumber: number): Promise<void> {
    const story = MOCK_STORIES.find(s => s.id === storyId)
    if (!story) return delay(undefined)
    const idx = story.chapters.findIndex(c => c.chapterNumber === chapterNumber)
    if (idx !== -1) {
      const [removed] = story.chapters.splice(idx, 1)
      story.wordCount    -= removed.wordCount
      story.chaptersCount = story.chapters.length
      story.chapters.forEach((c, i) => { c.chapterNumber = i + 1 })
    }
    return delay(undefined)
  },

  // ── Social ────────────────────────────────────────────────────────────────

  toggleKudos(storyId: string): Promise<{ kudosCount: number; isKudosed: boolean }> {
    const story = MOCK_STORIES.find(s => s.id === storyId)
    if (!story) return delay({ kudosCount: 0, isKudosed: false })
    story.isKudosed  = !story.isKudosed
    story.kudosCount += story.isKudosed ? 1 : -1
    return delay({ kudosCount: story.kudosCount, isKudosed: story.isKudosed ?? false })
  },
}

function generatePlaceholderContent(title: string, num: number): string {
  return `Capítulo ${num} — ${title}

O capítulo começa aqui. Este é um conteúdo de demonstração para o capítulo "${title}".

A história continua se desdobrando, com os personagens enfrentando novos desafios e descobertas que moldam o rumo da narrativa. Cada página revela um pouco mais sobre o mundo construído pelo autor, seus mistérios e as conexões entre os personagens.

As escolhas feitas aqui terão consequências. Algumas imediatas, outras que só se revelarão muito mais tarde — quando for tarde demais para desfazê-las, ou exatamente a tempo de mudarem tudo.

Este capítulo termina deixando algumas perguntas em aberto e outras, finalmente, respondidas.`
}
