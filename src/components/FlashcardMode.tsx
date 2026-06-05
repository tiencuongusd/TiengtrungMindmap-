import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  RotateCcw, 
  Shuffle, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  X, 
  Trophy, 
  Layers, 
  Keyboard, 
  BookOpen, 
  Sparkles,
  HelpCircle,
  Eye
} from 'lucide-react';
import { Lesson, MindMapNode } from '../types';
import { playChineseAudio } from '../lib/audio';
import { cn } from '../lib/utils';
import { Confetti } from './Confetti';

interface Props {
  lesson: Lesson;
  onBackToMindmap?: () => void;
  hideHeader?: boolean;
}

interface FlashcardItem {
  chinese: string;
  pinyin: string;
  vietnamese: string;
  hint?: string;
  level: number; // Node depth from MindMap
  originalNode: MindMapNode;
}

export const FlashcardMode: React.FC<Props> = ({ lesson, onBackToMindmap, hideHeader = false }) => {
  // --- States ---
  const [frontSideMode, setFrontSideMode] = useState<'chinese' | 'vietnamese'>('chinese');
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const [isShowingHotkeys, setIsShowingHotkeys] = useState(false);

  // Learning history tracking
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [reviewIds, setReviewIds] = useState<Set<string>>(new Set());
  const [showSummary, setShowSummary] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  // Trigger celebration on completion
  useEffect(() => {
    if (showSummary) {
      setIsCelebrating(true);
    }
  }, [showSummary]);

  // --- Collect cards from MindMap ---
  const rawCards = useMemo(() => {
    if (!lesson.mindMaps) return [];
    
    const list: FlashcardItem[] = [];
    const seen = new Set<string>();

    lesson.mindMaps.forEach(rootNode => {
      // Add the master/root word (Từ chính)
      const rootKey = `${rootNode.chinese}-${rootNode.vietnamese}`;
      if (!seen.has(rootKey)) {
        list.push({
          chinese: rootNode.chinese,
          pinyin: rootNode.pinyin,
          vietnamese: rootNode.vietnamese,
          hint: rootNode.vietnameseHint,
          level: 0,
          originalNode: rootNode,
        });
        seen.add(rootKey);
      }

      // Add up to 3 direct children as sub-words (Từ phụ)
      if (rootNode.children) {
        const topChildren = rootNode.children.slice(0, 3);
        topChildren.forEach(child => {
          const childKey = `${child.chinese}-${child.vietnamese}`;
          if (!seen.has(childKey)) {
            list.push({
              chinese: child.chinese,
              pinyin: child.pinyin,
              vietnamese: child.vietnamese,
              hint: child.vietnameseHint,
              level: 1,
              originalNode: child,
            });
            seen.add(childKey);
          }
        });
      }
    });

    return list;
  }, [lesson]);

  // --- Filtered & Shuffled cards ---
  const finalCards = rawCards;

  // Shuffled array storage
  const [cardsOrder, setCardsOrder] = useState<number[]>([]);

  // Synchronize order array with current set
  useEffect(() => {
    const indices = Array.from({ length: finalCards.length }, (_, idx) => idx);
    if (shuffled) {
      // Fisher-Yates Shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
    }
    setCardsOrder(indices);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowSummary(false);
  }, [finalCards, shuffled]);

  const currentCard = useMemo(() => {
    if (finalCards.length === 0 || cardsOrder.length === 0 || currentIndex >= cardsOrder.length) {
      return null;
    }
    return finalCards[cardsOrder[currentIndex]];
  }, [finalCards, cardsOrder, currentIndex]);

  // Play audio on new card when flipped to Chinese or first shown
  const playCardAudio = (text: string) => {
    playChineseAudio(text, false);
  };

  // --- Keyboard Shortcuts ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSummary || cardsOrder.length === 0) return;

      const actTag = document.activeElement?.tagName;
      if (actTag === 'INPUT' || actTag === 'TEXTAREA') return;

      switch(e.code) {
        case 'Space':
          e.preventDefault();
          setIsFlipped(prev => !prev);
          if (!isFlipped && currentCard) {
            playCardAudio(currentCard.chinese);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrev();
          break;
        case 'Digit1':
        case 'Numpad1':
          e.preventDefault();
          if (currentCard) markReview(currentCard.chinese);
          break;
        case 'Digit2':
        case 'Numpad2':
          e.preventDefault();
          if (currentCard) markMastered(currentCard.chinese);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, cardsOrder, isFlipped, currentCard, showSummary]);

  // --- Handlers ---
  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < cardsOrder.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 150);
    } else {
      setTimeout(() => {
        setShowSummary(true);
      }, 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
      }, 150);
    }
  };

  const markMastered = (itemChinese: string) => {
    setMasteredIds(prev => {
      const next = new Set(prev);
      next.add(itemChinese);
      return next;
    });
    setReviewIds(prev => {
      const next = new Set(prev);
      next.delete(itemChinese);
      return next;
    });
    handleNext();
  };

  const markReview = (itemChinese: string) => {
    setReviewIds(prev => {
      const next = new Set(prev);
      next.add(itemChinese);
      return next;
    });
    setMasteredIds(prev => {
      const next = new Set(prev);
      next.delete(itemChinese);
      return next;
    });
    handleNext();
  };

  const handleRestart = () => {
    setMasteredIds(new Set());
    setReviewIds(new Set());
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowSummary(false);
  };

  const handleReviewOnlyTroubled = () => {
    // Collect the cards that were marked for review
    const troubledIndices = cardsOrder.filter(idx => {
      const card = finalCards[idx];
      return reviewIds.has(card.chinese);
    });

    if (troubledIndices.length > 0) {
      setCardsOrder(troubledIndices);
      setCurrentIndex(0);
      setIsFlipped(false);
      setShowSummary(false);
    }
  };

  const masteryPercentage = useMemo(() => {
    if (cardsOrder.length === 0) return 0;
    const count = cardsOrder.filter(idx => masteredIds.has(finalCards[idx].chinese)).length;
    return Math.round((count / cardsOrder.length) * 100);
  }, [cardsOrder, finalCards, masteredIds]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Controls Header */}
      {!hideHeader && (
        <div className="flex items-center justify-between gap-4 p-5 sm:p-6 bg-white border border-slate-200/80 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onBackToMindmap?.()}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer text-slate-600"
              title="Quay lại sơ đồ"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-brand-red bg-red-50 px-2 py-0.5 rounded-full">Chế độ Thẻ ghi nhớ</span>
                <BookOpen size={11} className="text-slate-400" />
              </div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-800">
                Bài {lesson.id}: {lesson.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {showSummary ? (
          /* Finished State & Stats Summary Dashboard */
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 text-center shadow-lg relative overflow-hidden"
          >
            {/* Animated backdrop decoration */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#DE2910]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-md mx-auto space-y-6">
              <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-[2rem] flex items-center justify-center text-emerald-500 mx-auto shadow-sm">
                <Trophy size={36} className="animate-bounce" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 block">Hoàn thành bài luyện tập</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-none uppercase">Xuất sắc hoàn thành!</h3>
                <p className="text-xs text-slate-500 font-medium">Bạn đã hoàn thành xem qua toàn bộ hệ thống từ vựng bài {lesson.id}</p>
              </div>

              {/* Stat Indicators Grid */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-100 my-6">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tổng số từ</span>
                  <span className="text-xl font-black text-slate-800 font-mono">{cardsOrder.length}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider block">Đã thuộc</span>
                  <span className="text-xl font-black text-emerald-600 font-mono">
                    {cardsOrder.filter(idx => masteredIds.has(finalCards[idx].chinese)).length}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#DE2910] font-bold uppercase tracking-wider block">Cần ôn lại</span>
                  <span className="text-xl font-black text-[#DE2910] font-mono">
                    {cardsOrder.filter(idx => reviewIds.has(finalCards[idx].chinese)).length}
                  </span>
                </div>
              </div>

              {/* Progress Indicator Ring/Percentage bar */}
              <div className="space-y-2 bg-slate-50 border border-slate-200/50 rounded-2xl p-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                  <span>Tỷ lệ nhớ từ:</span>
                  <span className="font-mono text-emerald-600 text-sm">{masteryPercentage}%</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${masteryPercentage}%` }}
                    className="h-full bg-emerald-500 rounded-full"
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Dynamic Interactive Triggers */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleRestart}
                  className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-wider transition-all cursor-pointer hover:bg-slate-800 flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} />
                  Học lại từ đầu
                </button>

                {cardsOrder.filter(idx => reviewIds.has(finalCards[idx].chinese)).length > 0 && (
                  <button
                    onClick={handleReviewOnlyTroubled}
                    className="flex-1 py-4 bg-brand-red text-white rounded-2xl font-black uppercase text-xs tracking-wider transition-all cursor-pointer hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-red-500/10"
                  >
                    <Layers size={14} />
                    Chỉ ôn từ khó ({cardsOrder.filter(idx => reviewIds.has(finalCards[idx].chinese)).length})
                  </button>
                )}
                
                {onBackToMindmap && (
                  <button
                    onClick={onBackToMindmap}
                    className="py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-black uppercase text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center"
                  >
                    Sơ đồ MindMap
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : finalCards.length === 0 ? (
          /* Empty/Loading State */
          <div className="bg-white border border-slate-200 rounded-[2rem] p-12 text-center">
            <Layers size={48} className="mx-auto text-slate-300 mb-4 animate-pulse" />
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Không tìm thấy từ vựng nào để hiển thị.</p>
            <p className="text-xs text-slate-400 mt-1">Vui lòng kiểm tra lại bộ lọc góc trên bên phải.</p>
          </div>
        ) : (
          /* Flashcard Study UI Loop */
          <div className="space-y-4 sm:space-y-6">
            {/* Learn options and shortcuts toggle bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-50 border border-slate-200/60 p-3 sm:p-4 rounded-2xl">
              {/* Option Selector: Front side preference */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 text-center sm:text-left">Mặt trước tiên:</span>
                <div className="flex bg-slate-200/60 border border-slate-300/20 p-1 rounded-xl text-[11px] font-bold">
                  <button
                    onClick={() => {
                      setFrontSideMode('chinese');
                      setIsFlipped(false);
                    }}
                    className={cn(
                      "flex-1 sm:flex-none px-3 py-1.5 rounded-lg cursor-pointer transition-all uppercase text-[10px] tracking-wide",
                      frontSideMode === 'chinese' ? "bg-white text-slate-800 shadow-sm font-black" : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    Chữ Hán
                  </button>
                  <button
                    onClick={() => {
                      setFrontSideMode('vietnamese');
                      setIsFlipped(false);
                    }}
                    className={cn(
                      "flex-1 sm:flex-none px-3 py-1.5 rounded-lg cursor-pointer transition-all uppercase text-[10px] tracking-wide",
                      frontSideMode === 'vietnamese' ? "bg-white text-slate-800 shadow-sm font-black" : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    Tiếng Việt
                  </button>
                </div>
              </div>

              {/* Utility switches */}
              <div className="flex items-center gap-2 justify-center sm:justify-end">
                {/* Shuffle card option */}
                <button
                  onClick={() => setShuffled(prev => !prev)}
                  className={cn(
                    "px-3 py-2 border rounded-xl flex items-center gap-1.5 text-xs font-bold uppercase transition-all cursor-pointer",
                    shuffled 
                      ? "bg-amber-500/10 text-amber-600 border-amber-300/40" 
                      : "bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  )}
                  title="Xáo trộn thứ tự từ vựng"
                >
                  <Shuffle size={13} className={cn(shuffled && "animate-spin-slow")} />
                  Trộn thẻ
                </button>

                {/* Shortcut help button */}
                <button
                  onClick={() => setIsShowingHotkeys(p => !p)}
                  className={cn(
                    "p-2 border rounded-xl transition-all cursor-pointer flex items-center justify-center",
                    isShowingHotkeys 
                      ? "bg-slate-900 border-slate-900 text-white" 
                      : "bg-white border-slate-200 text-slate-400 hover:text-slate-600"
                  )}
                  title="Phím tắt nhanh"
                >
                  <Keyboard size={16} />
                </button>
              </div>
            </div>

            {/* Hotkeys instruction panel */}
            <AnimatePresence>
              {isShowingHotkeys && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-2xl overflow-hidden"
                >
                  <h4 className="text-[10px] font-black uppercase text-amber-800 mb-2 font-mono flex items-center gap-1">
                    <Keyboard size={11} />
                    Danh sách phím tắt học tập nhanh
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px] text-slate-600 font-bold">
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono text-[9px] shadow-sm">Space</kbd>
                      <span>Lật thẻ</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono text-[9px] shadow-sm">← / →</kbd>
                      <span>Thẻ trước / sau</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono text-[9px] shadow-sm">Phím 1</kbd>
                      <span>Cần ôn lại</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono text-[9px] shadow-sm">Phím 2</kbd>
                      <span>Đã thuộc</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress Header */}
            <div className="flex justify-between items-center px-1 sm:px-2 select-none">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                Thứ tự: <span className="text-slate-800 font-mono font-black text-xs">{currentIndex + 1}</span> / {cardsOrder.length}
              </span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                Ôn tập: <span className="text-brand-red font-mono font-black text-xs">{reviewIds.size}</span> | Thuộc: <span className="text-emerald-600 font-mono font-black text-xs">{masteredIds.size}</span>
              </span>
            </div>

            {/* 3D Flip Card Scene */}
            <div 
              className="relative w-full aspect-[4/3] xs:aspect-[4/3] sm:aspect-[1.5/1] md:aspect-[1.6/1] min-h-[290px] xs:min-h-[330px] sm:min-h-[360px] max-w-2xl mx-auto flex items-center justify-center cursor-pointer no-select"
              style={{ perspective: '1200px' }}
              onClick={() => setIsFlipped(f => !f)}
            >
              <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* FRONT FACE OF CARD (Shown when standard or not flipped) */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-white border border-slate-200 shadow-lg rounded-[1.8rem] sm:rounded-[2.5rem] p-4 xs:p-6 sm:p-10 flex flex-col justify-between overflow-hidden",
                    isFlipped ? "pointer-events-none" : ""
                  )}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Grid lines watermark design */}
                  <div className="absolute inset-0 bg-grid-slate-100 opacity-[0.1]" />
                  <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-slate-300 rounded-tl-xl opacity-30" />
                  <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-slate-300 rounded-tr-xl opacity-30" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-slate-300 rounded-bl-xl opacity-30" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-slate-300 rounded-br-xl opacity-30" />

                  {/* Top line face details */}
                  <div className="w-full flex justify-between items-center z-10">
                    <span className="text-[9px] font-black uppercase text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full space-x-1 flex items-center gap-1">
                      <span>Mức độ:</span>
                      <span className={cn(
                        "font-mono font-black",
                        currentCard?.level === 0 ? "text-brand-red" : "text-amber-500"
                      )}>
                        {currentCard?.level === 0 ? "Từ vựng chính" : "Mở rộng"}
                      </span>
                    </span>

                    {/* Pronounce quicktrigger */}
                    {frontSideMode === 'chinese' && currentCard && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playCardAudio(currentCard.chinese);
                        }}
                        className="p-2 sm:p-2.5 bg-slate-100/80 hover:bg-slate-200 border border-slate-200 text-slate-600 rounded-xl transition-all cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 size={16} />
                      </button>
                    )}
                  </div>

                  {/* Main character content space */}
                  <div className="flex flex-col items-center justify-center flex-1 max-w-sm mx-auto text-center z-10 select-none w-full">
                    {frontSideMode === 'chinese' ? (
                      <div className="space-y-1 w-full px-2">
                        <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-sans text-slate-800 chinese-char font-extrabold tracking-tight select-none leading-none">
                          {currentCard?.chinese}
                        </h2>
                        {/* Tap hint to view meaning */}
                        <div className="mt-4 sm:mt-6 text-[10px] sm:text-[11px] font-extrabold text-amber-600 bg-amber-500/5 border border-amber-500/10 rounded-full px-3 sm:px-4 py-1.5 flex items-center justify-center gap-1 animate-pulse">
                          <Eye size={12} />
                          Nhấn vào thẻ để xem nghĩa & pinyin
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 w-full px-2">
                        <span className="text-[10px] uppercase font-black text-brand-red opacity-80 tracking-widest block">Ý nghĩa tiếng Việt</span>
                        <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tighter text-slate-800 leading-tight">
                          {currentCard?.vietnamese}
                        </h2>
                        {currentCard?.hint && (
                          <p className="text-[10px] sm:text-xs text-slate-400 font-bold italic">
                            ({currentCard.hint})
                          </p>
                        )}
                        <div className="mt-4 sm:mt-6 text-[10px] sm:text-[11px] font-extrabold text-amber-600 bg-amber-500/5 border border-amber-500/10 rounded-full px-3 sm:px-4 py-1.5 flex items-center justify-center gap-1">
                          <Eye size={12} />
                          Nhấn lật xem chữ Hán & phát âm
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card bottom tag */}
                  <div className="text-center z-10 select-none pointer-events-none">
                    <p className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-slate-400">Thiết kế bởi Mindmap Chinese</p>
                  </div>
                </div>

                {/* BACK FACE OF CARD (Shown when flipped) */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-gradient-to-b from-white to-[#F1F9FF] border-2 border-b-[6px] border-slate-200/80 shadow-lg rounded-[1.8rem] sm:rounded-[2.5rem] p-4 xs:p-6 sm:p-10 flex flex-col justify-between overflow-hidden text-slate-800",
                    !isFlipped ? "pointer-events-none" : ""
                  )}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 bg-grid-slate-100 opacity-[0.2]" />
                  <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-slate-300 rounded-tl-xl opacity-30" />
                  <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-slate-300 rounded-tr-xl opacity-30" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-slate-300 rounded-bl-xl opacity-30" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-slate-300 rounded-br-xl opacity-30" />

                  {/* Top card header */}
                  <div className="w-full flex justify-between items-center z-10">
                    <span className="text-[9px] font-black uppercase text-sky-600 bg-sky-50/70 border border-sky-100/70 px-2.5 py-1 rounded-full space-x-1 flex items-center gap-1 shadow-sm">
                      <Sparkles size={9} className="text-sky-500 animate-pulse" />
                      <span>Thông tin giải nghĩa</span>
                    </span>

                    {/* Pronounce trigger */}
                    {currentCard && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playCardAudio(currentCard.chinese);
                        }}
                        className="p-2 sm:p-2.5 bg-slate-100/80 hover:bg-slate-200 border border-slate-200 text-sky-600 rounded-xl transition-all cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 size={16} />
                      </button>
                    )}
                  </div>

                  {/* Back face card details */}
                  <div className="flex flex-col items-center justify-center flex-1 max-w-sm mx-auto text-center z-10 select-none w-full">
                    {frontSideMode === 'chinese' ? (
                      /* If Chinese was on front, display Vietnamese meanings on back */
                      <div className="space-y-4 w-full px-2">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Phiên âm Pinyin</span>
                          <p className="text-lg sm:text-xl font-mono font-black text-duo-orange tracking-wide select-text">
                            {currentCard?.pinyin}
                          </p>
                        </div>

                        <div className="space-y-1.5 py-3 border-t border-slate-200/80">
                          <span className="text-[10px] uppercase font-black text-slate-450 tracking-wider block">Ý nghĩa chính</span>
                          <h2 className="text-xl xs:text-2xl sm:text-3xl font-black tracking-tight text-slate-800 leading-tight">
                            {currentCard?.vietnamese}
                          </h2>
                          {currentCard?.hint && (
                            <p className="text-[11px] sm:text-xs text-slate-400 font-bold italic mt-1">
                              ({currentCard.hint})
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* If Vietnamese was on front, display Chinese glyphs and pinyin on back */
                      <div className="space-y-4 w-full px-2">
                        <h2 className="text-5xl xs:text-6xl sm:text-7xl font-sans text-slate-800 font-black tracking-tight chinese-char select-text">
                          {currentCard?.chinese}
                        </h2>

                        <div className="space-y-1 pt-3.5 border-t border-slate-200/80">
                          <span className="text-[10px] uppercase font-black text-slate-450 tracking-wider block">Phiên âm Pinyin</span>
                          <p className="text-lg sm:text-xl font-mono font-black text-duo-orange tracking-wide select-text">
                            {currentCard?.pinyin}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card bottom tag */}
                  <div className="text-center z-10 text-slate-400 select-none pointer-events-none">
                    <p className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest">Mindmap Chinese • Lật lại mặt trước</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Controls/Mark buttons container */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 py-2">
              {/* Navigation buttons: Trước & Tiếp/Xong */}
              <div className="flex items-center justify-between sm:justify-start gap-2.5 w-full sm:w-auto order-2 sm:order-1">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={cn(
                    "flex-1 sm:flex-none px-4 py-3 sm:py-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider shadow-sm",
                    currentIndex === 0 ? "opacity-35 cursor-not-allowed" : "hover:bg-slate-50 active:scale-95"
                  )}
                >
                  <ArrowLeft size={14} />
                  <span>Trước</span>
                </button>

                <button
                  onClick={handleNext}
                  className="flex-1 sm:flex-none px-4 py-3 sm:py-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider hover:bg-slate-50 active:scale-95 shadow-sm"
                >
                  <span>{currentIndex === cardsOrder.length - 1 ? "Hoàn thành" : "Tiếp"}</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Memory confidence actions: "Chưa thuộc" and "Đã thuộc" */}
              {currentCard && (
                <div className="flex items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
                  <button
                    onClick={() => markReview(currentCard.chinese)}
                    className="flex-1 sm:flex-none px-4 sm:px-5 py-3.5 sm:py-4 bg-red-50 hover:bg-red-100 border border-red-250 text-brand-red rounded-xl sm:rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider shadow-sm shadow-red-500/5 focus:ring-4 focus:ring-red-100 active:scale-95"
                  >
                    <X size={14} className="stroke-[3.5px]" />
                    <span>Chưa thuộc</span>
                  </button>
                  <button
                    onClick={() => markMastered(currentCard.chinese)}
                    className="flex-1 sm:flex-none px-4 sm:px-5 py-3.5 sm:py-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-250 text-emerald-600 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider shadow-sm shadow-emerald-500/5 focus:ring-4 focus:ring-emerald-100 active:scale-95"
                  >
                    <Check size={14} className="stroke-[3.5px]" />
                    <span>Đã thuộc</span>
                  </button>
                </div>
              )}
            </div>

            {/* Progress indicators bottom bar */}
            <div className="h-1.5 bg-slate-100 rounded-full w-full overflow-hidden">
              <div 
                className="h-full bg-slate-900 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / cardsOrder.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      <Confetti active={isCelebrating} onComplete={() => setIsCelebrating(false)} />
    </div>
  );
};
