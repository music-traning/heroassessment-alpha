import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// 💡 ここに async を追加
export async function createClient() {
  // 💡 ここに await を追加
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component から呼ばれた場合の型エラーを安全に無視します
          }
        },
      },
    }
  );
}