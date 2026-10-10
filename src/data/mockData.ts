import { Garment, Accessory, EventContext, CityWeather, ColorItem, OutfitConfig } from '../types';

export const GARMENTS: Garment[] = [
  {
    id: 'ngu-than-tay-chen',
    name: 'Áo Ngũ Thân Tay Chẽn',
    dynasty: 'Triều Nguyễn (TK 18 - 20)',
    era: 'Vua Minh Mạng định chế toàn quốc',
    description: 'Trang phục thường nhật và công sở quý phái của cả nam và nữ thời xưa. Tay áo ôm gọn, cổ đứng vuông vức mang khí chất nho nhã, đĩnh đạc.',
    heritageMeaning: '5 vạt áo tượng trưng cho Tứ thân phụ mẫu (cha mẹ đôi bên) bọc lấy vạt con bên trong tượng trưng cho người mặc. 5 hạt cúc đại diện cho Ngũ thường: Nhân - Lễ - Nghĩa - Trí - Tín.',
    cutStructure: 'Cổ đứng 4-5cm, vạt phải đè vạt trái (hữu nhậm), cài 5 cúc đồng/ngọc, tay áo chẽn gọn gàng.',
    defaultColor: '#1e3a8a', // Xanh chàm đậm
    defaultPantsColor: '#ffffff',
    pattern: 'van-may',
    recommendedOccasion: 'Cà phê dạo phố, Kỷ yếu tốt nghiệp, Fashion street, Hội nghị văn hóa',
    tag: 'Trending Gen Z'
  },
  {
    id: 'ao-tac',
    name: 'Áo Tấc (Ngũ Thân Tay Thụng)',
    dynasty: 'Triều Nguyễn',
    era: 'Lễ phục trang trọng quốc gia',
    description: 'Lễ phục có tay áo rộng thụng buông dài (rộng đúng một tấc khoảng 40cm). Thường mặc trong các dịp đại lễ, bái đường hôn lễ, đón khách quý.',
    heritageMeaning: 'Thể hiện sự tôn kính, phong thái ung dung tự tại, tâm thế khiêm hòa đoan chính của người quân tử và thục nữ.',
    cutStructure: 'Phom dáng ngũ thân nhưng tay thụng dài quá đầu ngón tay khi buông thẳng, cài 5 cúc truyền thống.',
    defaultColor: '#831843', // Đỏ bã trầu hoàng cung
    defaultPantsColor: '#fef08a',
    pattern: 'hoa-sen',
    recommendedOccasion: 'Lễ cưới hỏi, Lễ dâng hương, Tốt nghiệp ĐH vinh quy, Chụp ảnh nghệ thuật',
    tag: 'Lễ phục quý tộc'
  },
  {
    id: 'nhat-binh',
    name: 'Áo Nhật Bình',
    dynasty: 'Triều Nguyễn',
    era: 'Thường phục hậu phi & Lễ phục mệnh phụ',
    description: 'Trang phục lộng lẫy bậc nhất chốn hoàng cung với cổ áo hình chữ nhật viền chỉ ngũ sắc lấp lánh và hoa văn thêu tỉ mỉ chim phụng, hoa sen.',
    heritageMeaning: 'Cổ áo hình chữ nhật tượng trưng cho trời tròn đất vuông. Viền ngũ sắc tượng trưng cho ngũ hành tương sinh (Kim - Mộc - Thủy - Hỏa - Thổ) che chở thân chủ.',
    cutStructure: 'Cổ khoét chữ nhật, xẻ tà hai bên, tay áo có viền ngũ sắc hoặc thêu tay hoa lá cung đình.',
    defaultColor: '#b45309', // Vàng hoàng yến / Đỏ son
    defaultPantsColor: '#ffffff',
    pattern: 'chim-hac',
    recommendedOccasion: 'Lễ cưới truyền thống, Sân khấu nghệ thuật, Fashion Editorial',
    tag: 'Hoàng Gia Sang Trọng'
  },
  {
    id: 'ao-tu-than',
    name: 'Áo Tứ Thân Kinh Bắc',
    dynasty: 'Thời Trần - Lê đến cận đại',
    era: 'Biểu tượng đồng bằng Bắc Bộ',
    description: 'Gắn liền với hội Lim, điệu ca Quan họ và cô gái Kinh Bắc dịu dàng. Bốn vạt áo thướt tha, bên trong là yếm thắm, thắt dải lụa đào duyên dáng.',
    heritageMeaning: 'Bốn vạt tượng trưng cho bốn mùa bốn cõi, tình cảm đùm bọc son sắt của người phụ nữ nông thôn Việt Nam siêng năng, thuần khiết.',
    cutStructure: 'Hai vạt sau khép lại thành đường sống áo, hai vạt trước buông tự do hoặc buộc thắt nút trước bụng, phối cùng yếm cổ xây và bao thắt lưng.',
    defaultColor: '#065f46', // Xanh lá mạ / Xanh rêu
    defaultPantsColor: '#1c1917',
    pattern: 'hoa-cuc',
    recommendedOccasion: 'Trẩy hội mùa xuân, Lễ hội dân tộc, Trình diễn văn nghệ Gen Z',
    tag: 'Dân tộc & Mộc mạc'
  },
  {
    id: 'giao-linh',
    name: 'Áo Giao Lĩnh (Trực Lĩnh)',
    dynasty: 'Thời Lý - Trần - Lê Sơ',
    era: 'Cổ phục Thăng Long ngàn năm',
    description: 'Áo có hai vạt cổ bắt chéo trước ngực, mang đậm nét cổ phong thanh tao thời kỳ độc lập tự chủ rực rỡ của Đại Việt.',
    heritageMeaning: 'Giao lĩnh nghĩa là cổ áo giao nhau, thể hiện sự hòa hợp âm dương, đất trời và nhân văn của người Việt cổ.',
    cutStructure: 'Vạt chéo chữ V mở rộng, vạt phải cài sâu vào mạn sườn trái, buộc dây lụa tao nhã.',
    defaultColor: '#312e81', // Xanh lam mực nho
    defaultPantsColor: '#ffffff',
    pattern: 'tron-tron',
    recommendedOccasion: 'Art exhibition, Biểu diễn cosplay cổ phong, Chụp ảnh concept kiếm hiệp/thần thoại',
    tag: 'Cổ Phong Kinh Điển'
  },
  {
    id: 'yem-remix',
    name: 'Yếm Lụa Tân Thời & Áo Khoác',
    dynasty: 'Cải biên hiện đại (Gen Z Heritage)',
    era: 'Thời trang đương đại lấy cảm hứng yếm đào',
    description: 'Chiếc yếm cổ truyền được thiết kế lại bằng lụa satin cao cấp hoặc đũi gân, phối cùng blazer phom rộng hoặc quần palazzo tạo nên vẻ quyến rũ kiêu kỳ.',
    heritageMeaning: 'Sự tôn vinh đường nét duyên dáng của người con gái Việt Nam qua lăng kính thời trang hiện đại phóng khoáng.',
    cutStructure: 'Cổ yếm tròn hoặc tim, lưng trần thắt nơ lụa mềm mại, có lớp lót kín đáo hiện đại.',
    defaultColor: '#e11d48', // Hồng cánh sen / Đỏ son
    defaultPantsColor: '#1c1917',
    pattern: 'hoa-sen',
    recommendedOccasion: 'Dự tiệc tối, Nhạc hội ngoài trời, Fashion Week, Hẹn hò lãng mạn',
    tag: 'Quyến rũ phá cách'
  }
];

