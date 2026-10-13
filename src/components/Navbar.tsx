import React, { useState } from 'react';
import { RidaLogo } from './RidaLogo';
import { ExternalLink, Menu, X, Home, BarChart3, PhoneCall, ChevronRight } from 'lucide-react';

interface NavbarProps {
  activePage: 'beranda' | 'dasbor' | 'kontak';
  onChangePage: (page: 'beranda' | 'dasbor' | 'kontak') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onChangePage,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const googleFormUrl = 'https://forms.gle/ymNeFCLEDnQfhkKCA';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Sisi Kiri: Logo RIDA-AFAEK BAPPERIDA PROVINSI NTT Persis Seperti Gambar */}
          <button
            onClick={() => {
              onChangePage('beranda');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center text-left cursor-pointer group focus:outline-hidden"
            title="Kembali ke Beranda"
          >
            <RidaLogo variant="navbar" />
          </button>

          {/* Sisi Kanan: [Ajukan Usulan] + Tombol Menu Hamburger persis seperti gambar */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Navigasi Desktop Cepat (Opsional & Halus) */}
            <div className="hidden lg:flex items-center gap-6 mr-2">
              <button
                onClick={() => onChangePage('beranda')}
                className={`text-sm font-semibold transition-colors py-1.5 cursor-pointer ${
                  activePage === 'beranda'
                    ? 'text-emerald-800 border-b-2 border-emerald-700 font-bold'
                    : 'text-black hover:text-emerald-800'
                }`}
              >
                Beranda
              </button>
              <button
                onClick={() => onChangePage('dasbor')}
                className={`text-sm font-semibold transition-colors py-1.5 cursor-pointer ${
                  activePage === 'dasbor'
                    ? 'text-emerald-800 border-b-2 border-emerald-700 font-bold'
                    : 'text-black hover:text-emerald-800'
                }`}
              >
                Dasbor
              </button>
              <button
                onClick={() => onChangePage('kontak')}
                className={`text-sm font-semibold transition-colors py-1.5 cursor-pointer ${
                  activePage === 'kontak'
                    ? 'text-emerald-800 border-b-2 border-emerald-700 font-bold'
                    : 'text-black hover:text-emerald-800'
                }`}
              >
                Kontak
              </button>
            </div>

            {/* Tombol Utama: Ajukan Usulan (Warna Hijau Tua Sesuai Gambar #1b4d3e) */}
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-[#1b4d3e] hover:bg-[#143b2f] active:bg-[#0f2e24] rounded-lg sm:rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Ajukan Usulan</span>
            </a>

            {/* Hamburger Menu Icon (Tiga Garis Horizontal Sesuai Gambar) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-black hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden cursor-pointer"
              aria-label="Buka menu navigasi"
              title="Menu Navigasi"
            >
              {menuOpen ? (
                <X className="w-6 h-6 stroke-[2.5]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu Drawer Saat Hamburger Diklik */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 sm:px-6 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => {
                onChangePage('beranda');
                setMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activePage === 'beranda'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'text-black hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4 text-emerald-700" />
                <span>Beranda</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => {
                onChangePage('dasbor');
                setMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activePage === 'dasbor'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'text-black hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4 text-teal-700" />
                <span>Dasbor Isu Strategis</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => {
                onChangePage('kontak');
                setMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activePage === 'kontak'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'text-black hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-amber-700" />
                <span>Kontak &amp; Pelayanan</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-black font-semibold">
              Bapperida Pemerintah Provinsi Nusa Tenggara Timur
            </span>
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-emerald-800 hover:underline"
            >
              <span>Formulir Usulan Riset</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
