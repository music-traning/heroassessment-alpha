// ==========================================
// main.js
// 状態管理・UIレンダリング・イベント制御
// Edge Config 動的マスタデータ完全同期版
// ==========================================

const urlParams = new URLSearchParams(window.location.search);
const cid = urlParams.get('cid');
if (cid) {
    localStorage.setItem('hero_enterprise_cid', cid);
    window.history.replaceState({}, document.title, window.location.pathname);
}

const appState = {
    lang: 'ja',
    screen: 'home', 
    tier: 1,
    pendingTier: 1,
    employeeInfo: { companyId: '', id: '', dept: '', role: '' },
    questions: [],
    currentIdx: 0,
    answers: {},
    history: JSON.parse(localStorage.getItem('hero_enterprise_history')) || [],
    affinityA: Object.keys(heroData.types)[0],
    affinityB: Object.keys(heroData.types)[0],
    affinityResult: null,
    shareText: ""
};

function setState(updates) {
    Object.assign(appState, updates);
    render();
}

function render() {
    ['home', 'entry', 'quiz', 'result', 'help'].forEach(screen => {
        const el = document.getElementById(`screen-${screen}`);
        if(el) el.classList.toggle('hidden', appState.screen !== screen);
    });

    document.getElementById('btn-help').innerText = appState.lang === 'ja' ? "クラス一覧" : "Class List";
    
    switch (appState.screen) {
        case 'home':   renderHome();   break;
        case 'entry':  renderEntry();  break;
        case 'quiz':   renderQuiz();   break;
        case 'result': renderResult(); break;
        case 'help':   renderHelp();   break;
    }
}

function renderHome() {
    const isJa = appState.lang === 'ja';
    
    const els = [
        { id: 'ui-title', ja: "心理的資本アセスメント", en: "HERO Assessment" },
        { id: 'ui-desc', ja: "HEROに基づく組織レジリエンス及びコンピテンシー診断", en: "Competency & Resilience Assessment based on HERO" },
        { id: 'ui-about-summary', ja: "このアプリについて・使い方", en: "About this App / How to Use" },
        { id: 'ui-about-content', 
          ja: "<strong>【概要】</strong><br>本システムは、心理的資本（HERO：Hope, Efficacy, Resilience, Optimism）の4要素を測定し、個人のコンピテンシーとレジリエンスを可視化するアセスメントツールです。<br><br><strong>【使い方】</strong><br>1. 以下のボタンから、診断のボリューム（簡易・標準・精密）を選択します。<br>2. 企業コード等の必要情報を入力し、設問に直感で回答してください。<br>3. 解析結果として、あなたのコンピテンシークラス（全16種）とアクションプランが提示されます。<br>4. 「人材シナジー・シミュレーター」を使うと、タイプ間の相性や組織的シナジーを事前に算出できます。", 
          en: "<strong>[Overview]</strong><br>This system measures the 4 elements of Psychological Capital (HERO) to visualize individual competency and resilience.<br><br><strong>[How to Use]</strong><br>1. Select the assessment volume.<br>2. Enter required info (e.g., Company Code) and answer intuitively.<br>3. Your competency class (16 types) and action plan will be generated.<br>4. Use the 'Talent Synergy Simulator' to calculate compatibility." },
        { id: 'ui-b2b-summary', ja: "法人・組織でのご利用について（管理者様へ）", en: "For Enterprises & Organizations (To Admins)" },
        { id: 'ui-b2b-content', 
          ja: "本システムは、企業やチーム単位での導入が可能です。<br><br>貴社専用の<strong>アクセスURLを発行</strong>することで、組織内のアセスメント結果を一元管理できます。さらに、部署や役職ごとの傾向、組織全体のレジリエンス状況を可視化する<strong>「管理者用分析ダッシュボード」</strong>をご提供いたします。<br><br>人材配置の最適化や、チームビルディングの強力な指標としてご活用いただけます。導入のご相談やテスト利用をご希望の企業担当者様は、ページ下部のお問い合わせ窓口よりお気軽にご連絡ください。",
          en: "This system can be implemented at the corporate or team level.<br><br>By issuing a <strong>dedicated access URL</strong> for your company, you can centrally manage assessment results. Furthermore, we provide an <strong>'Admin Analytics Dashboard'</strong> that visualizes trends by department/role and the overall resilience of the organization.<br><br>Please contact us using the inquiry window below to discuss implementation or request a trial." },
        { id: 'btn-tier1', ja: "簡易診断 (12問)", en: "Quick Scan (12 Qs)" },
        { id: 'btn-tier2', ja: "標準診断 (28問)", en: "Standard Scan (28 Qs)" },
        { id: 'btn-tier3', ja: "精密診断 (48問)", en: "Deep Scan (48 Qs)" },
        { id: 'ui-quick-affinity-title', ja: "人材シナジー・シミュレーター", en: "Talent Synergy Simulator" },
        { id: 'ui-quick-affinity-desc', ja: "2つのタイプを選択し、組織マネジメントにおける相互作用を確認します", en: "Select two types to simulate organizational synergy" },
        { id: 'btn-check-affinity', ja: "シナジーを算出", en: "Calculate Synergy" },
        { id: 'ui-history-title', ja: "受診履歴", en: "Assessment History" },
        { id: 'btn-clear-history', ja: "履歴を消去", en: "Clear History" },
        { id: 'ui-contact-title', ja: "法人導入・その他のお問い合わせ", en: "Inquiries for Corporate Use" }
    ];

    els.forEach(el => {
        const node = document.getElementById(el.id);
        if(node) node.innerHTML = isJa ? el.ja : el.en;
    });

    const imgContact = document.getElementById('img-contact');
    if(imgContact) imgContact.alt = isJa ? "お問い合わせ" : "Contact Us";

    renderAffinityDropdowns();
    renderQuickAffinityResult();
    renderHistory();
}

