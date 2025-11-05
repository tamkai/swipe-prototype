import { useState, useEffect } from 'react';

const LifeReflectionPage = ({ ageRange, initialValues = [], onNext, onBack }) => {
  const [values, setValues] = useState(Array(6).fill(''));

  // 初期値をセット（空配列の場合もクリアする）
  useEffect(() => {
    if (initialValues.length > 0) {
      setValues([...initialValues, ...Array(Math.max(0, 6 - initialValues.length)).fill('')]);
    } else {
      // 空配列が渡された場合は全てクリア
      setValues(Array(6).fill(''));
    }
  }, [initialValues]);

  // 画面遷移時に上部にスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ageRange.id]);

  const handleInputChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handleSubmit = () => {
    // 空でない値のみを抽出
    const filledValues = values.filter(v => v.trim() !== '');

    if (filledValues.length === 0) {
      alert('少なくとも1つ入力してください');
      return;
    }

    onNext(values);
  };

  // 入力済みの数をカウント
  const filledCount = values.filter(v => v.trim() !== '').length;

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .age-range-title {
            font-size: 18px !important;
          }
        }
      `}</style>
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 20px',
        paddingTop: '60px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '40px 30px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          boxSizing: 'border-box'
        }}>
          {/* メインタイトル */}
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            Life Reflection
          </h2>

          {/* 年代タイトル */}
          <div
            className="age-range-title"
            style={{
              backgroundColor: '#1f2937',
              color: 'white',
              padding: '16px 20px',
              borderRadius: '12px',
              marginBottom: '20px',
              fontSize: '20px',
              fontWeight: '700',
              textAlign: 'center'
            }}>
            {ageRange.displayLabel}
          </div>

        {/* 質問文 */}
        <div style={{
          backgroundColor: '#fef3c7',
          padding: '16px 20px',
          borderRadius: '12px',
          marginBottom: '30px',
          lineHeight: '1.7'
        }}>
          <p style={{
            margin: 0,
            fontSize: '16px',
            color: '#374151'
          }}>
            {ageRange.question}
          </p>
        </div>

        {/* 入力カウント */}
        <div style={{
          marginBottom: '20px',
          textAlign: 'right',
          fontSize: '14px',
          color: filledCount >= 1 ? '#10b981' : '#9ca3af',
          fontWeight: '600'
        }}>
          入力済み: {filledCount}/6 {filledCount >= 1 ? '✓' : '(最低1つ入力してください)'}
        </div>

        {/* 入力欄 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '16px',
          marginBottom: '30px'
        }}>
          {values.map((value, index) => (
            <div key={index}>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder={ageRange.placeholders[index] || ''}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                  backgroundColor: 'white',
                  color: '#1f2937'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          ))}
        </div>

        {/* ボタン */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onBack}
            style={{
              flex: 1,
              padding: '16px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#6b7280',
              backgroundColor: 'transparent',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#9ca3af';
              e.target.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.color = '#6b7280';
            }}
          >
            戻る
          </button>

          <button
            onClick={handleSubmit}
            disabled={filledCount === 0}
            style={{
              flex: 2,
              padding: '16px',
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              backgroundColor: filledCount >= 1 ? '#3b82f6' : '#d1d5db',
              border: 'none',
              borderRadius: '12px',
              cursor: filledCount >= 1 ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              boxShadow: filledCount >= 1 ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (filledCount >= 1) {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (filledCount >= 1) {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            次へ
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default LifeReflectionPage;
