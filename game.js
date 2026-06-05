// ─────────────────────────────────────────────
//  DOM REFS
// ─────────────────────────────────────────────
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

// roundRect polyfill for older browsers (Safari < 16, etc.)
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    const rad = typeof r === "number" ? r : (r && r[0]) || 0;
    this.beginPath();
    this.moveTo(x + rad, y);
    this.arcTo(x + w, y, x + w, y + h, rad);
    this.arcTo(x + w, y + h, x, y + h, rad);
    this.arcTo(x, y + h, x, y, rad);
    this.arcTo(x, y, x + w, y, rad);
    this.closePath();
    return this;
  };
}
const menu = document.querySelector("#menu");
const startButton = document.querySelector("#startButton");
const multiButton = document.querySelector("#multiButton");
const zhStartButton = document.querySelector("#zhStartButton");
const zhMultiButton = document.querySelector("#zhMultiButton");
const levelSelect = document.querySelector("#levelSelect");
const mapSelect = document.querySelector("#mapSelect");
const roomCodeEl = document.querySelector("#roomCode");
const serverUrlEl = document.querySelector("#serverUrl");
const zhRoomCodeEl = document.querySelector("#zhRoomCode");
const zhServerUrlEl = document.querySelector("#zhServerUrl");
const joystick = document.querySelector("#joystick");
const joystickKnob = document.querySelector("#joystickKnob");
const touchJump = document.querySelector("#touchJump");
const touchShoot = document.querySelector("#touchShoot");
const touchReload = document.querySelector("#touchReload");
const touchAds = document.querySelector("#touchAds");
const touchOpen = document.querySelector("#touchOpen");
const battleFieldTab = document.querySelector("#battleFieldTab");
const zeroHourTab = document.querySelector("#zeroHourTab");
const battleFieldPanel = document.querySelector("#battleFieldPanel");
const zeroHourPanel = document.querySelector("#zeroHourPanel");
const openLoginModal = document.querySelector("#openLoginModal");
const languageButton = document.querySelector("#languageButton");
const loginModal = document.querySelector("#loginModal");
const closeLoginModal = document.querySelector("#closeLoginModal");
const accountStatus = document.querySelector("#accountStatus");
const loginName = document.querySelector("#loginName");
const loginPass = document.querySelector("#loginPass");
const loginButton = document.querySelector("#loginButton");
const createAccountButton = document.querySelector("#createAccountButton");
const logoutButton = document.querySelector("#logoutButton");
const openShopButton = document.querySelector("#openShopButton");
const shopModal = document.querySelector("#shopModal");
const closeShopModal = document.querySelector("#closeShopModal");
const moneyValue = document.querySelector("#moneyValue");
const zhMoneyValue = document.querySelector("#zhMoneyValue");
const zhEquipSummary = document.querySelector("#zhEquipSummary");
const inventoryCount = document.querySelector("#inventoryCount");
const armorShop = document.querySelector("#armorShop");
const gunShop = document.querySelector("#gunShop");
const ammoShop = document.querySelector("#ammoShop");
const lootShop = document.querySelector("#lootShop");
const shopCategoryButtons = document.querySelectorAll(".shop-category");
const activeShopTitle = document.querySelector("#activeShopTitle");
const activeShopList = document.querySelector("#activeShopList");
const inventoryList = document.querySelector("#inventoryList");
const hud = document.querySelector("#hud");
const targetsEl = document.querySelector("#targets");
const targetLabelEl = document.querySelector("#hud .label");
const hpEl = document.querySelector("#hp");
const ammoEl = document.querySelector("#ammo");
const timeEl = document.querySelector("#time");
const timeLabelEl = document.querySelector("#time")?.previousElementSibling;
const hudGear = document.querySelector("#hudGear");
const hudGearText = document.querySelector("#hudGearText");
const messageEl = document.querySelector("#message");
const quitButton = document.querySelector("#quitButton");
const equippedGunEl = document.querySelector("#equipped-gun");
const equippedArmorEl = document.querySelector("#equipped-armor");
const equippedHelmetEl = document.querySelector("#equipped-helmet");
const equippedBackpackEl = document.querySelector("#equipped-backpack");
const equippedAmmoEl = document.querySelector("#equipped-ammo");
const backpackModal = document.querySelector("#backpackModal");
const backpackSlotsEl = document.querySelector("#backpackSlots");
const backpackSlotCountEl = document.querySelector("#backpackSlotCount");
const raidEquippedGunEl = document.querySelector("#raidEquippedGun");
const raidEquippedArmorEl = document.querySelector("#raidEquippedArmor");
const raidEquippedHelmetEl = document.querySelector("#raidEquippedHelmet");
const chestModal = document.querySelector("#chestModal");
const chestLootSlotsEl = document.querySelector("#chestLootSlots");
const chestBackpackSlotsEl = document.querySelector("#chestBackpackSlots");
const closeChestModalBtn = document.querySelector("#closeChestModal");
const exportAccountButton = document.querySelector("#exportAccountButton");
const importAccountButton = document.querySelector("#importAccountButton");
const openSellButton = document.querySelector("#openSellButton");
const sellModal = document.querySelector("#sellModal");
const sellItemList = document.querySelector("#sellItemList");
const closeSellModalBtn = document.querySelector("#closeSellModal");
const openStorageButton = document.querySelector("#openStorageButton");
const redeemCodeButton = document.querySelector("#redeemCodeButton");
const storageModal = document.querySelector("#storageModal");
const storageSlotsEl = document.querySelector("#storageSlots");
const storageStashListEl = document.querySelector("#storageStashList");
const storageSlotCountEl = document.querySelector("#storageSlotCount");
const closeStorageModalBtn = document.querySelector("#closeStorageModal");
const openSetoutButton = document.querySelector("#openSetoutButton");
const setoutModal = document.querySelector("#setoutModal");
const closeSetoutModalBtn = document.querySelector("#closeSetoutModal");
const setoutGunEl = document.querySelector("#setoutGun");
const setoutArmorEl = document.querySelector("#setoutArmor");
const setoutHelmetEl = document.querySelector("#setoutHelmet");
const setoutBackpackEl = document.querySelector("#setoutBackpack");
const setoutAmmoEl = document.querySelector("#setoutAmmo");
const setoutGunList = document.querySelector("#setoutGunList");
const setoutArmorList = document.querySelector("#setoutArmorList");
const setoutAmmoList = document.querySelector("#setoutAmmoList");
const setoutBackpackSlotsEl = document.querySelector("#setoutBackpackSlots");
const setoutStashListEl = document.querySelector("#setoutStashList");
const setoutSlotCountEl = document.querySelector("#setoutSlotCount");
const gearPickerModal = document.querySelector("#gearPickerModal");
const gearPickerTitle = document.querySelector("#gearPickerTitle");
const gearPickerList = document.querySelector("#gearPickerList");
const closeGearPickerModalBtn = document.querySelector("#closeGearPickerModal");
const setoutGearSlots = document.querySelectorAll(".setout-gear-slot");
let activeGearPickerCategory = null;
let activeShopCategory = "armors";
const classModal = document.querySelector("#classModal");
const selectAssault = document.querySelector("#selectAssault");
const selectMedic = document.querySelector("#selectMedic");
let currentLanguage = localStorage.getItem("ilovegames-language") || "en";

// ─────────────────────────────────────────────
//  MAPS
// ─────────────────────────────────────────────
// Map 1: Urban Warfare (original map)
function buildUrbanWarfareMap() {
  const width = 42;
  const height = 30;
  const rows = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => (x === 0 || y === 0 || x === width - 1 || y === height - 1 ? "#" : "."))
  );
  const h = (y, x1, x2, gaps = []) => {
    for (let x = x1; x <= x2; x += 1) if (!gaps.includes(x)) rows[y][x] = "#";
  };
  const v = (x, y1, y2, gaps = []) => {
    for (let y = y1; y <= y2; y += 1) if (!gaps.includes(y)) rows[y][x] = "#";
  };

  h(5, 3, 18, [8, 14]);
  h(5, 24, 38, [31]);
  h(10, 1, 12, [5]);
  h(10, 17, 32, [24]);
  h(15, 5, 25, [12, 20]);
  h(15, 30, 40, [36]);
  h(21, 1, 15, [7]);
  h(21, 20, 39, [29, 35]);
  v(7, 2, 14, [6, 11]);
  v(14, 1, 9, [4]);
  v(20, 6, 20, [12, 17]);
  v(28, 2, 16, [8, 13]);
  v(35, 8, 27, [18, 23]);

  return rows.map(row => row.join(""));
}

// Map 2: Pastoral Village (houses and open areas)
function buildPastoralVillageMap() {
  const width = 42;
  const height = 30;
  const rows = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => (x === 0 || y === 0 || x === width - 1 || y === height - 1 ? "#" : "."))
  );
  const h = (y, x1, x2, gaps = []) => {
    for (let x = x1; x <= x2; x += 1) if (!gaps.includes(x)) rows[y][x] = "#";
  };
  const v = (x, y1, y2, gaps = []) => {
    for (let y = y1; y <= y2; y += 1) if (!gaps.includes(y)) rows[y][x] = "#";
  };
  const house = (x, y, w, h, doorX, doorY) => {
    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) {
        if ((dy === 0 || dy === h - 1 || dx === 0 || dx === w - 1) && !(dx === doorX && dy === doorY)) {
          rows[y + dy][x + dx] = "#";
        }
      }
    }
  };

  // Smaller houses scattered around (reduced by ~30%)
  house(5, 4, 5, 4, 2, 3);    // Top-left house
  house(18, 3, 7, 5, 3, 4);   // Top-center house
  house(33, 5, 5, 4, 0, 2);   // Top-right house
  house(4, 14, 6, 5, 5, 3);   // Mid-left house
  house(20, 13, 8, 6, 4, 0);  // Mid-center house
  house(35, 15, 4, 5, 0, 2);  // Mid-right house
  house(6, 24, 5, 4, 3, 0);   // Bottom-left house
  house(22, 23, 6, 4, 3, 3);  // Bottom-center house
  house(36, 24, 4, 4, 0, 2);  // Bottom-right house

  // Some fences
  h(11, 14, 17);
  v(17, 11, 13);
  h(20, 32, 34);
  v(34, 20, 22);

  return rows.map(row => row.join(""));
}

// Map 3: Boss Arena (walls with boss in center)
function buildBossArenaMap() {
  const width = 42;
  const height = 30;
  const rows = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => (x === 0 || y === 0 || x === width - 1 || y === height - 1 ? "#" : "."))
  );
  const h = (y, x1, x2, gaps = []) => {
    for (let x = x1; x <= x2; x += 1) if (!gaps.includes(x)) rows[y][x] = "#";
  };
  const v = (x, y1, y2, gaps = []) => {
    for (let y = y1; y <= y2; y += 1) if (!gaps.includes(y)) rows[y][x] = "#";
  };

  // Outer defensive walls with gaps
  h(6, 5, 36, [12, 20, 28]);
  h(23, 5, 36, [12, 20, 28]);
  v(10, 7, 22, [11, 18]);
  v(31, 7, 22, [11, 18]);

  // Inner walls creating corridors
  h(11, 8, 15);
  h(11, 26, 33);
  h(18, 8, 15);
  h(18, 26, 33);
  v(15, 11, 18);
  v(26, 11, 18);

  // Center arena (open space for boss)
  // Boss will spawn at center (21, 15)

  return rows.map(row => row.join(""));
}

const MAPS = {
  "urban": {
    name: "Urban Warfare",
    map: buildUrbanWarfareMap(),
    chests: [
      { x: 3.5,  y: 2.5  },
      { x: 10.5, y: 2.5  },
      { x: 13.5, y: 2.5  },
      { x: 22.5, y: 2.5  },
      { x: 32.5, y: 2.5  },
      { x: 39.5, y: 4.5  },
      { x: 4.5,  y: 8.5  },
      { x: 16.5, y: 8.5  },
      { x: 25.5, y: 8.5  },
      { x: 38.5, y: 9.5  },
      { x: 3.5,  y: 13.5 },
      { x: 18.5, y: 13.5 },
      { x: 29.5, y: 13.5 },
      { x: 39.5, y: 14.5 },
      { x: 8.5,  y: 18.5 },
      { x: 24.5, y: 18.5 },
      { x: 33.5, y: 18.5 },
      { x: 3.5,  y: 24.5 },
      { x: 18.5, y: 25.5 },
      { x: 30.5, y: 25.5 },
      { x: 39.5, y: 27.5 },
    ]
  },
  "village": {
    name: "Pastoral Village",
    map: buildPastoralVillageMap(),
    chests: [
      { x: 8.5,  y: 6.5  },   // In houses
      { x: 23.5, y: 6.5  },
      { x: 36.5, y: 8.5  },
      { x: 8.5,  y: 17.5 },
      { x: 25.5, y: 17.5 },
      { x: 38.5, y: 18.5 },
      { x: 9.5,  y: 26.5 },
      { x: 26.5, y: 26.5 },
      { x: 38.5, y: 26.5 },
      { x: 15.5, y: 11.5 },  // Near fences
      { x: 33.5, y: 21.5 },
      { x: 12.5, y: 2.5  },  // Open areas
      { x: 30.5, y: 3.5  },
      { x: 2.5,  y: 10.5 },
      { x: 40.5, y: 12.5 },
      { x: 2.5,  y: 20.5 },
      { x: 15.5, y: 28.5 },
      { x: 32.5, y: 28.5 },
    ]
  },
  "boss": {
    name: "Boss Arena",
    map: buildBossArenaMap(),
    chests: [
      { x: 8.5,  y: 3.5  },   // Outer areas
      { x: 21.5, y: 2.5  },
      { x: 33.5, y: 3.5  },
      { x: 3.5,  y: 10.5 },
      { x: 38.5, y: 10.5 },
      { x: 3.5,  y: 19.5 },
      { x: 38.5, y: 19.5 },
      { x: 8.5,  y: 26.5 },
      { x: 21.5, y: 27.5 },
      { x: 33.5, y: 26.5 },
      { x: 11.5, y: 13.5 },  // Corridors
      { x: 29.5, y: 13.5 },
      { x: 11.5, y: 16.5 },
      { x: 29.5, y: 16.5 },
    ],
    bossSpawn: { x: 21, y: 15 }  // Center of arena
  }
};

let map = MAPS.urban.map;
let CHEST_POSITIONS = MAPS.urban.chests;

// ─────────────────────────────────────────────
//  GUN DATA  (Delta Force-inspired stats)
// ─────────────────────────────────────────────
// recoil: 0-1 (1 = heavy), hipfire: 0-1 (1 = very accurate), adsTime: seconds, damage, rpm, magSize
const GUN_STATS = {
  "M1911":                  { recoil:0.28, hipfire:0.72, adsTime:0.18, damage:32, rpm:420, magSize:8,  ammoType:"Pistol ammo",        fireMode:"semi" },
  "G18":                    { recoil:0.55, hipfire:0.45, adsTime:0.16, damage:16, rpm:1200,magSize:18, ammoType:"Pistol ammo",        fireMode:"auto" },
  "Car-15 Assault Rifle":   { recoil:0.52, hipfire:0.48, adsTime:0.28, damage:24, rpm:700, magSize:30, ammoType:"Assault rifle ammo", fireMode:"auto" },
  "QBZ95-1 Assault Rifle":  { recoil:0.58, hipfire:0.12, adsTime:0.30, damage:30, rpm:650, magSize:30, ammoType:"Assault rifle ammo", fireMode:"auto" },
  "M4A1 Assault Rifle":     { recoil:0.40, hipfire:0.62, adsTime:0.28, damage:36, rpm:720, magSize:30, ammoType:"Assault rifle ammo", fireMode:"auto" },
  "AS Val Assault Rifle":   { recoil:0.35, hipfire:0.70, adsTime:0.26, damage:40, rpm:1350,magSize:20, ammoType:"Assault rifle ammo", fireMode:"auto" },
  "K416 Assault Rifle":     { recoil:0.38, hipfire:0.64, adsTime:0.28, damage:48, rpm:700, magSize:30, ammoType:"Assault rifle ammo", fireMode:"auto" },
  "AUG Assault Rifle":      { recoil:0.18, hipfire:0.86, adsTime:0.30, damage:31, rpm:680, magSize:30, ammoType:"Assault rifle ammo", fireMode:"auto" },
  "K437 Assault Rifle":     { recoil:0.44, hipfire:0.60, adsTime:0.29, damage:45, rpm:660, magSize:30, ammoType:"Assault rifle ammo", fireMode:"auto" },
  "M7 Battle Rifle":        { recoil:0.62, hipfire:0.45, adsTime:0.38, damage:78, rpm:350, magSize:20, ammoType:"Battle rifle ammo",  fireMode:"semi" },
  "UZI Submachine Gun":     { recoil:0.30, hipfire:0.66, adsTime:0.20, damage:20, rpm:950, magSize:25, ammoType:"SMG ammo",           fireMode:"auto" },
  "MP5 Submachine Gun":     { recoil:0.32, hipfire:0.70, adsTime:0.22, damage:24, rpm:800, magSize:30, ammoType:"SMG ammo",           fireMode:"auto" },
  "MP7 Submachine Gun":     { recoil:0.48, hipfire:0.72, adsTime:0.20, damage:48, rpm:950, magSize:40, ammoType:"SMG ammo",           fireMode:"auto" },
  "P90 Submachine Gun":     { recoil:0.30, hipfire:0.68, adsTime:0.22, damage:23, rpm:1150,magSize:50, ammoType:"SMG ammo",           fireMode:"auto" },
  "SR-3M Compact Assault Rifle":{ recoil:0.36, hipfire:0.66, adsTime:0.24, damage:43, rpm:1100,magSize:20, ammoType:"Assault rifle ammo", fireMode:"auto" },
  "S12K Shotgun":           { recoil:0.72, hipfire:0.40, adsTime:0.44, damage:80, rpm:200, magSize:6,  ammoType:"Shotgun ammo",      fireMode:"semi", pellets:8 },
  "M249 Light Machine Gun": { recoil:0.55, hipfire:0.48, adsTime:0.52, damage:28, rpm:750, magSize:100,ammoType:"Machine gun ammo",  fireMode:"auto" },
  "PKM General Machine Gun":{ recoil:0.60, hipfire:0.44, adsTime:0.55, damage:34, rpm:650, magSize:100,ammoType:"Machine gun ammo",  fireMode:"auto" },
  "M250 General Machine Gun":{ recoil:0.58, hipfire:0.46, adsTime:0.54, damage:32, rpm:700, magSize:100,ammoType:"Machine gun ammo", fireMode:"auto" },
  "SR-25 Marksman Rifle":   { recoil:0.55, hipfire:0.38, adsTime:0.40, damage:60, rpm:280, magSize:20, ammoType:"Marksman ammo",     fireMode:"semi" },
  "M14 Marksman Rifle":     { recoil:0.52, hipfire:0.40, adsTime:0.38, damage:78, rpm:300, magSize:20, ammoType:"Marksman ammo",     fireMode:"auto" },
  "R93 Sniper Rifle":       { recoil:0.80, hipfire:0.18, adsTime:0.60, damage:100,rpm:60,  magSize:5,  ammoType:"Sniper ammo",       fireMode:"bolt" },
  "AWM Sniper Rifle":       { recoil:0.90, hipfire:0.14, adsTime:0.70, damage:150,rpm:45,  magSize:5,  ammoType:"AWM ammo",          fireMode:"bolt" },
  "Boss Gun":               { recoil:0.30, hipfire:0.80, adsTime:0.20, damage:50, rpm:120, magSize:999,ammoType:null,                fireMode:"auto" },
};

// Default rifle stats when no gun equipped
const DEFAULT_GUN = { recoil:0.42, hipfire:0.58, adsTime:0.30, damage:25, rpm:600, magSize:30, ammoType:null, fireMode:"auto" };

// ─────────────────────────────────────────────
//  ITEM CATALOG (loot / prices)
// ─────────────────────────────────────────────
const BACKPACK_SLOT_COUNT = 5;
const STORAGE_SLOT_COUNT = 50;
const AMMO_STACK_SIZE = 60;

const ITEM_CATALOG = {
  Leather: { buyPrice: 5000, sellPrice: 4000, chestChance: 0.20 },
  Paper: { buyPrice: 3000, sellPrice: 2000, chestChance: 0.40 },
  "lithium battery": { buyPrice: 6000, sellPrice: 5000, chestChance: 0.40 },
  "Construction site drawings": { buyPrice: 6000, sellPrice: 5000, chestChance: 0.35 },
  "Wood Plank": { buyPrice: 2000, sellPrice: 1500, chestChance: 0.15 },
  "Iron plate": { buyPrice: 25000, sellPrice: 24000, chestChance: 0.05 },
  "Gold Bar": { buyPrice: 500000, sellPrice: 498000, chestChance: 0.01 },
  "Gold Coin": { buyPrice: 50000, sellPrice: 45000, chestChance: 0.10 },
  "Silver Coin": { buyPrice: 10000, sellPrice: 8000, chestChance: 0.30 },
  "Sound Card": { buyPrice: 40000, sellPrice: 35000, chestChance: 0.20 },
  "Tank Model": { buyPrice: 3000000, sellPrice: 2900000, chestChance: 0.06 },
  "Graphic Card": { buyPrice: 380000, sellPrice: 375000, chestChance: 0.08 },
  "Heart Of Africa": { buyPrice: 13000000, sellPrice: 13000000, chestChance: 0.02 },
  "Wine Bottle": { buyPrice: 40000, sellPrice: 38000, chestChance: 0.20 },
  Glass: { buyPrice: 30000, sellPrice: 28000, chestChance: 0.26 },
  "Lady pendant": { buyPrice: 20000, sellPrice: 18000, chestChance: 0.40 },
  CPU: { buyPrice: 50000, sellPrice: 45000, chestChance: 0.10 },
  "Pocket Watch": { buyPrice: 300000, sellPrice: 295000, chestChance: 0.10 },
  Book: { buyPrice: 30000, sellPrice: 28000, chestChance: 0.26 },
  "titanium alloy plate": { buyPrice: null, sellPrice: 300000, chestChance: 0.01 },
  "Pistol ammo": { buyPrice: 300, sellPrice: 20, chestChance: 0.35, isAmmo: true },
  "SMG ammo": { buyPrice: 300, sellPrice: 20, chestChance: 0.35, isAmmo: true },
  "Assault rifle ammo": { buyPrice: 300, sellPrice: 20, chestChance: 0.35, isAmmo: true },
  "Battle rifle ammo": { buyPrice: 300, sellPrice: 20, chestChance: 0.35, isAmmo: true },
  "Marksman ammo": { buyPrice: 300, sellPrice: 20, chestChance: 0.35, isAmmo: true },
  "Machine gun ammo": { buyPrice: 300, sellPrice: 20, chestChance: 0.35, isAmmo: true },
  "Shotgun ammo": { buyPrice: 300, sellPrice: 20, chestChance: 0.35, isAmmo: true },
  "Sniper ammo": { buyPrice: 20000, sellPrice: 300, chestChance: 0.15, isAmmo: true },
  "AWM ammo": { buyPrice: 20000, sellPrice: 10000, isAmmo: true },
  "Simple Syringe": { buyPrice: 1000, sellPrice: 700, isMed: true, healRate: 10, healTotal: 40 },
  "Regular Syringe": { buyPrice: 10000, sellPrice: 7000, isMed: true, healRate: 15, healTotal: 90 },
  "Basic Muzzle Brake": { buyPrice: 10000, sellPrice: 10000, isAttachment: true, slot: "muzzle", recoilControl: 0.08 },
  "Heavy Suppressor": { buyPrice: 45000, sellPrice: 45000, isAttachment: true, slot: "muzzle", recoilControl: 0.14, adsSpeed: -0.03 },
  "Compensator": { buyPrice: 80000, sellPrice: 80000, isAttachment: true, slot: "muzzle", recoilControl: 0.20, hipfire: -0.03 },
  "Vertical Fore Grip": { buyPrice: 25000, sellPrice: 25000, isAttachment: true, slot: "foreGrip", recoilControl: 0.06, adsSpeed: 0.04 },
  "Angled Fore Grip": { buyPrice: 40000, sellPrice: 40000, isAttachment: true, slot: "foreGrip", adsSpeed: 0.10 },
  "Lightweight Fore Grip": { buyPrice: 60000, sellPrice: 60000, isAttachment: true, slot: "foreGrip", adsSpeed: 0.07, hipfire: 0.04 },
  "Rubber Back Grip": { buyPrice: 18000, sellPrice: 18000, isAttachment: true, slot: "backGrip", hipfire: 0.05 },
  "Tactical Back Grip": { buyPrice: 36000, sellPrice: 36000, isAttachment: true, slot: "backGrip", hipfire: 0.08, adsSpeed: 0.03 },
  "Heavy Back Grip": { buyPrice: 65000, sellPrice: 65000, isAttachment: true, slot: "backGrip", recoilControl: 0.06, hipfire: 0.04 },
  "High-Flow Gas Block": { buyPrice: 30000, sellPrice: 30000, isAttachment: true, slot: "gasBlock", fireRate: 0.10 },
  "Stabilized Gas Block": { buyPrice: 30000, sellPrice: 30000, isAttachment: true, slot: "gasBlock", recoilControl: 0.10 },
  "1.5x Panoramic Red Dot Sight": { buyPrice: 20000, sellPrice: 20000, isAttachment: true, slot: "optic", zoom: 1.5, opticStyle: "redDot" },
  "Viewpoint 3x Optic": { buyPrice: 60000, sellPrice: 60000, isAttachment: true, slot: "optic", zoom: 3, opticStyle: "scope3" },
  "Insight 3/7 Sniper Scope": { buyPrice: 150000, sellPrice: 150000, isAttachment: true, slot: "optic", zoom: 3, altZoom: 7, opticStyle: "scope37" },
};

