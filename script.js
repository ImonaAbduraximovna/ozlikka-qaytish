/* ========== TAYMER ========== */

const retritKuni = new Date("2026-07-18T00:00:00").getTime();

const kunlarEl = document.getElementById("kunlar");
const soatlarEl = document.getElementById("soatlar");
const daqiqalarEl = document.getElementById("daqiqalar");
const soniyalarEl = document.getElementById("soniyalar");

function taymerniYangilash() {

    const hozir = new Date().getTime();
    const farq = retritKuni - hozir;

    if (farq < 0) {
        if (kunlarEl) kunlarEl.textContent = "00";
        if (soatlarEl) soatlarEl.textContent = "00";
        if (daqiqalarEl) daqiqalarEl.textContent = "00";
        if (soniyalarEl) soniyalarEl.textContent = "00";
        return;
    }

    const kunlar = Math.floor(farq / (1000 * 60 * 60 * 24));
    const soatlar = Math.floor((farq % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const daqiqalar = Math.floor((farq % (1000 * 60 * 60)) / (1000 * 60));
    const soniyalar = Math.floor((farq % (1000 * 60)) / 1000);

    if (kunlarEl) kunlarEl.textContent = String(kunlar).padStart(2, '0');
    if (soatlarEl) soatlarEl.textContent = String(soatlar).padStart(2, '0');
    if (daqiqalarEl) daqiqalarEl.textContent = String(daqiqalar).padStart(2, '0');
    if (soniyalarEl) soniyalarEl.textContent = String(soniyalar).padStart(2, '0');

}

taymerniYangilash();
setInterval(taymerniYangilash, 1000);


/* ========== FAQ — Savol-javob ochilishi ========== */

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(function (item) {

    const savol = item.querySelector('.faq-savol');

    if (savol) {

        savol.addEventListener('click', function () {

            const isActive = item.classList.contains('faol');

            // Avval hammasini yopish
            faqItems.forEach(function (boshqa) {
                boshqa.classList.remove('faol');
            });

            // Agar yopiq bo'lsa — ochish
            if (!isActive) {
                item.classList.add('faol');
            }

        });

    }

});


/* ========== LEAD FORMA ========== */

const leadForma = document.getElementById("leadForma");

if (leadForma) {

    leadForma.addEventListener("submit", function (e) {

        e.preventDefault();

        const ism = document.getElementById("ism").value.trim();
        const tel = document.getElementById("tel").value.trim();
        const email = document.getElementById("email").value.trim();

        if (ism === "") {
            alert("⚠️ Илтимос, исмингизни киритинг!");
            document.getElementById("ism").focus();
            return;
        }

        if (tel === "") {
            alert("⚠️ Илтимос, телефон рақамингизни киритинг!");
            document.getElementById("tel").focus();
            return;
        }

        if (tel.length < 9) {
            alert("⚠️ Телефон рақамингиз тўлиқ эмас!");
            document.getElementById("tel").focus();
            return;
        }

        alert(
            "✅ Раҳмат, " + ism + "!\n\n" +
            "Сизнинг сўровингиз қабул қилинди.\n" +
            "Тез орада сиз билан боғланамиз.\n\n" +
            "🌿 Космик Шифо Академияси"
        );

        console.log("📩 Янги ариза:");
        console.log("   Исм:", ism);
        console.log("   Телефон:", tel);
        console.log("   Email:", email || "(киритилмаган)");

        leadForma.reset();

    });

}


/* ========== SMOOTH SCROLL ========== */

const ankerLinklar = document.querySelectorAll('a[href^="#"]');

ankerLinklar.forEach(function (link) {

    link.addEventListener("click", function (e) {

        const targetId = link.getAttribute("href");
        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });

});


/* ========== SCROLL ANIMATSIYA ========== */

const animatsionElementlar = document.querySelectorAll(
    ".dastur-karta, .shart-karta, .natija-item, .narx-karta, .taymer-katak, .sharh-karta, .bonus-karta, .kun-karta, .faq-item"
);

const kuzatuvchi = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            kuzatuvchi.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

animatsionElementlar.forEach(function (el, index) {

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    el.style.transitionDelay = (index % 4 * 0.1) + "s";

    kuzatuvchi.observe(el);

});


/* ========== SCROLL PROGRESS BAR ========== */

const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', function () {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = scrolled + '%';
});


