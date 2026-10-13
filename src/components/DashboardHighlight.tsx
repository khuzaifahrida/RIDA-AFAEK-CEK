import React, { useState } from 'react';
import { ResearchProposal } from '../types';
import { BarChart3, Building2, AlertTriangle, ArrowRight, RefreshCw, FileText, CheckCircle, ExternalLink, Filter, ChevronRight } from 'lucide-react';

interface DashboardHighlightProps {
  proposals: ResearchProposal[];
  onOpenFullDashboard: () => void;
  onSelectProposal: (proposal: ResearchProposal) => void;
  onRefreshData?: () => void;
  isSyncing?: boolean;
  lastUpdated?: string;
}

export const DashboardHighlight: React.FC<DashboardHighlightProps> = ({
  proposals,
  onOpenFullDashboard,
  onSelectProposal,
  onRefreshData,
  isSyncing = false,
  lastUpdated,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Compute stats
  const totalUsulan = proposals.length;
  const uniqueOPDs = new Set(proposals.map((p) => p.perangkatDaerah)).size;

  // Category counts
  const categoryMap: Record<string, number> = {};
  proposals.forEach((p) => {
    const cat = p.kelompokMasalah || 'Lainnya';
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });

  const categoryEntries = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);

  // Urgent proposals
  const urgentProposals = proposals.filter(
    (p) =>
      p.urgensi.toLowerCase().includes('mendesak') ||
      p.urgensi.toLowerCase().includes('tinggi')
  );

  const displayUrgent = urgentProposals.length > 0 ? urgentProposals : proposals.slice(0, 3);

  // Filtered proposals list for quick inspection
  const filteredProposals =
    selectedCategory === 'Semua'
      ? proposals
      : proposals.filter((p) => p.kelompokMasalah === selectedCategory);

  return (
    <section id="dasbor" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" />
              Sistem Informasi Riset Daerah
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pantauan Isu Strategis Daerah
            </h2>
            <p className="text-sm sm:text-base text-black max-w-2xl">
              Terhubung dengan data instrumen riset daerah (<strong className="text-slate-800 font-semibold">data untuk dasboard</strong>) yang otomatis terupdate saat terjadi penambahan usulan baru oleh Perangkat Daerah.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onRefreshData && (
              <button
                onClick={onRefreshData}
                disabled={isSyncing}
                title="Sinkronkan data terbaru"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-xs transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Sinkronisasi...' : 'Sinkronkan'}</span>
              </button>
            )}

            <button
              onClick={onOpenFullDashboard}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
            >
              <span>Lihat Rekapitulasi Lengkap</span>
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

        {/* Sync Status bar */}
        <div className="py-3 flex items-center justify-between text-xs text-black">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Database Status: <strong className="text-slate-700 font-medium">Terhubung & Aktif</strong></span>
            <span className="text-slate-300">·</span>
            <span>Pembaruan Terakhir: {lastUpdated || 'Hari ini'}</span>
          </div>
          <div className="font-mono text-black tabular-nums hidden sm:block">
            {totalUsulan} Entri Terverifikasi
          </div>
        </div>

        {/* Top 3 KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Card 1: Total Usulan */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-black uppercase tracking-wider block">
                Total Usulan Riset
              </span>
              <div className="text-3xl font-black text-slate-900 mt-1 tabular-nums">
                {totalUsulan}
              </div>
              <span className="text-xs text-black mt-1 block">
                Terdokumentasi dalam instrumen
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Total OPD */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-black uppercase tracking-wider block">
                Partisipasi OPD / Lembaga
              </span>
              <div className="text-3xl font-black text-slate-900 mt-1 tabular-nums">
                {uniqueOPDs}
              </div>
              <span className="text-xs text-black mt-1 block">
                Lembaga teknis pemprov terdaftar
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Prioritas Mendesak */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-black uppercase tracking-wider block">
                Kajian Sangat Mendesak
              </span>
              <div className="text-3xl font-black text-amber-600 mt-1 tabular-nums">
                {urgentProposals.length}
              </div>
              <span className="text-xs text-black mt-1 block">
                Perlu penetapan tahun berjalan
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Visual Charts & Highlights Row */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: 📈 Grafik Kelompok Masalah Terbanyak (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  Grafik Kelompok Masalah Terbanyak
                </h3>
                <p className="text-xs text-black mt-0.5">
                  Distribusi proporsi isu strategis yang dihimpun dari perangkat daerah
                </p>
              </div>
              <span className="text-xs font-mono font-medium text-black tabular-nums">
                {categoryEntries.length} Kategori
              </span>
            </div>

            {/* Visual Bars with percentage & count */}
            <div className="space-y-4">
              {categoryEntries.map(([category, count]) => {
                const percentage = Math.round((count / (totalUsulan || 1)) * 100);
                return (
                  <div key={category} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 line-clamp-1 pr-2">
                        {category}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-black">{percentage}%</span>
                        <span className="font-bold text-slate-900 tabular-nums">({count} usulan)</span>
                      </div>
                    </div>
                    {/* Bar track */}
                    <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500"
                        style={{ width: `${Math.max(percentage, 12)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanatory note */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-black">
              <span>* Data terhubung otomatis ke spreadsheet instrumen</span>
              <button
                onClick={onOpenFullDashboard}
                className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
              >
                Lihat Analisis Detail &rarr;
              </button>
            </div>
          </div>

          {/* Right Column: 📑 Usulan Kajian Paling Mendesak (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Usulan Kajian Mendesak
                </h3>
                <p className="text-xs text-black mt-0.5">
                  Prioritas telaah riset untuk penyusunan rekomendasi
                </p>
              </div>
            </div>

            {/* List of Urgent Proposals */}
            <div className="space-y-3 flex-1">
              {displayUrgent.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => onSelectProposal(prop)}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold text-emerald-800 line-clamp-1">
                      {prop.unitKerja || prop.perangkatDaerah}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-sm shrink-0">
                      {prop.urgensi.includes('Mendesak') ? 'Mendesak' : 'Prioritas'}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-snug">
                    {prop.isuKrusial}
                  </h4>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-black">
                    <span className="truncate max-w-[200px] text-black">
                      Output: {prop.outputRisetDiharapkan}
                    </span>
                    <span className="text-emerald-700 font-semibold group-hover:underline flex items-center gap-0.5 shrink-0">
                      Buka Telaah
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Button: Lihat Dashboard Rekapitulasi Lengkap */}
            <div className="pt-4 mt-auto border-t border-slate-100">
              <button
                onClick={onOpenFullDashboard}
                className="w-full py-2.5 px-4 text-xs font-bold text-center text-slate-900 hover:text-white bg-slate-100 hover:bg-slate-900 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span>Lihat Dashboard Rekapitulasi Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
