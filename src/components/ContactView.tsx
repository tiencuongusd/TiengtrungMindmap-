import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, MessageSquare, CreditCard, Zap, Star, Award } from 'lucide-react';

export const ContactView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-20">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 bg-brand-red/10 rounded-full border border-brand-red/20"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-red">Tiếng Trung MindMap Premium</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-4xl font-black text-[#1A1A1A] tracking-tight uppercase leading-tight"
        >
          Chinh phục Từ vựng tiếng Trung <br /> 
          <span className="text-brand-red italic text-3xl md:text-5xl block mt-2">Thần tốc & Hiệu quả</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-black/55 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Ứng dụng học Từ vựng tiếng Trung theo phương pháp sơ đồ tư duy (MindMap) giúp bạn ghi nhớ từ vựng và cấu trúc ngữ pháp nhanh gấp 5 lần so với phương pháp thông thường.
        </motion.p>
      </section>

      {/* Advantages Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            icon: <Zap className="text-amber-500" />,
            title: "Ghi nhớ từ vựng theo gốc & chủ đề",
            desc: "Liên kết từ vựng theo cấu trúc sơ đồ tư duy logic giúp người học loại bỏ hoàn toàn việc học vẹt rời rạc. Bạn sẽ hiểu sâu bản chất chữ Hán, dễ dàng xâu chuỗi các từ liên quan cùng câu ví dụ thực tế chỉ trong một khung hình duy nhất."
          },
          {
            icon: <Award className="text-brand-red" />,
            title: "Đa giác quan & Nhận diện chuẩn xác",
            desc: "Xây dựng phản xạ tự nhiên thông qua sự kết hợp của sơ đồ liên tưởng trực quan, phát âm chuẩn giọng bản xứ rõ ràng và phiên âm bồi Việt hóa dễ đọc. Giúp người học nhớ lâu từ mặt chữ, ý nghĩa cho đến cách phát âm."
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="p-8 bg-white border border-black/5 rounded-3xl shadow-sm hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-black/5">
              {item.icon}
            </div>
            <h3 className="text-xl font-black text-[#1A1A1A] uppercase tracking-tight mb-3">{item.title}</h3>
            <p className="text-black/55 font-medium text-sm md:text-base leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Pricing Table */}
      <section className="relative">
        <div className="absolute inset-0 bg-brand-red/5 -skew-y-3 rounded-[3rem] -z-10" />
        <div className="p-8 md:p-12 text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-[#1A1A1A] uppercase tracking-tighter">Gói thành viên Premium</h2>
            <p className="text-black/40 font-bold uppercase tracking-widest text-[10px]">Mở khóa toàn bộ kiến thức 100+ bài học</p>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-[2.5rem] border-2 border-brand-red shadow-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-brand-red text-white py-1 px-8 rotate-45 translate-x-6 translate-y-3 font-black text-[10px] uppercase tracking-widest leading-none">
              Bán chạy
            </div>
            
            <div className="space-y-2 mb-8">
              <span className="text-slate-400 line-through text-lg font-bold">299.000đ</span>
              <div className="flex items-center justify-center gap-1">
                <span className="text-5xl font-black text-[#1A1A1A]">149.000đ</span>
              </div>
              <p className="text-brand-red font-black uppercase text-xs tracking-widest mt-2">Truy cập vĩnh viễn</p>
            </div>

            <ul className="space-y-4 text-left mb-8">
              {[
                "Mở khóa Chủ đề 2 đến Chủ đề 10",
                "Truy cập 100+ bài học chuyên sâu",
                "Hệ thống Sơ đồ tư duy đầy đủ",
                "Công cụ Tra cứu từ vựng không giới hạn",
                "Cập nhật nội dung mới định kỳ"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-black/60">
                  <CheckCircle2 size={18} className="text-emerald-500 flex-none" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className="w-full h-14 bg-brand-red hover:bg-[#1A1A1A] text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all shadow-lg hover:shadow-brand-red/20 active:scale-95">
              Đăng ký ngay
            </button>
          </div>
        </div>
      </section>

      {/* Payment & Contact */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-10 bg-[#0068FE] rounded-[2.5rem] text-white space-y-6 shadow-xl shadow-blue-500/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center">
              <CreditCard className="text-amber-300" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight leading-none">Thông tin thanh toán</h3>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-blue-100/50 uppercase tracking-[0.2em]">Ngân hàng</p>
              <p className="text-lg font-bold text-white">MB BANK (Ngân hàng Quân Đội)</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-blue-100/50 uppercase tracking-[0.2em]">Số tài khoản</p>
              <p className="text-2xl font-black text-amber-300 tracking-wide">0868295699</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-blue-100/50 uppercase tracking-[0.2em]">Chủ tài khoản</p>
              <p className="text-lg font-bold text-white">Trần Tiến Cường</p>
            </div>
            <div className="space-y-1 pt-2">
              <p className="text-[10px] font-black text-blue-100/50 uppercase tracking-[0.2em]">Nội dung chuyển khoản</p>
              <p className="bg-white p-3 rounded-xl border border-white/20 text-[#0068FE] font-black text-sm text-center shadow-inner">
                MINDMAP [SỐ ĐIỆN THOẠI]
              </p>
            </div>
          </div>
        </div>

        <div className="p-10 bg-white border border-black/5 rounded-[2.5rem] space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-red/10 rounded-2xl flex items-center justify-center">
              <MessageSquare className="text-brand-red" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight leading-none text-[#1A1A1A]">Hỗ trợ khách hàng</h3>
          </div>

          <div className="space-y-6 pt-4 border-t border-black/5">
            <p className="text-black/40 font-medium text-sm">
              Sau khi chuyển khoản, vui lòng chụp ảnh hóa đơn và gửi cho chúng tôi qua Zalo để nhận mật khẩu mở khóa bài học ngay lập tức.
            </p>
            
            <a 
              href="https://zalo.me/0868295699" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-between p-4 bg-slate-50 border border-black/5 rounded-2xl hover:border-brand-red transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500 font-bold italic">Z</div>
                <div>
                  <p className="text-[9px] font-black text-black/30 uppercase tracking-widest">Hỗ trợ qua Zalo</p>
                  <p className="text-lg font-black text-[#1A1A1A]">0868295699</p>
                </div>
              </div>
              <CheckCircle2 className="text-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <div className="flex items-center gap-4 p-4 bg-slate-50 border border-black/5 rounded-2xl">
              <Star className="text-amber-500 flex-none" />
              <p className="text-[11px] font-bold text-black/60 italic leading-relaxed">
                "Học tiếng Trung chưa bao giờ dễ dàng và thú vị đến thế. Rất đáng đồng tiền bát gạo!" - <span className="text-black">Học viên Minh Anh</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
