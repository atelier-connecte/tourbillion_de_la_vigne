// ============================================
// === GESTION RÉSERVATIONS
// ============================================

const EMAILJS_SERVICE_ID = 'service_0vr7k2s';
const EMAILJS_TEMPLATE_CLIENT = 'template_295vy3j';

const DEMO_RESERVATIONS = [
    {
        id: 1713024000000,
        firstName: "Sophie",
        lastName: "Martin",
        email: "sophie.martin@email.fr",
        phone: "06 12 34 56 78",
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        time: "20:00",
        guests: "4",
        message: "Anniversaire de mariage, merci !",
        status: "confirmed",
        createdAt: new Date().toISOString()
    },
    {
        id: 1713024100000,
        firstName: "Marc",
        lastName: "Dubois",
        email: "marc.dubois@email.fr",
        phone: "06 23 45 67 89",
        date: new Date().toISOString().split('T')[0],
        time: "19:30",
        guests: "2",
        message: "",
        status: "pending",
        createdAt: new Date().toISOString()
    },
    {
        id: 1713024200000,
        firstName: "Claire",
        lastName: "Rousseau",
        email: "claire.rousseau@email.fr",
        phone: "06 34 56 78 90",
        date: new Date().toISOString().split('T')[0],
        time: "21:00",
        guests: "6",
        message: "Table près de la fenêtre si possible",
        status: "pending",
        createdAt: new Date().toISOString()
    },
    {
        id: 1713024300000,
        firstName: "Thomas",
        lastName: "Leroy",
        email: "thomas.leroy@email.fr",
        phone: "06 45 67 89 01",
        date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        time: "20:30",
        guests: "3",
        message: "",
        status: "confirmed",
        createdAt: new Date().toISOString()
    },
    {
        id: 1713024400000,
        firstName: "Émilie",
        lastName: "Bernard",
        email: "emilie.bernard@email.fr",
        phone: "06 56 78 90 12",
        date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
        time: "19:00",
        guests: "2",
        message: "Allergie aux fruits de mer",
        status: "pending",
        createdAt: new Date().toISOString()
    },
    {
        id: 1713024500000,
        firstName: "Jean",
        lastName: "Moreau",
        email: "jean.moreau@email.fr",
        phone: "06 67 89 01 23",
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        time: "20:00",
        guests: "4",
        message: "",
        status: "cancelled",
        createdAt: new Date().toISOString()
    }
];

let allReservations = [];
let currentFilter = 'all';
let selectedDate = new Date().toISOString().split('T')[0];

function loadReservations() {
    const storedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    allReservations = [...DEMO_RESERVATIONS, ...storedReservations];
    allReservations.sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
    });
}

function saveReservations() {
    const userReservations = allReservations.filter(r => !DEMO_RESERVATIONS.find(d => d.id === r.id));
    localStorage.setItem('reservations', JSON.stringify(userReservations));
}

// ============================================
// === STATISTIQUES
// ============================================

function updateStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayReservations = allReservations.filter(r => r.date === today && r.status !== 'cancelled');
    
    const totalCouverts = todayReservations.reduce((sum, r) => {
        const guests = parseInt(r.guests);
        return sum + (isNaN(guests) ? 0 : guests);
    }, 0);
    
    document.getElementById('totalCouverts').textContent = totalCouverts;
    document.getElementById('todayBadge').textContent = `${todayReservations.length} réservation${todayReservations.length > 1 ? 's' : ''} aujourd'hui`;
    
    const pendingCount = allReservations.filter(r => r.status === 'pending').length;
    document.getElementById('pendingCount').textContent = pendingCount;
    
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const upcomingReservations = todayReservations.filter(r => r.time > currentTime);
    
    if (upcomingReservations.length > 0) {
        const next = upcomingReservations[0];
        document.getElementById('nextService').textContent = `${next.time} · ${next.guests}p`;
    } else {
        document.getElementById('nextService').textContent = '—';
    }
}

