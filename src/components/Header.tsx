import React, { useState } from 'react';
import { Search, Library, Info, Settings, Compass, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { AudioSettingsModal } from './AudioSettings';

interface Props {
  activeTab: 'lessons' | 'vocab';
  onTabChange: (tab: 'lessons' | 'vocab') => void;
}

export const Header: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const tabs = [
    { id: 'lessons', label: 'BÀI HỌC', emoji: '🟢', icon: Library, activeColor: 'text-[#58CC02]' },
    { id: 'vocab', label: 'TRA CỨU', emoji: '🔍', icon: Compass, activeColor: 'text-[#1CB0F6]' },
  ] as const;

  return (
    <>
      <header className="h-16 md:h-20 border-b-4 border-duo-gray bg-white sticky top-0 z-50 flex items-center justify-between px-4 md:px-10">
        <div className="flex items-center gap-2">
          {/* Logo with Duolingo Mascot vibes (super cute Chinese Flag / Duo inspired colors) */}
          <div className="w-9 h-9 md:w-11 md:h-11 bg-duo-green rounded-xl flex items-center justify-center font-black text-white text-base md:text-xl shadow-[0_4px_0_#46A302] border-2 border-white">
            中
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm md:text-xl font-black tracking-wider uppercase leading-none text-duo-green flex items-center gap-1.5">
              MINDMAP <span className="text-duo-red">CHINESE</span>
            </h1>
            <span className="text-[8px] md:text-[9px] font-black text-duo-sub uppercase tracking-widest hidden xs:block">Học tiếng Trung cực dễ</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav className="flex items-center gap-1 sm:gap-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl flex items-center gap-1.5 md:gap-2.5 font-black text-[10px] md:text-xs transition-all tracking-wider select-none cursor-pointer border-2",
                    isActive 
                      ? "bg-white border-[#E5E5E5] text-slate-800 border-b-4 shadow-sm" 
                      : "bg-transparent border-transparent text-duo-sub/70 hover:text-slate-800 hover:bg-slate-50"
                  )}
                >
                  <span className="text-sm md:text-base leading-none">
                    {tab.id === 'lessons' ? '📚' : tab.id === 'vocab' ? '🔍' : '👑'}
                  </span>
                  <span className={cn("hidden sm:inline", isActive && tab.activeColor)}>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="w-px h-8 bg-duo-gray mx-1 hidden sm:block" />

          {/* Quick Voice Selector in Duolingo style */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 md:p-3 bg-white border-2 border-duo-gray hover:bg-slate-50 border-b-4 active:border-b-2 active:translate-y-0.5 rounded-xl md:rounded-2xl transition-all text-duo-sub hover:text-duo-blue cursor-pointer flex items-center justify-center"
            title="Cài đặt giọng đọc"
          >
            <Settings size={18} className="animate-spin-slow" />
          </button>
        </div>
      </header>

      <AudioSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};
