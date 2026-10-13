import React, { useState, useMemo, useEffect } from 'react';
import {
  ResearchProposal,
  PriorityScoreWeights,
  PartnerIntervention,
  ScoringCriteria,
} from '../types';
import { calculateProposalScore, DEFAULT_WEIGHTS } from '../data/initialProposals';
import { LIMA_MISI_NTT, TUJUH_PILAR_PEMBANGUNAN } from '../data/visionData';
import {
  BarChart3,
  TrendingUp,
  Award,
  Filter,
  Search,
  Download,
  Plus,
  Eye,
  Edit3,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  Handshake,
  Sliders,
  Send,
  AlertCircle,
  Shield,
  FileText,
  FileCheck,
  Check,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface DashboardPageProps {
  proposals: ResearchProposal[];
  onSelectProposal: (proposal: ResearchProposal) => void;
  onUpdateProposal: (updated: ResearchProposal) => void;
  onAddProposal: (newProp: ResearchProposal) => void;
  partnerInterventions: PartnerIntervention[];
  onAddPartnerIntervention: (intervention: PartnerIntervention) => void;
  onUpdateInterventionStatus: (id: string, status: PartnerIntervention['statusVerifikasi']) => void;
  isAdmin: boolean;
  onOpenAdminLogin: () => void;
  weights: PriorityScoreWeights;
  onUpdateWeights: (newWeights: PriorityScoreWeights) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  proposals,
  onSelectProposal,
  onUpdateProposal,
  onAddProposal,
  partnerInterventions,
  onAddPartnerIntervention,
  onUpdateInterventionStatus,
  isAdmin,
  onOpenAdminLogin,
  weights,
  onUpdateWeights,
}) => {
  // Active Tab inside Dashboard Page
  const [activeTab, setActiveTab] = useState<'rekapitulasi' | 'trend' | 'visi' | 'mitra' | 'bobot'>('rekapitulasi');

  // Filters for Rekapitulasi
  const [filterYear, setFilterYear] = useState<string>('Semua');
  const [filterCategory, setFilterCategory] = useState<string>('Semua');
  const [filterPriority, setFilterPriority] = useState<string>('Semua');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Pagination State (Proporsional & Pas Satu Halaman)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  // Editing proposal scoring modal state
  const [editingProposal, setEditingProposal] = useState<ResearchProposal | null>(null);

  // Partner Intervention Form State (Screenshot 2026-10-13 102200.png)
  const [namaLembaga, setNamaLembaga] = useState('');
  const [jenisMitra, setJenisMitra] = useState('Perguruan Tinggi');
  const [surelKontak, setSurelKontak] = useState('');
  const [selectedMasalahId, setSelectedMasalahId] = useState(proposals[0]?.id || '');
  const [bentukKontribusi, setBentukKontribusi] = useState<string[]>([]);
  const [rencanaKeluaran, setRencanaKeluaran] = useState<string[]>([]);
  const [uraianRencana, setUraianRencana] = useState('');
  const [tautanBukti, setTautanBukti] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Editable Weights State
  const [editWeights, setEditWeights] = useState<PriorityScoreWeights>(weights);
  const [weightsSavedMsg, setWeightsSavedMsg] = useState(false);

  // Available Years
  const availableYears = useMemo(() => {
    const set = new Set<string>();
    proposals.forEach((p) => set.add(p.tahun || '2026'));
    return ['Semua', ...Array.from(set)];
  }, [proposals]);

  // Available Categories
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    proposals.forEach((p) => {
      if (p.kelompokMasalah) set.add(p.kelompokMasalah);
    });
    return ['Semua', ...Array.from(set)];
  }, [proposals]);

  // Filtered & Ranked Proposals
  const filteredProposals = useMemo(() => {
    return proposals
      .map((p) => {
        // Recalculate score based on current active weights
        const scoring = p.scoring || {
          urgensi: p.urgensi.toLowerCase().includes('mendesak') ? 28 : 20,
          keterkaitanRPJMD: 25,
          riwayatKajian: 12,
          kesiapanData: 8,
          kesiapanAnggaran: 12,
        };
        const calculated = calculateProposalScore(scoring, weights);
        return {
          ...p,
          totalScore: calculated.totalScore,
          priorityTier: calculated.tier,
        };
      })
      .filter((p) => {
        const matchYear = filterYear === 'Semua' || p.tahun === filterYear;
        const matchCategory = filterCategory === 'Semua' || p.kelompokMasalah === filterCategory;
        const matchPriority = filterPriority === 'Semua' || p.priorityTier === filterPriority;
        const matchSearch =
          p.isuKrusial.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.perangkatDaerah.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.unitKerja.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.penanggungJawab.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.outputRisetDiharapkan.toLowerCase().includes(searchTerm.toLowerCase());

        return matchYear && matchCategory && matchPriority && matchSearch;
      })
      .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0)); // Rank by score descending
  }, [proposals, filterYear, filterCategory, filterPriority, searchTerm, weights]);

  // Reset page to 1 when filters or search term change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterYear, filterCategory, filterPriority, searchTerm]);

  // Paginated proposals for proportional single-page view
  const totalPages = Math.max(1, Math.ceil(filteredProposals.length / pageSize));
  const paginatedProposals = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProposals.slice(start, start + pageSize);
  }, [filteredProposals, currentPage, pageSize]);

  // Submit Partner Intervention
  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetProposal = proposals.find((p) => p.id === selectedMasalahId) || proposals[0];
    const newIntervention: PartnerIntervention = {
      id: `part-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      namaLembaga,
      jenisMitra,
      surelKontak,
      proposalId: selectedMasalahId,
      namaMasalah: `${targetProposal.perangkatDaerah} — ${targetProposal.isuKrusial.slice(0, 90)}...`,
      bentukKontribusi,
      rencanaDokumenKeluaran: rencanaKeluaran,
      uraianRencana,
      tautanBuktiKerjasama: tautanBukti,
      statusVerifikasi: 'Menunggu Verifikasi Bapperida',
    };

    onAddPartnerIntervention(newIntervention);
    setSubmitSuccess(true);
    // Reset form
    setNamaLembaga('');
    setSurelKontak('');
    setBentukKontribusi([]);
    setRencanaKeluaran([]);
    setUraianRencana('');
    setTautanBukti('');

    setTimeout(() => setSubmitSuccess(false), 3500);
  };

  // Toggle Checkboxes for Partner form
  const toggleContribution = (val: string) => {
    setBentukKontribusi((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const toggleOutputDoc = (val: string) => {
    setRencanaKeluaran((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Peringkat',
      'Skor Prioritas',
      'Tier',
      'Tahun',
      'Perangkat Daerah',
      'Unit Kerja',
      'Pengusul',
      'Kelompok Masalah',
      'Isu Krusial',
      'Urgensi (Max 30)',
      'RPJMD (Max 30)',
      'Riwayat (Max 15)',
      'Data (Max 10)',
      'Anggaran (Max 15)',
      'Misi NTT 2025-2029',
    ];

    const rows = filteredProposals.map((p, idx) => [
      `"${idx + 1}"`,
      `"${p.totalScore || 0}"`,
      `"${p.priorityTier || 'Standar'}"`,
      `"${p.tahun || '2026'}"`,
      `"${p.perangkatDaerah.replace(/"/g, '""')}"`,
      `"${p.unitKerja.replace(/"/g, '""')}"`,
      `"${p.penanggungJawab.replace(/"/g, '""')}"`,
      `"${p.kelompokMasalah.replace(/"/g, '""')}"`,
      `"${p.isuKrusial.replace(/"/g, '""')}"`,
      `"${p.scoring?.urgensi || 0}"`,
      `"${p.scoring?.keterkaitanRPJMD || 0}"`,
      `"${p.scoring?.riwayatKajian || 0}"`,
      `"${p.scoring?.kesiapanData || 0}"`,
      `"${p.scoring?.kesiapanAnggaran || 0}"`,
      `"${p.misiNTT || 'BERKELANJUTAN'}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `peringkat_prioritas_riset_ntt_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save Proposal Score Edit (Admin only)
  const handleSaveScoreEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProposal) return;
    const calculated = calculateProposalScore(editingProposal.scoring || {
      urgensi: 20,
      keterkaitanRPJMD: 20,
      riwayatKajian: 10,
      kesiapanData: 8,
      kesiapanAnggaran: 10,
    }, weights);

    const updated: ResearchProposal = {
      ...editingProposal,
      totalScore: calculated.totalScore,
      priorityTier: calculated.tier,
    };

    onUpdateProposal(updated);
    setEditingProposal(null);
  };

  // Apply new custom weights
  const handleApplyWeights = (e: React.FormEvent) => {
    e.preventDefault();
    const sum =
      Number(editWeights.urgensiWeight) +
      Number(editWeights.rpjmdWeight) +
      Number(editWeights.riwayatWeight) +
      Number(editWeights.dataWeight) +
      Number(editWeights.anggaranWeight);

    if (sum !== 100) {
      alert(`Total bobot harus bernilai tepat 100 (saat ini: ${sum})`);
      return;
    }

    onUpdateWeights(editWeights);
    setWeightsSavedMsg(true);
    setTimeout(() => setWeightsSavedMsg(false), 2500);
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 pb-20">
      {/* Page Title & Navigation Bar */}
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" />
                Sistem Informasi Riset Daerah (SIRD) Bapperida NTT
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                Dasbor Penjaringan Isu & Peringkat Prioritas Riset
              </h1>
              <p className="text-xs text-black mt-1 max-w-xl">
                Instrumen perumusan kebijakan berbasis bukti (<em className="text-emerald-800 not-italic font-semibold">evidence-based policy</em>) selaras Visi Pembangunan NTT 2025–2029 &amp; Spirit “Ayo Bangun NTT”.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl shadow-2xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-black" />
                <span>Unduh Rekapitulasi CSV</span>
              </button>

              {!isAdmin ? (
                <button
                  onClick={onOpenAdminLogin}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-colors cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Mode Admin</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-xl">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Admin Aktif</span>
                </span>
              )}
            </div>
          </div>

          {/* Sub-Tabs for Dashboard */}
          <div className="flex items-center gap-2 overflow-x-auto mt-6 pt-2 border-t border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('rekapitulasi')}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'rekapitulasi'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-black hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Peringkat Prioritas Riset ({proposals.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('trend')}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'trend'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-black hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Chart Tren Usulan Riset</span>
            </button>

            <button
              onClick={() => setActiveTab('visi')}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'visi'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-black hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4 text-teal-400" />
              <span>Visi NTT 2025–2029 &amp; 7 Pilar</span>
            </button>

            <button
              onClick={() => setActiveTab('mitra')}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'mitra'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-black hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Handshake className="w-4 h-4 text-sky-400" />
              <span>Skema Kemitraan &amp; Intervensi Mitra</span>
            </button>

            <button
              onClick={() => setActiveTab('bobot')}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'bobot'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-black hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Konfigurasi Bobot Skor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container Content: Max-w-5xl (Menyempit secara proporsional agar tidak melebar & pas satu halaman) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
        {/* ========================================================= */}
        {/* TAB 1: REKAPITULASI & PERINGKAT PRIORITAS RISET            */}
        {/* ========================================================= */}
        {activeTab === 'rekapitulasi' && (
          <div className="space-y-3.5">
            {/* Guide Info Banner: Ringkas & Padat */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/90 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-bold text-emerald-950">
                    Formula Skor (0–100): Urgensi ({weights.urgensiWeight}%) + RPJMD ({weights.rpjmdWeight}%) + Riwayat ({weights.riwayatWeight}%) + Data ({weights.dataWeight}%) + Anggaran ({weights.anggaranWeight}%)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-bold">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white">Tier 1 (≥85)</span>
                  <span className="px-2 py-0.5 rounded-md bg-teal-700 text-white">Tier 2 (70-84)</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-700 text-white">Tier 3 (&lt;70)</span>
                </div>
              </div>
            </div>

            {/* Filters Toolbar: Ringkas & Proporsional */}
            <div className="p-2.5 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-2.5 text-xs">
              {/* Search Box */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <input
                  type="text"
                  placeholder="Cari isu, instansi, pengusul..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-xs"
                />
              </div>

              {/* Filter Tahun */}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-black" />
                <span className="font-semibold text-black">Tahun:</span>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="px-2 py-1 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-xs"
                >
                  {availableYears.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr === 'Semua' ? 'Semua Tahun' : `Tahun ${yr}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Kelompok Masalah */}
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-black" />
                <span className="font-semibold text-black">Kelompok:</span>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="max-w-[160px] truncate px-2 py-1 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-xs"
                >
                  {availableCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Prioritas Tier */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-black">Prioritas:</span>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-2 py-1 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-xs"
                >
                  <option value="Semua">Semua</option>
                  <option value="Sangat Tinggi">Tier 1: Sangat Tinggi</option>
                  <option value="Tinggi">Tier 2: Tinggi</option>
                  <option value="Menengah">Tier 3: Menengah</option>
                </select>
              </div>
            </div>

            {/* Ranked Table View: Proporsional & Pas Satu Halaman */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-800">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                    <tr>
                      <th className="py-2.5 px-3 w-24 text-center">Peringkat &amp; Skor</th>
                      <th className="py-2.5 px-3 w-44">Perangkat Daerah / Pengusul</th>
                      <th className="py-2.5 px-3">Isu Krusial &amp; Output Rekomendasi</th>
                      <th className="py-2.5 px-3 w-40">Kelompok &amp; Visi NTT</th>
                      <th className="py-2.5 px-3 w-20 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedProposals.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-500 font-medium">
                          Tidak ada usulan riset yang sesuai dengan kriteria filter pencarian.
                        </td>
                      </tr>
                    ) : (
                      paginatedProposals.map((prop, idx) => {
                        const globalRank = (currentPage - 1) * pageSize + idx + 1;
                        const tierColor =
                          prop.totalScore! >= 85
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : prop.totalScore! >= 70
                            ? 'bg-teal-50 text-teal-800 border-teal-300'
                            : 'bg-slate-100 text-slate-800 border-slate-300';

                        return (
                          <tr key={prop.id} className="hover:bg-slate-50/70 transition-colors">
                            {/* Peringkat & Skor Terpadu */}
                            <td className="py-2.5 px-3 text-center">
                              <div className="inline-flex flex-col items-center">
                                <div className="flex items-baseline gap-1">
                                  <span className="font-bold text-xs text-slate-500 font-mono">#{globalRank}</span>
                                  <span className="text-sm font-black text-slate-900 font-mono tabular-nums">
                                    {prop.totalScore}
                                  </span>
                                </div>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border mt-0.5 ${tierColor}`}>
                                  {prop.priorityTier}
                                </span>
                              </div>
                            </td>

                            {/* Perangkat Daerah */}
                            <td className="py-2.5 px-3">
                              <div className="font-bold text-slate-900 leading-tight line-clamp-1">
                                {prop.unitKerja || prop.perangkatDaerah}
                              </div>
                              <div className="text-[11px] text-black mt-0.5 truncate font-medium">
                                {prop.penanggungJawab}
                              </div>
                              <span className="inline-block mt-0.5 text-[10px] text-black font-mono">
                                Thn {prop.tahun || '2026'}
                              </span>
                            </td>

                            {/* Isu Krusial & Output */}
                            <td className="py-2.5 px-3 space-y-0.5">
                              <p className="line-clamp-2 text-slate-900 font-medium leading-snug">
                                {prop.isuKrusial}
                              </p>
                              <p className="text-[11px] text-black truncate">
                                <strong className="text-black">Output:</strong> {prop.outputRisetDiharapkan}
                              </p>
                            </td>

                            {/* Kelompok Masalah & Kaitan Visi NTT */}
                            <td className="py-2.5 px-3 space-y-1">
                              <span className="font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md block leading-tight border border-emerald-100 text-[10px] truncate">
                                {prop.kelompokMasalah}
                              </span>
                              <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-sky-50 text-sky-900 font-bold border border-sky-200 text-[9px] truncate">
                                <span>Misi: {prop.misiNTT || 'MAJU'}</span>
                              </div>
                            </td>

                            {/* Tombol Aksi & Tombol Edit */}
                            <td className="py-2.5 px-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => onSelectProposal(prop)}
                                  title="Lihat Berkas Usulan"
                                  className="p-1.5 text-black hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>

                                {isAdmin ? (
                                  <button
                                    onClick={() => setEditingProposal(prop)}
                                    title="Edit Skor Prioritas (Admin)"
                                    className="p-1.5 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                ) : (
                                  <button
                                    onClick={onOpenAdminLogin}
                                    title="Login Admin untuk Edit Skor"
                                    className="p-1.5 text-black hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                  >
                                    <Edit3 className="w-4 h-4 opacity-40" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Bar Navigasi Pagination: Pas Satu Halaman */}
              <div className="border-t border-slate-200 bg-slate-50/60 px-3.5 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                <span className="text-black font-medium">
                  Menampilkan <strong className="text-slate-900">{filteredProposals.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</strong> &ndash; <strong className="text-slate-900">{Math.min(currentPage * pageSize, filteredProposals.length)}</strong> dari <strong className="text-emerald-800">{filteredProposals.length}</strong> Usulan
                </span>

                {totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-1 rounded-md border border-slate-200 bg-white text-black hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Halaman Sebelumnya"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        onClick={() => setCurrentPage(num)}
                        className={`w-6 h-6 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                          currentPage === num
                            ? 'bg-slate-900 text-white'
                            : 'border border-slate-200 bg-white text-black hover:bg-slate-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-1 rounded-md border border-slate-200 bg-white text-black hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Halaman Berikutnya"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: CHART & TREN USULAN RISET                           */}
        {/* ========================================================= */}
        {activeTab === 'trend' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Sistem Informasi Riset Daerah: Analisis Tren Usulan
              </h3>
              <p className="text-xs text-black mt-0.5">
                Visualisasi dinamika usulan riset, timeline penjaringan, dan keterkaitan sektoral.
              </p>
            </div>

            {/* Key Trend Statistics Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-black uppercase tracking-wider block">
                  Total Usulan Terinput
                </span>
                <div className="text-3xl font-black text-slate-900 font-mono mt-1">
                  {proposals.length}
                </div>
                <span className="text-xs text-emerald-700 font-medium block mt-1">
                  &uarr; 100% Terverifikasi
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-black uppercase tracking-wider block">
                  Usulan Tier 1 (Mendesak)
                </span>
                <div className="text-3xl font-black text-emerald-700 font-mono mt-1">
                  {proposals.filter((p) => (p.totalScore || 0) >= 85).length}
                </div>
                <span className="text-xs text-black font-medium block mt-1">
                  Skor prioritas &ge; 85
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-black uppercase tracking-wider block">
                  Dukungan Kemitraan Mitra
                </span>
                <div className="text-3xl font-black text-teal-700 font-mono mt-1">
                  {partnerInterventions.length}
                </div>
                <span className="text-xs text-black font-medium block mt-1">
                  Permohonan intervensi aktif
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-black uppercase tracking-wider block">
                  Rata-Rata Skor Usulan
                </span>
                <div className="text-3xl font-black text-amber-700 font-mono mt-1">
                  {Math.round(
                    proposals.reduce((acc, curr) => acc + (curr.totalScore || 80), 0) /
                      (proposals.length || 1)
                  )}
                </div>
                <span className="text-xs text-black font-medium block mt-1">
                  Skala evaluasi 0&ndash;100
                </span>
              </div>
            </div>

            {/* Visual Trend Chart: Progres Penjaringan Usulan Riset Per Triwulan & Kategori */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chart 1: Progres Triwulan / Timeline */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h4 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Tren Progres Penjaringan Riset (2026)
                </h4>
                <p className="text-xs text-black mb-6">
                  Distribusi volume usulan yang diajukan perangkat daerah menurut fase perencanaan
                </p>

                {/* Bar chart mockup with realistic data */}
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span>Triwulan I (Januari &ndash; Maret)</span>
                      <span className="font-mono text-black">2 Usulan (25%)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[25%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span>Triwulan II (April &ndash; Juni)</span>
                      <span className="font-mono text-black">3 Usulan (38%)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full w-[38%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span>Triwulan III (Juli &ndash; September)</span>
                      <span className="font-mono text-black">4 Usulan (50%)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-sky-600 rounded-full w-[50%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span>Triwulan IV (Oktober &ndash; Desember) &ndash; Aktif</span>
                      <span className="font-mono text-black">6+ Usulan (Proyeksi 75%)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full w-[75%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart 2: Distribusi Menurut Visi Pembangunan NTT */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h4 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-teal-600" />
                  Sebaran Usulan Menurut Misi Pembangunan NTT
                </h4>
                <p className="text-xs text-black mb-6">
                  Keterkaitan langsung terhadap arah kebijakan pembangunan jangka menengah
                </p>

                <div className="space-y-4">
                  {LIMA_MISI_NTT.map((misi) => {
                    const count = proposals.filter((p) => p.misiNTT === misi.nama).length || 1;
                    const percent = Math.round((count / (proposals.length || 1)) * 100);

                    return (
                      <div key={misi.misiId} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-800">{misi.nomor}: {misi.nama}</span>
                          <span className="font-mono text-black">{count} Kajian ({percent}%)</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full"
                            style={{ width: `${Math.max(percent, 15)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: VISI NTT 2025–2029 & 7 PILAR (Screenshot Exact)    */}
        {/* ========================================================= */}
        {activeTab === 'visi' && (
          <div className="space-y-8">
            {/* Header Misi Pembangunan (Sesuai Screenshot 2026-10-13 103037.png) */}
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-2xl font-black text-slate-900">
                Misi Pembangunan
              </h3>
              <p className="text-xs sm:text-sm text-black mt-1">
                Lima misi beserta pilar pembangunan dan Dasa Cita yang menjabarkannya (Tabel 4.1 P-RKPD).
              </p>
            </div>

            {/* 5 Cards Misi Pembangunan (Exact layout matching Screenshot 103037) */}
            <div className="space-y-4">
              {LIMA_MISI_NTT.map((misi) => (
                <div
                  key={misi.misiId}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3 hover:border-slate-300 transition-colors"
                >
                  {/* Badge Misi & Nama */}
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-slate-900 text-white font-extrabold text-xs">
                      {misi.nomor}
                    </span>
                    <span className="text-sm font-black text-slate-900 uppercase tracking-wide">
                      {misi.nama}
                    </span>
                  </div>

                  {/* Deskripsi Misi */}
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {misi.deskripsi}
                  </p>

                  {/* Pilar & Dasa Cita Pills (Matching Screenshot 103037) */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {misi.pilarTerkait.map((pilar) => (
                      <span
                        key={pilar}
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200"
                      >
                        {pilar}
                      </span>
                    ))}
                    {misi.dasaCitaTerkait.map((dasa) => (
                      <span
                        key={dasa}
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                      >
                        {dasa}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Tujuh Pilar Pembangunan (Sesuai Screenshot 2026-10-13 103113.png) */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-xl font-black text-slate-900 mb-6">
                Tujuh Pilar Pembangunan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TUJUH_PILAR_PEMBANGUNAN.map((pilar) => (
                  <div
                    key={pilar.nomor}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5"
                  >
                    <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 font-black text-sm flex items-center justify-center shrink-0">
                      {pilar.nomor}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {pilar.nama}
                      </h4>
                      <p className="text-xs text-black mt-0.5 leading-relaxed">
                        {pilar.deskripsi}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SKEMA KEMITRAAN & INTERVENSI MITRA (Screenshot)    */}
        {/* ========================================================= */}
        {activeTab === 'mitra' && (
          <div className="space-y-10">
            {/* Form Ajukan Permohonan Intervensi Mitra (Matching Screenshot 2026-10-13 102200.png) */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              <div className="border-b border-slate-200 pb-5 mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Ajukan Permohonan Intervensi Mitra
                </h3>
                <p className="text-xs sm:text-sm text-black mt-1">
                  Untuk perguruan tinggi, lembaga penelitian, dan mitra pembangunan yang bersedia menangani masalah yang diajukan perangkat daerah. Permohonan diverifikasi Bapperida sebelum berstatus kerja sama.
                </p>
              </div>

              {submitSuccess && (
                <div className="p-4 mb-6 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Permohonan intervensi Anda telah berhasil dikirim dan masuk dalam sistem verifikasi Bapperida NTT!</span>
                </div>
              )}

              <form onSubmit={handlePartnerSubmit} className="space-y-6 text-xs">
                {/* Row 1: Nama lembaga, Jenis mitra, Surel kontak */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Nama lembaga/mitra
                    </label>
                    <input
                      type="text"
                      required
                      value={namaLembaga}
                      onChange={(e) => setNamaLembaga(e.target.value)}
                      placeholder="Nama institusi atau lembaga"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Jenis mitra
                    </label>
                    <select
                      value={jenisMitra}
                      onChange={(e) => setJenisMitra(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-medium"
                    >
                      <option value="Perguruan Tinggi">Perguruan Tinggi</option>
                      <option value="Lembaga Penelitian">Lembaga Penelitian</option>
                      <option value="NGO / CSO / Komunitas">NGO / CSO / Komunitas</option>
                      <option value="Swasta / Industri">Swasta / Industri</option>
                      <option value="Mitra Pembangunan Internasional">Mitra Pembangunan Internasional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Surel kontak (tidak ditampilkan publik)
                    </label>
                    <input
                      type="email"
                      required
                      value={surelKontak}
                      onChange={(e) => setSurelKontak(e.target.value)}
                      placeholder="email@lembaga.org"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Masalah perangkat daerah yang akan diintervensi */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Masalah perangkat daerah yang akan diintervensi
                  </label>
                  <select
                    value={selectedMasalahId}
                    onChange={(e) => setSelectedMasalahId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  >
                    {proposals.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.perangkatDaerah} &mdash; {p.isuKrusial.slice(0, 95)}...
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bentuk kontribusi (Checkboxes) */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <span className="block font-bold text-slate-800">
                    Bentuk kontribusi
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    {['Riset/Kajian', 'Pendanaan', 'Data', 'SDM/Tenaga Ahli', 'Prasarana', 'Pendampingan'].map((item) => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none">
                        <input
                          type="checkbox"
                          checked={bentukKontribusi.includes(item)}
                          onChange={() => toggleContribution(item)}
                          className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rencana dokumen keluaran (Checkboxes) */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <span className="block font-bold text-slate-800">
                    Rencana dokumen keluaran
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    {['Kajian Akademik', 'Policy Brief', 'Evaluasi Dampak', 'Pemetaan/Analisis Data', 'Prototipe Inovasi', 'Laporan Akhir'].map((item) => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none">
                        <input
                          type="checkbox"
                          checked={rencanaKeluaran.includes(item)}
                          onChange={() => toggleOutputDoc(item)}
                          className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Uraian rencana intervensi */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Uraian rencana intervensi
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={uraianRencana}
                    onChange={(e) => setUraianRencana(e.target.value)}
                    placeholder="Jelaskan metodologi, lokus wilayah di NTT, dan tahapan rencana intervensi yang ditawarkan..."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Tautan bukti kerja sama */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Tautan bukti kerja sama (MoU, PKS, atau surat dukungan)
                  </label>
                  <input
                    type="url"
                    value={tautanBukti}
                    onChange={(e) => setTautanBukti(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Tombol KIRIM PERMOHONAN */}
                <div>
                  <button
                    type="submit"
                    className="px-6 py-3 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    KIRIM PERMOHONAN
                  </button>
                </div>
              </form>
            </div>

            {/* Sistem Analisis & Rekap Data Intervensi Mitra */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Sistem Analisis &amp; Rekapitulasi Mitra Terdaftar
                  </h4>
                  <p className="text-xs text-black">
                    Daftar permohonan kemitraan riset yang masuk dan status verifikasi Bapperida NTT
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-slate-700">
                  {partnerInterventions.length} Permohonan
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-800">
                    <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-900">
                      <tr>
                        <th className="p-3 w-12 text-center">No</th>
                        <th className="p-3 w-48">Nama Lembaga &amp; Jenis</th>
                        <th className="p-3">Masalah yang Diintervensi</th>
                        <th className="p-3 w-36">Bentuk Kontribusi</th>
                        <th className="p-3 w-40">Dokumen Keluaran</th>
                        <th className="p-3 w-36 text-center">Status Verifikasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {partnerInterventions.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-3 text-center font-mono text-black">{idx + 1}</td>
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{item.namaLembaga}</div>
                            <span className="inline-block mt-0.5 px-2 py-0.5 rounded-sm bg-sky-50 text-sky-800 text-[10px] font-semibold">
                              {item.jenisMitra}
                            </span>
                          </td>
                          <td className="p-3">
                            <p className="line-clamp-2 text-slate-700 font-normal">
                              {item.namaMasalah}
                            </p>
                            {item.tautanBuktiKerjasama && (
                              <a
                                href={item.tautanBuktiKerjasama}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-emerald-700 hover:underline font-semibold block mt-0.5"
                              >
                                Tautan Dokumen Bukti Kerja Sama &rarr;
                              </a>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {item.bentukKontribusi.map((b) => (
                                <span key={b} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded-sm text-[10px]">
                                  {b}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {item.rencanaDokumenKeluaran.map((d) => (
                                <span key={d} className="px-1.5 py-0.5 bg-teal-50 text-teal-800 rounded-sm text-[10px]">
                                  {d}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            {isAdmin ? (
                              <select
                                value={item.statusVerifikasi}
                                onChange={(e) =>
                                  onUpdateInterventionStatus(
                                    item.id,
                                    e.target.value as PartnerIntervention['statusVerifikasi']
                                  )
                                }
                                className="px-2 py-1 bg-white border border-slate-300 rounded-md text-[11px] font-bold text-slate-800"
                              >
                                <option value="Menunggu Verifikasi Bapperida">Menunggu Verifikasi</option>
                                <option value="Terverifikasi">Terverifikasi</option>
                                <option value="Disetujui Kerja Sama">Disetujui Kerja Sama</option>
                              </select>
                            ) : (
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  item.statusVerifikasi === 'Disetujui Kerja Sama'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : item.statusVerifikasi === 'Terverifikasi'
                                    ? 'bg-sky-100 text-sky-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {item.statusVerifikasi}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: KONFIGURASI BOBOT SKOR (Admin & Sistem)             */}
        {/* ========================================================= */}
        {activeTab === 'bobot' && (
          <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Pengaturan Bobot Kriteria Peringkat Prioritas Riset
              </h3>
              <p className="text-xs text-black mt-1">
                Sesuaikan proporsi bobot untuk perhitungan skor 0&ndash;100. Total persentase harus tepat 100.
              </p>
            </div>

            {weightsSavedMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Bobot kriteria baru berhasil disimpan dan diterapkan ke seluruh pemeringkatan usulan!</span>
              </div>
            )}

            <form onSubmit={handleApplyWeights} className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>1. Tingkat Urgensi Masalah (Default 30):</span>
                  <span className="font-mono font-bold">{editWeights.urgensiWeight}%</span>
                </div>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={editWeights.urgensiWeight}
                  onChange={(e) => setEditWeights({ ...editWeights, urgensiWeight: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>2. Keterkaitan RPJMD/Renstra/RKPD (Default 30):</span>
                  <span className="font-mono font-bold">{editWeights.rpjmdWeight}%</span>
                </div>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={editWeights.rpjmdWeight}
                  onChange={(e) => setEditWeights({ ...editWeights, rpjmdWeight: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>3. Riwayat Kajian Terdahulu (Default 15):</span>
                  <span className="font-mono font-bold">{editWeights.riwayatWeight}%</span>
                </div>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={editWeights.riwayatWeight}
                  onChange={(e) => setEditWeights({ ...editWeights, riwayatWeight: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>4. Kesiapan Data Dukung (Default 10):</span>
                  <span className="font-mono font-bold">{editWeights.dataWeight}%</span>
                </div>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={editWeights.dataWeight}
                  onChange={(e) => setEditWeights({ ...editWeights, dataWeight: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>5. Kesiapan Anggaran / Sharing Cost (Default 15):</span>
                  <span className="font-mono font-bold">{editWeights.anggaranWeight}%</span>
                </div>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={editWeights.anggaranWeight}
                  onChange={(e) => setEditWeights({ ...editWeights, anggaranWeight: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between font-bold text-slate-900">
                <span>Total Akumulasi Bobot:</span>
                <span className={`font-mono text-sm ${
                  Number(editWeights.urgensiWeight) +
                  Number(editWeights.rpjmdWeight) +
                  Number(editWeights.riwayatWeight) +
                  Number(editWeights.dataWeight) +
                  Number(editWeights.anggaranWeight) === 100
                    ? 'text-emerald-700'
                    : 'text-rose-600'
                }`}>
                  {Number(editWeights.urgensiWeight) +
                    Number(editWeights.rpjmdWeight) +
                    Number(editWeights.riwayatWeight) +
                    Number(editWeights.dataWeight) +
                    Number(editWeights.anggaranWeight)} / 100
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  Terapkan Bobot Baru
                </button>
                <button
                  type="button"
                  onClick={() => setEditWeights(DEFAULT_WEIGHTS)}
                  className="px-4 py-2.5 font-semibold text-black hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Kembalikan ke Default
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* MODAL EDIT SKOR PRIORITAS KHUSUS ADMIN */}
      {editingProposal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase">Panel Admin</span>
                <h4 className="text-base font-bold">Edit Penilaian Skor Usulan Riset</h4>
              </div>
              <button
                onClick={() => setEditingProposal(null)}
                className="text-black hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveScoreEdit} className="p-6 space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-black font-semibold block">Usulan:</span>
                <h5 className="font-bold text-slate-900 line-clamp-2 mt-0.5">
                  {editingProposal.isuKrusial}
                </h5>
                <span className="text-black text-[11px] block mt-1">
                  {editingProposal.perangkatDaerah}
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  1. Nilai Urgensi (0 - 30):
                </label>
                <input
                  type="number"
                  min={0}
                  max={30}
                  required
                  value={editingProposal.scoring?.urgensi || 0}
                  onChange={(e) =>
                    setEditingProposal({
                      ...editingProposal,
                      scoring: {
                        ...editingProposal.scoring!,
                        urgensi: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  2. Keterkaitan RPJMD / Renstra (0 - 30):
                </label>
                <input
                  type="number"
                  min={0}
                  max={30}
                  required
                  value={editingProposal.scoring?.keterkaitanRPJMD || 0}
                  onChange={(e) =>
                    setEditingProposal({
                      ...editingProposal,
                      scoring: {
                        ...editingProposal.scoring!,
                        keterkaitanRPJMD: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  3. Riwayat Kajian (0 - 15):
                </label>
                <input
                  type="number"
                  min={0}
                  max={15}
                  required
                  value={editingProposal.scoring?.riwayatKajian || 0}
                  onChange={(e) =>
                    setEditingProposal({
                      ...editingProposal,
                      scoring: {
                        ...editingProposal.scoring!,
                        riwayatKajian: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  4. Kesiapan Data Dukung (0 - 10):
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  required
                  value={editingProposal.scoring?.kesiapanData || 0}
                  onChange={(e) =>
                    setEditingProposal({
                      ...editingProposal,
                      scoring: {
                        ...editingProposal.scoring!,
                        kesiapanData: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  5. Kesiapan Anggaran / Sharing (0 - 15):
                </label>
                <input
                  type="number"
                  min={0}
                  max={15}
                  required
                  value={editingProposal.scoring?.kesiapanAnggaran || 0}
                  onChange={(e) =>
                    setEditingProposal({
                      ...editingProposal,
                      scoring: {
                        ...editingProposal.scoring!,
                        kesiapanAnggaran: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProposal(null)}
                  className="px-4 py-2 font-semibold text-black bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  Simpan Perubahan Skor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
