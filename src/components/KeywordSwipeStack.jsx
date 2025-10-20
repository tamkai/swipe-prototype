import { useState } from 'react';
import KeywordSwipeCard from './KeywordSwipeCard';

const KeywordSwipeStack = ({ keywords, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

    // スワイプ履歴を記録
    setSwipeHistory(prev => [
      ...prev,
      {
        keyword: item.keyword,
        dimension: item.dimension,
        pole: item.pole,
        direction,
        timestamp: new Date().toISOString()
      }
    ]);

    // フィードバック表示
    const currentFeedback = directionLabels[direction];
    setFeedbackText(currentFeedback);
    setShowFeedback(true);

    // 次のカードへ
    const delay = direction === 'neither' ? 300 : 250;
    setTimeout(() => {
      if (currentIndex + 1 >= keywords.length) {
        // 全て完了
        onComplete(swipeHistory);
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

      {/* プログレスバー & カウンター */}
      <div style={{
        position: 'absolute',
        bottom: '-210px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {/* プログレスバー */}
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
      </div>

    </div>
  );
};

export default KeywordSwipeStack;
