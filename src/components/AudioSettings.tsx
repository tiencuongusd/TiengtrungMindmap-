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
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-3xl border-2 border-duo-gray border-b-6 overflow-hidden z-10"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFFFEC] border-2 border-duo-green text-duo-green flex items-center justify-center shadow-[0_2px_0_#46A302]">
                <Settings size={20} className="text-duo-green animate-spin-slow" />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-duo-green font-sans leading-none block mb-1">CƠ CHẾ PHÁT ÂM</span>
                <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-800 leading-none font-sans">Cài đặt giọng đọc</h2>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-9 h-9 border-2 border-duo-gray border-b-4 hover:border-slate-400 active:translate-y-[2px] active:border-b-2 rounded-xl text-slate-400 hover:text-slate-600 bg-white flex items-center justify-center transition-all cursor-pointer"
              title="Đóng"
            >
              <X size={16} className="stroke-[3]" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Rate Selection */}
            <div className="pb-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Volume2 size={15} className="text-duo-blue stroke-[2.5]" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 font-sans">Tốc độ đọc (Rate)</span>
                </div>
                <span className="text-xs font-black text-duo-blue font-sans">{settings.rate.toFixed(1)}x</span>
              </div>
              <input 
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={settings.rate}
                onChange={(e) => handleUpdate({ rate: parseFloat(e.target.value) })}
                className="w-full accent-duo-blue h-2 bg-slate-150 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2.5 font-sans">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Chậm</span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Bình thường</span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Nhanh</span>
              </div>
            </div>

            {/* Voice dropdown if multiple voices available */}
            {availableVoices.length > 1 && (
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 block mb-2 font-sans">Chọn giọng đọc cụ thể</span>
                <select 
                  value={settings.voiceURI || ''}
                  onChange={(e) => handleUpdate({ voiceURI: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-duo-gray rounded-2xl px-4 py-3 text-xs font-black text-slate-600 focus:outline-none"
                >
                  <option value="">Tự động chọn (Mặc định)</option>
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
                const testTexts = ["你好", "很高兴见到 ti", "今天天气不错"];
                const randomText = testTexts[Math.floor(Math.random() * testTexts.length)];
                playChineseAudio(randomText);
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-duo-green border-b-4 border-duo-green-dark hover:bg-[#62e403] active:translate-y-[2px] active:border-b-2 text-white font-black text-xs uppercase rounded-2xl transition-all cursor-pointer font-sans text-center"
            >
              <Volume2 size={16} className="stroke-[2.5]" />
              <span>Nghe thử phát âm</span>
            </button>
          </div>

          <div className="mt-6 p-4 bg-[#FFFCE6] rounded-2xl border-2 border-duo-yellow/50 text-duo-orange font-sans leading-relaxed text-xs font-bold">
            <p>
              Mẹo: Nếu thiết bị có hỗ trợ nhiều bộ giọng đọc của Google hoặc hệ điều hành, bạn có thể lựa chọn giọng nam/nữ để nghe giọng phong phú hơn.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
