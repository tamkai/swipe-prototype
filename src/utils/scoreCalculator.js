// スコア計算ユーティリティ

/**
 * キーワードスワイプの結果から8次元スコアを計算
 * @param {Array} swipeHistory - スワイプ履歴の配列
 * @returns {Object} 8次元のスコア結果
 */
export const calculateScores = (swipeHistory) => {
  // 8次元の初期化
  // pole_a: 右側（1.0に近い）、pole_b: 左側（0.0に近い）
  const dimensions = {
    '動機': { score: 0, count: 0, pole_a: '内発', pole_b: '目的整合' },
    '生成': { score: 0, count: 0, pole_a: '発散', pole_b: '収束' },
    '進行': { score: 0, count: 0, pole_a: '柔軟', pole_b: '粘り' },
    '価値創出': { score: 0, count: 0, pole_a: '発明', pole_b: '改善' },  // ← 修正: pole_aとpole_bを入れ替え
    '表現': { score: 0, count: 0, pole_a: '自己表現', pole_b: '共感価値' },
    '思考': { score: 0, count: 0, pole_a: '抽象', pole_b: '具体' },
    '実行': { score: 0, count: 0, pole_a: '即興', pole_b: '設計' },
    '協働': { score: 0, count: 0, pole_a: '単独集中', pole_b: '協働駆動' }
  };

  // スワイプ履歴から集計
  swipeHistory.forEach(item => {
    const dim = item.dimension;
    if (!dimensions[dim]) return;

    // pole情報から判定
    // pole_a（左側）に該当する場合は +1、pole_b（右側）は -1
    if (item.direction === 'match') {
      // 「当てはまる」を選択
      if (item.pole === dimensions[dim].pole_a) {
        dimensions[dim].score += 1;
      } else {
        dimensions[dim].score -= 1;
      }
    } else if (item.direction === 'not_match') {
      // 「当てはまらない」を選択（逆転）
      if (item.pole === dimensions[dim].pole_a) {
        dimensions[dim].score -= 1;
      } else {
        dimensions[dim].score += 1;
      }
    }
    // 'neither'（どちらともいえない）は 0 なので加算しない

    dimensions[dim].count += 1;
  });

  // 結果を配列形式に変換
  return Object.entries(dimensions).map(([name, data]) => ({
    dimension: name,
    score: data.score,
    count: data.count,
    pole_a: data.pole_a,
    pole_b: data.pole_b,
    maxScore: data.count // 最大スコア（質問数と同じ）
  }));
};

/**
 * スコアをパーセンテージに変換
 * @param {number} score - スコア値
 * @param {number} maxScore - 最大スコア
 * @returns {number} -100 〜 +100 のパーセンテージ
 */
export const scoreToPercentage = (score, maxScore) => {
  if (maxScore === 0) return 0;
  return Math.round((score / maxScore) * 100);
};
