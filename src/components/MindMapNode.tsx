import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { MindMapNode as MindMapNodeType } from '../types';
import { playChineseAudio, stopChineseAudio, useAudioPlayback, useAudioSettings } from '../lib/audio';
import { cn } from '../lib/utils';
import { lessons } from '../data/lessons';
import { CHIET_TU_DICT, ChietTu } from '../data/chietTu';

interface Props {
  node: MindMapNodeType;
  level?: number; // 0 = Từ chính, 1 = Từ phụ, 2 = Cụm từ, 3 = Câu ví dụ
  isRoot?: boolean; // Tương thích ngược
  hideBadge?: boolean;
}

interface PinyinToken {
  text: string;
  isWord: boolean;
  charStartIndex?: number;
}

interface AlignedPinyinToken extends PinyinToken {
  chineseCharIndices: number[];
}

// ------------------------------------------------------------------------
// GLOBAL WORD TRANSLATION CACHE & DATABASE
// ------------------------------------------------------------------------
let globalWordMap: Record<string, { vietnamese: string; pinyin: string; list: string[] }> | null = null;

const getGlobalWordMap = () => {
  if (globalWordMap) return globalWordMap;

  const map: Record<string, { vietnamese: string; pinyin: string; list: string[] }> = {};

  const traverse = (n: MindMapNodeType) => {
    const key = n.chinese.trim();
    if (key) {
      if (!map[key]) {
        map[key] = {
          vietnamese: n.vietnamese,
          pinyin: n.pinyin,
          list: [n.vietnamese]
        };
      } else {
        if (!map[key].list.includes(n.vietnamese)) {
          map[key].list.push(n.vietnamese);
          map[key].vietnamese = map[key].list.join(" / ");
        }
      }
    }
    if (n.children) {
      n.children.forEach(traverse);
    }
  };

  lessons.forEach(lesson => {
    lesson.mindMaps.forEach(traverse);
  });

  globalWordMap = map;
  return map;
};

