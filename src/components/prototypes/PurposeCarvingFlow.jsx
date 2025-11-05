import { useState } from 'react';
import PurposeCarvingIntro from './PurposeCarvingIntro';
import LifeReflectionPage from './LifeReflectionPage';
import CareerReasonPage from './CareerReasonPage';
import ValueSelectionPage from './ValueSelectionPage';
import { ageRanges } from '../../data/purposeCarvingData';

const PurposeCarvingFlow = ({ onComplete, onSkip }) => {
  const [phase, setPhase] = useState('intro'); // intro, age_0_10, age_11_20, age_21_now, career, values, complete
  const [data, setData] = useState({
    age_0_10: [],
    age_11_20: [],
    age_21_now: [],
    careerReason: '',
    values: []
  });

  // 説明ページから開始
  const handleStart = () => {
    setPhase('age_0_10');
  };

  // Life Reflection完了
  const handleLifeReflectionComplete = (ageRangeId, values) => {
    setData(prev => ({
      ...prev,
      [ageRangeId]: values
    }));

    // 次のフェーズに進む
    if (ageRangeId === 'age_0_10') {
      setPhase('age_11_20');
    } else if (ageRangeId === 'age_11_20') {
      setPhase('age_21_now');
    } else if (ageRangeId === 'age_21_now') {
      setPhase('career');
    }
  };

  // キャリア理由完了
  const handleCareerReasonComplete = (reason) => {
    setData(prev => ({
      ...prev,
      careerReason: reason
    }));
    setPhase('values');
  };

  // 価値観選択完了
  const handleValuesComplete = (values) => {
    const finalData = {
      ...data,
      values
    };
    setData(finalData);

    // 完了画面を表示
    setPhase('complete');
  };

  // 完了画面から診断へ
  const handleProceedToDiagnosis = () => {
    onComplete(data);
  };

  // 戻るボタン（入力内容をクリア）
  const handleBack = () => {
    if (phase === 'age_0_10') {
      setData(prev => ({ ...prev, age_0_10: [] }));
      setPhase('intro');
    } else if (phase === 'age_11_20') {
      setData(prev => ({ ...prev, age_11_20: [] }));
      setPhase('age_0_10');
    } else if (phase === 'age_21_now') {
      setData(prev => ({ ...prev, age_21_now: [] }));
      setPhase('age_11_20');
    } else if (phase === 'career') {
      setData(prev => ({ ...prev, careerReason: '' }));
      setPhase('age_21_now');
    } else if (phase === 'values') {
      setData(prev => ({ ...prev, values: [] }));
      setPhase('career');
    } else if (phase === 'complete') {
      setPhase('values');
    }
  };

  // Intro画面
  if (phase === 'intro') {
    return (
      <PurposeCarvingIntro
        onStart={handleStart}
        onSkip={onSkip}
      />
    );
  }

  // Life Reflection: 0-10歳
  if (phase === 'age_0_10') {
    return (
      <LifeReflectionPage
        ageRange={ageRanges[0]}
        initialValues={data.age_0_10}
        onNext={(values) => handleLifeReflectionComplete('age_0_10', values)}
        onBack={handleBack}
      />
    );
  }

  // Life Reflection: 11-20歳
  if (phase === 'age_11_20') {
    return (
      <LifeReflectionPage
        ageRange={ageRanges[1]}
        initialValues={data.age_11_20}
        onNext={(values) => handleLifeReflectionComplete('age_11_20', values)}
        onBack={handleBack}
      />
    );
  }

  // Life Reflection: 21歳-現在
  if (phase === 'age_21_now') {
    return (
      <LifeReflectionPage
        ageRange={ageRanges[2]}
        initialValues={data.age_21_now}
        onNext={(values) => handleLifeReflectionComplete('age_21_now', values)}
        onBack={handleBack}
      />
    );
  }

  // キャリア選択理由
  if (phase === 'career') {
    return (
      <CareerReasonPage
        initialValue={data.careerReason}
        onNext={handleCareerReasonComplete}
        onBack={handleBack}
      />
    );
  }

  // 価値観選択
  if (phase === 'values') {
    return (
      <ValueSelectionPage
        initialValues={data.values}
        onNext={handleValuesComplete}
        onBack={handleBack}
      />
    );
  }

  // 完了画面
  if (phase === 'complete') {
    return (
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '40px 20px',
        paddingTop: '60px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '40px 30px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          boxSizing: 'border-box',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px'
          }}>
            ✨
          </div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Life Reflection完了！
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            lineHeight: '1.7',
            marginBottom: '30px'
          }}>
            あなたの人生の振り返りが完了しました。<br />
            これらの振り返りをもとに、さらに深い気づきを得ることができます。
          </p>

          {/* データサマリー */}
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '30px',
            textAlign: 'left'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '16px'
            }}>
              あなたの振り返り
            </div>

            {/* 0-10歳 */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                📝 0-10歳 ({data.age_0_10.filter(v => v.trim()).length}項目)
              </div>
              <ul style={{
                listStyle: 'disc',
                paddingLeft: '24px',
                margin: 0,
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                {data.age_0_10.filter(v => v.trim()).map((item, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{item}</li>
                ))}
              </ul>
            </div>

            {/* 11-20歳 */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                📝 11-20歳 ({data.age_11_20.filter(v => v.trim()).length}項目)
              </div>
              <ul style={{
                listStyle: 'disc',
                paddingLeft: '24px',
                margin: 0,
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                {data.age_11_20.filter(v => v.trim()).map((item, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{item}</li>
                ))}
              </ul>
            </div>

            {/* 21歳-現在 */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                📝 21歳-現在 ({data.age_21_now.filter(v => v.trim()).length}項目)
              </div>
              <ul style={{
                listStyle: 'disc',
                paddingLeft: '24px',
                margin: 0,
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                {data.age_21_now.filter(v => v.trim()).map((item, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{item}</li>
                ))}
              </ul>
            </div>

            {/* キャリア理由 */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                💼 キャリア選択理由
              </div>
              <p style={{
                margin: 0,
                paddingLeft: '24px',
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                {data.careerReason}
              </p>
            </div>

            {/* 価値観 */}
            <div>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                💎 大切にしている価値観
              </div>
              <div style={{
                paddingLeft: '24px',
                fontSize: '14px',
                color: '#6b7280'
              }}>
                {data.values.join(', ')}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleBack}
              style={{
                flex: 1,
                padding: '14px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#6b7280',
                backgroundColor: 'transparent',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#9ca3af';
                e.target.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.color = '#6b7280';
              }}
            >
              修正する
            </button>

            <button
              onClick={handleProceedToDiagnosis}
              style={{
                flex: 2,
                padding: '18px',
                fontSize: '18px',
                fontWeight: '700',
                color: 'white',
                backgroundColor: '#3b82f6',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              創造性診断へ進む
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PurposeCarvingFlow;