/** Canonical names for chest rolls (no ammo in regular chests or AI drop boxes) */
const CHEST_LOOT_POOL = Object.entries(ITEM_CATALOG)
  .filter(([, m]) => m.chestChance != null && !m.isAmmo)
  .map(([name, m]) => ({ name, chance: m.chestChance }));

function catalogToShopItem(name) {
  const m = ITEM_CATALOG[name];
  if (!m) return null;
  const ammoCount = name === "AWM ammo" ? 5 : AMMO_STACK_SIZE;
  return {
    name,
    price: m.buyPrice,
    count: m.isAmmo ? ammoCount : 1,
  };
}

const LOOT_SHOP_ITEMS = [
  "Leather", "Paper", "lithium battery", "Construction site drawings",
  "Wood Plank", "Iron plate", "Gold Bar", "Gold Coin", "Silver Coin",
  "Sound Card", "Tank Model", "Graphic Card", "Heart Of Africa",
  "Wine Bottle", "Glass", "Lady pendant", "CPU", "Pocket Watch",
  "Book", "titanium alloy plate", "Simple Syringe", "Regular Syringe",
].map(catalogToShopItem).filter(Boolean);

const ATTACHMENT_SHOP_ITEMS = [
  "Basic Muzzle Brake", "Heavy Suppressor", "Compensator",
  "Vertical Fore Grip", "Angled Fore Grip", "Lightweight Fore Grip",
  "Rubber Back Grip", "Tactical Back Grip", "Heavy Back Grip",
  "High-Flow Gas Block", "Stabilized Gas Block",
  "1.5x Panoramic Red Dot Sight", "Viewpoint 3x Optic", "Insight 3/7 Sniper Scope",
].map(catalogToShopItem).filter(Boolean);

const AMMO_SHOP_ITEMS = [
  "Pistol ammo", "SMG ammo", "Assault rifle ammo", "Battle rifle ammo",
  "Marksman ammo", "Machine gun ammo", "Shotgun ammo", "Sniper ammo", "AWM ammo",
].map(catalogToShopItem).filter(Boolean);

// ─────────────────────────────────────────────
//  SHOP DATA
// ─────────────────────────────────────────────
const CRAFT_ITEMS = ["titanium alloy plate", "Leather", "Iron plate", "Wood Plank"];
const ZERO_HOUR_ITEMS = {
  armor: [
    { name:"Level 1 Armor",  price:10000,  absorb:0.05 },
    { name:"Level 2 Armor",  price:30000,  absorb:0.10 },
    { name:"Level 3 Armor",  price:100000, absorb:0.15 },
    { name:"Level 4 Armor",  price:300000, absorb:0.20 },
    { name:"Level 5 Armor",  price:800000, absorb:0.25 },
    { name:"Level 6 Armor",  craft:CRAFT_ITEMS, absorb:0.30 }
  ],
  helmets: [
    { name:"Level 1 Helmet", price:6000,   absorb:0.05 },
    { name:"Level 2 Helmet", price:18000,  absorb:0.10 },
    { name:"Level 3 Helmet", price:60000,  absorb:0.15 },
    { name:"Level 4 Helmet", price:180000, absorb:0.20 },
    { name:"Level 5 Helmet", price:480000, absorb:0.25 },
    { name:"Level 6 Helmet", craft:CRAFT_ITEMS, absorb:0.30 }
  ],
  backpacks: [
    { name:"Level 1 Backpack", price:5000,   slots:10 },
    { name:"Level 2 Backpack", price:15000,  slots:20 },
    { name:"Level 3 Backpack", price:50000,  slots:30 },
    { name:"Level 4 Backpack", price:150000, slots:40 },
    { name:"Level 5 Backpack", price:400000, slots:50 },
    { name:"Level 6 Backpack", price:1000000, slots:60 }
  ],
  guns: Object.keys(GUN_STATS).map(name => {
    const s = GUN_STATS[name];
    const prices = {
      "M1911":10000,"G18":30000,"Car-15 Assault Rifle":40000,"QBZ95-1 Assault Rifle":70000,
      "M4A1 Assault Rifle":100000,"AS Val Assault Rifle":500000,"K416 Assault Rifle":400000,
      "AUG Assault Rifle":350000,"K437 Assault Rifle":300000,"M7 Battle Rifle":500000,
      "UZI Submachine Gun":40000,"MP5 Submachine Gun":100000,"MP7 Submachine Gun":200000,
      "P90 Submachine Gun":150000,"SR-3M Compact Assault Rifle":200000,"S12K Shotgun":100000,
      "M249 Light Machine Gun":200000,"PKM General Machine Gun":150000,"M250 General Machine Gun":250000,
      "SR-25 Marksman Rifle":350000,"M14 Marksman Rifle":250000,"R93 Sniper Rifle":100000,"AWM Sniper Rifle":1000000
    };
    return { name, price:prices[name]||50000, ammo:s.ammoType, fireMode:s.fireMode };
  }),
  ammo: AMMO_SHOP_ITEMS,
  attachments: ATTACHMENT_SHOP_ITEMS,
  loot: LOOT_SHOP_ITEMS,
  craftItems: [],
};

// API_BASE will be set to current server location or custom URL
const API_BASE = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
  ? window.location.origin
  : (localStorage.getItem('custom-api-url') || window.location.origin);
const MOD_TYPES = {
  muzzle: { label:"Muzzle" },
  foreGrip: { label:"Fore grip" },
  backGrip: { label:"Back grip" },
  gasBlock: { label:"Gas block" },
  optic: { label:"Optic" },
};

function getAttachmentMeta(name) {
  const meta = ITEM_CATALOG[name];
  return meta?.isAttachment ? meta : null;
}

function getMedMeta(name) {
  const meta = ITEM_CATALOG[name];
  return meta?.isMed ? meta : null;
}

function getAttachmentsForSlot(slot) {
  return ZERO_HOUR_ITEMS.attachments.filter(item => getAttachmentMeta(item.name)?.slot === slot);
}

function getActiveGunMods() {
  const acc = getAccount();
  return state.equippedGun ? getGunMods(acc || { weaponMods:{} }, state.equippedGun) : {};
}

function getActiveOpticMeta() {
  const opticName = getActiveGunMods().optic;
  return getAttachmentMeta(opticName) || { zoom: 1, opticStyle: "iron", name: "No gun optic" };
}

function getActiveOpticZoom() {
  const optic = getActiveOpticMeta();
  if (optic.altZoom && state.opticAltZoom) return optic.altZoom;
  return optic.zoom || 1;
}

function effectiveFov() {
  const zoom = state.adsProgress > 0.72 ? getActiveOpticZoom() : 1;
  return FOV / zoom;
}

function getGunMods(acc, gunName) {
  if (!acc.weaponMods) acc.weaponMods = {};
  if (!acc.weaponMods[gunName]) acc.weaponMods[gunName] = { muzzle:null, foreGrip:null, backGrip:null };
  const mods = acc.weaponMods[gunName];
  for (const key of Object.keys(MOD_TYPES)) {
    const current = mods[key];
    mods[key] = typeof current === "string" && getAttachmentMeta(current)?.slot === key ? current : null;
  }
  return mods;
}

function getModifiedGunStats(gunName, acc = getAccount()) {
  const base = GUN_STATS[gunName];
  if (!base) return null;
  const mods = acc ? getGunMods(acc, gunName) : { muzzle:null, foreGrip:null, backGrip:null };
  let recoilControl = 0;
  let adsSpeed = 0;
  let hipfireBonus = 0;
  let fireRateBonus = 0;
  for (const partName of Object.values(mods)) {
    if (!partName || (acc && !(acc.inventory?.[partName] > 0))) continue;
    const part = getAttachmentMeta(partName);
    if (!part) continue;
    recoilControl += part.recoilControl || 0;
    adsSpeed += part.adsSpeed || 0;
    hipfireBonus += part.hipfire || 0;
    fireRateBonus += part.fireRate || 0;
  }
  return {
    ...base,
    rpm: Math.round(base.rpm * Math.max(0.75, 1 + fireRateBonus)),
    recoil: clamp(base.recoil * Math.max(0.5, 1 - recoilControl), 0.05, 1),
    adsTime: clamp(base.adsTime / Math.max(0.6, 1 + adsSpeed), 0.05, 1),
    hipfire: clamp(base.hipfire + hipfireBonus, 0.05, 0.98),
  };
}

function getShopBuyPrice(name) {
  const lists = [
    ...ZERO_HOUR_ITEMS.guns,
    ...ZERO_HOUR_ITEMS.armor,
    ...ZERO_HOUR_ITEMS.helmets,
    ...ZERO_HOUR_ITEMS.backpacks,
    ...ZERO_HOUR_ITEMS.ammo,
    ...ZERO_HOUR_ITEMS.attachments,
    ...ZERO_HOUR_ITEMS.loot,
  ];
  return lists.find(item => item.name === name)?.price ?? null;
}

function isAmmoItem(name) {
  if (!name) return false;
  if (ITEM_CATALOG[name]?.isAmmo) return true;
  return name.toLowerCase().includes("ammo");
}

function getItemMeta(name) {
  const key = normalizeItemName(name);
  return ITEM_CATALOG[key] || (isAmmoItem(key) ? { buyPrice: 300, sellPrice: key === "AWM ammo" ? 10000 : 20 } : null);
}

function ammoShopStackSize(name) { return name === "AWM ammo" ? 5 : AMMO_STACK_SIZE; }
function maxStackFor(name) { return isAmmoItem(name) ? AMMO_STACK_SIZE : 1; }

function formatMoney(v) { return `$${Number(v).toLocaleString()}`; }

function formatItemPrices(name) {
  const m = getItemMeta(name);
  if (!m) return "No market price";
  const buy = m.buyPrice == null ? "N/A" : formatMoney(m.buyPrice);
  return `Buy ${buy} · Sell ${formatMoney(getSellPrice(name, maxStackFor(name)))}`;
}

function getBackpackSlotCount(acc) {
  if (!acc?.equipped?.backpack) return BACKPACK_SLOT_COUNT;
  const backpack = ZERO_HOUR_ITEMS.backpacks.find(b => b.name === acc.equipped.backpack);
  return backpack?.slots || BACKPACK_SLOT_COUNT;
}

function emptyRunSlots(acc = null) {
  const count = acc ? getBackpackSlotCount(acc) : BACKPACK_SLOT_COUNT;
  return Array.from({ length: count }, () => null);
}

function cloneSlots(slots, acc = null) {
  return emptyRunSlots(acc).map((_, index) => slots?.[index] ? { ...slots[index] } : null);
}

function initRunBackpack() {
  state.runSlots = emptyRunSlots();
  state.zhAmmoInventory = {};
  syncAmmoFromRunSlots();
}

function initRunBackpackFromSetout(acc) {
  state.runSlots = cloneSlots(acc?.setoutSlots, acc);
  if (acc) {
    acc.setoutSlots = emptyRunSlots(acc);
    saveAccount(acc);
  }
  syncAmmoFromRunSlots();
}

function syncAmmoFromRunSlots() {
  state.zhAmmoInventory = {};
  for (const slot of state.runSlots) {
    if (slot && isAmmoItem(slot.name)) {
      state.zhAmmoInventory[slot.name] = (state.zhAmmoInventory[slot.name] || 0) + slot.count;
    }
  }
}

function takeEquippedAmmoIntoRaid(acc, ammoType) {
  if (!acc || !ammoType || !acc.inventory?.[ammoType]) return 0;
  const take = Math.min(maxStackFor(ammoType), acc.inventory[ammoType]);
  if (!addToSlots(state.runSlots, ammoType, take)) return 0;
  acc.inventory[ammoType] -= take;
  if (acc.inventory[ammoType] <= 0) delete acc.inventory[ammoType];
  acc.updatedAt = Date.now();
  saveAccount(acc);
  syncAmmoFromRunSlots();
  return take;
}

function consumeAmmoFromRunSlots(ammoType, count) {
  let left = count;
  for (const slot of state.runSlots) {
    if (left <= 0) break;
    if (!slot || slot.name !== ammoType) continue;
    const take = Math.min(slot.count, left);
    slot.count -= take;
    left -= take;
  }
  for (let i = 0; i < state.runSlots.length; i += 1) {
    if (state.runSlots[i]?.count <= 0) state.runSlots[i] = null;
  }
  syncAmmoFromRunSlots();
  return count - left;
}

function countUsedSlots(slots) { return slots.filter(Boolean).length; }

function canFitInSlots(slots, name, count) {
  let remaining = count;
  const max = maxStackFor(name);
  for (const slot of slots) {
    if (slot && slot.name === name) remaining -= Math.max(0, max - slot.count);
  }
  if (remaining <= 0) return true;
  const free = slots.filter(s => !s).length;
  return free >= Math.ceil(remaining / max);
}

function addToSlots(slots, name, count) {
  if (!canFitInSlots(slots, name, count)) return false;
  let left = count;
  const max = maxStackFor(name);
  for (const slot of slots) {
    if (left <= 0) break;
    if (slot && slot.name === name) {
      const add = Math.min(left, max - slot.count);
      slot.count += add;
      left -= add;
    }
  }
  while (left > 0) {
    const i = slots.findIndex(s => !s);
    if (i < 0) return false;
    const add = Math.min(left, max);
    slots[i] = { name, count: add };
    left -= add;
  }
  return true;
}

function removeSlotAt(slots, index) {
  const slot = slots[index];
  if (!slot) return null;
  const dropped = { ...slot };
  slots[index] = null;
  return dropped;
}

function mergeSlotsToStash(acc, slots) {
  if (!acc.inventory) acc.inventory = {};
  for (const slot of slots) {
    if (!slot) continue;
    acc.inventory[slot.name] = (acc.inventory[slot.name] || 0) + slot.count;
  }
}

function mergeRunToAccountStash() {
  const acc = getAccount();
  if (!acc) return;
  mergeSlotsToStash(acc, state.runSlots);
  acc.updatedAt = Date.now();
  saveAccount(acc);
}

function discardRunLoot() {
  state.runSlots = emptyRunSlots();
  state.zhAmmoInventory = {};
  state.activeMed = null;
}

function pickChestLootName() {
  const total = CHEST_LOOT_POOL.reduce((s, e) => s + e.chance, 0);
  let r = Math.random() * total;
  for (const entry of CHEST_LOOT_POOL) {
    r -= entry.chance;
    if (r <= 0) return entry.name;
  }
  return CHEST_LOOT_POOL[CHEST_LOOT_POOL.length - 1]?.name || "Paper";
}

function rollChestLoot() {
  const items = [];
  const rolls = 1 + (Math.random() < 0.35 ? 1 : 0);
  for (let i = 0; i < rolls; i++) {
    const name = pickChestLootName();
    items.push({ name, count: isAmmoItem(name) ? AMMO_STACK_SIZE : 1 });
  }
  return items;
}

function rollBossLoot() {
  const items = [];
  
  // 0-2 Titanium Alloy Plate
  const titaniumCount = Math.floor(Math.random() * 3); // 0, 1, or 2
  for (let i = 0; i < titaniumCount; i++) {
    items.push({ name: "Titanium Alloy Plate", count: 1 });
  }
  
  // 10% chance for Heart Of Africa
  if (Math.random() < 0.10) {
    items.push({ name: "Heart Of Africa", count: 1 });
  }
  
  // 12% chance for Tank Model
  if (Math.random() < 0.12) {
    items.push({ name: "Tank Model", count: 1 });
  }
  
  // Always add some regular loot too
  const regularLoot = rollChestLoot();
  items.push(...regularLoot);
  
  return items;
}

function dropAiLootBox(enemy) {
  if (state.mode !== "zerohour" || !enemy || enemy.droppedLoot) return;
  enemy.droppedLoot = true;
  
  // Boss drops special loot
  const lootItems = enemy.isBoss ? rollBossLoot() : rollChestLoot();
  
  state.chests.push({
    x: enemy.x,
    y: enemy.y,
    opened: false,
    lootItems: lootItems,
    isAiDrop: true,
    isBossChest: enemy.isBoss || false,
  });
  
  if (enemy.isBoss) {
    showMessage("BOSS DEFEATED! Epic loot dropped!");
  }
}

function emptySlotArray(size) { return Array.from({ length: size }, () => null); }

function normalizeItemName(name) {
  if (name === "wood planks") return "Wood Plank";
  return name;
}

function normalizeAccountInventory(acc) {
  if (!acc.inventory) return;
  for (const [key, count] of Object.entries({ ...acc.inventory })) {
    const canonical = normalizeItemName(key);
    if (canonical !== key) {
      acc.inventory[canonical] = (acc.inventory[canonical] || 0) + count;
      delete acc.inventory[key];
    }
  }
}

function ensureAccountShape(acc) {
  if (!acc.inventory) acc.inventory = {};
  normalizeAccountInventory(acc);
  if (!acc.equipped) acc.equipped = { gun: null, armor: null, helmet: null, ammoType: null };
  if (!acc.weaponMods) acc.weaponMods = {};
  for (const gunName of Object.keys(GUN_STATS)) getGunMods(acc, gunName);
  if (!acc.storage || acc.storage.length !== STORAGE_SLOT_COUNT) {
    acc.storage = emptySlotArray(STORAGE_SLOT_COUNT);
  }
  const expectedSlots = getBackpackSlotCount(acc);
  if (!acc.setoutSlots || acc.setoutSlots.length !== expectedSlots) {
    acc.setoutSlots = emptyRunSlots(acc);
  }
  for (const slot of acc.storage) {
    if (slot?.name) slot.name = normalizeItemName(slot.name);
  }
  for (const slot of acc.setoutSlots) {
    if (slot?.name) slot.name = normalizeItemName(slot.name);
  }
  return acc;
}

function isInGameUiOpen() {
  return state.running && (state.uiOpen === "backpack" || state.uiOpen === "chest");
}

function closeAllModals() {
  state.uiOpen = null;
  state.activeChest = null;
  state.isFiring = false;
  for (const el of [backpackModal, chestModal, shopModal, loginModal, sellModal, storageModal, setoutModal, gearPickerModal]) {
    if (el) el.hidden = true;
  }
}

function trackKeyDown(e) {
  const code = e.code;
  if (code === "KeyW" || e.key === "w" || e.key === "W") state.keys.add("w");
  if (code === "KeyA" || e.key === "a" || e.key === "A") state.keys.add("a");
  if (code === "KeyS" || e.key === "s" || e.key === "S") state.keys.add("s");
  if (code === "KeyD" || e.key === "d" || e.key === "D") state.keys.add("d");
  if (code === "ShiftLeft" || code === "ShiftRight" || e.key === "Shift") state.keys.add("shift");
  if (e.key === "f" || e.key === "F") state.keys.add("f");
}

function trackKeyUp(e) {
  const code = e.code;
  if (code === "KeyW" || e.key === "w" || e.key === "W") state.keys.delete("w");
  if (code === "KeyA" || e.key === "a" || e.key === "A") state.keys.delete("a");
  if (code === "KeyS" || e.key === "s" || e.key === "S") state.keys.delete("s");
  if (code === "KeyD" || e.key === "d" || e.key === "D") state.keys.delete("d");
  if (code === "ShiftLeft" || code === "ShiftRight" || e.key === "Shift") state.keys.delete("shift");
  if (e.key === "f" || e.key === "F") state.keys.delete("f");
}

function releasePointer() { document.exitPointerLock?.(); }

function getSpecialItemClass(name) {
  return name === "Heart Of Africa" ? " special-item-heart-africa" : "";
}

function renderSlotGrid(container, slots, { onSlotClick, readonly = false } = {}) {
  if (!container) return;
  container.innerHTML = "";
  slots.forEach((slot, index) => {
    const div = document.createElement("div");
    div.className = "slot-cell" + (slot ? getSpecialItemClass(slot.name) : " empty");
    if (slot) {
      const med = getMedMeta(slot.name);
      const extra = med ? `<span>${slot.healLeft ?? med.healTotal} HP left</span>` : "";
      div.innerHTML = `<strong>${slot.name}</strong><span>×${slot.count}</span>${extra}<span class="slot-tooltip">${formatItemPrices(slot.name)}</span>`;
      if (!readonly && onSlotClick) div.addEventListener("click", () => onSlotClick(index));
    } else {
      div.textContent = "—";
    }
    container.appendChild(div);
  });
}

function updateRaidEquipDisplay() {
  if (raidEquippedGunEl) raidEquippedGunEl.textContent = state.equippedGun || "None";
  if (raidEquippedArmorEl) raidEquippedArmorEl.textContent = state.equippedArmor || "None";
  if (raidEquippedHelmetEl) raidEquippedHelmetEl.textContent = state.equippedHelmet || "None";
}

function openBackpack() {
  if ((state.mode !== "zerohour" && state.mode !== "zhmulti") || !state.running) return;
  releasePointer();
  state.isFiring = false;
  state.uiOpen = "backpack";
  if (backpackModal) {
    backpackModal.hidden = false;
    backpackModal.removeAttribute("hidden");
  }
  renderBackpackUi();
}

function closeBackpack() {
  if (state.uiOpen === "backpack") state.uiOpen = null;
  if (backpackModal) backpackModal.hidden = true;
}

function useMedFromSlot(index) {
  const slot = state.runSlots?.[index];
  const med = getMedMeta(slot?.name);
  if (!slot || !med) return false;
  if (state.hp >= state.maxHp) { showMessage("HP already full"); return true; }
  if (state.activeMed) { showMessage("Already using meds"); return true; }
  const effectiveness = getMedicalEffectiveness();
  state.activeMed = {
    slotIndex: index,
    name: slot.name,
    rate: med.healRate * effectiveness,
    remaining: Math.round((slot.healLeft ?? med.healTotal) * effectiveness),
    carry: 0,
  };
  state.isFiring = false;
  showMessage(`Using ${slot.name}`);
  return true;
}

function updateMedUse(dt) {
  const med = state.activeMed;
  if (!med || state.mode !== "zerohour" || state.isDead || !state.running) return;
  const slot = state.runSlots?.[med.slotIndex];
  if (!slot || slot.name !== med.name || state.hp >= state.maxHp || med.remaining <= 0) {
    finishMedUse();
    return;
  }
  med.carry += med.rate * dt;
  const heal = Math.min(Math.floor(med.carry), med.remaining, state.maxHp - state.hp);
  if (heal <= 0) return;
  med.carry -= heal;
  med.remaining -= heal;
  state.hp = Math.min(state.maxHp, state.hp + heal);
  slot.healLeft = med.remaining;
  if (state.hp >= state.maxHp || med.remaining <= 0) finishMedUse();
}

function finishMedUse() {
  const med = state.activeMed;
  if (!med) return;
  const slot = state.runSlots?.[med.slotIndex];
  if (slot && slot.name === med.name) {
    if (med.remaining > 0 && state.hp >= state.maxHp) {
      slot.healLeft = med.remaining;
      showMessage(`${slot.name} saved ${med.remaining} HP`);
    } else if (med.remaining <= 0) {
      state.runSlots[med.slotIndex] = null;
      showMessage(`${med.name} used up`);
    }
  }
  state.activeMed = null;
  renderBackpackUi();
  updateHud();
}

function renderBackpackUi() {
  if (!state.runSlots) return;
  const maxSlots = state.runSlots.length;
  if (backpackSlotCountEl) backpackSlotCountEl.textContent = `${countUsedSlots(state.runSlots)} / ${maxSlots}`;
  updateRaidEquipDisplay();
  renderSlotGrid(backpackSlotsEl, state.runSlots, {
    onSlotClick: (index) => {
      if (useMedFromSlot(index)) {
        renderBackpackUi();
        updateHud();
        return;
      }
      const dropped = removeSlotAt(state.runSlots, index);
      if (dropped) {
        syncAmmoFromRunSlots();
        // In zhmulti mode, drop item to world for others to pick up
        if (state.mode === "zhmulti") {
          dropItemToWorld(dropped.name, dropped.count);
        }
        showMessage(`Dropped ${dropped.name}`);
        renderBackpackUi();
        updateHud();
      }
    },
  });
}

function openChestUi(chest) {
  if (!chest) return;
  releasePointer();
  state.isFiring = false;
  state.uiOpen = "chest";
  state.activeChest = chest;
  if (!chest.lootItems) chest.lootItems = rollChestLoot();
  if (!chest.opened) chest.opened = true;
  if (chestModal) {
    chestModal.hidden = false;
    chestModal.removeAttribute("hidden");
  }
  renderChestUi();
}

function closeChestUi() {
  if (state.uiOpen === "chest") state.uiOpen = null;
  state.activeChest = null;
  if (chestModal) chestModal.hidden = true;
}

