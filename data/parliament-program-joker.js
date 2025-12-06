// ../data/parliament-program-joker.js
// نموذج وطني لمجلس النواب (٣٢٩ مقعداً)

import { parliamentGovernoratesData } from "./parliamentData.js";

const TOTAL_PARLIAMENT_SEATS = 329;
const PARLIAMENT_MAJORITY = 165;
const PARLIAMENT_THIRD = 110;

/* ======================= رسم هلال مقاعد البرلمان ======================= */
/**
 * يرتّب دوائر المقاعد على شكل نصف دائرة (هلال) يعتمد على عرض الحاوية.
 * يُستخدم هذا التخطيط في كل الشاشات، ويتكيّف تلقائيًا مع تغيير الحجم.
 */
// يرسم مقاعد البرلمان على شكل عدة صفوف (هلال من كرات صغيرة)
// يرسم مقاعد البرلمان على شكل عدة صفوف (هلال من كرات صغيرة)
// مع تكبير محيط أول دائرة وترك آخر دائرة كما هي
function layoutParliamentArc(seatsRow, circles) {
  if (!seatsRow || !Array.isArray(circles) || circles.length === 0) return;

  const width = seatsRow.clientWidth || 320;

  // نصف قطر الصف الخارجي (يبقى ثابت)
  const outerRadius = width / 2 - 4;

  // 7 صفوف = 329 مقعد (41 + 43 + 45 + 47 + 49 + 51 + 53)
  const rows = 7;
  const seatsPerRow = [31, 43, 46, 48, 49, 54, 58];

  // 🔸 هنا السحر:
  // نخلي أول سرة ما تبدي من الصفر، وإنما من 55% من نصف قطر الدائرة
  // جرّب تغيّر 0.55 إلى 0.5 أو 0.6 حسب اللي يعجبك أكثر
  const minRadius = outerRadius * 0.55;   // نصف قطر أول سرة (الأقرب للداخل)
  const bandThickness = outerRadius - minRadius;      // سماكة منطقة الهلال
  const rowGap = rows > 1 ? bandThickness / (rows - 1) : 0;

  const centerX = width / 2;
  const centerY = outerRadius + 12; // ارتفاع مركز الدائرة عن الأسفل

  const height = centerY + 4;
  seatsRow.style.position = "relative";
  seatsRow.style.height = `${height}px`;

  let globalIndex = 0;

  // نرسم من السرة الأولى (الداخلية) إلى الأخيرة (الخارجية)
  for (let r = 0; r < rows; r += 1) {
    const seatsInRow = seatsPerRow[r];
    const radius = minRadius + r * rowGap; // أول صف = minRadius, آخر صف = outerRadius

    const startAngle = Math.PI; // 180°
    const endAngle = 0;         //   0°
    const step =
      seatsInRow > 1 ? (endAngle - startAngle) / (seatsInRow - 1) : 0;

    for (let i = 0; i < seatsInRow; i += 1) {
      const circle = circles[globalIndex];
      if (!circle) return; // حماية لو صار اختلاف بعدد الكرات

      const angle = startAngle + step * i;

      const x = centerX + radius * Math.cos(angle);
      const y = centerY - radius * Math.sin(angle);

      circle.style.position = "absolute";
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
      circle.style.transform = "translate(-50%, -50%)";

      globalIndex += 1;
    }
  }
}



/* ======================= سانت لوغو المعدّل ======================= */

// بناء مقسّمات سانت لوغو المعدّل
function buildSaintLagueDivisors(totalSeats) {
  if (!Number.isFinite(totalSeats) || totalSeats <= 0) return [];
  const divisors = [1.7];
  for (let i = 1; i < totalSeats; i += 1) {
    divisors.push(1 + 2 * i); // 3, 5, 7, ...
  }
  return divisors;
}

// توزيع المقاعد على القوائم داخل محافظة معيّنة
// parties: [{ id, name, votes, isNational, isQuota }]
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

  // ترتيب تنازلي للحواصل
  quotaList.sort((a, b) => b.quotient - a.quotient);

  const winnersByParty = new Map();
  const seatCounts = new Map();

  const seatsToAllocate = Math.min(
    Math.max(totalSeats || 0, 0),
    quotaList.length
  );

  let maxDivisorIndexUsed = -1;

  for (let i = 0; i < seatsToAllocate; i += 1) {
    const { partyId, divisorIndex } = quotaList[i];

    seatCounts.set(partyId, (seatCounts.get(partyId) || 0) + 1);

    if (!winnersByParty.has(partyId)) {
      winnersByParty.set(partyId, new Set());
    }
    winnersByParty.get(partyId).add(divisorIndex);

    if (divisorIndex > maxDivisorIndexUsed) {
      maxDivisorIndexUsed = divisorIndex;
    }
  }

  return { divisors, winnersByParty, seatCounts, maxDivisorIndexUsed };
}

