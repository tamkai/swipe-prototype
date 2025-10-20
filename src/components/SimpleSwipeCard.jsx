import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useState } from 'react';

const SimpleSwipeCard = ({ question, onSwipe }) => {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  const controls = useAnimation();

  const handleDragEnd = async (event, info) => {
    const threshold = 100;

    if (Math.abs(info.offset.x) > threshold) {
      // スワイプ判定
      const direction = info.offset.x > 0 ? 'yes' : 'no';
      const targetX = info.offset.x > 0 ? 500 : -500;

      await controls.start({
        x: targetX,
        rotate: info.offset.x > 0 ? 25 : -25,
        opacity: 0,
        transition: { duration: 0.3 }
      });

      onSwipe(direction, question);
    } else {
      // しきい値に達しない場合は元の位置に戻す
      await controls.start({
        x: 0,
        rotate: 0,
        transition: { duration: 0.3 }
      });
    }
  };

  // ボタン押下時のアニメーション
  const handleButtonClick = async (direction) => {
    const targetX = direction === 'yes' ? -500 : 500;

    await controls.start({
      x: targetX,
      rotate: direction === 'yes' ? -25 : 25,
      opacity: 0,
      transition: { duration: 0.3 }
    });

    onSwipe(direction, question);
  };

  const handleSkip = () => {
    controls.start({
      y: 500,
      opacity: 0,
      transition: { duration: 0.2 }
    });

    // アニメーション完了を待たずに即座にコールバック
    setTimeout(() => {
      onSwipe('skip', question);
    }, 10);
  };

  return (
    <>
      <motion.div
        style={{
          x,
          rotate,
          opacity,
          position: 'absolute',
          width: '100%',
          height: '100%',
          cursor: 'grab',
          zIndex: 10,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileTap={{ cursor: 'grabbing' }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            userSelect: 'none',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* 質問テキスト */}
          <div style={{
            textAlign: 'center',
            fontSize: '28px',
            fontWeight: '700',
            color: '#1a1a1a',
            lineHeight: '1.5',
            width: '100%',
            wordBreak: 'break-word'
          }}>
            {question.question}
          </div>
        </div>
      </motion.div>

      {/* ボタン群 */}
      <div style={{
        position: 'absolute',
        bottom: '-130px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        maxWidth: '400px',
      }}>
        {/* YES/NOボタン */}
        <div style={{
          display: 'flex',
          gap: '16px',
          width: '100%',
        }}>
          <button
            onClick={() => handleButtonClick('yes')}
            style={{
              flex: 1,
              padding: '16px 24px',
              fontSize: '20px',
              fontWeight: '700',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.2s',
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            YES
          </button>
          <button
            onClick={() => handleButtonClick('no')}
            style={{
              flex: 1,
              padding: '16px 24px',
              fontSize: '20px',
              fontWeight: '700',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
              transition: 'all 0.2s',
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            NO
          </button>
        </div>

        {/* スキップボタン */}
        <button
          onClick={handleSkip}
          style={{
            width: '100%',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: 'transparent',
            color: '#9ca3af',
            border: '2px solid #9ca3af',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          スキップ
        </button>
      </div>
    </>
  );
};

export default SimpleSwipeCard;
