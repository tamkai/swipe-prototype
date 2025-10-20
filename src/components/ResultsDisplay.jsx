import { calculateScores, scoreToPercentage } from '../utils/scoreCalculator';
import { dimensionDescriptions, getScoreComment } from '../data/dimensionDescriptions';

const ResultsDisplay = ({ swipeHistory, onRestart }) => {
  const scores = calculateScores(swipeHistory);

  // 次元の絵文字マッピング
  const dimensionEmojis = {
    '動機': '🔥',
    '生成': '🪚',
    '進行': '📅',
    '価値創出': '💎',
    '表現': '🎨',
    '思考': '🧠',
    '実行': '🏃',
    '協働': '🧑‍🧑‍🧒'
  };

  // スコアバーの描画
  const renderScoreBar = (score, maxScore) => {
    // スコアの絶対値をそのまま使用
    const filledBars = Math.abs(score);
    const isPositive = score >= 0;

    // 常に4つずつ表示（各次元4問固定）
    const barsPerSide = 4;

    const leftBars = [];
    const rightBars = [];

    // 左側（負のスコア用）: 4つの枠
    for (let i = 0; i < barsPerSide; i++) {
      if (!isPositive && i < filledBars) {
        leftBars.push('■');
      } else {
        leftBars.push('□');
      }
    }

    // 右側（正のスコア用）: 4つの枠
    for (let i = 0; i < barsPerSide; i++) {
      if (isPositive && i < filledBars) {
        rightBars.push('■');
      } else {
        rightBars.push('□');
      }
    }

    return leftBars.reverse().join('') + ' | ' + rightBars.join('');
  };

  // スコアラベルを生成
  const getScoreLabel = (score, pole_a, pole_b) => {
    if (score === 0) {
      return 'バランス';
    } else if (score > 0) {
      return `${pole_a}+${score}`;
    } else {
      return `${pole_b}+${Math.abs(score)}`;
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      color: 'white'
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '32px',
        fontWeight: '800',
        marginBottom: '40px',
        textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
      }}>
        あなたの創造性プロフィール
      </h2>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
      }}>
        {scores.map((item, index) => (
          <div
            key={item.dimension}
            style={{
              marginBottom: index < scores.length - 1 ? '24px' : 0,
              paddingBottom: index < scores.length - 1 ? '24px' : 0,
              borderBottom: index < scores.length - 1 ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'
            }}
          >
            {/* 次元名 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
              gap: '12px'
            }}>
              <span style={{ fontSize: '24px' }}>
                {dimensionEmojis[item.dimension]}
              </span>
              <span style={{
                fontSize: '18px',
                fontWeight: '700'
              }}>
                {item.dimension}
              </span>
            </div>

            {/* スコアバー */}
            <div style={{
              fontFamily: 'monospace',
              fontSize: '20px',
              letterSpacing: '2px',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              {renderScoreBar(item.score, item.maxScore)}
            </div>

            {/* 対極ラベル */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
              opacity: 0.9,
              marginBottom: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
            }}>
              <span>{item.pole_b}</span>
              <span>{item.pole_a}</span>
            </div>

            {/* スコアラベルとコメント */}
            <div style={{
              textAlign: 'center',
              marginBottom: '12px'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '800',
                color: 'white',
                marginBottom: '4px'
              }}>
                {getScoreLabel(item.score, item.pole_a, item.pole_b)}
              </div>
              <div style={{
                fontSize: '13px',
                fontWeight: '600',
                opacity: 0.9
              }}>
                {getScoreComment(item.score, dimensionDescriptions[item.dimension]?.pole_a_label || item.pole_a, dimensionDescriptions[item.dimension]?.pole_b_label || item.pole_b)}
              </div>
            </div>

            {/* 次元の説明 */}
            {dimensionDescriptions[item.dimension] && (
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                padding: '12px',
                marginTop: '8px'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '6px',
                  opacity: 0.95
                }}>
                  {dimensionDescriptions[item.dimension].title}
                </div>
                <div style={{
                  fontSize: '13px',
                  opacity: 0.8,
                  marginBottom: '8px'
                }}>
                  {dimensionDescriptions[item.dimension].description}
                </div>
                <div style={{
                  fontSize: '13px',
                  opacity: 0.85,
                  lineHeight: '1.6'
                }}>
                  <div style={{ marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600' }}>← {dimensionDescriptions[item.dimension].pole_b_label}：</span>
                    {dimensionDescriptions[item.dimension].pole_b_description}
                  </div>
                  <div>
                    <span style={{ fontWeight: '600' }}>→ {dimensionDescriptions[item.dimension].pole_a_label}：</span>
                    {dimensionDescriptions[item.dimension].pole_a_description}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* リスタートボタン */}
      <button
        onClick={onRestart}
        style={{
          width: '100%',
          maxWidth: '400px',
          display: 'block',
          margin: '40px auto 0',
          padding: '16px 32px',
          fontSize: '18px',
          fontWeight: '700',
          backgroundColor: 'white',
          color: '#667eea',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        もう一度診断する
      </button>
    </div>
  );
};

export default ResultsDisplay;
