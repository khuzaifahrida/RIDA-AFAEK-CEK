import React, { useState } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';

interface NavbarProps {
  activePage: 'beranda' | 'dasbor' | 'kontak';
  onChangePage: (page: 'beranda' | 'dasbor' | 'kontak') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onChangePage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const googleFormUrl = 'https://forms.gle/ymNeFCLEDnQfhkKCA';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Sisi Kiri: Judul Bersih Tanpa Logo Sesuai Permintaan */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => onChangePage('beranda')}
              className="text-base font-extrabold text-slate-900 tracking-tight hover:text-emerald-700 transition-colors text-left"
            >
              RIDA-AFAEK <span className="text-xs font-semibold text-emerald-700 block sm:inline sm:ml-1">NTT</span>
            </button>
          </div>

          {/* Sisi Kanan: Beranda, Dasbor, Kontak, dan Ajukan Usulan RATA KANAN SEMUA */}
          <div className="hidden md:flex items-center justify-end gap-7 ml-auto">
            <button
              onClick={() => onChangePage('beranda')}
              className={`text-sm font-semibold transition-colors py-1.5 whitespace-nowrap cursor-pointer ${
                activePage === 'beranda'
                  ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold'
                  : 'text-slate-700 hover:text-emerald-700'
              }`}
            >
              Beranda
            </button>

            <button
              onClick={() => onChangePage('dasbor')}
              className={`text-sm font-semibold transition-colors py-1.5 whitespace-nowrap cursor-pointer ${
                activePage === 'dasbor'
                  ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold'
                  : 'text-slate-700 hover:text-emerald-700'
              }`}
            >
              Dasbor
            </button>

            <button
              onClick={() => onChangePage('kontak')}
              className={`text-sm font-semibold transition-colors py-1.5 whitespace-nowrap cursor-pointer ${
                activePage === 'kontak'
                  ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold'
                  : 'text-slate-700 hover:text-emerald-700'
              }`}
            >
              Kontak
            </button>

            {/* Tombol Utama Ajukan Usulan di Ujung Pojok Kanan */}
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <span>AJUKAN USULAN RISET</span>
              <ExternalLink className="w-4 h-4 text-emerald-100" />
            </a>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
            >
              Ajukan Usulan
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <button
            onClick={() => {
              onChangePage('beranda');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left block px-3 py-2 text-base font-semibold rounded-lg ${
              activePage === 'beranda' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => {
              onChangePage('dasbor');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left block px-3 py-2 text-base font-semibold rounded-lg ${
              activePage === 'dasbor' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            Dasbor Isu Strategis
          </button>
          <button
            onClick={() => {
              onChangePage('kontak');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left block px-3 py-2 text-base font-semibold rounded-lg ${
              activePage === 'kontak' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            Kontak & Pelayanan
          </button>
          <div className="pt-2 border-t border-slate-100">
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center block px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl shadow-md"
            >
              AJUKAN USULAN RISET
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
