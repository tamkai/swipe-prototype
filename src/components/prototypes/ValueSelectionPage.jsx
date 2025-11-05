import { useState, useEffect } from 'react';
import { valuesList } from '../../data/purposeCarvingData';

const ValueSelectionPage = ({ initialValues = [], onNext, onBack }) => {
  const [selectedValues, setSelectedValues] = useState(initialValues);

  const handleValueClick = (value) => {
    if (selectedValues.includes(value)) {
      // 既に選択済み → 解除
      setSelectedValues(selectedValues.filter(v => v !== value));
    } else {
      // 未選択 → 追加（最大3つ）
      if (selectedValues.length < 3) {
        setSelectedValues([...selectedValues, value]);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedValues.length !== 3) {
      alert('価値観を3つ選択してください');
      return;
    }

    onNext(selectedValues);
  };

  return (
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
        {/* タイトル */}
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          大切にする価値観
        </h2>

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
            color: '#374151',
            textAlign: 'center'
          }}>
            以下の価値観リストの中から、<strong>あなたが大切にしている3つ</strong>を選んでください
          </p>
        </div>

        {/* 選択された価値観の表示 */}
        <div style={{
          marginBottom: '30px',
          minHeight: '80px',
          padding: '20px',
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          border: '2px dashed #e5e7eb'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '12px',
            fontWeight: '600'
          }}>
            選択された価値観: {selectedValues.length}/3
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {selectedValues.length === 0 ? (
              <span style={{
                fontSize: '14px',
                color: '#9ca3af',
                fontStyle: 'italic'
              }}>
                まだ選択されていません
              </span>
            ) : (
              selectedValues.map((value, index) => (
                <div
                  key={index}
                  onClick={() => handleValueClick(value)}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#2563eb';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#3b82f6';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  {value}
                  <span style={{ fontSize: '12px' }}>✕</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 価値観リスト */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '12px',
          marginBottom: '30px'
        }}>
          {valuesList.map((value, index) => {
            const isSelected = selectedValues.includes(value);
            const isDisabled = !isSelected && selectedValues.length >= 3;

            return (
              <button
                key={index}
                onClick={() => !isDisabled && handleValueClick(value)}
                disabled={isDisabled}
                style={{
                  padding: '12px 16px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: isSelected ? 'white' : isDisabled ? '#d1d5db' : '#374151',
                  backgroundColor: isSelected ? '#3b82f6' : 'white',
                  border: `2px solid ${isSelected ? '#3b82f6' : isDisabled ? '#e5e7eb' : '#d1d5db'}`,
                  borderRadius: '12px',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: isDisabled ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isDisabled) {
                    if (isSelected) {
                      e.target.style.backgroundColor = '#2563eb';
                      e.target.style.transform = 'translateY(-2px)';
                    } else {
                      e.target.style.borderColor = '#9ca3af';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isDisabled) {
                    if (isSelected) {
                      e.target.style.backgroundColor = '#3b82f6';
                      e.target.style.transform = 'translateY(0)';
                    } else {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }
                }}
              >
                {value}
              </button>
            );
          })}
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
            disabled={selectedValues.length !== 3}
            style={{
              flex: 2,
              padding: '16px',
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              backgroundColor: selectedValues.length === 3 ? '#3b82f6' : '#d1d5db',
              border: 'none',
              borderRadius: '12px',
              cursor: selectedValues.length === 3 ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              boxShadow: selectedValues.length === 3 ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (selectedValues.length === 3) {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedValues.length === 3) {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            完了
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValueSelectionPage;
