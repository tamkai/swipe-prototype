import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';

const SwipeCard = ({ card, onSwipe }) => {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (event, info) => {
    const threshold = 100;

    if (Math.abs(info.offset.x) > threshold) {
      // スワイプ判定
      const direction = info.offset.x > 0 ? 'right' : 'left';
      setExitX(info.offset.x > 0 ? 500 : -500);
      onSwipe(direction, card);
    }
  };

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity,
        position: 'absolute',
        width: '100%',
        height: '100%',
        cursor: 'grab',
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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
        {/* カードコンテンツ */}
        {card.type === 'text' && (
          <div style={{
            textAlign: 'center',
            fontSize: '32px',
            fontWeight: '700',
            color: '#1a1a1a',
            lineHeight: '1.4',
            width: '100%',
            wordBreak: 'break-word'
          }}>
            {card.content}
          </div>
        )}

        {card.type === 'image' && (
          <img
            src={card.content}
            alt="Card content"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '20px',
            }}
          />
        )}

        {/* スワイプインジケーター */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            opacity: useTransform(x, [0, 100], [0, 1]),
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#4ade80',
            textShadow: '0 0 10px rgba(74, 222, 128, 0.5)',
          }}
        >
          LIKE
        </motion.div>

        <motion.div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            opacity: useTransform(x, [-100, 0], [1, 0]),
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#f87171',
            textShadow: '0 0 10px rgba(248, 113, 113, 0.5)',
          }}
        >
          NOPE
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
