import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseServiceKey) {
  throw new Error('サーバー専用の SUPABASE_SERVICE_ROLE_KEY が設定されていません。');
}

// サーバー環境でのみ使用する管理者用クライアント
// 💡 セッション情報をブラウザに保存しないように設定しています
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});