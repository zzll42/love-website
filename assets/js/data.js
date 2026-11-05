/* ============================================================
 *  💕 网站数据文件 —— 所有要修改的内容都在这一个文件里
 *  改完保存，回到浏览器刷新（F5）就能看到效果
 * ============================================================ */

/* ---------- 1. 基本信息 ---------- */
const SITE_CONFIG = {
  boyName: "张焕林",             // 👦 你的名字
  girlName: "魏麒",              // 👧 你女朋友的名字
  startDate: "2026-05-31",       // 💞 正式在一起的日期（格式：年-月-日）
  boyBirthday: "2003-12-20",     // 🎂 你的生日（格式：年-月-日）
  girlBirthday: "2004-12-17",    // 🎂 她的生日（格式：年-月-日）
  nextMeeting: "",               // 📅 下次见面的日期（格式：年-月-日），还没定就留空 ""
  intro: "2026年5月31日，我们在一起了。这里是属于张焕林和魏麒的小小世界，记录我们的照片、每一次见面，和每一个值得纪念的瞬间……"
};

/* ---------- 2. 照片墙（首页展示这 8 张，从图库里挑） ----------
 * 想换哪张就改 src：对应 assets/photos/gallery/ 里的文件名
 * ------------------------------------------------ */
const US_PHOTOS = [
  { src: "gallery/photo-001.jpg" },
  { src: "gallery/photo-010.jpg" },
  { src: "gallery/photo-020.jpg" },
  { src: "gallery/photo-030.jpg" },
  { src: "gallery/photo-040.jpg" },
  { src: "gallery/photo-050.jpg" },
  { src: "gallery/photo-060.jpg" },
  { src: "gallery/photo-070.jpg" },
];

/* ---------- 3. 图库：全部照片和视频 ----------
 * 文件都在 assets/photos/gallery/ 里
 * 照片=72 张，视频=3 个（type: "video" 表示视频）
 * 以后加照片：把文件放进 gallery 文件夹，在这里加一行 { src: "gallery/文件名" },
 * ------------------------------------------------ */
