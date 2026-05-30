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
