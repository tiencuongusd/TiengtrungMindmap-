import React from 'react';
import { MindMapNode as MindMapNodeType } from '../types';
import { MindMapNode } from './MindMapNode';
import { useAudioSettings, updateAudioSettings } from '../lib/audioStore';
import { cn } from '../lib/utils';

interface BranchProps {
  root: MindMapNodeType;
}

const Branch: React.FC<BranchProps> = ({ root }) => {
  return (
    <div className="w-full">
      {/* Children of the root - Grid approach */}
      {root.children && root.children.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full p-1">
          {root.children.map((level1) => (
            <div key={level1.id} className="flex flex-col gap-4 p-6 rounded-[2rem] bg-white/60 backdrop-blur-sm border border-slate-100 shadow-xl shadow-slate-200/45 hover:shadow-2xl hover:shadow-amber-100/10 transition-all duration-500">
              {/* Root Node (Từ chính) */}
              <div className="w-full border-b border-slate-100 pb-4 mb-2">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2 pl-3.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Từ chính
                </div>
                <MindMapNode node={root} level={1} />
              </div>

              {/* Level 1 Node (Sub-topic / Từ phụ) */}
              <div className="w-full">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2 pl-3.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Từ phụ
                </div>
                <MindMapNode node={level1} level={1} />
              </div>

              {/* Level 2 Nodes (Examples/Phrases) */}
              {level1.children && level1.children.length > 0 && (
                <div className="flex flex-col gap-4">
                  {level1.children.map((level2) => (
                    <div key={level2.id} className="group relative flex flex-col gap-4">
                      <MindMapNode node={level2} level={2} />
                      
                      {/* Level 3 if any */}
                      {level2.children && level2.children.length > 0 && (
                        <div className="flex flex-col gap-4 relative">
                          {level2.children.map((level3) => (
                            <MindMapNode key={level3.id} node={level3} level={3} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const MindMap: React.FC<{ rootNodes: MindMapNodeType[] }> = ({ rootNodes }) => {
  const settings = useAudioSettings();

  const togglePinyin = () => {
    updateAudioSettings({ showPinyin: settings.showPinyin !== false ? false : true });
  };

  const toggleBoiAm = () => {
    updateAudioSettings({ showVietnameseHint: settings.showVietnameseHint !== false ? false : true });
  };

  return (
    <div className="w-full relative min-h-[600px] flex flex-col items-center justify-start py-8 md:py-4">
      {/* Dynamic Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center overflow-hidden">
        <div className="text-[20vw] font-black uppercase tracking-tighter rotate-12 no-select leading-none">
          {rootNodes[0]?.chinese || 'MINDMAP'}
        </div>
      </div>

      {/* Modern Control Bar with Dual Segmented Toggles */}
      <div className="w-full max-w-xl mx-auto mb-10 p-1.5 bg-slate-50 border-2 border-duo-gray border-b-4 rounded-2xl flex flex-row items-center justify-between gap-4 z-20">
        <div className="pl-3 py-1 text-left hidden sm:block">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Hiển thị sơ đồ</span>
          <span className="text-[9px] font-extrabold text-slate-400 block leading-tight">Bật / tắt phiên âm</span>
        </div>
        
        <div className="flex flex-1 sm:flex-initial flex-row items-center gap-2">
          {/* PINYIN Toggle */}
          <button
            onClick={togglePinyin}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer active:scale-95 no-select ${
              settings.showPinyin !== false
                ? "bg-duo-green text-white border-duo-green-dark shadow-[0_2.5px_0_#46A302]"
                : "bg-white text-slate-450 border-duo-gray hover:text-slate-650 hover:border-slate-350"
            }`}
          >
            <span>Pinyin</span>
            <span className={cn("text-[9px] px-1.5 py-0.5 rounded-md font-extrabold", settings.showPinyin !== false ? "bg-black/15 text-[#FFFCE6]" : "bg-slate-100 text-slate-400")}>
              {settings.showPinyin !== false ? "BẬT" : "TẮT"}
            </span>
          </button>

          {/* BỒI ÂM Toggle */}
          <button
            onClick={toggleBoiAm}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer active:scale-95 no-select ${
              settings.showVietnameseHint !== false
                ? "bg-duo-green text-white border-duo-green-dark shadow-[0_2.5px_0_#46A302]"
                : "bg-white text-slate-450 border-duo-gray hover:text-slate-650 hover:border-slate-350"
            }`}
          >
            <span>Bồi âm</span>
            <span className={cn("text-[9px] px-1.5 py-0.5 rounded-md font-extrabold", settings.showVietnameseHint !== false ? "bg-black/15 text-[#FFFCE6]" : "bg-slate-100 text-slate-400")}>
              {settings.showVietnameseHint !== false ? "BẬT" : "TẮT"}
            </span>
          </button>
        </div>
      </div>
      
      <div className="w-full relative z-10 space-y-24">
        {rootNodes.map((root) => (
          <div key={root.id} className="relative">
            <Branch root={root} />
          </div>
        ))}
      </div>
    </div>
  );
};
