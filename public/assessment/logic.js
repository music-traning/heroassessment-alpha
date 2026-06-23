// ==========================================
// logic.js
// 状態（DOMやグローバル変数）に依存しない純粋な計算ロジック
// 企業・組織マネジメント向けリファクタリング版
// ==========================================

/**
 * 診断結果のスコアとタイプを計算する
 * @param {Array} questions - 出題された質問リスト
 * @param {Object} answers - ユーザーの回答 { qId: value }
 * @returns {Object} { typeStr, percentages }
 */
function calculateScore(questions, answers) {
    let scores = { H: 0, E: 0, R: 0, O: 0 };
    let counts = { H: 0, E: 0, R: 0, O: 0 };

    questions.forEach(q => {
        let val = answers[q.id];
        if (q.is_reversed) val = 6 - val;
        scores[q.category] += val;
        counts[q.category] += 1;
    });

    let typeStr = "";
    let percentages = {};
    
    ['H', 'E', 'R', 'O'].forEach(cat => {
        let avg = scores[cat] / counts[cat];
        typeStr += avg >= 3.0 ? "H" : "L";
        percentages[cat] = ((avg - 1) / 4) * 100;
    });

    return { typeStr, percentages };
}

/**
 * 2つのタイプの組織的シナジー（相性）を計算する
 * @param {string} typeA 
 * @param {string} typeB 
 * @param {string} lang - 'ja' or 'en'
 * @returns {Object} { score, relation, desc }
 */
function calcAffinityLogic(typeA, typeB, lang) {
    let diff = 0;
    for (let i = 0; i < 4; i++) { 
        if (typeA[i] !== typeB[i]) diff++; 
    }
    
    const isJa = lang === 'ja';
    
    switch(diff) {
        case 4: return { 
            score: 120, 
            relation: isJa ? "戦略的補完パートナー" : "Strategic Complement",
            desc: isJa ? "価値観や行動原理が完全に逆極性にあるため、組織において互いの死角を完璧にカバーし合える最強のペアです。初期のコミュニケーションコストを乗り越えれば、最大の事業シナジーを生み出します。" : "Completely opposite values allow you to perfectly cover each other's operational blind spots. Overcoming initial friction creates the greatest organizational synergy."
        };
        case 1: return { 
            score: 90,  
            relation: isJa ? "最適協業パートナー" : "Optimal Collaborator",
            desc: isJa ? "ベースとなるコンピテンシーを共有しつつ、一部の異なる視点がプロジェクトに良い刺激をもたらします。阿吽の呼吸で業務を推進できる、実務において最も安定した理想的な関係です。" : "Sharing core competencies while offering slightly different perspectives provides positive stimulation. Highly stable and ideal for project execution."
        };
        case 0: return { 
            score: 80,  
            relation: isJa ? "同質的シンパシー" : "Homogeneous Sympathy",
            desc: isJa ? "同じ思考回路と強みを持つため、業務における共感とスピード感は圧倒的です。ただし、同じ弱点を抱えているため、不測の事態においてチーム全体が共倒れするリスク（多様性の欠如）に留意が必要です。" : "Identical thought processes yield fast empathy and execution. However, lack of cognitive diversity risks collective failure during unexpected crises."
        };
        case 2: return { 
            score: 60,  
            relation: isJa ? "機能別コラボレーター" : "Functional Collaborator",
            desc: isJa ? "適度な共通点と相違点を持つ、ドライでビジネスライクな関係です。互いの専門領域を侵犯せず、役割定義と責任分解点（タスク境界）を明確に設計することで確実に成果を上げられます。" : "A professional relationship with moderate overlap. Best managed by strictly defining roles and responsibilities to ensure reliable output."
        };
        case 3: return { 
            score: 40,  
            relation: isJa ? "創造的摩擦パートナー" : "Creative Friction Partner",
            desc: isJa ? "思考プロセスが大きく異なり、日常業務ではコンフリクト（摩擦）が起きやすい関係です。しかし、停滞したプロジェクトに対して、自分にはない発想をもたらす「劇薬（ディスラプター）」として配置すれば、突破口を開く鍵となります。" : "Prone to operational conflict due to vastly different approaches. However, deploying them as a 'disruptor' can unlock breakthroughs in stagnant projects."
        };
    }
}