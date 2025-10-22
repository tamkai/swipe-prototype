import { useState, useEffect } from 'react';
import KeywordSwipeStack from './KeywordSwipeStack';
import Type2DiagnosisFlow from './Type2DiagnosisFlow';
import CreativeCompassResults from './CreativeCompassResults';
import { keywordSwipeData } from '../data/keywordSwipeData';
import { calculateScores } from '../utils/scoreCalculator';

const IntegratedDiagnosisFlow = ({ onBack }) => {
  const [phase, setPhase] = useState('instruction'); // instruction, type1, type2, results
  const [type1Results, setType1Results] = useState(null);
  const [type2Results, setType2Results] = useState(null);
  const [swipeHistory, setSwipeHistory] = useState([]);

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
  const handleType2Complete = (results) => {
    setType2Results(results);
    setPhase('results');
  };

  // インストラクション画面から診断開始
  const handleStartDiagnosis = () => {
    setPhase('type1');
  };

  // 再スタート
  const handleRestart = () => {
    setPhase('instruction');
    setType1Results(null);
    setType2Results(null);
    setSwipeHistory([]);
  };

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
            AFFLATUS創造性診断
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
          maxWidth: '600px',
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

          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <button
              onClick={onBack}
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
              style={{
                flex: 2,
                padding: '16px 24px',
                fontSize: '18px',
                fontWeight: '700',
                backgroundColor: '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            >
              診断開始 →
            </button>
          </div>

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
        <div className="card-container">
          <KeywordSwipeStack
            keywords={keywordSwipeData}
            onComplete={handleType1Complete}
            onBack={() => setPhase('instruction')}
            isIntegratedMode={true}
          />
        </div>
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
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return null;
};

export default IntegratedDiagnosisFlow;
