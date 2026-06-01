import { Lesson } from '../../../types';

export const cat1Lessons: Lesson[] = [
  {
    id: 1,
    title: "Xin chào",
    description: "Chào hỏi và các cách chào khác nhau trong tiếng Trung.",
    mindMaps: [
      {
        id: "m1-1",
        vietnamese: "Xin chào",
        chinese: "你好",
        pinyin: "nǐ hǎo",
        vietnameseHint: "nỉ hảo",
        children: [
          {
            id: "m1-1-1",
            vietnamese: "chào ngài",
            chinese: "您好",
            pinyin: "nín hǎo",
            vietnameseHint: "nín hảo",
            children: [
              {
                id: "m1-1-1-1",
                vietnamese: "Chào ngài, lâu rồi không gặp.",
                chinese: "您好，好久不见。",
                pinyin: "Nín hǎo, hǎojiǔ bú jiàn.",
                vietnameseHint: "Nín hảo, hảo chiểu pú chièn.",
              }
            ]
          },
          {
            id: "m1-1-2",
            vietnamese: "chào mọi người",
            chinese: "大家好",
            pinyin: "dàjiā hǎo",
            vietnameseHint: "tà chia hảo",
            children: [
              {
                id: "m1-1-2-1",
                vietnamese: "Chào thầy cô và các bạn.",
                chinese: "老师们，同学们，大家好。",
                pinyin: "Lǎoshīmen, tóngxuémen, dàjiā hǎo.",
                vietnameseHint: "Lảo sư mân, thúng xuế mân, tà chia hảo.",
              }
            ]
          },
          {
            id: "m1-1-3",
            vietnamese: "chào các bạn",
            chinese: "你们好",
            pinyin: "nǐmen hǎo",
            vietnameseHint: "nỉ mân hảo",
            children: [
              {
                id: "m1-1-3-1",
                vietnamese: "Các bạn khỏe không?",
                chinese: "你们好吗？",
                pinyin: "Nǐmen hǎo ma?",
                vietnameseHint: "Nỉ mân hảo ma?",
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Cảm ơn",
    description: "Cách bày tỏ lòng biết ơn trong các trường hợp.",
    mindMaps: [
      {
        id: "m2-1",
        vietnamese: "Cảm ơn",
        chinese: "谢谢",
        pinyin: "xièxie",
        vietnameseHint: "xiê xiệ",
        children: [
          {
            id: "m2-1-1",
            vietnamese: "Quá, lắm",
            chinese: "太",
            pinyin: "tài",
            vietnameseHint: "thai",
            children: [
              {
                id: "m2-1-1-1",
                vietnamese: "Cảm ơn lắm",
                chinese: "太谢谢",
                pinyin: "tài xièxie",
                vietnameseHint: "thai xiê xiệ",
                children: [
                  {
                    id: "m2-1-1-1-1",
                    vietnamese: "Cảm ơn quá đi mất.",
                    chinese: "太谢谢了。",
                    pinyin: "Tài xièxie le.",
                    vietnameseHint: "Thai xiê xiệ lơ.",
                  }
                ]
              }
            ]
          },
          {
            id: "m2-1-2",
            vietnamese: "Giúp đỡ",
            chinese: "帮忙",
            pinyin: "bāngmáng",
            vietnameseHint: "pang máng",
            children: [
              {
                id: "m2-1-2-1",
                vietnamese: "Cảm ơn đã giúp",
                chinese: "谢谢帮忙",
                pinyin: "xièxie bāngmáng",
                vietnameseHint: "xiê xiệ pang máng",
                children: [
                  {
                    id: "m2-1-2-1-1",
                    vietnamese: "Cảm ơn bạn đã giúp.",
                    chinese: "谢谢你帮忙。",
                    pinyin: "Xièxie nǐ bāngmáng.",
                    vietnameseHint: "Xiê xiệ nỉ pang máng.",
                  }
                ]
              }
            ]
          },
          {
            id: "m2-1-3",
            vietnamese: "Ủng hộ",
            chinese: "支持",
            pinyin: "zhīchí",
            vietnameseHint: "chư chớ",
            children: [
              {
                id: "m2-1-3-1",
                vietnamese: "Cảm ơn ủng hộ",
                chinese: "谢谢支持",
                pinyin: "xièxie zhīchí",
                vietnameseHint: "xiê xiệ chư chớ",
                children: [
                  {
                    id: "m2-1-3-1-1",
                    vietnamese: "Cảm ơn sự ủng hộ.",
                    chinese: "谢谢您的支持。",
                    pinyin: "Xièxie nín de zhīchí.",
                    vietnameseHint: "Xiê xiệ nín tợ chư chớ.",
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
    id: 3,
    title: "Xin lỗi",
    description: "Các mẫu câu xin lỗi và đáp lại lời xin lỗi.",
    mindMaps: [
      {
        id: "m3-1",
        vietnamese: "Xin lỗi",
        chinese: "对不起",
        pinyin: "duìbuqǐ",
        vietnameseHint: "tuây pu chỉ",
        children: [
          {
            id: "m3-1-1",
            vietnamese: "Thật sự",
            chinese: "真",
            pinyin: "zhēn",
            vietnameseHint: "chân",
            children: [
              {
                id: "m3-1-1-1",
                vietnamese: "Thật xin lỗi",
                chinese: "真对不起",
                pinyin: "zhēn duìbuqǐ",
                vietnameseHint: "chân tuây pu chỉ",
                children: [
                  {
                    id: "m3-1-1-1-1",
                    vietnamese: "Thật sự xin lỗi bạn.",
                    chinese: "真的对不起。",
                    pinyin: "Zhēn de duìbuqǐ.",
                    vietnameseHint: "Chân tợ tuây pu chỉ.",
                  }
                ]
              }
            ]
          },
          {
            id: "m3-1-2",
            vietnamese: "Không sao",
            chinese: "没关系",
            pinyin: "méi guānxi",
            vietnameseHint: "mấy quan xi",
            children: [
              {
                id: "m3-1-2-1",
                vietnamese: "Xin lỗi, không sao",
                chinese: "对不起，没关系",
                pinyin: "duìbuqǐ, méi guānxi",
                vietnameseHint: "tuây pu chỉ, mấy quan xi",
                children: [
                  {
                    id: "m3-1-2-1-1",
                    vietnamese: "A: Xin lỗi. B: Không sao.",
                    chinese: "A: 对不起. B: 没关系.",
                    pinyin: "A: Duìbuqǐ. B: Méi guānxi.",
                    vietnameseHint: "A: Tuây pu chỉ. B: Mấy quan xi.",
                  }
                ]
              }
            ]
          },
          {
            id: "m3-1-3",
            vietnamese: "Muộn",
            chinese: "晚",
            pinyin: "wǎn",
            vietnameseHint: "oản",
            children: [
              {
                id: "m3-1-3-1",
                vietnamese: "Xin lỗi đến muộn",
                chinese: "对不起晚了",
                pinyin: "duìbuqǐ wǎn le",
                vietnameseHint: "tuây pu chỉ oản lơ",
                children: [
                  {
                    id: "m3-1-3-1-1",
                    vietnamese: "Xin lỗi, tôi đến muộn.",
                    chinese: "对不起，我来晚了。",
                    pinyin: "Duìbuqǐ, wǒ lái wǎn le.",
                    vietnameseHint: "Tuây pu chỉ, ủa lái oản lơ.",
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
    id: 4,
    title: "Tạm biệt",
    description: "Các mẫu câu chào tạm biệt và hẹn gặp lại.",
    mindMaps: [
      {
        id: "m4-1",
        vietnamese: "Tạm biệt",
        chinese: "再见",
        pinyin: "zàijiàn",
        vietnameseHint: "chai chiên",
        children: [
          {
            id: "m4-1-1",
            vietnamese: "Ngày mai",
            chinese: "明天",
            pinyin: "míngtiān",
            vietnameseHint: "mính thiên",
            children: [
              {
                id: "m4-1-1-1",
                vietnamese: "Ngày mai gặp",
                chinese: "明天见",
                pinyin: "míngtiān jiàn",
                vietnameseHint: "mính thiên chiên",
                children: [
                  {
                    id: "m4-1-1-1-1",
                    vietnamese: "Chúng ta ngày mai gặp nhé!",
                    chinese: "我们明天见！",
                    pinyin: "Wǒmen míngtiān jiàn!",
                    vietnameseHint: "Ủa mân mính thiên chiên!",
                  }
                ]
              }
            ]
          },
          {
            id: "m4-1-2",
            vietnamese: "Lát nữa",
            chinese: "一会儿",
            pinyin: "yíhuìr",
            vietnameseHint: "ý huây",
            children: [
              {
                id: "m4-1-2-1",
                vietnamese: "Lát nữa gặp",
                chinese: "一会儿见",
                pinyin: "yíhuìr jiàn",
                vietnameseHint: "ý huây chiên",
                children: [
                  {
                    id: "m4-1-2-1-1",
                    vietnamese: "Được, lát nữa gặp.",
                    chinese: "好，一会儿见。",
                    pinyin: "Hǎo, yíhuìr jiàn.",
                    vietnameseHint: "Hảo, ý huây chiên.",
                  }
                ]
              }
            ]
          },
          {
            id: "m4-1-3",
            vietnamese: "Buổi chiều",
            chinese: "下午",
            pinyin: "xiàwǔ",
            vietnameseHint: "xia ủ",
            children: [
              {
                id: "m4-1-3-1",
                vietnamese: "Chiều gặp",
                chinese: "下午见",
                pinyin: "xiàwǔ jiàn",
                vietnameseHint: "xia ủ chiên",
                children: [
                  {
                    id: "m4-1-3-1-1",
                    vietnamese: "Chiều nay gặp nhé.",
                    chinese: "今天下午见。",
                    pinyin: "Jīntiān xiàwǔ jiàn.",
                    vietnameseHint: "Chin thiên xia ủ chiên.",
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
    id: 5,
    title: "Mời, Xin",
    description: "Sử dụng từ Mời (请) lịch sự trong giao tiếp.",
    mindMaps: [
      {
        id: "m5-1",
        vietnamese: "Mời, xin",
        chinese: "请",
        pinyin: "qǐng",
        vietnameseHint: "chỉnh",
        children: [
          {
            id: "m5-1-1",
            vietnamese: "Uống trà",
            chinese: "喝茶",
            pinyin: "hē chá",
            vietnameseHint: "hưa chà",
            children: [
              {
                id: "m5-1-1-1",
                vietnamese: "Mời uống trà",
                chinese: "请喝茶",
                pinyin: "qǐng hē chá",
                vietnameseHint: "chỉnh hưa chà",
                children: [
                  {
                    id: "m5-1-1-1-1",
                    vietnamese: "Mời ông uống trà.",
                    chinese: "请喝茶。",
                    pinyin: "Qǐng hē chá.",
                    vietnameseHint: "Chỉnh hưa chà.",
                  }
                ]
              }
            ]
          },
          {
            id: "m5-1-2",
            vietnamese: "Xem",
            chinese: "看",
            pinyin: "kàn",
            vietnameseHint: "khan",
            children: [
              {
                id: "m5-1-2-1",
                vietnamese: "Mời xem",
                chinese: "请看",
                pinyin: "qǐng kàn",
                vietnameseHint: "chỉnh khan",
                children: [
                  {
                    id: "m5-1-2-1-1",
                    vietnamese: "Mời xem ở đây.",
                    chinese: "请看这里。",
                    pinyin: "Qǐng kàn zhèlǐ.",
                    vietnameseHint: "Chỉnh khan chơ lỉ.",
                  }
                ]
              }
            ]
          },
          {
            id: "m5-1-3",
            vietnamese: "Nói",
            chinese: "说",
            pinyin: "shuō",
            vietnameseHint: "sua",
            children: [
              {
                id: "m5-1-3-1",
                vietnamese: "Mời nói",
                chinese: "请说",
                pinyin: "qǐng shuō",
                vietnameseHint: "chỉnh sua",
                children: [
                  {
                    id: "m5-1-3-1-1",
                    vietnamese: "Mời bạn nói đi.",
                    chinese: "请你说吧。",
                    pinyin: "Qǐng nǐ shuō ba.",
                    vietnameseHint: "Chỉnh nỉ sua pa.",
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
    id: 6,
    title: "Là, Vâng",
    description: "Sử dụng từ 'Là' (是) để khẳng định.",
    mindMaps: [
      {
        id: "m6-1",
        vietnamese: "Là, vâng",
        chinese: "是",
        pinyin: "shì",
        vietnameseHint: "sư",
        children: [
          {
            id: "m6-1-1",
            vietnamese: "Của (trợ từ)",
            chinese: "的",
            pinyin: "de",
            vietnameseHint: "tợ",
            children: [
              {
                id: "m6-1-1-1",
                vietnamese: "Đúng vậy, vâng",
                chinese: "是的",
                pinyin: "shì de",
                vietnameseHint: "sư tợ",
                children: [
                  {
                    id: "m6-1-1-1-1",
                    vietnamese: "Vâng, tôi biết rồi.",
                    chinese: "是的，我知道了。",
                    pinyin: "Shì de, wǒ zhīdào le.",
                    vietnameseHint: "Sư tợ, ủa chư tao lơ.",
                  }
                ]
              }
            ]
          },
          {
            id: "m6-1-2",
            vietnamese: "Ai",
            chinese: "谁",
            pinyin: "shéi",
            vietnameseHint: "sấy",
            children: [
              {
                id: "m6-1-2-1",
                vietnamese: "Là ai",
                chinese: "是谁",
                pinyin: "shì shéi",
                vietnameseHint: "sư sấy",
                children: [
                  {
                    id: "m6-1-2-1-1",
                    vietnamese: "Người đó là ai?",
                    chinese: "那个人是谁？",
                    pinyin: "Nà ge rén shì shéi?",
                    vietnameseHint: "Na cưa rấn sư sấy?",
                  }
                ]
              }
            ]
          },
          {
            id: "m6-1-3",
            vietnamese: "Học sinh",
            chinese: "学生",
            pinyin: "xuéshēng",
            vietnameseHint: "xuế sâng",
            children: [
              {
                id: "m6-1-3-1",
                vietnamese: "Là học sinh",
                chinese: "是学生",
                pinyin: "shì xuéshēng",
                vietnameseHint: "sư xuế sâng",
                children: [
                  {
                    id: "m6-1-3-1-1",
                    vietnamese: "Cậu ấy là học sinh.",
                    chinese: "他是学生。",
                    pinyin: "Tā shì xuéshēng.",
                    vietnameseHint: "Tha sư xuế sâng.",
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
    id: 7,
    title: "Không",
    description: "Sử dụng từ 'Không' (不) để phủ định.",
    mindMaps: [
      {
        id: "m7-1",
        vietnamese: "Không",
        chinese: "不",
        pinyin: "bù",
        vietnameseHint: "pu",
        children: [
          {
            id: "m7-1-1",
            vietnamese: "Đúng",
            chinese: "对",
            pinyin: "duì",
            vietnameseHint: "tuây",
            children: [
              {
                id: "m7-1-1-1",
                vietnamese: "Không đúng",
                chinese: "不对",
                pinyin: "bú duì",
                vietnameseHint: "pú tuây",
                children: [
                  {
                    id: "m7-1-1-1-1",
                    vietnamese: "Cái này không đúng.",
                    chinese: "这个不对。",
                    pinyin: "Zhège bú duì.",
                    vietnameseHint: "Chưa cưa pú tuây.",
                  }
                ]
              }
            ]
          },
          {
            id: "m7-1-2",
            vietnamese: "Biết",
            chinese: "知道",
            pinyin: "zhīdào",
            vietnameseHint: "chư tao",
            children: [
              {
                id: "m7-1-2-1",
                vietnamese: "Không biết",
                chinese: "不知道",
                pinyin: "bù zhīdào",
                vietnameseHint: "pu chư tao",
                children: [
                  {
                    id: "m7-1-2-1-1",
                    vietnamese: "Tôi không biết.",
                    chinese: "我不知道。",
                    pinyin: "Wǒ bù zhīdào.",
                    vietnameseHint: "Ủa pu chư tao.",
                  }
                ]
              }
            ]
          },
          {
            id: "m7-1-3",
            vietnamese: "Mua",
            chinese: "买",
            pinyin: "mǎi",
            vietnameseHint: "mải",
            children: [
              {
                id: "m7-1-3-1",
                vietnamese: "Không mua",
                chinese: "不买",
                pinyin: "bù mǎi",
                vietnameseHint: "pu mải",
                children: [
                  {
                    id: "m7-1-3-1-1",
                    vietnamese: "Hôm nay tôi không mua.",
                    chinese: "今天我不买。",
                    pinyin: "Jīntiān wǒ bù mǎi.",
                    vietnameseHint: "Chin thiên ủa pu mải.",
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
    id: 8,
    title: "Quen biết",
    description: "Nói về việc quen biết và làm quen bạn mới.",
    mindMaps: [
      {
        id: "m8-1",
        vietnamese: "Quen biết",
        chinese: "认识",
        pinyin: "rènshi",
        vietnameseHint: "rân sư",
        children: [
          {
            id: "m8-1-1",
            vietnamese: "Vui vẻ",
            chinese: "高兴",
            pinyin: "gāoxìng",
            vietnameseHint: "cao xing",
            children: [
              {
                id: "m8-1-1-1",
                vietnamese: "Rất vui quen biết",
                chinese: "很高兴认识",
                pinyin: "hěn gāoxìng rènshi",
                vietnameseHint: "hẩn cao xing rân sư",
                children: [
                  {
                    id: "m8-1-1-1-1",
                    vietnamese: "Rất vui được quen biết bạn.",
                    chinese: "很高兴认识你。",
                    pinyin: "Hěn gāoxìng rènshi nǐ.",
                    vietnameseHint: "Hẩn cao xing rân sư nỉ.",
                  }
                ]
              }
            ]
          },
          {
            id: "m8-1-2",
            vietnamese: "Bạn bè",
            chinese: "朋友",
            pinyin: "péngyou",
            vietnameseHint: "phấng dậu",
            children: [
              {
                id: "m8-1-2-1",
                vietnamese: "Quen bạn mới",
                chinese: "认识新朋友",
                pinyin: "rènshi xīn péngyou",
                vietnameseHint: "rân sư xin phấng dậu",
                children: [
                  {
                    id: "m8-1-2-1-1",
                    vietnamese: "Thích làm quen bạn mới.",
                    chinese: "喜欢认识新朋友。",
                    pinyin: "Xǐhuan rènshi xīn péngyou.",
                    vietnameseHint: "Xỉ hoan rân sư xin phấng dậu.",
                  }
                ]
              }
            ]
          },
          {
            id: "m8-1-3",
            vietnamese: "Chữ (Hán)",
            chinese: "字",
            pinyin: "zì",
            vietnameseHint: "chư",
            children: [
              {
                id: "m8-1-3-1",
                vietnamese: "Biết chữ",
                chinese: "认识字",
                pinyin: "rènshi zì",
                vietnameseHint: "rân sư chư",
                children: [
                  {
                    id: "m8-1-3-1-1",
                    vietnamese: "Tôi biết chữ Hán.",
                    chinese: "我认识汉字。",
                    pinyin: "Wǒ rènshi hànzì.",
                    vietnameseHint: "Ủa rân sư han chư.",
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
    id: 9,
    title: "Hoan nghênh",
    description: "Cách chào đón khách và người thân.",
    mindMaps: [
      {
        id: "m9-1",
        vietnamese: "Hoan nghênh",
        chinese: "欢迎",
        pinyin: "huānyíng",
        vietnameseHint: "hoan yính",
        children: [
          {
            id: "m9-1-1",
            vietnamese: "Ghé thăm",
            chinese: "光临",
            pinyin: "guānglín",
            vietnameseHint: "quang lín",
            children: [
              {
                id: "m9-1-1-1",
                vietnamese: "Hoan nghênh ghé thăm",
                chinese: "欢迎光临",
                pinyin: "huānyíng guānglín",
                vietnameseHint: "hoan yính quang lín",
                children: [
                  {
                    id: "m9-1-1-1-1",
                    vietnamese: "Hoan nghênh quý khách!",
                    chinese: "欢迎光临！",
                    pinyin: "Huānyíng guānglín!",
                    vietnameseHint: "Hoan yính quang lín!",
                  }
                ]
              }
            ]
          },
          {
            id: "m9-1-2",
            vietnamese: "Nhà",
            chinese: "家",
            pinyin: "jiā",
            vietnameseHint: "chia",
            children: [
              {
                id: "m9-1-2-1",
                vietnamese: "Mừng về nhà",
                chinese: "欢迎回家",
                pinyin: "huānyíng huí jiā",
                vietnameseHint: "hoan yính huấy chia",
                children: [
                  {
                    id: "m9-1-2-1-1",
                    vietnamese: "Mừng về nhà!",
                    chinese: "欢迎回家！",
                    pinyin: "Huānyíng huí jiā!",
                    vietnameseHint: "Hoan yính huấy chia!",
                  }
                ]
              }
            ]
          },
          {
            id: "m9-1-3",
            vietnamese: "Gia nhập",
            chinese: "加入",
            pinyin: "jiārù",
            vietnameseHint: "chia ru",
            children: [
              {
                id: "m9-1-3-1",
                vietnamese: "Chào mừng gia nhập",
                chinese: "欢迎加入",
                pinyin: "huānyíng jiārù",
                vietnameseHint: "hoan yính chia ru",
                children: [
                  {
                    id: "m9-1-3-1-1",
                    vietnamese: "Chào mừng gia nhập cùng chúng tôi.",
                    chinese: "欢迎加入我们。",
                    pinyin: "Huānyíng jiārù wǒmen.",
                    vietnameseHint: "Hoan yính chia ru ủa mân.",
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
    id: 10,
    title: "Hiểu",
    description: "Nói về việc hiểu ý và hiểu nội dung.",
    mindMaps: [
      {
        id: "m10-1",
        vietnamese: "Hiểu",
        chinese: "明白",
        pinyin: "míngbai",
        vietnameseHint: "mính pai",
        children: [
          {
            id: "m10-1-1",
            vietnamese: "Nghe",
            chinese: "听",
            pinyin: "tīng",
            vietnameseHint: "thing",
            children: [
              {
                id: "m10-1-1-1",
                vietnamese: "Nghe hiểu",
                chinese: "听明白",
                pinyin: "tīng míngbai",
                vietnameseHint: "thing mính pai",
                children: [
                  {
                    id: "m10-1-1-1-1",
                    vietnamese: "Tôi nghe hiểu rồi.",
                    chinese: "我听明白了。",
                    pinyin: "Wǒ tīng míngbai le.",
                    vietnameseHint: "Ủa thing mính pai lơ.",
                  }
                ]
              }
            ]
          },
          {
            id: "m10-1-2",
            vietnamese: "Ý",
            chinese: "意思",
            pinyin: "yìsi",
            vietnameseHint: "y sư",
            children: [
              {
                id: "m10-1-2-1",
                vietnamese: "Hiểu ý",
                chinese: "明白意思",
                pinyin: "míngbai yìsi",
                vietnameseHint: "mính pai y sư",
                children: [
                  {
                    id: "m10-1-2-1-1",
                    vietnamese: "Tôi hiểu ý của bạn.",
                    chinese: "我明白你的意思。",
                    pinyin: "Wǒ míngbai nǐ de yìsi.",
                    vietnameseHint: "Ủa mính pai nỉ tợ y sư.",
                  }
                ]
              }
            ]
          },
          {
            id: "m10-1-3",
            vietnamese: "Rồi",
            chinese: "了",
            pinyin: "le",
            vietnameseHint: "lơ",
            children: [
              {
                id: "m10-1-3-1",
                vietnamese: "Hiểu rồi",
                chinese: "明白了",
                pinyin: "míngbai le",
                vietnameseHint: "mính pai lơ",
                children: [
                  {
                    id: "m10-1-3-1-1",
                    vietnamese: "Bạn đọc hiểu chưa?",
                    chinese: "看明白了吗？",
                    pinyin: "Kàn míngbai le ma?",
                    vietnameseHint: "Khan mính pai lơ ma?",
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
];
