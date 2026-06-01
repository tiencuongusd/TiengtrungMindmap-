import React from 'react';
import { MindMapNode as MindMapNodeType } from '../types';
import { MindMapNode } from './MindMapNode';

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
            <div key={level1.id} className="flex flex-col gap-6 p-6 rounded-[2rem] bg-white/60 backdrop-blur-sm border border-slate-100 shadow-xl shadow-slate-200/45 hover:shadow-2xl hover:shadow-amber-100/10 transition-all duration-500">
              {/* Level 1 Node (Sub-topic) */}
              <div className="w-full">
                <MindMapNode node={level1} level={1} />
              </div>

              {/* Level 2 Nodes (Examples/Phrases) */}
              {level1.children && level1.children.length > 0 && (
                <div className="flex flex-col gap-4">
                  {/* Đường phân tách tối giản */}
                  <div className="border-t border-dashed border-slate-200/60 my-1" />

                  {level1.children.map((level2) => (
                    <div key={level2.id} className="group relative">
                      <MindMapNode node={level2} level={2} />
                      
                      {/* Level 3 if any */}
                      {level2.children && level2.children.length > 0 && (
                        <div className="mt-2 pl-4 flex flex-col gap-2 relative">
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
  return (
    <div className="w-full relative min-h-[600px] flex flex-col items-center justify-start py-8 md:py-4">
      {/* Dynamic Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center overflow-hidden">
        <div className="text-[20vw] font-black uppercase tracking-tighter rotate-12 no-select leading-none">
          {rootNodes[0]?.chinese || 'MINDMAP'}
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
