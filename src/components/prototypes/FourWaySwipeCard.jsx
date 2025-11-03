import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';

const FourWaySwipeCard = ({ question, onSwipe, pattern }) => {
  const [exitX, setExitX] = useState(0);
  const [exitY, setExitY] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(
    [x, y],
    ([latestX, latestY]) => {
      const distance = Math.sqrt(latestX * latestX + latestY * latestY);
      return distance > 200 ? 0.5 : 1;
    }
  );

  const handleDragEnd = (event, info) => {
    const threshold = 80;
    const offsetX = info.offset.x;
    const offsetY = info.offset.y;

    // 4方向の判定
    if (Math.abs(offsetX) > Math.abs(offsetY)) {
      // 左右判定が優先
      if (Math.abs(offsetX) > threshold) {
        const direction = offsetX > 0 ? 'right' : 'left'; // right=B, left=A
        setExitX(offsetX > 0 ? 500 : -500);
        onSwipe(direction, question);
      }
    } else {
      // 上下判定が優先
      if (Math.abs(offsetY) > threshold) {
        const direction = offsetY > 0 ? 'down' : 'up'; // up=スーパーライク, down=スキップ
        setExitY(offsetY > 0 ? 500 : -500);
        onSwipe(direction, question);
      }
    }
  };

  // パターンごとのコンポーネントをレンダリング
  const renderPattern = () => {
    switch (pattern) {
      case 'pattern1':
        return <Pattern1 x={x} y={y} question={question} />;
      case 'pattern2':
        return <Pattern2 x={x} y={y} question={question} />;
      case 'pattern3':
        return <Pattern3 x={x} y={y} question={question} />;
      default:
        return <Pattern1 x={x} y={y} question={question} />;
    }
  };

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        opacity,
        position: 'absolute',
        width: '100%',
        height: '100%',
        cursor: 'grab',
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      animate={
        exitX !== 0 || exitY !== 0
          ? { x: exitX, y: exitY, opacity: 0 }
          : {}
      }
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileTap={{ cursor: 'grabbing' }}
    >
      {renderPattern()}
    </motion.div>
  );
};

// 案1: 角にアイコン表示（常に表示）
const Pattern1 = ({ x, y, question }) => {
  const leftOpacity = useTransform(x, [-100, 0], [1, 0.3]);
  const rightOpacity = useTransform(x, [0, 100], [0.3, 1]);
  const upOpacity = useTransform(y, [-100, 0], [1, 0.3]);
  const downOpacity = useTransform(y, [0, 100], [0.3, 1]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 左上: A (青) */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          opacity: leftOpacity,
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#3b82f6',
        }}
      >
        A
      </motion.div>

      {/* 右上: B (緑) */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          opacity: rightOpacity,
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#10b981',
        }}
      >
        B
      </motion.div>

      {/* 上中央: どちらも当てはまる */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: upOpacity,
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#f59e0b',
          textAlign: 'center',
        }}
      >
        両方
      </motion.div>

      {/* 下中央: スキップ */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: downOpacity,
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#9ca3af',
        }}
      >
        スキップ
      </motion.div>

      {/* 質問テキスト */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
      }}>
        <div style={{
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: '600',
          color: '#3b82f6',
          padding: '16px',
          backgroundColor: '#eff6ff',
          borderRadius: '12px',
        }}>
          {question.optionA}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}>
          <span style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#3b82f6',
          }}>A</span>
          <span style={{
            fontSize: '32px',
            fontWeight: '300',
            color: '#999',
          }}>vs</span>
          <span style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#10b981',
          }}>B</span>
        </div>

        <div style={{
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: '600',
          color: '#10b981',
          padding: '16px',
          backgroundColor: '#f0fdf4',
          borderRadius: '12px',
        }}>
          {question.optionB}
        </div>
      </div>
    </div>
  );
};

