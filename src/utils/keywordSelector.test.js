import { describe, it, expect } from 'vitest';
import { parseCSV, selectRandomPairs, convertToSwipeData } from './keywordSelector';

describe('keywordSelector', () => {
  const mockCSV = `dimension,pole_a,keyword_a,pole_b,keyword_b
動機,目的整合,期待に応える,内発,情熱に従う
動機,目的整合,戦略的に動く,内発,好奇心で動く
生成,収束,一つに絞る,発散,広げてみる
生成,収束,深く掘る,発散,飛び回る
価値創出,改善,磨き上げる,発明,生み出す
価値創出,改善,最適化する,発明,創造する`;

  describe('parseCSV', () => {
    it('CSVを正しくパースして配列に変換する', () => {
      const result = parseCSV(mockCSV);

      expect(result).toHaveLength(6);
      expect(result[0]).toEqual({
        dimension: '動機',
        pole_a: '目的整合',
        keyword_a: '期待に応える',
        pole_b: '内発',
        keyword_b: '情熱に従う'
      });
    });

    it('空白行やヘッダーのみのCSVでも正常に動作する', () => {
      const emptyCSV = 'dimension,pole_a,keyword_a,pole_b,keyword_b\n';
      const result = parseCSV(emptyCSV);

      expect(result).toHaveLength(0);
    });
  });

  describe('selectRandomPairs', () => {
    it('各次元から指定数のペアをランダムに選出する', () => {
      const pairs = parseCSV(mockCSV);
      const result = selectRandomPairs(pairs, 1);

      // 3次元（動機、生成、価値創出）× 1ペア = 3ペア
      expect(result).toHaveLength(3);

      // 各次元から1つずつ選ばれているか確認
      const dimensions = result.map(pair => pair.dimension);
      expect(dimensions).toContain('動機');
      expect(dimensions).toContain('生成');
      expect(dimensions).toContain('価値創出');
    });

    it('指定数が多い場合でもその次元の最大数を超えない', () => {
      const pairs = parseCSV(mockCSV);
      const result = selectRandomPairs(pairs, 10); // 動機と生成は2ペアしかない

      // 動機×2、生成×2、価値創出×2 = 6ペア
      expect(result).toHaveLength(6);
    });
  });

  describe('convertToSwipeData', () => {
    it('ペアをスワイプデータ形式に変換する', () => {
      const pairs = parseCSV(mockCSV);
      const selected = selectRandomPairs(pairs, 1);
      const result = convertToSwipeData(selected);

      expect(result).toHaveLength(3);

      // 各アイテムの構造を確認
      result.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('keyword');
        expect(item).toHaveProperty('compareTo');
        expect(item).toHaveProperty('dimension');
        expect(item).toHaveProperty('pole');

        // pole反転の確認（keyword_aまたはkeyword_bのいずれか）
        expect(['期待に応える', '情熱に従う', '戦略的に動く', '好奇心で動く',
                '一つに絞る', '広げてみる', '深く掘る', '飛び回る',
                '磨き上げる', '生み出す', '最適化する', '創造する'])
          .toContain(item.keyword);
      });
    });

    it('pole反転が50%の確率で発生する（統計的検証）', () => {
      const pairs = parseCSV(mockCSV);
      const selected = selectRandomPairs(pairs, 2);

      // 100回実行して pole_a が選ばれた回数をカウント
      let poleACount = 0;
      const iterations = 100;

      for (let i = 0; i < iterations; i++) {
        const result = convertToSwipeData(selected);
        result.forEach(item => {
          // keyword_aが選ばれた場合はpoleAとしてカウント
          const originalPair = pairs.find(p =>
            p.keyword_a === item.keyword || p.keyword_b === item.keyword
          );
          if (originalPair && originalPair.keyword_a === item.keyword) {
            poleACount++;
          }
        });
      }

      const totalSelections = iterations * selected.length;
      const poleARatio = poleACount / totalSelections;

      // 50% ± 15% の範囲内であることを確認（統計的な揺らぎを考慮）
      expect(poleARatio).toBeGreaterThan(0.35);
      expect(poleARatio).toBeLessThan(0.65);
    });
  });
});
