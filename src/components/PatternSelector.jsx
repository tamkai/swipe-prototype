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
    }
  ];

  const uiPatterns = patterns.filter(p => p.category === 'UIパターン');
  const assessmentPatterns = patterns.filter(p => p.category === 'アセスメント');
  const debugPatterns = patterns.filter(p => p.category === 'デバッグ');

  return (
    <div className="pattern-selector">
      <div className="pattern-header">
        <h1>スワイプUIテスト</h1>
        <p>パターンを選択してください</p>
      </div>

      {/* アセスメントパターン */}
      <div className="pattern-section">
        <h2 style={{ color: 'white', fontSize: '20px', marginBottom: '16px' }}>アセスメント版</h2>
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