function renderEntry() {
    const isJa = appState.lang === 'ja';
    
    const els = [
        { id: 'ui-entry-title', ja: "受診者情報の入力", en: "Enter Participant Information" },
        { id: 'ui-entry-desc', ja: "本アセスメントの結果は、組織全体のレジリエンス分析および最適なプロジェクト編成の参考データとして利用されます。<br>※個人の不利益な評価に直結することはありません。", en: "The results will be used as reference data for organizational resilience analysis and optimal project formation.<br>* This will not directly lead to disadvantageous personal evaluations." },
        { id: 'ui-label-comp', ja: "企業コード <span style=\"color:var(--danger-color);\">*</span>", en: "Company Code <span style=\"color:var(--danger-color);\">*</span>" },
        { id: 'ui-note-comp', ja: "※案内された専用URLからアクセスした場合は自動で固定されます。", en: "* Automatically locked if accessed via a dedicated URL." },
        { id: 'ui-label-emp', ja: "社員番号 または 氏名 <span style=\"color:var(--danger-color);\">*</span>", en: "Employee ID or Name <span style=\"color:var(--danger-color);\">*</span>" },
        { id: 'ui-label-dept', ja: "所属部署 <span style=\"color:var(--danger-color);\">*</span>", en: "Department <span style=\"color:var(--danger-color);\">*</span>" },
        { id: 'ui-label-role', ja: "役職 <span style=\"color:var(--danger-color);\">*</span>", en: "Role / Position <span style=\"color:var(--danger-color);\">*</span>" },
        { id: 'ui-text-consent', ja: "データの収集・分析・利用目的に同意し、自身の状態について正確な回答を行うことを誓約します。", en: "I agree to the data collection/analysis purposes and pledge to answer accurately regarding my current state." },
        { id: 'btn-entry-start', ja: "同意して診断を開始する", en: "Agree and Start Assessment" },
        { id: 'btn-entry-cancel', ja: "キャンセル", en: "Cancel" }
    ];

    els.forEach(el => {
        const node = document.getElementById(el.id);
        if(node) node.innerHTML = isJa ? el.ja : el.en;
    });

    const inputComp = document.getElementById('input-company-id');
    if(inputComp) inputComp.placeholder = isJa ? "例: COMP-A" : "e.g., COMP-A";
    
    const inputEmp = document.getElementById('input-emp-id');
    if(inputEmp) inputEmp.placeholder = isJa ? "例: EMP-001 / 山田太郎" : "e.g., EMP-001 / John Doe";
}