const COMMON_DICT: Record<string, { vietnamese: string; pinyin: string }> = {
  "我": { vietnamese: "Tôi, ta", pinyin: "wǒ" },
  "你": { vietnamese: "Bạn, cậu", pinyin: "nǐ" },
  "您": { vietnamese: "Ngài, quý khách", pinyin: "nín" },
  "他": { vietnamese: "Anh ấy", pinyin: "tā" },
  "她": { vietnamese: "Cô ấy", pinyin: "tā" },
  "它": { vietnamese: "Nó", pinyin: "tā" },
  "我们": { vietnamese: "Chúng tôi, chúng ta", pinyin: "wǒmen" },
  "你们": { vietnamese: "Các bạn", pinyin: "nǐmen" },
  "他们": { vietnamese: "Họ, các anh ấy", pinyin: "tāmen" },
  "她们": { vietnamese: "Các cô ấy", pinyin: "tāmen" },
  "这": { vietnamese: "Đây, này", pinyin: "zhè" },
  "那": { vietnamese: "Kia, đó", pinyin: "nà" },
  "哪": { vietnamese: "Nào, đâu", pinyin: "nǎ" },
  "的": { vietnamese: "Của (sở hữu, trợ từ)", pinyin: "de" },
  "是": { vietnamese: "Là, đúng", pinyin: "shì" },
  "在": { vietnamese: "Ở, tại, đang", pinyin: "zài" },
  "有": { vietnamese: "Có", pinyin: "yǒu" },
  "去": { vietnamese: "Đi", pinyin: "qù" },
  "来": { vietnamese: "Đến, tới", pinyin: "lái" },
  "不": { vietnamese: "Không (phủ định)", pinyin: "bù" },
  "很": { vietnamese: "Rất", pinyin: "hěn" },
  "好": { vietnamese: "Tốt, khỏe, đẹp", pinyin: "hǎo" },
  "学": { vietnamese: "Học", pinyin: "xué" },
  "和": { vietnamese: "Và, với", pinyin: "hé" },
  "都": { vietnamese: "Đều", pinyin: "dōu" },
  "也": { vietnamese: "Cũng", pinyin: "yě" },
  "没": { vietnamese: "Không, chưa", pinyin: "méi" },
  "看": { vietnamese: "Xem, nhìn, đọc", pinyin: "kàn" },
  "听": { vietnamese: "Nghe", pinyin: "tīng" },
  "说": { vietnamese: "Nói", pinyin: "shuō" },
  "写": { vietnamese: "Viết", pinyin: "xiě" },
  "读": { vietnamese: "Đọc", pinyin: "dú" },
  "请": { vietnamese: "Mời, xin", pinyin: "qǐng" },
  "问": { vietnamese: "Hỏi", pinyin: "wèn" },
  "个": { vietnamese: "Cái (lượng từ phổ biến)", pinyin: "gè" },
  "人": { vietnamese: "Người", pinyin: "rén" },
  "什么": { vietnamese: "Cái gì", pinyin: "shénme" },
  "怎么": { vietnamese: "Làm sao, thế nào", pinyin: "zěnme" },
  "呢": { vietnamese: "Thì sao, nhỉ", pinyin: "ne" },
  "吗": { vietnamese: "Không? (hỏi)", pinyin: "ma" },
  "吧": { vietnamese: "Đi, nhé, thôi", pinyin: "ba" },
  "了": { vietnamese: "Rồi", pinyin: "le" },
  "太": { vietnamese: "Quá, lắm", pinyin: "tài" },
  "小": { vietnamese: "Nhỏ", pinyin: "xiǎo" },
  "大": { vietnamese: "Lớn, đại", pinyin: "dà" },
  "家": { vietnamese: "Nhà, gia đình", pinyin: "jiā" },
  "公司": { vietnamese: "Công ty", pinyin: "gōngsī" },
  "工作": { vietnamese: "Công việc, làm việc", pinyin: "gōngzuò" },
  "做": { vietnamese: "Làm", pinyin: "zuò" },
  "想": { vietnamese: "Muốn, nhớ, nghĩ", pinyin: "xiǎng" },
  "要": { vietnamese: "Muốn, cần, phải", pinyin: "yào" },
  "能": { vietnamese: "Có thể", pinyin: "néng" },
  "会": { vietnamese: "Biết, sẽ", pinyin: "huì" },
  "可以": { vietnamese: "Có thể, được", pinyin: "kěyǐ" },
  "喜欢": { vietnamese: "Thích", pinyin: "xǐhuan" },
  "高兴": { vietnamese: "Vui vẻ", pinyin: "gāoxìng" },
  "漂亮": { vietnamese: "Đẹp", pinyin: "piàoliang" },
  "认识": { vietnamese: "Quen biết", pinyin: "rènshi" },
  "谢谢": { vietnamese: "Cảm ơn", pinyin: "xièxie" },
  "再见": { vietnamese: "Tạm biệt", pinyin: "zàijiàn" },
  "介绍": { vietnamese: "Giới thiệu", pinyin: "jièshào" },
  "同事": { vietnamese: "Đồng nghiệp", pinyin: "tóngshì" },
  "部门": { vietnamese: "Bộ phận, phòng ban", pinyin: "bùmén" },
  "产品": { vietnamese: "Sản phẩm", pinyin: "chǎnpǐn" },
  "服务": { vietnamese: "Dịch vụ", pinyin: "fúwù" },
  "流程": { vietnamese: "Quy trình, tiến trình", pinyin: "liúchéng" },
  "新": { vietnamese: "Mới", pinyin: "xīn" },
  "老": { vietnamese: "Cũ, lâu năm", pinyin: "lǎo" },
  "老板": { vietnamese: "Ông chủ, sếp", pinyin: "lǎobǎn" },
  "经理": { vietnamese: "Giám đốc, quản lý", pinyin: "jīnglǐ" },
  "总监": { vietnamese: "Giám đốc bộ phận", pinyin: "zǒngjiān" },
  "助理": { vietnamese: "Trợ lý", pinyin: "zhùlǐ" },
  "秘书": { vietnamese: "Thư ký", pinyin: "mìshū" },
  "人事": { vietnamese: "Nhân sự", pinyin: "rénshì" },
  "财务": { vietnamese: "Tài chính", pinyin: "cáiwù" },
  "市场": { vietnamese: "Thị trường, marketing", pinyin: "shìchǎng" },
  "技术": { vietnamese: "Kỹ thuật, công nghệ", pinyin: "jìshù" },
  "销售": { vietnamese: "Bán hàng, sales", pinyin: "xiāoshòu" },
  "客服": { vietnamese: "Chăm sóc khách hàng", pinyin: "kèfú" },
  "管理": { vietnamese: "Quản lý", pinyin: "guǎnlǐ" },
  "运营": { vietnamese: "Vận hành", pinyin: "yùnyíng" },
  "合作": { vietnamese: "Hợp tác", pinyin: "hézuò" },
  "开发": { vietnamese: "Phát triển", pinyin: "kāifā" },
  "设计": { vietnamese: "Thiết kế", pinyin: "shèjì" },
  "测试": { vietnamese: "Kiểm thử, test", pinyin: "cèshì" },
  "计划": { vietnamese: "Kế hoạch", pinyin: "jìhuà" },
  "报告": { vietnamese: "Báo cáo", pinyin: "bàogào" },
  "会议": { vietnamese: "Cuộc họp", pinyin: "huìyì" },
  "项目": { vietnamese: "Dự án", pinyin: "xiàngmù" },
  "任务": { vietnamese: "Nhiệm vụ", pinyin: "rènwu" },
  "进度": { vietnamese: "Tiến độ", pinyin: "jìndù" },
  "目标": { vietnamese: "Mục tiêu", pinyin: "mùbiāo" },
  "客户": { vietnamese: "Khách hàng", pinyin: "kèhù" },
  "对": { vietnamese: "Đối với, đúng", pinyin: "duì" },
  "一下": { vietnamese: "Một chút, một lát", pinyin: "yīxià" },
  "讲": { vietnamese: "Nói, giảng", pinyin: "jiǎng" },
  "谈": { vietnamese: "Đàm thoại, bàn bạc", pinyin: "tán" }
};

