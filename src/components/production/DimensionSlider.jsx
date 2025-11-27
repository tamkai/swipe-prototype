import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const DimensionSlider = ({
  dimension,
  pole_a,
  keyword_a,
  keywords_a,
  pole_b,
  keyword_b,
  keywords_b,
  value = 0.5, // 0-1の値（0=pole_a寄り、1=pole_b寄り）
  value2, // タイプ2の値（オプション）
  onChange,
  readOnly = false,
  showDescription = false,
  description = '',
  showPositionText = false,
  compact = false,
  showLegend = false, // 凡例表示フラグ（最初の軸のみtrue）
  hideKeywords = false, // キーワード非表示フラグ
  hideDimensionTitle = false // 軸名非表示フラグ（外部で表示する場合）
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);

  // 親からのvalue propが変更されたらlocalValueを更新
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // 値に応じた色を計算（3色切り替え：青・グレー・赤）
  const getColorForValue = useCallback((val) => {
    if (val >= 0.4 && val <= 0.6) {
      // 中央付近（±0.1）: グレー
      return '#9ca3af';
    } else if (val < 0.4) {
      // 左側: 青
      return '#3b82f6';
    } else {
      // 右側: 赤
      return '#ef4444';
    }
  }, []);

  // 編集モード用の一意なID（CSS用）
  const sliderId = `slider-${dimension.replace(/\s+/g, '-')}-${readOnly ? 'readonly' : 'edit'}`;

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

  // 現在の色を計算
  const currentColor = getColorForValue(localValue);

  // スライダーのthumbを透明にするスタイル（カスタムつまみを使うため）
  useEffect(() => {
    const styleId = `slider-style-global`;
    let styleEl = document.getElementById(styleId);

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);

      // ネイティブのthumbを完全に透明にする
      styleEl.textContent = `
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: transparent;
          border: none;
          cursor: pointer;
          opacity: 0;
        }

        .custom-slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: transparent;
          border: none;
          cursor: pointer;
          opacity: 0;
        }
      `;
    }
  }, []);

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

  // キーワード表示用の配列（後方互換性のため）
  const displayKeywordsA = keywords_a || (keyword_a ? [keyword_a] : []);
  const displayKeywordsB = keywords_b || (keyword_b ? [keyword_b] : []);

  return (
    <div style={{
      width: '100%',
      maxWidth: '800px',
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* 次元名（暗い帯） - compactモードまたはreadOnlyモードのみ表示、hideDimensionTitleがtrueの場合は非表示 */}
      {!hideDimensionTitle && (compact || readOnly) && (
        compact ? (
          <div style={{
            backgroundColor: '#1f2937',
            padding: '12px 20px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'white'
            }}>
              {dimension}
            </div>
          </div>
        ) : (
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '10px',
            textAlign: 'center',
            padding: '30px 30px 0'
          }}>
            {dimension}
          </div>
        )
      )}

      <div style={{ padding: compact ? '16px' : (hideKeywords && hideDimensionTitle ? '12px' : '24px') }}>

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
        marginTop: compact ? '0' : '40px',
        marginBottom: compact ? '5px' : '40px'
      }}>
        {/* 左右の極ラベル */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#3b82f6'
          }}>
            {pole_a}
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#ef4444'
          }}>
            {pole_b}
          </div>
        </div>


        {/* スライダー軸コンテナ（600px中央配置） */}
        <div style={{
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
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

          {/* 中央ガイドライン */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '2px',
            height: '16px',
            backgroundColor: '#d1d5db',
            zIndex: 5
          }} />

          {/* タイプ1マーカー（直感判断）- 下向き三角（先端が上でバーに接する） */}
          {readOnly && value !== undefined && (
            <div style={{
              position: 'absolute',
              left: `calc(${value * 100}% ${value <= 0.05 ? '- 5px' : value >= 0.95 ? '+ 5px' : ''})`,
              transform: value <= 0.05 ? 'translateX(0)' : value >= 0.95 ? 'translateX(-100%)' : 'translateX(-50%)',
              top: '-4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: value <= 0.05 ? 'flex-start' : value >= 0.95 ? 'flex-end' : 'center',
              zIndex: 20
            }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '2px',
                whiteSpace: 'nowrap'
              }}>
                直感判断
              </span>
              <div style={{
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '12px solid #374151',
                marginLeft: value <= 0.05 ? '0' : value >= 0.95 ? 'auto' : 'auto',
                marginRight: value <= 0.05 ? 'auto' : value >= 0.95 ? '0' : 'auto'
              }} />
            </div>
          )}

          {/* タイプ2マーカー（自己認識）- 上向き三角（先端が下でバーに接する） */}
          {readOnly && value2 !== undefined && (
            <div style={{
              position: 'absolute',
              left: `calc(${value2 * 100}% ${value2 <= 0.05 ? '- 5px' : value2 >= 0.95 ? '+ 5px' : ''})`,
              transform: value2 <= 0.05 ? 'translateX(0)' : value2 >= 0.95 ? 'translateX(-100%)' : 'translateX(-50%)',
              bottom: '-4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: value2 <= 0.05 ? 'flex-start' : value2 >= 0.95 ? 'flex-end' : 'center',
              zIndex: 20
            }}>
              <div style={{
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '12px solid #374151',
                marginLeft: value2 <= 0.05 ? '0' : value2 >= 0.95 ? 'auto' : 'auto',
                marginRight: value2 <= 0.05 ? 'auto' : value2 >= 0.95 ? '0' : 'auto'
              }} />
              <span style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#374151',
                marginTop: '2px',
                whiteSpace: 'nowrap'
              }}>
                自己認識
              </span>
            </div>
          )}

          {/* カスタムつまみ（視覚表示用） */}
          {!readOnly && (
            <div style={{
              position: 'absolute',
              left: `calc(${localValue * 100}% - 14px)`,
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'white',
              border: `3px solid ${currentColor}`,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              pointerEvents: 'none',
              zIndex: 15,
              transition: 'border-color 0.15s ease',
              transform: isDragging ? 'scale(1.1)' : 'scale(1)'
            }} />
          )}

          {/* スライダー（編集モード時のみ、thumbは透明） */}
          {!readOnly && (
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
              className="custom-slider"
              style={{
                position: 'relative',
                width: '100%',
                height: '8px',
                appearance: 'none',
                background: 'transparent',
                outline: 'none',
                cursor: 'pointer',
                zIndex: 10
              }}
            />
          )}
        </div>

        {/* キーワード表示（バーの下、2x2行）600px中央配置 - hideKeywordsがtrueの場合は非表示 */}
        {!hideKeywords && (
          <div style={{
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '15px',
            gap: '20px'
          }}>
            {/* 左側キーワード */}
            <div style={{ flex: 1, textAlign: 'left' }}>
              {/* 1行目: 最初の2つをスラッシュで */}
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                {displayKeywordsA.slice(0, 2).join(' / ')}
              </div>
              {/* 2行目: 残りの2つをスラッシュで */}
              {displayKeywordsA.length > 2 && (
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '4px'
                }}>
                  {displayKeywordsA.slice(2, 4).join(' / ')}
                </div>
              )}
            </div>

            {/* 右側キーワード */}
            <div style={{ flex: 1, textAlign: 'right' }}>
              {/* 1行目: 最初の2つをスラッシュで */}
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                {displayKeywordsB.slice(0, 2).join(' / ')}
              </div>
              {/* 2行目: 残りの2つをスラッシュで */}
              {displayKeywordsB.length > 2 && (
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '4px'
                }}>
                  {displayKeywordsB.slice(2, 4).join(' / ')}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 現在の位置表示（600px中央配置） */}
      {showPositionText && (
        <motion.div
          animate={{
            scale: isDragging ? 1.05 : 1
          }}
          style={{
            width: '100%',
            maxWidth: '600px',
            margin: '20px auto 0',
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
      )}

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
    </div>
  );
};

export default DimensionSlider;
