import { useState } from 'react';

const BasicInfoInput = ({ onComplete, onDebugMenu }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('お名前を入力してください');
      return;
    }

    onComplete({
      name: name.trim(),
      title: title.trim()
    });
  };

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
      gap: '30px',
      overflowY: 'auto'
    }}>
      {/* ロゴとタイトル */}
      <div style={{
        textAlign: 'center'
      }}>
        {/* ロゴ */}
        <div style={{
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <svg width="120" height="auto" viewBox="0 0 230.68 313.8" fill="white" style={{
            filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.3))'
          }}>
            <g>
              <circle cx="147.08" cy="88.77" r="63.61"/>
              <circle cx="60.14" cy="172.72" r="37.49"/>
              <circle cx="120.93" cy="219.87" r="21.24"/>
            </g>
            <g>
              <path d="M52.88,291.67h-7.06l-.96,5.13h-5.13l5.78-30.81h7.7l5.78,30.81h-5.13l-.96-5.13ZM51.91,286.54l-2.57-13.69-2.57,13.69h5.13Z"/>
              <path d="M68.75,271.13v6.42h8.99v5.13h-8.99v14.12h-5.13v-30.81h15.4v5.13h-10.27Z"/>
              <path d="M88.79,271.13v6.42h8.99v5.13h-8.99v14.12h-5.13v-30.81h15.4v5.13h-10.27Z"/>
              <path d="M115.37,291.67v5.13h-12.84v-30.81h5.13v25.67h7.7Z"/>
              <path d="M132.01,291.67h-7.06l-.96,5.13h-5.13l5.78-30.81h7.7l5.78,30.81h-5.13l-.96-5.13ZM131.05,286.54l-2.57-13.69-2.57,13.69h5.13Z"/>
              <path d="M154.67,271.13h-5.13v25.67h-5.13v-25.67h-5.13v-5.13h15.4v5.13Z"/>
              <path d="M173.56,266v23.11c0,4.25-3.45,7.7-7.7,7.7s-7.7-3.45-7.7-7.7v-23.11h5.13v23.11c0,1.42,1.15,2.57,2.57,2.57s2.57-1.15,2.57-2.57v-23.11h5.13Z"/>
              <path d="M193.61,289.1c0,4.25-3.45,7.7-7.7,7.7s-7.7-3.45-7.7-7.7v-2.57h5.13v2.57c0,1.42,1.15,2.57,2.57,2.57s2.57-1.15,2.57-2.57c0,0,0-.46-.11-.94-.09-.43-.71-2.25-3.91-4.86-6.76-5.51-6.25-8.68-6.25-9.61,0-4.25,3.45-7.7,7.7-7.7s7.7,3.45,7.7,7.7v2.57h-5.13v-2.57c0-1.42-1.15-2.57-2.57-2.57s-2.57,1.15-2.57,2.57c0,0,0,.46.11.94.09.43.71,2.25,3.91,4.86,6.76,5.51,6.25,8.68,6.25,9.61Z"/>
            </g>
          </svg>
        </div>

        <h1 style={{
          color: 'white',
          fontSize: 'clamp(28px, 8vw, 36px)',
          fontWeight: '800',
          marginBottom: '8px',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          whiteSpace: 'nowrap'
        }}>
          メタクリ創造性診断
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.85)',
          fontSize: 'clamp(14px, 4vw, 18px)',
          fontWeight: '600',
          marginBottom: '16px',
          textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
          letterSpacing: '0.5px'
        }}>
          MetaCreativity Assessment
        </p>
      </div>

      {/* 診断の説明セクション（折りたたみ可能） */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        marginBottom: '20px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{
            color: 'white',
            fontSize: '16px',
            marginBottom: '8px',
            fontWeight: '600'
          }}>
            💡 あなたの創造性を8つの軸で可視化します
          </p>
          <p style={{
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '14px',
            marginBottom: '12px'
          }}>
            所要時間：約15分（経験の振り返り 9分 + 直感診断 3分 + 自己評価 3分）
          </p>

          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '13px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            {showDetails ? '▲ 詳細を閉じる' : '▼ 診断について詳しく見る'}
          </button>

          {showDetails && (
            <div style={{
              marginTop: '20px',
              textAlign: 'left',
              fontSize: '14px',
              color: 'white',
              lineHeight: '1.8',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '12px',
                color: 'white'
              }}>
                📊 診断の目的
              </h3>
              <p style={{ marginBottom: '16px', color: 'rgba(255, 255, 255, 0.95)' }}>
                誰もが持つ創造性の自己理解を促進するための診断ツールです。<br/>
                従来の創造性診断が「創造性の有無」や「創造性の高低」を測定するのに対し、メタクリ創造性診断は<strong>「創造性の多様性」と「個人の独自性」</strong>を可視化します。
              </p>

              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '12px',
                color: 'white'
              }}>
                🎯 8つの創造性の軸
              </h3>
              <div style={{
                marginBottom: '16px',
                color: 'rgba(255, 255, 255, 0.95)',
                lineHeight: '1.8'
              }}>
                • 動機（内発 ↔ 目的整合）<br/>
                • 生成（発散 ↔ 収束）<br/>
                • 進行（柔軟 ↔ 粘り）<br/>
                • 価値創出（改善 ↔ 発明）<br/>
                • 表現（自己表現 ↔ 共感価値）<br/>
                • 思考（抽象 ↔ 具体）<br/>
                • 実行（即興 ↔ 設計）<br/>
                • 協働（単独集中 ↔ 協働駆動）
              </div>

              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '12px',
                color: 'white'
              }}>
                📝 診断の流れ
              </h3>
              <ol style={{
                paddingLeft: '20px',
                margin: 0,
                color: 'rgba(255, 255, 255, 0.95)'
              }}>
                <li>これまでの経験の振り返り（9分）</li>
                <li>直感的なキーワード選択（3分）</li>
                <li>自己評価による8軸診断（3分）</li>
              </ol>
            </div>
          )}
        </div>
      </div>

      <div style={{
        width: '100%',
        maxWidth: '800px',
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '40px 30px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        boxSizing: 'border-box'
      }}>
        {/* サブタイトル */}
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          marginBottom: '40px',
          textAlign: 'center',
          fontWeight: '600'
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
              boxSizing: 'border-box',
              backgroundColor: 'white',
              color: '#1f2937'
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
              boxSizing: 'border-box',
              backgroundColor: 'white',
              color: '#1f2937'
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

        {/* 次へボタン */}
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
          次へ →
        </button>
      </div>

      {/* デバッグリンク・管理画面リンク（コンテンツエリア外） */}
      <div style={{
        marginTop: '30px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center'
      }}>
        <a
          href="/admin"
          style={{
            background: 'none',
            border: 'none',
            color: '#9ca3af',
            fontSize: '11px',
            fontWeight: '400',
            cursor: 'pointer',
            textDecoration: 'none',
            padding: '4px',
            opacity: 0.4,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '0.7';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '0.4';
          }}
        >
          管理画面（PC専用）
        </a>
        {onDebugMenu && (
          <button
            onClick={onDebugMenu}
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              fontSize: '11px',
              fontWeight: '400',
              cursor: 'pointer',
              textDecoration: 'none',
              padding: '4px',
              opacity: 0.4,
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '0.7';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.4';
            }}
          >
            デバッグページ
          </button>
        )}
      </div>
    </div>
  );
};

export default BasicInfoInput;
