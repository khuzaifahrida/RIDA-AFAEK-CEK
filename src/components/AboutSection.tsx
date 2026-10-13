import React from 'react';
import { BarChart2, Users2, Target, CheckCircle2, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="tentang" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            Tentang Platform
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight" style={{ textWrap: 'balance' }}>
            Mengapa RIDA-AFAEK Hadir?
          </h2>
          <p className="text-sm sm:text-base text-black font-normal leading-relaxed" style={{ textWrap: 'balance' }}>
            Platform kolaboratif untuk menjembatani permasalahan krusial yang dihadapi di lapangan oleh setiap Perangkat Daerah (OPD) melalui pendekatan riset yang komprehensif, terstruktur, dan tepat sasaran.
          </p>
        </div>

        {/* 3 Pillars / Core Infographic Columns */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-2xs flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mb-5">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">
              Berbasis Bukti
            </h3>
            <p className="text-xs sm:text-sm text-black leading-relaxed mb-4 font-normal">
              Fokus pada data lapangan, indikator kinerja utama (IKU/Renstra), dan fakta empiris untuk melandasi setiap formulasi kebijakan daerah.
            </p>
            <div className="mt-auto pt-4 border-t border-slate-100 text-xs text-black space-y-1.5 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Analisis data sektoral &amp; indikator makro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sinkronisasi dokumen perencanaan tahunan</span>
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-2xs flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mb-5">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">
              Kolaboratif
            </h3>
            <p className="text-xs sm:text-sm text-black leading-relaxed mb-4 font-normal">
              Melibatkan sinergi lintas Perangkat Daerah (OPD), Bapperida NTT, Perguruan Tinggi (Universitas), serta Mitra Pembangunan strategis.
            </p>
            <div className="mt-auto pt-4 border-t border-slate-100 text-xs text-black space-y-1.5 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Sharing pembiayaan, SDM, dan data teknis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Pelibatan akademisi &amp; tim ahli riset</span>
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-2xs flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">
              Tepat Sasaran
            </h3>
            <p className="text-xs sm:text-sm text-black leading-relaxed mb-4 font-normal">
              Menyelesaikan akar masalah pelayanan publik dan target kinerja nyata dengan keluaran naskah akademik, rekomendasi, atau evaluasi dampak.
            </p>
            <div className="mt-auto pt-4 border-t border-slate-100 text-xs text-black space-y-1.5 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Peta jalan solusi siap eksekusi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Intervensi program berdaya ungkit tinggi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Mandate Brief */}
        <div className="mt-12 bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-left">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
              Komitmen Pemerintah Provinsi NTT
            </span>
            <h4 className="text-lg sm:text-xl font-bold">
              Kebijakan Berkualitas Lahir dari Riset dan Kolaborasi Nyata
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
              Melalui Bidang Riset dan Inovasi Daerah (RIDA) Bapperida NTT, seluruh instansi teknis memiliki wadah resmi untuk memetakan tantangan sektoral agar dikawal secara metodologis hingga melahirkan rekomendasi yang diakui dan terintegrasi dalam APBD.
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <a
              href="#alur"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-emerald-950 bg-emerald-300 hover:bg-emerald-200 rounded-xl transition-colors w-full md:w-auto"
            >
              <Compass className="w-4 h-4" />
              <span>Pelajari Alur Partisipasi</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
