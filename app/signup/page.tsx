'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Card, Title, TextInput, Button, Text } from '@tremor/react';
import Link from 'next/link';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    // 💡【ここが重要】Supabaseに新しいユーザーの作成を依頼する
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError('登録に失敗しました: ' + error.message);
    } else {
      // 成功した場合のメッセージ
      setMessage('アカウントの作成が完了しました！そのままログイン画面へお進みください。');
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="max-w-md mx-auto">
        <Title className="mb-6 text-center text-2xl font-bold text-slate-800">新規アカウント登録</Title>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">メールアドレス</label>
            <TextInput type="email" placeholder="example@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">パスワード（6文字以上）</label>
            <TextInput type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          
          {/* メッセージ表示エリア */}
          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
          {message && <div className="text-emerald-600 text-sm font-medium">{message}</div>}
          
          <Button type="submit" className="w-full mt-4" loading={loading}>
            無料で登録する
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Text>
            すでにアカウントをお持ちですか？{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
              ログインはこちら
            </Link>
          </Text>
        </div>
      </Card>
    </main>
  );
}