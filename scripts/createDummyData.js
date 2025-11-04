/**
 * ダミーサンプルデータを生成
 * タムラカイさんをベースに3人分のサンプルデータを作成
 */

// タムラカイさんをベースにした基本データ
const baseData = {
  id: 1,
  session_id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'タムラカイ',
  title: 'プロダクトデザイナー',
  creative_experience: 0.75,

  // Type1結果（直感判断）
  type1_motivation: 0.65,
  type1_generation: 0.55,
  type1_progress: 0.72,
  type1_value: 0.48,
  type1_expression: 0.68,
  type1_thinking: 0.52,
  type1_execution: 0.61,
  type1_collaboration: 0.58,

  // Type2結果（自己認識）
  type2_motivation: 0.58,
  type2_generation: 0.71,
  type2_progress: 0.65,
  type2_value: 0.54,
  type2_expression: 0.62,
  type2_thinking: 0.69,
  type2_execution: 0.57,
  type2_collaboration: 0.63,

  swipe_history: [],
  slider_history: [],
  interview_memo: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),

  life_reflection: {
    id: 1,
    response_id: 1,
    age_0_10_item1: 'レゴブロックで家を作る',
    age_0_10_item2: '折り紙で動物を作る',
    age_0_10_item3: 'お絵かきが好きだった',
    age_0_10_item4: null,
    age_0_10_item5: null,
    age_11_20_item1: '美術部で活動',
    age_11_20_item2: '文化祭でポスターデザイン',
    age_11_20_item3: 'プログラミングを独学',
    age_11_20_item4: null,
    age_11_20_item5: null,
    age_21_now_item1: 'デザイン会社に就職',
    age_21_now_item2: 'UXデザインに興味を持つ',
    age_21_now_item3: '新規サービスの立ち上げ',
    age_21_now_item4: null,
    age_21_now_item5: null,
    career_reason: 'ユーザーの課題を解決するプロダクトを作りたかったから',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  personal_values: {
    id: 1,
    response_id: 1,
    value1: '誠実さ',
    value2: '挑戦',
    value3: '成長',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  personal_purpose: {
    id: 1,
    response_id: 1,
    purpose: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
};

// サンプルデータ1: 山田太郎（PM、内発的・発散的）
const sample1 = {
  ...baseData,
  id: 2,
  session_id: '223e4567-e89b-12d3-a456-426614174001',
  name: '山田太郎',
  title: 'プロダクトマネージャー',
  creative_experience: 0.68,

  type1_motivation: 0.72, // より内発的
  type1_generation: 0.81, // より発散的
  type1_progress: 0.65,
  type1_value: 0.52,
  type1_expression: 0.58,
  type1_thinking: 0.48,
  type1_execution: 0.55,
  type1_collaboration: 0.74, // より協働的

  type2_motivation: 0.63,
  type2_generation: 0.69,
  type2_progress: 0.71,
  type2_value: 0.59,
  type2_expression: 0.66,
  type2_thinking: 0.52,
  type2_execution: 0.61,
  type2_collaboration: 0.68,

  life_reflection: {
    ...baseData.life_reflection,
    id: 2,
    response_id: 2,
    age_0_10_item1: 'サッカーチームでキャプテン',
    age_0_10_item2: '友達と秘密基地を作る',
    age_0_10_item3: 'ゲームのルールを考えるのが好き',
    age_11_20_item1: '生徒会長として学校行事を企画',
    age_11_20_item2: 'ボランティア活動に参加',
    age_11_20_item3: 'プログラミング部を創設',
    age_21_now_item1: 'スタートアップでインターン',
    age_21_now_item2: '0→1プロダクト開発',
    age_21_now_item3: 'チームマネジメントを経験',
    career_reason: 'チームで新しい価値を生み出すことにやりがいを感じたから'
  },

  personal_values: {
    ...baseData.personal_values,
    id: 2,
    response_id: 2,
    value1: '共創',
    value2: '情熱',
    value3: 'インパクト'
  },

  personal_purpose: {
    ...baseData.personal_purpose,
    id: 2,
    response_id: 2
  }
};

// サンプルデータ2: 佐藤花子（デザイナー、抽象的・自己表現的）
const sample2 = {
  ...baseData,
  id: 3,
  session_id: '323e4567-e89b-12d3-a456-426614174002',
  name: '佐藤花子',
  title: 'UXデザイナー',
  creative_experience: 0.85,

  type1_motivation: 0.78, // 内発的
  type1_generation: 0.68,
  type1_progress: 0.59,
  type1_value: 0.42, // より改善的
  type1_expression: 0.82, // より自己表現的
  type1_thinking: 0.74, // より抽象的
  type1_execution: 0.48,
  type1_collaboration: 0.51,

  type2_motivation: 0.71,
  type2_generation: 0.75,
  type2_progress: 0.62,
  type2_value: 0.51,
  type2_expression: 0.79,
  type2_thinking: 0.68,
  type2_execution: 0.54,
  type2_collaboration: 0.58,

  life_reflection: {
    ...baseData.life_reflection,
    id: 3,
    response_id: 3,
    age_0_10_item1: '絵を描くことが好きだった',
    age_0_10_item2: '工作教室に通う',
    age_0_10_item3: '物語を書いてイラストを描く',
    age_0_10_item4: '色彩に興味を持つ',
    age_11_20_item1: '美術部で活動',
    age_11_20_item2: 'デザインコンテストで入賞',
    age_11_20_item3: '個展を開催',
    age_11_20_item4: 'グラフィックデザインを学ぶ',
    age_21_now_item1: 'デザイン会社に就職',
    age_21_now_item2: 'UI/UXデザインに転向',
    age_21_now_item3: 'フリーランスとして独立',
    age_21_now_item4: 'デザインシステムを構築',
    career_reason: '人の感情を動かすデザインを作りたかったから'
  },

  personal_values: {
    ...baseData.personal_values,
    id: 3,
    response_id: 3,
    value1: '美しさ',
    value2: '共感',
    value3: '自由'
  },

  personal_purpose: {
    ...baseData.personal_purpose,
    id: 3,
    response_id: 3
  }
};

// サンプルデータをエクスポート
const sampleData = [baseData, sample1, sample2];

// JSONファイルとして出力
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputPath = join(__dirname, 'sampleData.json');

fs.writeFileSync(outputPath, JSON.stringify(sampleData, null, 2), 'utf-8');

console.log('✅ サンプルデータを生成しました:', outputPath);
console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📋 サンプルデータ概要');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

sampleData.forEach((data, index) => {
  console.log(`${index + 1}. ${data.name} (${data.title})`);
  console.log(`   創造体験レベル: ${Math.round(data.creative_experience * 100)}%`);
  console.log(`   タイプ1動機: ${(data.type1_motivation * 100).toFixed(0)}% | タイプ2動機: ${(data.type2_motivation * 100).toFixed(0)}%`);
  console.log(`   タイプ1生成: ${(data.type1_generation * 100).toFixed(0)}% | タイプ2生成: ${(data.type2_generation * 100).toFixed(0)}%`);
  console.log(`   価値観: ${data.personal_values.value1}, ${data.personal_values.value2}, ${data.personal_values.value3}`);
  console.log('');
});

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log('💡 このデータは管理画面のテストに使えます');
console.log('');
