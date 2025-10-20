// 8次元の説明とスコアコメント

export const dimensionDescriptions = {
  '動機': {
    title: '創造活動の原動力',
    description: '何があなたの創造性を駆動するのか',
    pole_a_label: '内発的',
    pole_b_label: '目的整合的',
    pole_a_description: '好奇心・興味関心・探究心から自発的に動く',
    pole_b_description: '目標・使命・責任感から目的を持って動く'
  },
  '生成': {
    title: 'アイデアの生み出し方',
    description: '新しいアイデアをどのように発想するか',
    pole_a_label: '発散思考',
    pole_b_label: '収束思考',
    pole_a_description: '可能性を広げ、多様なアイデアを量産する',
    pole_b_description: '可能性を絞り、質の高いアイデアに集約する'
  },
  '進行': {
    title: 'プロセスの進め方',
    description: 'プロジェクトをどう推進していくか',
    pole_a_label: '柔軟対応',
    pole_b_label: '粘り強さ',
    pole_a_description: '状況に応じて柔軟に方向転換する',
    pole_b_description: '一貫して粘り強く継続する'
  },
  '価値創出': {
    title: '創造の方向性',
    description: 'どのような価値を生み出そうとするか',
    pole_a_label: '改善志向',
    pole_b_label: '発明志向',
    pole_a_description: '既存のものを最適化・改良する',
    pole_b_description: '全く新しいものを創造・革新する'
  },
  '表現': {
    title: '表現のスタイル',
    description: 'アイデアをどう表現するか',
    pole_a_label: '自己表現',
    pole_b_label: '共感価値',
    pole_a_description: '独自性や個性を大切にする',
    pole_b_description: '相手目線で伝わりやすさを重視する'
  },
  '思考': {
    title: '思考の抽象度',
    description: 'どのレベルで物事を考えるか',
    pole_a_label: '抽象思考',
    pole_b_label: '具体思考',
    pole_a_description: '概念化・モデル化して本質を捉える',
    pole_b_description: '具体例・実践を通して理解する'
  },
  '実行': {
    title: '実行のスタイル',
    description: 'アイデアをどう実行に移すか',
    pole_a_label: '即興実行',
    pole_b_label: '計画実行',
    pole_a_description: '動きながら考え、スピード優先で進める',
    pole_b_description: '事前に設計し、計画的に進める'
  },
  '協働': {
    title: '協働のスタイル',
    description: '他者とどう関わって創造するか',
    pole_a_label: '単独集中',
    pole_b_label: '協働駆動',
    pole_a_description: '一人で集中して取り組む',
    pole_b_description: 'チームで対話しながら進める'
  }
};

/**
 * スコアに応じたコメントを生成
 * @param {number} score - スコア値（-4 〜 +4）
 * @param {string} pole_a - 正の極のラベル
 * @param {string} pole_b - 負の極のラベル
 * @returns {string} コメント文
 */
export const getScoreComment = (score, pole_a, pole_b) => {
  if (score === 4) {
    return `非常に強く${pole_a}に偏っています`;
  } else if (score === 3) {
    return `強く${pole_a}に偏っています`;
  } else if (score === 2) {
    return `やや${pole_a}寄りです`;
  } else if (score === 1) {
    return `わずかに${pole_a}寄りです`;
  } else if (score === 0) {
    return `バランスが取れています`;
  } else if (score === -1) {
    return `わずかに${pole_b}寄りです`;
  } else if (score === -2) {
    return `やや${pole_b}寄りです`;
  } else if (score === -3) {
    return `強く${pole_b}に偏っています`;
  } else if (score === -4) {
    return `非常に強く${pole_b}に偏っています`;
  }
  return '';
};
