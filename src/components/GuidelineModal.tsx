import React from 'react';
import { motion } from 'motion/react';
import { X, BookOpen, BrainCircuit, Volume2, HelpCircle, CheckCircle2, Flame, Award } from 'lucide-react';

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
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[85vh] flex flex-col z-10"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50 relative">
          <div className="absolute top-0 right-16 w-24 h-24 bg-brand-red/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
              <BrainCircuit size={22} className="animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-brand-red">Phương Pháp Tư Duy</div>
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Giới thiệu & Hướng dẫn học</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200/60 rounded-xl transition-colors text-slate-400 hover:text-slate-600 cursor-pointer"
            aria-label="Đóng"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-sm leading-relaxed text-slate-600 font-medium">
          
          {/* Section 1: The Method */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-800">
              <Award className="text-brand-red" size={18} />
              <h3 className="font-black text-sm uppercase tracking-wider">Phương pháp MindMap Chinese là gì?</h3>
            </div>
            <p className="text-slate-600 leading-relaxed pl-6">
              Học từ vựng qua <span className="font-extrabold text-slate-800">Sơ đồ Tư duy (MindMap)</span> là phương pháp kết nối thông tin trực quan, 
              kích thích sự hoạt động đồng bộ của cả hai bán cầu não học thuật và hình ảnh. 
              Thay vì ghi nhớ rời rạc các chữ Hán riêng lẻ, não bộ của bạn sẽ liên kết <span className="text-brand-red font-bold">Từ chính (Từ gốc)</span> với các <span className="font-bold text-slate-800">Cụm từ ghép bổ trợ</span> và <span className="font-bold text-slate-800">Các ngữ động ví dụ thực tế</span>.
            </p>
          </div>

          {/* Core highlights grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100 flex gap-3">
              <div className="shrink-0 text-amber-500 mt-0.5">
                <Flame size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide mb-1">Ghi nhớ gấp 5 lần</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Liên kết ngữ cảnh thông minh tăng tốc khả năng lưu trữ thông tin của não bộ trung ương lên gấp 5 lần so với chép tay thông thường.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/40 border border-sky-100 flex gap-3">
              <div className="shrink-0 text-sky-500 mt-0.5">
                <Volume2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide mb-1">Âm thanh & highlight trực quan</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Kích hoạt phát âm chuẩn bản xứ một-chạm đồng bộ với việc tô màu nét chữ thời gian thực để khắc sâu cả <strong>Phát âm - Phiên âm - Chữ Hán</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: How to learn */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-800">
              <BookOpen className="text-brand-red" size={18} />
              <h3 className="font-black text-sm uppercase tracking-wider">3 Bước Học Tối Ưu Hiệu Quả</h3>
            </div>

            <div className="space-y-4 pl-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              
              {/* Step 1 */}
              <div className="relative flex gap-4">
                <div className="absolute left-[-20px] w-6 h-6 rounded-full bg-brand-red/10 border-2 border-white flex items-center justify-center shrink-0 mt-0.5 text-brand-red font-black text-xs">
                  1
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 uppercase text-xs tracking-wider mb-0.5">Quan sát & Liên tưởng Sơ đồ</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Chọn một bài học từ danh sách, bấm chọn sơ đồ tư duy để phóng to/thu phóng. Hãy dành 1-2 phút quan sát nhánh tủa ra của các từ vựng để hiểu sự phát triển ý từ trung tâm ra bên ngoài.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex gap-4">
                <div className="absolute left-[-20px] w-6 h-6 rounded-full bg-brand-red/10 border-2 border-white flex items-center justify-center shrink-0 mt-0.5 text-brand-red font-black text-xs">
                  2
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 uppercase text-xs tracking-wider mb-0.5">Chạm để nghe phát âm & nhìn highlight</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Bấm vào từng nút chữ Hán, phiên âm. Lắng nghe cẩn thận audio, theo dõi vùng chữ được bôi màu nhấp nháy chạy mượt mà để đồng bộ thính giác & thị giác. Đọc to theo ngữ điệu máy phát ra.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex gap-4">
                <div className="absolute left-[-20px] w-6 h-6 rounded-full bg-brand-red/10 border-2 border-white flex items-center justify-center shrink-0 mt-0.5 text-brand-red font-black text-xs">
                  3
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 uppercase text-xs tracking-wider mb-0.5">Tra cứu phản xạ linh hoạt</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Sử dụng tab <strong>TRA CỨU TỪ ĐIỂN</strong> hoặc thanh tìm kiếm để tìm lại các cụm từ, câu ví dụ đã học, thực hành tự kiểm định trí nhớ ngẫu nhiên để biến ngôn ngữ thành phản xạ vô điều kiện.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Golden Rule Tip */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-250 flex gap-3 text-xs text-emerald-800 font-semibold leading-relaxed">
            <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-600" />
            <div>
              <p className="font-bold text-emerald-900 mb-0.5">Bí quyết bỏ túi cực đỉnh</p>
              Học <strong>15 phút đều đặn mỗi ngày</strong> hiệu quả hơn 3 tiếng dồn dập cuối tuần. Hãy vừa bấm sơ đồ vừa lẩm nhẩm đọc to thành tiếng theo nhịp điệu phát âm để kích hoạt vùng cơ phát âm phản xạ!
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-brand-red text-white font-black text-xs uppercase tracking-widest rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Đầu óc thông suốt • Bắt đầu học
          </button>
        </div>
      </motion.div>
    </div>
  );
};
