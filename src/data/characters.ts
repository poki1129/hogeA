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
  /** 表示名（Name） */
  name: string;
  /** トップヒーロー用の短い一行 */
  shortTagline: string;
  /** トップに載せる短い説明 */
  heroDescription: string;

  // --- 詳細ページ（DETAIL）の項目。未設定（空文字）の行は自動で非表示になります ---
  /** VRChat Age（VRChatでの年数など） */
  vrchatAge: string;
  /** Skills（特技・できること） */
  skills: string;
  /** Likes / Dislikes（好き / 苦手） */
  likesDislikes: string;
  /** Contact / SNS（連絡先・SNSリンクなど） */
  contactSns: string;
  /** Message（自由記述の長文。段落は \n\n で区切る） */
  message: string;

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
  shortTagline?: string;
  heroDescription?: string;
  vrchatAge?: string;
  skills?: string;
  likesDislikes?: string;
  contactSns?: string;
  message?: string;
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
    shortTagline: input.shortTagline ?? "",
    heroDescription: input.heroDescription ?? "",
    vrchatAge: input.vrchatAge ?? "",
    skills: input.skills ?? "",
    likesDislikes: input.likesDislikes ?? "",
    contactSns: input.contactSns ?? "",
    message: input.message ?? "",
    imageBg: input.imageBg ?? fallback,
    imageMain: input.imageMain ?? fallback,
    imageThumb: input.imageThumb ?? input.imageBg ?? fallback,
    gallery: input.gallery ?? [],
  };
}

