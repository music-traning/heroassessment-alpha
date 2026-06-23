'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { Card, Title, TextInput, Button, Text } from '@tremor/react';
import { useRouter } from 'next/navigation';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // セキュリティチェック：メールのリンク経由で正しくアクセスされているか確認
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('有効なセッションが見つかりません。メールのリンクの有効期限が切れているか、不正なアクセスです。もう一度リセット要求からやり直してください。');
      }
    };
    checkSession();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // 入力値の論理チェック
    if (password !== confirmPassword) {
      setError('パスワードが一致しません。');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('パスワードは6文字以上で入力してください。');
      setLoading(false);
      return;
    }

    // 💡 Supabaseに新しいパスワードへの上書きを依頼する
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      setError('パスワードの更新に失敗しました: ' + error.message);
    } else {
      setMessage('パスワードの更新が完了しました。3秒後にログイン画面へ自動的に移動します...');
      
      // 成功したら一度明示的にログアウトさせ、綺麗な状態でログイン画面へ飛ばす
      await supabase.auth.signOut();
      
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="max-w-md mx-auto w-full shadow-lg border-t-4 border-emerald-500">
        <Title className="mb-4 text-center text-xl font-bold text-slate-800">新しいパスワードの設定</Title>
        <Text className="text-center text-slate-500 mb-6 text-sm">
          アカウントの新しいパスワードを入力してください。
        </Text>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">新しいパスワード</label>
            <TextInput 
              type="password" 
              placeholder="•••••••• (6文字以上)" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              disabled={!!error && !password && !confirmPassword} // セッションエラー時は入力を無効化
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">新しいパスワード（確認用）</label>
            <TextInput 
              type="password" 
              placeholder="••••••••" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              disabled={!!error && !password && !confirmPassword}
            />
          </div>

          {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded leading-relaxed">{error}</div>}
          {message && <div className="text-emerald-600 text-sm font-medium bg-emerald-50 p-3 rounded">{message}</div>}

          <Button 
            type="submit" 
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 border-emerald-600" 
            loading={loading} 
            disabled={!!message || (!!error && !password && !confirmPassword)}
          >
            パスワードを更新する
          </Button>
        </form>
      </Card>
    </main>
  );
}