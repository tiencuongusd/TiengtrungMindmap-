import { Lesson } from '../../../types';

export const cat124Lessons: Lesson[] = [
  {
    id: 1231,
    title: "Phiếu nhặt hàng (拣货单)",
    description: "Nhóm mẫu câu hội thoại nhận chỉ thị và tiến hành gom linh kiện theo phiếu yêu cầu xuất đơn.",
    mindMaps: [
      {
        id: "m1231-1",
        vietnamese: "Quy trình nhặt hàng",
        chinese: "拣货流程",
        pinyin: "jiǎnhuò liúchéng",
        vietnameseHint: "chiển huô liếu chhứng",
        children: [
          {
            id: "m1231-1-1",
            vietnamese: "Phiếu nhặt hàng",
            chinese: "拣货单",
            pinyin: "jiǎnhuòdān",
            vietnameseHint: "chiển huô tan",
            children: [
              {
                id: "m1231-1-1-1",
                vietnamese: "Hãy đi nhận phiếu nhặt hàng ở bàn quản lý.",
                chinese: "请到管理后台领取拣货单。",
                pinyin: "Qǐng dào guǎnlǐ hòutái lǐngqǔ jiǎnhuòdān.",
                vietnameseHint: "Chỉnh tao quản lỉ hấu thái lỉng chyu chiển huô tan."
              }
            ]
          },
          {
            id: "m1231-1-2",
            vietnamese: "Quét mã vạch",
            chinese: "条码扫描",
            pinyin: "tiáomǎ sǎomiáo",
            vietnameseHint: "thiáo mả sao miáo",
            children: [
              {
                id: "m1231-1-2-1",
                vietnamese: "Khi lấy hàng nhớ quét mã vạch sản phẩm.",
                chinese: "拿货时记得扫描一下产品条码。",
                pinyin: "Ná huò shí jìde sǎomiáo yíxià chǎnpǐn tiáomǎ.",
                vietnameseHint: "Ná huô sứa chi tơ sao miáo ý xiạ chán phỉn thiáo mả."
              }
            ]
          },
          {
            id: "m1231-1-3",
            vietnamese: "Xe gom hàng",
            chinese: "拣货车",
            pinyin: "jiǎnhuòchē",
            vietnameseHint: "chiển huô chưa",
            children: [
              {
                id: "m1231-1-3-1",
                vietnamese: "Xếp tất cả hàng đã nhặt lên xe kéo.",
                chinese: "把拣好的货物都放到拣货车上。",
                pinyin: "Bǎ jiǎnhǎo de huòwù dōu fàng dào jiǎnhuòchē shàng.",
                vietnameseHint: "Pả chiển hảo tợ huô u tâu phang tao chiển huô chưa sảng."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1232,
    title: "Nhặt theo Tuyến đường tối ưu (优化拣货路线)",
    description: "Cách thảo luận phân luồng di chuyển trong kho để tối ưu thời gian nhặt hàng.",
    mindMaps: []
  },
  {
    id: 1233,
    title: "Phát hiện Hàng nhặt nhầm mã (拣错货物)",
    description: "Nhận diện lỗi nhầm SKU, nhầm kích thước hoặc quy cách hộp đựng.",
    mindMaps: []
  },
  {
    id: 1234,
    title: "Yêu cầu Gom đơn số lượng lớn (批量配货)",
    description: "Phối hợp triển khai đóng gom đơn hàng bán buôn quy mô lớn.",
    mindMaps: []
  },
  {
    id: 1235,
    title: "Phân vùng Hàng đã nhặt xong (分拣存区)",
    description: "Chỉ dẫn kéo xe hàng lắp ráp về vị trí phân loại sẵn sàng đóng gói.",
    mindMaps: []
  },
  {
    id: 1236,
    title: "Sử dụng Súng PDA quét kho (PDA扫描枪)",
    description: "Phản ánh súng bắn tia hồng ngoại bị sụt pin, liên kết mạng chập chờn.",
    mindMaps: []
  },
  {
    id: 1237,
    title: "Điều chuyển nhân lực Hỗ trợ ca (人员调配)",
    description: "Xin bổ sung người hỗ trợ nhặt hàng khi có đột biến lượng đơn hàng thương mại điện tử.",
    mindMaps: []
  },
  {
    id: 1238,
    title: "Ghi chú hàng đặc thù dễ vỡ (易碎品备注)",
    description: "Yêu cầu dán nhãn chú ý tay cầm nhẹ nhàng cho những đơn thủy tinh, đồ sứ.",
    mindMaps: []
  },
  {
    id: 1239,
    title: "Xác minh trạng thái đơn hàng (订单状态)",
    description: "Các mẫu câu trao đổi với bên bán hàng xem đơn đã được duyệt thanh toán chưa.",
    mindMaps: []
  },
  {
    id: 1240,
    title: "Tổng kết & Ôn tập gom hàng (分拣复习)",
    description: "Kiểm tra kỹ năng mẫu câu khẩu ngữ lắp ráp gom đơn nhanh chóng.",
    mindMaps: []
  }
];
