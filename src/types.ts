export interface ScoringCriteria {
  urgensi: number; // Max weight default 30
  keterkaitanRPJMD: number; // Max weight default 30
  riwayatKajian: number; // Max weight default 15
  kesiapanData: number; // Max weight default 10
  kesiapanAnggaran: number; // Max weight default 15
}

export interface PriorityScoreWeights {
  urgensiWeight: number; // default 30
  rpjmdWeight: number; // default 30
  riwayatWeight: number; // default 15
  dataWeight: number; // default 10
  anggaranWeight: number; // default 15
}

export interface ResearchProposal {
  id: string;
  timestamp: string;
  tahun: string; // e.g. "2026", "2025"
  perangkatDaerah: string;
  unitKerja: string;
  penanggungJawab: string;
  isuKrusial: string;
  kelompokMasalah: string;
  ikuTerdampak: string;
  pernahRisetSebelumnya: string;
  keteranganRisetSebelumnya?: string;
  alasanBelumSelesai: string;
  outputRisetDiharapkan: string;
  urgensi: string;
  ketersediaanAnggaran: string;
  bentukKolaborasi: string;
  pelibatanMitra: string;
  peranSpesifikMitra: string;
  rekomendasiMitra?: string;
  dokumenPendukung: string;
  kesiapanSharingData: string;
  // Dynamic Score breakdown
  scoring?: ScoringCriteria;
  totalScore?: number;
  priorityTier?: 'Sangat Tinggi' | 'Tinggi' | 'Menengah' | 'Standar';
  // Visi Misi Linkage
  misiNTT?: 'MAJU' | 'SEHAT' | 'CERDAS' | 'SEJAHTERA' | 'BERKELANJUTAN';
  pilarNTT?: string;
  dasaCita?: string[];
}

export interface PartnerIntervention {
  id: string;
  timestamp: string;
  namaLembaga: string;
  jenisMitra: string;
  surelKontak: string;
  proposalId: string;
  namaMasalah: string;
  bentukKontribusi: string[]; // Riset/Kajian, Pendanaan, Data, SDM/Tenaga Ahli, Prasarana, Pendampingan
  rencanaDokumenKeluaran: string[]; // Kajian Akademik, Policy Brief, Evaluasi Dampak, Pemetaan/Analisis Data, Prototipe Inovasi, Laporan Akhir
  uraianRencana: string;
  tautanBuktiKerjasama?: string;
  statusVerifikasi: 'Menunggu Verifikasi Bapperida' | 'Terverifikasi' | 'Disetujui Kerja Sama';
}

export interface FeedbackItem {
  id: string;
  timestamp: string;
  rating: number; // 1 to 5
  instansi: string;
  improvements: string[];
  comment: string;
}

export type FeedbackTag =
  | 'Tampilan'
  | 'Pencarian Data'
  | 'Kelengkapan Data'
  | 'Metadata'
  | 'Fitur'
  | 'Performa Akses';

export interface VisiMisiNTT {
  misiId: 'MAJU' | 'SEHAT' | 'CERDAS' | 'SEJAHTERA' | 'BERKELANJUTAN';
  nomor: string;
  nama: string;
  deskripsi: string;
  pilarTerkait: string[];
  dasaCitaTerkait: string[];
  kelompokMasalahTerkait: string[];
}
