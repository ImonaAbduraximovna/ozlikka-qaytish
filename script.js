// ========== TAYMER ==========
// Retrit boshlanish sanasi: 18 Iyul 2026

const retritSana = new Date('2026-07-18T00:00:00').getTime();

function taymerYangilash() {
    const hozir = new Date().getTime();
    const farq = retritSana - hozir;

    if (farq < 0) {
        document.getElementById('kunlar').textContent = '00';
        document.getElementById('soatlar').textContent = '00';
        document.getElementById('daqiqalar').textContent = '00';
        document.getElementById('soniyalar').textContent = '00';
        return;
    }

    const kunlar = Math.floor(farq / (1000 * 60 * 60 * 24));
    const soatlar = Math.floor((farq % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const daqiqalar = Math.floor((farq % (1000 * 60 * 60)) / (1000 * 60));
    const soniyalar = Math.floor((farq % (1000 * 60)) / 1000);

    document.getElementById('kunlar').textContent = String(kunlar).padStart(2, '0');
    document.getElementById('soatlar').textContent = String(soatlar).padStart(2, '0');
    document.getElementById('daqiqalar').textContent = String(daqiqalar).padStart(2, '0');
    document.getElementById('soniyalar').textContent = String(soniyalar).padStart(2, '0');
}

taymerYangilash();
setInterval(taymerYangilash, 1000);


// ========== FAQ AKKORDION ==========

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const savol = item.querySelector('.faq-savol');
    
    savol.addEventListener('click', () => {
        const faolMi = item.classList.contains('faol');
        
        // Boshqalarni yopish
        faqItems.forEach(i => i.classList.remove('faol'));
        
        // Agar bu yopiq bo'lsa, ochish
        if (!faolMi) {
            item.classList.add('faol');
        }
    });
});


// ========== SMOOTH SCROLL ==========

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ========== SCROLL PROGRESS BAR ==========

const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFoiz = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollFoiz + '%';
});


// ========== INTERSECTION OBSERVER (SCROLL ANIMATIONS) ==========

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Kuzatiladigan elementlar
const animElements = document.querySelectorAll(
    '.shart-karta, .dastur-karta, .kun-karta, .natija-item, .sharh-karta, .bonus-karta, .faq-item, .taymer-katak'
);

animElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});


// ========== LEAD FORMA ==========

const leadForma = document.getElementById('leadForma');

if (leadForma) {
    leadForma.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const ism = document.getElementById('ism').value.trim();
        const tel = document.getElementById('tel').value.trim();
        const email = document.getElementById('email').value.trim();
        
        // Tekshirish
        if (ism.length < 2) {
            alert('⚠️ Iltimos, ismingizni to\'liq kiriting!');
            return;
        }
        
        if (tel.length < 9) {
            alert('⚠️ Iltimos, to\'g\'ri telefon raqam kiriting!');
            return;
        }
        
        // WhatsApp ga yuborish
        const xabar = `Assalomu alaykum! Men retritga yozilmoqchiman.%0A%0A👤 Ism: ${ism}%0A📞 Tel: ${tel}%0A📧 Email: ${email || 'yo\'q'}`;
        const whatsappUrl = `https://wa.me/998333215577?text=${xabar}`;
        
        // Muvaffaqiyat xabari
        alert('✅ Rahmat! Sizning ma\'lumotlaringiz qabul qilindi.\n\nWhatsApp orqali siz bilan tez orada bog\'lanamiz.');
        
        // WhatsApp ochish
        window.open(whatsappUrl, '_blank');
        
        // Forma tozalash
        leadForma.reset();
    });
}


// ========== TELEFON FORMAT ==========

const telInput = document.getElementById('tel');
if (telInput) {
    telInput.addEventListener('input', function(e) {
        let qiymat = e.target.value.replace(/\D/g, '');
        
        if (qiymat.startsWith('998')) {
            qiymat = qiymat.substring(3);
        }
        
        let format = '';
        if (qiymat.length > 0) format = '+998 ';
        if (qiymat.length > 0) format += qiymat.substring(0, 2);
        if (qiymat.length > 2) format += ' ' + qiymat.substring(2, 5);
        if (qiymat.length > 5) format += ' ' + qiymat.substring(5, 7);
        if (qiymat.length > 7) format += ' ' + qiymat.substring(7, 9);
        
        e.target.value = format;
    });
}


