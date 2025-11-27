# メタクリ創造性診断 - 包括的ドキュメント

## 1. プロジェクトの思想とコンセプト

### 1.1 核となる思想

**「創造性の多様性」と「個人の独自性」を可視化する**

このプロジェクトは、創造性を単一の能力や優劣として測定するのではなく、**多様な側面を持つバランスとして捉える**という思想に基づいています。

#### 理論的基盤

**システム1とシステム2の二重プロセス理論**（ダニエル・カーネマン『ファスト&スロー』）
- **システム1（直感判断）**: 瞬時の無意識的判断
- **システム2（熟考判断）**: 意識的な自己評価

この二つの認知プロセスの**一致とギャップ**が、個人の創造性における「無意識のパターン」と「自己認識」の関係を明らかにします。

### 1.2 創造性の8次元モデル

メタクリ創造性診断は、創造性を以下の8つの軸（次元）で測定します。各軸は**対立する概念ではなく、両極が等しく価値のある特性**として設計されています。

| 次元 | 極A（左側/0.0） | 極B（右側/1.0） | 意味 |
|------|----------------|-----------------|------|
| 1. 動機 | 目的整合 | 内発 | 物事を始める動機が外的目標か内的情熱か |
| 2. 生成 | 収束 | 発散 | アイデア生成時に絞り込むか広げるか |
| 3. 進行 | 粘り | 柔軟 | プロセスで一つに集中するか切り替えるか |
| 4. 価値創出 | 改善 | 発明 | 既存を改良するか新しく創造するか |
| 5. 表現 | 共感価値 | 自己表現 | 他者視点か自己表現重視か |
| 6. 思考レベル | 具体 | 抽象 | 具体的思考か抽象的概念化か |
| 7. 実行 | 設計 | 即興 | 計画的実行か即興的行動か |
| 8. 協働 | 協働駆動 | 単独集中 | チーム協働か単独集中か |

**重要な設計原則**:
- **数値の大小に優劣はない**: 0.0も1.0も同等に価値がある
- **バランスが個性**: 8軸の組み合わせが「あなたらしい創造性のかたち」を表す
- **文脈依存性**: 同じ人でも状況（仕事/学習/創作/日常）で異なるバランスを示す可能性がある

### 1.3 診断の二重構造

#### タイプ1診断（直感判断）
- **形式**: キーワードスワイプUI
- **操作**: 2つのキーワードを見て、瞬時に直感でどちらかを選択
- **測定対象**: **無意識の創造性パターン**（システム1）
- **問題数**: 32問（8軸×4問ずつ）
- **特徴**:
  - 高速な判断を要求（考える時間を与えない）
  - スワイプUIによる直感的操作
  - 反応時間の記録（将来的な分析用）

#### タイプ2診断（自己評価）
- **形式**: 8軸スライダーUI
- **操作**: 各軸の両極を理解し、自分がどちらに近いか熟考して評価
- **測定対象**: **自己認識としての創造性**（システム2）
- **問題数**: 8問（8軸×1問ずつ）
- **特徴**:
  - 詳細な説明文で両極の意味を提示
  - スライダー操作による連続値の入力
  - 熟考を促す設計（スライダーを動かさないと次へ進めない）

#### メタ認知のギャップ分析

**タイプ1×タイプ2の差分**が最も重要な診断結果です。

- **一致（ギャップ小）**: 自己認識と無意識のパターンが一致している軸
- **不一致（ギャップ大）**: 自分が思っている姿と実際の行動パターンにズレがある軸

このギャップこそが、**メタ認知の深掘りポイント**であり、個別レポートで掘り下げる対象となります。

### 1.4 Life Reflection（人生振り返り）

診断の前段階として、**パーパス発掘のための人生振り返り**を実施します。

#### 目的
- 個人の価値観・原体験を言語化する
- 創造性の源泉となる体験を掘り起こす
- レポート作成時の文脈情報として活用

#### 構成
1. **年代別の振り返り**（各年代5項目まで）
   - 0〜10歳: 幼少期の原体験
   - 11〜20歳: 学生時代の形成体験
   - 21歳〜現在: キャリア・成人期の経験

2. **キャリア選択理由**: 現在の職業・役割を選んだ理由

3. **大切にしている価値観**: 3つまで（管理画面で編集可能）

4. **個人のパーパス**: レポート作成後に記入（管理画面で編集可能）

#### 設計思想
- **スキップ不可**: Life Reflectionは診断の必須プロセス
- **自由記述**: 箇条書きではなく、自分の言葉で語る
- **視覚的な誘導**: 説明セクションに画像を配置（目を閉じる、言葉にする）

---

## 2. 技術アーキテクチャ

### 2.1 技術スタック

```
フロントエンド:
- React 18 (Hooks, useCallback, useEffect, useState)
- Vite (ビルドツール、開発サーバー)
- Framer Motion (アニメーションライブラリ)

バックエンド:
- Supabase (PostgreSQL, Authentication, Storage)

デプロイ:
- Netlify (自動デプロイ、環境変数管理)
- GitHub (バージョン管理)

UI/UX:
- Atlassian Design System（デザイン原則の参考）
- カスタムコンポーネント（Button, DimensionSlider, RichTextEditor）
```

