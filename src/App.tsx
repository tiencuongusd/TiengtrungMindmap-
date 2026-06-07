/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Heart, Search, Star } from 'lucide-react';
import { Header } from './components/Header';
import { LessonListView } from './components/LessonListView';
import { GroupListView } from './components/GroupListView';
import { MindMap } from './components/MindMap';
import { MindMapNode } from './components/MindMapNode';
import { DictionaryView } from './components/DictionaryView';
import { ContactView } from './components/ContactView';
import { PolicyModal } from './components/PolicyModal';
import { GuidelineModal } from './components/GuidelineModal';
import { BookmarkModal } from './components/BookmarkModal';
import { APP_CONFIG } from './constants';
import { lessons } from './data/lessons';
import { groups } from './data/groups';
import { Lesson } from './types';
import { StrokeOrderWriter } from './components/StrokeOrderWriter';
import { FlashcardMode } from './components/FlashcardMode';
import { useAudioPlayback } from './lib/audio';
import { ListeningQuiz } from './components/ListeningQuiz';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'lessons' | 'vocab'>('lessons');
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [globalSearch, setGlobalSearch] = useState('');
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isGuidelineOpen, setIsGuidelineOpen] = useState(false);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Listen to PWA install prompt
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall as any);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall as any);
    };
  }, []);

  const handleSaveToHomeScreen = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted PWA installation');
        }
        setDeferredPrompt(null);
      });
    } else {
      // Direct file shortcut download for desktop, or modal fallback
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      if (!isMobile) {
        try {
          const url = window.location.href;
          const title = "Hoc_Tieng_Trung_MindMap";
          
          // Create Internet Shortcut format file content
          const fileContent = `[InternetShortcut]\nURL=${url}\nIconIndex=0\n`;
          const blob = new Blob([fileContent], { type: 'text/url' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `${title}.url`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } catch (error) {
          console.error("Failed to download shortcut file", error);
        }
      }
      setIsBookmarkOpen(true);
    }
  };

  // Character Writing State
  const [activeWritingWord, setActiveWritingWord] = useState<string>('');
  const [activeSectionTab, setActiveSectionTab] = useState<'mindmap' | 'writer' | 'flashcard' | 'quiz'>('mindmap');

  const handleGroupSelect = (id: number) => {
    setSelectedGroupId(id);
    setGlobalSearch(''); // Clear search when entering a group
    sessionStorage.setItem('last_group_id', String(id));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const backToGroups = () => {
    setSelectedGroupId(null);
  };

  const handleLessonSelect = (id: number) => {
    setSelectedLessonId(id);
    sessionStorage.setItem('last_lesson_id', id.toString());
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const selectedGroup = useMemo(() => 
    groups.find(g => g.id === selectedGroupId),
    [selectedGroupId]
  );

  const filteredLessons = useMemo(() => {
    if (!selectedGroupId) return [];
    return lessons.filter(l => selectedGroup?.lessonIds.includes(l.id));
  }, [selectedGroupId, selectedGroup]);

  const selectedLesson = useMemo(() => 
    lessons.find(l => l.id === selectedLessonId), 
    [selectedLessonId]
  );

  const nextLesson = useMemo(() => {
    if (!selectedLessonId || filteredLessons.length === 0) return null;
    const currentIndex = filteredLessons.findIndex(l => l.id === selectedLessonId);
    if (currentIndex !== -1 && currentIndex + 1 < filteredLessons.length) {
      return filteredLessons[currentIndex + 1];
    }
    return null;
  }, [selectedLessonId, filteredLessons]);

  const playback = useAudioPlayback();

  // Automatically reset the active writing word to the lesson's main keyword on selection
  useEffect(() => {
    if (selectedLessonId && selectedLesson) {
      const mainWord = selectedLesson.mindMaps?.[0]?.chinese || '';
      setActiveWritingWord(mainWord);
      setActiveSectionTab('mindmap');
    } else {
      setActiveWritingWord('');
    }
  }, [selectedLessonId, selectedLesson]);

  // Sync writing word with whatever is spoken during study sessions
  useEffect(() => {
    if (playback.isSpeaking && playback.text) {
      const hasChinese = /[\u4e00-\u9fa5]/.test(playback.text);
      if (hasChinese) {
        setActiveWritingWord(playback.text);
      }
    }
  }, [playback.isSpeaking, playback.text]);

  const globalSearchResults = useMemo(() => {
    if (!globalSearch.trim()) return [];
    const s = globalSearch.toLowerCase();
    return lessons.filter(l => 
      l.title.toLowerCase().includes(s) || 
      l.id.toString().includes(s) ||
      (l.description && l.description.toLowerCase().includes(s))
    );
  }, [globalSearch]);

  const renderContent = () => {
    // Lesson Detail View
    if (activeTab === 'lessons' && selectedLessonId && selectedLesson) {
      return (
        <motion.div
          key="lesson-detail"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-12 max-w-5xl mx-auto"
        >
          {/* Top Header Card */}
          <div className="bg-white border-2 border-duo-gray border-b-4 rounded-2xl md:rounded-3xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedLessonId(null)}
                  className="p-2.5 md:p-3 bg-white border-2 border-duo-gray border-b-4 hover:border-slate-400 active:translate-y-[2px] active:border-b-2 rounded-xl md:rounded-2xl text-slate-600 flex-shrink-0 select-none cursor-pointer duration-100"
                  title="Quay lại"
                >
                  <ChevronLeft size={20} className="md:w-6 md:h-6 stroke-[3]" />
                </button>
                <div className="min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-widest text-duo-green mb-1">Nội dung bài học</div>
                  <h3 className="text-xl md:text-3xl font-black tracking-tight text-slate-800 truncate">
                    Bài {selectedLesson.id}: {selectedLesson.title}
                  </h3>
                </div>
              </div>

              {selectedLesson.mindMaps && selectedLesson.mindMaps[0] && (
                <div className="flex-shrink-0 flex justify-center md:justify-end">
                  <MindMapNode node={selectedLesson.mindMaps[0]} level={0} hideBadge={true} />
                </div>
              )}
            </div>
          </div>

          {/* Beautiful Rounded Tab Selector from User's Screenshot */}
          <div className="bg-slate-100 p-1 rounded-[1.5rem] md:rounded-[2.25rem] flex flex-row gap-1.5 max-w-2xl mx-auto w-full border-2 border-duo-gray items-stretch">
            <button
              onClick={() => setActiveSectionTab('mindmap')}
              className={`flex-1 py-2 sm:py-3 px-1 sm:px-4 rounded-[1.1rem] md:rounded-[1.75rem] font-black text-[9.5px] min-[360px]:text-[10px] min-[400px]:text-[11px] sm:text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-150 active:scale-[0.98] cursor-pointer border-2 border-b-4 select-none whitespace-nowrap ${
                activeSectionTab === 'mindmap'
                  ? 'bg-white text-slate-800 border-[#E5E5E5] shadow-[0_2.5px_0_#E5E5E5]'
                  : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-white/40'
              }`}
            >
              <span className="hidden min-[390px]:inline">🗺️</span>
              <span className="hidden sm:inline">Sơ đồ tư duy</span>
              <span className="sm:hidden">Sơ đồ</span>
            </button>
            <button
              onClick={() => setActiveSectionTab('writer')}
              className={`flex-1 py-2 sm:py-3 px-1 sm:px-4 rounded-[1.1rem] md:rounded-[1.75rem] font-black text-[9.5px] min-[360px]:text-[10px] min-[400px]:text-[11px] sm:text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-150 active:scale-[0.98] cursor-pointer border-2 border-b-4 select-none whitespace-nowrap ${
                activeSectionTab === 'writer'
                  ? 'bg-white text-slate-800 border-[#E5E5E5] shadow-[0_2.5px_0_#E5E5E5]'
                  : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-white/40'
              }`}
            >
              <span className="hidden min-[390px]:inline">✍️</span>
              <span className="hidden sm:inline">Tập viết chữ</span>
              <span className="sm:hidden">Tập viết</span>
            </button>
            <button
              onClick={() => setActiveSectionTab('flashcard')}
              className={`flex-1 py-2 sm:py-3 px-1 sm:px-4 rounded-[1.1rem] md:rounded-[1.75rem] font-black text-[9.5px] min-[360px]:text-[10px] min-[400px]:text-[11px] sm:text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-150 active:scale-[0.98] cursor-pointer border-2 border-b-4 select-none whitespace-nowrap ${
                activeSectionTab === 'flashcard'
                  ? 'bg-white text-slate-800 border-[#E5E5E5] shadow-[0_2.5px_0_#E5E5E5]'
                  : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-white/40'
              }`}
            >
              <span className="hidden min-[390px]:inline">🔄</span>
              <span className="hidden sm:inline">Luyện dịch</span>
              <span className="sm:hidden">Luyện dịch</span>
            </button>
            <button
              onClick={() => setActiveSectionTab('quiz')}
              className={`flex-1 py-2 sm:py-3 px-1 sm:px-4 rounded-[1.1rem] md:rounded-[1.75rem] font-black text-[9.5px] min-[360px]:text-[10px] min-[400px]:text-[11px] sm:text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-150 active:scale-[0.98] cursor-pointer border-2 border-b-4 select-none whitespace-nowrap ${
                activeSectionTab === 'quiz'
                  ? 'bg-white text-slate-800 border-[#E5E5E5] shadow-[0_2.5px_0_#E5E5E5]'
                  : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-white/40'
              }`}
            >
              <span className="hidden min-[390px]:inline">🎧</span>
              <span className="hidden sm:inline">Luyện nghe</span>
              <span className="sm:hidden">Nghe dịch</span>
            </button>
          </div>

          {/* Active Tab Panel with smooth fade/slide transition */}
          <div className="w-full mt-4">
            <AnimatePresence mode="wait">
              {activeSectionTab === 'mindmap' && (
                <motion.div
                  key="mindmap-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="bg-white border-2 border-duo-gray border-b-4 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col min-h-[50vh] md:min-h-[60vh]">
                    <div className="flex-1 paper-bg relative flex flex-col">
                      <div className="absolute top-4 left-4 md:top-8 md:left-8 text-[8px] md:text-[10px] font-black text-black/10 uppercase tracking-tighter">MindMap View v1.2.0</div>
                      
                      <div className="flex-1 flex flex-col p-4 md:p-12">
                        {selectedLesson.mindMaps && selectedLesson.mindMaps.length > 0 ? (
                          <MindMap rootNodes={selectedLesson.mindMaps} />
                        ) : (
                          <div className="text-center p-12 md:p-20 mx-auto max-w-sm w-full">
                            <div className="text-3xl md:text-4xl text-black/5 font-black uppercase tracking-tighter mb-4">Updating</div>
                            <p className="text-black/30 font-bold uppercase text-[9px] md:text-[10px] tracking-widest">Nội dung MindMap cho bài này đang được biên soạn.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSectionTab === 'writer' && (
                <motion.div
                  key="writer-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 max-w-2xl mx-auto w-full"
                >
                  <div className="text-center px-4 mb-2">
                    <p className="text-xs text-slate-400 font-bold">Luyện viết chữ Hán theo quy tắc nét bút thuận (Hãy quay lại Tab Sơ đồ tư duy và nhấn vào từ bất kỳ để viết từ đó)</p>
                  </div>
                  <StrokeOrderWriter word={activeWritingWord || selectedLesson.mindMaps?.[0]?.chinese || ''} />
                </motion.div>
              )}

              {activeSectionTab === 'flashcard' && (
                <motion.div
                  key="flashcard-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 max-w-4xl mx-auto w-full"
                >
                  <FlashcardMode 
                    lesson={selectedLesson} 
                    hideHeader={true}
                    nextLesson={nextLesson}
                    onSelectNextLesson={handleLessonSelect}
                  />
                </motion.div>
              )}

              {activeSectionTab === 'quiz' && (
                <motion.div
                  key="quiz-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 max-w-2xl mx-auto w-full"
                >
                  <ListeningQuiz
                    lesson={selectedLesson}
                    onBackToMap={() => setActiveSectionTab('mindmap')}
                    nextLesson={nextLesson}
                    onSelectNextLesson={handleLessonSelect}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      );
    }

    // Tab Views
    switch (activeTab) {
      case 'lessons':
        if (selectedGroupId) {
          return (
            <motion.div
              key="lesson-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-8 md:mb-12 border-b border-black/5 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <button 
                    onClick={backToGroups}
                    className="flex items-center gap-2 text-[10px] font-black text-brand-red uppercase tracking-[0.2em] mb-4 hover:opacity-70 transition-opacity"
                  >
                    <ChevronLeft size={14} /> Quay lại danh mục
                  </button>
                  <h2 className="text-2xl md:text-4xl font-black text-[#1A1A1A] tracking-tight leading-tight">
                    {selectedGroup?.title}
                  </h2>
                  <p className="text-black/40 mt-4 font-medium text-sm">
                    {selectedGroup?.description} • {filteredLessons.length} bài học
                  </p>
                </div>
              </div>
              <LessonListView lessons={filteredLessons} onSelect={handleLessonSelect} />
            </motion.div>
          );
        }
        return (
          <motion.div
            key="group-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-8 md:mb-12">
              <div className="text-[10px] font-black text-brand-red uppercase tracking-[0.2em] mb-2 font-sans">Học tiếng Trung online cơ bản</div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight uppercase leading-snug sm:leading-tight">HỌC TỪ VỰNG TIẾNG TRUNG<br className="hidden xs:block"/> MINDMAP</h1>
              <p className="text-black/40 mt-4 md:mt-6 max-w-md font-medium text-sm md:text-base">Bí quyết chinh phục từ vựng tiếng Trung thần tốc thông qua sơ đồ tư duy - phương pháp ghi nhớ hiệu quả nhất hiện nay.</p>
            </div>

            <div className="mb-12">
              <div className="max-w-2xl relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-brand-red transition-colors" />
                <input 
                  type="text"
                  placeholder="Tìm kiếm bài học theo tên hoặc số thứ tự..."
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className="w-full bg-white border border-black/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all font-bold placeholder:text-black/20 text-sm"
                />
              </div>
            </div>

            {globalSearch.trim() ? (
              <div className="space-y-8">
                <div className="flex items-center gap-2 text-black/40 text-[10px] uppercase font-black tracking-widest border-b border-black/5 pb-4">
                  Kết quả tìm kiếm cho "{globalSearch}"
                </div>
                <LessonListView lessons={globalSearchResults} onSelect={handleLessonSelect} />
              </div>
            ) : (
              <GroupListView groups={groups} onSelect={handleGroupSelect} />
            )}
          </motion.div>
        );
      
      case 'vocab':
        return (
          <motion.div
            key="vocab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DictionaryView 
              lessons={lessons} 
              onSelectLesson={(id) => {
                setSelectedLessonId(id);
                setActiveTab('lessons');
              }}
            />
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab);
        if (tab === 'lessons') {
          setSelectedLessonId(null);
          setSelectedGroupId(null);
        } else if (tab === 'vocab') {
          setSelectedLessonId(null);
        }
      }} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 md:py-12">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      <footer className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-brand-red rounded flex items-center justify-center text-white text-[10px] font-black italic">M</div>
                <span className="font-black text-[#1A1A1A] uppercase tracking-tighter text-sm">MindMap Chinese</span>
              </div>
              <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest flex items-center">
                Make with <Heart size={10} className="mx-1 text-brand-red fill-current" /> by Mindmap Tiếng Trung Team
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 sm:gap-8 justify-center md:justify-end">
              <div className="text-center md:text-right">
                <p className="text-[10px] font-black text-black/20 uppercase tracking-widest mb-1">Tiện ích</p>
                <button 
                  onClick={handleSaveToHomeScreen} 
                  className="text-xs font-bold text-brand-red hover:underline cursor-pointer flex items-center justify-center md:justify-end gap-1 font-sans"
                >
                  <Star size={11} className="text-brand-red fill-current" />
                  Lưu lại trên trang chủ
                </button>
              </div>
              <div className="text-center md:text-right">
                <p className="text-[10px] font-black text-black/20 uppercase tracking-widest mb-1">Phiên bản</p>
                <p className="text-xs font-bold text-black/60">V1.2.0 (Stable)</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-[10px] font-black text-black/20 uppercase tracking-widest mb-1">Giới thiệu</p>
                <button 
                  onClick={() => setIsGuidelineOpen(true)} 
                  className="text-xs font-bold text-brand-red hover:underline cursor-pointer"
                >
                  Cách học & Phương pháp
                </button>
              </div>
              <div className="text-center md:text-right">
                <p className="text-[10px] font-black text-black/20 uppercase tracking-widest mb-1">Pháp lý</p>
                <button 
                  onClick={() => setIsPolicyOpen(true)} 
                  className="text-xs font-bold text-brand-red hover:underline cursor-pointer"
                >
                  Điều khoản & Bảo mật
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isBookmarkOpen && (
          <BookmarkModal 
            isOpen={isBookmarkOpen} 
            onClose={() => setIsBookmarkOpen(false)} 
            deferredPrompt={deferredPrompt}
            setDeferredPrompt={setDeferredPrompt}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isGuidelineOpen && (
          <GuidelineModal isOpen={isGuidelineOpen} onClose={() => setIsGuidelineOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPolicyOpen && (
          <PolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}
