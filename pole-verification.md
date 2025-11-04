# 8軸のPole定義検証レポート

## 検証方法
1. **dimensionsData.js**: UIで表示される定義（pole_a=左, pole_b=右）
2. **scoreCalculator.js**: スコア計算に使われる定義（pole_a=正のスコア→1.0に近い→右側）
3. **期待される動作**: scoreCalculatorのpole_aとpole_bは、dimensionsDataのpole_bとpole_aを逆にしたものであるべき

---

## 1. 動機（Motivation）

### dimensionsData.js
- pole_a: '目的整合' （左側）
- pole_b: '内発' （右側）

### scoreCalculator.js
- pole_a: '内発' （右側に対応）✅
- pole_b: '目的整合' （左側に対応）✅

### 検証結果: ✅ **正常**
- 「内発」を選ぶ → スコア+1 → 1.0に近い → 右側表示（内発）

---

## 2. 生成（Generation）

### dimensionsData.js
- pole_a: '収束' （左側）
- pole_b: '発散' （右側）

### scoreCalculator.js
- pole_a: '発散' （右側に対応）✅
- pole_b: '収束' （左側に対応）✅

### 検証結果: ✅ **正常**
- 「発散」を選ぶ → スコア+1 → 1.0に近い → 右側表示（発散）

---

## 3. 進行（Progress）

### dimensionsData.js
- pole_a: '粘り' （左側）
- pole_b: '柔軟' （右側）

### scoreCalculator.js
- pole_a: '柔軟' （右側に対応）✅
- pole_b: '粘り' （左側に対応）✅

### 検証結果: ✅ **正常**
- 「柔軟」を選ぶ → スコア+1 → 1.0に近い → 右側表示（柔軟）

---

## 4. 価値創出（Value）⚠️

### dimensionsData.js
- pole_a: '改善' （左側）
- pole_b: '発明' （右側）

### scoreCalculator.js（修正前）
- ❌ pole_a: '改善' （左側に対応）← **バグ！**
- ❌ pole_b: '発明' （右側に対応）← **バグ！**

### scoreCalculator.js（修正後）
- ✅ pole_a: '発明' （右側に対応）
- ✅ pole_b: '改善' （左側に対応）

### 検証結果: ✅ **修正完了**
- 「発明」を選ぶ → スコア+1 → 1.0に近い → 右側表示（発明）

---

## 5. 表現（Expression）

### dimensionsData.js
- pole_a: '共感価値' （左側）
- pole_b: '自己表現' （右側）

### scoreCalculator.js
- pole_a: '自己表現' （右側に対応）✅
- pole_b: '共感価値' （左側に対応）✅

### 検証結果: ✅ **正常**
- 「自己表現」を選ぶ → スコア+1 → 1.0に近い → 右側表示（自己表現）

---

## 6. 思考（Thinking）

### dimensionsData.js
- pole_a: '具体' （左側）
- pole_b: '抽象' （右側）

### scoreCalculator.js
- pole_a: '抽象' （右側に対応）✅
- pole_b: '具体' （左側に対応）✅

### 検証結果: ✅ **正常**
- 「抽象」を選ぶ → スコア+1 → 1.0に近い → 右側表示（抽象）

---

## 7. 実行（Execution）

### dimensionsData.js
- pole_a: '設計' （左側）
- pole_b: '即興' （右側）

### scoreCalculator.js
- pole_a: '即興' （右側に対応）✅
- pole_b: '設計' （左側に対応）✅

### 検証結果: ✅ **正常**
- 「即興」を選ぶ → スコア+1 → 1.0に近い → 右側表示（即興）

---

## 8. 協働（Collaboration）

### dimensionsData.js
- pole_a: '協働駆動' （左側）
- pole_b: '単独集中' （右側）

### scoreCalculator.js
- pole_a: '単独集中' （右側に対応）✅
- pole_b: '協働駆動' （左側に対応）✅

### 検証結果: ✅ **正常**
- 「単独集中」を選ぶ → スコア+1 → 1.0に近い → 右側表示（単独集中）

---

## 総合結論

### ✅ **修正完了: 1軸**
- **価値創出**: pole_aとpole_bが逆だったが修正済み

### ✅ **正常動作: 7軸**
- 動機、生成、進行、表現、思考、実行、協働

### 設計の仕組み
スコア計算では、**scoreCalculator.jsのpole定義はdimensionsData.jsと逆転している**のが正しい設計：
- dimensionsData.js: UI表示用（pole_a=左、pole_b=右）
- scoreCalculator.js: 計算用（pole_a=右側にマップ、pole_b=左側にマップ）
- 理由: スコア計算で`pole_a`への一致は`+1`（正の値）となり、正規化時に`(score + 4) / 8`で1.0に近づく（右側）

### 今回のバグの原因
価値創出だけが**逆転していなかった**（つまり他の軸と異なる定義になっていた）ため、計算結果が逆になっていた。
