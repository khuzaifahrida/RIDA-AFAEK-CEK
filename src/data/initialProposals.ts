import { ResearchProposal, ScoringCriteria, PriorityScoreWeights, PartnerIntervention } from '../types';

export const DEFAULT_WEIGHTS: PriorityScoreWeights = {
  urgensiWeight: 30,
  rpjmdWeight: 30,
  riwayatWeight: 15,
  dataWeight: 10,
  anggaranWeight: 15,
};

export function calculateProposalScore(
  scoring: ScoringCriteria,
  weights: PriorityScoreWeights = DEFAULT_WEIGHTS
): { totalScore: number; tier: 'Sangat Tinggi' | 'Tinggi' | 'Menengah' | 'Standar' } {
  // Normalize each score based on the weight configuration
  // Input scoring has default max: 30, 30, 15, 10, 15
  const normUrgensi = (scoring.urgensi / 30) * weights.urgensiWeight;
  const normRPJMD = (scoring.keterkaitanRPJMD / 30) * weights.rpjmdWeight;
  const normRiwayat = (scoring.riwayatKajian / 15) * weights.riwayatWeight;
  const normData = (scoring.kesiapanData / 10) * weights.dataWeight;
  const normAnggaran = (scoring.kesiapanAnggaran / 15) * weights.anggaranWeight;

  const total = Math.min(100, Math.round(normUrgensi + normRPJMD + normRiwayat + normData + normAnggaran));

  let tier: 'Sangat Tinggi' | 'Tinggi' | 'Menengah' | 'Standar' = 'Standar';
  if (total >= 85) tier = 'Sangat Tinggi';
  else if (total >= 70) tier = 'Tinggi';
  else if (total >= 50) tier = 'Menengah';

  return { totalScore: total, tier };
}

