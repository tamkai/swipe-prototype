import React from 'react';

const PurposeCarvingIntro = ({ onStart }) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '40px 20px',
      paddingTop: '60px',
      boxSizing: 'border-box',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      gap: '30px'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <div style={{
          fontSize: '64px',
          marginBottom: '16px'
        }}>
          ✨
        </div>
        <h1 style={{
          color: 'white',
          fontSize: 'clamp(28px, 8vw, 36px)',
          fontWeight: '800',
          marginBottom: '16px',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          whiteSpace: 'nowrap'
        }}>
          Life Reflection
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '18px',
          fontWeight: '500',
          marginBottom: '8px'
        }}>
          あなたの人生を振り返る
        </p>
      </div>

      <div style={{
        width: '100%',
        maxWidth: '800px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '32px 28px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{
          fontSize: '16px',
          lineHeight: '1.8',
          color: '#4b5563',
          marginBottom: '32px'
        }}>
          <p style={{ marginBottom: '16px', color: '#374151' }}>
            あなたの創造性は、これまでの人生経験の中で形づくられてきました。
          </p>
          <p style={{ marginBottom: '16px', color: '#374151' }}>
            好きだったこと、夢中になったこと、選んだ道、大切にしてきた価値観—<br />
            これらを振り返ることで、あなたらしい創造性のスタイルが見えてきます。
          </p>
          <p style={{ marginBottom: '16px', color: '#374151' }}>
            この振り返り（Life Reflection）は、パーパスを彫り出す「Purpose Carving」でも用いられる手法です。
          </p>

          <div style={{
            backgroundColor: '#f3f4f6',
            padding: '20px',
            borderRadius: '12px',
            marginTop: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '12px'
            }}>
              次のステップで振り返る内容：
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span>📝</span>
                <span>人生の各段階で好きだったこと、夢中になったこと</span>
              </li>
              <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span>💼</span>
                <span>現在のキャリアを選んだ理由</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span>💎</span>
                <span>大切にしている価値観</span>
              </li>
            </ul>
          </div>

          <div style={{
            padding: '16px',
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
            borderRadius: '12px',
            borderLeft: '4px solid #f59e0b'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#374151',
              fontWeight: '600',
              margin: 0
            }}>
              💡 所要時間：約5〜10分
            </p>
          </div>
        </div>

        <button
          onClick={onStart}
          style={{
            width: '100%',
            padding: '18px 24px',
            fontSize: '18px',
            fontWeight: '700',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#d97706';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f59e0b';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          開始する →
        </button>
      </div>
    </div>
  );
};

export default PurposeCarvingIntro;