// ========== STAT RAQAMLAR COUNT-UP ==========

const statRaqamlar = document.querySelectorAll('.stat-raqam');

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const matn = el.textContent;
            const raqam = parseInt(matn.replace(/\D/g, ''));
            const qoshimcha = matn.replace(/\d/g, '');
            
            if (!isNaN(raqam) && raqam > 0) {
                let hozir = 0;
                const qadam = Math.ceil(raqam / 50);
                const interval = setInterval(() => {
                    hozir += qadam;
                    if (hozir >= raqam) {
                        hozir = raqam;
                        clearInterval(interval);
                    }
                    el.textContent = hozir + qoshimcha;
                }, 30);
            }
            
            statObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statRaqamlar.forEach(el => statObserver.observe(el));


// ========== HERO RASM PARALLAX ==========

const heroRasm = document.querySelector('.hero-rasm-konteyner');

if (heroRasm) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < 800) {
            heroRasm.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}


// ========== KONSOL XABARI ==========

console.log('%c✨ КОСМИК ШИФО АКАДЕМИЯСИ ✨', 'color: #C9A961; font-size: 24px; font-weight: bold; font-family: serif;');
console.log('%c🌟 Ўзликка қайтиш ретрити - 2026 🌟', 'color: #A88845; font-size: 16px; font-style: italic;');
console.log('%c💛 Сайт яратилди билан муҳаббат 💛', 'color: #D4B873; font-size: 14px;');

// ========== TUNGI REJIM ==========

const rejimTugma = document.getElementById('rejimTugma');
const rejimIkon = rejimTugma.querySelector('i');

// localStorage'dan o'qish
const tanlanganRejim = localStorage.getItem('rejim');
if (tanlanganRejim === 'tungi') {
    document.body.classList.add('tungi');
    rejimIkon.classList.remove('fa-moon');
    rejimIkon.classList.add('fa-sun');
}

rejimTugma.addEventListener('click', () => {
    document.body.classList.toggle('tungi');
    
    if (document.body.classList.contains('tungi')) {
        rejimIkon.classList.remove('fa-moon');
        rejimIkon.classList.add('fa-sun');
        localStorage.setItem('rejim', 'tungi');
    } else {
        rejimIkon.classList.remove('fa-sun');
        rejimIkon.classList.add('fa-moon');
        localStorage.setItem('rejim', 'kunduzgi');
    }
});


// ========== TIL ALMASHTIRISH — TO'LIQ ==========

const tilTugma = document.getElementById('tilTugma');
const tilMatn = tilTugma.querySelector('.til-matn');

// Krill → Lotin lug'ati
const krillLotin = {
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
    'Ж': 'J', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
    'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'X', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh',
    'Ъ': "'", 'Ы': 'I', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
    'Ў': "O'", 'Қ': 'Q', 'Ғ': "G'", 'Ҳ': 'H',
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'j', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'x', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh',
    'ъ': "'", 'ы': 'i', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'ў': "o'", 'қ': 'q', 'ғ': "g'", 'ҳ': 'h'
};

function krillToLotin(matn) {
    let natija = '';
    for (let i = 0; i < matn.length; i++) {
        const harf = matn[i];
        natija += krillLotin[harf] !== undefined ? krillLotin[harf] : harf;
    }
    return natija;
}

// Saqlanmasligi kerak bo'lgan elementlar (script, style, va h.k)
const otkazibYuborish = ['SCRIPT', 'STYLE', 'CODE', 'PRE'];

