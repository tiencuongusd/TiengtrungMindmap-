import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Volume2, ShieldAlert, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, BookOpen } from 'lucide-react';
import { Lesson, MindMapNode } from '../types';
import { playChineseAudio, playCorrectSound, playCelebrationSound } from '../lib/audio';
import { Confetti } from './Confetti';
import { cn } from '../lib/utils';

interface Props {
  lesson: Lesson;
  onBackToMap?: () => void;
  nextLesson?: Lesson | null;
  onSelectNextLesson?: (id: number) => void;
}

// Helper to shuffle list
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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

// Flatten nested mindmap nodes recursively up to depth 2 (Từ chính, từ phụ, cụm từ) and exclude sentences
function flattenMindMapNodes(nodes: MindMapNode[], depth: number = 0): MindMapNode[] {
  let result: MindMapNode[] = [];
  
  // Depth 0: Từ chính, Depth 1: Từ phụ, Depth 2: Cụm từ
  if (depth > 2) {
    return [];
  }

  for (const node of nodes) {
    const isNodeValid = node.chinese && node.chinese.trim() && node.vietnamese && node.vietnamese.trim();
    
    if (isNodeValid && !isSentence(node)) {
      result.push(node);
    }
    
    if (node.children && node.children.length > 0) {
      result = result.concat(flattenMindMapNodes(node.children, depth + 1));
    }
  }
  return result;
}

// Helper to strip punctuation and whitespace
function cleanString(str: string): string {
  // Remove all punctuation marks across scripts, spaces, numbers, formatting
  return str.replace(/[\s\d\p{P}\p{S}]/gu, '').toLowerCase();
}

// Calculate similarity ratio
function calculateWordSimilarity(target: string, transcript: string): number {
  const cleanTarget = cleanString(target);
  const cleanTranscript = cleanString(transcript);
  if (!cleanTarget) return 0;
  if (!cleanTranscript) return 0;

  // 1. Direct contains or exact match
  if (cleanTranscript === cleanTarget) {
    return 100;
  }
  if (cleanTranscript.includes(cleanTarget) || cleanTarget.includes(cleanTranscript)) {
    const minLen = Math.min(cleanTarget.length, cleanTranscript.length);
    const maxLen = Math.max(cleanTarget.length, cleanTranscript.length);
    return Math.round((minLen / maxLen) * 100);
  }

  // 2. Character overlap count helper (LCS approximate)
  let matched = 0;
  const targetChars = cleanTarget.split('');
  const transcriptSet = new Set(cleanTranscript.split(''));
  
  targetChars.forEach(char => {
    if (transcriptSet.has(char)) {
      matched++;
    }
  });

  return Math.round((matched / cleanTarget.length) * 100);
}

