import { useState, useCallback } from 'react';

const BasicInfoInput = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [creativeExperience, setCreativeExperience] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);

  // スライダーつまみの色を計算
  const getColorForValue = useCallback((val) => {
    if (val >= 0.4 && val <= 0.6) return '#9ca3af'; // グレー
    else if (val < 0.4) return '#3b82f6';            // 青
    else return '#ef4444';                           // 赤
  }, []);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('お名前を入力してください');
      return;
    }

    onComplete({
      name: name.trim(),
      title: title.trim(),
      creativeExperience
    });
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '40px 30px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        boxSizing: 'border-box'
      }}>
        {/* タイトル */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: '800',
          color: '#1f2937',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          AFFLATUS創造性診断
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          診断を始める前に
        </p>

        {/* 基本情報入力 */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '10px'
          }}>
            お名前 <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例: タムラカイ"
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '10px'
          }}>
            職業・肩書き
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例: プロダクトデザイナー"
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
          <p style={{
            fontSize: '13px',
            color: '#9ca3af',
            marginTop: '8px',
            lineHeight: '1.5'
          }}>
            ※入力いただくとレポートの精度が高まります
          </p>
        </div>

        {/* 区切り線 */}
        <div style={{
          height: '1px',
          backgroundColor: '#e5e7eb',
          margin: '40px 0'
        }} />

        {/* 創造性についての質問 */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '20px'
          }}>
            【創造性についてお聞きします】
          </h2>

          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.8',
            marginBottom: '10px',
            fontWeight: '500'
          }}>
            「正解がわからないことでも、試行錯誤しながら形にする」
          </p>

          <p style={{
            fontSize: '16px',
            color: '#374151',
            lineHeight: '1.8',
            marginBottom: '20px'
          }}>
            そんな経験を、今までどれくらいしてきたと思いますか？
          </p>

          <div style={{
            backgroundColor: '#f9fafb',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '30px'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.7',
              margin: 0
            }}>
              ※大小は問いません。小さな工夫でも、試行錯誤した経験でもOKです。
              <br />
              ※創造性には色々な形があります。この後の診断で、あなたらしい創造性のスタイルがわかります。
            </p>
          </div>

          {/* スライダー */}
          <div style={{
            position: 'relative',
            padding: '20px 0'
          }}>
            {/* カスタムつまみ */}
            <div
              style={{
                position: 'absolute',
                left: `calc(${creativeExperience * 100}% - 14px)`,
                top: '11px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: getColorForValue(creativeExperience),
                border: '3px solid white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                pointerEvents: 'none',
                transition: 'transform 0.15s ease',
                transform: isDragging ? 'scale(1.1)' : 'scale(1)',
                zIndex: 20
              }}
            />

            <input
              type="range"
              min="0"
              max="100"
              value={creativeExperience * 100}
              onChange={(e) => setCreativeExperience(e.target.value / 100)}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              className="creative-experience-slider"
              style={{
                width: '100%',
                height: '8px',
                background: 'linear-gradient(to right, #3b82f6 0%, #9ca3af 50%, #ef4444 100%)',
                borderRadius: '4px',
                outline: 'none',
                WebkitAppearance: 'none',
                appearance: 'none',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 10
              }}
            />

            {/* ラベル */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '12px',
              fontSize: '14px',
              color: '#6b7280'
            }}>
              <span>少ない</span>
              <span>多い</span>
            </div>
          </div>
        </div>

        {/* 開始ボタン */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '18px',
            fontSize: '18px',
            fontWeight: '700',
            color: 'white',
            backgroundColor: '#3b82f6',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            marginTop: '20px',
            transition: 'background-color 0.2s, transform 0.1s',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#2563eb';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#3b82f6';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          診断を開始する
        </button>
      </div>

      {/* スライダーのスタイル */}
      <style>{`
        .creative-experience-slider::-webkit-slider-thumb {
          opacity: 0;
          width: 28px;
          height: 28px;
          background: transparent;
          border: none;
          cursor: pointer;
          -webkit-appearance: none;
        }

        .creative-experience-slider::-moz-range-thumb {
          opacity: 0;
          width: 28px;
          height: 28px;
          background: transparent;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default BasicInfoInput;
