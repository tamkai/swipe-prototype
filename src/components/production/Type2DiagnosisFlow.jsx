import { useState } from 'react';
import { dimensionsData } from '../../data/dimensionsData';
import DimensionSlider from './DimensionSlider';

const Type2DiagnosisFlow = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = インストラクションページ
  const [results, setResults] = useState({});
  const [hasInteracted, setHasInteracted] = useState(false); // スライダー操作フラグ

  // インストラクションページの場合
  const isInstructionPage = currentStep === -1;

  const currentDimension = !isInstructionPage ? dimensionsData[currentStep] : null;
  const isLastStep = currentStep === dimensionsData.length - 1;
  const progress = isInstructionPage ? 0 : ((currentStep + 1) / dimensionsData.length) * 100;

  const handleSliderChange = (value) => {
    setHasInteracted(true); // 操作されたらフラグを立てる
    setResults(prev => ({
      ...prev,
      [currentDimension.id]: value
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      // 最後のステップ：結果を返す
      onComplete(results);
    } else {
      // 次のステップへ
      const nextStep = currentStep + 1;
      const nextDimension = dimensionsData[nextStep];

      // 次の軸のスライダー値を中央（0.5）にリセット
      setResults(prev => ({
        ...prev,
        [nextDimension.id]: 0.5
      }));

      setCurrentStep(nextStep);
      setHasInteracted(false); // 次の軸に進んだらフラグをリセット

      // DOM更新後にスクロール
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep === -1 || currentStep === 0) {
      // インストラクションページまたは最初のステップ：戻るボタンでパターン選択に戻る
      onBack();
    } else {
      // 前のステップへ
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 現在のステップの値（初期値は0.5）
  const currentValue = !isInstructionPage ? (results[currentDimension.id] ?? 0.5) : null;

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      paddingBottom: '100px',
      position: 'relative'
    }}>
      {/* 戻るボタン + プログレスバー */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        marginBottom: '30px',
        marginTop: '40px',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start'
      }}>
        {/* 戻るボタン */}
        <button
          onClick={onBack}
          style={{
            width: '44px',
            height: '44px',
            minWidth: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            marginTop: '4px',
            padding: 0
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* プログレスバー */}
        <div style={{
          flex: 1
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'white'
            }}>
              タイプ2診断：自己認識
            </span>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'white'
            }}>
              {currentStep + 1} / {dimensionsData.length}
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: 'white',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </div>

      {isInstructionPage ? (
        /* インストラクションページ */
        <div style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: 'clamp(22px, 6vw, 28px)',
            fontWeight: '800',
            color: '#1f2937',
            marginBottom: '24px',
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}>
            タイプ2診断：自己認識
          </h2>
          <div style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#4b5563',
            marginBottom: '24px'
          }}>
            <p style={{ marginBottom: '16px' }}>
              これから、創造性に関わる<strong>8つの軸</strong>について、1つずつ質問していきます。
            </p>
            <p style={{ marginBottom: '16px' }}>
              各軸には2つの極（タイプ）があり、<strong>どちらにも価値があります</strong>。正解・不正解はありません。
            </p>
            <p style={{ marginBottom: '16px' }}>
              スライダーを動かして、<strong>現在のあなた自身</strong>がどちらのタイプに近いかを選んでください。
            </p>
            <p style={{
              padding: '16px',
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '12px',
              borderLeft: '4px solid #667eea'
            }}>
              💡 <strong>ポイント：</strong>直感で答えるよりも、説明文をじっくり読んで、普段のあなたの行動や考え方を振り返りながら回答してください。
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* 軸の説明カード */}
          <div style={{
            width: '100%',
            maxWidth: '800px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {currentDimension.dimension}
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#4b5563',
              whiteSpace: 'pre-line'
            }}>
              {currentDimension.description}
            </p>
          </div>

          {/* スライダー */}
          <DimensionSlider
            dimension={currentDimension.dimension}
            pole_a={currentDimension.pole_a}
            keywords_a={currentDimension.keywords_a}
            pole_b={currentDimension.pole_b}
            keywords_b={currentDimension.keywords_b}
            value={currentValue}
            onChange={handleSliderChange}
            showDescription={false}
          />
        </>
      )}

      {/* ナビゲーションボタン */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        gap: '16px',
        marginTop: '40px'
      }}>
        <button
          onClick={handlePrevious}
          style={{
            flex: 1,
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: '700',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#4b5563',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.2s ease'
          }}
        >
          ← 戻る
        </button>
        <button
          onClick={handleNext}
          disabled={!isInstructionPage && !hasInteracted}
          style={{
            flex: 2,
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: '700',
            backgroundColor: (!isInstructionPage && !hasInteracted) ? 'rgba(255, 255, 255, 0.5)' : 'white',
            color: (!isInstructionPage && !hasInteracted) ? '#6b7280' : '#374151',
            border: 'none',
            borderRadius: '16px',
            cursor: (!isInstructionPage && !hasInteracted) ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.2s ease',
            opacity: (!isInstructionPage && !hasInteracted) ? 0.7 : 1
          }}
        >
          {isInstructionPage ? '診断開始 →' : isLastStep ? '完了 →' : '次へ →'}
        </button>
      </div>
    </div>
  );
};

export default Type2DiagnosisFlow;
