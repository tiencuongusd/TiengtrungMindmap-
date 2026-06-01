import React from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Sparkles, MessageSquare } from 'lucide-react';
import { MindMapNode as MindMapNodeType } from '../types';
import { playChineseAudio, stopChineseAudio, useAudioPlayback, useAudioSettings } from '../lib/audio';
import { cn } from '../lib/utils';

interface Props {
  node: MindMapNodeType;
  level?: number; // 0 = Từ chính, 1 = Từ phụ, 2 = Cụm từ, 3 = Câu ví dụ
  isRoot?: boolean; // Tương thích ngược
  hideBadge?: boolean;
}

export const MindMapNode: React.FC<Props> = ({ node, level, isRoot, hideBadge }) => {
  const playback = useAudioPlayback();
  const settings = useAudioSettings();
  const isCurrentText = playback.isSpeaking && playback.text === node.chinese;

  // Xác định rõ ràng phân lớp dữ liệu: 0 = Từ chính, 1 = Từ phụ, 2 = Cụm từ, 3 = Câu
  const activeLevel = level !== undefined ? level : (isRoot ? 0 : 2);

  const renderChineseText = (textSizeClass: string) => {
    if (!isCurrentText) {
      return <span className={textSizeClass}>{node.chinese}</span>;
    }

    const chars = Array.from(node.chinese);
    return (
      <span className={cn("inline-block", textSizeClass)}>
        {chars.map((char, index) => {
          const isHighlighted = index >= playback.charIndex && index < playback.charIndex + playback.charLength;
          return (
            <span 
              key={index} 
              className={cn(
                "transition-all duration-150 inline-block",
                isHighlighted 
                  ? "text-red-500 font-black scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" 
                  : "opacity-60"
              )}
            >
              {char}
            </span>
          );
        })}
      </span>
    );
  };

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentText) {
      stopChineseAudio();
    } else {
      playChineseAudio(node.chinese);
    }
  };

  // ============================================
  // CẤP ĐỘ 0: TỪ CHÍNH (Từ khóa trung tâm)
  // ============================================
  if (activeLevel === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 20px 40px -15px rgba(239, 68, 68, 0.2), 0 10px 20px -10px rgba(239, 68, 68, 0.1)"
        }}
        className={cn(
          "relative w-40 h-44 md:w-52 md:h-56 rounded-[2.5rem] bg-gradient-to-b from-white to-slate-50 flex flex-col items-center justify-center p-5 text-center transition-all duration-300 no-select border-4 shadow-xl z-20",
          isCurrentText 
            ? "border-red-500 shadow-red-200 ring-8 ring-red-500/10"
            : "border-amber-400 shadow-amber-100"
        )}
      >
        {/* Huy hiệu nổi bật phía trên */}
        {!hideBadge && (
          <div className="absolute -top-3.5 px-3 py-1 bg-gradient-to-r from-brand-red to-amber-500 text-white text-[9px] uppercase font-black tracking-widest rounded-full shadow-md z-30 flex items-center gap-1">
            <Sparkles size={10} className="animate-pulse" />
            TỪ CHÍNH / TỪ GỐC
          </div>
        )}

        <div className="flex flex-col items-center w-full mt-2">
          <span className="font-extrabold tracking-tight text-lg text-brand-red mb-2">
            {node.vietnamese}
          </span>

          {renderChineseText("leading-tight chinese-char font-black text-4xl md:text-5xl text-slate-900")}
          
          <span className={cn(
            "text-[10px] md:text-[12px] uppercase font-bold tracking-[0.15em] transition-colors duration-300 mt-2",
            isCurrentText ? "text-red-500" : "text-amber-600"
          )}>
            {node.pinyin}
          </span>

          {node.vietnameseHint && settings.showVietnameseHint !== false && (
            <span className="text-[11px] md:text-[12px] mt-1 font-semibold text-slate-400 italic">
              {node.vietnameseHint}
            </span>
          )}
        </div>

        {/* Nút phát âm nổi ngay góc dưới */}
        <div className="absolute bottom-3 right-3">
          <button
            onClick={handlePlayAudio}
            className={cn(
              "p-2 rounded-full transition-all shadow-sm cursor-pointer",
              isCurrentText
                ? "bg-red-500 text-white animate-bounce"
                : "bg-amber-50 hover:bg-amber-100 text-amber-600 hover:text-amber-700 border border-amber-200"
            )}
            title={isCurrentText ? "Dừng đọc" : "Đọc âm thanh"}
          >
            {isCurrentText ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </motion.div>
    );
  }

  // ============================================
  // CẤP ĐỘ 1: TỪ PHỤ (Từ mở rộng trực tiếp)
  // ============================================
  if (activeLevel === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "w-full pl-3.5 py-2 text-left relative transition-all duration-300 no-select border-l-2 flex flex-col gap-1",
          isCurrentText 
            ? "border-red-500 bg-red-50/5 rounded-r-2xl" 
            : "border-slate-200 hover:border-amber-400 hover:bg-slate-50/30 rounded-r-2xl"
        )}
      >
        <div className="flex items-center justify-between w-full font-sans">
          <span className="text-[9px] uppercase tracking-wider font-extrabold text-amber-500 flex items-center gap-1">
            ✦ TỪ PHỤ / LIÊN KẾT
          </span>
          <button
            onClick={handlePlayAudio}
            className={cn(
              "p-1 rounded-lg transition-all cursor-pointer",
              isCurrentText ? "text-red-500 bg-red-100/50" : "text-slate-300 hover:text-amber-600 hover:bg-slate-100"
            )}
            title={isCurrentText ? "Dừng đọc" : "Đọc âm thanh"}
          >
            {isCurrentText ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
        </div>

        <span className="font-extrabold text-sm md:text-base text-brand-red text-left">
          {node.vietnamese}
        </span>

        {renderChineseText("leading-tight chinese-char font-extrabold text-lg md:text-xl text-slate-800 text-left")}

        <div className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-semibold text-slate-500 mt-0.5">
          <span className={cn(isCurrentText ? "text-red-500" : "text-amber-600")}>{node.pinyin}</span>
          {node.vietnameseHint && settings.showVietnameseHint !== false && (
            <span className="text-slate-450 italic">({node.vietnameseHint})</span>
          )}
        </div>
      </motion.div>
    );
  }

  // ============================================
  // CẤP ĐỘ 2: CỤM TỪ (Cụm cấu trúc bổ trợ)
  // ============================================
  if (activeLevel === 2) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "w-full pl-3.5 py-2 text-left relative transition-all duration-300 no-select border-l-2 flex flex-col gap-1",
          isCurrentText 
            ? "border-red-500 bg-red-50/5 rounded-r-2xl" 
            : "border-slate-200 hover:border-amber-400 hover:bg-slate-50/30 rounded-r-2xl"
        )}
      >
        <div className="flex items-center justify-between w-full">
          <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">Cụm từ</span>
          <button
            onClick={handlePlayAudio}
            className={cn(
              "p-1 rounded-lg transition-all cursor-pointer",
              isCurrentText ? "text-red-500 bg-red-100/50" : "text-slate-300 hover:text-amber-600 hover:bg-slate-100"
            )}
            title={isCurrentText ? "Dừng đọc" : "Đọc âm thanh"}
          >
            {isCurrentText ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
        </div>

        <span className="font-extrabold text-sm md:text-base text-brand-red text-left">
          {node.vietnamese}
        </span>

        {renderChineseText("leading-tight chinese-char font-extrabold text-lg md:text-xl text-slate-800 text-left")}

        <div className="flex flex-wrap items-center gap-1.5 text-[10.5px] font-semibold text-slate-500 mt-0.5">
          <span className={cn(isCurrentText ? "text-red-500" : "text-amber-600")}>{node.pinyin}</span>
          {node.vietnameseHint && settings.showVietnameseHint !== false && (
            <span className="text-slate-450 italic">({node.vietnameseHint})</span>
          )}
        </div>
      </motion.div>
    );
  }

  // ============================================
  // CẤP ĐỘ 3: CÂU VÍ DỤ (Mẫu câu giao tiếp)
  // ============================================
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "w-full pl-3 py-2 text-left relative transition-all duration-300 no-select border-l-2 flex flex-col gap-1",
        isCurrentText 
          ? "border-red-500 bg-red-50/5 rounded-r-2xl" 
          : "border-slate-200 hover:border-amber-400 hover:bg-slate-50/30 rounded-r-2xl"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 flex items-center gap-1">
          <MessageSquare size={10} className="text-amber-500" />
          Câu ví dụ
        </span>
        <button
          onClick={handlePlayAudio}
          className={cn(
            "p-1 rounded-lg transition-all cursor-pointer",
            isCurrentText ? "text-red-500 bg-red-100/50" : "text-slate-300 hover:text-amber-600 hover:bg-slate-100"
          )}
          title={isCurrentText ? "Dừng đọc" : "Đọc âm thanh"}
        >
          {isCurrentText ? <VolumeX size={11} /> : <Volume2 size={11} />}
        </button>
      </div>

      <span className="font-bold text-xs md:text-sm text-brand-red text-left leading-snug">
        {node.vietnamese}
      </span>

      {renderChineseText("leading-relaxed chinese-char font-bold text-[14px] md:text-base text-slate-700 text-left")}

      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold text-slate-500 mt-0.5">
        <span className={cn(isCurrentText ? "text-red-500" : "text-amber-700/80")}>{node.pinyin}</span>
        {node.vietnameseHint && settings.showVietnameseHint !== false && (
          <span className="text-slate-450 italic font-medium">({node.vietnameseHint})</span>
        )}
      </div>
    </motion.div>
  );
};