### 2.2 データベース設計（Supabase）

#### 正規化された5テーブル構造

```sql
-- 1. sessions テーブル（セッション管理）
sessions {
  id: UUID (主キー)
  user_agent: TEXT
  ip_address: TEXT
  created_at: TIMESTAMP
}

-- 2. afflatus_responses テーブル（メインデータ）
afflatus_responses {
  id: SERIAL (主キー)
  session_id: UUID (外部キー → sessions.id)

  -- 基本情報
  name: TEXT
  title: TEXT
  creative_experience: FLOAT (0.0〜1.0)

  -- タイプ1診断結果（8軸）
  type1_motivation: FLOAT
  type1_generation: FLOAT
  type1_progress: FLOAT
  type1_value: FLOAT
  type1_expression: FLOAT
  type1_thinking: FLOAT
  type1_execution: FLOAT
  type1_collaboration: FLOAT

  -- タイプ2診断結果（8軸）
  type2_motivation: FLOAT
  type2_generation: FLOAT
  type2_progress: FLOAT
  type2_value: FLOAT
  type2_expression: FLOAT
  type2_thinking: FLOAT
  type2_execution: FLOAT
  type2_collaboration: FLOAT

  -- スワイプ・スライダー履歴
  swipe_history: JSONB
  slider_history: JSONB

  -- 管理画面用メモ
  interview_memo: TEXT (リッチテキスト、HTML)

  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}

-- 3. life_reflections テーブル（人生振り返り）
life_reflections {
  id: SERIAL (主キー)
  response_id: INT (外部キー → afflatus_responses.id)

  -- 0〜10歳（5項目）
  age_0_10_item1: TEXT
  age_0_10_item2: TEXT
  age_0_10_item3: TEXT
  age_0_10_item4: TEXT
  age_0_10_item5: TEXT

  -- 11〜20歳（5項目）
  age_11_20_item1: TEXT
  age_11_20_item2: TEXT
  age_11_20_item3: TEXT
  age_11_20_item4: TEXT
  age_11_20_item5: TEXT

  -- 21歳〜現在（5項目）
  age_21_now_item1: TEXT
  age_21_now_item2: TEXT
  age_21_now_item3: TEXT
  age_21_now_item4: TEXT
  age_21_now_item5: TEXT

  -- キャリア理由
  career_reason: TEXT

  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}

-- 4. personal_values テーブル（価値観）
personal_values {
  id: SERIAL (主キー)
  response_id: INT (外部キー → afflatus_responses.id)
  value1: TEXT
  value2: TEXT
  value3: TEXT
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}

-- 5. personal_purposes テーブル（パーパス）
personal_purposes {
  id: SERIAL (主キー)
  response_id: INT (外部キー → afflatus_responses.id)
  purpose: TEXT (診断時はNULL、管理画面で後編集)
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

#### 外部キー制約

```sql
-- ON DELETE CASCADE設定
-- afflatus_responsesを削除すると、関連するlife_reflections、personal_values、personal_purposesも自動削除
```

### 2.3 スコア計算ロジック

#### タイプ1（キーワードスワイプ）

**データ構造**:
```javascript
swipe_history: [
  {
    keyword: "情熱に従う",
    compareTo: "期待に応える",
    dimension: "動機",
    pole: "内発",  // 選択したキーワードの極
    direction: "match",  // "match" or "reject"
    timestamp: "2025-11-21T12:34:56.789Z"
  },
  // ...
]
```

**スコア計算** (`src/utils/scoreCalculator.js`):
```javascript
// 各軸ごとに、選択したpoleをカウント
const calculateType1Scores = (swipeHistory) => {
  const scores = {};
  const dimensionMap = {
    '動機': { pole_a: '内発', pole_b: '目的整合' },  // pole_aが右側（1.0）
    '生成': { pole_a: '発散', pole_b: '収束' },
    // ...
    '価値創出': { pole_a: '発明', pole_b: '改善' },  // ※修正済み（pole反転）
    // ...
  };

  Object.keys(dimensionMap).forEach(dimension => {
    const { pole_a, pole_b } = dimensionMap[dimension];
    const relevantSwipes = swipeHistory.filter(item => item.dimension === dimension);

    let score = 0;
    relevantSwipes.forEach(item => {
      if (item.pole === pole_a) score += 1;  // pole_a寄り
      if (item.pole === pole_b) score -= 1;  // pole_b寄り
    });

    // -4〜+4 を 0.0〜1.0 に正規化
    const normalizedScore = (score + 4) / 8;
    scores[dimension] = Math.max(0, Math.min(1, normalizedScore));
  });

  return scores;
};
```

**重要な修正履歴**:
- **価値創出軸のバグ**: 当初 `pole_a: '改善', pole_b: '発明'` となっており、逆転していた。修正後は `pole_a: '発明', pole_b: '改善'` に統一。

#### タイプ2（自己評価スライダー）

**データ構造**:
```javascript
slider_history: {
  motivation: 0.68,
  generation: 0.82,
  progress: 0.51,
  value: 0.63,
  expression: 0.37,
  thinking: 0.45,
  execution: 1.0,
  collaboration: 0.0
}
```

**スコア**: スライダーの値（0.0〜1.0）をそのまま使用。

#### 0-4スケール表示（管理画面）

**目的**: 「0%」や「100%」のようなネガティブ/ポジティブ印象を避け、**両極の絶対値**で表現。

**変換式**:
```javascript
// 0.5を中央（0.0）として、0.0〜1.0 を -4.0〜+4.0 に変換
const absoluteScore = Math.abs(value - 0.5) * 8;

