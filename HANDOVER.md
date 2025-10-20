# スワイプUIアセスメント開発 - Handover Document

**開発期間**: 2025-10-02 〜 2025-10-07
**開発者**: tamkai + Claude Code

---

## 🎯 最新の成果（2025-10-07更新）

### **案F: キーワードスワイプアセスメント - 結果表示完成 ✨**

キーワードスワイプ本体に加えて、**8次元創造性プロフィール結果表示**が完成。

---

## 📁 現在の実装状況

### **実装済みファイル**

#### コンポーネント
- `src/components/KeywordSwipeCard.jsx` - キーワード表示カード
- `src/components/KeywordSwipeStack.jsx` - スタック管理・プログレスバー
- `src/components/ResultsDisplay.jsx` - **8次元スコア結果表示（NEW）**

#### ユーティリティ
- `src/utils/scoreCalculator.js` - **スコア計算ロジック（NEW）**

#### データ
- `src/data/keywordSwipeData.js` - 32個のキーワード（8次元×4個）
- `keyword-candidates.csv` - **80個のキーワード候補（10ペア/次元）（NEW）**

#### アプリ本体
- `src/App.jsx` - 結果表示モード追加・スクロール制御
- `src/App.css` - カード高さ調整・レイアウト最適化

---

## 🎨 案F: キーワードスワイプの最終仕様

### UI設計

**カード構造:**
```
「冷静」
よりも

情熱

[あてはまる] [あてはまらない]
   [どちらもあてはまる]

━━━━━━━━━━ 50% ━━━━━━━━━━
           16 / 32
```

**操作方法:**
- ← 左スワイプ/左ボタン: **あてはまる**（緑）
- → 右スワイプ/右ボタン: **あてはまらない**（赤）
- ↓ 下スワイプ/下ボタン: **どちらもあてはまる**（紫）

**デザイン詳細:**
- キーワード: 48px、font-weight: 900、改行許可（`wordBreak: 'keep-all'`）
- 対極概念: 20px、font-weight: 600、グレー（#9ca3af）
- カード枠線: 回答時に8pxの太枠（緑/赤/紫）
- カード高さ: 340px（モバイル）、ボタンとカウンターが収まる設計
- プログレスバー: 白い進捗バー（6px高さ）+ カウンター表示
- ボタン間隔: gap 16px（適切な余白）

**結果画面:**
```
あなたの創造性プロフィール

🔥 動機        □□□□ | ■■□□  内発+2
🪚 生成        □□□□ | ■■■■  発散+4
📅 進行        ■■□□ | □□□□  粘り+2
💎 価値創出    □□□□ | □□□□  バランス
🎨 表現        ■■■□ | □□□□  共感価値+3
🧠 思考        □□□□ | ■□□□  抽象+1
🏃 実行        ■□□□ | □□□□  設計+1
🧑‍🧑‍🧒 協働        □□□□ | ■■■■  単独集中+4
```

- スコアラベル: 全て白色
- 0の場合: 「バランス」と表示
- 正のスコア: pole_a（右側）に■が伸びる → 「内発+2」
- 負のスコア: pole_b（左側）に■が伸びる → 「目的整合+3」
- スクロール可能（`results-mode`クラス）

### データ構造（32個 → 80個候補）

**現在使用中（32個）:**
- 8次元 × 4個 = 32キーワード
- `src/data/keywordSwipeData.js`

**拡張候補（80個）:**
- 8次元 × 10ペア = 80キーワード
- `keyword-candidates.csv`
- 将来的にランダム選出で使用予定

