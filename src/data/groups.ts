import { LessonGroup } from '../types';

export const groups: LessonGroup[] = [
  // Chủ đề 1: Giao tiếp & Cơ bản
  {
    id: 1,
    topicId: 1,
    topicTitle: "Giao tiếp & Cơ bản",
    title: "Chào hỏi",
    description: "Các bài học từ 1 đến 10",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 1)
  },
  {
    id: 2,
    topicId: 1,
    topicTitle: "Giao tiếp & Cơ bản",
    title: "Đại từ nhân xưng",
    description: "Các bài học từ 11 đến 20",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 11)
  },
  {
    id: 3,
    topicId: 1,
    topicTitle: "Giao tiếp & Cơ bản",
    title: "Số đếm",
    description: "Các bài học từ 21 đến 30",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 21)
  },
  {
    id: 4,
    topicId: 1,
    topicTitle: "Giao tiếp & Cơ bản",
    title: "Thời gian",
    description: "Các bài học từ 31 đến 40",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 31)
  },
  {
    id: 5,
    topicId: 1,
    topicTitle: "Giao tiếp & Cơ bản",
    title: "Ngày tháng năm",
    description: "Các bài học từ 41 đến 50",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 41)
  },
  {
    id: 6,
    topicId: 1,
    topicTitle: "Giao tiếp & Cơ bản",
    title: "Thời tiết",
    description: "Các bài học từ 51 đến 60",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 51)
  },
  {
    id: 7,
    topicId: 1,
    topicTitle: "Giao tiếp & Cơ bản",
    title: "Phương hướng",
    description: "Các bài học từ 61 đến 70",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 61)
  },
  {
    id: 8,
    topicId: 1,
    topicTitle: "Giao tiếp & Cơ bản",
    title: "Cảm xúc cơ bản",
    description: "Các bài học từ 71 đến 80",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 71)
  },
  {
    id: 9,
    topicId: 1,
    topicTitle: "Giao tiếp & Cơ bản",
    title: "Màu sắc",
    description: "Các bài học từ 81 đến 90",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 81)
  },
  {
    id: 10,
    topicId: 1,
    topicTitle: "Giao tiếp & Cơ bản",
    title: "Hình khối",
    description: "Các bài học từ 91 đến 100",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 91)
  },

  // Chủ đề 2: Con người & Các mối quan hệ
  {
    id: 11,
    topicId: 2,
    topicTitle: "Con người & Các mối quan hệ",
    title: "Gia đình",
    description: "Các bài học từ 101 đến 110",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 101)
  },
  {
    id: 12,
    topicId: 2,
    topicTitle: "Con người & Các mối quan hệ",
    title: "Bạn bè",
    description: "Các bài học từ 111 đến 120",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 111)
  },
  {
    id: 13,
    topicId: 2,
    topicTitle: "Con người & Các mối quan hệ",
    title: "Ngoại hình",
    description: "Các bài học từ 121 đến 130",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 121)
  },
  {
    id: 14,
    topicId: 2,
    topicTitle: "Con người & Các mối quan hệ",
    title: "Tính cách",
    description: "Các bài học từ 131 đến 140",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 131)
  },
  {
    id: 15,
    topicId: 2,
    topicTitle: "Con người & Các mối quan hệ",
    title: "Nghề nghiệp",
    description: "Các bài học từ 141 đến 150",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 141)
  },
  {
    id: 16,
    topicId: 2,
    topicTitle: "Con người & Các mối quan hệ",
    title: "Sở thích",
    description: "Các bài học từ 151 đến 160",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 151)
  },
  {
    id: 17,
    topicId: 2,
    topicTitle: "Con người & Các mối quan hệ",
    title: "Bộ phận cơ thể",
    description: "Các bài học từ 161 đến 170",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 161)
  },
  {
    id: 18,
    topicId: 2,
    topicTitle: "Con người & Các mối quan hệ",
    title: "Tình trạng sức khỏe",
    description: "Các bài học từ 171 đến 180",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 171)
  },
  {
    id: 19,
    topicId: 2,
    topicTitle: "Con người & Các mối quan hệ",
    title: "Các giai đoạn cuộc đời",
    description: "Các bài học từ 181 đến 190",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 181)
  },
  {
    id: 20,
    topicId: 2,
    topicTitle: "Con người & Các mối quan hệ",
    title: "Tôn giáo & Tín ngưỡng",
    description: "Các bài học từ 191 đến 200",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 191)
  },

  // Chủ đề 3: Đời sống hàng ngày
  {
    id: 21,
    topicId: 3,
    topicTitle: "Đời sống hàng ngày",
    title: "Nhà ở",
    description: "Các bài học từ 201 đến 210",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 201)
  },
  {
    id: 22,
    topicId: 3,
    topicTitle: "Đời sống hàng ngày",
    title: "Đồ dùng gia đình",
    description: "Các bài học từ 211 đến 220",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 211)
  },
  {
    id: 23,
    topicId: 3,
    topicTitle: "Đời sống hàng ngày",
    title: "Hoạt động thường nhật",
    description: "Các bài học từ 221 đến 230",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 221)
  },
  {
    id: 24,
    topicId: 3,
    topicTitle: "Đời sống hàng ngày",
    title: "Quần áo",
    description: "Các bài học từ 231 đến 240",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 231)
  },
  {
    id: 25,
    topicId: 3,
    topicTitle: "Đời sống hàng ngày",
    title: "Phụ kiện trang sức",
    description: "Các bài học từ 241 đến 250",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 241)
  },
  {
    id: 26,
    topicId: 3,
    topicTitle: "Đời sống hàng ngày",
    title: "Sức khỏe",
    description: "Các bài học từ 251 đến 260",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 251)
  },
  {
    id: 27,
    topicId: 3,
    topicTitle: "Đời sống hàng ngày",
    title: "Vệ sinh cá nhân",
    description: "Các bài học từ 261 đến 270",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 261)
  },
  {
    id: 28,
    topicId: 3,
    topicTitle: "Đời sống hàng ngày",
    title: "Giấc ngủ",
    description: "Các bài học từ 271 đến 280",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 271)
  },
  {
    id: 29,
    topicId: 3,
    topicTitle: "Đời sống hàng ngày",
    title: "Chăm sóc thú cưng",
    description: "Các bài học từ 281 đến 290",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 281)
  },
  {
    id: 30,
    topicId: 3,
    topicTitle: "Đời sống hàng ngày",
    title: "Công việc nhà",
    description: "Các bài học từ 291 đến 300",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 291)
  },

  // Chủ đề 4: Ẩm thực
  {
    id: 31,
    topicId: 4,
    topicTitle: "Ẩm thực",
    title: "Các Bữa Ăn & Trạng Thái Cơ Thể",
    description: "Các bài học từ 301 đến 310",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 301)
  },
  {
    id: 32,
    topicId: 4,
    topicTitle: "Ẩm thực",
    title: "Các Loại Thịt & Hải Sản",
    description: "Các bài học từ 311 đến 320",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 311)
  },
  {
    id: 33,
    topicId: 4,
    topicTitle: "Ẩm thực",
    title: "Rau Củ Quả & Gia Vị",
    description: "Các bài học từ 321 đến 330",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 321)
  },
  {
    id: 34,
    topicId: 4,
    topicTitle: "Ẩm thực",
    title: "Đồ Uống & Tráng Miệng",
    description: "Các bài học từ 331 đến 340",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 331)
  },
  {
    id: 35,
    topicId: 4,
    topicTitle: "Ẩm thực",
    title: "Đi Nhà Hàng & Ăn Tiệc",
    description: "Các bài học từ 341 đến 350",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 341)
  },
  {
    id: 36,
    topicId: 4,
    topicTitle: "Ẩm thực",
    title: "Các Món Ăn Truyền Thống",
    description: "Các bài học từ 351 đến 360",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 351)
  },
  {
    id: 37,
    topicId: 4,
    topicTitle: "Ẩm thực",
    title: "Cách Chế Biến Món Ăn",
    description: "Các bài học từ 361 đến 370",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 361)
  },
  {
    id: 38,
    topicId: 4,
    topicTitle: "Ẩm thực",
    title: "Mùi Vị & Màu Sắc Món Ăn",
    description: "Các bài học từ 371 đến 380",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 371)
  },
  {
    id: 39,
    topicId: 4,
    topicTitle: "Ẩm thực",
    title: "Dụng Cụ Ăn Uống & Nhà Bếp",
    description: "Các bài học từ 381 đến 390",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 381)
  },
  {
    id: 40,
    topicId: 4,
    topicTitle: "Ẩm thực",
    title: "Thói Quen Ăn Uống & Dinh Dưỡng",
    description: "Các bài học từ 391 đến 400",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 391)
  },
  // Chủ đề 5: Giáo dục & Học tập
  {
    id: 41,
    topicId: 5,
    topicTitle: "Giáo dục & Học tập",
    title: "Cơ sở vật chất trường học",
    description: "Các bài học từ 401 đến 410",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 401)
  },
  {
    id: 42,
    topicId: 5,
    topicTitle: "Giáo dục & Học tập",
    title: "Môn học",
    description: "Các bài học từ 411 đến 420",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 411)
  },
  {
    id: 43,
    topicId: 5,
    topicTitle: "Giáo dục & Học tập",
    title: "Dụng cụ học tập",
    description: "Các bài học từ 421 đến 430",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 421)
  },
  {
    id: 44,
    topicId: 5,
    topicTitle: "Giáo dục & Học tập",
    title: "Hoạt động trên lớp",
    description: "Các bài học từ 431 đến 440",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 431)
  },
  {
    id: 45,
    topicId: 5,
    topicTitle: "Giáo dục & Học tập",
    title: "Thư viện",
    description: "Các bài học từ 441 đến 450",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 441)
  },
  {
    id: 46,
    topicId: 5,
    topicTitle: "Giáo dục & Học tập",
    title: "Ký túc xá",
    description: "Các bài học từ 451 đến 460",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 451)
  },
  {
    id: 47,
    topicId: 5,
    topicTitle: "Giáo dục & Học tập",
    title: "Bằng cấp & Chứng chỉ",
    description: "Các bài học từ 461 đến 470",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 461)
  },
  {
    id: 48,
    topicId: 5,
    topicTitle: "Giáo dục & Học tập",
    title: "Khóa học & Đào tạo",
    description: "Các bài học từ 471 đến 480",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 471)
  },
  {
    id: 49,
    topicId: 5,
    topicTitle: "Giáo dục & Học tập",
    title: "Ngôn ngữ",
    description: "Các bài học từ 481 đến 490",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 481)
  },
  {
    id: 50,
    topicId: 5,
    topicTitle: "Giáo dục & Học tập",
    title: "Thi cử & Đánh giá",
    description: "Các bài học từ 491 đến 500",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 491)
  },
  // Chủ đề 6: Công sở & Kinh doanh
  {
    id: 51,
    topicId: 6,
    topicTitle: "Công sở & Kinh doanh",
    title: "Không gian văn phòng",
    description: "Các bài học từ 501 đến 510",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 501)
  },
  {
    id: 52,
    topicId: 6,
    topicTitle: "Công sở & Kinh doanh",
    title: "Chức danh",
    description: "Các bài học từ 511 đến 520",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 511)
  },
  {
    id: 53,
    topicId: 6,
    topicTitle: "Công sở & Kinh doanh",
    title: "Cuộc họp",
    description: "Các bài học từ 521 đến 530",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 521)
  },
  {
    id: 54,
    topicId: 6,
    topicTitle: "Công sở & Kinh doanh",
    title: "Hợp đồng & Đàm phán",
    description: "Các bài học từ 531 đến 540",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 531)
  },
  {
    id: 55,
    topicId: 6,
    topicTitle: "Công sở & Kinh doanh",
    title: "Ngân hàng",
    description: "Các bài học từ 541 đến 550",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 541)
  },
  {
    id: 56,
    topicId: 6,
    topicTitle: "Công sở & Kinh doanh",
    title: "Tiền tệ",
    description: "Các bài học từ 551 đến 560",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 551)
  },
  {
    id: 57,
    topicId: 6,
    topicTitle: "Công sở & Kinh doanh",
    title: "Xin việc & Phỏng vấn",
    description: "Các bài học từ 561 đến 570",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 561)
  },
  {
    id: 58,
    topicId: 6,
    topicTitle: "Công sở & Kinh doanh",
    title: "Thương mại điện tử",
    description: "Các bài học từ 571 đến 580",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 571)
  },
  {
    id: 59,
    topicId: 6,
    topicTitle: "Công sở & Kinh doanh",
    title: "Lương & Phúc lợi",
    description: "Các bài học từ 581 đến 590",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 581)
  },
  {
    id: 60,
    topicId: 6,
    topicTitle: "Công sở & Kinh doanh",
    title: "Khởi nghiệp",
    description: "Các bài học từ 591 đến 600",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 591)
  },
  // Chủ đề 7: Giao thông & Du lịch
  {
    id: 61,
    topicId: 7,
    topicTitle: "Giao thông & Du lịch",
    title: "Phương tiện giao thông",
    description: "Các bài học từ 601 đến 610",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 601)
  },
  {
    id: 62,
    topicId: 7,
    topicTitle: "Giao thông & Du lịch",
    title: "Đặt vé & Lịch trình",
    description: "Các bài học từ 611 đến 620",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 611)
  },
  {
    id: 63,
    topicId: 7,
    topicTitle: "Giao thông & Du lịch",
    title: "Hỏi đường & Định vị",
    description: "Các bài học từ 621 đến 630",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 621)
  },
  {
    id: 64,
    topicId: 7,
    topicTitle: "Giao thông & Du lịch",
    title: "Tại sân bay",
    description: "Các bài học từ 631 đến 640",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 631)
  },
  {
    id: 65,
    topicId: 7,
    topicTitle: "Giao thông & Du lịch",
    title: "Tàu hỏa & Tàu điện ngầm",
    description: "Các bài học từ 641 đến 650",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 641)
  },
  {
    id: 66,
    topicId: 7,
    topicTitle: "Giao thông & Du lịch",
    title: "Thuê xe & Gọi xe",
    description: "Các bài học từ 651 đến 660",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 651)
  },
  {
    id: 67,
    topicId: 7,
    topicTitle: "Giao thông & Du lịch",
    title: "Đi công tác & Di chuyển đến dự án",
    description: "Các bài học từ 661 đến 670",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 661)
  },
  {
    id: 68,
    topicId: 7,
    topicTitle: "Giao thông & Du lịch",
    title: "Đặt phòng khách sạn",
    description: "Các bài học từ 671 đến 680",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 671)
  },
  {
    id: 69,
    topicId: 7,
    topicTitle: "Giao thông & Du lịch",
    title: "Rắc rối khi di chuyển",
    description: "Các bài học từ 681 đến 690",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 681)
  },
  {
    id: 70,
    topicId: 7,
    topicTitle: "Giao thông & Du lịch",
    title: "Tham quan & Trải nghiệm",
    description: "Các bài học từ 691 đến 700",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 691)
  },
  // Chủ đề 8: Giải trí & Công nghệ
  {
    id: 71,
    topicId: 8,
    topicTitle: "Giải trí & Công nghệ",
    title: "Âm nhạc & Phim ảnh",
    description: "Các bài học từ 701 đến 710",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 701)
  },
  {
    id: 72,
    topicId: 8,
    topicTitle: "Giải trí & Công nghệ",
    title: "Thể thao & Trò chơi",
    description: "Các bài học từ 711 đến 720",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 711)
  },
  {
    id: 73,
    topicId: 8,
    topicTitle: "Giải trí & Công nghệ",
    title: "Sở thích cá nhân",
    description: "Các bài học từ 721 đến 730",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 721)
  },
  {
    id: 74,
    topicId: 8,
    topicTitle: "Giải trí & Công nghệ",
    title: "Điện thoại & Ứng dụng",
    description: "Các bài học từ 731 đến 740",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 731)
  },
  {
    id: 75,
    topicId: 8,
    topicTitle: "Giải trí & Công nghệ",
    title: "Máy tính & Internet",
    description: "Các bài học từ 741 đến 750",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 741)
  },
  {
    id: 76,
    topicId: 8,
    topicTitle: "Giải trí & Công nghệ",
    title: "Mạng xã hội & Tin nhắn",
    description: "Các bài học từ 751 đến 760",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 751)
  },
  {
    id: 77,
    topicId: 8,
    topicTitle: "Giải trí & Công nghệ",
    title: "Trò chơi điện tử",
    description: "Các bài học từ 761 đến 770",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 761)
  },
  {
    id: 78,
    topicId: 8,
    topicTitle: "Giải trí & Công nghệ",
    title: "Đọc sách & Báo chí",
    description: "Các bài học từ 771 đến 780",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 771)
  },
  {
    id: 79,
    topicId: 8,
    topicTitle: "Giải trí & Công nghệ",
    title: "Nhiếp ảnh & Quay phim",
    description: "Các bài học từ 781 đến 790",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 781)
  },
  {
    id: 80,
    topicId: 8,
    topicTitle: "Giải trí & Công nghệ",
    title: "Xu hướng & Công nghệ mới",
    description: "Các bài học từ 791 đến 800",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 791)
  },
  // Chủ đề 9: Tự nhiên & Xã hội
  {
    id: 81,
    topicId: 9,
    topicTitle: "Tự nhiên & Xã hội",
    title: "Động vật",
    description: "Các bài học từ 801 đến 810",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 801)
  },
  {
    id: 82,
    topicId: 9,
    topicTitle: "Tự nhiên & Xã hội",
    title: "Thực vật",
    description: "Các bài học từ 811 đến 820",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 811)
  },
  {
    id: 83,
    topicId: 9,
    topicTitle: "Tự nhiên & Xã hội",
    title: "Phong cảnh thiên nhiên",
    description: "Các bài học từ 821 đến 830",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 821)
  },
  {
    id: 84,
    topicId: 9,
    topicTitle: "Tự nhiên & Xã hội",
    title: "Môi trường sinh thái",
    description: "Các bài học từ 831 đến 840",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 831)
  },
  {
    id: 85,
    topicId: 9,
    topicTitle: "Tự nhiên & Xã hội",
    title: "Khí hậu & Thiên tai",
    description: "Các bài học từ 841 đến 850",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 841)
  },
  {
    id: 86,
    topicId: 9,
    topicTitle: "Tự nhiên & Xã hội",
    title: "Giao lưu cộng đồng",
    description: "Các bài học từ 851 đến 860",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 851)
  },
  {
    id: 87,
    topicId: 9,
    topicTitle: "Tự nhiên & Xã hội",
    title: "Luật pháp cơ bản",
    description: "Các bài học từ 861 đến 870",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 861)
  },
  {
    id: 88,
    topicId: 9,
    topicTitle: "Tự nhiên & Xã hội",
    title: "Dịch vụ công cộng",
    description: "Các bài học từ 871 đến 880",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 871)
  },
  {
    id: 89,
    topicId: 9,
    topicTitle: "Tự nhiên & Xã hội",
    title: "Bưu điện & Chuyển phát",
    description: "Các bài học từ 881 đến 890",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 881)
  },
  {
    id: 90,
    topicId: 9,
    topicTitle: "Tự nhiên & Xã hội",
    title: "Bệnh viện & Khám bệnh",
    description: "Các bài học từ 891 đến 900",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 891)
  },
  // Chủ đề 10: Từ loại & Cấu trúc
  {
    id: 91,
    topicId: 10,
    topicTitle: "Từ loại & Cấu trúc",
    title: "Từ để hỏi & Câu hỏi thông dụng",
    description: "Các bài học từ 901 đến 910",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 901)
  },
  {
    id: 92,
    topicId: 10,
    topicTitle: "Từ loại & Cấu trúc",
    title: "Giới từ & Phó từ",
    description: "Các bài học từ 911 đến 920",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 911)
  },
  {
    id: 93,
    topicId: 10,
    topicTitle: "Từ loại & Cấu trúc",
    title: "Động từ chỉ mong muốn, khả năng",
    description: "Các bài học từ 921 đến 930",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 921)
  },
  {
    id: 94,
    topicId: 10,
    topicTitle: "Từ loại & Cấu trúc",
    title: "Phó từ thông dụng",
    description: "Các bài học từ 931 đến 940",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 931)
  },
  {
    id: 95,
    topicId: 10,
    topicTitle: "Từ loại & Cấu trúc",
    title: "Từ chỉ mức độ & Tần suất",
    description: "Các bài học từ 941 đến 950",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 941)
  },
  {
    id: 96,
    topicId: 10,
    topicTitle: "Từ loại & Cấu trúc",
    title: "Cấu trúc so sánh",
    description: "Các bài học từ 951 đến 960",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 951)
  },
  {
    id: 97,
    topicId: 10,
    topicTitle: "Từ loại & Cấu trúc",
    title: "Cấu trúc phủ định",
    description: "Các bài học từ 961 đến 970",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 961)
  },
  {
    id: 98,
    topicId: 10,
    topicTitle: "Từ loại & Cấu trúc",
    title: "Câu giả định & Điều kiện",
    description: "Các bài học từ 971 đến 980",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 971)
  },
  {
    id: 99,
    topicId: 10,
    topicTitle: "Từ loại & Cấu trúc",
    title: "Câu cảm thán & Nhấn mạnh",
    description: "Các bài học từ 981 đến 990",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 981)
  },
  {
    id: 100,
    topicId: 10,
    topicTitle: "Từ loại & Cấu trúc",
    title: "Câu bị động & Hành động",
    description: "Các bài học từ 991 đến 1000",
    lessonIds: Array.from({ length: 10 }, (_, i) => i + 991)
  },

  // ==================== PHẦN 2: TIẾNG TRUNG CHUYÊN NGÀNH ====================
  // 1. TIẾNG TRUNG VĂN PHÒNG
  {
    id: 101,
    topicId: 11,
    topicTitle: "TIẾNG TRUNG VĂN PHÒNG",
    title: "Phỏng vấn & Tuyển dụng",
    description: "Mẫu câu phỏng vấn, giới thiệu bản thân và thỏa thuận lương",
    lessonIds: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010]
  },
  {
    id: 102,
    topicId: 11,
    topicTitle: "TIẾNG TRUNG VĂN PHÒNG",
    title: "Thủ tục Nhận việc",
    description: "Thủ tục ký hợp đồng, hướng dẫn công việc và quy chế công ty",
    lessonIds: [1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020]
  },
  {
    id: 103,
    topicId: 11,
    topicTitle: "TIẾNG TRUNG VĂN PHÒNG",
    title: "Chào hỏi & Làm quen Đồng nghiệp",
    description: "Xưng hô, làm quen đồng nghiệp, bàn giao công việc cơ bản",
    lessonIds: [1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030]
  },
  {
    id: 104,
    topicId: 11,
    topicTitle: "TIẾNG TRUNG VĂN PHÒNG",
    title: "Báo cáo Công việc",
    description: "Báo cáo tiến độ, trình bày kế hoạch và nhận nhiệm vụ",
    lessonIds: [1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040]
  },
  {
    id: 105,
    topicId: 11,
    topicTitle: "TIẾNG TRUNG VĂN PHÒNG",
    title: "Nghỉ phép & Đi muộn",
    description: "Xin nghỉ ốm, nghỉ phép năm, giải trình lý do đi muộn",
    lessonIds: [1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050]
  },
  {
    id: 106,
    topicId: 11,
    topicTitle: "TIẾNG TRUNG VĂN PHÒNG",
    title: "Họp hành & Thảo luận",
    description: "Phát biểu ý kiến, thảo luận phương án và đưa ra quyết định",
    lessonIds: [1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060]
  },
  {
    id: 107,
    topicId: 11,
    topicTitle: "TIẾNG TRUNG VĂN PHÒNG",
    title: "Điện thoại & Hẹn gặp",
    description: "Nghe điện thoại, đặt lịch hẹn và tiếp đón khách hàng",
    lessonIds: [1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070]
  },
  {
    id: 108,
    topicId: 11,
    topicTitle: "TIẾNG TRUNG VĂN PHÒNG",
    title: "Email & Soạn thảo Văn bản",
    description: "Viết email công việc, thông báo nội bộ và báo cáo",
    lessonIds: [1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080]
  },
  {
    id: 109,
    topicId: 11,
    topicTitle: "TIẾNG TRUNG VĂN PHÒNG",
    title: "Thiết bị & Văn phòng phẩm",
    description: "Sử dụng máy in, máy chiếu và yêu cầu đồ dùng văn phòng",
    lessonIds: [1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1090]
  },
  {
    id: 110,
    topicId: 11,
    topicTitle: "TIẾNG TRUNG VĂN PHÒNG",
    title: "Tiệc ngoại giao & Khách hàng",
    description: "Tiệc chiêu đãi, xã giao công sở và xây dựng quan hệ",
    lessonIds: [1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100]
  },

  // 2. TIẾNG TRUNG NHÀ MÁY / CÔNG XƯỞNG
  {
    id: 111,
    topicId: 12,
    topicTitle: "TIẾNG TRUNG NHÀ MÁY / CÔNG XƯỞNG",
    title: "Cơ Cấu Tổ Chức & Chức Vụ",
    description: "Nhóm từ vựng và câu giao tiếp về sơ đồ chức danh, ban quản lý trực tiếp và các bộ phận nhân sự trong xưởng",
    lessonIds: [1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110]
  },
  {
    id: 112,
    topicId: 12,
    topicTitle: "TIẾNG TRUNG NHÀ MÁY / CÔNG XƯỞNG",
    title: "Nội quy công xưởng",
    description: "Các quy định về giờ giấc, đồng phục, an toàn lao động, vệ sinh và kỷ luật trong nhà máy",
    lessonIds: [1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120]
  },
  {
    id: 113,
    topicId: 12,
    topicTitle: "TIẾNG TRUNG NHÀ MÁY / CÔNG XƯỞNG",
    title: "Dây chuyền sản xuất",
    description: "Quy trình vận hành dây chuyền, lắp ráp linh kiện, sản lượng, hiệu suất và ca kíp",
    lessonIds: [1121, 1122, 1123, 1124, 1125, 1126, 1127, 1128, 1129, 1130]
  },
  {
    id: 114,
    topicId: 12,
    topicTitle: "TIẾNG TRUNG NHÀ MÁY / CÔNG XƯỞNG",
    title: "Vật tư & Nguyên liệu",
    description: "Quản lý và cấp phát vật tư, nhận nguyên liệu, kiểm soát hao hụt, tiết kiệm và kế hoạch thu mua",
    lessonIds: [1131, 1132, 1133, 1134, 1135, 1136, 1137, 1138, 1139, 1140]
  },
  {
    id: 115,
    topicId: 12,
    topicTitle: "TIẾNG TRUNG NHÀ MÁY / CÔNG XƯỞNG",
    title: "Máy móc & Công cụ",
    description: "Vận hành máy móc, chuẩn bị công cụ dụng cụ, nút bấm công tắc, các loại kìm, tua vít, ốc vít và thước dây",
    lessonIds: [1141, 1142, 1143, 1144, 1145, 1146, 1147, 1148, 1149, 1150]
  },
  {
    id: 116,
    topicId: 12,
    topicTitle: "TIẾNG TRUNG NHÀ MÁY / CÔNG XƯỞNG",
    title: "Giao ca & Tăng ca",
    description: "Thời gian giao ca, nhận ca, bàn giao công việc kíp xưởng, đăng ký tăng ca, tiền tăng ca, đổi lịch trực ban, nghỉ bù, đi ca đêm và chấm công hàng ngày",
    lessonIds: [1151, 1152, 1153, 1154, 1155, 1156, 1157, 1158, 1159, 1160]
  },
  {
    id: 117,
    topicId: 12,
    topicTitle: "TIẾNG TRUNG NHÀ MÁY / CÔNG XƯỞNG",
    title: "Nhân sự & Chấm công",
    description: "Bộ phận nhân sự, tuyển dụng, chế độ ghi chép máy chấm công, bảng chấm công, kiểm tra ký nộp, tiền lương cơ bản, gửi nhận phiếu lương chi tiết, tiền thưởng chuyên cần cuối năm, phúc lợi nhân viên, đánh giá KPI hiệu suất, đơn xin nghỉ việc từ chức và quyết định kỷ luật xử phạt",
    lessonIds: [1161, 1162, 1163, 1164, 1165, 1166, 1167, 1168, 1169, 1170]
  },
  {
    id: 118,
    topicId: 12,
    topicTitle: "TIẾNG TRUNG NHÀ MÁY / CÔNG XƯỞNG",
    title: "Sự cố & Sửa chữa",
    description: "Báo cáo sự cố sản phẩm hỏng hóc, yêu cầu nhân viên kỹ thuật kiểm tra sửa chữa, chi phí, thời gian kỳ hạn phiếu bảo hành, giải quyết khiếu nại chất lượng từ khách hàng, đổi trả hàng, bồi thường tổn thất thiệt hại, dịch vụ bộ phận hậu mãi, cung cấp linh kiện phụ tùng thay thế và phương án giải quyết triệt để vấn đề phát sinh",
    lessonIds: [1171, 1172, 1173, 1174, 1175, 1176, 1177, 1178, 1179, 1180]
  },
  {
    id: 119,
    topicId: 12,
    topicTitle: "TIẾNG TRUNG NHÀ MÁY / CÔNG XƯỞNG",
    title: "An toàn lao động",
    description: "Quy định chú ý an toàn sản xuất, chỉ hướng lối ra an toàn phân xưởng, chế độ cấp phát và quy tắc đeo mặc trang bị đồ bảo hộ lao động: mũ bảo hộ màu sắc chỉ định, đeo găng tay chống trơn, đi giày bảo hộ quy định; cách dùng và kiểm tra vị trí bình chữa cháy khẩn cấp, biển cảnh báo nguy hiểm độc hại, chuẩn bị hộp thuốc gọi điện biện pháp cấp cứu nhanh chóng khi xảy ra tai nạn sự cố nghiêm trọng, thủ tục nhân sự hỗ trợ khai báo bồi thường bảo hiểm tai nạn lao động",
    lessonIds: [1181, 1182, 1183, 1184, 1185, 1186, 1187, 1188, 1189, 1190]
  },
  {
    id: 120,
    topicId: 12,
    topicTitle: "TIẾNG TRUNG NHÀ MÁY / CÔNG XƯỞNG",
    title: "QUẢN LÝ CHẤT LƯỢNG QC & QA",
    description: "Tiêu chuẩn kiểm tra chất lượng 品管 QC và nghiệm thu kiểm nhận hàng hóa 验货 đầu ra thành phẩm, phân loại hàng đạt chuẩn và xử lý phế phẩm 不良品 tại khu vực lỗi, đo đạc thống kê giải pháp giảm tỷ lệ lỗi 不良率, quy trình sửa lại làm lại 返工 hàng lỗi dưới xưởng, đo đạc chênh lệch kích cỡ 尺寸 bằng thước dây, kiểm soát ngoại quan 外观 chống trầy xước, quy định lập sổ ghi chép phế phẩm vứt bỏ 报废, cũng như quy chế chế độ và mục tiêu của bộ phận đảm bảo chất lượng 品质保证 QA",
    lessonIds: [1191, 1192, 1193, 1194, 1195, 1196, 1197, 1198, 1199, 1200]
  },

  // 3. TIẾNG TRUNG THƯƠNG MẠI & KINH DOANH
  {
    id: 121,
    topicId: 13,
    topicTitle: "TIẾNG TRUNG THƯƠNG MẠI & KINH DOANH",
    title: "Chào hỏi doanh nghiệp & Trao đổi danh thiếp",
    description: "Tìm kiếm cơ hội hợp tác và giới thiệu đối tác đáng tin cậy 合作伙伴, nghi thức trao đổi danh thiếp 名片, cung cấp phương thức liên hệ 联系, xây dựng và thiết lập quan hệ 建立关系, giới thiệu chi tiết công ty và giới thiệu sản phẩm mới 介绍, bố trí thời gian hẹn gặp khách hàng 约见, tìm hiểu kỹ 了解 nhu cầu của khách hàng 需求 và tạo ấn tượng tốt 印象",
    lessonIds: [1201, 1202, 1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210]
  },
  {
    id: 122,
    topicId: 13,
    topicTitle: "TIẾNG TRUNG THƯƠNG MẠI & KINH DOANH",
    title: "Tiếp đón khách hàng & Tham quan công ty",
    description: "Công việc đón tiếp 接待 cho khách hàng quan trọng 客户, hướng dẫn đi tham quan 参观 văn phòng làm việc 办公室 và tìm hiểu các thông tin chi tiết về thiết bị tại phân xưởng sản xuất 生产车间, chuẩn bị phòng họp 会议室 cùng trà nước 茶水 chu đáo, nhắc nhở khách đừng khách sáo 客气 và chụp ảnh tập thể lưu niệm 合影.",
    lessonIds: [1211, 1212, 1213, 1214, 1215, 1216, 1217, 1218, 1219, 1220]
  },
  {
    id: 123,
    topicId: 13,
    topicTitle: "TIẾNG TRUNG THƯƠNG MẠI & KINH DOANH",
    title: "Giới thiệu sản phẩm & Dịch vụ",
    description: "Thuyết trình về ưu điểm 优点, giới thiệu tính năng 功能 mới mạnh mẽ, cung cấp dịch vụ bảo hành 保修 và sản phẩm dùng thử 试用 hoàn toàn miễn phí, đảm bảo chất lượng 质量 và mang lại dịch vụ 服务 hài lòng nhất tới các khách hàng mục tiêu 目标客户 ở một thị trường 市场 đầy cạnh tranh 竞争 độc quyền 独家.",
    lessonIds: [1221, 1222, 1223, 1224, 1225, 1226, 1227, 1228, 1229, 1230]
  },
  {
    id: 124,
    topicId: 13,
    topicTitle: "TIẾNG TRUNG THƯƠNG MẠI & KINH DOANH",
    title: "Tiếp thị & Quảng cáo",
    description: "Nhóm từ vựng và mẫu câu giao tiếp Tiếng Trung về chiến lược kinh doanh, xác định thị trường mục tiêu, chạy quảng cáo, chương trình khuyến mãi, định vị thương hiệu, mở rộng kênh bán hàng, chăm sóc khách hàng tiềm năng, dự toán ngân sách và tin tức truyền thông.",
    lessonIds: [1231, 1232, 1233, 1234, 1235, 1236, 1237, 1238, 1239, 1240]
  },
  {
    id: 125,
    topicId: 13,
    topicTitle: "TIẾNG TRUNG THƯƠNG MẠI & KINH DOANH",
    title: "Đàm phán thương mại",
    description: "Nhóm từ vựng và mẫu câu giao tiếp Tiếng Trung về đàm phán điều kiện, nhượng bộ, làm việc vì lợi ích hai bên, thỏa hiệp, đồng thuận ý kiến chung, đánh giá tiến triển, giải quyết bế tắc, và ký kết thỏa thuận sơ bộ.",
    lessonIds: [1241, 1242, 1243, 1244, 1245, 1246, 1247, 1248, 1249, 1250]
  },
  {
    id: 126,
    topicId: 13,
    topicTitle: "TIẾNG TRUNG THƯƠNG MẠI & KINH DOANH",
    title: "Ký kết hợp đồng & Điều khoản",
    description: "Nhóm từ vựng và mẫu câu giao tiếp Tiếng Trung về ký kết hợp đồng, bổ sung điều khoản, bảo đảm quyền lợi, thực hiện nghĩa vụ, chịu trách nhiệm vi phạm hợp đồng, thời gian hiệu lực, đóng dấu công ty, và giải quyết tranh chấp thông qua đàm phán hoặc trọng tài.",
    lessonIds: [1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1259, 1260]
  },
  {
    id: 127,
    topicId: 13,
    topicTitle: "TIẾNG TRUNG THƯƠNG MẠI & KINH DOANH",
    title: "Dịch vụ chăm sóc khách hàng",
    description: "Nhóm từ vựng và mẫu câu giao tiếp Tiếng Trung về khảo sát độ hài lòng, tiếp nhận khiếu nại, phản hồi, chính sách hậu mãi, bồi thường, đường dây nóng hotline, và nâng cao lòng trung thành.",
    lessonIds: [1261, 1262, 1263, 1264, 1265, 1266, 1267, 1268, 1269, 1270]
  },
  {
    id: 128,
    topicId: 13,
    topicTitle: "TIẾNG TRUNG THƯƠNG MẠI & KINH DOANH",
    title: "Mạng lưới quan hệ & Tiệc tùng kinh doanh",
    description: "Nhóm từ vựng và mẫu câu giao tiếp Tiếng Trung về mở rộng mạng lưới quan hệ, tiệc tối chiêu đãi, cạn ly chúc mừng, giao lưu thân thiện, trò chuyện sâu sắc, thứ tự chúc rượu và tháp tùng khách hàng.",
    lessonIds: [1271, 1272, 1273, 1274, 1275, 1276, 1277, 1278, 1279, 1280]
  },
  {
    id: 129,
    topicId: 13,
    topicTitle: "TIẾNG TRUNG THƯƠNG MẠI & KINH DOANH",
    title: "Nghiệp vụ ngân hàng & Tài chính doanh nghiệp",
    description: "Nhóm từ vựng và mẫu câu giao tiếp Tiếng Trung về tài khoản ngân hàng, chuyển khoản, xuất hóa đơn VAT, mã số thuế doanh nghiệp, tiền mặt, quản lý chi phí giá thành sản xuất, tính tiền thuế và lập dự toán ngân sách.",
    lessonIds: [1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1290]
  },
  {
    id: 130,
    topicId: 13,
    topicTitle: "TIẾNG TRUNG THƯƠNG MẠI & KINH DOANH",
    title: "Thương mại điện tử & Bán hàng trực tuyến",
    description: "Nhóm từ vựng và mẫu câu giao tiếp Tiếng Trung về thương mại điện tử, quản lý gian hàng trực tuyến, giỏ hàng, liên hệ chăm sóc khách hàng trực tuyến, kỹ năng chốt đơn, đánh giá tốt năm sao, giao nhận phát hàng, mã vận đơn, chính sách đổi trả hàng và livestream bán hàng.",
    lessonIds: [1291, 1292, 1293, 1294, 1295, 1296, 1297, 1298, 1299, 1300]
  },

  // 4. TIẾNG TRUNG DU LỊCH
  {
    id: 131,
    topicId: 14,
    topicTitle: "TIẾNG TRUNG DU LỊCH",
    title: "Đón khách & Tập trung đoàn",
    description: "Từ vựng về đón khách tại sân bay, hướng dẫn viên và thủ tục tập trung đoàn du lịch.",
    lessonIds: [1301, 1302, 1303, 1304, 1305, 1306, 1307, 1308, 1309, 1310]
  },
  {
    id: 132,
    topicId: 14,
    topicTitle: "TIẾNG TRUNG DU LỊCH",
    title: "Thủ tục tại sân bay & Lên máy bay",
    description: "Bộ học tiếng Trung về công việc tại quầy làm thủ tục bay, kiểm tra hộ chiếu, ký gửi hành lý, nhận thẻ lên máy bay, đi qua an ninh và lên máy bay.",
    lessonIds: [1311, 1312, 1313, 1314, 1315, 1316, 1317, 1318, 1319, 1320]
  },
  {
    id: 133,
    topicId: 14,
    topicTitle: "TIẾNG TRUNG DU LỊCH",
    title: "Di chuyển bằng giao thông công cộng",
    description: "Bộ học tiếng Trung về cách sử dụng tàu điện ngầm, xe buýt, taxi, mua vé, quẹt thẻ và các tình huống hỏi đường, đi nhầm đường.",
    lessonIds: [1321, 1322, 1323, 1324, 1325, 1326, 1327, 1328, 1329, 1330]
  },
  {
    id: 134,
    topicId: 14,
    topicTitle: "TIẾNG TRUNG DU LỊCH",
    title: "Nhận phòng & Dịch vụ khách sạn",
    description: "Bộ học tiếng Trung về công việc nhận phòng khách sạn, đặt phòng trước, đặt cọc phòng, dùng thẻ phòng, ăn sáng, dịch vụ phòng, thiết bị dọn phòng, thủ tục trả phòng và hóa đơn.",
    lessonIds: [1331, 1332, 1333, 1334, 1335, 1336, 1337, 1338, 1339, 1340]
  },
  {
    id: 135,
    topicId: 14,
    topicTitle: "TIẾNG TRUNG DU LỊCH",
    title: "Hỏi đường & Định vị phương hướng",
    description: "Bộ học tiếng Trung về hỏi vị trí khách sạn, trạm xe buýt, các hướng đi thẳng, rẽ trái, rẽ phải, cách đọc bản đồ giấy, bản đồ điện thoại, xử lý tình huống đi lạc đường và băng qua đường.",
    lessonIds: [1341, 1342, 1343, 1344, 1345, 1346, 1347, 1348, 1349, 1350]
  },
  {
    id: 136,
    topicId: 14,
    topicTitle: "TIẾNG TRUNG DU LỊCH",
    title: "Trải nghiệm ẩm thực & Gọi món",
    description: "Bộ học tiếng Trung về trải nghiệm ẩm thực, cách gọi món, xem thực đơn, các món đặc sản, khẩu vị như ngọt, chua, cay, các loại nước uống, thanh toán tiền ăn và nhận hóa đơn.",
    lessonIds: [1351, 1352, 1353, 1354, 1355, 1356, 1357, 1358, 1359, 1360]
  },
  {
    id: 137,
    topicId: 14,
    topicTitle: "TIẾNG TRUNG DU LỊCH",
    title: "Tham quan danh lam thắng cảnh",
    description: "Bộ học tiếng Trung về trải nghiệm tham quan thắng cảnh, cách mua vé vào cửa và phí vé, trao đổi với hướng dẫn viên, chụp ảnh kỉ niệm, cách đọc bản đồ du lịch, biển báo cấm sờ, tìm lối ra vào và nhà vệ sinh.",
    lessonIds: [1361, 1362, 1363, 1364, 1365, 1366, 1367, 1368, 1369, 1370]
  },
  {
    id: 138,
    topicId: 14,
    topicTitle: "TIẾNG TRUNG DU LỊCH",
    title: "Mua sắm quà lưu niệm & Mặc cả",
    description: "Bộ học tiếng Trung về trải nghiệm mua sắm quà lưu niệm, cách hỏi giá bao nhiêu tiền, chê đắt quá, yêu cầu rẻ một chút, thử đồ, mặc cả trả giá, kích cỡ size, màu sắc, kiểm tra chất lượng sản phẩm và quầy tính tiền.",
    lessonIds: [1371, 1372, 1373, 1374, 1375, 1376, 1377, 1378, 1379, 1380]
  },
  {
    id: 139,
    topicId: 14,
    topicTitle: "TIẾNG TRUNG DU LỊCH",
    title: "Xử lý khẩn cấp & Sự cố",
    description: "Bộ học tiếng Trung về kỹ năng ứng biến và các mẫu câu xử lý khẩn cấp khi bị lạc đường, mất hộ chiếu, đi bệnh viện, đau bụng mệt mỏi, gọi cảnh sát báo án, nhờ vả giúp đỡ, thất lạc hành lý tiền bạc và nhận biết các cảnh báo nguy hiểm.",
    lessonIds: [1381, 1382, 1383, 1384, 1385, 1386, 1387, 1388, 1389, 1390]
  },
  {
    id: 140,
    topicId: 14,
    topicTitle: "TIẾNG TRUNG DU LỊCH",
    title: "Kết thúc chuyến đi & Tạm biệt",
    description: "Bộ học tiếng Trung về trải nghiệm kết thúc lịch trình, chúc nhau thượng lộ bình an, mua sắm đặc sản địa phương làm quà tặng, di chuyển ra sân bay, kiểm tra và thay đổi thời gian về nước, bày tỏ lòng cảm ơn và chúc sức khỏe bình an.",
    lessonIds: [1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1399, 1400]
  },

  // 5. TIẾNG TRUNG CHUYÊN NGÀNH DỰ ÁN ĐẦU TƯ
  {
    id: 141,
    topicId: 15,
    topicTitle: "TIẾNG TRUNG CHUYÊN NGÀNH DỰ ÁN ĐẦU TƯ",
    title: "Khảo sát thị trường & Tìm kiếm vị trí",
    description: "Bộ học tiếng Trung về tìm kiếm khu công nghiệp thích hợp, khảo sát cơ sở hạ tầng, kế hoạch thuê đất, tính toán giá điện nước, chính sách ưu đãi, tình trạng giao thông, nguồn lao động địa phương và phân tích môi trường đầu tư.",
    lessonIds: [1401, 1402, 1403, 1404, 1405, 1406, 1407, 1408, 1409, 1410]
  },
  {
    id: 142,
    topicId: 15,
    topicTitle: "TIẾNG TRUNG CHUYÊN NGÀNH DỰ ÁN ĐẦU TƯ",
    title: "Hình thức đầu tư & Thành lập doanh nghiệp",
    description: "Bộ học tiếng Trung về thành lập công ty vốn nước ngoài, công ty trách nhiệm hữu hạn, đối tác liên doanh, thông tin người đại diện pháp luật, chỉnh sửa vốn điều lệ, xin cấp giấy phép kinh doanh, danh sách cổ đông, điều lệ công ty, quản lý con dấu và mở tài khoản ngân hàng.",
    lessonIds: [1411, 1412, 1413, 1414, 1415, 1416, 1417, 1418, 1419, 1420]
  },
  {
    id: 143,
    topicId: 15,
    topicTitle: "TIẾNG TRUNG CHUYÊN NGÀNH DỰ ÁN ĐẦU TƯ",
    title: "Thủ tục xin giấy phép đầu tư",
    description: "Bộ học tiếng Trung về quy trình làm giấy chứng nhận đăng ký đầu tư, hỏi đáp cơ quan phê duyệt, chuẩn bị hồ sơ dự án, sử dụng và quản lý con dấu công ty, kiểm tra mã số thuế, thẩm định dự án, đánh giá tác động môi trường (ĐTM), thay đổi vốn đầu tư, soạn thảo bản giải trình kinh tế kỹ thuật và làm việc với ban quản lý khu công nghiệp.",
    lessonIds: [1421, 1422, 1423, 1424, 1425, 1426, 1427, 1428, 1429, 1430]
  },
  {
    id: 144,
    topicId: 15,
    topicTitle: "TIẾNG TRUNG CHUYÊN NGÀNH DỰ ÁN ĐẦU TƯ",
    title: "Đánh giá tác động môi trường & PCCC",
    description: "Bộ học tiếng Trung về chuẩn bị và sửa đổi báo cáo đánh giá tác động môi trường (ĐTM), quản lý hệ thống xử lý nước thải, kiểm tra tiêu chuẩn khí thải, xin giấy phép phòng cháy chữa cháy (PCCC), thẩm duyệt thiết kế PCCC, đầu tư mua sắm và kiểm tra các thiết bị chữa cháy, xử lý lỗi hệ thống báo cháy tự động, quản lý chất thải nguy hại và tiến hành nghiệm thu PCCC định kỳ.",
    lessonIds: [1431, 1432, 1433, 1434, 1435, 1436, 1437, 1438, 1439, 1440]
  },
  {
    id: 145,
    topicId: 15,
    topicTitle: "TIẾNG TRUNG CHUYÊN NGÀNH DỰ ÁN ĐẦU TƯ",
    title: "Thiết kế & Đấu thầu xây dựng",
    description: "Bộ học tiếng Trung về phân tích và kiểm tra bản vẽ thiết kế, tìm kiếm tổng thầu thi công, chuẩn bị hồ sơ mời thầu, nhận kết quả trúng thầu, làm việc với đơn vị giám sát chất lượng, lựa chọn nhà thầu phụ, thẩm duyệt dự toán công trình, kiểm tra bản vẽ thi công và đánh giá các tiêu chuẩn chất lượng xây dựng.",
    lessonIds: [1441, 1442, 1443, 1444, 1445, 1446, 1447, 1448, 1449, 1450]
  },
  {
    id: 146,
    topicId: 15,
    topicTitle: "TIẾNG TRUNG CHUYÊN NGÀNH DỰ ÁN ĐẦU TƯ",
    title: "Quản lý thi công & tiến độ công trình",
    description: "Bộ học tiếng Trung về xin giấy phép xây dựng, báo cáo và kiểm tra tiến độ thi công, quản lý và kiểm tra an toàn công trường, giải quyết và thông báo trễ hạn công trình, tổ chức nghiệm thu công trình, ghi chép nhật ký công trường, thực hiện thay đổi thiết kế, quản lý nhà thầu thi công, bàn giao bản vẽ hoàn công và thanh toán tiền tạm ứng công trình.",
    lessonIds: [1451, 1452, 1453, 1454, 1455, 1456, 1457, 1458, 1459, 1460]
  },
  {
    id: 147,
    topicId: 15,
    topicTitle: "TIẾNG TRUNG CHUYÊN NGÀNH DỰ ÁN ĐẦU TƯ",
    title: "Mua sắm máy móc & thông quan thiết bị",
    description: "Bộ học tiếng Trung về mua sắm dây chuyền sản xuất tự động, xin miễn thuế nhập khẩu thiết bị máy móc, chuẩn bị hồ sơ khai báo hải quan, tính toán chi phí kho ngoại quan, thực hiện kiểm hóa hiện trường và làm chứng nhận hợp quy.",
    lessonIds: [1461, 1462, 1463, 1464, 1465, 1466, 1467, 1468, 1469, 1470]
  },
  {
    id: 148,
    topicId: 15,
    topicTitle: "TIẾNG TRUNG CHUYÊN NGÀNH DỰ ÁN ĐẦU TƯ",
    title: "Tuyển dụng bộ máy quản lý & lao động",
    description: "Bộ học tiếng Trung về làm thủ tục giấy phép lao động và thẻ tạm trú, đón tiếp chuyên gia nước ngoài và tuyển dụng công nhân, soạn thảo và ký kết hợp đồng lao động, đào tạo kỹ sư và xây dựng kế hoạch nhân sự.",
    lessonIds: [1471, 1472, 1473, 1474, 1475, 1476, 1477, 1478, 1479, 1480]
  },
  {
    id: 149,
    topicId: 15,
    topicTitle: "TIẾNG TRUNG CHUYÊN NGÀNH DỰ ÁN ĐẦU TƯ",
    title: "Quản lý ngân sách & giải ngân vốn đầu tư",
    description: "Bộ học tiếng Trung về lập báo cáo tổng vốn đầu tư, theo dõi tiến độ góp vốn, mở tài khoản vốn đầu tư tại ngân hàng, xử lý thủ tục giải ngân và hồ sơ kiểm toán quyết toán định kỳ, thiết lập biểu ngân sách dự phòng và quản trị dòng tiền kế toán.",
    lessonIds: [1481, 1482, 1483, 1484, 1485, 1486, 1487, 1488, 1489, 1490]
  },
  {
    id: 150,
    topicId: 15,
    topicTitle: "TIẾNG TRUNG CHUYÊN NGÀNH DỰ ÁN ĐẦU TƯ",
    title: "Vận hành thử nghiệm & nghiệm thu",
    description: "Bộ học tiếng Trung chuyên ngành về quy trình vận hành thử nghiệm, tổ chức nghiệm thu bàn giao, lập kế hoạch sản xuất chính thức, kiểm định công suất thiết kế, kỹ sư kỹ thuật giải trình sơ đồ, rà soát nhật ký vận hành và lập các biên bản nghiệm thu, báo cáo tổng kết.",
    lessonIds: [1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1499, 1500]
  }
];
