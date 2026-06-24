import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabaseAdmin'; // 💡 supabaseAdminをインポート

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    // 💡 companyId と employeeId を受け取る
    const { companyId, employeeId, name, history } = payload;

    // バリデーション
    if (!companyId || !employeeId || !name || !history || !Array.isArray(history)) {
      return NextResponse.json({ error: '無効なリクエストデータです' }, { status: 400 });
    }

    if (history.length === 0) {
      return NextResponse.json({ report: 'アセスメント履歴がありません。' });
    }

    const sortedHistory = [...history].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    const formattedData = sortedHistory.map(item => ({
      date: new Date(item.created_at).toLocaleDateString('ja-JP'),
      Hope: item.percentages?.H ?? 0,
      Efficacy: item.percentages?.E ?? 0,
      Resilience: item.percentages?.R ?? 0,
      Optimism: item.percentages?.O ?? 0
    }));

    const prompt = `あなたは障害福祉サービス（就労移行支援・就労継続支援など）の現場支援と法定書類の作成に特化した、高度なAIデータアナリストです。
以下の【個人アセスメント履歴データ】を読み込み、対象者1名に焦点を当てた分析と、実際の「個別支援計画書（ISSP）」にそのまま活用できるドラフト原案を作成してください。

【厳守事項】
1. 資格の詐称や自己紹介文（「私は公認心理師です」等）は一切出力せず、本文から直接開始すること。
2. ハルシネーションの禁止：提供されたHEROスコア以外の「架空の病歴」「架空の家族構成」「架空の具体的な希望職種」などを絶対に捏造しないこと。
3. 位置づけの明確化：これは心理的資本（HERO）の観点から導き出した「計画書の提案（叩き台）」であることを前提とした文体にすること。

【個人アセスメント履歴データ】
対象者名：${name}
履歴データ（古い順に記録）：
${JSON.stringify(formattedData, null, 2)}

【出力フォーマット】
以下の構成と見出し（Markdown形式）に厳密に従って出力してください。

## 1. 心理的資本（HERO）の推移と現状分析
（※過去のデータからの変化に着目し、現在本人がどのような心理状態・モチベーションにあるかを客観的な事実ベースで簡潔に記載してください。）

## 2. 個別支援計画書（ISSP） 反映用ドラフト
（※以下の各項目について、HEROスコアの推移から論理的に導き出される内容を、公的な計画書にふさわしい「だ・である」調の専門的な記述で提案してください。）

### 本人の希望（アセスメント結果からの推測）
（※点数の高い項目や伸びている項目から推測される、本人の「こうなりたい」「やってみたい」という潜在的な意欲を言語化してください。）

### 解決すべき課題
（※点数が低い、または低下している項目から推測される、就労に向けた心理的・環境的な障壁を記載してください。）

### 長期目標（概ね6ヶ月〜1年）
（※HEROの全体的な底上げ、または強みの最大化を通じた、就労・定着に向けた大きな目標を設定してください。）

### 短期目標（概ね1〜3ヶ月）
（※長期目標を達成するために、直近でクリアすべき具体的な目標を、HEROの弱点補強や強みの発揮に絡めて設定してください。）

### 具体的な支援内容・環境調整（支援者の役割）
（※短期目標を達成するために、支援員が「どのような声かけを行うか」「どのようなタスクや環境を用意するか」を、スモールステップやコーピングの観点から3つ以上具体的に記載してください。）`;

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("APIキーがシステムに設定されていません。");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
        cache: 'no-store'
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "AI分析中にエラーが発生しました。");
    }

    const text = data.candidates[0].content.parts[0].text;

    // ==========================================
    // 💡 生成されたレポートをSupabaseに保存する
    // ==========================================
    const { error: dbError } = await supabaseAdmin
      .from('individual_ai_reports')
      .insert([{
        company_id: companyId,
        employee_id: employeeId,
        report_content: text
        // created_at はDB側で自動付与(now())されます
      }]);

    if (dbError) {
      console.error("Supabase Save Error (Individual Report):", dbError);
      // 保存に失敗しても、ユーザーにはAIの分析結果自体は見せるようにエラーは投げずにログに留める設計も有効です
      // throw new Error("レポートのデータベース保存に失敗しました。");
    }

    return NextResponse.json({ report: text });

  } catch (error: any) {
    console.error("Individual Analysis API Error:", error.message || error);
    return NextResponse.json(
      { error: error.message || 'AI分析中にエラーが発生しました。' }, 
      { status: 500 }
    );
  }
}