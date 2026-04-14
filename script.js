// ============================================
// === CONFIGURATION EMAILJS
// ============================================

// Configuration EmailJS
const EMAILJS_SERVICE_ID = 'service_z4yst9z';
const EMAILJS_TEMPLATE_RESTAURANT = 'template_15x26ni';

// ============================================
// === ANIMATIONS
// ============================================

// ============================================
// === ACCÈS ADMIN CACHÉ
// ============================================

let logoClickCount = 0;
let logoClickTimer = null;

const heroLogo = document.getElementById('heroLogo');
if (heroLogo) {
    heroLogo.addEventListener('click', function() {
        logoClickCount++;
        
        if (logoClickCount === 1) {
            logoClickTimer = setTimeout(() => {
                logoClickCount = 0;
            }, 2000);
        }
        
        if (logoClickCount === 3) {
            clearTimeout(logoClickTimer);
            logoClickCount = 0;
            window.location.href = 'admin.html';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // ============================================
    // === FORMULAIRE
    // ============================================

    const bookingForm = document.getElementById('bookingForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = bookingForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = '⏳ Envoi en cours...';
            
            const formData = {
                id: Date.now(),
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                guests: document.getElementById('guests').value,
                message: document.getElementById('message').value,
                status: 'pending',
                createdAt: new Date().toISOString()
            };
            
            let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
            reservations.push(formData);
            localStorage.setItem('reservations', JSON.stringify(reservations));
            
            const emailSent = await sendEmails(formData);
            
            const formWrapper = document.getElementById('reservationForm');
            formWrapper.style.opacity = '0';
            formWrapper.style.transform = 'translateY(-20px)';
            formWrapper.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            
            setTimeout(() => {
                formWrapper.style.display = 'none';
                confirmationMessage.classList.remove('hidden');
                
                const confirmationText = confirmationMessage.querySelector('p');
                if (emailSent) {
                    confirmationText.innerHTML = 'Réservation enregistrée ! Pierre ou Virginie vous confirment sous 2h.<br>À très vite au Tourbillon. 🍷';
                } else {
                    confirmationText.innerHTML = 'Réservation enregistrée ! Pierre ou Virginie vous confirment sous 2h.<br>À très vite au Tourbillon. 🍷';
                }
                
                confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 400);
        });
    }

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============================================
    // === UTILITAIRES LOCALSTORAGE
    // ============================================

    loadAndRenderMenu();
    
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    
    if (dateInput && timeInput) {
        dateInput.addEventListener('change', checkCapacityForForm);
        timeInput.addEventListener('change', checkCapacityForForm);
        
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
});

function loadFromLocalStorage(key, defaultValue) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// ============================================
// === GESTION CARTE DES MENUS
// ============================================

const DEFAULT_MENU = {
    categories: [
        {
            id: 'aperitif',
            name: 'Pour commencer',
            dishes: [
                { id: 'a1', name: 'Olives de Nyons bio', description: '', price: '3,50€' },
                { id: 'a2', name: 'Gaspacho de carottes', description: '', price: '4,50€' },
                { id: 'a3', name: 'Saucisson sec de la ferme de Montchervet (69)', description: 'beurre cru de l\'Ain, cornichons', price: '7,50€' }
            ]
        },
        {
            id: 'assiettes',
            name: 'Assiettes à partager',
            dishes: [
                { id: 'p1', name: 'Crème de butternut rôties', description: 'burrata & noix', price: '8€' },
                { id: 'p2', name: 'Topinambours caramélisés', description: 'sabayon café', price: '9,50€' },
                { id: 'p3', name: 'Œuf coulant façon meurette', description: '(végétarien possible)', price: '11€' },
                { id: 'p4', name: 'Pâté en croute', description: 'de la Boucherie Paupiette', price: '12€' },
                { id: 'p5', name: 'Assiette de fromages', description: 'fromagerie Au chien sous la table', price: '7,50€ / 13€' },
                { id: 'p6', name: 'Rôti de cochon façon tonnato', description: 'câpres, pickles', price: '13€' },
                { id: 'p7', name: 'Croziflette végé', description: 'reblochon bio et poireaux caramélisés', price: '16€' }
            ]
        },
        {
            id: 'desserts',
            name: 'Pour finir',
            dishes: [
                { id: 'd1', name: 'Brownie (chocolat bio 70%)', description: 'crème anglaise au piment d\'Espelette', price: '8€' },
                { id: 'd2', name: 'Tarte poire amandine aux noisettes', description: '', price: '8€' },
                { id: 'd3', name: 'Fromage blanc de la laiterie Carrier (07)', description: 'coulis de framboise Saveurs du Vercors', price: '7€' }
            ]
        }
    ]
};

function loadAndRenderMenu() {
    const menuData = loadFromLocalStorage('menuCard', DEFAULT_MENU);
    const menuGrid = document.getElementById('menuGrid');
    
    if (menuGrid) {
        menuGrid.innerHTML = generateMenuHTML(menuData);
    }
}

function generateMenuHTML(menuData) {
    return menuData.categories.map(category => `
        <div class="menu-column">
            <h3 class="menu-category">${category.name}</h3>
            <div class="menu-items">
                ${category.dishes.map(dish => `
                    <div class="menu-item">
                        <div class="menu-item-header">
                            <h4>${dish.name}</h4>
                            <span class="price">${dish.price}</span>
                        </div>
                        <p>${dish.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// ============================================
// === GESTION CAPACITÉS TABLES
// ============================================

function getServiceType(time) {
    const hour = parseInt(time.split(':')[0]);
    return hour < 15 ? 'dejeuner' : 'diner';
}

function checkCapacity(date, service) {
    const capacityData = loadFromLocalStorage('tableCapacity', {
        default: { dejeuner: 15, diner: 15 },
        dates: {}
    });
    
    const capacity = capacityData.dates[date]?.[service] || capacityData.default[service];
    
    const reservations = loadFromLocalStorage('reservations', []);
    const confirmedCount = reservations.filter(r => 
        r.date === date && 
        getServiceType(r.time) === service && 
        r.status !== 'cancelled'
    ).reduce((sum, r) => sum + parseInt(r.guests || 0), 0);
    
    return {
        capacity: capacity,
        reserved: confirmedCount,
        available: capacity - confirmedCount,
        isFull: confirmedCount >= capacity
    };
}

function checkCapacityForForm() {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const warningBanner = document.getElementById('capacityWarning');
    const submitButton = document.querySelector('#bookingForm button[type="submit"]');
    
    if (!dateInput || !timeInput || !warningBanner || !submitButton) return;
    
    const date = dateInput.value;
    const time = timeInput.value;
    
    if (!date || !time) {
        warningBanner.classList.add('hidden');
        submitButton.disabled = false;
        return;
    }
    
    const service = getServiceType(time);
    const capacityInfo = checkCapacity(date, service);
    
    if (capacityInfo.isFull) {
        warningBanner.classList.remove('hidden');
        submitButton.disabled = true;
    } else {
        warningBanner.classList.add('hidden');
        submitButton.disabled = false;
    }
}

// ============================================
// === ENVOI EMAILS EMAILJS
// ============================================

async function sendEmails(reservationData) {
    try {
        const service = getServiceType(reservationData.time);
        const serviceLabel = service === 'dejeuner' ? 'Déjeuner' : 'Dîner';
        const formattedDate = new Date(reservationData.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_RESTAURANT, {
            name: reservationData.firstName + ' ' + reservationData.lastName,
            time: formattedDate + ' à ' + reservationData.time + ' (' + serviceLabel + ')',
            message: `📧 Email : ${reservationData.email}\n📞 Téléphone : ${reservationData.phone}\n👥 Nombre de couverts : ${reservationData.guests}\n💬 Message : ${reservationData.message || 'Aucun message spécial'}`
        });
        
        return true;
    } catch (error) {
        console.error('Erreur envoi email:', error);
        return false;
    }
}
