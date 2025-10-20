import { useState } from 'react';
import FourWaySwipeCard from './FourWaySwipeCard';

const FourWayCardStack = ({ questions, pattern, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState([]);

  const handleSwipe = (direction, question) => {
    const directionLabels = {
      left: 'A',
      right: 'B',
      up: 'スーパーライク',
      down: 'スキップ'
    };

    console.log(`${directionLabels[direction]}:`, question);

    // スワイプ履歴を記録
    setSwipeHistory(prev => [
      ...prev,
      { question, direction, timestamp: new Date().toISOString() }
    ]);

    // 次のカードへ
    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        // 全て完了
        onComplete(swipeHistory);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }, 300);
  };

  // 表示可能なカードがない場合
  if (currentIndex >= questions.length) {
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
          {questions.length}問すべて回答しました
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 次のカードをプレビュー表示 */}
      {currentIndex + 1 < questions.length && (
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
      <FourWaySwipeCard
        key={currentIndex}
        question={questions[currentIndex]}
        onSwipe={handleSwipe}
        pattern={pattern}
      />

      {/* カウンター */}
      <div style={{
        position: 'absolute',
        bottom: '-60px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '16px',
        color: 'white',
        fontWeight: '600'
      }}>
        {currentIndex + 1} / {questions.length}
      </div>
    </div>
  );
};

export default FourWayCardStack;
