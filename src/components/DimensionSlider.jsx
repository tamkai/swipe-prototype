import { useState } from 'react';
import { motion } from 'framer-motion';

const DimensionSlider = ({
  dimension,
  pole_a,
  keyword_a,
  pole_b,
  keyword_b,
  value = 0.5, // 0-1の値（0=pole_a寄り、1=pole_b寄り）
  onChange,
  readOnly = false,
  showDescription = false,
  description = ''
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    if (readOnly) return;
    const newValue = parseFloat(e.target.value);
    setLocalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  // 値に応じた位置テキスト
  const getPositionText = (val) => {
    if (val <= 0.1) return `${pole_a}寄り`;
    if (val < 0.3) return `やや${pole_a}寄り`;
    if (val < 0.45) return `少し${pole_a}寄り`;
    if (val >= 0.9) return `${pole_b}寄り`;
    if (val > 0.7) return `やや${pole_b}寄り`;
    if (val > 0.55) return `少し${pole_b}寄り`;
    return '中間';
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '600px',
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    }}>
      {/* 次元名 */}
      <div style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '10px',
        textAlign: 'center'
      }}>
        【{dimension}】
      </div>

      {/* 説明文（オプション） */}
      {showDescription && description && (
        <div style={{
          fontSize: '16px',
          color: '#4b5563',
          marginBottom: '20px',
          lineHeight: '1.8',
          textAlign: 'left',
          whiteSpace: 'pre-line'
        }}>
          {description}
        </div>
      )}

      {/* スライダー本体 */}
      <div style={{
        position: 'relative',
        marginTop: '40px',
        marginBottom: '40px'
      }}>
        {/* 左右のラベル */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          <div style={{ color: '#3b82f6' }}>{pole_a}</div>
          <div style={{ color: '#ef4444' }}>{pole_b}</div>
        </div>

        {/* スライダー軸 */}
        <div style={{
          position: 'relative',
          height: '60px',
          display: 'flex',
          alignItems: 'center'
        }}>
          {/* 背景グラデーション */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            background: 'linear-gradient(to right, #3b82f6, #9ca3af, #ef4444)'
          }} />

          {/* スライダー */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={localValue}
            onChange={handleChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            disabled={readOnly}
            style={{
              position: 'relative',
              width: '100%',
              height: '8px',
              appearance: 'none',
              background: 'transparent',
              outline: 'none',
              cursor: readOnly ? 'default' : 'pointer',
              zIndex: 10
            }}
          />
        </div>

        {/* キーワード表示 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <div>{keyword_a}</div>
          <div>{keyword_b}</div>
        </div>
      </div>

      {/* 現在の位置表示 */}
      <motion.div
        animate={{
          scale: isDragging ? 1.05 : 1
        }}
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f3f4f6',
          borderRadius: '10px',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: '600',
          color: '#1f2937'
        }}
      >
        あなたの位置: {getPositionText(localValue)}
      </motion.div>

      {/* CSS for slider thumb */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid ${localValue < 0.5 ? '#3b82f6' : '#ef4444'};
          cursor: ${readOnly ? 'default' : 'pointer'};
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: ${readOnly ? 'none' : 'scale(1.2)'};
        }

        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid ${localValue < 0.5 ? '#3b82f6' : '#ef4444'};
          cursor: ${readOnly ? 'default' : 'pointer'};
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        input[type="range"]::-moz-range-thumb:hover {
          transform: ${readOnly ? 'none' : 'scale(1.2)'};
        }
      `}</style>
    </div>
  );
};

export default DimensionSlider;
