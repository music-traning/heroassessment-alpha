'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Card, Title, TextInput, Button } from '@tremor/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // ① まず通常のログイン認証を行う（本人がどうか確認）
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      setError('メールアドレスまたはパスワードが間違っています。');
      setLoading(false);
      return;
    }

    // ② 💡 セキュリティの関所：この人が「管理者」として登録されているか確認
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .select('id')
      .eq('admin_user_id', authData.user.id)
      .maybeSingle();

    // ③ 管理者として紐付けられていない新規登録ユーザーだった場合
    if (!companyData) {
      // 💡 追い出さずに、企業コードの「初期設定画面」へ誘導する！
      router.push('/dashboard/settings'); 
      return;
    }

    // ④ 関所を無事に通過したら、ダッシュボードへ転送！
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="max-w-md mx-auto w-full shadow-sm">
        <Title className="mb-6 text-center text-2xl font-bold text-slate-800">HR管理者ログイン</Title>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">登録メールアドレス</label>
            <TextInput 
              type="email" 
              placeholder="admin@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">パスワード</label>
            <TextInput 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          {/* エラーメッセージ表示エリア */}
          {error && <div className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded border border-red-200">{error}</div>}
          
          <Button type="submit" className="w-full mt-4" loading={loading}>
            ダッシュボードを開く
          </Button>
        </form>

        <div className="mt-6 text-center pt-4 border-t border-slate-100 space-y-3">
          <div>
            <Link href="/forgot-password" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
              パスワードを忘れた場合はこちら
            </Link>
          </div>
          <div>
            <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
              ← 受診用ホーム画面に戻る
            </Link>
          </div>
        </div>
      </Card>
    </main>
  );
}