import React from 'react';
import { motion } from 'motion/react';
import { X, BookOpen, BrainCircuit, Award, Mail, Settings, Layers } from 'lucide-react';

interface GuidelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidelineModal: React.FC<GuidelineModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-2xl rounded-3xl border-2 border-duo-gray border-b-6 overflow-hidden z-10 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b-2 border-duo-gray flex items-center justify-between bg-white relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EFFFEC] border-2 border-duo-green text-duo-green flex items-center justify-center shadow-[0_2px_0_#46A302]">
              <BrainCircuit size={20} className="animate-pulse text-duo-green" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.14em] text-duo-green font-sans leading-none mb-1">PHƯƠNG PHÁP TƯ DUY</div>
              <h2 className="text-base sm:text-lg font-black text-slate-800 uppercase tracking-tight font-sans leading-none">Giới thiệu &amp; Chương trình học</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 border-2 border-duo-gray border-b-4 hover:border-slate-400 active:translate-y-[2px] active:border-b-2 rounded-xl text-slate-400 hover:text-slate-600 bg-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Đóng"
          >
            <X size={16} className="stroke-[3]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-600 font-bold overflow-y-auto max-h-[60vh]">
          
          {/* Section 1: The Method */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-800">
              <Award className="text-duo-orange shrink-0 stroke-[2.5]" size={18} />
              <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-800 font-sans">Phương pháp MindMap Chinese là gì?</h3>
            </div>
            <p className="text-slate-500 font-bold leading-relaxed">
              Học từ vựng qua <span className="font-black text-slate-800">Sơ đồ Tư duy (MindMap)</span> là kết nối trực quan sinh động, kích thích hoạt động đồng bộ của cả hai bán cầu não. Thay vì nhớ rời rạc, não bộ của bạn sẽ liên kết <span className="text-duo-orange font-black">Từ chính (Từ gốc)</span> với các <span className="font-black text-slate-800">Cụm từ ghép bổ trợ</span> và <span className="font-black text-slate-800">Ngữ cảnh ví dụ thực tế</span>.
            </p>
          </div>

          {/* Section 2: Course Information */}
          <div className="space-y-3 pt-4 border-t-2 border-duo-gray">
            <div className="flex items-center gap-2 text-slate-800">
              <Layers className="text-duo-blue shrink-0 stroke-[2.5]" size={18} />
              <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-800 font-sans">Chương Trình Học Toàn Diện</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 border-2 border-duo-gray">
                <div className="font-black text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 font-sans">
                  <span className="w-2.5 h-2.5 bg-slate-500 rounded-full" />
                  Phần 1: Cơ bản
                </div>
                <ul className="space-y-1.5 text-xs text-duo-sub font-bold font-sans">
                  <li>• <strong className="text-slate-700 font-black">10</strong> chủ đề học tập phong phú</li>
                  <li>• <strong className="text-slate-700 font-black">100</strong> bài giảng mindmap</li>
                  <li>• <strong className="text-slate-700 font-black">1.000</strong> từ vựng cốt lõi</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#EFFFEC] border-2 border-duo-green border-b-4">
                <div className="font-black text-duo-green text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 font-sans">
                  <span className="w-2.5 h-2.5 bg-duo-green rounded-full animate-pulse" />
                  Phần 2: Chuyên ngành
                </div>
                <ul className="space-y-1.5 text-xs text-duo-green-dark font-bold font-sans">
                  <li>• <strong className="text-slate-800 font-black">5</strong> chủ đề chuyên môn đặc thù</li>
                  <li>• <strong className="text-slate-800 font-black">50</strong> bài giảng thực nghiệm</li>
                  <li>• <strong className="text-slate-800 font-black">500</strong> từ chuyên ngành cốt lõi</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Content Structure */}
          <div className="space-y-3 pt-4 border-t-2 border-duo-gray">
            <div className="flex items-center gap-2 text-slate-800">
              <BookOpen className="text-duo-purple shrink-0 stroke-[2.5]" size={18} />
              <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-800 font-sans">Cấu Trúc Nội Dung Bài Học</h3>
            </div>
            
            <div className="space-y-2 pl-1">
              <p className="text-xs sm:text-sm text-slate-500 font-bold">
                Mỗi bài học được thiết kế chặt chẽ và nhất quán bao gồm các cấu phần giúp bạn học tập đa chiều:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pl-2 font-sans font-black">
                <div className="flex items-center gap-1.5 text-slate-700">• Học Từ chính, Cụm từ &amp; ví dụ</div>
                <div className="flex items-center gap-1.5 text-slate-700">• Phát âm chuẩn bản xứ</div>
                <div className="flex items-center gap-1.5 text-slate-700">• Phiên âm bồi dịch Việt</div>
                <div className="flex items-center gap-1.5 text-slate-700">• Luyện viết chữ Hán cơ bản</div>
              </div>
              
              <div className="p-4 bg-[#FFFCE6] border-2 border-duo-yellow border-b-4 rounded-2xl flex gap-3 text-xs text-duo-orange mt-3">
                <Settings className="text-duo-orange shrink-0 mt-0.5 stroke-[2.5]" size={16} />
                <div>
                  <span className="font-black uppercase text-[10px] tracking-wider text-duo-orange-dark block mb-1 font-sans">CHÚ Ý VỀ PHIÊN ÂM BỒI </span>
                  <p className="leading-relaxed font-bold font-sans text-xs">
                    <strong className="font-black text-slate-800">Phiên âm bồi Tiếng Việt</strong> là công cụ hỗ trợ cho người mới bắt đầu học . Đây chỉ là công cụ hỗ trợ trải nghiệm. Bạn có thể chủ động <strong className="font-black text-slate-800">Bật / Tắt phiên bồi này</strong> bất cứ lúc nào trong bảng <strong className="font-black text-slate-800">Cài đặt</strong> (bánh răng ở góc trên thanh công cụ) để luyện đọc pinyin chuyên nghiệp.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Email support */}
          <div className="p-4 rounded-2xl bg-stone-50 border-2 border-duo-gray flex items-center gap-3 text-xs text-slate-500 font-bold font-sans">
            <Mail size={16} className="text-slate-400 shrink-0 stroke-[2.5]" />
            <div>
              Mọi ý kiến đóng góp, phản hồi về bài học hoặc kỹ thuật xin vui lòng gửi thư điện tử chính thức: <a href="mailto:tiengtrungmindmap@gmail.com" className="font-black text-slate-800 hover:text-duo-red underline transition-colors">tiengtrungmindmap@gmail.com</a>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 bg-white border-t-2 border-duo-gray flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 bg-duo-green border-b-4 border-duo-green-dark hover:bg-[#62e403] active:translate-y-[2px] active:border-b-2 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer font-sans text-center"
          >
            ĐẦU ÓC THÔNG SUỐT • BẮT ĐẦU HỌC NGAY
          </button>
        </div>
      </motion.div>
    </div>
  );
};
