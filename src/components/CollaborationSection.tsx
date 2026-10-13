import React from 'react';
import { Coins, Handshake, Building, UserCheck, Database, Lightbulb, ExternalLink } from 'lucide-react';

export const CollaborationSection: React.FC = () => {
  const googleFormUrl = 'https://forms.gle/ymNeFCLEDnQfhkKCA';

  return (
    <section id="kemitraan" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            Kemitraan & Kolaborasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Skema Kolaborasi Riset Daerah
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed" style={{ textWrap: 'balance' }}>
            Tersedia berbagai skema pendanaan dan kemitraan strategis untuk memastikan setiap kajian dapat dieksekusi secara optimal, akuntabel, dan berdaya guna bagi kebijakan publik NTT.
          </p>
        </div>

        {/* 3 Core Funding & Partnership Schemes */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Scheme 1 */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col group">
            <div className="w-14 h-14 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mb-6 group-hover:scale-105 transition-transform">
              <Coins className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Full Dana RIDA / Pendanaan Penuh
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Pembiayaan riset bersumber penuh dari alokasi anggaran khusus riset daerah pada DPA Bidang RIDA Bapperida NTT, atau pendanaan mandiri penuh dari perangkat daerah pengusul.
            </p>
            <div className="mt-auto pt-4 border-t border-slate-200/80 text-xs text-slate-500 space-y-2">
              <div className="font-semibold text-slate-700">Karakteristik Skema:</div>
              <ul className="space-y-1 list-disc list-inside text-slate-600">
                <li>Untuk isu prioritas makro lintas sektor Pemprov</li>
                <li>Fasilitasi naskah kebijakan terpusat di Bapperida</li>
                <li>Dikelola langsung oleh tim peneliti terpilih</li>
              </ul>
            </div>
          </div>

          {/* Scheme 2 */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-teal-300 transition-all flex flex-col group">
            <div className="w-14 h-14 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mb-6 group-hover:scale-105 transition-transform">
              <Handshake className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Sharing Dana & Sharing SDM
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Pembiayaan dan pelaksanaan dilakukan secara bersama (cost & resource sharing) antara anggaran DPA OPD pengusul dengan Bidang RIDA, termasuk pelibatan jabatan fungsional perencana/peneliti.
            </p>
            <div className="mt-auto pt-4 border-t border-slate-200/80 text-xs text-slate-500 space-y-2">
              <div className="font-semibold text-slate-700">Karakteristik Skema:</div>
              <ul className="space-y-1 list-disc list-inside text-slate-600">
                <li>Efisiensi anggaran APBD tahun berjalan</li>
                <li>Penguatan kapasitas fungsional teknis di OPD</li>
                <li>Pendampingan metodologi oleh Tim Ahli RIDA</li>
              </ul>
            </div>
          </div>

          {/* Scheme 3 */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-amber-300 transition-all flex flex-col group">
            <div className="w-14 h-14 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mb-6 group-hover:scale-105 transition-transform">
              <Building className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Pelibatan Perguruan Tinggi & Mitra
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Sinergi akademis dan non-pemerintah dengan Universitas (seperti Undana, Unwira, dll) serta Lembaga Mitra (NGO, BRIN, swasta, dan komunitas pembangunan) untuk kajian independen.
            </p>
            <div className="mt-auto pt-4 border-t border-slate-200/80 text-xs text-slate-500 space-y-2">
              <div className="font-semibold text-slate-700">Karakteristik Skema:</div>
              <ul className="space-y-1 list-disc list-inside text-slate-600">
                <li>Tri Dharma Perguruan Tinggi & KKN Tematik</li>
                <li>Dukungan data primer dan pengujian lapangan</li>
                <li>Kerjasama riset multi-tahun berkelanjutan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Roles Open for Collaboration */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">
              Peluang Partisipasi Eksternal
            </span>
            <h3 className="text-2xl font-black">
              Terbuka Bagi Periset, Akademisi, dan Lembaga Mitra
            </h3>
            <p className="text-sm text-slate-300 mt-2">
              Platform RIDA-AFAEK membuka ruang kolaborasi bagi entitas riset untuk berkontribusi dalam tiga spektrum peran strategis:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-4">
              <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white mb-1">
                  Penyedia Tenaga Ahli
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pakar metodologi, statistik, sosiologi kebijakan, dan penyusun naskah akademik rekomendasi.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-4">
              <div className="p-3 rounded-lg bg-teal-500/20 text-teal-400 shrink-0">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white mb-1">
                  Penyedia Data Lapangan
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Jaringan surveyor, komunitas akar rumput, dan pemilik data mikro sektorial di pelosok NTT.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-4">
              <div className="p-3 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white mb-1">
                  Fasilitator Inovasi
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Perancang prototipe teknologi tepat guna, sistem digitalisasi, serta pendamping replikasi program.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Ingin mendaftarkan lembaga Anda sebagai mitra periset resmi Bapperida NTT?
            </p>
            <a
              href="mailto:bridabapperidanttprov@gmail.com?subject=Permohonan%20Kemitraan%20Riset%20RIDA-AFAEK%20NTT"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors shrink-0"
            >
              <span>Ajukan Kemitraan via Email</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