const lookupWord = (chinese: string): { vietnamese: string; pinyin: string } | null => {
  const clean = chinese.trim();
  if (!clean) return null;

  // 1. Try lesson maps
  const map = getGlobalWordMap();
  if (map[clean]) {
    return {
      vietnamese: map[clean].vietnamese,
      pinyin: map[clean].pinyin
    };
  }

  // 2. Try common dictionary
  if (COMMON_DICT[clean]) {
    return COMMON_DICT[clean];
  }

  return null;
};

const getWordDefinition = (chinese: string, pinyin: string): { vietnamese: string; pinyin: string } => {
  const direct = lookupWord(chinese);
  if (direct) return direct;

  if (chinese.length > 1) {
    const parts: string[] = [];
    for (let char of chinese) {
      const found = lookupWord(char);
      if (found) {
        parts.push(found.vietnamese);
      }
    }
    if (parts.length > 0) {
      return {
        vietnamese: parts.join(" • "),
        pinyin: pinyin
      };
    }
  }

  return {
    vietnamese: "Từ vựng / Từ bổ trợ",
    pinyin: pinyin
  };
};

const isPunctuationChar = (char: string): boolean => {
  return /[\s,.\/#!$%\^&\*;:{}=\-_`~()?"'，。？！、；：\u3000-\u303F\uFF00-\uFFEF]/g.test(char);
};

const getHanziIndices = (chinese: string): number[] => {
  const indices: number[] = [];
  for (let i = 0; i < chinese.length; i++) {
    if (!isPunctuationChar(chinese[i])) {
      indices.push(i);
    }
  }
  return indices;
};

const countPinyinSyllables = (word: string): number => {
  const vowelGroupRegex = /[aeiouüvāáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜüĀÁǍÀŌÓǑÒĒÉĚÈĪÍǏÌŪÚǓÙǕǗǓǛÜ]+/g;
  const matches = word.match(vowelGroupRegex);
  return matches ? matches.length : 1;
};

const tokenizePinyin = (pinyin: string): PinyinToken[] => {
  const tokens: PinyinToken[] = [];
  let i = 0;
  const pinyinRegex = /[a-zA-ZāáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜüĀÁǍÀŌÓǑÒĒÉĚÈĪÍǏÌŪÚǓÙǕǗǓǛÜ]/;
  
  while (i < pinyin.length) {
    const char = pinyin[i];
    if (pinyinRegex.test(char)) {
      let wordObj = "";
      const start = i;
      while (i < pinyin.length && pinyinRegex.test(pinyin[i])) {
        wordObj += pinyin[i];
        i++;
      }
      tokens.push({ text: wordObj, isWord: true, charStartIndex: start });
    } else {
      tokens.push({ text: char, isWord: false, charStartIndex: i });
      i++;
    }
  }
  return tokens;
};

export const MindMapNode: React.FC<Props> = ({ node, level, isRoot, hideBadge }) => {
  const playback = useAudioPlayback();
  const settings = useAudioSettings();
  const isCurrentText = playback.isSpeaking && !playback.isWordClick && playback.text === node.chinese;

  // Xác định rõ ràng phân lớp dữ liệu: 0 = Từ chính, 1 = Từ phụ, 2 = Cụm từ, 3 = Câu
  const activeLevel = level !== undefined ? level : (isRoot ? 0 : 2);

  const [clickedWord, setClickedWord] = React.useState<{
    text: string;
    pinyin: string;
    translation: string;
  } | null>(null);

  const [showDecomp, setShowDecomp] = React.useState(false);

  const matchedDecompositions = React.useMemo(() => {
    const list: ChietTu[] = [];
    const cleanChinese = (node.chinese || '').trim();
    if (!cleanChinese) return list;

    // 1. Kiểm tra từ ghép nguyên vẹn (ví dụ: "漂亮", "高兴", "认识", "经理", "老板", "谢谢", "再见", "介绍")
    if (CHIET_TU_DICT[cleanChinese]) {
      list.push(CHIET_TU_DICT[cleanChinese]);
    }

    // 2. Kiểm tra từng chữ đơn cấu thành (ví dụ: "工作" -> "工" + "作")
    for (const char of cleanChinese) {
      if (char !== cleanChinese && CHIET_TU_DICT[char]) {
        // Tránh trùng lặp
        if (!list.some(item => item.hanzi === char)) {
          list.push(CHIET_TU_DICT[char]);
        }
      }
    }

    // 3. Nếu không có ở các bước trên và chỉ có 1 chữ, kiểm tra từ điển chữ đơn từ danh sách
    if (list.length === 0 && cleanChinese.length === 1 && CHIET_TU_DICT[cleanChinese]) {
      list.push(CHIET_TU_DICT[cleanChinese]);
    }

    return list;
  }, [node.chinese]);

  const wordTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (!clickedWord) return;

    const handleGlobalClick = () => {
      setClickedWord(null);
    };

    const handleOtherWordClicked = (e: any) => {
      // Close the popup if a word was clicked on another node, or if it's a different word
      if (e.detail?.node !== node || e.detail?.word !== clickedWord.text) {
        setClickedWord(null);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('chinese-word-clicked', handleOtherWordClicked);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('chinese-word-clicked', handleOtherWordClicked);
    };
  }, [clickedWord, node]);

  // Word tokens computed at top level of the node
  const wordTokens = React.useMemo(() => {
    const tokens = tokenizePinyin(node.pinyin);
    const hanziIndices = getHanziIndices(node.chinese);
    
    let hanziPointer = 0;
    return tokens.map(token => {
      if (token.isWord) {
        const numSyllables = countPinyinSyllables(token.text);
        const chineseCharIndices = hanziIndices.slice(hanziPointer, hanziPointer + numSyllables);
        hanziPointer += numSyllables;
        const wordChinese = chineseCharIndices.map(idx => node.chinese[idx]).join("");
        return { 
          ...token, 
          chineseCharIndices,
          chineseText: wordChinese
        };
      }
      return { ...token, chineseCharIndices: [], chineseText: token.text };
    });
  }, [node.chinese, node.pinyin]);

  const chineseGroups = React.useMemo(() => {
    const groups: Array<{
      type: 'word' | 'punctuation';
      text: string;
      pinyin: string;
      tokenIndex: number;
    }> = [];

    const indexToTokenMap: Record<number, { token: any; index: number }> = {};
    wordTokens.forEach((token, tIdx) => {
      if (token.isWord) {
        token.chineseCharIndices.forEach(charIdx => {
          indexToTokenMap[charIdx] = { token, index: tIdx };
        });
      }
    });

    let currentGroup: {
      type: 'word' | 'punctuation';
      text: string;
      pinyin: string;
      tokenIndex: number;
    } | null = null;

    for (let i = 0; i < node.chinese.length; i++) {
      const char = node.chinese[i];
      const match = indexToTokenMap[i];

      if (match) {
        if (currentGroup && currentGroup.type === 'word' && currentGroup.tokenIndex === match.index) {
          currentGroup.text += char;
        } else {
          if (currentGroup) groups.push(currentGroup);
          currentGroup = {
            type: 'word',
            text: char,
            pinyin: match.token.text,
            tokenIndex: match.index
          };
        }
      } else {
        if (currentGroup && currentGroup.type === 'punctuation') {
          currentGroup.text += char;
        } else {
          if (currentGroup) groups.push(currentGroup);
          currentGroup = {
            type: 'punctuation',
            text: char,
            pinyin: '',
            tokenIndex: -1
          };
        }
      }
    }
    if (currentGroup) {
      groups.push(currentGroup);
    }

    let charPointer = 0;
    return groups.map(group => {
      const g = { ...group, startIdx: charPointer };
      charPointer += group.text.length;
      return g;
    });
  }, [node.chinese, wordTokens]);

  const handleWordClick = (e: React.MouseEvent, word: string, pinyin: string) => {
    e.stopPropagation();
    
    // Stop any general sentence playback
    stopChineseAudio();

    // Toggle off if clicking the same active word
    if (clickedWord && clickedWord.text === word) {
      setClickedWord(null);
      return;
    }

    // Speak only the clicked word
    playChineseAudio(word, true);

    // Notify other nodes to close their popups
    document.dispatchEvent(new CustomEvent('chinese-word-clicked', { 
      detail: { node, word } 
    }));

    // Dynamic meaning lookup from course database and fallbacks
    const definition = getWordDefinition(word, pinyin);

    setClickedWord({
      text: word,
      pinyin,
      translation: definition.vietnamese
    });

    if (wordTimerRef.current) {
      clearTimeout(wordTimerRef.current);
    }
  };

  const renderChineseText = (textSizeClass: string) => {
    const isNodeSpeaking = isCurrentText;

    return (
      <span className={cn("inline-flex flex-wrap items-center justify-center lg:justify-start gap-x-0.5", textSizeClass)}>
        {chineseGroups.map((group, groupIdx) => {
          if (group.type === 'punctuation') {
            return (
              <span key={groupIdx} className="opacity-90 select-none">
                {group.text}
              </span>
            );
          }

          const isGroupHasActiveWord = clickedWord?.text === group.text;

          return (
            <span
              key={groupIdx}
              onClick={(e) => handleWordClick(e, group.text, group.pinyin)}
              className={cn(
                "relative inline-block transition-all duration-150 rounded px-1 -mx-0.5 hover:bg-amber-100 hover:text-amber-900 cursor-pointer select-none border-b border-dashed border-slate-350/25 hover:border-amber-500",
                isGroupHasActiveWord ? "bg-amber-100 text-amber-900 font-extrabold border-amber-500" : ""
              )}
              title={`Nhấp để dịch "${group.text}"`}
            >
              {Array.from(group.text).map((char, charIdxInGroup) => {
                const globalCharIndex = group.startIdx + charIdxInGroup;
                const isHighlighted = isNodeSpeaking && 
                  globalCharIndex >= playback.charIndex && 
                  globalCharIndex < playback.charIndex + playback.charLength;

                return (
                  <span
                    key={charIdxInGroup}
                    className={cn(
                      "transition-all duration-150 inline-block",
                      isHighlighted
                        ? "text-red-500 font-black scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                        : "opacity-100"
                    )}
                  >
                    {char}
                  </span>
                );
              })}

              {/* Word Popup Tooltip */}
              <AnimatePresence>
                {isGroupHasActiveWord && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3.5 z-50 bg-duo-green border-2 border-duo-green-dark text-white text-xs font-sans font-bold px-4 py-2 rounded-2xl shadow-[0_4px_0_#46A302] flex flex-col items-center gap-1 min-w-[140px] max-w-[260px] sm:max-w-[320px] whitespace-normal text-center leading-tight cursor-default pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Down arrow pointing towards the word */}
                    <div className="absolute bottom-[-7px] left-1/2 -translate-x-1/2 w-3 h-3 bg-duo-green border-r-2 border-b-2 border-duo-green-dark rotate-45 z-[-1]" />
                    
                    <span className="text-[#FFFCE6] font-black text-[11px] uppercase tracking-wider font-sans">{group.pinyin}</span>
                    <span className="text-white font-black text-xs border-t border-white/20 mt-1 pt-1 font-sans">{clickedWord.translation}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          );
        })}
      </span>
    );
  };

  const renderPinyinText = (defaultClass: string) => {
    if (settings.showPinyin === false) {
      return null;
    }

    if (!isCurrentText) {
      return <span className={defaultClass}>{node.pinyin}</span>;
    }

    const tokens = tokenizePinyin(node.pinyin);
    const hanziIndices = getHanziIndices(node.chinese);
    
    let hanziPointer = 0;
    const alignedTokens: AlignedPinyinToken[] = tokens.map(token => {
      if (token.isWord) {
        const numSyllables = countPinyinSyllables(token.text);
        const chineseCharIndices = hanziIndices.slice(hanziPointer, hanziPointer + numSyllables);
        hanziPointer += numSyllables;
        return { ...token, chineseCharIndices };
      }
      return { ...token, chineseCharIndices: [] };
    });

    return (
      <span className={cn("inline-block", defaultClass)}>
        {alignedTokens.map((token, index) => {
          if (!token.isWord) {
            return <React.Fragment key={index}>{token.text}</React.Fragment>;
          }

          const isTokenHighlighted = token.chineseCharIndices.some(
            idx => idx >= playback.charIndex && idx < playback.charIndex + playback.charLength
          );

          return (
            <span
              key={index}
              className={cn(
                "transition-all duration-150 inline-block pointer-events-none",
                isTokenHighlighted
                  ? "text-red-500 font-extrabold scale-105 drop-shadow-[0_0_6px_rgba(239,68,68,0.35)]"
                  : "opacity-65"
              )}
            >
              {token.text}
            </span>
          );
        })}
      </span>
    );
  };

  const toggleNodeAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentText) {
      stopChineseAudio();
    } else {
      playChineseAudio(node.chinese);
    }
    setClickedWord(null);
    document.dispatchEvent(new CustomEvent('chinese-word-clicked', { 
      detail: { node, word: null } 
    }));
  };

  React.useEffect(() => {
    return () => {
      if (wordTimerRef.current) {
        clearTimeout(wordTimerRef.current);
      }
    };
  }, []);

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleNodeAudio(e);
  };

  // ============================================
  // CẤP ĐỘ 0: TỪ CHÍNH (Từ khóa trung tâm)
  // ============================================
  if (activeLevel === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={toggleNodeAudio}
        className="relative flex flex-col items-center justify-center py-2 px-4 text-center select-none z-20 cursor-pointer"
      >
        <div className="flex flex-col items-center w-full">
          {renderChineseText("leading-tight chinese-char font-black text-5xl md:text-6xl text-slate-900")}
          
          {renderPinyinText(
            cn(
              "text-[11px] md:text-[13px] uppercase font-bold tracking-[0.15em] transition-colors duration-300 mt-3",
              isCurrentText ? "" : "text-slate-900"
            )
          )}

          {node.vietnameseHint && settings.showVietnameseHint !== false && (
            <span className="text-[11.5px] md:text-[12.5px] mt-1.5 font-bold text-slate-450 italic">
              {node.vietnameseHint}
            </span>
          )}
        </div>

        {/* Căn giữa nút phát âm dưới các thành phần chữ rất đẹp */}
        <div className="mt-4 flex flex-col items-center gap-3 w-full">
          <button
            onClick={handlePlayAudio}
            className={cn(
              "p-2.5 bg-slate-100/80 border border-slate-200 text-slate-600 rounded-xl shadow-sm transition-all cursor-pointer hover:bg-slate-200",
              isCurrentText && "bg-red-50 text-red-500 border-red-200"
            )}
            title={isCurrentText ? "Dừng đọc" : "Đọc âm thanh"}
          >
            {isCurrentText ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* CHIẾT TỰ CHỮ HÁN CHO TỪ CHÍNH QUÝ GIÁ */}
          {matchedDecompositions.length > 0 && (
            <div className="mt-1 w-full max-w-[320px] sm:max-w-[380px] mx-auto text-left pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDecomp(!showDecomp);
                }}
                className={cn(
                  "w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-[10.5px] md:text-[11.5px] font-black tracking-wide uppercase transition-all shadow-sm border cursor-pointer",
                  showDecomp 
                    ? "bg-amber-100/90 hover:bg-amber-150/90 text-amber-800 border-amber-200"
                    : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                )}
              >
                <Sparkles size={11} className={cn("text-amber-500", showDecomp && "animate-pulse")} />
                {showDecomp ? "Ẩn giải mã chiết tự" : "Xem chiết tự chữ Hán"}
              </button>

              <AnimatePresence>
                {showDecomp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 10 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden"
                  >
                    <div 
                      className="bg-[#FFFDF3] border-2 border-amber-150 rounded-2xl p-3.5 shadow-sm flex flex-col gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h4 className="text-amber-900 font-black text-[11px] uppercase tracking-wider flex items-center gap-1 border-b border-amber-200/40 pb-1.5">
                        <Sparkles size={11} className="text-amber-500 animate-spin" />
                        💡 Giải mã chiết tự từ chính
                      </h4>
                      
                      <div className="flex flex-col gap-3">
                        {matchedDecompositions.map((item, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start border-b border-dashed border-amber-100 last:border-0 pb-3 last:pb-0">
                            {/* Hộp viết chữ Hán kẻ ô */}
                            <div className="relative w-10 h-10 min-w-[40px] flex items-center justify-center border border-dashed border-red-300/60 bg-white text-lg font-black rounded-xl text-slate-900 shadow-sm overflow-hidden flex-shrink-0 select-none">
                              {/* Kẻ chữ thập mờ nét đứt */}
                              <div className="absolute inset-x-0 border-t border-dashed border-red-100/40 top-1/2" />
                              <div className="absolute inset-y-0 border-l border-dashed border-red-100/40 left-1/2" />
                              <span className="relative z-10 leading-none chinese-char font-extrabold text-red-800">{item.hanzi}</span>
                            </div>

                            <div className="flex flex-col gap-0.5 leading-snug">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-700">{item.pinyin}</span>
                                <span className="text-[11px] font-black text-slate-800 tracking-wide font-sans">-{item.hanViet}-</span>
                              </div>
                              
                              {item.radicals && (
                                <div className="text-[9.5px] font-bold text-slate-450 italic">
                                  Cấu trúc: {item.radicals}
                                </div>
                              )}

                              <p className="text-[11.5px] font-medium text-slate-600 mt-1 leading-relaxed font-sans normal-case">
                                {item.mnemonic}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
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
        onClick={toggleNodeAudio}
        className={cn(
          "w-full pl-3.5 pr-8 py-2 text-left relative transition-all duration-300 no-select border-l-2 flex flex-col gap-1 cursor-pointer",
          isCurrentText 
            ? "border-red-500 bg-red-50/5 rounded-r-2xl" 
            : "border-slate-200 hover:border-amber-400 hover:bg-slate-50/30 rounded-r-2xl"
        )}
      >
        <button
          onClick={handlePlayAudio}
          className={cn(
            "absolute top-2.5 right-2.5 p-2 bg-slate-100/80 border border-slate-200 rounded-xl shadow-sm transition-all cursor-pointer z-10 hover:bg-slate-200",
            isCurrentText ? "bg-red-50 text-red-500 border-red-200" : "text-slate-600"
          )}
          title={isCurrentText ? "Dừng đọc" : "Đọc âm thanh"}
        >
          {isCurrentText ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        <span className="font-extrabold text-base md:text-lg text-duo-green text-left">
          {node.vietnamese}
        </span>

        {renderChineseText("leading-tight chinese-char font-extrabold text-3xl md:text-4xl text-slate-900 text-left")}

        <div className="flex flex-wrap items-center gap-1.5 text-[11.5px] md:text-[13px] font-semibold mt-0.5">
          {renderPinyinText(cn("font-semibold", isCurrentText ? "" : "text-slate-900"))}
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
        onClick={toggleNodeAudio}
        className={cn(
          "w-full pl-3.5 pr-8 py-2 text-left relative transition-all duration-300 no-select border-l-2 flex flex-col gap-1 cursor-pointer",
          isCurrentText 
            ? "border-red-500 bg-red-50/5 rounded-r-2xl" 
            : "border-slate-200 hover:border-amber-400 hover:bg-slate-50/30 rounded-r-2xl"
        )}
      >
        <button
          onClick={handlePlayAudio}
          className={cn(
            "absolute top-2.5 right-2.5 p-2 bg-slate-100/80 border border-slate-200 rounded-xl shadow-sm transition-all cursor-pointer z-10 hover:bg-slate-200",
            isCurrentText ? "bg-red-50 text-red-500 border-red-200" : "text-slate-600"
          )}
          title={isCurrentText ? "Dừng đọc" : "Đọc âm thanh"}
        >
          {isCurrentText ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        <span className="font-extrabold text-base md:text-lg text-duo-green text-left">
          {node.vietnamese}
        </span>

        {renderChineseText("leading-tight chinese-char font-extrabold text-3xl md:text-4xl text-slate-900 text-left")}

        <div className="flex flex-wrap items-center gap-1.5 text-[11.5px] md:text-[13px] font-semibold mt-0.5">
          {renderPinyinText(cn("font-semibold", isCurrentText ? "" : "text-slate-900"))}
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
      onClick={toggleNodeAudio}
      className={cn(
        "w-full pl-3.5 pr-8 py-2 text-left relative transition-all duration-300 no-select border-l-2 flex flex-col gap-1 cursor-pointer",
        isCurrentText 
          ? "border-red-500 bg-red-50/5 rounded-r-2xl" 
          : "border-slate-200 hover:border-amber-400 hover:bg-slate-50/30 rounded-r-2xl"
      )}
    >
      <button
        onClick={handlePlayAudio}
        className={cn(
          "absolute top-2.5 right-2.5 p-2 bg-slate-100/80 border border-slate-200 rounded-xl shadow-sm transition-all cursor-pointer z-10 hover:bg-slate-200",
          isCurrentText ? "bg-red-50 text-red-500 border-red-200" : "text-slate-600"
        )}
        title={isCurrentText ? "Dừng đọc" : "Đọc âm thanh"}
      >
        {isCurrentText ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>

      <span className="font-extrabold text-base md:text-lg text-duo-green text-left">
        {node.vietnamese}
      </span>

      {renderChineseText("leading-tight chinese-char font-extrabold text-3xl md:text-4xl text-slate-900 text-left")}

      <div className="flex flex-wrap items-center gap-1.5 text-[11.5px] md:text-[13px] font-semibold mt-0.5">
        {renderPinyinText(cn("font-semibold", isCurrentText ? "" : "text-slate-900"))}
        {node.vietnameseHint && settings.showVietnameseHint !== false && (
          <span className="text-slate-450 italic">({node.vietnameseHint})</span>
        )}
      </div>
    </motion.div>
  );
};
