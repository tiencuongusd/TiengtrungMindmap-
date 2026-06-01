import React, { useState } from 'react';
import { BookOpen, ChevronRight, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { Lesson } from '../types';
import { cn } from '../lib/utils';

interface Props {
  lessons: Lesson[];
  onSelect: (lessonId: number) => void;
  isUnlocked?: boolean;
}

export const LessonListView: React.FC<Props> = ({ lessons, onSelect, isUnlocked = false }) => {
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

  const filteredLessons = lessons;

  const toggleComplete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const next = completedLessons.includes(id) 
      ? completedLessons.filter(i => i !== id)
      : [...completedLessons, id];
    setCompletedLessons(next);
    localStorage.setItem('completed_lessons', JSON.stringify(next));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-12">
        {filteredLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => {
              const isLocked = lesson.id >= 51 && !isUnlocked;
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
                    "group flex items-center p-6 bg-white border transition-all text-left shadow-sm hover:shadow-xl relative overflow-hidden cursor-pointer outline-none focus:ring-2 focus:ring-brand-red/20",
                    isLocked ? "border-slate-200/80 bg-slate-50/10" : (completedLessons.includes(lesson.id) ? "border-amber-400/30" : "border-black/10 hover:border-black"),
                    highlightedId === lesson.id && "ring-4 ring-brand-red ring-offset-2 z-10 scale-[1.02]"
                  )}
                >
                  <div className={cn(
                    "absolute top-0 left-0 w-1 h-full transition-opacity",
                    isLocked ? "bg-slate-300 opacity-60" : (completedLessons.includes(lesson.id) ? "bg-amber-400 opacity-100" : "bg-brand-red opacity-0 group-hover:opacity-100")
                  )} />
                  
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-brand-red uppercase tracking-widest flex items-center gap-1.5">
                        BÀI {String(lesson.id).padStart(3, '0')}
                        {isLocked && <Lock size={10} className="text-slate-400 shrink-0" />}
                      </span>
                      {completedLessons.includes(lesson.id) && !isLocked && (
                        <CheckCircle2 size={12} className="text-amber-500" />
                      )}
                    </div>
                    <h3 className={cn(
                      "text-lg font-bold truncate tracking-tight transition-colors",
                      isLocked ? "text-slate-500" : "text-[#1A1A1A] group-hover:text-brand-red"
                    )}>
                      {lesson.title}
                    </h3>

                  </div>

                  <div className="flex items-center gap-2">
                    {!isLocked && (
                      <button 
                        onClick={(e) => toggleComplete(e, lesson.id)}
                        className={cn(
                          "w-10 h-10 rounded-full border flex items-center justify-center transition-all",
                          completedLessons.includes(lesson.id) 
                            ? "border-amber-400 bg-amber-50 text-amber-500" 
                            : "border-black/5 text-black/20 hover:text-black hover:border-black"
                        )}
                        title={completedLessons.includes(lesson.id) ? 'Đánh dấu chưa học' : 'Đánh dấu đã học'}
                      >
                        {completedLessons.includes(lesson.id) ? <CheckCircle2 size={18} /> : <BookOpen size={18} />}
                      </button>
                    )}
                    <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-black/20 group-hover:text-black group-hover:border-black transition-all">
                      {isLocked ? <Lock size={15} className="text-slate-400" /> : <ChevronRight size={18} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full max-w-lg mx-auto py-16 px-8 bg-white border border-slate-200/80 rounded-3xl text-center shadow-sm">
            <div className="w-16 h-16 bg-red-50 text-brand-red rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Sparkles size={32} className="animate-pulse" />
            </div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase mb-2">Đang Biên Soạn Bài Học</h3>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              Các bài học, mẫu câu giao tiếp và sơ đồ tư duy MindMap cho chuyên ngành này đang được đội ngũ học thuật tổng hợp và thiết kế. Nội dung sẽ tự động cập nhật trong thời gian sớm nhất!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
