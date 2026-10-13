import React from 'react';
import { RidaLogo } from './RidaLogo';
import { ExternalLink, BarChart3, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  totalUsulan: number;
  totalOPD: number;
  onExploreDashboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalUsulan,
  totalOPD,
  onExploreDashboard,
}) => {
  const googleFormUrl = 'https://forms.gle/ymNeFCLEDnQfhkKCA';

  return (
    <section id="beranda" className="relative overflow-hidden bg-white text-slate-900 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200">
      {/* Background Subtle Geometric Pattern - Clean Light White */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="clean-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F1F5F9" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#clean-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Center / Hero Card Container */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Bapperida Pemerintah Provinsi Nusa Tenggara Timur</span>
            <span className="text-slate-300">·</span>
            <span className="text-emerald-700">Tahun Anggaran 2026</span>
          </div>

          {/* Logo RIDA-AFAEK - Logo yang Diupload dengan Tampilan Bersih */}
          <div className="flex justify-center pt-2">
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm inline-block">
              <RidaLogo variant="full" showTagline={true} />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight pt-2" style={{ textWrap: 'balance' }}>
            PENGHIMPUNAN ISU STRATEGIS DAN KEBUTUHAN RISET PERANGKAT DAERAH NTT
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto" style={{ textWrap: 'balance' }}>
            Mari berkolaborasi menyusun solusi terbaik untuk pembangunan NTT yang lebih maju dan berkelanjutan melalui kebijakan berbasis bukti (<em className="text-emerald-700 not-italic font-semibold">evidence-based policy</em>).
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA button */}
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-hidden focus:ring-4 focus:ring-emerald-500/20"
            >
              <span>Mulai Isi Instrumen</span>
              <ExternalLink className="w-5 h-5 text-emerald-100" />
            </a>

            {/* Secondary CTA button */}
            <button
              onClick={onExploreDashboard}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 border border-slate-300 rounded-xl transition-all shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-slate-300"
            >
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <span>Dasbor</span>
            </button>
          </div>

          {/* Live Dynamic Stats Ribbon on Clean White Cards */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Total Usulan Masuk
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tabular-nums flex items-baseline gap-1">
                <span>{totalUsulan}</span>
                <span className="text-xs font-normal text-emerald-700 font-sans">Kajian</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                OPD Berpartisipasi
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tabular-nums flex items-baseline gap-1">
                <span>{totalOPD}</span>
                <span className="text-xs font-normal text-teal-700 font-sans">Instansi</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Skema Sinergi
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tabular-nums flex items-baseline gap-1">
                <span>3</span>
                <span className="text-xs font-normal text-amber-700 font-sans">Model Kerjasama</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Mitra Perguruan Tinggi
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tabular-nums flex items-baseline gap-1">
                <span>Terbuka</span>
                <span className="text-xs font-normal text-emerald-700 font-sans">Kolaborasi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