export const INITIAL_PROPOSALS: ResearchProposal[] = [
  {
    id: 'prop-1',
    timestamp: '08/10/2026 11:16:46',
    tahun: '2026',
    perangkatDaerah: 'Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah',
    unitKerja: 'Bidang Pemerintahan dan Pembangunan Manusia',
    penanggungJawab: 'Ansgarius Wahana Mau, S.STP, M.P.A / Penelaah Teknis kebijakan',
    isuKrusial: 'Tingginya ketidakakuratan sasaran program bantuan pemerintah (inclusion error), yang terbukti pada melesetnya target penerima bansos, program KUBE, dan PBI JKN. Hambatan mendasarnya adalah belum optimalnya pemutakhiran data kesejahteraan di tingkat desa melalui Musyawarah Desa (Musdes) akibat adanya kendala politisasi lokal dan keterbatasan aksesibilitas. Untuk mengatasi tantangan tersebut, kami mengusulkan pemutakhiran Data Tunggal Sosial Ekonomi (DTSEN) menggunakan pendekatan penargetan berbasis komunitas (Community Based Targeting) melalui verifikasi dan validasi multipihak, yang dieksekusi secara kolaboratif dengan melibatkan mahasiswa KKN Tematik, akademisi, dan ASN Pemprov.',
    kelompokMasalah: 'Kesehatan untuk Semua, Perlindungan Sosial yang Adaptif dan GEDSI',
    ikuTerdampak: 'IKU Terkait: Persentase rekomendasi hasil evaluasi yang ditindaklanjuti dalam perencanaan tahunan, termasuk masyarakat pada kelompok rentan.\nKonteks Analisis: Ketidakakuratan data penerima bansos, KUBE, dan PBI JKN menunjukkan bahwa sasaran perencanaan belum sepenuhnya inklusif dan belum menjangkau kelompok rentan yang sesungguhnya (desil 1-4).\nProgram Prioritas: Perencanaan, Pengendalian & Evaluasi Pembangunan Daerah.',
    pernahRisetSebelumnya: 'Pernah, tetapi belum tuntas / tidak berlanjut',
    keteranganRisetSebelumnya: 'Pemerintah Provinsi melalui bapperida dan dinas sosial sudah pernah melakukan musdes tersebut di desa bokong dan baumata utara dan akan melakukan uji coba lagi di desa kuanheun kab kupang.',
    alasanBelumSelesai: 'Lemahnya Integrasi Pengendalian dan Evaluasi Kinerja. Masalah kesalahan sasaran program bansos yang terus berulang menandakan lemahnya fungsi monitoring.',
    outputRisetDiharapkan: 'Pemutakhiran DTSEN melalui verval multipihak. Mahasiswa KKN tematik dengan bimbingan dosen dan ASN pemprov dapat menginisiasi pemutakhiran di desa.',
    urgensi: 'Jangka Menengah',
    ketersediaanAnggaran: 'Belum tersedia / memerlukan dukungan pendanaan dari anggaran khusus riset daerah di Bapperida / Kerjasama Lembaga Mitra',
    bentukKolaborasi: 'Sharing Data dan SDM: Bantuan berupa penyediaan data primer/sekunder oleh OPD serta pelibatan tenaga fungsional/teknis OPD mendampingi tim periset Bapperida.',
    pelibatanMitra: 'Sudah pernah dilibatkan / sudah ada kerja sama rintisan sebelumnya',
    peranSpesifikMitra: 'Fasilitator Inovasi / Teknologi: Membantu merancang prototipe teknologi, aplikasi, atau model pemberdayaan baru.',
    rekomendasiMitra: 'FISIP Universitas Nusa Cendana (Undana)',
    dokumenPendukung: 'Hasil kajian/riset pendahuluan atau laporan akademik sebelumnya (jika ada)',
    kesiapanSharingData: 'Ya, namun sebagian data bersifat terbatas/perlu koordinasi khusus',
    scoring: {
      urgensi: 24,
      keterkaitanRPJMD: 28,
      riwayatKajian: 14,
      kesiapanData: 8,
      kesiapanAnggaran: 10,
    },
    totalScore: 84,
    priorityTier: 'Tinggi',
    misiNTT: 'SEHAT',
    pilarNTT: 'Pilar 4: Kesehatan & Jaminan Sosial',
    dasaCita: ['Dasa Cita 4', 'Dasa Cita 5', 'Dasa Cita 10'],
  },
  {
    id: 'prop-2',
    timestamp: '08/10/2026 11:34:34',
    tahun: '2026',
    perangkatDaerah: 'Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah',
    unitKerja: 'Bidang Infrastruktur dan Kewilayahan',
    penanggungJawab: 'Yohanes Paut, ST., MT / Kepala Bidang',
    isuKrusial: 'Kebutuhan akan Kawasan Perdagangan Bebas dan Pelabuhan Bebas (KPBPB) di NTT untuk mengoptimalkan kerjasama bidang perekonomian antara RI dengan RDTL dan negara lainnya. Namun karena penetapan dan pengelolaan KPBPB ini merupakan kewenangan pusat sehingga perlu adanya penyusunan dokumen Pre Feasibility Study (Pre FS) pembentukan KPBPB di Kabupaten Belu dan TTU yang akan dijadikan lampiran usulan ke Pemerintah Pusat untuk perencanaan dan penetapan KPBPB di kedua kabupaten tersebut.',
    kelompokMasalah: 'Ekonomi Biru dan Ekonomi Hijau, Integrasi Ekonomi Domestik dan Nasional',
    ikuTerdampak: 'Program Prioritas dan Kegiatan yang Terdampak yaitu Program Koordinasi dan Sinkronisasi Perencanaan Pembangunan Daerah. Kegiatan Terkait: "Koordinasi Perencanaan Bidang Perekonomian dan SDA" dan "Koordinasi Perencanaan Bidang Infrastruktur dan Kewilayahan"',
    pernahRisetSebelumnya: 'Belum pernah sama sekali',
    keteranganRisetSebelumnya: '',
    alasanBelumSelesai: 'Kelemahan Sinkronisasi dan Harmonisasi Lintas Level Pemerintahan: Karena penetapan KPBPB adalah kewenangan mutlak pemerintah pusat, usulan ini tidak bisa dieksekusi hanya dengan kebijakan daerah. Pendekatan konvensional sering kali terhambat karena kualitas perencanaan belum terintegrasi utuh.',
    outputRisetDiharapkan: 'Penyusunan dokumen Pre Feasibility Study (Pre FS) pembentukan KPBPB di Kabupaten Belu dan TTU.',
    urgensi: 'Mendesak (Untuk perencanaan tahun anggaran berikutnya)',
    ketersediaanAnggaran: 'Ada sebagian / direncanakan pada APBD Perubahan / tahun anggaran berikutnya',
    bentukKolaborasi: 'Sharing Dana: Pembiayaan kegiatan dilakukan secara bersama-sama (sharing budget) antara DPA OPD pengusul dan anggaran Bidang RIDA.',
    pelibatanMitra: 'Belum pernah, namun sangat terbuka dan membutuhkan pelibatan Perguruan Tinggi / Lembaga Mitra',
    peranSpesifikMitra: 'Penyedia Tenaga Ahli / Pakar Riset: Melakukan analisis metodologi mendalam, survei, dan penyusunan naskah akademik.',
    rekomendasiMitra: 'Perguruan Tinggi Bidang Ekonomi & Perdagangan Internasional',
    dokumenPendukung: 'Data statistik sektorial, hasil monitoring, atau evaluasi internal program',
    kesiapanSharingData: 'Ya, namun sebagian data bersifat terbatas/perlu koordinasi khusus',
    scoring: {
      urgensi: 30,
      keterkaitanRPJMD: 29,
      riwayatKajian: 12,
      kesiapanData: 8,
      kesiapanAnggaran: 13,
    },
    totalScore: 92,
    priorityTier: 'Sangat Tinggi',
    misiNTT: 'MAJU',
    pilarNTT: 'Pilar 3: Pemerataan Infrastruktur Berkelanjutan',
    dasaCita: ['Dasa Cita 7', 'Dasa Cita 9', 'Dasa Cita 10'],
  },
  {
    id: 'prop-3',
    timestamp: '08/10/2026 11:48:33',
    tahun: '2026',
    perangkatDaerah: 'Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah',
    unitKerja: 'Bidang Perekonomian dan Sumber Daya Alam',
    penanggungJawab: 'Terezinha de Carvalho, SP / Perencana Ahli Muda',
    isuKrusial: 'Minimnya Nilai Tambah (Hilirisasi) Komoditas Lokal: Hasil hutan bukan kayu (HHBK) dan komoditas lahan kering unggulan (seperti Kelor/Moringa, Asam, Alpukat, Lontar, dan Kemiri) seringkali dijual dalam bentuk mentah, sehingga nilai ekonominya rendah.',
    kelompokMasalah: 'Industri dan Hilirisasi, Ekonomi Kreatif, UMKM dan Koperasi',
    ikuTerdampak: 'Program Koordinasi dan Sinkronisasi Perencanaan Pembangunan Daerah. Kegiatan Terkait: "Koordinasi Perencanaan Bidang Perekonomian dan SDA". Konteks Analisis: Rencana hilirisasi komoditas lahan kering harus dikoordinasikan ke RPJMD/RKPD.',
    pernahRisetSebelumnya: 'Pernah, tetapi belum tuntas / tidak berlanjut',
    keteranganRisetSebelumnya: '',
    alasanBelumSelesai: 'Lemahnya Sinkronisasi dan Sinergi Lintas Sektor: Mengubah komoditas mentah menjadi produk jadi bernilai tinggi menuntut kerja sama lintas perangkat daerah.',
    outputRisetDiharapkan: 'Evaluasi Dampak Program (Impact Evaluation) yang sedang berjalan & Peta Jalan (Roadmap) Hilirisasi Komoditas Lahan Kering',
    urgensi: 'Jangka Menengah',
    ketersediaanAnggaran: 'Ada sebagian / direncanakan pada APBD Perubahan / tahun anggaran berikutnya',
    bentukKolaborasi: 'Sharing Data dan SDM: Bantuan berupa penyediaan data primer/sekunder oleh OPD serta pelibatan tenaga fungsional/teknis OPD mendampingi tim periset Bapperida.',
    pelibatanMitra: 'Belum pernah, namun sangat terbuka dan membutuhkan pelibatan Perguruan Tinggi / Lembaga Mitra',
    peranSpesifikMitra: 'Fasilitator Inovasi / Teknologi: Membantu merancang prototipe teknologi, aplikasi, atau model pemberdayaan baru.',
    rekomendasiMitra: 'Fakultas Pertanian / Teknologi Pertanian & BRIN',
    dokumenPendukung: 'Data statistik sektorial, hasil monitoring, atau evaluasi internal program',
    kesiapanSharingData: 'Ya, namun sebagian data bersifat terbatas/perlu koordinasi khusus',
    scoring: {
      urgensi: 21,
      keterkaitanRPJMD: 26,
      riwayatKajian: 13,
      kesiapanData: 8,
      kesiapanAnggaran: 12,
    },
    totalScore: 80,
    priorityTier: 'Tinggi',
    misiNTT: 'BERKELANJUTAN',
    pilarNTT: 'Pilar 1: Ekonomi Berkelanjutan',
    dasaCita: ['Dasa Cita 1', 'Dasa Cita 3', 'Dasa Cita 10'],
  },
  {
    id: 'prop-4',
    timestamp: '08/10/2026 12:07:39',
    tahun: '2026',
    perangkatDaerah: 'Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah',
    unitKerja: 'Bidang Perekonomian dan Sumber Daya Alam',
    penanggungJawab: 'Terezinha de Carvalho, SP / Perencana Ahli Muda',
    isuKrusial: 'Rantai Nilai Perikanan dan Rumput Laut yang Lemah: Nelayan dan petani rumput laut sering terjebak tengkulak dan menjual produk mentah tanpa pengolahan. Belum ada teknologi pasca-panen (seperti cold storage bertenaga surya) yang memadai di pulau-pulau kecil.',
    kelompokMasalah: 'Industri dan Hilirisasi, Ekonomi Biru dan Ekonomi Hijau',
    ikuTerdampak: 'Program Koordinasi dan Sinkronisasi Perencanaan Pembangunan Daerah. Kegiatan Terkait: "Koordinasi Perencanaan Bidang Perekonomian dan SDA".',
    pernahRisetSebelumnya: 'Pernah, tetapi belum tuntas / tidak berlanjut',
    keteranganRisetSebelumnya: '',
    alasanBelumSelesai: 'Ketidakkonsistenan Perencanaan Lintas Sektor: Memutus rantai tengkulak dan membangun industri pengolahan perikanan mutlak memerlukan sinergi antar instansi.',
    outputRisetDiharapkan: 'Evaluasi Dampak Program (Impact Evaluation) yang sedang berjalan, Pemetaan Potensi / Analisis Data Sektoral berbasis bukti (Evidence-based data)',
    urgensi: 'Jangka Menengah',
    ketersediaanAnggaran: 'Ada sebagian / direncanakan pada APBD Perubahan / tahun anggaran berikutnya',
    bentukKolaborasi: 'Sharing Dana: Pembiayaan kegiatan dilakukan secara bersama-sama (sharing budget) antara DPA OPD pengusul dan anggaran Bidang RIDA., Sharing Data dan SDM.',
    pelibatanMitra: 'Belum pernah, namun sangat terbuka dan membutuhkan pelibatan Perguruan Tinggi / Lembaga Mitra',
    peranSpesifikMitra: 'Penyedia Data & Jaringan Lapangan: Lembaga mitra yang memiliki akses langsung ke sasaran di tingkat akar rumput/masyarakat.',
    rekomendasiMitra: 'Yayasan Konservasi Alam Nusantara / Fakultas Kelautan & Perikanan',
    dokumenPendukung: 'Data statistik sektorial, hasil monitoring, atau evaluasi internal program',
    kesiapanSharingData: 'Ya, namun sebagian data bersifat terbatas/perlu koordinasi khusus',
    scoring: {
      urgensi: 25,
      keterkaitanRPJMD: 27,
      riwayatKajian: 14,
      kesiapanData: 9,
      kesiapanAnggaran: 13,
    },
    totalScore: 88,
    priorityTier: 'Sangat Tinggi',
    misiNTT: 'BERKELANJUTAN',
    pilarNTT: 'Pilar 1: Ekonomi Berkelanjutan',
    dasaCita: ['Dasa Cita 1', 'Dasa Cita 8', 'Dasa Cita 10'],
  }
];