// ============================================
// === UTILITAIRES
// ============================================

function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = new Date().toLocaleDateString('fr-FR', options);
    document.getElementById('currentDate').textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
}

function getServiceType(time) {
    const hour = parseInt(time.split(':')[0]);
    return hour < 15 ? 'dejeuner' : 'diner';
}

function formatReservationDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function filterReservations() {
    let filtered = allReservations.filter(r => r.date === selectedDate);
    
    if (currentFilter === 'lunch') {
        filtered = filtered.filter(r => getServiceType(r.time) === 'dejeuner');
    } else if (currentFilter === 'dinner') {
        filtered = filtered.filter(r => getServiceType(r.time) === 'diner');
    }
    
    return filtered;
}

function renderReservations() {
    const grid = document.getElementById('reservationsGrid');
    const filtered = filterReservations();
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <p>Aucune réservation pour cette sélection</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filtered.map(reservation => `
        <div class="reservation-card ${reservation.status}" data-id="${reservation.id}">
            <div class="reservation-header">
                <div class="reservation-time">${reservation.time}</div>
                <div class="reservation-guests">${reservation.guests} ${parseInt(reservation.guests) > 1 ? 'personnes' : 'personne'}</div>
            </div>
            <div class="reservation-info">
                <div class="reservation-name">${reservation.firstName} ${reservation.lastName}</div>
                <div class="reservation-contact">📞 ${reservation.phone}</div>
                <div class="reservation-contact">✉️ ${reservation.email}</div>
                ${reservation.message ? `<div class="reservation-message">💬 ${reservation.message}</div>` : ''}
            </div>
            <div style="margin-top: 1rem;">
                <span class="status-badge ${reservation.status}">
                    ${reservation.status === 'pending' ? 'En attente' : reservation.status === 'confirmed' ? 'Confirmée' : 'Annulée'}
                </span>
            </div>
            <div class="reservation-actions">
                <button class="action-btn btn-confirm" onclick="updateStatus(${reservation.id}, 'confirmed')" ${reservation.status === 'confirmed' ? 'disabled' : ''}>
                    ✓ Confirmer
                </button>
                <button class="action-btn btn-cancel" onclick="updateStatus(${reservation.id}, 'cancelled')" ${reservation.status === 'cancelled' ? 'disabled' : ''}>
                    ✗ Annuler
                </button>
            </div>
        </div>
    `).join('');
}

async function updateStatus(id, newStatus) {
    const reservation = allReservations.find(r => r.id === id);
    if (reservation) {
        const previousStatus = reservation.status;
        reservation.status = newStatus;

        if (previousStatus !== 'confirmed' && newStatus === 'confirmed' && !reservation.clientConfirmationSent) {
            const sent = await sendClientConfirmationEmail(reservation);
            if (sent) {
                reservation.clientConfirmationSent = true;
            }
        }

        saveReservations();
        renderReservations();
        updateStats();
    }
}

async function sendClientConfirmationEmail(reservation) {
    try {
        const fullName = `${reservation.firstName} ${reservation.lastName}`;
        const service = getServiceType(reservation.time);
        const serviceLabel = service === 'dejeuner' ? 'Déjeuner' : 'Dîner';

        const templateParams = {
            to_name: fullName,
            to_email: reservation.email,
            reservation_date: formatReservationDate(reservation.date),
            reservation_time: reservation.time,
            service_label: serviceLabel,
            guests: reservation.guests,
            client_phone: reservation.phone,
            client_message: reservation.message || 'Aucun message spécial',
            restaurant_name: 'Le Tourbillon de la Vigne',
            restaurant_team: 'Pierre & Virginie'
        };

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CLIENT, templateParams);
        console.log('Email client envoyé (confirmation admin):', EMAILJS_TEMPLATE_CLIENT);
        return true;
    } catch (error) {
        console.error('Erreur envoi email client (confirmation admin):', error);
        return false;
    }
}

