import { useState, useEffect } from 'react';
// Prototypes (試作用)
import PatternSelector from './components/prototypes/PatternSelector';
import FourWayCardStack from './components/prototypes/FourWayCardStack';
import SimpleCardStack from './components/prototypes/SimpleCardStack';
import VisualFeedbackCardStack from './components/prototypes/VisualFeedbackCardStack';
import AssessmentStackA from './components/prototypes/AssessmentStackA';
import AssessmentStackB from './components/prototypes/AssessmentStackB';
import PurposeCarvingFlow from './components/prototypes/PurposeCarvingFlow';
// Production (本番用)
import KeywordSwipeStack from './components/production/KeywordSwipeStack';
import ResultsDisplay from './components/production/ResultsDisplay';
import DimensionSlider from './components/production/DimensionSlider';
import CreativeCompassResults from './components/production/CreativeCompassResults';
import Type2DiagnosisFlow from './components/production/Type2DiagnosisFlow';
import IntegratedDiagnosisFlow from './components/production/IntegratedDiagnosisFlow';
// Admin (管理画面)
import AdminDashboard from './components/admin/AdminDashboard';
import { questions } from './data/questions';
import { assessmentQuestions } from './data/assessmentQuestions';
import { assessmentQuestionsC } from './data/assessmentQuestionsC';
import { assessmentQuestionsD } from './data/assessmentQuestionsD';
import { keywordSwipeData } from './data/keywordSwipeData';
import { dimensionsData } from './data/dimensionsData';
import { generateRandomKeywordSet } from './utils/keywordSelector';
import { generateDummySwipeHistory } from './utils/dummyData';
import './App.css';