function renderAffinityDropdowns() {
    const selectA = document.getElementById('affinity-type-a');
    const selectB = document.getElementById('affinity-type-b');
    if (!selectA || !selectB) return;
    
    if (selectA.options.length === 0) {
        for (const [key, data] of Object.entries(heroData.types)) {
            selectA.add(new Option(`[${key}] ${data.title[appState.lang]}`, key));
            selectB.add(new Option(`[${key}] ${data.title[appState.lang]}`, key));
        }
        selectA.addEventListener('change', (e) => setState({ affinityA: e.target.value, affinityResult: null }));
        selectB.addEventListener('change', (e) => setState({ affinityB: e.target.value, affinityResult: null }));
    } else {
        for (let i = 0; i < selectA.options.length; i++) {
            const key = selectA.options[i].value;
            const text = `[${key}] ${heroData.types[key].title[appState.lang]}`;
            selectA.options[i].text = text;
            selectB.options[i].text = text;
        }
    }
    selectA.value = appState.affinityA;
    selectB.value = appState.affinityB;
}

function renderQuickAffinityResult() {
    const resultDiv = document.getElementById('quick-affinity-result');
    if (appState.affinityResult) {
        resultDiv.classList.remove('hidden');
        document.getElementById('quick-result-relation').innerText = appState.affinityResult.relation;
        document.getElementById('quick-result-score').innerText = appState.lang === 'ja' ? `シナジー値: ${appState.affinityResult.score}` : `Synergy: ${appState.affinityResult.score}`;
        document.getElementById('quick-result-desc').innerText = appState.affinityResult.desc;
    } else {
        resultDiv.classList.add('hidden');
    }
}

