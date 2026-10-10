import React, { useState } from 'react';
import { Bed, UtensilsCrossed, MapPin, Star, ExternalLink, Sparkles, Filter } from 'lucide-react';

interface HotelItem {
  id: string;
  name: string;
  originalName: string;
  city: string;
  country: string;
  flag: string;
  stars: number;
  highlight: string;
  description: string;
  address: string;
  imageUrl: string;
  dayOccurrences: number[];
}

interface DiningItem {
  id: string;
  name: string;
  originalName: string;
  city: string;
  country: string;
  flag: string;
  type: string;
  highlight: string;
  signatureDish: string;
  description: string;
  address: string;
  imageUrl: string;
  dayOccurrences: number[];
}

export const LUXURY_HOTELS: HotelItem[] = [
  {
    id: 'h-dangleterre',
    name: "Hotel d'Angleterre 英國飯店",
    originalName: "Hotel d'Angleterre Copenhagen",
    city: '哥本哈根',
    country: '丹麥',
    flag: '🇩🇰',
    stars: 5,
    highlight: '二百年傳奇皇家五星 · 全城最震撼聖誕童話外牆燈飾',
    description:
      '建於1755年，為全球歷史最悠久的奢華飯店之一。每年聖誕節外牆皆會由丹麥頂級設計師打造整棟建築的巨幅主題燈海童話，是全哥本哈根市民與旅人競相朝聖的年度盛景。內部設有米其林一星 Marchal 餐廳與奢華水療中心。',
    address: 'Kongens Nytorv 34, 1050 København, Denmark',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    dayOccurrences: [1, 2],
  },
  {
    id: 'h-grand-hotel',
    name: 'Grand Hôtel Stockholm 斯德哥爾摩大飯店',
    originalName: 'Grand Hôtel Stockholm',
    city: '斯德哥爾摩',
    country: '瑞典',
    flag: '🇸🇪',
    stars: 5,
    highlight: '瑞典國寶級飯店 · 直面王宮水岸 · 歷屆諾貝爾獎得主下榻首選',
    description:
      '自1874年開幕以來，始終是瑞典乃至斯堪地那維亞尊榮的代表。面向斯德哥爾摩王宮與水岸，每年的諾貝爾獎得主及隨行家屬皆固定下榻於此。附設著名的 Cadier Bar 與歷史悠久的 Verandan 傳統瑞典盛宴。',
    address: 'Södra Blasieholmshamnen 8, 103 27 Stockholm, Sweden',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    dayOccurrences: [3, 4],
  },
  {
    id: 'h-kakslauttanen',
    name: 'Kakslauttanen Arctic Resort 極光玻璃屋度假村',
    originalName: 'Kakslauttanen Arctic Resort - Glass Igloos',
    city: '薩利色爾卡 / 拉普蘭',
    country: '芬蘭',
    flag: '🇫🇮',
    stars: 5,
    highlight: '全球玻璃冰屋開山鼻祖 · 躺在溫暖床上仰望極地星空與極光',
    description:
      '享譽全球的芬蘭拉普蘭極地度假村。經典的 Kelo-Glass Igloo 結合了原木木屋的柴火壁爐、私人傳統桑拿室，以及採用特殊防霜隔熱玻璃建造的圓頂星空極光臥室，配備極光偵測自動輕柔提醒鈴。',
    address: 'Kiilopääntie 9, 99830 Saariselkä, Finland',
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    dayOccurrences: [5, 6, 7],
  },
  {
    id: 'h-kamp',
    name: 'Hotel Kämp 肯普飯店',
    originalName: 'Hotel Kämp Helsinki',
    city: '赫爾辛基',
    country: '芬蘭',
    flag: '🇫🇮',
    stars: 5,
    highlight: '自1887年營運至今 · 芬蘭歷史文化頂峰奢華地標',
    description:
      '新古典主義優雅建築，坐落於赫爾辛基市中心著名的 Esplanadi 林蔭大道第一排。音樂巨匠西貝流士、芬蘭歷代總統均曾在此流連。客房揉合十九世紀歐洲宮廷貴族風韻與當代北歐奢華科技。',
    address: 'Pohjoisesplanadi 29, 00100 Helsinki, Finland',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    dayOccurrences: [8, 9],
  },
  {
    id: 'h-the-thief',
    name: 'The Thief 賊之島現代藝術飯店',
    originalName: 'The Thief Oslo',
    city: '奧斯陸',
    country: '挪威',
    flag: '🇳🇴',
    stars: 5,
    highlight: '坐落現代藝廊特區 Tjuvholmen · 客房陳列現代名家真跡藝術',
    description:
      '「偷走你靈魂與時間的精品奢華酒店」。座落於奧斯陸峽灣畔的運河藝術島，由國際設計大師 Patricia Urquiola 策展，飯店內隨處可見沃荷（Andy Warhol）等名家原版作品，頂樓露台享有峽灣落日全景。',
    address: 'Landgangen 1, 0252 Oslo, Norway',
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    dayOccurrences: [10],
  },
  {
    id: 'h-the-edge',
    name: 'Clarion Hotel The Edge 特羅姆瑟艾奇飯店',
    originalName: 'Clarion Hotel The Edge Tromsø',
    city: '特羅姆瑟',
    country: '挪威',
    flag: '🇳🇴',
    stars: 4,
    highlight: '極地水岸第一排 · 擁有特羅姆瑟唯一的 Skybar 俯瞰峽灣雪山',
    description:
      '特羅姆瑟最引人注目的現代水岸建築。大面落地玻璃將深邃峽灣與對岸雪山連綿景致融於室內，夜晚頂樓酒吧是靜候極光穿透夜空的絕佳溫暖室內觀測點。',
    address: 'Kaigata 6, 9008 Tromsø, Norway',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    dayOccurrences: [11],
  },
  {
    id: 'h-the-retreat',
    name: 'The Retreat at Blue Lagoon 冰島藍湖隱逸奢華套房',
    originalName: 'The Retreat at Blue Lagoon Iceland',
    city: '格林達維克 & 藍湖',
    country: '冰島',
    flag: '🇮🇸',
    stars: 5,
    highlight: '世界頂級奢華之巔 · 客房直通私人火山熔岩專屬潟湖',
    description:
      '隱身於800年黑色火山苔原中的建築奇蹟。住客專屬私人藍湖區域，完全避開大眾觀光人潮。套房內落地窗直面岩漿岩石，附設私人岩洞水療中心與天然白矽泥護膚儀式。',
    address: 'Norðurljósavegur 9, 240 Grindavík, Iceland',
    imageUrl: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80',
    dayOccurrences: [12],
  },
  {
    id: 'h-the-edition',
    name: 'The Reykjavik EDITION 雷克雅維克艾迪遜酒店',
    originalName: 'The Reykjavik EDITION',
    city: '雷克雅維克',
    country: '冰島',
    flag: '🇮🇸',
    stars: 5,
    highlight: '冰島第一家五星潮奢品牌 · 緊鄰 Harpa 音樂廳與海港',
    description:
      '由伊恩·施拉格（Ian Schrager）與萬豪國際攜手打造。採用火山玄武岩石材、冰島再生木材與溫暖壁爐羊毛毯裝飾，融合前衛藝術與斯堪地那維亞舒適美學。頂樓景觀酒吧享有雷克雅維克跨年煙火與海灣極光無死角視野。',
    address: 'Austurbakki 2, 101 Reykjavík, Iceland',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    dayOccurrences: [13, 14],
  },
];

