function injectHeadMeta() {
    // منع التكرار
    if (document.querySelector("link[data-auto='favicon']")) return;

    const head = document.head;

    // كشف المسار الصحيح بناءً على مستوى الصفحة
    const basePath = location.pathname.split("/").length > 2
        ? "../assets/icons/"
        : "assets/icons/";

    const tags = `
        <link data-auto="favicon" rel="icon" type="image/x-icon" href="${basePath}favicon.ico">
        <link data-auto="favicon" rel="icon" type="image/png" href="${basePath}union-logo.png">
        <link data-auto="favicon" rel="apple-touch-icon" href="${basePath}union-logo-180.png">
        <link data-auto="favicon" rel="manifest" href="${basePath}site.webmanifest">
        <meta data-auto="favicon" name="theme-color" content="#1a10bf">
    `;

    head.insertAdjacentHTML("beforeend", tags);
}





// =====================================================
//         تحميل الهيدر + الفوتر فقط (بدون مزايا أخرى)
// =====================================================

async function loadLayout() {

    // ✔ إضافة الأيقونات قبل تحميل الهيدر
    injectHeadMeta();

    const headerContainer = document.querySelector("#header");
    const footerContainer = document.querySelector("#footer");

    try {

        // ======================= تحميل الهيدر =======================
        if (headerContainer) {

            // كشف المسار الصحيح للهيدر ديناميكياً
            const headerPath = location.pathname.split("/").length > 2
                ? "../header.html"
                : "header.html";

            const header = await fetch(headerPath).then(r => r.text());
            headerContainer.innerHTML = header;

            // 🔥 هذه النقطة مهمة:
            // main.js هو المسؤول عن:
            // - فتح/غلق المنيو
            // - الثيم وتخزينه
            // - إغلاق القائمة عند الضغط خارجها
            // - القائمة الفرعية
            // لذلك لا نكرر أي شيء هنا حتى لا نسبب تضارب.

            // ✔ فقط نضيف (ميزة واحدة آمنة جداً):
            // — جعل اللوغو يرجع للصفحة الرئيسية دائماً
            const logoLink = headerContainer.querySelector(".logo");
            if (logoLink) {
                const homePath = location.pathname.split("/").length > 2
                    ? "../index.html"
                    : "index.html";
                logoLink.setAttribute("href", homePath);
            }
        }


        // ======================= تحميل الفوتر =======================
        if (footerContainer) {

            const footerPath = location.pathname.split("/").length > 2
                ? "../footer.html"
                : "footer.html";

            const footer = await fetch(footerPath).then(r => r.text());
            footerContainer.innerHTML = footer;
        }

    } catch (err) {
        console.error("Error loading header/footer:", err);
    }


    // =====================================================
    //         زر "تواصل معنا" + تأثير الغلو فقط
    // =====================================================

    // ⭐ هذه الميزة غير موجودة في main.js → إضافة آمنة
    const contactBtn   = document.querySelector('a[href="#contact"]');
    const glowElement  = document.querySelector(".glow-target");

    if (contactBtn && glowElement) {
        contactBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const contactSection = document.querySelector("#contact");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
            }

            glowElement.classList.add("glow-active");
            setTimeout(() => glowElement.classList.remove("glow-active"), 5000);
        });
    }


    // =====================================================
    //            نظام الأكورديون (غير موجود في main.js)
    // =====================================================

    document.querySelectorAll(".accordion-btn").forEach(btn => {
        btn.addEventListener("click", () => {

            const content = btn.nextElementSibling;
            if (!content) return;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.classList.remove("open");
                btn.querySelector(".icon").textContent = "+";

            } else {
                document.querySelectorAll(".accordion-content").forEach(c => {
                    c.style.maxHeight = null;
                    c.classList.remove("open");
                });

                document.querySelectorAll(".accordion-btn .icon").forEach(i => {
                    i.textContent = "+";
                });

                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add("open");
                btn.querySelector(".icon").textContent = "×";
            }
        });
    });

}

loadLayout();
