// ==============================
// 地域ごとの設定
// ==============================

// 日本（おおまかに陸地が出やすい範囲）
const JAPAN_AREA = {
  latMin: 30.0,
  latMax: 45.5,
  lngMin: 129.0,
  lngMax: 145.5
};

// 海外の有名地（座標箱方式）
const FAMOUS_AREAS = [
  {
    name: "パリ周辺",
    latMin: 48.80,
    latMax: 48.90,
    lngMin: 2.25,
    lngMax: 2.40
  },
  {
    name: "ニューヨーク周辺",
    latMin: 40.70,
    latMax: 40.80,
    lngMin: -74.05,
    lngMax: -73.90
  },
  {
    name: "ロンドン周辺",
    latMin: 51.48,
    latMax: 51.55,
    lngMin: -0.15,
    lngMax: 0.05
  },
  {
    name: "シンガポール",
    latMin: 1.28,
    latMax: 1.36,
    lngMin: 103.80,
    lngMax: 103.90
  }
];

// 完全ランダム（地球全体）
const RANDOM_AREA = {
  latMin: -85,
  latMax: 85,
  lngMin: -180,
  lngMax: 180
};

// ==============================
// ユーティリティ
// ==============================

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function generateLatLng(area) {
  return {
    lat: randomBetween(area.latMin, area.latMax),
    lng: randomBetween(area.lngMin, area.lngMax)
  };
}

function openGoogleMap(lat, lng) {
  const query = `${lat},${lng}`;
  const url =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  window.open(url, "_blank");
}

// ==============================
// メイン処理
// ==============================

const generateBtn = document.getElementById("generateBtn");
const openMapBtn = document.getElementById("openMapBtn");
const locationText = document.getElementById("locationText");
const modeSelect = document.getElementById("mode");

let currentLatLng = null;

generateBtn.addEventListener("click", () => {
  const mode = modeSelect.value;
  let latLng;
  let description = "";

  if (mode === "japan") {
    latLng = generateLatLng(JAPAN_AREA);
    description = "日本のどこか";
  }

  if (mode === "famous") {
    const area =
      FAMOUS_AREAS[Math.floor(Math.random() * FAMOUS_AREAS.length)];
    latLng = generateLatLng(area);
    description = area.name;
  }

  if (mode === "random") {
    latLng = generateLatLng(RANDOM_AREA);
    description = "地球のどこか（完全ランダム）";
  }

  currentLatLng = latLng;

  locationText.textContent =
    `${description}\n（緯度: ${latLng.lat.toFixed(5)}, 経度: ${latLng.lng.toFixed(5)}）`;

  openMapBtn.disabled = false;
});

openMapBtn.addEventListener("click", () => {
  if (!currentLatLng) return;
  openGoogleMap(currentLatLng.lat, currentLatLng.lng);
});
