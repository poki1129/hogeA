/**
 * トップランディング（/）右カラム用のデータ
 * =============================================================================
 * ◆ スケジュールの編集はここだけ ◆
 *   下の `topSchedule` 配列を書き換えるだけで、トップのスケジュールが変わります。
 *   1行＝1つの予定。上から順に表示されます。
 *
 *   例:
 *     { date: "5/31", time: "21:00～24:00", name: "hico", status: "出勤" },
 *     { date: "5/31", time: "21:00～24:00", name: "poki", status: "出勤" },
 *
 *   ・status は省略可（書かなければ表示されません）
 *   ・time も省略可
 * =============================================================================
 */

export type TopScheduleItem = {
  /** 日付（例: "5/31"） */
  date: string;
  /** 時間帯（例: "21:00～24:00"）。省略可 */
  time?: string;
  /** 名前（例: "hico"） */
  name: string;
  /** 状態（例: "出勤"）。省略可 */
  status?: string;
};

/** スケジュール一覧（上から順に表示）。ここを自由に編集してください */
export const topSchedule: TopScheduleItem[] = [
  { date: "5/31", time: "21:00～24:00", name: "hico", status: "出勤" },
  { date: "5/31", time: "21:00～24:00", name: "poki", status: "出勤" },
];

/** トップ左エリアの見出しなど */
export const topLandingCopy = {
  kicker: "April Fool's Day",
  title: "VRChat Launge\nMs.shy-A",
  lead: "喧騒を離れ、上質な夜へ。\nVRChat Launge「Ms.shy-A」\n大人のための隠れ家ラウンジ。",
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
  type: "color",
  color: "#0a0a0a",
};
