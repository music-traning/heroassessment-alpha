'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Card, Title, TextInput, Button } from '@tremor/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 💡 useRouterを追加

export default function NormalLogin() {
  const router = useRouter(); // 💡 ルーターを初期化
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Supabaseにログインを要求
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('ログインに失敗しました。メールアドレスとパスワードをご確認ください。');
      setLoading(false);
    } else {
      // 💡 ログイン成功時、アセスメント画面へ自動遷移させる
      router.push('/');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="max-w-md mx-auto w-full shadow-sm">
        <Title className="mb-6 text-center text-2xl font-bold text-slate-800">ログイン</Title>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">メールアドレス</label>
            <TextInput 
              type="email" 
              placeholder="example@email.com" 
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
          {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded">{error}</div>}
          
          <Button type="submit" className="w-full mt-4" loading={loading}>
            ログインして開始する
          </Button>
        </form>

        <div className="mt-6 text-center pt-4 border-t border-slate-100">
          <Link href="/forgot-password" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
            パスワードを忘れた場合はこちら
          </Link>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-slate-500 mb-1">アカウントをお持ちでないですか？</p>
          <Link href="/signup" className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium">
            新規登録はこちら
          </Link>
        </div>
      </Card>
    </main>
  );
}