export const ACCESSORIES: Accessory[] = [
  // Headwear
  {
    id: 'man-gam',
    name: 'Mấn Gấm Cuộn Hiện Đại',
    category: 'headwear',
    icon: '👑',
    description: 'Mấn truyền thống được bọc gấm hoa dệt nổi, nhẹ nhàng và tôn dáng gương mặt.',
    vibe: 'traditional'
  },
  {
    id: 'non-quai-thao',
    name: 'Nón Quai Thao Quai Lụa',
    category: 'headwear',
    icon: '👒',
    description: 'Nón lá rộng vành đặc trưng Bắc Bộ với quai thao bằng dải lụa ngũ sắc buông dài.',
    vibe: 'traditional'
  },
  {
    id: 'kinh-cyber-retro',
    name: 'Kính Râm Cyberpunk Retro',
    category: 'headwear',
    icon: '🕶️',
    description: 'Kính râm gọng kim loại thanh mảnh hoặc oval đen tạo điểm nhấn tương lai cực chất.',
    vibe: 'streetwear'
  },
  {
    id: 'khan-ran-remix',
    name: 'Khăn Rằn Lụa Nam Bộ Remix',
    category: 'headwear',
    icon: '🧣',
    description: 'Khăn rằn caro biểu tượng Nam Bộ được quấn cách điệu quanh cổ hoặc làm turban tóc.',
    vibe: 'vintage'
  },
  {
    id: 'tram-cai-xa-cu',
    name: 'Trâm Cài Tóc Xà Cừ & Hoa Bạc',
    category: 'headwear',
    icon: '🌸',
    description: 'Phụ kiện cài tóc chế tác thủ công tinh xảo, tạo vẻ đẹp dịu dàng đài các.',
    vibe: 'traditional'
  },

  // Jewelry
  {
    id: 'kieng-bac-hoa-sen',
    name: 'Kiềng Bạc Chạm Hoa Sen',
    category: 'jewelry',
    icon: '💍',
    description: 'Kiềng cổ bạc trơn hoặc chạm hoa sen nổi đặc trưng của phụ nữ đất Việt xưa.',
    vibe: 'traditional'
  },
  {
    id: 'chuoi-ngoc-trai-chunky',
    name: 'Chuỗi Hạt Ngọc Trai Bản Lớn',
    category: 'jewelry',
    icon: '📿',
    description: 'Ngọc trai nước ngọt xếp tầng phong cách Y2K sang trọng tôn phần cổ áo ngũ thân.',
    vibe: 'modern'
  },
  {
    id: 'vong-tay-dong-co',
    name: 'Vòng Đeo Tay Đồng Cổ Đông Sơn',
    category: 'jewelry',
    icon: '✨',
    description: 'Họa tiết chim Lạc và mặt trời trống đồng khắc sắc sảo trên chất liệu đồng cổ.',
    vibe: 'vintage'
  },

  // Outerwear / Layers
  {
    id: 'blazer-oversize',
    name: 'Áo Blazer Oversize Dáng Rộng',
    category: 'outerwear',
    icon: '🧥',
    description: 'Khoác hờ trên vai khi mặc áo ngũ thân hoặc yếm tạo vibe High-Fashion cực cuốn hút.',
    vibe: 'streetwear'
  },
  {
    id: 'that-lung-da-ban-to',
    name: 'Thắt Lưng Da Bản To Khóa Kim Loại',
    category: 'outerwear',
    icon: '🎗️',
    description: 'Tạo điểm thắt eo sắc sảo cho áo giao lĩnh hoặc áo dài dáng thụng.',
    vibe: 'modern'
  },

  // Bags / Handhelds
  {
    id: 'quat-tram-khac-rong',
    name: 'Quạt Trầm Hương Khắc Tinh Xảo',
    category: 'bag',
    icon: '🪭',
    description: 'Quạt nan gỗ thơm ngát thoảng mùi trầm, nan quạt xòe rộng tạo dáng chụp ảnh thần thái.',
    vibe: 'traditional'
  },
  {
    id: 'tui-coi-thu-cong',
    name: 'Túi Cói Đan Tay Khảm Vải Gấm',
    category: 'bag',
    icon: '👜',
    description: 'Chất liệu lục bình và cói tự nhiên kết hợp quai da hiện đại thân thiện môi trường.',
    vibe: 'modern'
  },
  {
    id: 'tui-tote-thu-phap',
    name: 'Túi Tote Canvas In Thư Pháp Gen Z',
    category: 'bag',
    icon: '🛍️',
    description: 'Túi vải trẻ trung in những câu ca dao tục ngữ được typography phá cách.',
    vibe: 'streetwear'
  },

  // Footwear
  {
    id: 'sneaker-chunky-white',
    name: 'Giày Sneaker Chunky Trắng',
    category: 'footwear',
    icon: '👟',
    description: 'Điểm nhấn "Remix" chuẩn Gen Z, giúp di chuyển thoải mái cả ngày và hack chiều cao.',
    vibe: 'streetwear'
  },
  {
    id: 'guoc-moc-son-mai',
    name: 'Guốc Mộc Sơn Mài Quai Nhung',
    category: 'footwear',
    icon: '👡',
    description: 'Guốc gỗ truyền thống phát ra tiếng lộc cộc duyên dáng trên từng bước chân dạo phố.',
    vibe: 'traditional'
  },
  {
    id: 'boot-da-co-lung',
    name: 'Boot Da Cổ Lửng Màu Đen',
    category: 'footwear',
    icon: '👢',
    description: 'Tạo phong thái tự tin, cá tính mạnh mẽ khi phối cùng áo tấc hoặc ngũ thân xẻ tà.',
    vibe: 'modern'
  },
  {
    id: 'mary-jane-vintage',
    name: 'Giày Mary Jane Quai Cổ Điển',
    category: 'footwear',
    icon: '👠',
    description: 'Vẻ đẹp ngọt ngào, tiểu thư cổ điển phong cách Pháp - Đông Dương thập niên 50.',
    vibe: 'vintage'
  }
];

