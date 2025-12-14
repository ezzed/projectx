// بيانات مجلس النواب 2025 مبنية على ملف "نتائج الانتخابات"
// eligible = توزيع ٢٨,٠٠٠,٠٠٠ ناخب على المحافظات بنسبة عدد الناخبين الكلي
// registeredOriginal = عدد الناخبين الكلي من ملف النتائج
// voted = عدد المصوتين الكلي من ملف النتائج
// turnoutPercent / boycottPercent = نسبة المشاركة/المقاطعة من التوزيع الجديد
// ملاحظة: مقاعد الكوتا (isQuota: true) لا تتأثر بتجارب السلايدر

export const parliamentGovernoratesData = [
  {
    id: "basra",
    nameAr: "البصرة",
    nameEn: "Basra",

    eligible: 2119221,               // توزيع الناخبين من مجموع ٢٨,٠٠٠,٠٠٠
    registeredOriginal: 1620211,     // عدد الناخبين المسجّلين في ملف النتائج الأصلي
    voted: 827966,                   // عدد من صوّت فعلياً في هذه المحافظة

    turnoutPercent: 39.1,            // نسبة المشاركة من التوزيع الجديد
    boycottPercent: 60.9,            // نسبة المقاطعة من التوزيع الجديد

    totalSeats: 25,                  // مجموع مقاعد مجلس النواب عن هذه المحافظة
    generalSeats: 25,                // مقاعد عامة
    quotaSeats: 0,                   // لا توجد كوتا

    parties: [
     


      {
        id: "basra-party-1",
        name: "حزب تقليدي 1",
        svgId: "16-Tasmim-Alliance",
        baseVotes: 173761,
        seats: 6,
        isQuota: false,
      }
    ,
      {
        id: "basra-party-2",
        name: "حزب تقليدي ٢",

        svgId: "4-Al-Sadiqoun-Bloc",
        baseVotes: 151274,
        seats: 5,
        isQuota: false,
      },
      {
        id: "basra-party-3",
        name: "حزب تقليدي ٣",
        svgId: "0-Reconstruction-and-Development-Coalition",
       
        baseVotes: 126077,
        seats: 4,
        isQuota: false,
      },
      {
        id: "basra-party-4",
        name: "حزب تقليدي ٤",
         svgId: "3-State-of-Law-Coalition",
        baseVotes: 69445,
        seats: 2,
        isQuota: false,
      },
      {
        id: "basra-party-5",
        name: "حزب تقليدي ٥",
         svgId: "7-National-State-Forces",
        baseVotes: 54652,
        seats: 2,
        isQuota: false,
      },
      {
        id: "basra-party-6",
        name: "حزب تقليدي ٦",
         svgId: "12-Huqooq",
        baseVotes: 49545,
        seats: 2,
        isQuota: false,
      },
      {
        id: "basra-party-7",
        name: "حزب تقليدي ٧",
         svgId: "5-Badr-Organization",
        baseVotes: 47327,
        seats: 1,
        isQuota: false,
      },
      {
        id: "basra-party-8",
        name: "حزب تقليدي ٨",
         svgId: "13-Abshir-Ya-Iraq",
        baseVotes: 44584,
        seats: 1,
        isQuota: false,
      },
      {
        id: "basra-party-9",
        name: "حزب تقليدي ٩",
         svgId: "25-Al-Faw-Zakho-Coalition",
        baseVotes: 31972,
        seats: 1,
        isQuota: false,
      },
      {
        id: "basra-party-10",
        name: "حزب تقليدي ١٠",
         svgId: "10-Fundamental",
        baseVotes: 31718,
        seats: 1,
        isQuota: false,
      },
    ],
  },

  {
    id: "anbar",
    nameAr: "الأنبار",
    nameEn: "Anbar",

    eligible: 1361736,
    registeredOriginal: 1041090,
    voted: 695593,

    turnoutPercent: 51.1,
    boycottPercent: 48.9,

    totalSeats: 15,
    generalSeats: 15,
    quotaSeats: 0,

    parties: [
     
      {
        id: "anbar-party-1",
        name: "حزب تقليدي ١",
         svgId: "2-Progress-Party",
        baseVotes: 212838,    // 5 مقاعد
        seats: 5,
        isQuota: false,
      },
      {
        id: "anbar-party-2",
        name: "حزب تقليدي ٢",
         svgId: "20-Al-Anbar-Is-Our-Identity-Alliance",
        baseVotes: 128325,    // 3 مقاعد
        seats: 3,
        isQuota: false,
      },
      {
        id: "anbar-party-3",
        name: "حزب تقليدي ٣",
         svgId: "23-Qimam-Coalition",
        baseVotes: 97635,     // 3 مقاعد
        seats: 3,
        isQuota: false,
      },
      {
        id: "anbar-party-4",
        name: "حزب تقليدي ٤",
         svgId: "8-Azem-Alliance",
        baseVotes: 78446,     // 2 مقاعد
        seats: 2,
        isQuota: false,
      },
      {
        id: "anbar-party-5",
        name: "حزب تقليدي ٥",
         svgId: "24-Al-Tafawwuq"
,
        baseVotes: 47074,     // 1 مقعد
        seats: 1,
        isQuota: false,
      },
      {
        id: "anbar-party-6",
        name: "حزب تقليدي ٦",
         svgId: "9-Sovereignty-Alliance",
        baseVotes: 40820,     // 1 مقعد
        seats: 1,
        isQuota: false,
      },
    ],
  },

  {
    id: "erbil",
    nameAr: "أربيل",
    nameEn: "Erbil",

    eligible: 1458569,
    registeredOriginal: 1115122,
    voted: 800889,

    turnoutPercent: 54.9,
    boycottPercent: 45.1,

    totalSeats: 16,
    generalSeats: 15,
    quotaSeats: 1,

    parties: [
     
      {
        id: "erbil-party-1",
        name: "حزب تقليدي ١",
                 svgId: "1-Kurdistan-Democratic-Party",
        baseVotes: 369724,    // 9 مقاعد
        seats: 9,
        isQuota: false,
      },
      {
        id: "erbil-party-2",
        name: "حزب تقليدي ٢",
                 svgId: "6-Patriotic-Union-of-Kurdistan",
        baseVotes: 97411,     // 3 مقاعد
        seats: 3,
        isQuota: false,
      },
      {
        id: "erbil-party-3",
        name: "حزب تقليدي ٣",
                 svgId: "18-National-Stance-Movement",
        baseVotes: 63298,     // 2 مقاعد
        seats: 2,
        isQuota: false,
      },
      {
        id: "erbil-party-4",
        name: "حزب تقليدي ٤",
                 svgId: "19-New-Generation-Movement",
        baseVotes: 38921,     // 1 مقعد
        seats: 1,
        isQuota: false,
      },
      {
        id: "erbil-quota-1",
        name: "قائمة كوتا ١",
                
        baseVotes: 18517,     // 1 مقعد كوتا (مسيحي)
        seats: 1,
        isQuota: true,
      },
    ],
  },

  {
    id: "baghdad",
    nameAr: "بغداد",
    nameEn: "Baghdad",

    eligible: 5702172,
    registeredOriginal: 4359490,
    voted: 2129883,

    turnoutPercent: 37.4,
    boycottPercent: 62.6,

    totalSeats: 71,
    generalSeats: 69,
    quotaSeats: 2,

    parties: [
     
      {
        id: "baghdad-party-1",
        name: "حزب تقليدي ١",
        
        svgId: "0-Reconstruction-and-Development-Coalition",
        baseVotes: 411300,    // 15 مقعد
        seats: 15,
        isQuota: false,
      },
      {
        id: "baghdad-party-2",
        name: "حزب تقليدي ٢",
        svgId: "2-Progress-Party",
        baseVotes: 277416,    // 10 مقاعد
        seats: 10,
        isQuota: false,
      },
      {
        id: "baghdad-party-3",
        name: "حزب تقليدي ٣",
        svgId: "3-State-of-Law-Coalition",
        baseVotes: 228300,    // 9 مقاعد
        seats: 9,
        isQuota: false,
      },
      {
        id: "baghdad-party-4",
        name: "حزب تقليدي ٤",
        svgId: "7-National-State-Forces",
        baseVotes: 138904,    // 5
        seats: 5,
        isQuota: false,
      },
      {
        id: "baghdad-party-5",
        name: "حزب تقليدي ٥",
        svgId: "4-Al-Sadiqoun-Bloc",
        baseVotes: 128249,    // 5
        seats: 5,
        isQuota: false,
      },
      {
        id: "baghdad-party-6",
        name: "حزب تقليدي ٦",
        svgId: "8-Azem-Alliance",
        baseVotes: 128122,    // 5
        seats: 5,
        isQuota: false,
      },
      {
        id: "baghdad-party-7",
        name: "حزب تقليدي ٧",
        svgId: "5-Badr-Organization",
        baseVotes: 116704,    // 4
        seats: 4,
        isQuota: false,
      },
      {
        id: "baghdad-party-8",
        name: "حزب تقليدي ٨",
        svgId: "9-Sovereignty-Alliance",
        baseVotes: 110037,    // 4
        seats: 4,
        isQuota: false,
      },
      {
        id: "baghdad-party-9",
        name: "حزب تقليدي ٩",
        svgId: "10-Fundamental",
        baseVotes: 104164,    // 4
        seats: 4,
        isQuota: false,
      },
      {
        id: "baghdad-party-10",
        name: "حزب تقليدي ١٠",
        svgId: "12-Huqooq",
        baseVotes: 77763,     // 3
        seats: 3,
        isQuota: false,
      },
      {
        id: "baghdad-party-11",
        name: "حزب تقليدي ١١",
        svgId: "11-National-Determination",
        baseVotes: 53143,     // 2
        seats: 2,
        isQuota: false,
      },
      {
        id: "baghdad-party-12",
        name: "حزب تقليدي ١٢",
        svgId: "13-Abshir-Ya-Iraq",
        baseVotes: 38762,     // 1
        seats: 1,
        isQuota: false,
      },
      {
        id: "baghdad-party-13",
        name: "حزب تقليدي ١٣",
        svgId: "15-Services",
        baseVotes: 37933,     // 1
        seats: 1,
        isQuota: false,
      },
      {
        id: "baghdad-party-14",
        name: "حزب تقليدي ١٤",
        svgId: "14-Ishraqat-Kanoon",
        baseVotes: 23288,     // 1
        seats: 1,
        isQuota: false,
      },
      {
        id: "baghdad-quota-1",
        name: "قائمة كوتا ١",
        baseVotes: 13137,     // 1 مقعد كوتا (مسيحي)
        seats: 1,
        isQuota: true,
      },
      {
        id: "baghdad-quota-2",
        name: "قائمة كوتا ٢",
        baseVotes: 5410,      // 1 مقعد كوتا (صابئة)
        seats: 1,
        isQuota: true,
      },
    ],
  },

  // بابل
  {
    id: "babel",
    nameAr: "بابل",
    nameEn: "Babel",

    eligible: 1448193,
    registeredOriginal: 1107189,
    voted: 563125,

    turnoutPercent: 38.9,
    boycottPercent: 61.1,

    totalSeats: 17,
    generalSeats: 17,
    quotaSeats: 0,

    parties: [
     
      {
        id: "babel-party-1",
        name: "حزب تقليدي ١",
        svgId: "0-Reconstruction-and-Development-Coalition",
        baseVotes: 91424,
        seats: 3,
        isQuota: false,
      },
      {
        id: "babel-party-2",
        name: "حزب تقليدي ٢",
        svgId: "4-Al-Sadiqoun-Bloc",
        baseVotes: 79566,
        seats: 3,
        isQuota: false,
      },
      {
        id: "babel-party-3",
        name: "حزب تقليدي ٣",
        svgId: "3-State-of-Law-Coalition",
        baseVotes: 68584,
        seats: 3,
        isQuota: false,
      },
      {
        id: "babel-party-4",
        name: "حزب تقليدي ٤",
        svgId: "14-Ishraqat-Kanoon",
        baseVotes: 56174,
        seats: 2,
        isQuota: false,
      },
      {
        id: "babel-party-5",
        name: "حزب تقليدي ٥",
        svgId: "7-National-State-Forces",
        baseVotes: 51916,
        seats: 2,
        isQuota: false,
      },
      {
        id: "babel-party-6",
        name: "حزب تقليدي ٦",
        svgId: "15-Services",
        baseVotes: 38547,
        seats: 1,
        isQuota: false,
      },
      {
        id: "babel-party-7",
        name: "حزب تقليدي ٧",
        svgId: "28-Sumerian-Movement",
        baseVotes: 29857,
        seats: 1,
        isQuota: false,
      },
      {
        id: "babel-party-8",
        name: "حزب تقليدي ٨",
        svgId: "39-Idraak-Movement",
        baseVotes: 28491,
        seats: 1,
        isQuota: false,
      },
      {
        id: "babel-party-9",
        name: "حزب تقليدي ٩",
        svgId: "5-Badr-Organization",
        baseVotes: 25192,
        seats: 1,
        isQuota: false,
      },
    ],
  },

  // النجف
  {
    id: "najaf",
    nameAr: "النجف",
    nameEn: "Najaf",

    eligible: 1078687,
    registeredOriginal: 824690,
    voted: 360140,

    turnoutPercent: 33.4,
    boycottPercent: 66.6,

    totalSeats: 12,
    generalSeats: 12,
    quotaSeats: 0,

    parties: [
      
      {
        id: "najaf-party-1",
        name: "حزب تقليدي ١",
         svgId: "0-Reconstruction-and-Development-Coalition",
        baseVotes: 56464,
        seats: 2,
        isQuota: false,
      },
      {
        id: "najaf-party-2",
        name: "حزب تقليدي ٢",
         svgId: "7-National-State-Forces",
        baseVotes: 45224,
        seats: 2,
        isQuota: false,
      },
      {
        id: "najaf-party-3",
        name: "حزب تقليدي ٣",
         svgId: "3-State-of-Law-Coalition",
        baseVotes: 41173,
        seats: 2,
        isQuota: false,
      },
      {
        id: "najaf-party-4",
        name: "حزب تقليدي ٤",
         svgId: "4-Al-Sadiqoun-Bloc",
        baseVotes: 40338,
        seats: 2,
        isQuota: false,
      },
      {
        id: "najaf-party-5",
        name: "حزب تقليدي ٥",
         svgId: "15-Services",
        baseVotes: 33000,
        seats: 1,
        isQuota: false,
      },
      {
        id: "najaf-party-6",
        name: "حزب تقليدي ٦",
         svgId: "13-Abshir-Ya-Iraq",
        baseVotes: 32706,
        seats: 1,
        isQuota: false,
      },
      {
        id: "najaf-party-7",
        name: "حزب تقليدي ٧",
         svgId: "10-Fundamental",
        baseVotes: 27657,
        seats: 1,
        isQuota: false,
      },
      {
        id: "najaf-party-8",
        name: "حزب تقليدي ٨",
         svgId: "14-Ishraqat-Kanoon",
        baseVotes: 24823,
        seats: 1,
        isQuota: false,
      },
    ],
  },

  // المثنى
  {
    id: "muthanna",
    nameAr: "المثنى",
    nameEn: "Muthanna",

    eligible: 644593,
    registeredOriginal: 492812,
    voted: 250634,

    turnoutPercent: 38.9,
    boycottPercent: 61.1,

    totalSeats: 7,
    generalSeats: 7,
    quotaSeats: 0,

    parties: [
      
      {
        id: "muthanna-party-1",
        name: "حزب تقليدي ١",
         svgId: "0-Reconstruction-and-Development-Coalition",
        baseVotes: 57411,
        seats: 2,
        isQuota: false,
      },
      {
        id: "muthanna-party-2",
        name: "حزب تقليدي ٢",
         svgId: "3-State-of-Law-Coalition",
        baseVotes: 41408,
        seats: 2,
        isQuota: false,
      },
      {
        id: "muthanna-party-3",
        name: "حزب تقليدي ٣",
         svgId: "4-Al-Sadiqoun-Bloc",
        baseVotes: 37183,
        seats: 1,
        isQuota: false,
      },
      {
        id: "muthanna-party-4",
        name: "حزب تقليدي ٤",
         svgId: "7-National-State-Forces",
        baseVotes: 34740,
        seats: 1,
        isQuota: false,
      },
      {
        id: "muthanna-party-5",
        name: "حزب تقليدي ٥",
         svgId: "10-Fundamental",
        baseVotes: 32817,
        seats: 1,
        isQuota: false,
      },
    ],
  },

  // القادسية
  {
    id: "qadisiya",
    nameAr: "القادسية",
    nameEn: "Qadisiya",

    eligible: 915575,
    registeredOriginal: 699986,
    voted: 344910,

    turnoutPercent: 37.7,
    boycottPercent: 62.3,

    totalSeats: 11,
    generalSeats: 11,
    quotaSeats: 0,

    parties: [
      
      {
        id: "qadisiya-party-1",
        name: "حزب تقليدي ١",
         svgId: "0-Reconstruction-and-Development-Coalition",
        baseVotes: 70953,
        seats: 3,
        isQuota: false,
      },
      {
        id: "qadisiya-party-2",
        name: "حزب تقليدي ٢",
         svgId: "3-State-of-Law-Coalition",
        baseVotes: 52568,
        seats: 2,
        isQuota: false,
      },
      {
        id: "qadisiya-party-3",
        name: "حزب تقليدي ٣",
         svgId: "5-Badr-Organization",
        baseVotes: 35073,
        seats: 2,
        isQuota: false,
      },
      {
        id: "qadisiya-party-4",
        name: "حزب تقليدي ٤",
         svgId: "4-Al-Sadiqoun-Bloc",
        baseVotes: 34490,
        seats: 1,
        isQuota: false,
      },
      {
        id: "qadisiya-party-5",
        name: "حزب تقليدي ٥",
         svgId: "7-National-State-Forces",
        baseVotes: 31123,
        seats: 1,
        isQuota: false,
      },
      {
        id: "qadisiya-party-6",
        name: "حزب تقليدي ٦",
         svgId: "15-Services",
        baseVotes: 30937,
        seats: 1,
        isQuota: false,
      },
      {
        id: "qadisiya-party-7",
        name: "حزب تقليدي ٧",
         svgId: "14-Ishraqat-Kanoon",
        baseVotes: 22102,
        seats: 1,
        isQuota: false,
      },
    ],
  },

  // صلاح الدين
  {
    id: "salahaldin",
    nameAr: "صلاح الدين",
    nameEn: "Salah Al-Din",

    eligible: 1165379,
    registeredOriginal: 890969,
    voted: 598686,

    turnoutPercent: 51.4,
    boycottPercent: 48.6,

    totalSeats: 12,
    generalSeats: 12,
    quotaSeats: 0,

    parties: [
     
      {
        id: "salahaldin-party-1",
        name: "حزب تقليدي ١",
         svgId: "2-Progress-Party",
        baseVotes: 82870,
        seats: 2,
        isQuota: false,
      },
      {
        id: "salahaldin-party-2",
        name: "حزب تقليدي ٢",
         svgId: "0-Reconstruction-and-Development-Coalition",
        baseVotes: 80528,
        seats: 2,
        isQuota: false,
      },
      {
        id: "salahaldin-party-3",
        name: "حزب تقليدي ٣",
         svgId: "8-Azem-Alliance",
        baseVotes: 74783,
        seats: 2,
        isQuota: false,
      },
      {
        id: "salahaldin-party-4",
        name: "حزب تقليدي ٤",
         svgId: "26-National-Party-of-the-Masses",
        baseVotes: 67368,
        seats: 2,
        isQuota: false,
      },
      {
        id: "salahaldin-party-5",
        name: "حزب تقليدي ٥",
         svgId: "29-Saladin-Unified-Alliance",
        baseVotes: 57150,
        seats: 1,
        isQuota: false,
      },
      {
        id: "salahaldin-party-6",
        name: "حزب تقليدي ٦",
         svgId: "34-Tahaluf-Sharaqatuna",
        baseVotes: 50980,
        seats: 1,
        isQuota: false,
      },
      {
        id: "salahaldin-party-7",
        name: "حزب تقليدي ٧",
         svgId: "24-Al-Tafawwuq",
        baseVotes: 41378,
        seats: 1,
        isQuota: false,
      },
      {
        id: "salahaldin-party-8",
        name: "حزب تقليدي ٨",
         svgId: "24-Al-Tafawwuq",
        baseVotes: 37252,
        seats: 1,
        isQuota: false,
      },
    ],
  },

  // ذي قار
  {
    id: "dhiqar",
    nameAr: "ذي قار",
    nameEn: "Dhi Qar",

    eligible: 1438055,
    registeredOriginal: 1099438,
    voted: 538390,

    turnoutPercent: 37.4,
    boycottPercent: 62.6,

    totalSeats: 19,
    generalSeats: 19,
    quotaSeats: 0,

    parties: [
     
      {
        id: "dhiqar-party-1",
        name: "حزب تقليدي ١",
         svgId: "0-Reconstruction-and-Development-Coalition",
        baseVotes: 80892,
        seats: 3,
        isQuota: false,
      },
      {
        id: "dhiqar-party-2",
        name: "حزب تقليدي ٢",
         svgId: "3-State-of-Law-Coalition",
        baseVotes: 74563,
        seats: 3,
        isQuota: false,
      },
      {
        id: "dhiqar-party-3",
        name: "حزب تقليدي ٣",
         svgId: "4-Al-Sadiqoun-Bloc",
        baseVotes: 61696,
        seats: 3,
        isQuota: false,
      },
      {
        id: "dhiqar-party-4",
        name: "حزب تقليدي ٤",
         svgId: "7-National-State-Forces",
        baseVotes: 46607,
        seats: 2,
        isQuota: false,
      },
      {
        id: "dhiqar-party-5",
        name: "حزب تقليدي ٥",
         svgId: "5-Badr-Organization",
        baseVotes: 44421,
        seats: 2,
        isQuota: false,
      },
      {
        id: "dhiqar-party-6",
        name: "حزب تقليدي ٦",
         svgId: "28-Sumerian-Movement",
        baseVotes: 36611,
        seats: 1,
        isQuota: false,
      },
      {
        id: "dhiqar-party-7",
        name: "حزب تقليدي ٧",
         svgId: "15-Services",
        baseVotes: 31171,
        seats: 1,
        isQuota: false,
      },
      {
        id: "dhiqar-party-8",
        name: "حزب تقليدي ٨",
         svgId: "13-Abshir-Ya-Iraq",
        baseVotes: 23214,
        seats: 1,
        isQuota: false,
      },
      {
        id: "dhiqar-party-9",
        name: "حزب تقليدي ٩",
         svgId: "14-Ishraqat-Kanoon",
        baseVotes: 22521,
        seats: 1,
        isQuota: false,
      },
      {
        id: "dhiqar-party-10",
        name: "حزب تقليدي ١٠",
         svgId: "40-State-Support-Bloc",
        baseVotes: 21615,
        seats: 1,
        isQuota: false,
      },
      {
        id: "dhiqar-party-11",
        name: "حزب تقليدي ١١",
         svgId: "12-Huqooq",
        baseVotes: 21184,
        seats: 1,
        isQuota: false,
      },
    ],
  },

  // ديالى
  {
    id: "diyala",
    nameAr: "ديالى",
    nameEn: "Diyala",

    eligible: 1365333,
    registeredOriginal: 1043840,
    voted: 599734,

    turnoutPercent: 43.9,
    boycottPercent: 56.1,

    totalSeats: 14,
    generalSeats: 14,
    quotaSeats: 0,

    parties: [
     
      {
        id: "diyala-party-1",
        name: "حزب تقليدي ١",
        svgId: "5-Badr-Organization",
        baseVotes: 105346,
        seats: 3,
        isQuota: false,
      },
      {
        id: "diyala-party-2",
        name: "حزب تقليدي ٢",
        svgId: "2-Progress-Party",
        baseVotes: 101691,
        seats: 3,
        isQuota: false,
      },
      {
        id: "diyala-party-3",
        name: "حزب تقليدي ٣",
        svgId: "9-Sovereignty-Alliance",
        baseVotes: 77496,
        seats: 2,
        isQuota: false,
      },
      {
        id: "diyala-party-4",
        name: "حزب تقليدي ٤",
        svgId: "4-Al-Sadiqoun-Bloc",
        baseVotes: 55409,
        seats: 2,
        isQuota: false,
      },
      {
        id: "diyala-party-5",
        name: "حزب تقليدي ٥",
        svgId: "8-Azem-Alliance",
        baseVotes: 54939,
        seats: 2,
        isQuota: false,
      },
      {
        id: "diyala-party-6",
        name: "حزب تقليدي ٦",
        svgId: "32-Diyala-First-Coalition",
        baseVotes: 53469,
        seats: 1,
        isQuota: false,
      },
      {
        id: "diyala-party-7",
        name: "حزب تقليدي ٧",
        svgId: "38-Thabitun",
        baseVotes: 30449,
        seats: 1,
        isQuota: false,
      },
    ],
  },

  // دهوك
  {
    id: "duhok",
    nameAr: "دهوك",
    nameEn: "Duhok",

    eligible: 1053284,
    registeredOriginal: 805269,
    voted: 624971,

    turnoutPercent: 59.3,
    boycottPercent: 40.7,

    totalSeats: 12,
    generalSeats: 11,
    quotaSeats: 1,

    parties: [
     
      {
        id: "duhok-party-1",
        name: "حزب تقليدي ١",
        svgId: "1-Kurdistan-Democratic-Party",
        
        baseVotes: 413890,
        seats: 9,
        isQuota: false,
      },
      {
        id: "duhok-party-2",
        name: "حزب تقليدي ٢",
        svgId: "17-Kurdistan-Islamic-Union",
        baseVotes: 72986,
        seats: 2,
        isQuota: false,
      },
      {
        id: "duhok-quota-1",
        name: "قائمة كوتا ١",
        
        baseVotes: 22838,
        seats: 1,
        isQuota: true, // مسيحي
      },
    ],
  },

  // السليمانية
  {
    id: "sulaymaniyah",
    nameAr: "السليمانية",
    nameEn: "Sulaymaniyah",

    eligible: 1605506,
    registeredOriginal: 1227460,
    voted: 742256,

    turnoutPercent: 46.2,
    boycottPercent: 53.8,

    totalSeats: 18,
    generalSeats: 18,
    quotaSeats: 0,

    parties: [
    
      {
        id: "sulaymaniyah-party-1",
        name: "حزب تقليدي ١",
         svgId: "6-Patriotic-Union-of-Kurdistan",
        baseVotes: 241143,
        seats: 8,
        isQuota: false,
      },
      {
        id: "sulaymaniyah-party-2",
        name: "حزب تقليدي ٢",
         svgId: "18-National-Stance-Movement",
        baseVotes: 75375,
        seats: 3,
        isQuota: false,
      },
      {
        id: "sulaymaniyah-party-3",
        name: "حزب تقليدي ٣",
         svgId: "19-New-Generation-Movement",
        baseVotes: 69781,
        seats: 2,
        isQuota: false,
      },
      {
        id: "sulaymaniyah-party-4",
        name: "حزب تقليدي ٤",
         svgId: "1-Kurdistan-Democratic-Party",
        baseVotes: 68834,
        seats: 2,
        isQuota: false,
      },
      {
        id: "sulaymaniyah-party-5",
        name: "حزب تقليدي ٥",
         svgId: "17-Kurdistan-Islamic-Union",
        baseVotes: 65312,
        seats: 2,
        isQuota: false,
      },
      {
        id: "sulaymaniyah-party-6",
        name: "حزب تقليدي ٦",
         svgId: "36-Kurdistan-Justice-Group",
        baseVotes: 34563,
        seats: 1,
        isQuota: false,
      },
    ],
  },

  // واسط
  {
    id: "wassit",
    nameAr: "واسط",
    nameEn: "Wassit",

    eligible: 1009196,
    registeredOriginal: 771562,
    voted: 368224,

    turnoutPercent: 36.5,
    boycottPercent: 63.5,

    totalSeats: 12,
    generalSeats: 11,
    quotaSeats: 1,

    parties: [
    
      {
        id: "wassit-party-1",
        name: "حزب تقليدي ١",
        svgId: "22-Wasit-Ajmal-Alliance",
        baseVotes: 106152,
        seats: 4,
        isQuota: false,
      },
      {
        id: "wassit-party-2",
        name: "حزب تقليدي ٢",
        svgId: "3-State-of-Law-Coalition",
        baseVotes: 58385,
        seats: 2,
        isQuota: false,
      },
      {
        id: "wassit-party-3",
        name: "حزب تقليدي ٣",
        svgId: "0-Reconstruction-and-Development-Coalition",
        baseVotes: 51269,
        seats: 2,
        isQuota: false,
      },
      {
        id: "wassit-party-4",
        name: "حزب تقليدي ٤",
        svgId: "4-Al-Sadiqoun-Bloc",
        baseVotes: 37291,
        seats: 2,
        isQuota: false,
      },
      {
        id: "wassit-party-5",
        name: "حزب تقليدي ٥",
        svgId: "7-National-State-Forces",
        baseVotes: 35794,
        seats: 1,
        isQuota: false,
      },
      {
        id: "wassit-quota-1",
        name: "قائمة كوتا ١",
        
        baseVotes: 17188,
        seats: 1,
        isQuota: true, // كورد فيلي
      },
    ],
  },

  // كركوك
  {
    id: "kirkuk",
    nameAr: "كركوك",
    nameEn: "Kirkuk",

    eligible: 1246864,
    registeredOriginal: 953267,
    voted: 621773,

    turnoutPercent: 49.9,
    boycottPercent: 50.1,

    totalSeats: 13,
    generalSeats: 12,
    quotaSeats: 1,

    parties: [
     
      {
        id: "kirkuk-party-1",
        name: "حزب تقليدي ١",
        svgId: "6-Patriotic-Union-of-Kurdistan",
        baseVotes: 178845,
        seats: 4,
        isQuota: false,
      },
      {
        id: "kirkuk-party-2",
        name: "حزب تقليدي ٢",
        svgId: "2-Progress-Party",
        baseVotes: 107037,
        seats: 3,
        isQuota: false,
      },
      {
        id: "kirkuk-party-3",
        name: "حزب تقليدي ٣",
        svgId: "27-Unified-Iraqi-Turkmen-Front",
        baseVotes: 66179,
        seats: 2,
        isQuota: false,
      },
      {
        id: "kirkuk-party-4",
        name: "حزب تقليدي ٤",
        svgId: "1-Kurdistan-Democratic-Party",
        baseVotes: 59374,
        seats: 1,
        isQuota: false,
      },
      {
        id: "kirkuk-party-5",
        name: "حزب تقليدي ٥",
        svgId: "33-Arab-Alliance-in-Kirkuk",
        baseVotes: 53046,
        seats: 1,
        isQuota: false,
      },
      {
        id: "kirkuk-party-6",
        name: "حزب تقليدي ٦",
        svgId: "8-Azem-Alliance",
        baseVotes: 46412,
        seats: 1,
        isQuota: false,
      },
      {
        id: "kirkuk-quota-1",
        name: "قائمة كوتا ١",
        
        baseVotes: 17680,
        seats: 1,
        isQuota: true, // مسيحي
      },
    ],
  },

  // كربلاء
  {
    id: "kerbala",
    nameAr: "كربلاء",
    nameEn: "Kerbala",

    eligible: 871190,
    registeredOriginal: 666052,
    voted: 316770,

    turnoutPercent: 36.4,
    boycottPercent: 63.6,

    totalSeats: 11,
    generalSeats: 11,
    quotaSeats: 0,

    parties: [
     
      {
        id: "kerbala-party-1",
        name: "حزب تقليدي ١",
        svgId: "0-Reconstruction-and-Development-Coalition",
        baseVotes: 78388,
        seats: 3,
        isQuota: false,
      },
      {
        id: "kerbala-party-2",
        name: "حزب تقليدي ٢",
        svgId: "3-State-of-Law-Coalition",
        baseVotes: 59314,
        seats: 2,
        isQuota: false,
      },
      {
        id: "kerbala-party-3",
        name: "حزب تقليدي ٣",
        svgId: "14-Ishraqat-Kanoon",
        baseVotes: 42814,
        seats: 2,
        isQuota: false,
      },
      {
        id: "kerbala-party-4",
        name: "حزب تقليدي ٤",
        svgId: "10-Fundamental",
        baseVotes: 27715,
        seats: 1,
        isQuota: false,
      },
      {
        id: "kerbala-party-5",
        name: "حزب تقليدي ٥",
        svgId: "4-Al-Sadiqoun-Bloc",
        baseVotes: 26816,
        seats: 1,
        isQuota: false,
      },
      {
        id: "kerbala-party-6",
        name: "حزب تقليدي ٦",
        svgId: "7-National-State-Forces",
        baseVotes: 22262,
        seats: 1,
        isQuota: false,
      },
      {
        id: "kerbala-party-7",
        name: "حزب تقليدي ٧",
        svgId: "5-Badr-Organization",
        baseVotes: 20299,
        seats: 1,
        isQuota: false,
      },
    ],
  },

  // نينوى
  {
    id: "ninawa",
    nameAr: "نينوى",
    nameEn: "Ninawa",

    eligible: 2719600,
    registeredOriginal: 2079220,
    voted: 1356152,

    turnoutPercent: 49.9,
    boycottPercent: 50.1,

    totalSeats: 34,
    generalSeats: 31,
    quotaSeats: 3,

    parties: [
    

      {
        id: "ninawa-party-1",
        name: "حزب تقليدي ١",
        svgId: "1-Kurdistan-Democratic-Party",
        baseVotes: 189535,
        seats: 5,
        isQuota: false,
      },
      {
        id: "ninawa-party-2",
        name: "حزب تقليدي ٢",
        svgId: "2-Progress-Party",
        baseVotes: 157958,
        seats: 4,
        isQuota: false,
      },
      {
        id: "ninawa-party-3",
        name: "حزب تقليدي ٣",
        svgId: "0-Reconstruction-and-Development-Coalition",
        baseVotes: 146859,
        seats: 4,
        isQuota: false,
      },
      {
        id: "ninawa-party-4",
        name: "حزب تقليدي ٤",
        svgId: "21-Nineveh-For-Its-People",
        baseVotes: 111225,
        seats: 3,
        isQuota: false,
      },
      {
        id: "ninawa-party-5",
        name: "حزب تقليدي ٥",
        svgId: "8-Azem-Alliance",
        baseVotes: 101035,
        seats: 3,
        isQuota: false,
      },
      {
        id: "ninawa-party-6",
        name: "حزب تقليدي ٦",
        svgId: "8-Azem-Alliance",
        baseVotes: 86656,
        seats: 2,
        isQuota: false,
      },
      {
        id: "ninawa-party-7",
        name: "حزب تقليدي ٧",
        svgId: "5-Badr-Organization",
        baseVotes: 77046,
        seats: 2,
        isQuota: false,
      },
      {
        id: "ninawa-party-8",
        name: "حزب تقليدي ٨",
        svgId: "9-Sovereignty-Alliance",
        baseVotes: 64545,
        seats: 2,
        isQuota: false,
      },
      {
        id: "ninawa-party-9",
        name: "حزب تقليدي ٩",
        svgId: "30-Nineveh-People-Union",
        baseVotes: 56420,
        seats: 2,
        isQuota: false,
      },
      {
        id: "ninawa-party-10",
        name: "حزب تقليدي ١٠",
        svgId: "31-Arab-Project",
        baseVotes: 54573,
        seats: 1,
        isQuota: false,
      },
      {
        id: "ninawa-party-11",
        name: "حزب تقليدي ١١",
        svgId: "35-National-Identity",
        baseVotes: 50200,
        seats: 1,
        isQuota: false,
      },
      {
        id: "ninawa-party-12",
        name: "حزب تقليدي ١٢",
        svgId: "37-Yazidi-Cause-Alliance",
        baseVotes: 49211,
        seats: 1,
        isQuota: false,
      },
      {
        id: "ninawa-party-13",
        name: "حزب تقليدي ١٣",
        svgId: "26-National-Party-of-the-Masses",
        baseVotes: 37381,
        seats: 1,
        isQuota: false,
      },

      {
        id: "ninawa-quota-1",
        name: "قائمة كوتا ١",
        baseVotes: 10501,
        seats: 1,
        isQuota: true, // شبكي
      },
      {
        id: "ninawa-quota-2",
        name: "قائمة كوتا ٢",
        baseVotes: 9687,
        seats: 1,
        isQuota: true, // ايزيدي
      },
      {
        id: "ninawa-quota-3",
        name: "قائمة كوتا ٣",
        baseVotes: 6234,
        seats: 1,
        isQuota: true, // مسيحي
      },
    ],
  },

  // ميسان
  {
    id: "maysan",
    nameAr: "ميسان",
    nameEn: "Maysan",

    eligible: 796847,
    registeredOriginal: 609215,
    voted: 256988,

    turnoutPercent: 32.3,
    boycottPercent: 67.7,

    totalSeats: 10,
    generalSeats: 10,
    quotaSeats: 0,

    parties: [
      
      {
        id: "maysan-party-1",
        name: "حزب تقليدي ١",
          svgId: "0-Reconstruction-and-Development-Coalition",
        baseVotes: 67122,
        seats: 3,
        isQuota: false,
      },
      {
        id: "maysan-party-2",
        name: "حزب تقليدي ٢",
          svgId: "5-Badr-Organization",
        baseVotes: 44029,
        seats: 2,
        isQuota: false,
      },
      {
        id: "maysan-party-3",
        name: "حزب تقليدي ٣",
          svgId: "3-State-of-Law-Coalition",
        baseVotes: 34706,
        seats: 2,
        isQuota: false,
      },
      {
        id: "maysan-party-4",
        name: "حزب تقليدي ٤",
          svgId: "4-Al-Sadiqoun-Bloc",
        baseVotes: 34590,
        seats: 2,
        isQuota: false,
      },
      {
        id: "maysan-party-5",
        name: "حزب تقليدي ٥",
          svgId: "7-National-State-Forces",
        baseVotes: 31744,
        seats: 1,
        isQuota: false,
      },
    ],
  },
];
