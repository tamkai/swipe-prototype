import { useState } from 'react';
import SimpleSwipeCard from './SimpleSwipeCard';

const SimpleCardStack = ({ questions, onComplete, showEncouragement = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const encouragementMessages = [
    'GOOD!',
    'Awesome!',
    'Nice!',
    'Great!',
    'Perfect!',
    'Amazing!',
    'Excellent!',
    'Fantastic!',
    'Wonderful!',
    'Brilliant!'
  ];

  // 最初のエンカレッジメントメッセージを設定
  const [encouragementText, setEncouragementText] = useState(
    encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]
  );

  const handleSwipe = (direction, question) => {
    const directionLabels = {
      yes: 'YES',
      no: 'NO',
      skip: 'スキップ'
    };

    console.log(`${directionLabels[direction]}:`, question);

    // スワイプ履歴を記録
    setSwipeHistory(prev => [
      ...prev,
      { question, direction, timestamp: new Date().toISOString() }
    ]);

    // エンカレッジメント処理
    if (showEncouragement) {
      if (direction === 'skip') {
        // スキップ時は完全に非表示（次のカードまで表示しない）
        setEncouragementText(''); // 空文字で非表示
      } else {
        // YES/NOの時はフェードアウト開始
        setIsFadingOut(true);
      }
    }

    // 次のカードへ
    const delay = direction === 'skip' ? 200 : (showEncouragement ? 250 : 100);
    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        // 全て完了
        onComplete(swipeHistory);
      } else {
        setCurrentIndex(prev => prev + 1);
        // フェードアウト状態をリセット＆次のメッセージを準備
        setIsFadingOut(false);
        if (showEncouragement) {
          const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
          setEncouragementText(randomMessage);
        }
      }
    }, delay);
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
      <SimpleSwipeCard
        key={currentIndex}
        question={questions[currentIndex]}
        onSwipe={handleSwipe}
      />

      {/* エンカレッジメント表示（カードの裏で常に表示） */}
      {showEncouragement && (
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
            key={encouragementText}
            style={{
              fontSize: '48px',
              fontWeight: '900',
              color: 'white',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              animation: isFadingOut ? 'fadeOut 0.25s ease-out forwards' : 'none',
              opacity: isFadingOut ? undefined : 1
            }}
          >
            {encouragementText}
          </div>
        </div>
      )}

      {/* カウンター */}
      <div style={{
        position: 'absolute',
        bottom: '-210px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '16px',
        color: 'white',
        fontWeight: '600'
      }}>
        {currentIndex + 1} / {questions.length}
      </div>

      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SimpleCardStack;