// 例:
// value=0.0 → absoluteScore=4.0（極B側に完全）
// value=0.5 → absoluteScore=0.0（中央・均等）
// value=1.0 → absoluteScore=4.0（極A側に完全）
```

**表示例**:
- `value=0.25` → 「目的整合（2）」
- `value=0.75` → 「内発（2）」
- `value=0.5` → 「中央（0）」

### 2.4 フロントエンドアーキテクチャ

#### コンポーネント構成

```
src/
├── components/
│   ├── production/                # 本番用コンポーネント
│   │   ├── BasicInfoInput.jsx           # 基本情報入力
│   │   ├── IntegratedDiagnosisFlow.jsx  # メインフロー管理
│   │   ├── KeywordSwipeStack.jsx        # タイプ1診断（スワイプUI）
│   │   ├── KeywordSwipeCard.jsx         # スワイプカード
│   │   ├── Type2DiagnosisFlow.jsx       # タイプ2診断（スライダーUI）
│   │   ├── DimensionSlider.jsx          # 8軸スライダー
│   │   └── CreativeCompassResults.jsx   # 結果画面
│   │
│   ├── prototypes/                # プロトタイプ（開発中・検証用）
│   │   ├── PatternSelector.jsx          # UIパターン選択（デバッグメニュー）
│   │   ├── PurposeCarvingIntro.jsx      # Life Reflection導入
│   │   ├── LifeReflectionPage.jsx       # Life Reflection本体
│   │   ├── SimpleSwipeCard.jsx          # 案1用カード
│   │   ├── VisualFeedbackSwipeCard.jsx  # 案3用カード
│   │   └── ...
│   │
│   ├── admin/                     # 管理画面
│   │   ├── AdminDashboard.jsx           # 参加者一覧・詳細モーダル
│   │   └── RichTextEditor.jsx           # インタビューメモ編集
│   │
│   └── common/                    # 共通コンポーネント（将来）
│       └── Button.jsx                   # 再利用可能なボタン
│
├── data/
│   ├── dimensionsData.js          # 8軸の定義（名前、説明、キーワード）
│   └── questions.js               # プロトタイプ用質問データ
│
├── utils/
│   ├── scoreCalculator.js         # スコア計算ロジック
│   ├── keywordSelector.js         # キーワードランダム選出
│   └── supabase.js                # Supabase API（保存・取得）
│
├── assets/
│   ├── afflatus-logo.png          # 会社ロゴ
│   ├── metacre-icon.png           # メタクリさんアイコン
│   ├── fethi-bouhaouchine-...jpg  # Life Reflection画像1
│   └── merci-l-...jpg             # Life Reflection画像2
│
├── App.jsx                        # ルーティング管理
├── App.css                        # グローバルスタイル
└── main.jsx                       # エントリーポイント
```

#### フロー管理（IntegratedDiagnosisFlow.jsx）

```javascript
const [phase, setPhase] = useState('basicInfo');
// フェーズ: basicInfo → lifeReflection → instruction → type1 → type2 → results

const [basicInfo, setBasicInfo] = useState({
  name: '',
  title: '',
  creativeExperience: 0.5,
  lifeReflection: {}
});

const [type1Results, setType1Results] = useState(null);
const [type2Results, setType2Results] = useState(null);
const [swipeHistory, setSwipeHistory] = useState([]);
const [sessionId, setSessionId] = useState(null);

// 重複保存防止
const [isSaving, setIsSaving] = useState(false);
```

**重要な実装ポイント**:

1. **重複保存防止** (`handleType2Complete`):
   ```javascript
   const handleType2Complete = useCallback(async (results) => {
     if (isSaving || type2Results) {
       console.log('重複保存をスキップ');
       return;  // 早期リターン
     }
     setIsSaving(true);
     // ... Supabase保存処理
     setIsSaving(false);
   }, [isSaving, type2Results, sessionId, basicInfo, type1Results, swipeHistory]);
   ```

2. **最後の軸の値を確実に保存** (`Type2DiagnosisFlow.jsx`):
   ```javascript
   const handleNext = () => {
     if (isLastStep) {
       const finalResults = {
         ...results,
         [currentDimension.id]: currentValue  // 最後の値を明示的に追加
       };
       onComplete(finalResults);
     }
   };
   ```

3. **創造体験レベルの統合** (`handleStartDiagnosis`):
   ```javascript
   const handleStartDiagnosis = () => {
     const updatedInfo = {
       ...basicInfo,
       creativeExperience  // instruction画面のスライダー値を統合
     };
     setBasicInfo(updatedInfo);
     setPhase('type1');
   };
   ```

### 2.5 キーワードランダム選出ロジック

#### 背景
- **80問のキーワードプール**（`public/keyword-candidates.csv`）から、毎回異なる32問を選出
- 8軸×10ペア = 80行のCSVデータ

#### 実装 (`src/utils/keywordSelector.js`)

```javascript
export const generateRandomKeywordSet = (csvText, pairsPerDimension = 4) => {
  // 1. CSVパース
  const rows = parseCSV(csvText);

  // 2. 各次元から指定数をランダム選出
  const selectedPairs = selectRandomPairs(rows, pairsPerDimension);

  // 3. pole反転（50%確率） + シャッフル
  const swipeData = convertToSwipeData(selectedPairs);

  return swipeData;
};