export const INITIAL_PARTNER_INTERVENTIONS: PartnerIntervention[] = [
  {
    id: 'part-1',
    timestamp: '11/10/2026 09:30:00',
    namaLembaga: 'Universitas Nusa Cendana (Undana) - FISIP & LPPM',
    jenisMitra: 'Perguruan Tinggi',
    surelKontak: 'lppm@undana.ac.id',
    proposalId: 'prop-1',
    namaMasalah: 'Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah — Tingginya ketidakakuratan sasaran program bantuan pemerintah (inclusion error)',
    bentukKontribusi: ['Riset/Kajian', 'SDM/Tenaga Ahli', 'Pendampingan'],
    rencanaDokumenKeluaran: ['Kajian Akademik', 'Policy Brief', 'Pemetaan/Analisis Data'],
    uraianRencana: 'Pendampingan mahasiswa KKN Tematik dan dosen pembimbing untuk piloting validasi Data Tunggal Sosial Ekonomi (DTSEN) berbasis komunitas di 10 desa percontohan Kabupaten Kupang.',
    tautanBuktiKerjasama: 'https://bapperida.nttprov.go.id/kerjasama/undana-mou-2026.pdf',
    statusVerifikasi: 'Terverifikasi',
  },
  {
    id: 'part-2',
    timestamp: '12/10/2026 14:15:00',
    namaLembaga: 'Pusat Studi Kawasan Perbatasan & Kerjasama Internasional',
    jenisMitra: 'Lembaga Penelitian',
    surelKontak: 'border.study@research.id',
    proposalId: 'prop-2',
    namaMasalah: 'Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah — Kebutuhan akan Kawasan Perdagangan Bebas dan Pelabuhan Bebas (KPBPB) di Kabupaten Belu dan TTU',
    bentukKontribusi: ['Riset/Kajian', 'SDM/Tenaga Ahli'],
    rencanaDokumenKeluaran: ['Kajian Akademik', 'Policy Brief', 'Laporan Akhir'],
    uraianRencana: 'Penyusunan naskah Pre-Feasibility Study KPBPB Belu-TTU dengan benchmarking koridor perdagangan RDTL dan standar regulasi Kementerian Keuangan.',
    tautanBuktiKerjasama: 'https://drive.google.com/pks-border-ntt',
    statusVerifikasi: 'Disetujui Kerja Sama',
  }
];

