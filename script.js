const people = [
  {
    "name": "강사",
    "food": "이병학",
    "place": "텐동",
    "watch": "평촌",
    "singer": "슈퍼뒤에서 담배피우는 두사람",
    "sns": "스피츠"
  },
  {
    "name": "1",
    "food": "김민지",
    "place": "마라탕",
    "watch": "기숙사...",
    "singer": "오디세이",
    "sns": "스파이에어"
  },
  {
    "name": "2",
    "food": "김수정",
    "place": "엄마밥",
    "watch": "하계동",
    "singer": "스파이더맨",
    "sns": "마이 케미컬 로맨스"
  },
  {
    "name": "3",
    "food": "김예진",
    "place": "쌈밥",
    "watch": "수원",
    "singer": "오디세이",
    "sns": "지소쿠리클럽"
  },
  {
    "name": "4",
    "food": "김주은",
    "place": "연어초밥",
    "watch": "연신내",
    "singer": "옵세션",
    "sns": "실리카겔"
  },
  {
    "name": "5",
    "food": "김채호",
    "place": "계란찜",
    "watch": "하계",
    "singer": "오디세이",
    "sns": "킹누"
  },
  {
    "name": "6",
    "food": "남미경",
    "place": "샌드위치",
    "watch": "명일동",
    "singer": "슬로우 호시스",
    "sns": "alice merton"
  },
  {
    "name": "7",
    "food": "박소영",
    "place": "치킨",
    "watch": "기숙사",
    "singer": "피아니스트",
    "sns": "빅뱅"
  },
  {
    "name": "8",
    "food": "원유미",
    "place": "샤브샤브",
    "watch": "방배동",
    "singer": "Spiderman",
    "sns": "Alvaro Soler"
  },
  {
    "name": "9",
    "food": "임영현",
    "place": "",
    "watch": "",
    "singer": "",
    "sns": ""
  },
  {
    "name": "10",
    "food": "임훈정",
    "place": "삼겹살",
    "watch": "중계동",
    "singer": "오디세이",
    "sns": "jayb"
  },
  {
    "name": "11",
    "food": "채영미",
    "place": "통닭",
    "watch": "동두천",
    "singer": "들쥐",
    "sns": "드렁큰타이거"
  },
  {
    "name": "12",
    "food": "최동욱",
    "place": "초밥",
    "watch": "하계",
    "singer": "오디세이",
    "sns": "한로로"
  },
  {
    "name": "13",
    "food": "카밀라",
    "place": "치즈 가리비",
    "watch": "석계",
    "singer": "들쥐",
    "sns": "한로로"
  },
  {
    "name": "14",
    "food": "한다빈",
    "place": "뇨끼",
    "watch": "공릉",
    "singer": "릴로와 스티치",
    "sns": "Laufey"
  },
  {
    "name": "15",
    "food": "호프슈타트 파울",
    "place": "피자",
    "watch": "공릉",
    "singer": "라스트 에어 벤더",
    "sns": "잔나비"
  },
  {
    "name": "16",
    "food": "홍정욱",
    "place": "햄버거",
    "watch": "전농동",
    "singer": "파라노만",
    "sns": "백예린"
  },
  {
    "name": "17",
    "food": "이서진",
    "place": "연어덮밥",
    "watch": "하계",
    "singer": "치이카와",
    "sns": "나토리"
  }
];

const categories = [
  ["all","전체"],
  ["food","좋아하는 음식"],
  ["place","사는 곳"],
  ["watch","최근 본 것"],
  ["singer","좋아하는 가수"]
];

let activeCategory = "all";
let activeValue = "all";

const tabs = document.querySelector("#categoryTabs");
const filters = document.querySelector("#valueFilters");
const cards = document.querySelector("#cards");
const title = document.querySelector("#resultTitle");
const count = document.querySelector("#liveCount");

count.textContent = `DATA  /  ${people.length} PEOPLE`;

function safe(v) {
  return String(v || "—").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

function instagramURL(v) {
  if (!v) return "";
  if (v.startsWith("http")) return v;
  return "https://www.instagram.com/" + v.replace(/^@/,"") + "/";
}

function renderTabs() {
  tabs.innerHTML = categories.map(([key,label]) => `
    <button class="cat ${key===activeCategory ? "active":""}" data-cat="${key}">
      <span>${label}</span>
    </button>`).join("");

  tabs.querySelectorAll(".cat").forEach(btn => btn.addEventListener("click", () => {
    activeCategory = btn.dataset.cat;
    activeValue = "all";
    renderAll();
  }));
}

function renderFilters() {
  if (activeCategory === "all") {
    filters.innerHTML = "";
    return;
  }

  const values = [...new Set(people.map(p => p[activeCategory]).filter(Boolean))];
  filters.innerHTML = [
    `<button class="filter ${activeValue==="all"?"active":""}" data-value="all">ALL</button>`,
    ...values.map(v => `<button class="filter ${activeValue===v?"active":""}" data-value="${safe(v)}">${safe(v)}</button>`)
  ].join("");

  filters.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => {
    activeValue = btn.dataset.value;
    renderAll();
  }));
}

function renderCards() {
  const filtered = activeCategory==="all" || activeValue==="all"
    ? people
    : people.filter(p => p[activeCategory] === activeValue);

  title.textContent = activeCategory==="all"
    ? "EVERYONE"
    : categories.find(c => c[0]===activeCategory)[1].toUpperCase();

  cards.innerHTML = filtered.length ? filtered.map((p,i) => {
    const sns = p.sns ? `<a class="sns" href="${instagramURL(p.sns)}" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a>` : "";
    return `<article class="card">
      <div>
        <div class="num">${String(i+1).padStart(2,"0")} / ${String(people.indexOf(p)+1).padStart(2,"0")}</div>
        <h3 class="name">${safe(p.name)}</h3>
        <div class="details">
          <div class="detail"><label>FOOD</label><span>${safe(p.food)}</span></div>
          <div class="detail"><label>PLACE</label><span>${safe(p.place)}</span></div>
          <div class="detail"><label>WATCH</label><span>${safe(p.watch)}</span></div>
          <div class="detail"><label>MUSIC</label><span>${safe(p.singer)}</span></div>
        </div>
      </div>
      ${sns}
    </article>`;
  }).join("") : `<div class="empty">NO MATCH / 다른 취향을 탐색해보세요.</div>`;
}

function renderAll() {
  renderTabs();
  renderFilters();
  renderCards();
}

function resetAll() {
  activeCategory = "all";
  activeValue = "all";
  renderAll();
  window.scrollTo({top: document.querySelector(".explorer").offsetTop, behavior:"smooth"});
}

renderAll();
