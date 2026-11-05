/* ============================================================
 *  网站渲染逻辑 —— 一般不需要修改这个文件
 *  想要修改内容，请编辑同目录下的 data.js
 * ============================================================ */

const PAGE = document.body.dataset.page;

/* ---------- 小工具 ---------- */

function parseDate(s) {
  const p = String(s).split("-").map(Number);
  if (p.length !== 3 || p.some(isNaN)) return null;
  return new Date(p[0], p[1] - 1, p[2]);
}

// 支持 "2026-05-31" 字符串或 Date 对象 → 2026年5月31日
function formatDate(d) {
  let date = d;
  if (!(d instanceof Date)) {
    date = parseDate(d);
    if (!date) return String(d);
  }
  return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
}

function today() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function daysBetween(a, b) {
  return Math.round((b - a) / 86400000);
}

// 精确差值：X年X个月X天
function diffYMD(start, end) {
  let y = end.getFullYear() - start.getFullYear();
  let m = end.getMonth() - start.getMonth();
  let d = end.getDate() - start.getDate();
  if (d < 0) {
    m--;
    d += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (m < 0) { y--; m += 12; }
  return { y, m, d };
}

// 星座
function zodiac(date) {
  const m = date.getMonth() + 1, d = date.getDate();
  const ranges = [
    [1, 20, "水瓶座♒"], [2, 19, "双鱼座♓"], [3, 21, "白羊座♈"], [4, 20, "金牛座♉"],
    [5, 21, "双子座♊"], [6, 22, "巨蟹座♋"], [7, 23, "狮子座♌"], [8, 23, "处女座♍"],
    [9, 23, "天秤座♎"], [10, 24, "天蝎座♏"], [11, 23, "射手座♐"], [12, 22, "摩羯座♑"]
  ];
  for (let i = ranges.length - 1; i >= 0; i--) {
    const rm = ranges[i][0], rd = ranges[i][1];
    if (m > rm || (m === rm && d >= rd)) return ranges[i][2];
  }
  return ranges[ranges.length - 1][2];
}

// 生肖
function chineseZodiac(year) {
  const animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
  return "属" + animals[((year - 4) % 12 + 12) % 12];
}

// 实足年龄
function ageOn(birth, ref) {
  let a = ref.getFullYear() - birth.getFullYear();
  const bd = new Date(ref.getFullYear(), birth.getMonth(), birth.getDate());
  if (ref < bd) a--;
  return a;
}

// 距离下一个生日还有多少天
function nextBirthdayDays(birth, ref) {
  let bd = new Date(ref.getFullYear(), birth.getMonth(), birth.getDate());
  if (bd < ref) bd = new Date(ref.getFullYear() + 1, birth.getMonth(), birth.getDate());
  return daysBetween(ref, bd);
}

// 每月纪念日：和在一起日期同一个"日"，没有这一天的月份取当月最后一天
function monthAnniversary(start, ref) {
  const day = start.getDate();
  const monthEnd = (y, m) => new Date(y, m + 1, 0).getDate();
  let d = new Date(ref.getFullYear(), ref.getMonth(), Math.min(day, monthEnd(ref.getFullYear(), ref.getMonth())));
  if (d < ref) {
    d = new Date(ref.getFullYear(), ref.getMonth() + 1, Math.min(day, monthEnd(ref.getFullYear(), ref.getMonth() + 1)));
  }
  return d;
}

// 恋爱里程碑（从在一起那天算起）
const MILESTONES = [
  { label: "100天纪念日", days: 100 },
  { label: "200天纪念日", days: 200 },
  { label: "300天纪念日", days: 300 },
  { label: "一周年纪念日", days: 365 },
  { label: "520天纪念日", days: 520 },
  { label: "两周年纪念日", days: 730 },
  { label: "1000天纪念日", days: 1000 },
];

/* ---------- 照片卡片 ---------- */

function placeholderCard(text) {
  const div = document.createElement("div");
  div.className = "photo-card is-placeholder";
  const icon = document.createElement("span");
  icon.className = "placeholder-icon";
  icon.textContent = "📷";
  const tip = document.createElement("span");
  tip.className = "placeholder-text";
  tip.textContent = text;
  div.appendChild(icon);
  div.appendChild(tip);
  return div;
}

function photoCard(src, caption, placeholderText) {
  if (!src) return placeholderCard(placeholderText);
  const card = document.createElement("figure");
  card.className = "photo-card";
  const img = document.createElement("img");
  img.src = "assets/photos/" + src;
  img.alt = caption || "照片";
  img.loading = "lazy";
  img.addEventListener("click", () => openLightbox(img.src, caption));
  img.addEventListener("error", () => card.replaceWith(placeholderCard(placeholderText)));
  card.appendChild(img);
  if (caption) {
    const fig = document.createElement("figcaption");
    fig.textContent = caption;
    card.appendChild(fig);
  }
  return card;
}

/* ---------- 灯箱 ---------- */

let lightbox = null;
function openLightbox(src, caption) {
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    const inner = document.createElement("div");
    inner.className = "lightbox-inner";
    inner.innerHTML = '<img alt="大图"><p></p>';
    lightbox.appendChild(inner);
    lightbox.addEventListener("click", () => lightbox.classList.remove("show"));
    document.body.appendChild(lightbox);
  }
  lightbox.querySelector("img").src = src;
  lightbox.querySelector("p").textContent = caption || "";
  lightbox.classList.add("show");
}