// ============================================
// === CALENDRIER
// ============================================

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const today = new Date();
    const days = [];
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push(date);
    }
    
    grid.innerHTML = days.map(date => {
        const dateStr = date.toISOString().split('T')[0];
        const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
        const dayNumber = date.getDate();
        const count = allReservations.filter(r => r.date === dateStr && r.status !== 'cancelled').length;
        const isActive = dateStr === selectedDate;
        
        return `
            <div class="calendar-day ${isActive ? 'active' : ''}" onclick="selectDate('${dateStr}')">
                <div class="day-name">${dayName}</div>
                <div class="day-number">${dayNumber}</div>
                ${count > 0 ? `<div class="day-count">${count}</div>` : ''}
            </div>
        `;
    }).join('');
}

function selectDate(dateStr) {
    selectedDate = dateStr;
    const date = new Date(dateStr);
    const dateFormatted = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById('sectionTitle').textContent = `Réservations du ${dateFormatted}`;
    renderCalendar();
    renderReservations();
}

document.addEventListener('DOMContentLoaded', function() {
    loadReservations();
    updateDate();
    updateStats();
    renderCalendar();
    renderReservations();
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderReservations();
        });
    });
    
    initTabs();
    initMenuEditor();
    initCapacityManager();
});

// ============================================
// === GESTION ONGLETS
// ============================================

function initTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`tab${targetTab.charAt(0).toUpperCase() + targetTab.slice(1)}`).classList.add('active');
        });
    });
}

// ============================================
// === ÉDITEUR CARTE DES MENUS
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

let currentMenu = null;

function initMenuEditor() {
    currentMenu = JSON.parse(localStorage.getItem('menuCard') || JSON.stringify(DEFAULT_MENU));
    renderMenuEditor();
    
    document.getElementById('saveMenuBtn').addEventListener('click', saveMenu);
    document.getElementById('addCategoryBtn').addEventListener('click', addCategory);
}

function renderMenuEditor() {
    const editor = document.getElementById('menuEditor');
    
    editor.innerHTML = currentMenu.categories.map((category, catIndex) => `
        <div class="category-editor" data-category-index="${catIndex}">
            <div class="category-header">
                <input type="text" class="category-name-input" value="${category.name}" data-category-index="${catIndex}">
                <button class="btn-delete" onclick="deleteCategory(${catIndex})">🗑️ Supprimer catégorie</button>
            </div>
            <div class="dishes-list">
                ${category.dishes.map((dish, dishIndex) => `
                    <div class="dish-editor">
                        <input type="text" class="dish-name-input" placeholder="Nom du plat" value="${dish.name}" data-category="${catIndex}" data-dish="${dishIndex}">
                        <input type="text" class="dish-description-input" placeholder="Description" value="${dish.description}" data-category="${catIndex}" data-dish="${dishIndex}">
                        <input type="text" class="dish-price-input" placeholder="Prix" value="${dish.price}" data-category="${catIndex}" data-dish="${dishIndex}">
                        <button class="btn-delete-small" onclick="deleteDish(${catIndex}, ${dishIndex})">🗑️</button>
                    </div>
                `).join('')}
            </div>
            <button class="btn-add-dish" onclick="addDish(${catIndex})">+ Ajouter un plat</button>
        </div>
    `).join('');
    
    document.querySelectorAll('.category-name-input').forEach(input => {
        input.addEventListener('change', function() {
            const catIndex = parseInt(this.dataset.categoryIndex);
            currentMenu.categories[catIndex].name = this.value;
        });
    });
    
    document.querySelectorAll('.dish-name-input, .dish-description-input, .dish-price-input').forEach(input => {
        input.addEventListener('change', function() {
            const catIndex = parseInt(this.dataset.category);
            const dishIndex = parseInt(this.dataset.dish);
            const field = this.classList.contains('dish-name-input') ? 'name' : 
                         this.classList.contains('dish-description-input') ? 'description' : 'price';
            currentMenu.categories[catIndex].dishes[dishIndex][field] = this.value;
        });
    });
}

