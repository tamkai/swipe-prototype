import { useState } from 'react';
import DimensionSlider from './DimensionSlider';
import { dimensionsData } from '../data/dimensionsData';

const CreativeCompassResults = ({ results, results2, onRestart }) => {
  const [showDebugText, setShowDebugText] = useState(false);
  const [debugText, setDebugText] = useState('');

  // デバッグ用：診断データをテキスト形式で生成
  const generateDebugText = () => {
    let text = '# AFFLATUS創造性診断 結果データ\n\n';

    dimensionsData.forEach((dimension) => {
      const val1 = results[dimension.id] ?? 0.5;
      const val2 = results2 ? results2[dimension.id] : undefined;

      // パーセンテージ計算（0-1を0-100%に変換）
      const percentage1 = Math.round(val1 * 100);
      const percentage2 = val2 !== undefined ? Math.round(val2 * 100) : null;

      // どちら寄りかの判定
      const getTendency = (val) => {
        if (val < 0.3) return `${dimension.pole_a}寄り`;
        if (val > 0.7) return `${dimension.pole_b}寄り`;
        return '中間';
      };

      text += `## ${dimension.dimension}\n`;
      text += `- 極A: ${dimension.pole_a}\n`;
      text += `- 極B: ${dimension.pole_b}\n`;
      text += `- タイプ1（直感判断）: ${percentage1}% (${getTendency(val1)})\n`;
      if (percentage2 !== null) {
        text += `- タイプ2（自己認識）: ${percentage2}% (${getTendency(val2)})\n`;
        const gap = Math.abs(percentage1 - percentage2);
        text += `- ギャップ: ${gap}%\n`;
      }
      text += `\n説明:\n${dimension.description}\n\n`;
      text += '---\n\n';
    });

    return text;
  };

  // テキストを表示する
  const handleShowDebugText = () => {
    const text = generateDebugText();
    setDebugText(text);
    setShowDebugText(true);
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 0',
      paddingBottom: '80px',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      {/* ヘッダー */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '36px',
          fontWeight: '800',
          marginBottom: '10px',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        }}>
          Creative Compass
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '18px',
          fontWeight: '500'
        }}>
          あなたの創造性プロファイル
        </p>
      </div>

      {/* 8軸スライダー */}
      <div style={{
        width: '100%',
        maxWidth: '600px',
        padding: '0 15px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {dimensionsData.map((dimension) => {
          const val1 = results[dimension.id] ?? 0.5;
          const val2 = results2 ? results2[dimension.id] : undefined;
          if (dimension.id === 'thinking') {
            console.log('思考軸 - タイプ1:', val1, 'タイプ2:', val2);
          }
          return (
            <DimensionSlider
              key={dimension.id}
              dimension={dimension.dimension}
              pole_a={dimension.pole_a}
              keywords_a={dimension.keywords_a}
              pole_b={dimension.pole_b}
              keywords_b={dimension.keywords_b}
              value={val1}
              value2={val2}
              readOnly={true}
              showDescription={false}
              showPositionText={false}
              compact={true}
            />
          );
        })}
      </div>

      {/* 解釈文エリア（プレースホルダー） */}
      <div style={{
        width: '100%',
        maxWidth: '600px',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        marginTop: '20px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          💡 あなたの創造性の特徴
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#4b5563',
          lineHeight: '1.8'
        }}>
          あなたは内発的な動機が強く、情熱と好奇心を大切にするタイプです。アイデアを広げることを楽しみ、柔軟に方向転換しながら進めることが得意です。
          一方で、具体的な実践を通じて学び、チームでの共創を大切にする傾向があります。
          <br /><br />
          この多様なバランスは、状況に応じて創造性を発揮できる強みです。
          必要に応じて、AIツールで不足する視点を補完することで、さらに効果的な創造活動が可能になります。
        </p>
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f3f4f6',
          borderRadius: '10px',
          fontSize: '14px',
          color: '#6b7280',
          fontStyle: 'italic'
        }}>
          ※ 現在はプレースホルダーの解釈文です。今後Gemini APIで個別生成予定。
        </div>
      </div>

      {/* アクションボタン */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginTop: '20px',
        width: '100%',
        maxWidth: '600px',
        padding: '0 20px',
        boxSizing: 'border-box'
      }}>
        <button
          onClick={onRestart}
          style={{
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: '700',
            backgroundColor: 'white',
            color: '#374151',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }}
        >
          もう一度診断する
        </button>

        {/* デバッグボタン */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
          paddingTop: '15px'
        }}>
          <div style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '8px',
            textAlign: 'center'
          }}>
            デバッグ（AI解説文生成用）
          </div>
          <button
            onClick={handleShowDebugText}
            style={{
              width: '100%',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            📋 診断データを表示
          </button>

          {/* テキストボックス */}
          {showDebugText && (
            <div style={{
              marginTop: '15px'
            }}>
              <textarea
                value={debugText}
                readOnly
                style={{
                  width: '100%',
                  height: '300px',
                  padding: '15px',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: '#1f2937',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  lineHeight: '1.6'
                }}
                onClick={(e) => e.target.select()}
              />
              <div style={{
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.6)',
                marginTop: '8px',
                textAlign: 'center'
              }}>
                ↑ テキストボックスをクリックして全選択し、コピーしてください
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeCompassResults;
