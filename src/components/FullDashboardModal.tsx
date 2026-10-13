import React, { useState, useMemo } from 'react';
import { ResearchProposal } from '../types';
import { X, Search, Filter, Download, Plus, RefreshCw, Eye, Building, Calendar, AlertCircle, FileSpreadsheet, CheckCircle2, ChevronDown } from 'lucide-react';

interface FullDashboardModalProps {
  proposals: ResearchProposal[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProposal: (proposal: ResearchProposal) => void;
  onAddProposal: (newProp: ResearchProposal) => void;
  onSyncGoogleSheet: (url: string) => void;
  isSyncing?: boolean;
}

export const FullDashboardModal: React.FC<FullDashboardModalProps> = ({
  proposals,
  isOpen,
  onClose,
  onSelectProposal,
  onAddProposal,
  onSyncGoogleSheet,
  isSyncing = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedUrgensi, setSelectedUrgensi] = useState('Semua');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSyncConfig, setShowSyncConfig] = useState(false);
  const [sheetUrlInput, setSheetUrlInput] = useState('');

  // Form State for new proposal
  const [newProp, setNewProp] = useState<Partial<ResearchProposal>>({
    perangkatDaerah: 'Dinas / Badan Lingkup Pemprov NTT',
    unitKerja: '',
    penanggungJawab: '',
    isuKrusial: '',
    kelompokMasalah: 'Transformasi Digital & Tata Kelola',
    ikuTerdampak: '',
    pernahRisetSebelumnya: 'Belum pernah sama sekali',
    alasanBelumSelesai: '',
    outputRisetDiharapkan: 'Naskah Akademik Kebijakan / Policy Brief',
    urgensi: 'Mendesak (Untuk perencanaan tahun anggaran berikutnya)',
    ketersediaanAnggaran: 'Memerlukan dukungan pendanaan dari anggaran riset daerah Bapperida',
    bentukKolaborasi: 'Sharing Data dan SDM',
    pelibatanMitra: 'Sangat terbuka dan membutuhkan pelibatan Perguruan Tinggi',
    peranSpesifikMitra: 'Penyedia Tenaga Ahli / Pakar Riset',
    dokumenPendukung: 'Data statistik sektorial / Laporan Kinerja',
    kesiapanSharingData: 'Ya, siap dibagikan untuk kepentingan riset daerah',
  });

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    proposals.forEach((p) => {
      if (p.kelompokMasalah) set.add(p.kelompokMasalah);
    });
    return ['Semua', ...Array.from(set)];
  }, [proposals]);

  // Filtered proposals
  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => {
      const matchSearch =
        p.isuKrusial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.perangkatDaerah.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.unitKerja.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.penanggungJawab.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.outputRisetDiharapkan.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        selectedCategory === 'Semua' || p.kelompokMasalah === selectedCategory;

      const matchUrgensi =
        selectedUrgensi === 'Semua' ||
        (selectedUrgensi === 'Mendesak'
          ? p.urgensi.toLowerCase().includes('mendesak')
          : !p.urgensi.toLowerCase().includes('mendesak'));

      return matchSearch && matchCategory && matchUrgensi;
    });
  }, [proposals, searchTerm, selectedCategory, selectedUrgensi]);

  if (!isOpen) return null;

  const handleExportCSV = () => {
    const headers = [
      'Timestamp',
      'Perangkat Daerah',
      'Unit Kerja',
      'Penanggung Jawab',
      'Isu Krusial',
      'Kelompok Masalah',
      'IKU Terdampak',
      'Output Riset Diharapkan',
      'Urgensi',
      'Bentuk Kolaborasi',
      'Pelibatan Mitra',
    ];

    const rows = filteredProposals.map((p) => [
      `"${p.timestamp}"`,
      `"${p.perangkatDaerah.replace(/"/g, '""')}"`,
      `"${p.unitKerja.replace(/"/g, '""')}"`,
      `"${p.penanggungJawab.replace(/"/g, '""')}"`,
      `"${p.isuKrusial.replace(/"/g, '""')}"`,
      `"${p.kelompokMasalah.replace(/"/g, '""')}"`,
      `"${p.ikuTerdampak.replace(/"/g, '""')}"`,
      `"${p.outputRisetDiharapkan.replace(/"/g, '""')}"`,
      `"${p.urgensi.replace(/"/g, '""')}"`,
      `"${p.bentukKolaborasi.replace(/"/g, '""')}"`,
      `"${p.pelibatanMitra.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rekapitulasi_rida_afaek_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmitNewProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProp.isuKrusial || !newProp.penanggungJawab) {
      alert('Mohon lengkapi Isu Krusial dan Nama Penanggung Jawab.');
      return;
    }

    const created: ResearchProposal = {
      id: `prop-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      tahun: newProp.tahun || '2026',
      perangkatDaerah: newProp.perangkatDaerah || 'Perangkat Daerah NTT',
      unitKerja: newProp.unitKerja || 'Unit Kerja Teknis',
      penanggungJawab: newProp.penanggungJawab || 'Pengusul',
      isuKrusial: newProp.isuKrusial || '',
      kelompokMasalah: newProp.kelompokMasalah || 'Umum',
      ikuTerdampak: newProp.ikuTerdampak || 'Indikator Renstra',
      pernahRisetSebelumnya: newProp.pernahRisetSebelumnya || 'Belum pernah',
      keteranganRisetSebelumnya: newProp.keteranganRisetSebelumnya || '',
      alasanBelumSelesai: newProp.alasanBelumSelesai || 'Perlu kajian komprehensif',
      outputRisetDiharapkan: newProp.outputRisetDiharapkan || 'Naskah Akademik Kebijakan',
      urgensi: newProp.urgensi || 'Mendesak',
      ketersediaanAnggaran: newProp.ketersediaanAnggaran || 'Memerlukan dukungan APBD',
      bentukKolaborasi: newProp.bentukKolaborasi || 'Sharing Data & SDM',
      pelibatanMitra: newProp.pelibatanMitra || 'Terbuka',
      peranSpesifikMitra: newProp.peranSpesifikMitra || 'Penyedia Tenaga Ahli',
      dokumenPendukung: newProp.dokumenPendukung || 'Data Statistik Sektorial',
      kesiapanSharingData: newProp.kesiapanSharingData || 'Ya, siap dibagikan',
    };

    onAddProposal(created);
    setShowAddForm(false);
    // Reset
    setNewProp({
      perangkatDaerah: 'Dinas / Badan Lingkup Pemprov NTT',
      unitKerja: '',
      penanggungJawab: '',
      isuKrusial: '',
      kelompokMasalah: 'Transformasi Digital & Tata Kelola',
      ikuTerdampak: '',
      pernahRisetSebelumnya: 'Belum pernah sama sekali',
      alasanBelumSelesai: '',
      outputRisetDiharapkan: 'Naskah Akademik Kebijakan / Policy Brief',
      urgensi: 'Mendesak (Untuk perencanaan tahun anggaran berikutnya)',
      ketersediaanAnggaran: 'Memerlukan dukungan pendanaan dari anggaran riset daerah Bapperida',
      bentukKolaborasi: 'Sharing Data dan SDM',
      pelibatanMitra: 'Sangat terbuka dan membutuhkan pelibatan Perguruan Tinggi',
      peranSpesifikMitra: 'Penyedia Tenaga Ahli / Pakar Riset',
      dokumenPendukung: 'Data statistik sektorial / Laporan Kinerja',
      kesiapanSharingData: 'Ya, siap dibagikan untuk kepentingan riset daerah',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in">
      <div className="relative bg-white w-full max-w-6xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[95vh] flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Dashboard Rekapitulasi Lengkap
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-300 font-mono">
                {filteredProposals.length} dari {proposals.length} Usulan
              </span>
            </div>
            <h3 className="text-xl font-black text-white">
              Data Instrumen Penjaringan Riset Daerah NTT
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tambah Usulan</span>
            </button>
            <button
              onClick={handleExportCSV}
              title="Unduh Data CSV"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ekspor CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search & Filters Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari isu, instansi, pengusul, atau kata kunci..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Dropdown Category */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Kategori:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Urgensi */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Urgensi:</span>
            <select
              value={selectedUrgensi}
              onChange={(e) => setSelectedUrgensi(e.target.value)}
              className="px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Semua">Semua Urgensi</option>
              <option value="Mendesak">Mendesak</option>
              <option value="Reguler">Reguler / Jangka Menengah</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-200 p-0.5 rounded-lg">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kartu
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tabel
            </button>
          </div>

          {/* Google Sheet Live Connection Toggle */}
          <button
            onClick={() => setShowSyncConfig(!showSyncConfig)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Koneksi Sheet</span>
          </button>
        </div>

        {/* Live Sheet Configuration Panel */}
        {showSyncConfig && (
          <div className="p-4 bg-emerald-50 border-b border-emerald-200 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-emerald-950">
              <span className="flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                Sinkronkan dengan Google Sheets (&quot;data untuk dasboard&quot;)
              </span>
              <button
                onClick={() => setShowSyncConfig(false)}
                className="text-emerald-700 hover:text-emerald-900"
              >
                ✕
              </button>
            </div>
            <p className="text-emerald-800">
              Masukkan tautan Google Sheets publik dalam format CSV (File &gt; Share &gt; Publish to web &gt; Pilih CSV) agar dasbor otomatis membaca data terbaru:
            </p>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                value={sheetUrlInput}
                onChange={(e) => setSheetUrlInput(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-white border border-emerald-300 rounded-lg text-slate-900"
              />
              <button
                onClick={() => {
                  if (sheetUrlInput) {
                    onSyncGoogleSheet(sheetUrlInput);
                  }
                }}
                disabled={isSyncing}
                className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Mengunduh...' : 'Terapkan'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-100">
          {filteredProposals.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-800">Tidak ada usulan yang cocok</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Coba ubah kata kunci pencarian atau reset filter kategori di atas.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Semua');
                  setSelectedUrgensi('Semua');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : viewMode === 'cards' ? (
            /* Cards View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProposals.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => onSelectProposal(prop)}
                  className="bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col group text-left"
                >
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm line-clamp-1">
                      {prop.kelompokMasalah}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {prop.timestamp}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-3 mb-3 leading-snug">
                    {prop.isuKrusial}
                  </h4>

                  <div className="space-y-1 text-xs text-slate-600 mb-4">
                    <p className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="line-clamp-1">
                        {prop.perangkatDaerah} &mdash; <strong>{prop.unitKerja}</strong>
                      </span>
                    </p>
                    <p className="text-slate-500">
                      <strong>Pengusul:</strong> {prop.penanggungJawab}
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-sm text-[11px]">
                      {prop.urgensi.includes('Mendesak') ? 'Mendesak' : 'Jangka Menengah'}
                    </span>
                    <span className="text-emerald-700 font-bold group-hover:underline flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      Detail Telaah
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table View */
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                    <tr>
                      <th className="p-3 w-12">No</th>
                      <th className="p-3 w-40">Perangkat Daerah / Unit</th>
                      <th className="p-3 w-48">Kelompok Masalah</th>
                      <th className="p-3">Isu Krusial & Tantangan</th>
                      <th className="p-3 w-36">Output Riset</th>
                      <th className="p-3 w-28">Urgensi</th>
                      <th className="p-3 w-20 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProposals.map((prop, idx) => (
                      <tr
                        key={prop.id}
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                        onClick={() => onSelectProposal(prop)}
                      >
                        <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                        <td className="p-3">
                          <div className="font-semibold text-slate-900 line-clamp-1">
                            {prop.unitKerja || prop.perangkatDaerah}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">
                            {prop.penanggungJawab}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="text-emerald-700 font-medium">
                            {prop.kelompokMasalah}
                          </span>
                        </td>
                        <td className="p-3">
                          <p className="line-clamp-2 text-slate-800 font-normal">
                            {prop.isuKrusial}
                          </p>
                        </td>
                        <td className="p-3 line-clamp-2 text-slate-600">
                          {prop.outputRisetDiharapkan}
                        </td>
                        <td className="p-3">
                          <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-sm">
                            {prop.urgensi.includes('Mendesak') ? 'Mendesak' : 'Reguler'}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProposal(prop);
                            }}
                            className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Menampilkan <strong className="text-slate-800">{filteredProposals.length}</strong> usulan riset
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Tutup Dasbor
          </button>
        </div>
      </div>

      {/* Add Proposal Modal Sub-Dialog */}
      {showAddForm && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase">Input Usulan Baru</span>
                <h4 className="text-lg font-bold">Simulasi Tambah Usulan Riset Daerah</h4>
              </div>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitNewProposal} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Perangkat Daerah / Lembaga: *
                </label>
                <input
                  type="text"
                  required
                  value={newProp.perangkatDaerah}
                  onChange={(e) => setNewProp({ ...newProp, perangkatDaerah: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Unit Kerja: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Bidang Pemerintahan dan Pembangunan Manusia"
                  value={newProp.unitKerja}
                  onChange={(e) => setNewProp({ ...newProp, unitKerja: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Penanggung Jawab / Pengusul: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap & Jabatan"
                  value={newProp.penanggungJawab}
                  onChange={(e) => setNewProp({ ...newProp, penanggungJawab: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Kelompok Masalah: *
                </label>
                <select
                  value={newProp.kelompokMasalah}
                  onChange={(e) => setNewProp({ ...newProp, kelompokMasalah: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value="Kesehatan untuk Semua, Perlindungan Sosial yang Adaptif dan GEDSI">
                    Kesehatan untuk Semua, Perlindungan Sosial yang Adaptif dan GEDSI
                  </option>
                  <option value="Ekonomi Biru dan Ekonomi Hijau, Integrasi Ekonomi Domestik dan Nasional">
                    Ekonomi Biru dan Ekonomi Hijau, Integrasi Ekonomi Domestik dan Nasional
                  </option>
                  <option value="Industri dan Hilirisasi, Ekonomi Kreatif, UMKM dan Koperasi">
                    Industri dan Hilirisasi, Ekonomi Kreatif, UMKM dan Koperasi
                  </option>
                  <option value="Transformasi Digital & Tata Kelola Pelayanan Publik">
                    Transformasi Digital & Tata Kelola Pelayanan Publik
                  </option>
                  <option value="Pendidikan Bermutu & Penguatan SDM Daerah">
                    Pendidikan Bermutu & Penguatan SDM Daerah
                  </option>
                  <option value="Infrastruktur Dasar, Konektivitas & Mitigasi Bencana">
                    Infrastruktur Dasar, Konektivitas & Mitigasi Bencana
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Isu Krusial & Tantangan Utama: *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Jelaskan tantangan utama di lapangan..."
                  value={newProp.isuKrusial}
                  onChange={(e) => setNewProp({ ...newProp, isuKrusial: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Bentuk Rekomendasi / Output Riset yang Diharapkan:
                </label>
                <input
                  type="text"
                  value={newProp.outputRisetDiharapkan}
                  onChange={(e) => setNewProp({ ...newProp, outputRisetDiharapkan: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tingkat Urgensi Riset:
                </label>
                <select
                  value={newProp.urgensi}
                  onChange={(e) => setNewProp({ ...newProp, urgensi: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value="Mendesak (Untuk perencanaan tahun anggaran berikutnya)">
                    Mendesak (Untuk perencanaan tahun anggaran berikutnya)
                  </option>
                  <option value="Jangka Menengah">Jangka Menengah</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  Simpan Usulan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
