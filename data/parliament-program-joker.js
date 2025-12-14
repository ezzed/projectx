// Parliament Joker (SVG) — FULL rewrite with DETAILS exactly like the reference file
// - Details button: lazy render (open => render tables), close => hide
// - Slider input => fast update only (no heavy tables)
// - Slider change => heavy tables only if details panel open
// - National results table + Saint-Laguë per governorate (same UI behavior as reference)

import { parliamentGovernoratesData } from "./parliamentData.js";

/* ===============================
   Constants
================================ */
const PARLIAMENT_TOTAL_SEATS = 329;
const PARLIAMENT_QUOTA_SEATS = 9;
const PARLIAMENT_MAJORITY = 165;
const PARLIAMENT_THIRD = 110;

/* ===============================
   Visual config
================================ */
const CFG = {
  dimOpacity: 0.12,
  onOpacity: 1.0,

  govRingWidth: 0.6,
  govRingOpacity: 0.9,

  // NEW seats appearance
  takenFill: "#00E5FF",
  takenGlow: "drop-shadow(0 0 10px rgba(0,229,255,0.55))",

  baselineStrokeWidth: 0.6,

  // Fallback to take seats from same party other governorates (excluding __extra__)
  enableFallbackWithinSameParty: true,

  // Logging
  logEveryInput: false,
};

/* ===============================
   Helpers
================================ */
function safeNum(x, fallback = 0) {
  const n = Number(x);
  return Number.isFinite(n) ? n : fallback;
}

function toEn(n) {
  return Number(n || 0).toLocaleString("en-US");
}

function canonicalPartyId(p) {
  return String(p?.svgId || p?.svgTitle || p?.name || p?.id || "").trim();
}

function hashColor(str) {
  const s = String(str || "");
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const hue = (h >>> 0) % 360;
  return `hsl(${hue} 85% 55%)`;
}

function parseCssColorToRgb(input) {
  const s = String(input || "").trim();
  if (!s) return null;

  if (s[0] === "#") {
    let hex = s.slice(1);
    if (hex.length === 3) hex = hex.split("").map((ch) => ch + ch).join("");
    if (hex.length !== 6) return null;
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }

  const m = s.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*[\d.]+)?\s*\)$/i
  );
  if (m) return { r: +m[1], g: +m[2], b: +m[3] };
  return null;
}

function getPartyBaseFill(node) {
  const styleAttr = node.getAttribute("style") || "";
  const m = styleAttr.match(/fill\s*:\s*([^;]+)/i);
  if (m && parseCssColorToRgb(m[1].trim())) return m[1].trim();

  const fillAttr = node.getAttribute("fill");
  if (fillAttr) return fillAttr;

  const c = node.querySelector("circle");
  if (c) {
    const cStyle = c.getAttribute("style") || "";
    const cm = cStyle.match(/fill\s*:\s*([^;]+)/i);
    if (cm) return cm[1].trim();
    const cFill = c.getAttribute("fill");
    if (cFill) return cFill;
  }

  return "#bdbdbd";
}

function findPartyNode(svgDoc, partyKey) {
  const byId = partyKey ? svgDoc.getElementById(partyKey) : null;
  if (byId) return byId;

  const wanted = String(partyKey || "").trim();
  if (!wanted) return null;

  const titles = svgDoc.querySelectorAll("g > title");
  const hit = Array.from(titles).find((t) => (t.textContent || "").trim() === wanted);
  return hit?.parentElement || null;
}

/* ===============================
   Saint-Laguë (reference-like)
================================ */
function buildSaintLagueDivisors(totalSeats) {
  if (!Number.isFinite(totalSeats) || totalSeats <= 0) return [];
  const divisors = [1.7];
  for (let i = 1; i < totalSeats; i += 1) divisors.push(1 + 2 * i); // 3,5,7...
  return divisors;
}

// parties: [{ id, name, votes, isNational }]
function allocateSeatsSaintLague(parties, totalSeats) {
  const divisors = buildSaintLagueDivisors(totalSeats);

  if (!divisors.length || !Array.isArray(parties) || !parties.length) {
    return {
      divisors,
      winnersByParty: new Map(),
      seatCounts: new Map(),
      maxDivisorIndexUsed: -1,
    };
  }

  const quotaList = [];

  parties.forEach((party) => {
    const partyId = party.id;
    const votes = Math.max(party.votes || 0, 0);

    divisors.forEach((divisor, divisorIndex) => {
      quotaList.push({
        partyId,
        divisorIndex,
        quotient: votes / divisor,
      });
    });
  });

  quotaList.sort((a, b) => b.quotient - a.quotient);

  const winnersByParty = new Map();
  const seatCounts = new Map();

  const seatsToAllocate = Math.min(Math.max(totalSeats || 0, 0), quotaList.length);

  let maxDivisorIndexUsed = -1;

  for (let i = 0; i < seatsToAllocate; i += 1) {
    const { partyId, divisorIndex } = quotaList[i];

    seatCounts.set(partyId, (seatCounts.get(partyId) || 0) + 1);

    if (!winnersByParty.has(partyId)) winnersByParty.set(partyId, new Set());
    winnersByParty.get(partyId).add(divisorIndex);

    if (divisorIndex > maxDivisorIndexUsed) maxDivisorIndexUsed = divisorIndex;
  }

  return { divisors, winnersByParty, seatCounts, maxDivisorIndexUsed };
}

