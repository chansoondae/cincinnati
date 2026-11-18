import { HIGHLIGHTS, docent, type Docent } from "./notes";

export type Section = {
  id: string;
  chapter: number;
  ko: string;
  en: string;
  ja: string;
  floor: "1F" | "2F";
  route: number; // 관람 순서
};

export type Chapter = {
  no: number;
  ko: string;
  en: string;
  ja: string;
  intro: string;
};

export type Work = {
  no: number;
  section: string;
  artistKo: string;
  artist: string;
  titleKo: string;
  title: string;
  titleJa: string;
  year: string;
  mediumKo: string;
  medium: string;
  size: string;
  docent: Docent;
  highlight: boolean;
  image?: string;
};

export const exhibition = {
  titleKo: "신시내티 미술관전",
  subtitleKo: "미국으로 건너간 유럽의 보물",
  titleJa: "シンシナティ美術館展",
  subtitleJa: "アメリカに渡ったヨーロッパの至宝",
  titleEn: "European Masterpieces from the Cincinnati Art Museum",
  venueKo: "우에노노모리 미술관",
  venueJa: "上野の森美術館",
  period: "2026.10.10 (토) – 2027.1.10 (일)",
  site: "https://www.cincinnati-art2026.jp",
};

export const chapters: Chapter[] = [
  {
    no: 1,
    ko: "서장",
    en: "Introduction",
    ja: "序章",
    intro:
      "19세기부터 제1차 세계대전 직전까지 그려진 예술가들의 초상. 신고전주의에서 사실주의, 모더니즘으로 이어지는 초상 표현을 통해 예술가와 모델의 관계, 그리고 예술관의 변화를 살펴봅니다.",
  },
  {
    no: 2,
    ko: "전통",
    en: "Tradition",
    ja: "伝統",
    intro:
      "고전적 주제와 이상화된 인체를 다룬 아카데미 회화를 중심으로, 바르비종파와 사실주의의 등장과 함께 일상의 풍경과 서민의 삶으로 시선이 옮겨 가는 흐름을 보여줍니다.",
  },
  {
    no: 3,
    ko: "혁명",
    en: "Revolution",
    ja: "革命",
    intro:
      "19세기 중반 프랑스에서 전통 회화의 규범에 도전한 화가들. 쿠르베와 마네는 동시대의 삶에 눈을 돌렸고, 1874년 전시를 계기로 등장한 인상주의의 빛과 색채 탐구는 고흐와 고갱에게로 이어졌습니다.",
  },
  {
    no: 4,
    ko: "모더니즘",
    en: "Modernism",
    ja: "モダニズム",
    intro:
      "20세기 전반 유럽에서 태어난 다양한 표현. 입체주의는 형태를 해체하고, 야수주의와 표현주의는 대담한 색채로 감정과 내면을 드러냈습니다. 혁신은 추상으로 나아가는 한편, 구상 표현 또한 이어졌습니다.",
  },
];

export const sections: Section[] = [
  { id: "artist", chapter: 1, ko: "예술가의 모습", en: "The Artist", ja: "芸術家の姿", floor: "2F", route: 1 },
  { id: "academy", chapter: 2, ko: "아카데미", en: "The Academy", ja: "アカデミー", floor: "2F", route: 2 },
  { id: "landscape", chapter: 2, ko: "프랑스의 풍경화", en: "The French Landscape", ja: "フランスの風景画", floor: "2F", route: 3 },
  { id: "realism", chapter: 2, ko: "사실주의", en: "Realism", ja: "レアリスム", floor: "2F", route: 4 },
  { id: "rebels", chapter: 3, ko: "반역자들", en: "The Rebels", ja: "反逆者たち", floor: "2F", route: 5 },
  { id: "impressionism", chapter: 3, ko: "인상주의", en: "Impressionism", ja: "印象派", floor: "2F", route: 6 },
  { id: "post", chapter: 3, ko: "포스트 인상파", en: "After Impressionism", ja: "ポスト印象派", floor: "1F", route: 7 },
  { id: "expression", chapter: 4, ko: "표현주의", en: "Expression", ja: "表現主義", floor: "1F", route: 8 },
  { id: "abstraction", chapter: 4, ko: "추상", en: "Abstraction", ja: "抽象", floor: "1F", route: 9 },
  { id: "figuration", chapter: 4, ko: "구상", en: "Figuration", ja: "具象", floor: "1F", route: 10 },
];

