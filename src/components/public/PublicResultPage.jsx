import { useState, useEffect } from 'react';
import { fetchAfflatusResponseByPublicUuid } from '../../services/supabase';
import { dimensionsData } from '../../data/dimensionsData';
import { dimensionsExplanation } from '../../data/dimensionsExplanation';
import DimensionSlider from '../production/DimensionSlider';
import { sampleReportHtml } from '../../data/sampleReportHtml';
import afflatusLogo from '../../logo_002.svg';

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
        {/* AFFLATUSロゴ */}
        <div style={{ marginBottom: '12px' }}>
          <img
            src={afflatusLogo}
            alt="AFFLATUS"
            style={{
              height: '100px',
              filter: 'brightness(0) invert(1)',
              opacity: 0.9
            }}
          />
        </div>
        <p style={{
          fontSize: '18px',
          fontWeight: '700',
          opacity: 0.95
        }}>
          メタクリ創造性診断
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
          label="📻 メタクリラジオ"
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
          <MetaCreativeRadioTab />
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

// レポートHTMLをサニタイズする関数
const sanitizeReportHtml = (html) => {
  if (!html) return '';

  let sanitized = html;

  // 1. <head>内の<style>タグを抽出して保持
  let extractedStyles = '';
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/gi);
  if (headMatch) {
    const styleMatches = headMatch[0].match(/<style[^>]*>[\s\S]*?<\/style>/gi);
    if (styleMatches) {
      extractedStyles = styleMatches.join('\n');
    }
  }

  // 2. DOCTYPE, html, head, bodyタグを除去
  // <!DOCTYPE ...>を除去
  sanitized = sanitized.replace(/<!DOCTYPE[^>]*>/gi, '');
  // <html ...>と</html>を除去
  sanitized = sanitized.replace(/<\/?html[^>]*>/gi, '');
  // <head>...</head>全体を除去
  sanitized = sanitized.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  // <body ...>と</body>を除去
  sanitized = sanitized.replace(/<\/?body[^>]*>/gi, '');

  // 3. 画像パスを絶対パスに変換
  // src="metakuri.png" → src="/metakuri.png"
  // src="./metakuri.png" → src="/metakuri.png"
  // 既に絶対パス（/で始まる）やURL（http://やhttps://で始まる）の場合は変更しない
  sanitized = sanitized.replace(
    /(<img[^>]*\ssrc=["'])(?!\/|https?:\/\/)([^"']+)(["'][^>]*>)/gi,
    (_match, before, path, after) => {
      // ./や../を除去して絶対パスに
      const cleanPath = path.replace(/^\.\//, '').replace(/^\.\.\//, '');
      return `${before}/${cleanPath}${after}`;
    }
  );

  // 4. 画像サイズを制限するスタイルを追加
  const imageConstraintStyle = `
    <style>
      .report-content img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 1em auto;
      }
    </style>
  `;

  // 5. 抽出したスタイル + 画像制限スタイル + コンテンツを結合
  // コンテンツをreport-contentクラスでラップ
  sanitized = `${extractedStyles}${imageConstraintStyle}<div class="report-content">${sanitized.trim()}</div>`;

  return sanitized;
};

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

  // report_htmlをサニタイズ
  const sanitizedHtml = sanitizeReportHtml(data.report_html);

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
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
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

