/**
 * トップランディング（/）右カラム用のデータ
 * =============================================================================
 * ◆◆ スケジュールの編集はここだけ ◆◆
 *   下の `topSchedule` 配列を書き換えるだけで、トップの SCHEDULE が変わります。
 *   { } が 1 行（1 予定）。上から順に表示されます。
 *
 *   ・予定を増やす  → { ... }, の行をコピーして増やす（行数は何件でもOK）
 *   ・予定を減らす  → 不要な { ... }, の行を消す
 *   ・並び順を変える → 行を上下に入れ替える
 *
 *   ◆ キャストの指定方法は 2 通り（どちらでもOK）◆
 *     (A) id で指定（おすすめ）… characters.ts の id を書く。例: { date:"6/1", id:"01" }
 *          → 名前は自動で表示され、改名しても自動追従。クリックで本人ページへ遷移。
 *     (B) name で指定 … 名前を直接書く。例: { date:"6/1", name:"美咲" }
 *          → characters.ts の name と一致すれば自動でリンクされます。
 *     ※ id と name を両方書くと、name が表示名として優先されます（id はリンク用）。
 *
 *   各項目の意味:
 *     date   … 日付（必須）         例: "6/1"
 *     time   … 時間帯（省略可）     例: "21:00～24:00"  ← 書かなければ非表示
 *     id     … キャラID（推奨）     例: "01"            ← characters.ts の id
 *     name   … キャスト名           例: "美咲"          ← id を書かない場合は必須
 *     status … 状態（省略可）       例: "出勤" / "店長" / "GUEST" ← 書かなければ非表示
 *
 *   ※ 打ち間違い（存在しない id / name）は、開発サーバー起動中のターミナルに
 *     警告が出ます。表示が変なときはターミナルのメッセージを確認してください。
 *   ※ 件数が多くて入りきらない場合は、SCHEDULE 内で自動的にスクロールします
 *     （下部の SELECT CHARACTER には干渉しません）。
 * =============================================================================
 */

import { characters, getCharacterById, getCharacterByName } from "./characters";

export type TopScheduleItem = {
  /** 日付（例: "6/1"）。必須 */
  date: string;
  /** 時間帯（例: "21:00～24:00"）。省略可 */
  time?: string;
  /** キャラID（characters.ts の id）。指定すると名前は自動補完＆クリックで遷移 */
  id?: string;
  /** キャスト名。id を書かない場合は必須。id と併記した場合は表示名として優先 */
  name?: string;
  /** 状態（例: "出勤"）。省略可 */
  status?: string;
};

/** スケジュール一覧（上から順に表示）。ここを自由に編集してください */
export const topSchedule: TopScheduleItem[] = [
  { date: "6/1", time: "20:00～26:00", id: "01", status: "出勤" },
  { date: "6/1", time: "20:00～26:00", id: "02", status: "出勤" },
  { date: "6/1", time: "21:00～26:00", id: "03" },
  { date: "6/2", time: "20:00～26:00", id: "04", status: "出勤" },
  { date: "6/2", time: "21:00～26:00", id: "05" },
  { date: "6/3", time: "20:00～26:00", id: "06", status: "店長" },
  { date: "6/3", time: "21:00～25:00", id: "7", status: "出勤" },
  { date: "6/5", time: "20:00～26:00", id: "01", status: "GUEST" },
  { date: "6/6", time: "21:00～26:00", id: "02" },
];

/**
 * 表示用に解決済みのスケジュール項目。
 * id / name からキャラを引き当て、表示名とリンク先 id を確定します。
 */
export type ResolvedScheduleItem = {
  date: string;
  time?: string;
  /** 画面に表示する名前 */
  name: string;
  status?: string;
  /** 対応キャラが見つかった場合の id（クリックで /spotlight?id= に遷移） */
  characterId?: string;
};

/**
 * topSchedule を画面表示用に解決する。
 * - id があれば characters.ts から名前を補完
 * - name だけなら、その名前で一致するキャラを探してリンク先を補完
 * UI 側はこの関数の戻り値だけを使えばよい。
 */
