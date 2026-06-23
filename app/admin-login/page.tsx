'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Card, Title, TextInput, Button } from '@tremor/react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('ログインに失敗しました: ' + error.message);
      setLoading(false);
    } else {
      window.location.href = '/dashboard'; // 管理者用ダッシュボードへ遷移
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="max-w-md mx-auto w-full shadow-lg border-t-4 border-blue-600">
        <Title className="mb-6 text-center text-2xl font-bold text-slate-800">HR管理者ログイン</Title>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            {/* 企業コードではなく、メールアドレスを使用する */}
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
          {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded">{error}</div>}
          
          <Button type="submit" className="w-full mt-2" loading={loading}>
            ダッシュボードを開く
          </Button>
        </form>

        {/* パスワードリセット画面への導線を追加 */}
        <div className="mt-6 text-center pt-4 border-t border-slate-100">
          <Link href="/forgot-password" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
            パスワードを忘れた場合はこちら
          </Link>
        </div>
        
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            ← 受診用ホーム画面に戻る
          </Link>
        </div>
      </Card>
    </main>
  );
}