import { useState, useEffect } from 'react';
import { fetchAfflatusResponses, saveInterviewMemo } from '../../services/supabase';
import { dimensionsData } from '../../data/dimensionsData';
import RichTextEditor from './RichTextEditor';
import sampleData from '../../../scripts/sampleData.json';

const AdminDashboard = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showDebugText, setShowDebugText] = useState(false);
  const [memo, setMemo] = useState('');
  const [isSavingMemo, setIsSavingMemo] = useState(false);
  const [usingSampleData, setUsingSampleData] = useState(false);

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
        setResponses(sampleData);
        setUsingSampleData(true);
      } else {
        setResponses(data);
        setUsingSampleData(false);
      }
    } catch (error) {
      console.error('データ取得エラー:', error);
      console.log('📋 エラーのため、サンプルデータを使用します');
      setResponses(sampleData);
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
  };

  // メモを保存
  const handleSaveMemo = async () => {
    if (!selectedParticipant) return;

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

  // トップ3の軸を計算
  const getTop3Dimensions = (participant, type) => {
    const scores = dimensionsData.map((dimension) => ({
      dimension: dimension.dimension,
      id: dimension.id,
      value: participant[`${type}_${dimension.id}`]
    }));

    return scores.sort((a, b) => b.value - a.value).slice(0, 3);
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

  // MD形式のデバッグテキスト生成
  const generateDebugText = (participant) => {
    let text = '# AFFLATUS創造性診断 結果データ\n\n';

    text += `## 基本情報\n`;
    text += `- お名前: ${participant.name}\n`;
    if (participant.title) {
      text += `- 職業・肩書き: ${participant.title}\n`;
    }
    const experiencePercentage = Math.round(participant.creative_experience * 100);
    text += `- 創造体験レベル: ${experiencePercentage}%\n\n`;
    text += '---\n\n';

    if (participant.life_reflection) {
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

      if (lr.careerReason && lr.careerReason.trim()) {
        text += `### 現在のキャリアを選んだ理由\n${lr.careerReason}\n\n`;
      }

      if (lr.values?.length > 0) {
        text += `### 大切にしている価値観\n`;
        lr.values.forEach((value, index) => {
          if (value.trim()) text += `${index + 1}. ${value}\n`;
        });
        text += '\n';
      }

      text += '---\n\n';
    }

    dimensionsData.forEach((dimension) => {
      const val1 = participant[`type1_${dimension.id}`];
      const val2 = participant[`type2_${dimension.id}`];
      const percentage1 = Math.round(val1 * 100);
      const percentage2 = Math.round(val2 * 100);

      text += `## ${dimension.dimension}\n`;
      text += `- タイプ1（直感判断）: ${percentage1}%\n`;
      text += `- タイプ2（自己認識）: ${percentage2}%\n`;
      text += `- ギャップ: ${Math.abs(percentage1 - percentage2)}%\n\n`;
    });

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

              {hasLargeGap && (
                <div style={{
                  marginTop: '10px',
                  padding: '6px 10px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#92400e'
                }}>
                  ⚠️ 大きなギャップあり
                </div>
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
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 10
              }}
            >
              ×
            </button>

            {/* 左側: 基本情報 + 8軸数値表 */}
            <div style={{
              flex: '0 0 55%',
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
                  marginBottom: '10px'
                }}>
                  {selectedParticipant.title}
                </p>
              )}
              <p style={{
                fontSize: '14px',
                color: '#9ca3af',
                marginBottom: '30px'
              }}>
                創造体験レベル: {Math.round(selectedParticipant.creative_experience * 100)}%
                {' ・ '}
                診断日: {new Date(selectedParticipant.created_at).toLocaleDateString('ja-JP')}
              </p>

              {/* トップ3とギャップの表示 */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '15px',
                marginBottom: '30px'
              }}>
                <div style={{
                  padding: '15px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '10px',
                  border: '2px solid #3b82f6'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#1e40af',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    Type1 Top3
                  </div>
                  {getTop3Dimensions(selectedParticipant, 'type1').map((item, index) => (
                    <div key={index} style={{
                      fontSize: '13px',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      {index + 1}. {item.dimension} ({Math.round(item.value * 100)}%)
                    </div>
                  ))}
                </div>

                <div style={{
                  padding: '15px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '10px',
                  border: '2px solid #f59e0b'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#92400e',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    大きなギャップ
                  </div>
                  {getLargeGapDimensions(selectedParticipant, 0.3).slice(0, 3).map((item, index) => (
                    <div key={index} style={{
                      fontSize: '13px',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      {index + 1}. {item.dimension} ({Math.round(item.gap * 100)}%)
                    </div>
                  ))}
                  {getLargeGapDimensions(selectedParticipant, 0.3).length === 0 && (
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>
                      大きなギャップなし
                    </div>
                  )}
                </div>

                <div style={{
                  padding: '15px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '10px',
                  border: '2px solid #10b981'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#065f46',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    Type2 Top3
                  </div>
                  {getTop3Dimensions(selectedParticipant, 'type2').map((item, index) => (
                    <div key={index} style={{
                      fontSize: '13px',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      {index + 1}. {item.dimension} ({Math.round(item.value * 100)}%)
                    </div>
                  ))}
                </div>
              </div>

              {/* 8軸数値表 */}
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '15px'
              }}>
                創造性プロファイル
              </h3>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px'
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
                      Type1
                    </th>
                    <th style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#10b981',
                      borderBottom: '2px solid #e5e7eb'
                    }}>
                      Type2
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
                    const type1 = Math.round(selectedParticipant[`type1_${dimension.id}`] * 100);
                    const type2 = Math.round(selectedParticipant[`type2_${dimension.id}`] * 100);
                    const gap = Math.abs(type1 - type2);
                    const hasLargeGap = gap >= 30;

                    return (
                      <tr
                        key={dimension.id}
                        style={{
                          backgroundColor: hasLargeGap ? '#fef3c7' : 'white',
                          borderBottom: '1px solid #e5e7eb'
                        }}
                      >
                        <td style={{
                          padding: '12px',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          {dimension.dimension}
                        </td>
                        <td style={{
                          padding: '12px',
                          textAlign: 'center',
                          color: '#3b82f6',
                          fontWeight: '600'
                        }}>
                          {type1}%
                        </td>
                        <td style={{
                          padding: '12px',
                          textAlign: 'center',
                          color: '#10b981',
                          fontWeight: '600'
                        }}>
                          {type2}%
                        </td>
                        <td style={{
                          padding: '12px',
                          textAlign: 'center',
                          color: hasLargeGap ? '#f59e0b' : '#6b7280',
                          fontWeight: hasLargeGap ? '700' : '600'
                        }}>
                          {gap}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 右側: Life Reflection + インタビューメモ + MDデータ */}
            <div style={{
              flex: '0 0 45%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Life Reflection */}
              <div style={{
                flex: '0 0 35%',
                padding: '40px',
                overflowY: 'auto',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '15px'
                }}>
                  Life Reflection
                </h3>

                {selectedParticipant.life_reflection ? (
                  <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
                    {selectedParticipant.life_reflection.age_0_10?.length > 0 && (
                      <div style={{ marginBottom: '15px' }}>
                        <h4 style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#4b5563',
                          marginBottom: '8px'
                        }}>
                          0〜10歳
                        </h4>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#374151' }}>
                          {selectedParticipant.life_reflection.age_0_10.map((item, index) => (
                            item.trim() && <li key={index} style={{ marginBottom: '3px' }}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedParticipant.life_reflection.age_11_20?.length > 0 && (
                      <div style={{ marginBottom: '15px' }}>
                        <h4 style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#4b5563',
                          marginBottom: '8px'
                        }}>
                          11〜20歳
                        </h4>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#374151' }}>
                          {selectedParticipant.life_reflection.age_11_20.map((item, index) => (
                            item.trim() && <li key={index} style={{ marginBottom: '3px' }}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedParticipant.life_reflection.age_21_now?.length > 0 && (
                      <div style={{ marginBottom: '15px' }}>
                        <h4 style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#4b5563',
                          marginBottom: '8px'
                        }}>
                          21歳〜現在
                        </h4>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#374151' }}>
                          {selectedParticipant.life_reflection.age_21_now.map((item, index) => (
                            item.trim() && <li key={index} style={{ marginBottom: '3px' }}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedParticipant.life_reflection.careerReason && (
                      <div style={{ marginBottom: '15px' }}>
                        <h4 style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#4b5563',
                          marginBottom: '8px'
                        }}>
                          現在のキャリアを選んだ理由
                        </h4>
                        <p style={{ margin: 0, color: '#374151' }}>
                          {selectedParticipant.life_reflection.careerReason}
                        </p>
                      </div>
                    )}

                    {selectedParticipant.life_reflection.values?.length > 0 && (
                      <div>
                        <h4 style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#4b5563',
                          marginBottom: '8px'
                        }}>
                          大切にしている価値観
                        </h4>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#374151' }}>
                          {selectedParticipant.life_reflection.values.map((value, index) => (
                            value.trim() && <li key={index} style={{ marginBottom: '3px' }}>{value}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <p style={{ color: '#9ca3af', fontSize: '13px' }}>
                    Life Reflectionのデータがありません
                  </p>
                )}
              </div>

              {/* インタビューメモ */}
              <div style={{
                flex: 1,
                padding: '40px',
                overflowY: 'auto',
                borderBottom: '1px solid #e5e7eb',
                backgroundColor: '#fefce8'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px'
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
                      opacity: isSavingMemo ? 0.6 : 1
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
                backgroundColor: '#f9fafb'
              }}>
                <button
                  onClick={() => setShowDebugText(!showDebugText)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backgroundColor: '#374151',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginBottom: showDebugText ? '15px' : 0
                  }}
                >
                  {showDebugText ? '📋 MD形式データを非表示' : '📋 MD形式データを表示'}
                </button>

                {showDebugText && (
                  <div>
                    <textarea
                      value={generateDebugText(selectedParticipant)}
                      readOnly
                      onClick={(e) => e.target.select()}
                      style={{
                        width: '100%',
                        height: '150px',
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
    </div>
  );
};

export default AdminDashboard;
