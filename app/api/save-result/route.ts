import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase'; // ※supabase.tsの場所に合わせて調整してください

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    // 送られてくるデータ: { companyId, employeeId, department, role, type, tier, percentages }

    let employeeUuid;

    // 1. まず社員が employees テーブルに存在するか確認
    const { data: existingEmp } = await supabase
      .from('employees')
      .select('id')
      .eq('company_id', payload.companyId)
      .eq('employee_id_or_name', payload.employeeId)
      .single();

    if (existingEmp) {
      // 存在する場合はそのUUIDを使う
      employeeUuid = existingEmp.id;
    } else {
      // 存在しない場合は、新しい社員として登録してUUIDを取得する
      const { data: newEmp, error: empError } = await supabase
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

    // 2. 取得した社員のUUIDを使って、診断結果を保存する
    const { error: resultError } = await supabase
      .from('assessment_results')
      .insert([{
        company_id: payload.companyId,
        employee_id: employeeUuid,
        type_str: payload.type,
        tier: payload.tier,
        percentages: payload.percentages
      }]);

    if (resultError) throw resultError;

    // 成功をフロントエンド（main.js）に返す
    return NextResponse.json({ success: true, message: '保存完了' });

  } catch (error: any) {
    console.error('Supabase Save Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}