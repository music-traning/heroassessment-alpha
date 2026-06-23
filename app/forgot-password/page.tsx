'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Card, Title, TextInput, Button, Text } from '@tremor/react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // 💡 Supabaseにパスワード再設定メールの送信を依頼する
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // ユーザーがメール内のリンクをクリックした後に飛ばす画面のURLを指定
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      setError('メール送信に失敗しました: ' + error.message);
    } else {
      setMessage('パスワード再設定用のメールを送信しました。受信トレイをご確認ください。');
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="max-w-md mx-auto w-full shadow-lg border-t-4 border-blue-600">
        <Title className="mb-4 text-center text-xl font-bold text-slate-800">パスワードの再設定</Title>
        <Text className="text-center text-slate-500 mb-6 text-sm">
          ご登録のメールアドレスを入力してください。パスワード再設定用のリンクをお送りします。
        </Text>

        <form onSubmit={handleResetRequest} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">メールアドレス</label>
            <TextInput 
              type="email" 
              placeholder="admin@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded">{error}</div>}
          {message && <div className="text-emerald-600 text-sm font-medium bg-emerald-50 p-2 rounded">{message}</div>}

          <Button type="submit" className="w-full mt-4" loading={loading} disabled={!!message}>
            再設定メールを送信する
          </Button>
        </form>

        <div className="mt-6 text-center pt-4 border-t border-slate-100">
          <Link href="/login" className="text-sm text-slate-400 hover:text-blue-600 transition-colors">
            ← ログイン画面に戻る
          </Link>
        </div>
      </Card>
    </main>
  );
}