import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useState } from 'react';

const KeywordSwipeCard = ({ item, onSwipe }) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  const controls = useAnimation();

  const handleDragEnd = async (event, info) => {
    const threshold = 100;

    // 上下スワイプの判定を追加
    if (Math.abs(info.offset.y) > threshold) {
      // 下スワイプ = どちらともいえない
      if (info.offset.y > 0) {
        onSwipe('neither', item);
        setBorderColor('#9ca3af');
        await controls.start({
          y: 500,
          opacity: 0,
          transition: { duration: 0.2 }
        });
      } else {
        // 上スワイプは戻す
        await controls.start({
          x: 0,
          y: 0,
          rotate: 0,
          transition: { duration: 0.3 }
        });
      }
    } else if (Math.abs(info.offset.x) > threshold) {
      // 左右スワイプ判定（左=当てはまる、右=当てはまらない）
      const direction = info.offset.x > 0 ? 'not_match' : 'match';
      const targetX = info.offset.x > 0 ? 500 : -500;

      // 先にonSwipeを呼んでテキストを更新
      onSwipe(direction, item);

      // 枠線の色を設定
      setBorderColor(direction === 'match' ? '#34d399' : '#f97316');

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
        y: 0,
        rotate: 0,
        transition: { duration: 0.3 }
      });
    }
  };

  // ボタン押下時のアニメーション
  const handleButtonClick = async (direction) => {
    const targetX = direction === 'match' ? -500 : 500;

    // 先にonSwipeを呼んでテキストを更新
    onSwipe(direction, item);

    // 枠線の色を設定
    setBorderColor(direction === 'match' ? '#34d399' : '#f97316');

    await controls.start({
      x: targetX,
      rotate: direction === 'match' ? -25 : 25,
      opacity: 0,
      transition: { duration: 0.3 }
    });
  };

  const handleNeither = () => {
    // 先にonSwipeを呼んでテキストを更新
    onSwipe('neither', item);

    // 「どちらともいえない」時はグレーの枠線
    setBorderColor('#9ca3af');

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
        drag={true}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
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
          {/* 比較テキスト */}
          {item.compareTo && (
            <div style={{
              position: 'absolute',
              top: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '20px',
              fontWeight: '600',
              color: '#9ca3af',
              textAlign: 'center',
              lineHeight: '1.5',
              width: '90%',
              maxWidth: '350px'
            }}>
              「{item.compareTo}」<br />よりも
            </div>
          )}

          {/* キーワード */}
          <div style={{
            textAlign: 'center',
            fontSize: item.keyword.length >= 6 ? '36px' : '48px',
            fontWeight: '900',
            color: '#1a1a1a',
            lineHeight: '1.3',
            width: '100%',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word'
          }}>
            {item.keyword}
          </div>
        </div>
      </motion.div>

      {/* ボタン群 */}
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: '400px',
      }}>
        {/* 当てはまる/当てはまらないボタン */}
        <div style={{
          display: 'flex',
          gap: '16px',
          width: '100%',
        }}>
          <button
            onClick={() => handleButtonClick('match')}
            style={{
              flex: 1,
              padding: '16px 24px',
              fontSize: '20px',
              fontWeight: '700',
              backgroundColor: '#34d399',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(52, 211, 153, 0.4)',
              transition: 'all 0.2s',
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            あてはまる
          </button>
          <button
            onClick={() => handleButtonClick('not_match')}
            style={{
              flex: 1,
              padding: '16px 24px',
              fontSize: '20px',
              fontWeight: '700',
              backgroundColor: '#f97316',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)',
              transition: 'all 0.2s',
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            あてはまらない
          </button>
        </div>

        {/* どちらもあてはまるボタン */}
        <button
          onClick={handleNeither}
          style={{
            width: '100%',
            padding: '14px 24px',
            fontSize: '18px',
            fontWeight: '700',
            backgroundColor: '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(156, 163, 175, 0.3)',
            transition: 'all 0.2s',
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          どちらもあてはまる
        </button>
      </div>
    </>
  );
};

export default KeywordSwipeCard;
