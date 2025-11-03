import { createClient } from '@supabase/supabase-js';

// Supabaseクライアントの初期化
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase環境変数が設定されていません');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * セッションを作成
 * @returns {Promise<string>} セッションID
 */
export const createSession = async () => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .insert([{
        user_agent: navigator.userAgent,
        // IPアドレスはサーバーサイドで取得するため、フロントエンドでは設定しない
      }])
      .select()
      .single();

    if (error) throw error;

    console.log('セッション作成:', data.id);
    return data.id;
  } catch (error) {
    console.error('セッション作成エラー:', error);
    throw error;
  }
};

/**
 * AFFLATUS診断結果を保存
 * @param {string} sessionId - セッションID
 * @param {Object} responseData - 診断結果データ
 * @returns {Promise<Object>} 保存されたデータ
 */
export const saveAfflatusResponse = async (sessionId, responseData) => {
  try {
    const { data, error } = await supabase
      .from('afflatus_responses')
      .insert([{
        session_id: sessionId,
        name: responseData.basicInfo.name,
        title: responseData.basicInfo.title || null,
        creative_experience: responseData.basicInfo.creativeExperience,

        // Type1結果（直感判断）
        type1_motivation: responseData.type1Results.motivation,
        type1_generation: responseData.type1Results.generation,
        type1_progress: responseData.type1Results.progress,
        type1_value: responseData.type1Results.value,
        type1_expression: responseData.type1Results.expression,
        type1_thinking: responseData.type1Results.thinking,
        type1_execution: responseData.type1Results.execution,
        type1_collaboration: responseData.type1Results.collaboration,

        // Type2結果（自己認識）
        type2_motivation: responseData.type2Results.motivation,
        type2_generation: responseData.type2Results.generation,
        type2_progress: responseData.type2Results.progress,
        type2_value: responseData.type2Results.value,
        type2_expression: responseData.type2Results.expression,
        type2_thinking: responseData.type2Results.thinking,
        type2_execution: responseData.type2Results.execution,
        type2_collaboration: responseData.type2Results.collaboration,

        // Raw data
        swipe_history: responseData.swipeHistory || [],
        slider_history: responseData.sliderHistory || []
      }])
      .select()
      .single();

    if (error) throw error;

    console.log('診断結果保存成功:', data.id);
    return data;
  } catch (error) {
    console.error('診断結果保存エラー:', error);
    throw error;
  }
};

/**
 * Purpose Carving結果を保存（将来用）
 * @param {string} sessionId - セッションID
 * @param {Object} responses - Purpose Carvingの回答データ
 * @returns {Promise<Object>} 保存されたデータ
 */
export const savePurposeCarvingResponse = async (sessionId, responses) => {
  try {
    const { data, error } = await supabase
      .from('purpose_carving_responses')
      .insert([{
        session_id: sessionId,
        responses: responses
      }])
      .select()
      .single();

    if (error) throw error;

    console.log('Purpose Carving結果保存成功:', data.id);
    return data;
  } catch (error) {
    console.error('Purpose Carving結果保存エラー:', error);
    throw error;
  }
};
