import { useState, useEffect } from 'react';
import { fetchAfflatusResponseByPublicUuid } from '../../services/supabase';
import { dimensionsData } from '../../data/dimensionsData';
import { dimensionsExplanation, explanationMeta } from '../../data/dimensionsExplanation';
import DimensionSlider from '../production/DimensionSlider';
import { sampleReportHtml } from '../../data/sampleReportHtml';

// タブの種類
const TABS = {
  REPORT: 'report',
  EXPLANATION: 'explanation',
  RESPONSES: 'responses'
};

// プレビュー用ダミーデータ（永春里望さん）
const previewData = {
  id: 0,
  name: '永春里望',
  title: '組織開発コンサルタント',
  creative_experience: 0.65,
  // 永春里望さんの診断結果（サンプル）
  type1_motivation: 0.25,  // 目的整合寄り
  type1_generation: 0.45,  // やや収束寄り
  type1_progress: 0.5,     // 中央
  type1_value: 0.3,        // 改善寄り
  type1_expression: 0.6,   // やや共感価値寄り
  type1_thinking: 0.4,     // やや具体寄り
  type1_execution: 0.55,   // やや即興寄り
  type1_collaboration: 0.75, // 協働駆動寄り
  type2_motivation: 0.68,  // 内発寄り
  type2_generation: 0.62,  // やや発散寄り
  type2_progress: 0.51,    // ほぼ中央
  type2_value: 0.35,       // 改善寄り
  type2_expression: 0.55,  // やや共感価値寄り
  type2_thinking: 0.38,    // 具体寄り
  type2_execution: 0.52,   // ほぼ中央
  type2_collaboration: 0.78, // 協働駆動寄り
  report_published_at: new Date().toISOString(),
  report_html: sampleReportHtml,
  report_pdf_url: null,
  life_reflection: {
    age_0_10: ['市民プールに毎日通う', 'レゴブロックで緻密なものを作る', '教育テレビの工作番組を見よう見まね', '塾でいろんな人が集まるコミュニティが好きだった'],
    age_11_20: ['部活動でひたすら毎日練習', '人間関係の壁にぶつかる', '皆でチームを創っていくことが楽しかった', '苦手だった数学が得意になった'],
    age_21_now: ['3社目に一から学び直そうと入社', '2社目で理不尽を一番味わった時期', '尊敬する上司との出会い', '毎日仕事が楽しい'],
    career_reason: '採用だけでは変わらない課題に気づき、組織の中で起きていることにもっと踏み込みたいと思ったから。人と人がつながり、お互いの強みを引き出し合うことで、何かが生まれる瞬間に立ち会いたい。'
  },
  personal_values: {
    value1: 'やさしさ',
    value2: '関係性',
    value3: '信頼'
  },
  personal_purpose: {
    purpose: 'チームを創り、人と人をつなぎ、より良い組織をつくっていく'
  }
};

const PublicResultPage = ({ uuid, previewMode = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(TABS.REPORT);
  const [expandedDimension, setExpandedDimension] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      // プレビューモードの場合はダミーデータを使用
      if (previewMode) {
        setData(previewData);
        setLoading(false);
        return;
      }

      if (!uuid) {
        setError('UUIDが指定されていません');
        setLoading(false);
        return;
      }

      try {
        const result = await fetchAfflatusResponseByPublicUuid(uuid);
        if (result) {
          setData(result);
        } else {
          setError('結果が見つかりません');
        }
      } catch (err) {
        console.error('データ取得エラー:', err);
        setError('データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [uuid, previewMode]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <p style={{ fontSize: '18px' }}>読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white',
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>😢</div>
          <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>ページが見つかりません</h2>
          <p style={{ fontSize: '16px', opacity: 0.9 }}>{error}</p>
        </div>
      </div>
    );
  }

  // レポートが公開されていない場合
  if (!data.report_published_at) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white',
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
          <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>レポート準備中</h2>
          <p style={{ fontSize: '16px', opacity: 0.9 }}>
            レポートは現在準備中です。<br />
            もうしばらくお待ちください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5'
    }}>
      {/* ヘッダー */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '24px 20px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          marginBottom: '8px'
        }}>
          {data.name}さんの創造性診断結果
        </h1>
        <p style={{
          fontSize: '14px',
          opacity: 0.9
        }}>
          メタクリ創造性診断 / AFFLATUS
        </p>
      </header>

      {/* タブナビゲーション（レポート → あなたの回答 → 診断の解説） */}
      <nav style={{
        display: 'flex',
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <TabButton
          active={activeTab === TABS.REPORT}
          onClick={() => setActiveTab(TABS.REPORT)}
          label="📄 レポート"
        />
        <TabButton
          active={activeTab === TABS.RESPONSES}
          onClick={() => setActiveTab(TABS.RESPONSES)}
          label="📝 あなたの回答"
        />
        <TabButton
          active={activeTab === TABS.EXPLANATION}
          onClick={() => setActiveTab(TABS.EXPLANATION)}
          label="📖 診断の解説"
        />
      </nav>

      {/* タブコンテンツ */}
      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {activeTab === TABS.REPORT && (
          <ReportTab data={data} />
        )}
        {activeTab === TABS.EXPLANATION && (
          <ExplanationTab
            data={data}
            expandedDimension={expandedDimension}
            setExpandedDimension={setExpandedDimension}
          />
        )}
        {activeTab === TABS.RESPONSES && (
          <ResponsesTab data={data} />
        )}
      </main>

      {/* フッター */}
      <footer style={{
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '24px 20px',
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <a
          href="https://metacreativeradio.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#f59e0b',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '14px',
            marginBottom: '16px'
          }}
        >
          🎙️ メタクリラジオを聴いてみる
        </a>
        <p style={{
          fontSize: '12px',
          color: '#9ca3af',
          marginTop: '12px'
        }}>
          メタクリ創造性診断 / AFFLATUS
        </p>
      </footer>
    </div>
  );
};

