// 案D: 両極比較+反転項目
// 8次元 × 4問 = 32問
// 各次元で正方向・逆方向の質問を混在させて整合性をチェック

export const assessmentQuestionsD = [
  // 🔥 動機エレメント（4問）
  {
    id: 1,
    question: '目標よりも情熱で動くタイプだ',
    dimension: '動機',
    direction: 'positive', // YES = 内発
    element: 'motivation'
  },
  {
    id: 2,
    question: '自分の興味よりも社会的意義を優先する',
    dimension: '動機',
    direction: 'negative', // YES = 目的整合
    element: 'motivation'
  },
  {
    id: 3,
    question: '好奇心で動くことが多い',
    dimension: '動機',
    direction: 'positive', // YES = 内発
    element: 'motivation'
  },
  {
    id: 4,
    question: '責任感で動くことが多い',
    dimension: '動機',
    direction: 'negative', // YES = 目的整合
    element: 'motivation'
  },

  // 🪚 生成エレメント（4問）
  {
    id: 5,
    question: '質よりも量を重視する',
    dimension: '生成',
    direction: 'positive', // YES = 発散
    element: 'generation'
  },
  {
    id: 6,
    question: 'アイデアは絞り込んで深めるタイプだ',
    dimension: '生成',
    direction: 'negative', // YES = 収束
    element: 'generation'
  },
  {
    id: 7,
    question: '幅広く発想を広げるのが得意',
    dimension: '生成',
    direction: 'positive', // YES = 発散
    element: 'generation'
  },
  {
    id: 8,
    question: '論理的に分析して結論を出すのが得意',
    dimension: '生成',
    direction: 'negative', // YES = 収束
    element: 'generation'
  },

  // 📅 進行エレメント（4問）
  {
    id: 9,
    question: 'やり抜くよりも切り替える方が得意',
    dimension: '進行',
    direction: 'positive', // YES = 柔軟
    element: 'progress'
  },
  {
    id: 10,
    question: '一度決めたら最後まで貫く',
    dimension: '進行',
    direction: 'negative', // YES = 粘り
    element: 'progress'
  },
  {
    id: 11,
    question: '複数のことを同時に進める',
    dimension: '進行',
    direction: 'positive', // YES = 柔軟
    element: 'progress'
  },
  {
    id: 12,
    question: '1つのことに集中して取り組む',
    dimension: '進行',
    direction: 'negative', // YES = 粘り
    element: 'progress'
  },

  // 💎 価値創出エレメント（4問）
  {
    id: 13,
    question: '発明よりも改善が得意',
    dimension: '価値創出',
    direction: 'positive', // YES = 改善
    element: 'value'
  },
  {
    id: 14,
    question: '枠組みを変える発想が得意',
    dimension: '価値創出',
    direction: 'negative', // YES = 発明
    element: 'value'
  },
  {
    id: 15,
    question: '現実的な改善策を考えるのが得意',
    dimension: '価値創出',
    direction: 'positive', // YES = 改善
    element: 'value'
  },
  {
    id: 16,
    question: '革新的なアイデアを生み出すのが得意',
    dimension: '価値創出',
    direction: 'negative', // YES = 発明
    element: 'value'
  },

  // 🎨 表現エレメント（4問）
  {
    id: 17,
    question: '相手目線よりも自分らしさを重視する',
    dimension: '表現',
    direction: 'positive', // YES = 自己表現
    element: 'expression'
  },
  {
    id: 18,
    question: '相手に伝わる工夫を優先する',
    dimension: '表現',
    direction: 'negative', // YES = 共感価値
    element: 'expression'
  },
  {
    id: 19,
    question: '独自性を評価されたい',
    dimension: '表現',
    direction: 'positive', // YES = 自己表現
    element: 'expression'
  },
  {
    id: 20,
    question: '役立ちを評価されたい',
    dimension: '表現',
    direction: 'negative', // YES = 共感価値
    element: 'expression'
  },

  // 🧠 思考エレメント（4問）
  {
    id: 21,
    question: '具体的よりも抽象的に考える方が得意',
    dimension: '思考',
    direction: 'positive', // YES = 抽象
    element: 'thinking'
  },
  {
    id: 22,
    question: '実際の事例から理解する',
    dimension: '思考',
    direction: 'negative', // YES = 具体
    element: 'thinking'
  },
  {
    id: 23,
    question: '大きな枠組みを捉えるのが好き',
    dimension: '思考',
    direction: 'positive', // YES = 抽象
    element: 'thinking'
  },
  {
    id: 24,
    question: '実践的な方法から学ぶことが多い',
    dimension: '思考',
    direction: 'negative', // YES = 具体
    element: 'thinking'
  },

  // 🏃 実行エレメント（4問）
  {
    id: 25,
    question: '計画よりも即興で動く',
    dimension: '実行',
    direction: 'positive', // YES = 即興
    element: 'execution'
  },
  {
    id: 26,
    question: '計画を立ててから動く',
    dimension: '実行',
    direction: 'negative', // YES = 設計
    element: 'execution'
  },
  {
    id: 27,
    question: '動きながら考えることが多い',
    dimension: '実行',
    direction: 'positive', // YES = 即興
    element: 'execution'
  },
  {
    id: 28,
    question: '考えてから動くことが多い',
    dimension: '実行',
    direction: 'negative', // YES = 設計
    element: 'execution'
  },

  // 🧑‍🧑‍🧒 協働エレメント（4問）
  {
    id: 29,
    question: '仲間よりも一人の方が力を発揮できる',
    dimension: '協働',
    direction: 'positive', // YES = 単独集中
    element: 'collaboration'
  },
  {
    id: 30,
    question: '仲間と一緒だと力が湧いてくる',
    dimension: '協働',
    direction: 'negative', // YES = 協働駆動
    element: 'collaboration'
  },
  {
    id: 31,
    question: '自分のペースを大切にしたい',
    dimension: '協働',
    direction: 'positive', // YES = 単独集中
    element: 'collaboration'
  },
  {
    id: 32,
    question: '他者との歩調を大切にしたい',
    dimension: '協働',
    direction: 'negative', // YES = 協働駆動
    element: 'collaboration'
  }
];
