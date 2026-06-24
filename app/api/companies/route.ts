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
    
    // 💡【デバッグ用】フロントエンドから実際に何という名前でデータが届いたかログに出力する
    console.log("フロントからの受信データ:", payload);

    // 💡【修正】companyId, id, companyCode, code など、考えられる名前をすべて受け入れる
    const targetId = payload.companyId || payload.id || payload.companyCode || payload.code;

    if (!targetId) {
      return NextResponse.json(
        { error: "企業コードが正しく送信されていません", receivedData: payload },
        { status: 400 }
      );
    }

    // 企業が存在するかチェック
    const { data: company, error } = await supabaseAdmin
      .from('companies')
      .select('id')
      .eq('id', targetId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return NextResponse.json({ exists: !!company });

  } catch (error: any) {
    console.error('Check Company API Error:', error.message || '予期せぬエラー');
    return NextResponse.json(
      { error: 'サーバーとの通信に失敗しました。' }, 
      { status: 500 }
    );
  }
}