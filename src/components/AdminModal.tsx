import React, { useState } from 'react';
import { ResearchProposal, FeedbackItem, PartnerIntervention, PriorityScoreWeights } from '../types';
import { Lock, X, Shield, FileSpreadsheet, Trash2, Check, RefreshCw, MessageSquare, ListFilter, Download, LogOut, Sliders, Handshake } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposals: ResearchProposal[];
  feedbacks: FeedbackItem[];
  partnerInterventions?: PartnerIntervention[];
  onDeleteProposal: (id: string) => void;
  onUpdateGoogleSheetUrl: (url: string) => void;
  currentGoogleSheetUrl?: string;
  onResetData: () => void;
  isAdmin: boolean;
  onSetIsAdmin: (status: boolean) => void;
  weights: PriorityScoreWeights;
  onUpdateWeights: (newWeights: PriorityScoreWeights) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  proposals,
  feedbacks,
  partnerInterventions = [],
  onDeleteProposal,
  onUpdateGoogleSheetUrl,
  currentGoogleSheetUrl = '',
  onResetData,
  isAdmin,
  onSetIsAdmin,
  weights,
  onUpdateWeights,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'proposals' | 'feedback' | 'sync' | 'weights'>('proposals');
  const [sheetUrl, setSheetUrl] = useState(currentGoogleSheetUrl);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [tempWeights, setTempWeights] = useState<PriorityScoreWeights>(weights);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (username === 'admin' && password === 'rida2026') ||
      (username === 'bapperida' && password === 'nttmaju')
    ) {
      onSetIsAdmin(true);
      setAuthError('');
    } else {
      setAuthError('Kredensial tidak valid. Gunakan admin / rida2026.');
    }
  };

  const handleSaveSheetUrl = () => {
    onUpdateGoogleSheetUrl(sheetUrl);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSaveWeights = (e: React.FormEvent) => {
    e.preventDefault();
    const sum =
      Number(tempWeights.urgensiWeight) +
      Number(tempWeights.rpjmdWeight) +
      Number(tempWeights.riwayatWeight) +
      Number(tempWeights.dataWeight) +
      Number(tempWeights.anggaranWeight);

    if (sum !== 100) {
      alert(`Total akumulasi bobot harus bernilai tepat 100% (saat ini: ${sum}%)`);
      return;
    }

    onUpdateWeights(tempWeights);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Panel Administrasi RIDA-AFAEK</h3>
              <p className="text-[10px] text-slate-400">Bidang Riset dan Inovasi Daerah Bapperida NTT</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => onSetIsAdmin(false)}
                className="px-2.5 py-1 text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                title="Keluar Mode Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar Admin</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isAdmin ? (
          /* Login Form */
          <div className="p-8 max-w-sm mx-auto w-full space-y-6">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Login Administrator</h4>
              <p className="text-xs text-slate-500">
                Akses khusus pengelola Bapperida untuk mengedit skor, mengelola usulan, dan mengatur bobot prioritas.
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="rida2026"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Masuk Sistem
                </button>
              </div>

              <div className="text-[11px] text-center text-slate-400 pt-2">
                * Kredensial demo: <code className="text-emerald-700 font-mono">admin</code> / <code className="text-emerald-700 font-mono">rida2026</code>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="px-6 bg-slate-50 border-b border-slate-200 flex items-center gap-4 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveTab('proposals')}
                className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'proposals'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Kelola Usulan ({proposals.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('weights')}
                className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'weights'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Bobot Skor Prioritas</span>
              </button>

              <button
                onClick={() => setActiveTab('feedback')}
                className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'feedback'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Masukan Pengunjung ({feedbacks.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('sync')}
                className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'sync'
                    ? 'border-emerald-600 text-emerald-700 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Integrasi Spreadsheet</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 overflow-y-auto flex-1 text-xs">
              {activeTab === 'proposals' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 text-sm">
                      Daftar Usulan Riset &amp; Pengelolaan
                    </h4>
                    <button
                      onClick={onResetData}
                      className="px-3 py-1 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-md cursor-pointer"
                    >
                      Reset ke Data Awal
                    </button>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                        <tr>
                          <th className="p-3">Waktu</th>
                          <th className="p-3">Perangkat Daerah</th>
                          <th className="p-3">Isu Krusial</th>
                          <th className="p-3 text-center">Skor</th>
                          <th className="p-3 text-center">Tindakan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {proposals.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50">
                            <td className="p-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                              {p.timestamp}
                            </td>
                            <td className="p-3">
                              <div className="font-semibold text-slate-900">{p.unitKerja || p.perangkatDaerah}</div>
                              <div className="text-slate-500 text-[11px]">{p.penanggungJawab}</div>
                            </td>
                            <td className="p-3 max-w-xs truncate text-slate-800">
                              {p.isuKrusial}
                            </td>
                            <td className="p-3 text-center font-mono font-bold text-emerald-700">
                              {p.totalScore || 80}/100
                            </td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => {
                                  if (confirm('Hapus usulan ini dari dasbor?')) {
                                    onDeleteProposal(p.id);
                                  }
                                }}
                                className="p-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                                title="Hapus Usulan"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'weights' && (
                <form onSubmit={handleSaveWeights} className="max-w-md space-y-4">
                  <h4 className="font-bold text-slate-800 text-sm">
                    Konfigurasi Bobot Penilaian Peringkat Prioritas
                  </h4>
                  <p className="text-slate-500">
                    Atur pembobotan lima kriteria pemeringkatan (Urgensi, RPJMD, Riwayat Kajian, Kesiapan Data, Kesiapan Anggaran).
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Bobot Urgensi (%):
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={tempWeights.urgensiWeight}
                        onChange={(e) => setTempWeights({ ...tempWeights, urgensiWeight: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Bobot Keterkaitan RPJMD/Renstra/RKPD (%):
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={tempWeights.rpjmdWeight}
                        onChange={(e) => setTempWeights({ ...tempWeights, rpjmdWeight: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Bobot Riwayat Kajian Terdahulu (%):
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={tempWeights.riwayatWeight}
                        onChange={(e) => setTempWeights({ ...tempWeights, riwayatWeight: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Bobot Kesiapan Data (%):
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={tempWeights.dataWeight}
                        onChange={(e) => setTempWeights({ ...tempWeights, dataWeight: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Bobot Kesiapan Anggaran (%):
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={tempWeights.anggaranWeight}
                        onChange={(e) => setTempWeights({ ...tempWeights, anggaranWeight: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs cursor-pointer"
                  >
                    Simpan Bobot Baru
                  </button>
                </form>
              )}

              {activeTab === 'feedback' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 text-sm">
                    Evaluasi &amp; Umpan Balik Pengunjung
                  </h4>

                  {feedbacks.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 border border-slate-200 rounded-xl">
                      Belum ada feedback yang masuk dari pengunjung.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {feedbacks.map((fb) => (
                        <div
                          key={fb.id}
                          className="p-4 rounded-xl border border-slate-200 bg-white space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-base">
                                {['😞', '🙁', '😐', '😄', '😍'][fb.rating - 1] || '😐'}
                              </span>
                              <strong className="text-slate-900 font-semibold">{fb.instansi}</strong>
                            </div>
                            <span className="text-slate-400 font-mono text-[11px]">
                              {fb.timestamp}
                            </span>
                          </div>

                          {fb.improvements.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {fb.improvements.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 text-[10px] font-medium border border-sky-200"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {fb.comment && (
                            <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                              &ldquo;{fb.comment}&rdquo;
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'sync' && (
                <div className="space-y-4 max-w-xl">
                  <h4 className="font-bold text-slate-800 text-sm">
                    Konfigurasi Sinkronisasi Spreadsheet (&quot;data untuk dasboard&quot;)
                  </h4>
                  <div className="space-y-2">
                    <label className="block font-semibold text-slate-700">
                      Tautan Publik CSV Google Sheets:
                    </label>
                    <input
                      type="url"
                      placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                      value={sheetUrl}
                      onChange={(e) => setSheetUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-mono text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={handleSaveSheetUrl}
                      className="px-4 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Simpan &amp; Sinkronkan</span>
                    </button>
                    {saveSuccess && (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        Tersimpan dan tersinkron!
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
