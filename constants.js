export const SUBJECTS = {
  'toan hoc': 'Toán Học',
  'tieng anh': 'Tiếng Anh',
  'vat ly': 'Vật Lí',
  'hoa hoc': 'Hóa Học',
  'lich su': 'Lịch Sử',
  'sinh hoc': 'Sinh Học',
  'dia ly': 'Địa Lý',
  SHORT: {
    'toan hoc': 'Toán',
    'tieng anh': 'Anh',
    'vat ly': 'Lí',
    'hoa hoc': 'Hóa',
    'lich su': 'Sử',
    'sinh hoc': 'Sinh',
    'dia ly': 'Địa'
  }
};

export const MAIN_MENU = [
  { id: 1, href: '/battle', label: 'Sàn đấu' },
  { id: 2, href: '/competition', label: 'Thách đấu' },
  { id: 3, href: '/challenge', label: 'Thử thách' },
  { id: 4, href: '/rewards', label: 'Phần thưởng' },
  { id: 5, href: '/', label: 'Về XAGOe' }
];

export const PUBLIC_MENU = [
  { id: 1, href: '/', label: 'Về XAGOe' },
  { id: 2, href: '/#tinh-nang', label: 'Tính năng' },
  { id: 3, href: '/#ve-chung-toi', label: 'Về chúng tôi' },
  { id: 3, href: '/#lien-he', label: 'Liên hệ' }
];

export const SECOND = 1;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const DISPLAY_NAME_MAX_LENGTH = 23;
export const USERNAME_MAX_LENGTH = 23;

export const DEFAULT_SUBJECTS_CONFIG = [
  { id: 1, name: 'toan hoc' },
  { id: 2, name: 'tieng anh' },
  { id: 3, name: 'vat ly' },
  { id: 4, name: 'sinh hoc' },
  { id: 5, name: 'dia ly' },
  { id: 6, name: 'lich su' },
  { id: 7, name: 'hoa hoc' }
];

export const SUBJECT_PROPERTIES = [
  {
    id: 1,
    name: 'toan hoc',
    icon: 'icon-math',
    shortName: 'Toán',
    fullName: 'Toán Học',
    quote: 'Rèn luyện logic của bạn tốt hơn'
  },
  {
    id: 2,
    name: 'tieng anh',
    icon: 'icon-english',
    shortName: 'Anh',
    fullName: 'Tiếng Anh',
    quote: 'Học Anh để tạo nhiều cơ hội làm việc cho các công ty nước ngoài'
  },
  {
    id: 3,
    name: 'vat ly',
    icon: 'icon-lightbulb',
    shortName: 'Lí',
    fullName: 'Vật Lí',
    quote: 'Hiểu hơn về vạn vật'
  },
  {
    id: 4,
    name: 'sinh hoc',
    icon: 'icon-biology',
    shortName: 'Sinh',
    fullName: 'Sinh Học',
    quote: 'Hiểu hơn về sự sống quanh ta'
  },
  {
    id: 5,
    name: 'dia ly',
    icon: 'icon-globe',
    shortName: 'Địa',
    fullName: 'Địa lý',
    quote: 'Hiểu hơn về địa lý Việt Nam'
  },
  {
    id: 6,
    name: 'lich su',
    icon: 'icon-history',
    shortName: 'Sử',
    fullName: 'Lịch Sử',
    quote: 'Hiểu hơn về lịch sử Việt Nam'
  },
  {
    id: 7,
    name: 'hoa hoc',
    icon: 'icon-atom',
    shortName: 'Hóa',
    fullName: 'Hóa Học',
    quote: ''
  }
];

export const DEFAULT_LEVELS_CONFIG = [
  { id: 1, name: 'easy' },
  { id: 2, name: 'medium' },
  { id: 3, name: 'hard' }
];

export const LEVEL_PROPERTIES = [
  { id: 1, name: 'easy', label: 'Dễ', color: 'green', hex: '#34C759' },
  { id: 2, name: 'medium', label: 'Vừa', color: 'yellow', hex: '#FF9500' },
  { id: 3, name: 'hard', label: 'Khó', color: 'red', hex: '#FF2D55' }
];

