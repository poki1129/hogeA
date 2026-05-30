/**
 * =============================================================================
 * キャラクター定義（データ駆動）
 * =============================================================================
 *
 * ◆ 追加はとても簡単です ◆
 *   下の `characters` 配列に defineCharacter({...}) を1つ足すだけ。
 *   必須は「id」「name」「画像1枚（image）」の3つだけ。
 *   他の項目は省略OK（自動で空欄になります）。
 *
 *   最小例:
 *     defineCharacter({ id: "05", name: "新キャラ", image: "/images/characters/05/main.jpg" })
 *
 *   ファイル末尾に「コピペ用テンプレート」を用意しています。
 *
 * ◆ 画像について ◆
 *   - ローカル画像: public/images/characters/05/main.jpg → "/images/characters/05/main.jpg"
 *   - 外部URL（Unsplash等）も可（next.config.ts の remotePatterns 参照）
 *   - `image` を1枚指定すれば、背景・立ち絵・サムネすべてに使い回します。
 *     個別に変えたいときだけ imageBg / imageMain / imageThumb を指定。
 *
 * 詳細ページは /characters/[id] が自動生成されます。
 * =============================================================================
 */

export type Character = {
  /** URL スラッグ（例: "01" → /characters/01） */
  id: string;
  /** 表示名 */
  name: string;
  /** 読み（ひらがな・カタカナなど） */
  nameReading: string;
  /** トップヒーロー用の短い一行 */
  shortTagline: string;
  /** トップに載せる短い説明 */
  heroDescription: string;
  /** 年齢（未設定なら空文字で非表示） */
  age: number | "";
  /** 表示用（例: "162cm"） */
  height: string;
  likes: string;
  catchphrase: string;
  /** 詳細ページの紹介文（段落は \n\n で区切る） */
  introduction: string;
  /** トップ背景（全画面） */
  imageBg: string;
  /** 詳細ページ メイン立ち絵など */
  imageMain: string;
  /** 下部サムネ（未指定時は imageBg を使用） */
  imageThumb?: string;
  /** ギャラリー（任意枚数） */
  gallery: string[];
};

/**
 * 入力用の型。必須は id / name と画像のみ。
 * `image` を渡すと未指定の各画像欄に使い回されます。
 */
export type CharacterInput = {
  id: string;
  name: string;
  /** 共通で使う代表画像（背景・立ち絵・サムネのフォールバック） */
  image?: string;
  nameReading?: string;
  shortTagline?: string;
  heroDescription?: string;
  age?: number | "";
  height?: string;
  likes?: string;
  catchphrase?: string;
  introduction?: string;
  imageBg?: string;
  imageMain?: string;
  imageThumb?: string;
  gallery?: string[];
};

const PLACEHOLDER_IMAGE = "/images/characters/placeholder.svg";

/**
 * 省略された項目を補完して完全な Character を作るヘルパー。
 * これのおかげで、最小限の記述でキャラを追加できます。
 */
export function defineCharacter(input: CharacterInput): Character {
  const fallback = input.image ?? input.imageMain ?? input.imageBg ?? PLACEHOLDER_IMAGE;
  return {
    id: input.id,
    name: input.name,
    nameReading: input.nameReading ?? "",
    shortTagline: input.shortTagline ?? "",
    heroDescription: input.heroDescription ?? "",
    age: input.age ?? "",
    height: input.height ?? "",
    likes: input.likes ?? "",
    catchphrase: input.catchphrase ?? "",
    introduction: input.introduction ?? "",
    imageBg: input.imageBg ?? fallback,
    imageMain: input.imageMain ?? fallback,
    imageThumb: input.imageThumb ?? input.imageBg ?? fallback,
    gallery: input.gallery ?? [],
  };
}