// メタクリラジオタブ
const MetaCreativeRadioTab = () => {
  return (
    <div style={{ backgroundColor: '#f5f3f0' }}>
      {/* メインカード */}
      <div style={{
        backgroundColor: '#f5f3f0',
        borderRadius: '16px',
        padding: '32px 24px',
        textAlign: 'center'
      }}>
        {/* ロゴ */}
        <img
          src="/metacri-radio-logo.png"
          alt="メタクリエイティブ・レイディオ"
          style={{
            width: '100%',
            maxWidth: '300px',
            height: 'auto',
            marginBottom: '24px',
            borderRadius: '12px'
          }}
        />

        {/* 番組説明 */}
        <div style={{
          textAlign: 'left',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            タムカイ・おぴたんの<br />メタクリエイティブ・レイディオ
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#4b5563',
            lineHeight: '1.8'
          }}>
            通称「メタクリラジオ」
          </p>
          <p style={{
            fontSize: '14px',
            color: '#4b5563',
            lineHeight: '1.8',
            marginTop: '12px'
          }}>
            この番組は、いわゆる「クリエイティブ」を仕事にしてきた、元NAKEDで空間演出が得意なおぴたんこと大屋友紀雄と株式会社AFFLATUS代表/富士通株式会社デザインフェローでラクガキライフコーチのタムカイことタムラカイが、これまでの人生で磨いてきたアンテナと感性とルサンチマンを総動員して、「これからクリエイティブ」についてメタに考え、もがき、遊ぶ、実験ラジオショーです。
          </p>
        </div>

        {/* パーソナリティ */}
        <h3 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '20px'
        }}>
          パーソナリティ
        </h3>

        <div style={{
          display: 'grid',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* タムカイ */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            textAlign: 'left',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <img
              src="/tamkai-profile.png"
              alt="タムラカイ"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0
              }}
            />
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '4px'
              }}>
                タムラカイ（タムカイ）
              </div>
              <div style={{
                fontSize: '13px',
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                @tamkai
              </div>
              <div style={{
                fontSize: '13px',
                color: '#4b5563',
                lineHeight: '1.5'
              }}>
                株式会社AFFLATUS 代表<br />
                富士通株式会社 デザインフェロー
              </div>
            </div>
          </div>

          {/* おぴたん */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            textAlign: 'left',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <img
              src="/opi-profile.png"
              alt="大屋友紀雄"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0
              }}
            />
            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '4px'
              }}>
                大屋友紀雄（おぴたん）
              </div>
              <div style={{
                fontSize: '13px',
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                @opi
              </div>
              <div style={{
                fontSize: '13px',
                color: '#4b5563',
                lineHeight: '1.5'
              }}>
                元NAKED Inc. 創業メンバー<br />
                現在：株式会社FULL 代表
              </div>
            </div>
          </div>
        </div>

        {/* サイトへのリンクボタン */}
        <a
          href="https://metacreativeradio.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '16px 32px',
            backgroundColor: '#f59e0b',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '16px',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
            transition: 'all 0.2s ease'
          }}
        >
          🎙️ メタクリラジオを聴いてみる
        </a>

        {/* 第9話 メタクリドキュメント */}
        <div style={{
          marginTop: '48px',
          textAlign: 'left'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '20px',
            textAlign: 'center',
            paddingBottom: '12px',
            borderBottom: '2px solid #d4cfc7'
          }}>
            📖 第9話 メタクリドキュメント
          </h3>

          {/* メタクリ画像 */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <img
              src="/metakuri.png"
              alt="メタクリ"
              style={{
                width: '200px',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            />
          </div>

          {/* タイトル */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '2em', color: '#c4a57b', margin: '0.5em 0' }}>✦</div>
            <h4 style={{
              fontSize: '1.5em',
              fontWeight: '600',
              color: '#1a1a1a',
              marginBottom: '0.5em',
              lineHeight: '1.3'
            }}>
              信じることの創造性
            </h4>
            <p style={{
              fontSize: '1em',
              color: '#6b6b6b',
              fontWeight: '500'
            }}>
              <strong>オカルト・詐欺・宗教から見る創造の起源</strong>
            </p>
            <div style={{ fontSize: '2em', color: '#c4a57b', margin: '0.5em 0' }}>✦</div>
          </div>

          {/* はじめに */}
          <div style={{ marginBottom: '32px' }}>
            <h4 style={{
              fontSize: '1.2em',
              fontWeight: '600',
              color: '#2d2d2d',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '2px solid #d4cfc7'
            }}>
              はじめに——異端の知的冒険
            </h4>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8', marginBottom: '1.2em' }}>
              オカルト、詐欺、宗教。一見すると、クリエイティブ論とは無縁に思える領域である。しかし、この三つの領域には、人間の「信じる力」と「創造性」の本質が隠されている。
            </p>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8', marginBottom: '1.2em' }}>
              株式会社FULLの大屋友紀雄（Opi）と、株式会社AFFLATUSのタムラカイ（タムカイ）。二人のクリエイターが、この第9回の対話で真正面から向き合ったのは、「創造性の起源」という根源的な問いだった。
            </p>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8', marginBottom: '1.2em' }}>
              それは、リスナーからの一通のお便りから始まった。「創造性ってどこから始まるんだろう。あるいは創造性の起こりみたいな話が聞きたい」。この問いに答えるために、二人が選んだ迂回路が、オカルト・詐欺・宗教という、極めて刺激的な領域だったのである。
            </p>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8', marginBottom: '1.2em' }}>
              本ドキュメントは、この知的冒険の軌跡を辿る。詐欺の手口に隠された創造性、インタビュー技術における「憑依」の哲学、知識が繋がる瞬間の宗教的体験、そして創造性という「宗教」への帰依。これらのテーマを通じて、二人は創造性の本質に迫っていく。
            </p>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8' }}>
              ビジネスパーソンにとって、この対話は極めて実践的な示唆に満ちている。なぜなら、営業と詐欺の境界線、説得力の源泉、知識の体系化、そして何かを信じることの力——これらはすべて、現代の組織とビジネスに直結するテーマだからだ。
            </p>
          </div>

          {/* 目次 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <h4 style={{
              fontSize: '1.1em',
              fontWeight: '600',
              color: '#2d2d2d',
              marginBottom: '16px'
            }}>
              目次
            </h4>
            <ol style={{
              margin: 0,
              paddingLeft: '1.5em',
              color: '#3a3a3a',
              lineHeight: '2'
            }}>
              <li>詐欺の美学——営業から詐欺までの連続性</li>
              <li>憑依する編集者——インタビュー技術の二つの哲学</li>
              <li>繋がる快楽——知識の宗教的体験</li>
              <li>創造性という宗教——三つの神への帰依</li>
              <li style={{ listStyle: 'none' }}>おわりに: フィードバックという救済</li>
            </ol>
          </div>

          {/* 第一章 */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #d4cfc7 0%, #e8e3db 100%)',
                fontSize: '2em',
                color: '#8b6f47'
              }}>
                🎭
              </div>
            </div>

            <h4 style={{
              fontSize: '1.2em',
              fontWeight: '600',
              color: '#2d2d2d',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '2px solid #d4cfc7'
            }}>
              第一章: 詐欺の美学——営業から詐欺までの連続性
            </h4>

            <h5 style={{
              fontSize: '1.1em',
              fontWeight: '600',
              color: '#3a3a3a',
              marginTop: '24px',
              marginBottom: '12px',
              display: 'inline-block',
              background: 'linear-gradient(transparent 60%, #ffd97d 60%)',
              padding: '0 0.3em',
              lineHeight: '1.5'
            }}>
              1.1 オカルトへの横からの視点
            </h5>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8', marginBottom: '1.2em' }}>
              対話は、Opiの率直な宣言から始まった。
            </p>

            {/* 会話 Opi */}
            <div style={{
              borderLeft: '4px solid #8ba882',
              padding: '1.2em 1.5em',
              margin: '1.5em 0',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #f2f7f0 0%, #e5f0e3 100%)',
              fontSize: '0.98em'
            }}>
              <div style={{ fontWeight: '600', color: '#5d7a57', marginBottom: '8px' }}>Opi</div>
              <p style={{ margin: 0, color: '#3a3a3a' }}>「オカルトの話したいですよ。」</p>
            </div>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8', marginBottom: '1.2em' }}>
              この宣言に対するタムカイの応答は、二人の知的姿勢を象徴するものだった。
            </p>

            {/* 会話 タムカイ */}
            <div style={{
              borderLeft: '4px solid #7b9aad',
              padding: '1.2em 1.5em',
              margin: '1.5em 0',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #f0f4f7 0%, #e3ebf0 100%)',
              fontSize: '0.98em'
            }}>
              <div style={{ fontWeight: '600', color: '#5a7485', marginBottom: '8px' }}>タムカイ</div>
              <p style={{ margin: 0, color: '#3a3a3a' }}>「オカルトの話しましょう。大好きですよ、僕も。大好きっていうのは、自分もオカルトの中に入る大好きもあるんですけれど、そのオカルトを横から見ることによって、このオカルトの特徴はこうだなとか、あー向こう側のこれかとかっていうのがすごい好きっていうのも含めて大好きなので、否定もしないんですけど、好きですよ。」</p>
            </div>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8', marginBottom: '1.2em' }}>
              「横から見る」。この姿勢こそが、二人のクリエイティブ論の核心である。オカルトに没入するのでもなく、冷笑的に否定するのでもなく、その構造と機能を分析する。この視点は、後に展開される詐欺と営業の連続性、宗教と資本主義の構造的類似性といったテーマにも一貫して流れている。
            </p>

            {/* 注釈ボックス */}
            <div style={{
              backgroundColor: '#faf9f7',
              border: '1px solid #e8e3db',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#8b6f47',
                marginBottom: '12px'
              }}>
                💡 メタ認知とクリエイティビティ
              </div>
              <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.7', margin: 0 }}>
                「横から見る」という姿勢は、心理学における「メタ認知」の実践である。クリエイティブ職においてメタ認知が重要なのは、対象に没入しながら同時に俯瞰する「二重の視点」が創造的洞察を生むからである。オカルトを信じるのでもなく否定するのでもなく「横から見る」というタムカイの姿勢は、まさにこの二重の視点の実践と言える。
              </p>
            </div>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8', marginBottom: '1.2em' }}>
              Opiは自身の本棚に「陰謀論コーナー」と「詐欺コーナー」があることを明かした。詐欺の構造を調べることへの強い関心。その起源は、詐欺映画への愛だった。
            </p>

            {/* 会話 Opi */}
            <div style={{
              borderLeft: '4px solid #8ba882',
              padding: '1.2em 1.5em',
              margin: '1.5em 0',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #f2f7f0 0%, #e5f0e3 100%)',
              fontSize: '0.98em'
            }}>
              <div style={{ fontWeight: '600', color: '#5d7a57', marginBottom: '8px' }}>Opi</div>
              <p style={{ margin: 0, color: '#3a3a3a' }}>「僕ね、詐欺の映画大好きだっていうことに気づいてしまったんですよ。有名なところ、スティングとか大どんでん返しみたいなのって、詐欺系の映画に多くて、あとはペーパームーンとかもそうだし、日本で言うとコンフィデンスマンJPとかそうなんですけど、詐欺の映画面白いよなって。で、こうなんで詐欺って面白いんだろうみたいなことをその昔考えちゃって、気がついたら詐欺の手口めっちゃ調べてるみたいな。」</p>
            </div>

            <h5 style={{
              fontSize: '1.1em',
              fontWeight: '600',
              color: '#3a3a3a',
              marginTop: '24px',
              marginBottom: '12px',
              display: 'inline-block',
              background: 'linear-gradient(transparent 60%, #ffd97d 60%)',
              padding: '0 0.3em',
              lineHeight: '1.5'
            }}>
              1.2 営業・詐欺・企業研修の理論的背景
            </h5>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8', marginBottom: '1.2em' }}>
              Opiは、詐欺の手口と営業技術、そして企業研修の理論的背景が驚くほど類似していることを指摘した。
            </p>

            {/* 会話 Opi */}
            <div style={{
              borderLeft: '4px solid #8ba882',
              padding: '1.2em 1.5em',
              margin: '1.5em 0',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #f2f7f0 0%, #e5f0e3 100%)',
              fontSize: '0.98em'
            }}>
              <div style={{ fontWeight: '600', color: '#5d7a57', marginBottom: '8px' }}>Opi</div>
              <p style={{ margin: 0, color: '#3a3a3a' }}>「まあこれね、まあまあ分かってる人はみんな分かってるんですけど、営業とかの本もいっぱい出てるじゃないですか。でも、ほぼこう、理論的背景が一緒なんですよね。うんうんうん、なんかいっぱいあるじゃないですか。フットインザドアとかさ。」</p>
            </div>

            {/* 会話 タムカイ */}
            <div style={{
              borderLeft: '4px solid #7b9aad',
              padding: '1.2em 1.5em',
              margin: '1.5em 0',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #f0f4f7 0%, #e3ebf0 100%)',
              fontSize: '0.98em'
            }}>
              <div style={{ fontWeight: '600', color: '#5a7485', marginBottom: '8px' }}>タムカイ</div>
              <p style={{ margin: 0, color: '#3a3a3a' }}>「はいはい、うん。サンクコストであの逃げられなくするとか。」</p>
            </div>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8', marginBottom: '1.2em' }}>
              ここで二人が言及している技術は、社会心理学における「説得技法」の代表例である。しかし重要なのは、これらが営業マニュアル、詐欺の手口、企業研修のカリキュラムに等しく登場するという事実だ。
            </p>

            {/* 注釈ボックス */}
            <div style={{
              backgroundColor: '#faf9f7',
              border: '1px solid #e8e3db',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#8b6f47',
                marginBottom: '12px'
              }}>
                💡 フット・イン・ザ・ドア技法
              </div>
              <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.7', margin: 0 }}>
                フット・イン・ザ・ドア（Foot-in-the-door）技法は、社会心理学者フリードマンとフレイザー（Freedman & Fraser, 1966）が実証した説得技法である。小さな要請を先に承諾させることで、後の大きな要請を承諾しやすくするというもの。営業では「まずは無料サンプルから」「まずは資料請求だけでも」という形で応用される。詐欺では「少額の投資で様子を見てください」という形で悪用される。
              </p>
            </div>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8', marginBottom: '1.2em' }}>
              ここに、二人の核心的な洞察がある。詐欺の手口は、倫理的には許されないが、創造性の観点からは極めて高度である。人間心理の深い理解、状況の分析、戦略の立案、演技力——これらすべてが統合された、一種の「総合芸術」なのだ。
            </p>

            <h5 style={{
              fontSize: '1.1em',
              fontWeight: '600',
              color: '#3a3a3a',
              marginTop: '24px',
              marginBottom: '12px',
              display: 'inline-block',
              background: 'linear-gradient(transparent 60%, #ffd97d 60%)',
              padding: '0 0.3em',
              lineHeight: '1.5'
            }}>
              1.3 節度と美学の境界線
            </h5>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8', marginBottom: '1.2em' }}>
              しかし、営業と詐欺、合法と違法の境界線はどこにあるのか。Opiは、この難問に正面から向き合った。
            </p>

            {/* 会話 Opi */}
            <div style={{
              borderLeft: '4px solid #8ba882',
              padding: '1.2em 1.5em',
              margin: '1.5em 0',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #f2f7f0 0%, #e5f0e3 100%)',
              fontSize: '0.98em'
            }}>
              <div style={{ fontWeight: '600', color: '#5d7a57', marginBottom: '8px' }}>Opi</div>
              <p style={{ margin: 0, color: '#3a3a3a' }}>「で、結構それって、実はこう調べていくと、あの企業研修とかも根っこの理論が一緒だったりとか、まああったりするので。で、そこはね、なんか自分のこうなんだろうな、こう節度として、それって突き詰めると、詐欺と一緒じゃねみたいなところじゃないふうに自分もしなきゃいけないというのもあり。はい、一方ですね。詐欺を調べれば調べるほどやっぱり面白いみたいな。」</p>
            </div>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8', marginBottom: '1.2em' }}>
              「節度」という言葉が登場する。同じ心理学的原理を使いながら、どこで線を引くか。これは倫理の問題であり、プロフェッショナリズムの問題である。
            </p>

            {/* 会話 タムカイ */}
            <div style={{
              borderLeft: '4px solid #7b9aad',
              padding: '1.2em 1.5em',
              margin: '1.5em 0',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #f0f4f7 0%, #e3ebf0 100%)',
              fontSize: '0.98em'
            }}>
              <div style={{ fontWeight: '600', color: '#5a7485', marginBottom: '8px' }}>タムカイ</div>
              <p style={{ margin: 0, color: '#3a3a3a' }}>「我々人前で喋ったりとか、ワークショップもそうですし、セミナーとかってやると、あくまで一例として、これはあって、全てではないですよっていう、さっきの出てきた言葉ですと、節度みたいなものをすごい大事にしているし、その話をしてる背景にさっきみたいな営業から詐欺までは実は一つながりなんだけれどもある瞬間からやばいよねみたいなお金にはなるかもしれないけどこれやったらおしまいだなみたいな美学みたいなものとも引っ付いてるような気がするんですけど。」</p>
            </div>

            <p style={{ fontSize: '15px', color: '#3a3a3a', lineHeight: '1.8' }}>
              「節度」と「美学」。この二つの言葉が、プロフェッショナルとしての境界線を示している。営業から詐欺までは理論的には連続している。しかし、「ある瞬間からやばい」。その境界線を見極める感覚が、プロフェッショナリズムの本質なのである。
            </p>
          </div>

          {/* 最後のメッセージ */}
          <div style={{
            background: 'linear-gradient(135deg, #f0ede8 0%, #e8e3db 100%)',
            borderRadius: '8px',
            padding: '2em',
            margin: '2em 0',
            textAlign: 'center',
            fontWeight: '500',
            color: '#4a4a4a'
          }}>
            <p style={{ margin: 0 }}>
              本ドキュメントでは第一章のみを抜粋しています。<br />
              全編はメタクリラジオ第9話でお聴きいただけます。
            </p>
          </div>

          {/* ドキュメント情報 */}
          <div style={{
            textAlign: 'center',
            marginTop: '2em',
            color: '#8b8b8b',
            fontSize: '0.9em'
          }}>
            <p>メタクリエイティブ・レイディオ 第9話「創造性の狂信者」より</p>
          </div>
        </div>
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
            <div key={dim.id} style={{ marginBottom: '24px' }}>
              {/* 1軸の全情報を白いエリアに統合 */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}>
                {/* 軸名（グレー帯 - 少し明るめ） */}
                <div style={{
                  backgroundColor: '#4b5563',
                  padding: '12px 20px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: 'white'
                  }}>
                    {dim.dimension}
                  </div>
                </div>

                {/* コンテンツエリア（パディング付き） */}
                <div style={{ padding: '16px 20px' }}>
                  {/* あなたの結果（スマホでは2行に） */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '8px 24px',
                    fontSize: '16px',
                    marginBottom: '8px'
                  }}>
                    <span style={{ color: '#64748b', whiteSpace: 'nowrap' }}>
                      直感判断: <strong>{type1Pole?.name}</strong>
                    </span>
                    <span style={{ color: '#78716c', whiteSpace: 'nowrap' }}>
                      自己認識: <strong>{type2Pole?.name}</strong>
                    </span>
                  </div>

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

                  {/* 解説を開くボタン（スライダーの下） */}
                  <button
                    onClick={() => toggleDimension(dim.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      margin: '16px auto 0',
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
                </div>
              </div>

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