function App() {
  // ルーティング（簡易版）
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // 管理画面へのルーティング
  if (currentRoute === '/admin') {
    return <AdminDashboard />;
  }

  const [selectedPattern, setSelectedPattern] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [type2Results, setType2Results] = useState(null);
  const [randomKeywords, setRandomKeywords] = useState(keywordSwipeData);
  const [isLoadingKeywords, setIsLoadingKeywords] = useState(false);

  // スワイプモード時にbodyのスクロールを無効化
  useEffect(() => {
    if (selectedPattern && !isComplete &&
        selectedPattern !== 'sliderTest' &&
        selectedPattern !== 'resultsTest' &&
        selectedPattern !== 'type2Diagnosis' &&
        selectedPattern !== 'integratedDiagnosis' &&
        selectedPattern !== 'purposeCarving' &&
        selectedPattern !== 'debugMenu') {
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

    // 結果画面テストモード
    if (patternId === 'resultsTest') {
      setSelectedPattern('resultsTest');
      setIsComplete(false);
      return;
    }

    // 管理画面モード
    if (patternId === 'admin') {
      window.history.pushState({}, '', '/admin');
      setCurrentRoute('/admin');
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
    setType2Results(null);
  };

  const handleType2Complete = (results) => {
    console.log('タイプ2診断結果:', results);
    setType2Results(results);
    setIsComplete(true);
  };

  return (
    <div className={`app ${!selectedPattern ? 'select-mode' : selectedPattern === 'sliderTest' || selectedPattern === 'resultsTest' || selectedPattern === 'type2Diagnosis' || selectedPattern === 'integratedDiagnosis' || selectedPattern === 'debugMenu' ? 'select-mode' : isComplete && selectedPattern === 'keywordSwipe' ? 'results-mode' : 'swipe-mode'}`}>
      {!selectedPattern ? (
        // 統合診断フロー（デフォルトのトップページ）
        <IntegratedDiagnosisFlow
          onBack={() => setSelectedPattern('debugMenu')}
        />
      ) : selectedPattern === 'debugMenu' ? (
        // デバッグメニュー（旧パターン選択画面）
        <PatternSelector onSelectPattern={handlePatternSelect} />
      ) : selectedPattern === 'resultsTest' ? (
        // 結果画面テスト
        <CreativeCompassResults
          results={{
            motivation: 0.25,   // タイプ1: 目的整合寄り
            generation: 0.75,   // タイプ1: 発散寄り
            progress: 0.5,      // タイプ1: 中間（完全一致）
            value: 0.25,        // タイプ1: 改善寄り
            expression: 0.8,    // タイプ1: 自己表現寄り
            thinking: 0.45,     // タイプ1: 中間
            execution: 1.0,     // タイプ1: 即興寄り（右端）
            collaboration: 0.0  // タイプ1: 協働駆動寄り（左端）
          }}
          results2={{
            motivation: 0.68,   // タイプ2: 内発寄り（ギャップ大・アナログ）
            generation: 0.82,   // タイプ2: 発散寄り（近い・アナログ）
            progress: 0.51,     // タイプ2: 中間（微妙にずれ・メタ認知トリガー）
            value: 0.63,        // タイプ2: 発明寄り（ギャップ大・アナログ）
            expression: 0.37,   // タイプ2: 共感価値寄り（ギャップ大・アナログ）
            thinking: 0.45,     // タイプ2: 具体寄り（完全一致・更新）
            execution: 1.0,     // タイプ2: 即興寄り（右端）
            collaboration: 0.0  // タイプ2: 単独集中寄り（左端）
          }}
          onRestart={handleRestart}
        />
      ) : selectedPattern === 'integratedDiagnosis' ? (
        // 統合診断フロー（タイプ1→タイプ2→統合結果）
        <IntegratedDiagnosisFlow
          onBack={handleRestart}
        />
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
          <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '800', marginBottom: '20px', textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
            円形スライダーUIテスト
          </h1>

          <DimensionSlider
            dimension={dimensionsData[0].dimension}
            pole_a={dimensionsData[0].pole_a}
            keywords_a={dimensionsData[0].keywords_a}
            pole_b={dimensionsData[0].pole_b}
            keywords_b={dimensionsData[0].keywords_b}
            value={0.5}
            onChange={(value) => console.log('動機:', value)}
            showDescription={true}
            description={dimensionsData[0].description}
          />

          <button
            onClick={handleRestart}
            style={{
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: '700',
              backgroundColor: 'white',
              color: '#374151',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              marginTop: '20px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}
          >
            ← パターン選択に戻る
          </button>
        </div>
      ) : selectedPattern === 'type2Diagnosis' ? (
        // タイプ2診断フロー
        isComplete ? (
          // 診断完了後は結果表示（タイプ2のみ、自己認識マーカー表示）
          <div style={{ width: '100%', overflowY: 'auto', maxHeight: '100vh' }}>
            <CreativeCompassResults
              results={{}}
              results2={type2Results}
              onRestart={handleRestart}
            />
          </div>
        ) : (
          <Type2DiagnosisFlow
            onComplete={handleType2Complete}
            onBack={handleRestart}
          />
        )
      ) : selectedPattern === 'purposeCarving' ? (
        // Purpose Carving Flow
        isComplete ? (
          <div style={{
            textAlign: 'center',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '48px' }}>✨</div>
            <h2 style={{ fontSize: '32px', fontWeight: '800' }}>
              Life Reflection完了！
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)' }}>
              あなたの人生の振り返りが完了しました
            </p>
            <button
              onClick={handleRestart}
              style={{
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '700',
                backgroundColor: 'white',
                color: '#374151',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                marginTop: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            >
              パターン選択に戻る
            </button>
          </div>
        ) : (
          <PurposeCarvingFlow
            onComplete={(data) => {
              console.log('Purpose Carving完了:', data);
              setIsComplete(true);
            }}
            onSkip={() => {
              console.log('Purpose Carvingスキップ');
              setIsComplete(true);
            }}
          />
        )
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
            <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)' }}>
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
                color: '#374151',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                marginTop: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
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
