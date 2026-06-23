import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabaseAdmin';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// 💡 課題1: レート制限の設定
// 10秒間に5回までのリクエストしか許可しない（総当たり攻撃をブロック）
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
    // --- IPアドレスベースでレート制限をチェック ---
    // x-forwarded-for ヘッダーから送信元のIPアドレスを取得
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      // 制限に引っかかった場合は 429 Too Many Requests を返す
      return NextResponse.json(
        { error: 'リクエストが多すぎます。しばらく時間をおいてから再度お試しください。' },
        { status: 429 }
      );
    }

    const payload = await req.json();

    if (!payload.companyId) {
      return NextResponse.json({ exists: false }, { status: 400 });
    }

    // 企業が存在するかチェック（安全なサーバークライアントを使用）
    const { data: company, error } = await supabaseAdmin
      .from('companies')
      .select('id')
      .eq('id', payload.companyId)
      .maybeSingle();

    if (error) {
      throw error; // エラーは下のcatchブロックで安全に処理する
    }

    // 存在する場合は true、しない場合は false を返す
    return NextResponse.json({ exists: !!company });

  } catch (error: any) {
    // 💡 課題3: ログの安全化
    // errorオブジェクト全体（リクエストの生データやAPIキーが含まれる可能性）を出力せず、
    // メッセージ部分だけを抽出してサーバーログに残す
    console.error('Check Company API Error:', error.message || '予期せぬエラー');

    // 💡 課題2: フロントへの情報漏洩防止
    // DBの構造やSQLのエラー内容をそのまま返さず、ユーザーには当たり障りのない汎用メッセージを返す
    return NextResponse.json(
      { error: 'サーバーとの通信に失敗しました。' }, 
      { status: 500 }
    );
  }
}