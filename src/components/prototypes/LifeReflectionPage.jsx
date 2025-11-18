import { useState, useEffect } from 'react';
import image1 from '../../assets/fethi-bouhaouchine-fTVKDOvlVVE-unsplash.jpg';
import image2 from '../../assets/merci-l-PTXAirn4qvw-unsplash.jpg';

const LifeReflectionPage = ({ ageRange, initialValues = [], onNext, onBack }) => {
  const [values, setValues] = useState(Array(6).fill(''));
  const [showDetails, setShowDetails] = useState(false);
  const [hasOpenedDetails, setHasOpenedDetails] = useState(false);

  // 初期値をセット（空配列の場合もクリアする）
  useEffect(() => {
    if (initialValues.length > 0) {
      setValues([...initialValues, ...Array(Math.max(0, 6 - initialValues.length)).fill('')]);
    } else {
      // 空配列が渡された場合は全てクリア
      setValues(Array(6).fill(''));
    }
  }, [initialValues]);

  // 詳細を開いたら、開いたことを記録
  useEffect(() => {
    if (showDetails) {
      setHasOpenedDetails(true);
    }
  }, [showDetails]);

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

        {/* 開閉可能な説明セクション（0〜10歳のみ） */}
        {ageRange.id === 'age_0_10' && (
          <div style={{
            backgroundColor: '#fffbeb',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '30px',
            border: '1px solid #fef3c7'
          }}>
            <button
              onClick={() => setShowDetails(!showDetails)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
                fontSize: '15px',
                fontWeight: '600',
                color: '#374151',
                textAlign: 'left'
              }}
            >
              <span>💡 あなたのこれまでを振り返るにあたって（必ずお読みください）</span>
              <span style={{
                fontSize: '18px',
                transition: 'transform 0.2s ease',
                flexShrink: 0,
                marginLeft: '8px'
              }}>
                {showDetails ? '▲' : '▼'}
              </span>
            </button>

            {showDetails && (
              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid #fef3c7',
                fontSize: '15px',
                color: '#374151',
                lineHeight: '1.9'
              }}>
                <p style={{ marginBottom: '16px' }}>
                  <strong>「人生を振り返る」</strong>と言われて、少し戸惑われたかもしれません。<br />
                  しかも「生まれてから10歳までに」と言われても覚えていない、という方もいらっしゃるでしょう。
                </p>

                <p style={{ marginBottom: '16px', fontWeight: '600' }}>
                  ここで2つコツをお伝えさせてください。
                </p>

                <hr style={{
                  border: 'none',
                  borderTop: '1px solid #d1d5db',
                  margin: '16px 0'
                }} />

                <img
                  src={image1}
                  alt="目を閉じて振り返る"
                  style={{
                    width: '66%',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                />

                <p style={{ marginBottom: '12px', fontWeight: '600' }}>
                  ひとつめ、ゆっくりと目を閉じて、小さいころに住んでいた家を思い浮かべてください。
                </p>
                <p style={{ marginBottom: '12px' }}>
                  どんな部屋で、そこにはどんなものがありますか？<br />
                  家の外で、通っていた学校で、いつもの遊び場で、どんなことがありましたか？
                </p>
                <p style={{ marginBottom: '16px', fontWeight: '600' }}>
                  いま、ふっと思いついたことがふりかえりの手がかりです
                </p>

                <hr style={{
                  border: 'none',
                  borderTop: '1px solid #d1d5db',
                  margin: '16px 0'
                }} />

                <img
                  src={image2}
                  alt="言葉で説明する"
                  style={{
                    width: '66%',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                />

                <p style={{ marginBottom: '12px', fontWeight: '600' }}>
                  ふたつめ、その思いついたことをあなたなりの言葉で説明してください
                </p>
                <p style={{ marginBottom: '12px' }}>
                  もしあなたがテレビの前にあるゲーム機を思い浮かべたとして
                </p>
                <p style={{ marginBottom: '16px' }}>
                  「ゲーム」とただ書くよりも、「なんというゲームで、どんなきっかけで手に入れて、どういうところが好きで、それにまつわるどんなエピソードがあったか」というところまで、是非書いてみてください<br />
                  <br />
                  例えば「<strong>ファミコンと一緒に買ったスーパーマリオ、なかなかクリアできないステージを友達と交代で挑戦した、クリアできたときに思わずハイタッチした</strong>」というような感じです
                </p>

                <p style={{ marginBottom: '12px', fontWeight: '600' }}>
                  少し大変に思われるかもしれませんが、こうしたことにこそあなたの創造性をカタチ作るものがあります
                </p>
                <p style={{ marginBottom: '0' }}>
                  もし、いま記入するのが難しい場合は、一旦時間をおいて、落ち着いた環境で記入してみてください
                </p>
              </div>
            )}
          </div>
        )}

        {/* 進行状況カウント */}
        <div style={{
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {ageRange.id === 'age_0_10' && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: '#6b7280' }}>① 説明を読む</span>
              <span style={{ color: hasOpenedDetails ? '#10b981' : '#9ca3af' }}>
                {hasOpenedDetails ? '✓ 完了' : '未完了'}
              </span>
            </div>
          )}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ color: '#6b7280' }}>{ageRange.id === 'age_0_10' ? '②' : '①'} 入力する（最低1つ）</span>
            <span style={{ color: filledCount >= 1 ? '#10b981' : '#9ca3af' }}>
              {filledCount >= 1 ? `✓ ${filledCount}/6 入力済み` : '0/6 入力済み'}
            </span>
          </div>
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
            disabled={ageRange.id === 'age_0_10' ? (!hasOpenedDetails || filledCount === 0) : filledCount === 0}
            style={{
              flex: 2,
              padding: '16px',
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              backgroundColor: (ageRange.id === 'age_0_10' ? (hasOpenedDetails && filledCount >= 1) : filledCount >= 1) ? '#3b82f6' : '#d1d5db',
              border: 'none',
              borderRadius: '12px',
              cursor: (ageRange.id === 'age_0_10' ? (hasOpenedDetails && filledCount >= 1) : filledCount >= 1) ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              boxShadow: (ageRange.id === 'age_0_10' ? (hasOpenedDetails && filledCount >= 1) : filledCount >= 1) ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (ageRange.id === 'age_0_10' ? (hasOpenedDetails && filledCount >= 1) : filledCount >= 1) {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (ageRange.id === 'age_0_10' ? (hasOpenedDetails && filledCount >= 1) : filledCount >= 1) {
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
