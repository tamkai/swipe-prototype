// 案F: キーワードスワイプアセスメント
// 32個のキーワードに対して「当てはまる/当てはまらない/どちらともいえない」で回答
// 各キーワードに対極ペアを設定

export const keywordSwipeData = [
  // 🔥 動機エレメント（4個）
  { id: 1, keyword: '情熱', compareTo: '冷静', dimension: '動機', pole: '内発' },
  { id: 2, keyword: '好奇心', compareTo: '慎重さ', dimension: '動機', pole: '内発' },
  { id: 3, keyword: '目標達成', compareTo: '自由探索', dimension: '動機', pole: '目的整合' },
  { id: 4, keyword: '社会貢献', compareTo: '自己実現', dimension: '動機', pole: '目的整合' },

  // 🪚 生成エレメント（4個）
  { id: 5, keyword: 'ブレスト', compareTo: '精査', dimension: '生成', pole: '発散' },
  { id: 6, keyword: 'アイデア出し', compareTo: '絞り込み', dimension: '生成', pole: '発散' },
  { id: 7, keyword: '分析', compareTo: '直感', dimension: '生成', pole: '収束' },
  { id: 8, keyword: '論理的思考', compareTo: '自由発想', dimension: '生成', pole: '収束' },

  // 📅 進行エレメント（4個）
  { id: 9, keyword: '柔軟性', compareTo: '一貫性', dimension: '進行', pole: '柔軟' },
  { id: 10, keyword: '切り替え', compareTo: '継続', dimension: '進行', pole: '柔軟' },
  { id: 11, keyword: '粘り強さ', compareTo: '素早い判断', dimension: '進行', pole: '粘り' },
  { id: 12, keyword: 'やり抜く力', compareTo: '臨機応変', dimension: '進行', pole: '粘り' },

  // 💎 価値創出エレメント（4個）
  { id: 13, keyword: '改善', compareTo: '創造', dimension: '価値創出', pole: '改善' },
  { id: 14, keyword: '最適化', compareTo: '実験', dimension: '価値創出', pole: '改善' },
  { id: 15, keyword: '発明', compareTo: '改良', dimension: '価値創出', pole: '発明' },
  { id: 16, keyword: 'イノベーション', compareTo: '安定運用', dimension: '価値創出', pole: '発明' },

  // 🎨 表現エレメント（4個）
  { id: 17, keyword: '自己表現', compareTo: '配慮', dimension: '表現', pole: '自己表現' },
  { id: 18, keyword: '独自性', compareTo: '親しみやすさ', dimension: '表現', pole: '自己表現' },
  { id: 19, keyword: '共感', compareTo: '個性', dimension: '表現', pole: '共感価値' },
  { id: 20, keyword: '伝わりやすさ', compareTo: '表現の深さ', dimension: '表現', pole: '共感価値' },

  // 🧠 思考エレメント（4個）
  { id: 21, keyword: '抽象的思考', compareTo: '現場感覚', dimension: '思考', pole: '抽象' },
  { id: 22, keyword: '概念化', compareTo: '事例収集', dimension: '思考', pole: '抽象' },
  { id: 23, keyword: '具体例', compareTo: 'モデル', dimension: '思考', pole: '具体' },
  { id: 24, keyword: '実践的', compareTo: '理論的', dimension: '思考', pole: '具体' },

  // 🏃 実行エレメント（4個）
  { id: 25, keyword: '即興', compareTo: '準備', dimension: '実行', pole: '即興' },
  { id: 26, keyword: 'スピード感', compareTo: '丁寧さ', dimension: '実行', pole: '即興' },
  { id: 27, keyword: '計画性', compareTo: '柔軟対応', dimension: '実行', pole: '設計' },
  { id: 28, keyword: '段取り', compareTo: 'アドリブ', dimension: '実行', pole: '設計' },

  // 🧑‍🧑‍🧒 協働エレメント（4個）
  { id: 29, keyword: '一人で集中', compareTo: 'みんなで', dimension: '協働', pole: '単独集中' },
  { id: 30, keyword: 'マイペース', compareTo: '協調', dimension: '協働', pole: '単独集中' },
  { id: 31, keyword: 'チームワーク', compareTo: '自律', dimension: '協働', pole: '協働駆動' },
  { id: 32, keyword: '対話', compareTo: '内省', dimension: '協働', pole: '協働駆動' }
];