export const COLOR_PALETTE: ColorItem[] = [
  // Ngũ Hành Cung Đình & Tự Nhiên
  { id: 'son-do', name: 'Đỏ Điều (Hỏa)', hex: '#b91c1c', element: 'Hỏa', elementMeaning: 'Hỏa tượng trưng cho sinh khí, nhiệt huyết, may mắn và thịnh vượng.', palettesType: 'ngu-hanh' },
  { id: 'hoang-vang', name: 'Vàng Hoàng Yến (Thổ)', hex: '#ca8a04', element: 'Thổ', elementMeaning: 'Thổ đại diện cho đất mẹ hiền hòa, trung tâm bền vững và quyền quý hoàng triều.', palettesType: 'ngu-hanh' },
  { id: 'thanh-xanh', name: 'Xanh Thanh Ngọc (Mộc)', hex: '#059669', element: 'Mộc', elementMeaning: 'Mộc tượng trưng cho sức sống đâm chồi nảy lộc, thanh cao và thanh khiết.', palettesType: 'ngu-hanh' },
  { id: 'huyen-den', name: 'Huyền Đen Tuyết (Thủy)', hex: '#1c1917', element: 'Thủy', elementMeaning: 'Thủy đại diện cho sự uyên thâm, bao dung và bí ẩn sâu lắng.', palettesType: 'ngu-hanh' },
  { id: 'bach-trang', name: 'Bạch Ngà Cung Đình (Kim)', hex: '#f8fafc', element: 'Kim', elementMeaning: 'Kim đại diện cho sự trong sáng, thanh bạch, chính trực và sắc bén.', palettesType: 'ngu-hanh' },
  { id: 'cham-hue', name: 'Xanh Chàm Cố Đô (Thủy)', hex: '#1e3a8a', element: 'Thủy', elementMeaning: 'Sắc chàm cổ kính xứ Huế, biểu tượng của sự sâu lắng và quý phái.', palettesType: 'ngu-hanh' },

  // Gen Z Trend
  { id: 'sakura-pink', name: 'Hồng Phấn Pastel', hex: '#f43f5e', element: 'Hỏa', elementMeaning: 'Ngọt ngào, tươi trẻ và nữ tính phong cách Gen Z.', palettesType: 'genz-trend' },
  { id: 'sage-green', name: 'Xanh Trà Xanh Sage', hex: '#10b981', element: 'Mộc', elementMeaning: 'Hiện đại, nhẹ nhàng, phù hợp thời trang tối giản bền vững.', palettesType: 'genz-trend' },
  { id: 'cobalt-blue', name: 'Digital Cobalt', hex: '#2563eb', element: 'Thủy', elementMeaning: 'Năng động, nổi bật, phong cách Cyberpunk và nghệ thuật số.', palettesType: 'genz-trend' },
  { id: 'lavender', name: 'Tím Oải Hương', hex: '#8b5cf6', element: 'Hỏa', elementMeaning: 'Mộng mơ, lãng mạn, gợi nhớ sắc hoa violet Tây phương.', palettesType: 'genz-trend' },
  { id: 'tangerine', name: 'Cam Hoàng Hôn', hex: '#f97316', element: 'Hỏa', elementMeaning: 'Nhiệt tình bùng nổ, phá cách cho những bộ cánh dạo phố.', palettesType: 'genz-trend' },
  { id: 'pearl-cream', name: 'Kem Vải Thô', hex: '#fef3c7', element: 'Kim', elementMeaning: 'Mộc mạc, gần gũi tự nhiên, tôn da người Việt.', palettesType: 'genz-trend' },
];