**8次元構造:**
1. 🔥 動機: pole_a「内発」 ←→ pole_b「目的整合」
2. 🪚 生成: pole_a「発散」 ←→ pole_b「収束」
3. 📅 進行: pole_a「柔軟」 ←→ pole_b「粘り」
4. 💎 価値創出: pole_a「改善」 ←→ pole_b「発明」
5. 🎨 表現: pole_a「自己表現」 ←→ pole_b「共感価値」
6. 🧠 思考: pole_a「抽象」 ←→ pole_b「具体」
7. 🏃 実行: pole_a「即興」 ←→ pole_b「設計」
8. 🧑‍🧑‍🧒 協働: pole_a「単独集中」 ←→ pole_b「協働駆動」

---

## 🛠️ 技術的な実装ポイント

### スコア計算ロジック（`scoreCalculator.js`）

```javascript
// pole_aに「あてはまる」→ +1
// pole_bに「あてはまる」→ -1
// pole_aに「あてはまらない」→ -1
// pole_bに「あてはまらない」→ +1
// 「どちらもあてはまる」→ 0

export const calculateScores = (swipeHistory) => {
  const dimensions = {
    '動機': { score: 0, count: 0, pole_a: '内発', pole_b: '目的整合' },
    // ...
  };

  swipeHistory.forEach(item => {
    if (item.direction === 'match') {
      if (item.pole === dimensions[dim].pole_a) {
        dimensions[dim].score += 1;
      } else {
        dimensions[dim].score -= 1;
      }
    } else if (item.direction === 'not_match') {
      // 逆転
      if (item.pole === dimensions[dim].pole_a) {
        dimensions[dim].score -= 1;
      } else {
        dimensions[dim].score += 1;
      }
    }
  });

  return dimensions;
};
```

### スコアバーの描画

```javascript
// スコアの絶対値をそのまま■の数に反映
const filledBars = Math.abs(score);
const isPositive = score >= 0;

// 左側（負のスコア）: maxScore分の枠
for (let i = 0; i < maxScore; i++) {
  if (!isPositive && i < filledBars) {
    leftBars.push('■');
  } else {
    leftBars.push('□');
  }
}

// 右側（正のスコア）: maxScore分の枠
for (let i = 0; i < maxScore; i++) {
  if (isPositive && i < filledBars) {
    rightBars.push('■');
  } else {
    rightBars.push('□');
  }
}

return leftBars.reverse().join('') + ' | ' + rightBars.join('');
```

### レスポンシブ対応

```css
/* デスクトップ */
.card-container {
  height: 380px;
  transform: translateY(-120px);
}

/* モバイル（768px以下） */
@media (max-width: 768px) {
  .card-container {
    height: 340px;
    transform: translateY(-100px);
  }
}

/* 結果表示モード */
.app.results-mode {
  overflow-y: auto;
  overflow-x: hidden;
  height: auto;
  min-height: 100vh;
}
```

---

## 🔄 開発の経緯（試行錯誤の記録）

### 2025-10-02〜10-04: プロトタイプ完成（案1-F）
- 水曜15時: プロジェクト開始
- 金曜15時: 案F（キーワードスワイプ）完成
- 6つの異なるアプローチを試作・検証

### 2025-10-07: 結果表示・UI改善セッション

**ユーザーフィードバックから改善:**
1. ✅ キーワード候補を32個→80個に拡張（CSV形式）
2. ✅ 結果表示画面の実装（8次元スコア表示）
3. ✅ スコア計算ロジックの実装
4. ✅ カード高さ調整（ボタンとカウンターが画面内に収まる）
5. ✅ フィードバックテキストの改行防止（`whiteSpace: 'nowrap'`）
6. ✅ 結果画面のスクロール有効化
7. ✅ スコア表示の改善（数字→poleラベル、0→「バランス」）
8. ✅ プログレスバーの追加
9. ✅ ボタンラベルの修正（「当てはまる」→「あてはまる」、「どちらともいえない」→「どちらもあてはまる」）
10. ✅ スコアバーの■数を正確に反映
11. ✅ スコアバーの左右方向を修正
12. ✅ キーワードテキストの改行許可（「イノベーション」が省略されない）
13. ✅ インジケーターとボタンの隙間調整

