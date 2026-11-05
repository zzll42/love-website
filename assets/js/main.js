/* ============================================================
 *  网站渲染逻辑 —— 一般不需要修改这个文件
 *  想要修改内容，请编辑同目录下的 data.js
 * ============================================================ */

const PAGE = document.body.dataset.page;

/* ---------- 小工具 ---------- */

function photoUrl(src) {
  return src ? "assets/photos/" + src : "";
}

// 2024-05-20 → 2024年5月20日
function formatDate(dateStr) {
  const parts = String(dateStr).split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return dateStr;
  return parts[0] + "年" + parts[1] + "月" + parts[2] + "日";
}

// 两个日期之间相差多少天（按自然日）
function daysBetween(fromStr, toStr) {
  if (!fromStr || !toStr) return null;
  const from = new Date(fromStr + "T00:00:00");
  const to = new Date(toStr + "T00:00:00");
  if (isNaN(from.getTime()) || isNaN(to.getTime())) return null;
  return Math.floor((to - from) / 86400000);
}

function todayStr() {
  const d = new Date();
  const p = n => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}

/* ---------- 照片卡片 ---------- */

// 占位卡片：照片还没放进来时显示
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

// 照片卡片：有图显示图，没图（或图片加载失败）自动换成占位卡片
function photoCard(src, caption, placeholderText) {
  if (!src) return placeholderCard(placeholderText);
  const card = document.createElement("figure");
  card.className = "photo-card";
  const img = document.createElement("img");
  img.src = photoUrl(src);
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

/* ---------- 灯箱：点击照片放大 ---------- */

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

/* ---------- 首页 ---------- */

function initHome() {
  // 名字和浏览器标签标题
  document.getElementById("boyName").textContent = SITE_CONFIG.boyName;
  document.getElementById("girlName").textContent = SITE_CONFIG.girlName;
  document.title = SITE_CONFIG.boyName + " 💕 " + SITE_CONFIG.girlName + " 的爱情记录";

  // 在一起的天数
  const together = daysBetween(SITE_CONFIG.startDate, todayStr());
  document.getElementById("togetherDays").textContent =
    (together === null || together < 0) ? "--" : together;

  // 下次见面倒计时（没填日期就不显示这张卡片）
  const nextDays = daysBetween(todayStr(), SITE_CONFIG.nextMeeting);
  if (nextDays !== null) {
    document.getElementById("nextMeetingDays").textContent = Math.max(0, nextDays);
    document.getElementById("nextMeetingCard").hidden = false;
  }

  // 关于我们：显示前两张合照 + 介绍文字
  const aboutBox = document.getElementById("aboutPhotos");
  const firstTwo = US_PHOTOS.slice(0, 2);
  if (firstTwo.length) {
    firstTwo.forEach(p => aboutBox.appendChild(photoCard(p.src, p.caption, "我们的照片")));
  } else {
    aboutBox.appendChild(placeholderCard("我们的照片待添加"));
  }
  document.getElementById("introText").textContent = SITE_CONFIG.intro;

  // 照片墙：显示全部合照
  const gallery = document.getElementById("usGallery");
  if (!US_PHOTOS.length) {
    const tip = document.createElement("div");
    tip.className = "empty-tip";
    tip.textContent = "照片还没放进来，等我们把照片加进来吧 💕";
    gallery.appendChild(tip);
  } else {
    US_PHOTOS.forEach(p => gallery.appendChild(photoCard(p.src, p.caption, "照片待添加")));
  }

  // 最近的见面（最多显示 3 条）
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
  document.title = "见面记录 💕 我们的爱情记录";

  // 按日期从新到旧排序
  const sorted = [...MEETINGS].sort((a, b) => b.date.localeCompare(a.date));
  const total = sorted.length;
  let photoCount = 0;
  sorted.forEach(m => { photoCount += (m.photos || []).length; });

  // 顶部统计
  document.getElementById("statMeetings").textContent = total;
  document.getElementById("statPhotos").textContent = photoCount;
  const together = daysBetween(SITE_CONFIG.startDate, todayStr());
  document.getElementById("statDays").textContent =
    (together === null || together < 0) ? "--" : together;
  document.getElementById("statRange").textContent = total
    ? formatDate(sorted[total - 1].date) + " ~ " + formatDate(sorted[0].date)
    : "--";

  // 时间轴
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
    // "第几次见面"徽章：从最早一次算起
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
