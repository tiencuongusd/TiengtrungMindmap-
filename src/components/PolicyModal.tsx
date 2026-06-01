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
              <ShieldAlert size={22} />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-brand-red">Pháp Lý & Quy Định</div>
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Điều khoản & Chính sách bảo mật</h2>
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
          
          {/* Section 1: Điều khoản dịch vụ */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-800">
              <Key className="text-brand-red font-bold" size={18} />
              <h3 className="font-black text-sm uppercase tracking-wider text-slate-800">I. Điều khoản dịch vụ (TOS)</h3>
            </div>
            
            <div className="pl-6 space-y-2 text-xs text-slate-500 leading-relaxed">
              <p>
                Chào mừng bạn đến với <span className="font-bold text-slate-700">MindMap Chinese</span>. Bằng việc truy cập và sử dụng ứng dụng học tập này, bạn đồng ý tuân thủ các điều khoản dịch vụ dưới đây:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong className="text-slate-700">Quyền sở hữu trí tuệ:</strong> Toàn bộ dữ liệu, bài học, sơ đồ tư duy (mindmap) và hệ thống phát âm đều thuộc quyền thương mại và vận hành của chúng tôi. Người dùng không được sao chép trái phép với mục đích thương mại riêng.</li>
                <li><strong className="text-slate-700">Mục đích sử dụng:</strong> Ứng dụng được cung cấp nhằm mục đích học tập phi thương mại cá nhân để cải thiện vốn từ vựng tiếng Trung.</li>
                <li><strong className="text-slate-700">Miễn trừ trách nhiệm:</strong> Nội dung biên soạn bám sát các giáo trình tiếng Trung chính thống, tuy nhiên các kiến thức chỉ mang tính chất hỗ trợ học tập và tham khảo. Học viên chịu trách nhiệm về kết quả thi cử & giao tiếp thực hành cá nhân.</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Chính sách bảo mật */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-800">
              <Eye className="text-brand-red font-bold" size={18} />
              <h3 className="font-black text-sm uppercase tracking-wider text-slate-800">II. Chính sách bảo mật (Privacy Policy)</h3>
            </div>

            <div className="pl-6 space-y-2 text-xs text-slate-500 leading-relaxed">
              <p>
                Chúng tôi tôn trọng tuyệt đối và bảo vệ quyền riêng tư cá nhân của bạn. Chính sách này mô tả cách thông tin cá nhân của bạn được thu thập và sử dụng:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong className="text-slate-700">Thông tin thu thập:</strong> Chúng tôi hoàn toàn <span className="text-brand-red font-bold">không thu thập bất cứ dữ liệu nhạy cảm</span> hay thông tin cá nhân bắt buộc nào. Trạng thái học tập của bạn đều được lưu trữ an toàn, ngoại tuyến trong trình duyệt (Local Storage).</li>
                <li><strong className="text-slate-700">Quảng cáo Google Ads & Đối tác thứ ba:</strong> Trang web sử dụng các sản phẩm quảng cáo của Google bao gồm các thẻ tiếp thị lại và cookie thu thập dữ liệu về phiên hoạt động phi tên danh nhằm mục đích cải thiện hiệu năng ads, tiếp nhận phản hồi trải nghiệm người dùng tối ưu hơn.</li>
                <li><strong className="text-slate-700">An toàn dữ liệu:</strong> Thông tin của bạn không bao giờ bị chuyển nhượng, mua bán cho các đơn vị thứ ba ngoài phục vụ tiện ích của Google Analytics / Google Ads phục vụ tối ưu chiến dịch hiển thị.</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Liên hệ */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150 flex gap-3 text-xs text-slate-500 font-semibold leading-relaxed">
            <HelpCircle size={18} className="shrink-0 mt-0.5 text-slate-400" />
            <div>
              <p className="font-bold text-slate-700 mb-0.5 uppercase text-[10px] tracking-wider">Thông tin liên hệ vận hành</p>
              Nếu bạn có bất kỳ thắc mắc nào liên quan đến các vấn đề pháp lý, điều khoản sử dụng hoặc tối ưu chính sách bảo mật, xin vui lòng liên hệ trực tiếp cho chúng tôi qua địa chỉ hòm thư điện tử: <span className="text-brand-red font-black">tiencuongusd@gmail.com</span>.
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-brand-red text-white font-black text-xs uppercase tracking-widest rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Đồng ý điều khoản • Học ngay
          </button>
        </div>
      </motion.div>
    </div>
  );
};