function renderChestUi() {
  const chest = state.activeChest;
  if (!chest) return;
  
  // Handle item chests (shared dropped items)
  if (chest.isItemChest) {
    const lootSlots = chest.items.map(item => ({ name: item.name, count: item.count }));
    renderSlotGrid(chestLootSlotsEl, lootSlots, {
      onSlotClick: (index) => {
        const item = chest.items[index];
        if (!item) return;
        if (!canFitInSlots(state.runSlots, item.name, item.count)) {
          showMessage("Backpack full");
          return;
        }
        addToSlots(state.runSlots, item.name, item.count);
        
        // Remove from chest
        chest.items.splice(index, 1);
        
        // Update the actual chest in state
        const actualChest = state.droppedItemChests.find(c => c.id === chest.id);
        if (actualChest) {
          actualChest.items = actualChest.items.filter(i => i.id !== item.id);
          // Remove chest if empty
          if (actualChest.items.length === 0) {
            state.droppedItemChests = state.droppedItemChests.filter(c => c.id !== chest.id);
          }
        }
        
        // Send to network
        if (state.socket && state.socket.readyState === WebSocket.OPEN) {
          state.socket.send(JSON.stringify({
            type: "pickitem",
            chestId: chest.id,
            itemId: item.id,
            playerId: state.playerId
          }));
        }
        
        syncAmmoFromRunSlots();
        showMessage(`Took ${item.name}`);
        renderChestUi();
        updateHud();
        // Don't auto-close empty chests
      },
    });
  } else {
    // Handle regular loot chests
    const lootSlots = chest.lootItems.map(item => ({ name: item.name, count: item.count }));
    renderSlotGrid(chestLootSlotsEl, lootSlots, {
      onSlotClick: (index) => {
        const item = chest.lootItems[index];
        if (!item) return;
        if (!canFitInSlots(state.runSlots, item.name, item.count)) {
          showMessage("Backpack full");
          return;
        }
        addToSlots(state.runSlots, item.name, item.count);
        chest.lootItems.splice(index, 1);
        syncAmmoFromRunSlots();
        showMessage(`Took ${item.name}`);
        renderChestUi();
        updateHud();
        // Don't auto-close empty chests
      },
    });
  }
  
  renderSlotGrid(chestBackpackSlotsEl, state.runSlots, {
    onSlotClick: (index) => {
      const dropped = removeSlotAt(state.runSlots, index);
      if (dropped) {
        syncAmmoFromRunSlots();
        // In zhmulti mode, drop to shared chest
        if (state.mode === "zhmulti") {
          dropItemToWorld(dropped.name, dropped.count);
        }
        showMessage(`Dropped ${dropped.name}`);
        renderChestUi();
        renderBackpackUi();
        updateHud();
      }
    },
  });
}

function toggleBackpack() {
  if (state.uiOpen === "chest") { closeChestUi(); return; }
  if (state.uiOpen === "backpack") { closeBackpack(); return; }
  if ((state.mode === "zerohour" || state.mode === "zhmulti") && state.running) openBackpack();
}

function findOrCreateItemChest(x, y) {
  // Find existing chest within 4 meters
  for (const chest of state.droppedItemChests || []) {
    const dist = Math.hypot(chest.x - x, chest.y - y);
    if (dist < 4) {
      return chest;
    }
  }
  
  // Create new chest
  const chestId = `chest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const newChest = {
    id: chestId,
    x: x,
    y: y,
    items: []
  };
  
  if (!state.droppedItemChests) state.droppedItemChests = [];
  state.droppedItemChests.push(newChest);
  
  // Send to network
  if (state.socket && state.socket.readyState === WebSocket.OPEN) {
    state.socket.send(JSON.stringify({
      type: "createchest",
      chestId: chestId,
      x: x,
      y: y
    }));
  }
  
  return newChest;
}

function dropItemToWorld(itemName, count) {
  if (state.mode !== "zhmulti") return;
  
  // Find or create a chest for this item
  const chest = findOrCreateItemChest(state.x, state.y);
  
  const itemId = `item-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const droppedItem = {
    id: itemId,
    name: itemName,
    count: count
  };
  
  chest.items.push(droppedItem);
  
  // Send to network
  if (state.socket && state.socket.readyState === WebSocket.OPEN) {
    state.socket.send(JSON.stringify({
      type: "dropitem",
      chestId: chest.id,
      itemId: itemId,
      itemName: itemName,
      count: count
    }));
  }
}

function openItemChestUi(itemChest) {
  if (!itemChest || itemChest.items.length === 0) return;
  releasePointer();
  state.isFiring = false;
  state.uiOpen = "chest";
  state.activeChest = { ...itemChest, isItemChest: true };
  if (chestModal) {
    chestModal.hidden = false;
    chestModal.removeAttribute("hidden");
  }
  renderChestUi();
}

function tryOpenNearbyChest() {
  if (state.mode !== "zerohour" && state.mode !== "zhmulti") return;
  if (state.uiOpen === "chest") { closeChestUi(); return; }
  if (state.uiOpen === "backpack") return;
  
  // Try to open nearby item chests in zhmulti mode first
  if (state.mode === "zhmulti") {
    for (const itemChest of state.droppedItemChests) {
      const dist = Math.hypot(itemChest.x - state.x, itemChest.y - state.y);
      if (dist < 2.5) {
        openItemChestUi(itemChest);
        return;
      }
    }
  }
  
  // Try to open nearby loot chests
  for (const chest of state.chests) {
    // Allow opening already-opened chests to see what's left
    if (Math.hypot(chest.x - state.x, chest.y - state.y) < 2.5) {
      openChestUi(chest);
      return;
    }
  }
}

// ─────────────────────────────────────────────
//  ACCOUNT SYSTEM (server-only, no local cache)
// ─────────────────────────────────────────────
const CURRENT_USER_KEY = "ilovegames-zero-hour-current-user";
const USER_ID_KEY = "ilovegames-zero-hour-user-id";
let currentUser = null;
let currentUserId = null;
let currentAccountData = null; // In-memory only

function getAccount() {
  return currentAccountData;
}

async function saveAccount(a) {
  if (!currentUserId) return;
  ensureAccountShape(a);
  a.updatedAt = Date.now();
  currentAccountData = a; // Update in-memory
  
  try {
    const res = await fetch(`${API_BASE}/api/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: currentUserId,
        accountData: a
      }),
    });
    const data = await res.json();
    if (!data.success) {
      console.error('Failed to save to server:', data.error);
      showMessage("Save failed - check connection");
    }
  } catch (err) {
    console.error('Error saving to server:', err);
    showMessage("Save failed - check connection");
  }
}

function applyAdminMoneyBonus(acc) {
  if (acc?.username === "admin123") acc.money = Math.max(Number(acc.money) || 0, 2000000);
  return acc;
}

function createDefaultAccount(username, password) {
  return applyAdminMoneyBonus(ensureAccountShape({
    username, password, money: 0, updatedAt: Date.now(),
    equipped: { gun: null, armor: null, helmet: null, ammoType: null },
    weaponMods: {},
    inventory: {},
    storage: emptySlotArray(STORAGE_SLOT_COUNT),
    setoutSlots: emptyRunSlots(null),
  }));
}

async function accountLogin() {
  const u = loginName.value.trim(), p = loginPass.value;
  if (!u || !p) { showMessage("Enter username and password"); return; }
  
  // Check if server is accessible
  if (window.location.protocol === 'file:') {
    showMessage("ERROR: Open via server! Run: npm start, then go to http://localhost:3000");
    console.error('You must run the server! Instructions:');
    console.error('1. Open terminal in game folder');
    console.error('2. Run: npm install');
    console.error('3. Run: npm start');
    console.error('4. Open: http://localhost:3000');
    return;
  }
  
  try {
    console.log('Attempting to login at:', `${API_BASE}/api/login`);
    const res = await fetch(`${API_BASE}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u, password: p }),
    });
    
    const data = await res.json();
    console.log('Login response:', data);
    
    if (!data.success) {
      showMessage(data.error || "Login failed");
      return;
    }
    
    let acc = data.account;
    acc = ensureAccountShape(acc);
    applyAdminMoneyBonus(acc);
    
    // Store in memory only (no localStorage)
    currentUser = u;
    currentUserId = data.userId;
    currentAccountData = acc;
    
    // Only store session info (not account data)
    localStorage.setItem(CURRENT_USER_KEY, u);
    localStorage.setItem(USER_ID_KEY, data.userId);
    
    renderZeroHour();
    showMessage(`Logged in as ${u}`);
    loginModal.hidden = true;
  } catch (err) {
    console.error('Login error:', err);
    showMessage("Server not running! Run: npm start");
    console.error('Server must be running! Instructions:');
    console.error('1. Open terminal in game folder');
    console.error('2. Run: npm install (first time only)');
    console.error('3. Run: npm start');
    console.error('4. Open: http://localhost:3000');
  }
}

