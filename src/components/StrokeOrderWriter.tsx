import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Eye, EyeOff, Sparkles, HelpCircle } from 'lucide-react';
import HanziWriter from 'hanzi-writer';
import { Confetti } from './Confetti';

interface StrokeOrderWriterProps {
  word: string;
  onClose?: () => void;
}

const playSuccessSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Create a beautiful high chime/ding sound
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(987.77, ctx.currentTime); // B5 note
    osc1.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.1); // Slide to E6

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1975.53, ctx.currentTime); // High B6 harmonic for crisp crystal ping

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0); // Decay nicely

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);

    osc1.stop(ctx.currentTime + 1.1);
    osc2.stop(ctx.currentTime + 1.1);
  } catch (error) {
    console.warn("Failed to play success sound", error);
  }
};

export const StrokeOrderWriter: React.FC<StrokeOrderWriterProps> = ({ word, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);

  // Extract all Chinese characters from the word
  const charList = useMemo(() => {
    const wordStr = word || '';
    return wordStr.split('').filter((char: string) => /[\u4e00-\u9fa5]/.test(char));
  }, [word]);

  const [selectedChar, setSelectedChar] = useState<string>('');
  const [isQuizMode, setIsQuizMode] = useState<boolean>(false);
  const [showOutline, setShowOutline] = useState<boolean>(true);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState<number>(0);
  const [totalStrokes, setTotalStrokes] = useState<number>(0);
  const [successAnimation, setSuccessAnimation] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);

  // Set the first character as default when the list or word changes
  useEffect(() => {
    if (charList.length > 0) {
      setSelectedChar(charList[0]);
      setIsQuizMode(false);
      setQuizComplete(false);
    }
  }, [charList]);

  // Handle HanziWriter lifecycle
  useEffect(() => {
    if (!containerRef.current || !selectedChar) return;

    // Clear previous elements to avoid duplicates
    containerRef.current.innerHTML = '';

    // Create the writer instance
    const writer = HanziWriter.create(containerRef.current, selectedChar, {
      width: 180,
      height: 180,
      padding: 10,
      showOutline: showOutline,
      strokeColor: '#DE2910', // Brand red for standard strokes
      outlineColor: '#f1f5f9', // Slate-150 for skeleton outline
      drawingColor: '#1e293b', // Realistic deep ink black for calligraphy brush feel
      drawingWidth: 14, // Thicker brush strokes (changed from 7)
      strokeAnimationSpeed: 1.2,
      delayBetweenStrokes: 100,
    });

    writerRef.current = writer;

    // Get number of strokes
    // Wait, let's fetch total strokes if the library has it loaded
    const strokeData = (writer as any)._charData;
    if (strokeData && strokeData.strokes) {
      setTotalStrokes(strokeData.strokes.length);
    } else {
      // In case data isn't loaded synchronously yet, HanziWriter triggers a promise or callback,
      // but we can also just show standard visual elements.
      setTotalStrokes(0);
    }

    setCurrentStrokeIndex(0);
    setQuizComplete(false);

    if (isQuizMode) {
      writer.quiz({
        onCorrectStroke: (strokeData: any) => {
          setCurrentStrokeIndex(strokeData.strokeNum + 1);
        },
        onMistake: (strokeData: any) => {
          // Play mistake feedback or flash Red
          setIsShaking(true);
        },
        onComplete: (quizSummary: any) => {
          setQuizComplete(true);
          playSuccessSound();
          setSuccessAnimation(true);
          setIsCelebrating(true);
          setTimeout(() => setSuccessAnimation(false), 2050);
        },
      });
    } else {
      // Auto-animate on load is helpful and premium
      writer.animateCharacter();
    }

    return () => {
      if (writerRef.current) {
        writerRef.current.cancelQuiz();
      }
    };
  }, [selectedChar, isQuizMode, showOutline]);

  // Trigger animation of character
  const handleAnimate = () => {
    if (writerRef.current) {
      setIsQuizMode(false);
      setQuizComplete(false);
      writerRef.current.cancelQuiz();
      writerRef.current.animateCharacter();
    }
  };

  // Switch to quiz mode or reset current quiz
  const handleQuizMode = () => {
    setQuizComplete(false);
    setIsQuizMode(true);
  };

  const handleReset = () => {
    if (writerRef.current) {
      setQuizComplete(false);
      if (isQuizMode) {
        handleQuizMode();
      } else {
        writerRef.current.animateCharacter();
      }
    }
  };

  if (charList.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 text-center">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Không tìm thấy chữ Hán để tập viết.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-150 p-5 md:p-6 shadow-sm flex flex-col gap-6 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex justify-between items-start z-10">
        <div>
          <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-brand-red tracking-widest">
            <Sparkles size={11} className="text-amber-500 animate-pulse" />
            Đồ họa nét viết chuẩn
          </div>
          <h4 className="text-base font-extrabold text-slate-800 mt-0.5">Tập viết từng chữ</h4>
          <p className="text-[11px] text-amber-600 font-extrabold italic mt-1 leading-normal max-w-md">
            💡 Muốn viết chữ nào, click vào chữ đó ở phần trên, chữ đó sẽ xuất hiện ở khung tập viết.
          </p>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="text-xs font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider mt-1"
          >
            Đóng
          </button>
        )}
      </div>

      {/* Character Select Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-dashed border-slate-100 pb-4">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1">Chọn từ:</span>
        {charList.map((char, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedChar(char);
              setIsQuizMode(false);
              setQuizComplete(false);
            }}
            className={`w-9 h-9 md:w-10 md:h-10 text-xl font-bold rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              selectedChar === char
                ? 'bg-brand-red text-white shadow-md shadow-red-500/20 scale-105'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100'
            }`}
          >
            {char}
          </button>
        ))}
      </div>

      {/* Canvas Area Container */}
      <div className="flex flex-col items-center justify-center gap-5 my-2">
        <div className="relative">
          {/* Grid Background overlay for calligraphy training */}
          <div className="relative w-[180px] h-[180px] bg-slate-50/50 rounded-2xl border border-dashed border-amber-200 shadow-inner overflow-hidden">
            {/* Calligraphy Guide grid lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              {/* Mid lines */}
              <line x1="50" y1="0" x2="50" y2="100" stroke="#fbd5a9" strokeWidth="0.4" strokeDasharray="3,3" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#fbd5a9" strokeWidth="0.4" strokeDasharray="3,3" />
              {/* Diagonals */}
              <line x1="0" y1="0" x2="100" y2="100" stroke="#fef3c7" strokeWidth="0.4" strokeDasharray="3,3" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="#fef3c7" strokeWidth="0.4" strokeDasharray="3,3" />
              {/* Inner outline box */}
              <rect x="5" y="5" width="90" height="90" fill="none" stroke="#fed7aa" strokeWidth="0.3" strokeDasharray="4,4" />
            </svg>

            {/* HanziWriter target drawing div */}
            <motion.div 
              ref={containerRef} 
              id="hanzi-character-target" 
              animate={isShaking ? { x: [-6, 6, -6, 6, -3, 3, 0] } : { x: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              onAnimationComplete={() => setIsShaking(false)}
              className="absolute inset-0 z-10 flex items-center justify-center cursor-crosshair"
            />
          </div>

          {/* Success Banner Overlay */}
          <AnimatePresence>
            {(quizComplete || successAnimation) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 bg-emerald-500/95 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4 rounded-2xl z-20"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/10 mb-2">
                  <Sparkles className="text-emerald-500 animate-bounce" size={22} />
                </div>
                <h5 className="text-white font-black text-sm uppercase tracking-wide">Viết Tuyệt Vời!</h5>
                <p className="text-emerald-100 text-[10px] uppercase tracking-widest font-bold mt-1">Đã viết đúng tất cả nét</p>
                <button
                  onClick={handleReset}
                  className="mt-3 px-4 py-1.5 bg-white text-emerald-600 rounded-xl text-[10.5px] font-extrabold uppercase tracking-widest shadow-md hover:bg-emerald-50 transition-colors cursor-pointer"
                >
                  Viết lại
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Practice Guide Text overlay */}
        <div className="text-center">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
            {isQuizMode ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                Dùng chuột/tay vẽ theo gợi ý nét chữ
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
                Đang ở chế độ xem mẫu nét chuẩn
              </>
            )}
          </p>
        </div>
      </div>

      {/* Controller Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleAnimate}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
            !isQuizMode 
              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/15'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
          }`}
        >
          <Play size={13} fill="currentColor" />
          Xem mẫu (M)
        </button>

        <button
          onClick={handleQuizMode}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
            isQuizMode 
              ? 'bg-brand-red hover:bg-red-600 text-white shadow-lg shadow-red-500/15'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
          }`}
        >
          <Sparkles size={13} />
          Tự tập viết
        </button>
      </div>

      {/* Toggle outlines and restart controls */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
        <button
          onClick={() => setShowOutline(!showOutline)}
          className="flex items-center gap-1.5 hover:text-brand-red transition-colors py-1 cursor-pointer"
        >
          {showOutline ? <EyeOff size={14} /> : <Eye size={14} />}
          {showOutline ? 'Ẩn nét gợi ý' : 'Hiện nét gợi ý'}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 hover:text-brand-red transition-colors py-1 cursor-pointer"
          title="Lưu loát viết lại"
        >
          <RotateCcw size={14} />
          Viết nháp lại
        </button>
      </div>

      <Confetti active={isCelebrating} onComplete={() => setIsCelebrating(false)} />
    </div>
  );
};
