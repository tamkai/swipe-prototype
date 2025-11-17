import { useState } from 'react';
import DimensionSlider from './DimensionSlider';
import { dimensionsData } from '../../data/dimensionsData';

const CreativeCompassResults = ({ results, results2, basicInfo, onRestart }) => {
  const [showDebugText, setShowDebugText] = useState(false);
  const [debugText, setDebugText] = useState('');

  // デバッグ用：診断データをテキスト形式で生成
  const generateDebugText = () => {
    let text = '# メタクリ創造性診断 結果データ\n\n';

    // 基本情報
    if (basicInfo) {
      text += `## 基本情報\n`;
      text += `- お名前: ${basicInfo.name}\n`;
      if (basicInfo.title) {
        text += `- 職業・肩書き: ${basicInfo.title}\n`;
      }
      const experiencePercentage = Math.round(basicInfo.creativeExperience * 100);
      const getExperienceLevel = (val) => {
        if (val < 0.3) return '少ない';
        if (val > 0.7) return '多い';
        return '中程度';
      };
      text += `- 創造体験レベル: ${experiencePercentage}% (${getExperienceLevel(basicInfo.creativeExperience)})\n\n`;
      text += '---\n\n';

      // Life Reflection
      if (basicInfo.lifeReflection) {
        text += `## Life Reflection（人生振り返り）\n\n`;

        const lr = basicInfo.lifeReflection;

        // 年代ごとの振り返り
        if (lr.age_0_10) {
          text += `### 0〜10歳\n`;
          lr.age_0_10.forEach((item, index) => {
            if (item.trim()) {
              text += `${index + 1}. ${item}\n`;
            }
          });
          text += '\n';
        }

        if (lr.age_11_20) {
          text += `### 11〜20歳\n`;
          lr.age_11_20.forEach((item, index) => {
            if (item.trim()) {
              text += `${index + 1}. ${item}\n`;
            }
          });
          text += '\n';
        }

        if (lr.age_21_now) {
          text += `### 21歳〜現在\n`;
          lr.age_21_now.forEach((item, index) => {
            if (item.trim()) {
              text += `${index + 1}. ${item}\n`;
            }
          });
          text += '\n';
        }

        // キャリア選択理由
        if (lr.careerReason && lr.careerReason.trim()) {
          text += `### 現在のキャリアを選んだ理由\n`;
          text += `${lr.careerReason}\n\n`;
        }

        // 大切な価値観
        if (lr.values) {
          text += `### 大切にしている価値観\n`;
          lr.values.forEach((value, index) => {
            if (value.trim()) {
              text += `${index + 1}. ${value}\n`;
            }
          });
          text += '\n';
        }

        text += '---\n\n';
      }
    }

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
          あなたの創造性バランス
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '18px',
          fontWeight: '500',
          letterSpacing: '0.05em'
        }}>
          Your Creativity Balance
        </p>
      </div>

      {/* 説明文 */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        padding: '0 20px',
        marginBottom: '30px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          fontSize: '15px',
          lineHeight: '1.8',
          color: '#374151'
        }}>
          <p style={{ margin: '0 0 16px 0' }}>
            以下が、あなたの創造性のバランスを<strong>8つの軸</strong>で可視化したものです。
          </p>
          <p style={{ margin: '0 0 16px 0' }}>
            従来の創造性診断が「創造性の有無」や「創造性の高低」を測定するのに対し、
            メタクリ創造性診断は<strong>「創造性の多様性」と「個人の独自性」</strong>を可視化します。
          </p>
          <p style={{ margin: '0' }}>
            数値の大小に優劣はありません。この結果は<strong>「直感判断」と「自己認識」の一致やズレ</strong>から、あなたの創造性を紐解いていくためのものです。<br />
            その意味で、これはあなたらしい創造性の「かたち」です。
          </p>
        </div>
      </div>

      {/* 8軸スライダー */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
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

      {/* レポート案内エリア */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
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
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          📋 結果のレポートについて
        </h2>

        {/* メタクリさんの画像 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <img
            src="/metakuri.png"
            alt="メタクリ"
            style={{
              width: '200px',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>

        <p style={{
          fontSize: '16px',
          color: '#4b5563',
          lineHeight: '1.8',
          marginBottom: '16px'
        }}>
          レポートでは私<strong>「メタクリ」</strong>があなたの<strong>経験の振り返り</strong>と<strong>診断結果</strong>を読み解き、
          あなたらしい創造性の特徴や、今後の活かし方についてお届けします。
        </p>
        <p style={{
          fontSize: '16px',
          color: '#4b5563',
          lineHeight: '1.8'
        }}>
          数日以内に<strong>レポートをお送りします</strong>ので、楽しみにお待ちください。
        </p>
      </div>

      {/* アクションボタン */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginTop: '20px',
        width: '100%',
        maxWidth: '800px',
        padding: '0 20px',
        boxSizing: 'border-box'
      }}>
        {/* メタクリラジオへのリンク */}
        <a
          href="https://metacreativeradio.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: '700',
            backgroundColor: 'white',
            color: '#374151',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            textDecoration: 'none',
            textAlign: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
          }}
        >
          🎙️ 創造性についてメタに考える「メタクリラジオ」
        </a>
      </div>
    </div>
  );
};

export default CreativeCompassResults;
