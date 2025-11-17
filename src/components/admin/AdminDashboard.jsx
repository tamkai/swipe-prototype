import { useState, useEffect } from 'react';
import { fetchAfflatusResponses, saveInterviewMemo } from '../../services/supabase';
import { dimensionsData } from '../../data/dimensionsData';
import RichTextEditor from './RichTextEditor';
import sampleData from '../../../scripts/sampleData.json';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showDebugText, setShowDebugText] = useState(false);
  const [debugText, setDebugText] = useState('');
  const [includeLifeReflection, setIncludeLifeReflection] = useState(true); // 完全版=true, 創造性のみ=false
  const [memo, setMemo] = useState('');
  const [isSavingMemo, setIsSavingMemo] = useState(false);
  const [usingSampleData, setUsingSampleData] = useState(false);

  // 簡易パスワード認証（本番環境では環境変数から取得）
  const ADMIN_PASSWORD = 'afflatus2025';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('パスワードが正しくありません');
      setPassword('');
    }
  };

  // キーワードスワイプ履歴表示用
  const [showSwipeHistory, setShowSwipeHistory] = useState(false);
  const [selectedDimension, setSelectedDimension] = useState(null);

  // 元データを保持（変更検知用）
  const [originalPurpose, setOriginalPurpose] = useState('');
  const [originalValues, setOriginalValues] = useState(['', '', '']);

  // selectedParticipantが変わるたびに元データを更新
  useEffect(() => {
    if (selectedParticipant) {
      const purpose = selectedParticipant.personal_purpose?.purpose || '';
      const values = selectedParticipant.life_reflection?.values || ['', '', ''];

      setOriginalPurpose(purpose);
      setOriginalValues(values);
    }
  }, [selectedParticipant?.id]); // IDで依存関係を明示

  useEffect(() => {
    loadResponses();
  }, []);

  const loadResponses = async () => {
    try {
      setLoading(true);
      const data = await fetchAfflatusResponses();

      // Supabaseが空の場合はサンプルデータを使用
      if (!data || data.length === 0) {
        console.log('📋 Supabaseが空のため、サンプルデータを使用します');

        // サンプルデータのlife_reflectionを配列形式に変換
        const normalizedSampleData = sampleData.map(participant => {
          if (participant.life_reflection) {
            const lr = participant.life_reflection;
            return {
              ...participant,
              life_reflection: {
                age_0_10: [
                  lr.age_0_10_item1,
                  lr.age_0_10_item2,
                  lr.age_0_10_item3,
                  lr.age_0_10_item4,
                  lr.age_0_10_item5
                ].filter(item => item && item.trim()),
                age_11_20: [
                  lr.age_11_20_item1,
                  lr.age_11_20_item2,
                  lr.age_11_20_item3,
                  lr.age_11_20_item4,
                  lr.age_11_20_item5
                ].filter(item => item && item.trim()),
                age_21_now: [
                  lr.age_21_now_item1,
                  lr.age_21_now_item2,
                  lr.age_21_now_item3,
                  lr.age_21_now_item4,
                  lr.age_21_now_item5
                ].filter(item => item && item.trim()),
                career_reason: lr.career_reason,
                values: [
                  participant.personal_values?.value1,
                  participant.personal_values?.value2,
                  participant.personal_values?.value3
                ].filter(item => item && item.trim())
              }
            };
          }
          return participant;
        });

        setResponses(normalizedSampleData);
        setUsingSampleData(true);
      } else {
        // 実データもlife_reflectionを配列形式に変換
        const normalizedData = data.map(participant => {
          if (participant.life_reflection) {
            const lr = participant.life_reflection;
            return {
              ...participant,
              life_reflection: {
                age_0_10: [
                  lr.age_0_10_item1,
                  lr.age_0_10_item2,
                  lr.age_0_10_item3,
                  lr.age_0_10_item4,
                  lr.age_0_10_item5
                ].filter(item => item && item.trim()),
                age_11_20: [
                  lr.age_11_20_item1,
                  lr.age_11_20_item2,
                  lr.age_11_20_item3,
                  lr.age_11_20_item4,
                  lr.age_11_20_item5
                ].filter(item => item && item.trim()),
                age_21_now: [
                  lr.age_21_now_item1,
                  lr.age_21_now_item2,
                  lr.age_21_now_item3,
                  lr.age_21_now_item4,
                  lr.age_21_now_item5
                ].filter(item => item && item.trim()),
                career_reason: lr.career_reason,
                values: lr.values || [
                  participant.personal_values?.value1,
                  participant.personal_values?.value2,
                  participant.personal_values?.value3
                ].filter(item => item && item.trim())
              }
            };
          }
          return participant;
        });

        setResponses(normalizedData);
        setUsingSampleData(false);
      }
    } catch (error) {
      console.error('データ取得エラー:', error);
      console.log('📋 エラーのため、サンプルデータを使用します');

      // サンプルデータのlife_reflectionを配列形式に変換
      const normalizedSampleData = sampleData.map(participant => {
        if (participant.life_reflection) {
          const lr = participant.life_reflection;
          return {
            ...participant,
            life_reflection: {
              age_0_10: [
                lr.age_0_10_item1,
                lr.age_0_10_item2,
                lr.age_0_10_item3,
                lr.age_0_10_item4,
                lr.age_0_10_item5
              ].filter(item => item && item.trim()),
              age_11_20: [
                lr.age_11_20_item1,
                lr.age_11_20_item2,
                lr.age_11_20_item3,
                lr.age_11_20_item4,
                lr.age_11_20_item5
              ].filter(item => item && item.trim()),
              age_21_now: [
                lr.age_21_now_item1,
                lr.age_21_now_item2,
                lr.age_21_now_item3,
                lr.age_21_now_item4,
                lr.age_21_now_item5
              ].filter(item => item && item.trim()),
              careerReason: lr.career_reason,
              values: [
                participant.personal_values?.value1,
                participant.personal_values?.value2,
                participant.personal_values?.value3
              ].filter(item => item && item.trim())
            }
          };
        }
        return participant;
      });

      setResponses(normalizedSampleData);
      setUsingSampleData(true);
    } finally {
      setLoading(false);
    }
  };

  // 参加者選択時にメモを読み込み
  const handleSelectParticipant = (participant) => {
    setSelectedParticipant(participant);
    setMemo(participant.interview_memo || '');
    setShowDebugText(false);

    // 元データを保存（変更検知用）
    setOriginalPurpose(participant.personal_purpose?.purpose || '');
    setOriginalValues(participant.life_reflection?.values || ['', '', '']);
  };

  // パーパス更新
  const handleUpdatePurpose = async (participant) => {
    if (usingSampleData) {
      alert('サンプルデータのため、更新できません');
      return;
    }

    try {
      const { savePersonalPurpose } = await import('../../services/supabase');
      await savePersonalPurpose(participant.id, participant.personal_purpose?.purpose);
      alert('パーパスを更新しました');
      // 元データを更新
      setOriginalPurpose(participant.personal_purpose?.purpose || '');
      // データを再読み込み
      await loadResponses();
    } catch (error) {
      console.error('パーパス更新エラー:', error);
      alert('パーパスの更新に失敗しました');
    }
  };

  // 価値観更新
  const handleUpdateValues = async (participant) => {
    if (usingSampleData) {
      alert('サンプルデータのため、更新できません');
      return;
    }

    try {
      const { savePersonalValues } = await import('../../services/supabase');
      await savePersonalValues(participant.id, participant.life_reflection?.values || []);
      alert('価値観を更新しました');
      // 元データを更新
      setOriginalValues(participant.life_reflection?.values || ['', '', '']);
      // データを再読み込み
      await loadResponses();
    } catch (error) {
      console.error('価値観更新エラー:', error);
      alert('価値観の更新に失敗しました');
    }
  };

  // メモを保存
  const handleSaveMemo = async () => {
    if (!selectedParticipant) return;

    if (usingSampleData) {
      alert('サンプルデータのため、更新できません');
      return;
    }

    try {
      setIsSavingMemo(true);
      await saveInterviewMemo(selectedParticipant.id, memo);

      // ローカルのデータも更新
      setResponses(prev => prev.map(p =>
        p.id === selectedParticipant.id ? { ...p, interview_memo: memo } : p
      ));
      setSelectedParticipant(prev => ({ ...prev, interview_memo: memo }));

      alert('メモを保存しました');
    } catch (error) {
      console.error('メモ保存エラー:', error);
      alert('メモの保存に失敗しました');
    } finally {
      setIsSavingMemo(false);
    }
  };

  // トップ3の極を計算（16極から3つ選出）
  const getTop3Poles = (participant, type) => {
    const poles = [];

    dimensionsData.forEach((dimension) => {
      const value = participant[`${type}_${dimension.id}`];

      // 左側の極（pole_a）への強度（0-4スケール）
      if (value <= 0.5) {
        const absoluteScore = (0.5 - value) * 8; // 0.0 = 4.0, 0.5 = 0.0
        poles.push({
          poleName: dimension.pole_a,
          axis: dimension.dimension,
          absoluteScore: absoluteScore,
          value: value
        });
      } else {
        // 右側の極（pole_b）への強度（0-4スケール）
        const absoluteScore = (value - 0.5) * 8; // 0.5 = 0.0, 1.0 = 4.0
        poles.push({
          poleName: dimension.pole_b,
          axis: dimension.dimension,
          absoluteScore: absoluteScore,
          value: value
        });
      }
    });

    // 強度の高い順にソートして上位3つを返す
    return poles.sort((a, b) => b.absoluteScore - a.absoluteScore).slice(0, 3);
  };

  // 特定の軸のスワイプ履歴を取得
  const getSwipeHistoryForDimension = (dimensionName) => {
    if (!selectedParticipant || !selectedParticipant.swipe_history) {
      console.log('swipe_history not found:', selectedParticipant);
      return [];
    }

    // 絵文字を除去して軸名のみを抽出（例: '🎯 動機' → '動機'）
    // より広範囲の絵文字に対応（Emoji全般を削除）
    const cleanDimensionName = dimensionName.replace(/[\p{Emoji}\s]/gu, '').trim();
    console.log('Original dimension:', dimensionName);
    console.log('Clean dimension:', cleanDimensionName);

    const filtered = selectedParticipant.swipe_history.filter(
      item => item.dimension === cleanDimensionName
    );

    console.log('Filtered results:', filtered.length, 'items');
    return filtered;
  };

  // スワイプ履歴モーダルを開く
  const handleShowSwipeHistory = (dimensionId) => {
    const dimension = dimensionsData.find(d => d.id === dimensionId);
    console.log('Selected dimension:', dimension);
    console.log('dimension.dimension:', dimension.dimension);
    setSelectedDimension(dimension);
    setShowSwipeHistory(true);
  };

  // ギャップの大きい軸を計算
  const getLargeGapDimensions = (participant, threshold = 0.3) => {
    const gaps = dimensionsData.map((dimension) => {
      const type1 = participant[`type1_${dimension.id}`];
      const type2 = participant[`type2_${dimension.id}`];
      const gap = Math.abs(type1 - type2);

      return {
        dimension: dimension.dimension,
        id: dimension.id,
        gap,
        type1,
        type2
      };
    });

    return gaps.filter(item => item.gap >= threshold).sort((a, b) => b.gap - a.gap);
  };

  // Type1とType2の合計値TOP3を計算（同じ極に両方とも触れているもの）
  const getCombinedTop3Poles = (participant) => {
    const combinedScores = [];

    dimensionsData.forEach((dimension) => {
      const type1Value = participant[`type1_${dimension.id}`];
      const type2Value = participant[`type2_${dimension.id}`];

      // 両方とも左側の極（pole_a）に触れている場合
      if (type1Value <= 0.5 && type2Value <= 0.5) {
        const type1Score = (0.5 - type1Value) * 8; // 0-4スケール
        const type2Score = (0.5 - type2Value) * 8;
        const combinedScore = type1Score + type2Score;
        combinedScores.push({
          poleName: dimension.pole_a,
          axis: dimension.dimension,
          combinedScore: combinedScore,
          type1Score: type1Score,
          type2Score: type2Score
        });
      }
      // 両方とも右側の極（pole_b）に触れている場合
      else if (type1Value > 0.5 && type2Value > 0.5) {
        const type1Score = (type1Value - 0.5) * 8;
        const type2Score = (type2Value - 0.5) * 8;
        const combinedScore = type1Score + type2Score;
        combinedScores.push({
          poleName: dimension.pole_b,
          axis: dimension.dimension,
          combinedScore: combinedScore,
          type1Score: type1Score,
          type2Score: type2Score
        });
      }
      // 片方が左、片方が右の場合はスキップ（合計値を出さない）
    });

    // 合計スコアの高い順にソートして上位3つを返す
    return combinedScores.sort((a, b) => b.combinedScore - a.combinedScore).slice(0, 3);
  };

  // MDデータを生成して表示
  const handleShowDebugText = (includeLife) => {
    const text = generateDebugText(selectedParticipant, includeLife);
    setDebugText(text);
    setIncludeLifeReflection(includeLife);
    setShowDebugText(true);
  };

  // MDデータを最新情報にリフレッシュ
  const handleRefreshDebugText = () => {
    const text = generateDebugText(selectedParticipant, includeLifeReflection);
    setDebugText(text);
  };

  // MD形式のデータ生成（完全版 or 創造性のみ）
  const generateDebugText = (participant, includeLifeReflection = true) => {
    let text = '# メタクリ創造性診断 結果データ\n\n';

    // 基本情報
    text += `## 基本情報\n`;
    text += `- お名前: ${participant.name}\n`;
    if (participant.title) {
      text += `- 職業・肩書き: ${participant.title}\n`;
    }
    const experiencePercentage = Math.round(participant.creative_experience * 100);
    text += `- 創造体験レベル: ${experiencePercentage}%\n`;

    // 個人のパーパス（保存されている場合）
    if (participant.personal_purpose?.purpose && participant.personal_purpose.purpose.trim()) {
      text += `- 個人のパーパス: ${participant.personal_purpose.purpose}\n`;
    }

    text += '\n---\n\n';

    // Life Reflection（完全版のみ）
    if (includeLifeReflection && participant.life_reflection) {
      text += `## Life Reflection（人生振り返り）\n\n`;
      const lr = participant.life_reflection;

      if (lr.age_0_10?.length > 0) {
        text += `### 0〜10歳\n`;
        lr.age_0_10.forEach((item, index) => {
          if (item.trim()) text += `${index + 1}. ${item}\n`;
        });
        text += '\n';
      }

      if (lr.age_11_20?.length > 0) {
        text += `### 11〜20歳\n`;
        lr.age_11_20.forEach((item, index) => {
          if (item.trim()) text += `${index + 1}. ${item}\n`;
        });
        text += '\n';
      }

      if (lr.age_21_now?.length > 0) {
        text += `### 21歳〜現在\n`;
        lr.age_21_now.forEach((item, index) => {
          if (item.trim()) text += `${index + 1}. ${item}\n`;
        });
        text += '\n';
      }

      if (lr.career_reason && lr.career_reason.trim()) {
        text += `### 現在のキャリアを選んだ理由\n${lr.career_reason}\n\n`;
      }

      text += '---\n\n';
    }

    // 大切にしている価値観（常に含める）
    if (participant.personal_values?.value1 || participant.personal_values?.value2 || participant.personal_values?.value3) {
      text += `## 大切にしている価値観\n`;
      if (participant.personal_values.value1 && participant.personal_values.value1.trim()) {
        text += `1. ${participant.personal_values.value1}\n`;
      }
      if (participant.personal_values.value2 && participant.personal_values.value2.trim()) {
        text += `2. ${participant.personal_values.value2}\n`;
      }
      if (participant.personal_values.value3 && participant.personal_values.value3.trim()) {
        text += `3. ${participant.personal_values.value3}\n`;
      }
      text += '\n---\n\n';
    }

    // 合計値TOP3
    const combinedTop3 = getCombinedTop3Poles(participant);
    if (combinedTop3.length > 0) {
      text += `## 合計値TOP3（Type1×Type2で一貫している特性）\n`;
      combinedTop3.forEach((item, index) => {
        text += `${index + 1}. ${item.axis}：${item.poleName}（${item.combinedScore.toFixed(1)}）\n`;
        text += `   - Type1: ${item.type1Score.toFixed(1)} / Type2: ${item.type2Score.toFixed(1)}\n`;
      });
      text += '\n---\n\n';
    }

    // 創造性プロファイル（極ベースの数値表記）
    text += `## 創造性プロファイル（8軸詳細）\n\n`;
    dimensionsData.forEach((dimension) => {
      const type1Value = participant[`type1_${dimension.id}`];
      const type2Value = participant[`type2_${dimension.id}`];

      // 極を判定
      const type1Pole = type1Value <= 0.5 ? dimension.pole_a : dimension.pole_b;
      const type2Pole = type2Value <= 0.5 ? dimension.pole_a : dimension.pole_b;

      // 0-4スケールに変換
      const type1Score = Math.abs(type1Value - 0.5) * 8;
      const type2Score = Math.abs(type2Value - 0.5) * 8;
      const gap = Math.abs(type1Value - type2Value) * 4;

      text += `### ${dimension.dimension}：${dimension.pole_a} ↔ ${dimension.pole_b}\n`;
      text += `- Type1（直感判断）: ${type1Pole}（${type1Score.toFixed(1)}）\n`;
      text += `- Type2（自己認識）: ${type2Pole}（${type2Score.toFixed(1)}）\n`;
      text += `- ギャップ: ${gap.toFixed(1)}\n\n`;
    });

    // インタビューメモ（保存されている場合）
    if (participant.interview_memo && participant.interview_memo.trim()) {
      text += '---\n\n';
      text += `## インタビューメモ\n\n`;
      text += participant.interview_memo + '\n\n';
    }

    return text;
  };

  // CSVエクスポート
  const exportToCSV = () => {
    if (responses.length === 0) {
      alert('エクスポートするデータがありません');
      return;
    }

    const csvRows = [];
    const headers = [
      'ID', '名前', '職業・肩書き', '創造体験レベル(%)',
      '動機_Type1(%)', '動機_Type2(%)', '動機_Gap(%)',
      '生成_Type1(%)', '生成_Type2(%)', '生成_Gap(%)',
      '進行_Type1(%)', '進行_Type2(%)', '進行_Gap(%)',
      '価値創出_Type1(%)', '価値創出_Type2(%)', '価値創出_Gap(%)',
      '表現_Type1(%)', '表現_Type2(%)', '表現_Gap(%)',
      '思考_Type1(%)', '思考_Type2(%)', '思考_Gap(%)',
      '実行_Type1(%)', '実行_Type2(%)', '実行_Gap(%)',
      '協働_Type1(%)', '協働_Type2(%)', '協働_Gap(%)',
      '診断日時'
    ];
    csvRows.push(headers.join(','));

    responses.forEach((p) => {
      const row = [
        p.id,
        `"${p.name}"`,
        `"${p.title || ''}"`,
        Math.round(p.creative_experience * 100),
        Math.round(p.type1_motivation * 100), Math.round(p.type2_motivation * 100), Math.round(Math.abs(p.type1_motivation - p.type2_motivation) * 100),
        Math.round(p.type1_generation * 100), Math.round(p.type2_generation * 100), Math.round(Math.abs(p.type1_generation - p.type2_generation) * 100),
        Math.round(p.type1_progress * 100), Math.round(p.type2_progress * 100), Math.round(Math.abs(p.type1_progress - p.type2_progress) * 100),
        Math.round(p.type1_value * 100), Math.round(p.type2_value * 100), Math.round(Math.abs(p.type1_value - p.type2_value) * 100),
        Math.round(p.type1_expression * 100), Math.round(p.type2_expression * 100), Math.round(Math.abs(p.type1_expression - p.type2_expression) * 100),
        Math.round(p.type1_thinking * 100), Math.round(p.type2_thinking * 100), Math.round(Math.abs(p.type1_thinking - p.type2_thinking) * 100),
        Math.round(p.type1_execution * 100), Math.round(p.type2_execution * 100), Math.round(Math.abs(p.type1_execution - p.type2_execution) * 100),
        Math.round(p.type1_collaboration * 100), Math.round(p.type2_collaboration * 100), Math.round(Math.abs(p.type1_collaboration - p.type2_collaboration) * 100),
        `"${new Date(p.created_at).toLocaleString('ja-JP')}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `afflatus_responses_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 認証チェック
  if (!isAuthenticated) {
    return (
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #4b5563 0%, #374151 100%)'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            管理画面ログイン
          </h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワードを入力"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                autoFocus
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '16px',
                fontWeight: '700',
                color: 'white',
                backgroundColor: '#3b82f6',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              ログイン
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ fontSize: '24px', color: 'white', fontWeight: '600' }}>
          読み込み中...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#f3f4f6',
      padding: '20px'
    }}>
      {/* ヘッダー */}
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '20px 30px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1f2937',
            margin: 0,
            marginBottom: '5px'
          }}>
            AFFLATUS 診断結果管理
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            参加者数: {responses.length}件
            {usingSampleData && (
              <span style={{
                marginLeft: '10px',
                padding: '2px 8px',
                backgroundColor: '#fef3c7',
                color: '#92400e',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                📋 サンプルデータ使用中
              </span>
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={exportToCSV}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '600',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            📊 CSVエクスポート
          </button>
          <button
            onClick={loadResponses}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '600',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            🔄 更新
          </button>
        </div>
      </div>

      {/* 参加者リスト */}
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '15px'
      }}>
        {responses.map((participant) => {
          const largeGaps = getLargeGapDimensions(participant, 0.3);
          const hasLargeGap = largeGaps.length > 0;
          const hasMemo = participant.interview_memo && participant.interview_memo.trim();

          return (
            <div
              key={participant.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: hasLargeGap ? '2px solid #f59e0b' : '2px solid transparent',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
              onClick={() => handleSelectParticipant(participant)}
            >
              {hasMemo && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '18px'
                }}>
                  📝
                </div>
              )}

              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '5px',
                margin: 0
              }}>
                {participant.name}
              </h3>
              {participant.title && (
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  margin: '5px 0 0 0'
                }}>
                  {participant.title}
                </p>
              )}

              <div style={{
                marginTop: '10px',
                paddingTop: '10px',
                borderTop: '1px solid #e5e7eb',
                fontSize: '11px',
                color: '#9ca3af'
              }}>
                {new Date(participant.created_at).toLocaleDateString('ja-JP')}
              </div>
            </div>
          );
        })}
      </div>

      {responses.length === 0 && (
        <div style={{
          maxWidth: '1600px',
          margin: '50px auto',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '18px'
        }}>
          診断結果がまだありません
        </div>
      )}

      {/* 詳細モーダル */}
      {selectedParticipant && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            zIndex: 1000
          }}
          onClick={() => setSelectedParticipant(null)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              width: '95%',
              maxWidth: '1400px',
              height: '90vh',
              display: 'flex',
              overflow: 'hidden',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 閉じるボタン */}
            <button
              onClick={() => setSelectedParticipant(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '28px',
                background: 'white',
                border: 'none',
                cursor: 'pointer',
                color: '#9ca3af',
                width: '40px',
                minWidth: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                padding: 0,
                flexShrink: 0
              }}
            >
              ×
            </button>

            {/* 左側: 基本情報 + 8軸数値表 */}
            <div style={{
              flex: '0 0 60%',
              padding: '40px',
              overflowY: 'auto',
              borderRight: '1px solid #e5e7eb'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '10px'
              }}>
                {selectedParticipant.name}
              </h2>
              {selectedParticipant.title && (
                <p style={{
                  fontSize: '16px',
                  color: '#6b7280',
                  marginBottom: '20px'
                }}>
                  {selectedParticipant.title}
                </p>
              )}

              {/* パーパス（全幅・最優先） */}
              <div style={{
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                border: '2px solid #d1d5db',
                marginBottom: '15px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 20px',
                  backgroundColor: '#374151',
                  marginBottom: '0'
                }}>
                  <div style={{
                    fontSize: '13px',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}>
                    個人のパーパス
                  </div>
                  <button
                    onClick={() => handleUpdatePurpose(selectedParticipant)}
                    disabled={(() => {
                      const currentPurpose = selectedParticipant.personal_purpose?.purpose || '';
                      const isDisabled = usingSampleData || currentPurpose === originalPurpose;
                      return isDisabled;
                    })()}
                    style={{
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: '600',
                      backgroundColor: (usingSampleData || (selectedParticipant.personal_purpose?.purpose || '') === originalPurpose) ? '#d1d5db' : '#374151',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: (usingSampleData || (selectedParticipant.personal_purpose?.purpose || '') === originalPurpose) ? 'not-allowed' : 'pointer',
                      opacity: (usingSampleData || (selectedParticipant.personal_purpose?.purpose || '') === originalPurpose) ? 0.5 : 1
                    }}
                  >
                    更新
                  </button>
                </div>
                <div style={{ padding: '15px 20px' }}>
                  <textarea
                    value={selectedParticipant.personal_purpose?.purpose || ''}
                    onChange={(e) => {
                      const updatedParticipant = {
                        ...selectedParticipant,
                        personal_purpose: {
                          ...selectedParticipant.personal_purpose,
                          purpose: e.target.value
                        }
                      };
                      setSelectedParticipant(updatedParticipant);
                    }}
                    placeholder="パーパスを入力してください"
                    style={{
                      width: '100%',
                      minHeight: '40px',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit',
                      lineHeight: '1.4'
                    }}
                  />
                </div>
              </div>

              {/* 価値観（全幅） */}
              <div style={{
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                border: '2px solid #d1d5db',
                marginBottom: '15px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 20px',
                  backgroundColor: '#374151',
                  marginBottom: '0'
                }}>
                  <div style={{
                    fontSize: '13px',
                    color: '#ffffff',
                    fontWeight: '600'
                  }}>
                    大切にしている価値観
                  </div>
                  <button
                    onClick={() => handleUpdateValues(selectedParticipant)}
                    disabled={(() => {
                      const currentValues = selectedParticipant.life_reflection?.values || ['', '', ''];
                      const isDisabled = usingSampleData || JSON.stringify(currentValues) === JSON.stringify(originalValues);
                      return isDisabled;
                    })()}
                    style={{
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: '600',
                      backgroundColor: (usingSampleData || JSON.stringify(selectedParticipant.life_reflection?.values || ['', '', '']) === JSON.stringify(originalValues)) ? '#d1d5db' : '#374151',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: (usingSampleData || JSON.stringify(selectedParticipant.life_reflection?.values || ['', '', '']) === JSON.stringify(originalValues)) ? 'not-allowed' : 'pointer',
                      opacity: (usingSampleData || JSON.stringify(selectedParticipant.life_reflection?.values || ['', '', '']) === JSON.stringify(originalValues)) ? 0.5 : 1
                    }}
                  >
                    更新
                  </button>
                </div>
                <div style={{ padding: '15px 20px', display: 'flex', gap: '10px' }}>
                  {[0, 1, 2].map((index) => (
                    <input
                      key={index}
                      type="text"
                      value={selectedParticipant.life_reflection?.values?.[index] || ''}
                      onChange={(e) => {
                        const updatedValues = [...(selectedParticipant.life_reflection?.values || ['', '', ''])];
                        updatedValues[index] = e.target.value;
                        const updatedParticipant = {
                          ...selectedParticipant,
                          life_reflection: {
                            ...selectedParticipant.life_reflection,
                            values: updatedValues
                          }
                        };
                        setSelectedParticipant(updatedParticipant);
                      }}
                      placeholder={`価値観 ${index + 1}`}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1f2937',
                        backgroundColor: 'white',
                        border: '1px solid #9ca3af',
                        borderRadius: '6px',
                        outline: 'none'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* 創造体験レベル（1行・コンパクト） */}
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{
                  fontSize: '13px',
                  color: '#374151',
                  fontWeight: '600'
                }}>
                  創造体験レベル（自己申告）:
                </span>
                <span style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1f2937'
                }}>
                  {Math.round(selectedParticipant.creative_experience * 100)}%
                </span>
                <span style={{
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  {selectedParticipant.creative_experience < 0.3 && '（少ない）'}
                  {selectedParticipant.creative_experience >= 0.3 && selectedParticipant.creative_experience <= 0.7 && '（中程度）'}
                  {selectedParticipant.creative_experience > 0.7 && '（豊富）'}
                </span>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '12px',
                  color: '#9ca3af'
                }}>
                  診断日: {new Date(selectedParticipant.created_at).toLocaleDateString('ja-JP')}
                </span>
              </div>

              {/* Life Reflection（人生振り返り） */}
              {selectedParticipant.life_reflection && (
                <div style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  border: '2px solid #d1d5db',
                  marginBottom: '30px',
                  overflow: 'hidden'
                }}>
                  <h3 style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#ffffff',
                    backgroundColor: '#374151',
                    padding: '10px 20px',
                    margin: '0 0 15px 0'
                  }}>
                    Life Reflection（人生振り返り）
                  </h3>
                  <div style={{ padding: '0 20px 20px 20px' }}>

                  {/* 年代別の振り返り */}
                  <div style={{ marginBottom: '20px' }}>
                    {[
                      { key: 'age_0_10', label: '0〜10歳' },
                      { key: 'age_11_20', label: '11〜20歳' },
                      { key: 'age_21_now', label: '21歳〜現在' }
                    ].map(({ key, label }) => {
                      const items = selectedParticipant.life_reflection?.[key] || [];
                      const hasContent = items.some(item => item && item.trim());

                      if (!hasContent) return null;

                      return (
                        <div key={key} style={{ marginBottom: '15px' }}>
                          <div style={{
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#6b7280',
                            marginBottom: '6px'
                          }}>
                            {label}
                          </div>
                          <div style={{
                            paddingLeft: '12px',
                            borderLeft: '3px solid #d1d5db'
                          }}>
                            {items.map((item, index) => {
                              if (!item || !item.trim()) return null;
                              return (
                                <div key={index} style={{
                                  fontSize: '14px',
                                  color: '#1f2937',
                                  marginBottom: '4px',
                                  lineHeight: '1.5'
                                }}>
                                  • {item}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* キャリア選択理由 */}
                  {selectedParticipant.life_reflection?.career_reason && (
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#6b7280',
                        marginBottom: '6px'
                      }}>
                        現在のキャリアを選んだ理由
                      </div>
                      <div style={{
                        padding: '10px 12px',
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        fontSize: '14px',
                        color: '#1f2937',
                        lineHeight: '1.6',
                        border: '1px solid #e5e7eb'
                      }}>
                        {selectedParticipant.life_reflection.career_reason}
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              )}

              {/* トップ3とギャップの表示 */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '15px',
                marginBottom: '30px'
              }}>
                <div style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '10px',
                  border: '2px solid #d1d5db',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#ffffff',
                    fontWeight: '700',
                    backgroundColor: '#1e40af',
                    padding: '10px 15px',
                    marginBottom: '0'
                  }}>
                    Type1 極TOP3
                  </div>
                  <div style={{ padding: '15px' }}>
                  {getTop3Poles(selectedParticipant, 'type1').map((item, index) => (
                    <div key={index} style={{
                      fontSize: '13px',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      {index + 1}. {item.axis}：{item.poleName}（{Math.round(item.absoluteScore)}）
                    </div>
                  ))}
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '10px',
                  border: '2px solid #d1d5db',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#ffffff',
                    fontWeight: '700',
                    backgroundColor: '#047857',
                    padding: '10px 15px',
                    marginBottom: '0'
                  }}>
                    Type2 極TOP3
                  </div>
                  <div style={{ padding: '15px' }}>
                  {getTop3Poles(selectedParticipant, 'type2').map((item, index) => (
                    <div key={index} style={{
                      fontSize: '13px',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      {index + 1}. {item.axis}：{item.poleName}（{item.absoluteScore.toFixed(1)}）
                    </div>
                  ))}
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '10px',
                  border: '2px solid #d1d5db',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#ffffff',
                    fontWeight: '700',
                    backgroundColor: '#6b7280',
                    padding: '10px 15px',
                    marginBottom: '0'
                  }}>
                    合計値TOP3
                  </div>
                  <div style={{ padding: '15px' }}>
                  {getCombinedTop3Poles(selectedParticipant).map((item, index) => (
                    <div key={index} style={{
                      fontSize: '13px',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      {index + 1}. {item.axis}：{item.poleName}（{item.combinedScore.toFixed(1)}）
                    </div>
                  ))}
                  {getCombinedTop3Poles(selectedParticipant).length === 0 && (
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>
                      同じ極に両方とも触れている軸がありません
                    </div>
                  )}
                  </div>
                </div>
              </div>

              {/* 8軸数値表 */}
              <div style={{
                backgroundColor: '#374151',
                padding: '10px 20px',
                borderRadius: '12px 12px 0 0',
                marginBottom: '0'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#ffffff',
                  margin: '0'
                }}>
                  創造性プロファイル
                </h3>
              </div>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
                border: '2px solid #374151',
                borderTop: 'none',
                borderRadius: '0 0 12px 12px',
                overflow: 'hidden'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <th style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#4b5563',
                      borderBottom: '2px solid #e5e7eb'
                    }}>
                      軸
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#3b82f6',
                      borderBottom: '2px solid #e5e7eb'
                    }}>
                      Type1：直感判断
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#10b981',
                      borderBottom: '2px solid #e5e7eb'
                    }}>
                      Type2：自己認識
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#f59e0b',
                      borderBottom: '2px solid #e5e7eb'
                    }}>
                      Gap
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dimensionsData.map((dimension) => {
                    const type1Value = selectedParticipant[`type1_${dimension.id}`];
                    const type2Value = selectedParticipant[`type2_${dimension.id}`];
                    const gap = Math.abs(type1Value - type2Value);
                    const hasLargeGap = gap >= 0.3;

                    // Type1の極を判定（0-4スケール）
                    const type1Pole = type1Value <= 0.5 ? dimension.pole_a : dimension.pole_b;
                    const type1AbsoluteScore = Math.abs(type1Value - 0.5) * 8; // 0-4スケール
                    const type1IsStrong = type1AbsoluteScore >= 1.6; // 1.6以上で強い極とみなす

                    // Type2の極を判定（0-4スケール）
                    const type2Pole = type2Value <= 0.5 ? dimension.pole_a : dimension.pole_b;
                    const type2AbsoluteScore = Math.abs(type2Value - 0.5) * 8; // 0-4スケール
                    const type2IsStrong = type2AbsoluteScore >= 1.6;

                    // ギャップを0-4スケールに変換
                    const gapAbsolute = gap * 4;

                    return (
                      <tr
                        key={dimension.id}
                        style={{
                          borderBottom: '1px solid #e5e7eb'
                        }}
                      >
                        <td style={{
                          padding: '12px',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          {dimension.dimension}：{dimension.pole_a} ↔ {dimension.pole_b}
                        </td>
                        <td style={{
                          padding: '12px',
                          textAlign: 'center',
                          color: '#3b82f6',
                          fontWeight: '600',
                          backgroundColor: type1IsStrong ? '#dbeafe' : 'transparent'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}>
                            <span>{type1Pole}（{Math.round(type1AbsoluteScore)}）</span>
                            <button
                              onClick={() => handleShowSwipeHistory(dimension.id)}
                              style={{
                                padding: '2px 6px',
                                fontSize: '11px',
                                fontWeight: '600',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                opacity: 0.8
                              }}
                              onMouseEnter={(e) => e.target.style.opacity = '1'}
                              onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                            >
                              詳細
                            </button>
                          </div>
                        </td>
                        <td style={{
                          padding: '12px',
                          textAlign: 'center',
                          color: '#10b981',
                          fontWeight: '600',
                          backgroundColor: type2IsStrong ? '#d1fae5' : 'transparent'
                        }}>
                          {type2Pole}（{type2AbsoluteScore.toFixed(1)}）
                        </td>
                        <td style={{
                          padding: '12px',
                          textAlign: 'center',
                          color: hasLargeGap ? '#f59e0b' : '#6b7280',
                          fontWeight: hasLargeGap ? '700' : '600',
                          backgroundColor: hasLargeGap ? '#fef3c7' : 'transparent'
                        }}>
                          {gapAbsolute.toFixed(1)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 右側: インタビューメモ + TOP3・ギャップ + MDデータ */}
            <div style={{
              flex: '0 0 40%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* インタビューメモ（大きく配置） */}
              <div style={{
                flex: '1 1 auto',
                padding: '30px 40px',
                overflowY: 'auto',
                borderBottom: '1px solid #e5e7eb',
                backgroundColor: 'white',
                minHeight: '400px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                  paddingRight: '60px'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: 0
                  }}>
                    インタビューメモ
                  </h3>
                  <button
                    onClick={handleSaveMemo}
                    disabled={isSavingMemo}
                    style={{
                      padding: '8px 16px',
                      fontSize: '13px',
                      fontWeight: '600',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: isSavingMemo ? 'not-allowed' : 'pointer',
                      opacity: isSavingMemo ? 0.6 : 1,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {isSavingMemo ? '保存中...' : '💾 保存'}
                  </button>
                </div>

                <RichTextEditor
                  value={memo}
                  onChange={setMemo}
                  placeholder="インタビュー時の気づき、重要なポイント、フォローアップが必要な点などを記録..."
                />
              </div>

              {/* MDデータ表示 */}
              <div style={{
                flex: '0 0 auto',
                padding: '20px 40px',
                backgroundColor: '#f9fafb',
                borderBottom: '1px solid #e5e7eb'
              }}>
                {/* データ表示ボタン群 */}
                {!showDebugText ? (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleShowDebugText(true)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        backgroundColor: '#374151',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      📋 完全データ
                    </button>
                    <button
                      onClick={() => handleShowDebugText(false)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        backgroundColor: '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      📊 創造性データ
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* 表示中のコントロール */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                      <button
                        onClick={handleRefreshDebugText}
                        style={{
                          flex: 1,
                          padding: '10px',
                          fontSize: '13px',
                          fontWeight: '600',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        🔄 最新情報に更新
                      </button>
                      <button
                        onClick={() => setIncludeLifeReflection(!includeLifeReflection)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          fontSize: '13px',
                          fontWeight: '600',
                          backgroundColor: includeLifeReflection ? '#374151' : '#6b7280',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        {includeLifeReflection ? '📋 完全版' : '📊 創造性のみ'}
                      </button>
                      <button
                        onClick={() => {
                          const newMode = !includeLifeReflection;
                          setIncludeLifeReflection(newMode);
                          handleShowDebugText(newMode);
                        }}
                        style={{
                          padding: '10px 15px',
                          fontSize: '13px',
                          fontWeight: '600',
                          backgroundColor: 'white',
                          color: '#374151',
                          border: '2px solid #d1d5db',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        切替
                      </button>
                      <button
                        onClick={() => setShowDebugText(false)}
                        style={{
                          padding: '10px 15px',
                          fontSize: '13px',
                          fontWeight: '600',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        閉じる
                      </button>
                    </div>

                    {/* データ表示エリア */}
                    <textarea
                      value={debugText}
                      readOnly
                      onClick={(e) => e.target.select()}
                      style={{
                        width: '100%',
                        height: '200px',
                        padding: '15px',
                        fontSize: '12px',
                        fontFamily: 'monospace',
                        backgroundColor: 'white',
                        color: '#1f2937',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        resize: 'vertical',
                        boxSizing: 'border-box',
                        lineHeight: '1.6'
                      }}
                    />
                    <div style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      marginTop: '8px',
                      textAlign: 'center'
                    }}>
                      ↑ クリックして全選択し、コピーしてください
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* キーワードスワイプ履歴モーダル */}
      {showSwipeHistory && selectedDimension && (
        <div
          onClick={() => setShowSwipeHistory(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '0',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}
          >
            {/* ヘッダー */}
            <div style={{
              backgroundColor: '#374151',
              padding: '20px 30px',
              borderRadius: '16px 16px 0 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#ffffff',
                margin: 0
              }}>
                {selectedDimension.dimension}軸のキーワードスワイプ履歴
              </h3>
              <button
                onClick={() => setShowSwipeHistory(false)}
                style={{
                  fontSize: '24px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#ffffff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0
                }}
              >
                ×
              </button>
            </div>

            {/* 軸の説明 */}
            <div style={{
              padding: '20px 30px',
              backgroundColor: '#f9fafb',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '8px'
              }}>
                極の構成
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1f2937'
              }}>
                {selectedDimension.pole_a} ↔ {selectedDimension.pole_b}
              </div>
            </div>

            {/* スワイプ履歴リスト */}
            <div style={{
              padding: '20px 30px',
              maxHeight: 'calc(80vh - 200px)',
              overflowY: 'auto'
            }}>
              {getSwipeHistoryForDimension(selectedDimension.dimension).length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: '#9ca3af',
                  fontSize: '14px'
                }}>
                  この軸のスワイプ履歴がありません
                </div>
              ) :
                getSwipeHistoryForDimension(selectedDimension.dimension).map((item, index) => {
                  // 背景色とボーダー色を決定
                  const getBackgroundColor = () => {
                    if (item.direction === 'match') return '#f0fdf4';
                    if (item.direction === 'neither') return '#fef9e7';
                    return '#fef2f2';
                  };

                  const getBorderColor = () => {
                    if (item.direction === 'match') return '#86efac';
                    if (item.direction === 'neither') return '#fbbf24';
                    return '#fecaca';
                  };

                  const getBadgeColor = () => {
                    if (item.direction === 'match') return '#22c55e';
                    if (item.direction === 'neither') return '#f59e0b';
                    return '#ef4444';
                  };

                  const getDirectionText = () => {
                    if (item.direction === 'match') return '当てはまる';
                    if (item.direction === 'neither') return 'どちらもあてはまる';
                    return '当てはまらない';
                  };

                  return (
                    <div
                      key={index}
                      style={{
                        marginBottom: '15px',
                        padding: '15px',
                        backgroundColor: getBackgroundColor(),
                        border: `2px solid ${getBorderColor()}`,
                        borderRadius: '8px'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '8px'
                      }}>
                        <div>
                          <div style={{
                            fontSize: '16px',
                            fontWeight: '700',
                            color: '#1f2937',
                            marginBottom: '4px'
                          }}>
                            {item.keyword}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#6b7280'
                          }}>
                            極: {item.pole}
                          </div>
                        </div>
                        <div style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: getBadgeColor(),
                          color: 'white'
                        }}>
                          {getDirectionText()}
                        </div>
                      </div>
                    <div style={{
                      fontSize: '16px',
                      color: '#1f2937',
                      fontWeight: '500'
                    }}>
                      vs {item.compareTo}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
