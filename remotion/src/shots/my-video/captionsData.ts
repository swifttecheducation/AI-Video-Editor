export interface KaraokeWord {
  word: string;
  start: number;
  end: number;
}

export interface KaraokePhrase {
  start: number;
  end: number;
  words: KaraokeWord[];
}

export const KARAOKE_PHRASES: KaraokePhrase[] = [
  {
    "start": 0.1,
    "end": 0.92,
    "words": [
      {
        "word": "Nếu",
        "start": 0.1,
        "end": 0.31
      },
      {
        "word": "ngày",
        "start": 0.31,
        "end": 0.51
      },
      {
        "word": "mai",
        "start": 0.51,
        "end": 0.72
      },
      {
        "word": "cần",
        "start": 0.72,
        "end": 0.92
      }
    ]
  },
  {
    "start": 0.92,
    "end": 1.74,
    "words": [
      {
        "word": "thêm",
        "start": 0.92,
        "end": 1.13
      },
      {
        "word": "doanh",
        "start": 1.13,
        "end": 1.33
      },
      {
        "word": "thu,",
        "start": 1.33,
        "end": 1.54
      },
      {
        "word": "các",
        "start": 1.54,
        "end": 1.74
      }
    ]
  },
  {
    "start": 1.74,
    "end": 2.57,
    "words": [
      {
        "word": "bạn",
        "start": 1.74,
        "end": 1.95
      },
      {
        "word": "solo",
        "start": 1.95,
        "end": 2.15
      },
      {
        "word": "expert",
        "start": 2.15,
        "end": 2.36
      },
      {
        "word": "hãy",
        "start": 2.36,
        "end": 2.56
      }
    ]
  },
  {
    "start": 2.57,
    "end": 3.39,
    "words": [
      {
        "word": "tạo",
        "start": 2.57,
        "end": 2.78
      },
      {
        "word": "ngay",
        "start": 2.78,
        "end": 2.98
      },
      {
        "word": "cái",
        "start": 2.98,
        "end": 3.19
      },
      {
        "word": "này",
        "start": 3.19,
        "end": 3.39
      }
    ]
  },
  {
    "start": 3.39,
    "end": 3.8,
    "words": [
      {
        "word": "mới",
        "start": 3.39,
        "end": 3.6
      },
      {
        "word": "nhé!",
        "start": 3.6,
        "end": 3.8
      }
    ]
  },
  {
    "start": 3.9,
    "end": 4.73,
    "words": [
      {
        "word": "Ủa,",
        "start": 3.9,
        "end": 4.11
      },
      {
        "word": "phải",
        "start": 4.11,
        "end": 4.32
      },
      {
        "word": "tạo",
        "start": 4.32,
        "end": 4.53
      },
      {
        "word": "sản",
        "start": 4.53,
        "end": 4.73
      }
    ]
  },
  {
    "start": 4.73,
    "end": 5.57,
    "words": [
      {
        "word": "phẩm",
        "start": 4.73,
        "end": 4.94
      },
      {
        "word": "mới",
        "start": 4.94,
        "end": 5.15
      },
      {
        "word": "chứ?",
        "start": 5.15,
        "end": 5.36
      },
      {
        "word": "Không",
        "start": 5.36,
        "end": 5.56
      }
    ]
  },
  {
    "start": 5.57,
    "end": 6.4,
    "words": [
      {
        "word": "thì",
        "start": 5.57,
        "end": 5.78
      },
      {
        "word": "ít",
        "start": 5.78,
        "end": 5.99
      },
      {
        "word": "nhất",
        "start": 5.99,
        "end": 6.2
      },
      {
        "word": "cũng",
        "start": 6.2,
        "end": 6.4
      }
    ]
  },
  {
    "start": 6.4,
    "end": 7.23,
    "words": [
      {
        "word": "phải",
        "start": 6.4,
        "end": 6.61
      },
      {
        "word": "có",
        "start": 6.61,
        "end": 6.82
      },
      {
        "word": "định",
        "start": 6.82,
        "end": 7.03
      },
      {
        "word": "dạng",
        "start": 7.03,
        "end": 7.23
      }
    ]
  },
  {
    "start": 7.23,
    "end": 8.07,
    "words": [
      {
        "word": "nội",
        "start": 7.23,
        "end": 7.44
      },
      {
        "word": "dung",
        "start": 7.44,
        "end": 7.65
      },
      {
        "word": "mới,",
        "start": 7.65,
        "end": 7.86
      },
      {
        "word": "hay",
        "start": 7.86,
        "end": 8.06
      }
    ]
  },
  {
    "start": 8.07,
    "end": 8.9,
    "words": [
      {
        "word": "thêm",
        "start": 8.07,
        "end": 8.28
      },
      {
        "word": "kênh",
        "start": 8.28,
        "end": 8.49
      },
      {
        "word": "mới",
        "start": 8.49,
        "end": 8.7
      },
      {
        "word": "chứ?",
        "start": 8.7,
        "end": 8.9
      }
    ]
  },
  {
    "start": 9.0,
    "end": 11.08,
    "words": [
      {
        "word": "Thế",
        "start": 9.0,
        "end": 9.52
      },
      {
        "word": "mà...",
        "start": 9.52,
        "end": 10.04
      },
      {
        "word": "thì",
        "start": 10.04,
        "end": 10.56
      },
      {
        "word": "còn",
        "start": 10.56,
        "end": 11.08
      }
    ]
  },
  {
    "start": 11.08,
    "end": 13.16,
    "words": [
      {
        "word": "khướt",
        "start": 11.08,
        "end": 11.6
      },
      {
        "word": "mới",
        "start": 11.6,
        "end": 12.12
      },
      {
        "word": "ra",
        "start": 12.12,
        "end": 12.64
      },
      {
        "word": "được",
        "start": 12.64,
        "end": 13.16
      }
    ]
  },
  {
    "start": 13.16,
    "end": 14.2,
    "words": [
      {
        "word": "doanh",
        "start": 13.16,
        "end": 13.68
      },
      {
        "word": "thu!",
        "start": 13.68,
        "end": 14.2
      }
    ]
  },
  {
    "start": 14.3,
    "end": 15.18,
    "words": [
      {
        "word": "Bây",
        "start": 14.3,
        "end": 14.52
      },
      {
        "word": "giờ",
        "start": 14.52,
        "end": 14.74
      },
      {
        "word": "muốn",
        "start": 14.74,
        "end": 14.96
      },
      {
        "word": "ra",
        "start": 14.96,
        "end": 15.18
      }
    ]
  },
  {
    "start": 15.18,
    "end": 16.07,
    "words": [
      {
        "word": "doanh",
        "start": 15.18,
        "end": 15.4
      },
      {
        "word": "thu",
        "start": 15.4,
        "end": 15.62
      },
      {
        "word": "nhanh,",
        "start": 15.62,
        "end": 15.84
      },
      {
        "word": "mình",
        "start": 15.84,
        "end": 16.06
      }
    ]
  },
  {
    "start": 16.07,
    "end": 16.95,
    "words": [
      {
        "word": "nhìn",
        "start": 16.07,
        "end": 16.29
      },
      {
        "word": "lại",
        "start": 16.29,
        "end": 16.51
      },
      {
        "word": "xem",
        "start": 16.51,
        "end": 16.73
      },
      {
        "word": "mình",
        "start": 16.73,
        "end": 16.95
      }
    ]
  },
  {
    "start": 16.95,
    "end": 17.84,
    "words": [
      {
        "word": "có",
        "start": 16.95,
        "end": 17.17
      },
      {
        "word": "nguồn",
        "start": 17.17,
        "end": 17.39
      },
      {
        "word": "lực",
        "start": 17.39,
        "end": 17.61
      },
      {
        "word": "gì,",
        "start": 17.61,
        "end": 17.83
      }
    ]
  },
  {
    "start": 17.84,
    "end": 18.5,
    "words": [
      {
        "word": "tài",
        "start": 17.84,
        "end": 18.06
      },
      {
        "word": "sản",
        "start": 18.06,
        "end": 18.28
      },
      {
        "word": "gì,",
        "start": 18.28,
        "end": 18.5
      }
    ]
  },
  {
    "start": 18.6,
    "end": 19.68,
    "words": [
      {
        "word": "xong",
        "start": 18.6,
        "end": 18.87
      },
      {
        "word": "tìm",
        "start": 18.87,
        "end": 19.14
      },
      {
        "word": "cách",
        "start": 19.14,
        "end": 19.41
      },
      {
        "word": "kích",
        "start": 19.41,
        "end": 19.68
      }
    ]
  },
  {
    "start": 19.68,
    "end": 20.76,
    "words": [
      {
        "word": "hoạt",
        "start": 19.68,
        "end": 19.95
      },
      {
        "word": "lại",
        "start": 19.95,
        "end": 20.22
      },
      {
        "word": "chúng.",
        "start": 20.22,
        "end": 20.49
      },
      {
        "word": "Chứ",
        "start": 20.49,
        "end": 20.76
      }
    ]
  },
  {
    "start": 20.76,
    "end": 21.85,
    "words": [
      {
        "word": "cứ",
        "start": 20.76,
        "end": 21.03
      },
      {
        "word": "FOMO",
        "start": 21.03,
        "end": 21.3
      },
      {
        "word": "chạy",
        "start": 21.3,
        "end": 21.57
      },
      {
        "word": "theo",
        "start": 21.57,
        "end": 21.84
      }
    ]
  },
  {
    "start": 21.85,
    "end": 22.93,
    "words": [
      {
        "word": "bên",
        "start": 21.85,
        "end": 22.12
      },
      {
        "word": "ngoài",
        "start": 22.12,
        "end": 22.39
      },
      {
        "word": "thì",
        "start": 22.39,
        "end": 22.66
      },
      {
        "word": "còn",
        "start": 22.66,
        "end": 22.93
      }
    ]
  },
  {
    "start": 22.93,
    "end": 23.2,
    "words": [
      {
        "word": "khướt...",
        "start": 22.93,
        "end": 23.2
      }
    ]
  },
  {
    "start": 23.3,
    "end": 24.27,
    "words": [
      {
        "word": "Thế",
        "start": 23.3,
        "end": 23.54
      },
      {
        "word": "bác",
        "start": 23.54,
        "end": 23.79
      },
      {
        "word": "làm",
        "start": 23.79,
        "end": 24.03
      },
      {
        "word": "solo",
        "start": 24.03,
        "end": 24.27
      }
    ]
  },
  {
    "start": 24.27,
    "end": 25.25,
    "words": [
      {
        "word": "2",
        "start": 24.27,
        "end": 24.51
      },
      {
        "word": "năm",
        "start": 24.51,
        "end": 24.76
      },
      {
        "word": "rồi",
        "start": 24.76,
        "end": 25.0
      },
      {
        "word": "thì",
        "start": 25.0,
        "end": 25.24
      }
    ]
  },
  {
    "start": 25.25,
    "end": 26.23,
    "words": [
      {
        "word": "đã",
        "start": 25.25,
        "end": 25.49
      },
      {
        "word": "từng",
        "start": 25.49,
        "end": 25.74
      },
      {
        "word": "bán",
        "start": 25.74,
        "end": 25.98
      },
      {
        "word": "được",
        "start": 25.98,
        "end": 26.23
      }
    ]
  },
  {
    "start": 26.23,
    "end": 27.2,
    "words": [
      {
        "word": "sản",
        "start": 26.23,
        "end": 26.47
      },
      {
        "word": "phẩm",
        "start": 26.47,
        "end": 26.72
      },
      {
        "word": "nào",
        "start": 26.72,
        "end": 26.96
      },
      {
        "word": "chưa?",
        "start": 26.96,
        "end": 27.2
      }
    ]
  },
  {
    "start": 27.3,
    "end": 28.67,
    "words": [
      {
        "word": "Ebook",
        "start": 27.3,
        "end": 27.64
      },
      {
        "word": "này,",
        "start": 27.64,
        "end": 27.98
      },
      {
        "word": "Template",
        "start": 27.98,
        "end": 28.32
      },
      {
        "word": "này,",
        "start": 28.32,
        "end": 28.67
      }
    ]
  },
  {
    "start": 28.67,
    "end": 30.03,
    "words": [
      {
        "word": "hay",
        "start": 28.67,
        "end": 29.01
      },
      {
        "word": "là",
        "start": 29.01,
        "end": 29.35
      },
      {
        "word": "Workshop?",
        "start": 29.35,
        "end": 29.7
      },
      {
        "word": "Workshop",
        "start": 29.7,
        "end": 30.04
      }
    ]
  },
  {
    "start": 30.03,
    "end": 31.4,
    "words": [
      {
        "word": "phải",
        "start": 30.03,
        "end": 30.37
      },
      {
        "word": "có",
        "start": 30.37,
        "end": 30.71
      },
      {
        "word": "recording",
        "start": 30.71,
        "end": 31.05
      },
      {
        "word": "nhé!",
        "start": 31.05,
        "end": 31.4
      }
    ]
  },
  {
    "start": 31.5,
    "end": 32.99,
    "words": [
      {
        "word": "À,",
        "start": 31.5,
        "end": 31.87
      },
      {
        "word": "thế",
        "start": 31.87,
        "end": 32.25
      },
      {
        "word": "thì",
        "start": 32.25,
        "end": 32.62
      },
      {
        "word": "cũng",
        "start": 32.62,
        "end": 32.99
      }
    ]
  },
  {
    "start": 32.99,
    "end": 34.49,
    "words": [
      {
        "word": "còn",
        "start": 32.99,
        "end": 33.36
      },
      {
        "word": "mấy",
        "start": 33.36,
        "end": 33.74
      },
      {
        "word": "cái",
        "start": 33.74,
        "end": 34.11
      },
      {
        "word": "recording",
        "start": 34.11,
        "end": 34.48
      }
    ]
  },
  {
    "start": 34.49,
    "end": 35.98,
    "words": [
      {
        "word": "Workshop",
        "start": 34.49,
        "end": 34.86
      },
      {
        "word": "từ",
        "start": 34.86,
        "end": 35.24
      },
      {
        "word": "ngày",
        "start": 35.24,
        "end": 35.61
      },
      {
        "word": "xưa,",
        "start": 35.61,
        "end": 35.98
      }
    ]
  },
  {
    "start": 35.98,
    "end": 37.48,
    "words": [
      {
        "word": "cũng",
        "start": 35.98,
        "end": 36.35
      },
      {
        "word": "có",
        "start": 36.35,
        "end": 36.73
      },
      {
        "word": "nhiều",
        "start": 36.73,
        "end": 37.1
      },
      {
        "word": "người",
        "start": 37.1,
        "end": 37.47
      }
    ]
  },
  {
    "start": 37.48,
    "end": 38.6,
    "words": [
      {
        "word": "feedback",
        "start": 37.48,
        "end": 37.85
      },
      {
        "word": "khen",
        "start": 37.85,
        "end": 38.23
      },
      {
        "word": "phết!",
        "start": 38.23,
        "end": 38.6
      }
    ]
  },
  {
    "start": 38.7,
    "end": 40.1,
    "words": [
      {
        "word": "Thế",
        "start": 38.7,
        "end": 39.05
      },
      {
        "word": "thử",
        "start": 39.05,
        "end": 39.4
      },
      {
        "word": "sửa",
        "start": 39.4,
        "end": 39.75
      },
      {
        "word": "sang",
        "start": 39.75,
        "end": 40.1
      }
    ]
  },
  {
    "start": 40.1,
    "end": 41.5,
    "words": [
      {
        "word": "đóng",
        "start": 40.1,
        "end": 40.45
      },
      {
        "word": "gói",
        "start": 40.45,
        "end": 40.8
      },
      {
        "word": "lại",
        "start": 40.8,
        "end": 41.15
      },
      {
        "word": "cho",
        "start": 41.15,
        "end": 41.5
      }
    ]
  },
  {
    "start": 41.5,
    "end": 42.9,
    "words": [
      {
        "word": "phù",
        "start": 41.5,
        "end": 41.85
      },
      {
        "word": "hợp",
        "start": 41.85,
        "end": 42.2
      },
      {
        "word": "hiện",
        "start": 42.2,
        "end": 42.55
      },
      {
        "word": "tại,",
        "start": 42.55,
        "end": 42.9
      }
    ]
  },
  {
    "start": 42.9,
    "end": 44.3,
    "words": [
      {
        "word": "rồi",
        "start": 42.9,
        "end": 43.25
      },
      {
        "word": "mình",
        "start": 43.25,
        "end": 43.6
      },
      {
        "word": "làm",
        "start": 43.6,
        "end": 43.95
      },
      {
        "word": "Flash",
        "start": 43.95,
        "end": 44.3
      }
    ]
  },
  {
    "start": 44.3,
    "end": 45.0,
    "words": [
      {
        "word": "Sale",
        "start": 44.3,
        "end": 44.65
      },
      {
        "word": "đi!",
        "start": 44.65,
        "end": 45.0
      }
    ]
  },
  {
    "start": 45.1,
    "end": 46.7,
    "words": [
      {
        "word": "Flash",
        "start": 45.1,
        "end": 45.5
      },
      {
        "word": "Sale",
        "start": 45.5,
        "end": 45.9
      },
      {
        "word": "trong",
        "start": 45.9,
        "end": 46.3
      },
      {
        "word": "vòng",
        "start": 46.3,
        "end": 46.7
      }
    ]
  },
  {
    "start": 46.7,
    "end": 48.3,
    "words": [
      {
        "word": "2",
        "start": 46.7,
        "end": 47.1
      },
      {
        "word": "-",
        "start": 47.1,
        "end": 47.5
      },
      {
        "word": "3",
        "start": 47.5,
        "end": 47.9
      },
      {
        "word": "ngày",
        "start": 47.9,
        "end": 48.3
      }
    ]
  },
  {
    "start": 48.3,
    "end": 49.5,
    "words": [
      {
        "word": "thôi",
        "start": 48.3,
        "end": 48.7
      },
      {
        "word": "chẳng",
        "start": 48.7,
        "end": 49.1
      },
      {
        "word": "hạn.",
        "start": 49.1,
        "end": 49.5
      }
    ]
  },
  {
    "start": 49.6,
    "end": 50.86,
    "words": [
      {
        "word": "Nhớ",
        "start": 49.6,
        "end": 49.92
      },
      {
        "word": "đừng",
        "start": 49.92,
        "end": 50.23
      },
      {
        "word": "bán",
        "start": 50.23,
        "end": 50.55
      },
      {
        "word": "trơ",
        "start": 50.55,
        "end": 50.86
      }
    ]
  },
  {
    "start": 50.86,
    "end": 52.13,
    "words": [
      {
        "word": "trọi",
        "start": 50.86,
        "end": 51.18
      },
      {
        "word": "recording,",
        "start": 51.18,
        "end": 51.49
      },
      {
        "word": "mà",
        "start": 51.49,
        "end": 51.81
      },
      {
        "word": "phải",
        "start": 51.81,
        "end": 52.12
      }
    ]
  },
  {
    "start": 52.13,
    "end": 53.39,
    "words": [
      {
        "word": "có",
        "start": 52.13,
        "end": 52.45
      },
      {
        "word": "sample,",
        "start": 52.45,
        "end": 52.76
      },
      {
        "word": "tài",
        "start": 52.76,
        "end": 53.08
      },
      {
        "word": "liệu",
        "start": 53.08,
        "end": 53.39
      }
    ]
  },
  {
    "start": 53.39,
    "end": 54.65,
    "words": [
      {
        "word": "và",
        "start": 53.39,
        "end": 53.71
      },
      {
        "word": "hướng",
        "start": 53.71,
        "end": 54.02
      },
      {
        "word": "dẫn",
        "start": 54.02,
        "end": 54.34
      },
      {
        "word": "để",
        "start": 54.34,
        "end": 54.65
      }
    ]
  },
  {
    "start": 54.65,
    "end": 55.6,
    "words": [
      {
        "word": "thực",
        "start": 54.65,
        "end": 54.97
      },
      {
        "word": "hành",
        "start": 54.97,
        "end": 55.28
      },
      {
        "word": "được!",
        "start": 55.28,
        "end": 55.6
      }
    ]
  },
  {
    "start": 55.7,
    "end": 57.32,
    "words": [
      {
        "word": "Vừa",
        "start": 55.7,
        "end": 56.1
      },
      {
        "word": "rồi",
        "start": 56.1,
        "end": 56.51
      },
      {
        "word": "là",
        "start": 56.51,
        "end": 56.91
      },
      {
        "word": "Flash",
        "start": 56.91,
        "end": 57.32
      }
    ]
  },
  {
    "start": 57.32,
    "end": 58.94,
    "words": [
      {
        "word": "Sale",
        "start": 57.32,
        "end": 57.72
      },
      {
        "word": "Campaign",
        "start": 57.72,
        "end": 58.13
      },
      {
        "word": "—",
        "start": 58.13,
        "end": 58.53
      },
      {
        "word": "1",
        "start": 58.53,
        "end": 58.94
      }
    ]
  },
  {
    "start": 58.94,
    "end": 60.55,
    "words": [
      {
        "word": "trong",
        "start": 58.94,
        "end": 59.34
      },
      {
        "word": "7",
        "start": 59.34,
        "end": 59.75
      },
      {
        "word": "loại",
        "start": 59.75,
        "end": 60.15
      },
      {
        "word": "Cash",
        "start": 60.15,
        "end": 60.56
      }
    ]
  },
  {
    "start": 60.55,
    "end": 62.17,
    "words": [
      {
        "word": "Campaign",
        "start": 60.55,
        "end": 60.95
      },
      {
        "word": "ra",
        "start": 60.95,
        "end": 61.36
      },
      {
        "word": "tiền",
        "start": 61.36,
        "end": 61.76
      },
      {
        "word": "nhanh",
        "start": 61.76,
        "end": 62.17
      }
    ]
  },
  {
    "start": 62.17,
    "end": 63.79,
    "words": [
      {
        "word": "cho",
        "start": 62.17,
        "end": 62.57
      },
      {
        "word": "Solo",
        "start": 62.57,
        "end": 62.98
      },
      {
        "word": "Experts,",
        "start": 62.98,
        "end": 63.38
      },
      {
        "word": "Coach",
        "start": 63.38,
        "end": 63.79
      }
    ]
  },
  {
    "start": 63.79,
    "end": 64.6,
    "words": [
      {
        "word": "và",
        "start": 63.79,
        "end": 64.19
      },
      {
        "word": "Consultant.",
        "start": 64.19,
        "end": 64.6
      }
    ]
  },
  {
    "start": 64.7,
    "end": 66.13,
    "words": [
      {
        "word": "Mình",
        "start": 64.7,
        "end": 65.06
      },
      {
        "word": "có",
        "start": 65.06,
        "end": 65.42
      },
      {
        "word": "series",
        "start": 65.42,
        "end": 65.77
      },
      {
        "word": "7",
        "start": 65.77,
        "end": 66.13
      }
    ]
  },
  {
    "start": 66.13,
    "end": 67.56,
    "words": [
      {
        "word": "bài",
        "start": 66.13,
        "end": 66.49
      },
      {
        "word": "viết",
        "start": 66.49,
        "end": 66.85
      },
      {
        "word": "chuyên",
        "start": 66.85,
        "end": 67.2
      },
      {
        "word": "sâu",
        "start": 67.2,
        "end": 67.56
      }
    ]
  },
  {
    "start": 67.56,
    "end": 68.99,
    "words": [
      {
        "word": "về",
        "start": 67.56,
        "end": 67.92
      },
      {
        "word": "7",
        "start": 67.92,
        "end": 68.28
      },
      {
        "word": "loại",
        "start": 68.28,
        "end": 68.63
      },
      {
        "word": "Cash",
        "start": 68.63,
        "end": 68.99
      }
    ]
  },
  {
    "start": 68.99,
    "end": 70.43,
    "words": [
      {
        "word": "Campaign,",
        "start": 68.99,
        "end": 69.35
      },
      {
        "word": "link",
        "start": 69.35,
        "end": 69.71
      },
      {
        "word": "mình",
        "start": 69.71,
        "end": 70.06
      },
      {
        "word": "để",
        "start": 70.06,
        "end": 70.42
      }
    ]
  },
  {
    "start": 70.43,
    "end": 71.5,
    "words": [
      {
        "word": "ở",
        "start": 70.43,
        "end": 70.79
      },
      {
        "word": "dưới",
        "start": 70.79,
        "end": 71.15
      },
      {
        "word": "comment.",
        "start": 71.15,
        "end": 71.5
      }
    ]
  },
  {
    "start": 71.6,
    "end": 73.04,
    "words": [
      {
        "word": "Mọi",
        "start": 71.6,
        "end": 71.96
      },
      {
        "word": "người",
        "start": 71.96,
        "end": 72.32
      },
      {
        "word": "có",
        "start": 72.32,
        "end": 72.68
      },
      {
        "word": "thể",
        "start": 72.68,
        "end": 73.04
      }
    ]
  },
  {
    "start": 73.04,
    "end": 74.47,
    "words": [
      {
        "word": "đọc",
        "start": 73.04,
        "end": 73.4
      },
      {
        "word": "và",
        "start": 73.4,
        "end": 73.76
      },
      {
        "word": "soi",
        "start": 73.76,
        "end": 74.12
      },
      {
        "word": "chiếu",
        "start": 74.12,
        "end": 74.48
      }
    ]
  },
  {
    "start": 74.47,
    "end": 75.91,
    "words": [
      {
        "word": "xem",
        "start": 74.47,
        "end": 74.83
      },
      {
        "word": "tài",
        "start": 74.83,
        "end": 75.19
      },
      {
        "word": "sản",
        "start": 75.19,
        "end": 75.55
      },
      {
        "word": "của",
        "start": 75.55,
        "end": 75.91
      }
    ]
  },
  {
    "start": 75.91,
    "end": 77.35,
    "words": [
      {
        "word": "mình",
        "start": 75.91,
        "end": 76.27
      },
      {
        "word": "phù",
        "start": 76.27,
        "end": 76.63
      },
      {
        "word": "hợp",
        "start": 76.63,
        "end": 76.99
      },
      {
        "word": "với",
        "start": 76.99,
        "end": 77.35
      }
    ]
  },
  {
    "start": 77.35,
    "end": 78.78,
    "words": [
      {
        "word": "chiến",
        "start": 77.35,
        "end": 77.71
      },
      {
        "word": "dịch",
        "start": 77.71,
        "end": 78.07
      },
      {
        "word": "nào",
        "start": 78.07,
        "end": 78.43
      },
      {
        "word": "nha.",
        "start": 78.43,
        "end": 78.79
      }
    ]
  },
  {
    "start": 78.78,
    "end": 79.5,
    "words": [
      {
        "word": "Bye",
        "start": 78.78,
        "end": 79.14
      },
      {
        "word": "bye!",
        "start": 79.14,
        "end": 79.5
      }
    ]
  }
];
