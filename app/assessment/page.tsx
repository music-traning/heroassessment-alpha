'use client';

import { useState } from 'react';
import { Card, Title, Button, Select, SelectItem, TextInput } from '@tremor/react';

// 画面の状態を管理するための型定義
type ScreenState = 'home' | 'entry' | 'quiz' | 'result';

export default function AssessmentPage() {
  // どの画面を表示するかを管理するState
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('home');

  // --- 各画面のレンダリング関数 ---

  // 1. ホーム画面
  const renderHome = () => (
    <Card className="max-w-2xl mx-auto mt-10 p-8">
      <Title className="text-2xl font-bold text-center mb-2">心理的資本アセスメント</Title>
      <p className="text-center text-slate-500 mb-8">HEROに基づく組織レジリエンス及びコンピテンシー診断</p>
      
      <div className="space-y-4">
        <Button className="w-full" variant="secondary" onClick={() => setCurrentScreen('entry')}>
          簡易診断 (12問)
        </Button>
        <Button className="w-full" variant="secondary" onClick={() => setCurrentScreen('entry')}>
          標準診断 (28問)
        </Button>
      </div>
    </Card>
  );

  // 2. 受診者情報入力画面
  const renderEntry = () => (
    <Card className="max-w-2xl mx-auto mt-10 p-8">
      <Title className="text-xl font-bold mb-6">受診者情報の入力</Title>
      
      <div className="space-y-4 mb-8">
        <div>
          <label className="text-sm font-medium text-slate-700">企業コード</label>
          <TextInput placeholder="例: COMP-A" className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">社員番号 または 氏名</label>
          <TextInput placeholder="例: EMP-001 / 山田太郎" className="mt-1" />
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="light" onClick={() => setCurrentScreen('home')} className="w-1/3">
          戻る
        </Button>
        <Button onClick={() => setCurrentScreen('quiz')} className="w-2/3">
          同意して診断を開始する
        </Button>
      </div>
    </Card>
  );

  // 3. 診断（クイズ）画面
  const renderQuiz = () => (
    <Card className="max-w-2xl mx-auto mt-10 p-8">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-slate-500">設問 1 / 12</span>
        <Button variant="light" color="red" onClick={() => setCurrentScreen('home')}>中断</Button>
      </div>
      
      <div className="mb-8 p-6 bg-slate-50 rounded-lg border">
        <p className="text-lg text-slate-800">ここに質問文が表示されます。</p>
      </div>

      <div className="space-y-3 mb-8">
        {/* 選択肢のモック */}
        <Button variant="secondary" className="w-full justify-start">1. 全く当てはまらない</Button>
        <Button variant="secondary" className="w-full justify-start">2. あまり当てはまらない</Button>
        <Button variant="secondary" className="w-full justify-start">3. どちらともいえない</Button>
        <Button variant="secondary" className="w-full justify-start">4. やや当てはまる</Button>
        <Button variant="secondary" className="w-full justify-start">5. 非常に当てはまる</Button>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setCurrentScreen('result')}>次へ（テスト用スキップ）</Button>
      </div>
    </Card>
  );

  // 4. 結果画面
  const renderResult = () => (
    <Card className="max-w-2xl mx-auto mt-10 p-8">
      <Title className="text-2xl font-bold text-center mb-6">診断結果</Title>
      <div className="text-center mb-8">
        <span className="text-4xl font-bold text-blue-600">HHHH</span>
        <p className="text-lg mt-2 font-medium">自律型ハイパフォーマー</p>
      </div>
      <Button className="w-full mt-8" onClick={() => setCurrentScreen('home')}>
        ホームに戻る
      </Button>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      {currentScreen === 'home' && renderHome()}
      {currentScreen === 'entry' && renderEntry()}
      {currentScreen === 'quiz' && renderQuiz()}
      {currentScreen === 'result' && renderResult()}
    </div>
  );
}