export const characters: Character[] = [
  defineCharacter({
    id: "01",
    name: "美咲",
    shortTagline: "今宵も、あなたのためのいちばん長いグラスを。",
    heroDescription: "店を代表する華。場の空気をふわりと変える、王道の銀座スタイル。",
    vrchatAge: "在籍 6年目",
    skills: "シャンパンコール / 場を仕切る気配り / 日本酒の銘柄当て",
    likesDislikes: "好き: 静かに飲める雨の夜 / 苦手: 約束を破られること",
    contactSns: "X: @misaki_ginza",
    message:
      "はじめまして、美咲です。銀座の片隅で、あなたの一日のおわりにそっと寄り添えたら。\n\n肩書きも忙しさも、ここに置いていってください。今夜だけは、いちばん贅沢な時間の使い方を。",
    image: "/images/characters/char01.png",
    gallery: [
      "/images/characters/char01.png",
      "/images/characters/char01.png",
      "/images/characters/char01.png",
    ],
  }),
  defineCharacter({
    id: "02",
    name: "玲奈",
    shortTagline: "余計な言葉は、いりません。",
    heroDescription: "凛としたクールビューティ。少ない言葉で核心を突く、大人の聞き手。",
    vrchatAge: "在籍 4年目",
    skills: "ウイスキーの語り / 沈黙を心地よくする間合い / 葉巻のセレクト",
    likesDislikes: "好き: 角の効いたロック / 苦手: 騒がしいだけの席",
    contactSns: "X: @rena_lounge",
    message:
      "玲奈です。たくさん話す夜より、ちゃんと黙れる夜のほうが、私は好き。\n\n無理に盛り上げたりはしません。あなたのペースで、ゆっくり。それで十分、いい夜になります。",
    image: "/images/characters/char02.png",
    gallery: [
      "/images/characters/char02.png",
      "/images/characters/char02.png",
      "/images/characters/char02.png",
    ],
  }),
  defineCharacter({
    id: "03",
    name: "彩花",
    shortTagline: "おかえりなさい、を言わせてください。",
    heroDescription: "ふんわり癒し系。隣にいるだけで肩の力が抜ける、看板の妹分。",
    vrchatAge: "在籍 3年目",
    skills: "聞き上手 / 甘いカクテル作り / さりげない気遣い",
    likesDislikes: "好き: 甘いシャンパン / 苦手: 終電を気にする時間",
    contactSns: "X: @ayaka_bar",
    message:
      "彩花って言います。お仕事おつかれさまでした、まずは一杯どうぞ。\n\n難しいお話はわからないけれど、聞くのは得意です。今日あったこと、ぜんぶ置いていってくださいね。",
    image: "/images/characters/char03.png",
    gallery: [
      "/images/characters/char03.png",
      "/images/characters/char03.png",
      "/images/characters/char03.png",
    ],
  }),
  defineCharacter({
    id: "04",
    name: "詩織",
    shortTagline: "知的な夜が、いちばん酔える。",
    heroDescription: "文学と経済を語れる才媛。会話の引き出しで魅せる、大人の知性派。",
    vrchatAge: "在籍 5年目",
    skills: "ワインのペアリング / 教養あふれる雑談 / お客様の名前と好みを覚える",
    likesDislikes: "好き: ボルドーの古酒 / 苦手: 中身のないお世辞",
    contactSns: "X: @shiori_salon",
    message:
      "詩織と申します。お酒の肴は、料理よりも会話だと思っています。\n\n今日読んだ本でも、相場の話でも、なんでも。あなたの世界を少しだけ覗かせてくださると嬉しいです。",
    image: "/images/characters/char04.png",
    gallery: [
      "/images/characters/char04.png",
      "/images/characters/char04.png",
      "/images/characters/char04.png",
    ],
  }),
  defineCharacter({
    id: "05",
    name: "莉子",
    shortTagline: "ちょっとだけ、いじわるしてもいい？",
    heroDescription: "小悪魔系の人気株。絶妙な距離感で通わせる、駆け引き上手。",
    vrchatAge: "在籍 2年目",
    skills: "おねだり / 盛り上げのタイミング / 写真映えするグラスの持ち方",
    likesDislikes: "好き: 派手なシャンパンタワー / 苦手: つまらないと言われること",
    contactSns: "X: @riko_night",
    message:
      "莉子だよ。来てくれて、ちょっと嬉しい……なんて言ったら、また来てくれる？\n\n楽しいことしか起きない夜にするから。今日はわたしのこと、いちばんに構ってね。",
    image: "/images/characters/char05.png",
    gallery: [
      "/images/characters/char05.png",
      "/images/characters/char05.png",
      "/images/characters/char05.png",
    ],
  }),
  defineCharacter({
    id: "06",
    name: "麗",
    shortTagline: "夜の深さを、知っている人へ。",
    heroDescription: "妖艶な大人の女。落ち着いた所作で魅せる、店の隠れた支柱。",
    vrchatAge: "在籍 9年目",
    skills: "極上の聞き役 / 葉巻と酒の合わせ / どんな客層も和ませる包容力",
    likesDislikes: "好き: 灯りを落とした遅い時間 / 苦手: 急かされること",
    contactSns: "X: @urara_ginza",
    message:
      "麗です。永くこの街で生きてきました。だから、たいていの夜は受けとめられます。\n\n強がらなくていい場所が、ひとつくらいあってもいいでしょう。ここでは、どうぞ素のあなたで。",
    image: "/images/characters/char06.png",
    gallery: [
      "/images/characters/char06.png",
      "/images/characters/char06.png",
      "/images/characters/char06.png",
    ],
  }),
  defineCharacter({
    id: "7",
    name: "真由",
    shortTagline: "とにかく、笑って帰ってほしいの。",
    heroDescription: "店いちばんの盛り上げ役。明るさで場をさらう、太陽のような存在。",
    vrchatAge: "在籍 3年目",
    skills: "カラオケ / 乾杯の音頭 / 一瞬で打ち解ける距離の詰め方",
    likesDislikes: "好き: みんなで騒ぐ金曜の夜 / 苦手: しんみりしたお別れ",
    contactSns: "X: @mayu_smile",
    message:
      "真由でーす！　会えて嬉しい、はやく乾杯しましょ！\n\n難しいことは抜きにして、今日はとことん笑いましょうね。帰り道、ちょっと元気になってたら大成功です。",
    image: "/images/characters/char07.png",
    gallery: [
      "/images/characters/char07.png",
      "/images/characters/char07.png",
      "/images/characters/char07.png",
    ],
  }),

  // ===========================================================================
  // ▼▼▼ コピペ用テンプレート ▼▼▼
  // 下のコメントを外して中身を書き換えれば、新しいキャラクターを追加できます。
  // 必須は id / name / image の3つだけ。他は省略OK。
  // ===========================================================================
  // defineCharacter({
  //   id: "08",                                   // 必須: URL用の番号やスラッグ（重複NG）
  //   name: "新しいキャスト",                       // 必須: 表示名（源氏名）
  //   image: "/images/characters/08/main.jpg",    // 必須: 代表画像（背景・立ち絵・サムネ共通）
  //   shortTagline: "ひとこと紹介",                 // 任意（トップ用）
  //   heroDescription: "トップに出る短い説明",       // 任意（トップ用）
  //   // --- 以下は DETAIL ページの項目（空欄の行は自動で非表示） ---
  //   vrchatAge: "在籍 1年目",                      // VRChat Age
  //   skills: "特技",                               // Skills
  //   likesDislikes: "好き: ○○ / 苦手: △△",        // Likes / Dislikes
  //   contactSns: "X: @your_id",                   // Contact / SNS
  //   message: "自由記述のメッセージ。\n\n段落は空行で区切れます。", // Message
  //   // imageBg / imageMain / imageThumb を個別指定したい場合のみ:
  //   // imageBg: "/images/characters/08/bg.jpg",
  //   // imageMain: "/images/characters/08/main.jpg",
  //   gallery: [                                   // 任意: 枚数自由
  //     "/images/characters/08/g1.jpg",
  //     "/images/characters/08/g2.jpg",
  //   ],
  // }),
];

export function getCharacterById(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}

/** 表示名（name）からキャラクターを引く。スケジュールの名前照合などに使用 */
export function getCharacterByName(name: string): Character | undefined {
  return characters.find((c) => c.name === name);
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
