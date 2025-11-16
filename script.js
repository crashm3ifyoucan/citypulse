// ==================== UTILITY FUNCTIONS ====================

const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const getAQIStatus = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
};

const getTrafficStatus = (density) => {
    if (density <= 30) return 'Light Traffic';
    if (density <= 60) return 'Moderate Traffic';
    if (density <= 80) return 'Heavy Traffic';
    return 'Severe Congestion';
};

// ==================== DASHBOARD FUNCTIONALITY ====================

const initDashboard = () => {
    // Update Temperature
    const tempValue = document.getElementById('temp-value');
    if (tempValue) {
        tempValue.textContent = `${dashboardData.temperature}°C`;
    }

    // Update AQI
    const aqiValue = document.getElementById('aqi-value');
    const aqiStatus = document.getElementById('aqi-status');
    if (aqiValue && aqiStatus) {
        aqiValue.textContent = dashboardData.aqi;
        aqiStatus.textContent = getAQIStatus(dashboardData.aqi);
    }

    // Update Traffic
    const trafficValue = document.getElementById('traffic-value');
    const trafficStatus = document.getElementById('traffic-status');
    if (trafficValue && trafficStatus) {
        trafficValue.textContent = `${dashboardData.traffic}%`;
        trafficStatus.textContent = getTrafficStatus(dashboardData.traffic);
    }

    // Update Time (with real-time clock)
    const updateClock = () => {
        const now = new Date();
        const timeValue = document.getElementById('time-value');
        const dateValue = document.getElementById('date-value');
        const heroTimeValue = document.getElementById('hero-time-value');
        const heroDateValue = document.getElementById('hero-date-value');
        
        if (timeValue) {
            timeValue.textContent = formatTime(now);
        }
        if (dateValue) {
            dateValue.textContent = formatDate(now);
        }
        if (heroTimeValue) {
            heroTimeValue.textContent = formatTime(now);
        }
        if (heroDateValue) {
            heroDateValue.textContent = formatDate(now);
        }
    };

    updateClock();
    setInterval(updateClock, 1000);

    // Add animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
};

// ==================== ALERTS PAGE FUNCTIONALITY ====================

let currentFilter = 'all';
let currentSort = 'newest';

const renderAlerts = (alerts) => {
    const container = document.getElementById('alerts-container');
    if (!container) return;

    if (alerts.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: rgba(0, 0, 0, 0.5);">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style="margin: 0 auto 20px;">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor" opacity="0.3"/>
                </svg>
                <h3 style="font-size: 20px; margin-bottom: 8px;">No alerts found</h3>
                <p>Try adjusting your filters</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    
    alerts.forEach((alert, index) => {
        const alertCard = document.createElement('div');
        alertCard.className = 'alert-card';
        alertCard.style.animationDelay = `${index * 0.05}s`;
        
        const timeAgo = getTimeAgo(alert.timestamp);
        
        alertCard.innerHTML = `
            <div class="alert-header">
                <div>
                    <h3 class="alert-title">${alert.title}</h3>
                    <span class="alert-category ${alert.category}">${alert.category}</span>
                </div>
            </div>
            <p class="alert-description">${alert.description}</p>
            <div class="alert-time">${timeAgo}</div>
        `;
        
        container.appendChild(alertCard);
    });
};

const getTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
};

const filterAndSortAlerts = () => {
    let filtered = alertsData;

    // Apply filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(alert => alert.category === currentFilter);
    }

    // Apply sort
    filtered.sort((a, b) => {
        if (currentSort === 'newest') {
            return b.timestamp - a.timestamp;
        } else {
            return a.timestamp - b.timestamp;
        }
    });

    renderAlerts(filtered);
};

const initAlerts = () => {
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterAndSortAlerts();
        });
    });

    // Sort buttons
    const sortBtns = document.querySelectorAll('.sort-btn');
    sortBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sortBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.dataset.sort;
            filterAndSortAlerts();
        });
    });

    // Initial render
    filterAndSortAlerts();
};

// ==================== MAP PAGE FUNCTIONALITY ====================

const initMap = () => {
    const mapGrid = document.getElementById('map-grid');
    if (!mapGrid) return;

    mapZones.forEach((zone, index) => {
        const zoneElement = document.createElement('div');
        zoneElement.className = 'zone';
        zoneElement.style.backgroundImage = `linear-gradient(rgba(74, 112, 169, 0.7), rgba(143, 171, 212, 0.7)), url('${zone.image}')`;
        zoneElement.style.backgroundSize = 'cover';
        zoneElement.style.backgroundPosition = 'center';
        zoneElement.style.animationDelay = `${index * 0.08}s`;
        
        zoneElement.innerHTML = `<div class="zone-name">${zone.name}</div>`;
        
        zoneElement.addEventListener('click', () => {
            showZoneModal(zone);
        });
        
        mapGrid.appendChild(zoneElement);
    });

    // Modal close functionality
    const modal = document.getElementById('zone-modal');
    const closeBtn = document.getElementById('modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
};

const adjustColor = (color, amount) => {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
};

const showZoneModal = (zone) => {
    const modal = document.getElementById('zone-modal');
    const modalZoneName = document.getElementById('modal-zone-name');
    const modalZoneDescription = document.getElementById('modal-zone-description');
    const modalZoneContact = document.getElementById('modal-zone-contact');
    
    if (modalZoneName) modalZoneName.textContent = zone.name;
    if (modalZoneDescription) modalZoneDescription.textContent = zone.description;
    if (modalZoneContact) modalZoneContact.textContent = zone.contact;
    
    if (modal) {
        modal.classList.add('show');
    }
};

// ==================== FEEDBACK PAGE FUNCTIONALITY ====================

const initFeedback = () => {
    const form = document.getElementById('feedback-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (name === '') {
            document.getElementById('name-error').textContent = 'Name is required';
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            document.getElementById('email-error').textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            document.getElementById('message-error').textContent = 'Message is required';
            isValid = false;
        } else if (message.length < 10) {
            document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        if (isValid) {
            // Show success modal
            showSuccessModal();
            
            // Reset form
            form.reset();
        }
    });

    // Success modal close
    const successModal = document.getElementById('success-modal');
    const successCloseBtn = document.getElementById('success-modal-close');
    
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', () => {
            successModal.classList.remove('show');
        });
    }
    
    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('show');
            }
        });
    }
};

const showSuccessModal = () => {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('show');
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            modal.classList.remove('show');
        }, 3000);
    }
};

// ==================== PAGE INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    // Determine which page we're on and initialize accordingly
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);

    switch (page) {
        case 'index.html':
        case '':
            initDashboard();
            break;
        case 'alerts.html':
            initAlerts();
            break;
        case 'map.html':
            initMap();
            break;
        case 'feedback.html':
            initFeedback();
            break;
        default:
            // Default to dashboard if on root
            if (document.getElementById('temp-value')) {
                initDashboard();
            }
            if (document.getElementById('alerts-container')) {
                initAlerts();
            }
            if (document.getElementById('map-grid')) {
                initMap();
            }
            if (document.getElementById('feedback-form')) {
                initFeedback();
            }
    }
});