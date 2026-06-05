import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Smartphone, Monitor, Share2, MoreVertical, PlusSquare, Star, Copy, Check, Download, AlertCircle, ArrowUpRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt?: any;
  setDeferredPrompt?: (prompt: any) => void;
}

type Platform = 'ios' | 'android' | 'desktop';

export const BookmarkModal: React.FC<Props> = ({ isOpen, onClose, deferredPrompt, setDeferredPrompt }) => {
  const [activePlatform, setActivePlatform] = useState<Platform>('ios');
  const [isCopied, setIsCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Auto detect user platform
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
      if (/iPad|iPhone|iPod/.test(userAgent)) {
        setActivePlatform('ios');
      } else if (/android/i.test(userAgent)) {
        setActivePlatform('android');
      } else {
        setActivePlatform('desktop');
      }
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleTriggerInstallPrompt = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted native install prompt');
        }
        if (setDeferredPrompt) setDeferredPrompt(null);
      });
    }
  };

  const handleDownloadShortcut = (type: 'url' | 'html') => {
    const url = window.location.href;
    const title = "Học Tiếng Trung MindMap";
    
    if (type === 'url') {
      const fileContent = `[InternetShortcut]\nURL=${url}\nIconIndex=0\n`;
      const blob = new Blob([fileContent], { type: 'text/url' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${title}.url`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const fileContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta http-equiv="refresh" content="0; url=${url}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex; 
      align-items: center; 
      justify-content: center; 
      height: 100vh; 
      margin: 0; 
      background-color: #f8fafc; 
      color: #334155; 
      text-align: center; 
    }
    .box { 
      padding: 2.5rem; 
      background: white; 
      border-radius: 2rem; 
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); 
      max-width: 90%;
      margin: auto;
    }
    h2 { color: #e11d48; margin-top: 0; }
  </style>
</head>
<body>
  <div class="box">
    <h2>Đang kết nối MindMap...</h2>
    <p>Hệ thống tự động chuyển hướng đến Sơ đồ tư duy học tiếng Trung.</p>
  </div>
  <script>
    window.location.replace("${url}");
  </script>
</body>
</html>`;
      const blob = new Blob([fileContent], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${title}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

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

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-duo-gray border-b-6 overflow-hidden z-10 flex flex-col max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 border-2 border-duo-gray border-b-4 hover:border-slate-400 active:translate-y-[2px] active:border-b-2 rounded-xl text-slate-400 hover:text-slate-600 bg-white flex items-center justify-center transition-all cursor-pointer"
          title="Đóng"
        >
          <X size={18} className="stroke-[3]" />
        </button>

        <div className="p-6 sm:p-8 overflow-y-auto">
          {/* Tag and Title */}
          <div className="text-center mb-6 pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFFCE6] text-duo-orange border-2 border-duo-yellow/30 text-[10px] font-black uppercase tracking-wider rounded-xl mb-3">
              <Star size={12} className="fill-duo-yellow text-duo-yellow animate-pulse" />
              TẢI LỐI TẮT RIÊNG CHO BẠN
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              Lưu vào màn hình chính
            </h3>
            <p className="text-duo-sub text-xs mt-2 max-w-sm mx-auto font-bold leading-relaxed">
              Trình duyệt bảo mật cao nên không thể tự động can thiệp. Bạn hãy tải trực tiếp file lắt hoặc xem hướng dẫn cài đặt cực kỳ đơn giản sau nhé:
            </p>
          </div>

          {/* QUICK DIRECT DOWNLOAD BUTTONS */}
          <div className="mb-6 p-4 bg-[#FFF2F2] border-2 border-duo-red rounded-3xl">
            <p className="text-xs font-black uppercase tracking-wider text-duo-red mb-3 flex items-center gap-1.5 font-sans">
              <Download size={14} className="stroke-[3]" />
              TỰ ĐỘNG TẢI &amp; LẮP SHORTCUT
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleDownloadShortcut('html')}
                className="py-3 px-4 bg-white border-2 border-duo-gray border-b-4 hover:border-slate-400 active:translate-y-[2px] active:border-b-2 rounded-2xl flex items-center justify-between gap-2 text-left transition-all cursor-pointer group"
                title="Tải lối tắt đa năng (.html) cho mọi điện thoại và máy tính"
              >
                <div>
                  <span className="text-[9px] uppercase font-black text-slate-400 block font-sans">MỌI THIẾT BỊ</span>
                  <span className="text-xs font-black text-slate-800 block group-hover:text-duo-blue leading-tight transition-colors">File Lối Tắt (.html)</span>
                </div>
                <Download size={14} className="text-slate-400 group-hover:text-duo-blue transition-colors stroke-[2.5]" />
              </button>

              <button
                onClick={() => handleDownloadShortcut('url')}
                className="py-3 px-4 bg-white border-2 border-duo-gray border-b-4 hover:border-slate-400 active:translate-y-[2px] active:border-b-2 rounded-2xl flex items-center justify-between gap-2 text-left transition-all cursor-pointer group"
                title="Tải internet shortcut (.url) chuyên dùng cho máy tính"
              >
                <div>
                  <span className="text-[9px] uppercase font-black text-slate-400 block font-sans">RIÊNG COMPUTER</span>
                  <span className="text-xs font-black text-slate-800 block group-hover:text-duo-blue leading-tight transition-colors">Shortcut PC (.url)</span>
                </div>
                <Download size={14} className="text-slate-400 group-hover:text-duo-blue transition-colors stroke-[2.5]" />
              </button>
            </div>

            {/* Direct PWA Install if ready */}
            {deferredPrompt && (
              <div className="mt-3">
                <button
                  onClick={handleTriggerInstallPrompt}
                  className="w-full py-3 px-4 bg-duo-green border-b-4 border-duo-green-dark hover:bg-[#62e403] active:translate-y-[2px] active:border-b-2 text-white rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Star size={14} className="fill-current" />
                  Cài đặt trực tiếp (Khuyên dùng)
                </button>
              </div>
            )}

            {downloadSuccess && (
              <p className="text-[10px] font-black text-green-600 text-center mt-2.5 flex items-center justify-center gap-1 font-sans">
                <Check size={12} className="stroke-[3]" />
                Đã tải thành công! Mở file hoặc kéo ra ngoài màn hình chính để dùng ngay cực tiện lợi!
              </p>
            )}
          </div>

          {/* Platform Selector Tabs */}
          <div className="flex p-1.5 bg-slate-100 border-2 border-duo-gray rounded-2xl mb-5">
            <button
              onClick={() => setActivePlatform('ios')}
              className={`flex-1 py-2 px-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                activePlatform === 'ios'
                  ? 'bg-white text-slate-800 border-[#E5E5E5] border-b-4 shadow-[0_2px_0_#E5E5E5]'
                  : 'text-slate-450 border-transparent hover:text-slate-700'
              }`}
            >
              iOS (iPhone)
            </button>
            <button
              onClick={() => setActivePlatform('android')}
              className={`flex-1 py-2 px-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                activePlatform === 'android'
                  ? 'bg-white text-slate-800 border-[#E5E5E5] border-b-4 shadow-[0_2px_0_#E5E5E5]'
                  : 'text-slate-450 border-transparent hover:text-slate-700'
              }`}
            >
              Android
            </button>
            <button
              onClick={() => setActivePlatform('desktop')}
              className={`flex-1 py-2 px-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                activePlatform === 'desktop'
                  ? 'bg-white text-slate-800 border-[#E5E5E5] border-b-4 shadow-[0_2px_0_#E5E5E5]'
                  : 'text-slate-450 border-transparent hover:text-slate-700'
              }`}
            >
              Máy tính
            </button>
          </div>

          {/* Step list dựa theo platform */}
          <div className="space-y-3">
            {activePlatform === 'ios' && (
              <div className="space-y-3">
                <div className="flex gap-3.5 items-start p-3 bg-stone-50 border-2 border-duo-gray rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-[#EFFFEC] border-2 border-duo-green text-duo-green flex items-center justify-center font-black font-mono text-sm shrink-0 shadow-[0_2px_0_#46A302]">
                    1
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-600 leading-relaxed font-sans">
                      Mở app trên trình duyệt <strong className="font-extrabold text-slate-800">Safari</strong>, chạm vào nút <span className="font-extrabold text-duo-blue inline-flex items-center gap-0.5">Chia sẻ <Share2 size={13} className="inline text-duo-blue stroke-[2.5]" /></span> ở cuối màn hình.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start p-3 bg-stone-50 border-2 border-duo-gray rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-[#EFFFEC] border-2 border-duo-green text-duo-green flex items-center justify-center font-black font-mono text-sm shrink-0 shadow-[0_2px_0_#46A302]">
                    2
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-600 leading-relaxed font-sans">
                      Lướt xuống, chọn <span className="font-extrabold text-[#1a1c1a] bg-slate-100 py-0.5 px-1.5 rounded border border-slate-200">"Thêm vào MH chính"</span> (Add to Home Screen) với biểu tượng <PlusSquare size={13} className="inline text-slate-700 mb-0.5 stroke-[2.5]" />.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start p-3 bg-stone-50 border-2 border-duo-gray rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-[#EFFFEC] border-2 border-duo-green text-duo-green flex items-center justify-center font-black font-mono text-sm shrink-0 shadow-[0_2px_0_#46A302]">
                    3
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-600 leading-relaxed font-sans">
                      Đặt lại tên (ví dụ: <strong className="font-extrabold text-slate-800">"Tiếng Trung MindMap"</strong>), rồi nhấn nút <strong className="font-extrabold text-duo-green">Thêm (Add)</strong> ở góc trên bên phải là xong!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activePlatform === 'android' && (
              <div className="space-y-3">
                <div className="flex gap-3.5 items-start p-3 bg-stone-50 border-2 border-duo-gray rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-[#FFF2F2] border-2 border-duo-red text-duo-red flex items-center justify-center font-black font-mono text-sm shrink-0 shadow-[0_2px_0_#EA2B2B]">
                    1
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-600 leading-relaxed font-sans">
                      Nhấp vào biểu tượng menu <span className="font-extrabold text-slate-800 inline-flex items-center gap-0.5">3 chấm <MoreVertical size={13} className="inline text-slate-700 stroke-[2.5]" /></span> ở góc phải phía trên thanh địa chỉ Google Chrome.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start p-3 bg-stone-50 border-2 border-duo-gray rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-[#FFF2F2] border-2 border-duo-red text-duo-red flex items-center justify-center font-black font-mono text-sm shrink-0 shadow-[0_2px_0_#EA2B2B]">
                    2
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-600 leading-relaxed font-sans">
                      Chọn tùy chọn <span className="font-extrabold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">"Thêm vào Màn hình chính"</span> (Add to Home screen).
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start p-3 bg-stone-50 border-2 border-duo-gray rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-[#FFF2F2] border-2 border-duo-red text-duo-red flex items-center justify-center font-black font-mono text-sm shrink-0 shadow-[0_2px_0_#EA2B2B]">
                    3
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-600 leading-relaxed font-sans">
                      Xác nhận bằng nút <strong className="font-extrabold text-duo-red animate-pulse">Thêm / Thêm tự động</strong> để lối tắt thông thái hiện ra ngay ngoài điện thoại.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activePlatform === 'desktop' && (
              <div className="space-y-3">
                <div className="flex gap-3.5 items-start p-3 bg-stone-50 border-2 border-duo-gray rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-[#FFFCE6] border-2 border-duo-yellow text-duo-orange flex items-center justify-center font-black font-mono text-sm shrink-0 shadow-[0_2px_0_#E6B400]">
                    1
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-600 leading-relaxed font-sans">
                      Nhấn tổ hợp phím <kbd className="px-1.5 py-0.5 bg-white border-2 border-duo-gray rounded shadow-sm text-[11px] font-mono font-black">Ctrl + D</kbd> (Windows) hoặc <kbd className="px-1.5 py-0.5 bg-white border-2 border-duo-gray rounded shadow-sm text-[11px] font-mono font-black">Cmd + D</kbd> (Mac OS) để lưu bookmark nhanh.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start p-3 bg-stone-50 border-2 border-duo-gray rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-[#FFFCE6] border-2 border-duo-yellow text-duo-orange flex items-center justify-center font-black font-mono text-sm shrink-0 shadow-[0_2px_0_#E6B400]">
                    2
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-600 leading-relaxed font-sans">
                      Kéo thả biểu tượng 🔒 ở góc trái thanh địa chỉ trực tiếp xuống thanh dấu trang <strong className="font-extrabold text-slate-800">(Bookmarks Bar)</strong> để xem cực nhanh.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick link copying bar */}
          <div className="bg-slate-50 border-2 border-duo-gray rounded-2xl p-3 flex items-center justify-between gap-3 mt-4">
            <div className="flex-1 min-w-0 pr-2">
              <span className="text-[8px] font-black uppercase tracking-wider text-duo-sub block mb-0.5 font-sans">ĐIẠ CHỈ TRANG HỌC</span>
              <span className="text-xs font-mono font-black text-slate-600 block truncate">{window.location.href}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all border-2 border-b-4 shrink-0 cursor-pointer ${
                isCopied 
                  ? 'bg-duo-green border-duo-green-dark text-white shadow-[0_2px_0_#46A302] active:translate-y-[2px] active:border-b-2' 
                  : 'bg-white hover:bg-slate-50 border-duo-gray text-slate-600 shadow-[0_2px_0_#E5E5E5] active:translate-y-[2px] active:border-b-2'
              }`}
            >
              {isCopied ? (
                <>
                  <Check size={12} className="stroke-[3]" />
                  Đã sao chép
                </>
              ) : (
                <>
                  <Copy size={12} className="stroke-[3]" />
                  Sao chép Link
                </>
              )}
            </button>
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-6 flex">
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-duo-green border-b-4 border-duo-green-dark hover:bg-[#62e403] active:translate-y-[2px] active:border-b-2 text-white font-black text-xs uppercase rounded-2xl transition-all cursor-pointer text-center font-sans tracking-wide"
            >
              Đồng ý và bắt đầu học tập thôi!
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
