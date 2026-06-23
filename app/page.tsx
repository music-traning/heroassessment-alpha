'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, Title, Button, TextInput } from '@tremor/react';
import { heroData, calculateScore } from '@/utils/heroData';
import { useSearchParams } from 'next/navigation';
type ScreenState = 'home' | 'entry' | 'quiz' | 'result';

export default function AssessmentPage() {
  const searchParams = useSearchParams();
  const cid = searchParams.get('cid');
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('home');
  
  const [tier, setTier] = useState(1);
  const [empInfo, setEmpInfo] = useState({ companyId: '', employeeId: '', department: '', role: '' });
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [resultData, setResultData] = useState<any>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [entryError, setEntryError] = useState('');

  const startEntry = (selectedTier: number) => {
    setTier(selectedTier);
    setCurrentScreen('entry');
    setEntryError(''); 
  };

  // 企業が存在するかAPIでチェックしてからクイズに進む（通常ルート）
  const startQuiz = async () => {
    setEntryError('');

    if (!empInfo.companyId || !empInfo.employeeId) {
      setEntryError("企業コードと社員番号は必須です");
      return;
    }

    setIsChecking(true);

    try {
      const response = await fetch('/api/check-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId: empInfo.companyId })
      });

      const data = await response.json();

      if (data.exists) {
        const targetQuestions = heroData.questions.filter((q: any) => q.tier <= tier);
        setQuestions(targetQuestions);
        setCurrentIdx(0);
        setAnswers({});
        setCurrentScreen('quiz');
      } else {
        setEntryError('入力された企業コードは登録されていません。');
      }
    } catch (error) {
      setEntryError('通信エラーが発生しました。');
    } finally {
      setIsChecking(false);
    }
  };

  // 💡 追加: 企業チェックAPIをスキップする「ゲスト専用ルート」
  const startGuestQuiz = () => {
    // ゲスト用のダミー情報をセット
    setEmpInfo({
      companyId: 'GUEST_TRIAL',
      employeeId: 'お試しゲスト_' + Math.floor(Math.random() * 1000),
      department: 'ゲスト',
      role: 'ゲスト'
    });
    
    // API通信をせずに、直接クイズ画面へ進む
    const targetQuestions = heroData.questions.filter((q: any) => q.tier <= tier);
    setQuestions(targetQuestions);
    setCurrentIdx(0);
    setAnswers({});
    setCurrentScreen('quiz');
  };

  const handleAnswer = (qId: string, value: number) => {
    setAnswers({ ...answers, [qId]: value });
  };

  const goNext = async () => {
    const currentQ = questions[currentIdx];
    if (!answers[currentQ.id]) {
      alert("回答を選択してください");
      return;
    }

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsSaving(true);
      const { typeStr, percentages } = calculateScore(questions, answers);
      
      try {
        await fetch('/api/save-result', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyId: empInfo.companyId,
            employeeId: empInfo.employeeId,
            department: empInfo.department || '未設定',
            role: empInfo.role || '未設定',
            type: typeStr,
            tier: tier,
            percentages: percentages
          })
        });
        
        setResultData({ typeStr, percentages });
        setCurrentScreen('result');
      } catch (err) {
        alert("データの保存に失敗しました");
      }
      setIsSaving(false);
    }
  };

  const renderHome = () => (
    <Card className="max-w-2xl mx-auto mt-10 p-8">
      <Title className="text-2xl font-bold text-center mb-2">心理的資本アセスメント</Title>
      <p className="text-center text-slate-500 mb-8">HEROに基づく組織レジリエンス及びコンピテンシー診断</p>
      <div className="space-y-4">
        <Button className="w-full" variant="secondary" onClick={() => startEntry(1)}>簡易診断 (12問)</Button>
        <Button className="w-full" variant="secondary" onClick={() => startEntry(2)}>標準診断 (28問)</Button>
        <Button className="w-full" variant="secondary" onClick={() => startEntry(3)}>精密診断 (48問)</Button>
      </div>
      <div className="mt-12 pt-6 border-t border-slate-200 text-center">
        <Link 
          href="/login" 
          className="text-sm text-slate-400 hover:text-blue-600 underline underline-offset-4 inline-block"
        >
        法人管理者用ダッシュボードはこちら
        </Link>
      </div>
    </Card>
  );

  const renderEntry = () => (
    <Card className="max-w-2xl mx-auto mt-10 p-8 border-t-4 border-blue-500 shadow-lg">
      <Title className="text-xl font-bold mb-6 text-slate-800">受診者情報の入力</Title>
      <div className="space-y-4 mb-8">
        <div>
          <label className="text-sm font-medium text-slate-700">企業コード *</label>
          <TextInput 
            placeholder="例: COMP-A" className="mt-1"
            value={empInfo.companyId} onChange={(e) => setEmpInfo({...empInfo, companyId: e.target.value})}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">社員番号 または 氏名 *</label>
          <TextInput 
            placeholder="例: EMP-001 / 山田太郎" className="mt-1"
            value={empInfo.employeeId} onChange={(e) => setEmpInfo({...empInfo, employeeId: e.target.value})}
          />
        </div>
      </div>
      
      {entryError && (
        <p className="text-red-500 text-sm font-bold mb-4 bg-red-50 p-3 rounded">{entryError}</p>
      )}

      <div className="flex gap-4">
        <Button variant="light" onClick={() => setCurrentScreen('home')} className="w-1/3">戻る</Button>
        <Button 
          onClick={startQuiz} 
          className="w-2/3"
          loading={isChecking}
          disabled={!empInfo.companyId || !empInfo.employeeId || isChecking}
        >
          {isChecking ? '確認中...' : '同意して診断を開始する'}
        </Button>
      </div>

      {/* 💡 追加：個人お試し用ルート */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-slate-500 font-medium tracking-wide">または</span>
        </div>
      </div>

      <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
        <p className="text-sm text-slate-600 mb-4 font-bold">
          企業コードをお持ちでない個人の方・まずはお試ししたい方
        </p>
        <Button
          variant="secondary"
          className="w-full bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
          onClick={startGuestQuiz}
        >
          無料でお試し診断をする
        </Button>
      </div>
    </Card>
  );

  const renderQuiz = () => {
    if (questions.length === 0) return null;
    const q = questions[currentIdx];

    return (
      <Card className="max-w-2xl mx-auto mt-10 p-8">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-slate-500">設問 {currentIdx + 1} / {questions.length}</span>
          <Button variant="light" color="red" onClick={() => setCurrentScreen('home')}>中断</Button>
        </div>
        
        <div className="mb-8 p-6 bg-slate-50 rounded-lg border">
          <p className="text-lg text-slate-800 font-medium">{q?.text?.ja || q?.text}</p>
        </div>

        <div className="space-y-3 mb-8">
          {heroData.app_config.scale.map((scale: any) => (
            <Button 
              key={scale.value}
              variant={answers[q?.id] === scale.value ? "primary" : "secondary"}
              className="w-full justify-start"
              onClick={() => handleAnswer(q?.id, scale.value)}
            >
              {scale.label?.ja || scale.label}
            </Button>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="light" onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))} disabled={currentIdx === 0}>戻る</Button>
          <Button onClick={goNext} loading={isSaving}>
            {currentIdx === questions.length - 1 ? '結果を解析する' : '次へ'}
          </Button>
        </div>
      </Card>
    );
  };

  const renderResult = () => {
    if (!resultData) return null;
    // @ts-ignore
    const typeInfo = heroData.types[resultData.typeStr] || { title: { ja: '不明なタイプ' }, profile: { ja: '' }, action_plan: { ja: '' } };

    return (
      <Card className="max-w-2xl mx-auto mt-10 p-8">
        <div className="text-center mb-6 text-sm font-bold text-blue-600">Class: {resultData.typeStr}</div>
        <Title className="text-2xl font-bold text-center mb-6">{typeInfo.title?.ja || typeInfo.title}</Title>
        
        <div className="bg-slate-50 p-6 rounded-lg mb-6 text-sm leading-relaxed text-slate-700">
          {typeInfo.profile?.ja || typeInfo.profile}
        </div>
        
        <div className="border p-6 rounded-lg mb-8">
          <strong className="block mb-2 text-blue-700">■ アクションプラン</strong>
          <p className="text-sm text-slate-700">{typeInfo.action_plan?.ja || typeInfo.action_plan}</p>
        </div>

        <Button className="w-full" onClick={() => setCurrentScreen('home')}>
          ホームに戻る
        </Button>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      {currentScreen === 'home' && renderHome()}
      {currentScreen === 'entry' && renderEntry()}
      {currentScreen === 'quiz' && renderQuiz()}
      {currentScreen === 'result' && renderResult()}
    </div>
  );
}