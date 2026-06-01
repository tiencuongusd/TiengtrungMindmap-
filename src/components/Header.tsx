import React, { useState } from 'react';
import { Search, Library, Info, Settings } from 'lucide-react';
import { cn } from '../lib/utils';
import { AudioSettingsModal } from './AudioSettings';

interface Props {
  activeTab: 'lessons' | 'vocab' | 'contact';
  onTabChange: (tab: 'lessons' | 'vocab' | 'contact') => void;
}

export const Header: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const tabs = [
    { id: 'lessons', label: 'Bài học', sublabel: 'Trang chủ', icon: Library },
    { id: 'vocab', label: 'Từ vựng', sublabel: 'Tra cứu', icon: Search },
    { id: 'contact', label: 'Gói Premium', sublabel: 'Liên hệ', icon: Info },
  ] as const;

  return (
    <>
      <header className="h-16 md:h-20 border-b border-black/10 flex items-center justify-between px-4 md:px-10 bg-white sticky top-0 z-50">
        <div className="flex flex-col">
          <h1 className="text-lg md:text-2xl font-extrabold tracking-tighter uppercase leading-none text-brand-red">TIẾNG TRUNG MINDMAP</h1>
        </div>

        <div className="flex items-center gap-4 sm:gap-10">
          <nav className="flex items-center gap-2 sm:gap-6">
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <button 
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "flex flex-col items-center sm:items-end transition-colors",
                    activeTab === tab.id ? "text-brand-red" : "text-black/40 hover:text-black"
                  )}
                >
                  <div className="text-[10px] uppercase font-bold tracking-widest whitespace-nowrap">{tab.sublabel}</div>
                  <div className="font-bold flex items-center gap-2">
                    <tab.icon size={16} />
                    <span className="hidden xs:inline">{tab.label}</span>
                  </div>
                </button>
                {index < tabs.length - 1 && <div className="w-px h-8 bg-black/10 mx-2 hidden sm:block" />}
              </React.Fragment>
            ))}
          </nav>

          <div className="hidden md:block w-px h-10 bg-black/5" />

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="group p-2 hover:bg-slate-100 rounded-full transition-colors text-black/40 hover:text-brand-red"
            title="Cài đặt giọng đọc"
          >
            <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>
      </header>

      <AudioSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};
