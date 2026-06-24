import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { chartData } = body;

    // 💡【修正箇所】福祉・就労支援に特化したプロンプトへ完全置換
    const prompt = `あなたは障害福祉サービス（就労移行支援・継続支援など）の現場課題に特化した、高度なAIデータアナリストです。公認心理師およびプロの就労支援アドバイザーと同等の学術的見地・専門知識を用いて、以下の【アセスメントデータ】を分析してください。

【厳守事項（システム制約）】
1. 資格の詐称禁止：出力テキスト内で「私は公認心理師です」「アドバイザーとして」といった、人間であるかのような名乗りや自己紹介は一切行わないでください。レポートの本文から直接開始してください。
2. ハルシネーション（幻覚）の完全排除：【アセスメントデータ】に存在しない「架空の利用者名」「架空のスコア」「架空の部署」を絶対に捏造しないでください。
3. データ整合性の保持：対象者のスコア数値（高い・低い）と、レポートの分析内容（強み・課題）が論理的に完全に一致するように出力してください。

【アセスメントデータ】
※システム側からここにJSONやCSV形式で対象者の実データを挿入してください※
（例：[{"name":"利用者A", "Hope":30, "Efficacy":20, "Resilience":40, "Optimism":30}]）

【出力要件】
施設長および支援員が、日々の支援の質を向上させるためのレポートを作成してください。利用者の「安定した利用継続（通所）」と「将来的な就労定着」に結びつく具体的なアドバイスを重視し、以下の構成に従ってMarkdown形式で出力してください。

## 1. 利用者全体の心理状態の傾向
提供されたデータから読み取れる、現在の利用者全体の強みと、配慮が必要な課題を論理的に分析してください。

## 2. 安定した利用継続のためのアプローチ
HEROの数値が低い項目や特定の対象者に対して、支援員は具体的にどのような「声かけ（内的アプローチ）」や「環境調整（外的アプローチ）」を行えば通所の安定に繋がるか、現場ですぐに実践できる形で提案してください。

## 3. 個別支援計画と就労に向けたアクション
このデータを、今後の利用者の「個別支援計画（ISSP）」の目標設定や、就労に向けたステップアップにどう活かすべきか、具体的なフェーズごとに記載してください。
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