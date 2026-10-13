import React from 'react';
import { ResearchProposal } from '../types';
import { X, Calendar, Building, User, AlertCircle, FileCheck, DollarSign, Handshake, Shield, FileText, CheckCircle, Share2, Printer } from 'lucide-react';

interface ProposalDetailModalProps {
  proposal: ResearchProposal | null;
  onClose: () => void;
}

export const ProposalDetailModal: React.FC<ProposalDetailModalProps> = ({
  proposal,
  onClose,
}) => {
  if (!proposal) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between gap-4 border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-400 font-semibold mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800/80 text-emerald-300">
                {proposal.kelompokMasalah}
              </span>
              <span>·</span>
              <span className="text-slate-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {proposal.timestamp}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {proposal.isuKrusial.length > 120
                ? `${proposal.isuKrusial.slice(0, 120)}...`
                : proposal.isuKrusial}
            </h3>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{proposal.perangkatDaerah} &mdash; <strong className="text-white font-medium">{proposal.unitKerja}</strong></span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              title="Cetak Berkas Usulan"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Tutup modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm">
          {/* Key Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Tingkat Urgensi
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-amber-800 text-sm">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                {proposal.urgensi}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Kesiapan Anggaran
              </span>
              <span className="text-xs font-medium text-slate-800 line-clamp-2">
                {proposal.ketersediaanAnggaran}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Penanggung Jawab
              </span>
              <span className="font-semibold text-slate-900 text-xs block truncate">
                {proposal.penanggungJawab}
              </span>
            </div>
          </div>

          {/* 1. Isu Krusial & Akar Masalah */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-emerald-600" />
              1. Deskripsi Isu Krusial & Tantangan Utama
            </h4>
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 text-slate-800 leading-relaxed whitespace-pre-line font-normal">
              {proposal.isuKrusial}
            </div>
          </div>

          {/* 2. Mengapa Belum Selesai */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-amber-600" />
              2. Mengapa Belum Dapat Diselesaikan Kebijakan Saat Ini?
            </h4>
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 text-slate-700 leading-relaxed whitespace-pre-line">
              {proposal.alasanBelumSelesai || 'Belum diisi'}
            </div>
          </div>

          {/* 3. IKU & Program Prioritas Terdampak */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-teal-600" />
              3. Indikator Kinerja Utama (IKU/Renstra) Terdampak Langsung
            </h4>
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 text-slate-700 leading-relaxed whitespace-pre-line">
              {proposal.ikuTerdampak || 'Belum diisi'}
            </div>
          </div>

          {/* 4. Rekomendasi / Keluaran Riset yang Diharapkan */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              4. Bentuk Rekomendasi / Output Riset yang Diharapkan
            </h4>
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 text-emerald-950 font-medium leading-relaxed">
              {proposal.outputRisetDiharapkan}
            </div>
          </div>

          {/* 5. Riwayat Riset Terdahulu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Pernah Dilakukan Riset/Intervensi Sebelumnya?
              </span>
              <p className="font-semibold text-slate-900 text-xs">
                {proposal.pernahRisetSebelumnya || 'Belum pernah'}
              </p>
              {proposal.keteranganRisetSebelumnya && (
                <p className="text-xs text-slate-600 pt-2 border-t border-slate-200/80 mt-2">
                  {proposal.keteranganRisetSebelumnya}
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Bentuk Potensi Kolaborasi dengan RIDA Bapperida
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {proposal.bentukKolaborasi || 'Sharing Data dan Fasilitasi'}
              </p>
            </div>
          </div>

          {/* 6. Pelibatan Universitas & Mitra */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Pelibatan Perguruan Tinggi / Mitra Riset
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Status Pelibatan:</span>
                <span className="font-semibold text-slate-900">{proposal.pelibatanMitra}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Peran Spesifik yang Dibutuhkan:</span>
                <span className="font-semibold text-slate-900">{proposal.peranSpesifikMitra || '-'}</span>
              </div>
              {proposal.rekomendasiMitra && (
                <div className="sm:col-span-2 pt-2 border-t border-slate-200">
                  <span className="text-slate-500 block">Mitra yang Direkomendasikan:</span>
                  <span className="font-bold text-emerald-800">{proposal.rekomendasiMitra}</span>
                </div>
              )}
            </div>
          </div>

          {/* 7. Kesiapan Data & Dokumen Dukung */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Data & Dokumen Pendukung
            </span>
            <div className="text-xs space-y-1">
              <p className="text-slate-800">
                <strong className="text-slate-600">Dokumen Dimiliki:</strong> {proposal.dokumenPendukung}
              </p>
              <p className="text-slate-800">
                <strong className="text-slate-600">Kesiapan Berbagi Data (Sharing Data):</strong>{' '}
                <span className="text-emerald-700 font-semibold">{proposal.kesiapanSharingData}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            ID Usulan: <span className="font-mono text-slate-700">{proposal.id}</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-xs transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