**技術的な工夫:**
- カード位置とボタン位置の絶対配置（`position: absolute`, `bottom: -150px`）
- プログレスバー位置（`bottom: -210px`）でボタンとの余白確保
- スコアバーのロジック: パーセンテージではなく絶対値で■の数を決定
- pole_a/pole_bのラベル表示を左右逆転（スコアバーと対応）

### 2025-10-16: CSVランダム選出・デバッグ機能・結果表示強化 ✨

**実装完了:**
1. ✅ **CSVランダム選出機能**
   - `src/utils/keywordSelector.js` を新規作成
   - 80個候補から各次元4ペア（計32個）をランダム選出
   - pole_a/pole_b のどちらをメインにするかランダム化
   - Fisher-Yatesアルゴリズムで出現順序をシャッフル
   - `public/keyword-candidates.csv` から動的に読み込み

2. ✅ **デバッグメニュー機能**
   - `src/utils/dummyData.js` を新規作成
   - ダミースワイプ履歴の自動生成（8次元×4問=32問分）
   - PatternSelectorに「🔧 結果画面に飛ぶ（デバッグ用）」ボタン追加
   - 黄色い枠で視覚的に区別
   - 32問回答せずに結果画面を即座に確認可能

3. ✅ **結果表示の詳細説明追加**
   - `src/data/dimensionDescriptions.js` を新規作成
   - 8次元すべてに詳細な説明を追加
     - 次元の意味（title）
     - 説明文（description）
     - pole_a/pole_b の詳細説明
   - スコアコメント機能（getScoreComment）
     - ±4: 「非常に強く〜に偏っています」
     - ±3: 「強く〜に偏っています」
     - ±2: 「やや〜に偏っています」
     - ±1: 「わずかに〜に偏っています」
     - 0: 「バランスが取れています」

4. ✅ **UI/レイアウトの最終調整**
   - スコアバーを固定4本ずつに修正（maxScoreではなくbarsPerSide=4）
   - スコアラベルと説明を説明ボックス上部に移動
   - スコアラベルと説明を中央配置、説明ボックスと分離
   - 横並び配置: pole_bラベル←スコアバー→pole_aラベル、その下に水平線
   - 次元説明ボックス内のpole説明順序を変更（左側pole_bを先に表示）
   - キーワードの動的フォントサイズ調整（6文字以上で36px）
   - 対極概念表示エリアの横幅拡大（width: 90%, maxWidth: 350px）

5. ✅ **CSV更新と検証**
   - ユーザーが編集したキーワードを `public/keyword-candidates.csv` にコピー
   - 80個のキーワードペアを確認
   - ランダム選出動作を検証

**技術的な実装詳細:**

```javascript
// keywordSelector.js - CSVからランダム選出
export const generateRandomKeywordSet = (csvText, pairsPerDimension = 4) => {
  const allPairs = parseCSV(csvText);
  const selectedPairs = selectRandomPairs(allPairs, pairsPerDimension);
  return convertToSwipeData(selectedPairs);
};

// App.jsx - CSV読み込み
const handlePatternSelect = async (patternId) => {
  if (patternId === 'debugResults') {
    const dummyHistory = generateDummySwipeHistory();
    setSwipeHistory(dummyHistory);
    setSelectedPattern('keywordSwipe');
    setIsComplete(true);
    return;
  }

  if (patternId === 'keywordSwipe') {
    const response = await fetch('/keyword-candidates.csv');
    const csvText = await response.text();
    const newKeywords = generateRandomKeywordSet(csvText, 4);
    setRandomKeywords(newKeywords);
  }
};

// ResultsDisplay.jsx - 固定4本スコアバー
const renderScoreBar = (score, maxScore) => {
  const filledBars = Math.abs(score);
  const isPositive = score >= 0;
  const barsPerSide = 4; // 固定値

  // 常に左右4本ずつ表示
  for (let i = 0; i < barsPerSide; i++) {
    if (!isPositive && i < filledBars) {
      leftBars.push('■');
    } else {
      leftBars.push('□');
    }
  }
  // ...
};
```

