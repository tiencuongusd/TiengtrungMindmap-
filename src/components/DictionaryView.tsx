import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { Lesson, MindMapNode } from '../types';
import { playChineseAudio, stopChineseAudio, useAudioPlayback, useAudioSettings } from '../lib/audio';
import { cn } from '../lib/utils';

interface Props {
  lessons: Lesson[];
  onSelectLesson: (id: number) => void;
}
interface DictionaryEntry {
  vietnamese: string;
  chinese: string;
  pinyin: string;
  hint?: string;
  lessonId: number;
  lessonTitle: string;
}

export const DictionaryView: React.FC<Props> = ({ lessons, onSelectLesson }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const playback = useAudioPlayback();
  const settings = useAudioSettings();

  const allWords = useMemo(() => {
    // ... traverse logic ...
    const words: DictionaryEntry[] = [];
    const seen = new Set<string>();

    const traverse = (node: MindMapNode, lesson: Lesson) => {
      const key = `${node.chinese}-${node.vietnamese}`;
      if (!seen.has(key)) {
        words.push({
          vietnamese: node.vietnamese,
          chinese: node.chinese,
          pinyin: node.pinyin,
          hint: node.vietnameseHint,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
        });
        seen.add(key);
      }
      if (node.children) {
        node.children.forEach(child => traverse(child, lesson));
      }
    };

    lessons.forEach(lesson => {
      lesson.mindMaps.forEach(root => traverse(root, lesson));
    });

    return words;
  }, [lessons]);

  const filteredWords = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return allWords.filter(word => 
      word.vietnamese.toLowerCase().includes(term) ||
      word.chinese.includes(searchTerm) ||
      word.pinyin.toLowerCase().includes(term)
    ).slice(0, 50); 
  }, [allWords, searchTerm]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="text-[10px] font-black text-duo-green uppercase tracking-[0.2em] mb-4">TỬ ĐIỂN MINDMAP</div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight uppercase mb-8 font-sans">Tra cứu học tiếng Trung online</h2>
        
        <div className="relative group">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="NHẬP TIẾNG VIỆT, TIẾNG TRUNG HOẶC PINYIN..."
            className="w-full px-8 py-5 bg-white border-2 border-duo-gray border-b-6 rounded-[2rem] text-base md:text-lg font-black placeholder:text-slate-350 outline-none focus:border-slate-400 focus:shadow-sm transition-all text-center tracking-wide text-slate-800 uppercase"
          />
          <Search className={cn(
            "absolute right-8 top-1/2 -translate-y-1/2 transition-colors",
            searchTerm ? "text-duo-blue" : "text-slate-300"
          )} size={24} />
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredWords.length > 0 ? (
            filteredWords.map((word, idx) => {
              const isCurrentText = playback.isSpeaking && playback.text === word.chinese;

              const renderChineseText = () => {
                if (!isCurrentText) {
                  return word.chinese;
                }

                const chars = Array.from(word.chinese);
                return chars.map((char, index) => {
                  const isHighlighted = index >= playback.charIndex && index < playback.charIndex + playback.charLength;
                  return (
                    <span 
                      key={index} 
                      className={cn(
                        "transition-all duration-150 inline-block",
                        isHighlighted 
                          ? "text-duo-red font-black scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" 
                          : "opacity-60"
                      )}
                    >
                      {char}
                    </span>
                  );
                });
              };

              return (
                <motion.div
                  key={`${word.chinese}-${word.lessonId}-${idx}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border-2 border-duo-gray border-b-4 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-400 transition-all duration-100 group select-none"
                >
                  <div className="flex items-start gap-6 no-select">
                    <div className={cn(
                      "min-w-[4.5rem] md:min-w-[5.5rem] h-16 px-3 flex items-center justify-center rounded-xl border-2 shadow-[0_2px_0_#E5E5E5] transition-colors",
                      isCurrentText 
                        ? "bg-[#FFFCE6] border-duo-yellow" 
                        : "bg-slate-50 border-duo-gray group-hover:bg-[#EFFFEC] group-hover:border-duo-green"
                    )}>
                      <span className="text-xl md:text-2xl chinese-char text-slate-800 text-center leading-none">
                        {renderChineseText()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base sm:text-lg font-black text-slate-800">{word.pinyin}</span>
                        <button 
                          onClick={() => {
                            if (isCurrentText) {
                              stopChineseAudio();
                            } else {
                              playChineseAudio(word.chinese);
                            }
                          }}
                          className={cn(
                            "p-1.5 rounded-lg border-2 border-b-4 transition-all cursor-pointer",
                            isCurrentText
                              ? "bg-white border-duo-red text-duo-red shadow-[0_2px_0_#EA2B2B] active:translate-y-[2px] active:border-b-2"
                              : "bg-white border-duo-gray text-slate-350 hover:text-duo-blue hover:border-duo-blue shadow-[0_2px_0_#E5E5E5] active:translate-y-[2px] active:border-b-2"
                          )}
                          title={isCurrentText ? "Dừng đọc" : "Đọc âm thanh"}
                        >
                          {isCurrentText ? <VolumeX size={14} className="stroke-[3]" /> : <Volume2 size={14} className="stroke-[3]" />}
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-duo-green font-black text-sm">
                        <span>{word.vietnamese}</span>
                        {word.hint && settings.showVietnameseHint !== false && <span className="text-xs text-duo-sub font-bold">({word.hint})</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="block text-[8px] font-black uppercase text-duo-sub tracking-wider">TỪ BÀI HỌC</span>
                      <span className="text-xs font-black text-slate-600">{word.lessonTitle}</span>
                    </div>
                    <button 
                      onClick={() => onSelectLesson(word.lessonId)}
                      className="w-10 h-10 bg-white border-2 border-duo-gray border-b-4 hover:border-slate-400 active:translate-y-[2px] active:border-b-2 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 transition-all duration-100"
                    >
                      <ArrowRight size={18} className="stroke-[3]" />
                    </button>
                  </div>
              </motion.div>
              );
            })
          ) : searchTerm.trim() ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-stone-50 rounded-3xl border-2 border-dashed border-duo-gray"
            >
              <div className="text-slate-400 font-black text-base uppercase tracking-widest mb-2">Không tìm thấy kết quả</div>
              <p className="text-duo-sub text-xs font-bold">Hãy tra cứu bằng từ ngữ khác xem nhé!</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-[#FFFCE6] border-2 border-duo-yellow border-b-4 p-8 rounded-3xl">
                <h4 className="text-duo-orange font-black uppercase text-[10px] tracking-widest mb-4">MẸO TRA CỨU DUOLINGO STYLE</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-xs text-duo-orange font-bold font-sans">
                    <div className="w-2 h-2 rounded-full bg-duo-yellow mt-1 shrink-0" />
                    Có thể gõ tiếng Việt không dấu, tìm cực nhanh!
                  </li>
                  <li className="flex items-start gap-3 text-xs text-duo-orange font-bold font-sans">
                    <div className="w-2 h-2 rounded-full bg-duo-yellow mt-1 shrink-0" />
                    Tìm kiếm theo Pinyin để luyện cách phát âm chuẩn xác.
                  </li>
                  <li className="flex items-start gap-3 text-xs text-duo-orange font-bold font-sans">
                    <div className="w-2 h-2 rounded-full bg-duo-yellow mt-1 shrink-0" />
                    Bấm vào mũi tên bài học để khám phá MindMap thông thái.
                  </li>
                </ul>
              </div>
              <div className="bg-[#EFFFEC] border-2 border-duo-green border-b-4 p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <h4 className="text-duo-green font-black uppercase text-[10px] tracking-widest mb-4 font-sans">THỐNG KÊ KHO DỮ LIỆU</h4>
                  <div className="text-4xl font-black text-slate-800 tracking-tight mb-2 font-mono">{allWords.length}</div>
                  <div className="text-xs font-black text-duo-green uppercase tracking-widest font-sans">Từ vựng & Mẫu câu có sẵn</div>
                </div>
                <div className="mt-6 flex items-center justify-between text-duo-green font-black text-xs font-sans">
                  <span>HỌC BÁ ĐANG SẴN SÀNG</span>
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-3 bg-duo-green rounded-full animate-pulse" />)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