function renderHistory() {
    const historyList = document.getElementById('history-list');
    const clearBtn = document.getElementById('btn-clear-history');
    historyList.innerHTML = '';
    
    if (appState.history.length === 0) {
        historyList.innerHTML = `<p style="color:var(--text-muted); font-size:14px; text-align:center;">${appState.lang === 'ja' ? '受診履歴はありません' : 'No history available.'}</p>`;
        clearBtn.classList.add('hidden');
        return;
    }
    
    clearBtn.classList.remove('hidden');
    const detailText = appState.lang === 'ja' ? "詳細" : "View";

    appState.history.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.style.cursor = 'pointer';
        div.onclick = () => loadResultFromHistory(index);
        
        const titleStr = heroData.types[item.type] ? heroData.types[item.type].title[appState.lang] : item.title;
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span><span style="color:#888; font-size:12px;">${item.date}</span><br><strong>[${item.type}]</strong> ${titleStr}</span>
                <span style="color:var(--accent-color); font-size:12px; border:1px solid var(--accent-color); border-radius:3px; padding:4px 8px;">${detailText}</span>
            </div>
        `;
        historyList.appendChild(div);
    });
}

function renderQuiz() {
    const q = appState.questions[appState.currentIdx];
    if (!q) return;

    document.getElementById('quiz-progress').innerText = appState.lang === 'ja' ? `設問 ${appState.currentIdx + 1} / ${appState.questions.length}` : `Question ${appState.currentIdx + 1} / ${appState.questions.length}`;
    document.getElementById('btn-quiz-abort').innerText = appState.lang === 'ja' ? "中断" : "Abort";
    document.getElementById('question-text').innerText = q.text[appState.lang];
    
    // 【改善点】視覚的プログレスバーの制御
    const progressPercent = ((appState.currentIdx + 1) / appState.questions.length) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) progressBar.style.width = `${progressPercent}%`;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    heroData.app_config.scale.forEach(scale => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (appState.answers[q.id] === scale.value) btn.classList.add('selected');
        btn.innerText = scale.label[appState.lang];
        btn.onclick = () => handleAnswer(q.id, scale.value);
        optionsContainer.appendChild(btn);
    });

    const isJa = appState.lang === 'ja';
    document.getElementById('btn-prev').disabled = appState.currentIdx === 0;
    document.getElementById('btn-prev').innerText = isJa ? "戻る" : "Back";
    document.getElementById('btn-next').innerText = appState.currentIdx === appState.questions.length - 1 
        ? (isJa ? "結果を解析する" : "Analyze Result") 
        : (isJa ? "次へ" : "Next");
}

function renderResult() {
    const isJa = appState.lang === 'ja';
    document.getElementById('ui-action-plan').innerText = isJa ? "■ マネジメント・アクションプラン" : "■ Management Action Plan";
    document.getElementById('ui-affinity').innerText = isJa ? "■ 組織内シナジー・マトリックス" : "■ Organizational Synergy Matrix";
    if(document.getElementById('btn-share-x')) document.getElementById('btn-share-x').innerText = isJa ? "結果を共有する" : "Share Result";
    document.getElementById('btn-home').innerText = isJa ? "ホームに戻る" : "Back to Home";
}

function renderHelp() {
    const isJa = appState.lang === 'ja';
    document.getElementById('ui-help-title').innerText = isJa ? "コンピテンシー・クラス一覧" : "Competency Class List";
    document.getElementById('ui-help-desc').innerText = isJa ? "心理的資本(HERO)に基づく全16タイプの定義" : "Definitions of all 16 types based on HERO";
    document.getElementById('btn-close-help').innerText = isJa ? "閉じる" : "Close";
    
    const helpList = document.getElementById('help-list');
    helpList.innerHTML = '';

    for (const [key, data] of Object.entries(heroData.types)) {
        const div = document.createElement('div');
        div.style.borderBottom = "1px solid var(--border-color)"; 
        div.style.paddingBottom = "16px"; 
        div.style.marginBottom = "16px";
        div.innerHTML = `<div style="color: var(--accent-color); font-size: 15px; font-weight: 600; margin-bottom: 6px;">[${key}] ${data.title[appState.lang]}</div>
                         <div style="font-size: 13px; line-height: 1.6; color: #444;">${data.profile[appState.lang]}</div>`;
        helpList.appendChild(div);
    }
}

document.getElementById('lang-toggle').addEventListener('click', () => {
    setState({ lang: appState.lang === 'ja' ? 'en' : 'ja' });
});

window.showHelp = () => setState({ screen: 'help' });
window.closeHelp = () => setState({ screen: 'home' });
window.goHome = () => setState({ screen: 'home', affinityResult: null });

window.abortQuiz = () => {
    if(confirm(appState.lang === 'ja' ? 'アセスメントを中断してホームに戻りますか？' : 'Abort the assessment and return to Home?')) {
        setState({ screen: 'home' });
    }
};

// 【大幅改修】Edge Config中継APIから、遅延ゼロで企業設定を動的フェッチする
window.startQuiz = (tier) => {
    setState({ screen: 'entry', pendingTier: tier });
    
    const savedCid = localStorage.getItem('hero_enterprise_cid') || 'GuestCompany';
    const companyInput = document.getElementById('input-company-id');
    
    if (companyInput) {
        companyInput.value = savedCid === 'GuestCompany' ? '' : savedCid;
        companyInput.readOnly = (savedCid !== 'GuestCompany'); 
        companyInput.style.backgroundColor = (savedCid !== 'GuestCompany') ? "#e9ecef" : "#ffffff"; 
    }

    const defaultOptionText = appState.lang === 'ja' ? '読み込み中...' : 'Loading...';
    const deptSelect = document.getElementById('select-dept');
    const roleSelect = document.getElementById('select-role');
    if (deptSelect) deptSelect.innerHTML = `<option value="">${defaultOptionText}</option>`;
    if (roleSelect) roleSelect.innerHTML = `<option value="">${defaultOptionText}</option>`;

    // Vercel Edge Config 中継APIを呼び出す
    fetch(`/api/get-config?cid=${savedCid}`)
    .then(res => res.json())
    .then(config => {
        const selectText = appState.lang === 'ja' ? '選択してください' : 'Please select';
        
        if (deptSelect) {
            deptSelect.innerHTML = `<option value="">${selectText}</option>`; 
            config.departments.forEach(dept => {
                deptSelect.add(new Option(dept, dept));
            });
        }
        if (roleSelect) {
            roleSelect.innerHTML = `<option value="">${selectText}</option>`; 
            config.roles.forEach(role => {
                roleSelect.add(new Option(role, role));
            });
        }
    })
    .catch(err => {
        console.error("Failed to load edge config:", err);
        const errorText = appState.lang === 'ja' ? 'マスタの取得に失敗しました' : 'Failed to load master';
        if (deptSelect) deptSelect.innerHTML = `<option value="">${errorText}</option>`;
        if (roleSelect) roleSelect.innerHTML = `<option value="">${errorText}</option>`;
    });

    const empId = document.getElementById('input-emp-id');
    if(empId) empId.value = '';
    const chkConsent = document.getElementById('check-consent');
    if(chkConsent) chkConsent.checked = false;
};

window.beginAssessment = () => {
    const companyInput = document.getElementById('input-company-id');
    let compId = companyInput ? companyInput.value.trim() : '';
    if(!compId) compId = "GuestCompany"; // 空欄の場合は一般ゲスト扱いにする

    const empId = document.getElementById('input-emp-id').value.trim();
    const dept = document.getElementById('select-dept').value;
    const role = document.getElementById('select-role').value;
    const consent = document.getElementById('check-consent').checked;

    if (!empId || !dept || !role) {
        alert(appState.lang === 'ja' ? "すべての必須項目を入力してください。" : "Please fill in all required fields.");
        return;
    }
    if (!consent) {
        alert(appState.lang === 'ja' ? "診断を開始するには、データ利用目的への同意が必要です。" : "You must agree to the data policy to start.");
        return;
    }

    localStorage.setItem('hero_enterprise_cid', compId);

    const tier = appState.pendingTier;
    setState({
        screen: 'quiz',
        tier: tier,
        employeeInfo: { companyId: compId, id: empId, dept: dept, role: role },
        questions: heroData.questions.filter(q => q.tier <= tier),
        currentIdx: 0,
        answers: {}
    });
};

window.handleAnswer = (qId, value) => {
    const newAnswers = { ...appState.answers, [qId]: value };
    setState({ answers: newAnswers });
};

window.prevQuestion = () => {
    if (appState.currentIdx > 0) setState({ currentIdx: appState.currentIdx - 1 });
};

window.nextQuestion = () => {
    const qId = appState.questions[appState.currentIdx].id;
    if (!appState.answers[qId]) {
        alert(appState.lang === 'ja' ? '回答を選択してください' : 'Please select an option');
        return;
    }
    if (appState.currentIdx < appState.questions.length - 1) {
        setState({ currentIdx: appState.currentIdx + 1 });
    } else {
        calculateAndSaveResult();
    }
};

function calculateAndSaveResult() {
    const { typeStr, percentages } = calculateScore(appState.questions, appState.answers);
    const resultData = heroData.types[typeStr] || heroData.types[Object.keys(heroData.types)[0]];
    const titleStr = resultData.title[appState.lang];
    
    const date = new Date();
    const dateStr = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2,'0')}`;
    const newHistory = [{ date: dateStr, type: typeStr, title: titleStr, tier: appState.tier, percentages: percentages }, ...appState.history];
    
    localStorage.setItem('hero_enterprise_history', JSON.stringify(newHistory));
    setState({ history: newHistory });

    const payload = {
        companyId: appState.employeeInfo.companyId,
        employeeId: appState.employeeInfo.id,
        department: appState.employeeInfo.dept,
        role: appState.employeeInfo.role,
        date: dateStr,
        type: typeStr,
        title: titleStr,
        tier: appState.tier,
        percentages: percentages
    };

    fetch('/api/save-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        console.log('[System] Data synchronization completed securely.');
    })
    .catch(err => console.error('[System] Sync failed. Off-line or server error.'));

    displayResultScreen(typeStr, percentages);
}

