// نعتبر الصفحة "داخل فولدر" فقط إذا كانت داخل governorates
const isNested = window.location.pathname.includes("/governorates/");

function injectHeadMeta() {
    // منع التكرار
    if (document.querySelector("link[data-auto='favicon']")) return;

    const head = document.head;

    // لو الصفحة داخل governorates نطلع مستوى واحد لفوق
    const basePath = isNested ? "../assets/icons/" : "assets/icons/";

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
            const headerPath = isNested ? "../header.html" : "header.html";
            const header = await fetch(headerPath).then(r => r.text());
            headerContainer.innerHTML = header;

            // جعل اللوغو يرجع للصفحة الرئيسية دائماً
            const logoLink = headerContainer.querySelector(".logo");
            if (logoLink) {
                const homePath = isNested ? "../index.html" : "index.html";
                logoLink.setAttribute("href", homePath);
            }
        }

        // ======================= تحميل الفوتر =======================
        if (footerContainer) {
            const footerPath = isNested ? "../footer.html" : "footer.html";
            const footer = await fetch(footerPath).then(r => r.text());
            footerContainer.innerHTML = footer;
        }

    } catch (err) {
        console.error("Error loading header/footer:", err);
    }

    // =====================================================
    //            نظام الأكورديون
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
