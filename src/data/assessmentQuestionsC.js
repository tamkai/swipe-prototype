// 案C: 行動ベースの質問
// 8次元 × 2問 = 16問

export const assessmentQuestionsC = [
  // 🔥 動機エレメント（2問）
  {
    id: 1,
    question: 'やりたいと思ったら理由なく飛び込む',
    dimension: '動機',
    pole: '内発',
    element: 'motivation'
  },
  {
    id: 2,
    question: '誰かの役に立つと分かると力が湧いてくる',
    dimension: '動機',
    pole: '目的整合',
    element: 'motivation'
  },

  // 🪚 生成エレメント（2問）
  {
    id: 3,
    question: 'とにかくたくさんアイデアを出す',
    dimension: '生成',
    pole: '発散',
    element: 'generation'
  },
  {
    id: 4,
    question: '1つのアイデアをじっくり磨き上げる',
    dimension: '生成',
    pole: '収束',
    element: 'generation'
  },

  // 📅 進行エレメント（2問）
  {
    id: 5,
    question: '状況が変わったら即座に方針を切り替える',
    dimension: '進行',
    pole: '柔軟',
    element: 'progress'
  },
  {
    id: 6,
    question: '一度決めたら最後までやり抜く',
    dimension: '進行',
    pole: '粘り',
    element: 'progress'
  },

  // 💎 価値創出エレメント（2問）
  {
    id: 7,
    question: '既にあるものを少しずつ良くする',
    dimension: '価値創出',
    pole: '改善',
    element: 'value'
  },
  {
    id: 8,
    question: 'これまでにない新しいものを生み出す',
    dimension: '価値創出',
    pole: '発明',
    element: 'value'
  },

  // 🎨 表現エレメント（2問）
  {
    id: 9,
    question: '自分が納得できる表現を追求する',
    dimension: '表現',
    pole: '自己表現',
    element: 'expression'
  },
  {
    id: 10,
    question: '相手が理解しやすい伝え方を工夫する',
    dimension: '表現',
    pole: '共感価値',
    element: 'expression'
  },

  // 🧠 思考エレメント（2問）
  {
    id: 11,
    question: '大きな枠組みや構造から考える',
    dimension: '思考',
    pole: '抽象',
    element: 'thinking'
  },
  {
    id: 12,
    question: '具体的な事例や経験から考える',
    dimension: '思考',
    pole: '具体',
    element: 'thinking'
  },

  // 🏃 実行エレメント（2問）
  {
    id: 13,
    question: 'その場の状況に応じて臨機応変に動く',
    dimension: '実行',
    pole: '即興',
    element: 'execution'
  },
  {
    id: 14,
    question: '計画を立ててから着実に進める',
    dimension: '実行',
    pole: '設計',
    element: 'execution'
  },

  // 🧑‍🧑‍🧒 協働エレメント（2問）
  {
    id: 15,
    question: '一人で集中して取り組む',
    dimension: '協働',
    pole: '単独集中',
    element: 'collaboration'
  },
  {
    id: 16,
    question: '仲間と一緒に作り上げる',
    dimension: '協働',
    pole: '協働駆動',
    element: 'collaboration'
  }
];
