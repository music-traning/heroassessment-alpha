'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/utils/supabase';
import { Card, Title, TextInput, Button, Text } from '@tremor/react';
import { useRouter } from 'next/navigation';

function SettingsContent() {
  const router = useRouter();
  const [companyCode, setCompanyCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState({ text: '', isError: false });

  useEffect(() => {
    // ログインチェック
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin-login'); 
      }
      setIsFetching(false);
    };
    checkUser();
  }, [router]);

const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', isError: false });

    try {
      // 💡 修正: 直接Supabaseを叩くのではなく、自分たちで作った安全なAPIにデータを送信する
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          companyCode: companyCode, 
          companyName: companyName 
        }),
      });

      const data = await response.json();

      // APIからエラーが返ってきた場合の処理
      if (!response.ok) {
        throw new Error(data.error || "登録に失敗しました");
      }

      // 成功時の処理
      setMessage({ text: '企業コードの登録が完了しました！従業員に共有してください。', isError: false });
      
    } catch (error: any) {
      setMessage({ text: error.message, isError: true });
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) return <div className="min-h-screen flex items-center justify-center bg-slate-50">読み込み中...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto animate-fade-in space-y-8">
        
        <div className="flex justify-between items-center border-b pb-4">
          <Title className="text-2xl font-bold text-slate-800">⚙️ 企業コード設定</Title>
          <Button variant="light" onClick={() => router.push('/dashboard')}>
            ← ダッシュボードに戻る
          </Button>
        </div>

        {/* 登録フォームセクション */}
        <Card>
          <Text className="mb-6 leading-relaxed">
            従業員がアセスメントを受診する際に入力する「企業コード」を作成します。
            ここで登録したコードを、受診対象の従業員へ共有してください。
          </Text>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">企業コード（必須）</label>
              <TextInput 
                placeholder="例: COMP-A （半角英数字で自由に決定）" 
                value={companyCode} 
                onChange={(e) => setCompanyCode(e.target.value)}
                required
              />
              <Text className="text-xs text-slate-500 mt-1">※このコードが受診時の認証キー（パスワード代わり）になります。</Text>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">企業名（任意）</label>
              <TextInput 
                placeholder="例: 株式会社HERO" 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            {/* メッセージ表示エリア */}
            {message.text && (
              <div className={`p-4 rounded-md text-sm font-bold ${message.isError ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                {message.text}
              </div>
            )}

            <Button type="submit" className="w-full h-12 text-base" loading={loading} disabled={!companyCode}>
              この企業コードを登録する
            </Button>
          </form>
        </Card>

        {/* 💡 ここから下が追加したヘルプ＆Tipsセクションです */}
        <div className="space-y-4 pt-4">
          <Title className="text-xl font-bold text-slate-800">📖 今後の使い方と運用ガイド</Title>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-blue-100 p-5">
              <div className="text-blue-900 font-bold mb-2 flex items-center gap-2">
                <span className="bg-blue-200 text-blue-900 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                社員へ共有する
              </div>
              <Text className="text-sm text-blue-800 leading-relaxed">
                作成した「企業コード」と受診用ページのURLを、対象の従業員にメールやチャットで共有してください。
              </Text>
            </Card>

            <Card className="bg-indigo-50 border-indigo-100 p-5">
              <div className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
                <span className="bg-indigo-200 text-indigo-900 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                従業員が受診する
              </div>
              <Text className="text-sm text-indigo-800 leading-relaxed">
                従業員が各自でアカウントを作成し、初回受診時に企業コードを入力すると、自動的に貴社のデータとして紐付きます。
              </Text>
            </Card>

            <Card className="bg-fuchsia-50 border-fuchsia-100 p-5">
              <div className="text-fuchsia-900 font-bold mb-2 flex items-center gap-2">
                <span className="bg-fuchsia-200 text-fuchsia-900 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                ダッシュボードで分析
              </div>
              <Text className="text-sm text-fuchsia-800 leading-relaxed">
                受診が完了すると、リアルタイムでダッシュボードに反映されます。AI分析を使って組織の強みや課題を発見しましょう。
              </Text>
            </Card>
          </div>

          {/* 応用のTips */}
          <Card className="bg-slate-100 border-slate-200 mt-4 p-6 border-l-4 border-l-slate-400">
            <p className="font-bold text-slate-700 mb-2">💡 運用を成功させるための応用テクニック</p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-2 leading-relaxed">
              <li><b>部署名のアナウンス：</b> 従業員が受診する際、部署名は手入力となります。AIに正確な部署ごとの傾向を分析させるため、事前に「部署名は『営業部』『開発部』のように正式名称で入力してください」とアナウンスしておくことをお勧めします。</li>
              <li><b>定期的なアセスメント：</b> 組織の状態は変化します。半年に1回など、定期的に受診を促すことで、施策の効果測定やコンピテンシーの推移を追跡できるようになります。</li>
            </ul>
          </Card>
        </div>

      </div>
    </div>
  );
}

// Vercelデプロイ時のエラーを防ぐためのSuspenseラップ
export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">準備中...</div>}>
      <SettingsContent />
    </Suspense>
  );
}