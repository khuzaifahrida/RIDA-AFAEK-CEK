import { VisiMisiNTT } from '../types';

export const TUJUH_PILAR_PEMBANGUNAN = [
  { nomor: 1, nama: 'Ekonomi Berkelanjutan', deskripsi: 'Pengembangan potensi komoditas unggulan, ekonomi biru, dan ekonomi hijau.' },
  { nomor: 2, nama: 'Pemberdayaan Komunitas', deskripsi: 'Peningkatan kapasitas masyarakat desa dan kelompok rentan GEDSI.' },
  { nomor: 3, nama: 'Pemerataan Infrastruktur Berkelanjutan', deskripsi: 'Konektivitas wilayah, kawasan perbatasan, dan fasilitas dasar.' },
  { nomor: 4, nama: 'Kesehatan', deskripsi: 'Layanan kesehatan inklusif, jaminan kesehatan semesta, dan penurunan stunting.' },
  { nomor: 5, nama: 'Pendidikan', deskripsi: 'Akses dan mutu pendidikan yang merata berbasis kebutuhan daerah.' },
  { nomor: 6, nama: 'Reformasi Birokrasi dan Hak Asasi Manusia', deskripsi: 'Tata kelola pemerintahan berbasis data dan pemenuhan HAM.' },
  { nomor: 7, nama: 'Kolaborasi', deskripsi: 'Sinergi multipihak Bapperida, universitas, mitra swasta, dan NGO.' },
];

export const LIMA_MISI_NTT: VisiMisiNTT[] = [
  {
    misiId: 'MAJU',
    nomor: 'Misi 1',
    nama: 'MAJU',
    deskripsi: 'Memastikan infrastruktur berkelanjutan demi mewujudkan ekonomi berbasis potensi daerah yang berdaya saing.',
    pilarTerkait: ['Pilar 3', 'Pilar 7'],
    dasaCitaTerkait: ['Dasa Cita 7', 'Dasa Cita 9', 'Dasa Cita 10'],
    kelompokMasalahTerkait: [
      'Infrastruktur Dasar, Konektivitas & Mitigasi Bencana',
      'Ekonomi Biru dan Ekonomi Hijau, Integrasi Ekonomi Domestik dan Nasional'
    ]
  },
  {
    misiId: 'SEHAT',
    nomor: 'Misi 2',
    nama: 'SEHAT',
    deskripsi: 'Memperluas pelayanan kesehatan dan jaminan sosial yang lebih inklusif, terjangkau dan mudah diakses.',
    pilarTerkait: ['Pilar 4', 'Pilar 7'],
    dasaCitaTerkait: ['Dasa Cita 4', 'Dasa Cita 5', 'Dasa Cita 10'],
    kelompokMasalahTerkait: [
      'Kesehatan untuk Semua, Perlindungan Sosial yang Adaptif dan GEDSI'
    ]
  },
  {
    misiId: 'CERDAS',
    nomor: 'Misi 3',
    nama: 'CERDAS',
    deskripsi: 'Menghadirkan pendidikan berkualitas yang merata, partisipatif, dan tepat sasaran.',
    pilarTerkait: ['Pilar 5', 'Pilar 7'],
    dasaCitaTerkait: ['Dasa Cita 6', 'Dasa Cita 10'],
    kelompokMasalahTerkait: [
      'Pendidikan Bermutu & Penguatan SDM Daerah'
    ]
  },
  {
    misiId: 'SEJAHTERA',
    nomor: 'Misi 4',
    nama: 'SEJAHTERA',
    deskripsi: 'Mewujudkan kesejahteraan sosial, kesetaraan akses, serta kualitas hidup yang berkeadilan dan madani bagi seluruh lapisan masyarakat.',
    pilarTerkait: ['Pilar 2', 'Pilar 7'],
    dasaCitaTerkait: ['Dasa Cita 2', 'Dasa Cita 10'],
    kelompokMasalahTerkait: [
      'Kesehatan untuk Semua, Perlindungan Sosial yang Adaptif dan GEDSI',
      'Transformasi Digital & Tata Kelola Pelayanan Publik'
    ]
  },
  {
    misiId: 'BERKELANJUTAN',
    nomor: 'Misi 5',
    nama: 'BERKELANJUTAN',
    deskripsi: 'Mewujudkan pembangunan berkelanjutan melalui pengelolaan sumber daya alam dan manusia yang bijak serta pemenuhan HAM untuk menciptakan masa depan yang inklusif.',
    pilarTerkait: ['Pilar 1', 'Pilar 6', 'Pilar 7'],
    dasaCitaTerkait: ['Dasa Cita 1', 'Dasa Cita 3', 'Dasa Cita 4', 'Dasa Cita 8', 'Dasa Cita 10'],
    kelompokMasalahTerkait: [
      'Ekonomi Biru dan Ekonomi Hijau, Integrasi Ekonomi Domestik dan Nasional',
      'Industri dan Hilirisasi, Ekonomi Kreatif, UMKM dan Koperasi'
    ]
  }
];
