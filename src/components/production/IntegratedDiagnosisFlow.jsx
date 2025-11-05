import { useState, useEffect, useCallback } from 'react';
import BasicInfoInput from './BasicInfoInput';
import KeywordSwipeStack from './KeywordSwipeStack';
import Type2DiagnosisFlow from './Type2DiagnosisFlow';
import CreativeCompassResults from './CreativeCompassResults';
import PurposeCarvingFlow from '../prototypes/PurposeCarvingFlow';
import { generateRandomKeywordSet } from '../../utils/keywordSelector';
import { calculateScores } from '../../utils/scoreCalculator';
import { createSession, saveAfflatusResponse } from '../../services/supabase';

const IntegratedDiagnosisFlow = ({ onBack }) => {
  const [phase, setPhase] = useState('basicInfo'); // basicInfo, lifeReflection, instruction, type1, type2, results
  const [basicInfo, setBasicInfo] = useState(null);
  const [lifeReflectionData, setLifeReflectionData] = useState(null);
  const [type1Results, setType1Results] = useState(null);
  const [type2Results, setType2Results] = useState(null);
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [creativeExperience, setCreativeExperience] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMovedSlider, setHasMovedSlider] = useState(false);

  // キーワードセットをランダム生成
  useEffect(() => {
    const loadKeywords = async () => {
      try {
        const response = await fetch('/keyword-candidates.csv');
        const csvText = await response.text();
        const randomKeywords = generateRandomKeywordSet(csvText, 4);
        setKeywords(randomKeywords);
        console.log('ランダムキーワード生成完了:', randomKeywords);
      } catch (error) {
        console.error('キーワード読み込みエラー:', error);
        // フォールバックとして空配列を設定（エラーハンドリング）
        setKeywords([]);
      }
    };

    loadKeywords();
  }, []);

  // フェーズ変更時に画面上部にスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase]);

  // タイプ1診断完了時
  const handleType1Complete = (history) => {
    setSwipeHistory(history);
    const scores = calculateScores(history);

    // 日本語の次元名を英語IDにマッピング
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

    // スコアを0-1の値に変換（-4〜+4を0〜1にマッピング）
    const normalizedResults = {};
    scores.forEach(item => {
      const dimensionId = dimensionNameToId[item.dimension];
      if (dimensionId) {
        // pole_a寄り（正のスコア）= 1に近い、pole_b寄り（負のスコア）= 0に近い
        // -4〜+4 → 0〜1の変換: (score + 4) / 8
        normalizedResults[dimensionId] = (item.score + 4) / 8;
      }
    });

    console.log('Type1 Results:', normalizedResults);
    setType1Results(normalizedResults);
    setPhase('type2');
  };

  // タイプ2診断完了時
  const handleType2Complete = useCallback(async (results) => {
    // 既に保存中または保存済みの場合はスキップ
    if (isSaving || type2Results) {
      console.log('重複保存をスキップ');
      return;
    }

    setType2Results(results);
    setIsSaving(true);

    // データをSupabaseに保存
    if (sessionId) {
      try {
        await saveAfflatusResponse(sessionId, {
          basicInfo,
          type1Results,
          type2Results: results,
          swipeHistory,
          sliderHistory: results // Type2の結果をsliderHistoryとしても保存
        });
        console.log('診断結果保存成功');
      } catch (error) {
        console.error('診断結果保存失敗:', error);
        // エラーでも結果画面は表示
      }
    } else {
      console.warn('セッションIDがないため、データ保存をスキップしました');
    }

    setIsSaving(false);
    setPhase('results');
  }, [isSaving, type2Results, sessionId, basicInfo, type1Results, swipeHistory]);

  // インストラクション画面から診断開始
  const handleStartDiagnosis = () => {
    // creativeExperienceを含めて基本情報を更新
    const updatedInfo = {
      ...basicInfo,
      creativeExperience
    };
    setBasicInfo(updatedInfo);
    setPhase('type1');
  };

  // 基本情報入力完了時
  const handleBasicInfoComplete = async (info) => {
    setBasicInfo(info);

    // セッション作成
    try {
      const newSessionId = await createSession();
      setSessionId(newSessionId);
      console.log('セッション作成成功:', newSessionId);
    } catch (error) {
      console.error('セッション作成失敗:', error);
      // エラーでも診断は続行可能
    }

    setPhase('lifeReflection');
  };

  // Life Reflection完了時
  const handleLifeReflectionComplete = (data) => {
    setLifeReflectionData(data);
    // creativeExperienceを含めて基本情報を更新
    const completeInfo = {
      ...basicInfo,
      creativeExperience,
      lifeReflection: data
    };
    setBasicInfo(completeInfo);
    setPhase('instruction');
  };

  // Life Reflectionスキップ時
  const handleLifeReflectionSkip = () => {
    // Life Reflectionをスキップして直接インストラクション画面へ
    setPhase('instruction');
  };

  // スライダーの色を計算
  const getColorForValue = useCallback((val) => {
    if (val >= 0.4 && val <= 0.6) return '#9ca3af'; // グレー
    else if (val < 0.4) return '#3b82f6';            // 青
    else return '#ef4444';                           // 赤
  }, []);

  // 再スタート
  const handleRestart = () => {
    setPhase('basicInfo');
    setBasicInfo(null);
    setType1Results(null);
    setType2Results(null);
    setSwipeHistory([]);
    setSessionId(null);
    setIsSaving(false);
  };

  if (phase === 'basicInfo') {
    return <BasicInfoInput onComplete={handleBasicInfoComplete} onDebugMenu={onBack} />;
  }

  if (phase === 'lifeReflection') {
    return (
      <PurposeCarvingFlow
        onComplete={handleLifeReflectionComplete}
        onSkip={handleLifeReflectionSkip}
      />
    );
  }

  if (phase === 'instruction') {
    return (
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        gap: '30px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          {/* ロゴ */}
          <div style={{
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <svg width="120" height="auto" viewBox="0 0 230.68 313.8" fill="white" style={{
              filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.3))'
            }}>
              <g>
                <circle cx="147.08" cy="88.77" r="63.61"/>
                <circle cx="60.14" cy="172.72" r="37.49"/>
                <circle cx="120.93" cy="219.87" r="21.24"/>
              </g>
              <g>
                <path d="M52.88,291.67h-7.06l-.96,5.13h-5.13l5.78-30.81h7.7l5.78,30.81h-5.13l-.96-5.13ZM51.91,286.54l-2.57-13.69-2.57,13.69h5.13Z"/>
                <path d="M68.75,271.13v6.42h8.99v5.13h-8.99v14.12h-5.13v-30.81h15.4v5.13h-10.27Z"/>
                <path d="M88.79,271.13v6.42h8.99v5.13h-8.99v14.12h-5.13v-30.81h15.4v5.13h-10.27Z"/>
                <path d="M115.37,291.67v5.13h-12.84v-30.81h5.13v25.67h7.7Z"/>
                <path d="M132.01,291.67h-7.06l-.96,5.13h-5.13l5.78-30.81h7.7l5.78,30.81h-5.13l-.96-5.13ZM131.05,286.54l-2.57-13.69-2.57,13.69h5.13Z"/>
                <path d="M154.67,271.13h-5.13v25.67h-5.13v-25.67h-5.13v-5.13h15.4v5.13Z"/>
                <path d="M173.56,266v23.11c0,4.25-3.45,7.7-7.7,7.7s-7.7-3.45-7.7-7.7v-23.11h5.13v23.11c0,1.42,1.15,2.57,2.57,2.57s2.57-1.15,2.57-2.57v-23.11h5.13Z"/>
                <path d="M193.61,289.1c0,4.25-3.45,7.7-7.7,7.7s-7.7-3.45-7.7-7.7v-2.57h5.13v2.57c0,1.42,1.15,2.57,2.57,2.57s2.57-1.15,2.57-2.57c0,0,0-.46-.11-.94-.09-.43-.71-2.25-3.91-4.86-6.76-5.51-6.25-8.68-6.25-9.61,0-4.25,3.45-7.7,7.7-7.7s7.7,3.45,7.7,7.7v2.57h-5.13v-2.57c0-1.42-1.15-2.57-2.57-2.57s-2.57,1.15-2.57,2.57c0,0,0,.46.11.94.09.43.71,2.25,3.91,4.86,6.76,5.51,6.25,8.68,6.25,9.61Z"/>
              </g>
            </svg>
          </div>

          <h1 style={{
            color: 'white',
            fontSize: 'clamp(28px, 8vw, 36px)',
            fontWeight: '800',
            marginBottom: '16px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            whiteSpace: 'nowrap'
          }}>
            創造性診断
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '18px',
            fontWeight: '500',
            marginBottom: '8px'
          }}>
            あなたの創造性を2つの視点から測定します
          </p>
        </div>

        <div style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '32px 28px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#4b5563',
            marginBottom: '32px'
          }}>
            <div style={{
              backgroundColor: '#f3f4f6',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                ⚡ タイプ1診断：直感判断（約3分）
              </h3>
              <p style={{ marginBottom: '8px' }}>
                32個のキーワードに<strong>直感的に</strong>反応してください。
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                深く考えず、最初に感じた印象で答えてください。
              </p>
            </div>

            <div style={{
              backgroundColor: '#f3f4f6',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                🧠 タイプ2診断：自己認識（約4分）
              </h3>
              <p style={{ marginBottom: '8px' }}>
                8つの軸について、説明を読みながら<strong>じっくり考えて</strong>自己評価してください。
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                普段のあなたの行動や考え方を振り返りながら回答してください。
              </p>
            </div>

            <div style={{
              marginTop: '24px',
              padding: '16px',
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '12px',
              borderLeft: '4px solid #667eea'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#374151',
                fontWeight: '600'
              }}>
                💡 2つの診断を通じて、「無意識のパターン」と「自覚的な理解」のギャップを可視化します。
              </p>
            </div>
          </div>

          {/* 区切り線 */}
          <div style={{
            height: '1px',
            backgroundColor: '#e5e7eb',
            margin: '32px 0'
          }} />

          {/* 創造性についての質問 */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              【創造性についてお聞きします】
            </h2>

            <p style={{
              fontSize: '16px',
              color: '#374151',
              lineHeight: '1.8',
              marginBottom: '10px',
              fontWeight: '500'
            }}>
              「正解がわからないことでも、試行錯誤しながら形にする」
            </p>

            <p style={{
              fontSize: '16px',
              color: '#374151',
              lineHeight: '1.8',
              marginBottom: '20px'
            }}>
              そんな経験を、今までどれくらいしてきたと思いますか？
            </p>

            <div style={{
              backgroundColor: '#f9fafb',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '30px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.7',
                margin: 0
              }}>
                ※大小は問いません。小さな工夫でも、試行錯誤した経験でもOKです。
                <br />
                ※創造性には色々な形があります。この後の診断で、あなたらしい創造性のスタイルがわかります。
              </p>
            </div>

            {/* スライダー（600px中央配置） */}
            <div style={{
              width: '100%',
              maxWidth: '600px',
              margin: '0 auto',
              paddingTop: '20px'
            }}>
              <div style={{
                position: 'relative',
                height: '40px',
                display: 'flex',
                alignItems: 'center'
              }}>
                {/* カスタムつまみ */}
                <div
                  style={{
                    position: 'absolute',
                    left: `calc(${creativeExperience * 100}% - 14px)`,
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: getColorForValue(creativeExperience),
                    border: '3px solid white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    pointerEvents: 'none',
                    transition: 'transform 0.15s ease',
                    transform: isDragging ? 'scale(1.1)' : 'scale(1)',
                    zIndex: 20
                  }}
                />

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={creativeExperience * 100}
                  onChange={(e) => {
                    setCreativeExperience(e.target.value / 100);
                    setHasMovedSlider(true);
                  }}
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                  className="creative-experience-slider"
                  style={{
                    width: '100%',
                    height: '8px',
                    background: 'linear-gradient(to right, #3b82f6 0%, #9ca3af 50%, #ef4444 100%)',
                    borderRadius: '4px',
                    outline: 'none',
                    WebkitAppearance: 'none',
                    appearance: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 10
                  }}
                />
              </div>

              {/* ラベル */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '12px',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                <span>少ない</span>
                <span>多い</span>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <button
              onClick={() => setPhase('basicInfo')}
              style={{
                flex: 1,
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: '700',
                backgroundColor: 'white',
                color: '#6b7280',
                border: '2px solid #d1d5db',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← 戻る
            </button>
            <button
              onClick={handleStartDiagnosis}
              disabled={!hasMovedSlider}
              style={{
                flex: 2,
                padding: '16px 24px',
                fontSize: '18px',
                fontWeight: '700',
                backgroundColor: hasMovedSlider ? '#374151' : '#d1d5db',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: hasMovedSlider ? 'pointer' : 'not-allowed',
                boxShadow: hasMovedSlider ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
                opacity: hasMovedSlider ? 1 : 0.6,
                transition: 'all 0.2s'
              }}
            >
              診断開始 →
            </button>
          </div>

          {/* スライダーのスタイル */}
          <style>{`
            .creative-experience-slider::-webkit-slider-thumb {
              opacity: 0;
              width: 28px;
              height: 28px;
              background: transparent;
              border: none;
              cursor: pointer;
              -webkit-appearance: none;
            }

            .creative-experience-slider::-moz-range-thumb {
              opacity: 0;
              width: 28px;
              height: 28px;
              background: transparent;
              border: none;
              cursor: pointer;
            }
          `}</style>

          {/* デバッグ用ショートカット */}
          <div style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#9ca3af',
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              デバッグ・説明用
            </div>
            <div style={{
              display: 'flex',
              gap: '8px',
              fontSize: '14px'
            }}>
              <button
                onClick={() => setPhase('type1')}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  backgroundColor: 'white',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                タイプ1のみ
              </button>
              <button
                onClick={() => setPhase('type2')}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  backgroundColor: 'white',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                タイプ2のみ
              </button>
              <button
                onClick={() => {
                  // サンプルデータを設定
                  setType1Results({
                    motivation: 0.7,
                    generation: 0.3,
                    progress: 0.6,
                    value: 0.8,
                    expression: 0.4,
                    thinking: 0.5,
                    execution: 0.7,
                    collaboration: 0.2
                  });
                  setType2Results({
                    motivation: 0.5,
                    generation: 0.6,
                    progress: 0.4,
                    value: 0.7,
                    expression: 0.3,
                    thinking: 0.8,
                    execution: 0.5,
                    collaboration: 0.6
                  });
                  setPhase('results');
                }}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  backgroundColor: 'white',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                結果画面（サンプル）
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'type1') {
    // キーワード読み込み中
    if (keywords.length === 0) {
      return (
        <div style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px'
        }}>
          キーワードを読み込み中...
        </div>
      );
    }

    return (
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <KeywordSwipeStack
          keywords={keywords}
          onComplete={handleType1Complete}
          onBack={() => setPhase('instruction')}
          isIntegratedMode={true}
        />
      </div>
    );
  }

  if (phase === 'type2') {
    return (
      <Type2DiagnosisFlow
        onComplete={handleType2Complete}
        onBack={() => setPhase('instruction')}
      />
    );
  }

  if (phase === 'results') {
    // タイプ1とタイプ2のどちらかは必ず存在する
    // タイプ2のみの場合は、resultsをnullにしてresults2にタイプ2の値を設定
    const hasType1 = type1Results !== null;
    const resultsForDisplay = hasType1 ? type1Results : {};
    const results2ForDisplay = type2Results;

    return (
      <div style={{ width: '100%', overflowY: 'auto', maxHeight: '100vh' }}>
        <CreativeCompassResults
          results={resultsForDisplay}
          results2={results2ForDisplay}
          basicInfo={basicInfo}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return null;
};

export default IntegratedDiagnosisFlow;
