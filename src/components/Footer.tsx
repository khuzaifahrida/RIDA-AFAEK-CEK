import React from 'react';
import { Mail, MapPin, Clock, Eye, Lock, MessageSquareHeart } from 'lucide-react';

interface FooterProps {
  onOpenAdminLogin: () => void;
  onOpenFeedback: () => void;
  todayVisitorCount?: number;
  totalVisitorCount?: number;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdminLogin,
  onOpenFeedback,
  todayVisitorCount = 142,
  totalVisitorCount = 1234,
}) => {
  // Format visitor count with padded zeros e.g. "001.234"
  const formatVisitor = (count: number) => {
    const padded = count.toString().padStart(6, '0');
    return `${padded.slice(0, 3)}.${padded.slice(3)}`;
  };

  return (
    <footer id="kontak" className="bg-white text-slate-600 border-t border-slate-200 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {/* Col 1: Alamat Kantor & Lokasi (Logo RIDA & deskripsi dihapus sesuai instruksi) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Kantor Bapperida NTT
            </h4>
            <div className="flex items-start gap-2.5 text-slate-700 leading-relaxed">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Jalan Polisi Militer Nomor 2, Oebobo, Kecamatan Oebobo, Kota Kupang, Nusa Tenggara Timur
              </span>
            </div>
            <div className="pt-1 flex items-center gap-2 text-slate-700">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <a
                href="mailto:bridabapperidanttprov@gmail.com"
                className="hover:text-emerald-700 transition-colors font-medium underline-offset-4 hover:underline"
              >
                bridabapperidanttprov@gmail.com
              </a>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenFeedback}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold transition-colors cursor-pointer"
              >
                <MessageSquareHeart className="w-4 h-4 text-emerald-700" />
                <span>Isi Evaluasi & Umpan Balik</span>
              </button>
            </div>
          </div>

          {/* Col 2: Jam Pelayanan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              Jam Pelayanan
            </h4>
            <div className="space-y-2 text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-semibold text-slate-900">Senin &ndash; Kamis</div>
                <div className="text-emerald-800 font-mono text-xs font-bold mt-0.5">07.30 &ndash; 16.00 WITA</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-semibold text-slate-900">Jumat</div>
                <div className="text-emerald-800 font-mono text-xs font-bold mt-0.5">07.30 &ndash; 16.30 WITA</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Sabtu, Minggu & Hari Libur Nasional: Tutup Pelayanan Kantor
            </p>
          </div>

          {/* Col 3: Statistik Pengunjung Hari Ini & Total Pengunjung */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-teal-600" />
              Statistik Kunjungan
            </h4>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              {/* Hari Ini */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
                <span className="text-slate-600 font-medium">Kunjungan Hari Ini:</span>
                <span className="text-base font-extrabold text-emerald-700 font-mono tabular-nums">
                  {todayVisitorCount.toLocaleString('id-ID')} <span className="text-[10px] font-normal text-slate-500 font-sans">Sesi</span>
                </span>
              </div>

              {/* Total Pengunjung */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                  Total Pengunjung Portal
                </span>
                <div className="text-2xl font-black text-slate-900 font-mono tabular-nums tracking-widest">
                  [ {formatVisitor(totalVisitorCount)} ]
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Tercatat otomatis secara real-time
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean White, Hak Cipta & Tombol Login Admin Pojok Kanan Bawah */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            &copy; 2026 Bidang Riset dan Inovasi Daerah (RIDA) Bapperida Provinsi Nusa Tenggara Timur. Hak Cipta Dilindungi.
          </p>

          {/* Tombol Login Admin Pada Bagian Pojok Kanan Bawah */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdminLogin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer"
              title="Akses Administrator Portal"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Login Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
