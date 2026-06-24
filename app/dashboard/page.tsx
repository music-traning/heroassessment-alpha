'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { supabase } from '@/utils/supabase';
import { 
  Card, Title, Text, Button, Table, TableHead, TableRow, TableHeaderCell, 
  TableBody, TableCell, Badge, BarChart, DonutChart, Grid,
  Select, SelectItem, LineChart, Metric, BadgeDelta
} from '@tremor/react';
import { useRouter } from 'next/navigation';

type EmployeeData = {
  id: string;
  employee_id_or_name: string;
  department: string;
  role: string;
  assessment_results: {
    type_str: string;
    tier: number;
    percentages: { H: number; E: number; R: number; O: number };
    created_at: string;
  }[];
};

function DashboardContent() {
  const router = useRouter();
  
  // データ保持用のState
  const [currentUserId, setCurrentUserId] = useState('');
  const [currentCompanyId, setCurrentCompanyId] = useState('');
  const [currentCompanyPlan, setCurrentCompanyPlan] = useState('free');
  const [userEmail, setUserEmail] = useState('');
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  
  // 💡 複数企業を保持するための新しいStateを追加
  const [adminCompanies, setAdminCompanies] = useState<any[]>([]);
  
  // UI制御用のState
  const [loading, setLoading] = useState(true);
  const [aiReport, setAiReport] = useState<string>('');
  const [pastReports, setPastReports] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  // 削除機能用のState
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 個別分析用のState
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
  const [individualAiReport, setIndividualAiReport] = useState<string>('');
  const [isIndividualAnalyzing, setIsIndividualAnalyzing] = useState(false);
  const [pastIndividualReports, setPastIndividualReports] = useState<any[]>([]);

  // 2. モーダルを開く＆データを取得する専用関数の追加
const handleOpenIndividualModal = async (emp: EmployeeData) => {
  setSelectedEmployee(emp);
  setIndividualAiReport(''); // 画面リセット
  setPastIndividualReports([]); // 履歴リセット

  try {
    // Supabaseからこの社員の過去レポートを取得（新しい順）
    const { data, error } = await supabase
      .from('individual_ai_reports')
      .select('*')
      .eq('employee_id', emp.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    if (data && data.length > 0) {
      setPastIndividualReports(data);
      setIndividualAiReport(data[0].report_content); // 最新のレポートを初期表示
    }
  } catch (err) {
    console.error("個別レポート履歴の取得に失敗しました", err);
  }
};

  // ==========================================
  // 1. 初期化：データ取得
  // ==========================================
  useEffect(() => {
    const initDashboard = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push('/admin-login');
        return;
      }
      
      setCurrentUserId(user.id);
      setUserEmail(user.email || '管理者');

      // 💡 変更: maybeSingle()をやめ、管理している「すべての企業」を取得する
      const { data: companiesData } = await supabase
        .from('companies')
        .select('id, name, plan')
        .eq('admin_user_id', user.id);

      if (!companiesData || companiesData.length === 0) {
        setLoading(false);
        return;
      }

      setAdminCompanies(companiesData);

      // 最初に見つかった企業をデフォルトとしてセット
      const initialCompany = companiesData[0];
      setCurrentCompanyId(initialCompany.id);
      setCurrentCompanyPlan(initialCompany.plan || 'free');

      // 💡 該当企業のレポートと従業員データをロード
      await loadCompanySpecificData(initialCompany.id);
    };
    initDashboard();
  }, [router]);

  // 💡 企業ごとのデータをまとめてロードする関数
  const loadCompanySpecificData = async (cid: string) => {
    setLoading(true);
    try {
      // レポート履歴の取得
      const { data: reportsData } = await supabase
        .from('ai_reports')
        .select('*')
        .eq('company_id', cid)
        .order('created_at', { ascending: false });
      
      setPastReports(reportsData || []);
      setAiReport(''); // 企業を切り替えたら表示中のAIレポートをリセットする

      // 従業員データの取得
      const { data: empData, error: empError } = await supabase
        .from('employees')
        .select(`
          id, employee_id_or_name, department, role,
          assessment_results ( type_str, tier, percentages, created_at )
        `)
        .eq('company_id', cid);

      if (empError) throw empError;
      setEmployees((empData as EmployeeData[]) || []);
    } catch (err) {
      console.error('データ取得エラー:', err);
    } finally {
      setLoading(false);
    }
  };

  // 💡 プルダウンで企業を切り替えた時のハンドラー
  const handleCompanyChange = (newCid: string) => {
    setCurrentCompanyId(newCid);
    const targetCompany = adminCompanies.find(c => c.id === newCid);
    if (targetCompany) setCurrentCompanyPlan(targetCompany.plan || 'free');
    
    // 選ばれた企業のデータに切り替える
    loadCompanySpecificData(newCid);
  };

  // ==========================================
  // CSVダウンロード処理
  // ==========================================
  const handleExportCSV = () => {
    if (employees.length === 0) return alert('データがありません。');
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const headers = ['氏名', '部署', '役職', 'HEROタイプ', 'Hope', 'Efficacy', 'Resilience', 'Optimism', '離職リスク', '受診日'];
    const rows = employees.map(emp => {
      const sorted = [...emp.assessment_results].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      const latest = sorted[0];
      const p = latest?.percentages;
      
      let riskStr = '安定';
      if (latest) {
        const latestAvg = (p.H + p.E + p.R + p.O) / 4;
        const prev = sorted[1];
        const prevAvg = prev ? (prev.percentages.H + prev.percentages.E + prev.percentages.R + prev.percentages.O) / 4 : latestAvg;
        if (latestAvg < 50 && (prevAvg - latestAvg) >= 15) riskStr = '⚠️ 高リスク(要フォロー)';
        else if (latestAvg < 60) riskStr = '注意';
      }

      return [
        `"${emp.employee_id_or_name}"`, `"${emp.department}"`, `"${emp.role}"`,
        latest ? latest.type_str : '未受診',
        p ? Math.round(p.H) : '-', p ? Math.round(p.E) : '-', p ? Math.round(p.R) : '-', p ? Math.round(p.O) : '-',
        riskStr,
        latest ? new Date(latest.created_at).toLocaleDateString('ja-JP') : '-'
      ].join(',');
    });
    const blob = new Blob([bom, [headers.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `assessment_data_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPDF = () => {
    window.print(); 
  };

  const executeDelete = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      await supabase.from('assessment_results').delete().eq('employee_id', deleteTargetId);
      await supabase.from('employees').delete().eq('id', deleteTargetId);
      setEmployees(prev => prev.filter(emp => emp.id !== deleteTargetId));
      setDeleteTargetId(null);
    } catch (error) {
      alert('削除に失敗しました。');
    } finally {
      setIsDeleting(false);
    }
  };

 const generateTestData = async () => {
    if (!currentCompanyId) return alert("企業コードがありません。");
    setLoading(true);
    try {
      // 1. 社員データの生成
      const { data: emps, error: empError } = await supabase.from('employees').insert([
        { company_id: currentCompanyId, employee_id_or_name: 'デモ社員A', department: '営業部', role: 'リーダー' },
        { company_id: currentCompanyId, employee_id_or_name: 'デモ社員B', department: '開発部', role: 'メンバー' },
        { company_id: currentCompanyId, employee_id_or_name: 'デモ社員C（リスク検知用）', department: '営業部', role: 'メンバー' }
      ]).select();
      
      if (empError) throw empError;

      // 2. アセスメント結果の生成
        if (emps && emps.length === 3) {
          const pastDate = new Date();
          pastDate.setMonth(pastDate.getMonth() - 3);
          const nowDate = new Date().toISOString(); // 💡 現在の日時を取得

          const { error: resError } = await supabase.from('assessment_results').insert([
            // 3ヶ月前のデータ
            { company_id: currentCompanyId, employee_id: emps[0].id, type_str: 'HHLH', tier: 1, percentages: { H: 70, E: 65, R: 60, O: 75 }, created_at: pastDate.toISOString() },
            { company_id: currentCompanyId, employee_id: emps[1].id, type_str: 'LLLL', tier: 1, percentages: { H: 30, E: 20, R: 40, O: 30 }, created_at: pastDate.toISOString() },
            { company_id: currentCompanyId, employee_id: emps[2].id, type_str: 'HHHH', tier: 1, percentages: { H: 80, E: 75, R: 85, O: 80 }, created_at: pastDate.toISOString() }, 
            
            // 💡 現在のデータ（nowDateを明記して空欄エラーを防ぐ）
            { company_id: currentCompanyId, employee_id: emps[0].id, type_str: 'HHHH', tier: 1, percentages: { H: 90, E: 85, R: 80, O: 95 }, created_at: nowDate },
            { company_id: currentCompanyId, employee_id: emps[1].id, type_str: 'LLHL', tier: 1, percentages: { H: 40, E: 30, R: 75, O: 45 }, created_at: nowDate },
            { company_id: currentCompanyId, employee_id: emps[2].id, type_str: 'LLLL', tier: 1, percentages: { H: 45, E: 35, R: 40, O: 35 }, created_at: nowDate } 
          ]);

          if (resError) throw resError;
        }
      
      await loadCompanySpecificData(currentCompanyId);
    } catch (error: any) {
      console.error("Test Data Error:", error);
      alert("生成に失敗しました: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateAiReport = async () => {
    if (currentCompanyPlan !== 'premium') {
      setShowPaywall(true);
      return;
    }
    setIsAnalyzing(true);
    const chartData = employees.map(emp => {
      const latestResult = emp.assessment_results[0];
      return {
        name: emp.employee_id_or_name, department: emp.department, role: emp.role,
        heroType: latestResult ? latestResult.type_str : '未受診',
        scores: latestResult ? latestResult.percentages : null,
      };
    });

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chartData })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      setAiReport(data.report);
      const { data: newReport } = await supabase.from('ai_reports').insert({ company_id: currentCompanyId, report_content: data.report }).select().single();
      if (newReport) setPastReports(prev => [newReport, ...prev]);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/signup'); 
  };

  // グラフ計算処理
  const trendMetrics = useMemo(() => {
    let currentTotal = 0, currentCount = 0;
    let pastTotal = 0, pastCount = 0;
    const monthlyData: Record<string, { total: number, count: number }> = {};

    employees.forEach(emp => {
      const results = emp.assessment_results;
      if (!results || results.length === 0) return;

      const sortedResults = [...results].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      
      sortedResults.forEach(res => {
        const d = new Date(res.created_at);
        const monthKey = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}`;
        const avg = (res.percentages.H + res.percentages.E + res.percentages.R + res.percentages.O) / 4;
        
        if (!monthlyData[monthKey]) monthlyData[monthKey] = { total: 0, count: 0 };
        monthlyData[monthKey].total += avg;
        monthlyData[monthKey].count++;
      });

      const oldest = sortedResults[0].percentages;
      const latest = sortedResults[sortedResults.length - 1].percentages;

      pastTotal += (oldest.H + oldest.E + oldest.R + oldest.O) / 4;
      pastCount++;
      currentTotal += (latest.H + latest.E + latest.R + latest.O) / 4;
      currentCount++;
    });

    const currentAvg = currentCount > 0 ? Math.round(currentTotal / currentCount) : 0;
    const pastAvg = pastCount > 0 ? Math.round(pastTotal / pastCount) : 0;
    const improvement = currentAvg - pastAvg;
    
    const chartData = Object.keys(monthlyData).sort().map(month => ({
      '月': month,
      '総合HEROスコア': Math.round(monthlyData[month].total / monthlyData[month].count)
    }));

    return { currentAvg, pastAvg, improvement, chartData };
  }, [employees]);

  const departmentScores = useMemo(() => {
    const depts: Record<string, { H: number, E: number, R: number, O: number, count: number }> = {};
    employees.forEach(emp => {
      const results = emp.assessment_results;
      if (!results || results.length === 0) return;
      
      const latest = [...results].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0].percentages;
      const deptName = emp.department || '未設定';

      if (!depts[deptName]) depts[deptName] = { H: 0, E: 0, R: 0, O: 0, count: 0 };
      depts[deptName].H += latest.H;
      depts[deptName].E += latest.E;
      depts[deptName].R += latest.R;
      depts[deptName].O += latest.O;
      depts[deptName].count++;
    });

    return Object.keys(depts).map(dept => ({
      name: dept,
      'Hope': Math.round(depts[dept].H / depts[dept].count),
      'Efficacy': Math.round(depts[dept].E / depts[dept].count),
      'Resilience': Math.round(depts[dept].R / depts[dept].count),
      'Optimism': Math.round(depts[dept].O / depts[dept].count),
    }));
  }, [employees]);

  const typeDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    employees.forEach(emp => {
      const results = emp.assessment_results;
      if (!results || results.length === 0) return;
      const latest = [...results].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
      counts[latest.type_str] = (counts[latest.type_str] || 0) + 1;
    });
    return Object.entries(counts).map(([type, count]) => ({ name: type, '社員数': count }));
  }, [employees]);

  const getScoreColor = (score: number) => {
    if (score >= 75) return "emerald";
    if (score >= 50) return "amber";
    return "rose";
  };

  const checkRetentionRisk = (results: any[]) => {
    if (!results || results.length === 0) return { label: '未受診', color: 'gray' as const };
    
    const sorted = [...results].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    const latest = sorted[0].percentages;
    const latestAvg = (latest.H + latest.E + latest.R + latest.O) / 4;

    const previous = sorted[1]?.percentages;
    const prevAvg = previous ? (previous.H + previous.E + previous.R + previous.O) / 4 : latestAvg;

    if (latestAvg < 50 && (prevAvg - latestAvg) >= 15) {
      return { label: '⚠️ 要フォロー (高リスク)', color: 'rose' as const };
    }
    if (latestAvg < 60) {
      return { label: '注意', color: 'amber' as const };
    }
    return { label: '安定', color: 'emerald' as const };
  };

  if (loading && employees.length === 0) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">データを読み込み中...</div>;
  }

  return (
   <div className={`min-h-screen bg-slate-50 p-8 ${selectedEmployee ? 'print:bg-transparent print:p-0' : 'print:bg-white print:p-0'}`}>
      <div className={`max-w-7xl mx-auto space-y-6 relative animate-fade-in ${selectedEmployee ? 'print:hidden' : ''}`}>
        
        <div className="flex justify-between items-end border-b pb-4 print:hidden">
          <div>
            <Title className="text-3xl font-bold text-slate-800">HRマネジメント・ダッシュボード</Title>
            <Text className="mt-1">
              ログインアカウント: <span className="font-medium text-blue-600">{userEmail}</span>
            </Text>

            {/* 💡 企業切り替え用プルダウンメニュー */}
            {adminCompanies.length > 0 && (
              <div className="mt-4 flex items-center gap-3">
                <Text className="font-bold text-slate-700">表示中の企業・組織:</Text>
                <div className="w-64">
                  <Select 
                    value={currentCompanyId} 
                    onValueChange={handleCompanyChange}
                    enableClear={false}
                  >
                    {adminCompanies.map(c => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name ? `${c.name} (${c.id})` : c.id}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            )}

          </div>
          <div className="flex gap-4 items-center">
            <Button variant="light" onClick={() => router.push('/admin-login')}>← 戻る</Button>
            <Button variant="secondary" onClick={() => window.open('/', '_blank')}>📝 受診画面を開く</Button>
            <Button variant="secondary" onClick={() => router.push('/dashboard/settings')}>⚙️ 企業設定</Button>
            <Button color="fuchsia" onClick={generateAiReport} loading={isAnalyzing} disabled={employees.length === 0}>
              ✨ AI分析（プレミアム）
            </Button>
            <Button variant="secondary" onClick={handleLogout}>ログアウト</Button>
          </div>
        </div>

        <div className="hidden print:block border-b-2 border-slate-800 pb-4 mb-6">
          <Title className="text-3xl font-bold text-slate-900">心理的資本アセスメント 組織開発レポート</Title>
          <Text className="text-sm mt-1 text-slate-600">出力日時: {new Date().toLocaleDateString('ja-JP')} | 対象企業ID: {currentCompanyId}</Text>
        </div>

        {employees.length === 0 ? (
          <Card className="text-center p-10 bg-blue-50 border-blue-200 print:hidden">
            <Title className="mb-4 text-blue-900">アセスメントデータがありません</Title>
            <p className="text-blue-700 mb-6">無料体験用にダミーの組織データを生成して、グラフの動作を確認できます。</p>
            <Button onClick={generateTestData} loading={loading}>テストデータを自動生成する</Button>
          </Card>
        ) : (
          <div className="space-y-6">
            <Grid numItemsSm={1} numItemsLg={3} className="gap-6 print:grid-cols-3">
              <Card decoration="top" decorationColor="blue" className="print:shadow-none print:border">
                <Text>アセスメント受診者数</Text>
                <Metric className="mt-2">{employees.filter(e => e.assessment_results.length > 0).length} 名</Metric>
              </Card>
              <Card decoration="top" decorationColor="fuchsia" className="print:shadow-none print:border">
                <Text>組織の総合HEROスコア</Text>
                <div className="flex items-center gap-4 mt-2">
                  <Metric>{trendMetrics.currentAvg} pt</Metric>
                  <BadgeDelta 
                    deltaType={trendMetrics.improvement > 0 ? 'increase' : trendMetrics.improvement < 0 ? 'decrease' : 'unchanged'}
                    className="print:hidden" 
                  >
                    {trendMetrics.improvement > 0 ? '+' : ''}{trendMetrics.improvement} pt (初回比)
                  </BadgeDelta>
                  <span className="hidden print:inline text-sm font-bold text-slate-600">({trendMetrics.improvement > 0 ? '+' : ''}{trendMetrics.improvement}pt)</span>
                </div>
              </Card>
              <Card decoration="top" decorationColor="emerald" className="print:shadow-none print:border">
                <Text>累計アセスメント実施回数</Text>
                <Metric className="mt-2">{employees.reduce((acc, emp) => acc + emp.assessment_results.length, 0)} 回</Metric>
              </Card>
            </Grid>

            <Grid numItemsSm={1} numItemsLg={2} className="gap-6 print:grid-cols-2">
              <Card className="print:shadow-none print:border">
                <Title>心理的資本の経時変化（スコア推移）</Title>
                <LineChart
                  className="h-72 mt-4"
                  data={trendMetrics.chartData}
                  index="月"
                  categories={["総合HEROスコア"]}
                  colors={["fuchsia"]}
                  valueFormatter={(number) => `${number} pt`}
                  yAxisWidth={40}
                />
              </Card>
              <Card className="print:shadow-none print:border">
                <Title>部署別のHEROスコア比較</Title>
                <BarChart
                  className="h-72 mt-4"
                  data={departmentScores}
                  index="name"
                  categories={["Hope", "Efficacy", "Resilience", "Optimism"]}
                  colors={["blue", "teal", "amber", "rose"]}
                  valueFormatter={(number) => `${number}%`}
                  yAxisWidth={40}
                />
              </Card>
            </Grid>

            <Grid numItemsSm={1} numItemsLg={3} className="gap-6 print:grid-cols-3">
             {aiReport || pastReports.length > 0 ? (
                <Card className="bg-fuchsia-50 border-fuchsia-200 flex flex-col h-[340px] lg:col-span-2 print:shadow-none print:border print:bg-white print:h-auto print:col-span-2">
                  <div className="flex justify-between items-center mb-4 print:mb-2">
                    <Title className="text-fuchsia-800 flex items-center gap-2 print:text-slate-900">✨ AI組織開発レポート</Title>
                    {pastReports.length > 0 && (
                      <div className="w-48 print:hidden">
                        <Select 
                          value={aiReport || pastReports[0]?.report_content} 
                          placeholder="履歴から選択" 
                          onValueChange={(val) => setAiReport(val)}
                        >
                          {pastReports.map((report, idx) => (
                            <SelectItem key={report.id} value={report.report_content}>
                              {new Date(report.created_at).toLocaleDateString('ja-JP')} の分析
                              {idx === 0 && ' (最新)'}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    )}
                  </div>
                  <div className="prose max-w-none text-slate-700 whitespace-pre-wrap text-sm leading-relaxed overflow-y-auto flex-1 print:overflow-visible">
                    {aiReport || (pastReports[0]?.report_content)}
                  </div>
                </Card>
              ) : (
                <Card className="flex flex-col items-center justify-center text-slate-400 border-dashed bg-slate-100 h-[340px] lg:col-span-2 print:hidden">
                  <p className="text-center px-4 leading-relaxed">右上の「✨ AI分析」ボタンを押すと、<br/>Geminiによる高度なシナジー分析レポートが生成されます。</p>
                </Card>
              )}

              <Card className="h-[340px] flex flex-col print:shadow-none print:border print:h-auto">
                <Title>コンピテンシータイプの分布</Title>
                <DonutChart className="h-full mt-4 print:h-48" data={typeDistribution} category="社員数" index="name" colors={["indigo", "violet", "fuchsia", "pink", "cyan", "teal", "emerald", "lime", "amber", "orange", "red", "rose"]} valueFormatter={(number) => `${number} 名`} />
              </Card>
            </Grid>

            <div className="print:break-before-page pt-4"></div>

            <Card className="print:shadow-none print:border">
              <div className="flex justify-between items-center mb-4">
                <Title>従業員アセスメント・コンディション一覧</Title>
                <div className="flex gap-2 print:hidden">
                  <Button size="xs" variant="secondary" onClick={handleExportCSV}>📥 CSVダウンロード</Button>
                  <Button size="xs" variant="primary" color="blue" onClick={handlePrintPDF}>🖨️ PDFレポート出力</Button>
                </div>
              </div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>氏名</TableHeaderCell>
                    <TableHeaderCell>部署</TableHeaderCell>
                    <TableHeaderCell>HEROタイプ</TableHeaderCell>
                    <TableHeaderCell>H</TableHeaderCell>
                    <TableHeaderCell>E</TableHeaderCell>
                    <TableHeaderCell>R</TableHeaderCell>
                    <TableHeaderCell>O</TableHeaderCell>
                    <TableHeaderCell>離職・エンゲージメントリスク</TableHeaderCell> 
                    <TableHeaderCell>最新受診日</TableHeaderCell>
                    <TableHeaderCell className="print:hidden">操作</TableHeaderCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((emp) => {
                    const results = emp.assessment_results;
                    const latestResult = results && results.length > 0 ? [...results].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0] : null;
                    const p = latestResult?.percentages;
                    const risk = checkRetentionRisk(results);

                    return (
                      <TableRow key={emp.id}>
                        <TableCell className="font-medium">
                          <div>{emp.employee_id_or_name}</div>
                          <div className="text-xs text-slate-400">{emp.role}</div>
                        </TableCell>
                        <TableCell>{emp.department}</TableCell>
                        <TableCell>{latestResult ? <Badge color="blue">{latestResult.type_str}</Badge> : <Badge color="gray">未受診</Badge>}</TableCell>
                        <TableCell>{p ? <Badge color={getScoreColor(p.H)}>{Math.round(p.H)}%</Badge> : '-'}</TableCell>
                        <TableCell>{p ? <Badge color={getScoreColor(p.E)}>{Math.round(p.E)}%</Badge> : '-'}</TableCell>
                        <TableCell>{p ? <Badge color={getScoreColor(p.R)}>{Math.round(p.R)}%</Badge> : '-'}</TableCell>
                        <TableCell>{p ? <Badge color={getScoreColor(p.O)}>{Math.round(p.O)}%</Badge> : '-'}</TableCell>
                        <TableCell>
                          <Badge color={risk.color}>{risk.label}</Badge>
                        </TableCell>
                        <TableCell>{latestResult ? new Date(latestResult.created_at).toLocaleDateString('ja-JP') : '-'}</TableCell>
                        <TableCell className="print:hidden flex gap-2">
                          <Button size="xs" variant="secondary" onClick={() => handleOpenIndividualModal(emp)}>
                            詳細分析
                          </Button>
                          <Button size="xs" variant="light" color="red" onClick={() => setDeleteTargetId(emp.id)}>削除</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

        {showPaywall && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] backdrop-blur-sm transition-opacity">
            <Card className="max-w-lg w-full mx-4 bg-white shadow-2xl border-t-4 border-fuchsia-500">
              <Title className="text-2xl font-bold mb-4 text-slate-800">法人向けプレミアム機能</Title>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Gemini AIによる高度な組織開発コンサルティングレポートの生成は、法人向けプレミアムプラン限定の機能です。
              </p>
              <div className="flex gap-4 justify-end mt-8">
                <Button variant="secondary" onClick={() => setShowPaywall(false)}>閉じる</Button>
                <Button color="blue" onClick={() => router.push('/pricing')}>料金プランを見る</Button>
              </div>
            </Card>
          </div>
        )}

        {deleteTargetId && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity">
            <Card className="max-w-md w-full mx-4 bg-white shadow-2xl border-t-4 border-red-500">
              <Title className="text-xl font-bold mb-4 text-slate-800 text-red-600">⚠️ 従業員データの削除</Title>
              <p className="text-slate-600 mb-6 leading-relaxed">
                本当にこの従業員のデータを削除しますか？<br/>
                <span className="font-bold text-red-500">この操作は取り消すことができず、過去のアセスメント結果もすべて完全に消去されます。</span>
              </p>
              <div className="flex gap-4 justify-end mt-8">
                <Button variant="secondary" onClick={() => setDeleteTargetId(null)} disabled={isDeleting}>キャンセル</Button>
                <Button color="red" onClick={executeDelete} loading={isDeleting}>完全に削除する</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
     
{selectedEmployee && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity p-4 print:static print:bg-transparent print:p-0">
            {/* 💡 print:max-w-none を追加し、印刷時は画面幅の制限を解除してA4用紙いっぱいに広げる */}
            <Card className="max-w-5xl w-full h-[90vh] bg-white shadow-2xl flex flex-col relative overflow-hidden print:shadow-none print:border-none print:h-auto print:overflow-visible print:block print:max-w-none print:p-0">
              
              {/* ヘッダー部分 */}
              <div className="flex justify-between items-start border-b pb-4 mb-4 shrink-0 print:border-slate-800 print:mb-8">
                <div>
                  <Badge color="blue" className="print:border print:border-blue-500">{selectedEmployee.department}</Badge>
                  <Title className="text-2xl font-bold mt-2 text-slate-800">{selectedEmployee.employee_id_or_name} <span className="text-sm font-normal text-slate-500">({selectedEmployee.role})</span></Title>
                </div>
                
                {/* 印刷・閉じるボタン（印刷時は非表示） */}
                <div className="flex items-center gap-4 print:hidden">
                  <Button variant="primary" color="blue" onClick={() => window.print()}>
                    🖨️ PDF・会議資料を出力
                  </Button>
                  <Button variant="light" color="gray" onClick={() => setSelectedEmployee(null)}>✕ 閉じる</Button>
                </div>
              </div>

              {/* スクロール領域（印刷時は全表示に切り替わる） */}
              <div className="overflow-y-auto flex-1 pr-2 space-y-6 print:overflow-visible print:space-y-8">
                
                {/* 個人の時系列グラフ */}
                {/* 💡 print:break-inside-avoid でグラフが半分に切れるのを防ぐ */}
                <Card className="shadow-none border border-slate-200 print:border-none print:p-0 print:break-inside-avoid">
                  <Title>HEROスコアの推移</Title>
                  <LineChart
                    className="h-64 mt-4 print:h-72"
                    data={
                      [...selectedEmployee.assessment_results]
                        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                        .map(res => ({
                          '受診日': new Date(res.created_at).toLocaleDateString('ja-JP'),
                          'Hope': res.percentages.H,
                          'Efficacy': res.percentages.E,
                          'Resilience': res.percentages.R,
                          'Optimism': res.percentages.O
                        }))
                    }
                    index="受診日"
                    categories={["Hope", "Efficacy", "Resilience", "Optimism"]}
                    colors={["blue", "teal", "amber", "rose"]}
                    valueFormatter={(number) => `${number}%`}
                    yAxisWidth={40}
                    minValue={0}
                    maxValue={100}
                  />
                </Card>

                {/* 個人向けAI分析セクション */}
                <Card className="bg-fuchsia-50 border-fuchsia-200 shadow-none print:bg-white print:border-none print:p-0">
                  <div className="flex justify-between items-center mb-4 flex-wrap gap-4 print:hidden">
                    <div className="flex items-center gap-4">
                      <Title className="text-fuchsia-800 flex items-center gap-2">✨ 個別時系列AI分析</Title>
                      
                      {/* プルダウン履歴（印刷時は非表示） */}
                      {pastIndividualReports.length > 0 && (
                        <div className="w-56">
                          <Select
                            value={individualAiReport}
                            onValueChange={(val) => setIndividualAiReport(val)}
                            placeholder="過去の分析履歴"
                          >
                            {pastIndividualReports.map((report, idx) => (
                              <SelectItem key={report.id} value={report.report_content}>
                                {new Date(report.created_at).toLocaleDateString('ja-JP')} の分析 {idx === 0 && '(最新)'}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      )}
                    </div>

                    <Button 
                      color="fuchsia" 
                      loading={isIndividualAnalyzing}
                      onClick={async () => {
                        if (currentCompanyPlan !== 'premium') {
                          setShowPaywall(true);
                          return;
                        }

                        setIsIndividualAnalyzing(true);
                        try {
                          const response = await fetch('/api/analyze-individual', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                              companyId: currentCompanyId,
                              employeeId: selectedEmployee.id,
                              name: selectedEmployee.employee_id_or_name,
                              history: selectedEmployee.assessment_results
                            })
                          });
                          const data = await response.json();
                          if (!response.ok) throw new Error(data.error);
                          
                          setIndividualAiReport(data.report);
                          setPastIndividualReports(prev => [
                            {
                              id: 'temp-' + Date.now(),
                              report_content: data.report,
                              created_at: new Date().toISOString()
                            },
                            ...prev
                          ]);
                        } catch (error: any) {
                          alert(error.message);
                        } finally {
                          setIsIndividualAnalyzing(false);
                        }
                      }}
                    >
                      最新の推移を分析する
                    </Button>
                  </div>
                  
                  {/* AIレポート出力部分 */}
                  {/* 💡 本文が長い場合は自然に改ページさせたいので break-inside-avoid は入れない。文字色を黒に固定 */}
                  <div className="prose max-w-none text-slate-700 whitespace-pre-wrap text-sm leading-relaxed min-h-[150px] print:text-black print:leading-loose">
                    {individualAiReport ? individualAiReport : "「最新の推移を分析する」ボタンを押すと、過去の推移データから今後の具体的な支援計画（ISSP）に使えるドラフトレポートを生成します。"}
                  </div>
                </Card>
              </div>
              
              {/* 印刷時のみ表示される、会議用の署名・メモ欄（通常画面では非表示） */}
              {/* 💡 print:break-inside-avoid を付け、署名欄がページまたぎでバラバラにならないようにする */}
              <div className="hidden print:block mt-12 pt-8 border-t-2 border-slate-800 print:break-inside-avoid">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold text-slate-800">ISSP（個別支援計画）策定会議 添付資料</p>
                    <p className="text-xs text-slate-500 mt-1">出力日: {new Date().toLocaleDateString('ja-JP')} / HERO Assessment System</p>
                  </div>
                  <div className="flex gap-8">
                    <div className="w-24 border-b border-slate-400 pb-1 text-xs text-slate-500 text-center">施設長印</div>
                    <div className="w-24 border-b border-slate-400 pb-1 text-xs text-slate-500 text-center">サビ管印</div>
                    <div className="w-24 border-b border-slate-400 pb-1 text-xs text-slate-500 text-center">担当者印</div>
                  </div>
                </div>
              </div>

            </Card>
          </div>
        )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">ダッシュボードを準備中...</div>}>
      <DashboardContent />
    </Suspense>
  );
}