export function getSchedule(): ResolvedScheduleItem[] {
  return topSchedule.map((row) => {
    const matched =
      (row.id ? getCharacterById(row.id) : undefined) ??
      (row.name ? getCharacterByName(row.name) : undefined);
    return {
      date: row.date,
      time: row.time,
      name: row.name ?? matched?.name ?? "(名前未設定)",
      status: row.status,
      characterId: matched?.id,
    };
  });
}

/**
 * 入力ミスの早期発見用チェック（開発時のみ実行）。
 * 重大ではない警告を文字列の配列で返す。
 */
function collectDataIssues(): string[] {
  const issues: string[] = [];

  const idCount = new Map<string, number>();
  for (const c of characters) {
    idCount.set(c.id, (idCount.get(c.id) ?? 0) + 1);
  }
  for (const [id, count] of idCount) {
    if (count > 1) issues.push(`キャラクターIDが重複しています: "${id}"（${count}件）`);
  }

  topSchedule.forEach((row, i) => {
    const line = `SCHEDULE ${i + 1}行目`;
    if (!row.date) issues.push(`${line}: date（日付）が空です`);
    if (!row.id && !row.name) {
      issues.push(`${line}: id か name のどちらかを指定してください`);
      return;
    }
    if (row.id && !getCharacterById(row.id)) {
      issues.push(`${line}: id "${row.id}" に一致するキャラがいません（characters.ts を確認）`);
    }
    if (!row.id && row.name && !getCharacterByName(row.name)) {
      issues.push(`${line}: name "${row.name}" がキャラ名と一致しません（打ち間違い？）`);
    }
  });

  return issues;
}

// 開発サーバー実行時（本番ビルドを除く）に、サーバー側で一度だけ確認結果を出力する。
if (process.env.NODE_ENV !== "production" && typeof window === "undefined") {
  const issues = collectDataIssues();
  if (issues.length > 0) {
    console.warn(
      "\n[サイトデータ確認] 次の点を見直してください:\n" +
        issues.map((s) => "  - " + s).join("\n") +
        "\n",
    );
  }
}

/**
 * トップ左エリアの見出しなど
 *
 * ◆ lead（説明文）の改行について ◆
 *   "\n" を入れた箇所で改行されます。1〜3 行程度を想定。
 *   行を増やしたいときは "\n" で区切って書いてください。
 *   例（3 行）:
 *     lead: "喧騒を離れ、上質な夜へ。\nVRChat Launge「Ms.shy-A」\n大人のための隠れ家ラウンジ。"
 *   1 行にしたいときは "\n" を入れずに書けば OK です。
 */
export const topLandingCopy = {
  kicker: "April Fool's Day",
  title: "Launge\nTEST",
  lead: "喧騒を離れ、上質な夜へ。\n Launge「test」\n大人のための隠れ家ラウンジ。",
} as const;

/**
 * =============================================================================
 * ◆ TOP（/）の背景設定 ◆ ここを書き換えるだけで背景を変えられます
 * =============================================================================
 *
 * 【単色にする場合】
 *   export const topBackground: TopBackground = { type: "color", color: "#0a0a0a" };
 *   ※ color は "#rrggbb" のほか "rgb(...)" や CSS グラデーションも指定可
 *     例: { type: "color", color: "linear-gradient(135deg, #1a1a2e, #0a0a0a)" }
 *
 * 【画像にする場合】
 *   1. 画像を public/images/ に置く（例: public/images/top-bg.jpg）
 *   2. 下記のように設定:
 *      export const topBackground: TopBackground = {
 *        type: "image",
 *        src: "/images/top-bg.jpg",
 *        overlay: 0.45,   // 文字を読みやすくする暗さ（0=なし〜1=真っ黒）。省略可
 *        position: "center", // 任意: "center" | "top" | "bottom" など
 *      };
 *   ※ 外部URLを使う場合は next.config.ts の images.remotePatterns に許可が必要です
 * =============================================================================
 */
export type TopBackground =
  | { type: "color"; color: string }
  | { type: "image"; src: string; overlay?: number; position?: string };

export const topBackground: TopBackground = {
  type: "image",
  src: "/images/top-bg.png",
  overlay: 0.5, // 文字を読みやすくする暗さ（0=なし〜1=真っ黒）
  position: "center",
};
