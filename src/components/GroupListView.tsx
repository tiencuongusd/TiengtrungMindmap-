import React, { useMemo } from 'react';
import { ChevronRight, Book, BookOpen, Briefcase, Award } from 'lucide-react';
import { LessonGroup } from '../types';
import { cn } from '../lib/utils';

interface Props {
  groups: LessonGroup[];
  onSelect: (groupId: number) => void;
}

export const GroupListView: React.FC<Props> = ({ groups, onSelect }) => {
  const [highlightedId, setHighlightedId] = React.useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = React.useState<number[]>([]);
  const [activePart, setActivePart] = React.useState<'part1' | 'part2'>('part1');

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
    const isSpecialPart = Number(topicId) > 10;
    
    return (
      <div key={topicId} className="space-y-4">
        {/* Topic Banner */}
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex-none flex items-center justify-center w-9 h-9 rounded-xl text-white font-extrabold text-sm border-2 border-white",
            isSpecialPart 
              ? "bg-duo-purple shadow-[0_4px_0_#8C1EDB]" 
              : "bg-duo-green shadow-[0_4px_0_#46A302]"
          )}>
            {topicId}
          </div>
          <div className="flex-1 border-b-2 border-duo-gray pb-1">
            <span className={cn(
              "text-[9px] font-black uppercase tracking-widest block mb-0.5",
              isSpecialPart ? "text-duo-purple" : "text-duo-green"
            )}>
              CHỦ ĐỀ {topicId}
            </span>
            <h2 className="text-base sm:text-lg font-black uppercase text-slate-800">
              {topicData.title}
            </h2>
          </div>
        </div>

        {/* Grid of Lesson Cards in Duolingo 3D Format */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topicData.groups.map((group) => {
            const groupCompletedCount = group.lessonIds.filter(id => completedLessons.includes(id)).length;
            const totalCount = group.lessonIds.length;
            const percent = totalCount > 0 ? Math.round((groupCompletedCount / totalCount) * 100) : 0;

            return (
              <div
                key={group.id}
                id={`group-${group.id}`}
                onClick={() => onSelect(group.id)}
                role="button"
                tabIndex={0}
                className={cn(
                  "group relative rounded-2xl bg-white border-2 border-duo-gray p-4 text-left transition-all duration-100 cursor-pointer outline-none select-none",
                  "border-b-4 hover:-translate-y-[2px] hover:border-b-6 hover:border-slate-400 active:translate-y-[2px] active:border-b-2 active:shadow-none shadow-[0_4px_0_#E5E5E5]",
                  highlightedId === group.id && "ring-4 ring-duo-yellow z-10"
                )}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-black tracking-tight uppercase leading-snug flex items-center gap-1.5 text-slate-800 group-hover:text-duo-blue">
                      {group.id}. {group.title}
                    </h3>
                    
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] bg-slate-100 border border-slate-200/60 px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-wider text-slate-500">
                        {totalCount} Bài Học
                      </span>
                      {groupCompletedCount > 0 && (
                        <span className="text-[9px] bg-[#EFFFEC] text-[#58CC02] border border-[#58CC02]/20 px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-wider flex items-center gap-1">
                          <Award size={10} className="text-duo-green fill-current" />
                          ĐÃ HOÀN THÀNH {groupCompletedCount}/{totalCount}
                        </span>
                      )}
                    </div>

                    {/* Progress Bar with deep 3D Duolingo look */}
                    {totalCount > 0 && (
                      <div className="mt-4 w-full h-3 bg-slate-100 border border-slate-200/50 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-500 relative flex justify-end items-center pr-1",
                            percent === 100 
                              ? "bg-duo-green border-b-2 border-duo-green-dark" 
                              : "bg-duo-blue border-b-2 border-duo-blue-dark"
                          )}
                          style={{ width: `${percent}%` }}
                        >
                          <div className="w-1.5 h-1 bg-white/40 rounded-full absolute top-0.5 left-1 right-1 h-[2px]" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 shadow-[0_2px_0_#E5E5E5] bg-white border-duo-gray text-slate-400 group-hover:bg-duo-blue group-hover:text-white group-hover:border-duo-blue-dark group-hover:shadow-[0_2px_0_#1899D6]">
                      <ChevronRight size={14} className="stroke-[3]" />
                    </div>
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
    <div className="space-y-8">
      {/* Category Tab Selector for Instant Discovery without Scrolling */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 p-5 sm:p-6 bg-white border-2 border-duo-gray border-b-4 rounded-3xl">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-black text-slate-800">LỘ TRÌNH CHINH PHỤC</h2>
          <p className="text-xs text-duo-sub font-bold">Lĩnh hội từ vựng qua phương thức Duolingo vui nhộn & trực quan</p>
        </div>
        
        <div className="grid grid-cols-2 bg-slate-100/90 p-1 rounded-2xl gap-1 shrink-0 w-full lg:w-[480px]">
          <button
            onClick={() => setActivePart('part1')}
            className={cn(
              "px-2 py-3 sm:px-4 rounded-xl text-[10px] xs:text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer text-center",
              activePart === 'part1'
                ? "bg-white text-slate-800 border-2 border-duo-gray border-b-4 shadow-[0_2.5px_0_#E5E5E5]"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            )}
          >
            <BookOpen size={13} className="stroke-[3] shrink-0" />
            <span className="leading-tight">Dành cho Đời Thường</span>
          </button>

          <button
            onClick={() => setActivePart('part2')}
            className={cn(
              "px-2 py-3 sm:px-4 rounded-xl text-[10px] xs:text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer text-center",
              activePart === 'part2'
                ? "bg-white text-slate-800 border-2 border-duo-gray border-b-4 shadow-[0_2.5px_0_#E5E5E5]"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            )}
          >
            <Briefcase size={13} className="stroke-[3] shrink-0" />
            <span className="leading-tight">Khối Chuyên Ngành</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: TIẾNG TRUNG THÔNG DỤNG */}
      {activePart === 'part1' && (
        <div className="space-y-6 transition-all duration-300">
          <div className="border-l-4 border-duo-green pl-4 py-0.5 flex items-baseline justify-between mb-4">
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-duo-green block mb-0.5">CẤP ĐỘ 1 • 100 Bộ từ vựng</span>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 uppercase">Phần 1: TIẾNG TRUNG THÔNG DỤNG</h2>
            </div>
            <span className="hidden sm:inline text-xs font-extrabold text-duo-green bg-[#EFFFEC] border border-[#58CC02]/10 px-3 py-1 rounded-full">Chủ đề 01 - 10</span>
          </div>
          
          <div className="space-y-8">
            {part1Topics.map(([topicId, topicData]) => renderTopicSection(topicId, topicData))}
          </div>
        </div>
      )}

      {/* SECTION 2: TIẾNG TRUNG CHUYÊN NGÀNH */}
      {part2Topics.length > 0 && activePart === 'part2' && (
        <div className="space-y-6 transition-all duration-300">
          <div className="border-l-4 border-duo-purple pl-4 py-0.5 flex items-baseline justify-between mb-4">
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-duo-purple block mb-0.5">CẤP ĐỘ 2 • 50 Bộ Chuyên Ngành</span>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 uppercase">Phần 2: TIẾNG TRUNG CHUYÊN NGÀNH</h2>
            </div>
            <span className="hidden sm:inline text-xs font-extrabold text-duo-purple bg-[#F8EFFF] border border-duo-purple/10 px-3 py-1 rounded-full">Chủ đề 11 - 15</span>
          </div>

          <div className="space-y-8">
            {part2Topics.map(([topicId, topicData]) => renderTopicSection(topicId, topicData))}
          </div>
        </div>
      )}
    </div>
  );
};
