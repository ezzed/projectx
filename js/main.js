/* ============================================================
   1) تحميل الهيدر ديناميكياً + انتظار عناصره
============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    const waitHeader = setInterval(() => {

        const themeButtons = document.querySelectorAll(".theme-toggle");
        const menuToggle   = document.getElementById("menuToggle");
        const mobileMenu   = document.getElementById("mobileMenu");
        const submenuToggle = document.querySelector(".submenu-toggle");
        const submenu       = document.querySelector(".submenu");

        // نتأكد أن جميع عناصر الهيدر أصبحت موجودة
        if (themeButtons.length && menuToggle && mobileMenu) {
            clearInterval(waitHeader);

            /* ===============================
               A) تفعيل قائمة المحافظات (Submenu)
            =============================== */
            if (submenuToggle && submenu) {
                submenuToggle.addEventListener("click", (e) => {
                    e.stopPropagation();       // منع إغلاق القائمة
                    submenu.classList.toggle("open");
                    submenuToggle.classList.toggle("open");
                });
            }

            /* ===============================
               B) تحميل آخر ثيم محفوظ
            =============================== */
            const savedTheme = localStorage.getItem("theme") || "light";
            applyTheme(savedTheme);

            themeButtons.forEach(btn => {
                btn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
            });

            /* ===============================
               C) زر تغيير الثيم
            =============================== */
            themeButtons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
                    applyTheme(newTheme);
                    localStorage.setItem("theme", newTheme);

                    themeButtons.forEach(b => {
                        b.textContent = newTheme === "dark" ? "☀️" : "🌙";
                    });
                });
            });

            /* ===============================
               D) فتح / غلق قائمة الموبايل
            =============================== */
            menuToggle.addEventListener("click", (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle("open");
                menuToggle.classList.toggle("is-open");
            });

            /* ===============================
               E) إغلاق القائمة عند الضغط خارجها
               (أفضل حل لجميع الأجهزة)
            =============================== */
            function closeMenu(e) {
                if (
                    mobileMenu.classList.contains("open") &&
                    !mobileMenu.contains(e.target) &&
                    !menuToggle.contains(e.target)
                ) {
                    mobileMenu.classList.remove("open");
                    menuToggle.classList.remove("is-open");
                }
            }

            document.addEventListener("pointerdown", closeMenu);

/* ===============================
   F) عند الضغط على "تواصل معنا"
   → يغلق القائمة + ينتقل للفوتر
   (نسخة محسّنة وبدون إعادة توجيه)
=============================== */
document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href*="#contact"]');
    if (!link) return;   // إذا الضغط ليس على تواصل معنا → تجاهل

    e.preventDefault(); // منع الانتقال الافتراضي

    const mobileMenu = document.getElementById("mobileMenu");
    const menuToggle = document.getElementById("menuToggle");

    // إغلاق المنيو إن كانت مفتوحة
    if (mobileMenu) mobileMenu.classList.remove("open");
    if (menuToggle) menuToggle.classList.remove("is-open");

    // انتظار إغلاق القائمة ثم النزول للفوتر
    setTimeout(() => {
        const footer = document.getElementById("contact");

        if (footer) {
            footer.scrollIntoView({ behavior: "smooth" });
        }
    }, 160);  // وقت الإغلاق
});


        }
    }, 100);
});



/* ============================================================
   2) تشغيل خريطة العراق — ربط المحافظات بالصفحات
============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    const mapFrame = document.getElementById("iraqMap");
    if (!mapFrame) return;

    mapFrame.addEventListener("load", () => {

        const svgDoc = mapFrame.contentDocument;
        if (!svgDoc) return;

        const states = svgDoc.querySelectorAll(".sm_state");

        const govMap = {
            "IQQA": "qadisiyyah.html",
            "IQBG": "baghdad.html",
            "IQSD": "salahaddin.html",
            "IQMA": "maysan.html",
            "IQNI": "ninawa.html",
            "IQWA": "wasit.html",
            "IQAR#": "erbil.html",
            "IQBB": "babel.html",
            "IQBA": "basra.html",
            "IQKI": "kirkuk.html",
            "IQDI": "diyala.html",
            "IQSU#": "sulaymaniyah.html",
            "IQAN": "anbar.html",
            "IQKA": "karbala.html",
            "IQDQ": "thiqar.html",
            "IQNA": "najaf.html",
            "IQMU": "muthanna.html",
            "IQDA#": "duhok.html"
        };

        // الضغط على المحافظات
        states.forEach(state => {
            state.style.cursor = "pointer";

            state.addEventListener("click", () => {
                const match = state.getAttribute("class").match(/sm_state_(IQ[A-Z]+)/);
                if (match && govMap[match[1]]) {
                    window.location.href = `governorates/${govMap[match[1]]}`;
                }
            });
        });

        /* ========== تأثير Hover للمس على التابلت/الموبايل ========== */
        const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

        if (isTouch) {
            svgDoc.addEventListener("touchmove", (e) => {
                const touch = e.touches[0];
                const el = svgDoc.elementFromPoint(touch.clientX, touch.clientY);

                states.forEach(s => s.style.fillOpacity = "");
                if (el && el.classList.contains("sm_state")) {
                    el.style.fillOpacity = "0.3";
                }
            });

            svgDoc.addEventListener("touchend", () => {
                setTimeout(() => states.forEach(s => s.style.fillOpacity = ""), 50);
            });

            svgDoc.addEventListener("touchcancel", () => {
                states.forEach(s => s.style.fillOpacity = "");
            });
        }
    });

});



/* ============================================================
   3) دالة تطبيق الثيم
============================================================ */
function applyTheme(mode) {
    const metaTheme = document.querySelector("#theme-color-meta");

    if (mode === "dark") {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
        if (metaTheme) metaTheme.setAttribute("content", "#0d0d0d");
    } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        if (metaTheme) metaTheme.setAttribute("content", "#1a10bf");
    }
}



/* ============================================================
   دعم اللمس للمرشح — إظهار الأيقونات عند الضغط في الموبايل
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.candidate-photo-wrapper').forEach(wrapper => {
        wrapper.addEventListener('touchstart', () => {
            wrapper.classList.toggle('show-icons');
        });
    });

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll('.candidate-photo-wrapper').forEach(wrapper => {
        
        const photo = wrapper.querySelector('.candidate-photo');

        // Click on the image toggles icons
        photo.addEventListener('click', (e) => {
            e.stopPropagation();
            wrapper.classList.toggle('icons-active');
        });

        // Touch on mobile toggles icons
        photo.addEventListener('touchstart', (e) => {
            e.preventDefault();
            wrapper.classList.toggle('icons-active');
        });

    });

});



});


