import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useState } from 'react';

const AssessmentCardB = ({ question, onSwipe }) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  const controls = useAnimation();

  // 質問データから左右のラベルを取得
  const leftLabel = question.leftLabel || 'YES';
  const rightLabel = question.rightLabel || 'NO';

  const handleDragEnd = async (event, info) => {
    const threshold = 100;

    if (Math.abs(info.offset.x) > threshold) {
      // スワイプ判定（左スワイプ=left、右スワイプ=right）
      const direction = info.offset.x > 0 ? 'right' : 'left';
      const targetX = info.offset.x > 0 ? 500 : -500;

      // 先にonSwipeを呼んでテキストを更新
      onSwipe(direction, question);

      // 枠線の色を設定
      setBorderColor(direction === 'left' ? '#10b981' : '#ef4444');

      await controls.start({
        x: targetX,
        rotate: info.offset.x > 0 ? 25 : -25,
        opacity: 0,
        transition: { duration: 0.3 }
      });
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
    const targetX = direction === 'left' ? -500 : 500;

    // 先にonSwipeを呼んでテキストを更新
    onSwipe(direction, question);

    // 枠線の色を設定
    setBorderColor(direction === 'left' ? '#10b981' : '#ef4444');

    await controls.start({
      x: targetX,
      rotate: direction === 'left' ? -25 : 25,
      opacity: 0,
      transition: { duration: 0.3 }
    });
  };

  const handleBoth = () => {
    // 先にonSwipeを呼んでテキストを更新
    onSwipe('both', question);

    // 「両方」時は紫色の枠線
    setBorderColor('#8b5cf6');

    controls.start({
      y: 500,
      opacity: 0,
      transition: { duration: 0.2 }
    });
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
            border: `8px solid ${borderColor}`,
            transition: 'border-color 0.1s ease-out'
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
        {/* 左/右ボタン */}
        <div style={{
          display: 'flex',
          gap: '16px',
          width: '100%',
        }}>
          <button
            onClick={() => handleButtonClick('left')}
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
            {leftLabel}
          </button>
          <button
            onClick={() => handleButtonClick('right')}
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
            {rightLabel}
          </button>
        </div>

        {/* 両方当てはまるボタン */}
        <button
          onClick={handleBoth}
          style={{
            width: '100%',
            padding: '14px 24px',
            fontSize: '18px',
            fontWeight: '700',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            transition: 'all 0.2s',
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          両方当てはまる
        </button>
      </div>
    </>
  );
};

export default AssessmentCardB;