function barchaMatnlarniTopish(element, lotinga) {
    // Agar bu element script/style bo'lsa, o'tkazib yuborish
    if (otkazibYuborish.includes(element.tagName)) {
        return;
    }
    
    // Element bolalarini ko'rib chiqish
    for (let i = 0; i < element.childNodes.length; i++) {
        const node = element.childNodes[i];
        
        // Agar bu matn tugun bo'lsa (TEXT_NODE)
        if (node.nodeType === 3) {
            const matn = node.nodeValue;
            
            // Bo'sh joy emas bo'lsa
            if (matn && matn.trim()) {
                // Asl matnni saqlash
                if (!node.aslMatn) {
                    node.aslMatn = matn;
                }
                
                if (lotinga) {
                    node.nodeValue = krillToLotin(node.aslMatn);
                } else {
                    node.nodeValue = node.aslMatn;
                }
            }
        }
        // Agar bu element bo'lsa, ichiga kirish
        else if (node.nodeType === 1) {
            barchaMatnlarniTopish(node, lotinga);
        }
    }
}

function tilniAlmashtirish(lotinga) {
    // Body ichidagi barcha matnlar
    barchaMatnlarniTopish(document.body, lotinga);
    
    // Placeholder'lar
    const inputlar = document.querySelectorAll('input[placeholder]');
    inputlar.forEach(input => {
        if (!input.dataset.aslPlaceholder) {
            input.dataset.aslPlaceholder = input.placeholder;
        }
        
        if (lotinga) {
            input.placeholder = krillToLotin(input.dataset.aslPlaceholder);
        } else {
            input.placeholder = input.dataset.aslPlaceholder;
        }
    });
    
    // Title (sahifa nomi)
    if (!document.body.dataset.aslTitle) {
        document.body.dataset.aslTitle = document.title;
    }
    
    if (lotinga) {
        document.title = krillToLotin(document.body.dataset.aslTitle);
    } else {
        document.title = document.body.dataset.aslTitle;
    }
}

// localStorage'dan o'qish
const tanlanganTil = localStorage.getItem('til');
if (tanlanganTil === 'lotin') {
    setTimeout(() => {
        tilniAlmashtirish(true);
        tilMatn.textContent = 'КР';
    }, 200);
}

tilTugma.addEventListener('click', () => {
    const hozirgiTil = tilMatn.textContent;
    
    if (hozirgiTil === 'UZ') {
        tilniAlmashtirish(true);
        tilMatn.textContent = 'КР';
        localStorage.setItem('til', 'lotin');
    } else {
        tilniAlmashtirish(false);
        tilMatn.textContent = 'UZ';
        localStorage.setItem('til', 'krill');
    }
});

// ========== TEPAGA QAYTISH TUGMASI ==========

    const tepagaQaytishTugma = document.getElementById('tepagaQaytish');

    if (tepagaQaytishTugma) {
        // Scroll qilganda paydo bo'lish
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                tepagaQaytishTugma.classList.add('korinadi');
            } else {
                tepagaQaytishTugma.classList.remove('korinadi');
            }
        });

        // Bosilganda yuqoriga ko'tarilish
        tepagaQaytishTugma.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // ========== HERO RASM PARALLAX ==========



    // ========== GALEREYA LIGHTBOX ==========

    const galereyaKartalar = document.querySelectorAll('.galereya-karta');
    const lightbox = document.getElementById('lightbox');
    const lightboxRasm = document.getElementById('lightboxRasm');
    const lightboxYopish = document.getElementById('lightboxYopish');

    if (galereyaKartalar.length > 0 && lightbox) {
        galereyaKartalar.forEach(karta => {
            karta.addEventListener('click', () => {
                const rasmUrl = karta.getAttribute('data-rasm');
                lightboxRasm.src = rasmUrl;
                lightbox.classList.add('faol');
                document.body.style.overflow = 'hidden'; // Scroll to'xtatish
            });
        });

        // Yopish — X tugmasi
        if (lightboxYopish) {
            lightboxYopish.addEventListener('click', () => {
                lightbox.classList.remove('faol');
                document.body.style.overflow = '';
            });
        }

        // Yopish — fonni bosish
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('faol');
                document.body.style.overflow = '';
            }
        });

        // Yopish — ESC tugmasi
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('faol')) {
                lightbox.classList.remove('faol');
                document.body.style.overflow = '';
            }
        });
    }


    // ========== KONSOL ==========