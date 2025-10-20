// デバッグ用のダミーデータ生成

/**
 * ダミーのスワイプ履歴を生成
 * @returns {Array} ダミーのswipeHistory
 */
export const generateDummySwipeHistory = () => {
  const dimensions = [
    { dimension: '動機', pole_a: '内発', pole_b: '目的整合' },
    { dimension: '生成', pole_a: '発散', pole_b: '収束' },
    { dimension: '進行', pole_a: '柔軟', pole_b: '粘り' },
    { dimension: '価値創出', pole_a: '改善', pole_b: '発明' },
    { dimension: '表現', pole_a: '自己表現', pole_b: '共感価値' },
    { dimension: '思考', pole_a: '抽象', pole_b: '具体' },
    { dimension: '実行', pole_a: '即興', pole_b: '設計' },
    { dimension: '協働', pole_a: '単独集中', pole_b: '協働駆動' }
  ];

  const directions = ['match', 'not_match', 'neither'];
  const dummyHistory = [];

  // 各次元に4問ずつダミーデータを生成
  dimensions.forEach(dim => {
    for (let i = 0; i < 4; i++) {
      // ランダムに方向と極を選択
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const pole = Math.random() > 0.5 ? dim.pole_a : dim.pole_b;
      const keyword = pole === dim.pole_a ? `${pole}的キーワード${i + 1}` : `${pole}的キーワード${i + 1}`;

      dummyHistory.push({
        keyword: keyword,
        dimension: dim.dimension,
        pole: pole,
        direction: direction,
        timestamp: new Date().toISOString()
      });
    }
  });

  return dummyHistory;
};