window.loadResultFromHistory = (index) => {
    const item = appState.history[index];
    let percs = item.percentages;
    if (!percs) {
        percs = {
            H: item.type[0] === 'H' ? 80 : 20,
            E: item.type[1] === 'H' ? 80 : 20,
            R: item.type[2] === 'H' ? 80 : 20,
            O: item.type[3] === 'H' ? 80 : 20
        };
    }
    displayResultScreen(item.type, percs);
};

function displayResultScreen(typeStr, percentages) {
    const resultData = heroData.types[typeStr] || heroData.types[Object.keys(heroData.types)[0]];
    const titleStr = resultData.title[appState.lang];
    
    const text = appState.lang === 'ja' 
        ? `心理的資本アセスメント(HERO)の解析結果：\n私のコンピテンシークラスは【 ${typeStr} : ${titleStr} 】でした。\n\n`
        : `HERO Psychological Capital Assessment:\nMy competency class is [ ${typeStr} : ${titleStr} ].\n\n`;

    document.getElementById('result-type').innerText = `Class: ${typeStr}`;
    document.getElementById('result-title').innerText = titleStr;
    document.getElementById('result-profile').innerText = resultData.profile[appState.lang];
    document.getElementById('result-action').innerText = resultData.action_plan[appState.lang];
    
    const imgContainer = document.querySelector('#screen-result div[style*="width: 80px"]');
    if(imgContainer) {
        imgContainer.innerHTML = `<span style="font-size: 20px; font-weight: bold; color: var(--accent-color); line-height: 80px; letter-spacing: 2px;">${typeStr}</span>`;
    }

    ['h', 'e', 'r', 'o'].forEach(cat => {
        const bar = document.getElementById(`bar-${cat}`);
        if(bar) bar.style.width = `${percentages[cat.toUpperCase()]}%`;
    });

    generateAffinityList(typeStr);
    setState({ screen: 'result', shareText: text });
}

