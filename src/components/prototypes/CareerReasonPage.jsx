import { useState, useEffect } from 'react';

const CareerReasonPage = ({ initialValue = '', onNext, onBack }) => {
  const [reason, setReason] = useState(initialValue);

  const handleSubmit = () => {
    if (reason.trim() === '') {
      alert('キャリア選択理由を入力してください');
      return;
    }

    onNext(reason);
  };

  const charCount = reason.length;

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
        boxSizing: 'border-box',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
      }}>
        {/* タイトル */}
        <div style={{
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '10px',
            textAlign: 'center'
          }}>
            Life Reflection
          </h2>
        </div>

        {/* 質問文 */}
        <div style={{
          backgroundColor: '#fef3c7',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '30px',
          lineHeight: '1.8'
        }}>
          <p style={{
            margin: 0,
            fontSize: '18px',
            color: '#1f2937',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            そんな人生を歩んできたあなたが、現在の仕事に就いた/現在の進路を選んだ理由は？
          </p>
        </div>

        {/* テキストエリア */}
        <div style={{ marginBottom: '20px' }}>
          {/* 必須項目表示 */}
          <div style={{
            marginBottom: '8px',
            textAlign: 'right',
            fontSize: '13px',
            color: reason.trim() !== '' ? '#10b981' : '#9ca3af',
            fontWeight: '600'
          }}>
            {charCount > 0 ? `${charCount}文字 ✓` : '必須項目です'}
          </div>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="例: 人々の課題を解決する仕事がしたいと思い、デザインという手段を選びました。学生時代にボランティア活動で感じた「誰かの役に立てる喜び」がきっかけでした。"
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '16px',
              fontSize: '16px',
              lineHeight: '1.7',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              outline: 'none',
              resize: 'vertical',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
              fontFamily: 'inherit',
              backgroundColor: 'white',
              color: '#1f2937'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        {/* 音声入力ヒント */}
        <div style={{
          marginBottom: '30px',
          padding: '12px 16px',
          backgroundColor: '#f0f9ff',
          borderRadius: '8px',
          borderLeft: '3px solid #3b82f6'
        }}>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#1e40af',
            lineHeight: '1.6'
          }}>
            💡 スマホの場合は音声入力するのもおすすめです
          </p>
        </div>

        {/* ヒント */}
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '30px'
        }}>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.6'
          }}>
            💡 ヒント: 正解はありません。今の率直な気持ちを書いてみてください。「なんとなく」「親に勧められて」といった理由でも大丈夫です。
          </p>
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
            disabled={reason.trim() === ''}
            style={{
              flex: 2,
              padding: '16px',
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              backgroundColor: reason.trim() !== '' ? '#3b82f6' : '#d1d5db',
              border: 'none',
              borderRadius: '12px',
              cursor: reason.trim() !== '' ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              boxShadow: reason.trim() !== '' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (reason.trim() !== '') {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (reason.trim() !== '') {
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
  );
};

export default CareerReasonPage;
