import { NextResponse } from 'next/server';
// 💡 変更: サーバー専用の supabaseAdmin を読み込む
import { supabaseAdmin } from '@/utils/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // バリデーション（必須チェック）
    if (!payload.companyId || !payload.employeeId) {
      return NextResponse.json({ error: '企業コードと社員情報は必須です' }, { status: 400 });
    }

    // ==========================================
    // 1. 企業が存在するかチェック
    // ==========================================
    const { data: company, error: companyError } = await supabaseAdmin
      .from('companies')
      .select('id') // 💡 'id' に修正
      .eq('id', payload.companyId) // 💡 'id' に修正
      .maybeSingle();

    if (companyError) {
      console.error('Company Check Error:', companyError);
      throw new Error('企業情報の確認中にエラーが発生しました');
    }

    if (!company) {
      return NextResponse.json(
        { error: '入力された企業コードは登録されていません。正しいコードを確認してください。' }, 
        { status: 400 }
      );
    }

    let employeeUuid;

    // ==========================================
    // 2. 社員が存在するか確認
    // ==========================================
    const { data: existingEmp, error: checkError } = await supabaseAdmin
      .from('employees')
      .select('id')
      .eq('company_id', payload.companyId)
      .eq('employee_id_or_name', payload.employeeId)
      .maybeSingle(); 

    if (checkError) throw checkError;

    if (existingEmp) {
      employeeUuid = existingEmp.id;
    } else {
      // 存在しない場合は新規登録
      const { data: newEmp, error: empError } = await supabaseAdmin
        .from('employees')
        .insert([{
          company_id: payload.companyId,
          employee_id_or_name: payload.employeeId,
          department: payload.department || '未設定',
          role: payload.role || '未設定'
        }])
        .select('id')
        .single(); 

      if (empError) throw empError;
      employeeUuid = newEmp.id;
    }

    // ==========================================
    // 3. 診断結果を保存
    // ==========================================
    const { error: resultError } = await supabaseAdmin
      .from('assessment_results')
      .insert([{
        company_id: payload.companyId,
        employee_id: employeeUuid,
        type_str: payload.type,
        tier: payload.tier,
        percentages: payload.percentages
      }]);

    if (resultError) throw resultError;

    return NextResponse.json({ success: true, message: '保存完了' });

  } catch (error: any) {
    console.error('Supabase Save Error:', error);
    return NextResponse.json({ error: error.message || '内部サーバーエラーが発生しました' }, { status: 500 });
  }
}