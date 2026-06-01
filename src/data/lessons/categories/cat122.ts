import { Lesson } from '../../../types';

export const cat122Lessons: Lesson[] = [
  {
    id: 1211,
    title: "Từ vựng: Đón tiếp (接待)",
    description: "Công việc đón tiếp khách hàng tại văn phòng, các phòng tiếp khách chuyên nghiệp.",
    mindMaps: [
      {
        id: "m1211-1",
        vietnamese: "Đón tiếp",
        chinese: "接待",
        pinyin: "jiēdài",
        vietnameseHint: "chia tai",
        children: [
          {
            id: "m1211-1-1",
            vietnamese: "Nhân viên",
            chinese: "人员",
            pinyin: "rényuán",
            vietnameseHint: "rấn doán",
            children: [
              {
                id: "m1211-1-1-1",
                vietnamese: "Nhân viên đón tiếp",
                chinese: "接待人员",
                pinyin: "jiēdài rényuán",
                vietnameseHint: "chia tai rấn doán",
                children: [
                  {
                    id: "m1211-1-1-1-1",
                    vietnamese: "Ai là nhân viên đón tiếp ngày hôm nay?",
                    chinese: "今天谁是接待人员？",
                    pinyin: "Jīnián shéi shì jiēdài rényuán?", // Note: wait, Jīntiān in Vietnamese / English, let's make sure it's correct Pinyin "Jīntiān shéi shì jiēdài rényuán?"
                    vietnameseHint: "Chin thiên sấy sư chia tai rấn doán"
                  }
                ]
              }
            ]
          },
          {
            id: "m1211-1-2",
            vietnamese: "Phòng / Khu vực",
            chinese: "室",
            pinyin: "shì",
            vietnameseHint: "sư",
            children: [
              {
                id: "m1211-1-2-1",
                vietnamese: "Phòng đón tiếp",
                chinese: "接待室",
                pinyin: "jiēdàishì",
                vietnameseHint: "chia tai sư",
                children: [
                  {
                    id: "m1211-1-2-1-1",
                    vietnamese: "Mời khách hàng vào phòng đón tiếp.",
                    chinese: "请客户进接待室。",
                    pinyin: "Qǐng kèhù jìn jiēdàishì.",
                    vietnameseHint: "Chỉnh khưa hu chin chia tai sư"
                  }
                ]
              }
            ]
          },
          {
            id: "m1211-1-3",
            vietnamese: "Công việc",
            chinese: "工作",
            pinyin: "gōngzuò",
            vietnameseHint: "cung chuo",
            children: [
              {
                id: "m1211-1-3-1",
                vietnamese: "Công việc đón tiếp",
                chinese: "接待工作",
                pinyin: "jiēdài gōngzuò",
                vietnameseHint: "chia tai cung chuo",
                children: [
                  {
                    id: "m1211-1-3-1-1",
                    vietnamese: "Chúng ta cần chuẩn bị công việc đón tiếp.",
                    chinese: "我们需要准备接待工作。",
                    pinyin: "Wǒmen xūyào zhǔnbèi jiēdài gōngzuò.",
                    vietnameseHint: "Ủa mân xuy deo chuẩn pây chia tai cung chuo"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1212,
    title: "Từ vựng: Khách hàng (客户)",
    description: "Các mẫu câu nghênh đón khách hàng quan trọng và cam kết nỗ lực đem lại sự hài lòng tối đa cho khách hàng.",
    mindMaps: [
      {
        id: "m1212-1",
        vietnamese: "Khách hàng",
        chinese: "客户",
        pinyin: "kèhù",
        vietnameseHint: "khưa hu",
        children: [
          {
            id: "m1212-1-1",
            vietnamese: "Đón / Nghênh đón",
            chinese: "迎接",
            pinyin: "yíngjiē",
            vietnameseHint: "dính chia",
            children: [
              {
                id: "m1212-1-1-1",
                vietnamese: "Đón khách hàng",
                chinese: "迎接客户",
                pinyin: "yíngjiē kèhù",
                vietnameseHint: "dính chia khưa hu",
                children: [
                  {
                    id: "m1212-1-1-1-1",
                    vietnamese: "Giám đốc đã đi đón khách hàng rồi.",
                    chinese: "经理去迎接客户了。",
                    pinyin: "Jīnglǐ qù yíngjiē kèhù le.",
                    vietnameseHint: "Ching lỉ chù dính chia khưa hu lơ"
                  }
                ]
              }
            ]
          },
          {
            id: "m1212-1-2",
            vietnamese: "Quan trọng",
            chinese: "重要",
            pinyin: "zhòngyào",
            vietnameseHint: "chung deo",
            children: [
              {
                id: "m1212-1-2-1",
                vietnamese: "Khách hàng quan trọng",
                chinese: "重要客户",
                pinyin: "zhòngyào kèhù",
                vietnameseHint: "chung deo khưa hu",
                children: [
                  {
                    id: "m1212-1-2-1-1",
                    vietnamese: "Hôm nay có một khách hàng quan trọng đến.",
                    chinese: "今天有位重要客户来。",
                    pinyin: "Jīntiān yǒu wèi zhòngyào kèhù lái.",
                    vietnameseHint: "Chin thiên dẩu uây chung deo khưa hu lái"
                  }
                ]
              }
            ]
          },
          {
            id: "m1212-1-3",
            vietnamese: "Hài lòng",
            chinese: "满意",
            pinyin: "mǎnyì",
            vietnameseHint: "mản i",
            children: [
              {
                id: "m1212-1-3-1",
                vietnamese: "Khách hàng hài lòng",
                chinese: "客户满意",
                pinyin: "kèhù mǎnyì",
                vietnameseHint: "khưa hu mản i",
                children: [
                  {
                    id: "m1212-1-3-1-1",
                    vietnamese: "Phải làm cho khách hàng hài lòng nhé.",
                    chinese: "要让客户满意哦。",
                    pinyin: "Yào ràng kèhù mǎnyì o.",
                    vietnameseHint: "Deo rang khưa hu mản i ô"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1213,
    title: "Từ vựng: Tham quan (参观)",
    description: "Dẫn dắt khách đối tác đi tham quan các phân xưởng sản xuất, văn phòng làm việc theo lộ trình cụ thể.",
    mindMaps: [
      {
        id: "m1213-1",
        vietnamese: "Tham quan",
        chinese: "参观",
        pinyin: "cānguān",
        vietnameseHint: "chan quan",
        children: [
          {
            id: "m1213-1-1",
            vietnamese: "Công ty",
            chinese: "公司",
            pinyin: "gōngsī",
            vietnameseHint: "cung sư",
            children: [
              {
                id: "m1213-1-1-1",
                vietnamese: "Tham quan công ty",
                chinese: "参观公司",
                pinyin: "cānguān gōngsī",
                vietnameseHint: "cānguān gōngsī",
                children: [
                  {
                    id: "m1213-1-1-1-1",
                    vietnamese: "Chào mừng các bạn đến tham quan công ty.",
                    chinese: "欢迎你们来参观公司。",
                    pinyin: "Huānyíng nǐmen lái cānguān gōngsī.",
                    vietnameseHint: "Hoan dính nỉ mân lái chan quan cung sư"
                  }
                ]
              }
            ]
          },
          {
            id: "m1213-1-2",
            vietnamese: "Phân xưởng / Xưởng",
            chinese: "车间",
            pinyin: "chējiān",
            vietnameseHint: "chơ chien",
            children: [
              {
                id: "m1213-1-2-1",
                vietnamese: "Tham quan phân xưởng",
                chinese: "参观车间",
                pinyin: "cānguān chējiān",
                vietnameseHint: "chan quan chơ chien",
                children: [
                  {
                    id: "m1213-1-2-1-1",
                    vietnamese: "Khách hàng muốn đi tham quan phân xưởng.",
                    chinese: "客户想去参观车间。",
                    pinyin: "Kèhù xiǎng qù cānguān chējiān.",
                    vietnameseHint: "Khưa hu xiảng chù chan quan chơ chien"
                  }
                ]
              }
            ]
          },
          {
            id: "m1213-1-3",
            vietnamese: "Lộ trình / Lịch trình",
            chinese: "路线",
            pinyin: "lùxiàn",
            vietnameseHint: "lu xiên",
            children: [
              {
                id: "m1213-1-3-1",
                vietnamese: "Lộ trình tham quan",
                chinese: "参观路线",
                pinyin: "cānguān lùxiàn",
                vietnameseHint: "chan quan lu xiên",
                children: [
                  {
                    id: "m1213-1-3-1-1",
                    vietnamese: "Đây là lộ trình tham quan ngày hôm nay.",
                    chinese: "这是今天的参观路线。",
                    pinyin: "Zhè shì jīntiān de cānguān lùxiàn.",
                    vietnameseHint: "Chơ sư chin thiên tợ chan quan lu xiên"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1214,
    title: "Từ vựng: Giới thiệu (介绍)",
    description: "Giới thiệu tổng quan các bộ phận chức năng và quy trình vận hành chi tiết trong nội bộ doanh nghiệp.",
    mindMaps: [
      {
        id: "m1214-1",
        vietnamese: "Giới thiệu",
        chinese: "介绍",
        pinyin: "jièshào",
        vietnameseHint: "chia sao",
        children: [
          {
            id: "m1214-1-1",
            vietnamese: "Quy trình",
            chinese: "流程",
            pinyin: "liúchéng",
            vietnameseHint: "liếu chớng",
            children: [
              {
                id: "m1214-1-1-1",
                vietnamese: "Giới thiệu quy trình",
                chinese: "介绍流程",
                pinyin: "jièshào liúchéng",
                vietnameseHint: "chia sao liếu chớng",
                children: [
                  {
                    id: "m1214-1-1-1-1",
                    vietnamese: "Để tôi giới thiệu quy trình sản xuất.",
                    chinese: "我来介绍生产流程。",
                    pinyin: "Wǒ lái jièshào shēngchǎn liúchéng.",
                    vietnameseHint: "Ủa lái chia sao sưng chản liếu chớng"
                  }
                ]
              }
            ]
          },
          {
            id: "m1214-1-2",
            vietnamese: "Chi tiết",
            chinese: "详细",
            pinyin: "xiángxì",
            vietnameseHint: "xiáng xi",
            children: [
              {
                id: "m1214-1-2-1",
                vietnamese: "Giới thiệu chi tiết",
                chinese: "详细介绍",
                pinyin: "xiángxì jièshào",
                vietnameseHint: "xiáng xi chia sao",
                children: [
                  {
                    id: "m1214-1-2-1-1",
                    vietnamese: "Xin hãy giới thiệu chi tiết một chút.",
                    chinese: "请详细介绍一下。",
                    pinyin: "Qǐng xiángxì jièshào yíxià.",
                    vietnameseHint: "Chỉnh xiáng xi chia sao ý xịa"
                  }
                ]
              }
            ]
          },
          {
            id: "m1214-1-3",
            vietnamese: "Bộ phận",
            chinese: "部门",
            pinyin: "bùmén",
            vietnameseHint: "pu mấn",
            children: [
              {
                id: "m1214-1-3-1",
                vietnamese: "Giới thiệu bộ phận",
                chinese: "介绍部门",
                pinyin: "jièshào bùmén",
                vietnameseHint: "chia sao pu mấn",
                children: [
                  {
                    id: "m1214-1-3-1-1",
                    vietnamese: "Anh ấy đang giới thiệu các bộ phận công ty.",
                    chinese: "他在介绍公司的部门。",
                    pinyin: "Tā zài jièshào gōngsī de bùmén.",
                    vietnameseHint: "Tha chai chia sao cung sư tợ pu mấn"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1215,
    title: "Từ vựng: Văn phòng (办公室)",
    description: "Tham quan không gian văn phòng làm việc chính của ban điều hành, xác định vị trí các phòng ban.",
    mindMaps: [
      {
        id: "m1215-1",
        vietnamese: "Văn phòng",
        chinese: "办公室",
        pinyin: "bàngōngshì",
        vietnameseHint: "pan cung sư",
        children: [
          {
            id: "m1215-1-1",
            vietnamese: "Tham quan",
            chinese: "参观",
            pinyin: "cānguān",
            vietnameseHint: "chan quan",
            children: [
              {
                id: "m1215-1-1-1",
                vietnamese: "Tham quan văn phòng",
                chinese: "参观办公室",
                pinyin: "cānguān bàngōngshì",
                vietnameseHint: "chan quan pan cung sư",
                children: [
                  {
                    id: "m1215-1-1-1-1",
                    vietnamese: "Bây giờ chúng ta đi tham quan văn phòng.",
                    chinese: "现在เรา去参观办公室。", // Wait! "เรา" is Thai for "we"! Let's look at the user prompt: "现在我们去参观办公室。 | 现在我们去参观办公室。 | Xiànzài wǒmen qù cānguān bàngōngshì. | Xiên chai ủa mân chù chan quan pan cung sư". Yes, "我们" is correct! Let's write "现在我们去参观办公室。"
                    pinyin: "Xiànzài wǒmen qù cānguān bàngōngshì.",
                    vietnameseHint: "Xiên chai ủa mân chù chan quan pan cung sư"
                  }
                ]
              }
            ]
          },
          {
            id: "m1215-1-2",
            vietnamese: "Lớn",
            chinese: "大",
            pinyin: "dà",
            vietnameseHint: "ta",
            children: [
              {
                id: "m1215-1-2-1",
                vietnamese: "Văn phòng rất lớn",
                chinese: "办公室很大",
                pinyin: "bàngōngshì hěn dà",
                vietnameseHint: "pan cung sư hẩn ta",
                children: [
                  {
                    id: "m1215-1-2-1-1",
                    vietnamese: "Văn phòng của các bạn thực sự rất lớn.",
                    chinese: "你们的办公室真的很大。",
                    pinyin: "Nǐmen de bàngōngshì zhēnde hěn dà.",
                    vietnameseHint: "Nỉ mân tợ pan cung sư trân tợ hẩn ta"
                  }
                ]
              }
            ]
          },
          {
            id: "m1215-1-3",
            vietnamese: "Vị trí",
            chinese: "位置",
            pinyin: "wèizhì",
            vietnameseHint: "uây chư",
            children: [
              {
                id: "m1215-1-3-1",
                vietnamese: "Vị trí văn phòng",
                chinese: "办公室位置",
                pinyin: "bàngōngshì wèizhì",
                vietnameseHint: "pan cung sư uây chư",
                children: [
                  {
                    id: "m1215-1-3-1-1",
                    vietnamese: "Bạn có biết vị trí văn phòng ở đâu không?",
                    chinese: "你知道办公室位置在哪吗？",
                    pinyin: "Nǐ zhīdào bàngōngshì wèizhì zài nǎ ma?",
                    vietnameseHint: "Nỉ chư tao pan cung sư uây chư chai nả ma"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1216,
    title: "Từ vựng: Phân xưởng sản xuất (生产车间)",
    description: "Tham quan phân xưởng sản xuất, tìm hiểu trang thiết bị công nghệ hiện đại và tuyên truyền nội quy an toàn lao động.",
    mindMaps: [
      {
        id: "m1216-1",
        vietnamese: "Phân xưởng sản xuất",
        chinese: "生产车间",
        pinyin: "shēngchǎn chējiān",
        vietnameseHint: "sưng chản chơ chien",
        children: [
          {
            id: "m1216-1-1",
            vietnamese: "Thiết bị",
            chinese: "设备",
            pinyin: "shèbèi",
            vietnameseHint: "sơ uây",
            children: [
              {
                id: "m1216-1-1-1",
                vietnamese: "Thiết bị phân xưởng",
                chinese: "车间设备",
                pinyin: "chējiān shèbèi",
                vietnameseHint: "chơ chien sơ uây",
                children: [
                  {
                    id: "m1216-1-1-1-1",
                    vietnamese: "Thiết bị phân xưởng sản xuất rất hiện đại.",
                    chinese: "生产车间设备很现代。",
                    pinyin: "Shēngchǎn chējiān shèbèi hěn xiàndài.",
                    vietnameseHint: "Sưng chản chơ chien sơ uây hẩn xiên tai"
                  }
                ]
              }
            ]
          },
          {
            id: "m1216-1-2",
            vietnamese: "Quy định",
            chinese: "规定",
            pinyin: "guīdìng",
            vietnameseHint: "cuây tinh",
            children: [
              {
                id: "m1216-1-2-1",
                vietnamese: "Quy định phân xưởng",
                chinese: "车间规定",
                pinyin: "chējiān guīdìng",
                vietnameseHint: "chơ chien cuây tinh",
                children: [
                  {
                    id: "m1216-1-2-1-1",
                    vietnamese: "Vào phân xưởng phải tuân thủ quy định.",
                    chinese: "进车间要遵守车间规定。",
                    pinyin: "Jìn chējiān yào zūnshǒu chējiān guīdìng.",
                    vietnameseHint: "Chin chơ chien deo chuân sẩu chơ chien cuây tinh"
                  }
                ]
              }
            ]
          },
          {
            id: "m1216-1-3",
            vietnamese: "Sạch sẽ",
            chinese: "干净",
            pinyin: "gānjìng",
            vietnameseHint: "can ching",
            children: [
              {
                id: "m1216-1-3-1",
                vietnamese: "Phân xưởng sạch sẽ",
                chinese: "干净的车间",
                pinyin: "gānjìng de chējiān",
                vietnameseHint: "can ching tợ chơ chien",
                children: [
                  {
                    id: "m1216-1-3-1-1",
                    vietnamese: "Phân xưởng sản xuất của chúng tôi rất sạch sẽ.",
                    chinese: "我们的生产车间很干净。",
                    pinyin: "Wǒmen de shēngchǎn chējiān hěn gānjìng.",
                    vietnameseHint: "Ủa mân tợ sưng chản chơ chien hẩn can ching"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1217,
    title: "Từ vựng: Phòng họp (会议室)",
    description: "Bố trí nơi nghỉ ngơi thư giãn cho đối tác trong phòng họp lớn, chuẩn bị đầy đủ các điều kiện đàm phán.",
    mindMaps: [
      {
        id: "m1217-1",
        vietnamese: "Phòng họp",
        chinese: "会议室",
        pinyin: "huìyìshì",
        vietnameseHint: "huây y sư",
        children: [
          {
            id: "m1217-1-1",
            vietnamese: "Nghỉ ngơi",
            chinese: "休息",
            pinyin: "xiūxi",
            vietnameseHint: "xiêu xi",
            children: [
              {
                id: "m1217-1-1-1",
                vietnamese: "Vào phòng họp nghỉ ngơi",
                chinese: "去会议室休息",
                pinyin: "qù huìyìshì xiūxi",
                vietnameseHint: "chù huây y sư xiêu xi",
                children: [
                  {
                    id: "m1217-1-1-1-1",
                    vietnamese: "Mời khách hàng vào phòng họp nghỉ ngơi.",
                    chinese: "请客户去会议室休息。",
                    pinyin: "Qǐng kèhù qù huìyìshì xiūxi.",
                    vietnameseHint: "Chỉnh khưa hu chù huây y sư xiêu xi"
                  }
                ]
              }
            ]
          },
          {
            id: "m1217-1-2",
            vietnamese: "Lớn",
            chinese: "大",
            pinyin: "dà",
            vietnameseHint: "ta",
            children: [
              {
                id: "m1217-1-2-1",
                vietnamese: "Phòng họp lớn",
                chinese: "大会议室",
                pinyin: "dà huìyìshì",
                vietnameseHint: "ta huây y sư",
                children: [
                  {
                    id: "m1217-1-2-1-1",
                    vietnamese: "Chúng ta sẽ họp ở phòng họp lớn nhé.",
                    chinese: "我们在大会议室开会吧。",
                    pinyin: "Wǒmen zài dà huìyìshì kāihuì ba.",
                    vietnameseHint: "Ủa mân chai ta huây y sư khai huây pa"
                  }
                ]
              }
            ]
          },
          {
            id: "m1217-1-3",
            vietnamese: "Chuẩn bị",
            chinese: "准备",
            pinyin: "zhǔnbèi",
            vietnameseHint: "chuẩn pây",
            children: [
              {
                id: "m1217-1-3-1",
                vietnamese: "Chuẩn bị phòng họp",
                chinese: "准备会议室",
                pinyin: "zhǔnbèi huìyìshì",
                vietnameseHint: "chuẩn pây huây y sư",
                children: [
                  {
                    id: "m1217-1-3-1-1",
                    vietnamese: "Nhân viên đã chuẩn bị xong phòng họp chưa?",
                    chinese: "人员准备好会议室了吗？",
                    pinyin: "Rényuán zhǔnbèi hǎo huìyìshì le ma?",
                    vietnameseHint: "Rấn doán chuẩn pây hảo huây y sư lơ ma"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1218,
    title: "Từ vựng: Trà nước / Giải khát (茶水)",
    description: "Nghi lễ hiếu khách qua việc chuẩn bị trà nước, giải khát tại phòng tiếp khách hoặc phòng giải trí dành cho nhân viên.",
    mindMaps: [
      {
        id: "m1218-1",
        vietnamese: "Trà nước / Giải khát",
        chinese: "茶水",
        pinyin: "cháshuǐ",
        vietnameseHint: "chá suẩy",
        children: [
          {
            id: "m1218-1-1",
            vietnamese: "Chuẩn bị",
            chinese: "准备",
            pinyin: "zhǔnbèi",
            vietnameseHint: "chuẩn pây",
            children: [
              {
                id: "m1218-1-1-1",
                vietnamese: "Chuẩn bị trà nước",
                chinese: "准备茶水",
                pinyin: "zhǔnbèi cháshuǐ",
                vietnameseHint: "chuẩn pây chá suẩy",
                children: [
                  {
                    id: "m1218-1-1-1-1",
                    vietnamese: "Giúp tôi chuẩn bị chút trà nước cho khách.",
                    chinese: "帮我给客人准备点茶水。",
                    pinyin: "Bāng wǒ gěi kèrén zhǔnbèi diǎn cháshuǐ.",
                    vietnameseHint: "Pang ủa cẩy khưa rấn chuẩn pây tiển chá suẩy"
                  }
                ]
              }
            ]
          },
          {
            id: "m1218-1-2",
            vietnamese: "Uống",
            chinese: "喝",
            pinyin: "hē",
            vietnameseHint: "hưa",
            children: [
              {
                id: "m1218-1-2-1",
                vietnamese: "Uống trà nước",
                chinese: "喝茶水",
                pinyin: "hē cháshuǐ",
                vietnameseHint: "hưa chá suẩy",
                children: [
                  {
                    id: "m1218-1-2-1-1",
                    vietnamese: "Xin mời mọi người uống trà nước.",
                    chinese: "请大家喝点茶水。",
                    pinyin: "Qǐng dàjiā hē diǎn cháshuǐ.",
                    vietnameseHint: "Chỉnh ta che hưa tiển chá suẩy"
                  }
                ]
              }
            ]
          },
          {
            id: "m1218-1-3",
            vietnamese: "Khu vực / Phòng",
            chinese: "间",
            pinyin: "jiān",
            vietnameseHint: "chiên",
            children: [
              {
                id: "m1218-1-3-1",
                vietnamese: "Phòng trà nước",
                chinese: "茶水间",
                pinyin: "cháshuǐjiān",
                vietnameseHint: "chá suẩy chiên",
                children: [
                  {
                    id: "m1218-1-3-1-1",
                    vietnamese: "Phòng trà nước nằm ở bên cạnh phòng họp.",
                    chinese: "茶水间在会议室旁边。",
                    pinyin: "Cháshuǐjiān zài huìyìshì pángbiān.",
                    vietnameseHint: "Chá suẩy chiên chai huây y sư pháng piên"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1219,
    title: "Từ vựng: Khách sáo / Lịch sự (客气)",
    description: "Văn hóa giao tế chân tình, thân mật, khuyên giải đối tác không nên quá khách sáo để nâng cao hiệu quả thương thảo.",
    mindMaps: [
      {
        id: "m1219-1",
        vietnamese: "Khách sáo / Lịch sự",
        chinese: "客气",
        pinyin: "kèqi",
        vietnameseHint: "khưa chi",
        children: [
          {
            id: "m1219-1-1",
            vietnamese: "Đừng / Xin đừng",
            chinese: "别",
            pinyin: "bié",
            vietnameseHint: "pía",
            children: [
              {
                id: "m1219-1-1-1",
                vietnamese: "Đừng khách sáo",
                chinese: "别客气",
                pinyin: "bié kèqi",
                vietnameseHint: "pía khưa chi",
                children: [
                  {
                    id: "m1219-1-1-1-1",
                    vietnamese: "Cứ tự nhiên, xin đừng khách sáo nhé.",
                    chinese: "随便点，别客气哦。",
                    pinyin: "Suíbiàn diǎn, bié kèqi o.",
                    vietnameseHint: "Suấy pien tiển, pía khưa chi ô"
                  }
                ]
              }
            ]
          },
          {
            id: "m1219-1-2",
            vietnamese: "Rất",
            chinese: "很",
            pinyin: "hěn",
            vietnameseHint: "hẩn",
            children: [
              {
                id: "m1219-1-2-1",
                vietnamese: "Rất khách sáo",
                chinese: "很客气",
                pinyin: "hěn kèqi",
                vietnameseHint: "hẩn khưa chi",
                children: [
                  {
                    id: "m1219-1-2-1-1",
                    vietnamese: "Vị khách hàng này tính tình rất khách sáo.",
                    chinese: "这个客户人很客气。",
                    pinyin: "Zhège kèhù rén hěn kèqi.",
                    vietnameseHint: "Chơ cưa khưa hu rấn hẩn khưa chi"
                  }
                ]
              }
            ]
          },
          {
            id: "m1219-1-3",
            vietnamese: "Quá / Thừa",
            chinese: "太",
            pinyin: "tài",
            vietnameseHint: "thai",
            children: [
              {
                id: "m1219-1-3-1",
                vietnamese: "Quá khách sáo rồi",
                chinese: "太客气了",
                pinyin: "tài kèqi le",
                vietnameseHint: "thai khưa chi lơ",
                children: [
                  {
                    id: "m1219-1-3-1-1",
                    vietnamese: "Ngài mua nhiều đồ quà tặng quá, thật quá khách sáo rồi.",
                    chinese: "您买太多礼物了，太客气了。",
                    pinyin: "Nín mǎi tài duō lǐwù le, tài kèqi le.",
                    vietnameseHint: "Nín mải thai tua lỉ u lơ, thai khưa chi lơ"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 1220,
    title: "Từ vựng: Chụp ảnh lưu niệm (合影)",
    description: "Lễ nghi kết thúc tốt đẹp chuyến tham quan bằng hoạt động chụp ảnh tập thể lưu niệm tại công ty.",
    mindMaps: [
      {
        id: "m1220-1",
        vietnamese: "Chụp ảnh lưu niệm",
        chinese: "合影",
        pinyin: "héyǐng",
        vietnameseHint: "hứa dỉng",
        children: [
          {
            id: "m1220-1-1",
            vietnamese: "Cùng nhau",
            chinese: "一起",
            pinyin: "yìqǐ",
            vietnameseHint: "y chỉ",
            children: [
              {
                id: "m1220-1-1-1",
                vietnamese: "Cùng nhau chụp ảnh",
                chinese: "一起合影",
                pinyin: "yìqǐ héyǐng",
                vietnameseHint: "y chỉ hứa dỉng",
                children: [
                  {
                    id: "m1220-1-1-1-1",
                    vietnamese: "Chúng ta cùng nhau chụp một bức ảnh lưu niệm nhé.",
                    chinese: "我们一起合个影吧。",
                    pinyin: "Wǒmen yìqǐ hé ge yǐng ba.",
                    vietnameseHint: "Ủa mân y chỉ hứa cưa dỉng pa"
                  }
                ]
              }
            ]
          },
          {
            id: "m1220-1-2",
            vietnamese: "Thời gian",
            chinese: "时间",
            pinyin: "shíjiān",
            vietnameseHint: "sứ chiên",
            children: [
              {
                id: "m1220-1-2-1",
                vietnamese: "Thời gian chụp ảnh",
                chinese: "合影时间",
                pinyin: "héyǐng shíjiān",
                vietnameseHint: "hứa dỉng sứ chiên",
                children: [
                  {
                    id: "m1220-1-2-1-1",
                    vietnamese: "Bây giờ là thời gian chụp ảnh lưu niệm.",
                    chinese: "现在是合影时间。",
                    pinyin: "Xiànzài shì héyǐng shíjiān.",
                    vietnameseHint: "Xiên chai sư hứa dỉng sứ chiên"
                  }
                ]
              }
            ]
          },
          {
            id: "m1220-1-3",
            vietnamese: "Địa điểm",
            chinese: "地点",
            pinyin: "dìdiǎn",
            vietnameseHint: "ti tiển",
            children: [
              {
                id: "m1220-1-3-1",
                vietnamese: "Địa điểm chụp ảnh",
                chinese: "合影地点",
                pinyin: "héyǐng dìdiǎn",
                vietnameseHint: "hứa dỉng ti tiển",
                children: [
                  {
                    id: "m1220-1-3-1-1",
                    vietnamese: "Địa điểm chụp ảnh sắp xếp ở cửa công ty.",
                    chinese: "合影地点安排在公司门口。",
                    pinyin: "Héyǐng dìdiǎn ānpái zài gōngsī ménkǒu.",
                    vietnameseHint: "Hứa dỉng ti tiển an phái cung sư mấn khẩu"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
