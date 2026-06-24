import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { chartData } = body;

    // 💡【修正箇所】福祉・就労支援に特化したプロンプトへ完全置換
    const prompt = `あなたは、障害福祉サービス（就労移行支援・継続支援など）に精通した「プロの就労支援アドバイザー兼、公認心理師」です。
以下の「就労を目指す利用者たちのHERO（心理的資本）」のアセスメント結果データを分析し、施設長および支援員に向けて、日々の支援の質を向上させるためのレポートを作成してください。

特に、利用者の「安定した利用継続（通所）」と「将来的な就労定着」に直接結びつくような、現場で明日から使える具体的なアドバイスを重視してください。
回答は読みやすいMarkdown形式（見出しや箇条書きを使用）で出力してください。

【出力の構成案】
## 1. 利用者全体の心理状態の傾向
（データから読み取れる、現在の利用者全体の強みと、配慮が必要な課題）

## 2. 安定した利用継続のためのアプローチ
（HEROの数値が低い項目に対して、支援員は具体的にどのような「声かけ」や「環境調整」を行えば、通所の安定に繋がるか）

## 3. 個別支援計画と就労に向けたアクション
（このデータを、今後の利用者の「個別支援計画」の目標設定や、就労に向けたステップアップにどう活かすべきか）

【利用者のアセスメントデータ】
${JSON.stringify(chartData, null, 2)}`;

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("【エラー詳細】Vercel上でGEMINI_API_KEYが認識できていません。");
      throw new Error("APIキーがシステムに設定されていません。VercelのEnvironment Variablesをご確認ください。");
    }

    // Gemini 2.5 Flashモデルでの生成
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
        cache: 'no-store' // Vercel対策のキャッシュ無効化
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Google API Error:", data);
      
      if (response.status === 429 || (data.error && data.error.code === 429)) {
         throw new Error("現在AIのアクセス制限に達しています。残高を確認するか、しばらく待ってから再度お試しください。");
      }
      if (response.status === 503 || (data.error && data.error.code === 503)) {
         throw new Error("現在、GoogleのAIサーバーが混み合っています。数分待ってから再度「分析する」ボタンを押してください。");
      }
      
      throw new Error(data.error?.message || "AI分析中にエラーが発生しました。");
    }

    const text = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ report: text });

  } catch (error: any) {
    console.error("Fetch API Error:", error.message || error);
    return NextResponse.json({ error: error.message || "分析中にエラーが発生しました" }, { status: 500 });
  }
}