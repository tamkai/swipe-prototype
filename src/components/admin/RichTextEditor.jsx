import { useState, useRef, useEffect } from 'react';

const RichTextEditor = ({ value, onChange, placeholder = 'メモを入力...' }) => {
  const editorRef = useRef(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  // 初期値の設定
  useEffect(() => {
    if (editorRef.current && value && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // テキストフォーマット
  const format = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    handleChange();
  };

  // リンク挿入
  const insertLink = () => {
    if (linkUrl && linkText) {
      const link = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
      document.execCommand('insertHTML', false, link);
      setShowLinkDialog(false);
      setLinkUrl('');
      setLinkText('');
      editorRef.current.focus();
      handleChange();
    }
  };

  // 変更ハンドラー
  const handleChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div style={{
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      backgroundColor: 'white',
      overflow: 'hidden'
    }}>
      {/* ツールバー */}
      <div style={{
        display: 'flex',
        gap: '5px',
        padding: '10px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
        flexWrap: 'wrap'
      }}>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            format('bold');
          }}
          style={{
            padding: '6px 12px',
            fontSize: '14px',
            fontWeight: '700',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.15s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          title="太字"
        >
          <strong>B</strong>
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            format('italic');
          }}
          style={{
            padding: '6px 12px',
            fontSize: '14px',
            fontStyle: 'italic',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.15s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          title="斜体"
        >
          I
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            format('underline');
          }}
          style={{
            padding: '6px 12px',
            fontSize: '14px',
            textDecoration: 'underline',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.15s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          title="下線"
        >
          U
        </button>

        <div style={{
          width: '1px',
          height: '28px',
          backgroundColor: '#e5e7eb',
          margin: '0 5px'
        }} />

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            format('insertUnorderedList');
          }}
          style={{
            padding: '6px 12px',
            fontSize: '14px',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.15s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          title="箇条書き"
        >
          • リスト
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            setShowLinkDialog(true);
          }}
          style={{
            padding: '6px 12px',
            fontSize: '14px',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.15s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          title="リンク挿入"
        >
          🔗 リンク
        </button>

        <div style={{
          width: '1px',
          height: '28px',
          backgroundColor: '#e5e7eb',
          margin: '0 5px'
        }} />

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            format('removeFormat');
          }}
          style={{
            padding: '6px 12px',
            fontSize: '14px',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.15s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          title="書式をクリア"
        >
          ✕ クリア
        </button>
      </div>

      {/* エディタ本体 */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleChange}
        onBlur={handleChange}
        style={{
          minHeight: '200px',
          maxHeight: '400px',
          padding: '15px',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#1f2937',
          overflowY: 'auto',
          outline: 'none'
        }}
        data-placeholder={placeholder}
      />

      {/* リンク挿入ダイアログ */}
      {showLinkDialog && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          minWidth: '400px'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '15px',
            margin: 0
          }}>
            リンクを挿入
          </h4>

          <div style={{ marginTop: '15px', marginBottom: '12px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#4b5563',
              marginBottom: '6px'
            }}>
              リンクテキスト
            </label>
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="例: 参考資料"
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '14px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}
              autoFocus
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#4b5563',
              marginBottom: '6px'
            }}>
              URL
            </label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '14px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={() => {
                setShowLinkDialog(false);
                setLinkUrl('');
                setLinkText('');
              }}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '600',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              キャンセル
            </button>
            <button
              onClick={insertLink}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '600',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              挿入
            </button>
          </div>
        </div>
      )}

      {/* リンクダイアログのオーバーレイ */}
      {showLinkDialog && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 999
          }}
          onClick={() => {
            setShowLinkDialog(false);
            setLinkUrl('');
            setLinkText('');
          }}
        />
      )}

      <style>{`
        [contentEditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }

        [contentEditable] a {
          color: #3b82f6;
          text-decoration: underline;
        }

        [contentEditable] ul {
          padding-left: 20px;
          margin: 10px 0;
        }

        [contentEditable] li {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
