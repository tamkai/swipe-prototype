import { useState } from 'react';
import KeywordSwipeCard from './KeywordSwipeCard';

const KeywordSwipeStack = ({ keywords, onComplete, onBack, isIntegratedMode = false }) => {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 = instruction page
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [feedbackText, setFeedbackText] = useState('あてはまる');
  const [showFeedback, setShowFeedback] = useState(true);

  const handleSwipe = (direction, item) => {
    const directionLabels = {
      match: 'あてはまる',
      not_match: 'あてはまらない',
      neither: 'どちらもあてはまる'
    };

    console.log(`${directionLabels[direction]}:`, item);

    // スワイプ履歴を記録（選択したキーワードと比較対象の両方を記録）
    const newHistoryItem = {
      keyword: item.keyword,
      compareTo: item.compareTo, // 比較対象のキーワードを追加
      dimension: item.dimension,
      pole: item.pole,
      direction,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [...swipeHistory, newHistoryItem];
    setSwipeHistory(updatedHistory);

    // フィードバック表示
    const currentFeedback = directionLabels[direction];
    setFeedbackText(currentFeedback);
    setShowFeedback(true);

    // 次のカードへ
    const delay = direction === 'neither' ? 300 : 250;
    setTimeout(() => {
      if (currentIndex + 1 >= keywords.length) {
        // 全て完了（最新の履歴を渡す）
        onComplete(updatedHistory);
      } else {
        // フィードバックを非表示にしてから次のカードへ
        setShowFeedback(false);

        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          // 次のカードのデフォルトフィードバックを設定
          setFeedbackText('あてはまる');
          setShowFeedback(true);
        }, 10);
      }
    }, delay);
  };

  // インストラクション画面
  if (currentIndex === -1) {
    return (
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        paddingBottom: '60px',
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        {/* プログレスバー（0ページ目） */}
        <div style={{
          width: '100%',
          maxWidth: '800px',
          marginBottom: '30px',
          marginTop: '40px'
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
              タイプ1診断：直感判断
            </span>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'white'
            }}>
              0 / 32
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
              width: '0%',
              height: '100%',
              backgroundColor: 'white',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* インストラクションカード */}
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
            タイプ1診断：直感判断
          </h2>

          <div style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#4b5563',
            marginBottom: '24px'
          }}>
            <p style={{ marginBottom: '16px' }}>
              これから、創造性に関わる<strong>32個のキーワード</strong>を表示します。
            </p>
            <p style={{ marginBottom: '16px' }}>
              表示されるキーワードについて、その内容が自分に「あてはまる/あてはまらない」を、<strong>スワイプまたはボタン</strong>で回答してください。
            </p>
            <p style={{ marginBottom: '16px' }}>
              <strong>スワイプの場合：</strong><br />
              左にスワイプ → 「あてはまる」<br />
              右にスワイプ → 「あてはまらない」<br />
              下にスワイプ → 「どちらもあてはまる」
            </p>
            <p style={{
              padding: '16px',
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '12px',
              borderLeft: '4px solid #667eea'
            }}>
              💡 <strong>ポイント：</strong>各キーワードについては、あまり悩まずに直感で回答してください。
            </p>
          </div>
        </div>

        {/* ナビゲーションボタン */}
        <div style={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          gap: '16px',
          marginTop: '40px',
          marginBottom: '40px'
        }}>
          <button
            onClick={onBack}
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
            onClick={() => setCurrentIndex(0)}
            style={{
              flex: 2,
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: '700',
              backgroundColor: 'white',
              color: '#374151',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.2s ease'
            }}
          >
            診断開始 →
          </button>
        </div>
      </div>
    );
  }

  // 表示可能なカードがない場合
  if (currentIndex >= keywords.length) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
          🎉 完了！
        </div>
        <div style={{ fontSize: '18px', color: 'white', opacity: 0.9 }}>
          {keywords.length}個のキーワードすべて回答しました
        </div>
      </div>
    );
  }

  return (
    <div className="card-container">
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* 次のカードをプレビュー表示 */}
        {currentIndex + 1 < keywords.length && (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              transform: 'scale(0.95)',
              opacity: 0.5,
            }}
          />
        )}

        {/* 現在のカード */}
        <KeywordSwipeCard
          key={currentIndex}
          item={keywords[currentIndex]}
          onSwipe={handleSwipe}
        />

        {/* フィードバック表示（カードの裏） */}
        {showFeedback && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            <div
              key={feedbackText}
              style={{
                fontSize: '28px',
                fontWeight: '900',
                color: 'white',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                whiteSpace: 'nowrap'
              }}
            >
              {feedbackText}
            </div>
          </div>
        )}

      {/* プログレスバー & カウンター - 統合モードでは上部に表示 */}
      <div style={{
        position: 'absolute',
        ...(isIntegratedMode ? {
          top: '-60px',
        } : {
          bottom: '-210px',
        }),
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        gap: isIntegratedMode ? '12px' : '8px',
        flexDirection: isIntegratedMode ? 'row' : 'column',
        alignItems: isIntegratedMode ? 'flex-start' : 'stretch'
      }}>
        {isIntegratedMode ? (
          <>
            {/* 戻るボタン */}
            {onBack && (
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
            )}

            {/* インジケーター部分 */}
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <div style={{
                  fontSize: '14px',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  タイプ1診断：直感判断
                </div>
                <div style={{
                  fontSize: '14px',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  {currentIndex + 1} / {keywords.length}
                </div>
              </div>

              {/* プログレスバー */}
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${((currentIndex + 1) / keywords.length) * 100}%`,
                  height: '100%',
                  backgroundColor: 'white',
                  transition: 'width 0.3s ease-out'
                }} />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 従来の形式 */}
            <div style={{
              width: '100%',
              height: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${((currentIndex + 1) / keywords.length) * 100}%`,
                height: '100%',
                backgroundColor: 'white',
                transition: 'width 0.3s ease-out'
              }} />
            </div>

            {/* カウンター */}
            <div style={{
              fontSize: '16px',
              color: 'white',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              {currentIndex + 1} / {keywords.length}
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default KeywordSwipeStack;