export const DEFAULT_GRADES_CONFIG = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
  { id: 4, name: '4' },
  { id: 5, name: '5' },
  { id: 6, name: '6' },
  { id: 7, name: '7' },
  { id: 8, name: '8' },
  { id: 9, name: '9' },
  { id: 10, name: '10' },
  { id: 11, name: '11' },
  { id: 12, name: '12' }
];

export const PROVINES = [
  'An Giang',
  'Bắc Cạn',
  'Bắc Giang',
  'Bạc Liêu',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Định',
  'Bình Dương',
  'Bình Phước',
  'Bình Thuận',
  'Cà Mau',
  'Cần Thơ',
  'Cao Bằng',
  'Đà Nẵng',
  'Đắc Lắc',
  'Đắk Nông',
  'Điện Biên',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Giang',
  'Hà Nam',
  'Hà Nội',
  'Hà Tĩnh',
  'Hải Dương',
  'Hải Phòng',
  'Hậu Giang',
  'Hòa Bình',
  'Huế',
  'Hưng Yên',
  'Khánh Hòa',
  'Kiên Giang',
  'Kon Tum',
  'Lai Châu',
  'Lâm Đồng',
  'Lạng Sơn',
  'Lào Cai',
  'Long An',
  'Nam Định',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sóc Trăng',
  'Sơn La',
  'Tây Ninh',
  'Thái Bình',
  'Thái Nguyên',
  'Thanh Hoá',
  'Tiền Giang',
  'TP Hồ Chí Minh',
  'Trà Vinh',
  'Tuyên Quang',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Vũng Tàu',
  'Yên Bái'
];

export const MIN_GRADE = 10;
export const MAX_GRADE = 12;
export const ALLOWED_GRADE_ARRAY = [10, 11, 12];
export const SUBJECT_ORDER_CHALLENGES = [
  {
    id: 2,
    name: 'tieng anh'
  },
  {
    id: 1,
    name: 'toan hoc'
  },

  {
    id: 3,
    name: 'vat ly'
  },
  {
    id: 4,
    name: 'sinh hoc'
  },
  {
    id: 6,
    name: 'lich su'
  },
  {
    id: 5,
    name: 'dia ly'
  }
];

//
export const MAX_INVITATION_PEOPLE = 9;
export const COMPETITION_SCOPE = 'public'

// Profile
export const DEFAULT_GRADE = '10';
export const DEFAULT_SCHOOL = 'THPT Lê Quý Đôn';
export const DEFAULT_CITY = 'Đà Nẵng';
export const DEFAULT_DOB = '2004-01-01T00:00:00.000Z';
export const DEFAULT_BIO = 'Thêm mô tả để mọi người hiểu bạn hơn bạn nhé ^^!';

export const MAX_NOTIFICATIONS_SHOW = 30;
export const MAX_NOTIFICATIONS_KEEP = MAX_NOTIFICATIONS_SHOW - 10;

export const XAGOE_FB_URL = 'https://www.facebook.com/Xagoe.vietnam';
export const XAGOE_YOUTUBE_URL =
  'https://www.youtube.com/channel/UCdAhYJqwJusjrhbnJTVK6Yw';
export const XAGOE_INSTA_URL = 'https://www.instagram.com/xagoe';
export const XAGOE_TUTORIAL_URL = 'https://youtu.be/LelzHePJo8k';
export const BAODANANG_URL = 'https://www.baodanang.vn/';
export const DANANG_ICT_URL = 'https://tttt.danang.gov.vn/';
export const MADEINDANANG_URL =
  'https://madeindanang.com/projects/xagoe-go-extra-miles-with-education-72.html?fbclid=IwAR14n0_LX4sZ4jSiDunM1d_C2pbc0UTaKBemImUfGf-FmU-FeSgb7sGENWw';
export const DANANG_1022_URL = 'https://1022.vn/trang-chu';
export const SHARETEA_URL = 'https://';
export const JOYTEA_URL = 'https://';
export const THECUPS_URL = 'https://';