export const GOURMET_DINING: DiningItem[] = [
  {
    id: 'd-havfruen',
    name: 'Restaurant Havfruen 新港美人魚海鮮館',
    originalName: 'Restaurant Havfruen Nyhavn',
    city: '哥本哈根',
    country: '丹麥',
    flag: '🇩🇰',
    type: '經典北歐海鮮',
    highlight: '運河畔彩色木屋第一排 · 傳統丹麥醃漬鯡魚與奶油香煎鰈魚',
    signatureDish: '經典丹麥三品海鮮拼盤佐新鮮蒔蘿黑麥麵包、野生海鱸魚佐白酒奶油醬',
    description:
      '坐落於新港最具代表性的鮮黃色木屋中，創立於1937年。主廚每日清晨挑選厄勒海峽直送的漁獲，搭配手工熬煮香料熱紅酒（Gløgg），是冬夜新港最溫暖的美味駐足地。',
    address: 'Nyhavn 39, 1051 København, Denmark',
    imageUrl: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=800&q=80',
    dayOccurrences: [1],
  },
  {
    id: 'd-taarnet',
    name: 'Restaurant Tårnet 塔樓景觀餐廳',
    originalName: 'Restaurant Tårnet Christiansborg',
    city: '哥本哈根',
    country: '丹麥',
    flag: '🇩🇰',
    type: '現代王家丹麥三明治',
    highlight: '位於克里斯蒂安堡宮中央塔樓內部 · 俯瞰哥本哈根全景天際線',
    signatureDish: '現代解構式 Smørrebrød（慢燉牛小排佐辣根醬、煙燻鮭魚佐魚子醬）',
    description:
      '隱身於丹麥議會宮殿正中心的高塔內，高達十餘公尺的宏偉拱頂。在此品嚐全城最講究的丹麥傳統開放式三明治，邊啜飲丹麥精釀啤酒邊欣賞冬日哥本哈根紅瓦白雪屋頂。',
    address: 'Christiansborg Slotsplads, 1218 København, Denmark',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    dayOccurrences: [2],
  },
  {
    id: 'd-nimb',
    name: 'Nimb Brasserie 蒂沃利摩爾宮小館',
    originalName: 'Nimb Brasserie Tivoli',
    city: '哥本哈根',
    country: '丹麥',
    flag: '🇩🇰',
    type: '法式北歐奢華餐酒館',
    highlight: '坐落蒂沃利花園摩爾式白色宮殿 · 百萬璀璨聖誕燈海窗景',
    signatureDish: '頂級安格斯黑牛肋眼佐冬季黑松露洋芋泥、布列塔尼生蠔拼盤',
    description:
      '蒂沃利花園地標性宮殿餐廳。在金碧輝煌的挑高水晶燈空間下，落地窗正對著蒂沃利花園聖誕童話燈海，一邊享受香檳一邊聆聽園區聖誕管弦樂團的優美樂章。',
    address: 'Bernstorffsgade 5, 1577 København, Denmark',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    dayOccurrences: [2],
  },
  {
    id: 'd-gyldene-freden',
    name: 'Den Gyldene Freden 黃金和平餐廳',
    originalName: 'Den Gyldene Freden Stockholm',
    city: '斯德哥爾摩',
    country: '瑞典',
    flag: '🇸🇪',
    type: '三百餘年金氏紀錄傳統老店',
    highlight: '自1722年連續營業至今 · 瑞典學院諾貝爾文學獎評委聚餐聖地',
    signatureDish: '瑞典傳統特級肉丸佐奶油肉汁、新鮮野生越橘果醬與醃黃瓜',
    description:
      '老城 Gamla Stan 鵝卵石小徑旁的地底紅磚拱頂建築。燭光在古老磚壁上搖曳，空氣中飄散著肉桂與烘烤肉丸的誘人香氣，是全斯德哥爾摩體驗瑞典家傳菜系最神聖不可錯過的名殿。',
    address: 'Österlånggatan 51, 111 31 Stockholm, Sweden',
    imageUrl: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80',
    dayOccurrences: [3],
  },
  {
    id: 'd-fotografiska',
    name: 'Fotografiska Restaurant 當代攝影美學餐館',
    originalName: 'Fotografiska Restaurant',
    city: '斯德哥爾摩',
    country: '瑞典',
    flag: '🇸🇪',
    type: '米其林綠星當代永續美饌',
    highlight: '全景玻璃俯瞰群島冬季落日 · 極致發酵與根莖當令蔬食哲學',
    signatureDish: '柴燒焦糖化防風草根佐榛果牛油、波羅的海海草慢火煙燻鯡魚',
    description:
      '榮獲米其林綠星殊榮，由名廚 Paul Svensson 創辦。堅持「零浪費」理念，將北歐當季根莖、野菇與發酵技法發揮得淋漓盡致。巨幅落地窗直接面對梅拉倫湖水岸與騎士島天際線。',
    address: 'Stadsgårdshamnen 22, 116 45 Stockholm, Sweden',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    dayOccurrences: [4],
  },
  {
    id: 'd-kakslauttanen-gala',
    name: 'Kakslauttanen 極地平安夜盛宴',
    originalName: 'Kakslauttanen Christmas Eve Arctic Gala',
    city: '拉普蘭',
    country: '芬蘭',
    flag: '🇫🇮',
    type: '拉普蘭傳統聖誕御宴',
    highlight: '原木壁爐篝火 · 傳統芬蘭聖誕烤火腿與香煎北極紅點鮭',
    signatureDish: '慢烤丁香芥末聖誕火腿、傳統甜菜根蘋果沙拉 Rosolli、熱藍莓杜松子甘露',
    description:
      '平安夜當晚在巨大針葉松木主餐廳隆重登場。伴隨著柴火劈啪作響與聖誕老人的驚喜造訪，大家圍坐共享豐盛道地的北極圈盛宴，窗外則是無邊無際的純白極夜雪原。',
    address: 'Kakslauttanen Main Lodge, 99830 Saariselkä, Finland',
    imageUrl: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=800&q=80',
    dayOccurrences: [6],
  },
  {
    id: 'd-soppakeittio',
    name: 'Soppakeittiö 赫爾辛基老市場鮭魚湯',
    originalName: 'Soppakeittiö Hakaniemi & Vanha Kauppahalli',
    city: '赫爾辛基',
    country: '芬蘭',
    flag: '🇫🇮',
    type: '百年老市場國民湯品',
    highlight: '全芬蘭最好喝的香濃奶油鮭魚湯 · 無限量提供黑麥酸麵包與羅勒青醬',
    signatureDish: '傳統芬蘭奶油蒔蘿鮭魚湯（Lohikeitto）',
    description:
      '建於1889年的赫爾辛基老農貿市場中最受歡迎的排隊小鋪。大塊厚實的野生鮭魚肉、軟嫩馬鈴薯丁在鮮奶油與魚骨高湯中慢熬，表面撒上厚厚一層翠綠新鮮蒔蘿，寒冬喝下一碗瞬間驅散全身寒意。',
    address: 'Eteläranta, 00130 Helsinki, Finland',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    dayOccurrences: [8],
  },
  {
    id: 'd-savoy',
    name: 'Ravintola Savoy 薩沃伊傳奇餐廳',
    originalName: 'Ravintola Savoy Helsinki',
    city: '赫爾辛基',
    country: '芬蘭',
    flag: '🇫🇮',
    type: '米其林星級北歐現代經典',
    highlight: '芬蘭建築巨擘 Alvar Aalto 親手設計室內空間與經典 Savoy 花瓶誕生地',
    signatureDish: '曼納海姆元帥招牌燴羊肉末佐醃黃瓜與甜菜根（Vorschmack）',
    description:
      '1937年開業至今，為芬蘭政商名流與文藝名家最頂級聚會所。八樓露台可俯瞰整個 Esplanadi 花園與赫爾辛基市景，菜色融合法式精細工藝與純淨北歐自然風味。',
    address: 'Eteläesplanadi 14, 00130 Helsinki, Finland',
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    dayOccurrences: [8, 9],
  },
  {
    id: 'd-loyly-rest',
    name: 'Löyly Restaurant 海濱桑拿柴火餐館',
    originalName: 'Löyly Helsinki Restaurant',
    city: '赫爾辛基',
    country: '芬蘭',
    flag: '🇫🇮',
    type: '海濱碳烤與慢燉野味',
    highlight: '桑拿跳海後的極致享受 · 柴火烤爐慢燉芬蘭農場鹿肉',
    signatureDish: '慢燉馴鹿肉佐防風草根泥與越橘醬、碳烤波羅的海鮮魚',
    description:
      '位於多角形木質幾何桑拿建築內。在戶外冰海桑拿徹底釋放身體疲憊後，坐進擁有全景海灣大壁爐的溫馨餐廳，大口品嚐香氣四溢的烤鹿肉與冰涼芬蘭精釀白啤酒。',
    address: 'Hernesaarenranta 4, 00150 Helsinki, Finland',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    dayOccurrences: [9],
  },
  {
    id: 'd-maaemo',
    name: 'Maaemo 奧斯陸傳奇米其林三星',
    originalName: 'Maaemo Oslo',
    city: '奧斯陸',
    country: '挪威',
    flag: '🇳🇴',
    type: '米其林三星北歐新料理殿堂',
    highlight: '挪威首間米其林三星神話 · 主廚 Esben Holmboe Bang 心靈饗宴',
    signatureDish: '冰冷海域野生挪威螯蝦裹黑麥麵包碎、松葉冷杉香氣慢火乳鴿',
    description:
      'Maaemo 在古諾爾斯語中意為「萬物大地之母」。每一道菜皆是向挪威純淨峽灣、原始森林與冰雪大地致敬的極致藝術品。長達十六道式的品味菜單，被全球老饕奉為畢生必訪殿堂。',
    address: 'Dronning Eufemias gate 23, 0194 Oslo, Norway',
    imageUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80',
    dayOccurrences: [10],
  },
  {
    id: 'd-fiskekompaniet',
    name: 'Fiskekompaniet 挪威極地海鮮名店',
    originalName: 'Fiskekompaniet Sjøsiden Tromsø',
    city: '特羅姆瑟',
    country: '挪威',
    flag: '🇳🇴',
    type: '挪威現捕野生帝王蟹與深海冷水魚',
    highlight: '海港浮橋水岸邊 · 新鮮捕撈巨大挪威帝王蟹（King Crab）現煮',
    signatureDish: '清蒸極地野生帝王蟹螯佐檸檬蒜蓉香草牛油、香煎大西洋真鱈',
    description:
      '特羅姆瑟最享有盛譽的海鮮餐廳。座落於海灣木棧道上，窗外便是停泊的極光遊船與白雪皚皚的山脈。剛從冰冷深海捕撈的帝王蟹肉質清甜彈牙無比，回味悠長。',
    address: 'Killengreens gate 2, 9008 Tromsø, Norway',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    dayOccurrences: [11],
  },
  {
    id: 'd-moss',
    name: 'Moss Restaurant 藍湖米其林一星火山饗宴',
    originalName: 'Moss Restaurant at The Retreat',
    city: '格林達維克 & 藍湖',
    country: '冰島',
    flag: '🇮🇸',
    type: '米其林一星火山熔原盛宴',
    highlight: '坐落火山岩漿原中央 · 七道式探索冰島自然風味',
    signatureDish: '火山岩慢烤冰島初生小羊排佐野當歸、炭烤北極紅點鮭魚佐白海藻湯',
    description:
      '位於藍湖 The Retreat 奢華度假村核心位置，曾獲米其林一星肯定。餐廳環繞著大片原始熔岩地貌，廚師團隊走訪冰島農夫與漁民，將純天然地熱溫泉食材化為驚艷味蕾的極光盛宴。',
    address: 'Norðurljósavegur 9, 240 Grindavík, Iceland',
    imageUrl: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=800&q=80',
    dayOccurrences: [12],
  },
  {
    id: 'd-tides',
    name: 'Tides by Gunnar Karl Gíslason',
    originalName: 'Tides at The Reykjavik EDITION',
    city: '雷克雅維克',
    country: '冰島',
    flag: '🇮🇸',
    type: '現代冰島火烤海鮮與野味',
    highlight: '冰島第一位米其林星廚主理 · 現代潮奢氛圍開放式廚房',
    signatureDish: '冰島海螯蝦佐煙燻奶油、明火炭燒冰島特級羊肋排佐黑蒜泥',
    description:
      '坐落於 EDITION 飯店一樓。主廚 Gunnar Karl Gíslason 曾帶領冰島餐廳首度拿下米其林星級。餐廳以特製明火烤爐為核心，將剛上岸的北大西洋海產注入焦香炭烤風味。',
    address: 'Austurbakki 2, 101 Reykjavík, Iceland',
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    dayOccurrences: [13, 14],
  },
];