**新規作成ファイル:**
- `src/utils/keywordSelector.js` - CSVパース・ランダム選出ロジック
- `src/utils/dummyData.js` - デバッグ用ダミーデータ生成
- `src/data/dimensionDescriptions.js` - 8次元の詳細説明とスコアコメント

**修正ファイル:**
- `src/App.jsx` - CSV読み込み・デバッグモード対応
- `src/components/ResultsDisplay.jsx` - スコアバー修正・説明追加・レイアウト調整
- `src/components/KeywordSwipeCard.jsx` - 動的フォントサイズ・横幅拡大
- `src/components/PatternSelector.jsx` - デバッグボタン追加
- `public/keyword-candidates.csv` - 最新キーワードに更新

---

## 💡 重要な気づき

### 設計思想の転換

**当初の誤り:**
- リッカート5段階の質問をYES/NO化しようとした
- 質問文の日本語表現で沼にハマった

**本質への回帰:**
- 元々のアイデア: 「好き・嫌い」スワイプで創造性タイプを見る
- キーワードに対する直感的反応を測定
- 対極概念を見せることで相対的判断を促す

**結果表示の設計思想:**
- タイプ分類ではなく「8次元のプロフィール」として表示
- 数字の羅列ではなく、poleラベル（「内発+2」など）で意味を持たせる
- 0は「バランス」として肯定的に表現
- スコアバーで視覚的に理解しやすく

### アセスメントの目的（再確認）

1. **①自認の再確認 + ③他者との比較で気づき**
   - 劇的な発見はない前提
   - 「自分の当たり前が当たり前ではない」を知る

2. **使用場面:**
   - 企業研修の冒頭（Purpose Carvingを含む創造性開発プログラム）
   - マインドセットのスタート地点を作る

3. **スワイプUIの意義:**
   - タイプ1創造性（直感的反応）の測定
   - 質問文で悩まない
   - 高速・気持ちいい体験

---

## 📊 データ構造の詳細

### swipeHistory（回答履歴）
```javascript
[
  {
    keyword: '情熱',
    dimension: '動機',
    pole: '内発',
    direction: 'match', // 'match' | 'not_match' | 'neither'
    timestamp: '2025-10-07T12:34:56.789Z'
  },
  // ...
]
```

### スコア計算結果
```javascript
[
  {
    dimension: '動機',
    score: 2,              // -4 〜 +4 の範囲
    count: 4,              // 回答した質問数
    pole_a: '内発',
    pole_b: '目的整合',
    maxScore: 4            // 最大スコア（count と同じ）
  },
  // ...
]
```

---

## 🚀 今後の開発方向

### 短期（次回セッション）
1. **ランダム選出機能**
   - 80個の候補からランダムに32個を選出
   - pole_a/pole_bのどちらをメインにするかランダム化
   - 出現順序のランダム化

2. **反応時間の測定**
   - カード表示から回答までの時間を記録
   - 分析・スコア重み付けへの活用

3. **結果表示の視覚化強化**
   - グラフィカルなバーチャート
   - アニメーション効果
   - 結果の解説テキスト

### 中期
1. **Purpose Carvingとの統合**
   - ワークショップ前後での差分分析
   - タイプ1/タイプ2創造性の比較

2. **質問数の最適化**
   - 32問は適切か？
   - 各次元の測定精度

3. **データ分析機能**
   - CSV/JSONエクスポート
   - 集団データの可視化
   - 他者との比較表示

---

## 📱 動作確認環境

### 開発サーバー
```bash
# ローカル
npm run dev

# ネットワーク公開（スマホ確認用）
npm run dev -- --host
# → http://192.168.11.49:5173/
```