export const EVENTS: EventContext[] = [
  {
    id: 'ky-yeu-tot-nghiep',
    name: 'Kỷ Yếu Tốt Nghiệp (THPT / Đại Học)',
    category: 'Học đường',
    recommendedGarments: ['ngu-than-tay-chen', 'ao-tac'],
    etiquetteNote: 'Cần sự trang trọng nhưng vẫn trẻ trung. Áo tấc hoặc ngũ thân tay chẽn rất hợp chụp tại Văn Miếu, Hoàng Thành.'
  },
  {
    id: 'le-hoi-du-xuan',
    name: 'Du Xuân Phố Cổ & Trẩy Hội Đầu Năm',
    category: 'Lễ hội',
    recommendedGarments: ['ao-tu-than', 'ngu-than-tay-chen', 'nhat-binh'],
    etiquetteNote: 'Chọn gam màu rực rỡ (đỏ, vàng, xanh) mang lại may mắn. Phối cùng quạt hoặc nón quai thao để có ảnh đẹp.'
  },
  {
    id: 'di-chua-cau-an',
    name: 'Đi Chùa / Đền Phủ Tâm Linh',
    category: 'Tâm linh',
    recommendedGarments: ['ngu-than-tay-chen', 'ao-tac'],
    etiquetteNote: 'YÊU CẦU NGHIÊM NGẶT: Phải cài cúc chỉnh tề, quần dài trùm mắt cá chân, không hở vai, xẻ tà vừa phải kín đáo.'
  },
  {
    id: 'dam-cuoi-vu-quy',
    name: 'Đám Cưới / Phù Dâu Phù Rể / Vu Quy',
    category: 'Nghi lễ',
    recommendedGarments: ['nhat-binh', 'ao-tac'],
    etiquetteNote: 'Trang phục thể hiện phúc khí gia đình. Cô dâu chuộng Nhật Bình, chú rể chuộng Tấc gấm hoặc Ngũ Thân.'
  },
  {
    id: 'ca-phe-hang-ngay',
    name: 'Cà Phê Dạo Phố Cuối Tuần (Daily Wear)',
    category: 'Đời sống',
    recommendedGarments: ['ngu-than-tay-chen', 'yem-remix', 'giao-linh'],
    etiquetteNote: 'Thoải mái remix cùng sneaker, túi tote, kính râm để biến trang phục truyền thống thành phong cách sống thường nhật.'
  },
  {
    id: 'fashion-week-indie',
    name: 'Tuần Lễ Thời Trang / Festival Âm Nhạc',
    category: 'Nghệ thuật',
    recommendedGarments: ['yem-remix', 'giao-linh', 'nhat-binh'],
    etiquetteNote: 'Không giới hạn sáng tạo! Có thể phối cùng blazer oversize, chunky boot và phụ kiện kim loại ấn tượng.'
  }
];