const convertToSwipeData = (pairs) => {
  const swipeData = pairs.map(pair => {
    const useMainAsPoleA = Math.random() > 0.5;  // 50%で反転

    if (useMainAsPoleA) {
      return {
        keyword: pair.keyword_a,
        compareTo: pair.keyword_b,
        pole: pair.pole_a,
        dimension: pair.dimension
      };
    } else {
      return {
        keyword: pair.keyword_b,
        compareTo: pair.keyword_a,
        pole: pair.pole_b,
        dimension: pair.dimension
      };
    }
  });

  // Fisher-Yatesシャッフル
  return shuffleArray(swipeData);
};
```

**効果**:
- 毎回異なる診断体験
- pole反転によるバイアス除去（左寄り・右寄りの偏りを防止）
- 80問プールの有効活用

---

## 3. UI/UXデザイン

### 3.1 スワイプUIの進化

#### 初期仕様（4方向スワイプ）→ボツ
- ← A / → B / ↑ 両方 / ↓ スキップ
- **問題点**: 選択肢を読む必要があり、4方向操作が難しい

#### ピボット（シンプルYES/NO）→採用
- 質問形式: 「〜ですか?」
- YES/NOの2択 + スキップボタン
- **結果**: 操作性が大幅に向上

#### 3つのプロトタイプ検証

**案1: シンプルYES/NO**
- カード消失: 300ms
- 次のカード: 100ms後
- 評価: 「気持ちいい速度感」

**案2: エンカレッジメント機能**
- YES/NOボタン押下時にメッセージ表示（'GOOD!', 'Awesome!'等）
- メッセージ: カードの裏（zIndex: 1）に常駐、250msでフェードアウト
- 評価: **「かなりいい！！」「気持ちよさがかなり上がった」**

**案3: 視覚フィードバック**
- YES/NO/SKIP（回答内容をそのまま表示）
- カード枠線フィードバック: YES=緑(#10b981)、NO=赤(#ef4444)、SKIP=灰色(#9ca3af)
- フィードバックテキスト: フェードアウトなし、時間経過で即座に消える
- 評価: **「いいですね！」**枠線が分かりやすい

#### 最終採用（キーワードスワイプ）

**形式**: 2つのキーワードを横並びで表示、スワイプまたはタップで選択

**UI構成**:
```
┌─────────────────────────────────┐
│   32問中 5問目                  │
├─────────────────────────────────┤
│                                 │
│   [情熱に従う] vs [期待に応える] │
│                                 │
│   ┌────────┐   ┌────────┐      │
│   │あてはまる│   │あてはまらない│  │
│   └────────┘   └────────┘      │
└─────────────────────────────────┘
```

**アニメーション**:
- スワイプ方向: 左=あてはまる、右=あてはまらない
- カード消失: 300ms（回転 + 移動 + フェードアウト）
- 次のカード表示: スムーズな連続感

**技術実装** (`KeywordSwipeCard.jsx`):
```javascript
<motion.div
  drag
  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
  dragElastic={0.7}
  onDragEnd={(event, info) => {
    const threshold = 100;
    if (info.offset.x < -threshold) {
      handleSwipe('match');  // 左スワイプ
    } else if (info.offset.x > threshold) {
      handleSwipe('reject');  // 右スワイプ
    }
  }}
  animate={controls}
  style={{
    x: motionValue,
    rotate: useTransform(motionValue, [-200, 0, 200], [-20, 0, 20]),
    opacity: useTransform(motionValue, [-200, 0, 200], [0.5, 1, 0.5])
  }}
>
  {/* カードコンテンツ */}
</motion.div>
```

### 3.2 スライダーUIの設計

#### DimensionSlider コンポーネント

**デュアルマーカーシステム**:
- **タイプ1マーカー（直感判断）**: 下向き三角▼、バーの上に配置
- **タイプ2マーカー（自己認識）**: 上向き三角▲、バーの下に配置
- **色**: 統一色 #374151（ダークグレー）

**カスタムつまみ**（入力用スライダー）:
- ネイティブthumbを透明化（`opacity: 0`）
- カスタムdivで視覚的に表示
- **色の動的変更**:
  - 中央付近（0.4〜0.6）: グレー #9ca3af
  - 左側（< 0.4）: 青 #3b82f6
  - 右側（> 0.6）: 赤 #ef4444
- ドラッグ時: `scale(1.1)` で拡大

**グラデーション背景**:
```javascript
background: `linear-gradient(to right,
  #3b82f6 0%,
  #9ca3af 50%,
  #ef4444 100%
)`
```

**中央ガイドライン**:
- 幅2px、高さ16px、色#d1d5db
- zIndex: 5（バーより上、マーカーより下）

**エンドポイント位置調整**:
```javascript
// 左端（value ≤ 0.05）
left: `calc(${value * 100}% + 4px)`