// 案2: 放射状ガイド
const Pattern2 = ({ x, y, question }) => {
  const isDragging = useTransform([x, y], ([latestX, latestY]) => {
    return Math.abs(latestX) > 10 || Math.abs(latestY) > 10;
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 放射状の矢印ガイド */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: useTransform([x, y], ([latestX, latestY]) => {
            const distance = Math.sqrt(latestX * latestX + latestY * latestY);
            return distance > 10 ? 1 : 0;
          }),
        }}
      >
        {/* 左矢印 */}
        <motion.div
          style={{
            position: 'absolute',
            left: '-80px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '48px',
            color: '#3b82f6',
            opacity: useTransform(x, [-50, 0], [1, 0.3]),
          }}
        >
          ← A
        </motion.div>

        {/* 右矢印 */}
        <motion.div
          style={{
            position: 'absolute',
            right: '-80px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '48px',
            color: '#10b981',
            opacity: useTransform(x, [0, 50], [0.3, 1]),
          }}
        >
          B →
        </motion.div>

        {/* 上矢印 */}
        <motion.div
          style={{
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#f59e0b',
            textAlign: 'center',
            opacity: useTransform(y, [-50, 0], [1, 0.3]),
          }}
        >
          ↑<br/>両方
        </motion.div>

        {/* 下矢印 */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#9ca3af',
            textAlign: 'center',
            opacity: useTransform(y, [0, 50], [0.3, 1]),
          }}
        >
          ↓<br/>スキップ
        </motion.div>
      </motion.div>

      {/* 質問テキスト */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
      }}>
        <div style={{
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: '600',
          color: '#3b82f6',
          padding: '16px',
          backgroundColor: '#eff6ff',
          borderRadius: '12px',
        }}>
          {question.optionA}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}>
          <span style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#3b82f6',
          }}>A</span>
          <span style={{
            fontSize: '32px',
            fontWeight: '300',
            color: '#999',
          }}>vs</span>
          <span style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#10b981',
          }}>B</span>
        </div>

        <div style={{
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: '600',
          color: '#10b981',
          padding: '16px',
          backgroundColor: '#f0fdf4',
          borderRadius: '12px',
        }}>
          {question.optionB}
        </div>
      </div>
    </div>
  );
};

// 案3: ボーダー＋ラベル
const Pattern3 = ({ x, y, question }) => {
  const leftBorder = useTransform(x, [-100, 0], [8, 0]);
  const rightBorder = useTransform(x, [0, 100], [0, 8]);
  const topBorder = useTransform(y, [-100, 0], [8, 0]);
  const bottomBorder = useTransform(y, [0, 100], [0, 8]);

  return (
    <motion.div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
        borderLeftWidth: leftBorder,
        borderRightWidth: rightBorder,
        borderTopWidth: topBorder,
        borderBottomWidth: bottomBorder,
        borderLeftColor: '#3b82f6',
        borderRightColor: '#10b981',
        borderTopColor: '#f59e0b',
        borderBottomColor: '#9ca3af',
        borderStyle: 'solid',
      }}
    >
      {/* 左ラベル（常時表示） */}
      <motion.div
        style={{
          position: 'absolute',
          left: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          padding: '12px 10px',
          backgroundColor: '#3b82f6',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '0 12px 12px 0',
          opacity: useTransform(x, [-100, 0], [1, 0.5]),
        }}
      >
        ← A
      </motion.div>

      {/* 右ラベル（常時表示） */}
      <motion.div
        style={{
          position: 'absolute',
          right: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          padding: '12px 10px',
          backgroundColor: '#10b981',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '12px 0 0 12px',
          opacity: useTransform(x, [0, 100], [0.5, 1]),
        }}
      >
        B →
      </motion.div>

      {/* 上ラベル（常時表示） */}
      <motion.div
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '8px 20px',
          backgroundColor: '#f59e0b',
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
          borderRadius: '0 0 12px 12px',
          opacity: useTransform(y, [-100, 0], [1, 0.5]),
        }}
      >
        ↑ 両方
      </motion.div>

      {/* 下ラベル（常時表示） */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '8px 20px',
          backgroundColor: '#9ca3af',
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
          borderRadius: '12px 12px 0 0',
          opacity: useTransform(y, [0, 100], [0.5, 1]),
        }}
      >
        ↓ スキップ
      </motion.div>

      {/* 質問テキスト */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
      }}>
        <div style={{
          textAlign: 'left',
          fontSize: '20px',
          fontWeight: '600',
          color: '#3b82f6',
          padding: '16px',
          backgroundColor: '#eff6ff',
          borderRadius: '12px',
          paddingLeft: 'calc(16px + 0.5em)',
        }}>
          {question.optionA}
        </div>

        <div style={{
          textAlign: 'center',
          fontSize: '32px',
          fontWeight: '300',
          color: '#999',
        }}>
          vs
        </div>

        <div style={{
          textAlign: 'right',
          fontSize: '20px',
          fontWeight: '600',
          color: '#10b981',
          padding: '16px',
          backgroundColor: '#f0fdf4',
          borderRadius: '12px',
          paddingRight: 'calc(16px + 0.5em)',
        }}>
          {question.optionB}
        </div>
      </div>
    </motion.div>
  );
};

export default FourWaySwipeCard;
