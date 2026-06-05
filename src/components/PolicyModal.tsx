import React from 'react';
import { motion } from 'motion/react';
import { X, ShieldAlert, Key, Eye, HelpCircle } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose }) => {
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
            <div className="w-10 h-10 rounded-xl bg-[#FFF2F2] border-2 border-duo-red text-duo-red flex items-center justify-center shadow-[0_2px_0_#EA2B2B]">
              <ShieldAlert size={20} className="text-duo-red" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.14em] text-duo-red font-sans leading-none mb-1">PHÁP LÝ &amp; QUY ĐỊNH</div>
              <h2 className="text-base sm:text-lg font-black text-slate-800 uppercase tracking-tight font-sans leading-none">Điều khoản &amp; Bảo mật</h2>
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
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm leading-relaxed text-[#3C3C3C] font-bold overflow-y-auto max-h-[60vh]">
          
          {/* Section 1: Điều khoản dịch vụ */}
          <div className="space-y-3 p-4 rounded-2xl bg-[#FFFCE6] border-2 border-duo-yellow border-b-4">
            <div className="flex items-center gap-2 text-slate-800">
              <Key className="text-duo-orange-dark font-bold stroke-[2.5]" size={18} />
              <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-duo-orange-dark font-sans">I. Điều khoản dịch vụ (TOS)</h3>
            </div>
            
            <div className="space-y-2 text-xs text-slate-600 leading-relaxed font-sans">
              <p>
                Chào mừng bạn đến với <strong className="font-black text-slate-800">MindMap Chinese</strong>. Bằng việc học tập trên ứng dụng này, bạn cam kết tuân thủ các điều khoản dịch vụ cụ thể sau:
              </p>
              <ul className="list-disc pl-4 space-y-1.5 text-slate-500 font-bold">
                <li><strong className="text-slate-700 font-black">Sở hữu trí tuệ:</strong> Bản quyền mindmap cấu trúc, bài mẫu ví dụ độc quyền và cơ sở dữ liệu đều thuộc quyền bảo vệ thương mại và vận hành của chúng tôi.</li>
                <li><strong className="text-slate-700 font-black">Sử dụng:</strong> Chỉ học tập cho cá nhân nâng cao phản xạ, không sao chép thương mại hóa.</li>
                <li><strong className="text-slate-700 font-black">Cam kết học thuật:</strong> Phương pháp sơ đồ tư duy giúp bạn đẩy mạnh tốc độ từ vựng, tuy nhiên hiệu quả giao tiếp cụ thể phụ thuộc vào thời gian đóng góp luyện tập của cá nhân bạn.</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Chính sách bảo mật */}
          <div className="space-y-3 p-4 rounded-2xl bg-[#EFFFEC] border-2 border-duo-green border-b-4">
            <div className="flex items-center gap-2 text-slate-800">
              <Eye className="text-duo-green shrink-0 stroke-[2.5]" size={18} />
              <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-duo-green font-sans">II. Chính sách bảo mật (Privacy Policy)</h3>
            </div>

            <div className="space-y-2 text-xs text-duo-green-dark leading-relaxed font-sans">
              <p>
                Chúng tôi tôn trọng tuyệt đối dữ liệu riêng tư và tính độc lập của người học:
              </p>
              <ul className="list-disc pl-4 space-y-1.5 text-slate-600 font-bold">
                <li><strong className="text-slate-800 font-black">Thu thập thông tin:</strong> Ứng dụng <strong className="font-black text-slate-800">không yêu cầu tạo tài khoản mật khẩu hay thông tin riêng tư</strong>. Trạng thái và tiến độ học tập đều nằm ngoại tuyến hoàn toàn tại trình duyệt cá nhân của bạn (Local Storage) nên cực kỳ an toàn.</li>
                <li><strong className="text-slate-800 font-black">Google Analytics và Quảng cáo:</strong> Chúng tôi có sử dụng các tiện ích thu thập dữ liệu phi định danh của Google để nâng cao trải nghiệm, tối ưu tốc độ phân phối bài giảng và phân tích bài viết phù hợp.</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Liên hệ */}
          <div className="p-4 rounded-2xl bg-stone-50 border-2 border-duo-gray flex items-center gap-3 text-xs text-slate-500 font-bold font-sans">
            <HelpCircle size={16} className="text-slate-400 shrink-0 stroke-[2.5]" />
            <div>
              Mọi câu hỏi liên quan đến pháp lý hoặc đóng góp bảo mật thông tin, vui lòng gửi qua: <a href="mailto:tiengtrungmindmap@gmail.com" className="font-black text-slate-800 hover:text-duo-red underline transition-colors">tiengtrungmindmap@gmail.com</a>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 bg-white border-t-2 border-duo-gray flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 bg-duo-green border-b-4 border-duo-green-dark hover:bg-[#62e403] active:translate-y-[2px] active:border-b-2 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer font-sans text-center"
          >
            ĐỒNG Ý ĐIỀU KHOẢN • HỌC NGAY
          </button>
        </div>
      </motion.div>
    </div>
  );
};