const OC = ["캔버스에 유채", "Oil on canvas"] as const;
const OP = ["패널에 유채", "Oil on panel"] as const;
const BR = ["청동", "Bronze"] as const;

type Row = [
  no: number,
  section: string,
  artistKo: string,
  artist: string,
  titleKo: string,
  title: string,
  titleJa: string,
  year: string,
  medium: readonly [string, string],
  size: string,
];

const rows: Row[] = [
  // 1 서장 — 예술가의 모습
  [1, "artist", "조제프 시나르", "Joseph Chinard", "예술의 알레고리로서의 여성 흉상", "Portrait Bust of a Woman as an Allegory of the Arts", "諸芸術の寓意としての女性像", "ca. 1800–10", ["대리석", "Marble"], "79.0×38.0×29.0"],
  [2, "artist", "장오귀스트도미니크 앵그르", "Jean-Auguste-Dominique Ingres", "루이지 케루비니", "Luigi Cherubini", "ルイージ・ケルビーニ", "1841", OC, "83.2×71.1"],
  [3, "artist", "빌헬름 라이블", "Wilhelm Leibl", "조각가 토비아스 바이스의 초상", "Portrait of the Sculptor Tobias Weiß", "彫刻家トビアス・ヴァイスの肖像", "1866", OC, "69.6×57.2"],
  [4, "artist", "아메데오 모딜리아니", "Amedeo Modigliani", "막스 자코브", "Max Jacob", "マックス・ジャコブ", "ca. 1916–17", OC, "92.7×60.3"],
  // 2 전통 — 아카데미
  [5, "academy", "존 컨스터블", "John Constable", "워털루 다리", "Waterloo Bridge", "ウォータールー橋", "ca. 1820", OC, "55.1×77.9"],
  [6, "academy", "에른스트 페르디난트 외메", "Ernst Ferdinand Oehme", "달빛 아래 성이 있는 풍경", "Moonlit Landscape with a Castle", "月光に照らされた城のある風景", "1853", OC, "89.0×135.0"],
  [7, "academy", "카를 프리드리히 레싱", "Carl Friedrich Lessing", "남자의 초상", "Portrait of a Man", "男の肖像", "1838", OC, "43.2×33.7"],
  [8, "academy", "카를 프리드리히 레싱", "Carl Friedrich Lessing", "하르츠 성에서 탈출하는 황제 하인리히 4세", "Flight of Emperor Henry IV from the Harz Castle", "ハルツ城からの皇帝ハインリヒ4世の脱出", "1851", OC, "76.2×50.8"],
  [9, "academy", "토마 쿠튀르", "Thomas Couture", "피리 부는 사람의 두상, 습작", "Study, Head of a Pifferaro", "笛吹きの頭部、習作", "ca. 1876–77", OC, "48.3×37.8"],
  [10, "academy", "제임스 티소", "Jacques-Joseph James Tissot", "일본 공예품을 바라보는 여인들", "Young Women Looking at Japanese Articles", "日本の工芸品を眺める娘たち", "1869", OC, "70.5×50.2"],
  [11, "academy", "쥘 조제프 르페브르", "Jules Joseph Lefebvre", "습작", "Etude", "習作", "1868", ["판에 유채", "Oil on board"], "21.6×43.2"],
  [12, "academy", "장레옹 제롬", "Jean-Léon Gérôme", "노예 시장", "For Sale (The Slave Market)", "奴隷市場", "1871", OC, "74.9×59.7"],
  // 2 전통 — 프랑스 풍경화
  [13, "landscape", "샤를프랑수아 도비니", "Charles-François Daubigny", "질리외의 연못", "The Pond at Gylieu", "ジリューの池", "1853", OC, "62.2×99.7"],
  [14, "landscape", "장바티스트카미유 코로", "Jean-Baptiste-Camille Corot", "피에르퐁 성의 폐허", "Ruins of the Château de Pierrefonds", "ピエールフォン城の廃墟", "1840–45, 1866–67", OC, "74.5×106.4"],
  [15, "landscape", "장바티스트카미유 코로", "Jean-Baptiste-Camille Corot", "세브르의 하얀 집", "The Maison Blanche of Sèvres", "セーヴルの白い家", "1872", OC, "72.4×60.6"],
  [16, "landscape", "장바티스트카미유 코로", "Jean-Baptiste-Camille Corot", "포르마를리, 센강의 굽이", "The Bend in the Seine at Port-Marly", "ポール＝マルリ、セーヌ河の湾曲部", "1872", OC, "81.3×131.8"],
  [17, "landscape", "피에르에티엔 테오도르 루소", "Pierre-Étienne Théodore Rousseau", "아침 숲의 정경", "Woodland Scene, Morning", "朝の森の情景", "ca. 1850", OP, "30.8×53.0"],
  [18, "landscape", "피에르에티엔 테오도르 루소", "Pierre-Étienne Théodore Rousseau", "여름 저녁노을", "Summer Sunset", "夏の夕暮れ", "1866", OC, "76.8×95.9"],
  [19, "landscape", "나르시스 비르질 디아스 드 라 페냐", "Narcisse Virgile Diaz de la Peña", "계곡의 습지", "Valley Marsh", "渓谷の湿地", "1872", OP, "58.4×73.7"],
  [20, "landscape", "펠릭스 지엠", "Félix Ziem", "지중해 물가의 배", "Boat at the Edge of the Mediterranean", "地中海岸辺の舟", "ca. 1860s", OC, "61.0×78.7"],
  // 2 전통 — 사실주의
  [21, "realism", "장프랑수아 밀레", "Jean-François Millet", "일하러 가는 사람", "Going to Work", "仕事に出かける人", "1851–53", OC, "55.9×45.7"],
  [22, "realism", "장프랑수아 밀레", "Jean-François Millet", "바위에 앉은 양치기 소녀 (뜨개질하는 여인)", "Shepherdess Seated on a Rock (The Knitter)", "岩の上に座る女羊飼い（編み物をする女性）", "1855–56", OC, "35.6×27.9"],
  [23, "realism", "윌리앙아돌프 부그로", "William-Adolphe Bouguereau", "죽을 먹는 소녀", "Girl Eating Porridge", "粥を食べる少女", "1874", OC, "97.8×62.2"],
  [24, "realism", "안톤 마우버", "Anton Mauve", "양치기와 양 떼", "Shepherd and Sheep", "羊飼いと羊たち", "ca. 1880", OC, "61.0×86.4"],
  [25, "realism", "외젠 마리옹", "Eugène Marion", "보일러실", "The Boiler Room", "ボイラー室", "1886", OC, "86.5×126.0"],
  [26, "realism", "쥘 브르통", "Jules Breton", "마지막 꽃", "Last Flowers", "最後の花", "1890", OC, "101.6×81.3"],
  [27, "realism", "레옹 레르미트", "Léon Lhermitte", "농부 여인의 휴식", "Peasant Woman Resting", "農婦の休憩", "1903", OC, "55.9×40.6"],
  // 3 혁명 — 반역자들
  [28, "rebels", "에두아르 마네", "Édouard Manet", "경마장의 여인들", "Women at the Races", "競馬場の女性たち", "1866", OC, "42.2×32.1"],
  [29, "rebels", "폴 세잔", "Paul Cézanne", "빵과 달걀이 있는 정물", "Still Life with Bread and Eggs", "パンと卵のある静物", "1865", OC, "59.1×76.2"],
  [30, "rebels", "폴 세잔", "Paul Cézanne", "레몬이 있는 푸른 정물", "Still Life in Blue with Lemon", "レモンのある青みがかった静物", "ca. 1873–77", OC, "18.4×29.8"],
  [31, "rebels", "귀스타브 쿠르베", "Gustave Courbet", "겨울 숲", "The Forest in Winter", "冬の森", "1860", OC, "69.9×109.2"],
  [32, "rebels", "귀스타브 쿠르베", "Gustave Courbet", "쥐라산맥의 협곡", "A Gorge in the Jura", "ジュラ山脈の峡谷", "1873", OC, "45.7×55.9"],
  [33, "rebels", "귀스타브 쿠르베", "Gustave Courbet", "스위스 브베의 저녁노을", "Sunset, Vevey, Switzerland", "スイス、ヴヴェイの夕暮れ", "1874", OC, "65.4×81.3"],
  // 3 혁명 — 인상주의
  [34, "impressionism", "프레데리크 바지유", "Frédéric Bazille", "협죽도 (메릭의 테라스)", "Les Lauriers Roses (The Terrace at Meric)", "キョウチクトウ（メリックのテラス）", "1867", OC, "55.2×91.4"],
  [35, "impressionism", "카미유 피사로", "Camille Pissarro", "퐁투아즈 레르미타주의 양배추 수확", "The Cabbage Harvest, L’Hermitage, Pontoise", "ポントワーズ、エルミタージュ地区のキャベツの収穫", "1875", OC, "54.0×64.8"],
  [36, "impressionism", "카미유 피사로", "Camille Pissarro", "바랑주빌, 앙고 저택의 과수원과 닭", "The Orchard at the Manoir d’Ango with Hens, Varengeville", "ヴァランジュヴィル、アンゴ館の果樹園と鶏", "1899", OC, "66.0×54.6"],
  [37, "impressionism", "알프레드 시슬레", "Alfred Sisley", "부지발", "Bougival", "ブージヴァル", "1876", OC, "62.2×73.7"],
  [38, "impressionism", "알프레드 시슬레", "Alfred Sisley", "모레의 저녁노을", "Moret at Sunset", "モレの夕暮れ", "1888", OC, "73.7×92.1"],
  [39, "impressionism", "피에르오귀스트 르누아르", "Pierre-Auguste Renoir", "건지섬의 안개", "Fog on Guernsey", "ガーンジー島の霧", "1883", OC, "53.3×65.1"],
  [40, "impressionism", "클로드 모네", "Claude Monet", "벨일의 바위, 포르도무아", "Rocks at Belle-Île, Port-Domois", "ベリールの岩場、ポール＝ドモワ", "1886", OC, "81.3×64.8"],
  [41, "impressionism", "외젠루이 부댕", "Eugène-Louis Boudin", "트루빌", "Trouville", "トゥルーヴィル", "1891", OC, "39.1×54.3"],
  [42, "impressionism", "프란시스코 미랄레스 이 갈루프", "Francisco Miralles y Galup", "휴식", "Resting", "休息", "1881", OP, "40.6×45.7"],
  [43, "impressionism", "에드가 드가", "Edgar Degas", "타이츠 끈을 묶는 무희", "Dancer Fastening the String of her Tights", "タイツのひもを結ぶ踊り子", "ca. 1885–90", BR, "43.2×21.3×15.2"],
  [44, "impressionism", "에드가 드가", "Edgar Degas", "왼발로 선 제4포지션", "Fourth Position Front, on the Left Leg", "左脚で立つ第4ポジション", "ca. 1883–88", BR, "58.9×28.1×32.5"],
  // 3 혁명 — 후기 인상주의
  [45, "post", "빈센트 반 고흐", "Vincent van Gogh", "농부 여인의 두상", "Head of a Peasant Woman", "農婦の頭部", "ca. 1884", ["목판에 붙인 캔버스에 유채", "Oil on canvas on wood panel"], "37.8×24.4"],
  [46, "post", "빈센트 반 고흐", "Vincent van Gogh", "포플러 숲 속의 두 사람", "Undergrowth with Two Figures", "ポプラ林の中の二人", "1890", OC, "49.5×99.7"],
  [47, "post", "폴 고갱", "Paul Gauguin", "마하나 마아", "Mahana Ma’a", "マハナ・マア", "1892", OC, "55.2×30.2"],
  [48, "post", "클로드에밀 슈페네케르", "Claude-Émile Schuffenecker", "나무 아래 길", "The Road under the Trees", "樹下の道", "ca. 1895", OC, "73.3×60.3"],
  [49, "post", "피에르 보나르", "Pierre Bonnard", "파우누스가 있는 풍경", "Fauns in a Landscape", "ファウヌスのいる風景", "ca. 1910–15", OC, "46.4×60.3"],
  [50, "post", "에두아르 뷔야르", "Édouard Vuillard", "여성상 습작", "Portrait Sketch of a Woman", "女性像の習作", "ca. 1910", ["종이에 유채", "Oil on paper"], "53.0×34.0"],
  [51, "post", "에두아르 뷔야르", "Édouard Vuillard", "앵클부츠 끈을 묶다", "Lacing the Ankle Boots", "ショートブーツのひもを結ぶ", "1917–18", ["판지에 디스템퍼", "Distemper on cardstock"], "62.9×47.6"],
  [52, "post", "호아킨 소로야 이 바스티다", "Joaquín Sorolla y Bastida", "발렌시아 항구", "Port of Valencia", "バレンシア港", "1897", OC, "59.4×88.9"],
  [53, "post", "호아킨 소로야 이 바스티다", "Joaquín Sorolla y Bastida", "어린 손녀", "The Little Granddaughter", "小さな孫娘", "1908", OC, "81.3×105.4"],
  [54, "post", "테오 폰 브로크후젠", "Theo von Brockhusen", "인물과 나무가 있는 풍경", "Landscape with Figure and Trees", "人物と樹木のある風景", "ca. 1910", OC, "68.6×85.7"],
  [55, "post", "테오 폰 브로크후젠", "Theo von Brockhusen", "바움가르텐브뤼크의 하펠강 다리", "Bridge over the Havel at Baumgartenbrück", "バウムガルテンブリュックのハーフェル川に架かる橋", "ca. 1914", OC, "81.3×100.3"],
  // 4 모더니즘 — 표현주의
  [56, "expression", "모리스 위트릴로", "Maurice Utrillo", "샤펠 대로의 붉은 벽", "The Red Wall, Boulevard de la Chapelle", "シャペル大通りの赤い壁", "ca. 1910", OP, "47.6×62.2"],
  [57, "expression", "샤임 수틴", "Chaïm Soutine", "세레의 풍경", "View of Céret", "セレの風景", "ca. 1920–21", OC, "54.0×73.0"],
  [58, "expression", "오스카어 코코슈카", "Oskar Kokoschka", "몽테스키우페장사크 공작부인", "The Duchess of Montesquiou-Fezensac", "モンテスキュー＝フェザンサック公爵夫人", "1910", OC, "94.6×48.9"],
  [59, "expression", "오스카어 코코슈카", "Oskar Kokoschka", "루체른 호수 I", "Lake Lucerne I", "ルツェルン湖I", "1923", OC, "64.5×80.6"],
  [60, "expression", "라울 뒤피", "Raoul Dufy", "〈센강 하구, 르아브르〉를 위한 습작", "Sketch for L’Estuaire de la Seine, Le Havre", "「セーヌ河口、ル・アーヴル」のための習作", "ca. 1936–40", OP, "38.1×46.4"],
  [61, "expression", "조르주 루오", "Georges Rouault", "광대", "Clown", "道化", "ca. 1918–22", ["캔버스에 배접한 종이에 유채", "Oil on paper mounted on canvas"], "105.1×74.9"],
  [62, "expression", "조르주 루오", "Georges Rouault", "녹턴", "Nocturne", "ノクターン", "1939", ["캔버스에 배접한 판지에 유채", "Oil on cardboard mounted on canvas"], "71.8×99.7"],
  [63, "expression", "조르주 루오", "Georges Rouault", "꽃이 있는 정물", "Still Life with Flowers", "花のある静物", "ca. 1939", ["캔버스에 배접한 종이에 유채", "Oil on paper mounted on canvas"], "79.1×60.0"],
  [64, "expression", "알렉세이 폰 야블렌스키", "Alexej von Jawlensky", "앉아 있는 여인", "Seated Woman", "座る女", "1911", ["합성 판지에 유채", "Oil on composition board"], "71.4×50.2"],
  [65, "expression", "마르크 샤갈", "Marc Chagall", "붉은 수탉", "The Red Rooster (Le Coq rouge)", "赤い雄鶏", "1940", OC, "73.0×91.4"],
  // 4 모더니즘 — 추상
  [66, "abstraction", "파블로 피카소", "Pablo Picasso", "유리잔과 레몬이 있는 정물", "Still Life with Glass and Lemon", "グラスとレモンのある静物", "1910", OC, "74.0×101.1"],
  [67, "abstraction", "후안 그리스", "Juan Gris", "바이올린과 악보가 있는 정물", "Still Life with Violin and Music Sheet", "ヴァイオリンと楽譜のある静物", "1914", ["캔버스에 유채, 종이 콜라주", "Oil on paper collage on canvas"], "92.1×65.4"],
  [68, "abstraction", "알베르 글레이즈", "Albert Gleizes", "빌딩 건설", "Building Construction", "ビルの建設", "1917", ["메이소나이트에 유채", "Oil on masonite"], "101.6×76.2"],
  [69, "abstraction", "조르주 브라크", "Georges Braque", "정물", "Still Life", "静物", "ca. 1922", OC, "17.8×45.4"],
  [70, "abstraction", "조르주 브라크", "Georges Braque", "과일 그릇과 빵과 치즈", "Compote, Bread and Cheese", "コンポートとパンとチーズ", "1941", ["캔버스에 유채, 모래", "Oil and sand on canvas"], "35.9×120.0"],
  [71, "abstraction", "장 메챙제", "Jean Metzinger", "정물", "Still Life", "静物", "1919", OC, "116.2×80.6"],
  [72, "abstraction", "테오 판 두스뷔르흐", "Theo van Doesburg", "컴포지션 XIII의 변주", "Variation on Composition XIII", "コンポジションXIII のヴァリエーション", "1918", OP, "29.8×29.8"],
  [73, "abstraction", "한스(장) 아르프", "Hans (Jean) Arp", "바퀴", "Wheel", "車輪", "1930", ["종이에 유채", "Oil on paper"], "104.8×75.2"],
  [74, "abstraction", "페르낭 레제", "Fernand Léger", "석양에 물든 나무들", "Trees in the Setting Sun", "夕日に照らされる木々", "1952", OC, "65.4×54.6"],
  [75, "abstraction", "피에르 술라주", "Pierre Soulages", "추상", "Abstraction", "抽象", "1954", OC, "131.0×97.5"],
  // 4 모더니즘 — 구상
  [76, "figuration", "페르디난트 호들러", "Ferdinand Hodler", "성스러운 시간", "The Sacred Hour", "聖なる時間", "ca. 1907–11", OC, "182.9×226.1"],
  [77, "figuration", "마리 로랑생", "Marie Laurencin", "피아노 앞의 여인들", "Two Women at the Piano", "ピアノの前の女性たち", "ca. 1913", OC, "100.3×81.3"],
  [78, "figuration", "파블로 피카소", "Pablo Picasso", "여인의 두상", "Head of a Woman", "女性像", "1922", ["목판에 유채", "Oil on wood panel"], "61.2×50.0"],
  [79, "figuration", "파블로 피카소", "Pablo Picasso", "추상 (두상)", "Abstraction (Head)", "抽象（頭部）", "1930", ["목판에 유채", "Oil on wood panel"], "62.2×46.4"],
  [80, "figuration", "앙드레 드랭", "André Derain", "젊은 여인", "Head of a Girl", "若い女性", "ca. 1925", OC, "66.0×55.7"],
  [81, "figuration", "앙드레 드랭", "André Derain", "세 개의 바구니", "Three Baskets", "3つのバスケット", "1939–40", OC, "110.5×110.8"],
  [82, "figuration", "로테 라저슈타인", "Lotte Laserstein", "앉아 있는 누드 (트라우테 로제)", "Seated Nude (Traute Rose)", "座る裸婦（トラウテ・ローズ）", "ca. 1930", OC, "69.8×55.9"],
  [83, "figuration", "마리노 마리니", "Marino Marini", "말", "Cavallo (Horse)", "馬", "1950", BR, "73.7×68.6×21.0"],
  [84, "figuration", "알베르토 자코메티", "Alberto Giacometti", "남자의 흉상 (키아벤나 I)", "Bust of a Man (Chiavenna I)", "男の胸部（キアヴェンナI）", "1964", BR, "41.3×20.3×15.2"],
];

export const works: Work[] = rows.map(
  ([no, section, artistKo, artist, titleKo, title, titleJa, year, [mediumKo, medium], size]) => ({
    no, section, artistKo, artist, titleKo, title, titleJa, year, mediumKo, medium, size,
    docent: docent[no],
    highlight: HIGHLIGHTS.has(no),
  }),
);