// 右端（value ≥ 0.95）
left: `calc(${value * 100}% - 30px)`

// 中央値
left: `${value * 100}%`
```

### 3.3 結果画面のデザイン

#### タイトル
```
あなたの創造性バランス
Your Creativity Balance
```

#### 説明セクション
```
以下が、あなたの創造性のバランスを8つの軸で可視化したものです。

メタクリ創造性診断は「創造性の多様性」と「個人の独自性」を可視化します。

数値の大小に優劣はありません。この結果は「直感判断」と「自己認識」の一致やズレから、
あなたの創造性を紐解いていくためのものです。
その意味で、これはあなたらしい創造性の「かたち」です。
```

#### 8軸スライダー表示
- デュアルマーカー（タイプ1/タイプ2）で比較表示
- 軸名: 「動機：目的整合 ↔ 内発」
- マーカーラベル: 「直感判断」「自己認識」

#### レポート通知セクション（メタクリさん画像付き）
```
レポートでは私「メタクリ」があなたの経験の振り返りと診断結果を読み解き、
創造性の傾向やギャップの意味を深く掘り下げます。

数日以内にレポートをお送りしますので、楽しみにお待ちください。
```

#### メタクリラジオセクション（吹き出しデザイン）
```
[吹き出し]
レポートを待っている間に、メタクリ創造性診断を開発したタムカイとOpiが、
創造性についてあれこれ考えて語り合うポッドキャスト番組があります！
毎週月曜日更新、大里Pの編集後記もおもしろいよ！

[🎙️ メタクリラジオを聴いてみる]（ボタン）
```

### 3.4 カラーシステム（モノトーンベース）

**基本色**:
```javascript
// グレースケール
gray: {
  50: '#f9fafb',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  700: '#374151',
  900: '#1f2937'
}

// アクセントカラー（戦略的に最小限）
primary: { 500: '#3b82f6', 700: '#1d4ed8' },  // 青（Type1）
success: { 500: '#10b981', 700: '#047857' },   // 緑（Type2）
warning: { 500: '#f59e0b', 700: '#d97706' },   // オレンジ（Gap）
danger: { 500: '#ef4444' }                     // 赤
```

**使用方針**:
- 背景・ボーダー: グレースケールのみ
- テキスト: ダークグレー（#1f2937, #374151）
- アクセントカラー: データ可視化のみ（Type1/Type2/Gap）

### 3.5 レスポンシブデザイン

**フォントサイズ**:
```css
font-size: clamp(16px, 5vw, 20px);
```

**カード位置調整**:
```css
/* デスクトップ */
.card-container {
  transform: translateY(-60px);
}

/* モバイル */
@media (max-width: 768px) {
  .card-container {
    transform: translateY(-50px);
  }
}
```

**スマホ最適化**:
```css
body.swipe-active {
  touch-action: none;  /* 縦スクロール無効 */
  overflow: hidden;
  overscroll-behavior: none;  /* バウンス効果無効 */
}
```

---

## 4. 管理画面（インタビュー支援）

### 4.1 目的

**インタビュアー（熟達者）が管理画面を見ながら回答者と対話**

- Life Reflection → 価値観 → 創造性の順で掘り下げ
- メタ認知ドキュメント（対話内容）が差別化ポイント
- レポート作成時の文脈情報として活用

### 4.2 レイアウト（60:40分割）

```
┌─────────────────────┬─────────────────────┐
│ 左側 (60%)         │ 右側 (40%)         │
│ 回答データ          │ メモ＋詳細データ    │
├─────────────────────┼─────────────────────┤
│ 【基本情報】        │ 【インタビューメモ】│
│ タムラカイ          │ ┌─────────────────┐│
│ プロダクトデザイナー│ │ (リッチテキスト) ││
│ 創造体験: 75%       │ │ 縦に大きく確保   ││
│                     │ │                  ││
│ 【個人のパーパス】  │ └─────────────────┘│
│ (編集可能)          │ [保存]              │
│                     │                     │
│ 【価値観】          │ 【MDデータ表示】    │
│ 1. 誠実さ (編集可)   │ □ 完全データ       │
│ 2. 挑戦             │ □ 創造性データ     │
│ 3. 成長             │ [最新情報に更新]   │
│                     │                     │
│ 【Life Reflection】 │                     │
│ 0〜10歳             │                     │
│ • レゴブロック      │                     │
│ • 昆虫採集          │                     │
│                     │                     │
│ 【合計値TOP3】      │                     │
│ (Type1+Type2で一致) │                     │
│                     │                     │
│ 【Type1極TOP3】     │                     │
│ 【Type2極TOP3】     │                     │
│ 【大きなギャップ】  │                     │
│                     │                     │
│ 【創造性プロファイル】│                    │
│ (8軸テーブル)       │                     │
└─────────────────────┴─────────────────────┘
```

### 4.3 主要機能

#### 参加者一覧
- カード形式で表示
- **📝 メモありアイコン**: インタビューメモが保存されている場合
- **🟠 オレンジ枠線**: ギャップ1.2以上（0.3以上の差分）がある参加者

#### 詳細モーダル

**合計値TOP3**:
- Type1とType2の**合計絶対値**でランキング
- 一貫して強い特性を可視化
- 表示例: 「動機：内発（6.3）」

**Type1極TOP3 / Type2極TOP3**:
- 各タイプで最も強い3軸
- 0-4スケールで表示
- 表示例: 「動機：内発（4）」「生成：発散（3.2）」

**大きなギャップ**:
- タイプ1×タイプ2の差分が大きい軸（上位3つ）
- メタ認知の掘り下げポイント
- 表示例: 「価値創出 1.5（Type1:発明4.0、Type2:改善2.5）」

**創造性プロファイルテーブル**:
| 軸 | Type1 | Type2 | Gap |
|----|-------|-------|-----|
| 動機：目的整合 ↔ 内発 | 内発（4） | 内発（3.2） | 0.8 |
| ... | ... | ... | ... |

- Type1/Type2が1.6以上で背景色（青/緑）
- Gapが1.2以上で黄色背景

#### インタビューメモ（RichTextEditor）

**機能**:
- 太字、斜体、下線
- 箇条書き（UL、OL）
- リンク挿入
- 書式削除ボタン
- 保存ボタン

**実装** (`RichTextEditor.jsx`):
```javascript
const applyFormat = (command, value = null) => {
  document.execCommand(command, false, value);
};