export const characters: Character[] = [
  defineCharacter({
    id: "01",
    name: "白夜 澪",
    nameReading: "びゃくや みお",
    shortTagline: "静寂に咲く、境界線の守り人",
    heroDescription: "月明かりの下でだけ、本当の自分を見せる。",
    age: 19,
    height: "162cm",
    likes: "夜更かし、古い写真、甘い紅茶",
    catchphrase: "光が強すぎるなら、影で息をしよう。",
    introduction:
      "表向きは大学に通う普通の学生。裏では「境界」を調整する役目を担い、人と非人のあいだに立つ。\n\n感情表現は少なめだが、信頼した相手には意外な一面を見せる。フィギュア化を想定したシルエットと、衣装のレイヤー感を意識したデザイン。",
    imageBg:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2000&q=80",
    imageMain:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=80",
    imageThumb:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=80",
    ],
  }),
  defineCharacter({
    id: "02",
    name: "緋野 灯",
    nameReading: "ひの あかり",
    shortTagline: "都市の灯りを纏う、疾走の記録者",
    heroDescription: "ネオンに溶けない温度だけを、シャッターに閉じ込める。",
    age: 22,
    height: "168cm",
    likes: "フィルムカメラ、高架下の風、エナジードリンク",
    catchphrase: "鮮やかさは、記憶のあとからついてくる。",
    introduction:
      "夜の街を撮るフリーカメラマン。光の反射と速度感をテーマに、キャラクターの輪郭をシャープにまとめている。\n\nアクセサリとメッシュ素材で近未来感を出しつつ、表情の柔らかさで親しみやすさを担保したキャラクター。",
    imageBg:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=2000&q=80",
    imageMain:
      "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80",
    ],
  }),
  defineCharacter({
    id: "03",
    name: "蒼井 奏",
    nameReading: "あおい かなで",
    shortTagline: "音の粒子を編む、無音の作曲家",
    heroDescription: "誰にも聞こえない旋律を、世界の隙間に置いていく。",
    age: 17,
    height: "155cm",
    likes: "ヘッドホン、図書館、雨音の録音",
    catchphrase: "沈黙は、未完成の楽譜。",
    introduction:
      "音楽家を目指す高校生。実際に鳴らすのではなく「音の気配」を作品化するという独自の世界観を持つ。\n\n落ち着いた配色と細いラインで知的な印象。ギャラリーでは表情差分や衣装バリエーションを想定。",
    imageBg:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=2000&q=80",
    imageMain:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531123891927-24f296dc43d9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499557354967-2b2d8910acca?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60fea?auto=format&fit=crop&w=1200&q=80",
    ],
  }),
  defineCharacter({
    id: "04",
    name: "hico",
    nameReading: "ハンバーグ師匠",
    shortTagline: "ハンバーグください",
    heroDescription: "ハンバーグ",
    age: 5,
    height: "50cm",
    likes: "ヘッドホン、図書館",
    catchphrase: "おなかすいた",
    introduction: "東京までハンバーグ届けてください私今日お刺身だけだったんです",
    image: "/images/characters/01/character01-bg.jpg",
    gallery: [
      "/images/characters/01/character01-bg.jpg",
      "/images/characters/01/character01-bg.jpg",
      "/images/characters/01/character01-bg.jpg",
    ],
  }),
  defineCharacter({
    id: "05",
    name: "hico",
    nameReading: "ハンバーグ師匠",
    shortTagline: "ハンバーグください",
    heroDescription: "ハンバーグ",
    age: 5,
    height: "50cm",
    likes: "ヘッドホン、図書館",
    catchphrase: "おなかすいた",
    introduction: "東京までハンバーグ届けてください私今日お刺身だけだったんです",
    image: "/images/characters/02/character02-bg.jpg",
    gallery: [
      "/images/characters/02/character02-bg.jpg",
      "/images/characters/02/character02-bg.jpg",
      "/images/characters/02/character02-bg.jpg",
    ],
  }),
  defineCharacter({
    id: "06",
    name: "hico",
    nameReading: "ハンバーグ師匠",
    shortTagline: "ハンバーグください",
    heroDescription: "ハンバーグ",
    age: 5,
    height: "50cm",
    likes: "ヘッドホン、図書館",
    catchphrase: "おなかすいた",
    introduction: "東京までハンバーグ届けてください私今日お刺身だけだったんです",
    image: "/images/characters/03/character02-bg.jpg",
    gallery: [
      "/images/characters/03/character02-bg.jpg",
      "/images/characters/03/character02-bg.jpg",
      "/images/characters/03/character02-bg.jpg",
    ],
  }),
  defineCharacter({
    id: "07",
    name: "hico",
    nameReading: "ハンバーグ師匠",
    shortTagline: "ハンバーグください",
    heroDescription: "ハンバーグ",
    age: 5,
    height: "50cm",
    likes: "ヘッドホン、図書館",
    catchphrase: "おなかすいた",
    introduction: "東京までハンバーグ届けてください私今日お刺身だけだったんです",
    image: "/images/characters/04/character02-bg.jpg",
    gallery: [
      "/images/characters/04/character02-bg.jpg",
      "/images/characters/04/character02-bg.jpg",
      "/images/characters/04/character02-bg.jpg",
    ],
  }),
  defineCharacter({
    id: "08",
    name: "hico",
    nameReading: "ハンバーグ師匠",
    shortTagline: "ハンバーグください",
    heroDescription: "ハンバーグ",
    age: 5,
    height: "50cm",
    likes: "ヘッドホン、図書館",
    catchphrase: "おなかすいた",
    introduction: "東京までハンバーグ届けてください私今日お刺身だけだったんです",
    image: "/images/characters/05/character02-bg.jpg",
    gallery: [
      "/images/characters/05/character02-bg.jpg",
      "/images/characters/05/character02-bg.jpg",
      "/images/characters/05/character02-bg.jpg",
    ],
  }),
  defineCharacter({
    id: "09",
    name: "hico",
    nameReading: "ハンバーグ師匠",
    shortTagline: "ハンバーグください",
    heroDescription: "ハンバーグ",
    age: 5,
    height: "50cm",
    likes: "ヘッドホン、図書館",
    catchphrase: "おなかすいた",
    introduction: "東京までハンバーグ届けてください私今日お刺身だけだったんです",
    image: "/images/characters/06/character02-bg.jpg",
    gallery: [
      "/images/characters/06/character02-bg.jpg",
      "/images/characters/06/character02-bg.jpg",
      "/images/characters/06/character02-bg.jpg",
    ],
  }),
  defineCharacter({
    id: "10",
    name: "hico",
    nameReading: "ハンバーグ師匠",
    shortTagline: "ハンバーグください",
    heroDescription: "ハンバーグ",
    age: 5,
    height: "50cm",
    likes: "ヘッドホン、図書館",
    catchphrase: "おなかすいた",
    introduction: "東京までハンバーグ届けてください私今日お刺身だけだったんです",
    image: "/images/characters/07/character02-bg.jpg",
    gallery: [
      "/images/characters/07/character02-bg.jpg",
      "/images/characters/07/character02-bg.jpg",
      "/images/characters/07/character02-bg.jpg",
    ],
  }),
  defineCharacter({
    id: "11",
    name: "hico",
    nameReading: "ハンバーグ師匠",
    shortTagline: "ハンバーグください",
    heroDescription: "ハンバーグ",
    age: 5,
    height: "50cm",
    likes: "ヘッドホン、図書館",
    catchphrase: "おなかすいた",
    introduction: "東京までハンバーグ届けてください私今日お刺身だけだったんです",
    image: "/images/characters/08/character02-bg.jpg",
    gallery: [
      "/images/characters/08/character02-bg.jpg",
      "/images/characters/08/character02-bg.jpg",
      "/images/characters/08/character02-bg.jpg",
    ],
  }),
  defineCharacter({
    id: "12",
    name: "hico",
    nameReading: "ハンバーグ師匠",
    shortTagline: "ハンバーグください",
    heroDescription: "ハンバーグ",
    age: 5,
    height: "50cm",
    likes: "ヘッドホン、図書館",
    catchphrase: "おなかすいた",
    introduction: "東京までハンバーグ届けてください私今日お刺身だけだったんです",
    image: "/images/characters/09/character02-bg.jpg",
    gallery: [
      "/images/characters/09/character02-bg.jpg",
      "/images/characters/09/character02-bg.jpg",
      "/images/characters/09/character02-bg.jpg",
    ],
  }),
  defineCharacter({
    id: "13",
    name: "hico",
    nameReading: "ハンバーグ師匠",
    shortTagline: "ハンバーグください",
    heroDescription: "ハンバーグ",
    age: 5,
    height: "50cm",
    likes: "ヘッドホン、図書館",
    catchphrase: "おなかすいた",
    introduction: "東京までハンバーグ届けてください私今日お刺身だけだったんです",
    image: "/images/characters/10/character02-bg.jpg",
    gallery: [
      "/images/characters/10/character02-bg.jpg",
      "/images/characters/10/character02-bg.jpg",
      "/images/characters/10/character02-bg.jpg",
    ],
  }),
  defineCharacter({
    id: "14",
    name: "hico",
    nameReading: "ハンバーグ師匠",
    shortTagline: "ハンバーグください",
    heroDescription: "ハンバーグ",
    age: 5,
    height: "50cm",
    likes: "ヘッドホン、図書館",
    catchphrase: "おなかすいた",
    introduction: "東京までハンバーグ届けてください私今日お刺身だけだったんです",
    image: "/images/characters/11/character02-bg.jpg",
    gallery: [
      "/images/characters/11/character02-bg.jpg",
      "/images/characters/11/character02-bg.jpg",
      "/images/characters/11/character02-bg.jpg",
    ],
  }),
  defineCharacter({
    id: "15",
    name: "hico",
    nameReading: "ハンバーグ師匠",
    shortTagline: "ハンバーグください",
    heroDescription: "ハンバーグ",
    age: 5,
    height: "50cm",
    likes: "ヘッドホン、図書館",
    catchphrase: "おなかすいた",
    introduction: "東京までハンバーグ届けてください私今日お刺身だけだったんです",
    image: "/images/characters/12/character02-bg.jpg",
    gallery: [
      "/images/characters/12/character02-bg.jpg",
      "/images/characters/12/character02-bg.jpg",
      "/images/characters/12/character02-bg.jpg",
    ],
  }),
  defineCharacter({
    id: "16",
    name: "hico",
    nameReading: "ハンバーグ師匠",
    shortTagline: "ハンバーグください",
    heroDescription: "ハンバーグ",
    age: 5,
    height: "50cm",
    likes: "ヘッドホン、図書館",
    catchphrase: "おなかすいた",
    introduction: "東京までハンバーグ届けてください私今日お刺身だけだったんです",
    image: "/images/characters/13/character02-bg.jpg",
    gallery: [
      "/images/characters/13/character02-bg.jpg",
      "/images/characters/13/character02-bg.jpg",
      "/images/characters/13/character02-bg.jpg",
    ],
  }),

  // ===========================================================================
  // ▼▼▼ コピペ用テンプレート ▼▼▼
  // 下のコメントを外して中身を書き換えれば、新しいキャラクターを追加できます。
  // 必須は id / name / image の3つだけ。他は省略OK。
  // ===========================================================================
  // defineCharacter({
  //   id: "05",                                   // 必須: URL用の番号やスラッグ（重複NG）
  //   name: "新しいキャラ",                         // 必須: 表示名
  //   image: "/images/characters/05/main.jpg",    // 必須: 代表画像（背景・立ち絵・サムネ共通）
  //   nameReading: "あたらしいきゃら",              // 任意
  //   shortTagline: "ひとこと紹介",                 // 任意
  //   heroDescription: "トップに出る短い説明",       // 任意
  //   age: 20,                                     // 任意
  //   height: "160cm",                             // 任意
  //   likes: "好きなもの",                          // 任意
  //   catchphrase: "キャッチコピー",                // 任意
  //   introduction: "詳細ページの紹介文。\n\n段落は空行で区切れます。", // 任意
  //   // imageBg / imageMain / imageThumb を個別指定したい場合のみ:
  //   // imageBg: "/images/characters/05/bg.jpg",
  //   // imageMain: "/images/characters/05/main.jpg",
  //   gallery: [                                   // 任意: 枚数自由
  //     "/images/characters/05/g1.jpg",
  //     "/images/characters/05/g2.jpg",
  //   ],
  // }),
];

export function getCharacterById(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}

export function getAllGalleryImages(): { src: string; characterName: string; id: string }[] {
  const out: { src: string; characterName: string; id: string }[] = [];
  for (const c of characters) {
    for (const src of c.gallery) {
      out.push({ src, characterName: c.name, id: c.id });
    }
  }
  return out;
}
