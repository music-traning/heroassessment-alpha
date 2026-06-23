import { createBrowserClient } from '@supabase/ssr';

// .env.local に設定した鍵情報を読み込む
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 💡【変更点】通常の createClient ではなく、Cookie連携に強い createBrowserClient を使用する
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);