import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabaseAdmin';
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
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'リクエストが多すぎます。しばらく時間をおいてから再度お試しください。' },
        { status: 429 }
      );
    }

    const payload = await req.json();
    
    // フロントからのデータを柔軟に受け取る
    const targetId = payload.companyId || payload.id || payload.companyCode || payload.code || payload.company_code;
    const companyName = payload.companyName || payload.name || payload.company_name || "";

    if (!targetId) {
      return NextResponse.json(
        { error: "事業所コード（企業コード）が正しく送信されていません" },
        { status: 400 }
      );
    }

    // 💡 ステップ1：すでに同じコードが存在するかチェック（重複登録の防止）
    const { data: existingCompany, error: searchError } = await supabaseAdmin
      .from('companies')
      .select('id')
      .eq('id', targetId)
      .maybeSingle();

    if (searchError) throw searchError;

    if (existingCompany) {
      return NextResponse.json(
        { error: 'このコードはすでに他の事業所で使用されています。別のコードを入力してください。' },
        { status: 409 } // 409 Conflict (競合エラー)
      );
    }

    // 💡 ステップ2：データベースに新規登録（INSERT）を実行する
    const { error: insertError } = await supabaseAdmin
      .from('companies')
      .insert([
        { 
          id: targetId, 
          name: companyName,
          plan: 'free' // テーブル構造にplanがあるため、デフォルト値を入れる
        }
      ]);

    if (insertError) throw insertError;

    // 完璧に書き込みが終わってから、初めて「成功」の合図をフロントエンドに返す
    return NextResponse.json({ success: true, message: '登録が完了しました' });

  } catch (error: any) {
    console.error('Create Company API Error:', error.message || '予期せぬエラー');
    return NextResponse.json(
      { error: 'サーバーとの通信に失敗しました。' }, 
      { status: 500 }
    );
  }
}