/* ---------- 见面记录卡片（首页和见面记录页共用） ---------- */

function meetingCard(meeting) {
  const card = document.createElement("div");
  card.className = "meeting-card";

  const date = document.createElement("div");
  date.className = "meeting-date";
  date.textContent = "📅 " + formatDate(meeting.date);
  card.appendChild(date);

  const title = document.createElement("h3");
  title.className = "meeting-title";
  title.textContent = meeting.title;
  card.appendChild(title);

  if (meeting.location) {
    const loc = document.createElement("div");
    loc.className = "meeting-location";
    loc.textContent = "📍 " + meeting.location;
    card.appendChild(loc);
  }
  if (meeting.description) {
    const desc = document.createElement("p");
    desc.className = "meeting-desc";
    desc.textContent = meeting.description;
    card.appendChild(desc);
  }

  const photos = document.createElement("div");
  photos.className = "meeting-photos";
  const list = meeting.photos || [];
  if (list.length) {
    list.forEach(p => photos.appendChild(photoCard(p.src, p.caption, "这次见面的照片")));
  } else {
    photos.appendChild(placeholderCard("这次见面的照片还没放进来"));
  }
  card.appendChild(photos);
  return card;
}

/* ---------- 人物卡片 ---------- */

function personCard(name, birthStr, photo) {
  const card = document.createElement("div");
  card.className = "person-card";

  if (photo) {
    card.appendChild(photoCard(photo.src, photo.caption, "照片待添加"));
  } else {
    card.appendChild(placeholderCard("照片待添加"));
  }

  const info = document.createElement("div");
  info.className = "person-info";
  const h = document.createElement("h3");
  h.textContent = name;
  const line1 = document.createElement("div");
  line1.className = "person-line";
  const line2 = document.createElement("div");
  line2.className = "person-line";
  const birth = parseDate(birthStr);
  if (birth) {
    line1.textContent = "🎂 " + formatDate(birth) + " · " + ageOn(birth, today()) + " 岁";
    line2.textContent = zodiac(birth) + " · " + chineseZodiac(birth.getFullYear());
  }
  info.appendChild(h);
  info.appendChild(line1);
  info.appendChild(line2);
  card.appendChild(info);
  return card;
}

/* ---------- 生日卡片 ---------- */

