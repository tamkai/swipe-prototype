import { useState } from 'react';
import SwipeCard from './SwipeCard';

const CardStack = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState([]);

  const handleSwipe = (direction, card) => {
    console.log(`Swiped ${direction}:`, card);

    // スワイプ履歴を記録
    setSwipeHistory(prev => [
      ...prev,
      { card, direction, timestamp: new Date().toISOString() }
    ]);

    // 次のカードへ
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 300);
  };

  // 表示可能なカードがない場合
  if (currentIndex >= cards.length) {
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
        <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
          🎉 All Done!
        </div>
        <div style={{ fontSize: '18px', color: '#666' }}>
          You've reviewed all {cards.length} cards
        </div>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setSwipeHistory([]);
          }}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: '#4ade80',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 次のカードをプレビュー表示（スタック効果） */}
      {currentIndex + 1 < cards.length && (
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
      <SwipeCard
        key={currentIndex}
        card={cards[currentIndex]}
        onSwipe={handleSwipe}
      />

      {/* カウンター */}
      <div style={{
        position: 'absolute',
        bottom: '-60px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '16px',
        color: '#666',
        fontWeight: '600'
      }}>
        {currentIndex + 1} / {cards.length}
      </div>
    </div>
  );
};

export default CardStack;