// Helper to parse standard CSV formatted string
export function parseCSVToProposals(csvText: string): ResearchProposal[] {
  const lines: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && csvText[i + 1] === '\n') {
        i++;
      }
      if (current.trim().length > 0) {
        lines.push(current);
      }
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim().length > 0) {
    lines.push(current);
  }

  if (lines.length < 2) return [];

  const parseRow = (line: string): string[] => {
    const values: string[] = [];
    let field = '';
    let insideQuote = false;

    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (insideQuote && line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          insideQuote = !insideQuote;
        }
      } else if (c === ',' && !insideQuote) {
        values.push(field.trim());
        field = '';
      } else {
        field += c;
      }
    }
    values.push(field.trim());
    return values;
  };

  const parsedProposals: ResearchProposal[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseRow(lines[i]);
    if (cols.length >= 6) {
      const scoring: ScoringCriteria = {
        urgensi: cols[11]?.toLowerCase().includes('mendesak') ? 28 : 20,
        keterkaitanRPJMD: 25,
        riwayatKajian: cols[7]?.toLowerCase().includes('pernah') ? 14 : 11,
        kesiapanData: 8,
        kesiapanAnggaran: 12,
      };
      const scoreObj = calculateProposalScore(scoring);

      parsedProposals.push({
        id: `csv-${Date.now()}-${i}`,
        timestamp: cols[0] || new Date().toLocaleString('id-ID'),
        tahun: '2026',
        perangkatDaerah: cols[1] || 'Perangkat Daerah',
        unitKerja: cols[2] || '',
        penanggungJawab: cols[3] || '',
        isuKrusial: cols[4] || '',
        kelompokMasalah: cols[5] || 'Lainnya',
        ikuTerdampak: cols[6] || '',
        pernahRisetSebelumnya: cols[7] || '',
        keteranganRisetSebelumnya: cols[8] || '',
        alasanBelumSelesai: cols[9] || '',
        outputRisetDiharapkan: cols[10] || '',
        urgensi: cols[11] || 'Jangka Menengah',
        ketersediaanAnggaran: cols[12] || '',
        bentukKolaborasi: cols[13] || '',
        pelibatanMitra: cols[14] || '',
        peranSpesifikMitra: cols[15] || '',
        rekomendasiMitra: cols[16] || '',
        dokumenPendukung: cols[17] || '',
        kesiapanSharingData: cols[18] || '',
        scoring,
        totalScore: scoreObj.totalScore,
        priorityTier: scoreObj.tier,
        misiNTT: 'BERKELANJUTAN',
        pilarNTT: 'Pilar 1: Ekonomi Berkelanjutan',
        dasaCita: ['Dasa Cita 10'],
      });
    }
  }

  return parsedProposals;
}
