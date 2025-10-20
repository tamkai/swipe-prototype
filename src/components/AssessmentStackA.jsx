import { useState } from 'react';
import AssessmentCardA from './AssessmentCardA';

const AssessmentStackA = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [feedbackText, setFeedbackText] = useState('YES');
  const [showFeedback, setShowFeedback] = useState(true);

  const handleSwipe = (direction, question) => {
    const directionLabels = {
      yes: 'YES',
      no: 'NO',
      both: 'BOTH'
    };

    console.log(`${directionLabels[direction]}:`, question);

    // スワイプ履歴を記録
    setSwipeHistory(prev => [
      ...prev,
      { question, direction, timestamp: new Date().toISOString() }
    ]);

    // フィードバック表示
    const currentFeedback = directionLabels[direction];
    setFeedbackText(currentFeedback);
    setShowFeedback(true);

    // 次のカードへ
    const delay = direction === 'both' ? 300 : 250;
    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        // 全て完了
        onComplete(swipeHistory);
      } else {
        // フィードバックを非表示にしてから次のカードへ
        setShowFeedback(false);

        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          // 次のカードのデフォルトフィードバックを設定
          setFeedbackText('YES');
          setShowFeedback(true);
        }, 10);
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
      <AssessmentCardA
        key={currentIndex}
        question={questions[currentIndex]}
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
              fontSize: '48px',
              fontWeight: '900',
              color: 'white',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
            }}
          >
            {feedbackText}
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

    </div>
  );
};

export default AssessmentStackA;