// タブボタンコンポーネント
const TabButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    style={{
      flex: 1,
      padding: '14px 8px',
      fontSize: '14px',
      fontWeight: active ? '700' : '500',
      color: active ? '#667eea' : '#6b7280',
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: active ? '3px solid #667eea' : '3px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }}
  >
    {label}
  </button>
);

// レポートタブ
const ReportTab = ({ data }) => {
  if (!data.report_html) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: '#6b7280'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
        <p>レポートは準備中です</p>
      </div>
    );
  }

  return (
    <div>
      {/* HTMLレポート表示 */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}
        dangerouslySetInnerHTML={{ __html: data.report_html }}
      />

      {/* PDFダウンロードボタン（レポート下部） */}
      {data.report_pdf_url && (
        <div style={{
          marginTop: '32px',
          textAlign: 'center'
        }}>
          <a
            href={data.report_pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              backgroundColor: '#374151',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            📥 PDFをダウンロード
          </a>
        </div>
      )}
    </div>
  );
};

// 解説タブ
const ExplanationTab = ({ data, expandedDimension, setExpandedDimension }) => {
  return (
    <div>
      {/* イントロダクション */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '16px'
        }}>
          {explanationMeta.title}
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#4b5563',
          lineHeight: '1.8',
          whiteSpace: 'pre-line'
        }}>
          {explanationMeta.introduction}
        </p>
      </div>

      {/* 8軸の解説リスト */}
      {dimensionsExplanation.map((dim) => {
        const isExpanded = expandedDimension === dim.id;
        const type1Value = data[`type1_${dim.id}`] ?? 0.5;
        const type2Value = data[`type2_${dim.id}`] ?? 0.5;

        // どちらの極に寄っているか判定
        const type1Pole = type1Value < 0.5 ? dim.poles.a : dim.poles.b;
        const type2Pole = type2Value < 0.5 ? dim.poles.a : dim.poles.b;

        return (
          <div
            key={dim.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              marginBottom: '16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden'
            }}
          >
            {/* ヘッダー（クリックで展開） */}
            <button
              onClick={() => setExpandedDimension(isExpanded ? null : dim.id)}
              style={{
                width: '100%',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1f2937',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>{dim.emoji}</span>
                  {dim.dimension}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  marginTop: '4px'
                }}>
                  {dim.poles.a.name} ↔ {dim.poles.b.name}
                </p>
              </div>
              <span style={{
                fontSize: '20px',
                color: '#9ca3af',
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}>
                ▼
              </span>
            </button>

            {/* あなたの結果（常に表示） */}
            <div style={{
              padding: '0 24px 20px',
              borderTop: '1px solid #f3f4f6'
            }}>
              <p style={{
                fontSize: '12px',
                color: '#9ca3af',
                marginBottom: '8px',
                paddingTop: '12px'
              }}>
                あなたの結果
              </p>
              <div style={{
                display: 'flex',
                gap: '16px',
                fontSize: '14px'
              }}>
                <span style={{ color: '#3b82f6' }}>
                  直感判断: <strong>{type1Pole.name}</strong>
                </span>
                <span style={{ color: '#10b981' }}>
                  自己認識: <strong>{type2Pole.name}</strong>
                </span>
              </div>
            </div>

            {/* 展開コンテンツ */}
            {isExpanded && (
              <div style={{
                padding: '0 24px 24px',
                borderTop: '1px solid #f3f4f6'
              }}>
                {/* 概要 */}
                <div style={{ marginTop: '20px' }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    lineHeight: '1.8',
                    whiteSpace: 'pre-line'
                  }}>
                    {dim.overview}
                  </p>
                </div>

                {/* 両極の解説 */}
                <div style={{
                  display: 'grid',
                  gap: '20px',
                  marginTop: '24px'
                }}>
                  <PoleCard pole={dim.poles.a} type="a" />
                  <PoleCard pole={dim.poles.b} type="b" />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* フッター */}
      <div style={{
        backgroundColor: '#f9fafb',
        borderRadius: '16px',
        padding: '20px',
        marginTop: '24px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '13px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          {explanationMeta.footer}
        </p>
      </div>
    </div>
  );
};

// 極の解説カード
const PoleCard = ({ pole, type }) => {
  const [showDetails, setShowDetails] = useState(false);
  const bgColor = type === 'a' ? '#eff6ff' : '#fef2f2';
  const borderColor = type === 'a' ? '#bfdbfe' : '#fecaca';
  const textColor = type === 'a' ? '#1e40af' : '#b91c1c';

  return (
    <div style={{
      backgroundColor: bgColor,
      borderRadius: '12px',
      padding: '20px',
      border: `1px solid ${borderColor}`
    }}>
      <h4 style={{
        fontSize: '16px',
        fontWeight: '700',
        color: textColor,
        marginBottom: '8px'
      }}>
        {pole.name}
      </h4>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        marginBottom: '12px'
      }}>
        {pole.keywords.map((keyword, idx) => (
          <span
            key={idx}
            style={{
              fontSize: '12px',
              color: textColor,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              padding: '4px 10px',
              borderRadius: '20px'
            }}
          >
            {keyword}
          </span>
        ))}
      </div>

      <p style={{
        fontSize: '14px',
        color: '#374151',
        lineHeight: '1.7',
        whiteSpace: 'pre-line'
      }}>
        {pole.description}
      </p>

      <button
        onClick={() => setShowDetails(!showDetails)}
        style={{
          marginTop: '12px',
          fontSize: '13px',
          color: textColor,
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        {showDetails ? '詳細を閉じる ▲' : '強み・課題・ヒントを見る ▼'}
      </button>

      {showDetails && (
        <div style={{ marginTop: '16px' }}>
          <DetailSection title="💪 強み" items={pole.strengths} />
          <DetailSection title="⚠️ 課題になりやすいこと" items={pole.challenges} />
          <DetailSection title="💡 ヒント" items={pole.tips} />
        </div>
      )}
    </div>
  );
};

// 詳細セクション
const DetailSection = ({ title, items }) => (
  <div style={{ marginTop: '12px' }}>
    <h5 style={{
      fontSize: '13px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '6px'
    }}>
      {title}
    </h5>
    <ul style={{
      margin: 0,
      paddingLeft: '20px',
      fontSize: '13px',
      color: '#4b5563',
      lineHeight: '1.6'
    }}>
      {items.map((item, idx) => (
        <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
      ))}
    </ul>
  </div>
);

// 回答タブ（軸の解説を統合）
const ResponsesTab = ({ data }) => {
  const [expandedDimensions, setExpandedDimensions] = useState({});

  const toggleDimension = (dimId) => {
    setExpandedDimensions(prev => ({
      ...prev,
      [dimId]: !prev[dimId]
    }));
  };

  return (
    <div>
      {/* 基本情報 */}
      <Section title="👤 基本情報">
        <InfoRow label="お名前" value={data.name} />
        <InfoRow label="肩書き" value={data.title} />
        <InfoRow
          label="創造体験レベル"
          value={`${Math.round((data.creative_experience ?? 0.5) * 100)}%`}
        />
      </Section>

      {/* 価値観 */}
      {data.personal_values && (
        <Section title="💎 大切にしている価値観">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {[data.personal_values.value1, data.personal_values.value2, data.personal_values.value3]
              .filter(v => v)
              .map((value, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: '#f3f4f6',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    color: '#374151'
                  }}
                >
                  {value}
                </span>
              ))}
          </div>
        </Section>
      )}

      {/* 創造性プロファイル（軸の解説統合） */}
      <Section title="🎨 創造性プロファイル">
        <p style={{
          fontSize: '13px',
          color: '#6b7280',
          marginBottom: '16px'
        }}>
          8つの軸でのあなたの診断結果です。各軸をタップすると詳しい解説が見られます。
        </p>
        {dimensionsData.map((dim) => {
          const type1Value = data[`type1_${dim.id}`] ?? 0.5;
          const type2Value = data[`type2_${dim.id}`] ?? 0.5;
          const isExpanded = expandedDimensions[dim.id];

          // 解説データを取得
          const explanation = dimensionsExplanation.find(e => e.id === dim.id);
          const type1Pole = explanation && type1Value < 0.5 ? explanation.poles.a : explanation?.poles.b;
          const type2Pole = explanation && type2Value < 0.5 ? explanation.poles.a : explanation?.poles.b;

          return (
            <div key={dim.id} style={{ marginBottom: '32px' }}>
              {/* 軸名（外部で表示） */}
              <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                {dim.dimension}
              </div>

              {/* あなたの結果（軸名のすぐ下） */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                <span style={{ color: '#7c3aed' }}>
                  直感判断: <strong>{type1Pole?.name}</strong>
                </span>
                <span style={{ color: '#10b981' }}>
                  自己認識: <strong>{type2Pole?.name}</strong>
                </span>
              </div>

              {/* 解説を開くボタン（あなたの結果のすぐ下） */}
              <button
                onClick={() => toggleDimension(dim.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  margin: '0 auto 12px',
                  padding: '8px 16px',
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>
                  {isExpanded ? '解説を閉じる' : 'この軸について詳しく見る'}
                </span>
                <span style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  fontSize: '10px'
                }}>
                  ▼
                </span>
              </button>

              {/* スライダー（軸名非表示、キーワード非表示） */}
              <DimensionSlider
                dimension={dim.dimension}
                pole_a={dim.pole_a}
                keywords_a={dim.keywords_a}
                pole_b={dim.pole_b}
                keywords_b={dim.keywords_b}
                value={type1Value}
                value2={type2Value}
                readOnly={true}
                showDescription={false}
                hideKeywords={true}
                hideDimensionTitle={true}
              />

              {/* 開閉式の解説エリア */}
              {isExpanded && explanation && (
                <div style={{
                  marginTop: '16px',
                  padding: '20px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  {/* 概要 */}
                  <p style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    lineHeight: '1.8',
                    marginBottom: '16px',
                    whiteSpace: 'pre-line'
                  }}>
                    {explanation.overview}
                  </p>

                  {/* 両極の解説 */}
                  <div style={{
                    display: 'grid',
                    gap: '16px'
                  }}>
                    <PoleCard pole={explanation.poles.a} type="a" />
                    <PoleCard pole={explanation.poles.b} type="b" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Section>

      {/* Life Reflection */}
      {data.life_reflection && (
        <Section title="🌳 Life Reflection（人生の振り返り）">
          {/* 0〜10歳 */}
          <LifeReflectionAge
            label="0〜10歳"
            items={getLifeReflectionItems(data.life_reflection, 'age_0_10')}
          />
          {/* 11〜20歳 */}
          <LifeReflectionAge
            label="11〜20歳"
            items={getLifeReflectionItems(data.life_reflection, 'age_11_20')}
          />
          {/* 21歳〜現在 */}
          <LifeReflectionAge
            label="21歳〜現在"
            items={getLifeReflectionItems(data.life_reflection, 'age_21_now')}
          />
          {/* キャリア理由 */}
          {data.life_reflection.career_reason && (
            <div style={{ marginTop: '20px' }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                現在のキャリアを選んだ理由
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#4b5563',
                backgroundColor: '#f9fafb',
                padding: '12px 16px',
                borderRadius: '8px',
                lineHeight: '1.6'
              }}>
                {data.life_reflection.career_reason}
              </p>
            </div>
          )}
        </Section>
      )}
    </div>
  );
};

// Life Reflectionのアイテムを取得
const getLifeReflectionItems = (lr, prefix) => {
  if (Array.isArray(lr[prefix])) {
    return lr[prefix].filter(item => item && item.trim());
  }
  // オブジェクト形式の場合
  const items = [];
  for (let i = 1; i <= 5; i++) {
    const item = lr[`${prefix}_item${i}`];
    if (item && item.trim()) {
      items.push(item);
    }
  }
  return items;
};

// Life Reflectionの年代セクション
const LifeReflectionAge = ({ label, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ marginTop: '16px' }}>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '8px'
      }}>
        {label}
      </h4>
      <ul style={{
        margin: 0,
        paddingLeft: '20px',
        fontSize: '14px',
        color: '#4b5563',
        lineHeight: '1.6'
      }}>
        {items.map((item, idx) => (
          <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

// セクションコンポーネント
const Section = ({ title, children }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  }}>
    <h3 style={{
      fontSize: '18px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '16px'
    }}>
      {title}
    </h3>
    {children}
  </div>
);

// 情報行コンポーネント
const InfoRow = ({ label, value }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6'
  }}>
    <span style={{ fontSize: '14px', color: '#6b7280' }}>{label}</span>
    <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
      {value || '-'}
    </span>
  </div>
);

export default PublicResultPage;