/* ===============================
   Tables (same behavior/UI style as reference)
================================ */
function renderSaintLagueDetailTable(advancedData, container, govName, mainSlider) {
  if (!advancedData || !container) return;

  const { parties, allocation } = advancedData;
  const { divisors, winnersByParty, seatCounts, maxDivisorIndexUsed } = allocation || {};

  if (!Array.isArray(parties) || !parties.length || !Array.isArray(divisors) || !divisors.length) {
    return;
  }

  const effectiveDivisors =
    Number.isInteger(maxDivisorIndexUsed) && maxDivisorIndexUsed >= 0
      ? divisors.slice(0, maxDivisorIndexUsed + 1)
      : divisors.slice();

  const wrapper = document.createElement("div");
  wrapper.className = "parl-saintlague-block";

  const title = document.createElement("h3");
  title.className = "gov-program-title gov-program-title--small";
  title.textContent = `تفاصيل سانت لوغو – ${govName}`;
  wrapper.appendChild(title);

  // Inline slider template (optional)
  const tmpl = document.getElementById("parl-inline-slider-template");
  if (tmpl && mainSlider) {
    const clone = tmpl.content.cloneNode(true);
    const valueSpan = clone.querySelector(".parl-inline-slider-value");
    const inlineSlider = clone.querySelector(".parl-inline-slider-input");

    if (inlineSlider) {
      inlineSlider.min = mainSlider.min;
      inlineSlider.max = mainSlider.max;
      inlineSlider.step = mainSlider.step;

      const syncFromMain = () => {
        inlineSlider.value = mainSlider.value;
        if (valueSpan) valueSpan.textContent = `${mainSlider.value}٪`;
      };

      syncFromMain();
      mainSlider.addEventListener("input", syncFromMain);
      mainSlider.addEventListener("change", syncFromMain);

      inlineSlider.addEventListener("input", (e) => {
        mainSlider.value = e.target.value;
        mainSlider.dispatchEvent(new Event("input"));
      });

      inlineSlider.addEventListener("change", (e) => {
        mainSlider.value = e.target.value;
        mainSlider.dispatchEvent(new Event("change"));
      });
    }

    wrapper.appendChild(clone);
  }

  const table = document.createElement("table");
  table.className = "gov-advanced-table";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  const thSeats = document.createElement("th");
  thSeats.textContent = "عدد المقاعد";
  headRow.appendChild(thSeats);

  const thName = document.createElement("th");
  thName.textContent = "اسم القائمة";
  headRow.appendChild(thName);

  const thVotes = document.createElement("th");
  thVotes.textContent = "الأصوات الكلية";
  headRow.appendChild(thVotes);

  effectiveDivisors.forEach((divisor, idx) => {
    const th = document.createElement("th");
    th.textContent = idx === 0 ? "÷ 1.7" : `÷ ${divisor}`;
    headRow.appendChild(th);
  });

  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  parties.forEach((party) => {
    const row = document.createElement("tr");

    const partyId = party.id;
    const votes = Math.max(party.votes || 0, 0);
    const seatsForParty = seatCounts.get(partyId) || 0;
    const winnersSet = winnersByParty.get(partyId) || new Set();

    const tdSeats = document.createElement("td");
    tdSeats.textContent = seatsForParty;
    row.appendChild(tdSeats);

    const tdName = document.createElement("td");
    tdName.textContent = party.name || "";
    row.appendChild(tdName);

    const tdTotalVotes = document.createElement("td");
    tdTotalVotes.textContent = Math.round(votes).toLocaleString("en-US");
    row.appendChild(tdTotalVotes);

    effectiveDivisors.forEach((divisor, divisorIndex) => {
      const td = document.createElement("td");
      const quotient = divisor > 0 ? votes / divisor : 0;

      td.textContent = Math.round(quotient).toLocaleString("en-US");

      const wonSeatHere = winnersSet.has(divisorIndex);
      if (wonSeatHere) {
        td.classList.add(party.isOurList ? "quota-cell--our-seat" : "quota-cell--other-seat");
      }

      row.appendChild(td);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  wrapper.appendChild(table);
  container.appendChild(wrapper);
}

// summary = { listsCount, sliderValue, rows, totals, govAdvancedList }
function renderParliamentResultsTable(summary, container, mainSlider) {
  if (!summary || !container) return;

  const { listsCount, sliderValue, rows, totals, govAdvancedList } = summary;
  container.innerHTML = "";

  const nationalWrapper = document.createElement("div");
  nationalWrapper.className = "parl-saintlague-block parl-saintlague-block--national";

  const title = document.createElement("p");
  title.className = "gov-small-note";
  title.textContent =
    `توزيع مقاعد مجلس النواب حسب المحافظات عند مشاركة ${sliderValue}% من المقاطعين، ` +
    `وبوجود ${listsCount} تجمّع/تجمّعات وطنية.`;
  nationalWrapper.appendChild(title);

  const table = document.createElement("table");
  table.className = "gov-advanced-table parl-advanced-table";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  const headers = ["المحافظة", "المقاعد العامة", "مقاعد الكوتا"];
  for (let i = 1; i <= listsCount; i += 1) headers.push(`تجمع وطني ${i}`);
  headers.push("مقاعد الأحزاب التقليدية");
  headers.push("مجموع المقاعد");

  headers.forEach((txt) => {
    const th = document.createElement("th");
    th.textContent = txt;
    headRow.appendChild(th);
  });

  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  rows.forEach((row) => {
    const tr = document.createElement("tr");

    const basicCols = [row.nameAr, row.generalSeats, row.quotaSeats];
    basicCols.forEach((val, idx) => {
      const td = document.createElement("td");
      td.textContent = idx === 0 ? String(val) : Number(val).toLocaleString("en-US");
      tr.appendChild(td);
    });

    for (let i = 1; i <= listsCount; i += 1) {
      const td = document.createElement("td");
      const seats = row.nationalSeats[i] || 0;
      td.textContent = seats.toLocaleString("en-US");
      if (seats > 0) td.classList.add("quota-cell--our-seat");
      tr.appendChild(td);
    }

    const tdTrad = document.createElement("td");
    tdTrad.textContent = row.traditionalSeats.toLocaleString("en-US");
    tr.appendChild(tdTrad);

    const tdTotal = document.createElement("td");
    tdTotal.textContent = row.totalSeats.toLocaleString("en-US");
    tr.appendChild(tdTotal);

    tbody.appendChild(tr);
  });

  const totalTr = document.createElement("tr");
  totalTr.classList.add("parl-table-total-row");

  const totalName = document.createElement("td");
  totalName.textContent = "المجموع الكلي";
  totalTr.appendChild(totalName);

  const tdGen = document.createElement("td");
  tdGen.textContent = totals.generalSeats.toLocaleString("en-US");
  totalTr.appendChild(tdGen);

  const tdQuota = document.createElement("td");
  tdQuota.textContent = totals.quotaSeats.toLocaleString("en-US");
  totalTr.appendChild(tdQuota);

  for (let i = 1; i <= listsCount; i += 1) {
    const td = document.createElement("td");
    const seats = totals.nationalSeats[i] || 0;
    td.textContent = seats.toLocaleString("en-US");
    if (seats > 0) td.classList.add("quota-cell--our-seat");
    totalTr.appendChild(td);
  }

  const tdTradTotal = document.createElement("td");
  tdTradTotal.textContent = totals.traditionalSeats.toLocaleString("en-US");
  totalTr.appendChild(tdTradTotal);

  const tdAll = document.createElement("td");
  tdAll.textContent = totals.totalSeats.toLocaleString("en-US");
  totalTr.appendChild(tdAll);

  tbody.appendChild(totalTr);
  table.appendChild(tbody);

  nationalWrapper.appendChild(table);
  container.appendChild(nationalWrapper);

  // Per-gov Saint-Laguë blocks
  if (Array.isArray(govAdvancedList) && govAdvancedList.length > 0) {
    const sep = document.createElement("hr");
    sep.className = "parl-advanced-separator";
    container.appendChild(sep);

    const subTitle = document.createElement("p");
    subTitle.className = "gov-small-note";
    subTitle.textContent =
      "تفاصيل احتساب المقاعد بنظام سانت لوغو المعدّل لكل محافظة (المقاعد العامة فقط).";
    container.appendChild(subTitle);

    govAdvancedList.forEach((item) => {
      renderSaintLagueDetailTable(item.advancedData, container, item.nameAr, mainSlider);
    });
  }
}

/* ===============================
   Baseline from DATA
================================ */
function buildBaselineFromData() {
  const baselineSeats = new Map(); // govId -> Map(partyId -> seats)
  const partyMeta = new Map(); // partyId -> { name }
  const govMeta = new Map(); // govId -> { label }

  for (const gov of parliamentGovernoratesData) {
    const govId = gov.id;
    const govLabel = gov.nameAr || gov.nameEn || govId;
    govMeta.set(govId, { label: govLabel });

    const gm = new Map();
    for (const p of gov.parties || []) {
      if (p.isQuota) continue;
      const pid = canonicalPartyId(p);
      if (!pid) continue;

      const seats = safeNum(p.seats, 0);
      if (seats > 0) gm.set(pid, seats);

      if (!partyMeta.has(pid)) partyMeta.set(pid, { name: p.name || pid });
    }
    baselineSeats.set(govId, gm);
  }

  return { baselineSeats, partyMeta, govMeta };
}

/* ===============================
   SVG Registry + binding
================================ */
function bindSvgAndBuildRegistry(svgDoc, partyMeta, govMeta) {
  const partyBlocks = new Map(); // partyId -> { blocks:[{govId,govLabel,seats}], totalSeats }

  for (const gov of parliamentGovernoratesData) {
    const govId = gov.id;
    const govLabel = govMeta.get(govId)?.label || gov.nameAr || gov.nameEn || govId;

    for (const p of gov.parties || []) {
      if (p.isQuota) continue;
      const pid = canonicalPartyId(p);
      if (!pid) continue;

      const seats = safeNum(p.seats, 0);
      if (seats <= 0) continue;

      if (!partyBlocks.has(pid)) partyBlocks.set(pid, { blocks: [], totalSeats: 0 });
      const entry = partyBlocks.get(pid);
      entry.blocks.push({ govId, govLabel, seats });
      entry.totalSeats += seats;

      if (!partyMeta.has(pid)) partyMeta.set(pid, { name: p.name || pid });
    }
  }

  const registry = {
    partyGovSeats: new Map(), // partyId -> Map(govId -> circle[])
    allSeats: [],
    missingGroups: [],
    shortage: [],
    ok: false,
    _integrity: null,
  };

  function pushSeat(partyId, govId, seatEl) {
    if (!registry.partyGovSeats.has(partyId)) registry.partyGovSeats.set(partyId, new Map());
    const govMap = registry.partyGovSeats.get(partyId);
    if (!govMap.has(govId)) govMap.set(govId, []);
    govMap.get(govId).push(seatEl);
    registry.allSeats.push(seatEl);
  }

  let boundPartyGroups = 0;

  for (const [partyId, info] of partyBlocks.entries()) {
    const node = findPartyNode(svgDoc, partyId);

    if (!node) {
      registry.missingGroups.push({
        partyId,
        partyName: partyMeta.get(partyId)?.name || partyId,
        expectedSeats: info.totalSeats,
      });
      continue;
    }

    const circles = Array.from(node.querySelectorAll("circle.seat, circle"));
    if (!circles.length) {
      registry.missingGroups.push({
        partyId,
        partyName: partyMeta.get(partyId)?.name || partyId,
        expectedSeats: info.totalSeats,
      });
      continue;
    }

    const baseFill = getPartyBaseFill(node);

    // reset circles
    for (const c of circles) {
      c.dataset.partyId = partyId;
      c.dataset.party = partyMeta.get(partyId)?.name || partyId;
      c.dataset.role = "traditional";
      c.dataset.taken = "0";
      c.dataset.govId = "";
      c.dataset.gov = "";
      c.dataset.baseFill = baseFill;

      c.style.fill = baseFill;
      c.style.opacity = String(CFG.dimOpacity);
      c.style.stroke = "none";
      c.style.strokeWidth = "0";
      c.style.filter = "none";
    }

    // Fair allocation across gov blocks
    const blocks = info.blocks.slice().sort((a, b) => b.seats - a.seats);
    const allocations = blocks.map((b) => ({ ...b, allocated: 0 }));

    let remaining = circles.length;

    for (const a of allocations) {
      if (remaining <= 0) break;
      if (a.seats > 0) {
        a.allocated = 1;
        remaining -= 1;
      }
    }

    while (remaining > 0) {
      let best = null;
      let bestNeed = -1;
      for (const a of allocations) {
        const need = a.seats - a.allocated;
        if (need > bestNeed) {
          bestNeed = need;
          best = a;
        }
      }
      if (!best || bestNeed <= 0) break;
      best.allocated += 1;
      remaining -= 1;
    }

    let cursor = 0;
    for (const a of allocations) {
      const want = a.seats;
      const give = a.allocated;

      if (give < want) {
        registry.shortage.push({
          partyId,
          partyName: partyMeta.get(partyId)?.name || partyId,
          govId: a.govId,
          govLabel: a.govLabel,
          expectedSeats: want,
          actualCircles: give,
        });
      }

      const govStroke = hashColor(a.govId);
      for (let i = 0; i < give; i++) {
        const c = circles[cursor++];
        if (!c) break;

        c.dataset.govId = a.govId;
        c.dataset.gov = a.govLabel;

        c.style.opacity = String(CFG.onOpacity);
        c.style.stroke = govStroke;
        c.style.strokeWidth = String(CFG.govRingWidth);
        c.style.strokeOpacity = String(CFG.govRingOpacity);

        pushSeat(partyId, a.govId, c);
      }
    }

    for (let i = cursor; i < circles.length; i++) {
      const c = circles[i];
      c.dataset.govId = "__extra__";
      c.dataset.gov = "EXTRA / Unallocated";
      c.style.opacity = String(CFG.dimOpacity);
      c.style.stroke = "rgba(255,255,255,0.35)";
      c.style.strokeWidth = "0.6";
      c.style.strokeOpacity = "0.6";
      pushSeat(partyId, "__extra__", c);
    }

    boundPartyGroups++;
  }

  const allSvgCircles = svgDoc.querySelectorAll("circle.seat, circle").length;

  registry.ok = registry.allSeats.length > 0;
  registry._integrity = {
    svgTotalCircles: allSvgCircles,
    boundCircles: registry.allSeats.length,
    unboundCircles: Math.max(0, allSvgCircles - registry.allSeats.length),
    boundPartyGroups,
  };

  return registry;
}

/* ===============================
   Paint helpers
================================ */
function resetAllSeatsToBaseline(registry) {
  for (const seat of registry.allSeats) {
    seat.dataset.taken = "0";
    seat.dataset.role = "traditional";

    seat.style.filter = "none";
    seat.style.fill = seat.dataset.baseFill || "#bdbdbd";

    const gid = seat.dataset.govId || "";

    if (gid === "__extra__") {
      seat.style.opacity = String(CFG.dimOpacity);
      seat.style.stroke = "rgba(255,255,255,0.35)";
      seat.style.strokeWidth = "0.6";
      seat.style.strokeOpacity = "0.6";
      continue;
    }

    if (gid) {
      seat.style.opacity = String(CFG.onOpacity);
      seat.style.stroke = hashColor(gid);
      seat.style.strokeWidth = String(CFG.baselineStrokeWidth);
      seat.style.strokeOpacity = String(CFG.govRingOpacity);
    } else {
      seat.style.opacity = String(CFG.dimOpacity);
      seat.style.stroke = "none";
      seat.style.strokeWidth = "0";
    }
  }
}

function markSeatTaken(seatEl) {
  seatEl.dataset.taken = "1";
  seatEl.dataset.role = "national";
  seatEl.style.fill = CFG.takenFill;
  seatEl.style.opacity = "1";
  seatEl.style.stroke = "none";
  seatEl.style.strokeWidth = "0";
  seatEl.style.filter = CFG.takenGlow;
}

function takeSeatsFromPartyGov(registry, partyId, govId, count) {
  if (count <= 0) return { picked: [], short: 0 };

  const govMap = registry.partyGovSeats.get(partyId);
  if (!govMap) return { picked: [], short: count };

  const picked = [];

  const takeFromList = (arr, need) => {
    const available = (arr || []).filter(
      (s) => s.dataset.taken !== "1" && s.dataset.role === "traditional"
    );
    for (let i = available.length - 1; i >= 0 && picked.length < need; i--) {
      picked.push(available[i]);
    }
  };

  // 1) same gov
  takeFromList(govMap.get(govId), count);

  // 2) fallback within same party, other govs (excluding __extra__)
  if (picked.length < count && CFG.enableFallbackWithinSameParty) {
    for (const [otherGovId, seatsOther] of govMap.entries()) {
      if (picked.length >= count) break;
      if (otherGovId === govId) continue;
      if (otherGovId === "__extra__") continue;
      takeFromList(seatsOther, count);
    }
  }

  // 3) from __extra__
  if (picked.length < count) takeFromList(govMap.get("__extra__"), count);

  const short = Math.max(0, count - picked.length);
  return { picked, short };
}




function forceTakeSeatsFromPartyAnywhere(registry, partyId, count) {
  if (!registry?.ok || count <= 0) return { picked: [], short: count };

  const govMap = registry.partyGovSeats.get(partyId);
  if (!govMap) return { picked: [], short: count };

  const picked = [];

  const takeFromList = (arr, need) => {
    const available = (arr || []).filter(
      (s) => s.dataset.taken !== "1" && s.dataset.role === "traditional"
    );
    for (let i = available.length - 1; i >= 0 && picked.length < need; i--) {
      picked.push(available[i]);
    }
  };

  // 1) from any governorate except __extra__
  for (const [govId, arr] of govMap.entries()) {
    if (picked.length >= count) break;
    if (govId === "__extra__") continue;
    takeFromList(arr, count);
  }

  // 2) then from __extra__
  if (picked.length < count) {
    takeFromList(govMap.get("__extra__"), count);
  }

  const short = Math.max(0, count - picked.length);
  return { picked, short };
}

function forceCoverNotPaintedFromSpecificParties(registry, deficit) {
  if (!registry?.ok || deficit <= 0) return { forced: 0, remaining: deficit, debug: [] };

  // بالضبط مثل ما طلبت (مرتين KDP)
  const FORCE_ORDER = [
    "0-Reconstruction-and-Development-Coalition",
    "1-Kurdistan-Democratic-Party",
    "1-Kurdistan-Democratic-Party",
    "41-Reserved",
  ];

  let forced = 0;
  const debug = [];

  for (const pid of FORCE_ORDER) {
    if (forced >= deficit) break;

    const { picked, short } = forceTakeSeatsFromPartyAnywhere(registry, pid, 1);
    if (picked.length) {
      markSeatTaken(picked[0]);
      forced += 1;
      debug.push({ partyId: pid, took: 1, short: 0 });
    } else {
      debug.push({ partyId: pid, took: 0, short: short || 1 });
    }
  }

  return { forced, remaining: Math.max(0, deficit - forced), debug };
}









/* ===============================
   Main
================================ */
function initParliamentProgramJoker() {
  const box = document.querySelector(".parl-program-box--joker");
  if (!box) return;

  const slider = box.querySelector("#parl-gov-slider");
  const sliderValueEl = box.querySelector(".gov-control-block .slider-value");
  const nationalListsSelect = box.querySelector(".national-lists-count");
  const noteEl = box.querySelector(".parl-dynamic-note");

  const mobileNewEl = box.querySelector(".parl-mobile-new-count");
  const mobileTradEl = box.querySelector(".parl-mobile-trad-count");
  const seatsTotalNumberEl = box.querySelector(".parl-seats-total-number");

  const detailsBtn = box.querySelector(".parl-advanced-toggle");
  const resultsContainer = box.querySelector(".parl-results-table-container");

  const svgObj = box.querySelector("#parliamentSvgObj");

  if (!slider || !nationalListsSelect || !svgObj) return;

  const { baselineSeats, partyMeta, govMeta } = buildBaselineFromData();

  let registry = null;
  let svgDoc = null;



// ===== FORCE cover notPainted from specific parties (your requested 4) =====







  // Cache like reference file
  let lastSummary = null;

  function recompute(updateAdvancedTables = false, logConsole = false) {
    const sliderVal = Number(slider.value) || 0;
    const listsCount = Number(nationalListsSelect.value) || 1;

    if (sliderValueEl) sliderValueEl.textContent = `${sliderVal}٪`;

    const participation = sliderVal / 100;

    // totals for tables
    const totalNationalSeatsByList = {};
    let totalTraditionalSeats = 0;
    let totalQuotaSeats = 0;
    let totalGeneralSeats = 0;
    let totalSeatsAll = 0;

    const rows = [];
    const govAdvancedList = [];

    // SVG painting diag
    let painted = 0;
    let targetNewSeats = 0;

    if (registry?.ok) resetAllSeatsToBaseline(registry);

    for (const gov of parliamentGovernoratesData) {
      const { id, nameAr, nameEn, totalSeats, generalSeats, quotaSeats, parties } = gov;

      const govId = id;
      const govName = nameAr || nameEn || govId;

      const seatsGeneral = Math.max(Number(generalSeats || totalSeats || 0), 0);
      const seatsQuota = Math.max(Number(quotaSeats || 0), 0);

      totalGeneralSeats += seatsGeneral;
      totalQuotaSeats += seatsQuota;
      totalSeatsAll += seatsGeneral + seatsQuota;

      const eligible = Math.max(Number(gov.eligible || 0), 0);
      const voted = Math.max(Number(gov.voted || 0), 0);
      const boycotters = Math.max(eligible - voted, 0);

      const newVotesGov = boycotters * participation;
      const votesPerNationalList = listsCount > 0 ? newVotesGov / listsCount : 0;

      const nationalListIds = [];
      const partiesAlloc = [];

      // national lists
      for (let i = 1; i <= listsCount; i += 1) {
        const idNat = `nat-${govId}-${i}`;
        nationalListIds.push(idNat);
        partiesAlloc.push({
          id: idNat,
          name: `تجمع وطني ${i}`,
          votes: votesPerNationalList,
          isNational: true,
        });
      }

      // traditional parties
      if (Array.isArray(parties)) {
        parties.forEach((p) => {
          if (p.isQuota) return;
          const pid = canonicalPartyId(p);
          if (!pid) return;
          partiesAlloc.push({
            id: pid,
            name: p.name || pid,
            votes: Math.max(Number(p.baseVotes || 0), 0),
            isNational: false,
          });
        });
      }

      let allocation = null;
      let seatCounts = new Map();

      if (seatsGeneral > 0 && partiesAlloc.length > 0) {
        allocation = allocateSeatsSaintLague(partiesAlloc, seatsGeneral);
        seatCounts = allocation.seatCounts;
      }

      const nationalSeatsForGov = {};
      let govNationalTotal = 0;

      nationalListIds.forEach((idNat, index) => {
        const seatsNat = seatCounts.get(idNat) || 0;
        nationalSeatsForGov[index + 1] = seatsNat;
        govNationalTotal += seatsNat;
        totalNationalSeatsByList[index + 1] =
          (totalNationalSeatsByList[index + 1] || 0) + seatsNat;
      });

      targetNewSeats += govNationalTotal;

      let govTraditionalFromGeneral = seatsGeneral - govNationalTotal;
      if (govTraditionalFromGeneral < 0) govTraditionalFromGeneral = 0;
      totalTraditionalSeats += govTraditionalFromGeneral;

      rows.push({
        id: govId,
        nameAr: govName,
        generalSeats: seatsGeneral,
        quotaSeats: seatsQuota,
        totalSeats: seatsGeneral + seatsQuota,
        nationalSeats: nationalSeatsForGov,
        traditionalSeats: govTraditionalFromGeneral,
      });

      // advanced data for tables
      if (allocation) {
        const partiesForAdvanced = partiesAlloc.map((p) => ({
          id: p.id,
          name: p.name,
          votes: p.votes,
          isOurList: !!p.isNational,
        }));

        govAdvancedList.push({
          id: govId,
          nameAr: govName,
          advancedData: { parties: partiesForAdvanced, allocation },
        });
      }

      // SVG painting: steal "lost" seats from baseline parties
      const baseGovMap = baselineSeats.get(govId) || new Map();
      for (const [partyId, baseSeatsCount] of baseGovMap.entries()) {
        const newSeatsCount = seatCounts.get(partyId) || 0;
        const lost = Math.max(0, baseSeatsCount - newSeatsCount);
        if (lost <= 0) continue;

        if (registry?.ok) {
          const { picked } = takeSeatsFromPartyGov(registry, partyId, govId, lost);
          for (const seatEl of picked) {
            markSeatTaken(seatEl);
          }
          painted += picked.length;
        }
      }
    }


    // ===== FORCE cover notPainted from specific parties (your requested 4) =====
if (registry?.ok) {
  const deficit = Math.max(0, targetNewSeats - painted);

  if (deficit > 0) {
    const forcedRes = forceCoverNotPaintedFromSpecificParties(registry, deficit);

    painted += forcedRes.forced;

    // Optional debug (very useful)
    console.log("[JOKER] Forced cover:", forcedRes);
  }
}




    const totals = {
      generalSeats: totalGeneralSeats,
      quotaSeats: totalQuotaSeats,
      totalSeats: totalSeatsAll,
      traditionalSeats: totalTraditionalSeats,
      nationalSeats: totalNationalSeatsByList,
    };

    const totalNationalAllLists = Object.values(totalNationalSeatsByList).reduce((sum, v) => sum + v, 0);

    // note text
    if (noteEl) {
      if (totalNationalAllLists >= PARLIAMENT_MAJORITY) {
        noteEl.textContent =
          "الآن التيارات الوطنية تمثل نصف + ١ من مقاعد مجلس النواب، ولا يمكن تمرير أي قانون دون موافقة هذه التيارات، وإمكانية تشريع القوانين الإصلاحية أصبحت أكبر بكثير.";
      } else if (totalNationalAllLists >= PARLIAMENT_THIRD) {
        noteEl.textContent =
          "الآن التيارات الوطنية تشكل ثلث مجلس النواب، ويمكنها إحداث تغيير حقيقي في موازين القوى داخل المجلس.";
      } else if (totalNationalAllLists > 0) {
        noteEl.textContent =
          "كلما ارتفعت نسبة مشاركة المقاطعين لصالح التيارات الوطنية، يُنتزع مقعد بعد آخر من الأحزاب التقليدية في مختلف المحافظات.";
      } else {
        noteEl.textContent =
          "عند بقاء المقاطعين في البيت، تبقى خريطة المقاعد تقريباً كما هي، لصالح الأحزاب التقليدية.";
      }
    }

    // mobile numbers
    if (mobileNewEl) mobileNewEl.textContent = toEn(totalNationalAllLists);
    if (mobileTradEl) mobileTradEl.textContent = toEn(totalTraditionalSeats);

    if (seatsTotalNumberEl) {
      seatsTotalNumberEl.innerHTML = `
        <div class="parl-seats-percent-row">${sliderVal}٪</div>
        <div class="parl-seats-count-row">${toEn(totalNationalAllLists)} | ${toEn(totalTraditionalSeats)}</div>
        <div class="parl-seats-quota-note">+${PARLIAMENT_QUOTA_SEATS} مقاعد كوتا أقليات</div>
      `;
    }

    // cache summary for details button (EXACT reference behavior)
    lastSummary = {
      listsCount,
      sliderValue: sliderVal,
      rows,
      totals,
      govAdvancedList,
      // svg diag (optional)
      diag: {
        targetNewSeats,
        painted,
        notPainted: Math.max(0, targetNewSeats - painted),
        svgShortageBlocks: registry?.shortage?.length || 0,
        svgMissingGroups: registry?.missingGroups?.length || 0,
      },
    };

    // IMPORTANT: heavy tables ONLY when requested AND panel is open
    if (updateAdvancedTables && resultsContainer && !resultsContainer.hasAttribute("hidden")) {
      renderParliamentResultsTable(lastSummary, resultsContainer, slider);
    }

    if (logConsole || CFG.logEveryInput) {
      console.groupCollapsed(
        `%c[JOKER] slider=${sliderVal}% lists=${listsCount} newSeats=${lastSummary.diag.targetNewSeats} painted=${lastSummary.diag.painted} notPainted=${lastSummary.diag.notPainted}`,
        "color:#00E5FF;font-weight:800;"
      );
      console.log("SVG integrity:", registry?._integrity);
      console.log("SVG shortage blocks:", lastSummary.diag.svgShortageBlocks);
      console.log("SVG missing groups:", lastSummary.diag.svgMissingGroups);
      console.groupEnd();
    }
  }

  /* -------- events EXACT like reference -------- */
  const handleSliderInput = () => {
    // fast update only
    recompute(false, false);
  };

  const handleSliderChange = () => {
    // after release: update tables if details open
    recompute(true, true);
  };

  slider.addEventListener("input", handleSliderInput);
  slider.addEventListener("change", handleSliderChange);

  nationalListsSelect.addEventListener("change", () => {
    recompute(true, true);
  });

  /* -------- details button EXACT like reference -------- */
  if (detailsBtn && resultsContainer) {
    resultsContainer.setAttribute("hidden", "hidden");
    detailsBtn.textContent = "إظهار التفاصيل";

    detailsBtn.addEventListener("click", () => {
      const isHidden = resultsContainer.hasAttribute("hidden");

      if (isHidden) {
        resultsContainer.removeAttribute("hidden");

        if (!lastSummary) {
          // lazy compute now
          recompute(true, true);
        }

        if (lastSummary) {
          renderParliamentResultsTable(lastSummary, resultsContainer, slider);
        }

        detailsBtn.textContent = "إخفاء التفاصيل";
      } else {
        resultsContainer.setAttribute("hidden", "hidden");
        detailsBtn.textContent = "إظهار التفاصيل";
      }
    });
  }

  // first compute (fast only)
  recompute(false, false);

  // SVG load
  svgObj.addEventListener("load", () => {
    svgDoc = svgObj.contentDocument;
    if (!svgDoc) return;

    registry = bindSvgAndBuildRegistry(svgDoc, partyMeta, govMeta);

    if (registry._integrity?.svgTotalCircles !== PARLIAMENT_TOTAL_SEATS) {
      console.warn("[JOKER] SVG does not contain 329 circles. Check SVG file.");
    }

    resetAllSeatsToBaseline(registry);

    // after binding: full compute once (tables only if open)
    recompute(true, true);
  });
}

document.addEventListener("DOMContentLoaded", initParliamentProgramJoker);