function addCategory() {
    const newCategory = {
        id: 'category-' + Date.now(),
        name: 'Nouvelle catégorie',
        dishes: []
    };
    currentMenu.categories.push(newCategory);
    renderMenuEditor();
}

function deleteCategory(catIndex) {
    if (confirm('Supprimer cette catégorie ?')) {
        currentMenu.categories.splice(catIndex, 1);
        renderMenuEditor();
    }
}

function addDish(catIndex) {
    const newDish = {
        id: 'dish-' + Date.now(),
        name: '',
        description: '',
        price: ''
    };
    currentMenu.categories[catIndex].dishes.push(newDish);
    renderMenuEditor();
}

function deleteDish(catIndex, dishIndex) {
    if (confirm('Supprimer ce plat ?')) {
        currentMenu.categories[catIndex].dishes.splice(dishIndex, 1);
        renderMenuEditor();
    }
}

function saveMenu() {
    localStorage.setItem('menuCard', JSON.stringify(currentMenu));
    alert('✓ Carte sauvegardée ! Rechargez index.html pour voir les modifications.');
}

// ============================================
// === GESTION CAPACITÉS
// ============================================

let capacityData = null;

function initCapacityManager() {
    capacityData = JSON.parse(localStorage.getItem('tableCapacity') || JSON.stringify({
        default: { dejeuner: 15, diner: 15 },
        dates: {}
    }));
    
    document.getElementById('defaultLunch').value = capacityData.default.dejeuner;
    document.getElementById('defaultDinner').value = capacityData.default.diner;
    
    renderSpecificCapacities();
    
    document.getElementById('saveCapacitiesBtn').addEventListener('click', saveCapacities);
    document.getElementById('addSpecificCapacityBtn').addEventListener('click', addSpecificCapacity);
}

function renderSpecificCapacities() {
    const list = document.getElementById('specificCapacitiesList');
    const dates = Object.keys(capacityData.dates).sort();
    
    if (dates.length === 0) {
        list.innerHTML = '<p class="empty-message">Aucune capacité spécifique définie</p>';
        return;
    }
    
    list.innerHTML = dates.map(date => {
        const cap = capacityData.dates[date];
        return `
            <div class="specific-capacity-item">
                <span class="capacity-date">${new Date(date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                <span class="capacity-value">Déjeuner: ${cap.dejeuner} · Dîner: ${cap.diner}</span>
                <button class="btn-delete-small" onclick="deleteSpecificCapacity('${date}')">🗑️</button>
            </div>
        `;
    }).join('');
}

function addSpecificCapacity() {
    const date = document.getElementById('specificDate').value;
    const lunch = parseInt(document.getElementById('specificLunch').value);
    const dinner = parseInt(document.getElementById('specificDinner').value);
    
    if (!date || isNaN(lunch) || isNaN(dinner)) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    capacityData.dates[date] = {
        dejeuner: lunch,
        diner: dinner
    };
    
    document.getElementById('specificDate').value = '';
    document.getElementById('specificLunch').value = '';
    document.getElementById('specificDinner').value = '';
    
    renderSpecificCapacities();
}

function deleteSpecificCapacity(date) {
    if (confirm('Supprimer cette capacité spécifique ?')) {
        delete capacityData.dates[date];
        renderSpecificCapacities();
    }
}

function saveCapacities() {
    capacityData.default.dejeuner = parseInt(document.getElementById('defaultLunch').value);
    capacityData.default.diner = parseInt(document.getElementById('defaultDinner').value);
    
    localStorage.setItem('tableCapacity', JSON.stringify(capacityData));
    alert('✓ Capacités sauvegardées !');
}