function birthdayCard(name, birthStr) {
  const birth = parseDate(birthStr);
  const card = document.createElement("div");
  card.className = "birthday-card";

  const nameEl = document.createElement("div");
  nameEl.className = "birthday-name";
  nameEl.textContent = "🎂 " + name + "的生日";
  card.appendChild(nameEl);

  if (birth) {
    const dateEl = document.createElement("div");
    dateEl.className = "birthday-date";
    dateEl.textContent = formatDate(birth) + " · " + zodiac(birth);
    card.appendChild(dateEl);

    const ageEl = document.createElement("div");
    ageEl.className = "birthday-age";
    ageEl.textContent = "今年 " + ageOn(birth, today()) + " 岁 · " + chineseZodiac(birth.getFullYear());
    card.appendChild(ageEl);

    const cd = document.createElement("div");
    cd.className = "birthday-countdown";
    const d = nextBirthdayDays(birth, today());
    cd.innerHTML = d === 0 ? "生日就是今天！🎉" : "距离下次生日还有 <b>" + d + "</b> 天";
    card.appendChild(cd);
  }
  return card;
}

/* ---------- 纪念日卡片 ---------- */

function milestoneChip(label, date, ref) {
  const chip = document.createElement("div");
  chip.className = "milestone-chip";
  const diff = daysBetween(ref, date);

  let status;
  if (diff > 0) status = "还有 <b>" + diff + "</b> 天";
  else if (diff === 0) { status = "就是今天 🎉"; chip.classList.add("is-today"); }
  else { status = "✅ 已过"; chip.classList.add("is-past"); }

  const labelEl = document.createElement("div");
  labelEl.className = "milestone-label";
  labelEl.textContent = label;
  const dateEl = document.createElement("div");
  dateEl.className = "milestone-date";
  dateEl.textContent = formatDate(date);
  const statusEl = document.createElement("div");
  statusEl.className = "milestone-status";
  statusEl.innerHTML = status;

  chip.appendChild(labelEl);
  chip.appendChild(dateEl);
  chip.appendChild(statusEl);
  return chip;
}

/* ---------- 首页 ---------- */

