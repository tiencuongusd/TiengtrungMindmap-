
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Settings, X, Volume2 } from 'lucide-react';
import { getAudioSettings, updateAudioSettings, AudioSettings, playChineseAudio, getVoiceGender } from '../lib/audioStore';
import { cn } from '../lib/utils';

export const AudioSettingsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<AudioSettings>(getAudioSettings());
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices.filter(v => v.lang.includes('zh')));
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleUpdate = (updates: Partial<AudioSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    updateAudioSettings(updates);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                <Settings size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-slate-800 leading-none">Cài đặt giọng đọc</h2>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-8">
            {/* Toggle Transliteration (Phiên âm bồi) */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div>
                <span className="text-[12px] font-black uppercase tracking-widest text-slate-700 block mb-1">Phiên âm bồi (Bồi âm)</span>
                <span className="text-[10px] text-slate-400 font-medium block">Bật hoặc tắt hiển thị phiên âm bồi tiếng Việt</span>
              </div>
              <button 
                onClick={() => handleUpdate({ showVietnameseHint: settings.showVietnameseHint !== false ? false : true })}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                  settings.showVietnameseHint !== false ? "bg-slate-950" : "bg-slate-200"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    settings.showVietnameseHint !== false ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>

            {/* Rate Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Volume2 size={14} className="text-brand-red" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">Tốc độ (Rate)</span>
                </div>
                <span className="text-xs font-bold text-brand-red">{settings.rate.toFixed(1)}</span>
              </div>
              <input 
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={settings.rate}
                onChange={(e) => handleUpdate({ rate: parseFloat(e.target.value) })}
                className="w-full accent-brand-red h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2">
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Chậm</span>
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Bình thường</span>
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Nhanh</span>
              </div>
            </div>

            {/* Voice dropdown if multiple voices available */}
            {availableVoices.length > 1 && (
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 block mb-3">Chọn giọng đọc cụ thể</span>
                <select 
                  value={settings.voiceURI || ''}
                  onChange={(e) => handleUpdate({ voiceURI: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-red/20 outline-none"
                >
                  <option value="">Tự động chọn (Đề xuất)</option>
                  {availableVoices.map((v, idx) => {
                    const gender = getVoiceGender(v);
                    const genderLabel = gender === 'female' ? ' (Giọng Nữ)' : gender === 'male' ? ' (Giọng Nam)' : '';
                    return (
                      <option key={`${v.voiceURI}-${idx}`} value={v.voiceURI}>
                        {v.name}{genderLabel}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <button
              onClick={() => {
                const testTexts = ["你好", "很高兴见到你", "今天天气不错"];
                const randomText = testTexts[Math.floor(Math.random() * testTexts.length)];
                playChineseAudio(randomText);
              }}
              className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-brand-red transition-colors active:scale-[0.98]"
            >
              <Volume2 size={18} />
              <span>Nghe thử giọng đọc</span>
            </button>
          </div>

          <div className="mt-10 p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <p className="text-[9px] md:text-[10px] text-amber-700/70 font-medium leading-relaxed">
              Mẹo: Bạn có thể chọn các giọng đọc khác nhau từ danh sách nếu thiết bị của bạn hỗ trợ nhiều bộ giọng từ Google hoặc hệ điều hành.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
