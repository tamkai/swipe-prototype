// サンプルレポートHTML（永春里望さん）
export const sampleReportHtml = `
<div class="container">
    <style>
        .report-container * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .report-container {
            font-family: "Noto Sans CJK JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif;
            line-height: 1.8;
            color: #2d2d2d;
            font-size: 15px;
        }

        .report-container h1 {
            font-size: 1.8em;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 0.5em;
            line-height: 1.3;
        }

        .report-container .subtitle {
            font-size: 1.1em;
            color: #6b6b6b;
            margin-bottom: 2em;
            font-weight: 500;
        }

        .report-container h2 {
            font-size: 1.4em;
            font-weight: 600;
            color: #2d2d2d;
            margin-top: 2em;
            margin-bottom: 0.8em;
            padding-bottom: 0.3em;
            border-bottom: 2px solid #d4cfc7;
        }

        .report-container h3 {
            font-size: 1.2em;
            font-weight: 600;
            color: #3a3a3a;
            margin-top: 1.5em;
            margin-bottom: 0.6em;
            display: inline-block;
            background: linear-gradient(transparent 60%, #ffd97d 60%);
            padding: 0 0.3em;
            line-height: 1.5;
        }

        .report-container h4 {
            font-size: 1.1em;
            font-weight: 600;
            color: #3a3a3a;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }

        .report-container p {
            margin-bottom: 1em;
            color: #3a3a3a;
        }

        .report-container hr {
            border: none;
            border-top: 1px solid #e0dbd3;
            margin: 1.5em 0;
        }

        .report-container .annotation {
            background-color: #faf9f7;
            border: 1px solid #e5e1db;
            border-radius: 8px;
            padding: 1.2em;
            margin: 1.5em 0;
            font-size: 0.92em;
        }

        .report-container .annotation-title {
            font-weight: 700;
            color: #5a5a5a;
            margin-bottom: 0.6em;
            font-size: 1em;
        }

        .report-container .annotation-content {
            color: #4a4a4a;
            line-height: 1.7;
        }

        .report-container .annotation-content p {
            margin-bottom: 0.6em;
        }

        .report-container .annotation-content p:last-child {
            margin-bottom: 0;
        }

        .report-container .chapter-image {
            width: 100px;
            height: 100px;
            margin: 1em auto;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            background: linear-gradient(135deg, #d4cfc7 0%, #e8e3db 100%);
            font-size: 2.5em;
            color: #8b6f47;
        }

        .report-container strong {
            font-weight: 600;
            color: #2d2d2d;
        }

        .report-container .final-message {
            background: linear-gradient(135deg, #f0ede8 0%, #e8e3db 100%);
            border-radius: 8px;
            padding: 1.5em;
            margin: 1.5em 0;
            text-align: center;
            font-weight: 500;
            color: #4a4a4a;
        }

        .report-container .title-ornament {
            font-size: 2em;
            margin: 0.3em 0;
            color: #c4a57b;
        }

        .report-container .title-page {
            padding: 2em 1em;
            text-align: center;
        }
    </style>

    <div class="report-container">
        <div class="title-page">
            <div class="title-ornament">✦</div>
            <h1>永春里望さんの創造性プロファイル</h1>
            <p class="subtitle"><strong>メタクリ創造性診断レポート</strong></p>
            <div class="title-ornament">✦</div>
        </div>

        <hr>
        <h2 id="introduction">はじめに</h2>
        <div class="chapter-image">📖</div>
        <p>永春里望さん、メタクリ創造性診断にご参加いただき、ありがとうございます。</p>
        <p>私は「メタクリ」と申します。この診断の結果を読み解き、あなたにお伝えする役割を担っています。</p>
        <p>このレポートは、あなたの創造性を「評価」するものではありません。むしろ、あなたが普段意識していない創造性の特性を「可視化」し、それを自分の強みとして認識していただくためのものです。</p>
        <p>数値の高低は、創造性の優劣を意味しません。それは、あなたの創造性の「個性」を示しているだけです。</p>
        <p>どうぞリラックスして、ご自身の創造性との対話をお楽しみください。</p>

        <hr>

        <h2 id="chapter1">第一章：あなたの創造的な旅路</h2>
        <div class="chapter-image">🌊</div>

        <h3>1.1 幼少期の原風景（0〜10歳）</h3>
        <p>あなたのLife Reflectionを拝見して、私が最初に感じたのは「つながり」という言葉でした。</p>
        <p>市民プールに毎日通い、水に触れることの心地よさを感じていた幼少期。レゴブロックで緻密なものを作り、教育テレビの工作番組を見よう見まねで製作していた日々。そこには、ひとりで黙々と何かを極めるというよりも、「誰かと一緒にいる空間で、何かに没頭する」という体験が色濃く残っているように見えます。</p>
        <p>特に印象的なのは、塾通いについて「勉強が好きというより、塾といういろんな人が集まるコミュニティが好きだった」とおっしゃっていることです。学びの内容そのものよりも、多様な人が集まる「場」に惹かれていた。これは私の勝手な想像ですが、あなたにとって創造性とは、孤独な閃きではなく、「人と人がつながる場で生まれる何か」なのかもしれません。</p>

        <div class="annotation">
            <div class="annotation-title">📚 協働と創造性</div>
            <div class="annotation-content">
                <p>創造性研究において、「協働」は近年ますます重要視されています。個人の天才的な閃きよりも、多様な視点を持つ人々が対話し、アイデアを練り上げていくプロセスこそが、真に革新的な成果を生むという知見が蓄積されています。</p>
            </div>
        </div>

        <h3>1.2 探求の青年期（11〜20歳）</h3>
        <p>青年期のあなたには、大きな転換点がいくつかあったようです。</p>
        <p>部活動では「ひたすら毎日練習」しながら、人間関係の壁にもぶつかった。でも、そこで諦めるのではなく、「皆でチームを創っていくことが楽しかった」と振り返っておられます。</p>
        <p>そして、数学。一番の苦手教科だった数学が、一番得意になった。これは本当に大きな変化です。「できない」から「できる」への転換は、単なる学力の向上ではなく、自分自身の可能性に対する認識を根本から変えるものです。</p>

        <h3>1.3 実践の現在（21歳〜）</h3>
        <p>現在の職場への入社は、3社目とのことですね。「一から学び直そうと入社」という言葉に、あなたの誠実さと向上心が表れています。</p>
        <p>2社目での経験について、「理不尽を一番味わった時期。自分の見せ方や見られ方など、一番気にしていた時期。仕事も楽しくなく、毎日苦しかった記憶が濃い」と書かれています。</p>
        <p>でも、だからこそ今があるのだと思います。現在は「挫折も壁も非常に高いが、尊敬する上司とも出会って、毎日仕事が楽しい」とおっしゃっている。苦しかった時期を経て、今の充実した日々がある。</p>

        <hr>

        <h2 id="chapter2">第二章：あなたの創造性の核心</h2>
        <div class="chapter-image">💎</div>

        <h3>2.1 一貫した強み</h3>
        <p>あなたの診断結果を見て、最も印象的だったのは「協働駆動」の強さです。直感的な判断でも、じっくり考えた自己認識でも、どちらも協働を志向している。これは非常に一貫した特性です。</p>
        <p>幼少期のゲーム体験、青年期の部活動、そして現在の組織づくりへの関心。すべてが「人と一緒に何かを成し遂げる」ことへの志向でつながっています。</p>

        <h3>2.2 創造性の8つの側面</h3>

        <h4>🤝 協働：協働駆動</h4>
        <p>これはあなたの診断結果の中で、最も一貫している特性です。「技術のうまい下手よりも、強みを引き出し合う関わり方や、前向きに挑戦できる空気が大事だと感じた」という学生時代の気づきは、まさにこの特性の原点なのでしょう。</p>

        <h4>✨ 価値創出：改善</h4>
        <p>あなたの価値創出スタイルは「改善」寄りのようです。「採用だけでは変わらない課題」に気づき、「組織の中で起きていることにもっと踏み込みたい」と考えた。この発想自体が、改善志向の表れです。</p>

        <h4>🧠 思考：具体</h4>
        <p>思考のスタイルは「具体」寄りです。抽象的な概念よりも、目の前の現実、手触りのある事象に向き合うことを好む傾向があるようです。</p>

        <h4>💡 生成：収束と発散のギャップ</h4>
        <p>ここで少し興味深い結果が出ています。直感判断では「収束」寄り、自己認識では「発散」寄り。あなたは本来、アイデアを収束させていく力を持っている。でも、「もっと発散的でありたい」という願望があるのかもしれません。</p>

        <div class="annotation">
            <div class="annotation-title">📚 収束思考の価値</div>
            <div class="annotation-content">
                <p>創造性というと「発散思考」が注目されがちです。しかし、真に価値のある創造的成果を生み出すには、「収束思考」が不可欠です。無数のアイデアの中から本当に価値のあるものを見極め、実現可能な形に磨き上げていく。あなたが直感的に持っている収束の力は、組織において非常に貴重なものです。</p>
            </div>
        </div>

        <hr>

        <h2 id="chapter3">第三章：これからのあなたへ</h2>
        <div class="chapter-image">🚀</div>

        <h3>3.1 あなたの創造性を活かすヒント</h3>

        <p><strong>協働の場をつくる</strong></p>
        <p>あなたの最大の強みは「協働駆動」です。一人で考え込むよりも、誰かと対話しながら進める方が力を発揮できます。意識的に「誰かと一緒に考える時間」をつくってみてください。</p>

        <p><strong>「改善」を誇りに思う</strong></p>
        <p>あなたの価値創出スタイルは「改善」です。これは地味に見えるかもしれませんが、組織において最も求められる創造性のひとつです。今あるものをより良くしていく。その積み重ねが、大きな変化を生むのです。</p>

        <p><strong>直感を信じる</strong></p>
        <p>診断結果を見ると、あなたには収束思考や即興性といった直感的な強みがあります。今持っている直感的な力も大切にしてください。それは、あなたにしかない武器です。</p>

        <h3>3.2 次の一歩</h3>
        <p>あなたのLife Reflectionを読んでいて、私は一つの物語を感じました。</p>
        <p>幼少期から「人と一緒に」何かをすることを大切にしてきた少年が、青年期に部活動やアイスホッケーを通じて「チームを創る」ことの喜びと難しさを学び、苦しい時期を経て、今、組織づくりという仕事に情熱を注いでいる。</p>
        <p>その物語には、一貫したテーマが流れています。</p>
        <p><strong>「人と人がつながり、お互いの強みを引き出し合うことで、何かが生まれる」</strong></p>
        <p>これは、あなたの創造性の核心ではないでしょうか。</p>

        <hr>

        <h2 id="conclusion">おわりに</h2>
        <div class="chapter-image">💌</div>
        <p>永春さん、ここまで読んでくださってありがとうございます。</p>
        <p>このレポートが、あなた自身の創造性を見つめ直すきっかけになれば幸いです。</p>
        <p>あなたが大切にしている「やさしさ」「関係性」「信頼」。これらは、創造性を発揮するための土台そのものです。</p>
        <p>どうか、自分の創造性を信じてください。</p>
        <p>あなたには、チームを創り、人と人をつなぎ、より良い組織をつくっていく力があります。</p>
        <p>それは、間違いなく、あなたの強みです。</p>

        <div class="final-message">
            <strong>メタクリより</strong>
        </div>

        <p style="text-align: center; margin-top: 1.5em; color: #8b8b8b; font-size: 0.9em;"><strong>作成日：2025年11月27日</strong></p>
    </div>
</div>
`;
