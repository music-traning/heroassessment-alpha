// WE ARE HERO 診断データ（障害福祉・就労支援リファクタリング版）
export const heroData = {
  "app_config": {
    "title": {
      "ja": "就労準備・心理的資本アセスメント",
      "en": "Psychological Capital Assessment for Employment Support"
    },
    "description": {
      "ja": "心理的資本（HERO）に基づく、就労に向けた強みと個別支援のヒントの可視化",
      "en": "Visualizing strengths and individual support hints for employment based on Psychological Capital (HERO)"
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
    { "id": "q01", "category": "H", "tier": 1, "is_reversed": false, "text": { "ja": "希望する就職先や訓練がうまくいかなくても、すぐに別の方法や次の目標（プランB）を考えることができる。", "en": "Even if my desired job or training doesn't go well, I can immediately think of another method or next goal (Plan B)." } },
    { "id": "q02", "category": "H", "tier": 1, "is_reversed": true, "text": { "ja": "日々の通所や訓練の中で、自分が何を目指しているのか分からなくなることが多い。", "en": "During daily attendance and training, I often lose sight of what I am aiming for." } },
    { "id": "q03", "category": "H", "tier": 1, "is_reversed": false, "text": { "ja": "就労という目標が遠く感じても、今やっている地道な作業や訓練がそこへ繋がっていると実感できる。", "en": "Even if the goal of employment feels distant, I feel that the steady tasks and training I do now are connected to it." } },
    { "id": "q04", "category": "E", "tier": 1, "is_reversed": false, "text": { "ja": "初めて体験する作業やプログラムでも、「少しずつ練習すれば自分にもできるようになる」という確信がある。", "en": "Even with unexperienced tasks or programs, I am confident that 'I will be able to do it if I practice little by little'." } },
    { "id": "q05", "category": "E", "tier": 1, "is_reversed": true, "text": { "ja": "今の自分には難しいと感じる作業に直面すると、パニックになったり立ちすくんだりしてしまう。", "en": "I panic or freeze when faced with tasks that I feel are currently too difficult for me." } },
    { "id": "q06", "category": "E", "tier": 1, "is_reversed": false, "text": { "ja": "これまでに「できた」という体験が、今の新しい作業や訓練に挑戦する支えになっている。", "en": "Past experiences of 'I did it' support my current challenges in new tasks and training." } },
    { "id": "q07", "category": "R", "tier": 1, "is_reversed": false, "text": { "ja": "予定が急に変更されたりトラブルがあっても、翌日にはいつも通りのペースで通所や作業に戻ることができる。", "en": "Even if plans suddenly change or there is trouble, I can return to my normal pace of attendance and tasks the next day." } },
    { "id": "q08", "category": "R", "tier": 1, "is_reversed": true, "text": { "ja": "作業でのミスや対人関係の失敗を引きずり、数日間、体調や気分が落ち込むことがある。", "en": "I sometimes drag out mistakes in tasks or interpersonal failures, causing my physical condition and mood to drop for days." } },
    { "id": "q09", "category": "R", "tier": 1, "is_reversed": false, "text": { "ja": "強いストレスや疲れを感じた時、気持ちを切り替えるための「自分なりのリラックス方法」を持っている。", "en": "When feeling extreme stress or fatigue, I have my own 'relaxation method' to switch my mood." } },
    { "id": "q10", "category": "O", "tier": 1, "is_reversed": false, "text": { "ja": "作業での失敗は、自分を責めるのではなく「体調やタイミングが悪かっただけだ」と気持ちを切り替えられる。", "en": "I can shift my mindset to view task failures as 'just bad physical condition or timing' rather than blaming myself." } },
    { "id": "q11", "category": "O", "tier": 1, "is_reversed": true, "text": { "ja": "ひとつのミスが、今後の「就労や自立」のすべてを台無しにしてしまうような恐怖を感じる。", "en": "I fear that a single mistake will ruin everything about my future 'employment and independence'." } },
    { "id": "q12", "category": "O", "tier": 1, "is_reversed": false, "text": { "ja": "今のつらい状況は長くは続かず、焦らずにいればやがて良くなっていくと信じている。", "en": "I believe the current painful situation won't last long, and things will eventually get better if I don't rush." } },
    { "id": "q13", "category": "H", "tier": 2, "is_reversed": false, "text": { "ja": "ひとつのやり方にこだわらず、うまくいかなかった時のために別のやり方も考えておくことができる。", "en": "I don't stick to one method and can think of other ways in case things don't go well." } },
    { "id": "q14", "category": "H", "tier": 2, "is_reversed": true, "text": { "ja": "就職や自立への道は一つしかなく、それがダメになったら終わりだと感じる。", "en": "I feel there is only one path to employment and independence, and if that fails, it's over." } },
    { "id": "q15", "category": "H", "tier": 2, "is_reversed": false, "text": { "ja": "行き詰まった時でも諦めず、解決するために支援員や周囲の人へ相談や提案ができる。", "en": "Even when stuck, I don't give up and can consult or propose to support staff and those around me to find a solution." } },
    { "id": "q16", "category": "H", "tier": 2, "is_reversed": false, "text": { "ja": "目指す働き方や進路が途中で変わっても、やる気を落とさずに新しい目標へ向かうことができる。", "en": "Even if my desired way of working or career path changes mid-way, I can move towards a new goal without losing motivation." } },
    { "id": "q17", "category": "E", "tier": 2, "is_reversed": false, "text": { "ja": "単調で地味な作業であっても、自分が取り組むことで事業所や誰かの役に立っていると思える。", "en": "Even in monotonous and plain tasks, I believe my efforts are helpful to the facility or someone." } },
    { "id": "q18", "category": "E", "tier": 2, "is_reversed": true, "text": { "ja": "自分が得意ではないことについて意見を求められたり、質問されたりすると、極度に萎縮してしまう。", "en": "I shrink back extremely when asked for opinions or questions about things I am not good at." } },
    { "id": "q19", "category": "E", "tier": 2, "is_reversed": false, "text": { "ja": "周りと比べることなく、自分が今日取り組んだ作業や成果に対して胸を張ることができる。", "en": "Without comparing myself to others, I can be proud of the tasks and results I tackled today." } },
    { "id": "q20", "category": "E", "tier": 2, "is_reversed": false, "text": { "ja": "失敗するかもしれないという不安よりも、「まずはやってみたい・試してみたい」という気持ちが勝る。", "en": "The desire to 'first try and test it' outweighs the anxiety of potential failure." } },
    { "id": "q21", "category": "R", "tier": 2, "is_reversed": false, "text": { "ja": "結果がすぐに出ないような単調な訓練や作業であっても、毎日コツコツと続けることができる。", "en": "I can steadily continue every day, even in monotonous training and tasks where results are not immediate." } },
    { "id": "q22", "category": "R", "tier": 2, "is_reversed": true, "text": { "ja": "支援員からの注意やアドバイスを受けると、自分のすべてを否定されたように感じてしまう。", "en": "I feel my entire self is denied when I receive cautions or advice from support staff." } },
    { "id": "q23", "category": "R", "tier": 2, "is_reversed": false, "text": { "ja": "自分の思い通りにならないルールや状況でも、感情をコントロールして今できることに集中できる。", "en": "Even under rules or situations that don't go my way, I can control my emotions and focus on what I can do now." } },
    { "id": "q24", "category": "R", "tier": 2, "is_reversed": false, "text": { "ja": "自分の疲れや気分の落ち込みのサインに気づき、無理をする前に自分から休むことができる。", "en": "I can notice signs of my own fatigue or low mood and intentionally take a rest before overdoing it." } },
    { "id": "q25", "category": "O", "tier": 2, "is_reversed": false, "text": { "ja": "自分の頑張りがすぐに評価されなくても、「今はタイミングじゃないだけだ」と割り切ることができる。", "en": "Even if my efforts are not immediately recognized, I can accept it thinking 'it's just not the right timing now'." } },
    { "id": "q26", "category": "O", "tier": 2, "is_reversed": true, "text": { "ja": "トラブルやミスが起きた際、どう解決するかよりも「誰のせいか（自分のせいか）」を気にしてしまう。", "en": "When trouble or mistakes occur, I worry about 'whose fault it is (is it mine?)' before how to solve it." } },
    { "id": "q27", "category": "O", "tier": 2, "is_reversed": false, "text": { "ja": "初めて会う人や新しいプログラムなど、どうなるか分からない状況でも「何か良いことがあるかも」と前向きに捉えられる。", "en": "Even in uncertain situations like meeting new people or starting new programs, I can positively think 'something good might happen'." } },
    { "id": "q28", "category": "O", "tier": 2, "is_reversed": true, "text": { "ja": "何かがうまくいかなかった時、「やっぱり自分には無理だったんだ」と妙に納得してしまう自分がいる。", "en": "When something goes wrong, a part of me feels oddly convinced thinking 'I knew it was impossible for me'." } },
    { "id": "q29", "category": "H", "tier": 3, "is_reversed": false, "text": { "ja": "「就職」という大きな目標のために、今日一日何を頑張ればいいのか、小さな目標に分けて考えることができる。", "en": "For the big goal of 'employment', I can break down what I should work hard on today into small goals." } },
    { "id": "q30", "category": "H", "tier": 3, "is_reversed": true, "text": { "ja": "他の利用者が就職したり褒められたりするのを見ると、「自分はダメなのではないか」と激しく焦ってしまう。", "en": "Seeing other users get jobs or be praised makes me severely anxious that 'I might be a failure'." } },
    { "id": "q31", "category": "H", "tier": 3, "is_reversed": false, "text": { "ja": "自分一人で解決する手段がない時でも、支援員や家族、外部の窓口などを頼って解決の糸口を見つけることができる。", "en": "Even when I have no means to solve things alone, I can rely on support staff, family, or external counters to find a clue to the solution." } },
    { "id": "q32", "category": "H", "tier": 3, "is_reversed": true, "text": { "ja": "「これをやって何の意味があるのか」と目的を見失い、突然作業や訓練への意欲がなくなることがある。", "en": "I sometimes suddenly lose motivation for tasks or training, losing sight of the purpose 'what's the point of doing this?'" } },
    { "id": "q33", "category": "H", "tier": 3, "is_reversed": false, "text": { "ja": "どうしてもクリアできない苦手な課題があっても、パニックにならずに「一旦休む」「人に任せる」という選択ができる。", "en": "Even with difficult tasks I just can't clear, I don't panic and can choose to 'take a break' or 'leave it to others'." } },
    { "id": "q34", "category": "E", "tier": 3, "is_reversed": true, "text": { "ja": "この事業所の中で、自分は特に必要とされていない存在だと心の底で感じている。", "en": "Deep down, I feel that I am not a particularly needed existence in this facility." } },
    { "id": "q35", "category": "E", "tier": 3, "is_reversed": false, "text": { "ja": "体調や周りの状況が万全ではなくても、自分なりに工夫して任された作業をやり遂げることができる。", "en": "Even if my physical condition or surroundings are not perfect, I can manage to complete assigned tasks in my own way." } },
    { "id": "q36", "category": "E", "tier": 3, "is_reversed": true, "text": { "ja": "作業が早い人やコミュニケーションが得意な人を見ると、「自分には到底無理だ」と最初から諦めてしまう。", "en": "When I see people who are fast at tasks or good at communication, I give up from the start thinking 'it's absolutely impossible for me'." } },
    { "id": "q37", "category": "E", "tier": 3, "is_reversed": false, "text": { "ja": "支援員や目上の人の意見であっても、自分が違うと思えば「私はこう思います」と伝えることができる。", "en": "Even against the opinions of support staff or superiors, I can say 'I think this way' if I disagree." } },
    { "id": "q38", "category": "E", "tier": 3, "is_reversed": false, "text": { "ja": "自分の価値は「障害や苦手なことがあるか」ではなく、「今日どれだけ頑張ったか」で決まると思う。", "en": "I believe my value is determined not by 'whether I have disabilities or weaknesses', but by 'how hard I tried today'." } },
    { "id": "q39", "category": "R", "tier": 3, "is_reversed": false, "text": { "ja": "毎日の生活で、気分が良い日も悪い日も「これだけは必ずやる」と決めている習慣（ルーティン）がある。", "en": "In my daily life, I have a habit (routine) I 'absolutely do' on both good and bad days." } },
    { "id": "q40", "category": "R", "tier": 3, "is_reversed": true, "text": { "ja": "予想外の出来事（予定変更など）が起きた時、ドキドキしてパニックになり、どうしていいか分からなくなる。", "en": "When unexpected events (like schedule changes) occur, my heart races, I panic, and I don't know what to do." } },
    { "id": "q41", "category": "R", "tier": 3, "is_reversed": true, "text": { "ja": "過去の嫌な記憶や失敗を突然思い出してしまい、動けなくなったり気分が悪くなったりすることがある。", "en": "I sometimes suddenly remember past bad memories or failures, which paralyzes me or makes me feel sick." } },
    { "id": "q42", "category": "R", "tier": 3, "is_reversed": false, "text": { "ja": "すごく落ち込むようなことがあっても、「これも後で笑い話や良い経験になるかもしれない」と考える自分がいる。", "en": "Even when I feel extremely down, a part of me thinks 'this might turn out to be a good story or experience later'." } },
    { "id": "q43", "category": "R", "tier": 3, "is_reversed": true, "text": { "ja": "他の人のせいで自分のペースが乱された時、激しい怒りやイライラが湧き、落ち着くまでに時間がかかる。", "en": "When others disrupt my pace, intense anger or frustration wells up, and it takes time to calm down." } },
    { "id": "q44", "category": "O", "tier": 3, "is_reversed": false, "text": { "ja": "事業所やグループの空気が暗い時、自分から明るい挨拶をしたり話題を振ったりして、空気を和らげようとすることができる。", "en": "When the atmosphere in the facility or group is dark, I can try to soften it by cheerfully greeting or starting a topic." } },
    { "id": "q45", "category": "O", "tier": 3, "is_reversed": true, "text": { "ja": "絶対に失敗しないと確信できないなら、最初から新しい作業やプログラムには参加しない方がマシだと考える。", "en": "If I can't be sure I won't fail, I think it's better not to participate in new tasks or programs from the start." } },
    { "id": "q46", "category": "O", "tier": 3, "is_reversed": false, "text": { "ja": "何事も「誰かがやってくれる」ではなく、「自分なりに少しずつやっていけば大丈夫だ」という前向きな気持ちを持っている。", "en": "I have a positive mindset that it's not 'someone else will do it', but 'it will be fine if I do it little by little in my own way'." } },
    { "id": "q47", "category": "O", "tier": 3, "is_reversed": true, "text": { "ja": "うまくいった時や褒められた時でさえ、「次は失敗するかもしれない」という不安が常に消えない。", "en": "Even when things go well or I am praised, the anxiety that 'I might fail next time' never disappears." } },
    { "id": "q48", "category": "O", "tier": 3, "is_reversed": false, "text": { "ja": "世の中には思い通りにならないことも多いからこそ、自分が「楽しい」「やりたい」と思えることを大切にしたい。", "en": "Because there are many things in the world that don't go as planned, I want to cherish what I find 'fun' and 'want to do'." } }
  ],
  "types": {
    "HHHH": {
      "title": { "ja": "自律型セルフマネジメント", "en": "Autonomous Self-Manager" },
      "profile": { "ja": "すべての心理的資本が高い水準にあります。環境の変化やノイズに動じることなく、自ら目標を設定し、就労に向けて安定した努力を継続できる能力を持っています。支援員に頼らずとも道を切り拓く推進力がある一方、自分に対する基準が高すぎるために、無意識に無理を重ねてしまうリスクがあります。", "en": "All parameters maxed out. You possess the ability to self-manage towards employment. Ensure you don't overexert yourself subconsciously." },
      "action_plan": { "ja": "現在の良好なセルフコントロールを維持してください。ただし、調子が良い時ほど「自分一人で抱え込みすぎない」ことを意識し、定期的に支援員へ状況を報告・共有する時間を設けるとより安定します。", "en": "Maintain your habits, but intentionally share your progress with support staff to avoid taking on too much alone." },
      "affinity": {
        "best_partner": "LLLL",
        "partner_title": { "ja": "危機察知型アナリスト", "en": "Risk-Detecting Analyst" },
        "reason": { "ja": "あなたが前進を最優先にする中で見落としがちな「体調の変化」や「小さなリスク」を、彼らが繊細に察知し、ペース配分を見直すきっかけを与えてくれます。", "en": "They sensitively detect physical changes and risks you might overlook while charging forward." }
      }
    },
    "HHHL": {
      "title": { "ja": "慎重型ステップアッパー", "en": "Cautious Step-Upper" },
      "profile": { "ja": "高い目標と行動力を持ちながら、常に「うまくいかなかった時のこと」を想定して動く慎重な思考の持ち主です。楽観視をしないため、計画通りに物事を進める確実性があります。しかし、その真面目さと厳格さゆえに、自分自身に過度なプレッシャーをかけてしまう傾向があります。", "en": "High capability combined with cautious realism. You proceed steadily but may accidentally pressure yourself too much." },
      "action_plan": { "ja": "完璧を目指す姿勢は強みですが、時には「まあ、いっか」「今日はここまで」と区切りをつける練習が必要です。支援員と一緒に「合格ライン」を少し低く設定してみましょう。", "en": "Practice setting slightly lower 'pass lines' with your support staff to ease self-pressure." },
      "affinity": {
        "best_partner": "LLLH",
        "partner_title": { "ja": "心理的安全のオアシス", "en": "Psychological Safety Oasis" },
        "reason": { "ja": "あなたの張り詰めた緊張感を、彼らの柔軟で前向きな姿勢が自然と和らげてくれます。一緒に作業することで、肩の力を抜いて取り組むことができます。", "en": "Their flexible, positive attitude naturally relieves your strict tension." }
      }
    },
    "HHLH": {
      "title": { "ja": "積極型フロントランナー", "en": "Active Front-Runner" },
      "profile": { "ja": "高いモチベーションと自信に溢れ、新しいプログラムや作業にも前向きに挑戦できるタイプです。順調な時は事業所全体を引っ張るような明るさを見せますが、予期せぬ失敗や環境の大きな変化に対する耐性が低く、一度つまずくと極端に落ち込んでしまう脆さを秘めています。", "en": "Brimming with drive. You excel when things go well, but are vulnerable to sudden setbacks." },
      "action_plan": { "ja": "気分の波をコントロールするため、調子が良い時こそ「もし疲れたらどうするか」「失敗したら誰に相談するか」というSOSの出し方を、事前に支援員と決めておくことが重要です。", "en": "Establish a concrete SOS plan with support staff for when you feel tired or face failure." },
      "affinity": {
        "best_partner": "LLHL",
        "partner_title": { "ja": "高耐久型バックアップ", "en": "Highly Durable Backup" },
        "reason": { "ja": "あなたが予期せぬ事態で落ち込んだ際、彼らが感情の起伏なく安定して作業を続ける姿を見ることで、冷静さを取り戻すことができます。", "en": "When you fracture, their stoic stability helps you regain your calmness." }
      }
    },
    "HHLL": {
      "title": { "ja": "理論構築型プランナー", "en": "Logical Planner" },
      "profile": { "ja": "自分の得意なことやルーティンワークにおいては、完璧に作業をこなす能力を持っています。一方で、予定外の変更や、想定と違うことが起きた時の復帰力や楽観性に欠けており、パニックになりやすい傾向があります。自分のペースが守られる環境で最大の力を発揮します。", "en": "Excellent in routines and logical tasks, but easily destabilized by unexpected changes." },
      "action_plan": { "ja": "「予定通りにいかないこと」をあらかじめ予定に組み込む練習をしましょう。支援員と相談し、スケジュールに「予備の時間（バッファ）」を持たせることで、心の余裕が生まれます。", "en": "Build 'buffer time' into your schedule with support staff to handle unexpected changes." },
      "affinity": {
        "best_partner": "LLHH",
        "partner_title": { "ja": "現場適応型サバイバー", "en": "Field Adaptation Survivor" },
        "reason": { "ja": "あなたの計画が予想外のトラブルで崩れた時、彼らの「なんとかなるさ」という柔軟な対応力が、パニックを鎮める大きな助けになります。", "en": "When plans fail, their flexible adaptation greatly helps calm your panic." }
      }
    },
    "HLHH": {
      "title": { "ja": "不屈のムードメーカー", "en": "Resilient Mood Maker" },
      "profile": { "ja": "自分自身の能力に対する自信は控えめですが、何度失敗しても立ち上がり、常に前を向こうとする圧倒的な立ち直りの早さと前向きさを備えています。そのひたむきな姿勢は、他の利用者や支援員に勇気を与え、事業所の雰囲気を明るくする力を持っています。", "en": "Modest self-assessment paired with endless resilience. Your persistence encourages everyone around you." },
      "action_plan": { "ja": "自信がないことを気にする必要はありません。あなたの最大の魅力は「転んでも起き上がる力」です。そのままの姿勢で、焦らずに少しずつ自分のできることを増やしていきましょう。", "en": "Do not fear low self-confidence. Your ability to get back up is your greatest charm." },
      "affinity": {
        "best_partner": "LHLL",
        "partner_title": { "ja": "単独集中型スペシャリスト", "en": "Solo-Focused Specialist" },
        "reason": { "ja": "あなたが人間関係や雰囲気作りに貢献している裏で、彼らが特定の専門的な作業を黙々とこなし、お互いの苦手な部分を補い合うことができます。", "en": "While you build a positive atmosphere, they silently handle specialized tasks." }
      }
    },
    "HLHL": {
      "title": { "ja": "寡黙な職人肌ワーカー", "en": "Stoic Craft Worker" },
      "profile": { "ja": "目立つことやポジティブさをアピールすることはありませんが、「目標への執念」と「静かなる忍耐力」で、与えられた作業をコツコツと正確に処理し続ける強みがあります。一人で没頭できる作業や、単調なルーティンワークにおいて無類の強さを発揮します。", "en": "Fueled by sheer persistence rather than outward positivity. Exceptionally strong in solo, steady tasks." },
      "action_plan": { "ja": "自分を限界まで追い込んでしまう傾向があります。疲れを感じにくいため、時間やアラームで区切りをつけ、強制的に休憩を取るルールを設けることが長く働き続けるコツです。", "en": "Prone to pushing limits silently. Set rules to take forced breaks based on time or alarms." },
      "affinity": {
        "best_partner": "LHLH",
        "partner_title": { "ja": "状況適応型チャレンジャー", "en": "Adaptive Challenger" },
        "reason": { "ja": "あなたが一人で煮詰まりそうになった時、彼らが軽いフットワークで新しい話題ややり方を持ち込み、良い気分転換を与えてくれます。", "en": "They inject agility and new perspectives when you are about to get stuck in deep focus." }
      }
    },
    "HLLH": {
      "title": { "ja": "前向きなアイデアマン", "en": "Positive Idea Generator" },
      "profile": { "ja": "忍耐力や細かい作業への自信はこれから伸ばしていく段階ですが、常に将来への明るい希望を持ち、「こんな仕事をしてみたい」「こんな工夫をしたら面白い」とアイデアを膨らませる力があります。マンネリ化しやすい訓練に新しい視点をもたらす存在です。", "en": "High conceptual vision and optimism, but currently building operational endurance. Brings new perspectives." },
      "action_plan": { "ja": "思いついたアイデアを行動に移すためのサポートが必要です。支援員と一緒に、そのアイデアを「今日できる小さな作業」に落とし込む練習を繰り返してください。", "en": "Work with support staff to break down your ideas into small, actionable daily tasks." },
      "affinity": {
        "best_partner": "LHHL",
        "partner_title": { "ja": "実務特化型サポーター", "en": "Practical Task Supporter" },
        "reason": { "ja": "あなたの豊かな発想を、彼らが一切の感情を交えずに正確な作業手順や形にしてくれるため、最高の協力関係が築けます。", "en": "They masterfully turn your ideas into exact procedures and forms." }
      }
    },
    "HLLL": {
      "title": { "ja": "思慮深い慎重派", "en": "Prudent Planner" },
      "profile": { "ja": "就労への目標は持っているものの、失敗への不安や自己評価の低さから、新しい一歩を踏み出すのに時間がかかるタイプです。しかし、リスクに対して誰よりも真剣に向き合うため、一度決めたことは着実に進めることができる誠実さを持っています。", "en": "Possesses a goal but hindered by anxiety. Your careful steps lead to safe and steady progress." },
      "action_plan": { "ja": "大きな目標を見ると不安になってしまうため、「今日1時間だけ頑張る」「この作業だけ終わらせる」といった、絶対に失敗しない小さな目標（スモールステップ）を積み重ねることに集中してください。", "en": "Focus entirely on tiny, fail-proof goals (small steps) to bypass anxiety." },
      "affinity": {
        "best_partner": "LHHH",
        "partner_title": { "ja": "現場集中型プレイヤー", "en": "Task-Focused Player" },
        "reason": { "ja": "あなたが不安で立ち止まっている時、彼らが目の前の作業を勢いよく片付けていく姿を見ることで、「自分も少しやってみよう」と背中を押してもらえます。", "en": "Their high-velocity action encourages you to take your own small steps forward." }
      }
    },
    "LHHH": {
      "title": { "ja": "現場集中型プレイヤー", "en": "Task-Focused Player" },
      "profile": { "ja": "長期的な進路や難しい理屈を考えるのは苦手ですが、「目の前の作業をこなす」ことにかけては圧倒的な自信とタフネスを持っています。割り当てられた仕事に対して疑問を持たず、ハイペースで処理し続けることができる実務の要です。", "en": "Lacks long-term vision but operates at maximum velocity on explicit daily tasks." },
      "action_plan": { "ja": "「将来どうなりたいか」で悩む必要はありません。まずは目の前の作業を高いクオリティでこなし続けることで、支援員から適切な就職先の提案が自然と引き寄せられます。", "en": "Don't worry about the distant future. Focus on completing daily tasks with high quality." },
      "affinity": {
        "best_partner": "HLLL",
        "partner_title": { "ja": "思慮深い慎重派", "en": "Prudent Planner" },
        "reason": { "ja": "勢いで突っ走りがちなあなたに対し、彼らの慎重な視点が「ちょっと待って、確認しよう」という安全装置の役割を果たしてくれます。", "en": "Their cautious perspective acts as a safety mechanism for your high-speed momentum." }
      }
    },
    "LHHL": {
      "title": { "ja": "実務特化型サポーター", "en": "Practical Task Supporter" },
      "profile": { "ja": "感情の起伏や無駄なポジティブさに流されず、与えられたマニュアルや作業手順を完璧に守って遂行するプロ意識の高い職人です。気分によって作業の質が変わらないため、事業所にとって最も安定して仕事を任せられる存在です。", "en": "Motivated purely by operational mechanics. You execute tasks strictly according to the manual." },
      "action_plan": { "ja": "無理に周りのテンションに合わせたり、熱い目標を掲げたりする必要はありません。「決められた作業を今日も正確に終わらせた」という実績そのものを、自分の最大の評価として誇ってください。", "en": "Do not force emotional motivation. Be proud of the fact that you accurately completed the assigned tasks today." },
      "affinity": {
        "best_partner": "HLLH",
        "partner_title": { "ja": "前向きなアイデアマン", "en": "Positive Idea Generator" },
        "reason": { "ja": "あなたに欠けている「新しい視点や楽しむ心」を彼らが提供し、単調な作業の中に新鮮な意味を見出す手助けをしてくれます。", "en": "They provide the 'new perspectives and fun' that add fresh meaning to your stable routines." }
      }
    },
    "LHLH": {
      "title": { "ja": "状況適応型チャレンジャー", "en": "Adaptive Challenger" },
      "profile": { "ja": "一つの作業をコツコツ長く続ける忍耐力は弱いですが、自分の直感への自信と、新しい環境にすぐ馴染む適応力の高さを持っています。予定外の出来事や、初めての作業に対しても物怖じせず、軽やかに挑戦できるフットワークの軽さが魅力です。", "en": "Masterful at rapid adaptation and trying new things, though lacking in long endurance." },
      "action_plan": { "ja": "飽きっぽさが課題になることがあります。長期間同じ作業をするよりも、支援員と相談して「短期間で完了する作業を複数組み合わせる」など、変化のあるスケジュールを組むと能力が活かせます。", "en": "Avoid long-term monotonous tasks. Work with staff to create a schedule with varied, short-term assignments." },
      "affinity": {
        "best_partner": "HLHL",
        "partner_title": { "ja": "寡黙な職人肌ワーカー", "en": "Stoic Craft Worker" },
        "reason": { "ja": "あなたが新しい作業を形にして飽き始めた頃、彼らがそれを引き継いでコツコツと最後まで仕上げてくれる、最高の連携が生まれます。", "en": "They patiently complete the tasks you initiated once you start looking for the next new thing." }
      }
    },
    "LHLL": {
      "title": { "ja": "単独集中型スペシャリスト", "en": "Solo-Focused Specialist" },
      "profile": { "ja": "グループワークや集団でのコミュニケーションは極端に苦手ですが、自身の得意な作業領域（PC入力や特定の軽作業など）においては、誰にも負けない集中力とクオリティを発揮します。一人で没頭できる環境下で真価を発揮する一匹狼タイプです。", "en": "Solves complex specific tasks solo. Not fond of group communication but highly focused on personal strengths." },
      "action_plan": { "ja": "無理にみんなと仲良くしたり、コミュニケーション能力を上げようとして過度なストレスを溜めるのは逆効果です。まずは「自分の得意な作業スキル」を磨き、そのスキルで事業所に貢献する道を探しましょう。", "en": "Do not exhaust yourself forcing group communication. Focus on polishing your specific skills to contribute." },
      "affinity": {
        "best_partner": "HLHH",
        "partner_title": { "ja": "不屈のムードメーカー", "en": "Resilient Mood Maker" },
        "reason": { "ja": "あなたが作業に100%集中できるよう、彼らが周囲とのコミュニケーションや雰囲気作りを代わりに引き受けてくれます。", "en": "They handle the social atmosphere, allowing you to focus 100% on your specialized tasks." }
      }
    },
    "LLHH": {
      "title": { "ja": "現場適応型サバイバー", "en": "Field Adaptation Survivor" },
      "profile": { "ja": "高い目標や自信を持っているわけではありませんが、思い通りにいかない状況やストレスに対して非常に打たれ強く、「まあなんとかなるだろう」と受け流すしなやかさを持っています。どんな環境に置かれても、マイペースに生き残る力があるサバイバーです。", "en": "Low baseline confidence but immune to burnout. You adapt to stressful environments with organic flexibility." },
      "action_plan": { "ja": "無理に立派な目標を立てる必要はありません。日々のちょっとしたトラブルを笑い飛ばし、「今日も無事に通所できた」という事実だけを積み重ねていくことが、最終的な就労への一番の近道です。", "en": "Don't force grand goals. Laughing off daily troubles and showing up steadily is your shortest path to employment." },
      "affinity": {
        "best_partner": "HHLL",
        "partner_title": { "ja": "理論構築型プランナー", "en": "Logical Planner" },
        "reason": { "ja": "真面目すぎてパニックになりがちな彼らに対して、あなたの「大丈夫だよ」というリラックスした態度が最高の救いになります。", "en": "Your relaxed 'it's okay' attitude is the best salvation for those who panic from being too serious." }
      }
    },
    "LLHL": {
      "title": { "ja": "高耐久型バックアップ", "en": "Highly Durable Backup" },
      "profile": { "ja": "目立ったアピールや楽観的な態度はとりませんが、単調で誰かがやらなければならない裏方の作業を、文句も言わずに黙々とこなし続けることができる事業所の守護神です。感情の波が少なく、非常に安定した通所・作業ペースを保ちます。", "en": "Low visibility, high asset. The structural anchor who quietly stabilizes daily background tasks." },
      "action_plan": { "ja": "自己主張が苦手なため、気づかないうちに自分ばかりがしんどい作業を押し付けられていることがあります。疲労を感じる前に、「今日はここまでで休みたいです」と支援員に伝える練習をしてください。", "en": "Because you rarely complain, practice explicitly telling staff when you need to rest to avoid taking on too much." },
      "affinity": {
        "best_partner": "HHLH",
        "partner_title": { "ja": "積極型フロントランナー", "en": "Active Front-Runner" },
        "reason": { "ja": "あなたが裏方で安定して作業を支えているおかげで、彼らが安心して新しいことに挑戦し、事業所全体に活気をもたらすことができます。", "en": "Your stable background support allows them to safely challenge new things and energize the facility." }
      }
    },
    "LLLH": {
      "title": { "ja": "チームの心理的安全基地", "en": "Team's Psychological Safety Base" },
      "profile": { "ja": "自分から率先して目標に向かって走るタイプではありませんが、なぜか常に穏やかで、その場にいるだけで周りの利用者の緊張やイライラを和ませる、オアシスのような存在です。チームのトラブルを未然に防ぐ、見えない潤滑油として機能します。", "en": "Maintains a low profile but acts as an emotional shock absorber, easing tension for everyone around." },
      "action_plan": { "ja": "「自分は作業が遅い」「スキルがない」と落ち込む必要はありません。あなたの「そこにいるだけで場が和らぐ」という資質は、就労先においても職場の雰囲気を良くする立派な能力（長所）です。", "en": "Do not worry about lack of speed. Your natural ability to ease the atmosphere is a highly valued strength in any workplace." },
      "affinity": {
        "best_partner": "HHHL",
        "partner_title": { "ja": "慎重型ステップアッパー", "en": "Cautious Step-Upper" },
        "reason": { "ja": "常に気を張って神経をすり減らしている真面目な彼らにとって、あなたの作為のない自然体な存在が一番の癒やしとなります。", "en": "To hyper-vigilant individuals, your natural, relaxed presence serves as their greatest comfort." }
      }
    },
    "LLLL": {
      "title": { "ja": "危機察知型アナリスト", "en": "Risk-Detecting Analyst" },
      "profile": { "ja": "目標への意欲や自己肯定感は現在お休み中ですが、それは「あらゆる物事のネガティブな側面やリスク」を誰よりも敏感にキャッチし、自分を守ろうとしている証拠です。無理をしていないため、大きな失敗を未然に防ぐセンサーを持っています。", "en": "All core metrics minimum. This reflects a highly sensitive defense mechanism that prioritizes avoiding risks." },
      "action_plan": { "ja": "今は無理にポジティブになろうとしたり、目標を立てようとしたりする必要はありません。まずは「安心できる環境（事業所）で、決められた時間を穏やかに過ごすこと」だけを唯一の目標にしてください。", "en": "Do not force positivity. Make your sole goal simply spending time peacefully in a safe environment for now." },
      "affinity": {
        "best_partner": "HHHH",
        "partner_title": { "ja": "自律型セルフマネジメント", "en": "Autonomous Self-Manager" },
        "reason": { "ja": "あなたが抱く不安やリスクを言葉にして伝えることで、実行力のある彼らがそれを代わりに解決し、道を切り拓いてくれます。", "en": "By expressing your anxieties, those with high execution capacity can solve them and clear the path for you." }
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