/* ======================= جدول سانت لوغو لكل محافظة ======================= */

/**
 * رسم بلوك المحافظة:
 *  - عنوان صغير
 *  - سلايدر "مراية" يعكس السلايدر الرئيسي
 *  - جدول سانت لوغو للأحزاب / التجمعات
 */
function renderSaintLagueDetailTable(
  advancedData,
  container,
  govName,
  mainSlider,
  sliderValue
) {
  if (!advancedData || !container) return;

  const { parties, allocation } = advancedData;
  const {
    divisors,
    winnersByParty,
    seatCounts,
    maxDivisorIndexUsed,
  } = allocation || {};

  if (
    !Array.isArray(parties) ||
    !parties.length ||
    !Array.isArray(divisors) ||
    !divisors.length
  ) {
    return;
  }

  // نختصر الأعمدة إلى آخر مقسّم تم استخدامه فعلياً في توزيع المقاعد
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

  /* 🔹 استدعاء السلايدر من الـ <template> 🔹 */
  const tmpl = document.getElementById("parl-inline-slider-template");
  if (tmpl) {
    const clone = tmpl.content.cloneNode(true);

    const valueSpan = clone.querySelector(".parl-inline-slider-value");
    const inlineSlider = clone.querySelector(".parl-inline-slider-input");

    if (inlineSlider && mainSlider) {
      // نفس إعدادات السلايدر الرئيسي
      inlineSlider.min = mainSlider.min;
      inlineSlider.max = mainSlider.max;
      inlineSlider.step = mainSlider.step;

      // دالة تزامن من السلايدر الرئيسي -> سلايدر الجدول
      const syncFromMain = () => {
        inlineSlider.value = mainSlider.value;
        if (valueSpan) {
          valueSpan.textContent = `${mainSlider.value}٪`;
        }
      };

      // أول مزامنة
      syncFromMain();

      // لما يتحرك السلايدر الرئيسي، حدِّث اللي فوق الجدول
      mainSlider.addEventListener("input", syncFromMain);
      mainSlider.addEventListener("change", syncFromMain);

      // لما يتحرك السلايدر فوق الجدول، عدّل الرئيسي وخلِّيه يشغّل نفس الأحداث
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

  // جدول سانت لوغو
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
        td.classList.add(
          party.isOurList ? "quota-cell--our-seat" : "quota-cell--other-seat"
        );
      }

      row.appendChild(td);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  wrapper.appendChild(table);
  container.appendChild(wrapper);
}

/* ======================= جدول وطني (كل المحافظات) ======================= */

// summary = { listsCount, sliderValue, rows: [...], totals: {...}, govAdvancedList: [...] }
function renderParliamentResultsTable(summary, container, mainSlider) {
  if (!summary || !container) return;

  const { listsCount, sliderValue, rows, totals, govAdvancedList } = summary;

  container.innerHTML = "";

  // نص توضيحي أعلى الجدول الوطني
  const title = document.createElement("p");
  title.className = "gov-small-note";
  title.textContent =
    `توزيع مقاعد مجلس النواب حسب المحافظات عند مشاركة ` +
    `${sliderValue}% من المقاطعين، وبوجود ${listsCount} تجمّع/تجمّعات وطنية.`;
  container.appendChild(title);

  // جدول وطني لكل المحافظات
  const table = document.createElement("table");
  table.className = "gov-advanced-table parl-advanced-table";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  const headers = ["المحافظة", "المقاعد العامة", "مقاعد الكوتا"];

  for (let i = 1; i <= listsCount; i += 1) {
    headers.push(`تجمع وطني ${i}`);
  }

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

    basicCols.forEach((val) => {
      const td = document.createElement("td");
      td.textContent = val.toLocaleString("en-US");
      tr.appendChild(td);
    });

    for (let i = 1; i <= listsCount; i += 1) {
      const td = document.createElement("td");
      const seats = row.nationalSeats[i] || 0;
      td.textContent = seats.toLocaleString("en-US");
      if (seats > 0) {
        td.classList.add("quota-cell--our-seat");
      }
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

  // صف المجموع الكلي
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

  container.appendChild(table);

  // ========== جداول سانت لوغو لكل محافظة تحت الجدول الوطني ==========

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
      renderSaintLagueDetailTable(
        item.advancedData,
        container,
        item.nameAr,
        mainSlider,
        summary.sliderValue
      );
    });
  }
}

