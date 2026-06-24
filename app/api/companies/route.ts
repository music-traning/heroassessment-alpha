import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabaseAdmin';
import { createClient } from '@/utils/supabase/server'; // 💡 認証確認用の通常クライアント
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '10 s'),
});

export async function POST(req: Request) {
  try {
    // 1. レートリミット（変更なし）
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'リクエストが多すぎます。しばらく時間をおいてから再度お試しください。' },
        { status: 429 }
      );
    }

    // 💡 2. サーバーサイドでの「確実な」ユーザー認証検証
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: '認証エラー：ログイン状態を確認できませんでした。' },
        { status: 401 }
      );
    }
    const adminUserId = user.id; // ✨ 偽装不可能な確実なユーザーID

    // 💡 3. ペイロードの厳格なパース
    const payload = await req.json();
    
    // APIコントラクトを明確にし、特定のキー名だけを許可する
    const targetId = payload.companyId;
    const companyName = payload.companyName || "";

    if (!targetId || typeof targetId !== 'string') {
      return NextResponse.json(
        { error: "事業所コード（企業コード）が正しく送信されていません" },
        { status: 400 }
      );
    }

    // 4. 重複チェック
    const { data: existingCompany, error: searchError } = await supabaseAdmin
      .from('companies')
      .select('id')
      .eq('id', targetId)
      .maybeSingle();

    if (searchError) throw searchError;

    if (existingCompany) {
      return NextResponse.json(
        { error: 'この企業コードはすでに使用されています。別のコードを入力してください。' },
        { status: 409 }
      );
    }

    // 5. データベースに新規登録（安全なユーザーIDを使用）
    const { error: insertError } = await supabaseAdmin
      .from('companies')
      .insert([
        { 
          id: targetId, 
          name: companyName,
          plan: 'free',
          admin_user_id: adminUserId // サーバーで検証したIDを保存
        }
      ]);

    if (insertError) throw insertError;

    return NextResponse.json({ success: true, message: '登録が完了しました' });

  } catch (error: any) {
    console.error('Create Company API Error:', error.message || '予期せぬエラー');
    return NextResponse.json(
      { error: 'サーバーとの通信に失敗しました。' }, 
      { status: 500 }
    );
  }
}