function initHome() {
  const cfg = SITE_CONFIG;
  document.getElementById("boyName").textContent = cfg.boyName;
  document.getElementById("girlName").textContent = cfg.girlName;
  document.title = cfg.boyName + " 💕 " + cfg.girlName + " 的爱情记录";

  const start = parseDate(cfg.startDate);
  const now = today();

  // 在一起：总天数 + 精确时长
  if (start) {
    const together = daysBetween(start, now);
    document.getElementById("togetherDays").textContent = together >= 0 ? together : "--";
    const ymd = diffYMD(start, now);
    const parts = [];
    if (ymd.y) parts.push(ymd.y + " 年");
    if (ymd.m) parts.push(ymd.m + " 个月");
    parts.push(ymd.d + " 天");
    document.getElementById("togetherLabel").textContent = "已经在一起 " + parts.join(" ");
    document.getElementById("heroSince").textContent = "从 " + formatDate(start) + " 起，我们的故事开始了";
  }

  // 下一个大纪念日倒计时
  if (start) {
    const upcoming = MILESTONES
      .map(m => ({ label: m.label, date: addDays(start, m.days) }))
      .filter(m => daysBetween(now, m.date) >= 0)
      .sort((a, b) => a.date - b.date);
    if (upcoming.length) {
      document.getElementById("nextMilestoneDays").textContent = daysBetween(now, upcoming[0].date);
      document.getElementById("nextMilestoneLabel").textContent = "距离" + upcoming[0].label + "还有";
    }
  }

  // 下次见面倒计时（没填日期就不显示）
  if (cfg.nextMeeting) {
    const next = parseDate(cfg.nextMeeting);
    if (next) {
      const d = daysBetween(now, next);
      if (d >= 0) {
        document.getElementById("nextMeetingDays").textContent = d;
        document.getElementById("nextMeetingCard").hidden = false;
      }
    }
  }

  // 关于我们：两个人的卡片 + 介绍
  const aboutGrid = document.getElementById("aboutGrid");
  aboutGrid.appendChild(personCard(cfg.boyName, cfg.boyBirthday, US_PHOTOS[0] || null));
  aboutGrid.appendChild(personCard(cfg.girlName, cfg.girlBirthday, US_PHOTOS[1] || null));
  const intro = document.createElement("div");
  intro.className = "about-intro";
  intro.textContent = cfg.intro;
  aboutGrid.appendChild(intro);

  // 生日卡片
  const bdGrid = document.getElementById("birthdayCards");
  bdGrid.appendChild(birthdayCard(cfg.boyName, cfg.boyBirthday));
  bdGrid.appendChild(birthdayCard(cfg.girlName, cfg.girlBirthday));

  // 纪念日列表
  if (start) {
    const msGrid = document.getElementById("milestoneList");
    msGrid.appendChild(milestoneChip("每月纪念日", monthAnniversary(start, now), now));
    MILESTONES.forEach(m => msGrid.appendChild(milestoneChip(m.label, addDays(start, m.days), now)));
  }

  // 照片墙
  const gallery = document.getElementById("usGallery");
  if (!US_PHOTOS.length) {
    const tip = document.createElement("div");
    tip.className = "empty-tip";
    tip.textContent = "照片还没放进来，等我们把照片加进来吧 💕";
    gallery.appendChild(tip);
  } else {
    US_PHOTOS.forEach(p => gallery.appendChild(photoCard(p.src, p.caption, "照片待添加")));
  }

  // 最近的见面（最多 3 条）
  const recentWrap = document.getElementById("recentMeetings");
  const latest = [...MEETINGS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  if (!latest.length) {
    const tip = document.createElement("div");
    tip.className = "empty-tip";
    tip.textContent = "还没有见面记录，快去见面吧 💕";
    recentWrap.appendChild(tip);
  } else {
    latest.forEach(m => recentWrap.appendChild(meetingCard(m)));
  }
}

/* ---------- 见面记录页 ---------- */

function initMeetings() {
  document.title = "见面记录 💕 " + SITE_CONFIG.boyName + " & " + SITE_CONFIG.girlName;

  const sorted = [...MEETINGS].sort((a, b) => b.date.localeCompare(a.date));
  const total = sorted.length;
  let photoCount = 0;
  sorted.forEach(m => { photoCount += (m.photos || []).length; });

  document.getElementById("statMeetings").textContent = total;
  document.getElementById("statPhotos").textContent = photoCount;
  const start = parseDate(SITE_CONFIG.startDate);
  const together = start ? daysBetween(start, today()) : null;
  document.getElementById("statDays").textContent =
    (together === null || together < 0) ? "--" : together;
  document.getElementById("statRange").textContent = total
    ? formatDate(sorted[total - 1].date) + " ~ " + formatDate(sorted[0].date)
    : "--";

  const timeline = document.getElementById("timeline");
  if (!total) {
    const tip = document.createElement("div");
    tip.className = "empty-tip";
    tip.textContent = "还没有见面记录。以后每次见面，把日期和照片告诉我，我帮你加进来 💕";
    timeline.appendChild(tip);
    return;
  }

  sorted.forEach((m, i) => {
    const entry = document.createElement("div");
    entry.className = "timeline-entry";

    const dot = document.createElement("div");
    dot.className = "timeline-dot";
    dot.textContent = (total - i === 1) ? "💞" : "❤";
    entry.appendChild(dot);

    const card = meetingCard(m);
    const badge = document.createElement("div");
    badge.className = "meeting-times";
    badge.textContent = "第 " + (total - i) + " 次见面";
    card.insertBefore(badge, card.firstChild);

    entry.appendChild(card);
    timeline.appendChild(entry);
  });
}

/* ---------- 启动 ---------- */

document.addEventListener("DOMContentLoaded", () => {
  const copy = document.getElementById("footerCopy");
  if (copy && SITE_CONFIG.startDate) {
    copy.textContent = "从 " + formatDate(SITE_CONFIG.startDate) + " 开始，一起走过每一天";
  }
  if (PAGE === "home") initHome();
  if (PAGE === "meetings") initMeetings();
});
