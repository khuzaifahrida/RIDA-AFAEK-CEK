import React from 'react';
import { RidaLogo } from './RidaLogo';
import { ExternalLink, BarChart3 } from 'lucide-react';

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
    <section id="beranda" className="relative overflow-hidden bg-white text-black pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-200">
      {/* Background: Geometric Facet Wireframe Lines persis seperti pada latar belakang gambar */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <g stroke="#94A3B8" strokeWidth="0.8" fill="none">
            {/* Left background polygon facets */}
            <path d="M -50 40 L 120 160 L 80 340 L -80 280 Z" />
            <path d="M 120 160 L 220 80 L 190 280 L 80 340 Z" />
            <path d="M 120 160 L 80 -40 L 220 80 Z" />
            <path d="M 220 80 L 340 180 L 190 280 Z" />

            {/* Right background polygon facets */}
            <path d="M 850 60 L 1020 180 L 980 360 L 820 300 Z" />
            <path d="M 1020 180 L 1150 100 L 1110 320 L 980 360 Z" />
            <path d="M 720 120 L 850 60 L 820 300 Z" />
            <path d="M 1020 180 L 1060 -20 L 1150 100 Z" />
          </g>
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* CATATAN: Tulisan Bapperida hingga Tahun Anggaran 2026 telah DIHAPUS sesuai permintaan pengguna */}

          {/* Center Card: Kotak Putih RIDA-AFAEK dengan Logo & Penjelasan (Persis Seperti Gambar) */}
          <div className="inline-block w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/40 px-5 py-5 sm:px-8 sm:py-7">
              <RidaLogo variant="hero-card" />
            </div>
          </div>

          {/* Main Title: PENGHIMPUNAN ISU STRATEGIS DAN KEBUTUHAN RISET PERANGKAT DAERAH NTT (RIDA-AFAEK) */}
          <div className="space-y-3 pt-1">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#0f2847] leading-tight max-w-3xl mx-auto uppercase"
              style={{ textWrap: 'balance' }}
            >
              PENGHIMPUNAN ISU STRATEGIS<br />
              DAN KEBUTUHAN RISET PERANGKAT<br />
              DAERAH NTT (RIDA-AFAEK)
            </h1>

            {/* Deskripsi & Keterangan Tambahan */}
            <p
              className="text-xs sm:text-sm text-black font-medium leading-relaxed max-w-xl mx-auto pt-1"
              style={{ textWrap: 'balance' }}
            >
              Mari berkolaborasi menyusun solusi terbaik untuk pembangunan NTT yang lebih maju dan berkelanjutan melalui kebijakan berbasis bukti (<em className="text-emerald-800 not-italic font-bold">evidence-based policy</em>).
            </p>
          </div>

          {/* Tombol CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#1b4d3e] hover:bg-[#143b2f] active:bg-[#0f2e24] rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-hidden"
            >
              <span>Mulai Isi Instrumen</span>
              <ExternalLink className="w-4 h-4 text-emerald-200" />
            </a>

            <button
              onClick={onExploreDashboard}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold text-black bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl transition-all shadow-2xs focus:outline-hidden cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-[#1b4d3e]" />
              <span>Dasbor</span>
            </button>
          </div>

          {/* Dynamic Live Stats Cards */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200">
              <span className="text-[10px] font-bold text-black uppercase tracking-wider block">
                Total Usulan Masuk
              </span>
              <div className="text-xl sm:text-2xl font-black text-black mt-0.5 tabular-nums flex items-baseline gap-1">
                <span>{totalUsulan}</span>
                <span className="text-[11px] font-bold text-emerald-800 font-sans">Kajian</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200">
              <span className="text-[10px] font-bold text-black uppercase tracking-wider block">
                OPD Berpartisipasi
              </span>
              <div className="text-xl sm:text-2xl font-black text-black mt-0.5 tabular-nums flex items-baseline gap-1">
                <span>{totalOPD}</span>
                <span className="text-[11px] font-bold text-teal-800 font-sans">Instansi</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200">
              <span className="text-[10px] font-bold text-black uppercase tracking-wider block">
                Skema Sinergi
              </span>
              <div className="text-xl sm:text-2xl font-black text-black mt-0.5 tabular-nums flex items-baseline gap-1">
                <span>3</span>
                <span className="text-[11px] font-bold text-amber-800 font-sans">Model Kerjasama</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200">
              <span className="text-[10px] font-bold text-black uppercase tracking-wider block">
                Mitra Riset Daerah
              </span>
              <div className="text-xl sm:text-2xl font-black text-black mt-0.5 tabular-nums flex items-baseline gap-1">
                <span>Terbuka</span>
                <span className="text-[11px] font-bold text-emerald-800 font-sans">Kolaborasi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
