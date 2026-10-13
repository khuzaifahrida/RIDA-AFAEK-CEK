import React, { useState, useEffect } from 'react';
import { ResearchProposal, FeedbackItem, PartnerIntervention, PriorityScoreWeights } from './types';
import { INITIAL_PROPOSALS, INITIAL_PARTNER_INTERVENTIONS, DEFAULT_WEIGHTS, parseCSVToProposals, calculateProposalScore } from './data/initialProposals';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WorkflowSection } from './components/WorkflowSection';
import { DashboardPage } from './components/DashboardPage';
import { Footer } from './components/Footer';
import { FloatingFeedbackWidget } from './components/FloatingFeedbackWidget';
import { ProposalDetailModal } from './components/ProposalDetailModal';
import { AdminModal } from './components/AdminModal';
import { MapPin, Mail, Clock, Phone, Send, CheckCircle2, MessageSquareHeart } from 'lucide-react';

const STORAGE_KEY_PROPOSALS = 'rida_afaek_proposals_v2';
const STORAGE_KEY_PARTNERS = 'rida_afaek_partners_v2';
const STORAGE_KEY_FEEDBACKS = 'rida_afaek_feedbacks_v2';
const STORAGE_KEY_TOTAL_VISITORS = 'rida_afaek_visitors_total_v2';
const STORAGE_KEY_TODAY_VISITORS = 'rida_afaek_visitors_today_v2';
const STORAGE_KEY_WEIGHTS = 'rida_afaek_weights_v2';
const STORAGE_KEY_SHEET_URL = 'rida_afaek_sheet_sync_url_v2';