/* ======================= بوكس البرلمان (٣٢٩ مقعد) ======================= */

function initParliamentProgramJoker() {
  const box = document.querySelector(".parl-program-box--joker");
  if (!box) return;

  const slider = box.querySelector("#parl-gov-slider");
  const sliderValueEl = box.querySelector(".gov-control-block .slider-value");
  const nationalListsSelect = box.querySelector(".national-lists-count");
  const seatsRow = box.querySelector(".gov-seats-row");
  const noteEl = box.querySelector(".parl-dynamic-note");

  // عناصر عرض الموبايل
  const mobileNewEl = box.querySelector(".parl-mobile-new-count");
  const mobileTradEl = box.querySelector(".parl-mobile-trad-count");

  const detailsBtn = box.querySelector(".parl-advanced-toggle");
  const resultsContainer = box.querySelector(".parl-results-table-container");

  if (!slider || !nationalListsSelect || !seatsRow) return;

  /* -------- إنشاء دوائر المقاعد (٣٢٩) -------- */
  const circles = [];
  seatsRow.innerHTML = "";
   for (let i = 0; i < TOTAL_PARLIAMENT_SEATS; i += 1) {
    const circle = document.createElement("div");
    circle.classList.add("seat-circle");
    circle.textContent = i + 1;

    if (i === PARLIAMENT_MAJORITY - 1) {
      circle.classList.add("seat-circle--majority-marker");
    }

    if (i === PARLIAMENT_THIRD - 1) {
      circle.classList.add("seat-circle--third-marker");
    }

    seatsRow.appendChild(circle);
    circles.push(circle);
  }

  // رسم الهلال لأول مرة + عند تغيير حجم الشاشة
  const applyArcLayout = () => layoutParliamentArc(seatsRow, circles);
  applyArcLayout();
  window.addEventListener("resize", applyArcLayout);


  /* -------- تجهيز بيانات المقاطعين لكل محافظة -------- */
  const govData = parliamentGovernoratesData.map((gov) => {
    const eligible = Math.max(gov.eligible || 0, 0);
    const voted = Math.max(gov.voted || 0, 0);
    const boycotters = Math.max(eligible - voted, 0);

    return { ...gov, boycotters };
  });

  let lastSummary = null;

  function recompute(updateAdvancedTables = false) {
    const sliderVal = Number(slider.value) || 0;
    const listsCount = Number(nationalListsSelect.value) || 1;

    if (sliderValueEl) {
      sliderValueEl.textContent = `${sliderVal}٪`;
    }

    const participation = sliderVal / 100;

    const totalNationalSeatsByList = {};
    let totalTraditionalSeats = 0;
    let totalQuotaSeats = 0;
    let totalGeneralSeats = 0;
    let totalSeatsAll = 0;

    const rows = [];
    const govAdvancedList = [];

    govData.forEach((gov) => {
      const {
        id,
        nameAr,
        totalSeats,
        generalSeats,
        quotaSeats,
        parties,
        boycotters,
      } = gov;

      const seatsGeneral = Math.max(generalSeats || totalSeats || 0, 0);
      const seatsQuota = Math.max(quotaSeats || 0, 0);

      totalGeneralSeats += seatsGeneral;
      totalQuotaSeats += seatsQuota;
      totalSeatsAll += seatsGeneral + seatsQuota;

      const newVotesGov = boycotters * participation;
      const votesPerNationalList = listsCount > 0 ? newVotesGov / listsCount : 0;

      const nationalListIds = [];
      const partiesAlloc = [];

      // التجمعات الوطنية الجديدة
      for (let i = 1; i <= listsCount; i += 1) {
        const idNat = `nat-${id}-${i}`;
        nationalListIds.push(idNat);
        partiesAlloc.push({
          id: idNat,
          name: `تجمع وطني ${i}`,
          votes: votesPerNationalList,
          isNational: true,
        });
      }

      // الأحزاب التقليدية (المقاعد العامة فقط)
      if (Array.isArray(parties)) {
        parties.forEach((p) => {
          if (p.isQuota) return;
          partiesAlloc.push({
            id: p.id,
            name: p.name,
            votes: Math.max(p.baseVotes || 0, 0),
            isNational: false,
          });
        });
      }

      let seatCounts = new Map();
      let allocation = null;

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

      let govTraditionalFromGeneral = seatsGeneral - govNationalTotal;
      if (govTraditionalFromGeneral < 0) govTraditionalFromGeneral = 0;

      totalTraditionalSeats += govTraditionalFromGeneral;

      rows.push({
        id,
        nameAr,
        generalSeats: seatsGeneral,
        quotaSeats: seatsQuota,
        totalSeats: seatsGeneral + seatsQuota,
        nationalSeats: nationalSeatsForGov,
        traditionalSeats: govTraditionalFromGeneral,
      });

      // داتا سانت لوغو لهذه المحافظة (كل التجمعات الوطنية تعتبر isOurList)
      if (allocation) {
        const partiesForAdvanced = partiesAlloc.map((p) => ({
          id: p.id,
          name: p.name,
          votes: p.votes,
          isOurList: !!p.isNational, // كل التجمعات الوطنية تعتبر "قوائمنا"
        }));

        govAdvancedList.push({
          id,
          nameAr,
          advancedData: {
            parties: partiesForAdvanced,
            allocation,
          },
        });
      }
    });

    const totals = {
      generalSeats: totalGeneralSeats,
      quotaSeats: totalQuotaSeats,
      totalSeats: totalSeatsAll,
      traditionalSeats: totalTraditionalSeats,
      nationalSeats: totalNationalSeatsByList,
    };

    /* -------- تلوين دوائر البرلمان حسب مقاعد التجمّعات الوطنية -------- */
    const totalNationalAllLists = Object.values(
      totalNationalSeatsByList
    ).reduce((sum, v) => sum + v, 0);

    circles.forEach((circle, index) => {
      circle.classList.remove("seat-circle--green");
      circle.classList.remove("seat-circle--target", "seat-circle--rest");

      if (index < PARLIAMENT_MAJORITY) {
        circle.classList.add("seat-circle--target");
      } else {
        circle.classList.add("seat-circle--rest");
      }

      if (index < totalNationalAllLists) {
        circle.classList.add("seat-circle--green");
      }
    });

    /* -------- النص التوضيحي تحت السلايدر -------- */
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

    /* -------- أرقام الموبايل (نواب جدد / تقليديين) -------- */
    if (mobileNewEl) {
      mobileNewEl.textContent = totalNationalAllLists.toLocaleString("en-US");
    }
    if (mobileTradEl) {
      mobileTradEl.textContent = totalTraditionalSeats.toLocaleString("en-US");
    }

    // نخزن الملخص حتى نعيد رسم الجدول عند الحاجة
    lastSummary = {
      listsCount,
      sliderValue: sliderVal,
      rows,
      totals,
      govAdvancedList,
    };

    // تحديث الجداول الثقيلة فقط عندما نطلب ذلك
    if (
      updateAdvancedTables &&
      resultsContainer &&
      !resultsContainer.hasAttribute("hidden")
    ) {
      renderParliamentResultsTable(lastSummary, resultsContainer, slider);
    }
  }

  /* -------- أحداث السلايدر وعدد التجمعات -------- */
  const handleSliderInput = () => {
    // تحديث خفيف وسريع (الدوائر + النص فقط)
    recompute(false);
  };

  const handleSliderChange = () => {
    // عند إفلات السلايدر نحسب الجداول أيضاً
    recompute(true);
  };

  slider.addEventListener("input", handleSliderInput);
  slider.addEventListener("change", handleSliderChange);

  nationalListsSelect.addEventListener("change", () => {
    // تغيير عدد التجمعات يحتاج إعادة حساب كاملة
    recompute(true);
  });

  /* -------- زر إظهار / إخفاء التفاصيل -------- */
  if (detailsBtn && resultsContainer) {
    resultsContainer.setAttribute("hidden", "hidden");

    detailsBtn.addEventListener("click", () => {
      const isHidden = resultsContainer.hasAttribute("hidden");

      if (isHidden) {
        resultsContainer.removeAttribute("hidden");
        if (!lastSummary) {
          recompute(true);
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

  // أول حساب (مع بناء الدوائر والنصوص فقط)
  recompute(false);
}

document.addEventListener("DOMContentLoaded", initParliamentProgramJoker);
