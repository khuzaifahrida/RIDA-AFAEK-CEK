import React, { useState } from 'react';
import { Star, X, CheckCircle2 } from 'lucide-react';
import { FeedbackItem, FeedbackTag } from '../types';

interface FloatingFeedbackWidgetProps {
  onSubmitFeedback: (item: FeedbackItem) => void;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export const FloatingFeedbackWidget: React.FC<FloatingFeedbackWidgetProps> = ({
  onSubmitFeedback,
  isOpenExternal = false,
  onCloseExternal,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isOpenExternal || internalOpen;

  const handleClose = () => {
    setInternalOpen(false);
    if (onCloseExternal) onCloseExternal();
  };

  // Form states
  const [rating, setRating] = useState<number>(4); // Default to smiling face
  const [instansi, setInstansi] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Emojis matching Image 2
  const satisfactionEmojis = [
    { value: 1, emoji: '😞', label: 'Sangat Kurang' },
    { value: 2, emoji: '🙁', label: 'Kurang' },
    { value: 3, emoji: '😐', label: 'Cukup' },
    { value: 4, emoji: '😄', label: 'Puas' },
    { value: 5, emoji: '😍', label: 'Sangat Puas' },
  ];

  // Improvement tags matching Image 2
  const improvementTags: FeedbackTag[] = [
    'Tampilan',
    'Pencarian Data',
    'Kelengkapan Data',
    'Metadata',
    'Fitur',
    'Performa Akses',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: FeedbackItem = {
      id: `fb-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      rating,
      instansi: instansi || 'Tidak Disebutkan',
      improvements: selectedTags,
      comment,
    };

    onSubmitFeedback(newFeedback);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      handleClose();
      // Reset form
      setRating(4);
      setInstansi('');
      setSelectedTags([]);
      setComment('');
    }, 2200);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) with green star logo and specified text */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        <button
          onClick={() => setInternalOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 rounded-full shadow-lg hover:shadow-xl border border-slate-200/90 transition-all transform hover:-translate-y-1 active:translate-y-0 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          aria-label="Buka formulir feedback website"
        >
          {/* Green Star Icon / Logo */}
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-200">
            <Star className="w-4 h-4 fill-emerald-500 text-emerald-500 transition-transform group-hover:rotate-12" />
          </div>

          <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors whitespace-nowrap">
            bantu website kami menjadi lebih baik
          </span>
        </button>
      </div>

      {/* Feedback Modal (Exact matching Image 2) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 transition-all">
            {/* Modal Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                Feedback
              </h3>
              <button
                onClick={handleClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="p-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  Terima Kasih atas Masukan Anda!
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                  Saran dan penilaian Anda sangat berharga dalam meningkatkan kualitas portal RIDA-AFAEK Bapperida NTT.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-5 text-sm">
                {/* Question 1: Satisfaction Rating with Emojis */}
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-3">
                    Seberapa puas Anda dengan website RIDA-AFAEK?
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {satisfactionEmojis.map((item) => {
                      const isSelected = rating === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setRating(item.value)}
                          className={`aspect-square flex items-center justify-center rounded-xl border text-2xl transition-all cursor-pointer ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 scale-105'
                              : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
                          }`}
                          title={item.label}
                        >
                          <span className="select-none">{item.emoji}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question 2: Asal Instansi Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Asal Instansi
                  </label>
                  <div className="relative">
                    <select
                      value={instansi}
                      onChange={(e) => setInstansi(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-800 appearance-none focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm"
                    >
                      <option value="">Pilih Asal Instansi</option>
                      <option value="Bapperida Provinsi NTT">Bapperida Provinsi NTT</option>
                      <option value="Dinas Pendidikan dan Kebudayaan">Dinas Pendidikan dan Kebudayaan</option>
                      <option value="Dinas Kesehatan, Kependudukan dan Pencatatan Sipil">Dinas Kesehatan, Kependudukan dan Pencatatan Sipil</option>
                      <option value="Dinas Sosial">Dinas Sosial</option>
                      <option value="Dinas Kelautan dan Perikanan">Dinas Kelautan dan Perikanan</option>
                      <option value="Dinas Pertanian dan Ketahanan Pangan">Dinas Pertanian dan Ketahanan Pangan</option>
                      <option value="Dinas Pekerjaan Umum dan Penataan Ruang (PUPR)">Dinas Pekerjaan Umum dan Penataan Ruang (PUPR)</option>
                      <option value="Badan Keuangan Daerah">Badan Keuangan Daerah</option>
                      <option value="Badan Pendapatan Daerah">Badan Pendapatan Daerah</option>
                      <option value="Inspektorat Daerah">Inspektorat Daerah</option>
                      <option value="Sekretariat Daerah / Biro Lingkup Setda">Sekretariat Daerah / Biro Lingkup Setda</option>
                      <option value="Perguruan Tinggi / Universitas (Undana, Unwira, dll)">Perguruan Tinggi / Universitas (Undana, Unwira, dll)</option>
                      <option value="Lembaga Mitra / NGO / Swasta">Lembaga Mitra / NGO / Swasta</option>
                      <option value="Peneliti Independen / Akademisi Luar Daerah">Peneliti Independen / Akademisi Luar Daerah</option>
                      <option value="Masyarakat Umum">Masyarakat Umum</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Question 3: Apa yang dapat kami tingkatkan? (Multi-select pill tags) */}
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Apa yang dapat kami tingkatkan?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {improvementTags.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                            isSelected
                              ? 'bg-sky-50 border-sky-500 text-sky-800'
                              : 'bg-white border-sky-300 text-sky-700 hover:bg-sky-50/50'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question 4: Saran dan Masukkan (Textarea) */}
                <div>
                  <label className="block text-sm font-medium text-slate-800 mb-2">
                    Saran dan Masukkan
                  </label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tuliskan saran konstruktif Anda untuk kemajuan platform..."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm resize-none"
                  />
                </div>

                {/* Submit button (Matching the gray solid button in Image 2) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-sm font-bold text-white bg-slate-500 hover:bg-slate-600 active:bg-slate-700 rounded-xl shadow-xs transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
