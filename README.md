# 💕 我们的爱情记录

一个只属于你们两个人的小网站：记录合照、在一起的每一天、每一次见面。

## 怎么打开

双击 `index.html`，用浏览器打开就行（推荐 Chrome / Edge）。
网站完全保存在本地，不需要联网、不需要服务器。

## 常用修改（都在一个文件里）

所有内容都写在 `assets/js/data.js` 里，用记事本打开就能改。

### 1. 改名字和日期

- `boyName`：你的名字
- `girlName`：她的名字
- `startDate`：正式在一起的日期（格式：年-月-日，例如 "2026-05-31"）
- `boyBirthday`：你的生日（格式：年-月-日）
- `girlBirthday`：她的生日（格式：年-月-日）
- `nextMeeting`：下次见面的日期，首页会自动显示"距离下次见面还有 X 天"；还没定就留空 `""`
- `intro`：关于你们的介绍文字

> 在一起的精确时长（X年X个月X天）、生日倒计时、星座、生肖、每月纪念日、100天/200天/300天/一周年/520天/1000天纪念日——这些全部**自动计算**，不用手动维护。

### 2. 放合照

1. 把照片文件放进 `assets/photos/us/` 文件夹
2. 在 `data.js` 的 `US_PHOTOS` 里按格式写文件名和说明：

   ```js
   { src: "us/us-1.jpg", caption: "第一次约会" },
   ```

   "关于我们"会显示前两张，照片墙显示全部。

### 3. 添加见面记录

1. 把这次见面的照片放进 `assets/photos/meetings/见面日期/`（例如 `assets/photos/meetings/2024-05-20/`）
3. 在 `data.js` 的 `MEETINGS` 里加一条（`endDate` 是结束日期，可省略）：

   ```js
   {
     date: "2026-07-19",
     endDate: "2026-07-26",
     title: "第一次见面",
     location: "上海 · 外滩",
     description: "那天……",
     photos: [
       { src: "gallery/photo-049.jpg", caption: "外滩合影" },
       { src: "gallery/photo-050.jpg" },
       { src: "gallery/video-02.mp4", type: "video" },
     ]
   },
   ```

   见面记录页会自动按日期排序，并自动显示"第几次见面"。

### 4. 图库

- 图库页（`gallery.html`）展示 `data.js` 里 `GALLERY` 数组的全部照片和视频
- 照片文件都在 `assets/photos/gallery/` 里，命名为 `photo-001.jpg` ~ `photo-072.jpg`
- 视频命名为 `video-01.mp4` ~ `video-03.mp4`（`type: "video"` 标记）
- 访客可以在图库里点"添加照片"给图库加照片，但**只保存在访客自己的浏览器里**（网站是静态托管，没有云端存储）。要让所有人看到，需要把文件放进 `gallery` 文件夹并加一行 `{ src: "gallery/文件名" },` 再上传
- 想换首页照片墙的 8 张图：改 `US_PHOTOS` 里的 `src`

## 提示

- 照片建议用 `.jpg` 或 `.png`
- 文件名和 `data.js` 里写的要完全一致（包括大小写）
- 照片还没放进去时，页面会显示占位卡片，不会出现裂图
- 目前 `data.js` 里有一条"示例"见面记录，把它改掉或删掉即可
- 之后把见面日期和照片发给我，我也可以直接帮你填好