const GALLERY = [
  { src: "gallery/photo-001.jpg" }, // 1780487839179.jpeg
  { src: "gallery/photo-002.jpg" }, // 1780919402190.jpeg
  { src: "gallery/photo-003.jpg" }, // 1780919404820.jpeg
  { src: "gallery/photo-004.jpg" }, // 1780919406876.jpeg
  { src: "gallery/photo-005.jpg" }, // 1780997005950.jpeg
  { src: "gallery/photo-006.jpg" }, // 1781246402920.jpeg
  { src: "gallery/photo-007.jpg" }, // 1782111136969.jpeg
  { src: "gallery/photo-008.jpg" }, // DOUYIN_LP_1782212158941.jpg
  { src: "gallery/photo-009.jpg" }, // DOUYIN_LP_1785071958271.jpg
  { src: "gallery/photo-010.jpg" }, // IMG_20260801_221940.jpg
  { src: "gallery/photo-011.jpg" }, // mmexport1780293838329.jpg
  { src: "gallery/photo-012.jpg" }, // mmexport1780293914748.jpg
  { src: "gallery/photo-013.jpg" }, // mmexport1780294916502.jpg
  { src: "gallery/photo-014.jpg" }, // mmexport1780294919210.jpg
  { src: "gallery/photo-015.jpg" }, // mmexport1780294921648.jpg
  { src: "gallery/photo-016.jpg" }, // mmexport1780294925222.jpg
  { src: "gallery/photo-017.jpg" }, // mmexport1780294927563.jpg
  { src: "gallery/photo-018.jpg" }, // mmexport1780294929613.jpg
  { src: "gallery/photo-019.jpg" }, // mmexport1780294931766.jpg
  { src: "gallery/photo-020.jpg" }, // mmexport1780294933919.jpg
  { src: "gallery/photo-021.jpg" }, // mmexport1780294936126.jpg
  { src: "gallery/photo-022.jpg" }, // mmexport1780294938359.jpg
  { src: "gallery/photo-023.jpg" }, // mmexport1781146064577.jpg
  { src: "gallery/photo-024.jpg" }, // mmexport1782312205806.jpg
  { src: "gallery/photo-025.jpg" }, // mmexport1782655491727.jpg
  { src: "gallery/photo-026.jpg" }, // mmexport1782831353607.jpg
  { src: "gallery/photo-027.jpg" }, // mmexport1782974264088.jpg
  { src: "gallery/photo-028.jpg" }, // mmexport1782974282839.jpg
  { src: "gallery/photo-029.jpg" }, // mmexport1782974300124.jpg
  { src: "gallery/photo-030.jpg" }, // mmexport1782974688327.jpg
  { src: "gallery/photo-031.jpg" }, // mmexport1782975357817.jpg
  { src: "gallery/photo-032.jpg" }, // mmexport1782975640530.jpg
  { src: "gallery/photo-033.jpg" }, // mmexport1782976561672.jpg
  { src: "gallery/photo-034.jpg" }, // mmexport1782978163597.jpg
  { src: "gallery/photo-035.jpg" }, // mmexport1782978170494.jpg
  { src: "gallery/photo-036.jpg" }, // mmexport1782988836938.jpg
  { src: "gallery/photo-037.jpg" }, // mmexport1782988844468.jpg
  { src: "gallery/photo-038.jpg" }, // mmexport1782989081668.jpg
  { src: "gallery/photo-039.jpg" }, // mmexport1782990677045.jpg
  { src: "gallery/photo-040.jpg" }, // mmexport1783279940543.jpg
  { src: "gallery/photo-041.jpg" }, // mmexport1783279946213.jpg
  { src: "gallery/photo-042.jpg" }, // mmexport1783280064790.jpg
  { src: "gallery/photo-043.jpg" }, // mmexport1783280091965.jpg
  { src: "gallery/photo-044.jpg" }, // mmexport1784135390340.jpg
  { src: "gallery/photo-045.jpg" }, // mmexport1784135465058.jpg
  { src: "gallery/photo-046.jpg" }, // mmexport1784369960060.jpg
  { src: "gallery/photo-047.jpg" }, // mmexport1784369962620.jpg
  { src: "gallery/photo-048.jpg" }, // mmexport1784369964805.jpg
  { src: "gallery/photo-049.jpg" }, // mmexport1784457310984.jpg
  { src: "gallery/photo-050.jpg" }, // mmexport1784457391025.jpg
  { src: "gallery/photo-051.jpg" }, // mmexport1784457485671.jpg
  { src: "gallery/photo-052.jpg" }, // mmexport1784815013256.jpg
  { src: "gallery/photo-053.jpg" }, // mmexport1784815014982.jpg
  { src: "gallery/photo-054.jpg" }, // mmexport1784815018733.jpg
  { src: "gallery/photo-055.jpg" }, // mmexport1784815670607.jpg
  { src: "gallery/photo-056.jpg" }, // mmexport1784815674742.jpg
  { src: "gallery/photo-057.jpg" }, // mmexport1784815681464.jpg
  { src: "gallery/photo-058.jpg" }, // mmexport1785333513068.jpg
  { src: "gallery/photo-059.jpg" }, // mmexport1786369957899.jpg
  { src: "gallery/photo-060.jpg" }, // mmexport1788374482137.jpg
  { src: "gallery/photo-061.jpg" }, // mmexport1788374489031.jpg
  { src: "gallery/photo-062.jpg" }, // mmexport1788374506713.jpg
  { src: "gallery/photo-063.jpg" }, // 微信图片_20261105150423_41_24.jpg
  { src: "gallery/photo-064.jpg" }, // 微信图片_20261105150427_42_24.jpg
  { src: "gallery/photo-065.jpg" }, // 微信图片_20261105150431_43_24.jpg
  { src: "gallery/photo-066.jpg" }, // 微信图片_20261105150434_44_24.jpg
  { src: "gallery/photo-067.jpg" }, // 微信图片_20261105150438_45_24.jpg
  { src: "gallery/photo-068.jpg" }, // 微信图片_20261105150441_46_24.jpg
  { src: "gallery/photo-069.jpg" }, // 微信图片_20261105150445_47_24.jpg
  { src: "gallery/photo-070.jpg" }, // 微信图片_20261105150449_48_24.jpg
  { src: "gallery/photo-071.jpg" }, // 微信图片_20261105150453_49_24.jpg
  { src: "gallery/photo-072.jpg" }, // 微信图片_20261105150455_50_24.jpg
  { src: "gallery/video-01.mp4", type: "video" }, // 1782111974120.mp4
  { src: "gallery/video-02.mp4", type: "video" }, // mmexport1784479720214.mp4
  { src: "gallery/video-03.mp4", type: "video" }, // mmexport1787747885370.mp4
];

/* ---------- 4. 见面记录 ----------
 * 每次见面写一条，照下面的格式复制一份、改掉内容就行：
 *   date        = 见面开始日期（格式：年-月-日）
 *   endDate     = 见面结束日期（可省略）
 *   title       = 标题（比如"第一次见面"）
 *   location    = 见面的地点（可以空着 "")
 *   description = 那天发生的小故事
 *   photos      = 这次见面的照片/视频（type: "video" 表示视频）
 * ------------------------------------------------ */
const MEETINGS = [
  {
    date: "2026-09-28",
    endDate: "2026-10-12",
    title: "第二次见面",
    location: "",
    description: "第二次见面，一起度过了 15 天。",
    photos: [
      { src: "gallery/photo-063.jpg" },
      { src: "gallery/photo-064.jpg" },
      { src: "gallery/photo-065.jpg" },
      { src: "gallery/photo-066.jpg" },
      { src: "gallery/photo-067.jpg" },
      { src: "gallery/photo-068.jpg" },
      { src: "gallery/photo-069.jpg" },
      { src: "gallery/photo-070.jpg" },
      { src: "gallery/photo-071.jpg" },
      { src: "gallery/photo-072.jpg" }
    ]
  },
  {
    date: "2026-07-19",
    endDate: "2026-07-26",
    title: "第一次见面",
    location: "",
    description: "第一次见面，一起度过了 8 天。",
    photos: [
      { src: "gallery/photo-049.jpg" },
      { src: "gallery/photo-050.jpg" },
      { src: "gallery/photo-051.jpg" },
      { src: "gallery/photo-052.jpg" },
      { src: "gallery/photo-053.jpg" },
      { src: "gallery/photo-054.jpg" },
      { src: "gallery/photo-055.jpg" },
      { src: "gallery/photo-056.jpg" },
      { src: "gallery/photo-057.jpg" },
      { src: "gallery/photo-009.jpg" },
      { src: "gallery/video-02.mp4", type: "video" }
    ]
  },
];
