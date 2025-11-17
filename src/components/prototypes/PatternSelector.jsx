import './PatternSelector.css';

const PatternSelector = ({ onSelectPattern }) => {
  const patterns = [
    {
      id: 'pattern1',
      name: '案1: シンプルYES/NO',
      description: '質問に対してYES/NOで回答。スワイプまたはボタンで選択',
      preview: '✓',
      category: 'UIパターン'
    },
    {
      id: 'pattern2',
      name: '案2: エンカレッジメント',
      description: '案1 + 回答時にテンションが上がるメッセージ表示',
      preview: '✨',
      category: 'UIパターン'
    },
    {
      id: 'pattern3',
      name: '案3: 視覚フィードバック',
      description: '案1 + YES/NO/SKIP表示 + カード枠線で回答を強調',
      preview: '💫',
      category: 'UIパターン'
    },
    {
      id: 'assessmentA',
      name: '案A: YES/NO/BOTH',
      description: 'アセスメント用。YES/NO/両方当てはまる の3択',
      preview: '🔍',
      category: 'アセスメント'
    },
    {
      id: 'assessmentB',
      name: '案B: コンテキスト表記',
      description: 'アセスメント用。質問ごとの選択肢ラベルを表示',
      preview: '📊',
      category: 'アセスメント'
    },
    {
      id: 'assessmentC',
      name: '案C: 行動ベース',
      description: '具体的な行動・シーンで聞く（16問）',
      preview: '🎬',
      category: 'アセスメント'
    },
    {
      id: 'assessmentD',
      name: '案D: 両極比較+反転項目',
      description: '「AよりもB」形式 + 整合性チェック（32問）',
      preview: '⚖️',
      category: 'アセスメント'
    },
    {
      id: 'keywordSwipe',
      name: '案F: キーワードスワイプ ⭐',
      description: '32個のキーワードに直感的に反応（原点回帰版）',
      preview: '✨',
      category: 'アセスメント'
    },
    {
      id: 'debugResults',
      name: '🔧 結果画面に飛ぶ（デバッグ用）',
      description: 'ダミーデータで結果画面を表示',
      preview: '🔍',
      category: 'デバッグ'
    },
    {
      id: 'sliderTest',
      name: '🎚️ スライダーUIテスト',
      description: '円形スライダーの見た目と操作感を確認',
      preview: '⚙️',
      category: 'デバッグ'
    },
    {
      id: 'resultsTest',
      name: '📊 結果画面テスト',
      description: 'Creative Compass結果画面のモックアップ',
      preview: '🧭',
      category: 'デバッグ'
    },
    {
      id: 'admin',
      name: '🔧 管理画面',
      description: '診断結果の閲覧・メモ編集・CSVエクスポート',
      preview: '⚙️',
      category: 'デバッグ'
    },
    {
      id: 'integratedDiagnosis',
      name: 'メタクリ創造性診断 ⭐NEW',
      description: 'タイプ1（直感判断）→ タイプ2（自己認識）の統合診断',
      preview: 'logo',
      category: '診断'
    },
    {
      id: 'type2Diagnosis',
      name: '🧠 タイプ2診断（自己認識）',
      description: '8軸を1つずつ説明を読みながら自己評価',
      preview: '🎚️',
      category: '診断'
    },
    {
      id: 'purposeCarving',
      name: '📝 Purpose Carving ⭐NEW',
      description: '人生振り返り→価値観選択→完了画面',
      preview: '✨',
      category: 'Purpose Carving'
    }
  ];

  const uiPatterns = patterns.filter(p => p.category === 'UIパターン');
  const assessmentPatterns = patterns.filter(p => p.category === 'アセスメント');
  const debugPatterns = patterns.filter(p => p.category === 'デバッグ');
  const purposeCarvingPatterns = patterns.filter(p => p.category === 'Purpose Carving');
  const diagnosisPatterns = patterns.filter(p => p.category === '診断');

  return (
    <div className="pattern-selector">
      {/* 戻るボタン */}
      <button
        onClick={() => window.location.href = '/'}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'white';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          e.target.style.transform = 'scale(1)';
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>

      <div className="pattern-header">
        <h1>スワイプUIテスト</h1>
        <p>パターンを選択してください</p>
      </div>

      {/* 診断パターン */}
      {diagnosisPatterns.length > 0 && (
        <div className="pattern-section">
          <h2 style={{ color: 'white', fontSize: '20px', marginBottom: '16px' }}>創造性診断</h2>
          <div className="pattern-grid">
            {diagnosisPatterns.map((pattern) => (
              <button
                key={pattern.id}
                className="pattern-card"
                onClick={() => onSelectPattern(pattern.id)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderColor: 'rgba(102, 126, 234, 0.6)',
                  borderWidth: '2px',
                  color: '#1f2937'
                }}
              >
                <div className="pattern-preview" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {pattern.preview === 'logo' ? (
                    <svg width="60" height="auto" viewBox="0 0 230.68 313.8" fill="#000000">
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
                  ) : (
                    pattern.preview
                  )}
                </div>
                <h3>{pattern.name}</h3>
                <p>{pattern.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Purpose Carving */}
      {purposeCarvingPatterns.length > 0 && (
        <div className="pattern-section">
          <h2 style={{ color: 'white', fontSize: '20px', marginBottom: '16px', marginTop: '32px' }}>Purpose Carving（試作）</h2>
          <div className="pattern-grid">
            {purposeCarvingPatterns.map((pattern) => (
              <button
                key={pattern.id}
                className="pattern-card"
                onClick={() => onSelectPattern(pattern.id)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderColor: 'rgba(251, 191, 36, 0.6)',
                  borderWidth: '2px',
                  color: '#1f2937'
                }}
              >
                <div className="pattern-preview">{pattern.preview}</div>
                <h3>{pattern.name}</h3>
                <p>{pattern.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* アセスメントパターン */}
      <div className="pattern-section">
        <h2 style={{ color: 'white', fontSize: '20px', marginBottom: '16px', marginTop: '32px' }}>アセスメント版</h2>
        <div className="pattern-grid">
          {assessmentPatterns.map((pattern) => (
            <button
              key={pattern.id}
              className="pattern-card"
              onClick={() => onSelectPattern(pattern.id)}
            >
              <div className="pattern-preview">{pattern.preview}</div>
              <h3>{pattern.name}</h3>
              <p>{pattern.description}</p>
            </button>
          ))}
        </div>

        {/* デバッグボタン */}
        {debugPatterns.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            {debugPatterns.map((pattern) => (
              <button
                key={pattern.id}
                className="pattern-card"
                onClick={() => onSelectPattern(pattern.id)}
                style={{
                  backgroundColor: 'rgba(255, 193, 7, 0.1)',
                  borderColor: 'rgba(255, 193, 7, 0.3)'
                }}
              >
                <div className="pattern-preview">{pattern.preview}</div>
                <h3>{pattern.name}</h3>
                <p>{pattern.description}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* UIパターン */}
      <div className="pattern-section">
        <h2 style={{ color: 'white', fontSize: '20px', marginBottom: '16px', marginTop: '32px' }}>UIパターン（アーカイブ）</h2>
        <div className="pattern-grid">
          {uiPatterns.map((pattern) => (
            <button
              key={pattern.id}
              className="pattern-card"
              onClick={() => onSelectPattern(pattern.id)}
            >
              <div className="pattern-preview">{pattern.preview}</div>
              <h3>{pattern.name}</h3>
              <p>{pattern.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatternSelector;
