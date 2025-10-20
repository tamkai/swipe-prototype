// アセスメント用サンプル質問データ
// 8次元 × 各2問 = 16問（テスト用）

export const assessmentQuestions = [
  // 🔥 動機エレメント（2問）
  {
    id: 1,
    question: '自分の中から湧き上がる情熱で力を発揮できる',
    leftLabel: '情熱',
    rightLabel: '目標',
    dimension: '動機',
    element: 'motivation'
  },
  {
    id: 2,
    question: '新しいことは内発的な興味・関心で始める',
    leftLabel: 'やりたいから',
    rightLabel: 'やるべきだから',
    dimension: '動機',
    element: 'motivation'
  },

  // 🪚 生成エレメント（2問）
  {
    id: 3,
    question: 'アイデアは量を重視する',
    leftLabel: '量重視',
    rightLabel: '質重視',
    dimension: '生成',
    element: 'generation'
  },
  {
    id: 4,
    question: '発想を広げるのが得意',
    leftLabel: '広げる',
    rightLabel: '深める',
    dimension: '生成',
    element: 'generation'
  },

  // 📅 進行エレメント（2問）
  {
    id: 5,
    question: '状況が変わったらすぐ切り替える',
    leftLabel: '切り替える',
    rightLabel: 'やり抜く',
    dimension: '進行',
    element: 'progress'
  },
  {
    id: 6,
    question: '新しいやり方を試すのが好き',
    leftLabel: '新しく試す',
    rightLabel: '慣れたやり方',
    dimension: '進行',
    element: 'progress'
  },

  // 💎 価値創出エレメント（2問）
  {
    id: 7,
    question: '価値を生み出すとき改善が得意',
    leftLabel: '改善',
    rightLabel: '発明',
    dimension: '価値創出',
    element: 'value'
  },
  {
    id: 8,
    question: 'アイデアは実現性を重視する',
    leftLabel: '現実的',
    rightLabel: '革新的',
    dimension: '価値創出',
    element: 'value'
  },

  // 🎨 表現エレメント（2問）
  {
    id: 9,
    question: '表現するとき自分らしさを重視する',
    leftLabel: '自分らしさ',
    rightLabel: '相手目線',
    dimension: '表現',
    element: 'expression'
  },
  {
    id: 10,
    question: '独自性を評価されたい',
    leftLabel: '独自性',
    rightLabel: '役立ち',
    dimension: '表現',
    element: 'expression'
  },

  // 🧠 思考エレメント（2問）
  {
    id: 11,
    question: '物事を抽象的に考えるのが得意',
    leftLabel: '抽象的',
    rightLabel: '具体的',
    dimension: '思考',
    element: 'thinking'
  },
  {
    id: 12,
    question: '理論から理解することが多い',
    leftLabel: '理論',
    rightLabel: '実践',
    dimension: '思考',
    element: 'thinking'
  },

  // 🏃 実行エレメント（2問）
  {
    id: 13,
    question: '即興的に動く',
    leftLabel: '即興',
    rightLabel: '計画',
    dimension: '実行',
    element: 'execution'
  },
  {
    id: 14,
    question: '動きながら考えることが多い',
    leftLabel: '動きながら',
    rightLabel: '考えてから',
    dimension: '実行',
    element: 'execution'
  },

  // 🧑‍🧑‍🧒 協働エレメント（2問）
  {
    id: 15,
    question: '一人の方が集中できる',
    leftLabel: '一人',
    rightLabel: '仲間と',
    dimension: '協働',
    element: 'collaboration'
  },
  {
    id: 16,
    question: 'アイデアは一人の方が浮かびやすい',
    leftLabel: '一人',
    rightLabel: '協働',
    dimension: '協働',
    element: 'collaboration'
  }
];
