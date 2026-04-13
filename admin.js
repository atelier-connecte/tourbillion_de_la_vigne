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

function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = new Date().toLocaleDateString('fr-FR', options);
    document.getElementById('currentDate').textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
}

function getServiceType(time) {
    const hour = parseInt(time.split(':')[0]);
    return hour < 15 ? 'lunch' : 'dinner';
}

function filterReservations() {
    let filtered = allReservations.filter(r => r.date === selectedDate);
    
    if (currentFilter === 'lunch') {
        filtered = filtered.filter(r => getServiceType(r.time) === 'lunch');
    } else if (currentFilter === 'dinner') {
        filtered = filtered.filter(r => getServiceType(r.time) === 'dinner');
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

function updateStatus(id, newStatus) {
    const reservation = allReservations.find(r => r.id === id);
    if (reservation) {
        reservation.status = newStatus;
        saveReservations();
        renderReservations();
        updateStats();
    }
}

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
});