export const CITIES_WEATHER: CityWeather[] = [
  {
    city: 'Hà Nội',
    temp: '22°C',
    condition: 'Mát mẻ trời thu, gió heo may nhẹ',
    season: 'Thu Đông',
    fabricAdvice: 'Chất liệu lụa Vạn Phúc hoặc gấm dệt nhẹ, phối layer thêm áo ngũ thân khoác ngoài.'
  },
  {
    city: 'TP. Hồ Chí Minh',
    temp: '32°C',
    condition: 'Nắng ấm nhiệt đới, rực rỡ phương Nam',
    season: 'Mùa khô',
    fabricAdvice: 'Ưu tiên lụa tơ tằm mềm, đũi mát hoặc sa hàn the dệt thưa thoáng khí, tay áo xắn nhẹ.'
  },
  {
    city: 'Cố Đô Huế',
    temp: '21°C',
    condition: 'Mưa phùn cổ kính, trầm mặc sông Hương',
    season: 'Mùa mưa',
    fabricAdvice: 'Áo Tấc chất liệu gấm dầy dặn chống gió lạnh, mang thêm ô che hoặc guốc sơn mài cao ráo.'
  },
  {
    city: 'Đà Lạt',
    temp: '16°C',
    condition: 'Se lạnh sương mù rừng thông',
    season: 'Chớm đông',
    fabricAdvice: 'Phối layer nhiều lớp: Áo lót cổ cao, áo ngũ thân dạ/gấm và khăn rằn ấm áp.'
  },
  {
    city: 'Hội An',
    temp: '27°C',
    condition: 'Nắng vàng lung linh phố cổ lồng đèn',
    season: 'Xuân Hè',
    fabricAdvice: 'Lụa tơ tằm màu vàng hoàng yến hoặc xanh mộc, kết hợp quạt trầm và nón bài thơ.'
  }
];