<div
  contentEditable
  onInput={(e) => onChange(e.target.innerHTML)}
  dangerouslySetInnerHTML={{ __html: value }}
  style={{
    minHeight: '200px',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    overflowY: 'auto'
  }}
/>
```

#### MDデータ表示（折りたたみ可能）

**モード切り替え**:
- **完全データ**: 基本情報 + Life Reflection + 8軸結果 + スワイプ履歴
- **創造性データ**: 8軸結果のみ（簡易版）

**用途**: Gemini APIでの解説文生成時にコピー＆ペースト

**出力例**（完全データ）:
```markdown
# AFFLATUS創造性診断 結果データ

## 基本情報
- 名前: タムラカイ
- 肩書き: プロダクトデザイナー
- 創造体験レベル: 75%

## Life Reflection（人生振り返り）

### 0〜10歳
1. レゴブロックで家を作る
2. 昆虫採集

### 11〜20歳
1. 部活動で全国大会出場

### 21歳〜現在
1. 新規事業の立ち上げ

### 現在のキャリアを選んだ理由
ユーザーの課題を解決するプロダクトを作りたかったから

### 大切にしている価値観
1. 誠実さ
2. 挑戦
3. 成長

## 創造性プロファイル

### 動機
- 極A: 目的整合
- 極B: 内発
- タイプ1（直感判断）: 65% (内発寄り)
- タイプ2（自己認識）: 68% (内発寄り)
- ギャップ: 3%

説明:
動機は、物事を始めるときに何があなたを動かすかを示す軸です。
（以下略）

### 生成
...
```

### 4.4 認証

**パスワード**: `afflatus2025`（ハードコード）

**ログイン画面**:
```javascript
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [password, setPassword] = useState('');
const ADMIN_PASSWORD = 'afflatus2025';