/* ========== TEPAGA QAYTISH TUGMASI ========== */

const tepagaTugma = document.createElement('button');
tepagaTugma.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
tepagaTugma.className = 'tepaga-tugma';
tepagaTugma.style.cssText = `
    position:fixed;
    bottom:30px;
    right:30px;
    width:50px;
    height:50px;
    background:#C9A961;
    color:#FFFFFF;
    border:none;
    border-radius:50%;
    cursor:pointer;
    font-size:18px;
    box-shadow:0 5px 20px rgba(201,169,97,0.4);
    opacity:0;
    visibility:hidden;
    transition:0.3s;
    z-index:100;
`;

document.body.appendChild(tepagaTugma);

window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
        tepagaTugma.style.opacity = '1';
        tepagaTugma.style.visibility = 'visible';
    } else {
        tepagaTugma.style.opacity = '0';
        tepagaTugma.style.visibility = 'hidden';
    }
});

tepagaTugma.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

tepagaTugma.addEventListener('mouseenter', function () {
    tepagaTugma.style.background = '#A88845';
    tepagaTugma.style.transform = 'translateY(-3px)';
});

tepagaTugma.addEventListener('mouseleave', function () {
    tepagaTugma.style.background = '#C9A961';
    tepagaTugma.style.transform = 'translateY(0)';
});


/* ========== TELEFON FORMATI ========== */

const telInput = document.getElementById('tel');

if (telInput) {

    telInput.addEventListener('input', function (e) {

        let value = e.target.value.replace(/\D/g, '');

        if (value.startsWith('998')) {
            value = '+' + value;
        } else if (value.length > 0 && !value.startsWith('+')) {
            if (value.length <= 9) {
                value = '+998' + value;
            }
        }

        if (value.length > 4) {
            let formatted = value.slice(0, 4);
            if (value.length > 4) formatted += ' ' + value.slice(4, 6);
            if (value.length > 6) formatted += ' ' + value.slice(6, 9);
            if (value.length > 9) formatted += ' ' + value.slice(9, 11);
            if (value.length > 11) formatted += ' ' + value.slice(11, 13);
            e.target.value = formatted;
        } else {
            e.target.value = value;
        }

    });

}


/* ========== STATISTIKA RAQAM SAYANISH ========== */

const statRaqamlar = document.querySelectorAll('.stat-raqam');

const statKuzatuvchi = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            const el = entry.target;
            const matn = el.textContent;
            const hadafRaqam = parseInt(matn.replace(/\D/g, ''));
            const qoshimcha = matn.replace(/[0-9]/g, '');

            let hozir = 0;
            const oraliq = Math.ceil(hadafRaqam / 50);
            const tezlik = 30;

            const timer = setInterval(function () {

                hozir += oraliq;

                if (hozir >= hadafRaqam) {
                    el.textContent = hadafRaqam + qoshimcha;
                    clearInterval(timer);
                } else {
                    el.textContent = hozir + qoshimcha;
                }

            }, tezlik);

            statKuzatuvchi.unobserve(el);

        }

    });

}, { threshold: 0.5 });

statRaqamlar.forEach(function (el) {
    statKuzatuvchi.observe(el);
});


/* ========== HERO RASM PARALLAX ========== */

const heroRasm = document.querySelector('.hero-rasm');

if (heroRasm) {

    window.addEventListener('scroll', function () {

        const scrolled = window.scrollY;

        // Faqat hero balandligi ichida
        if (scrolled < window.innerHeight) {
            const harakat = scrolled * 0.3;
            heroRasm.style.transform = `translateY(${harakat}px)`;
        }

    });

}


/* ========== KONSOL XABAR ========== */

console.log("%c🌿 КОСМИК ШИФО АКАДЕМИЯСИ", 
    "color:#C9A961; font-size:20px; font-weight:bold;");
console.log("%cЎЗЛИККА ҚАЙТИШ — Грузия Ретрити", 
    "color:#3D2817; font-size:14px;");
console.log("%c18 — 28 ИЮЛЬ 2026", 
    "color:#6B5D4F; font-size:12px;");
console.log("%cЖойлар чекланган!", 
    "color:#C9A961; font-size:12px; font-style:italic;");