### 確認済み
- ✅ iPhone 17 Pro（Safari）
- ✅ PC（Chrome/Safari）
- ✅ 左右スワイプ（あてはまる/あてはまらない）
- ✅ 下スワイプ（どちらもあてはまる）
- ✅ ボタン操作
- ✅ カード枠線フィードバック（8px太枠）
- ✅ プログレスバー表示
- ✅ 結果画面スクロール
- ✅ 8次元スコア表示
- ✅ レスポンシブデザイン

---

## 🎉 セッション成果まとめ

### 2025-10-02〜10-04
1. ✅ 6つの異なるアプローチを試作・検証
2. ✅ 原点回帰で本質的な解に到達
3. ✅ スマホ実機で快適に動作するUIを実現
4. ✅ 32個のキーワード + 対極ペアのデータ設計完了
5. ✅ 「あてはまる/あてはまらない/どちらもあてはまる」の3択UI完成

### 2025-10-07
6. ✅ キーワード候補を80個に拡張（CSV）
7. ✅ スコア計算ロジック実装
8. ✅ 8次元創造性プロフィール結果表示完成
9. ✅ UI/UXの細かい調整（14項目）
10. ✅ iPhone実機での動作確認・改善

### 2025-10-16
11. ✅ CSVランダム選出機能実装（80個候補→32個ランダム生成）
12. ✅ デバッグメニュー追加（結果画面に直接ジャンプ）
13. ✅ 結果表示の詳細説明追加（8次元すべてに解説テキスト）
14. ✅ スコアコメント機能実装（レベル別5段階コメント）
15. ✅ UI最終調整（フォントサイズ・レイアウト・pole説明順序）
16. ✅ CSV更新とランダム選出動作確認

---

## 💬 次回への引き継ぎ事項

### すぐできること
- ~~キーワードのランダム選出実装~~ ✅ 完了（2025-10-16）
- 反応時間の測定・記録
- 結果画面のグラフィカル化・アニメーション

### 検討が必要なこと
- 質問数（32問）は適切か？
- 反応時間の活用方法（スコア重み付け？）
- タイプ分類のロジック（8次元スコアからどう導出？）
- ~~結果の解説テキスト内容~~ ✅ 完了（2025-10-16、8次元説明追加）

### 技術的課題
- なし（現時点で安定動作）

### 最新の状態（2025-10-16時点）
- ✅ CSVランダム選出機能完成
- ✅ デバッグ機能完備
- ✅ 結果表示の詳細説明完備
- ✅ UI/UXの調整完了
- 次回はテスト運用・フィードバック収集フェーズへ

---

## 🎨 他の案（アーカイブ・参考用）

### 案1-3: UIパターン検証（完了済み）
- `src/components/ui-pattern-archive/`
- 案1: シンプルYES/NO
- 案2: エンカレッジメント機能
- 案3: 視覚フィードバック

### 案A-D: 質問形式の試行錯誤
- 案A: YES/NO/BOTH（平叙文形式）
- 案B: コンテキスト表記（廃案）
- 案C: 行動ベース（廃案）
- 案D: 両極比較+反転項目

---

**セッション総括:**
水曜15時から金曜15時の48時間でプロトタイプ完成、その後の継続セッションで結果表示・UI改善を完了。試行錯誤を楽しみながら本質に立ち戻る力を発揮し、ユーザーフィードバックに基づいた細やかな調整を実現。AI時代のプロトタイピングの理想形。

**2025-10-16追記:**
CSVランダム選出機能、デバッグメニュー、結果表示の詳細説明を実装完了。キーワード候補80個からのランダム生成により、毎回異なる診断体験が可能に。デバッグ機能により開発効率が大幅向上。結果画面の詳細説明追加により、ユーザーへの価値提供が向上。テスト運用フェーズへ移行準備完了。

---

**最終更新日**: 2025-10-16
**作成者**: tamkai + Claude Code
**次回セッション**: テスト運用・フィードバック収集