const handleLogin = (e) => {
  e.preventDefault();
  if (password === ADMIN_PASSWORD) {
    setIsAuthenticated(true);
  } else {
    alert('パスワードが正しくありません');
  }
};
```

**セキュリティ上の注意**:
- 現在はハードコード（簡易実装）
- より強固なセキュリティが必要な場合はSupabase認証を検討

### 4.5 サンプルデータ

**3人分のダミーデータ** (`scripts/sampleData.json`):
1. タムラカイ（プロダクトデザイナー）
2. 山田太郎（プロダクトマネージャー）
3. 佐藤花子（UXデザイナー）

**フォールバック機能**:
```javascript
const loadResponses = async () => {
  const data = await fetchAfflatusResponses();

  if (!data || data.length === 0) {
    // Supabaseが空の場合、サンプルデータを使用
    setResponses(normalizedSampleData);
    setUsingSampleData(true);
  } else {
    setResponses(normalizedData);
    setUsingSampleData(false);
  }
};
```

---

## 5. デプロイとインフラ

### 5.1 Netlify設定

**ビルド設定**:
```
Build command: npm run build
Publish directory: dist
```

**環境変数**:
```
VITE_SUPABASE_URL=https://ppsbjozfkoojvkdrmrfu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...（長いトークン）
```

**SPAルーティング対応** (`public/_redirects`):
```
/*    /index.html   200
```

**自動デプロイ**:
- GitHubにpush → Netlifyが自動的に再デプロイ（1〜2分）

**公開URL**:
- 診断サイト: https://afflatus-test01.netlify.app/
- 管理画面: https://afflatus-test01.netlify.app/admin

### 5.2 GitHub管理

**リポジトリ**: https://github.com/tamkai/swipe-prototype

**ブランチ戦略**:
```
main（本番環境）
  └─ feature/* （機能開発ブランチ、mainにマージ）
```

**コミットメッセージ規約**:
```bash
# 機能追加
git commit -m "Add feature: ..."

# バグ修正
git commit -m "Fix bug: ..."

# UI改善
git commit -m "Improve UI: ..."

# デプロイ時（Claudeが自動生成）
git commit -m "$(cat <<'EOF'
タイトル（1行、50文字以内）

- 変更内容1
- 変更内容2
- 変更内容3

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

---

## 6. アクセシビリティと今後の改善

### 6.1 Atlassian Design Systemの原則（参考）

**採用予定の改善**:

1. **フォーカスリング**（高優先度）
   ```css
   *:focus-visible {
     outline: 2px solid #3b82f6;
     outline-offset: 2px;
   }
   ```

2. **ARIA属性**（高優先度）
   ```javascript
   <button
     disabled={!hasMovedSlider}
     aria-disabled={!hasMovedSlider}
     aria-label="診断を開始する"
   >
     診断開始 →
   </button>
   ```

3. **ラベルとフォームの関連付け**（高優先度）
   ```javascript
   <label htmlFor="name-input">お名前</label>
   <input id="name-input" type="text" value={name} />
   ```

4. **デザイントークンシステム**（中優先度）
   ```javascript
   // /src/design-tokens.js
   export const colors = {
     primary: { 500: '#3b82f6', 700: '#1d4ed8' },
     gray: { 200: '#e5e7eb', 700: '#374151' },
   };
   ```

5. **共通UIコンポーネント**（中優先度）
   - `Button.jsx`（variant, size, disabled対応）
   - `TextField.jsx`（エラー状態、ヘルパーテキスト）
   - `FormLabel.jsx`（一貫したラベルスタイル）

6. **ダークモード対応**（低優先度）
   - `prefers-color-scheme`対応
   - デザイントークンでカラーテーマ切り替え

7. **Reduced Motion対応**（低優先度）
   - `prefers-reduced-motion: reduce`でアニメーション無効化

### 6.2 既知の問題・制限事項

**修正済み**:
- ✅ 重複データ保存バグ（React Strict Mode対策）
- ✅ 価値創出軸のpole逆転バグ
- ✅ Type2診断で最後の軸が保存されない問題
- ✅ 創造体験レベルが0.50に固定される問題
- ✅ スワイプ履歴に比較対象キーワードが記録されない問題

**現在の制限事項**:
- なし（現時点で安定動作）

---

## 7. プロジェクトの将来展望

### 7.1 プログラム構成（推奨）

```
【Week 0】タイプ1診断（スワイプUI）
          ↓ 無意識パターンを測定

【Week 1】ワークショップ
          - Purpose Carving（パーパス彫り出し）
          - クリエイティブループ実践
          - 診断結果フィードバック

【Week 1】タイプ2診断（スライダーUI）← 既に実装済み
          ↓ 自覚的理解を測定

【Week 2】差分分析レポート
          - タイプ1×2のギャップ可視化
          - 成熟度レイヤー判定
          - 個別アクションプラン
```

### 7.2 今後の実装候補

#### 短期（1〜3ヶ月）
1. **レポート自動生成機能**
   - Gemini APIを活用してMDデータから解説文生成
   - ギャップの意味を掘り下げた個別レポート
   - PDF出力機能

2. **管理画面の機能拡張**
   - Type1キーワード詳細のポップアップ化
   - フィルタリング機能（特定の軸でギャップが大きい人を抽出）
   - ページネーション（参加者が増えた場合）

3. **アクセシビリティ改善**
   - フォーカスリング、ARIA属性の追加
   - セマンティックHTMLへのリファクタリング

#### 中期（3〜6ヶ月）
4. **デザインシステムの構築**
   - デザイントークンの一元管理
   - 共通UIコンポーネントライブラリ
   - Storybookの導入（コンポーネントカタログ）

5. **ダークモード対応**
   - デザイントークンでカラーテーマ切り替え
   - `prefers-color-scheme`対応

6. **多言語対応**
   - 英語版の診断
   - i18nライブラリ（react-i18next）の導入

#### 長期（6ヶ月〜）
7. **インタビューガイド機能**
   - AI対話機能（熟達者を補助）
   - 掘り下げポイントの自動提案

8. **組織診断機能**
   - チーム全体の創造性バランス可視化
   - 多様性指標の算出

9. **縦断調査機能**
   - 定期的な再診断で変化を追跡
   - 成長曲線の可視化

---

## 8. 技術的な学びとベストプラクティス

### 8.1 React開発

**useCallbackの活用**:
```javascript
const handleType2Complete = useCallback(async (results) => {
  // 重複保存防止
}, [isSaving, type2Results, sessionId, ...]);
```

**nullish coalescing (`??`)**:
```javascript
// falsyな0.0を扱う場合
const value = results[dimension.id] ?? 0.5;  // ✅ 正しい
const value = results[dimension.id] || 0.5;  // ❌ 0.0が0.5に変換される
```

**React Strict Modeの副作用**:
- 開発環境で副作用が2回実行される
- `isSaving`フラグで重複防止

### 8.2 Framer Motion

**基本パターン**:
```javascript
const motionValue = useMotionValue(0);
const controls = useAnimation();

// ドラッグイベント
<motion.div
  drag
  dragElastic={0.7}
  onDragEnd={handleDragEnd}
  animate={controls}
  style={{
    x: motionValue,
    rotate: useTransform(motionValue, [-200, 0, 200], [-20, 0, 20])
  }}
/>

// プログラマティックアニメーション
await controls.start({
  x: direction === 'match' ? -500 : 500,
  opacity: 0,
  rotate: direction === 'match' ? -30 : 30,
  transition: { duration: 0.3 }
});
```

### 8.3 Supabase

**トランザクション的な保存**:
```javascript
// メインテーブルへのINSERT
const { data: mainData, error: mainError } = await supabase
  .from('afflatus_responses')
  .insert([{ ... }])
  .select()
  .single();

if (mainError) throw mainError;

// 関連テーブルへのINSERT（response_idを使用）
await supabase.from('life_reflections').insert([{
  response_id: mainData.id,
  ...
}]);
```

**fetchとenrich**:
```javascript
const data = await supabase
  .from('afflatus_responses')
  .select('*')
  .order('created_at', { ascending: false });

// 関連テーブルをJOIN
const enrichedData = await Promise.all(
  data.map(async (participant) => {
    const lifeReflection = await supabase
      .from('life_reflections')
      .select('*')
      .eq('response_id', participant.id)
      .single();

    return { ...participant, life_reflection: lifeReflection.data };
  })
);
```

### 8.4 flexboxレイアウト

**minHeightの罠**:
```javascript
// ❌ 誤り
<div style={{
  minHeight: '100vh',
  justifyContent: 'flex-start',
  paddingBottom: '120px'  // 見えない位置に配置される
}}>

// ✅ 正しい
<div style={{
  // minHeightを削除
  paddingBottom: '60px'  // 自然な高さで表示される
}}>
```

**文字数統一の重要性**:
```javascript
// ❌ ラベル文字数が異なるとズレる
<div style={{ alignItems: 'center' }}>
  <span>直感</span>  {/* 2文字 */}
