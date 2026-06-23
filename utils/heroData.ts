// WE ARE HERO 診断データ（企業・組織マネジメント向けリファクタリング版）
export const heroData = {
  "app_config": {
    "title": {
      "ja": "心理的資本アセスメント",
      "en": "Psychological Capital Assessment"
    },
    "description": {
      "ja": "心理的資本（HERO）に基づく組織レジリエンス及びコンピテンシー診断",
      "en": "Competency & Resilience Assessment based on Psychological Capital (HERO)"
    },
    "scale": [
      { "value": 1, "label": { "ja": "全く当てはまらない", "en": "Strongly Disagree" } },
      { "value": 2, "label": { "ja": "あまり当てはまらない", "en": "Disagree" } },
      { "value": 3, "label": { "ja": "どちらともいえない", "en": "Neutral" } },
      { "value": 4, "label": { "ja": "やや当てはまる", "en": "Agree" } },
      { "value": 5, "label": { "ja": "非常に当てはまる", "en": "Strongly Agree" } }
    ]
  },
  "questions": [
    { "id": "q01", "category": "H", "tier": 1, "is_reversed": false, "text": { "ja": "目標への道が絶たれても、即座に「プランB」の構築に取り掛かることができる。", "en": "Even if the path to my goal is cut off, I can immediately start building 'Plan B'." } },
    { "id": "q02", "category": "H", "tier": 1, "is_reversed": true, "text": { "ja": "現在のプロジェクトにおいて、自分がどこに向かっているのか分からなくなることが多い。", "en": "In my current projects, I often lose sight of where I am heading." } },
    { "id": "q03", "category": "H", "tier": 1, "is_reversed": false, "text": { "ja": "ゴールが遠くても、今この瞬間の泥臭い作業がそこへ繋がっていると実感できる。", "en": "Even if the goal is distant, I feel that my current gritty tasks are connected to it." } },
    { "id": "q04", "category": "E", "tier": 1, "is_reversed": false, "text": { "ja": "未経験のタスクを任されても、「最終的には自分がなんとかする」という確信がある。", "en": "When assigned an unexperienced task, I am confident that 'I will manage it in the end'." } },
    { "id": "q05", "category": "E", "tier": 1, "is_reversed": true, "text": { "ja": "自分の能力を超える課題に直面すると、立ちすくんでしまう。", "en": "I freeze when faced with challenges that exceed my capabilities." } },
    { "id": "q06", "category": "E", "tier": 1, "is_reversed": false, "text": { "ja": "過去の成功体験が、今の新しい挑戦の支えになっている。", "en": "Past successful experiences support my current new challenges." } },
    { "id": "q07", "category": "R", "tier": 1, "is_reversed": false, "text": { "ja": "理不尽なトラブルで計画が崩壊しても、翌日には平常心のルーティンに戻ることができる。", "en": "Even if unreasonable troubles destroy my plans, I can return to my normal routine the next day." } },
    { "id": "q08", "category": "R", "tier": 1, "is_reversed": true, "text": { "ja": "一度の大きな失敗を引きずり、数日間パフォーマンスが落ちることがある。", "en": "I sometimes drag out a major failure, causing my performance to drop for days." } },
    { "id": "q09", "category": "R", "tier": 1, "is_reversed": false, "text": { "ja": "強いストレスを感じた時、それを断ち切るための「自分なりの儀式（行動）」を持っている。", "en": "When feeling extreme stress, I have my own 'ritual' to break it off." } },
    { "id": "q10", "category": "O", "tier": 1, "is_reversed": false, "text": { "ja": "仕事での失敗は、自分の能力不足というより「一時的な環境や運の要素」が強かったと切り替えられる。", "en": "I can shift my mindset to view work failures as 'temporary environmental or luck factors' rather than a lack of ability." } },
    { "id": "q11", "category": "O", "tier": 1, "is_reversed": true, "text": { "ja": "ひとつのミスが、今後のキャリアすべてを台無しにするような恐怖を感じる。", "en": "I fear that a single mistake will ruin my entire career." } },
    { "id": "q12", "category": "O", "tier": 1, "is_reversed": false, "text": { "ja": "今の苦境は長くは続かず、やがて潮目が変わると信じている。", "en": "I believe the current hardship won't last long and the tide will eventually turn." } },
    { "id": "q13", "category": "H", "tier": 2, "is_reversed": false, "text": { "ja": "複数のアプローチを同時に走らせ、どれかが失敗してもダメージを最小限に抑える準備をしている。", "en": "I run multiple approaches simultaneously to minimize damage if one fails." } },
    { "id": "q14", "category": "H", "tier": 2, "is_reversed": true, "text": { "ja": "ゴールまでの道筋は一つしかなく、それが塞がれたら終わりだと感じる。", "en": "I feel there is only one path to the goal, and if it's blocked, it's over." } },
    { "id": "q15", "category": "H", "tier": 2, "is_reversed": false, "text": { "ja": "周囲が諦めるような状況でも、突破口を見つけるための議論を主導できる。", "en": "Even when others give up, I can lead discussions to find a breakthrough." } },
    { "id": "q16", "category": "H", "tier": 2, "is_reversed": false, "text": { "ja": "目標自体が途中で変わっても、モチベーションを落とさずに再設定できる。", "en": "If the goal itself changes mid-way, I can reset without losing motivation." } },
    { "id": "q17", "category": "E", "tier": 2, "is_reversed": false, "text": { "ja": "誰もやりたがらない地味な仕事でも、自分がやれば価値を生み出せると思う。", "en": "Even in tedious jobs no one wants, I believe I can create value." } },
    { "id": "q18", "category": "E", "tier": 2, "is_reversed": true, "text": { "ja": "専門外の話題について意見を求められると、極度に萎縮してしまう。", "en": "I shrink back extremely when asked for opinions outside my expertise." } },
    { "id": "q19", "category": "E", "tier": 2, "is_reversed": false, "text": { "ja": "周囲の評価がどうであれ、自分の生み出した成果物には絶対の自信を持っている。", "en": "Regardless of others' evaluations, I have absolute confidence in the output I create." } },
    { "id": "q20", "category": "E", "tier": 2, "is_reversed": false, "text": { "ja": "失敗するかもしれない恐怖よりも、自分の仮説を証明したい欲求が勝る。", "en": "The desire to prove my hypothesis outweighs the fear of potential failure." } },
    { "id": "q21", "category": "R", "tier": 2, "is_reversed": false, "text": { "ja": "長期にわたる単調で遅効性のタスクを、淡々と継続できる。", "en": "I can stoically continue long-term, monotonous, slow-yielding tasks." } },
    { "id": "q22", "category": "R", "tier": 2, "is_reversed": true, "text": { "ja": "批判的なフィードバックを受けると、人格まで否定されたように感じてしまう。", "en": "I feel my entire character is denied when I receive critical feedback." } },
    { "id": "q23", "category": "R", "tier": 2, "is_reversed": false, "text": { "ja": "納得のいかないルールや理不尽な環境下でも、感情を殺して実利を取る立ち回りができる。", "en": "Even under unacceptable rules, I can kill my emotions and maneuver for practical gains." } },
    { "id": "q24", "category": "R", "tier": 2, "is_reversed": false, "text": { "ja": "燃え尽き症候群の兆候を自分で察知し、意図的に休むことができる。", "en": "I can detect signs of burnout myself and intentionally take a rest." } },
    { "id": "q25", "category": "O", "tier": 2, "is_reversed": false, "text": { "ja": "自分の努力が評価されなかった時、「相手の見る目がないだけだ」と笑って流すことができる。", "en": "When my efforts go unrewarded, I can laugh it off thinking 'They just lack the eye for it'." } },
    { "id": "q26", "category": "O", "tier": 2, "is_reversed": true, "text": { "ja": "トラブルが起きた際、解決よりも先に「誰のせいか」を気にしてしまう。", "en": "When trouble occurs, I worry about 'whose fault it is' before finding a solution." } },
    { "id": "q27", "category": "O", "tier": 2, "is_reversed": false, "text": { "ja": "不確実な要素が多いプロジェクトほど、面白い化学反応が起きるとワクワクする。", "en": "The more uncertain a project is, the more excited I get about interesting chemical reactions." } },
    { "id": "q28", "category": "O", "tier": 2, "is_reversed": true, "text": { "ja": "悪い予測が当たった時、「やはりダメだったか」と妙に安堵してしまう自分がいる。", "en": "When a bad prediction comes true, a part of me feels oddly relieved thinking 'I knew it wouldn't work'." } },
    { "id": "q29", "category": "H", "tier": 3, "is_reversed": false, "text": { "ja": "巨大な目標を、今日一日の具体的なスモールタスクにまで分解する解像度を持っている。", "en": "I have the resolution to break down massive goals into concrete small tasks for today." } },
    { "id": "q30", "category": "H", "tier": 3, "is_reversed": true, "text": { "ja": "他人の成功を見ると、自分の選んだ道が間違っているのではないかと激しく焦る。", "en": "Seeing others' success makes me severely anxious that I chose the wrong path." } },
    { "id": "q31", "category": "H", "tier": 3, "is_reversed": false, "text": { "ja": "資源が枯渇していても、別のところから引っ張ってくる「悪知恵」が働く。", "en": "Even when resources are depleted, my 'cunning' kicks in to pull them from elsewhere." } },
    { "id": "q32", "category": "H", "tier": 3, "is_reversed": true, "text": { "ja": "「なぜそれをやるのか」という根本的な意義を見失い、突然手が止まることがある。", "en": "I sometimes suddenly stop working, losing sight of the fundamental 'why' behind it." } },
    { "id": "q33", "category": "H", "tier": 3, "is_reversed": false, "text": { "ja": "絶対に勝てない戦いであっても、撤退戦を指揮して被害を最小化する戦略を描ける。", "en": "Even in an unwinnable battle, I can draw a strategy to lead a retreat and minimize damage." } },
    { "id": "q34", "category": "E", "tier": 3, "is_reversed": true, "text": { "ja": "自分の代わりはいくらでもいると、心の底で冷めている。", "en": "Deep down, I am coldly aware that I am completely replaceable." } },
    { "id": "q35", "category": "E", "tier": 3, "is_reversed": false, "text": { "ja": "ツールや環境が劣悪でも、自分の腕前だけで一定のクオリティを叩き出せる。", "en": "Even with poor tools or environments, I can deliver a certain quality using just my skills." } },
    { "id": "q36", "category": "E", "tier": 3, "is_reversed": true, "text": { "ja": "自分より圧倒的に優秀な人間を前にすると、戦う前から諦めてしまう。", "en": "Faced with an overwhelmingly superior person, I give up before the fight starts." } },
    { "id": "q37", "category": "E", "tier": 3, "is_reversed": false, "text": { "ja": "権威ある人間の意見でも、論理がおかしければ臆せず反論できる。", "en": "Even against authority, I can fearlessly object if their logic is flawed." } },
    { "id": "q38", "category": "E", "tier": 3, "is_reversed": false, "text": { "ja": "自分の価値は「何ができるか」ではなく、「何を成し遂げたか」でのみ証明されると思う。", "en": "I believe my value is proven only by 'what I have accomplished', not 'what I can do'." } },
    { "id": "q39", "category": "R", "tier": 3, "is_reversed": false, "text": { "ja": "毎日の生活において、感情の起伏とは無関係に「絶対にやる」と決めている習慣がある。", "en": "In my daily life, I have a habit I 'absolutely do' regardless of my emotional ups and downs." } },
    { "id": "q40", "category": "R", "tier": 3, "is_reversed": true, "text": { "ja": "予期せぬトラブルが起きた時、心臓の鼓動が早くなり、冷静な判断ができなくなる。", "en": "When unexpected trouble occurs, my heart races and I lose calm judgment." } },
    { "id": "q41", "category": "R", "tier": 3, "is_reversed": true, "text": { "ja": "過去の失敗の記憶が突然フラッシュバックして、身動きがとれなくなることがある。", "en": "Memories of past failures sometimes suddenly flash back, paralyzing me." } },
    { "id": "q42", "category": "R", "tier": 3, "is_reversed": false, "text": { "ja": "どん底の状態にあっても、「この状況をどうやってネタにしてやろうか」と考える自分がいる。", "en": "Even at rock bottom, a part of me thinks 'how can I turn this situation into a good story?'" } },
    { "id": "q43", "category": "R", "tier": 3, "is_reversed": true, "text": { "ja": "他者のミスで自分のペースが乱された時、激しい怒りが湧き、平常心に戻るのに時間がかかる。", "en": "When others' mistakes disrupt my pace, intense anger wells up, taking time to calm down." } },
    { "id": "q44", "category": "O", "tier": 3, "is_reversed": false, "text": { "ja": "チームの空気が最悪な時、あえて道化を演じてでも空気を変えようと動くことができる。", "en": "When team morale is at its worst, I can play the fool just to change the atmosphere." } },
    { "id": "q45", "category": "O", "tier": 3, "is_reversed": true, "text": { "ja": "完璧な準備ができないなら、最初からやらない方がマシだと考える。", "en": "If I can't prepare perfectly, I'd rather not do it at all." } },
    { "id": "q46", "category": "O", "tier": 3, "is_reversed": false, "text": { "ja": "何事も「なんとかなる」ではなく、「自分がなんとかするから大丈夫だ」という能動的な楽観を持っている。", "en": "I hold an active optimism not of 'it will work out', but 'it will be fine because I will make it work'." } },
    { "id": "q47", "category": "O", "tier": 3, "is_reversed": true, "text": { "ja": "成功した時でさえ、「次は失敗するかもしれない」という不安が常に消えない。", "en": "Even when successful, the anxiety that 'I might fail next time' never disappears." } },
    { "id": "q48", "category": "O", "tier": 3, "is_reversed": false, "text": { "ja": "世界や社会は基本的に不条理であり、だからこそ自分が面白いと思うことだけをやるべきだと思う。", "en": "The world is fundamentally absurd, which is exactly why I should only do what I find interesting." } }
  ],
  "types": {
    "HHHH": {
      "title": { "ja": "自律型ハイパフォーマー", "en": "Autonomous High-Performer" },
      "profile": { "ja": "すべての心理的資本が極めて高い水準にあります。外部環境の変化や不確実なノイズに一切動じることなく、自らマイルストーンを設定し、ストイックに目標を完遂する能力を有します。組織における強力な推進力となる一方、自己基準が高すぎるために他者の課題への共感やフォローが不足するリスクを内包しています。", "en": "All parameters maxed out. You are a self-driven engine who completes goals without being shaken by external noise. While a core driver, ensure you don't alienate others with your high standard." },
      "action_plan": { "ja": "現在の高度なセルフマネジメント習慣を維持してください。ただしチーム運営においては、自身の基準をメンバーに強制せず、個々の心理的資本を育てるメンターとしてのアプローチを意識すると組織全体の成果に繋がります。", "en": "Maintain your habits, but focus on nurturing others instead of imposing your standards." },
      "affinity": {
        "best_partner": "LLLL",
        "partner_title": { "ja": "リスク検知型リスクアナリスト", "en": "Risk-Detecting Analyst" },
        "reason": { "ja": "あなたが前進を最優先する影で、彼らがプロジェクトに潜む致命的な盲点や法的・運用的リスクを緻密に検知します。死角を完璧に補完し合える最強の設計・実行ペアとなります。", "en": "They detect critical blind spots while you charge forward, establishing a perfect risk-mitigation partnership." }
      }
    },
    "HHHL": {
      "title": { "ja": "リスク管理型ストラテジスト", "en": "Risk-Management Strategist" },
      "profile": { "ja": "優れた実行力と高い目標を持ちながら、常に『最悪のシナリオ』を想定して動く冷徹な論理思考の持ち主です。無根拠な楽観を徹底的に排除するため、構築する計画や戦略には一切の隙がありません。しかし、その慎重さと厳格さゆえに、チームに過度な緊張感や心理的プレッシャーを与える傾向があります。", "en": "High capability combined with defensive realism. You create flawless plans by assuming the worst, but may accidentally pressure team morale." },
      "action_plan": { "ja": "完璧主義は大きな武器ですが、時にメンバーの挑戦意欲を削ぐ要因となります。意図的に要件定義やスケジュールに『バッファ（遊びの要素）』を持たせるシステム設計を意識してください。", "en": "Incorporate intentional cushions into your projects to ensure your team's psychological safety." },
      "affinity": {
        "best_partner": "LLLH",
        "partner_title": { "ja": "組織心理安全性ビルダー", "en": "Psychological Safety Builder" },
        "reason": { "ja": "あなたの厳格な管理体制と張り詰めた論理的緊張感を、彼らの柔軟で前向きな姿勢が自然と緩和します。組織の早期離職や機能不全を防ぎ、持続可能なチームへと変貌させます。", "en": "Their flexible, positive attitude neutralizes your rigid tension, preserving long-term team sustainability." }
      }
    },
    "HHLH": {
      "title": { "ja": "先行突破型エースプレイヤー", "en": "Front-Line Ace Player" },
      "profile": { "ja": "高いモチベーションと自己効力感に溢れ、組織の目標に向かって鮮やかに成果を叩き出す切り込み隊長です。順風満帆な状況下で最も輝きますが、予期せぬ大きな挫折や理不尽な環境変化に対する耐性（Resilience）が低いため、一度歯車が狂うと大幅にパフォーマンスを低下させる脆さを秘めています。", "en": "Brimming with target drive and energy. You excel in stable or growth phases, but are highly vulnerable to sudden, chaotic market setbacks." },
      "action_plan": { "ja": "メンタルの破綻を防ぐため、挑戦の初期段階で客観的な『撤退基準（損切りライン）』をルール化してください。精神力で耐えようとするのではなく、失敗時のリカバリー手順をマニュアル化することが安定に繋がります。", "en": "Establish objective retreat criteria beforehand. Rely on structured recovery processes rather than raw willpower." },
      "affinity": {
        "best_partner": "LLHL",
        "partner_title": { "ja": "高耐久型バックオフィサー", "en": "Highly Durable Controller" },
        "reason": { "ja": "あなたが不測の事態で一時的に機能停止に陥った際、彼らが無感情に、かつ確実にフロントラインを守秘・維持します。あなたが再起して戦線復帰するための時間を稼ぐ盾となります。", "en": "When you fracture, their stoic defense holds the fort, giving you the necessary window to mentally reset." }
      }
    },
    "HHLL": {
      "title": { "ja": "論理構築型システムアーキテクト", "en": "Logical System Architect" },
      "profile": { "ja": "高い専門能力をベースに完璧な要件定義やシステム設計を行う天才肌ですが、現場の泥臭い仕様変更や想定外の突発アクシデントに対する復帰力・楽観性を欠いています。ドキュメントや計算通りに進行するクローズドな環境において、他の追随を許さない圧倒的なバリューを発揮します。", "en": "A blueprint genius who designs flawless workflows, yet easily destabilized by unstructured real-world errors and chaos." },
      "action_plan": { "ja": "「設計崩壊＝ゲームオーバー」という二元論的な思考を修正しましょう。エラーハンドリングと同様に、最初から『計画は現場で2割崩れるもの』と要件に論理的に組み込むことで、視野が広がります。", "en": "Treat real-world planning errors as expected runtime anomalies; dynamically build slack into requirements." },
      "affinity": {
        "best_partner": "LLHH",
        "partner_title": { "ja": "現場適応型サバイバー", "en": "Field Adaptation Survivor" },
        "reason": { "ja": "あなたの精緻な設計図が予測不可能な現場のトラブルで頓挫した時、泥臭いアドホックな対応でシステムを強引に軌道修正してくれる最強の実働部隊として機能します。", "en": "When theoretical plans fail on the ground, their grit and practical adaptation realign the project to success." }
      }
    },
    "HLHH": {
      "title": { "ja": "不屈のフォロワーシップリーダー", "en": "Resilient Followership Leader" },
      "profile": { "ja": "自己評価や個人の能力に対する自信は控えめですが、何度打撃を受けても即座に立ち上がり、常に前を向き続ける圧倒的な復帰力と能動的楽観性を備えています。その泥臭くひたむきな姿勢は、周囲のメンバーのモチベーションを高め、結果的に組織から最も支援される結節点となります。", "en": "Modest self-assessment but paired with endless resilience. Your persistence wins the deep trust and support of your peers." },
      "action_plan": { "ja": "自信の低さを過度に気にする必要はありません。あなたの最大のコンピテンシーは『打たれ強さと粘り強さ』です。そのまま打席に立ち続け、行動量で周囲の基準を引き上げてください。", "en": "Do not fear low self-confidence. Your durability is your ultimate weapon; maintain your high frequency of action." },
      "affinity": {
        "best_partner": "LHLL",
        "partner_title": { "ja": "単独型テクニカルスペシャリスト", "en": "Isolated Technical Specialist" },
        "reason": { "ja": "あなたが泥臭く矢面に立ち、交渉や折衝のヘイトを引き受けている間に、彼らが高度な技術力をもってピンポイントで致命的な課題を解決してくれます。", "en": "While you clear interpersonal friction and blockages, they apply deep technical solutions to resolve critical blocks." }
      }
    },
    "HLHL": {
      "title": { "ja": "寡黙な職人肌スペシャリスト", "en": "Stoic Craft Specialist" },
      "profile": { "ja": "自己顕示欲や無根拠なポジティブさは皆無です。しかし「目標への執念」と「静かなる再起力」だけでタスクを地道に処理し続ける修羅の一面を持ちます。不条理な環境や苦痛を糧に変え、エンジニアリングや研究開発など、孤独な深掘りが必要な領域で無類の強さを誇ります。", "en": "Fueled by sheer persistence and resilient focus rather than charisma. Exceptionally strong in research or deep programming." },
      "action_plan": { "ja": "自己を追い込みすぎる傾向があり、限界値を突破した際に突然燃え尽きるリスクがあります。自身の感覚ではなく、稼働時間やタスク完了率などの客観的なデータに基づいて強制休養を挟んでください。", "en": "Prone to sudden burnout due to excessive internal pressure. Use quantitative hard limits to mandate rest cycles." },
      "affinity": {
        "best_partner": "LHLH",
        "partner_title": { "ja": "変革型イノベーションアドバイザー", "en": "Agile Innovation Advisor" },
        "reason": { "ja": "あなたの重苦しくなりがちな執念に、彼らが軽快なフットワークと新規のトレンド視点をもたらし、停滞していた業務に思いもよらぬブレイクスルー（近道）を発生させます。", "en": "They inject agility and lateral market insights into your deep focus, engineering unexpected shortcuts." }
      }
    },
    "HLLH": {
      "title": { "ja": "未来開拓型イノベーター", "en": "Visionary Concept Innovator" },
      "profile": { "ja": "実務的な耐久力や詳細な計算力は発展途上ですが、常に市場の明るい未来の可能性を信じ、常識に囚われないプロダクトコンセプトや事業アイデアを量産する企画タイプです。組織の閉塞感を打破する『発射台』として機能します。", "en": "High conceptual vision and optimism, but loose on operational endurance. Act as a catalyst for organizational breakthroughs." },
      "action_plan": { "ja": "アイデアの提示だけで自己満足して終わらせない仕組みが必要です。あなたの抽象的な構想を具現化し、実業務に落とし込んでくれる『緻密な実行役』と強固なペアリングを組んでください。", "en": "Ideas alone hold no commercial value. Ensure you secure an operational executor to ground your high-level plans." },
      "affinity": {
        "best_partner": "LHHL",
        "partner_title": { "ja": "実務特化型エグゼキューター", "en": "Objective Task Executor" },
        "reason": { "ja": "あなたの突飛で抽象的なビジネス構想を、彼らが一切の感情やバイアスを交えずに、極めて正確なコード、ドキュメント、業務フローへと落とし込みます。", "en": "They masterfully operationalize your raw abstract visions into strict, flawless functional assets." }
      }
    },
    "HLLL": {
      "title": { "ja": "思慮深い長期的ビジャナリー", "en": "Prudent Long-Term Visionary" },
      "profile": { "ja": "目指すべき高い長期ビジョンを内包しながらも、現状への自己不信と不安から、意思決定に遅れが生じやすい苦悩型のプランナーです。しかし、リスクに対して誰よりも真摯に向き合うため、その歩みは遅くとも確実に組織を正しい方向へ導く性質を持っています。", "en": "Possesses sharp target vision but hindered by heavy analytical anxiety. Your slow trajectory is highly deliberate and safe." },
      "action_plan": { "ja": "ビジョンの心理的ハードルを意図的に下げましょう。壮大な目標に萎縮する前に、本日中に完結できる最小単位のプロトタイプ構築（PoC）に強制的に手を付けるルールを運用してください。", "en": "Deconstruct your grand roadmap into immediate, low-stakes micro-tasks to bypass paralysis by analysis." },
      "affinity": {
        "best_partner": "LHHH",
        "partner_title": { "ja": "超短期集中型タスクバスター", "en": "High-Velocity Task Buster" },
        "reason": { "ja": "あなたがリスクを恐れて意思決定を躊躇している目の前の障壁を、彼らが持ち前の機動力とタフネスによってノータイムで物理的に突破・排除してくれます。", "en": "They physically clear immediate blockages without overthinking, complementing your cautious strategy." }
      }
    },
    "LHHH": {
      "title": { "ja": "機動型プロダクトエグゼキューター", "en": "High-Velocity Task Buster" },
      "profile": { "ja": "抽象的な中長期戦略や大義名分を考えるのは苦手ですが、圧倒的な自己効力感とタフネスにより、割り当てられた目の前の業務や技術的バグを高速で粉砕し続ける現場最強のエンジンです。不確実性の高いスタートアップ環境や修羅場で無類の強さを発揮します。", "en": "Lacks vertical vision but operates at maximum velocity and confidence on explicit tasks. A powerful operational engine." },
      "action_plan": { "ja": "「どこに向かって開発・運用すべきか」の方向付けは完全に割り切り、信頼できる他者に委ねてください。あなたは要件定義されたバックログを最速・最高品質で消化することにステータスを全振りして構いません。", "en": "Outsource macro strategic alignment to peers, and double down on processing actionable task backlogs." },
      "affinity": {
        "best_partner": "HLLL",
        "partner_title": { "ja": "思慮深い長期的ビジャナリー", "en": "Prudent Long-Term Visionary" },
        "reason": { "ja": "推進方向を見失いがちなあなたに対し、彼らが苦悩と精緻な分析の果てに導き出した「絶対に踏み外さない技術的・経営的羅針盤」を提示してくれます。", "en": "They supply the highly calibrated navigation matrix you lack, providing clear intent for your momentum." }
      }
    },
    "LHHL": {
      "title": { "ja": "実務特化型エグゼキューター", "en": "Objective Task Executor" },
      "profile": { "ja": "過度な情熱や無根拠なビジョンには依存しません。与えられたミッション、要件定義書、開発仕様書を完璧かつ精緻に遂行することに無上のプロ意識を持つ職人です。感情の起伏に左右されずコードやクオリティを維持できる、組織の絶対的な安定軸です。", "en": "Detached from emotional highs or abstract hype; motivated purely by operational mechanics and flawless output." },
      "action_plan": { "ja": "無理に熱いモチベーションを自己捏造する必要はありません。「成果物の品質そのものが自己のプロフェッショナリズムの証明である」という独自の美学に立脚し、設計やコードをどこまでも洗練させてください。", "en": "Do not force emotional buy-in. Rely on your internal benchmark of professional technical excellence." },
      "affinity": {
        "best_partner": "HLLH",
        "partner_title": { "ja": "未来開拓型イノベーター", "en": "Visionary Concept Innovator" },
        "reason": { "ja": "あなたに欠けている「突飛だが市場を揺るがす熱量あるビジョン」を彼らが惜しみなく供給し、あなたの精密な技術力・実務能力に最大の存在意義と爆発的な価値を与えます。", "en": "They feed the market intuition you lack, generating structural opportunities to deploy your precise skill set." }
      }
    },
    "LHLH": {
      "title": { "ja": "変革型イノベーションアドバイザー", "en": "Agile Innovation Advisor" },
      "profile": { "ja": "重厚な粘り強さや長期の目標管理は苦手ですが、自分のスキルに対する確かな自信と、圧倒的な状況適応力・ノリの良さだけで予期せぬピンチを臨機応変に切り抜けるアドホック開発の天才肌です。プロトタイピングの初期フェーズにおいて圧倒的な価値を生み出します。", "en": "Sprints on confidence and contextual adaptation rather than endurance. Masterful at rapid, loose prototyping." },
      "action_plan": { "ja": "泥沼の長期戦や保守運用フェーズはあなたのパフォーマンスを低下させます。短期決戦型の新規立ち上げや、即効性のある概念実証（PoC）の高速開発、一撃離脱が可能な役割に特化してください。", "en": "Avoid multi-year maintenance cycles. Focus entirely on early-stage deployment, POC validation, and fast delivery." },
      "affinity": {
        "best_partner": "HLHL",
        "partner_title": { "ja": "寡黙な職人肌スペシャリスト", "en": "Stoic Craft Specialist" },
        "reason": { "ja": "あなたがアイデアを形にして初期検証を終え、飽きて手放しそうになったシステムやプロジェクトを、彼らが執念をもって泥臭く保守・リファクタリングし、商用レベルへ完遂してくれます。", "en": "They absorb your high-turnover prototypes and stoically refactor them into high-availability production code." }
      }
    },
    "LHLL": {
      "title": { "ja": "単独型テクニカルスペシャリスト", "en": "Isolated Technical Specialist" },
      "profile": { "ja": "組織への帰属意識や経営理念への共感は低く、自身の高度なテクニカルスキルのみを信頼してタスクに臨む一匹狼型のプロフェッショナルです。チームビルディングや会議を極端に嫌いますが、誰も解決できない難解な技術的障害を単独で解決する卓越したアビリティを持っています。", "en": "Cynical of corporate culture, tracking value purely via your skill vector. Solves complex engineering blockers solo." },
      "action_plan": { "ja": "組織に無理に同化しようとストレスを溜めるのは悪手です。自身の技術的強みを『機能単位で切り売り・提供』できる特務ポジションや独立性の高いアーキテクトとしての地位を早期に確立してください。", "en": "Do not exhaust yourself on consensus-building. Establish a discrete technical domain where you operate autonomously." },
      "affinity": {
        "best_partner": "HLHH",
        "partner_title": { "ja": "不屈のフォロワーシップリーダー", "en": "Resilient Followership Leader" },
        "reason": { "ja": "あなたが技術開発に100%集中できるよう、彼らが泥臭く社内政治や他部署との折衝、ヘイト管理をすべて引き受けて守る強固な盾（防波堤）として機能してくれます。", "en": "They absorb administrative friction and team politics, providing an insulated sandbox for you to code." }
      }
    },
    "LLHH": {
      "title": { "ja": "現場適応型サバイバー", "en": "Field Adaptation Survivor" },
      "profile": { "ja": "突出した自己肯定感や崇高なキャリアビジョンは持ち合わせていませんが、理不尽な環境変化や崩壊した現場を耐え抜き、状況を能動的に好転させる圧倒的な耐久力（Resilience）と楽観性を備えたサバイバーです。どんな過酷な案件でも絶対に破綻しない強みがあります。", "en": "Low baseline ego but immune to burnout. You stabilize toxic project environments through organic flexibility." },
      "action_plan": { "ja": "根拠のない大言壮語や無謀な自信は不要です。目の前の課題を泥臭く一つずつクリアし、過酷な現場をまた一つ『生存・完遂させた』という定量的なファクトのみを自身の誇りとして積み上げてください。", "en": "Ego is non-essential. Validate your self-worth through the sequential checklist of survived projects." },
      "affinity": {
        "best_partner": "HHLL",
        "partner_title": { "ja": "論理構築型システムアーキテクト", "en": "Logical System Architect" },
        "reason": { "ja": "彼らが設計した精緻な机上の理論やビジョンが現場の不条理で瓦解した瞬間、あなたの異常な現場復帰力と柔軟性が機能し、瓦礫の中からプロジェクトを強引に蘇生・再駆動させます。", "en": "When their pure architecture fragments in production, your survival reflex breathes immediate lifecycle back into it." }
      }
    },
    "LLHL": {
      "title": { "ja": "高耐久型バックオフィサー", "en": "Highly Durable Controller" },
      "profile": { "ja": "目立つ成果アピールや楽観的な予測は行わず、組織のセーフティネットとして機能する精神的サンドバッグ兼最強の防護盾です。負荷の高いルーティンワークや泥臭いガバナンス維持、インフラ保守などを黙々とノーミスで支え続けることができる、組織に不可欠な守護神です。", "en": "Low visibility, high asset. The structural anchor who quietly stabilizes governance and infrastructure under load." },
      "action_plan": { "ja": "防御コンピテンシーは組織内最高峰ですが、自ら攻撃を仕掛けるエネルギーを欠いています。あなたを都合のいい駒として使い潰すだけの過酷な環境（ブラックプロジェクト）からは、冷徹に、しかし確実にエスケープする防衛権を行使してください。", "en": "Your defense is maxed; your leverage is zero. Exercise calculated boundary controls against abusive workflows." },
      "affinity": {
        "best_partner": "HHLH",
        "partner_title": { "ja": "先行突破型エースプレイヤー", "en": "Front-Line Ace Player" },
        "reason": { "ja": "あなたがバックエンドで地密にリスクを吸収し戦線を死守している絶妙なタイミングで、彼らが華麗な一撃（新規受注やブレイクスルー）を放ち、一撃で全体の戦況・業績をひっくり返してくれます。", "en": "While you ground the system under high load, they score the strategic growth goals to pivot the division." }
      }
    },
    "LLLH": {
      "title": { "ja": "組織心理安全性ビルダー", "en": "Psychological Safety Builder" },
      "profile": { "ja": "過度な出世競争や厳しい目標設定からは距離を置いていますが、なぜか常にポジティブで、その場にいるだけで職場の殺伐とした空気を融解させる天然のオアシス型人材です。チーム全体の心理的安全性を根底から支える、隠れた重要バッファとなります。", "en": "Maintains low profile, high empathy. You act as an emotional shock absorber, reducing organizational friction." },
      "action_plan": { "ja": "無理にガツガツしたビジネスパーソンを演じる必要はありません。あなたの『そこにいるだけでチームの警戒心が緩み、本音の対話が始まる』という資質は、高度な組織潤滑油（チームビルディング資質）として誇るべきコンピテンシーです。", "en": "Do not fake aggressive ambition. Your structural value lies in de-escalating interpersonal stress matrix." },
      "affinity": {
        "best_partner": "HHHL",
        "partner_title": { "ja": "リスク管理型ストラテジスト", "en": "Risk-Management Strategist" },
        "reason": { "ja": "常に冷徹な論理思考で四方を警戒し、神経を極限まで擦り減らしているマネジメント層やリーダーにとって、あなたの作為のない自然体な存在そのものが、唯一のメンタル回復のセーフハウスとなります。", "en": "To hyper-vigilant executives draining their cognitive reserves, your sanctuary acts as their core recovery node." }
      }
    },
    "LLLL": {
      "title": { "ja": "危機察知型リスクアナリスト", "en": "Risk-Detecting Analyst" },
      "profile": { "ja": "エゴ、楽観性、エネルギー、目先の実行力などの全ステータスが平準化、または低位にあります。しかし、それは『あらゆる物事のネガティブな側面や脆弱性』を誰よりも敏感にキャッチできる、極めて高度なリスクセンサーとしてのトレードオフです。デバッグや内部統制で真価を発揮します。", "en": "All core metrics minimum. An optimized risk diagnostic array that visualizes systems failures before execution." },
      "action_plan": { "ja": "無理にポジティブシンキングを導入しようとしないでください。あなたの持つ『不安や警戒感』は、高度なリスクマネジメント能力の裏返しです。プロダクトのバグ出し、監査、脆弱性診断（デバッグ）にリソースを特化させましょう。", "en": "Suppress forced optimism. Your predictive anxiety is premium quality risk assurance; deploy to deep QA and auditing." },
      "affinity": {
        "best_partner": "HHHH",
        "partner_title": { "ja": "自律型ハイパフォーマー", "en": "Autonomous High-Performer" },
        "reason": { "ja": "あなたが日々怯え、アラートを発している『最悪のシナリオや想定バグ』を、彼らが一切の感情の動揺なく、圧倒的なパワーとセルフマネジメント力でねじ伏せ、物理的に解決・駆逐してくれます。", "en": "The systemic bugs you uncover, they eliminate with continuous execution capacity, neutralizing errors." }
      }
    }
  }
};

export function calculateScore(questions: any[], answers: Record<string, number>) {
  let scores: Record<string, number> = { H: 0, E: 0, R: 0, O: 0 };
  let counts: Record<string, number> = { H: 0, E: 0, R: 0, O: 0 };

  questions.forEach(q => {
    let val = answers[q.id];
    if (q.is_reversed) val = 6 - val;
    scores[q.category] += val;
    counts[q.category] += 1;
  });

  let typeStr = "";
  let percentages: Record<string, number> = {};
  
  ['H', 'E', 'R', 'O'].forEach(cat => {
    let avg = counts[cat] > 0 ? scores[cat] / counts[cat] : 0;
    typeStr += avg >= 3.0 ? "H" : "L";
    percentages[cat] = ((avg - 1) / 4) * 100;
  });

  return { typeStr, percentages };
}