import { describe, it, expect } from 'vitest';
import { calculateScores } from './scoreCalculator';

// ヘルパー関数: 配列形式のスコアを0-1スケールのオブジェクトに変換
const normalizeScores = (scoresArray) => {
  const dimensionNameToId = {
    '動機': 'motivation',
    '生成': 'generation',
    '進行': 'progress',
    '価値創出': 'value',
    '表現': 'expression',
    '思考': 'thinking',
    '実行': 'execution',
    '協働': 'collaboration'
  };

  const normalized = {};
  scoresArray.forEach(item => {
    const dimensionId = dimensionNameToId[item.dimension];
    if (dimensionId) {
      // -4〜+4 → 0〜1の変換: (score + 4) / 8
      normalized[dimensionId] = (item.score + 4) / 8;
    }
  });
  return normalized;
};

describe('scoreCalculator', () => {
  describe('calculateScores', () => {
    it('動機軸: 内発キーワードを4回選択すると1.0（内発側）になる', () => {
      const swipeHistory = [
        { dimension: '動機', pole: '内発', direction: 'match' },
        { dimension: '動機', pole: '内発', direction: 'match' },
        { dimension: '動機', pole: '内発', direction: 'match' },
        { dimension: '動機', pole: '内発', direction: 'match' },
      ];

      const scoresArray = calculateScores(swipeHistory);
      const scores = normalizeScores(scoresArray);
      expect(scores.motivation).toBe(1.0);
    });

    it('動機軸: 目的整合キーワードを4回選択すると0.0（目的整合側）になる', () => {
      const swipeHistory = [
        { dimension: '動機', pole: '目的整合', direction: 'match' },
        { dimension: '動機', pole: '目的整合', direction: 'match' },
        { dimension: '動機', pole: '目的整合', direction: 'match' },
        { dimension: '動機', pole: '目的整合', direction: 'match' },
      ];

      const scoresArray = calculateScores(swipeHistory);
      const scores = normalizeScores(scoresArray);
      expect(scores.motivation).toBe(0.0);
    });

    it('動機軸: 2回内発、2回目的整合を選択すると0.5（中央）になる', () => {
      const swipeHistory = [
        { dimension: '動機', pole: '内発', direction: 'match' },
        { dimension: '動機', pole: '内発', direction: 'match' },
        { dimension: '動機', pole: '目的整合', direction: 'match' },
        { dimension: '動機', pole: '目的整合', direction: 'match' },
      ];

      const scoresArray = calculateScores(swipeHistory);
      const scores = normalizeScores(scoresArray);
      expect(scores.motivation).toBe(0.5);
    });

    it('価値創出軸: 発明キーワードを4回選択すると1.0（発明側）になる', () => {
      const swipeHistory = [
        { dimension: '価値創出', pole: '発明', direction: 'match' },
        { dimension: '価値創出', pole: '発明', direction: 'match' },
        { dimension: '価値創出', pole: '発明', direction: 'match' },
        { dimension: '価値創出', pole: '発明', direction: 'match' },
      ];

      const scoresArray = calculateScores(swipeHistory);
      const scores = normalizeScores(scoresArray);
      expect(scores.value).toBe(1.0);
    });

    it('価値創出軸: 改善キーワードを4回選択すると0.0（改善側）になる', () => {
      const swipeHistory = [
        { dimension: '価値創出', pole: '改善', direction: 'match' },
        { dimension: '価値創出', pole: '改善', direction: 'match' },
        { dimension: '価値創出', pole: '改善', direction: 'match' },
        { dimension: '価値創出', pole: '改善', direction: 'match' },
      ];

      const scoresArray = calculateScores(swipeHistory);
      const scores = normalizeScores(scoresArray);
      expect(scores.value).toBe(0.0);
    });

    it('全8軸のスコアを正しく計算する', () => {
      const swipeHistory = [
        // 動機: 内発×2、目的整合×2 → 0.5
        { dimension: '動機', pole: '内発', direction: 'match' },
        { dimension: '動機', pole: '内発', direction: 'match' },
        { dimension: '動機', pole: '目的整合', direction: 'match' },
        { dimension: '動機', pole: '目的整合', direction: 'match' },
        // 生成: 発散×4 → 1.0
        { dimension: '生成', pole: '発散', direction: 'match' },
        { dimension: '生成', pole: '発散', direction: 'match' },
        { dimension: '生成', pole: '発散', direction: 'match' },
        { dimension: '生成', pole: '発散', direction: 'match' },
        // 進行: 粘り×4 → 0.0
        { dimension: '進行', pole: '粘り', direction: 'match' },
        { dimension: '進行', pole: '粘り', direction: 'match' },
        { dimension: '進行', pole: '粘り', direction: 'match' },
        { dimension: '進行', pole: '粘り', direction: 'match' },
        // 価値創出: 発明×3、改善×1 → 0.75
        { dimension: '価値創出', pole: '発明', direction: 'match' },
        { dimension: '価値創出', pole: '発明', direction: 'match' },
        { dimension: '価値創出', pole: '発明', direction: 'match' },
        { dimension: '価値創出', pole: '改善', direction: 'match' },
        // 表現: pole_a='自己表現', pole_b='共感価値'
        // 自己表現×3（+3）、共感価値×1（-1）→ score=2 → (2+4)/8=0.75
        { dimension: '表現', pole: '自己表現', direction: 'match' },
        { dimension: '表現', pole: '自己表現', direction: 'match' },
        { dimension: '表現', pole: '自己表現', direction: 'match' },
        { dimension: '表現', pole: '共感価値', direction: 'match' },
        // 思考: 抽象×2、具体×2 → 0.5
        { dimension: '思考', pole: '抽象', direction: 'match' },
        { dimension: '思考', pole: '抽象', direction: 'match' },
        { dimension: '思考', pole: '具体', direction: 'match' },
        { dimension: '思考', pole: '具体', direction: 'match' },
        // 実行: 設計×4 → 0.0
        { dimension: '実行', pole: '設計', direction: 'match' },
        { dimension: '実行', pole: '設計', direction: 'match' },
        { dimension: '実行', pole: '設計', direction: 'match' },
        { dimension: '実行', pole: '設計', direction: 'match' },
        // 協働: 協働駆動×4 → 1.0 (pole_bが協働駆動なので-1が4回 → -4 → 0.0になる)
        { dimension: '協働', pole: '協働駆動', direction: 'match' },
        { dimension: '協働', pole: '協働駆動', direction: 'match' },
        { dimension: '協働', pole: '協働駆動', direction: 'match' },
        { dimension: '協働', pole: '協働駆動', direction: 'match' },
      ];

      const scoresArray = calculateScores(swipeHistory);
      const scores = normalizeScores(scoresArray);

      expect(scores.motivation).toBe(0.5);
      expect(scores.generation).toBe(1.0);
      expect(scores.progress).toBe(0.0);
      expect(scores.value).toBe(0.75);
      expect(scores.expression).toBe(0.75); // 自己表現×3、共感価値×1 → 0.75
      expect(scores.thinking).toBe(0.5);
      expect(scores.execution).toBe(0.0);
      // 協働は pole_a='単独集中', pole_b='協働駆動' なので、
      // 協働駆動×4回 = -4 → (−4 + 4) / 8 = 0.0（期待値を修正）
      expect(scores.collaboration).toBe(0.0);
    });

    it('空の履歴では全ての軸が0.5（中央）になる', () => {
      const scoresArray = calculateScores([]);
      const scores = normalizeScores(scoresArray);

      expect(scores.motivation).toBe(0.5);
      expect(scores.generation).toBe(0.5);
      expect(scores.progress).toBe(0.5);
      expect(scores.value).toBe(0.5);
      expect(scores.expression).toBe(0.5);
      expect(scores.thinking).toBe(0.5);
      expect(scores.execution).toBe(0.5);
      expect(scores.collaboration).toBe(0.5);
    });
  });
});
