import { useState, useEffect } from 'react';
import PatternSelector from './components/PatternSelector';
import FourWayCardStack from './components/FourWayCardStack';
import SimpleCardStack from './components/SimpleCardStack';
import VisualFeedbackCardStack from './components/VisualFeedbackCardStack';
import AssessmentStackA from './components/AssessmentStackA';
import AssessmentStackB from './components/AssessmentStackB';
import KeywordSwipeStack from './components/KeywordSwipeStack';
import ResultsDisplay from './components/ResultsDisplay';
import DimensionSlider from './components/DimensionSlider';
import { questions } from './data/questions';
import { assessmentQuestions } from './data/assessmentQuestions';
import { assessmentQuestionsC } from './data/assessmentQuestionsC';
import { assessmentQuestionsD } from './data/assessmentQuestionsD';
import { keywordSwipeData } from './data/keywordSwipeData';
import { generateRandomKeywordSet } from './utils/keywordSelector';
import { generateDummySwipeHistory } from './utils/dummyData';
import './App.css';

function App() {
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [randomKeywords, setRandomKeywords] = useState(keywordSwipeData);
  const [isLoadingKeywords, setIsLoadingKeywords] = useState(false);

  // スワイプモード時にbodyのスクロールを無効化
  useEffect(() => {
    if (selectedPattern && !isComplete && selectedPattern !== 'sliderTest') {
      document.body.classList.add('swipe-active');
    } else {
      document.body.classList.remove('swipe-active');
    }

    return () => {
      document.body.classList.remove('swipe-active');
    };
  }, [selectedPattern, isComplete]);

  const handlePatternSelect = async (patternId) => {
    // デバッグモード: 結果画面に直接飛ぶ
    if (patternId === 'debugResults') {
      const dummyHistory = generateDummySwipeHistory();
      setSwipeHistory(dummyHistory);
      setSelectedPattern('keywordSwipe');
      setIsComplete(true);
      console.log('デバッグモード: ダミーデータで結果表示', dummyHistory);
      return;
    }

    // スライダーテストモード
    if (patternId === 'sliderTest') {
      setSelectedPattern('sliderTest');
      setIsComplete(false);
      return;
    }

    setSelectedPattern(patternId);
    setIsComplete(false);
    setSwipeHistory([]);

    // キーワードスワイプが選択された場合、CSVからランダム生成
    if (patternId === 'keywordSwipe') {
      setIsLoadingKeywords(true);
      try {
        const response = await fetch('/keyword-candidates.csv');
        const csvText = await response.text();
        const newKeywords = generateRandomKeywordSet(csvText, 4);
        setRandomKeywords(newKeywords);
        console.log('ランダム生成されたキーワード:', newKeywords);
      } catch (error) {
        console.error('CSVの読み込みに失敗:', error);
        // エラー時はデフォルトデータを使用
        setRandomKeywords(keywordSwipeData);
      } finally {
        setIsLoadingKeywords(false);
      }
    }
  };

  const handleComplete = (history) => {
    console.log('全ての回答:', history);
    setSwipeHistory(history);
    setIsComplete(true);
  };

  const handleRestart = () => {
    setSelectedPattern(null);
    setIsComplete(false);
    setSwipeHistory([]);
  };

  return (
    <div className={`app ${!selectedPattern ? 'select-mode' : selectedPattern === 'sliderTest' ? 'select-mode' : isComplete && selectedPattern === 'keywordSwipe' ? 'results-mode' : 'swipe-mode'}`}>
      {!selectedPattern ? (
        // パターン選択画面
        <PatternSelector onSelectPattern={handlePatternSelect} />
      ) : selectedPattern === 'sliderTest' ? (
        // スライダーテスト画面
        <div style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '40px 20px',
          gap: '30px',
          paddingBottom: '60px'
        }}>
          <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '800', marginBottom: '20px' }}>
            円形スライダーUIテスト
          </h1>

          <DimensionSlider
            dimension="動機"
            pole_a="目的整合"
            keyword_a="冷静な判断"
            pole_b="内発"
            keyword_b="情熱の勢い"
            value={0.7}
            onChange={(value) => console.log('動機:', value)}
            showDescription={true}
            description={`動機は、物事を始めるときに何があなたを動かすかを示す軸です。

目的整合タイプは、目標や期待に応えることを重視し、冷静に判断してから行動します。戦略的で、社会貢献や役割を意識する傾向があります。

内発タイプは、自分の中から湧き上がる情熱や好奇心を大切にし、ワクワクする気持ちを優先します。直感的で、興味関心や楽しさを追求する傾向があります。`}
          />

          <button
            onClick={handleRestart}
            style={{
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: '700',
              backgroundColor: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              marginTop: '20px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          >
            ← パターン選択に戻る
          </button>
        </div>
      ) : isComplete ? (
        // 完了画面 - キーワードスワイプの場合は結果表示、それ以外は従来の完了画面
        selectedPattern === 'keywordSwipe' ? (
          <div style={{ width: '100%', overflowY: 'auto', maxHeight: '100vh' }}>
            <ResultsDisplay swipeHistory={swipeHistory} onRestart={handleRestart} />
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '48px' }}>🎉</div>
            <h2 style={{ fontSize: '32px', fontWeight: '800' }}>
              テスト完了！
            </h2>
            <p style={{ fontSize: '18px', opacity: 0.9 }}>
              {selectedPattern === 'assessmentA' || selectedPattern === 'assessmentB'
                ? assessmentQuestions.length
                : selectedPattern === 'assessmentC'
                ? assessmentQuestionsC.length
                : selectedPattern === 'assessmentD'
                ? assessmentQuestionsD.length
                : questions.length}問すべて回答しました
            </p>
            <button
              onClick={handleRestart}
              style={{
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '700',
                backgroundColor: 'white',
                color: '#667eea',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                marginTop: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              別のパターンを試す
            </button>
          </div>
        )
      ) : (
        // スワイプ画面
        <>
          {selectedPattern !== 'pattern1' && selectedPattern !== 'pattern2' && selectedPattern !== 'pattern3' && selectedPattern !== 'assessmentA' && selectedPattern !== 'assessmentB' && selectedPattern !== 'assessmentC' && selectedPattern !== 'assessmentD' && selectedPattern !== 'keywordSwipe' && (
            <div className="header">
              <h1>4方向スワイプテスト</h1>
              <p>← A | → B | ↑ 両方 | ↓ スキップ</p>
            </div>
          )}

          <div className="card-container">
            {selectedPattern === 'pattern1' || selectedPattern === 'pattern2' ? (
              <SimpleCardStack
                questions={questions}
                onComplete={handleComplete}
                showEncouragement={selectedPattern === 'pattern2'}
              />
            ) : selectedPattern === 'pattern3' ? (
              <VisualFeedbackCardStack
                questions={questions}
                onComplete={handleComplete}
              />
            ) : selectedPattern === 'assessmentA' ? (
              <AssessmentStackA
                questions={assessmentQuestions}
                onComplete={handleComplete}
              />
            ) : selectedPattern === 'assessmentB' ? (
              <AssessmentStackB
                questions={assessmentQuestions}
                onComplete={handleComplete}
              />
            ) : selectedPattern === 'assessmentC' ? (
              <AssessmentStackA
                questions={assessmentQuestionsC}
                onComplete={handleComplete}
              />
            ) : selectedPattern === 'assessmentD' ? (
              <AssessmentStackA
                questions={assessmentQuestionsD}
                onComplete={handleComplete}
              />
            ) : selectedPattern === 'keywordSwipe' ? (
              isLoadingKeywords ? (
                <div style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  キーワードを生成中...
                </div>
              ) : (
                <KeywordSwipeStack
                  keywords={randomKeywords}
                  onComplete={handleComplete}
                />
              )
            ) : (
              <FourWayCardStack
                questions={questions}
                pattern={selectedPattern}
                onComplete={handleComplete}
              />
            )}
          </div>

          <button
            onClick={handleRestart}
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '600',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '12px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)'
            }}
          >
            ← 戻る
          </button>
        </>
      )}
    </div>
  );
}

export default App;
