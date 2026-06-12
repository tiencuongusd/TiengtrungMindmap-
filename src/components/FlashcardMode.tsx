import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Award, 
  Sparkles,
  HelpCircle,
  ArrowLeftRight
} from 'lucide-react';
import { Lesson, MindMapNode } from '../types';
import { playChineseAudio, playCorrectSound, playCelebrationSound } from '../lib/audio';
import { Confetti } from './Confetti';
import { cn } from '../lib/utils';

interface Props {
  lesson: Lesson;
  onBackToMindmap?: () => void;
  hideHeader?: boolean;
  nextLesson?: Lesson | null;
  onSelectNextLesson?: (id: number) => void;
}

interface TranslationQuestion {
  id: string;
  type: 'zh-to-vi' | 'vi-to-zh';
  targetNode: MindMapNode;
  options: {
    text: string;
    node: MindMapNode;
  }[];
}

// Fallback high-quality vocabulary to serve as distractors if lesson lacks nodes
const STUDY_FALLBACKS: MindMapNode[] = [
  { id: 'f101', chinese: '你好', pinyin: 'nǐ hǎo', vietnamese: 'Xin chào' },
  { id: 'f102', chinese: '谢谢', pinyin: 'xièxie', vietnamese: 'Cảm ơn' },
  { id: 'f103', chinese: '再见', pinyin: 'zàijiàn', vietnamese: 'Tạm biệt' },
  { id: 'f104', chinese: '我们', pinyin: 'wǒmen', vietnamese: 'Chúng tôi' },
  { id: 'f105', chinese: '学习', pinyin: 'xuéxí', vietnamese: 'Học tập' },
  { id: 'f106', chinese: '不客气', pinyin: 'bù kèqi', vietnamese: 'Không có gì' },
  { id: 'f107', chinese: '高兴', pinyin: 'gāoxìng', vietnamese: 'Vui vẻ' },
  { id: 'f108', chinese: '明天', pinyin: 'míngtiān', vietnamese: 'Ngày mai' },
  { id: 'f109', chinese: '老师', pinyin: 'lǎoshī', vietnamese: 'Giáo viên' },
  { id: 'f110', chinese: '朋友', pinyin: 'péngyǒu', vietnamese: 'Bạn bè' },
];

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Helper to classify if a node is a sentence (câu) vs word/phrase
function isSentence(node: MindMapNode): boolean {
  const chinese = (node.chinese || '').trim();
  const vietnamese = (node.vietnamese || '').trim();

  // 1. Check Chinese or English sentence punctuation
  const hasSentencePunctuation = /[\u3002\uff0c\uff1f\uff01\uff1b\uff1a,?!;:]/g.test(chinese);
  if (hasSentencePunctuation) {
    return true;
  }

  // 2. Check if Vietnamese translation ends/contains sentence terminal punctuation
  const hasVietnamesePunctuation = /[.?!]/g.test(vietnamese);
  if (hasVietnamesePunctuation) {
    return true;
  }

  // 3. Length check: generally words or phrases are short, sentences are longer.
  // Chinese characters >= 6 are highly likely to be full sentences.
  if (chinese.length >= 6) {
    return true;
  }

  return false;
}

// Recursively parse vocabulary items from mindmaps up to depth 2 (Từ chính, từ phụ, cụm từ) and exclude sentences
function getLessonVocabList(nodes: MindMapNode[], depth: number = 0): MindMapNode[] {
  let list: MindMapNode[] = [];
  
  // Depth 0: Từ chính, Depth 1: Từ phụ, Depth 2: Cụm từ
  if (depth > 2) {
    return [];
  }

  for (const n of nodes) {
    const isNodeValid = n.chinese && n.chinese.trim() && n.vietnamese && n.vietnamese.trim();
    
    if (isNodeValid && !isSentence(n)) {
      list.push(n);
    }
    
    if (n.children && n.children.length > 0) {
      list = list.concat(getLessonVocabList(n.children, depth + 1));
    }
  }
  return list;
}

