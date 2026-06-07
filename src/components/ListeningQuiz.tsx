import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Check, Sparkles, BookOpen } from 'lucide-react';
import { Lesson, MindMapNode } from '../types';
import { playChineseAudio } from '../lib/audio';
import { Confetti } from './Confetti';
import { cn } from '../lib/utils';

interface Props {
  lesson: Lesson;
  onBackToMap?: () => void;
}

interface QuizQuestion {
  targetNode: MindMapNode;
  options: MindMapNode[];
}

// Fallback distractors in case the lesson doesn't have enough words
const FALLBACK_DISTRACTORS: MindMapNode[] = [
  { id: 'f1', chinese: '你好', pinyin: 'nǐ hǎo', vietnamese: 'Xin chào' },
  { id: 'f2', chinese: '谢谢', pinyin: 'xièxie', vietnamese: 'Cảm ơn' },
  { id: 'f3', chinese: '再见', pinyin: 'zàijiàn', vietnamese: 'Tạm biệt' },
  { id: 'f4', chinese: '这里', pinyin: 'zhèlǐ', vietnamese: 'Ở đây' },
  { id: 'f5', chinese: '什么', pinyin: 'shénme', vietnamese: 'Cái gì' },
  { id: 'f6', chinese: '中国', pinyin: 'zhōngguó', vietnamese: 'Trung Quốc' },
  { id: 'f7', chinese: '汉语', pinyin: 'hànyǔ', vietnamese: 'Tiếng Trung' },
  { id: 'f8', chinese: '学习', pinyin: 'xuéxí', vietnamese: 'Học tập' },
  { id: 'f9', chinese: '高兴', pinyin: 'gāoxìng', vietnamese: 'Vui mừng' },
  { id: 'f10', chinese: '朋友', pinyin: 'péngyǒu', vietnamese: 'Bạn bè' },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Flatten nested mindmap nodes recursively
function flattenMindMapNodes(nodes: MindMapNode[]): MindMapNode[] {
  let result: MindMapNode[] = [];
  for (const node of nodes) {
    if (node.chinese && node.chinese.trim() && node.vietnamese && node.vietnamese.trim()) {
      result.push(node);
    }
    if (node.children && node.children.length > 0) {
      result = result.concat(flattenMindMapNodes(node.children));
    }
  }
  return result;
}

export const ListeningQuiz: React.FC<Props> = ({ lesson, onBackToMap }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  // Initialize and generate questions
  useEffect(() => {
    if (!lesson.mindMaps) return;

    // 1. Flatten nodes and deduplicate by Chinese word
    const allNodes = flattenMindMapNodes(lesson.mindMaps);
    const seenChinese = new Set<string>();
    const uniqueNodes: MindMapNode[] = [];

    for (const node of allNodes) {
      const cleanChinese = node.chinese.trim();
      if (!seenChinese.has(cleanChinese)) {
        seenChinese.add(cleanChinese);
        uniqueNodes.push(node);
      }
    }

    if (uniqueNodes.length === 0) {
      setQuestions([]);
      return;
    }

    // Shuffle nodes to make question targets
    const targets = shuffleArray(uniqueNodes).slice(0, 10); // Max 10 questions

    // 2. Build questions
    const generatedQuestions: QuizQuestion[] = targets.map((target) => {
      // Find eligible distractors constraint to different Chinese words
      const currentLessonDistractors = uniqueNodes.filter(
        (n) => n.chinese.trim() !== target.chinese.trim()
      );

      let optionsList: MindMapNode[] = [...currentLessonDistractors];

      // If less than 3 distractors, append from fallback list
      if (optionsList.length < 3) {
        const fallbackNeeded = 3 - optionsList.length;
        const availableFallbacks = FALLBACK_DISTRACTORS.filter(
          (f) =>
            f.chinese.trim() !== target.chinese.trim() &&
            !optionsList.some((o) => o.chinese.trim() === f.chinese.trim())
        );
        optionsList = [...optionsList, ...shuffleArray(availableFallbacks).slice(0, fallbackNeeded)];
      }

      // Slice exactly 3 distractors, then combine with target
      const finalDistractors = shuffleArray(optionsList).slice(0, 3);
      const combinedOptions = shuffleArray([target, ...finalDistractors]);

      return {
        targetNode: target,
        options: combinedOptions,
      };
    });

    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setShowSummary(false);
    setIsConfettiActive(false);
  }, [lesson]);

  // Retrieve current question safety check
  const currentQuestion = useMemo(() => {
    if (questions.length === 0 || currentIndex >= questions.length) return null;
    return questions[currentIndex];
  }, [questions, currentIndex]);

  // Autoplay audio on question change
  useEffect(() => {
    if (currentQuestion) {
      const timer = setTimeout(() => {
        handlePlayAudio();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentQuestion]);

  const handlePlayAudio = () => {
    if (!currentQuestion) return;
    setIsPlayingAudio(true);
    playChineseAudio(currentQuestion.targetNode.chinese);
    
    // Simulate speaking active animation
    const duration = Math.min(2000, 300 + currentQuestion.targetNode.chinese.length * 350);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, duration);
  };

  const selectOption = (id: string) => {
    if (isAnswered) return;
    setSelectedOptionId(id);
  };

  const handleCheckAnswer = () => {
    if (!currentQuestion || isAnswered || !selectedOptionId) return;

    const selectedOption = currentQuestion.options.find((o) => o.id === selectedOptionId);
    const correctNode = currentQuestion.targetNode;
    
    const isAnsCorrect = selectedOption?.chinese.trim() === correctNode.chinese.trim();

    setIsCorrect(isAnsCorrect);
    setIsAnswered(true);

    if (isAnsCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const handleContinue = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setIsCorrect(null);
    } else {
      // Quiz finished!
      setShowSummary(true);
      if (score >= questions.length * 0.6) {
        setIsConfettiActive(true);
      }
    }
  };

  const restartQuiz = () => {
    if (!lesson.mindMaps) return;
    // Reshuffle the existing pool or generate new ones from the effect dependency
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setShowSummary(false);
    setIsConfettiActive(false);

    // Re-shuffle current lesson targets
    setQuestions((prev) => shuffleArray(prev));
  };

  if (questions.length === 0) {
    return (
      <div className="text-center p-12 md:p-20 bg-white border-2 border-duo-gray border-b-4 rounded-[2rem] max-w-md mx-auto">
        <div className="w-16 h-16 bg-slate-50 border-2 border-slate-250 flex items-center justify-center rounded-2xl mx-auto mb-4">
          <BookOpen className="text-slate-400" size={28} />
        </div>
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-2">Chưa có bài học phù hợp</h3>
        <p className="text-xs text-slate-450 font-bold leading-normal mb-6">
          Bài học này không có đủ dữ liệu từ vựng để tạo bài luyện nghe trắc nghiệm. Hãy thử bài học khác nhé!
        </p>
        {onBackToMap && (
          <button
            onClick={onBackToMap}
            className="px-6 py-2.5 bg-duo-blue border-b-4 border-duo-blue-dark hover:bg-sky-400 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer active:translate-y-[2px] active:border-b-2"
          >
            Quay lại sơ đồ tư duy
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Confetti Trigger */}
      <Confetti active={isConfettiActive} onComplete={() => setIsConfettiActive(false)} />

      <AnimatePresence mode="wait">
        {!showSummary ? (
          <motion.div
            key="quiz-body"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-2xl mx-auto bg-white border-2 border-duo-gray border-b-4 rounded-[2rem] overflow-hidden flex flex-col shadow-sm"
          >
            {/* Header Content */}
            <div className="p-6 pb-0">
              {/* Custom Duolingo-styled Progress Bar */}
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

            {/* Speaking Audio Section */}
            <div className="px-6 py-8 flex flex-col items-center text-center flex-1">
              <span className="text-[10.5px] font-black uppercase text-duo-blue tracking-[0.18em] mb-4">Luyện nghe chuyên sâu</span>
              <h2 className="text-md sm:text-lg font-black text-slate-800 leading-tight mb-6">
                Chọn chữ Hán chính xác cho âm phát dưới đây:
              </h2>

              {/* Speaker Button */}
              <button
                onClick={handlePlayAudio}
                className={cn(
                  "group relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-b-6 flex items-center justify-center transition-all cursor-pointer select-none",
                  isPlayingAudio
                    ? "bg-[#E0F7FF] border-[#1CB0F6] shadow-[0_3px_0_#1899D6] scale-[0.98]"
                    : "bg-[#1CB0F6] border-[#1CB0F6] text-white shadow-[0_6px_0_#1899D6] hover:bg-sky-400 hover:border-sky-400 hover:shadow-[0_6px_0_#1b9ddb] active:translate-y-[4px] active:shadow-[0_2px_0_#1899D6]"
                )}
                title="Nghe lại phát âm"
              >
                {/* Visual Audio Rings when speaking */}
                {isPlayingAudio && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-[#1CB0F6]/10 animate-ping" />
                    <span className="absolute inset-2 rounded-full bg-[#1CB0F6]/20 animate-ping [animation-delay:0.2s]" />
                  </>
                )}
                <Volume2 size={42} className={cn("stroke-[2.5] transition-transform group-hover:scale-105", isPlayingAudio ? "text-duo-blue animate-pulse" : "text-white")} />
              </button>

              <button
                onClick={handlePlayAudio}
                className="mt-4 text-xs font-black uppercase tracking-wider text-duo-blue hover:text-sky-500 transition-colors font-sans mb-8"
              >
                🔊 Bấm để nghe lại
              </button>

              {/* 2x2 Answer Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {currentQuestion?.options.map((option, idx) => {
                  const optionLetters = ['A', 'B', 'C', 'D'];
                  const isSelected = selectedOptionId === option.id;
                  
                  // Highlight colors post-validation
                  let optionClass = "bg-white border-slate-200 shadow-[0_4px_0_#E5E5E5]";
                  let badgeClass = "bg-slate-100 border-slate-250 text-slate-400 group-hover:bg-slate-200";

                  if (isAnswered) {
                    const isTarget = option.chinese.trim() === currentQuestion.targetNode.chinese.trim();
                    if (isTarget) {
                      // Correct option is highlighted in green
                      optionClass = "bg-[#EFFFEC] border-[#58CC02] text-[#58CC02] shadow-[0_4px_0_#3F9E01] font-extrabold";
                      badgeClass = "bg-[#58CC02] border-[#58CC02] text-white";
                    } else if (isSelected) {
                      // Selected but incorrect
                      optionClass = "bg-[#FFF2F2] border-[#DE2910] text-[#DE2910] shadow-[0_4px_0_#B01F0A]";
                      badgeClass = "bg-[#DE2910] border-[#DE2910] text-white";
                    } else {
                      // Unselected fillers
                      optionClass = "bg-white border-slate-100 text-slate-300 opacity-40 shadow-none pointer-events-none";
                    }
                  } else if (isSelected) {
                    optionClass = "bg-[#E0F7FF] border-[#1CB0F6] text-duo-blue shadow-[0_4px_0_#1899D6] ring-2 ring-[#1CB0F6]/10 scale-[0.99]";
                    badgeClass = "bg-[#1CB0F6] border-[#1CB0F6] text-white";
                  }

                  return (
                    <button
                      key={option.id + idx}
                      disabled={isAnswered}
                      onClick={() => selectOption(option.id)}
                      className={cn(
                        "group w-full rounded-2xl border-2 border-b-4 p-4 text-left flex items-center gap-4 transition-all duration-100 select-none cursor-pointer outline-none",
                        optionClass,
                        !isAnswered && "hover:-translate-y-[2px] hover:border-b-6 hover:border-slate-400 hover:shadow-[0_6px_0_#E5E5E5] active:translate-y-[2px] active:border-b-2 active:shadow-none"
                      )}
                    >
                      {/* Keyboard shortcut label-styled badge */}
                      <span className={cn(
                        "w-7 h-7 rounded-lg border-2 flex items-center justify-center text-xs font-black tracking-tight transition-colors shrink-0",
                        badgeClass
                      )}>
                        {optionLetters[idx]}
                      </span>

                      <div className="flex-1 text-center pr-7">
                        <span className="text-xl sm:text-2xl font-black font-sans leading-none block">
                          {option.chinese}
                        </span>
                        
                        {/* Show meaning details after checked */}
                        {isAnswered && option.chinese.trim() === currentQuestion.targetNode.chinese.trim() && (
                          <span className="text-[10px] block font-bold text-[#58CC02] mt-1 font-sans">
                            {option.pinyin} • {option.vietnamese}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Hotkey binding indicators in footer */}
            </div>

            {/* Answer Result Bar */}
            <div className={cn(
              "px-6 py-6 border-t-2 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-150 rounded-b-[1.85rem]",
              isAnswered
                ? isCorrect
                  ? "bg-[#D7FFB8] border-[#58CC02]/30"
                  : "bg-[#FCE2E2] border-[#DE2910]/30"
                : "bg-stone-50 border-slate-100"
            )}>
              <div className="flex items-start gap-4">
                {isAnswered ? (
                  isCorrect ? (
                    <>
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#58CC02]/20">
                        <CheckCircle2 className="text-[#58CC02] stroke-[2.5]" size={28} />
                      </div>
                      <div className="text-left font-sans">
                        <h4 className="text-[#3D9002] font-black text-sm uppercase tracking-wide leading-none mb-1">Rất tốt! Bạn nghe chuẩn đấy</h4>
                        <p className="text-[#3D9002] text-xs font-bold leading-normal">
                          {currentQuestion?.targetNode.chinese} = {currentQuestion?.targetNode.vietnamese} ({currentQuestion?.targetNode.pinyin})
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#DE2910]/20">
                        <XCircle className="text-[#DE2910] stroke-[2.5]" size={28} />
                      </div>
                      <div className="text-left font-sans">
                        <h4 className="text-[#B01F0A] font-black text-sm uppercase tracking-wide leading-none mb-1">Cố lên! Hãy nghe lại kỹ nhé</h4>
                        <p className="text-[#B01F0A] text-xs font-bold leading-normal">
                          Đáp án đúng là: <strong className="font-extrabold text-slate-800">{currentQuestion?.targetNode.chinese}</strong> ({currentQuestion?.targetNode.pinyin})
                        </p>
                      </div>
                    </>
                  )
                ) : (
                  <div className="text-left hidden sm:block">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest font-sans block mb-0.5">MẸO BỒI ÂM</span>
                    <p className="text-[11px] text-slate-450 font-bold tracking-tight">
                      Hãy nhắm mắt khi bấm Loa để tự kiểm tra khả năng phản xạ nghe trước chữ!
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {!isAnswered ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={!selectedOptionId}
                  className={cn(
                    "w-full sm:w-auto px-10 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all border-2 border-b-4",
                    selectedOptionId
                      ? "bg-duo-green border-[#58CC02] text-white shadow-[0_2.5px_0_#3D9002] active:translate-y-[2px] active:border-b-2 hover:-translate-y-[1px] hover:shadow-[0_3.5px_0_#3D9002] cursor-pointer"
                      : "bg-[#E5E5E5] border-[#D3D3D3] text-[#AFAFAF] shadow-none pointer-events-none cursor-not-allowed"
                  )}
                >
                  Kiểm tra
                </button>
              ) : (
                <button
                  onClick={handleContinue}
                  className={cn(
                    "w-full sm:w-auto px-10 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all border-2 border-b-4 flex items-center justify-center gap-1.5 cursor-pointer",
                    isCorrect
                      ? "bg-duo-green border-[#58CC02] text-white shadow-[0_2.5px_0_#3D9002] active:translate-y-[2px] active:border-b-2"
                      : "bg-[#DE2910] border-[#DE2910] text-white shadow-[0_2.5px_0_#B01F0A] active:translate-y-[2px] active:border-b-2 hover:bg-red-500"
                  )}
                >
                  {currentIndex + 1 === questions.length ? "Hoàn thành" : "Tiếp theo"}
                  <ArrowRight size={14} className="stroke-[3]" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Quiz Complete Summary Screen */
          <motion.div
            key="quiz-summary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto bg-white border-2 border-duo-gray border-b-6 rounded-[2rem] p-8 text-center shadow-lg"
          >
            {/* Crown trophy graphic */}
            <div className="relative w-24 h-24 bg-[#FFFCE6] border-2 border-duo-yellow text-duo-orange shadow-[0_4px_0_#E6B400] flex items-center justify-center rounded-3xl mx-auto mb-6 shrink-0">
              <Award size={48} className="text-duo-orange stroke-[2]" />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="absolute -top-2 -right-2 bg-duo-green text-white w-7 h-7 rounded-full flex items-center justify-center text-xs border border-white font-black"
              >
                ✓
              </motion.div>
            </div>

            <div className="text-[10px] font-black uppercase text-duo-orange tracking-[0.25em] mb-2 font-sans">
              BÀI LUYỆN HOÀN THÀNH
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-none mb-3 font-sans">
              {score === questions.length ? "Tiếng Trung tuyệt hảo! ⭐" : "Quá xuất sắc! 🎉"}
            </h3>

            <p className="text-duo-sub text-xs font-bold leading-relaxed mb-6 font-sans">
              Bạn đạt được tỉ lệ nghe chuẩn vượt trội trong bài luyện hôm nay. Hãy duy trì nhịp độ nhé!
            </p>

            {/* Statistics Board */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-50 border-2 border-slate-200/50 border-b-4 rounded-2xl flex flex-col items-center">
                <span className="text-[10px] text-slate-450 font-black uppercase tracking-wider block mb-1 font-sans">Số câu trúng</span>
                <span className="text-lg font-black text-slate-800">
                  {score}/{questions.length}
                </span>
              </div>
              <div className="p-4 bg-slate-50 border-2 border-slate-200/50 border-b-4 rounded-2xl flex flex-col items-center">
                <span className="text-[10px] text-slate-450 font-black uppercase tracking-wider block mb-1 font-sans">Chuỗi đỉnh</span>
                <span className="text-lg font-black text-duo-orange">
                  {maxStreak} <span className="text-[10px] uppercase font-bold text-slate-400">câu</span>
                </span>
              </div>
            </div>

            {/* Back or Retry Actions */}
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={restartQuiz}
                className="w-full py-3.5 bg-duo-green border-b-4 border-duo-green-dark hover:bg-[#62e403] hover:shadow-[0_4px_0_#3d9002] active:translate-y-[2px] active:border-b-2 text-white font-black text-xs uppercase rounded-2xl tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 font-sans"
              >
                <RotateCcw size={13} className="stroke-[3]" /> Luyện tập lại
              </button>

              {onBackToMap && (
                <button
                  onClick={onBackToMap}
                  className="w-full py-3.5 bg-white border-2 border-duo-gray border-b-4 hover:border-slate-400 active:translate-y-[2px] active:border-b-2 text-slate-500 font-black text-xs uppercase rounded-2xl tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 font-sans"
                >
                  Quay lại sơ đồ tư duy
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