</div>

<div style={{ alignItems: 'center' }}>
  <span>自己認識</span>  {/* 4文字 */}
</div>

// ✅ 文字数を統一
<span>直感判断</span>  {/* 4文字 */}
<span>自己認識</span>  {/* 4文字 */}
```

### 8.5 レスポンシブフォント

**clamp()の活用**:
```javascript
fontSize: 'clamp(16px, 5vw, 20px)'
// 16px（最小）〜 20px（最大）、画面幅に応じて5vwで調整
```

---

## 9. まとめ

### 9.1 プロジェクトの独自性

**メタクリ創造性診断**は、以下の点で既存の創造性測定とは異なります：

1. **多様性の肯定**: 創造性を単一の能力ではなく、8つの軸のバランスとして捉える
2. **メタ認知の可視化**: タイプ1×タイプ2のギャップから「無意識」と「自己認識」のズレを明らかにする
3. **体験ベースの診断**: Life Reflectionで個人の原体験を掘り起こし、文脈を理解する
4. **対話を促す設計**: 管理画面は「結果を見せる」ではなく「対話のきっかけ」として機能
5. **レポートの差別化**: 熟達者によるメタ認知ドキュメントが最大の価値

### 9.2 技術的な完成度

**現在の実装状況**:
- ✅ タイプ1診断（キーワードスワイプUI）
- ✅ タイプ2診断（8軸スライダーUI）
- ✅ Life Reflection（人生振り返り）
- ✅ 結果画面（デュアルマーカー）
- ✅ Supabaseデータベース（5テーブル正規化）
- ✅ 管理画面（インタビュー支援、60:40レイアウト）
- ✅ Netlify自動デプロイ
- ✅ スマホ最適化

**安定性**:
- 重複保存バグ修正済み
- pole逆転バグ修正済み
- 実データでの動作確認済み

### 9.3 今後の方向性

**短期的な目標**:
- レポート自動生成機能の実装（Gemini API活用）
- アクセシビリティ改善（WCAG 2.1準拠）

**中期的な目標**:
- デザインシステムの構築（再利用性向上）
- 多言語対応（英語版）

**長期的なビジョン**:
- インタビューガイドAI（対話支援）
- 組織診断機能（チーム全体の可視化）
- 縦断調査機能（成長の追跡）

---

**このドキュメントは、メタクリ創造性診断の思想・設計・実装・運用にいたるまでを網羅的にまとめたものです。**

新しい開発者やAIエージェントが参加する際、このドキュメントを読むことで、プロジェクトの全体像と詳細な実装仕様を理解できます。

---

**作成者**: tamkai + Claude Code
**最終更新**: 2025-11-21
**バージョン**: 1.0.0