export const AVATARS = [
  { id: 'avatar-female-modern', name: 'Nữ Gen Z - Tóc búi gọn', gender: 'female', hair: 'bun', vibe: 'Thanh lịch & Năng động' },
  { id: 'avatar-female-wavy', name: 'Nữ Gen Z - Tóc xoăn lơi', gender: 'female', hair: 'wavy', vibe: 'Cổ điển & Duyên dáng' },
  { id: 'avatar-male-mullet', name: 'Nam Gen Z - Tóc Layer lãng tử', gender: 'male', hair: 'mullet', vibe: 'Phóng khoáng & Cool ngầu' },
  { id: 'avatar-male-neat', name: 'Nam Gen Z - Tóc vuốt cổ điển', gender: 'male', hair: 'neat', vibe: 'Đĩnh đạc & Thư sinh' },
];

export const INITIAL_CONFIG: OutfitConfig = {
  garmentId: 'ngu-than-tay-chen',
  outerColor: '#1e3a8a',
  innerPantsColor: '#ffffff',
  collarSide: 'right_over_left',
  pattern: 'van-may',
  styleVibe: 'Gen Z Streetwear Remix',
  selectedAccessories: ['sneaker-chunky-white', 'man-gam', 'quat-tram-khac-rong'],
  avatarId: 'avatar-female-modern',
  event: 'ky-yeu-tot-nghiep',
  city: 'Hà Nội',
  weather: '22°C (Mát mẻ trời thu)'
};