export default function App() {
  // Navigation Page state: 'beranda' | 'dasbor' | 'kontak'
  const [activePage, setActivePage] = useState<'beranda' | 'dasbor' | 'kontak'>('beranda');

  // Priority Score Weights
  const [weights, setWeights] = useState<PriorityScoreWeights>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_WEIGHTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      // ignore
    }
    return DEFAULT_WEIGHTS;
  });

  // Proposals data
  const [proposals, setProposals] = useState<ResearchProposal[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROPOSALS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load stored proposals', e);
    }
    return INITIAL_PROPOSALS;
  });

  // Partner Interventions (Screenshot 2026-10-13 102200.png)
  const [partnerInterventions, setPartnerInterventions] = useState<PartnerIntervention[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PARTNERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // ignore
    }
    return INITIAL_PARTNER_INTERVENTIONS;
  });

  // Feedbacks data (from Floating Widget)
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FEEDBACKS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      // ignore
    }
    return [
      {
        id: 'fb-initial-1',
        timestamp: '12/10/2026 14:20:00',
        rating: 5,
        instansi: 'Bapperida Provinsi NTT',
        improvements: ['Kelengkapan Data', 'Fitur'],
        comment: 'Sangat membantu dalam memetakan kebutuhan riset dan IKU yang terdampak.',
      },
    ];
  });

  // Visitors Stats: Hari Ini & Total
  const [todayVisitors, setTodayVisitors] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TODAY_VISITORS);
      if (stored) return parseInt(stored, 10);
    } catch (e) {}
    return 142;
  });

  const [totalVisitors, setTotalVisitors] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TOTAL_VISITORS);
      if (stored) return parseInt(stored, 10);
    } catch (e) {}
    return 1234;
  });

  // Admin state
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);

  // Detail Modal state
  const [selectedProposal, setSelectedProposal] = useState<ResearchProposal | null>(null);

  // Feedback Widget Modal state
  const [feedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false);

  // Sheet Sync URL
  const [sheetUrl, setSheetUrl] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_SHEET_URL) || '';
  });

  // Increment visitor on mount
  useEffect(() => {
    const nextToday = todayVisitors + 1;
    const nextTotal = totalVisitors + 1;
    setTodayVisitors(nextToday);
    setTotalVisitors(nextTotal);
    try {
      localStorage.setItem(STORAGE_KEY_TODAY_VISITORS, nextToday.toString());
      localStorage.setItem(STORAGE_KEY_TOTAL_VISITORS, nextTotal.toString());
    } catch (e) {}
  }, []);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROPOSALS, JSON.stringify(proposals));
    } catch (e) {}
  }, [proposals]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PARTNERS, JSON.stringify(partnerInterventions));
    } catch (e) {}
  }, [partnerInterventions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FEEDBACKS, JSON.stringify(feedbacks));
    } catch (e) {}
  }, [feedbacks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WEIGHTS, JSON.stringify(weights));
    } catch (e) {}
  }, [weights]);

  // Handlers
  const handleUpdateProposal = (updated: ResearchProposal) => {
    setProposals((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleAddProposal = (newProp: ResearchProposal) => {
    setProposals((prev) => [newProp, ...prev]);
  };

  const handleDeleteProposal = (id: string) => {
    setProposals((prev) => prev.filter((p) => p.id !== id));
  };

  const handleResetData = () => {
    setProposals(INITIAL_PROPOSALS);
    setPartnerInterventions(INITIAL_PARTNER_INTERVENTIONS);
    setWeights(DEFAULT_WEIGHTS);
    try {
      localStorage.setItem(STORAGE_KEY_PROPOSALS, JSON.stringify(INITIAL_PROPOSALS));
      localStorage.setItem(STORAGE_KEY_PARTNERS, JSON.stringify(INITIAL_PARTNER_INTERVENTIONS));
      localStorage.setItem(STORAGE_KEY_WEIGHTS, JSON.stringify(DEFAULT_WEIGHTS));
    } catch (e) {}
  };

  const handleAddPartnerIntervention = (newIntervention: PartnerIntervention) => {
    setPartnerInterventions((prev) => [newIntervention, ...prev]);
  };

  const handleUpdateInterventionStatus = (
    id: string,
    status: PartnerIntervention['statusVerifikasi']
  ) => {
    setPartnerInterventions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, statusVerifikasi: status } : item))
    );
  };

  const handleFeedbackSubmit = (newFb: FeedbackItem) => {
    setFeedbacks((prev) => [newFb, ...prev]);
  };

  const handleUpdateGoogleSheetUrl = (url: string) => {
    setSheetUrl(url);
    try {
      localStorage.setItem(STORAGE_KEY_SHEET_URL, url);
    } catch (e) {}
  };

  // Metrics
  const totalUsulan = proposals.length;
  const uniqueOPDs = new Set(proposals.map((p) => p.perangkatDaerah)).size;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-emerald-500 selection:text-white font-sans">
      {/* 1. Header Navbar: Beranda, Dasbor, Kontak, dan Ajukan Usulan RATA KANAN SEMUA */}
      <Navbar
        activePage={activePage}
        onChangePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area based on Active Page */}
      <main className="flex-1">
        {/* ========================================================= */}
        {/* HALAMAN 1: BERANDA SAJA (Landing Page Bersih)             */}
        {/* ========================================================= */}
        {activePage === 'beranda' && (
          <div>
            {/* Hero Section dengan Latar Belakang Putih Clean & Logo yang Diupload */}
            <HeroSection
              totalUsulan={totalUsulan}
              totalOPD={uniqueOPDs}
              onExploreDashboard={() => {
                setActivePage('dasbor');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Tentang Platform (Informasi Singkat 3 Kolom) */}
            <AboutSection />

            {/* Alur Penjaringan 4 Tahapan */}
            <WorkflowSection />
          </div>
        )}

        {/* ========================================================= */}
        {/* HALAMAN 2: DASBOR (Halaman Terpisah Lengkap)              */}
        {/* ========================================================= */}
        {activePage === 'dasbor' && (
          <DashboardPage
            proposals={proposals}
            onSelectProposal={(p) => setSelectedProposal(p)}
            onUpdateProposal={handleUpdateProposal}
            onAddProposal={handleAddProposal}
            partnerInterventions={partnerInterventions}
            onAddPartnerIntervention={handleAddPartnerIntervention}
            onUpdateInterventionStatus={handleUpdateInterventionStatus}
            isAdmin={isAdmin}
            onOpenAdminLogin={() => setAdminModalOpen(true)}
            weights={weights}
            onUpdateWeights={(w) => setWeights(w)}
          />
        )}

        {/* ========================================================= */}
        {/* HALAMAN 3: KONTAK (Halaman Terpisah Kontak & Pelayanan)   */}
        {/* ========================================================= */}
        {activePage === 'kontak' && (
          <div className="bg-white min-h-[70vh] py-14">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                  Hubungi Kami
                </span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Pusat Bantuan &amp; Konfirmasi Teknis RIDA-AFAEK
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Layanan koordinasi resmi penjaringan isu strategis, fasilitasi naskah kebijakan, dan kemitraan riset daerah Provinsi NTT.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900">Alamat Kantor</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Jalan Polisi Militer Nomor 2, Oebobo, Kecamatan Oebobo, Kota Kupang, Nusa Tenggara Timur
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900">Surel Resmi</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <a href="mailto:bridabapperidanttprov@gmail.com" className="text-emerald-700 font-semibold hover:underline">
                      bridabapperidanttprov@gmail.com
                    </a>
                  </p>
                  <span className="text-[11px] text-slate-500 block">
                    Respon koordinasi teknis dalam 1x24 jam kerja.
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900">Jam Operasional</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Senin &ndash; Kamis: 07.30 &ndash; 16.00 WITA<br />
                    Jumat: 07.30 &ndash; 16.30 WITA
                  </p>
                  <span className="text-[11px] text-slate-500 block">
                    Sabtu, Minggu &amp; Libur Nasional Tutup
                  </span>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-bold text-emerald-950">
                    Bantu Kami Menyempurnakan Platform
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1 max-w-xl">
                    Kritik, saran, dan penilaian kepuasan Anda sangat penting bagi perbaikan berkelanjutan sistem SIRD RIDA-AFAEK.
                  </p>
                </div>
                <button
                  onClick={() => setFeedbackModalOpen(true)}
                  className="px-6 py-3 font-bold text-xs text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
                >
                  Buka Formulir Evaluasi
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer: Latar Belakang Putih Clean, Tanpa Logo Rida di Bagian Bawah, Statistik Kunjungan Hari Ini & Total */}
      <Footer
        onOpenAdminLogin={() => setAdminModalOpen(true)}
        onOpenFeedback={() => setFeedbackModalOpen(true)}
        todayVisitorCount={todayVisitors}
        totalVisitorCount={totalVisitors}
      />

      {/* Floating Feedback Widget (Pojok Kanan Bawah) dengan Bintang Hijau */}
      <FloatingFeedbackWidget
        onSubmitFeedback={handleFeedbackSubmit}
        isOpenExternal={feedbackModalOpen}
        onCloseExternal={() => setFeedbackModalOpen(false)}
      />

      {/* Modal 1: Proposal Detail Dossier */}
      <ProposalDetailModal
        proposal={selectedProposal}
        onClose={() => setSelectedProposal(null)}
      />

      {/* Modal 2: Admin Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        proposals={proposals}
        feedbacks={feedbacks}
        partnerInterventions={partnerInterventions}
        onDeleteProposal={handleDeleteProposal}
        onUpdateGoogleSheetUrl={handleUpdateGoogleSheetUrl}
        currentGoogleSheetUrl={sheetUrl}
        onResetData={handleResetData}
        isAdmin={isAdmin}
        onSetIsAdmin={(status) => setIsAdmin(status)}
        weights={weights}
        onUpdateWeights={(w) => setWeights(w)}
      />
    </div>
  );
}