export const SpeakingPractice: React.FC<Props> = ({ lesson, onBackToMap, nextLesson, onSelectNextLesson }) => {
  const [questions, setQuestions] = useState<MindMapNode[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  // Recognition States
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const recognitionRef = useRef<any>(null);
  const isRecognizingRef = useRef<boolean>(false);

  // Initialize questions
  useEffect(() => {
    if (!lesson.mindMaps) return;
    let allNodes = flattenMindMapNodes(lesson.mindMaps);
    
    // Safety fallback: if no short words/phrases under depth 2 exist, fall back to extracting and showing all nodes
    if (allNodes.length === 0) {
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
      allNodes = traverseAll(lesson.mindMaps);
    }

    const seen = new Set<string>();
    const unique: MindMapNode[] = [];
    for (const node of allNodes) {
      const clean = node.chinese.trim();
      if (!seen.has(clean)) {
        seen.add(clean);
        unique.push(node);
      }
    }

    if (unique.length === 0) return;
    // We select up to 10 nodes for speaking practice
    setQuestions(shuffleArray(unique).slice(0, 10));
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setShowSummary(false);
    setIsConfettiActive(false);
    setIsAnswered(false);
    setIsCorrect(null);
    setAccuracy(null);
    setTranscript('');
  }, [lesson]);

  const currentQuestion = useMemo(() => {
    if (currentIndex < questions.length) {
      return questions[currentIndex];
    }
    return null;
  }, [questions, currentIndex]);

  // Autoplay audio on question change
  useEffect(() => {
    if (currentQuestion) {
      const t = setTimeout(() => {
        handlePlayAudio();
      }, 500);
      return () => clearTimeout(t);
    }
  }, [currentIndex, currentQuestion]);

  // Setup Web Speech API speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = 'zh-CN'; // Set Chinese (China) language input

      rec.onstart = () => {
        setIsListening(true);
        isRecognizingRef.current = true;
        setSpeechError(null);
      };

      rec.onresult = (e: any) => {
        const resultList = e.results;
        let finalStr = '';
        for (let i = 0; i < resultList.length; i++) {
          finalStr += resultList[i][0].transcript;
        }
        setTranscript(finalStr);

        // Highlight tentative accuracy
        if (currentQuestion) {
          const sim = calculateWordSimilarity(currentQuestion.chinese, finalStr);
          setAccuracy(sim);
        }
      };

      rec.onerror = (e: any) => {
        console.error('Speech recognition error event:', e);
        if (e.error === 'not-allowed') {
          setSpeechError('Vui lòng bật quyền truy cập Microphone trong trình duyệt để luyện nói.');
        } else if (e.error === 'aborted') {
          // ignore aborted warning logs
        } else {
          setSpeechError(`Lỗi mic: ${e.error || 'không rõ'}. Bạn có thể bấm để nhận diện lại.`);
        }
        setIsListening(false);
        isRecognizingRef.current = false;
      };

      rec.onend = () => {
        setIsListening(false);
        isRecognizingRef.current = false;
      };

      recognitionRef.current = rec;
    } else {
      setSpeechError('Trình biên dịch web không hỗ trợ Speech Recognition. Hãy dùng Google Chrome hoặc Safari.');
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
      isRecognizingRef.current = false;
    };
  }, [currentQuestion]);

  // Handle Mark Completed in localStorage
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

  const handlePlayAudio = () => {
    if (!currentQuestion) return;
    setIsPlayingAudio(true);
    playChineseAudio(currentQuestion.chinese);
    const d = Math.min(2000, 300 + currentQuestion.chinese.length * 350);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, d);
  };

  const startListening = (e?: any) => {
    if (e && typeof e.preventDefault === 'function') {
      try {
        e.preventDefault();
      } catch (_) {}
    }
    if (isAnswered) return;

    if (isRecognizingRef.current) {
      console.warn('SpeechRecognition: Already recognizing, ignoring duplicate start command.');
      return;
    }

    setTranscript('');
    setAccuracy(null);
    setSpeechError(null);

    if (recognitionRef.current) {
      try {
        isRecognizingRef.current = true;
        setIsListening(true);
        recognitionRef.current.start();
      } catch (err) {
        console.error('Start listening error:', err);
        isRecognizingRef.current = false;
        setIsListening(false);
        // Clean up or retry safely
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    } else {
      setSpeechError('Microphone không sẵn sàng trên trình duyệt này.');
    }
  };

  const stopListeningAndEvaluate = (e?: any) => {
    if (e && typeof e.preventDefault === 'function') {
      try {
        e.preventDefault();
      } catch (_) {}
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
  };

  const triggerMockRecognition = () => {
    // Accessibility bypass/simulation for convenience or if mic fails
    if (isAnswered || !currentQuestion) return;
    const mockWord = currentQuestion.chinese;
    setTranscript(mockWord);
    setAccuracy(100);
    evaluatePronunciation(mockWord, 100);
  };

  const evaluatePronunciation = (finalTranscript: string, finalSim?: number) => {
    if (!currentQuestion || isAnswered) return;

    const simScore = finalSim !== undefined ? finalSim : calculateWordSimilarity(currentQuestion.chinese, finalTranscript);
    setAccuracy(simScore);

    // Pass threshold is 65% for speaking
    const passed = simScore >= 65;
    setIsCorrect(passed);
    setIsAnswered(true);

    if (passed) {
      playCorrectSound();
      setScore(prev => prev + 1);
      setStreak(prev => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const handleManualCheck = () => {
    if (isListening) {
      stopListeningAndEvaluate();
    }
    evaluatePronunciation(transcript);
  };

  const handleContinue = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
      setIsCorrect(null);
      setAccuracy(null);
      setTranscript('');
      setSpeechError(null);
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

  const restartQuiz = () => {
    setCurrentIndex(0);
    setIsAnswered(false);
    setIsCorrect(null);
    setAccuracy(null);
    setTranscript('');
    setSpeechError(null);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setShowSummary(false);
    setIsConfettiActive(false);
    setQuestions(shuffleArray(questions));
  };

  if (questions.length === 0) {
    return (
      <div className="text-center p-12 md:p-20 bg-white border-2 border-duo-gray border-b-4 rounded-[2rem] max-w-md mx-auto">
        <div className="w-16 h-16 bg-slate-50 border-2 border-slate-250 flex items-center justify-center rounded-2xl mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-2 font-sans">Bài học chưa có dữ liệu</h3>
        <p className="text-slate-500 font-bold text-xs leading-relaxed max-w-xs mx-auto mb-6">
          Sơ đồ tư duy của bài học này cần chứa ít nhất một từ vựng tiếng Trung để có thể khởi tạo luyện nói.
        </p>
        {onBackToMap && (
          <button
            onClick={onBackToMap}
            className="w-full bg-duo-green text-white border-2 border-duo-green-dark shadow-[0_4px_0_#46A302] py-3 rounded-2xl font-black text-xs uppercase tracking-wide cursor-pointer hover:brightness-105 active:scale-98"
          >
            Quay lại bài học
          </button>
        )}
      </div>
    );
  }

  // Progress calculations
  const progressPercent = Math.round(((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-2 relative select-none">
      <AnimatePresence>
        {isConfettiActive && <Confetti />}
      </AnimatePresence>

      {!showSummary ? (
        <div className="bg-white border-2 border-duo-gray border-b-4 rounded-[2rem] p-5 sm:p-8 shadow-sm flex flex-col min-h-[460px] relative overflow-hidden">
          {/* Header Progress Bar */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-black text-slate-400 font-mono tracking-tight leading-none">
              {currentIndex + 1}/{questions.length}
            </span>
            <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-100 relative">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-duo-green rounded-full min-w-[2%] shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)]"
                initial={{ width: '2%' }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
            {streak > 0 && (
              <div className="flex items-center gap-1 bg-duo-orange-light text-duo-orange border-2 border-duo-orange/20 px-2.5 py-0.5 rounded-full">
                <span className="text-xs">🔥</span>
                <span className="text-xs font-black font-sans leading-none">{streak}</span>
              </div>
            )}
          </div>

          {/* Flashcard Content Area */}
          <div className="flex-1 flex flex-col justify-between items-center w-full gap-6">
            
            {/* Title / Prompt */}
            <div className="text-center">
              <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#B59A35] uppercase block mb-1">
                Luyện Nói Tiếng Trung
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-500 leading-normal font-sans">
                Hãy nhấn micro và đọc to câu này:
              </h2>
            </div>

            {/* Speaking Target Card */}
            <div className="w-full bg-[#FCF8E3] border-2 border-[#F6EAA4] border-b-4 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 relative min-h-[140px] shadow-sm">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#9E7A00] tracking-tight text-center leading-normal">
                {currentQuestion?.chinese}
              </span>
              <div className="text-slate-500 font-bold text-xs sm:text-sm text-center leading-relaxed">
                Nghĩa: {currentQuestion?.vietnamese}
              </div>

              {/* Speaker Audio Demo */}
              <button
                onClick={handlePlayAudio}
                disabled={isPlayingAudio}
                className={cn(
                  "p-2.5 rounded-2xl border-2 transition-all cursor-pointer absolute right-3 bottom-3 shadow-md active:scale-95",
                  isPlayingAudio
                    ? "bg-[#FCF8E3] border-slate-300 text-slate-400"
                    : "bg-white border-[#F0D878] text-[#9E7A00] hover:bg-[#FFFCEE]"
                )}
              >
                <Volume2 className={cn("w-5 h-5", isPlayingAudio && "animate-pulse")} />
              </button>
            </div>

            {/* MIC Recognition Controller */}
            <div className="flex flex-col items-center gap-3 w-full">
              {/* Animated Mic Ring */}
              <div className="relative flex items-center justify-center">
                {isListening && (
                  <div className="absolute inset-0 rounded-full border-4 border-duo-red animate-ping opacity-60 pointer-events-none" />
                )}
                
                <button
                  onMouseDown={startListening}
                  onMouseUp={stopListeningAndEvaluate}
                  onTouchStart={startListening}
                  onTouchEnd={stopListeningAndEvaluate}
                  disabled={isAnswered}
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center border-2 border-b-4 transition-all z-10 cursor-pointer select-none",
                    isListening 
                      ? "bg-duo-red hover:bg-red-600 text-white border-red-700 shadow-[0_2.5px_0_#990000] scale-105"
                      : isAnswered
                        ? "bg-slate-100 text-slate-350 border-slate-200"
                        : "bg-duo-green hover:brightness-105 text-white border-duo-green-dark shadow-[0_4px_0_#46A302] hover:scale-102 active:scale-95"
                  )}
                >
                  {isListening ? (
                    <Mic className="w-10 h-10 animate-pulse" />
                  ) : (
                    <Mic className="w-10 h-10" />
                  )}
                </button>
              </div>

              <span className="text-[10px] text-slate-400 font-bold">
                {isAnswered ? "Đã đánh giá phát âm" : isListening ? "Đang lắng nghe... (Thả chuột hoặc nhấc tay để đánh giá)" : "ẤN GIỮ và đọc to câu tiếng Trung ở trên"}
              </span>

              {/* Live Transcript Bubble */}
              {transcript && (
                <div className="w-full text-center px-4 py-2.5 bg-slate-50 border-2 border-slate-250 border-b-4 rounded-xl flex flex-col items-center gap-1">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">Kết quả nhận diện:</span>
                  <p className="text-sm font-extrabold text-slate-700">"{transcript}"</p>
                  {accuracy !== null && (
                    <span className={cn(
                      "text-[10px] font-black px-2 py-0.5 rounded-full mt-1",
                      accuracy >= 65 ? "bg-duo-green-light text-duo-green" : "bg-red-50 text-duo-red-dark"
                    )}>
                      Độ trùng khớp: {accuracy}% {accuracy >= 65 ? '✓ Đạt' : '✗ Chưa đạt'}
                    </span>
                  )}
                </div>
              )}

              {/* Speech Error Banner */}
              {speechError && (
                <div className="w-full flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-left">
                  <ShieldAlert className="w-4 h-4 text-duo-red shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-[9.5px] font-black uppercase text-duo-red-dark block leading-none mb-1">Cảnh báo Microphone</span>
                    <p className="text-[9.5px] text-slate-500 font-bold leading-normal">{speechError}</p>
                    <button
                      onClick={triggerMockRecognition}
                      className="text-[9px] font-black underline text-duo-orange uppercase tracking-wide block mt-1 hover:text-duo-orange-dark cursor-pointer"
                    >
                      Bỏ qua lỗi (Bypass mic bằng đáp án chuẩn)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Action Controls */}
            <div className="w-full mt-2 pt-4 border-t-2 border-slate-100 flex flex-row items-center gap-3">
              {!isAnswered ? (
                <button
                  onClick={handleManualCheck}
                  disabled={!transcript}
                  className={cn(
                    "flex-1 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider border-2 transition-all cursor-pointer",
                    transcript
                      ? "bg-duo-green text-white border-duo-green-dark shadow-[0_4px_0_#46A302] hover:brightness-105 active:scale-98"
                      : "bg-slate-100 text-slate-350 border-slate-200 pointer-events-none"
                  )}
                >
                  Kiểm tra phát âm
                </button>
              ) : (
                <div className="flex-1 flex flex-col gap-3">
                  {/* Feedback Overlay Banner */}
                  <div className={cn(
                    "w-full p-4 rounded-2xl flex flex-row items-center gap-3.5 border-2 border-b-4",
                    isCorrect
                      ? "bg-duo-green-light border-[#A5E76F] text-duo-green-dark"
                      : "bg-[#FCEAE9] border-[#FFA59E] text-[#B01F0A]"
                  )}>
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-8 h-8 shrink-0" />
                        <div className="text-left font-sans">
                          <h4 className="font-black text-sm uppercase tracking-wide leading-none mb-1">Khâm phục! Phát âm chuẩn xác</h4>
                          <p className="text-xs font-bold leading-normal">Bạn được chấm {accuracy}% về độ trùng khớp.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-8 h-8 shrink-0" />
                        <div className="text-left font-sans">
                          <h4 className="font-black text-sm uppercase tracking-wide leading-none mb-1 font-sans">Cố lên! Đọc rõ chữ hơn</h4>
                          <p className="text-xs font-bold leading-normal">
                            Chúng tôi nhận được: "{transcript || "..."}" ({accuracy || 0}%). Hãy nhấn microphone và nói to, dứt khoát hơn.
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-row gap-3">
                    {!isCorrect && (
                      <button
                        onClick={() => {
                          setIsAnswered(false);
                          setIsCorrect(null);
                          setAccuracy(null);
                          setTranscript('');
                        }}
                        className="flex-1 py-3 rounded-2xl bg-white border-2 border-duo-gray border-b-4 text-slate-500 font-black text-xs uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-98 cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Nói lại
                      </button>
                    )}
                    <button
                      onClick={handleContinue}
                      className={cn(
                        "py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider border-2 transition-all flex items-center justify-center gap-2 cursor-pointer",
                        isCorrect ? "flex-1 bg-duo-green text-white border-duo-green-dark shadow-[0_4px_0_#46A302] hover:brightness-105" : "px-6 bg-slate-500 text-white border-slate-600 shadow-[0_4px_0_#333] hover:brightness-105"
                      )}
                    >
                      <span>Tiếp tục</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      ) : (
        /* Summary State (Same styled congratulations output screen) */
        <div className="bg-white border-2 border-duo-gray border-b-4 rounded-[2rem] p-8 text-center max-w-md mx-auto relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            {/* Visual Medallion Badge */}
            <div className="w-24 h-24 bg-duo-green-light border-4 border-duo-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-md relative">
              <Sparkles className="w-12 h-12 text-[#58CC02]" />
            </div>

            <div className="text-center mb-1 text-[10px] font-black uppercase tracking-widest text-[#B59A35] font-sans">
              BÀI LUYỆN HOÀN THÀNH
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-none mb-6 font-sans">
              {score >= 8 ? "Hoàn thành tuyệt vời! 🌟" : "Cố gắng lên! 💪"}
            </h3>

            {/* Statistics Dashboard */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-50 border-2 border-slate-200/50 border-b-4 rounded-2xl flex flex-col items-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 font-sans">Điểm của bạn</span>
                <span className="text-lg sm:text-xl font-black text-slate-700 leading-none font-mono">{score}/10</span>
              </div>
              <div className="p-4 bg-slate-50 border-2 border-slate-200/50 border-b-4 rounded-2xl flex flex-col items-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 font-sans">Chuỗi đỉnh</span>
                <span className="text-lg sm:text-xl font-black text-duo-orange leading-none font-sans">
                  {maxStreak} <span className="text-[10px] font-bold text-slate-400">từ</span>
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3">
              <button
                onClick={restartQuiz}
                className="w-full bg-duo-green text-white border-2 border-duo-green-dark shadow-[0_4px_0_#46A302] py-3.5 rounded-2xl font-black text-xs uppercase tracking-wide cursor-pointer transition-all hover:brightness-105 active:scale-98"
              >
                Luyện tập tiếp
              </button>
              
              {/* Optional Next Lesson Transition */}
              {nextLesson && onSelectNextLesson ? (
                <button
                  onClick={() => onSelectNextLesson(nextLesson.id)}
                  className="w-full bg-white border-2 border-duo-gray border-b-4 text-slate-550 py-3 rounded-2xl font-black text-xs uppercase tracking-wide cursor-pointer hover:bg-slate-50 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  Bài học kế tiếp: {nextLesson.title}
                </button>
              ) : null}

              {onBackToMap && (
                <button
                  onClick={onBackToMap}
                  className="w-full bg-slate-50 border-2 border-slate-200 border-b-4 text-slate-500 py-3 rounded-2xl font-black text-xs uppercase tracking-wide cursor-pointer hover:bg-slate-100 active:scale-98 transition-all"
                >
                  Quay lại sơ đồ chính
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