async function accountCreate() {
  const u = loginName.value.trim(), p = loginPass.value;
  if (!u || !p) { showMessage("Enter username and password"); return; }
  
  // Check if server is accessible
  if (window.location.protocol === 'file:') {
    showMessage("ERROR: Open via server! Run: npm start, then go to http://localhost:3000");
    console.error('You must run the server! Instructions:');
    console.error('1. Open terminal in game folder');
    console.error('2. Run: npm install');
    console.error('3. Run: npm start');
    console.error('4. Open: http://localhost:3000');
    return;
  }
  
  try {
    console.log('Attempting to register at:', `${API_BASE}/api/register`);
    const res = await fetch(`${API_BASE}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u, password: p }),
    });
    
    const data = await res.json();
    console.log('Registration response:', data);
    
    if (!data.success) {
      showMessage(data.error || "Registration failed");
      return;
    }
    
    // Now login to get the account data
    await accountLogin();
  } catch (err) {
    console.error('Registration error:', err);
    showMessage("Server not running! Run: npm start");
    console.error('Server must be running! Instructions:');
    console.error('1. Open terminal in game folder');
    console.error('2. Run: npm install (first time only)');
    console.error('3. Run: npm start');
    console.error('4. Open: http://localhost:3000');
  }
}

function accountLogout() {
  currentUser = null;
  currentUserId = null;
  currentAccountData = null; // Clear in-memory data
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(USER_ID_KEY);
  renderZeroHour();
  showMessage("Logged out");
}

// Export/Import functions removed for security
// All data must come from server to prevent tampering

function redeemCode() {
  const acc = getAccount();
  if (!acc) { showMessage("Login first"); return; }
  const code = prompt("Type in the code:");
  if (code == null) return;
  
  const trimmedCode = code.trim();
  
  if (trimmedCode === "Fw131421") {
    // Special code: 10 Titanium Alloy Plate
    addInventory(acc, "Titanium Alloy Plate", 10);
    saveAccount(acc);
    renderZeroHour();
    showMessage("Code redeemed: +10 Titanium Alloy Plate");
  } else if (trimmedCode === "131421") {
    // Original code: 1 million dollars
    acc.money = (Number(acc.money) || 0) + 1000000;
    saveAccount(acc);
    renderZeroHour();
    showMessage("Code redeemed: +$1,000,000");
  } else {
    showMessage("Invalid code");
  }
}

// ─────────────────────────────────────────────
//  SHOP / INVENTORY
// ─────────────────────────────────────────────
function addInventory(acc, name, count=1) {
  name = normalizeItemName(name);
  acc.inventory[name]=(acc.inventory[name]||0)+count;
}
function canCraft(acc, recipe) { return recipe.every(i=>(acc.inventory[i]||0)>0); }

function buyItem(item) {
  const acc=getAccount();
  if (!acc) { showMessage("Login first"); return; }
  const meta=getItemMeta(item.name);
  if (meta && meta.buyPrice == null && !item.craft) {
    showMessage("Cannot be purchased");
    return;
  }
  if (item.craft) {
    if (!canCraft(acc,item.craft)) { showMessage("Missing craft items"); return; }
    for (const ing of item.craft) acc.inventory[ing]-=1;
  } else {
    const price=item.price ?? meta?.buyPrice;
    if (price == null) { showMessage("Cannot be purchased"); return; }
    if (acc.money<price) { showMessage("Not enough money"); return; }
    acc.money-=price;
  }
  const addCount=isAmmoItem(item.name)?(item.count||AMMO_STACK_SIZE):1;
  addInventory(acc, item.name, addCount);
  saveAccount(acc); renderZeroHour(); showMessage(`Got ${item.name}`);
}

function equipItem(item, category) {
  const acc=getAccount();
  if (!acc) { showMessage("Login first"); return; }
  if (!(acc.inventory[item.name]>0)) { showMessage("Buy it first"); return; }
  acc.equipped[category]=acc.equipped[category]===item.name ? null : item.name;
  // Removed auto-set ammoType when gun equipped - let player choose freely
  saveAccount(acc); renderZeroHour();
}

function shopItemCategory(item, category) {
  if (category === "armor") {
    if (item.name.includes("Helmet")) return "helmet";
    if (item.name.includes("Armor")) return "armor";
  }
  return category;
}

function renderShop(container, items, category) {
  if (!container) return;
  container.innerHTML="";
  const acc=getAccount();
  for (const item of items) {
    const itemCategory=shopItemCategory(item, category);
    const owned=(acc?.inventory[item.name]||0)>0;
    const equipped=acc?.equipped[itemCategory]===item.name;
    const meta=getItemMeta(item.name);
    const price=item.price ?? meta?.buyPrice ?? null;
    const canBuy=!!(item.craft || price != null);
    const cost=item.craft?`Craft: ${item.craft.join(", ")}`
      : price != null ? formatMoney(price) : "Not for sale";
    const sellPreview=getSellPrice(item.name, isAmmoItem(item.name) ? (item.count || AMMO_STACK_SIZE) : 1);
    const details=[cost, item.ammo?`Ammo: ${item.ammo}`:"", item.fireMode?`Mode: ${item.fireMode}`:"", sellPreview?`Sell ${formatMoney(sellPreview)}`:""]
      .filter(Boolean).join(" · ");
    const div=document.createElement("div");
    div.className="shop-item" + getSpecialItemClass(item.name);
    div.innerHTML=`<strong>${item.name}</strong><span>${details}</span><div class="item-actions"></div>`;
    const actions=div.querySelector(".item-actions");
    if (canBuy) {
      const buyBtn=document.createElement("button");
      buyBtn.type="button"; buyBtn.textContent=item.craft?"Craft":"Buy";
      buyBtn.addEventListener("click",()=>buyItem(item));
      actions.appendChild(buyBtn);
    }
    if (itemCategory && owned) {
      const eqBtn=document.createElement("button");
      eqBtn.type="button"; eqBtn.className="equip-btn"+(equipped?" equipped":"");
      eqBtn.textContent=equipped?"Equipped":"Equip";
      eqBtn.addEventListener("click",()=>equipItem(item,itemCategory));
      actions.appendChild(eqBtn);
    }
    container.appendChild(div);
  }
}

function getShopCategoryData(category) {
  if (category === "helmets") return { title:t("helmets"), items:ZERO_HOUR_ITEMS.helmets, category:"armor" };
  if (category === "guns") return { title:t("guns"), items:ZERO_HOUR_ITEMS.guns, category:"gun" };
  if (category === "backpacks") return { title:t("backpacks"), items:ZERO_HOUR_ITEMS.backpacks, category:"backpack" };
  if (category === "ammo") return { title:t("ammo"), items:ZERO_HOUR_ITEMS.ammo, category:null };
  if (category === "meds") return { title:t("meds"), items:ZERO_HOUR_ITEMS.loot.filter(item => getMedMeta(item.name)), category:null };
  if (category === "supplies") return { title:t("supplies"), items:ZERO_HOUR_ITEMS.loot.filter(item => !getMedMeta(item.name)), category:null };
  return { title:t("armors"), items:ZERO_HOUR_ITEMS.armor, category:"armor" };
}

function renderActiveShopCategory() {
  const data = getShopCategoryData(activeShopCategory);
  if (activeShopTitle) activeShopTitle.textContent = data.title;
  renderShop(activeShopList, data.items, data.category);
  shopCategoryButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.shopCategory === activeShopCategory);
  });
}

function renderInventory(acc) {
  inventoryList.innerHTML="";
  const entries=Object.entries(acc?.inventory||{}).filter(([,c])=>c>0);
  inventoryCount.textContent=`${entries.reduce((s,[,c])=>s+c,0)} items`;
  if (!entries.length) { inventoryList.innerHTML=`<div class="inventory-item">No items yet</div>`; return; }
  for (const [name,count] of entries) {
    const div=document.createElement("div");
    div.className="inventory-item" + getSpecialItemClass(name);
    div.innerHTML=`<strong>${name}</strong> ×${count}`;
    inventoryList.appendChild(div);
  }
}

function renderZeroHour() {
  const acc=getAccount();
  accountStatus.textContent=acc?`Logged in: ${acc.username}`:"Not logged in";
  const m=acc?.money||0;
  if (moneyValue) moneyValue.textContent=formatMoney(m);
  if (zhMoneyValue) zhMoneyValue.textContent=formatMoney(m);

  renderActiveShopCategory();
  renderInventory(acc);

  // Update equip slot display
  const eq=acc?.equipped||{};
  equippedGunEl.textContent=eq.gun||"None";
  equippedArmorEl.textContent=eq.armor||"None";
  equippedHelmetEl.textContent=eq.helmet||"None";
  equippedBackpackEl.textContent=eq.backpack||"None";
  equippedAmmoEl.textContent=eq.ammoType||"None";
  if (zhEquipSummary) {
    zhEquipSummary.textContent=eq.gun?`${eq.gun}`:"No gun equipped — use Set Out";
  }
}

function getSellPrice(name, count) {
  const buyPrice = getShopBuyPrice(name);
  if (buyPrice != null && !isAmmoItem(name)) return buyPrice * count;
  const meta = getItemMeta(name);
  if (!meta) return 0;
  if (isAmmoItem(name)) return Math.floor((meta.sellPrice * count) / ammoShopStackSize(name));
  return meta.sellPrice * count;
}

function sellStashItem(name) {
  name = normalizeItemName(name);
  const acc = getAccount();
  if (!acc || !(acc.inventory[name] > 0)) return;
  const meta = getItemMeta(name);
  if (!meta && getShopBuyPrice(name) == null) { showMessage("Cannot sell this item"); return; }
  const sellCount = isAmmoItem(name) ? Math.min(AMMO_STACK_SIZE, acc.inventory[name]) : 1;
  acc.inventory[name] -= sellCount;
  if (acc.inventory[name] <= 0) delete acc.inventory[name];
  // If you sold the last copy of a piece of gear you were wearing, take it off.
  if (!(acc.inventory[name] > 0) && acc.equipped) {
    for (const slot of ["gun", "armor", "helmet", "backpack"]) {
      if (acc.equipped[slot] === name) {
        acc.equipped[slot] = null;
        if (slot === "gun") acc.equipped.ammoType = null;
        if (slot === "backpack") {
          // Resize setout slots when backpack is removed
          acc.setoutSlots = emptyRunSlots(acc);
        }
      }
    }
    if (acc.equipped.ammoType === name) acc.equipped.ammoType = null;
  }
  acc.money += getSellPrice(name, sellCount);
  saveAccount(acc);
  renderZeroHour();
  renderSellUi();
  showMessage(`Sold ${sellCount}× ${name} for ${formatMoney(getSellPrice(name, sellCount))}`);
}

function openSell() {
  if (!getAccount()) { showMessage("Login first"); return; }
  if (sellModal) { sellModal.hidden = false; sellModal.removeAttribute("hidden"); }
  renderSellUi();
}

function closeSell() {
  if (sellModal) sellModal.hidden = true;
}

function renderSellUi() {
  if (!sellItemList) return;
  const acc = getAccount();
  sellItemList.innerHTML = "";
  const entries = Object.entries(acc?.inventory || {}).filter(([, c]) => c > 0);
  if (!entries.length) {
    sellItemList.innerHTML = `<div class="inventory-item">Nothing to sell</div>`;
    return;
  }
  for (const [name, count] of entries) {
    const div = document.createElement("div");
    div.className = "shop-item sell-item" + getSpecialItemClass(name);
    const sellAmt = formatMoney(getSellPrice(name, isAmmoItem(name) ? Math.min(count, AMMO_STACK_SIZE) : 1));
    div.innerHTML = `<strong>${name}</strong><span>×${count} · Sell for ${sellAmt}</span>`;
    div.addEventListener("click", () => sellStashItem(name));
    sellItemList.appendChild(div);
  }
}

function depositStashToStorage(name) {
  const acc = getAccount();
  if (!acc || !(acc.inventory[name] > 0)) return;
  const moveCount = isAmmoItem(name) ? Math.min(AMMO_STACK_SIZE, acc.inventory[name]) : 1;
  if (!canFitInSlots(acc.storage, name, moveCount)) {
    showMessage("Storage full");
    return;
  }
  acc.inventory[name] -= moveCount;
  if (acc.inventory[name] <= 0) delete acc.inventory[name];
  addToSlots(acc.storage, name, moveCount);
  saveAccount(acc);
  renderStorageUi();
  renderZeroHour();
  showMessage(`Stored ${moveCount}× ${name}`);
}

function withdrawStorageSlot(index) {
  const acc = getAccount();
  const slot = acc?.storage?.[index];
  if (!acc || !slot) return;
  addInventory(acc, slot.name, slot.count);
  acc.storage[index] = null;
  saveAccount(acc);
  renderStorageUi();
  renderZeroHour();
  showMessage(`Moved ${slot.name} to stash`);
}

function openStorage() {
  if (!getAccount()) { showMessage("Login first"); return; }
  if (storageModal) { storageModal.hidden = false; storageModal.removeAttribute("hidden"); }
  renderStorageUi();
}

function closeStorage() {
  if (storageModal) storageModal.hidden = true;
}

function renderStorageUi() {
  const acc = getAccount();
  if (!acc) return;
  if (storageSlotCountEl) storageSlotCountEl.textContent = `${countUsedSlots(acc.storage)} / ${STORAGE_SLOT_COUNT}`;
  renderSlotGrid(storageSlotsEl, acc.storage, {
    onSlotClick: (index) => withdrawStorageSlot(index),
  });
  if (!storageStashListEl) return;
  storageStashListEl.innerHTML = "";
  const entries = Object.entries(acc.inventory || {}).filter(([, c]) => c > 0);
  if (!entries.length) {
    storageStashListEl.innerHTML = `<div class="inventory-item">Stash empty</div>`;
    return;
  }
  for (const [name, count] of entries) {
    const div = document.createElement("div");
    div.className = "shop-item stash-deposit-item" + getSpecialItemClass(name);
    div.innerHTML = `<strong>${name}</strong><span>×${count} · Click to store</span>`;
    div.addEventListener("click", () => depositStashToStorage(name));
    storageStashListEl.appendChild(div);
  }
}

function setLoadoutPiece(category, name) {
  const acc = getAccount();
  if (!acc) return;
  if (name && !(acc.inventory[name] > 0)) {
    showMessage("You don't own that item — buy it in Shop first");
    return;
  }
  if (category === "gun" && name && !GUN_STATS[name]) {
    showMessage("Not a valid gun");
    return;
  }
  if (category === "ammoType" && name && !isAmmoItem(name)) {
    showMessage("Not ammo");
    return;
  }
  acc.equipped[category] = acc.equipped[category] === name ? null : name;
  // Removed auto-set ammoType when gun equipped - let player choose freely
  saveAccount(acc);
  closeGearPicker();
  renderSetoutUi();
  renderZeroHour();
}

function attachGunPart(gunName, slot, partName) {
  const acc = getAccount();
  if (!acc || !(acc.inventory[gunName] > 0)) { showMessage("Own the gun first"); return; }
  if (!MOD_TYPES[slot]) return;
  if (partName) {
    const part = getAttachmentMeta(partName);
    if (!part || part.slot !== slot) { showMessage("Wrong attachment slot"); return; }
    if (!(acc.inventory[partName] > 0)) { showMessage(`Buy ${partName} first`); return; }
  }
  const mods = getGunMods(acc, gunName);
  mods[slot] = mods[slot] === partName ? null : partName;
  saveAccount(acc);
  renderSetoutUi();
  renderZeroHour();
  showMessage(partName ? `Attached ${partName}` : `Removed ${MOD_TYPES[slot].label}`);
}

function buyAndAttachGunPart(gunName, slot, partName) {
  const acc = getAccount();
  const part = getAttachmentMeta(partName);
  if (!acc || !part || part.slot !== slot) return;
  if (!(acc.inventory[gunName] > 0)) { showMessage("Own the gun first"); return; }
  if (acc.inventory[partName] > 0) {
    attachGunPart(gunName, slot, partName);
    return;
  }
  const price = part.buyPrice;
  if (price == null) { showMessage("Cannot buy this part"); return; }
  if (acc.money < price) { showMessage(`Need ${formatMoney(price)}`); return; }
  acc.money -= price;
  addInventory(acc, partName, 1);
  getGunMods(acc, gunName)[slot] = partName;
  saveAccount(acc);
  renderSetoutUi();
  renderZeroHour();
  showMessage(`Bought and attached ${partName}`);
}

function openSetout() {
  if (!getAccount()) { showMessage("Login first"); return; }
  if (setoutModal) { setoutModal.hidden = false; setoutModal.removeAttribute("hidden"); }
  renderSetoutUi();
}

function closeSetout() {
  if (setoutModal) setoutModal.hidden = true;
  closeGearPicker();
}

function renderSetoutUi() {
  const acc = getAccount();
  const eq = acc?.equipped || {};
  if (setoutGunEl) setoutGunEl.textContent = eq.gun || "None";
  if (setoutArmorEl) setoutArmorEl.textContent = eq.armor || "None";
  if (setoutHelmetEl) setoutHelmetEl.textContent = eq.helmet || "None";
  if (setoutBackpackEl) setoutBackpackEl.textContent = eq.backpack || "None";
  if (setoutAmmoEl) setoutAmmoEl.textContent = eq.ammoType || "None";
  if (!acc) return;
  renderSetoutBackpack(acc);
  renderSetoutStash(acc);
  if (!gearPickerModal?.hidden) renderGearPicker(activeGearPickerCategory);
}

function renderSetoutBackpack(acc) {
  if (!setoutBackpackSlotsEl) return;
  const maxSlots = getBackpackSlotCount(acc);
  if (setoutSlotCountEl) setoutSlotCountEl.textContent = `${countUsedSlots(acc.setoutSlots)} / ${maxSlots}`;
  renderSlotGrid(setoutBackpackSlotsEl, acc.setoutSlots, {
    onSlotClick: (index) => withdrawSetoutSlot(index),
  });
}

function renderSetoutStash(acc) {
  if (!setoutStashListEl) return;
  setoutStashListEl.innerHTML = "";
  const equipped = new Set(Object.values(acc.equipped || {}).filter(Boolean));
  const entries = Object.entries(acc.inventory || {})
    .filter(([name, count]) => count > 0 && !equipped.has(name) && !GUN_STATS[name] && !name.includes("Armor") && !name.includes("Helmet") && !getAttachmentMeta(name));
  if (!entries.length) {
    setoutStashListEl.innerHTML = `<div class="inventory-item">No backpack items available</div>`;
    return;
  }
  for (const [name, count] of entries) {
    const moveCount = isAmmoItem(name) ? Math.min(AMMO_STACK_SIZE, count) : 1;
    const div = document.createElement("div");
    div.className = "shop-item stash-deposit-item" + getSpecialItemClass(name);
    div.innerHTML = `<strong>${name}</strong><span>×${count} · Move ${moveCount} to raid backpack</span>`;
    div.addEventListener("click", () => depositStashToSetout(name));
    setoutStashListEl.appendChild(div);
  }
}

function depositStashToSetout(name) {
  const acc = getAccount();
  if (!acc || !(acc.inventory[name] > 0)) return;
  const moveCount = isAmmoItem(name) ? Math.min(AMMO_STACK_SIZE, acc.inventory[name]) : 1;
  if (!canFitInSlots(acc.setoutSlots, name, moveCount)) { showMessage("Set Out backpack full"); return; }
  acc.inventory[name] -= moveCount;
  if (acc.inventory[name] <= 0) delete acc.inventory[name];
  addToSlots(acc.setoutSlots, name, moveCount);
  saveAccount(acc);
  renderSetoutUi();
  renderZeroHour();
  showMessage(`Packed ${moveCount}× ${name}`);
}

function withdrawSetoutSlot(index) {
  const acc = getAccount();
  if (!acc) return;
  const slot = removeSlotAt(acc.setoutSlots, index);
  if (!slot) return;
  addInventory(acc, slot.name, slot.count);
  saveAccount(acc);
  renderSetoutUi();
  renderZeroHour();
  showMessage(`Moved ${slot.name} to stash`);
}

function getGearItems(category) {
  if (category === "gun") return ZERO_HOUR_ITEMS.guns;
  if (category === "armor") return ZERO_HOUR_ITEMS.armor;
  if (category === "helmet") return ZERO_HOUR_ITEMS.helmets;
  if (category === "backpack") return ZERO_HOUR_ITEMS.backpacks;
  if (category === "ammoType") {
    // Return all ammo types from the catalog
    return Object.entries(ITEM_CATALOG)
      .filter(([name, meta]) => meta.isAmmo)
      .map(([name]) => ({ name, buyPrice: ITEM_CATALOG[name].buyPrice }));
  }
  return [];
}

function openGearPicker(category) {
  if (!getAccount()) { showMessage("Login first"); return; }
  activeGearPickerCategory = category;
  if (gearPickerModal) { gearPickerModal.hidden = false; gearPickerModal.removeAttribute("hidden"); }
  renderGearPicker(category);
}

function closeGearPicker() {
  activeGearPickerCategory = null;
  if (gearPickerModal) gearPickerModal.hidden = true;
}

function renderGearPicker(category) {
  if (!gearPickerList || !category) return;
  const acc = getAccount();
  if (!acc) return;
  const labelMap = {
    gun: "Gun",
    armor: "Armor",
    helmet: "Helmet",
    backpack: "Backpack",
    ammoType: "Ammo"
  };
  const label = labelMap[category] || "Gear";
  if (gearPickerTitle) gearPickerTitle.textContent = `Choose ${label}`;
  gearPickerList.innerHTML = "";
  const none = document.createElement("div");
  none.className = "shop-item stash-deposit-item";
  none.innerHTML = `<strong>No ${label}</strong><span>Click to clear this slot</span>`;
  none.addEventListener("click", () => {
    acc.equipped[category] = null;
    if (category === "gun") acc.equipped.ammoType = null;
    saveAccount(acc);
    closeGearPicker();
    renderSetoutUi();
    renderZeroHour();
  });
  gearPickerList.appendChild(none);
  for (const item of getGearItems(category)) {
    if (!(acc.inventory[item.name] > 0)) continue;
    const equipped = acc.equipped[category] === item.name;
    const div = document.createElement("div");
    div.className = "shop-item stash-deposit-item" + getSpecialItemClass(item.name);
    if (category === "gun") {
      const stats = getModifiedGunStats(item.name, acc);
      div.innerHTML = `<strong>${item.name}</strong><span>${equipped ? "Equipped" : "Click to equip"} · Recoil ${stats.recoil.toFixed(2)} · ADS ${stats.adsTime.toFixed(2)}s · Hipfire ${stats.hipfire.toFixed(2)}</span><div class="item-actions mod-actions"></div>`;
      const actions = div.querySelector(".mod-actions");
      for (const [slot, mod] of Object.entries(MOD_TYPES)) {
        const mods = getGunMods(acc, item.name);
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.textContent = `${mod.label}: None`;
        removeBtn.className = mods[slot] ? "" : "equipped";
        removeBtn.addEventListener("click", (event) => { event.stopPropagation(); attachGunPart(item.name, slot, null); renderGearPicker(category); });
        actions.appendChild(removeBtn);
        for (const part of getAttachmentsForSlot(slot)) {
          const ownedPart = (acc.inventory[part.name] || 0) > 0;
          const btn = document.createElement("button");
          btn.type = "button";
          btn.textContent = ownedPart ? part.name : `${part.name} (${formatMoney(part.price)})`;
          btn.className = mods[slot] === part.name ? "equipped" : "";
          btn.addEventListener("click", (event) => {
            event.stopPropagation();
            if (ownedPart) attachGunPart(item.name, slot, part.name);
            else buyAndAttachGunPart(item.name, slot, part.name);
            renderGearPicker(category);
          });
          actions.appendChild(btn);
        }
      }
    } else {
      div.innerHTML = `<strong>${item.name}</strong><span>${equipped ? "Equipped" : "Click to equip"}</span>`;
    }
    div.addEventListener("click", () => setLoadoutPiece(category, item.name));
    gearPickerList.appendChild(div);
  }
  if (gearPickerList.children.length === 1) {
    const empty = document.createElement("div");
    empty.className = "inventory-item";
    empty.textContent = `No owned ${label.toLowerCase()} items`;
    gearPickerList.appendChild(empty);
  }
}

// ─────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────
const TAU = Math.PI*2;
const FOV = Math.PI/3;
const RAY_COUNT = 160;
const MAX_DEPTH = 36;

// ─────────────────────────────────────────────
//  ENEMY SPAWNS
// ─────────────────────────────────────────────
const ENEMY_SPAWNS = [
  {x:25.5,y:1.5, vx:-0.55,vy: 0.30},
  {x:22.5,y:3.5, vx: 0.45,vy: 0.40},
  {x:18.5,y:2.5, vx:-0.40,vy: 0.50},
  {x:25.5,y:5.5, vx:-0.50,vy:-0.30},
  {x:14.5,y:1.5, vx: 0.60,vy: 0.20},
  {x:10.5,y:3.5, vx:-0.38,vy: 0.55},
  {x:25.5,y:10.5,vx:-0.50,vy: 0.30},
  {x:22.5,y:13.5,vx: 0.42,vy:-0.48},
  {x:18.5,y:11.5,vx:-0.55,vy: 0.25},
  {x:14.5,y:16.5,vx: 0.48,vy:-0.38},
  {x: 8.5,y:11.5,vx: 0.52,vy: 0.30},
  {x: 4.5,y:10.5,vx:-0.44,vy: 0.50},
  {x: 2.5,y:15.5,vx: 0.55,vy:-0.22},
  {x: 8.5,y:19.5,vx:-0.46,vy: 0.36},
  {x:22.5,y:19.5,vx: 0.38,vy:-0.52},
];

// Zero Hour extract zone (open floor tile)
const ZERO_HOUR_ROUTES = [
  { spawn:{ x:2.5,  y:2.5,  angle:0.1 }, extract:{ x:39.5, y:27.5 } },
  { spawn:{ x:39.5, y:2.5,  angle:2.7 }, extract:{ x:3.5,  y:27.5 } },
  { spawn:{ x:3.5,  y:24.5, angle:-0.35 }, extract:{ x:38.5, y:4.5 } },
  { spawn:{ x:36.5, y:26.5, angle:-2.4 }, extract:{ x:4.5,  y:4.5 } },
  { spawn:{ x:20.5, y:3.5,  angle:1.1 }, extract:{ x:29.5, y:26.5 } },
  { spawn:{ x:21.5, y:27.5, angle:-1.6 }, extract:{ x:10.5, y:2.5 } },
];
const EXTRACT_RADIUS = 1.6;
const EXTRACT_DURATION = 10;
const ENEMY_HIT_DAMAGE = 15;

// Zero Hour bot spawns (different corners)
const ZH_BOT_SPAWNS = [
  {x:8.5,  y:2.5,  angle:0.57},
  {x:18.5, y:3.5,  angle:0.04},
  {x:31.5, y:3.5,  angle:2.7},
  {x:38.5, y:7.5,  angle:3.2},
  {x:4.5,  y:8.5,  angle:0.9},
  {x:16.5, y:8.5,  angle:1.2},
  {x:25.5, y:8.5,  angle:1.71},
  {x:34.5, y:12.5, angle:2.6},
  {x:6.5,  y:14.5, angle:4.36},
  {x:18.5, y:13.5, angle:1.76},
  {x:29.5, y:14.5, angle:3.1},
  {x:39.5, y:18.5, angle:3.0},
  {x:8.5,  y:18.5, angle:5.1},
  {x:24.5, y:18.5, angle:1.72},
  {x:33.5, y:20.5, angle:2.8},
  {x:4.5,  y:25.5, angle:0.1},
  {x:18.5, y:25.5, angle:0.65},
  {x:30.5, y:25.5, angle:3.8},
  {x:38.5, y:27.5, angle:3.49},
];

// ─────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────
const state = {
  running:false, mode:"single",
  x:2.5, y:2.5, angle:0, pitch:0,
  hp:100, maxHp:100, isDead:false,
  ammo:30, maxAmmo:30,
  score:0, remaining:90,
  recoil:0, recoilAngle:0,
  fireCooldown:0, isFiring:false,
  jumpHeight:0, jumpVelocity:0,
  reloadTimer:0,
  knifeCooldown:0, knifeSwingTimer:0,
  hitFlash:0, damageFlash:0,
  lastTime:0,
  keys:new Set(),
  touchMoveX:0, touchMoveY:0,
  aimTouchId:null, lastAimX:0, lastAimY:0,
  shootAimTouchId:null, shootLastAimX:0, shootLastAimY:0,
  ads:false, adsProgress:0,  // 0=hipfire 1=fully aimed
  opticAltZoom:false,
  targets:[], chests:[], bots:[],
  socket:null, playerId:null, opponentId:null,
  players:{}, networkTimer:0, pingTimer:0,
  playerHitFlashes:{},
  // equipment active during game
  equippedGun:null, equippedArmor:null, equippedHelmet:null,
  gunStats:DEFAULT_GUN,
  zhAmmoInventory:{},  // copy of inventory ammo during ZH session
  extractPoint: null,
  extractTimer: 0,
  extractSmokePhase: 0,
  runSlots: null,
  activeMed: null,
  uiOpen: null,
  activeChest: null,
  droppedItems: [],  // Items dropped on the ground (visible to all players)
  myRoute: null,  // This player's spawn/extract route
  playerRoutes: {},  // Map of playerId -> route for multiplayer
  // Character class system
  playerClass: null,  // "assault" or "medic"
  ability1Cooldown: 0,
  ability2Cooldown: 0,
  smokeGrenades: [],  // Active smoke grenades
  kunaiProjectile: null,  // Teleport kunai
  doveEntity: null,  // White dove entity
  classEffects: {},  // Active class effects (speed boosts, etc.)
  particles: [],  // Particle effects
};

// ─────────────────────────────────────────────
//  CHARACTER CLASS DEFINITIONS
// ─────────────────────────────────────────────
const CHARACTER_CLASSES = {
  assault: {
    name: "Assault Operator",
    nameZh: "突击位",
    passive: {
      speedBoost: 0.20,  // 20% faster movement
      meleeDamageBoost: 0.50  // 50% more melee damage
    },
    ability1: {
      name: "Smoke Grenade",
      nameZh: "烟雾弹",
      cooldown: 25,  // seconds
      duration: 12,  // smoke lasts 12 seconds
      radius: 140,  // smoke radius (40x bigger)
    },
    ability2: {
      name: "Teleport Kunai",
      nameZh: "飞雷神",
      cooldown: 35,  // seconds
      speed: 12,  // kunai travel speed
      maxDistance: 20,  // max throw distance
    }
  },
  medic: {
    name: "Medic Operator",
    nameZh: "医疗干员",
    passive: {
      medicalBoost: 0.50  // 50% more effective medical items
    },
    ability1: {
      name: "Instant Heal",
      nameZh: "瞬间治疗",
      cooldown: 20,  // seconds
      healAmount: 30,  // instant 30 HP
    },
    ability2: {
      name: "White Dove",
      nameZh: "白鸽",
      cooldown: 40,  // seconds
      duration: 8,  // dove lasts 8 seconds
      speedBoost: 0.10,  // 10% speed boost
      smokeRadius: 2.5,  // smoke trail radius
    }
  }
};

// ─────────────────────────────────────────────
//  UTILITIES
// ─────────────────────────────────────────────
function isWall(x,y) { const r=map[Math.floor(y)]; return !r||r[Math.floor(x)]==="#"; }
function normalizeAngle(a) { while(a<-Math.PI)a+=TAU; while(a>Math.PI)a-=TAU; return a; }
function clamp(v,mn,mx) { return Math.max(mn,Math.min(mx,v)); }

function castRay(angle) {
  const sin=Math.sin(angle), cos=Math.cos(angle);
  for (let d=0.05; d<MAX_DEPTH; d+=0.05) {
    const x=state.x+cos*d, y=state.y+sin*d;
    if (isWall(x,y)) return {depth:d,x,y};
  }
  return {depth:MAX_DEPTH, x:state.x+cos*MAX_DEPTH, y:state.y+sin*MAX_DEPTH};
}

function hasLineOfSight(target) {
  const angle=Math.atan2(target.y-state.y, target.x-state.x);
  const dist=Math.hypot(target.x-state.x, target.y-state.y);
  return castRay(angle).depth>dist-0.2;
}

function showMessage(text) {
  messageEl.textContent=text; messageEl.hidden=false;
  clearTimeout(showMessage._t);
  showMessage._t=setTimeout(()=>{ messageEl.hidden=true; },1800);
}

const I18N = {
  en: {
    brand:"Zero Hour Battle Field", title:"Zero Hour Battle Field", season:"Season 1", credit:"Made by Ilovegames",
    intro:"Battle Field: classic shooter. Zero Hour Tactics: gear up and survive.",
    battle:"Battle Field", zero:"Zero Hour Tactics", language:"Language / 语言", account:"Account",
    shop:"Shop", sell:"Sell", storage:"Storage", redeem:"Redeem Code", setout:"Set Out",
    deploy:"Deploy to Zero Hour", gun:"Gun", armor:"Armor", helmet:"Helmet", backpack:"Backpack", ammo:"Ammo",
    armors:"Armors", helmets:"Helmets", backpacks:"Backpacks", guns:"Guns", meds:"Meds", supplies:"Supplies", inventory:"Inventory",
    level:"Level", single:"Start Single Player", multi:"Start 2 Player", room:"Room", server:"Server",
    keys:"WASD move · Mouse aim · Click shoot · Right-click / Q / E: ADS · R reload · F open chest · Tab backpack · Green smoke = extract",
    login:"Login", create:"Create Account", logout:"Logout", export:"Export Code", import:"Import Code", close:"Close",
    loginHint:"Use Export/Import to move your account to another device. Cloud sync runs automatically when the server is available.",
    backpack:"Backpack", chest:"Chest", chestContents:"Chest contents", yourBackpack:"Your backpack",
    sellItems:"Sell Items", sellHint:"Click an item in your stash to sell it.",
    setoutTitle:"Set Out - Raid Loadout", setoutHint:"Choose your gear slots, then move ammo or supplies from stash into the raid backpack.",
    raidBackpack:"Raid Backpack", stash:"Stash", chooseGear:"Choose Gear", quit:"Quit (P)",
  },
  zh: {
    brand:"零点行动 战场", title:"Zero Hour Battle Field", season:"第 1 赛季", credit:"Made by Ilovegames",
    intro:"战场模式：经典射击。零点行动：带装备进入战场并活着撤离。",
    battle:"战场模式", zero:"零点行动", language:"语言 / Language", account:"账号",
    shop:"商店", sell:"出售", storage:"仓库", redeem:"兑换码", setout:"整备",
    deploy:"部署到零点行动", gun:"枪械", armor:"护甲", helmet:"头盔", backpack:"背包", ammo:"弹药",
    armors:"护甲", helmets:"头盔", backpacks:"背包", guns:"枪械", meds:"医疗", supplies:"物资",
    inventory:"库存", level:"等级", single:"开始单人模式", multi:"开始双人模式", room:"房间", server:"服务器",
    keys:"WASD 移动 · 鼠标瞄准 · 点击射击 · 右键 / Q / E：开镜 · R 换弹 · F 开箱 · Tab 背包 · 绿色烟雾 = 撤离点",
    login:"登录", create:"创建账号", logout:"退出账号", export:"导出存档码", import:"导入存档码", close:"关闭",
    loginHint:"用导出/导入可以把账号转移到另一台设备。服务器可用时会自动云同步。",
    backpack:"背包", chest:"箱子", chestContents:"箱内物品", yourBackpack:"你的背包",
    sellItems:"出售物品", sellHint:"点击仓库里的物品进行出售。",
    setoutTitle:"整备 - 出战配置", setoutHint:"选择装备槽，然后把弹药或物资从仓库放进出战背包。",
    raidBackpack:"出战背包", stash:"仓库", chooseGear:"选择装备", quit:"退出 (P)",
  },
};

function t(key) {
  return I18N[currentLanguage]?.[key] || I18N.en[key] || key;
}

function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh" : "en";
  setText(".brand", t("brand"));
  setText("#menu h1", t("title"));
  setText("#seasonTitle", t("season"));
  setText("#creditText", t("credit"));
  setText("#menu > p", t("intro"));
  setText("#battleFieldTab", t("battle"));
  setText("#zeroHourTab", t("zero"));
  setText("#languageButton", t("language"));
  setText("#openLoginModal", t("account"));
  setText("#openShopButton", t("shop"));
  setText("#openSellButton", t("sell"));
  setText("#openStorageButton", t("storage"));
  setText("#redeemCodeButton", t("redeem"));
  setText("#openSetoutButton", t("setout"));
  setText("#zhStartButton", t("deploy"));
  setText("#startButton", t("single"));
  setText("#multiButton", t("multi"));
  setText("#loginModal h2", t("account"));
  setText("#loginButton", t("login"));
  setText("#createAccountButton", t("create"));
  setText("#logoutButton", t("logout"));
  setText("#exportAccountButton", t("export"));
  setText("#importAccountButton", t("import"));
  setText("#closeLoginModal", t("close"));
  setText(".login-hint", t("loginHint"));
  setText("#shopModal h2", t("shop"));
  setText("#closeShopModal", t("close"));
  setText(".shop-inventory-panel h3", t("inventory"));
  setText("#sellModal h2", t("sellItems"));
  setText("#sellModal .panel-hint", t("sellHint"));
  setText("#closeSellModal", t("close"));
  setText("#setoutModal h2", t("setoutTitle"));
  setText("#setoutModal > .modal-box > .panel-hint", t("setoutHint"));
  setText("#closeSetoutModal", t("close"));
  setText("#gearPickerTitle", t("chooseGear"));
  setText("#closeGearPickerModal", t("close"));
  setText("#quitButton", t("quit"));
  const categoryLabels = { armors:t("armors"), helmets:t("helmets"), backpacks:t("backpacks"), guns:t("guns"), ammo:t("ammo"), meds:t("meds"), supplies:t("supplies") };
  shopCategoryButtons.forEach(btn => { btn.textContent = categoryLabels[btn.dataset.shopCategory] || btn.textContent; });
  document.querySelectorAll(".equip-label").forEach(el => {
    const raw = el.textContent.trim().toLowerCase();
    if (raw === "gun" || raw === "枪械") el.textContent = t("gun");
    if (raw === "armor" || raw === "护甲") el.textContent = t("armor");
    if (raw === "helmet" || raw === "头盔") el.textContent = t("helmet");
    if (raw === "backpack" || raw === "背包") el.textContent = t("backpack");
    if (raw === "ammo" || raw === "弹药") el.textContent = t("ammo");
  });
  document.querySelectorAll(".keys").forEach(el => { if (el.closest("#zeroHourPanel")) el.innerHTML = `<span>${t("keys")}</span>`; });
  renderActiveShopCategory();
}

function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "zh" : "en";
  localStorage.setItem("ilovegames-language", currentLanguage);
  applyLanguage();
}
// ─────────────────────────────────────────────
//  CHARACTER CLASS ABILITIES
// ─────────────────────────────────────────────
function useAbility1() {
  if (!state.playerClass || !state.running || state.isDead) return;
  if (state.ability1Cooldown > 0) {
    showMessage(`Ability on cooldown: ${Math.ceil(state.ability1Cooldown)}s`);
    return;
  }
  
  const classData = CHARACTER_CLASSES[state.playerClass];
  if (!classData) return;
  
  if (state.playerClass === "assault") {
    // Smoke Grenade
    throwSmokeGrenade();
    state.ability1Cooldown = classData.ability1.cooldown;
    showMessage("Smoke Grenade deployed!");
  } else if (state.playerClass === "medic") {
    // Instant Heal
    const healAmount = classData.ability1.healAmount;
    if (state.hp >= state.maxHp) {
      showMessage("HP already full");
      return;
    }
    state.hp = Math.min(state.maxHp, state.hp + healAmount);
    state.ability1Cooldown = classData.ability1.cooldown;
    showMessage(`Healed ${healAmount} HP!`);
    
    // Heal effect particles
    if (!state.particles) state.particles = [];
    for (let i = 0; i < 15; i++) {
      state.particles.push({
        x: state.x,
        y: state.y,
        z: 0.5 + Math.random() * 0.5,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: Math.random() * 3 + 2,
        life: 0.8,
        maxLife: 0.8,
        color: "#3ecf5a",
        size: 0.08,
      });
    }
  }
  
  // Sync to multiplayer
  if (state.mode === "zhmulti" && state.socket) {
    state.socket.send(JSON.stringify({
      type: "ability1",
      playerId: state.playerId,
      class: state.playerClass,
      x: state.x,
      y: state.y,
      angle: state.angle,
    }));
  }
}

function useAbility2() {
  if (!state.playerClass || !state.running || state.isDead) return;
  if (state.ability2Cooldown > 0) {
    showMessage(`Ability on cooldown: ${Math.ceil(state.ability2Cooldown)}s`);
    return;
  }
  
  const classData = CHARACTER_CLASSES[state.playerClass];
  if (!classData) return;
  
  if (state.playerClass === "assault") {
    // Teleport Kunai
    throwTeleportKunai();
    state.ability2Cooldown = classData.ability2.cooldown;
    showMessage("Kunai thrown!");
  } else if (state.playerClass === "medic") {
    // White Dove
    releaseDove();
    state.ability2Cooldown = classData.ability2.cooldown;
    showMessage("White Dove released!");
  }
  
  // Sync to multiplayer
  if (state.mode === "zhmulti" && state.socket) {
    state.socket.send(JSON.stringify({
      type: "ability2",
      playerId: state.playerId,
      class: state.playerClass,
      x: state.x,
      y: state.y,
      angle: state.angle,
    }));
  }
}

function throwSmokeGrenade() {
  const classData = CHARACTER_CLASSES.assault;
  
  // Deploy smoke right at player position (not thrown)
  state.smokeGrenades.push({
    x: state.x,
    y: state.y,
    z: 0.1,  // Just above ground
    vx: 0,  // No horizontal velocity
    vy: 0,  // No horizontal velocity
    vz: 0,  // No vertical velocity
    life: classData.ability1.duration,
    maxLife: classData.ability1.duration,
    radius: classData.ability1.radius,
    phase: 1,  // Start deployed
    deployed: true,  // Already deployed
  });
}

function throwTeleportKunai() {
  const classData = CHARACTER_CLASSES.assault;
  const angle = state.angle;
  
  state.kunaiProjectile = {
    x: state.x + Math.cos(angle) * 0.5,
    y: state.y + Math.sin(angle) * 0.5,
    z: 0.5,
    vx: Math.cos(angle) * classData.ability2.speed,
    vy: Math.sin(angle) * classData.ability2.speed,
    vz: 0,
    angle: angle,
    distance: 0,
    maxDistance: classData.ability2.maxDistance,
  };
}

function releaseDove() {
  const classData = CHARACTER_CLASSES.medic;
  const angle = state.angle;
  
  state.doveEntity = {
    x: state.x,
    y: state.y,
    z: 1.5,
    vx: Math.cos(angle) * 4,
    vy: Math.sin(angle) * 4,
    vz: 2,
    life: classData.ability2.duration,
    maxLife: classData.ability2.duration,
    angle: angle,
    phase: 0,
    smokeRadius: classData.ability2.smokeRadius,
  };
  
  // Apply speed boost
  state.classEffects.doveSpeedBoost = {
    duration: classData.ability2.duration,
    boost: classData.ability2.speedBoost,
  };
}

function updateAbilities(dt) {
  // Update cooldowns
  if (state.ability1Cooldown > 0) state.ability1Cooldown = Math.max(0, state.ability1Cooldown - dt);
  if (state.ability2Cooldown > 0) state.ability2Cooldown = Math.max(0, state.ability2Cooldown - dt);
  
  // Update smoke grenades
  for (let i = state.smokeGrenades.length - 1; i >= 0; i--) {
    const smoke = state.smokeGrenades[i];
    
    if (!smoke.deployed) {
      // Projectile phase
      smoke.x += smoke.vx * dt;
      smoke.y += smoke.vy * dt;
      smoke.z += smoke.vz * dt;
      smoke.vz -= 9.8 * dt;  // Gravity
      
      // Check collision with walls or ground
      if (isWall(smoke.x, smoke.y) || smoke.z <= 0) {
        smoke.deployed = true;
        smoke.z = 0;
        smoke.vx = 0;
        smoke.vy = 0;
        smoke.vz = 0;
      }
    } else {
      // Smoke phase
      smoke.phase += dt;
      smoke.life -= dt;
      
      if (smoke.life <= 0) {
        state.smokeGrenades.splice(i, 1);
      }
    }
  }
  
  // Update kunai projectile
  if (state.kunaiProjectile) {
    const kunai = state.kunaiProjectile;
    const dx = kunai.vx * dt;
    const dy = kunai.vy * dt;
    
    kunai.x += dx;
    kunai.y += dy;
    kunai.distance += Math.hypot(dx, dy);
    
    // Check collision or max distance
    if (isWall(kunai.x, kunai.y) || kunai.distance >= kunai.maxDistance) {
      // Teleport player to kunai location
      const teleportX = kunai.x - Math.cos(kunai.angle) * 0.3;
      const teleportY = kunai.y - Math.sin(kunai.angle) * 0.3;
      
      if (!isWall(teleportX, teleportY)) {
        // Teleport effect particles at old position
        if (!state.particles) state.particles = [];
        for (let i = 0; i < 20; i++) {
          state.particles.push({
            x: state.x,
            y: state.y,
            z: 0.5,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            vz: Math.random() * 4,
            life: 0.6,
            maxLife: 0.6,
            color: "#3ea8d8",
            size: 0.1,
          });
        }
        
        state.x = teleportX;
        state.y = teleportY;
        
        // Teleport effect particles at new position
        for (let i = 0; i < 20; i++) {
          state.particles.push({
            x: state.x,
            y: state.y,
            z: 0.5,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            vz: Math.random() * 4,
            life: 0.6,
            maxLife: 0.6,
            color: "#f0c84b",
            size: 0.1,
          });
        }
        
        showMessage("Teleported!");
      }
      
      state.kunaiProjectile = null;
    }
  }
  
  // Update dove
  if (state.doveEntity) {
    const dove = state.doveEntity;
    
    dove.x += dove.vx * dt;
    dove.y += dove.vy * dt;
    dove.z += dove.vz * dt;
    dove.vz -= 2 * dt;  // Gentle gravity
    dove.phase += dt * 3;
    dove.life -= dt;
    
    // Keep dove airborne
    if (dove.z < 1) {
      dove.z = 1;
      dove.vz = Math.abs(dove.vz) * 0.5;
    }
    
    // Smoke trail particles
    if (Math.random() < 0.3) {
      if (!state.particles) state.particles = [];
      state.particles.push({
        x: dove.x,
        y: dove.y,
        z: dove.z,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: -0.5,
        life: 2,
        maxLife: 2,
        color: "#e8f4f8",
        size: 0.15,
      });
    }
    
    if (dove.life <= 0) {
      state.doveEntity = null;
    }
  }
  
  // Update class effects
  if (state.classEffects.doveSpeedBoost) {
    state.classEffects.doveSpeedBoost.duration -= dt;
    if (state.classEffects.doveSpeedBoost.duration <= 0) {
      delete state.classEffects.doveSpeedBoost;
    }
  }
  
  // Update particles
  if (!state.particles) state.particles = [];
  for (let i = state.particles.length - 1; i >= 0; i--) {
    const p = state.particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.z += p.vz * dt;
    p.vz -= 9.8 * dt;
    p.life -= dt;
    
    if (p.life <= 0 || p.z < 0) {
      state.particles.splice(i, 1);
    }
  }
}

function getMovementSpeedMultiplier() {
  let multiplier = 1.0;
  
  // Assault passive: 20% speed boost
  if (state.playerClass === "assault") {
    multiplier *= (1 + CHARACTER_CLASSES.assault.passive.speedBoost);
  }
  
  // Dove speed boost: 10%
  if (state.classEffects.doveSpeedBoost) {
    multiplier *= (1 + state.classEffects.doveSpeedBoost.boost);
  }
  
  return multiplier;
}

function getMeleeDamageMultiplier() {
  let multiplier = 1.0;
  
  // Assault passive: 50% melee damage boost
  if (state.playerClass === "assault") {
    multiplier *= (1 + CHARACTER_CLASSES.assault.passive.meleeDamageBoost);
  }
  
  return multiplier;
}

function getMedicalEffectiveness() {
  let multiplier = 1.0;
  
  // Medic passive: 50% medical boost
  if (state.playerClass === "medic") {
    multiplier *= (1 + CHARACTER_CLASSES.medic.passive.medicalBoost);
  }
  
  return multiplier;
}

function isInSmoke(x, y) {
  for (const smoke of state.smokeGrenades) {
    if (!smoke.deployed) continue;
    const dist = Math.hypot(x - smoke.x, y - smoke.y);
    if (dist < smoke.radius) return true;
  }
  
  // Dove smoke trail
  if (state.doveEntity) {
    const dist = Math.hypot(x - state.doveEntity.x, y - state.doveEntity.y);
    if (dist < state.doveEntity.smokeRadius) return true;
  }
  
  return false;
}


// ─────────────────────────────────────────────
//  GAME SETUP
// ─────────────────────────────────────────────
function hasEquippedWeapon() {
  return !!(state.equippedGun && GUN_STATS[state.equippedGun]);
}

function getActiveGunStats() {
  if (hasEquippedWeapon()) return getModifiedGunStats(state.equippedGun) || GUN_STATS[state.equippedGun];
  if (state.mode === "zerohour" || state.mode === "zhmulti") return null;
  return DEFAULT_GUN;
}

function loadSelectedMap() {
  const selectedMap = mapSelect?.value || "urban";
  const mapData = MAPS[selectedMap];
  map = mapData.map;
  CHEST_POSITIONS = mapData.chests;
  state.selectedMap = selectedMap;
  return mapData;
}

function resetGame(mode="single") {
  state.running=true; state.mode=mode;
  state.x=2.5; state.y=2.5; state.angle=0.1; state.pitch=0;
  state.hp=100; state.maxHp=100; state.isDead=false;
  state.score=0; state.remaining=90;
  state.recoil=0; state.recoilAngle=0; state.fireCooldown=0; state.isFiring=false;
  state.jumpHeight=0; state.jumpVelocity=0; state.reloadTimer=0; state.knifeCooldown=0; state.knifeSwingTimer=0; state.activeMed=null;
  state.hitFlash=0; state.damageFlash=0;
  state.touchMoveX=0; state.touchMoveY=0;
  state.ads=false; state.adsProgress=0; state.opticAltZoom=false;
  resetJoystick();
  state.aimTouchId=null; state.shootAimTouchId=null;
  state.players={}; state.playerHitFlashes={}; state.opponentId=null; state.networkTimer=0; state.pingTimer=0;
  state.chests=[]; state.bots=[]; state.droppedItems=[]; state.droppedItemChests=[]; state.playerRoutes={};
  state.ability1Cooldown=0; state.ability2Cooldown=0; state.smokeGrenades=[]; state.kunaiProjectile=null; state.doveEntity=null; state.classEffects={}; state.particles=[];

  // Load equipped gear for Zero Hour modes
  if (mode==="zerohour" || mode==="zhmulti") {
    const acc=getAccount();
    const eq=acc?.equipped||{};
    state.equippedGun=eq.gun||null;
    state.equippedArmor=eq.armor||null;
    state.equippedHelmet=eq.helmet||null;
    state.gunStats=getActiveGunStats();
    initRunBackpackFromSetout(acc);
    
    // Load selected map
    const mapData = loadSelectedMap();
    
    // Assign random route for this player
    const route = ZERO_HOUR_ROUTES[Math.floor(Math.random() * ZERO_HOUR_ROUTES.length)];
    state.myRoute = route;
    state.x = route.spawn.x;
    state.y = route.spawn.y;
    state.angle = route.spawn.angle;
    
    // Initialize chests (in multiplayer, each player will have individual loot)
    state.chests=CHEST_POSITIONS.map(p=>({ ...p, opened: false, lootItems: null }));
    
    // Spawn bots (AI enemies for ZH) - but not in boss arena
    if (state.selectedMap === "boss") {
      // Boss arena: only spawn the boss, no regular AI
      state.bots = [];
      if (mapData.bossSpawn) {
        state.bots.push({
          x: mapData.bossSpawn.x,
          y: mapData.bossSpawn.y,
          vx: 0,
          vy: 0,
          hp: 3000,
          health: 3000,
          alive: true,
          shotTimer: 2.0,
          muzzleFlash: 0,
          equippedGun: "Boss Gun",
          equippedArmor: "Boss Armor",
          isBoss: true,
          bossScale: 10  // 10x bigger than player
        });
      }
    } else {
      // Regular maps: spawn normal AI enemies
      state.bots=ZH_BOT_SPAWNS.map((sp,i)=>({
        ...sp, x:sp.x, y:sp.y,
        vx:-0.4+Math.random()*0.3, vy:-0.3+Math.random()*0.3,
        hp:100, health:100, alive:true,
        shotTimer:3+i*0.8, muzzleFlash:0,
        equippedGun:"M4A1 Assault Rifle", equippedArmor:"Level 2 Armor"
      }));
    }
    
    const gs=state.gunStats;
    state.ammo=gs?gs.magSize:0;
    state.maxAmmo=gs?gs.magSize:0;
    state.extractPoint={...route.extract};
    state.extractTimer=0;
    state.extractSmokePhase=0;
    hudGear.hidden=false;
    hudGearText.textContent=state.equippedGun||"Knife";
    
    if (mode==="zhmulti") {
      showMessage(state.equippedGun
        ? "Multiplayer Zero Hour - PvP enabled!"
        : "No weapon equipped — use Set Out before deploying");
    } else {
      showMessage(state.equippedGun
        ? "Reach the green extract smoke to evacuate"
        : "No weapon equipped — use Set Out before deploying");
    }
  } else {
    state.extractPoint=null;
    state.extractTimer=0;
    state.equippedGun=null; state.equippedArmor=null; state.equippedHelmet=null;
    state.gunStats=DEFAULT_GUN;
    state.ammo=30; state.maxAmmo=30;
    hudGear.hidden=true;
    state.targets=mode==="single"?createEnemies():[];
  }

  updateHud();
  showMessage("Click the game to lock aim");
}

function resizeCanvas() {
  const rect=canvas.getBoundingClientRect();
  const w=Math.max(640, Math.floor(rect.width) || 960);
  const h=Math.max(360, Math.floor(rect.height) || 540);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width=w;
    canvas.height=h;
  }
}

function beginMatch() {
  closeAllModals();
  state.keys.clear();
  menu.style.display="none";
  hud.classList.add("active");
  resizeCanvas();
  requestAnimationFrame(() => {
    resizeCanvas();
    draw();
  });
}

function startGame() {
  disconnectMultiplayer(); beginMatch(); resetGame("single");
}

function startMultiplayer() {
  disconnectMultiplayer(); beginMatch(); resetGame("multi");
  showMessage("Connecting...");
  const socket=new WebSocket(getSocketUrl()); state.socket=socket;
  socket.addEventListener("open",()=>{ sendNetworkUpdate(true); showMessage(`Room ${getRoomCode()} – waiting for player 2`); });
  socket.addEventListener("message",e=>handleNetworkMessage(JSON.parse(e.data)));
  socket.addEventListener("close",e=>{ if(state.mode==="multi"&&state.running) showMessage(`Disconnected ${e.code||""}`); });
  socket.addEventListener("error",()=>showMessage("Connection error"));
}

function startZeroHour() {
  if (!getAccount()) { showMessage("Login first to play Zero Hour"); return; }
  // Show class selection modal
  pendingGameMode = "zerohour";
  if (classModal) {
    classModal.hidden = false;
    classModal.removeAttribute("hidden");
  }
}

function actuallyStartZeroHour() {
  disconnectMultiplayer(); beginMatch(); resetGame("zerohour");
  // Zero Hour solo mode - private room for single player
  const zhRoom="zerohour-solo-"+((crypto.randomUUID&&crypto.randomUUID())||Date.now()+"-"+Math.random().toString(36).slice(2));
  const url=new URL("/ws", window.location.href);
  if(url.protocol==="http:")url.protocol="ws:"; if(url.protocol==="https:")url.protocol="wss:";
  url.searchParams.set("room",zhRoom);
  const socket=new WebSocket(url.toString()); state.socket=socket;
  socket.addEventListener("open",()=>{ sendNetworkUpdate(true); showMessage("Connected to Zero Hour"); });
  socket.addEventListener("message",e=>handleNetworkMessage(JSON.parse(e.data)));
  socket.addEventListener("close",()=>{ if(state.mode==="zerohour"&&state.running) showMessage("Disconnected"); });
  socket.addEventListener("error",()=>showMessage("Server error"));
}

function startZeroHourMultiplayer() {
  if (!getAccount()) { showMessage("Login first to play Zero Hour"); return; }
  // Show class selection modal
  pendingGameMode = "zhmulti";
  if (classModal) {
    classModal.hidden = false;
    classModal.removeAttribute("hidden");
  }
}

function actuallyStartZeroHourMultiplayer() {
  disconnectMultiplayer(); beginMatch(); resetGame("zhmulti");
  showMessage("Connecting to multiplayer...");
  const zhRoom = (zhRoomCodeEl?.value || "zh-room1").trim().replace(/[^a-z0-9_-]/gi, "").slice(0, 18) || "zh-room1";
  const serverUrl = zhServerUrlEl?.value?.trim() || "/ws";
  const url = new URL(serverUrl, window.location.href);
  if (url.protocol === "http:") url.protocol = "ws:";
  if (url.protocol === "https:") url.protocol = "wss:";
  url.searchParams.set("room", zhRoom);
  const socket = new WebSocket(url.toString());
  state.socket = socket;
  socket.addEventListener("open", () => {
    sendNetworkUpdate(true);
    showMessage(`Room ${zhRoom} – waiting for players`);
  });
  socket.addEventListener("message", e => handleNetworkMessage(JSON.parse(e.data)));
  socket.addEventListener("close", e => {
    if (state.mode === "zhmulti" && state.running) showMessage(`Disconnected ${e.code || ""}`);
  });
  socket.addEventListener("error", () => showMessage("Connection error"));
}

function createEnemies() {
  const level=Number(levelSelect.value)||1;
  const count=level===3?15:level===2?10:5;
  return ENEMY_SPAWNS.slice(0,count).map((sp,i)=>({
    ...sp, hp:100, health:100, shotTimer:2.4+(i%5)*0.55, muzzleFlash:0, alive:true
  }));
}

function getRoomCode() { return (roomCodeEl.value||"room1").trim().replace(/[^a-z0-9_-]/gi,"").slice(0,18)||"room1"; }
function getSocketUrl() {
  const u=new URL(serverUrlEl.value.trim()||"/ws", window.location.href);
  if(u.protocol==="http:")u.protocol="ws:"; if(u.protocol==="https:")u.protocol="wss:";
  u.searchParams.set("room",getRoomCode()); return u.toString();
}
function disconnectMultiplayer() { if(state.socket){state.socket.close();state.socket=null;} }

function endGame(text, { keepLoot = false } = {}) {
  if (state.mode === "zerohour" || state.mode === "zhmulti") {
    if (keepLoot) mergeRunToAccountStash();
    else discardRunLoot();
    closeAllModals();
  }
  state.running=false; state.isFiring=false; state.ads=false; state.uiOpen=null;
  document.exitPointerLock?.();
  showMessage(`${text} – click Start to play again`);
  menu.style.display="grid"; hud.classList.remove("active");
  startButton.textContent="Restart Single Player";
  hudGear.hidden=true;
  renderZeroHour();
}

function quitGame() {
  if(!state.running)return;
  if (state.mode === "zerohour" || state.mode === "zhmulti") {
    discardRunLoot();
    closeAllModals();
  }
  state.running=false; state.isFiring=false; state.isDead=false; state.ads=false; state.uiOpen=null;
  state.keys.clear(); resetJoystick(); disconnectMultiplayer(); document.exitPointerLock?.();
  menu.style.display="grid"; hud.classList.remove("active"); hudGear.hidden=true;
  showMessage("Quit match — raid loot lost");
  renderZeroHour();
}

// ─────────────────────────────────────────────
//  NETWORK
// ─────────────────────────────────────────────
function handleNetworkMessage(msg) {
  if (msg.type==="welcome") {
    state.playerId=msg.id;
    showMessage(`Joined as player ${msg.number}`);
    // Send initial route info for zhmulti mode
    if (state.mode === "zhmulti" && state.myRoute) {
      state.socket.send(JSON.stringify({
        type: "zhroute",
        route: state.myRoute
      }));
    }
  }
  // A full room only matters for multiplayer; Zero Hour solo runs locally
  if (msg.type==="full") { if (state.mode!=="zerohour") endGame("Room is full"); }
  
  if (msg.type==="state") {
    state.players=msg.players||{};
    const me=state.players[state.playerId];
    // In Zero Hour solo, enemies are client-side bots, HP managed locally
    // In zhmulti, enable PvP damage from server
    if (me && (state.mode==="multi" || state.mode==="zhmulti")) {
      if (state.isDead&&me.alive) {
        state.x=me.x; state.y=me.y; state.angle=me.angle; state.pitch=me.pitch;
        state.jumpHeight=0; state.jumpVelocity=0; state.isDead=false; showMessage("Respawned");
      }
      state.hp=me.hp;
      if (!me.alive) { state.isDead=true; state.isFiring=false; showMessage("Respawning..."); }
    }
    state.opponentId=Object.keys(state.players).find(id=>id!==state.playerId)||null;
  }
  
  if (msg.type==="hit") {
    if (msg.target===state.playerId) {
      state.damageFlash=0.28;
      showMessage(`Hit – HP ${msg.hp}`);
      if (state.mode === "zhmulti") {
        // Handle death in zhmulti mode
        if (msg.hp <= 0) {
          handleRaidDeath();
        }
      }
    }
    else if (msg.shooter===state.playerId) {
      state.hitFlash=0.22;
      state.playerHitFlashes[msg.target] = 0.3;
      showMessage(msg.hp<=0?"Player down":`Player hit ${100-msg.hp}/100`);
    }
  }
  
  // Handle custom zhmulti messages
  if (msg.type==="zhroute" && msg.playerId) {
    state.playerRoutes[msg.playerId] = msg.route;
  }
  
  if (msg.type==="createchest" && state.mode === "zhmulti") {
    // Create shared item chest
    if (!state.droppedItemChests.find(c => c.id === msg.chestId)) {
      state.droppedItemChests.push({
        id: msg.chestId,
        x: msg.x,
        y: msg.y,
        items: []
      });
    }
  }
  
  if (msg.type==="dropitem" && state.mode === "zhmulti") {
    // Add item to chest
    const chest = state.droppedItemChests.find(c => c.id === msg.chestId);
    if (chest) {
      chest.items.push({
        id: msg.itemId,
        name: msg.itemName,
        count: msg.count
      });
    }
  }
  
  if (msg.type==="pickitem" && state.mode === "zhmulti") {
    // Remove item from chest
    const chest = state.droppedItemChests.find(c => c.id === msg.chestId);
    if (chest) {
      chest.items = chest.items.filter(item => item.id !== msg.itemId);
      // Remove chest if empty
      if (chest.items.length === 0) {
        state.droppedItemChests = state.droppedItemChests.filter(c => c.id !== msg.chestId);
      }
    }
  }
  
  updateHud();
}

function sendNetworkUpdate(force=false) {
  if ((state.mode!=="multi"&&state.mode!=="zerohour"&&state.mode!=="zhmulti")||!state.socket||state.socket.readyState!==WebSocket.OPEN) return;
  if (!force&&state.networkTimer>0) return;
  state.networkTimer=0.03;
  const update = {
    type:"update",
    x:state.x,
    y:state.y,
    angle:state.angle,
    pitch:state.pitch,
    jumpHeight:state.jumpHeight,
    firing:state.isFiring
  };
  // Add gear info for zhmulti mode
  if (state.mode === "zhmulti") {
    update.equippedGun = state.equippedGun;
    update.equippedArmor = state.equippedArmor;
    update.equippedHelmet = state.equippedHelmet;
  }
  state.socket.send(JSON.stringify(update));
}

function sendPing(dt) {
  if ((state.mode!=="multi"&&state.mode!=="zerohour"&&state.mode!=="zhmulti")||!state.socket||state.socket.readyState!==WebSocket.OPEN) return;
  state.pingTimer-=dt;
  if (state.pingTimer<=0) { state.pingTimer=12; state.socket.send("ping"); }
}

// ─────────────────────────────────────────────
//  HUD
// ─────────────────────────────────────────────
function updateHud() {
  const isSingle=state.mode==="single";
  const isZH=state.mode==="zerohour";
  const isZHMulti=state.mode==="zhmulti";
  const remaining=isSingle
    ? state.targets.filter(t=>t.alive).length
    : (isZH || isZHMulti)
      ? state.bots.filter(b=>b.alive).length
      : Object.values(state.players).filter(p=>p.id!==state.playerId&&p.alive).length;
  targetLabelEl.textContent=isSingle||isZH?"Enemies":"Opponent";
  targetsEl.textContent=String(isSingle||isZH?remaining:(remaining?1:0));
  hpEl.textContent=String(Math.max(0,state.hp));
  hpEl.style.color=state.hp<=30?"#d74632":"";
  if (isZH && !state.gunStats) {
    ammoEl.textContent = "—";
  } else {
    ammoEl.textContent=state.reloadTimer>0?"...":isZH&&state.gunStats?.ammoType
      ?`${state.ammo}/${state.maxAmmo} [${state.zhAmmoInventory[state.gunStats.ammoType]||0}]`
      :`${state.ammo}/${state.maxAmmo}`;
  }
  if (isZH && state.extractPoint) {
    const near=Math.hypot(state.x-state.extractPoint.x,state.y-state.extractPoint.y)<EXTRACT_RADIUS;
    if (timeLabelEl) timeLabelEl.textContent=near?"Extract":"Evac";
    timeEl.textContent=near
      ?`${Math.max(0,Math.ceil(EXTRACT_DURATION-state.extractTimer))}s`
      :"—";
  } else {
    if (timeLabelEl) timeLabelEl.textContent="Time";
    timeEl.textContent=String(Math.max(0,Math.ceil(state.remaining)));
  }
  if (!hudGear.hidden) hudGearText.textContent=state.equippedGun||"Knife";
  if (quitButton) {
    quitButton.classList.toggle("hidden-btn", (state.mode === "zerohour" || state.mode === "zhmulti") && state.running);
  }
}

function updateExtract(dt) {
  if ((state.mode!=="zerohour"&&state.mode!=="zhmulti")||!state.running||state.isDead||!state.extractPoint) return;
  state.extractSmokePhase+=dt;
  
  // In boss arena, cannot extract until boss is killed
  if (state.selectedMap === "boss") {
    const bossAlive = state.bots.some(bot => bot.isBoss && bot.alive);
    if (bossAlive) {
      if (state.extractTimer > 0) {
        showMessage("Cannot extract! Boss still alive!");
        state.extractTimer = 0;
      }
      return;
    }
  }
  
  const dist=Math.hypot(state.x-state.extractPoint.x,state.y-state.extractPoint.y);
  if (dist<EXTRACT_RADIUS) {
    state.extractTimer+=dt;
    if (state.extractTimer>=EXTRACT_DURATION) completeExtract();
    else if (Math.floor(state.extractTimer*2)!==Math.floor((state.extractTimer-dt)*2)) {
      showMessage(`Extracting… ${Math.ceil(EXTRACT_DURATION-state.extractTimer)}s`);
    }
  } else if (state.extractTimer>0) {
    state.extractTimer=Math.max(0,state.extractTimer-dt*2.5);
  }
}

function completeExtract() {
  awardMoney(500);
  endGame("Extracted — mission complete", { keepLoot: true });
}

function loseEquippedGearOnDeath() {
  const acc = getAccount();
  if (!acc || !acc.equipped) return;
  let lostAny = false;
  for (const slot of ["gun", "armor", "helmet", "backpack"]) {
    const name = acc.equipped[slot];
    if (!name) continue;
    if (acc.inventory?.[name] > 0) {
      acc.inventory[name] -= 1;
      if (acc.inventory[name] <= 0) delete acc.inventory[name];
    }
    acc.equipped[slot] = null;
    if (slot === "gun") acc.equipped.ammoType = null;
    lostAny = true;
  }
  if (lostAny) {
    acc.updatedAt = Date.now();
    saveAccount(acc);
  }
}

function handleRaidDeath() {
  discardRunLoot();
  loseEquippedGearOnDeath();
  endGame("You were eliminated — raid loot and equipped gear lost");
}

// ─────────────────────────────────────────────
//  MOVEMENT & PHYSICS
// ─────────────────────────────────────────────
function movePlayer(dt) {
  if (state.isDead || isInGameUiOpen()) return;
  const baseSpeed=1.6, sprintSpeed=4.2;
  const speedMultiplier = getMovementSpeedMultiplier();
  const speed=(state.keys.has("shift")?sprintSpeed:baseSpeed) * speedMultiplier;
  let mx=0,my=0;
  const fx=Math.cos(state.angle),fy=Math.sin(state.angle);
  const rx=Math.cos(state.angle+Math.PI/2),ry=Math.sin(state.angle+Math.PI/2);
  if(state.keys.has("w")){mx+=fx;my+=fy;}
  if(state.keys.has("s")){mx-=fx;my-=fy;}
  if(state.keys.has("d")){mx+=rx;my+=ry;}
  if(state.keys.has("a")){mx-=rx;my-=ry;}
  mx+=fx*-state.touchMoveY+rx*state.touchMoveX;
  my+=fy*-state.touchMoveY+ry*state.touchMoveX;
  const len=Math.hypot(mx,my)||1;
  const nx=state.x+(mx/len)*speed*dt, ny=state.y+(my/len)*speed*dt;
  if(!isWall(nx,state.y))state.x=nx;
  if(!isWall(state.x,ny))state.y=ny;

  if ((state.mode==="zerohour" || state.mode==="zhmulti") && state.keys.has("f") && !isInGameUiOpen()) tryOpenNearbyChest();
}

function jump() { if(!state.running||state.isDead||state.jumpHeight>0.02)return; state.jumpVelocity=7.1; }
function updateJump(dt) {
  if(state.jumpHeight<=0&&state.jumpVelocity<=0){state.jumpHeight=0;state.jumpVelocity=0;return;}
  state.jumpHeight+=state.jumpVelocity*dt; state.jumpVelocity-=16*dt;
  if(state.jumpHeight<0){state.jumpHeight=0;state.jumpVelocity=0;}
}
function viewYOffset() { return state.jumpHeight*canvas.height*0.16 + (-state.pitch*canvas.height*0.42); }

// ─────────────────────────────────────────────
//  ENEMY AI (Single player + ZH bots)
// ─────────────────────────────────────────────
function getActiveEnemies() {
  if (state.mode==="single") return state.targets;
  if (state.mode==="zerohour") return state.bots;
  return [];
}

function moveTargets(dt) {
  for (const t of getActiveEnemies()) {
    if(!t.alive)continue;
    const nx=t.x+t.vx*dt, ny=t.y+t.vy*dt;
    if(isWall(nx,t.y))t.vx*=-1; else t.x=nx;
    if(isWall(t.x,ny))t.vy*=-1; else t.y=ny;
    if(Math.hypot(t.vx,t.vy)<0.2){t.vx=0.45;t.vy=0.35;}
  }
}

function updateEnemyShots(dt) {
  for (const t of getActiveEnemies()) {
    if(!t.alive)continue;
    t.muzzleFlash=Math.max(0,t.muzzleFlash-dt);
    t.shotTimer-=dt;
    const dist=Math.hypot(t.x-state.x,t.y-state.y);
    if(hasLineOfSight(t)&&dist<8&&t.shotTimer<=0) {
      // Boss has faster fire rate
      const fireRate = t.isBoss ? (60 / (GUN_STATS["Boss Gun"]?.rpm || 700)) : 2.4+Math.random()*2.1;
      t.shotTimer=fireRate;
      t.muzzleFlash=0.18;
      const hit=Math.max(0.16, 0.52-dist*0.055);
      if(Math.random()<hit) {
        // Apply damage — enemies can hit head or body randomly
        const zone=Math.random()<0.25?"Head":"Body";
        // Boss uses Boss Gun damage (80), regular enemies use default
        let dmg = t.isBoss ? (GUN_STATS["Boss Gun"]?.damage || 80) : ENEMY_HIT_DAMAGE;
        if (state.equippedHelmet) {
          const lv=parseInt(state.equippedHelmet)||1;
          dmg=Math.round(dmg*(1-lv*0.05));
        }
        if (state.equippedArmor) {
          const lv=parseInt(state.equippedArmor)||1;
          dmg=Math.round(dmg*(1-lv*0.05));
        }
        state.hp=Math.max(0,state.hp-dmg);
        state.damageFlash=0.28;
        showMessage(`${t.isBoss ? 'BOSS ' : ''}${zone} hit – HP ${state.hp}`);
        if(state.hp<=0) {
          if (state.mode === "zerohour") handleRaidDeath();
          else endGame("You were eliminated");
        }
      } else { showMessage(t.isBoss ? "Boss attacking!" : "Incoming fire"); }
    }
  }
}

function updateCombatTimers(dt) {
  state.knifeCooldown = Math.max(0, state.knifeCooldown - dt);
  state.knifeSwingTimer = Math.max(0, state.knifeSwingTimer - dt);
  for (const t of [...state.targets, ...state.bots]) {
    if (t.hitFlash) t.hitFlash = Math.max(0, t.hitFlash - dt);
  }
  for (const [id, time] of Object.entries(state.playerHitFlashes)) {
    const next = time - dt;
    if (next <= 0) delete state.playerHitFlashes[id];
    else state.playerHitFlashes[id] = next;
  }
}

// ─────────────────────────────────────────────
//  SHOOTING
// ─────────────────────────────────────────────
function targetScreenInfo(target) {
  const fov=effectiveFov();
  const dx=target.x-state.x, dy=target.y-state.y;
  const dist=Math.hypot(dx,dy);
  if(dist<0.72)return null;
  const angle=normalizeAngle(Math.atan2(dy,dx)-state.angle);
  const nearScale=clamp((7-dist)/6,0,1);
  let size=22+nearScale*nearScale*384;
  // Boss is 10x bigger
  if(target.isBoss || target.bossScale) {
    size *= (target.bossScale || 10);
  }
  const jumpOff=(target.jumpHeight||0)*canvas.height*0.08;
  return {
    target,dist,angle,size,
    screenX:canvas.width/2+(angle/(fov/2))*(canvas.width/2),
    screenY:canvas.height/2+size*0.34+viewYOffset()-jumpOff
  };
}

function getShootableTargets() {
  if(state.mode==="single") return state.targets;
  if(state.mode==="zerohour") return state.bots;
  if(state.mode==="zhmulti") {
    // In ZH multiplayer, can shoot both bots AND other players
    const bots = state.bots || [];
    const players = Object.values(state.players).filter(p=>p.id!==state.playerId).map(p=>({...p,health:p.hp,alive:p.alive}));
    return [...bots, ...players];
  }
  return Object.values(state.players).filter(p=>p.id!==state.playerId).map(p=>({...p,health:p.hp,alive:p.alive}));
}

function getHitZone(info,x,y) {
  const lx=x-info.screenX, ly=y-info.screenY, s=info.size;
  if(ly>=-s*0.55&&ly<=-s*0.05&&Math.abs(lx)<=s*0.35) return {name:"Head",zone:"head",damage:0};
  if(ly>=-s*0.12&&ly<=s*0.55&&Math.abs(lx)<=s*0.45)  return {name:"Body",zone:"body",damage:0};
  if(ly>=-s*0.10&&ly<=s*0.55&&Math.abs(lx)<=s*0.70)  return {name:"Arm", zone:"arm", damage:0};
  if(ly>s*0.38&&ly<=s*0.85&&Math.abs(lx)<=s*0.55)    return {name:"Leg", zone:"leg", damage:0};
  return null;
}

function calcDamage(zone, gs) {
  const gunName=state.equippedGun||"";

  if(gunName==="AWM Sniper Rifle") return 150;
  if(gunName==="R93 Sniper Rifle") return zone.zone==="head"?120:90;

  // Base damages scaled by gun
  const base={head:2.2,body:1.0,arm:0.5,leg:0.5};
  const mult=base[zone.zone]||1.0;
  let dmg=Math.round(gs.damage*mult);
  // Hipfire spread — random miss chance based on hipfire stat (reduced if ADS)
  const spread=state.ads?0.06:(1-gs.hipfire)*0.55;
  if(Math.random()<spread) return 0; // bullet spread miss
  // Recoil adds additional miss chance
  if(Math.random()<state.recoil*0.25) return 0;
  return dmg;
}

function applyArmorToTarget(dmg, zone, target) {
  // Bots have simplified armor
  if (zone==="head"&&target.equippedArmor) { const lv=parseInt(target.equippedArmor)||1; dmg=Math.round(dmg*(1-lv*0.05)); }
  else if (zone==="body"&&target.equippedArmor) { const lv=parseInt(target.equippedArmor)||1; dmg=Math.round(dmg*(1-lv*0.05)); }
  return dmg;
}

function damageLocalTarget(target, dmg, label = "Hit") {
  target.hp = Math.max(0, target.hp - dmg);
  target.health = target.hp;
  target.hitFlash = 0.3;
  if (target.hp <= 0) {
    target.alive = false;
    state.score += 1;
    if (state.mode === "zerohour") dropAiLootBox(target);
    showMessage("Enemy down");
    if (state.mode === "zerohour") awardMoney(150);
  } else {
    showMessage(`${label} - ${target.hp}HP`);
  }
}

function swingKnife() {
  if (!state.running || state.isDead || state.knifeCooldown > 0 || isInGameUiOpen()) return;
  state.knifeCooldown = 1;
  state.knifeSwingTimer = 0.28;
  state.hitFlash = 0.12;
  let bestTarget = null;
  let bestDist = Infinity;
  for (const t of getShootableTargets()) {
    if (!t.alive || !hasLineOfSight(t)) continue;
    const info = targetScreenInfo(t);
    if (!info || info.dist > 1.65 || Math.abs(info.angle) > 0.42) continue;
    if (info.dist < bestDist) { bestTarget = t; bestDist = info.dist; }
  }
  if (!bestTarget) { showMessage("Knife miss"); return; }
  const baseDamage = 30;
  const damage = Math.round(baseDamage * getMeleeDamageMultiplier());
  if (state.mode === "multi" || state.mode === "zhmulti") {
    // Check if target is a player or a bot
    const isPlayer = bestTarget.id && bestTarget.id.startsWith('p');
    if (isPlayer) {
      // Send damage to server for players
      state.socket?.send(JSON.stringify({ type:"hit", target:bestTarget.id, damage }));
      state.playerHitFlashes[bestTarget.id] = 0.3;
      showMessage("Knife hit");
    } else {
      // Damage bots locally
      damageLocalTarget(bestTarget, damage);
    }
  } else {
    damageLocalTarget(bestTarget, damage);
  }
}

function shoot(opts = {}) {
  if(!state.running||state.isDead||state.reloadTimer>0)return;
  if((state.mode==="zerohour"||state.mode==="zhmulti")&&!hasEquippedWeapon()) {
    if (!opts.quiet) swingKnife();
    return;
  }
  if(state.ammo<=0){reload();return;}
  const gs=state.gunStats;
  if(!gs)return;

  // Check ammo in ZH mode
  if(state.mode==="zerohour"&&gs.ammoType) {
    const avail=state.zhAmmoInventory[gs.ammoType]||0;
    if(state.ammo<=0&&avail<=0){showMessage("No ammo! Loot chests.");return;}
  }

  state.ammo-=1;
  // Recoil: each shot increases recoil, pulled upward
  state.recoil=Math.min(1,state.recoil+gs.recoil*0.6);
  state.recoilAngle+=gs.recoil*0.018*(Math.random()-0.5);
  if(state.mode==="zerohour" || state.mode==="zhmulti") {
    state.pitch=clamp(state.pitch-gs.recoil*0.018*(state.ads?0.55:1),-1.2,1.2);
    state.angle=normalizeAngle(state.angle+gs.recoil*0.012*(Math.random()-0.5));
  }
  state.fireCooldown=60/gs.rpm;

  let bestTarget=null, bestZone=null, bestDist=Infinity;
  for (const t of getShootableTargets()) {
    if(!t.alive||!hasLineOfSight(t))continue;
    const info=targetScreenInfo(t); if(!info)continue;
    if(Math.abs(info.angle)>effectiveFov()/1.55)continue;
    const aim=getAimScreen();
    const spread=(1-gs.hipfire)*canvas.width*0.04*(state.ads?0.12:1);
    const cx=aim.x+(Math.random()-0.5)*spread;
    const cy=aim.y+(Math.random()-0.5)*spread;
    const hz=getHitZone(info,cx,cy);
    if(hz&&info.dist<bestDist){bestTarget=t;bestZone=hz;bestDist=info.dist;}
  }

  if(bestTarget) {
    state.hitFlash=0.22;
    let dmg=calcDamage(bestZone,gs);
    if(dmg>0) dmg=applyArmorToTarget(dmg,bestZone.zone,bestTarget);
    if(dmg<=0){showMessage("Miss");} else {
      if(state.mode==="multi" || state.mode==="zhmulti") {
        // Check if target is a player or a bot
        const isPlayer = bestTarget.id && bestTarget.id.startsWith('p');
        if (isPlayer) {
          // Send damage to server for players
          state.socket?.send(JSON.stringify({type:"hit",target:bestTarget.id,damage:dmg}));
          state.playerHitFlashes[bestTarget.id] = 0.3;
          showMessage(`${bestZone.name} hit`);
        } else {
          // Damage bots locally
          damageLocalTarget(bestTarget, dmg, `${bestZone.name} hit`);
        }
      } else {
        damageLocalTarget(bestTarget, dmg, `${bestZone.name} hit`);
      }
    }
  }

  const allEnemies=getActiveEnemies();
  if(allEnemies.length>0&&allEnemies.every(t=>!t.alive)){
    if(state.mode==="single") endGame("Range clear");
    else if(state.mode==="zerohour") showMessage("All bots down! Explore for chests.");
  }
  updateHud();
}

function awardMoney(amount) {
  const acc=getAccount(); if(!acc)return;
  acc.money+=amount; saveAccount(acc);
}

function updateAutoFire(dt) {
  state.fireCooldown=Math.max(0,state.fireCooldown-dt);
  if(state.isFiring&&state.fireCooldown<=0) shoot({ quiet: true });
}

function reload() {
  if(state.reloadTimer>0||state.ammo===state.maxAmmo)return;
  if((state.mode==="zerohour"||state.mode==="zhmulti")&&!hasEquippedWeapon()) {
    showMessage("No weapon equipped");
    return;
  }
  const gs=state.gunStats;
  if(!gs)return;

  // In ZH, need ammo in inventory
  if(state.mode==="zerohour"&&gs.ammoType) {
    const have=state.zhAmmoInventory[gs.ammoType]||0;
    if(have<=0){showMessage("No ammo reserves!");return;}
    // Pull from reserves
    const need=gs.magSize-state.ammo;
    const take=consumeAmmoFromRunSlots(gs.ammoType, Math.min(need,have));
    state.ammo+=take;
    if(state.ammo===state.maxAmmo){updateHud();showMessage("Reloaded");return;}
  }

  state.reloadTimer=1.25;
  showMessage("Reloading..."); updateHud();
}

// ─────────────────────────────────────────────
//  ADS (Aim Down Sights)
// ─────────────────────────────────────────────
function setAds(on) {
  if((state.mode==="zerohour"||state.mode==="zhmulti")&&!hasEquippedWeapon()) {
    state.ads=false;
    return;
  }
  state.ads=on;
}

function updateAds(dt) {
  const gs=state.gunStats;
  if(!gs) {
    state.ads=false;
    state.adsProgress=0;
    return;
  }
  const target=state.ads?1:0;
  const speed=1/Math.max(0.05,gs.adsTime);
  state.adsProgress=clamp(state.adsProgress+(target-state.adsProgress)*speed*dt*8,0,1);
}

// ─────────────────────────────────────────────
//  RENDERING
// ─────────────────────────────────────────────
function getWallColors() {
  // Different wall colors per map
  const selectedMap = mapSelect?.value || "urban";
  if (selectedMap === "village") {
    return {
      base: { r: 240, g: 235, b: 220 },  // White/cream walls
      accent: { r: 200, g: 180, b: 160 }, // Slightly darker
      roof: { r: 139, g: 69, b: 19 }      // Brown roof color
    };
  } else if (selectedMap === "boss") {
    return {
      base: { r: 80, g: 70, b: 65 },      // Dark stone
      accent: { r: 100, g: 90, b: 85 },   // Lighter stone
      roof: { r: 60, g: 55, b: 50 }       // Darker top
    };
  } else {
    return {
      base: { r: 130, g: 140, b: 112 },   // Urban gray-green
      accent: { r: 150, g: 160, b: 132 }, // Lighter
      roof: { r: 110, g: 120, b: 92 }     // Darker
    };
  }
}

function drawWorld() {
  const w=canvas.width, h=canvas.height;
  if (w < 2 || h < 2) return;
  const fov=effectiveFov();
  const sw=w/RAY_COUNT;
  const skyColor="#b5aa8c";
  const floorColor="#2f4538";
  const wallColors = getWallColors();

  for (let i=0; i<RAY_COUNT; i++) {
    const ra=state.angle-fov/2+(i/RAY_COUNT)*fov;
    const ray=castRay(ra);
    const cd=ray.depth*Math.cos(ra-state.angle);
    const wh=Math.min(h, h/Math.max(cd,0.1));
    const wallTop=(h-wh)/2+viewYOffset();
    const wallBottom=wallTop+wh;
    const x=i*sw;
    const colW=Math.ceil(sw)+1;
    
    // Enhanced lighting with fog
    const fogFactor = Math.min(1, cd / MAX_DEPTH);
    const lightLevel = Math.max(0.2, 1 - fogFactor * 0.7);
    
    if (wallBottom <= 0) {
      ctx.fillStyle=skyColor;
      ctx.fillRect(x,0,colW,h);
      continue;
    }
    if (wallTop >= h) {
      ctx.fillStyle=floorColor;
      ctx.fillRect(x,0,colW,h);
      continue;
    }

    ctx.fillStyle=skyColor;
    ctx.fillRect(x,0,colW,Math.max(0,Math.min(h,wallTop)));
    ctx.fillStyle=floorColor;
    ctx.fillRect(x,Math.max(0,wallBottom),colW,h-Math.max(0,wallBottom));

    const drawTop=Math.max(0,wallTop);
    const drawBottom=Math.min(h,wallBottom);
    if (drawBottom > drawTop) {
      const wallHeight = drawBottom - drawTop;
      
      // Determine if vertical or horizontal wall hit
      const isVertical = Math.abs(ray.x - Math.round(ray.x)) < 0.04;
      
      // Choose base color (vertical walls slightly darker)
      const baseColor = isVertical ? wallColors.accent : wallColors.base;
      
      // Apply lighting - simple and stable
      const r = Math.floor(baseColor.r * lightLevel);
      const g = Math.floor(baseColor.g * lightLevel);
      const b = Math.floor(baseColor.b * lightLevel);
      
      // Draw solid color wall - completely stable, no flickering
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, drawTop, colW, wallHeight);
      
      // Simple edge darkening for vertical walls
      if (isVertical) {
        ctx.fillStyle = `rgba(0,0,0,0.15)`;
        ctx.fillRect(x, drawTop, colW, wallHeight);
      }
    }
  }
}

function drawChests() {
  if(state.mode!=="zerohour"&&state.mode!=="zhmulti")return;
  for(const chest of state.chests) {
    // Draw all chests, even opened ones
    const dx=chest.x-state.x, dy=chest.y-state.y;
    const dist=Math.hypot(dx,dy);
    if(dist>MAX_DEPTH||dist<0.5)continue;
    const angle=normalizeAngle(Math.atan2(dy,dx)-state.angle);
    const fov=effectiveFov();
    if(Math.abs(angle)>fov/1.6)continue;
    const ray=castRay(Math.atan2(dy,dx));
    if(ray.depth<dist-0.3)continue;
    const sx=canvas.width/2+(angle/(fov/2))*(canvas.width/2);
    const size=clamp(60/dist,8,80);
    const sy=canvas.height/2+viewYOffset();
    ctx.save();
    ctx.translate(sx,sy);
    
    // 3D chest style - on ground
    const isOpen = chest.opened && (!chest.lootItems || chest.lootItems.length === 0) && (!chest.items || chest.items.length === 0);
    const baseColor = chest.isBossChest ? "#8b4513" : chest.isItemChest ? "#2a7a9e" : chest.isAiDrop ? "#46505a" : "#8b5e1a";
    const topColor = chest.isBossChest ? "#d2691e" : chest.isItemChest ? "#3ea8d8" : chest.isAiDrop ? "#66717d" : "#a0721f";
    const lockColor = chest.isBossChest ? "#ffd700" : chest.isItemChest ? "#6bb6ff" : chest.isAiDrop ? "#9fd6ff" : "#f0c84b";
    
    // Shadow
    ctx.fillStyle="rgba(0,0,0,0.3)";
    ctx.beginPath(); ctx.ellipse(0,size*0.35,size*0.5,size*0.12,0,0,Math.PI*2); ctx.fill();
    
    // Chest body (3D box)
    ctx.fillStyle=baseColor;
    ctx.fillRect(-size*0.45,size*0.05,size*0.9,size*0.5);
    // Right side (darker)
    ctx.fillStyle=baseColor.replace(/\d+/g, m => Math.max(0, parseInt(m) - 30));
    ctx.beginPath();
    ctx.moveTo(size*0.45,size*0.05);
    ctx.lineTo(size*0.55,size*0.0);
    ctx.lineTo(size*0.55,size*0.45);
    ctx.lineTo(size*0.45,size*0.55);
    ctx.fill();
    
    // Lid (open or closed)
    if(isOpen) {
      // Open lid
      ctx.fillStyle=topColor;
      ctx.beginPath();
      ctx.moveTo(-size*0.45,-size*0.15);
      ctx.lineTo(-size*0.45,size*0.05);
      ctx.lineTo(size*0.45,size*0.05);
      ctx.lineTo(size*0.45,-size*0.15);
      ctx.fill();
    } else {
      // Closed lid
      ctx.fillStyle=topColor;
      ctx.fillRect(-size*0.45,-size*0.15,size*0.9,size*0.2);
      // Top of lid
      ctx.fillStyle=topColor.replace(/\d+/g, m => Math.min(255, parseInt(m) + 20));
      ctx.beginPath();
      ctx.moveTo(-size*0.45,-size*0.15);
      ctx.lineTo(-size*0.35,-size*0.2);
      ctx.lineTo(size*0.55,-size*0.2);
      ctx.lineTo(size*0.45,-size*0.15);
      ctx.fill();
      // Lock/latch
      ctx.fillStyle=lockColor;
      ctx.fillRect(-size*0.08,-size*0.05,size*0.16,size*0.12);
    }
    
    // Nearby indicator
    if(dist<1.6){
      ctx.fillStyle=isOpen?"rgba(150,150,150,0.9)":"rgba(240,200,75,0.9)";
      ctx.font=`bold ${Math.max(10,size*0.5)}px Verdana`;
      ctx.textAlign="center";
      ctx.fillText(isOpen?"EMPTY":"F",0,-size*0.35);
    }
    ctx.restore();
  }
}

function drawTargets() {
  const visible=getShootableTargets()
    .filter(t=>t.alive&&hasLineOfSight(t))
    .map(t=>targetScreenInfo(t)).filter(Boolean)
    .filter(i=>Math.abs(i.angle)<effectiveFov()/1.55)
    .sort((a,b)=>b.dist-a.dist);

  for(const item of visible){
    const {screenX,size,screenY,target}=item;
    const facing=item.angle>0?-1:1;
    const hurtFlash=clamp((target.hitFlash || state.playerHitFlashes[target.id] || 0) / 0.3, 0, 1);
    const isBoss = target.isBoss;
    
    ctx.save(); ctx.translate(screenX,screenY);
    
    // Enhanced shadow
    ctx.fillStyle="rgba(0,0,0,0.35)";
    ctx.beginPath(); ctx.ellipse(0,size*0.7,size*0.3,size*0.1,0,0,TAU); ctx.fill();
    
    // Blood splatter particles when hit
    if(hurtFlash > 0.5) {
      for(let p = 0; p < 5; p++) {
        const angle = (p / 5) * Math.PI * 2;
        const dist = size * 0.3 * hurtFlash;
        const px = Math.cos(angle) * dist;
        const py = Math.sin(angle) * dist - size * 0.2;
        ctx.fillStyle = `rgba(139,0,0,${hurtFlash * 0.8})`;
        ctx.beginPath();
        ctx.arc(px, py, size * 0.04, 0, TAU);
        ctx.fill();
      }
    }
    
    // Legs with better shading
    const legColor = isBoss ? "#0a0b09" : "#171915";
    ctx.strokeStyle=legColor;
    ctx.lineWidth=Math.max(3,size*0.07);
    ctx.lineCap="round";
    ctx.beginPath();
    ctx.moveTo(-size*0.12,size*0.2);
    ctx.lineTo(-size*0.28,size*0.5);
    ctx.moveTo(facing*size*0.12,size*0.16);
    ctx.lineTo(facing*size*0.36,size*0.08);
    ctx.stroke();
    
    // Body with better colors and details
    const bodyColor = isBoss ? (hurtFlash>0?"#5a1a15":"#1a2520") : (hurtFlash>0?"#8f3b35":"#25362e");
    ctx.fillStyle=bodyColor;
    ctx.beginPath();
    ctx.roundRect(-size*0.24,-size*0.04,size*0.48,size*0.48,size*0.08);
    ctx.fill();
    
    // Body armor plates (tactical vest look)
    if(!isBoss) {
      ctx.fillStyle="rgba(40,45,40,0.6)";
      ctx.fillRect(-size*0.18,size*0.0,size*0.36,size*0.08);
      ctx.fillRect(-size*0.18,size*0.12,size*0.36,size*0.08);
      ctx.fillRect(-size*0.18,size*0.24,size*0.36,size*0.08);
    }
    
    // Head with better skin tone
    const skinColor = isBoss ? (hurtFlash>0?"#c85a50":"#a8786a") : (hurtFlash>0?"#ef8a78":"#d8b48a");
    ctx.fillStyle=skinColor;
    ctx.beginPath();
    ctx.arc(0,-size*0.28,size*0.19,0,TAU);
    ctx.fill();
    
    // Helmet/hat with better detail
    const helmetColor = isBoss ? "#8b0000" : "#10110f";
    ctx.fillStyle=helmetColor;
    ctx.fillRect(-size*0.18,-size*0.43,size*0.36,size*0.13);
    // Helmet strap
    ctx.fillStyle="rgba(0,0,0,0.4)";
    ctx.fillRect(-size*0.18,-size*0.32,size*0.36,size*0.02);
    
    // Arm+gun with better detail
    ctx.strokeStyle=legColor;
    ctx.lineWidth=Math.max(4,size*0.08);
    ctx.beginPath();
    ctx.moveTo(facing*size*0.22,size*0.08);
    ctx.lineTo(facing*size*0.62,-size*0.06);
    ctx.stroke();
    
    // Gun with more detail
    const gunColor = isBoss ? "#1a1a1a" : "#22241f";
    ctx.fillStyle=gunColor;
    const gx=facing>0?size*0.34:-size*0.76;
    ctx.fillRect(gx,-size*0.12,size*0.42,size*0.08);
    // Gun barrel
    ctx.fillStyle="#0a0a0a";
    ctx.fillRect(facing>0?size*0.76:-size*0.76,-size*0.1,size*0.12,size*0.04);
    // Gun magazine
    ctx.fillStyle="rgba(0,0,0,0.5)";
    ctx.fillRect(gx+size*0.15,-size*0.04,size*0.12,size*0.12);
    
    // Enhanced muzzle flash with particles
    if(target.muzzleFlash>0){
      const flashIntensity = target.muzzleFlash;
      const flashX = facing*size*0.82;
      const flashY = -size*0.05;
      
      // Main flash
      ctx.fillStyle=`rgba(255,200,50,${flashIntensity})`;
      ctx.beginPath();
      ctx.arc(flashX, flashY, size*0.12*flashIntensity, 0, TAU);
      ctx.fill();
      
      // Outer glow
      ctx.fillStyle=`rgba(255,150,0,${flashIntensity*0.5})`;
      ctx.beginPath();
      ctx.arc(flashX, flashY, size*0.18*flashIntensity, 0, TAU);
      ctx.fill();
      
      // Flash particles
      for(let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        const dist = size * 0.15 * flashIntensity;
        const px = flashX + Math.cos(angle) * dist;
        const py = flashY + Math.sin(angle) * dist;
        ctx.fillStyle = `rgba(255,220,100,${flashIntensity*0.7})`;
        ctx.beginPath();
        ctx.arc(px, py, size * 0.05, 0, TAU);
        ctx.fill();
      }
    }
    
    // Eyes with better detail
    ctx.fillStyle="#11120f";
    ctx.beginPath();
    ctx.arc(-size*0.06,-size*0.3,size*0.03,0,TAU);
    ctx.arc(size*0.06,-size*0.3,size*0.03,0,TAU);
    ctx.fill();
    // Eye highlights
    ctx.fillStyle="rgba(255,255,255,0.3)";
    ctx.beginPath();
    ctx.arc(-size*0.055,-size*0.305,size*0.012,0,TAU);
    ctx.arc(size*0.065,-size*0.305,size*0.012,0,TAU);
    ctx.fill();
    
    // Mouth
    ctx.beginPath();
    ctx.arc(0,-size*0.22,size*0.055,0,Math.PI);
    ctx.strokeStyle="#11120f";
    ctx.lineWidth=Math.max(1,size*0.025);
    ctx.stroke();
    
    // HP bar with better styling
    const maxHp = isBoss ? 3000 : 100;
    const hpPercent = target.hp/maxHp;
    
    // HP bar background
    ctx.fillStyle="rgba(0,0,0,0.7)";
    ctx.fillRect(-size*0.32,-size*0.66,size*0.64,size*0.06);
    
    // HP bar fill with color gradient based on health
    let hpColor;
    if(hpPercent > 0.6) hpColor = isBoss ? "#ff0000" : "#4ade80";
    else if(hpPercent > 0.3) hpColor = isBoss ? "#ff4444" : "#fbbf24";
    else hpColor = isBoss ? "#ff8888" : "#ef4444";
    
    ctx.fillStyle=hpColor;
    ctx.fillRect(-size*0.3,-size*0.65,size*0.6*hpPercent,size*0.04);
    
    // HP bar border
    ctx.strokeStyle="rgba(255,255,255,0.3)";
    ctx.lineWidth=1;
    ctx.strokeRect(-size*0.32,-size*0.66,size*0.64,size*0.06);
    
    // Show boss HP text
    if(isBoss) {
      ctx.fillStyle="#ffffff";
      ctx.font=`bold ${Math.max(12,size*0.04)}px Arial`;
      ctx.textAlign="center";
      ctx.strokeStyle="#000000";
      ctx.lineWidth=3;
      ctx.strokeText(`BOSS: ${target.hp}/${maxHp}`, 0, -size*0.75);
      ctx.fillText(`BOSS: ${target.hp}/${maxHp}`, 0, -size*0.75);
    }
    
    ctx.restore();
  }
}

function drawDamageFlash() {
  if(state.damageFlash<=0)return;
  ctx.save(); ctx.globalAlpha=Math.min(0.45,state.damageFlash*1.6);
  ctx.fillStyle="#d74632"; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.restore();
}

function getAimScreen() {
  return { x: canvas.width / 2, y: canvas.height / 2 };
}

function gunUsesScopeOverlay() {
  return getActiveOpticZoom() >= 3;
}

function getGunPivot() {
  const w=canvas.width, h=canvas.height;
  const kick=-state.recoil*22;
  const hipX=w*0.72;
  const hipY=h*0.86+kick*0.28;
  const adsX=w/2;
  const adsY=h/2+kick*0.12;
  const t=state.adsProgress;
  return {
    x: hipX+(adsX-hipX)*t,
    y: hipY+(adsY-hipY)*t,
    kick,
    scale: (1.08-t*0.06)*(1+t*0.04),
    showModel: !(gunUsesScopeOverlay()&&t>0.82),
  };
}

// ── Gun renderer: pivot aligns with screen center when ADS ──
function drawGun() {
  if ((state.mode === "zerohour" || state.mode === "zhmulti") && !hasEquippedWeapon()) return;
  const w=canvas.width, h=canvas.height;
  const pivot=getGunPivot();
  if (!pivot.showModel) return;

  const kick=pivot.kick;
  const cx=pivot.x;
  const gy=(frac)=>frac*h;
  const bottom=h+24+kick;

  ctx.save();
  ctx.globalAlpha=clamp(1-state.adsProgress*0.12,0.88,1);
  ctx.translate(pivot.x, pivot.y);
  ctx.scale(pivot.scale, pivot.scale);
  ctx.translate(-pivot.x, -pivot.y);

  ctx.fillStyle="rgba(0,0,0,0.22)";
  ctx.beginPath(); ctx.ellipse(cx,gy(0.94),w*0.14,h*0.04,0,0,TAU); ctx.fill();

  const gunName=state.equippedGun||"";
  const isSMG=gunName.includes("SMG")||gunName.includes("Submachine");
  const isSniper=gunName.includes("Sniper")||gunName.includes("Marksman");
  const isShotgun=gunName.includes("Shotgun");
  const isPistol=gunName.includes("M1911")||gunName.includes("G18");
  const isMG=gunName.includes("Machine Gun");

  if (isPistol) {
    ctx.fillStyle="#1a1c17";
    ctx.beginPath(); ctx.roundRect(cx-14,gy(0.56)+kick*0.3,28,h*0.25,4); ctx.fill();
    ctx.fillStyle="#2e3128"; ctx.fillRect(cx-10,gy(0.50)+kick*0.35,20,h*0.08);
    ctx.fillStyle="#0b0c0a"; ctx.fillRect(cx-5,gy(0.46)+kick*0.4,10,h*0.06);
    ctx.fillStyle="#c8be9a";
    ctx.beginPath(); ctx.arc(cx,gy(0.47)+kick*0.4,4+state.recoil*6,0,TAU); ctx.fill();
  } else if (isSMG) {
    ctx.fillStyle="#141611";
    ctx.beginPath(); ctx.moveTo(cx-20,bottom-60); ctx.lineTo(cx-8,gy(0.54)+kick*0.3);
    ctx.lineTo(cx+8,gy(0.54)+kick*0.3); ctx.lineTo(cx+20,bottom-60); ctx.closePath(); ctx.fill();
    ctx.fillStyle="#2c3028"; ctx.fillRect(cx-40,gy(0.64)+kick*0.15,80,24);
    ctx.fillStyle="#34382f"; ctx.beginPath(); ctx.roundRect(cx-36,gy(0.62)+kick*0.1,72,28,8); ctx.fill();
    ctx.strokeStyle="#c9c0a8"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.arc(cx,gy(0.63)+kick*0.1,10,0,TAU); ctx.stroke();
    ctx.fillStyle="#b6aa8a";
    ctx.beginPath(); ctx.arc(cx,gy(0.48)+kick*0.28,5+state.recoil*8,0,TAU); ctx.fill();
  } else if (isSniper) {
    ctx.fillStyle="#141611";
    ctx.beginPath(); ctx.moveTo(cx-28,bottom-80); ctx.lineTo(cx-10,gy(0.50)+kick*0.32);
    ctx.lineTo(cx+10,gy(0.50)+kick*0.32); ctx.lineTo(cx+28,bottom-80); ctx.closePath(); ctx.fill();
    ctx.fillStyle="#8a6c3e";
    ctx.beginPath(); ctx.moveTo(cx-130,bottom); ctx.lineTo(cx-52,gy(0.78)+kick*0.1);
    ctx.lineTo(cx+32,gy(0.78)+kick*0.1); ctx.lineTo(cx+80,bottom); ctx.closePath(); ctx.fill();
    ctx.fillStyle="#2c3028"; ctx.fillRect(cx-7,gy(0.44)+kick*0.22,14,h*0.22);
    ctx.fillStyle="#1c1e18"; ctx.beginPath(); ctx.roundRect(cx-22,gy(0.46)+kick*0.2,44,18,6); ctx.fill();
    ctx.fillStyle="#4a90d9"; ctx.beginPath(); ctx.roundRect(cx-18,gy(0.48)+kick*0.21,36,14,4); ctx.fill();
    ctx.fillStyle="#b6aa8a";
    ctx.beginPath(); ctx.arc(cx,gy(0.47)+kick*0.24,5+state.recoil*8,0,TAU); ctx.fill();
  } else if (isShotgun) {
    ctx.fillStyle="#8b5e1a";
    ctx.beginPath(); ctx.moveTo(cx-100,bottom); ctx.lineTo(cx-46,gy(0.78)+kick*0.1);
    ctx.lineTo(cx+30,gy(0.78)+kick*0.1); ctx.lineTo(cx+70,bottom); ctx.closePath(); ctx.fill();
    ctx.fillStyle="#1a1c17";
    ctx.fillRect(cx-46,gy(0.68)+kick*0.14,76,20);
    ctx.fillRect(cx-50,gy(0.62)+kick*0.16,80,18);
    ctx.fillStyle="#b6aa8a";
    ctx.beginPath(); ctx.arc(cx-46,gy(0.46)+kick*0.28,6+state.recoil*9,0,TAU); ctx.fill();
    ctx.beginPath(); ctx.arc(cx-34,gy(0.46)+kick*0.28,6+state.recoil*9,0,TAU); ctx.fill();
  } else if (isMG) {
    ctx.fillStyle="#141611";
    ctx.beginPath(); ctx.moveTo(cx-34,bottom-80); ctx.lineTo(cx-14,gy(0.52)+kick*0.33);
    ctx.lineTo(cx+14,gy(0.52)+kick*0.33); ctx.lineTo(cx+34,bottom-80); ctx.closePath(); ctx.fill();
    ctx.fillStyle="#8b5e1a";
    ctx.beginPath(); ctx.moveTo(cx-140,bottom); ctx.lineTo(cx-60,gy(0.77)+kick*0.1);
    ctx.lineTo(cx+60,gy(0.77)+kick*0.1); ctx.lineTo(cx+140,bottom); ctx.closePath(); ctx.fill();
    ctx.fillStyle="#2c3028"; ctx.fillRect(cx-9,gy(0.46)+kick*0.24,18,h*0.22);
    ctx.fillStyle="#34382f"; ctx.beginPath(); ctx.roundRect(cx-64,gy(0.64)+kick*0.1,128,42,10); ctx.fill();
    ctx.strokeStyle="#c9c0a8"; ctx.lineWidth=3;
    ctx.beginPath(); ctx.arc(cx,gy(0.63)+kick*0.1,16,0,TAU); ctx.stroke();
    ctx.fillStyle="#b6aa8a";
    ctx.beginPath(); ctx.arc(cx,gy(0.49)+kick*0.25,7+state.recoil*10,0,TAU); ctx.fill();
  } else {
    ctx.fillStyle="#141611";
    ctx.beginPath(); ctx.moveTo(cx-26,bottom-70); ctx.lineTo(cx-12,gy(0.54)+kick*0.35);
    ctx.lineTo(cx+12,gy(0.54)+kick*0.35); ctx.lineTo(cx+26,bottom-70); ctx.closePath(); ctx.fill();
    ctx.fillStyle="#2c3028";
    ctx.beginPath(); ctx.moveTo(cx-58,bottom-22); ctx.lineTo(cx-24,gy(0.69)+kick*0.15);
    ctx.lineTo(cx+24,gy(0.69)+kick*0.15); ctx.lineTo(cx+58,bottom-22); ctx.closePath(); ctx.fill();
    ctx.fillStyle="#744f31";
    ctx.beginPath(); ctx.moveTo(cx-118,bottom); ctx.lineTo(cx-54,gy(0.77)+kick*0.1);
    ctx.lineTo(cx+54,gy(0.77)+kick*0.1); ctx.lineTo(cx+118,bottom); ctx.closePath(); ctx.fill();
    ctx.fillStyle="#0b0c0a"; ctx.fillRect(cx-7,gy(0.48)+kick*0.25,14,h*0.18);
    ctx.fillStyle="#34382f"; ctx.beginPath(); ctx.roundRect(cx-52,gy(0.64)+kick*0.1,104,38,10); ctx.fill();
    ctx.strokeStyle="#c9c0a8"; ctx.lineWidth=3;
    ctx.beginPath(); ctx.arc(cx,gy(0.63)+kick*0.1,15,0,TAU); ctx.stroke();
    ctx.strokeStyle="#080907"; ctx.lineWidth=8;
    ctx.beginPath(); ctx.moveTo(cx-42,gy(0.71)+kick*0.12); ctx.lineTo(cx+42,gy(0.71)+kick*0.12); ctx.stroke();
    ctx.fillStyle="#b6aa8a";
    ctx.beginPath(); ctx.arc(cx,gy(0.49)+kick*0.25,6+state.recoil*10,0,TAU); ctx.fill();
  }

  ctx.restore();
}

function drawKnife() {
  if ((state.mode !== "zerohour" && state.mode !== "zhmulti") || hasEquippedWeapon()) return;
  const w=canvas.width, h=canvas.height;
  const swing=state.knifeSwingTimer>0 ? 1 - state.knifeSwingTimer / 0.28 : 0;
  const arc=Math.sin(swing*Math.PI);
  const x=w*0.70 - arc*w*0.18;
  const y=h*0.82 - arc*h*0.22;
  const rot=-0.55 + arc*1.35;
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(rot);
  ctx.fillStyle="#b88964";
  ctx.beginPath(); ctx.roundRect(-18,18,36,90,10); ctx.fill();
  ctx.fillStyle="#181a16";
  ctx.beginPath(); ctx.roundRect(-28,0,56,34,8); ctx.fill();
  ctx.fillStyle="#d9dfd2";
  ctx.beginPath();
  ctx.moveTo(-12,0);
  ctx.lineTo(0,-145);
  ctx.lineTo(16,0);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle="#f5f8ef";
  ctx.beginPath();
  ctx.moveTo(0,-132);
  ctx.lineTo(5,-8);
  ctx.lineTo(13,0);
  ctx.lineTo(0,-145);
  ctx.fill();
  ctx.restore();
}

function drawDroppedItems() {
  if (state.mode !== "zhmulti") return;
  // Draw item chests (shared dropped items)
  for (const chest of state.droppedItemChests) {
    const dx = chest.x - state.x, dy = chest.y - state.y;
    const dist = Math.hypot(dx, dy);
    if (dist > MAX_DEPTH || dist < 0.5) continue;
    const angle = normalizeAngle(Math.atan2(dy, dx) - state.angle);
    const fov = effectiveFov();
    if (Math.abs(angle) > fov / 1.6) continue;
    const ray = castRay(Math.atan2(dy, dx));
    if (ray.depth < dist - 0.3) continue;
    
    const sx = canvas.width / 2 + (angle / (fov / 2)) * (canvas.width / 2);
    const size = clamp(60 / dist, 8, 80);
    const sy = canvas.height / 2 + viewYOffset();
    
    ctx.save();
    ctx.translate(sx, sy);
    // Draw item chest (blue/cyan color to distinguish from loot chests)
    ctx.fillStyle = "#2a7a9e";
    ctx.fillRect(-size / 2, -size * 0.4, size, size * 0.7);
    ctx.fillStyle = "#3ea8d8";
    ctx.fillRect(-size / 2, -size * 0.4, size, size * 0.22);
    ctx.fillStyle = "#6bb6ff";
    ctx.fillRect(-size * 0.08, -size * 0.08, size * 0.16, size * 0.16);
    
    // Nearby indicator
    if (dist < 1.6) {
      ctx.fillStyle = "rgba(62,168,216,0.9)";
      ctx.font = `bold ${Math.max(10, size * 0.5)}px Verdana`;
      ctx.textAlign = "center";
      ctx.fillText("F", 0, -size * 0.6);
    }
    ctx.restore();
  }
}

function drawExtractPoint() {
  if ((state.mode!=="zerohour"&&state.mode!=="zhmulti")||!state.extractPoint) return;
  const ep=state.extractPoint;
  const dx=ep.x-state.x, dy=ep.y-state.y;
  const dist=Math.hypot(dx,dy);
  if (dist>MAX_DEPTH||dist<0.4) return;
  const angle=normalizeAngle(Math.atan2(dy,dx)-state.angle);
  const fov=effectiveFov();
  if (Math.abs(angle)>fov/1.5) return;
  const ray=castRay(Math.atan2(dy,dx));
  if (ray.depth<dist-0.35) return;

  const sx=canvas.width/2+(angle/(fov/2))*(canvas.width/2);
  const base=clamp(90/dist,12,110);
  const sy=canvas.height/2+viewYOffset();
  const phase=state.extractSmokePhase;

  ctx.save();
  ctx.translate(sx,sy);

  ctx.fillStyle="rgba(40,120,55,0.35)";
  ctx.beginPath(); ctx.ellipse(0,base*0.35,base*0.55,base*0.14,0,0,TAU); ctx.fill();

  for (let i=0; i<14; i++) {
    const t=phase*1.4+i*0.55;
    const px=Math.sin(t*1.7+i)*base*0.22;
    const py=-base*0.15-Math.abs(Math.sin(t*2.1+i*0.8))*base*0.55;
    const r=base*0.08+Math.sin(t+i)*base*0.04;
    const alpha=0.22+Math.sin(t*1.3)*0.12;
    ctx.fillStyle=`rgba(72,200,96,${alpha})`;
    ctx.beginPath(); ctx.arc(px,py,r,0,TAU); ctx.fill();
    ctx.fillStyle=`rgba(120,230,130,${alpha*0.55})`;
    ctx.beginPath(); ctx.arc(px,py-r*0.35,r*0.55,0,TAU); ctx.fill();
  }

  ctx.fillStyle="#3ecf5a";
  ctx.beginPath(); ctx.arc(0,base*0.2,base*0.12,0,TAU); ctx.fill();
  ctx.strokeStyle="rgba(180,255,190,0.85)"; ctx.lineWidth=2;
  ctx.beginPath(); ctx.arc(0,base*0.2,base*0.12,0,TAU); ctx.stroke();

  if (dist<EXTRACT_RADIUS+2) {
    ctx.fillStyle="rgba(200,255,210,0.95)";
    ctx.font=`bold ${Math.max(11,base*0.22)}px Verdana`;
    ctx.textAlign="center";
    const left=Math.max(0,Math.ceil(EXTRACT_DURATION-state.extractTimer));
    ctx.fillText(dist<EXTRACT_RADIUS?`EXTRACT ${left}s`:"EXTRACT",0,-base*0.35);
  }
  ctx.restore();
}

// ── ADS iron sight overlay (aligned to screen center) ──
function drawADS() {
  if(state.adsProgress<0.01)return;
  const w=canvas.width,h=canvas.height,a=state.adsProgress;
  const {x:cx,y:cy}=getAimScreen();
  const optic=getActiveOpticMeta();
  const zoom=getActiveOpticZoom();
  ctx.save(); ctx.globalAlpha=a;
  if(zoom>=3) {
    const r=Math.min(w,h)*(zoom>=7?0.34:0.30);
    ctx.fillStyle="#000";
    ctx.beginPath(); ctx.rect(0,0,w,h); ctx.arc(cx,cy,r,0,TAU,true); ctx.fill();
    ctx.fillStyle="rgba(20,30,25,0.18)"; ctx.beginPath(); ctx.arc(cx,cy,r,0,TAU); ctx.fill();
    ctx.strokeStyle=optic.altZoom?"rgba(150,220,255,0.92)":"rgba(247,240,220,0.9)"; ctx.lineWidth=1.5;
    ctx.beginPath();
    ctx.moveTo(cx-r,cy); ctx.lineTo(cx+r,cy);
    ctx.moveTo(cx,cy-r); ctx.lineTo(cx,cy+r);
    ctx.stroke();
    ctx.fillStyle="rgba(247,240,220,0.9)";
    for (const off of [-r*0.4,-r*0.2,r*0.2,r*0.4]) {
      ctx.beginPath(); ctx.arc(cx+off,cy,2.5,0,TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(cx,cy+off,2.5,0,TAU); ctx.fill();
    }
    ctx.strokeStyle="rgba(247,240,220,0.6)"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.arc(cx,cy,r,0,TAU); ctx.stroke();
    ctx.fillStyle="rgba(247,240,220,0.9)";
    ctx.font="bold 13px Verdana";
    ctx.textAlign="center";
    ctx.fillText(optic.altZoom?`${zoom}x  Z TO TOGGLE`:`${zoom}x`,cx,cy+r+22);
  } else if (zoom>1) {
    // Red dot sight - small circle
    ctx.strokeStyle="rgba(240,70,58,0.95)"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.arc(cx,cy,3,0,TAU); ctx.stroke();
    ctx.fillStyle="rgba(240,70,58,0.95)";
    ctx.beginPath(); ctx.arc(cx,cy,1.5,0,TAU); ctx.fill();
  } else {
    const rear=h*0.08, front=h*0.12;
    const grad=ctx.createRadialGradient(cx,cy,h*0.2,cx,cy,h*0.6);
    grad.addColorStop(0,"transparent"); grad.addColorStop(1,"rgba(0,0,0,0.5)");
    ctx.fillStyle=grad; ctx.fillRect(0,0,w,h);
    const rw=22, rh=28, ry=cy+rear;
    ctx.fillStyle="#1a1c17";
    ctx.fillRect(cx-rw-4,ry,rw,rh);
    ctx.fillRect(cx+4,ry,rw,rh);
    ctx.fillStyle="#2c3028";
    ctx.fillRect(cx-4,cy+front,8,26);
    ctx.fillStyle="rgba(240,200,75,0.9)";
    ctx.beginPath(); ctx.arc(cx,cy+front+5,3.5,0,TAU); ctx.fill();
  }
  ctx.restore();
}

function drawCrosshair() {
  if(state.adsProgress>0.85)return;
  const {x,y}=getAimScreen();
  const gs=state.gunStats||DEFAULT_GUN;
  const spread=state.ads?4:8+(1-gs.hipfire)*28;
  const gap=spread+state.recoil*9;
  const length=Math.max(6,18-spread*0.4);
  const alpha=1-state.adsProgress*0.7;
  ctx.save(); ctx.globalAlpha=alpha;
  ctx.strokeStyle=state.hitFlash>0?"#f0c84b":"rgba(247,240,220,0.88)";
  ctx.lineWidth=2;
  ctx.beginPath();
  ctx.moveTo(x-gap-length,y); ctx.lineTo(x-gap,y);
  ctx.moveTo(x+gap,y); ctx.lineTo(x+gap+length,y);
  ctx.moveTo(x,y-gap-length); ctx.lineTo(x,y-gap);
  ctx.moveTo(x,y+gap); ctx.lineTo(x,y+gap+length);
  ctx.stroke(); ctx.restore();
}

function drawHipfireGunOverlay() {
  if (state.adsProgress>0.35) return;
  drawGun();
}

function drawMinimap() {
  const shortSide=Math.min(canvas.width, canvas.height);
  const cell=shortSide<430?3.2:shortSide<650?4.5:7;
  const pad=shortSide<650?8:14;
  const mark=Math.max(1.5, cell*0.42);
  const mx=pad, my=canvas.height-map.length*cell-pad;
  ctx.save(); ctx.globalAlpha=0.78;
  ctx.fillStyle="rgba(7,10,9,0.72)";
  ctx.fillRect(mx-6,my-6,map[0].length*cell+12,map.length*cell+12);
  for(let r=0;r<map.length;r++){
    for(let c=0;c<map[r].length;c++){
      ctx.fillStyle=map[r][c]==="#"?"#c8c2ad":"#233a31";
      ctx.fillRect(mx+c*cell,my+r*cell,cell-1,cell-1);
    }
  }
  // Chests and extract points for Zero Hour modes
  if(state.mode==="zerohour" || state.mode==="zhmulti"){
    for(const chest of state.chests){
      // Show all chests on minimap, dimmed if opened and empty
      const isEmpty = chest.opened && (!chest.lootItems || chest.lootItems.length === 0) && (!chest.items || chest.items.length === 0);
      ctx.fillStyle = isEmpty ? "#666666" : "#f0c84b";
      ctx.fillRect(mx+chest.x*cell-mark,my+chest.y*cell-mark,mark*2,mark*2);
    }
    
    // Draw item chests (shared dropped items) in zhmulti mode
    if(state.mode==="zhmulti"){
      for(const chest of state.droppedItemChests){
        ctx.fillStyle="#3ea8d8";
        ctx.fillRect(mx+chest.x*cell-mark,my+chest.y*cell-mark,mark*2,mark*2);
      }
    }
    
    // Draw my extract point (green)
    if(state.extractPoint){
      ctx.fillStyle="#3ecf5a";
      ctx.fillRect(mx+state.extractPoint.x*cell-mark*1.4,my+state.extractPoint.y*cell-mark*1.4,mark*2.8,mark*2.8);
    }
    
    // Draw other players' extract points in zhmulti (orange)
    if(state.mode==="zhmulti"){
      for(const playerId in state.playerRoutes){
        if(playerId !== state.playerId && state.playerRoutes[playerId]?.extract){
          const ep = state.playerRoutes[playerId].extract;
          ctx.fillStyle="#ff8c00";
          ctx.fillRect(mx+ep.x*cell-mark*1.2,my+ep.y*cell-mark*1.2,mark*2.4,mark*2.4);
        }
      }
      
      // Draw other players (red dots)
      for(const playerId in state.players){
        if(playerId !== state.playerId){
          const p = state.players[playerId];
          if(p && p.alive){
            ctx.fillStyle="#d74632";
            ctx.fillRect(mx+p.x*cell-mark,my+p.y*cell-mark,mark*2,mark*2);
          }
        }
      }
    }
    
    // Draw my position (yellow)
    ctx.fillStyle="#f0c84b"; ctx.beginPath();
    ctx.arc(mx+state.x*cell,my+state.y*cell,mark*1.5,0,TAU); ctx.fill();
    ctx.restore();
    return;
  }
  for(const t of getShootableTargets()){
    if(!t.alive)continue;
    ctx.fillStyle="#d74632"; ctx.fillRect(mx+t.x*cell-mark,my+t.y*cell-mark,mark*2,mark*2);
  }
  ctx.fillStyle="#f0c84b"; ctx.beginPath();
  ctx.arc(mx+state.x*cell,my+state.y*cell,mark*1.5,0,TAU); ctx.fill();
  ctx.restore();
}
// ─────────────────────────────────────────────
//  ABILITY VISUAL EFFECTS
// ─────────────────────────────────────────────
function drawAbilityEffects() {
  // Draw smoke grenades
  for (const smoke of state.smokeGrenades) {
    if (!smoke.deployed) {
      // Draw grenade projectile
      const dx = smoke.x - state.x;
      const dy = smoke.y - state.y;
      const dist = Math.hypot(dx, dy);
      if (dist > MAX_DEPTH || dist < 0.2) continue;
      
      const angle = normalizeAngle(Math.atan2(dy, dx) - state.angle);
      const fov = effectiveFov();
      if (Math.abs(angle) > fov / 1.5) continue;
      
      const ray = castRay(Math.atan2(dy, dx));
      if (ray.depth < dist - 0.2) continue;
      
      const sx = canvas.width / 2 + (angle / (fov / 2)) * (canvas.width / 2);
      const size = clamp(60 / dist, 8, 40);
      const sy = canvas.height / 2 + viewYOffset() - (smoke.z / dist) * canvas.height * 0.3;
      
      ctx.save();
      ctx.translate(sx, sy);
      ctx.fillStyle = "#4a4a4a";
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.15, 0, TAU);
      ctx.fill();
      ctx.restore();
    } else {
      // Draw smoke cloud - EXTREMELY THICK, BIG, AND LOW
      const dx = smoke.x - state.x;
      const dy = smoke.y - state.y;
      const dist = Math.hypot(dx, dy);
      if (dist > MAX_DEPTH) continue;
      
      const angle = normalizeAngle(Math.atan2(dy, dx) - state.angle);
      const fov = effectiveFov();
      if (Math.abs(angle) > fov / 1.5) continue;
      
      const sx = canvas.width / 2 + (angle / (fov / 2)) * (canvas.width / 2);
      // MUCH BIGGER - increased multiplier from 50 to 80
      const base = clamp((smoke.radius * 80) / Math.max(dist, 0.5), 150, 1200);
      // Move smoke EVEN LOWER - increased from 0.35 to 0.5 (half screen down)
      const sy = canvas.height / 2 + viewYOffset() + canvas.height * 0.5;
      
      ctx.save();
      ctx.translate(sx, sy);
      
      // MANY MORE PUFFS - increased from 50 to 80
      const puffCount = Math.min(Math.floor(smoke.radius / 2), 80);
      for (let i = 0; i < puffCount; i++) {
        const t = smoke.phase * 1.2 + i * 0.6;
        const px = Math.sin(t * 1.5 + i) * base * 0.5;
        const py = -base * 0.03 - Math.abs(Math.sin(t * 1.8 + i * 0.7)) * base * 0.15;
        // BIGGER PUFFS - increased from 0.15 to 0.2
        const r = base * 0.2 + Math.sin(t + i) * base * 0.1;
        // EVEN THICKER - increased alpha from 0.6 to 0.8
        const alpha = 0.8 + Math.sin(t * 1.1) * 0.1;
        ctx.fillStyle = `rgba(140,140,140,${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }
  }
  
  // Draw kunai projectile
  if (state.kunaiProjectile) {
    const kunai = state.kunaiProjectile;
    const dx = kunai.x - state.x;
    const dy = kunai.y - state.y;
    const dist = Math.hypot(dx, dy);
    if (dist < MAX_DEPTH && dist > 0.2) {
      const angle = normalizeAngle(Math.atan2(dy, dx) - state.angle);
      const fov = effectiveFov();
      if (Math.abs(angle) < fov / 1.5) {
        const ray = castRay(Math.atan2(dy, dx));
        if (ray.depth > dist - 0.2) {
          const sx = canvas.width / 2 + (angle / (fov / 2)) * (canvas.width / 2);
          const size = clamp(50 / dist, 6, 30);
          const sy = canvas.height / 2 + viewYOffset() - (kunai.z / dist) * canvas.height * 0.3;
          
          ctx.save();
          ctx.translate(sx, sy);
          ctx.rotate(kunai.angle - state.angle);
          ctx.fillStyle = "#3ea8d8";
          ctx.beginPath();
          ctx.moveTo(size * 0.4, 0);
          ctx.lineTo(-size * 0.2, -size * 0.15);
          ctx.lineTo(-size * 0.2, size * 0.15);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "#f0c84b";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }
  
  // Draw dove
  if (state.doveEntity) {
    const dove = state.doveEntity;
    const dx = dove.x - state.x;
    const dy = dove.y - state.y;
    const dist = Math.hypot(dx, dy);
    if (dist < MAX_DEPTH && dist > 0.2) {
      const angle = normalizeAngle(Math.atan2(dy, dx) - state.angle);
      const fov = effectiveFov();
      if (Math.abs(angle) < fov / 1.5) {
        const ray = castRay(Math.atan2(dy, dx));
        if (ray.depth > dist - 0.3) {
          const sx = canvas.width / 2 + (angle / (fov / 2)) * (canvas.width / 2);
          const size = clamp(70 / dist, 10, 50);
          const sy = canvas.height / 2 + viewYOffset() - (dove.z / dist) * canvas.height * 0.3;
          
          ctx.save();
          ctx.translate(sx, sy);
          
          // Dove body
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.ellipse(0, 0, size * 0.2, size * 0.15, 0, 0, TAU);
          ctx.fill();
          
          // Wings (flapping animation)
          const wingAngle = Math.sin(dove.phase) * 0.6;
          ctx.fillStyle = "#f0f0f0";
          ctx.beginPath();
          ctx.ellipse(-size * 0.15, 0, size * 0.25, size * 0.1, wingAngle, 0, TAU);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(size * 0.15, 0, size * 0.25, size * 0.1, -wingAngle, 0, TAU);
          ctx.fill();
          
          // Smoke trail
          ctx.fillStyle = "rgba(230,240,245,0.3)";
          ctx.beginPath();
          ctx.arc(0, size * 0.2, size * 0.3, 0, TAU);
          ctx.fill();
          
          ctx.restore();
        }
      }
    }
  }
  
  // Draw particles
  if (state.particles) {
    for (const p of state.particles) {
      const dx = p.x - state.x;
      const dy = p.y - state.y;
      const dist = Math.hypot(dx, dy);
      if (dist > MAX_DEPTH || dist < 0.1) continue;
      
      const angle = normalizeAngle(Math.atan2(dy, dx) - state.angle);
      const fov = effectiveFov();
      if (Math.abs(angle) > fov / 1.5) continue;
      
      const sx = canvas.width / 2 + (angle / (fov / 2)) * (canvas.width / 2);
      const size = clamp((p.size * 100) / dist, 2, 20);
      const sy = canvas.height / 2 + viewYOffset() - (p.z / dist) * canvas.height * 0.3;
      
      const alpha = (p.life / p.maxLife) * 0.8;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, TAU);
      ctx.fill();
      ctx.restore();
    }
  }
}

function drawAbilityUI() {
  if (!state.playerClass || !state.running) return;
  
  const classData = CHARACTER_CLASSES[state.playerClass];
  if (!classData) return;
  
  const w = canvas.width;
  const h = canvas.height;
  const uiX = w - 220;
  const uiY = h - 120;
  
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(uiX, uiY, 200, 100);
  
  // Class name
  ctx.fillStyle = "#f0c84b";
  ctx.font = "bold 14px Verdana";
  ctx.textAlign = "left";
  ctx.fillText(currentLanguage === "zh" ? classData.nameZh : classData.name, uiX + 10, uiY + 20);
  
  // Ability 1
  const cd1 = state.ability1Cooldown;
  const ready1 = cd1 <= 0;
  ctx.fillStyle = ready1 ? "#3ecf5a" : "#888";
  ctx.fillRect(uiX + 10, uiY + 30, 85, 30);
  ctx.fillStyle = "#000";
  ctx.font = "bold 11px Verdana";
  ctx.textAlign = "center";
  const ability1Name = currentLanguage === "zh" ? classData.ability1.nameZh : classData.ability1.name;
  ctx.fillText(ability1Name, uiX + 52, uiY + 45);
  ctx.fillText(ready1 ? "1" : Math.ceil(cd1) + "s", uiX + 52, uiY + 57);
  
  // Ability 2
  const cd2 = state.ability2Cooldown;
  const ready2 = cd2 <= 0;
  ctx.fillStyle = ready2 ? "#3ea8d8" : "#888";
  ctx.fillRect(uiX + 105, uiY + 30, 85, 30);
  ctx.fillStyle = "#000";
  const ability2Name = currentLanguage === "zh" ? classData.ability2.nameZh : classData.ability2.name;
  ctx.fillText(ability2Name, uiX + 147, uiY + 45);
  ctx.fillText(ready2 ? "2" : Math.ceil(cd2) + "s", uiX + 147, uiY + 57);
  
  // Passive indicator
  ctx.fillStyle = "#f0c84b";
  ctx.font = "10px Verdana";
  ctx.textAlign = "left";
  if (state.playerClass === "assault") {
    ctx.fillText("⚡ +20% Speed | +50% Melee", uiX + 10, uiY + 75);
  } else if (state.playerClass === "medic") {
    ctx.fillText("❤ +50% Medical Effectiveness", uiX + 10, uiY + 75);
  }
  
  // Active effects
  if (state.classEffects.doveSpeedBoost) {
    ctx.fillStyle = "#3ecf5a";
    ctx.fillText("🕊 Dove Speed Boost Active", uiX + 10, uiY + 90);
  }
  
  ctx.restore();
}


function draw() {
  if (!canvas.width || !canvas.height) resizeCanvas();
  ctx.setTransform(1,0,0,1,0,0);
  ctx.globalAlpha=1;
  ctx.globalCompositeOperation="source-over";
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#2a3d32";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  try {
    drawWorld();
    drawChests();
    drawDroppedItems();
    drawExtractPoint();
    drawTargets();
    drawAbilityEffects();
    drawDamageFlash();
    drawADS();
    if (state.adsProgress>0.35) drawGun();
    drawKnife();
    drawCrosshair();
    drawHipfireGunOverlay();
    drawMinimap();
    drawAbilityUI();
  } catch (err) {
    console.error("Render error", err);
  }
}

// ─────────────────────────────────────────────
//  MAIN LOOP
// ─────────────────────────────────────────────
function tick(time) {
  const dt=Math.min(0.033,(time-state.lastTime)/1000||0);
  state.lastTime=time;
  if(state.running) {
    movePlayer(dt); updateJump(dt);
    updateExtract(dt);
    moveTargets(dt); updateEnemyShots(dt);
    updateCombatTimers(dt);
    updateMedUse(dt);
    updateAbilities(dt);
    if (!isInGameUiOpen()) {
      updateAutoFire(dt);
      updateAds(dt);
    }
    state.networkTimer=Math.max(0,state.networkTimer-dt);
    sendNetworkUpdate(); sendPing(dt);
    if(state.mode==="single") state.remaining-=dt;
    state.recoil=Math.max(0,state.recoil-dt*4.5);
    state.recoilAngle*=Math.pow(0.85,dt*60);
    state.hitFlash=Math.max(0,state.hitFlash-dt);
    state.damageFlash=Math.max(0,state.damageFlash-dt);
    if(state.reloadTimer>0){
      state.reloadTimer-=dt;
      if(state.reloadTimer<=0){
        if(state.mode!=="zerohour") state.ammo=state.maxAmmo;
        updateHud();
      }
    }
    if(state.mode==="single"&&state.remaining<=0) endGame("Time up");
    updateHud();
  }
  draw();
  requestAnimationFrame(tick);
}

// ─────────────────────────────────────────────
//  INPUT
// ─────────────────────────────────────────────
function resetJoystick() {
  if(!joystickKnob)return;
  state.touchMoveX=0; state.touchMoveY=0;
  joystickKnob.style.transform="translate(0px,0px)";
}
function updateJoystick(touch) {
  const rect=joystick.getBoundingClientRect();
  const cx=rect.left+rect.width/2, cy=rect.top+rect.height/2, max=rect.width*0.34;
  const dx=touch.clientX-cx, dy=touch.clientY-cy;
  const dist=Math.hypot(dx,dy)||1;
  const lim=Math.min(dist,max);
  const kx=(dx/dist)*lim, ky=(dy/dist)*lim;
  state.touchMoveX=kx/max; state.touchMoveY=ky/max;
  joystickKnob.style.transform=`translate(${kx}px,${ky}px)`;
}

// Buttons
startButton.addEventListener("click",startGame);
multiButton.addEventListener("click",startMultiplayer);
if(zhStartButton) zhStartButton.addEventListener("click",startZeroHour);
if(zhMultiButton) zhMultiButton.addEventListener("click",startZeroHourMultiplayer);

// Class selection
let pendingGameMode = null;
selectAssault?.addEventListener("click", () => {
  state.playerClass = "assault";
  if (classModal) classModal.hidden = true;
  if (pendingGameMode === "zerohour") actuallyStartZeroHour();
  else if (pendingGameMode === "zhmulti") actuallyStartZeroHourMultiplayer();
  pendingGameMode = null;
});
selectMedic?.addEventListener("click", () => {
  state.playerClass = "medic";
  if (classModal) classModal.hidden = true;
  if (pendingGameMode === "zerohour") actuallyStartZeroHour();
  else if (pendingGameMode === "zhmulti") actuallyStartZeroHourMultiplayer();
  pendingGameMode = null;
});
quitButton.addEventListener("click",quitGame);
battleFieldTab.addEventListener("click",()=>setModePanel("battle"));
zeroHourTab.addEventListener("click",()=>setModePanel("zero"));
openLoginModal.addEventListener("click",()=>{ loginModal.hidden=false; });
languageButton?.addEventListener("click", toggleLanguage);
closeLoginModal.addEventListener("click",()=>{ loginModal.hidden=true; });
loginButton.addEventListener("click",accountLogin);
createAccountButton.addEventListener("click",accountCreate);
logoutButton.addEventListener("click",accountLogout);
function openShop() {
  try { renderZeroHour(); } catch (err) { console.error("Shop render failed", err); }
  if (!shopModal) return;
  shopModal.hidden=false;
  shopModal.removeAttribute("hidden");
}
function closeShop() {
  if (!shopModal) return;
  shopModal.hidden=true;
}
openShopButton?.addEventListener("click", openShop);
closeShopModal?.addEventListener("click", closeShop);
openSellButton?.addEventListener("click", openSell);
closeSellModalBtn?.addEventListener("click", closeSell);
openStorageButton?.addEventListener("click", openStorage);
redeemCodeButton?.addEventListener("click", redeemCode);
closeStorageModalBtn?.addEventListener("click", closeStorage);
openSetoutButton?.addEventListener("click", openSetout);
closeSetoutModalBtn?.addEventListener("click", closeSetout);
closeGearPickerModalBtn?.addEventListener("click", closeGearPicker);
setoutGearSlots.forEach(slot => slot.addEventListener("click", () => openGearPicker(slot.dataset.category)));
shopCategoryButtons.forEach(btn => btn.addEventListener("click", () => {
  activeShopCategory = btn.dataset.shopCategory || "armors";
  renderZeroHour();
}));
// Export Account
exportAccountButton?.addEventListener("click", async () => {
  const acc = getAccount();
  if (!acc || !acc.userId) {
    showMessage("Please login first");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/export`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: acc.userId })
    });

    const result = await response.json();

    if (result.success) {
      // Copy code to clipboard
      navigator.clipboard.writeText(result.code).then(() => {
        showMessage("Export code copied to clipboard!");
        // Also show in alert for backup
        alert(`Export Code (saved to clipboard):\n\n${result.code}\n\nSave this code to import your account later!`);
      }).catch(() => {
        // Fallback if clipboard fails
        prompt("Export Code (copy this):", result.code);
        showMessage("Export code generated!");
      });
    } else {
      showMessage(result.error || "Export failed");
    }
  } catch (error) {
    showMessage("Export failed: " + error.message);
  }
});

// Import Account
importAccountButton?.addEventListener("click", async () => {
  const code = prompt("Enter your import code:");
  if (!code) return;

  const password = prompt("Set a NEW password for this account (6+ characters):");
  if (!password || password.length < 6) {
    showMessage("Password must be 6+ characters");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, password })
    });

    const result = await response.json();

    if (result.success) {
      // Save imported account
      localStorage.setItem("ilovegames-account", JSON.stringify(result.account));
      localStorage.setItem("ilovegames-userId", result.userId);
      showMessage(`Account "${result.username}" imported successfully!`);
      updateAccountDisplay();
      if (loginModal) loginModal.hidden = true;
    } else {
      showMessage(result.error || "Import failed");
    }
  } catch (error) {
    showMessage("Import failed: " + error.message);
  }
});
closeChestModalBtn?.addEventListener("click", closeChestUi);

// Mouse
canvas.addEventListener("mousedown",e=>{
  if (isInGameUiOpen()) return;
  if(e.button===2){setAds(!state.ads);return;}
  if(!state.running)return;
  if(document.pointerLockElement!==canvas){canvas.requestPointerLock?.();return;}
  state.isFiring=true; shoot();
});
canvas.addEventListener("contextmenu",e=>e.preventDefault());
document.addEventListener("mouseup",()=>{ state.isFiring=false; });
canvas.addEventListener("mouseleave",()=>{ state.isFiring=false; });
document.addEventListener("mousemove",e=>{
  if(document.pointerLockElement===canvas&&state.running&&!isInGameUiOpen()){
    state.angle=normalizeAngle(state.angle+e.movementX*0.0022);
    state.pitch=clamp(state.pitch+e.movementY*0.0024,-1.2,1.2);
  }
});

window.addEventListener("blur", () => state.keys.clear());

// Keyboard
document.addEventListener("keydown",e=>{
  if (e.key === "Tab" && (state.mode === "zerohour" || state.mode === "zhmulti") && state.running) {
    e.preventDefault();
    toggleBackpack();
    return;
  }
  if (isInGameUiOpen()) {
    const k = e.key.toLowerCase();
    if (k === "tab" || k === "f") {
      e.preventDefault();
      if (state.uiOpen === "chest") closeChestUi();
      else closeBackpack();
    }
    return;
  }
  trackKeyDown(e);
  const k=e.key.toLowerCase();
  if(k===" "){e.preventDefault();jump();}
  if(k==="r") reload();
  if(k==="p" && state.mode !== "zerohour") quitGame();
  if(k==="z") {
    const optic=getActiveOpticMeta();
    if (optic.altZoom) {
      state.opticAltZoom=!state.opticAltZoom;
      showMessage(`${state.opticAltZoom ? optic.altZoom : optic.zoom}x optic`);
    }
  }
  if(k==="q"||k==="e") setAds(!state.ads);
  if(k==="1") useAbility1();
  if(k==="2") useAbility2();
});
document.addEventListener("keyup",e=>{
  trackKeyUp(e);
});

// Joystick
joystick.addEventListener("touchstart",e=>{e.preventDefault();updateJoystick(e.changedTouches[0]);});
joystick.addEventListener("touchmove",e=>{e.preventDefault();updateJoystick(e.changedTouches[0]);});
joystick.addEventListener("touchend",e=>{e.preventDefault();resetJoystick();});
joystick.addEventListener("touchcancel",e=>{e.preventDefault();resetJoystick();});

// Touch buttons
touchJump.addEventListener("touchstart",e=>{e.preventDefault();jump();});
touchReload.addEventListener("touchstart",e=>{e.preventDefault();if(!state.running)return;reload();});
touchAds.addEventListener("touchstart",e=>{e.preventDefault();setAds(!state.ads);});
touchOpen?.addEventListener("touchstart",e=>{
  e.preventDefault();
  if (!state.running) return;
  tryOpenNearbyChest();
});
touchShoot.addEventListener("touchstart",e=>{
  e.preventDefault(); if(!state.running)return;
  state.isFiring=true; shoot();
});
touchShoot.addEventListener("touchend",e=>{e.preventDefault();state.isFiring=false;state.shootAimTouchId=null;});
touchShoot.addEventListener("touchcancel",e=>{e.preventDefault();state.isFiring=false;state.shootAimTouchId=null;});

// Canvas touch aiming
canvas.addEventListener("touchstart",e=>{
  if(!state.running)return;
  for(const t of e.changedTouches){
    if(state.isFiring&&state.shootAimTouchId===null&&t.identifier!==state.aimTouchId){
      state.shootAimTouchId=t.identifier; state.shootLastAimX=t.clientX; state.shootLastAimY=t.clientY;
    } else if(state.aimTouchId===null&&t.identifier!==state.shootAimTouchId){
      state.aimTouchId=t.identifier; state.lastAimX=t.clientX; state.lastAimY=t.clientY;
    }
  }
});
canvas.addEventListener("touchmove",e=>{
  if(!state.running)return;
  for(const t of e.changedTouches){
    if(t.identifier===state.aimTouchId){
      e.preventDefault();
      state.angle=normalizeAngle(state.angle+(t.clientX-state.lastAimX)*0.005);
      state.pitch=clamp(state.pitch+(t.clientY-state.lastAimY)*0.005,-1.2,1.2);
      state.lastAimX=t.clientX; state.lastAimY=t.clientY;
    } else if(t.identifier===state.shootAimTouchId){
      e.preventDefault();
      state.angle=normalizeAngle(state.angle+(t.clientX-state.shootLastAimX)*0.004);
      state.pitch=clamp(state.pitch+(t.clientY-state.shootLastAimY)*0.004,-1.2,1.2);
      state.shootLastAimX=t.clientX; state.shootLastAimY=t.clientY;
    }
  }
},{passive:false});
canvas.addEventListener("touchend",e=>{
  for(const t of e.changedTouches){
    if(t.identifier===state.aimTouchId) state.aimTouchId=null;
    if(t.identifier===state.shootAimTouchId) state.shootAimTouchId=null;
  }
});
canvas.addEventListener("touchcancel",e=>{
  for(const t of e.changedTouches){
    if(t.identifier===state.aimTouchId) state.aimTouchId=null;
    if(t.identifier===state.shootAimTouchId) state.shootAimTouchId=null;
  }
});

window.addEventListener("resize", resizeCanvas);

function setModePanel(mode) {
  const isZero=mode==="zero";
  battleFieldPanel.hidden=isZero; zeroHourPanel.hidden=!isZero;
  battleFieldTab.classList.toggle("secondary",isZero);
  zeroHourTab.classList.toggle("secondary",!isZero);
  renderZeroHour();
}

// ─────────────────────────────────────────────
//  BOOT
// ─────────────────────────────────────────────
currentUser=localStorage.getItem(CURRENT_USER_KEY);
renderZeroHour();
setModePanel("zero");
applyLanguage();
window.dispatchEvent(new Event("resize"));
draw();
requestAnimationFrame(tick);