export const FlashcardMode: React.FC<Props> = ({ lesson, onBackToMindmap, hideHeader = false, nextLesson, onSelectNextLesson }) => {
  const [questions, setQuestions] = useState<TranslationQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  // Mark the lesson completed in localStorage when user finishes
  useEffect(() => {
    if (showSummary) {
      try {
        const saved = localStorage.getItem('completed_lessons');
        const completed: number[] = saved ? JSON.parse(saved) : [];
        if (!completed.includes(lesson.id)) {
          const nextCompleted = [...completed, lesson.id];
          localStorage.setItem('completed_lessons', JSON.stringify(nextCompleted));
          window.dispatchEvent(new Event('storage'));
        }
      } catch (e) {
        console.error("Failed to save completed lesson", e);
      }
    }
  }, [showSummary, lesson.id]);

  // Initialize and generate the quiz
  useEffect(() => {
    if (!lesson.mindMaps) return;

    let rawVocab = getLessonVocabList(lesson.mindMaps);
    
    // Safety fallback: if no short words/phrases under depth 2 exist, fall back to extracting and showing all nodes
    if (rawVocab.length === 0) {
      const traverseAll = (nodes: MindMapNode[]): MindMapNode[] => {
        let res: MindMapNode[] = [];
        for (const n of nodes) {
          if (n.chinese && n.chinese.trim() && n.vietnamese && n.vietnamese.trim()) {
            res.push(n);
          }
          if (n.children && n.children.length > 0) {
            res = res.concat(traverseAll(n.children));
          }
        }
        return res;
      };
      rawVocab = traverseAll(lesson.mindMaps);
    }
    
    // Deduplicate by Chinese word
    const uniqVocab: MindMapNode[] = [];
    const seen = new Set<string>();
    for (const v of rawVocab) {
      const cleanZh = v.chinese.trim();
      if (!seen.has(cleanZh)) {
        seen.add(cleanZh);
        uniqVocab.push(v);
      }
    }

    if (uniqVocab.length === 0) {
      setQuestions([]);
      return;
    }

    // Shuffle and pick up to 10 vocabulary targets
    const shuffledTargets = shuffle(uniqVocab).slice(0, 10);

    const generated: TranslationQuestion[] = shuffledTargets.map((target, index) => {
      // Direct translation direction: Alternating between Chinese->Vietnamese & Vietnamese->Chinese
      const questionType: 'zh-to-vi' | 'vi-to-zh' = index % 2 === 0 ? 'zh-to-vi' : 'vi-to-zh';

      // Find other vocabulary as distractors
      const distractorsFromLesson = uniqVocab.filter(
        v => v.chinese.trim() !== target.chinese.trim()
      );

      let optionsPool = [...distractorsFromLesson];

      // Pad with fallbacks if we don't have enough distractors
      if (optionsPool.length < 3) {
        const fallbacksNeeded = 3 - optionsPool.length;
        const availableFallbacks = STUDY_FALLBACKS.filter(
          fb => fb.chinese.trim() !== target.chinese.trim() && 
                !optionsPool.some(op => op.chinese.trim() === fb.chinese.trim())
        );
        optionsPool = [...optionsPool, ...shuffle(availableFallbacks).slice(0, fallbacksNeeded)];
      }

      // Keep exactly 3 distractors
      const finalDistractors = shuffle(optionsPool).slice(0, 3);
      const combined = [target, ...finalDistractors];

      // Formulate display content for target & distractors based on type
      const finalOptions = shuffle(combined).map(item => {
        const isTarget = item.chinese.trim() === target.chinese.trim();
        return {
          text: questionType === 'zh-to-vi' ? item.vietnamese : item.chinese,
          node: item
        };
      });

      return {
        id: `trans-q-${index}-${target.id}`,
        type: questionType,
        targetNode: target,
        options: finalOptions
      };
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setShowSummary(false);
    setIsConfettiActive(false);
  }, [lesson]);

  const currentQuestion = useMemo(() => {
    if (questions.length === 0 || currentIndex >= questions.length) return null;
    return questions[currentIndex];
  }, [questions, currentIndex]);

  // Handle playing audio pronunciation
  const handlePlayAudio = () => {
    if (!currentQuestion) return;
    setIsPlayingAudio(true);
    playChineseAudio(currentQuestion.targetNode.chinese);
    
    const duration = Math.min(2000, 300 + currentQuestion.targetNode.chinese.length * 350);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, duration);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOptionIndex(idx);
  };

  const handleVerify = () => {
    if (!currentQuestion || isAnswered || selectedOptionIndex === null) return;

    const selectedOpt = currentQuestion.options[selectedOptionIndex];
    const isCorrectTranslation = selectedOpt.node.chinese.trim() === currentQuestion.targetNode.chinese.trim();

    setIsCorrect(isCorrectTranslation);
    setIsAnswered(true);

    if (isCorrectTranslation) {
      playCorrectSound();
      setScore(prev => prev + 1);
      setStreak(prev => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
      // Play target pronunciation text sound upon correct to emphasize learning
      playChineseAudio(currentQuestion.targetNode.chinese);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
      setIsCorrect(null);
    } else {
      setShowSummary(true);
      if (score >= 8) {
        setTimeout(() => {
          setIsConfettiActive(true);
          playCelebrationSound();
        }, 1000);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setShowSummary(false);
    setIsConfettiActive(false);

    // Shuffle current questions
    setQuestions(prev => shuffle(prev));
  };

  if (questions.length === 0) {
    return (
      <div className="text-center p-12 bg-white border-2 border-duo-gray border-b-4 rounded-[2rem] max-w-md mx-auto">
        <div className="w-16 h-16 bg-slate-50 border-2 border-slate-200 flex items-center justify-center rounded-2xl mx-auto mb-4">
          <HelpCircle className="text-slate-450" size={28} />
        </div>
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2">Chưa đủ dữ liệu từ vựng</h3>
        <p className="text-xs text-slate-450 font-bold leading-normal mb-6">
          Hãy chọn các bài học rực rỡ khác để thiết lập đầy đủ Sơ Đồ Tư Duy nhé!
        </p>
        {onBackToMindmap && (
          <button
            onClick={onBackToMindmap}
            className="px-6 py-2.5 bg-duo-blue border-b-4 border-duo-blue-dark hover:bg-[#28bbf5] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer active:translate-y-[2px] active:border-b-2"
          >
            Quay lại sơ đồ tư duy
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Confetti active={isConfettiActive} onComplete={() => setIsConfettiActive(false)} />

      <AnimatePresence mode="wait">
        {!showSummary ? (
          <motion.div
            key="translate-body"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-2xl mx-auto bg-white border-2 border-duo-gray border-b-4 rounded-[2rem] overflow-hidden flex flex-col shadow-sm"
          >
            {/* Upper Content Frame */}
            <div className="p-6 pb-0">
              {/* Custom 3D-styled Progress Bar */}
              <div className="flex items-center gap-3 w-full mb-6">
                <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-200/40 p-[2px]">
                  <div
                    className="h-full bg-duo-green rounded-full transition-all duration-300"
                    style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-black text-slate-450 uppercase tracking-widest font-sans shrink-0">
                  Câu {currentIndex + 1}/{questions.length}
                </span>
              </div>
            </div>

            {/* Prompt Section */}
            <div className="px-6 py-6 flex flex-col items-center text-center flex-1">
              {currentQuestion?.type === 'zh-to-vi' ? (
                <>
                  <h2 className="text-base sm:text-lg font-black text-slate-800 leading-snug mb-6 mt-2">
                    Dịch từ/cụm từ sau đây sang nghĩa Tiếng Việt:
                  </h2>
                  
                  {/* Huge Term card with listen button */}
                  <div className="w-full bg-slate-50 border-2 border-slate-200/60 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center mb-8 relative group">
                    <button
                      onClick={handlePlayAudio}
                      className="absolute right-4 top-4 w-10 h-10 rounded-full bg-white border-2 border-slate-200 hover:border-duo-blue text-slate-500 hover:text-duo-blue flex items-center justify-center cursor-pointer transition-colors"
                      title="Phát âm tiếng Trung"
                    >
                      <Volume2 size={18} className={isPlayingAudio ? "text-duo-blue animate-pulse" : ""} />
                    </button>
                    
                    <span 
                      onClick={handlePlayAudio}
                      className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-sans cursor-pointer hover:text-duo-blue transition-colors"
                    >
                      {currentQuestion.targetNode.chinese}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-base sm:text-lg font-black text-slate-800 leading-snug mb-6 mt-2">
                    Chọn cách dịch Tiếng Trung chính xác cho từ này:
                  </h2>

                  {/* Vietnamese target display card */}
                  <div className="w-full bg-[#FFFCE6] border-2 border-duo-yellow/60 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center mb-8 relative">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#9E7A00] font-sans tracking-tight">
                      {currentQuestion?.targetNode.vietnamese}
                    </span>
                  </div>
                </>
              )}

              {/* 2x2 Option blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                {currentQuestion?.options.map((option, idx) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const isSelected = selectedOptionIndex === idx;

                  let cardStyle = "bg-white border-slate-200 shadow-[0_4px_0_#E5E5E5]";
                  let labelStyle = "bg-slate-100 border-slate-250 text-slate-400 group-hover:bg-slate-200";

                  if (isAnswered) {
                    const isCorrectAnswer = option.node.chinese.trim() === currentQuestion.targetNode.chinese.trim();
                    if (isCorrectAnswer) {
                      cardStyle = "bg-[#EFFFEC] border-[#58CC02] text-[#58CC02] shadow-[0_4px_0_#3F9E01] font-extrabold";
                      labelStyle = "bg-[#58CC02] border-[#58CC02] text-white";
                    } else if (isSelected) {
                      cardStyle = "bg-[#FFF2F2] border-[#DE2910] text-[#DE2910] shadow-[0_4px_0_#B01F0A]";
                      labelStyle = "bg-[#DE2910] border-[#DE2910] text-white";
                    } else {
                      cardStyle = "bg-white border-slate-100 text-slate-300 opacity-40 shadow-none pointer-events-none";
                    }
                  } else if (isSelected) {
                    cardStyle = "bg-[#E0F7FF] border-[#1CB0F6] text-duo-blue shadow-[0_4px_0_#1899D6] ring-2 ring-[#1CB0F6]/10 scale-[0.99]";
                    labelStyle = "bg-[#1CB0F6] border-[#1CB0F6] text-white";
                  }

                  return (
                    <button
                      key={currentQuestion.id + '-opt-' + idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={cn(
                        "group w-full rounded-2xl border-2 border-b-4 p-4 text-left flex items-center gap-4 transition-all duration-100 select-none cursor-pointer outline-none",
                        cardStyle,
                        !isAnswered && "hover:-translate-y-[2px] hover:border-b-6 hover:border-slate-400 hover:shadow-[0_6px_0_#E5E5E5] active:translate-y-[2px] active:border-b-2 active:shadow-none"
                      )}
                    >
                      <span className={cn(
                        "w-7 h-7 rounded-lg border-2 flex items-center justify-center text-xs font-black tracking-tight shrink-0 transition-colors",
                        labelStyle
                      )}>
                        {letters[idx]}
                      </span>

                      <div className="flex-1 text-center pr-7 font-sans">
                        <span className={cn(
                          "block font-black text-slate-800",
                          currentQuestion.type === 'vi-to-zh' ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'
                        )}>
                          {option.text}
                        </span>

                        {isAnswered && option.node.chinese.trim() === currentQuestion.targetNode.chinese.trim() && (
                          <span className="text-[10px] text-[#58CC02] font-bold block mt-0.5">
                            {option.node.chinese}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Answer Validation Footer Bar with Brand Colors */}
            <div className={cn(
              "px-6 py-5 border-t-2 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-150 rounded-b-[1.85rem]",
              isAnswered
                ? isCorrect
                  ? "bg-[#D7FFB8] border-[#58CC02]/30"
                  : "bg-[#FCE2E2] border-[#DE2910]/30"
                : "bg-stone-50 border-slate-100"
            )}>
              <div className="flex items-start gap-3.5">
                {isAnswered ? (
                  isCorrect ? (
                    <>
                      <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#58CC02]/20">
                        <CheckCircle2 className="text-[#58CC02] stroke-[2.5]" size={25} />
                      </div>
                      <div className="text-left font-sans">
                        <h4 className="text-[#3D9002] font-black text-xs sm:text-sm uppercase tracking-wide mb-0.5 leading-none">Cực kỳ hoàn hảo!</h4>
                        <p className="text-[#3D9002] text-[11px] sm:text-xs font-bold leading-normal">
                          {currentQuestion?.targetNode.chinese} nghĩa là: {currentQuestion?.targetNode.vietnamese}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#DE2910]/20">
                        <XCircle className="text-[#DE2910] stroke-[2.5]" size={25} />
                      </div>
                      <div className="text-left font-sans">
                        <h4 className="text-[#B01F0A] font-black text-xs sm:text-sm uppercase tracking-wide mb-0.5 leading-none">Chưa chính xác</h4>
                        <p className="text-[#B01F0A] text-[11px] sm:text-xs font-bold leading-normal">
                          Bản dịch đúng là: <strong className="font-extrabold text-slate-800">
                            {currentQuestion?.type === 'zh-to-vi' ? currentQuestion?.targetNode.vietnamese : currentQuestion?.targetNode.chinese}
                          </strong>
                        </p>
                      </div>
                    </>
                  )
                ) : (
                  <div className="text-left hidden sm:block">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest font-sans block mb-0.5">PHƯƠNG PHÁP HỌC</span>
                    <p className="text-[11px] text-slate-450 font-bold tracking-tight">
                      Dịch hai chiều giúp bạn phản xạ nhanh cả kỹ năng đọc chữ Hán lẫn hiểu nghĩa từ vựng!
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {!isAnswered ? (
                <button
                  onClick={handleVerify}
                  disabled={selectedOptionIndex === null}
                  className={cn(
                    "w-full sm:w-auto px-10 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all border-2 border-b-4",
                    selectedOptionIndex !== null
                      ? "bg-duo-green border-[#58CC02] text-white shadow-[0_2.5px_0_#3D9002] active:translate-y-[2px] active:border-b-2 hover:-translate-y-[1px] hover:shadow-[0_3.5px_0_#3D9002] cursor-pointer"
                      : "bg-[#E5E5E5] border-[#D3D3D3] text-[#AFAFAF] shadow-none pointer-events-none cursor-not-allowed"
                  )}
                >
                  Kiểm tra
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className={cn(
                    "w-full sm:w-auto px-10 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all border-2 border-b-4 flex items-center justify-center gap-1.5 cursor-pointer",
                    isCorrect
                      ? "bg-duo-green border-[#58CC02] text-white shadow-[0_2.5px_0_#3D9002] active:translate-y-[2px] active:border-b-2"
                      : "bg-[#DE2910] border-[#DE2910] text-white shadow-[0_2.5px_0_#B01F0A] active:translate-y-[2px] active:border-b-2 hover:bg-red-500"
                  )}
                >
                  {currentIndex + 1 === questions.length ? "Xác nhận kết quả" : "Tiếp theo"}
                  <ArrowRight size={14} className="stroke-[3]" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Completion Summary Dashboard Layout */
          <motion.div
            key="translate-summary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto bg-white border-2 border-duo-gray border-b-6 rounded-[2rem] p-8 text-center shadow-lg"
          >
            {/* Award crown trophy */}
            <div className="relative w-24 h-24 bg-[#EFFFEC] border-2 border-duo-green text-duo-green shadow-[0_4px_0_#3D9002] flex items-center justify-center rounded-3xl mx-auto mb-6 shrink-0">
              <Award size={48} className="text-duo-green stroke-[2]" />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="absolute -top-2 -right-2 bg-duo-yellow text-duo-orange w-7 h-7 rounded-full flex items-center justify-center text-xs border border-white font-black"
              >
                ★
              </motion.div>
            </div>

            <div className="text-[10px] font-black uppercase text-[#58CC02] tracking-[0.25em] mb-2 font-sans">
              BÀI LUYỆN HOÀN THÀNH
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-none mb-6 font-sans">
              {score >= 8 ? "Hoàn thành tuyệt vời! 🌟" : "Cố gắng lên! 💪"}
            </h3>

            {/* Statistics Dashboard */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-50 border-2 border-slate-200/50 border-b-4 rounded-2xl flex flex-col items-center">
                <span className="text-[10px] text-slate-450 font-black uppercase tracking-wider block mb-1 font-sans">Điểm của bạn</span>
                <span className="text-lg font-black text-slate-800">
                  {score}/{questions.length}
                </span>
              </div>
              <div className="p-4 bg-slate-50 border-2 border-slate-200/50 border-b-4 rounded-2xl flex flex-col items-center">
                <span className="text-[10px] text-slate-450 font-black uppercase tracking-wider block mb-1 font-sans">Chuỗi đỉnh</span>
                <span className="text-lg font-black text-duo-orange">
                  {maxStreak} <span className="text-[10px] uppercase font-bold text-slate-450">từ</span>
                </span>
              </div>
            </div>

            {/* Actions list buttons */}
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={handleRestart}
                className="w-full py-3.5 bg-duo-green border-b-4 border-duo-green-dark hover:bg-[#62e403] hover:shadow-[0_4px_0_#3d9002] active:translate-y-[2px] active:border-b-2 text-white font-black text-xs uppercase rounded-2xl tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 font-sans"
              >
                <RotateCcw size={13} className="stroke-[3]" /> Luyện tập tiếp
              </button>

              {onBackToMindmap && (
                <button
                  onClick={onBackToMindmap}
                  className="w-full py-3.5 bg-white border-2 border-duo-gray border-b-4 hover:border-slate-400 active:translate-y-[2px] active:border-b-2 text-slate-500 font-black text-xs uppercase rounded-2xl tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 font-sans"
                >
                  Quay lại sơ đồ tư duy
                </button>
              )}
            </div>

            {nextLesson && (
              <div className="mt-6 pt-6 border-t-2 border-dashed border-slate-200 text-left">
                <span className="text-[10px] font-black uppercase text-duo-green tracking-widest block mb-2 text-center sm:text-left font-sans">
                  Bài học tiếp theo
                </span>
                <div 
                  onClick={() => onSelectNextLesson?.(nextLesson.id)}
                  className="group relative rounded-2xl bg-[#F7F9FC] border-2 border-[#E5E9F0] p-4 text-left transition-all duration-100 cursor-pointer outline-none select-none border-b-4 hover:-translate-y-[2px] hover:border-slate-400 active:translate-y-[2px] active:border-b-2 shadow-[0_3px_0_#E5E5E5] active:shadow-none"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[9px] font-black uppercase text-duo-orange tracking-widest block mb-0.5">
                        Bài {String(nextLesson.id).padStart(3, '0')}
                      </span>
                      <h4 className="text-xs sm:text-sm font-black tracking-tight text-slate-800 line-clamp-2 leading-snug group-hover:text-duo-blue">
                        {nextLesson.title}
                      </h4>
                    </div>
                    
                    <div className="w-8 h-8 rounded-xl border-2 flex items-center justify-center bg-white border-duo-gray text-slate-400 group-hover:bg-duo-blue group-hover:text-white group-hover:border-duo-blue-dark group-hover:shadow-[0_2px_0_#1899D6] shrink-0">
                      <ArrowRight size={14} className="stroke-[3]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
