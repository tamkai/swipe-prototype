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
 * AFFLATUS診断結果を保存（メインテーブル + 関連テーブル）
 * @param {string} sessionId - セッションID
 * @param {Object} responseData - 診断結果データ
 * @returns {Promise<Object>} 保存されたデータ
 */
export const saveAfflatusResponse = async (sessionId, responseData) => {
  try {
    // 1. メインの診断結果を保存
    const { data: mainData, error: mainError } = await supabase
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

    if (mainError) throw mainError;

    const responseId = mainData.id;

    // 2. Life Reflectionを保存（別テーブル）
    if (responseData.basicInfo.lifeReflection) {
      const lr = responseData.basicInfo.lifeReflection;
      const { error: lrError } = await supabase
        .from('life_reflections')
        .insert([{
          response_id: responseId,
          age_0_10_item1: lr.age_0_10?.[0] || null,
          age_0_10_item2: lr.age_0_10?.[1] || null,
          age_0_10_item3: lr.age_0_10?.[2] || null,
          age_0_10_item4: lr.age_0_10?.[3] || null,
          age_0_10_item5: lr.age_0_10?.[4] || null,
          age_11_20_item1: lr.age_11_20?.[0] || null,
          age_11_20_item2: lr.age_11_20?.[1] || null,
          age_11_20_item3: lr.age_11_20?.[2] || null,
          age_11_20_item4: lr.age_11_20?.[3] || null,
          age_11_20_item5: lr.age_11_20?.[4] || null,
          age_21_now_item1: lr.age_21_now?.[0] || null,
          age_21_now_item2: lr.age_21_now?.[1] || null,
          age_21_now_item3: lr.age_21_now?.[2] || null,
          age_21_now_item4: lr.age_21_now?.[3] || null,
          age_21_now_item5: lr.age_21_now?.[4] || null,
          career_reason: lr.careerReason || null
        }]);

      if (lrError) throw lrError;
    }

    // 3. 価値観を保存（別テーブル）
    if (responseData.basicInfo.lifeReflection?.values) {
      const values = responseData.basicInfo.lifeReflection.values;
      const { error: valuesError } = await supabase
        .from('personal_values')
        .insert([{
          response_id: responseId,
          value1: values[0] || null,
          value2: values[1] || null,
          value3: values[2] || null
        }]);

      if (valuesError) throw valuesError;
    }

    // 4. 個人のパーパスを空で作成（管理画面で後から編集可能）
    const { error: purposeError } = await supabase
      .from('personal_purposes')
      .insert([{
        response_id: responseId,
        purpose: null
      }]);

    if (purposeError) throw purposeError;

    console.log('診断結果保存成功:', responseId);
    return mainData;
  } catch (error) {
    console.error('診断結果保存エラー:', error);
    throw error;
  }
};

/**
 * AFFLATUS診断結果を全件取得（管理画面用）
 * @returns {Promise<Array>} 診断結果の配列
 */
export const fetchAfflatusResponses = async () => {
  try {
    // メインテーブルのデータを取得
    const { data: responses, error: responsesError } = await supabase
      .from('afflatus_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (responsesError) throw responsesError;

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

    console.log('診断結果取得成功:', enrichedData.length, '件');
    return enrichedData;
  } catch (error) {
    console.error('診断結果取得エラー:', error);
    throw error;
  }
};

/**
 * 特定の診断結果を取得（管理画面用）
 * @param {number} id - 診断結果ID
 * @returns {Promise<Object>} 診断結果
 */
export const fetchAfflatusResponseById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('afflatus_responses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    console.log('診断結果取得成功:', data.id);
    return data;
  } catch (error) {
    console.error('診断結果取得エラー:', error);
    throw error;
  }
};

/**
 * インタビューメモを保存・更新（管理画面用）
 * @param {number} id - 診断結果ID
 * @param {string} memo - メモ内容（HTML形式）
 * @returns {Promise<Object>} 更新されたデータ
 */
export const saveInterviewMemo = async (id, memo) => {
  try {
    const { data, error } = await supabase
      .from('afflatus_responses')
      .update({ interview_memo: memo })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    console.log('インタビューメモ保存成功:', data.id);
    return data;
  } catch (error) {
    console.error('インタビューメモ保存エラー:', error);
    throw error;
  }
};

/**
 * 価値観を保存・更新（管理画面用）
 * @param {number} responseId - 診断結果ID
 * @param {Array<string>} values - 価値観の配列（最大3つ）
 * @returns {Promise<Object>} 更新されたデータ
 */
export const savePersonalValues = async (responseId, values) => {
  try {
    // 既存の価値観があるか確認
    const { data: existing } = await supabase
      .from('personal_values')
      .select('id')
      .eq('response_id', responseId)
      .single();

    if (existing) {
      // 更新
      const { data, error } = await supabase
        .from('personal_values')
        .update({
          value1: values[0] || null,
          value2: values[1] || null,
          value3: values[2] || null,
          updated_at: new Date().toISOString()
        })
        .eq('response_id', responseId)
        .select()
        .single();

      if (error) throw error;
      console.log('価値観更新成功:', data.id);
      return data;
    } else {
      // 新規作成
      const { data, error } = await supabase
        .from('personal_values')
        .insert([{
          response_id: responseId,
          value1: values[0] || null,
          value2: values[1] || null,
          value3: values[2] || null
        }])
        .select()
        .single();

      if (error) throw error;
      console.log('価値観保存成功:', data.id);
      return data;
    }
  } catch (error) {
    console.error('価値観保存エラー:', error);
    throw error;
  }
};

/**
 * パーパスを保存・更新（管理画面用）
 * @param {number} responseId - 診断結果ID
 * @param {string} purpose - パーパスのテキスト
 * @returns {Promise<Object>} 更新されたデータ
 */
export const savePersonalPurpose = async (responseId, purpose) => {
  try {
    // 既存のパーパスがあるか確認
    const { data: existing } = await supabase
      .from('personal_purposes')
      .select('id')
      .eq('response_id', responseId)
      .single();

    if (existing) {
      // 更新
      const { data, error } = await supabase
        .from('personal_purposes')
        .update({
          purpose: purpose,
          updated_at: new Date().toISOString()
        })
        .eq('response_id', responseId)
        .select()
        .single();

      if (error) throw error;
      console.log('パーパス更新成功:', data.id);
      return data;
    } else {
      // 新規作成
      const { data, error } = await supabase
        .from('personal_purposes')
        .insert([{
          response_id: responseId,
          purpose: purpose
        }])
        .select()
        .single();

      if (error) throw error;
      console.log('パーパス保存成功:', data.id);
      return data;
    }
  } catch (error) {
    console.error('パーパス保存エラー:', error);
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
