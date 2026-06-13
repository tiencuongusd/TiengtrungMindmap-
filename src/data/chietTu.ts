export interface ChietTu {
  hanzi: string;
  pinyin: string;
  hanViet: string;
  radicals: string;
  mnemonic: string;
}

export const CHIET_TU_DICT: Record<string, ChietTu> = {
  "你": {
    hanzi: "你",
    pinyin: "nǐ",
    hanViet: "NHĨ",
    radicals: "Bộ Nhân (亻) + chữ Nhĩ (尔)",
    mnemonic: "Bạn là con người (亻) luôn kề vai sát cánh, thân thiết và gần gũi với ta giống như cái bóng của chính ta (尔)."
  },
  "我": {
    hanzi: "我",
    pinyin: "wǒ",
    hanViet: "NGÃ",
    radicals: "Bộ Thủ (手) + bộ Qua (戈)",
    mnemonic: "Bản ngã của tôi (我) là tự tay (手) mình cầm vũ khí (戈 - cây thương) bảo vệ danh dự và lý tưởng của bản thân."
  },
  "他": {
    hanzi: "他",
    pinyin: "tā",
    hanViet: "THA",
    radicals: "Bộ Nhân (亻) + chữ Dã (也)",
    mnemonic: "Anh ấy cũng (也) là một con người (亻) bằng xương bằng thịt như chúng ta nhưng ở vị trí đối tượng thứ ba."
  },
  "她": {
    hanzi: "她",
    pinyin: "tā",
    hanViet: "THA (NỮ)",
    radicals: "Bộ Nữ (女) + chữ Dã (也)",
    mnemonic: "Cô ấy dẫu có thế nào thì cũng (也) là một người con gái, phụ nữ (女) duyên dáng cần được chở che nâng niu."
  },
  "您": {
    hanzi: "您",
    pinyin: "nín",
    hanViet: "NÍN",
    radicals: "Chữ Bạn (你) + bộ Tâm (心)",
    mnemonic: "Đặt người bạn (你) lên trên hết, thể hiện sự kính trọng từ tận sâu đáy lòng, trái tim (心) chính là tôn xưng gọi Ngài, Ông, Bà."
  },
  "好": {
    hanzi: "好",
    pinyin: "hǎo",
    hanViet: "HẢO",
    radicals: "Bộ Nữ (女) + bộ Tử (子)",
    mnemonic: "Người con gái, người mẹ (女) sinh được cả con gái lẫn con trai (子) bên cạnh thì chính là điềm lành, là việc tốt lành trọn vẹn nhất."
  },
  "学": {
    hanzi: "学",
    pinyin: "xué",
    hanViet: "HỌC",
    radicals: "Mầm non/Thầy dạy (3 chấm) + bộ Mịch (冖) + bộ Tử (子)",
    mnemonic: "Đứa học trò nhỏ (子) ngồi học dưới mái trường (冖 - che phủ) được người thầy hiền đức vỗ đầu truyền trao từng nét chữ tinh hoa."
  },
  "听": {
    hanzi: "听",
    pinyin: "tīng",
    hanViet: "THÍNH",
    radicals: "Bộ Khẩu (口) + bộ Cân (斤)",
    mnemonic: "Muốn nghe rõ tiếng rìu (斤) đốn cây vang vọng trong rừng sâu, người ta phải khẽ mở miệng (口) nín thở vểnh tai lắng nghe."
  },
  "说": {
    hanzi: "说",
    pinyin: "shuō",
    hanViet: "THUYẾT",
    radicals: "Bộ Ngôn (讠) + bộ Bát (八) + bộ Huynh (口/儿)",
    mnemonic: "Nói (讠) là dùng miệng (口/儿 - lời nói đứa trẻ) để giãi bày phân chia (八 - bát) ý kiến của mình cho người xung quanh thấu hiểu."
  },
  "读": {
    hanzi: "读",
    pinyin: "dú",
    hanViet: "ĐỘC",
    radicals: "Bộ Ngôn (讠) + bộ Mịch (冖) + bộ Bối (贝)",
    mnemonic: "Đọc sách (讠) chính là đang đi tìm những báu vật tinh hoa, tiền tài tri thức (贝) ẩn chứa bên dưới mái tranh che phủ (冖) của thư phòng."
  },
  "写": {
    hanzi: "写",
    pinyin: "xiě",
    hanViet: "TẢ",
    radicals: "Bộ Mịch (冖) + bộ Cực (与)",
    mnemonic: "Viết lách là che phủ (冖) trang giấy trắng tinh và nhẹ nhàng đặt bút uốn lượn, họa (与) lên thế giới nội tâm rực rỡ sắc màu."
  },
  "见": {
    hanzi: "见",
    pinyin: "jiàn",
    hanViet: "KIẾN",
    radicals: "Bộ Mục (目) biến điệu + bộ Nhi (儿)",
    mnemonic: "Muốn nhìn thấy sâu sắc (Kiến), hãy dùng đôi chân (儿 - trẻ nhỏ bước đi) tự mình đi tới tận nơi và mở to đôi mắt (目) ra quan sát."
  },
  "去": {
    hanzi: "去",
    pinyin: "qù",
    hanViet: "KHỨ",
    radicals: "Bộ Thổ (土) + bộ Tư (厶)",
    mnemonic: "Rời bỏ mảnh đất quê hương (土) để một mình dấn thân kiếm tìm hoài bão và không gian riêng tư (厶) của cuộc đời chính là ra đi."
  },
  "来": {
    hanzi: "来",
    pinyin: "lái",
    hanViet: "LAI",
    radicals: "Hình ảnh cây lúa mì chín trĩu hạt",
    mnemonic: "Mùa lúa mì chín trĩu hạt mang lại ấm no cho bản làng. Tương lai (Lai) gieo hy vọng no ấm và hạnh phúc đang chuyển dời tìm đến."
  },
  "工": {
    hanzi: "工",
    pinyin: "gōng",
    hanViet: "CÔNG",
    radicals: "Hình ảnh thước cân bằng của thợ mộc",
    mnemonic: "Biểu thị dụng cụ thước đo thẳng thớm, tượng trưng cho công việc lao động, sự chính trực kiên định của người thợ tài hoa."
  },
  "作": {
    hanzi: "作",
    pinyin: "zuò",
    hanViet: "TÁC",
    radicals: "Bộ Nhân (亻) + chữ Tạc (乍)",
    mnemonic: "Con người (亻) đột nhiên (乍) hành động, sáng kiến bộc phát một cách tích cực để làm việc, sáng chế ra những tác phẩm để đời."
  },
  "公": {
    hanzi: "公",
    pinyin: "gōng",
    hanViet: "CÔNG",
    radicals: "Bộ Bát (八) + bộ Tư (厶)",
    mnemonic: "Đem mọi tài sản, quyền lợi ích tư lợi riêng (厶) chia đều (八 - Bát) ra cho cả cộng đồng tập thể cùng hưởng thụ chính là Công bằng."
  },
  "司": {
    hanzi: "司",
    pinyin: "sī",
    hanViet: "TY (TƯ)",
    radicals: "Nét bao bọc + bộ Khẩu (口)",
    mnemonic: "Người có quyền lực đứng bên trong cơ quan chỉ đạo, há to miệng (口) truyền đạt mệnh lệnh hành chính tối cao chính là người quản lý bộ ty."
  },
  "老": {
    hanzi: "老",
    pinyin: "lǎo",
    hanViet: "LÃO",
    radicals: "Hình ảnh người già râu rậm + bộ Chủy (匕 - chiếc gậy)",
    mnemonic: "Hình ảnh một cụ già mái tóc dài bạc phơ chống chiếc gậy (匕) gỗ vững chãi dạo bước chậm rãi thảnh thơi dưỡng già."
  },
  "板": {
    hanzi: "板",
    pinyin: "bǎn",
    hanViet: "BẢN",
    radicals: "Bộ Mộc (木) + chữ Phản (反)",
    mnemonic: "Thân cây gỗ (木) thô sơ khi chặt ra, được người thợ lật lật ngược lại (反 - Phản) bào nhẵn nhụi làm tấm bảng, tấm ván phẳng phiu."
  },
  "介": {
    hanzi: "介",
    pinyin: "jiè",
    hanViet: "GIỚI",
    radicals: "Bộ Nhân (人) giang tay che chở làm ranh giới",
    mnemonic: "Hình ảnh một người đứng giang tay phân chia ranh giới, làm cầu nối trung gian hòa giải đứng ở giữa kết nối hai người bạn."
  },
  "绍": {
    hanzi: "绍",
    pinyin: "shào",
    hanViet: "THIỆU",
    radicals: "Bộ Mịch (纟) + chữ Chiêu (召)",
    mnemonic: "Dùng những sợi tơ lòng (纟 - Mịch) dệt mối nhân duyên và cất tiếng kêu gọi, mời mời (召 - Chiêu) đôi bên hội ngộ giới thiệu xích lại gần nhau."
  },
  "电": {
    hanzi: "电",
    pinyin: "diàn",
    hanViet: "ĐIỆN",
    radicals: "Bộ Điền (田) + nét sổ móc đuôi phóng sét",
    mnemonic: "Tia chớp xoáy điện khổng lồ phóng luồng năng lượng từ bầu trời rạch ngang thẳng xuống làm rung chuyển ruộng nương (田) quê hương."
  },
  "话": {
    hanzi: "话",
    pinyin: "huà",
    hanViet: "THOẠI",
    radicals: "Bộ Ngôn (讠) + chữ Thiệt (舌)",
    mnemonic: "Dùng ngôn từ (讠) tao nhã kết hợp uyển chuyển chiếc lưỡi (舌 - Thiệt) để trò chuyện đàm thoại, đối thoại chân tình."
  },
  "客": {
    hanzi: "客",
    pinyin: "kè",
    hanViet: "KHÁCH",
    radicals: "Bộ Miên (宀) + chữ Các (各)",
    mnemonic: "Mỗi người (各) từ vạn lý phương xa hẹn nhau tề hợp, cùng ngồi thưởng trà dưới mái ấm (宀) hiếu khách của gia đình ta."
  },
  "户": {
    hanzi: "户",
    pinyin: "hù",
    hanViet: "HỘ",
    radicals: "Hình ảnh một cánh cửa đơn",
    mnemonic: "Cánh cửa đơn sơ bằng gỗ của ngôi nhà, mỗi chiếc cửa biểu hiệu cho nơi cư ngụ sinh sống của một hộ gia đình."
  },
  "经": {
    hanzi: "经",
    pinyin: "jīng",
    hanViet: "KINH",
    radicals: "Bộ Mịch (纟) + chữ Kính (径 - đường nhỏ thẳng)",
    mnemonic: "Sợi tơ dọc chủ chốt (纟) trên khung dệt luôn đi theo đường lối thẳng tắp (径) quy củ tạo thành bộ khung vững vàng cho tác phẩm dệt."
  },
  "理": {
    hanzi: "理",
    pinyin: "lǐ",
    hanViet: "LÝ",
    radicals: "Bộ Vương (王) + bộ Lý (里)",
    mnemonic: "Vua (王) phân chia ranh giới đất đai, làng mạc (里) một cách minh bạch, thấu đáo chính là biểu trưng cho chân lý, đạo lý muôn thuờ."
  },
  "谢": {
    hanzi: "谢",
    pinyin: "xiè",
    hanViet: "TẠ",
    radicals: "Bộ Ngôn (讠) + bộ Thân (身) + bộ Thốn (寸)",
    mnemonic: "Dùng lời nói (讠) cúi gập tấm thân (身) một góc khiêm cung thanh tao có chừng mực thốn tấc (寸) để tỏ lời tri ân, cảm tạ chân thành."
  },
  "再": {
    hanzi: "再",
    pinyin: "zài",
    hanViet: "TÁI",
    radicals: "Hình ảnh kết cấu lập lại vững vàng",
    mnemonic: "Mô tả một nền tảng được tiếp tục nâng đỡ và xây bồi đắp lần thứ hai, biểu thị sự lặp lại, tái lặp hành động tốt đẹp."
  },
  "请": {
    hanzi: "请",
    pinyin: "qǐng",
    hanViet: "THỈNH",
    radicals: "Bộ Ngôn (讠) + chữ Thanh (青)",
    mnemonic: "Dùng lời nói (讠) nhã nhặn như làn gió mát, trong trẻo thanh khiết (青 - Màu xanh của cỏ cây) để chân thành cúi xin, cung thỉnh kính mời."
  },
  "问": {
    hanzi: "问",
    pinyin: "wèn",
    hanViet: "VẤN",
    radicals: "Bộ Môn (门) + bộ Khẩu (口)",
    mnemonic: "Muốn hỏi han việc gì, trước tiên hãy cúi chào trước cổng cánh cửa lớn (门 - Môn) rồi mấp máy miệng (口 - Khẩu) thưa gửi nhỏ nhẹ lễ phép."
  },
  "喜": {
    hanzi: "喜",
    pinyin: "喜",
    hanViet: "HỶ",
    radicals: "Chữ Sĩ (士) + trống nhạc (壴) + bộ Khẩu (口)",
    mnemonic: "Khi nho sĩ (士) đỗ đạt thành danh, làng xóm tề tựu gõ trống (壴) reo hò rộn rã cất tiếng miệng (口) cười vang hỷ hả ăn mừng."
  },
  "欢": {
    hanzi: "欢",
    pinyin: "huān",
    hanViet: "HOAN",
    radicals: "Chữ Hựu (又) + bộ Khiếm (欠)",
    mnemonic: "Bàn tay nắm chặt lấy bàn tay (又) nhảy múa, miệng vui cười hát hò ríu rít hạnh phúc (欠 - Khiếu) hoan hỉ đón chào ngày hội."
  },
  "会": {
    hanzi: "会",
    pinyin: "huì",
    hanViet: "HỘI / BIẾT",
    radicals: "Bộ Nhân (人) + bộ Vân (云)",
    mnemonic: "Mọi người (人) cùng tụ họp tấp nập, đông đảo như những áng mây lành hội tụ (云) trên bầu trời xanh để trau dồi tri thức."
  },
  "想": {
    hanzi: "想",
    pinyin: "xiǎng",
    hanViet: "TƯỞNG",
    radicals: "Chữ Tương/Tướng (相) + bộ Tâm (心)",
    mnemonic: "Khi mắt hướng lên nhìn chăm chú ngắm cây cối vạn vật (相) kết hợp với tâm trí, trái tim (心) rung cảm sâu sắc tạo nên sự nhớ mong, tưởng niệm."
  },
  "要": {
    hanzi: "要",
    pinyin: "yào",
    hanViet: "YÊU / CHỦ YẾU",
    radicals: "Chiếc mũ chóp + bộ Nữ (女)",
    mnemonic: "Người con gái (女) đeo những chiếc đai lưng thắt eo trang sức lộng lẫy quý báu, đó chính là vẻ đẹp thiết yếu mà ai cũng mong muốn."
  },
  "漂亮": {
    hanzi: "漂亮",
    pinyin: "piàoliang",
    hanViet: "PHIÊU LƯỢNG (ĐẸP)",
    radicals: "Ghép từ chữ 漂 (sóng nước gợn nhẹ) và 亮 (con đường sáng ngời rực rỡ)",
    mnemonic: "Sự xinh đẹp tinh khiết tựa như hạt nước ngọc ngà (漂) phản chiếu ánh sáng dịu kỳ rực rỡ (亮) thắp sáng tâm hồn."
  },
  "高兴": {
    hanzi: "高兴",
    pinyin: "gāoxìng",
    hanViet: "CAO HƯNG (VUI MỪNG)",
    radicals: "Ghép từ chữ 高 (lầu cao sừng sững) và 兴 (vươn mình hưng thịnh)",
    mnemonic: "Tâm trạng vui mừng phấn khởi cao độ, giống như đứng ngắm nhìn trên tầng lầu cao vợi (高) cảm thấy chí hướng hưng thịnh (兴) tràn trề dâng trào."
  },
  "认识": {
    hanzi: "认识",
    pinyin: "rènshi",
    hanViet: "NHẬN THỨC (QUEN BIẾT)",
    radicals: "Ghép từ chữ 认 (nhận dạng, nhận biết) và 识 (tri thức, thấu hiểu)",
    mnemonic: "Thông qua trò chuyện ngôn ngữ (讠) để thấu hiểu một con người (人) và ghi chép (只) lại sâu sắc trong tâm khảm để thiết lập mối quan hệ quen biết."
  },
  "友": {
    hanzi: "友",
    pinyin: "yǒu",
    hanViet: "HỮU",
    radicals: "Nét nghiêng dốc + bộ Hựu (又)",
    mnemonic: "Hai người bạn sẵn sàng đưa tay (又) đùm bọc nâng đỡ cùng vượt qua thử thách gập ghềnh cheo leo dốc thẳm của hành trình."
  },
  "情": {
    hanzi: "情",
    pinyin: "qíng",
    hanViet: "TÌNH",
    radicals: "Bộ Tâm đứng (忄) + chữ Thanh (青)",
    mnemonic: "Tình cảm chân thành chính là mầm sống xanh mọc non tơ (青) đâm chồi rực rỡ ngay trong trung tâm tâm hồn, trái tim (忄) chúng ta."
  },
  "名": {
    hanzi: "名",
    pinyin: "míng",
    hanViet: "DANH",
    radicals: "Bộ Tịch (夕) + bộ Khẩu (口)",
    mnemonic: "Lúc chiều tà, hoàng hôn chìm trong màn đêm tối tăm (夕), để biết ai đang đến bên cạnh ta phải mở miệng (口) cất tiếng gọi tên để xướng danh."
  },
  "字": {
    hanzi: "字",
    pinyin: "zì",
    hanViet: "TỰ",
    radicals: "Bộ Miên (宀) + bộ Tử (子)",
    mnemonic: "Thế hệ con trẻ (子) được học phép tắc, đạo nghĩa rèn luyện từng con chữ thánh hiền ngay ngắn dưới mái gia đình che chở (宀)."
  },
  "师": {
    hanzi: "师",
    pinyin: "shī",
    hanViet: "SƯ (THẦY)",
    radicals: "Bộ Đao cách điệu + bộ Cân (巾)",
    mnemonic: "Người thầy nắm giữ cờ lệnh định hướng đạo nghĩa oai nghiêm, răn dạy học trò khuôn khổ, dùng tấm lòng rộng như tấm lụa (巾) dạy bảo học sinh."
  },
  "生": {
    hanzi: "生",
    pinyin: "shēng",
    hanViet: "SINH",
    radicals: "Hình ảnh mầm cây vươn lên từ lòng đất mẹ",
    mnemonic: "Một mầm cây xanh nhỏ bé mọc đâm chồi vươn cao khỏi thổ nhưỡng phì nhiêu rộng lớn, đại diện cho khởi nguyên sự sống sinh sôi nảy nở."
  },
  "国": {
    hanzi: "国",
    pinyin: "guó",
    hanViet: "QUỐC",
    radicals: "Bộ Vi (囗) + bộ Ngọc (玉)",
    mnemonic: "Quốc gia chính là vùng lãnh thổ có bờ cõi biên cương bao quanh vững vàng (囗) bảo vệ lấy quốc bảo vương ngọc (玉) quý giá nhất của muôn dân."
  },
  "中": {
    hanzi: "中",
    pinyin: "zhōng",
    hanViet: "TRUNG",
    radicals: "Hình chữ nhật có vạch thẳng đâm xuyên giữa",
    mnemonic: "Hình ảnh bia mục tiêu bị một mũi tên sắc bén ngắm bắn xuyên dọc ngay hồng tâm, mang ý niệm trung tâm, trung trực không lệch lạc."
  },
  "华": {
    hanzi: "华",
    pinyin: "huá",
    hanViet: "HOA / PHỒN VINH",
    radicals: "Các nhánh cỏ hoa rực rỡ vươn mình",
    mnemonic: "Tượng trưng cho sự tinh hoa rạng ngời nở rộ như hoa xuân phơi phới, mang lại phồn vinh hưng thịnh rực sắc."
  },
  "文": {
    hanzi: "文",
    pinyin: "wén",
    hanViet: "VĂN",
    radicals: "Hình ảnh con người giang tay tinh nghịch",
    mnemonic: "Ban đầu mô tả hình người xăm các nét hoa văn uyển chuyển tôn quý trên cơ thể, sau này làm nền tảng cho chữ viết, học thuật văn minh."
  },
  "经理": {
    hanzi: "经理",
    pinyin: "jīnglǐ",
    hanViet: "KINH LÝ",
    radicals: "Ghép từ chữ 经 (Kinh qua, quy luật) và 理 (Quản lý, đạo lý)",
    mnemonic: "Là người kinh qua (经) nhiều thử thách nghiệp vụ, nắm rõ quy luật công ty để điều hành xử lý (理) công việc hợp lý hợp tình."
  },
  "老板": {
    hanzi: "老板",
    pinyin: "lǎobǎn",
    hanViet: "LÃO BẢN",
    radicals: "Ghép từ chữ 老 (Kính lão, lâu năm) và 板 (Tấm ván nền, chỗ dựa vững vàng)",
    mnemonic: "Lão bản (Ông chủ) là người có uy tín lâu năm (老) đóng vai trò là tấm khiên bản gỗ (板) vững chắc đứng mũi chịu sào bảo vệ sự nghiệp và nhân viên."
  },
  "谢谢": {
    hanzi: "谢谢",
    pinyin: "xièxie",
    hanViet: "TẠ TẠ",
    radicals: "Gồm hai chữ 谢 ghép lại",
    mnemonic: "Nói lời cảm tạ chân thành bằng cách liên tục cúi tấm thân, thưa gửi nhã nhặn lễ nghĩa tròn đầy để đối phương hiểu sâu sắc lòng biết ơn."
  },
  "再见": {
    hanzi: "再见",
    pinyin: "zàijiàn",
    hanViet: "TÁI KIẾN",
    radicals: "Ghép từ chữ 再 (Lần nữa, lặp lại) và 见 (Gặp gỡ, nhìn thấy)",
    mnemonic: "Tạm biệt nhưng tràn đầy niềm lạc quan tin tưởng, hẹn ngày mai lại nối dài sợi dây sum hợp để tiếp tục gặp lại (Tái kiến) nhau."
  },
  "介绍": {
    hanzi: "介绍",
    pinyin: "jièshào",
    hanViet: "GIỚI THIỆU",
    radicals: "Ghép từ chữ 介 (Người làm trung gian) và 绍 (Kết nối, kết sợi tơ duyên)",
    mnemonic: "Bản chất là đứng ra làm cầu nối trung gian (介) xe duyên kết dệt mối quen biết (绍) giữa hai con người xa lạ bước vào thế giới của nhau."
  }
};
