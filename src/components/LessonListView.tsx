import React, { useState } from 'react';
import { BookOpen, ChevronRight, CheckCircle2, Sparkles, Star } from 'lucide-react';
import { Lesson } from '../types';
import { cn } from '../lib/utils';

interface Props {
  lessons: Lesson[];
  onSelect: (lessonId: number) => void;
}

export const LessonListView: React.FC<Props> = ({ lessons, onSelect }) => {
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    const saved = localStorage.getItem('completed_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    const lastId = sessionStorage.getItem('last_lesson_id');
    if (lastId) {
      const id = parseInt(lastId, 10);
      const timer = setTimeout(() => {
        const element = document.getElementById(`lesson-${id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightedId(id);
          setTimeout(() => setHighlightedId(null), 2500);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleComplete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const next = completedLessons.includes(id) 
      ? completedLessons.filter(i => i !== id)
      : [...completedLessons, id];
    setCompletedLessons(next);
    localStorage.setItem('completed_lessons', JSON.stringify(next));
  };

  return (
    <div className="space-y-6">
      {lessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson) => {
            const isFinished = completedLessons.includes(lesson.id);
            
            return (
              <div
                key={lesson.id}
                id={`lesson-${lesson.id}`}
                onClick={() => onSelect(lesson.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelect(lesson.id);
                  }
                }}
                role="button"
                tabIndex={0}
                className={cn(
                  "group relative rounded-2xl bg-white border-2 border-duo-gray p-4 text-left transition-all duration-100 cursor-pointer outline-none select-none",
                  "border-b-4 hover:-translate-y-[2px] hover:border-b-6 hover:border-slate-400 active:translate-y-[2px] active:border-b-2 active:shadow-none shadow-[0_4px_0_#E5E5E5]",
                  isFinished && "border-duo-yellow hover:border-duo-yellow-dark shadow-[0_4px_0_#FFC800]",
                  highlightedId === lesson.id && "ring-4 ring-duo-yellow z-10"
                )}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest flex items-center gap-1",
                        isFinished ? "text-duo-orange" : "text-duo-green"
                      )}>
                        BÀI {String(lesson.id).padStart(3, '0')}
                      </span>
                      {isFinished && (
                        <div className="bg-[#FFFCE6] text-duo-orange border border-duo-yellow/20 px-1.5 py-0.5 rounded-full flex items-center gap-1 text-[8px] font-black uppercase tracking-wider">
                          <Star size={8} className="fill-current text-duo-yellow" /> HOÀN TẤT
                        </div>
                      )}
                    </div>
                    <h4 className="text-sm sm:text-base font-black tracking-tight line-clamp-2 leading-tight transition-colors mb-4 text-slate-800 group-hover:text-duo-blue">
                      {lesson.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <button 
                      onClick={(e) => toggleComplete(e, lesson.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all border-2 border-b-4",
                        isFinished 
                          ? "bg-[#FFFCE6] border-duo-yellow text-duo-orange shadow-[0_2.5px_0_#FFC800] active:translate-y-[2px] active:border-b-2" 
                          : "bg-white border-duo-gray text-slate-500 hover:bg-slate-50 shadow-[0_2.5px_0_#E5E5E5] active:translate-y-[2px] active:border-b-2"
                      )}
                      title={isFinished ? 'Đánh dấu chưa học' : 'Đánh dấu đã học'}
                    >
                      {isFinished ? (
                        <>
                          <CheckCircle2 size={10} className="stroke-[3] text-duo-orange" />
                          <span>Đã học</span>
                        </>
                      ) : (
                        <>
                          <BookOpen size={10} className="stroke-[3] text-slate-500" />
                          <span>Chưa học</span>
                        </>
                      )}
                    </button>
                    
                    <div className="w-8 h-8 rounded-xl border-2 flex items-center justify-center shadow-[0_2px_0_#E5E5E5] bg-white border-duo-gray text-slate-400 group-hover:bg-duo-blue group-hover:text-white group-hover:border-duo-blue-dark group-hover:shadow-[0_2px_0_#1899D6]">
                      <ChevronRight size={14} className="stroke-[3]" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full max-w-lg mx-auto py-16 px-8 bg-white border-2 border-duo-gray border-b-4 rounded-3xl text-center">
          <div className="w-16 h-16 bg-[#FFF2F2] border-2 border-duo-red-dark text-duo-red rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_4px_0_#EA2B2B]">
            <Sparkles size={32} className="stroke-[2.5] animate-pulse" />
          </div>
          <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase mb-2">Đang Biên Soạn Bài Học</h3>
          <p className="text-xs font-bold text-duo-sub leading-relaxed">
            Các bài học, mẫu câu giao tiếp và sơ đồ tư duy MindMap cho chuyên ngành này đang được đội ngũ học thuật tổng hợp và thiết kế. Nội dung sẽ tự động cập nhật trong thời gian sớm nhất!
          </p>
        </div>
      )}
    </div>
  );
};
