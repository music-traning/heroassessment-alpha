'use client';

import { Card, Title, Text, Button, Grid, Icon } from '@tremor/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PricingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ヘッダーセクション */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            組織のポテンシャルを最大化する
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            HEROアセスメントの結果をAIが深く分析し、具体的な組織開発の打ち手を提案。
            プレミアムプランで、データに基づく次世代のHRマネジメントを実現しましょう。
          </p>
        </div>

        {/* 料金プランのカード */}
        <Grid numItemsSm={1} numItemsLg={2} className="gap-8 max-w-5xl mx-auto">
          
          {/* フリープラン */}
          <Card className="flex flex-col justify-between border-t-4 border-slate-300">
            <div>
              <Title className="text-xl font-bold text-slate-800 mb-2">フリープラン</Title>
              <Text className="mb-6">まずは自社の状態を可視化したい企業様向け</Text>
              <div className="text-3xl font-bold text-slate-900 mb-8">無料</div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                  <span className="text-slate-700">無制限の従業員アセスメント実施</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                  <span className="text-slate-700">HEROスコアの基本グラフ表示</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                  <span className="text-slate-700">従業員ごとの基本結果一覧</span>
                </li>
                <li className="flex items-center gap-3 opacity-50">
                  <XCircleIcon className="w-6 h-6 text-slate-300" />
                  <span className="text-slate-500 line-through">AIによる組織シナジー分析</span>
                </li>
                <li className="flex items-center gap-3 opacity-50">
                  <XCircleIcon className="w-6 h-6 text-slate-300" />
                  <span className="text-slate-500 line-through">具体的なアクションプランの自動生成</span>
                </li>
              </ul>
            </div>
            <Button variant="secondary" className="w-full" onClick={() => router.push('/dashboard')}>
              ダッシュボードへ戻る
            </Button>
          </Card>

          {/* プレミアムプラン */}
          <Card className="flex flex-col justify-between border-t-4 border-fuchsia-500 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              おすすめ
            </div>
            <div>
              <Title className="text-xl font-bold text-fuchsia-700 mb-2">プレミアムプラン</Title>
              <Text className="mb-6">データから具体的な改善策を導き出したい企業様向け</Text>
              <div className="text-3xl font-bold text-slate-900 mb-2">お見積り</div>
              <Text className="text-sm text-slate-500 mb-8">※従業員規模に応じた最適なプランをご提案します</Text>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                  <span className="text-slate-700 font-medium">フリープランの全機能</span>
                </li>
                <li className="flex items-center gap-3 bg-fuchsia-50 p-2 rounded-md">
                  <span className="text-xl">✨</span>
                  <span className="text-fuchsia-900 font-bold">Gemini AIによる高度な組織分析</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                  <span className="text-slate-700">部署ごとの傾向比較と課題抽出</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                  <span className="text-slate-700">優先的に取り組むべきアクションプラン提示</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                  <span className="text-slate-700">人間を介さない、24時間稼働のAIコンサルティング</span>
                </li>
              </ul>
            </div>
            <Button 
              color="fuchsia" 
              className="w-full py-3 text-lg"
              onClick={() => {
                // 💡 ここに実際の問い合わせフォーム（Googleフォームなど）のURLを設定します
                window.open('https://docs.google.com/forms/d/e/1FAIpQLSfGxvcQH3507k3s2XQbudZRZwTREmobBx51aUPtSQmEhc8IPA/viewform', '_blank');
              }}
            >
              無料相談・お見積りを依頼する
            </Button>
          </Card>

        </Grid>


        <div className="mt-12 text-center">
          <Link href="/dashboard" className="text-sm text-slate-500 hover:text-blue-600 underline">
            ← ダッシュボードに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}