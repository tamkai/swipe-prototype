// CSVからキーワードをランダム選出するユーティリティ

/**
 * CSVテキストをパースして配列に変換
 * @param {string} csvText - CSVファイルの内容
 * @returns {Array} パースされたデータ配列
 */
export const parseCSV = (csvText) => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      dimension: values[0],
      pole_a: values[1],
      keyword_a: values[2],
      pole_b: values[3],
      keyword_b: values[4]
    };
  });
};

/**
 * 配列をシャッフルする（Fisher-Yates アルゴリズム）
 * @param {Array} array - シャッフルする配列
 * @returns {Array} シャッフルされた新しい配列
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * 各次元から指定数のキーワードペアをランダム選出
 * @param {Array} allPairs - 全てのキーワードペア
 * @param {number} pairsPerDimension - 各次元から選出する数（デフォルト: 4）
 * @returns {Array} 選出されたキーワードペア
 */
export const selectRandomPairs = (allPairs, pairsPerDimension = 4) => {
  // 次元ごとにグループ化
  const groupedByDimension = allPairs.reduce((acc, pair) => {
    if (!acc[pair.dimension]) {
      acc[pair.dimension] = [];
    }
    acc[pair.dimension].push(pair);
    return acc;
  }, {});

  // 各次元からランダムに選出
  const selectedPairs = [];
  Object.entries(groupedByDimension).forEach(([dimension, pairs]) => {
    const shuffled = shuffleArray(pairs);
    const selected = shuffled.slice(0, pairsPerDimension);
    selectedPairs.push(...selected);
  });

  return selectedPairs;
};

/**
 * キーワードペアをkeywordSwipeData形式に変換
 * pole_a/pole_bのどちらをメインにするかをランダムに決定
 * @param {Array} pairs - キーワードペア配列
 * @returns {Array} keywordSwipeData形式の配列
 */
export const convertToSwipeData = (pairs) => {
  let idCounter = 1;

  const swipeData = pairs.map(pair => {
    // 50%の確率でpole_aとpole_bを入れ替え
    const useMainAsPoleA = Math.random() > 0.5;

    if (useMainAsPoleA) {
      // pole_aをメインキーワードにする
      return {
        id: idCounter++,
        keyword: pair.keyword_a,
        compareTo: pair.keyword_b,
        dimension: pair.dimension,
        pole: pair.pole_a
      };
    } else {
      // pole_bをメインキーワードにする
      return {
        id: idCounter++,
        keyword: pair.keyword_b,
        compareTo: pair.keyword_a,
        dimension: pair.dimension,
        pole: pair.pole_b
      };
    }
  });

  // 最終的に順序もシャッフル
  return shuffleArray(swipeData);
};

/**
 * CSVからランダムにキーワードセットを生成（メイン関数）
 * @param {string} csvText - CSVファイルの内容
 * @param {number} pairsPerDimension - 各次元から選出する数（デフォルト: 4）
 * @returns {Array} keywordSwipeData形式の配列
 */
export const generateRandomKeywordSet = (csvText, pairsPerDimension = 4) => {
  // 1. CSVをパース
  const allPairs = parseCSV(csvText);

  // 2. 各次元からランダム選出
  const selectedPairs = selectRandomPairs(allPairs, pairsPerDimension);

  // 3. swipeData形式に変換（pole反転 + シャッフル）
  const swipeData = convertToSwipeData(selectedPairs);

  return swipeData;
};