export const HotelDiningGuide: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'hotel' | 'dining'>('all');
  const [activeCountry, setActiveCountry] = useState<string>('全部');

  const filteredHotels = LUXURY_HOTELS.filter(
    (h) => activeCountry === '全部' || h.country === activeCountry
  );

  const filteredDining = GOURMET_DINING.filter(
    (d) => activeCountry === '全部' || d.country === activeCountry
  );

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>十五日行程特輯 · 奢華住宿與美饌專刊</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
            北歐五國奢華飯店與米其林美饌巡禮
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed font-sans">
            嚴選 8 家殿堂級五星精品住宿（如百年 d'Angleterre、極光玻璃屋、藍湖 The Retreat）與 13 間傳奇餐館（百年肉丸、老市場鮭魚湯、米其林三星 Maaemo），帶來身心極致享受。
          </p>
        </div>
      </div>

      {/* Filter Segmented Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        {/* Category Switcher */}
        <div className="flex bg-slate-900 border border-slate-800 rounded-2xl p-1 text-xs font-semibold">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeCategory === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            全部奢華推薦
          </button>
          <button
            onClick={() => setActiveCategory('hotel')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeCategory === 'hotel'
                ? 'bg-indigo-500 text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bed className="w-3.5 h-3.5" />
            <span>頂級飯店 ({LUXURY_HOTELS.length})</span>
          </button>
          <button
            onClick={() => setActiveCategory('dining')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeCategory === 'dining'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>美饌餐廳 ({GOURMET_DINING.length})</span>
          </button>
        </div>

        {/* Country Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {['全部', '丹麥', '瑞典', '芬蘭', '挪威', '冰島'].map((c) => (
            <button
              key={c}
              onClick={() => setActiveCountry(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeCountry === c
                  ? 'bg-slate-700 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Luxury Hotels Section */}
      {(activeCategory === 'all' || activeCategory === 'hotel') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <Bed className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-serif font-bold text-white">
              精選 8 大頂級奢華下榻飯店
            </h2>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-800/40">
              {filteredHotels.length} 間飯店
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHotels.map((h) => (
              <div
                key={h.id}
                className="group rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-xl hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-slate-950">
                    <img
                      src={h.imageUrl}
                      alt={h.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          '/src/assets/images/gamla_stan_stockholm_winter_1791104433260.jpg';
                      }}
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold border border-slate-800">
                      <span>{h.flag}</span>
                      <span>{h.country} · {h.city}</span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-0.5 px-2 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold shadow-md">
                      {[...Array(h.stars)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-xs font-mono font-medium text-emerald-400">
                      行程安排下榻：{h.dayOccurrences.map((d) => `Day ${d}`).join('、')}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white leading-snug">
                      {h.name}
                    </h3>
                    <p className="text-xs text-indigo-300 font-semibold">
                      ✦ {h.highlight}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-3">
                      {h.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate max-w-[200px] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    {h.address}
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ' ' + h.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>地圖導航</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gourmet Dining Section */}
      {(activeCategory === 'all' || activeCategory === 'dining') && (
        <div className="space-y-4 pt-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <UtensilsCrossed className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-serif font-bold text-white">
              精選 13 家傳奇米其林與特色美饌
            </h2>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/40">
              {filteredDining.length} 間餐館
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDining.map((d) => (
              <div
                key={d.id}
                className="group rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-xl hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img
                      src={d.imageUrl}
                      alt={d.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          '/src/assets/images/gamla_stan_stockholm_winter_1791104433260.jpg';
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-semibold border border-slate-800">
                      <span>{d.flag}</span>
                      <span>{d.city}</span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-amber-500/90 text-slate-950 text-[10px] font-bold">
                      {d.type}
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="text-[11px] font-mono font-medium text-emerald-400">
                      建議造訪：{d.dayOccurrences.map((day) => `Day ${day}`).join('、')}
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-snug">
                      {d.name}
                    </h3>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-amber-900/30 text-[11px] text-amber-300">
                      <span className="font-bold">招牌必點：</span>
                      <span>{d.signatureDish}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                      {d.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate max-w-[160px] text-[11px]">
                    📍 {d.address}
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.name + ' ' + d.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>位置</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
