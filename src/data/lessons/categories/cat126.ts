import { Lesson } from '../../../types';

export const cat126Lessons: Lesson[] = [
  {
    id: 1251,
    title: "Ký nhận xuất kho (出库签字)",
    description: "Nhóm mẫu câu quy trình bàn giao danh sách hàng, đối chiếu chữ ký xác thực người nhận và thông xe xuất trạm.",
    mindMaps: [
      {
        id: "m1251-1",
        vietnamese: "Quy trình xuất kho",
        chinese: "出库流程",
        pinyin: "chūkù liúchéng",
        vietnameseHint: "chhu khù liếu chhứng",
        children: [
          {
            id: "m1251-1-1",
            vietnamese: "Phiếu xuất kho",
            chinese: "出库单",
            pinyin: "chūkùdān",
            vietnameseHint: "chhu khù tan",
            children: [
              {
                id: "m1251-1-1-1",
                vietnamese: "Không có phiếu xuất kho thì không được mang hàng đi.",
                chinese: "没有出库单，任何人不能领走货物。",
                pinyin: "Méiyǒu chūkùdān, rènhé rén bùnéng lǐng zǒu huòwù.",
                vietnameseHint: "Méi yểu chhu khù tan, rấn hứa rấn pu nứng lỉng tẩu huô u."
              }
            ]
          },
          {
            id: "m1251-1-2",
            vietnamese: "Xác nhận của thủ kho",
            chinese: "仓管签名",
            pinyin: "cāngguǎn qiānmíng",
            vietnameseHint: "chāng quản chiên mính",
            children: [
              {
                id: "m1251-1-2-1",
                vietnamese: "Thủ kho cần kiểm tra chữ ký xác nhận trước.",
                chinese: "仓管需要先核对签字确认。",
                pinyin: "Cāngguǎn xūyào xiān héduì qiānzì quèrèn.",
                vietnameseHint: "Chāng quản xyu yao xiên hứa tuây chiên chư chuê rần."
              }
            ]
          },
          {
            id: "m1251-1-3",
            vietnamese: "Chất hàng lên xe",
            chinese: "装车作业",
            pinyin: "zhuāngchē zuòyè",
            vietnameseHint: "chuāng chưa chua diê",
            children: [
              {
                id: "m1251-1-3-1",
                vietnamese: "Hãy bắt đầu xếp hàng lên xe container.",
                chinese: "现在可以开始往集装箱车上装车了。",
                pinyin: "Xiànzài kěyǐ kāishǐ wǎng jízhuāngxiāngchē shàng zhuāngchē le.",
                vietnameseHint: "Xiên chai khả dỉ khai sỉ uảng chí chuang xiang chưa sảng chuāng chưa lơ."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1252,
    title: "Chỉ định Tài xế liên hệ (联络司机)",
    description: "Các mẫu câu liên hệ tài xế qua điện tâm, hỏi hành trình xe chạy cập kho bãi.",
    mindMaps: []
  },
  {
    id: 1253,
    title: "Khóa niêm phong thùng xe (铅封封锁)",
    description: "Quy trình kiểm tra cài chốt cửa hậu tản nhiệt xe tải và dập dấu niêm phong bảo lật.",
    mindMaps: []
  },
  {
    id: 1254,
    title: "Bốc dỡ hàng bằng Phễu trượt (滑道装箱)",
    description: "Thao tác đưa phễu trượt gầm đẩy rùa đỡ sườn xe di tản hàng thùng carton nhanh nhẹn.",
    mindMaps: []
  },
  {
    id: 1255,
    title: "Vận单 ký thác chuyển phát (快递运单)",
    description: "Nhận dạng vận đơn của các tập đoàn bưu chính hàng đầu như SF, EMS, DHL.",
    mindMaps: []
  },
  {
    id: 1256,
    title: "Kiểm tra danh mục giao nhận (发货清单)",
    description: "Cam kết rà soát số sê-ri mã lô của động cơ tránh sai lệch vị trí đầu cuối.",
    mindMaps: []
  },
  {
    id: 1257,
    title: "Thảo luận Cước phí vận tải (运费核算)",
    description: "Đàm thoại trao đổi về bảng giá cước, phí cầu đường hay phụ phí bãi quá tải.",
    mindMaps: []
  },
  {
    id: 1258,
    title: "Xác minh Địa chỉ người nhận (收货人地址)",
    description: "Hỏi han xác minh kỹ mã bưu điện, số điện thoại người đại diện ký gửi bưu kiện.",
    mindMaps: []
  },
  {
    id: 1259,
    title: "Báo cáo Sự cố xe trễ giờ (车辆延误)",
    description: "Nói phản ánh sự cố lốp xẹp gãy trục gây tắc biên chậm trễ xuất nhập.",
    mindMaps: []
  },
  {
    id: 1260,
    title: "Tổng kết & Ôn tập xuất kho (出货复习)",
    description: "Bảo đảm phản xạ từ vựng đầy đủ các thủ tục dọn luồng xuất vận hàng.",
    mindMaps: []
  }
];