function generateAffinityList(baseType) {
    const affinityListDiv = document.getElementById('affinity-list');
    affinityListDiv.innerHTML = '';
    let results = [];
    
    for (const [targetType, targetData] of Object.entries(heroData.types)) {
        const affData = calcAffinityLogic(baseType, targetType, appState.lang);
        results.push({ type: targetType, title: targetData.title[appState.lang], score: affData.score, relation: affData.relation });
    }
    
    results.sort((a, b) => b.score - a.score).forEach(item => {
        const div = document.createElement('div');
        div.className = 'affinity-item';
        div.innerHTML = `<div class="affinity-type">[${item.type}]</div><div class="affinity-title">${item.title}</div>
                         <div class="affinity-score-box"><span class="affinity-relation">${item.relation}</span><strong style="color:#222;">${item.score}</strong></div>`;
        affinityListDiv.appendChild(div);
    });
}

window.checkQuickAffinity = () => {
    const resultData = calcAffinityLogic(appState.affinityA, appState.affinityB, appState.lang);
    setState({ affinityResult: resultData });
};

window.clearHistory = () => {
    if(confirm(appState.lang === 'ja' ? '受診履歴をすべて消去しますか？' : 'Clear all assessment history?')) {
        localStorage.removeItem('hero_enterprise_history');
        setState({ history: [] });
    }
};

window.shareOnX = () => {
    const url = "https://wearehero.vercel.app/";
    const hashtags = "心理的資本,HEROアセスメント,組織開発";
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(appState.shareText)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;
    window.open(intentUrl, '_blank', 'noopener,noreferrer');
};

render();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').catch(err => console.log('SW error: ', err));
    });
}