import React from 'react';
import { FileText, Layers, GitFork, UploadCloud, ArrowRight, ExternalLink, Check } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const googleFormUrl = 'https://forms.gle/ymNeFCLEDnQfhkKCA';

  const steps = [
    {
      number: '1',
      title: 'Identifikasi OPD & Masalah',
      desc: 'Perangkat Daerah mengidentifikasi isu krusial, indikator kinerja utama (IKU) yang terdampak, serta memilih kelompok masalah spesifik (Pendidikan, Kesehatan & GEDSI, Ekonomi Biru & Hijau, Hilirisasi, dll).',
      badge: 'Langkah Pertama',
      icon: Layers,
      color: 'emerald',
      output: 'Rumusan Masalah & IKU Terdampak'
    },
    {
      number: '2',
      title: 'Tentukan Kebutuhan Output',
      desc: 'Tentukan bentuk rekomendasi atau keluaran riset yang paling diharapkan: Naskah Akademik Kebijakan, Evaluasi Dampak (Impact Evaluation), Pemetaan Potensi, atau Dokumen Pre-Feasibility Study.',
      badge: 'Langkah Kedua',
      icon: FileText,
      color: 'teal',
      output: 'Pilihan Dokumen Rekomendasi'
    },
    {
      number: '3',
      title: 'Pilih Skema Kolaborasi',
      desc: 'Pilih bentuk kerjasama riset bersama Bidang RIDA Bapperida: Full Dana RIDA, Sharing Pendanaan dengan DPA OPD, Sharing Data & SDM teknis, serta opsi pelibatan Perguruan Tinggi atau Mitra.',
      badge: 'Langkah Ketiga',
      icon: GitFork,
      color: 'cyan',
      output: 'Komitmen Skema Pendanaan & Tim'
    },
    {
      number: '4',
      title: 'Unggah Data Dukung',
      desc: 'Sertakan data dukung yang dimiliki seperti laporan kinerja, data statistik sektorial, atau hasil monitoring awal, serta konfirmasi kesiapan sharing data bagi tim peneliti.',
      badge: 'Langkah Keempat',
      icon: UploadCloud,
      color: 'amber',
      output: 'Validasi Data & Verifikasi RIDA'
    }
  ];

  return (
    <section id="alur" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            Alur Penjaringan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight" style={{ textWrap: 'balance' }}>
            Bagaimana Cara Kerjanya?
          </h2>
          <p className="text-sm sm:text-base text-black leading-relaxed" style={{ textWrap: 'balance' }}>
            Empat tahapan sederhana dalam instrumen penjaringan usulan riset untuk memfasilitasi kebutuhan kebijakan strategis daerah.
          </p>
        </div>

        {/* Step Flow Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-2xl p-6 transition-all hover:shadow-md flex flex-col group"
              >
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shrink-0">
                    0{step.number}
                  </div>
                  <div className="text-black group-hover:text-emerald-600 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-black mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-black leading-relaxed mb-6 font-normal">
                  {step.desc}
                </p>

                {/* Sub info */}
                <div className="mt-auto pt-3 border-t border-slate-200/80 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{step.output}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout action to start immediately */}
        <div className="mt-14 max-w-2xl mx-auto p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
          <h4 className="text-lg font-bold text-emerald-950">
            Siap Mengisi Instrumen Penjaringan?
          </h4>
          <p className="text-sm text-emerald-800">
            Pengisian instrumen membutuhkan waktu estimasi 5–10 menit dan langsung terekam ke sistem database riset Bapperida Provinsi NTT.
          </p>
          <div className="pt-2">
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <span>Isi Instrumen Google Form Sekarang</span>
              <ExternalLink className="w-4 h-4 text-emerald-100" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
