import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// .envファイルを読み込む
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

// Supabaseクライアントの初期化
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase環境変数が設定されていません');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Supabaseからデータを取得してサンプルデータを生成
 */
async function generateSampleData() {
  try {
    console.log('📊 Supabaseからデータを取得中...\n');

    // メインテーブルのデータを取得
    const { data: responses, error: responsesError } = await supabase
      .from('afflatus_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (responsesError) {
      console.error('❌ データ取得エラー:', responsesError);
      throw responsesError;
    }

    if (!responses || responses.length === 0) {
      console.log('⚠️  データが見つかりませんでした');
      console.log('Supabase URL:', supabaseUrl);
      console.log('テーブル名: afflatus_responses');
      return;
    }

    console.log(`✅ ${responses.length}件のデータを取得しました\n`);

    // 各レスポンスに対してLife Reflectionと価値観を取得
    const enrichedData = await Promise.all(responses.map(async (response) => {
      // Life Reflectionを取得
      const { data: lifeReflection } = await supabase
        .from('life_reflections')
        .select('*')
        .eq('response_id', response.id)
        .single();

      // 価値観を取得
      const { data: values } = await supabase
        .from('personal_values')
        .select('*')
        .eq('response_id', response.id)
        .single();

      // パーパスを取得
      const { data: purpose } = await supabase
        .from('personal_purposes')
        .select('*')
        .eq('response_id', response.id)
        .single();

      return {
        ...response,
        life_reflection: lifeReflection,
        personal_values: values,
        personal_purpose: purpose
      };
    }));

    // タムラカイさんのデータを探す
    const tamkaiData = enrichedData.find(d => d.name === 'タムラカイ');

    if (!tamkaiData) {
      console.log('⚠️  タムラカイさんのデータが見つかりませんでした');
      console.log('利用可能なデータ:');
      enrichedData.forEach((d, i) => {
        console.log(`  ${i + 1}. ${d.name} (ID: ${d.id})`);
      });
      return;
    }

    console.log('✅ タムラカイさんのデータを見つけました\n');

    // サンプルデータを生成（3人分）
    const sampleData = [
      // 1. タムラカイさんの実データ
      tamkaiData,

      // 2. サンプル1: 若干異なるデータ
      {
        ...tamkaiData,
        id: 999,
        name: '山田太郎',
        title: 'プロダクトマネージャー',
        creative_experience: 0.65,
        type1_motivation: tamkaiData.type1_motivation * 0.9,
        type1_generation: tamkaiData.type1_generation * 1.1,
        type2_motivation: tamkaiData.type2_motivation * 1.15,
        type2_generation: tamkaiData.type2_generation * 0.85,
        life_reflection: tamkaiData.life_reflection ? {
          ...tamkaiData.life_reflection,
          age_0_10_item1: 'ピアノを習い始める',
          age_11_20_item1: '部活動でリーダーを経験',
          age_21_now_item1: '新規事業の立ち上げ',
          career_reason: 'ユーザーの課題を解決することにやりがいを感じたから'
        } : null,
        personal_values: tamkaiData.personal_values ? {
          ...tamkaiData.personal_values,
          value1: '誠実さ',
          value2: '挑戦',
          value3: '成長'
        } : null
      },

      // 3. サンプル2: さらに異なるデータ
      {
        ...tamkaiData,
        id: 998,
        name: '佐藤花子',
        title: 'UXデザイナー',
        creative_experience: 0.82,
        type1_motivation: tamkaiData.type1_motivation * 1.2,
        type1_generation: tamkaiData.type1_generation * 0.8,
        type1_thinking: tamkaiData.type1_thinking * 1.3,
        type2_motivation: tamkaiData.type2_motivation * 0.7,
        type2_generation: tamkaiData.type2_generation * 1.25,
        type2_thinking: tamkaiData.type2_thinking * 0.9,
        life_reflection: tamkaiData.life_reflection ? {
          ...tamkaiData.life_reflection,
          age_0_10_item1: '絵を描くことが好きだった',
          age_0_10_item2: '工作教室に通う',
          age_11_20_item1: '美術部で活動',
          age_11_20_item2: 'デザインコンテストで入賞',
          age_21_now_item1: 'デザイン会社に就職',
          age_21_now_item2: 'フリーランスとして独立',
          career_reason: '人の感情を動かすデザインを作りたかったから'
        } : null,
        personal_values: tamkaiData.personal_values ? {
          ...tamkaiData.personal_values,
          value1: '美しさ',
          value2: '共感',
          value3: '自由'
        } : null
      }
    ];

    // JSONファイルとして保存
    const outputPath = join(__dirname, 'sampleData.json');
    fs.writeFileSync(outputPath, JSON.stringify(sampleData, null, 2), 'utf-8');
    console.log(`✅ サンプルデータを生成しました: ${outputPath}\n`);

    // 人間が読みやすい形式でも出力
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 サンプルデータ概要');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    sampleData.forEach((data, index) => {
      console.log(`${index + 1}. ${data.name} (${data.title || '肩書きなし'})`);
      console.log(`   創造体験レベル: ${Math.round(data.creative_experience * 100)}%`);
      console.log(`   タイプ1動機: ${(data.type1_motivation * 100).toFixed(0)}%`);
      console.log(`   タイプ2動機: ${(data.type2_motivation * 100).toFixed(0)}%`);
      if (data.personal_values) {
        console.log(`   価値観: ${data.personal_values.value1}, ${data.personal_values.value2}, ${data.personal_values.value3}`);
      }
      console.log('');
    });

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ エラーが発生しました:', error);
    process.exit(1);
  }
}

// 実行
generateSampleData();
