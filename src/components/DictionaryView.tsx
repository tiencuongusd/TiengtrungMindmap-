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
        <div className="text-[10px] font-black text-brand-red uppercase tracking-[0.2em] mb-4">Từ điển MindMap</div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-8">Tra cứu học tiếng Trung online</h2>
        
        <div className="relative group">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="NHẬP TIẾNG VIỆT, TIẾNG TRUNG HOẶC PINYIN..."
            className="w-full px-8 py-6 bg-white border-2 border-slate-200 rounded-[2rem] text-xl font-bold placeholder:text-slate-300 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all shadow-sm"
          />
          <Search className={cn(
            "absolute right-8 top-1/2 -translate-y-1/2 transition-colors",
            searchTerm ? "text-amber-500" : "text-slate-300"
          )} size={28} />
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
                          ? "text-red-500 font-black scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" 
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
                  className="bg-white border border-slate-200 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md hover:border-amber-200 transition-all hover:-translate-y-1 group"
                >
                  <div className="flex items-start gap-6 no-select">
                    <div className={cn(
                      "min-w-[4.5rem] md:min-w-[6rem] h-20 px-3 flex items-center justify-center rounded-2xl border transition-colors",
                      isCurrentText 
                        ? "bg-red-50/50 border-red-200" 
                        : "bg-slate-50 border-slate-100 group-hover:bg-amber-50"
                    )}>
                      <span className="text-xl md:text-2xl chinese-char text-slate-800 text-center leading-tight">
                        {renderChineseText()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-lg font-bold text-slate-800">{word.pinyin}</span>
                        <button 
                          onClick={() => {
                            if (isCurrentText) {
                              stopChineseAudio();
                            } else {
                              playChineseAudio(word.chinese);
                            }
                          }}
                          className={cn(
                            "p-1.5 rounded-lg transition-all",
                            isCurrentText
                              ? "bg-red-50 text-red-600 animate-pulse"
                              : "text-slate-300 hover:text-amber-500 hover:bg-amber-50"
                          )}
                          title={isCurrentText ? "Dừng đọc" : "Đọc âm thanh"}
                        >
                          {isCurrentText ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                      </div>
                    <div className="flex items-center gap-2 text-amber-600 font-medium">
                      <span>{word.vietnamese}</span>
                      {word.hint && settings.showVietnameseHint !== false && <span className="text-xs text-slate-400 font-normal">({word.hint})</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="block text-[10px] font-black uppercase text-slate-400">Từ bài học</span>
                    <span className="text-xs font-bold text-slate-600">{word.lessonTitle}</span>
                  </div>
                  <button 
                    onClick={() => onSelectLesson(word.lessonId)}
                    className="w-12 h-12 bg-slate-100 flex items-center justify-center rounded-2xl text-slate-400 hover:bg-[#1A1A1A] hover:text-white transition-all group/btn"
                  >
                    <ArrowRight size={20} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })
          ) : searchTerm.trim() ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200"
            >
              <div className="text-slate-300 font-black text-2xl uppercase tracking-tighter mb-2">Không tìm thấy kết quả</div>
              <p className="text-slate-400 text-sm font-medium">Thử tìm kiếm theo cách khác nhé!</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2rem]">
                <h4 className="text-amber-800 font-black uppercase text-xs tracking-widest mb-4">Mẹo tra cứu</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-amber-700/70 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" />
                    Có thể gõ tiếng Việt không dấu
                  </li>
                  <li className="flex items-start gap-3 text-sm text-amber-700/70 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" />
                    Tìm kiếm theo Pinyin để luyện đọc
                  </li>
                  <li className="flex items-start gap-3 text-sm text-amber-700/70 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" />
                    Bấm vào tên bài học để xem MindMap
                  </li>
                </ul>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] flex flex-col justify-between">
                <div>
                  <h4 className="text-white/40 font-black uppercase text-xs tracking-widest mb-4">Thống kê dữ liệu</h4>
                  <div className="text-4xl font-black text-white tracking-tighter mb-2">{allWords.length}</div>
                  <div className="text-xs font-bold text-white/30 uppercase tracking-widest">Từ vựng & Mẫu câu</div>
                </div>
                <div className="mt-6 flex items-center justify-between text-amber-400">
                  <span className="text-xs font-bold uppercase tracking-widest">Database sẵn sàng</span>
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => <div key={i} className="w-1 h-3 bg-amber-400 rounded-full" />)}
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
