import React, { useMemo } from 'react';
import { ChevronRight, Book, Lock } from 'lucide-react';
import { LessonGroup } from '../types';
import { cn } from '../lib/utils';

interface Props {
  groups: LessonGroup[];
  onSelect: (groupId: number) => void;
  isUnlocked?: boolean;
}

export const GroupListView: React.FC<Props> = ({ groups, onSelect, isUnlocked = false }) => {
  const [highlightedId, setHighlightedId] = React.useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = React.useState<number[]>([]);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('completed_lessons');
      if (saved) {
        setCompletedLessons(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load completed lessons', e);
    }

    const lastId = sessionStorage.getItem('last_group_id');
    if (lastId) {
      const id = parseInt(lastId, 10);
      const timer = setTimeout(() => {
        const element = document.getElementById(`group-${id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightedId(id);
          setTimeout(() => setHighlightedId(null), 2500);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  const groupedByTopic = useMemo(() => {
    const map: Record<number, { title: string; groups: LessonGroup[] }> = {};
    groups.forEach(group => {
      if (!map[group.topicId]) {
        map[group.topicId] = { title: group.topicTitle, groups: [] };
      }
      map[group.topicId].groups.push(group);
    });
    return Object.entries(map).sort(([a], [b]) => Number(a) - Number(b));
  }, [groups]);

  const part1Topics = useMemo(() => {
    return groupedByTopic.filter(([topicId]) => Number(topicId) <= 10);
  }, [groupedByTopic]);

  const part2Topics = useMemo(() => {
    return groupedByTopic.filter(([topicId]) => Number(topicId) > 10);
  }, [groupedByTopic]);

  const renderTopicSection = (topicId: string, topicData: { title: string; groups: LessonGroup[] }) => {
    return (
      <div key={topicId} className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="flex-none flex items-center justify-center w-10 h-10 text-white font-black text-lg italic shadow-lg bg-brand-red shadow-brand-red/20">
            {topicId}
          </div>
          <div className="flex-1 border-b border-black/10 pb-2">
            <span className="text-[10px] font-black uppercase tracking-widest block mb-1 text-brand-red">
              Chủ đề {topicId}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter italic text-[#1A1A1A]">
              {topicData.title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {topicData.groups.map((group) => {
            const groupCompletedCount = group.lessonIds.filter(id => completedLessons.includes(id)).length;
            const totalCount = group.lessonIds.length;
            const percent = totalCount > 0 ? Math.round((groupCompletedCount / totalCount) * 100) : 0;
            const isLocked = group.id >= 6 && !isUnlocked;

            return (
              <div
                key={group.id}
                id={`group-${group.id}`}
                onClick={() => onSelect(group.id)}
                role="button"
                tabIndex={0}
                className={cn(
                  "group flex flex-col sm:flex-row sm:items-center p-4 sm:p-5 bg-white border transition-all text-left shadow-sm hover:shadow-xl relative overflow-hidden cursor-pointer outline-none",
                  isLocked ? "border-slate-200 bg-slate-50/10" : "border-black/10 hover:border-black",
                  highlightedId === group.id && "ring-4 ring-brand-red ring-offset-2 z-10 scale-[1.02]"
                )}
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                  {isLocked ? <Lock size={60} className="rotate-12 translate-x-4 -translate-y-4 text-slate-400" /> : <Book size={60} className="rotate-12 translate-x-4 -translate-y-4" />}
                </div>
                
                <div className={cn(
                  "absolute top-0 left-0 w-1.5 h-full opacity-0 transition-opacity group-hover:opacity-100",
                  isLocked ? "bg-slate-400" : "bg-brand-red"
                )} />
                
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className={cn(
                    "text-lg sm:text-xl font-black tracking-tighter uppercase leading-tight transition-colors flex items-center gap-2",
                    isLocked ? "text-slate-500" : "text-[#1A1A1A] group-hover:text-brand-red"
                  )}>
                    {group.id}. {group.title}
                    {isLocked && <Lock size={16} className="text-slate-400 shrink-0 animate-pulse" />}
                  </h3>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] bg-black/5 px-2 py-0.5 font-bold uppercase tracking-wider text-black/60">
                        {totalCount} Bài học
                      </span>
                      {groupCompletedCount > 0 && !isLocked && (
                        <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-600/10 px-2 py-0.5 font-bold uppercase tracking-wider">
                          Đã học {groupCompletedCount}/{totalCount}
                        </span>
                      )}
                      {isLocked && (
                        <span className="text-[10px] bg-slate-100 text-slate-500 border border-slate-200/50 px-2 py-0.5 font-bold uppercase tracking-wider flex items-center gap-1">
                          <Lock size={10} /> Đang Khóa
                        </span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {!isLocked ? (
                      totalCount > 0 ? (
                        <div className="space-y-1">
                          <div className="w-full max-w-xs h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all duration-500",
                                percent === 100 ? "bg-emerald-500" : "bg-brand-red"
                              )}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <div className="flex justify-between items-center max-w-xs text-[9px] font-semibold text-slate-400">
                            <span className="uppercase tracking-wider">Tiến độ</span>
                            <span>{percent}%</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          📚 Nội dung sắp cập nhật
                        </div>
                      )
                    ) : (
                      <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1 bg-slate-100/50 p-2 rounded-lg border border-slate-200/30 w-fit">
                        🔒 Nhập mật khẩu để mở khóa học
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0 ml-auto sm:ml-0 overflow-hidden">
                  <div className="hidden lg:flex flex-col items-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <span className={cn(
                      "text-[8px] font-black uppercase tracking-[0.2em] mb-1",
                      isLocked ? "text-slate-400" : "text-brand-red"
                    )}>
                      {isLocked ? "Mật khẩu" : "Mở bài học"}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {isLocked ? "Nhập mã" : "Xem ngay"}
                    </span>
                  </div>
                  <div className={cn(
                    "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 border-black/5 text-black/20 group-hover:text-black group-hover:border-black group-hover:bg-black group-hover:text-white",
                    isLocked && "group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800"
                  )}>
                    {isLocked ? <Lock size={15} /> : <ChevronRight size={18} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-16">
      {/* SECTION 1: TIẾNG TRUNG CƠ BẢN */}
      <div className="space-y-10">
        <div className="border-l-4 border-slate-900 pl-4 py-1 flex items-baseline justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 block mb-1">Cấp độ 1 • 100 Bộ từ vựng</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">Phần 1: Tiếng Trung Cơ Bản</h2>
          </div>
          <span className="hidden sm:inline text-xs font-mono font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">Chủ đề 01 - 10</span>
        </div>
        
        <div className="space-y-12">
          {part1Topics.map(([topicId, topicData]) => renderTopicSection(topicId, topicData))}
        </div>
      </div>

      {/* SECTION 2: TIẾNG TRUNG CHUYÊN NGÀNH */}
      {part2Topics.length > 0 && (
        <div className="space-y-10 pt-16 border-t border-slate-200">
          <div className="border-l-4 border-brand-red pl-4 py-1 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-red/60 block mb-1">Cấp độ 2 • 50 Bộ Chuyên Ngành</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1A1A1A] uppercase">Phần 2: Tiếng Trung Chuyên Ngành</h2>
            </div>
            <span className="hidden sm:inline text-xs font-mono font-bold text-brand-red bg-red-50 text-brand-red/80 px-3 py-1.5 rounded-full">Chủ đề 11 - 15</span>
          </div>

          <div className="space-y-12">
            {part2Topics.map(([topicId, topicData]) => renderTopicSection(topicId, topicData))}
          </div>
        </div>
      )}
    </div>
  );
};
