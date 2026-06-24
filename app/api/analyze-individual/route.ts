import { NextResponse } from 'next/server';

// Vercelでのキャッシュを防ぎ、常に動的に実行する
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { name, history } = payload;

    // バリデーション
    if (!name || !history || !Array.isArray(history)) {
      return NextResponse.json({ error: '無効なリクエストデータです' }, { status: 400 });
    }

    if (history.length === 0) {
      return NextResponse.json({ report: 'アセスメント履歴がありません。' });
    }

    // ==========================================
    // 1. AIに渡すデータの整形（バインディング）
    // ==========================================
    // 履歴を「古い順（過去から現在へ）」に並び替える
    const sortedHistory = [...history].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    // AIが文脈を読み違えないよう、不要なIDを削り、シンプルなJSON配列にする
    const formattedData = sortedHistory.map(item => ({
      date: new Date(item.created_at).toLocaleDateString('ja-JP'),
      Hope: item.percentages?.H ?? 0,
      Efficacy: item.percentages?.E ?? 0,
      Resilience: item.percentages?.R ?? 0,
      Optimism: item.percentages?.O ?? 0
    }));

    // ==========================================
    // 2. プロンプトの構築（厳格な制約付き）
    // ==========================================
    const prompt = `あなたは障害福祉サービスの現場支援に特化した、高度なAIデータアナリストです。
以下の【個人アセスメント履歴データ】を読み込み、対象者1名に焦点を当てた時系列分析レポートを作成してください。

【厳守事項】
1. 資格の詐称や自己紹介文（「私は公認心理師です」「AIとして」等）は一切出力せず、レポートの本文から直接開始すること。
2. データ捏造の禁止。提供された時系列データ以外の数値や架空の出来事をでっち上げないこと。
3. 「絶対値（点数の高低）」だけでなく、過去から現在への「変化（上がった・下がった）」に最も強い焦点を当てること。

【個人アセスメント履歴データ】
対象者名：${name}
履歴データ（古い順に記録）：
${JSON.stringify(formattedData, null, 2)}

【出力要件】
以下の構成に従い、Markdown形式で現場の支援員向けにレポートを出力してください。

## 1. 心理的資本（HERO）の推移と現状評価
過去のデータと比較して、どの項目が成長し、どの項目が停滞または低下しているか、事実ベースで分析してください。

## 2. 変化の要因推測と支援員へのフィードバック
スコアが上昇している項目については、支援員の日々の関わり（スモールステップの提示など）がどう機能しているか、労いを含めて評価してください。低下・停滞している項目については、対象者が現在どのような壁（環境ストレス、業務の難易度など）にぶつかっている可能性があるか推測してください。

## 3. 次期「個別支援計画（ISSP）」への組み込み案
この推移を踏まえ、次の1〜3ヶ月で重点的に取り組むべき課題は何か。対象者の強み（伸びている項目）を活かして、弱み（低い・下がっている項目）をカバーするための具体的な「声かけ」や「支援環境の調整」のアクションプランを3つ提案してください。`;

    // ==========================================
    // 3. APIキー検証とGemini呼び出し
    // ==========================================
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
    console.error("Individual Analysis API Error:", error.message || error);
    return NextResponse.json(
      { error: error.message || 'AI分析中にエラーが発生しました。' }, 
      { status: 500 }
    );
  }
}