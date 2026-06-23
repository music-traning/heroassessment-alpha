// app/api/check-company/route.ts に配置
import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(req: Request) {
  try {
    const { companyId } = await req.json();

    if (!companyId) {
      return NextResponse.json({ exists: false, error: '企業コードが入力されていません' }, { status: 400 });
    }

    const { data: company, error } = await supabase
      .from('companies')
      .select('id') // ※companiesテーブルの主キーに合わせてください（id または company_id）
      .eq('id', companyId)
      .maybeSingle();

    if (error) throw error;

    if (company) {
      return NextResponse.json({ exists: true });
    } else {
      return NextResponse.json({ exists: false });
    }

  } catch (error: any) {
    console.error('Company Check Error:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}